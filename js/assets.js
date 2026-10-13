/* ==========================================================================
   素材解析与渲染 · ASSETS
   --------------------------------------------------------------------------
   把 assets/manifest.js（按「乐器名 + 类型」维护）解析成可渲染的媒体，
   有素材就渲染真实图片 / 动画 / 视频，没有就回落到设计好的占位框，
   页面永远不会出现破图。

   暴露 window.ASSETS
     .SLOTS                 6 个槽位定义
     .for(rec)              取该乐器的素材条目（按 名称 → 别名 → id 查找）
     .get(rec, kind, slot)  取单个素材，无则 null
     .slot(rec, kind, slot, opts)  直接产出 HTML（真实媒体或占位框）
     .status(rec)           素材就位情况
     .page(key, kind, slot) 页面级素材（八音关系图 / 纪录片等）
   ========================================================================== */
(function () {
  'use strict';

  var RAW = window.ASSET_MANIFEST || {};

  /* 占位框渲染器必须**延迟获取**：assets.js 先于 main.js 加载，
     若在此处捕获 window.UI.ph，拿到的是 undefined，占位框会全部变成空字符串。 */
  function placeholder(o) {
    var f = window.UI && window.UI.ph;
    return f ? f(o) : '';
  }

  /* ---------- 槽位定义（详情页 7 个位置） ----------
     比例统一为 16:9：素材基本来自 16:9 的课件页 / 照片 / 视频，
     框与图同比例，才能既不裁切也不留边。 */

  var SLOT_RATIO = '16x9';
  var SLOT_SIZE = 'IMG · 1600×900';

  var SLOTS = [
    { kind: 'img',   slot: 'hero',        label: '头图',         ratio: SLOT_RATIO, size: SLOT_SIZE,
      hint: '建议 1600×900（16:9）· 显示在详情页乐器名的右侧，高度自动对齐左侧文字块' },
    { kind: 'img',   slot: 'explode',     label: '主视觉 · 3D 分解图', ratio: SLOT_RATIO, size: SLOT_SIZE,
      hint: '建议 1600×900（16:9）· 放在「它是什么」正文最上方做主视觉：3D 爆炸分解图，或该乐器的课件封面 / 特写' },
    { kind: 'img',   slot: 'main',        label: '主图',         ratio: SLOT_RATIO, size: SLOT_SIZE,
      hint: '建议 1600×900（16:9）· 实物全身照 / 博物馆藏品图' },
    { kind: 'img',   slot: 'structure',   label: '结构示意图',   ratio: SLOT_RATIO, size: SLOT_SIZE,
      hint: '建议 1600×900（16:9）· 各部件名称标注图' },
    { kind: 'img',   slot: 'scene',       label: '文化场景图',   ratio: SLOT_RATIO, size: SLOT_SIZE,
      hint: '建议 1600×900（16:9）· 古画、壁画、文献书影、演出剧照' },
    { kind: 'anim',  slot: 'history',     label: '历史演变动画', ratio: SLOT_RATIO, size: 'ANIM · 1600×900',
      hint: '建议 1600×900（16:9）· SVG / Lottie / 循环视频' },
    { kind: 'anim',  slot: 'principle',   label: '发声原理动画', ratio: SLOT_RATIO, size: 'ANIM · 1600×900',
      hint: '建议 1600×900（16:9）· 振动 / 气流 / 指法演示' },
    { kind: 'audio', slot: 'performance', label: '演奏音频',     ratio: 'auto',     size: 'AUDIO · MP3 / OGG',
      hint: '这件乐器的一段演奏录音（无版权风险 + 逐条注明来源），显示为播放器 + 来源信息' }
  ];

  var KINDS = ['img', 'anim', 'audio', 'video'];

  /* ---------- 平台注册表 ----------
     平台入口一律以「二维码」形式呈现：桌面端扫不了自己的屏幕，
     所以卡片同时给出可点的文字链接。 */
  var PLATFORMS = {
    bilibili: { name: 'B 站', color: '#00AEEC', hint: 'B 站 App 扫码 · 或手机相机直接扫' },
    xiaohongshu: { name: '小红书', color: '#FF2442', hint: '小红书 App 扫码 · 或微信「扫一扫」' },
    douyin: { name: '抖音', color: '#FE2C55', hint: '抖音 App 扫码' },
    weixin: { name: '微信视频号', color: '#07C160', hint: '微信「扫一扫」' },
    kuaishou: { name: '快手', color: '#FF4906', hint: '快手 App 扫码' },
    youtube: { name: 'YouTube', color: '#FF0000', hint: '手机相机扫码' },
    weibo: { name: '微博', color: '#E6162D', hint: '微博 App 扫码' },
    website: { name: '官方网站', color: '#E8B84B', hint: '手机相机扫码' },
    link: { name: '相关链接', color: '#9B6BF2', hint: '手机相机扫码' }
  };

  /* 还没配链接时，预留展示这几个平台入口 */
  var RESERVED = ['bilibili', 'xiaohongshu', 'douyin'];

  /* ---------- 工具 ---------- */

  function encode(p) {
    try { return encodeURI(String(p)); } catch (e) { return String(p); }
  }

  function escape(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function extOf(src) {
    var m = String(src || '').split('?')[0].split('#')[0].match(/\.([a-z0-9]+)$/i);
    return m ? m[1].toLowerCase() : '';
  }

  var VIDEO_EXT = /^(mp4|webm|ogv|ogg|mov|m4v)$/;
  var IMG_EXT = /^(svg|gif|webp|png|jpe?g|avif|bmp)$/;

  /* 把 manifest 里的简写统一成对象 */
  function normalize(val) {
    if (!val) return null;
    if (typeof val === 'string') return { src: val };
    if (typeof val === 'object') {
      /* 曲目列表：{ tracks: [...] } 也算有效素材 */
      if (val.src || val.embed || val.qr || (val.tracks && val.tracks.length)) return val;
      /* 误写成 { main: "..." } 的嵌套形式也兼容一下 */
      var keys = Object.keys(val);
      if (keys.length === 1 && typeof val[keys[0]] === 'string') return { src: val[keys[0]] };
    }
    return null;
  }

  /* ---------- 查找 ---------- */

  function lookup(key) {
    if (!key) return null;
    var e = RAW[key];
    return e && typeof e === 'object' ? e : null;
  }

  /* 按 名称 → 别名 → id 依次查找 */
  function entryFor(rec) {
    if (!rec) return null;
    var keys = [rec.name].concat(rec.alias || []).concat([rec.id]);
    for (var i = 0; i < keys.length; i++) {
      var e = lookup(keys[i]);
      if (e) return e;
    }
    return null;
  }

  function forRec(rec) {
    var e = entryFor(rec) || {};
    var out = {};
    KINDS.forEach(function (k) {
      out[k] = (e[k] && typeof e[k] === 'object') ? e[k] : {};
    });
    return out;
  }

  function get(rec, kind, slot) {
    var e = entryFor(rec);
    if (!e || !e[kind]) return null;
    return normalize(e[kind][slot]);
  }

  /* ---------- 平台入口（二维码） ---------- */

  function metaOf(key) {
    return PLATFORMS[key] || { name: key || '链接', color: '#9B6BF2', hint: '手机相机扫码' };
  }

  function collectPlatforms(entry, fallbackName) {
    var box = (entry && entry.platform) || {};
    var out = [];
    var handled = {};

    function take(k) {
      if (handled[k]) return;
      handled[k] = 1;
      var raw = box[k];
      if (!raw) return;
      var arr = Array.isArray(raw) ? raw : [raw];
      var meta = metaOf(k);
      arr.forEach(function (v, i) {
        var url = typeof v === 'string' ? v : (v && (v.url || v.link || v.qr));
        if (!url) return;
        out.push({
          key: k + (i ? '-' + (i + 1) : ''),
          platform: (typeof v === 'object' && v.platform) || meta.name,
          color: (typeof v === 'object' && v.color) || meta.color,
          hint: (typeof v === 'object' && v.hint) || meta.hint,
          label: (typeof v === 'object' && (v.label || v.title)) || (meta.name + ' · ' + (fallbackName || '')),
          desc: (typeof v === 'object' && v.desc) || '',
          url: url
        });
      });
    }

    Object.keys(PLATFORMS).forEach(take);
    Object.keys(box).forEach(take);
    return out;
  }

  function platformsFor(rec) {
    return collectPlatforms(entryFor(rec), rec && rec.name);
  }

  function platformsPage(key) {
    return collectPlatforms(lookup(key), key);
  }

  /* 预留态：一件乐器还没配任何平台链接时，展示这几个待填入口 */
  function reservedPlatforms(hint) {
    return RESERVED.map(function (k) {
      var m = metaOf(k);
      return {
        key: k,
        platform: m.name,
        color: m.color,
        hint: hint || ('在 assets/manifest.js 里填 platform.' + k)
      };
    });
  }

  /* 槽位里直接放二维码入口： { qr: "https://...", platform: "bilibili" } */
  function qrHTML(item, o) {
    var Q = window.QR;
    if (!Q || !Q.panel) return '';
    o = o || {};
    var meta = item.platform ? metaOf(item.platform) : null;
    return Q.panel(item.qr, {
      key: item.platform || '',
      platform: meta ? meta.name : (item.platform || ''),
      color: item.color || (meta && meta.color) || 'var(--gold)',
      label: item.label || o.label || '扫码打开',
      desc: item.desc || '',
      hint: item.hint || (meta && meta.hint)
    });
  }

  /* 渲染一组平台入口卡片；没有链接时退化为预留占位 */
  function platformCards(list, reservedHint) {
    var Q = window.QR;
    if (!Q) return '';
    if (!list || !list.length) {
      return reservedPlatforms(reservedHint).map(function (p) {
        return Q.placeholder(p);
      }).join('');
    }
    return list.map(function (p) {
      return Q.panel(p.url, {
        key: p.key, platform: p.platform, color: p.color,
        label: p.label, desc: p.desc, hint: p.hint
      });
    }).join('');
  }

  /* ---------- 渲染真实媒体 ---------- */

  function wrap(kind, inner, o) {
    var cap = o.caption
      ? '<figcaption class="media__cap">' + escape(o.caption) + '</figcaption>'
      : '';
    /* 类型角标始终显示，与占位框的角标保持一致 */
    var tag = '<span class="media__tag">' + escape(o.tag || labelOf(kind)) + '</span>';
    /* 把占位框参数与槽位键存下来：素材加载失败时用 _fail() 原地降级，绝不出现破图 */
    var spec = o.spec
      ? ' data-phspec="' + escape(JSON.stringify(o.spec)) + '"' +
        (o.spec.key ? ' data-slotkey="' + escape(o.spec.key) + '"' : '')
      : '';
    /* contain 显示会留白：把同一张图交给 CSS 做虚化垫底（见 style.css 的 .media::before） */
    var bg = o.bg
      ? ' style="--media-bg:url(&quot;' + escape(encode(o.bg)) + '&quot;)"'
      : '';
    return '<figure class="media media--' + kind + ' media--' + (o.ratio || '16x9') + '"' + spec + bg + '>' +
      inner + tag + cap + '</figure>';
  }

  /* 素材加载失败 → 原地换回占位框，并把侧栏的"已就位"状态回退 */
  function fail(el) {
    var fig = el && el.closest ? el.closest('.media') : null;
    if (!fig || fig.getAttribute('data-failed')) return;
    fig.setAttribute('data-failed', '1');
    var key = fig.getAttribute('data-slotkey') || '';
    var spec = {};
    try { spec = JSON.parse(fig.getAttribute('data-phspec') || '{}'); } catch (e) { spec = {}; }
    var html = placeholder(spec);
    if (html) fig.outerHTML = html;
    else fig.remove();
    if (key) markNotReady(key);
  }

  /* 把某个槽位的状态行改回"未就位" */
  function markNotReady(key) {
    var rows = document.querySelectorAll('.slot-row[data-slotkey="' + key + '"]');
    Array.prototype.forEach.call(rows, function (r) {
      r.classList.remove('is-ready');
      var p = r.querySelector('.slot-row__path');
      if (p) p.textContent = (r.getAttribute('data-kind') || '').toUpperCase();
    });
    refreshMeters();
  }

  /* 依据各列表里 .is-ready 行数重算进度 */
  function refreshMeters() {
    Array.prototype.forEach.call(document.querySelectorAll('.slot-list'), function (list) {
      var rows = list.querySelectorAll('.slot-row');
      var ready = list.querySelectorAll('.slot-row.is-ready').length;
      var scope = list.parentNode || document;
      var n = scope.querySelector('.asset-meter__n');
      var fill = scope.querySelector('.asset-meter__fill');
      if (n) n.textContent = '已就位 ' + ready + ' / ' + rows.length;
      if (fill) fill.style.width = (rows.length ? Math.round(ready / rows.length * 100) : 0) + '%';
    });
  }

  function labelOf(kind) {
    return kind === 'img' ? 'IMG' : kind === 'anim' ? 'ANIM' : kind === 'audio' ? 'AUDIO' : 'VIDEO';
  }

  /* ---------- 演奏音频：播放器 + 来源信息 ---------- */

  /* 一个槽位可能是一条曲目，也可能是一串曲目（tracks） */
  function trackList(perf) {
    if (!perf) return [];
    if (perf.tracks && perf.tracks.length) return perf.tracks;
    if (perf.src) return [perf];
    return [];
  }

  function creditRows(meta) {
    if (!meta) return '';
    var order = [
      ['title', '曲名'], ['performer', '演奏者'], ['author', '作者 / 作曲'],
      ['album', '专辑 / 收录'], ['compiler', '收录人'], ['date', '录制 / 上传日期'],
      ['duration', '文件时长'], ['license', '许可'], ['sourceName', '来源']
    ];
    var rows = '';
    order.forEach(function (pair) {
      var v = meta[pair[0]];
      if (!v) return;
      /* 「来源」这一行直接链到原始文件页，方便核对授权 */
      var val = pair[0] === 'sourceName' && meta.sourceUrl
        ? '<a href="' + escape(meta.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + escape(v) + '</a>'
        : escape(v);
      rows += '<div><dt>' + escape(pair[1]) + '</dt><dd>' + val + '</dd></div>';
    });
    if (meta.sourceUrl) {
      rows += '<div><dt>原始链接</dt><dd><a href="' + escape(meta.sourceUrl) +
        '" target="_blank" rel="noopener noreferrer">' + escape(meta.sourceUrl) + '</a></dd></div>';
    }
    return rows;
  }

  function audioType(ext) {
    return ext === 'mp3' ? 'audio/mpeg' : ext === 'oga' ? 'audio/ogg' : ('audio/' + ext);
  }

  /* 演奏音频：多条时按顺序连着放（播放列表 + 逐条署名） */
  function audioCard(perf) {
    var list = trackList(perf);
    if (!list.length) return '';
    var multi = list.length > 1;
    var first = list[0];
    var firstMeta = first.meta || {};
    var src = first.src || '';
    var items = '', creditsHtml = '';

    list.forEach(function (t, i) {
      var meta = t.meta || {};
      var label = t.title || meta.title || ('曲目 ' + (i + 1));
      var dur = (meta.duration || '').split('（')[0];
      items += '<li class="playlist__item' + (i === 0 ? ' is-current' : '') + '" data-track="' + i +
          '" data-src="' + escape(encode(t.src || '')) + '"' +
          ' data-sub="' + escape(t.caption || '') + '">' +
          '<span class="playlist__no">' + (i + 1) + '</span>' +
          '<span class="playlist__title">' + escape(label) + '</span>' +
          (dur ? '<span class="playlist__dur">' + escape(dur) + '</span>' : '') +
          '<span class="playlist__play" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>' +
          '</span>' +
        '</li>' +
        '<template class="playlist__meta">' + creditRows(meta) + '</template>' +
        '<template class="playlist__note">' + escape(meta.note || '') + '</template>';
    });

    creditsHtml = creditRows(firstMeta);

    return '<section class="audio-card' + (multi ? ' audio-card--multi' : '') + '" data-audio-card>' +
      '<div class="audio-card__head">' +
        '<span class="audio-card__tag">AUDIO</span>' +
        '<div>' +
          '<p class="audio-card__title" data-audio-title>' +
            escape(first.title || firstMeta.title || '演奏音频') + '</p>' +
          (first.caption ? '<p class="audio-card__sub" data-audio-sub>' + escape(first.caption) + '</p>'
                         : '<p class="audio-card__sub" data-audio-sub></p>') +
          (multi ? '<p class="audio-card__sub" data-audio-hint>共 ' + list.length +
                   ' 段录音 · <b>顺序播放</b>（一段放完自动接下一段，放完回到第一段）</p>' : '') +
        '</div>' +
      '</div>' +
      '<audio class="audio-card__player" controls preload="metadata" data-audio-el>' +
        '<source src="' + escape(encode(src)) + '" type="' + audioType(extOf(src)) + '">' +
        '你的浏览器不支持音频播放，可<a href="' + escape(encode(src)) + '">直接下载这段录音</a>。' +
      '</audio>' +
      (multi ? '<ol class="playlist" data-playlist>' + items + '</ol>' : '') +
      '<dl class="audio-card__credit" data-audio-credit>' + creditsHtml + '</dl>' +
      '<p class="audio-card__note" data-audio-note>' + escape(firstMeta.note || '') + '</p>' +
    '</section>';
  }

  /* 挂载后接线：点列表切曲、放完自动下一段（最后一首回到第一首） */
  function initAudio(scope) {
    var cards = (scope || document).querySelectorAll('[data-audio-card]');
    Array.prototype.forEach.call(cards, function (card) {
      if (card.__wired) return;
      card.__wired = true;
      var el = card.querySelector('[data-audio-el]');
      var list = card.querySelector('[data-playlist]');
      if (!el || !list) return;
      var items = Array.prototype.slice.call(list.querySelectorAll('.playlist__item'));
      var titles = card.querySelector('[data-audio-title]');
      var sub = card.querySelector('[data-audio-sub]');
      var credit = card.querySelector('[data-audio-credit]');
      var note = card.querySelector('[data-audio-note]');
      var metas = Array.prototype.slice.call(list.querySelectorAll('template.playlist__meta'));
      var notes = Array.prototype.slice.call(list.querySelectorAll('template.playlist__note'));
      var cur = 0;

      function play(i, autoplay) {
        cur = (i + items.length) % items.length;
        var item = items[cur];
        var title = item.querySelector('.playlist__title');
        var src = item.getAttribute('data-src');
        if (!src) return;
        el.innerHTML = '<source src="' + src + '" type="audio/mpeg">';
        el.load();
        items.forEach(function (it, k) { it.classList.toggle('is-current', k === cur); });
        if (titles && title) titles.textContent = title.textContent;
        if (sub) sub.textContent = item.getAttribute('data-sub') || '';
        if (credit) credit.innerHTML = metas[cur] ? metas[cur].innerHTML : '';
        if (note) note.textContent = notes[cur] ? notes[cur].textContent : '';
        if (autoplay) {
          var p = el.play();
          if (p && p.catch) p.catch(function () {});
        }
      }

      items.forEach(function (it, i) {
        it.addEventListener('click', function () { play(i, true); });
      });
      el.addEventListener('ended', function () { play(cur + 1, true); });
    });
  }

  function audioMissing(o) {
    o = o || {};
    return '<section class="audio-card audio-card--empty">' +
      '<div class="audio-card__head">' +
        '<span class="audio-card__tag">AUDIO</span>' +
        '<div>' +
          '<p class="audio-card__title">暂无演奏音频 · 未找到</p>' +
          '<p class="audio-card__sub">' + escape(o.hint ||
            '这件乐器的录音暂时没有找到，站内先留空。') + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="audio-card__note">想让它有声，可以：① 自己录一段（或生成本站自有的合成音频）存成 ' +
      '<code>assets/audio/' + escape(o.name ? o.name + '/' : '&lt;乐器名&gt;/') + '01-xxx.mp3</code>；' +
      '② 或把来源清楚的 PD / CC0 / CC BY / CC BY-SA 录音放进同一目录，' +
      '跑一次 <code>python tools/import-audio-tracks.py</code> 就会自动生成曲目列表与署名。</p>' +
    '</section>';
  }

  function audio(rec, slotName, o) {
    var item = get(rec, 'audio', slotName || 'performance');
    var list = trackList(item);
    if (list.length) return audioCard(item);
    return audioMissing({ name: rec && rec.name, hint: o && o.hint });
  }

  function render(kind, item, o) {
    o = o || {};
    var src = item.src || item.embed || '';
    var ext = extOf(src);
    var alt = item.alt || o.alt || '';
    var cap = item.caption || o.caption || '';
    var W = {
      /* 图片一律用槽位比例（全站 16:9）：素材本身就是 16:9，
         contain 下正好铺满 —— 不裁切、不补边、不加遮挡。 */
      ratio: o.ratio,
      caption: cap, tag: labelOf(kind), spec: o.spec,
      bg: ''
    };
    var ONERR = ' onerror="window.ASSETS&amp;&amp;window.ASSETS._fail(this)"';

    if (item.embed || (kind === 'video' && src && !VIDEO_EXT.test(ext))) {
      return wrap(kind, '<iframe class="media__el" src="' + escape(item.embed || src) +
        '" loading="lazy" allowfullscreen allow="autoplay; fullscreen; picture-in-picture"' + ONERR +
        ' title="' + escape(alt || o.label || '视频') + '"></iframe>', W);
    }

    if (kind === 'video') {
      return wrap(kind, '<video class="media__el" controls playsinline preload="metadata"' + ONERR +
        (item.poster ? ' poster="' + escape(encode(item.poster)) + '"' : '') + '>' +
        '<source src="' + escape(encode(src)) + '"' +
        (ext ? ' type="video/' + (ext === 'ogv' ? 'ogg' : ext) + '"' : '') + ONERR + '>' +
        '你的浏览器不支持视频播放，可<a href="' + escape(encode(src)) + '">直接下载</a>。' +
        '</video>', W);
    }

    if (kind === 'anim') {
      if (ext === 'json') {
        /* Lottie：页面若已引入 lottie-player 就直接用，否则给友好提示而不是破图 */
        if (window.customElements && window.customElements.get('lottie-player')) {
          return wrap(kind, '<lottie-player class="media__el" src="' + escape(encode(src)) +
            '" background="transparent" speed="1" loop autoplay></lottie-player>',
            { ratio: o.ratio, caption: cap, tag: 'ANIM', spec: o.spec, bg: src });
        }
        return '<div class="media media--notice media--' + (o.ratio || '16x9') + '">' +
          '<div class="media__inner">' +
            '<span class="media__badge">Lottie</span>' +
            '<p>动画素材已就位：<code>' + escape(src) + '</code></p>' +
            '<p class="media__note">在页面里引入 <code>lottie-player</code> 后会自动播放，' +
            '或把该槽位改成 <code>.svg</code> / <code>.webm</code> 即可直接显示。</p>' +
          '</div>' +
          '<span class="media__tag">ANIM</span>' +
        '</div>';
      }
      if (/^(webm|mp4)$/.test(ext)) {
        return wrap(kind, '<video class="media__el" autoplay loop muted playsinline' + ONERR +
          ' preload="metadata"><source src="' + escape(encode(src)) + '" type="video/' + ext +
          '"' + ONERR + '></video>',
          { ratio: o.ratio, caption: cap, tag: 'ANIM', spec: o.spec });
      }
      if (ext === 'html') {
        return wrap(kind, '<iframe class="media__el" src="' + escape(encode(src)) + '"' + ONERR +
          ' loading="lazy" title="' + escape(alt || '动画') + '"></iframe>',
          { ratio: o.ratio, caption: cap, tag: 'ANIM', spec: o.spec });
      }
      /* svg / gif / webp / png / jpg 一律当图片 */
    }

    W.tag = kind === 'anim' ? 'ANIM' : 'IMG';
    return wrap(kind, '<img class="media__el" src="' + escape(encode(src)) +
      '" alt="' + escape(alt) + '" loading="lazy" decoding="async"' + ONERR + '>', W);
  }

  /* ---------- 对外：单个槽位（真实媒体 或 占位框） ---------- */

  function slot(rec, kind, slotName, o) {
    o = o || {};
    var spec = {
      kind: kind,
      key: kind + '.' + slotName,
      ratio: o.ratio || '16x9',
      title: o.phTitle || (o.label ? o.label + '占位框' : ''),
      hint: o.hint || '',
      size: o.size || ''
    };
    var item = get(rec, kind, slotName);
    /* 平台入口优先：槽位直接放二维码 */
    if (item && item.qr) return qrHTML(item, { label: o.label });
    if (item && (item.src || item.embed)) {
      return render(kind, item, {
        ratio: o.ratio, label: o.label, alt: o.alt, caption: o.caption, spec: spec
      });
    }
    return placeholder(spec);
  }

  /* ---------- 对外：状态 ---------- */

  function status(rec) {
    return SLOTS.map(function (s) {
      var item = get(rec, s.kind, s.slot);
      var mode = '';
      if (item) mode = item.qr ? 'qr' : (item.embed ? 'embed' : 'file');
      return {
        kind: s.kind,
        slot: s.slot,
        label: s.label,
        size: s.size,
        ready: !!item,
        mode: mode,
        src: item ? (item.src || item.embed || item.qr || '') : ''
      };
    });
  }

  function readyCount(rec) {
    return status(rec).filter(function (s) { return s.ready; }).length;
  }

  /* 整站素材统计 */
  function overview(list) {
    var out = { img: 0, anim: 0, video: 0, total: 0 };
    (list || []).forEach(function (rec) {
      status(rec).forEach(function (s) { if (s.ready) { out[s.kind]++; out.total++; } });
    });
    return out;
  }

  /* ---------- 对外：页面级素材 ---------- */

  function pageEntry(key) {
    var e = lookup(key);
    return e || {};
  }

  function page(key, kind, slotName, o) {
    o = o || {};
    var spec = {
      kind: kind,
      key: kind + '.' + slotName,
      ratio: o.ratio || '16x9',
      title: o.phTitle || '',
      hint: o.hint || '',
      size: o.size || ''
    };
    var e = pageEntry(key);
    var item = e[kind] ? normalize(e[kind][slotName]) : null;
    if (item && item.qr) return qrHTML(item, { label: o.label });
    if (item && (item.src || item.embed)) {
      return render(kind, item, {
        ratio: o.ratio, label: o.label, alt: o.alt, caption: o.caption, spec: spec
      });
    }
    return placeholder(spec);
  }

  function pageReady(key, kind, slotName) {
    var e = pageEntry(key);
    var item = e[kind] ? normalize(e[kind][slotName]) : null;
    return !!(item && (item.src || item.embed));
  }

  /* ---------- 暴露 ---------- */

  window.ASSETS = {
    SLOTS: SLOTS,
    KINDS: KINDS,
    PLATFORMS: PLATFORMS,
    raw: RAW,
    for: forRec,
    get: get,
    slot: slot,
    audio: audio,
    initAudio: initAudio,
    audioCard: audioCard,
    trackList: trackList,
    audioMissing: audioMissing,
    status: status,
    readyCount: readyCount,
    overview: overview,
    page: page,
    pageReady: pageReady,
    pageEntry: pageEntry,
    /* 平台入口 */
    platforms: platformsFor,
    pagePlatforms: platformsPage,
    platformCards: platformCards,
    reservedPlatforms: reservedPlatforms,
    platformMeta: metaOf,
    render: render,
    _fail: fail,
    refreshMeters: refreshMeters,
    normalize: normalize,
    extOf: extOf,
    escape: escape,
    encode: encode,
    hasAny: function () { return Object.keys(RAW).length > 0; }
  };
})();
