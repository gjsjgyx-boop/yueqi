/* ==========================================================================
   中国传统乐器 · 详情页脚本
   --------------------------------------------------------------------------
   通过 ?id=<乐器id> 渲染整页内容。
   内容结构：速览 → 概述 → 历史 → 形制 → 文化 → 当代（演奏音频）→ 曲目 → 同类

   每个内容块配一个媒体位，共 6 个：
     概述→主图(img)   历史→历史动画(anim)   形制→结构图(img)+原理动画(anim)
     文化→场景图(img) 当代→演奏音频(audio)

   媒体位由 window.ASSETS 解析 assets/manifest.js：
   放好素材就渲染真实图片/动画/视频，没放就渲染占位框。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP, U = window.UI;
  var PY = window.PY, A = window.ASSETS;
  var $ = U.$, esc = C.escape, ph = U.ph;

  var rec = D.get(U.param('id', ''));

  /* ---------- 未找到 -------------------------------------------------- */
  if (!rec) {
    $('#detailContent').hidden = true;
    $('#notFound').hidden = false;
    $('#year').textContent = String(new Date().getFullYear());
    return;
  }

  /* 把分类色挂到整页，所有 --cat 引用随之生效 */
  $('#detailRoot').setAttribute('data-cat', rec.cat);

  document.title = rec.name + '（' + PY.display(rec.pinyin) + '）· ' + rec.catName + ' | 中国传统乐器';
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', rec.name + '：' + (rec.tagline || '') + ' ' + rec.desc.slice(0, 80) + '…');

  /* ---------- 页头 ---------------------------------------------------- */
  $('#crumbs').innerHTML =
    '<a href="index.html">首页</a><span>/</span>' +
    '<a href="gallery.html">乐器图鉴</a><span>/</span>' +
    '<a href="gallery.html?cat=' + rec.cat + '">' + esc(rec.catName) + '</a><span>/</span>' +
    esc(rec.name);

  $('#title').innerHTML = '<span class="line-mask"><span>' + esc(rec.name) + '</span></span>';
  $('#pinyin').textContent = PY.display(rec.pinyin);
  $('#pinyin').setAttribute('title', '按词连写：' + PY.word(rec.pinyin) + '　音节分写：' + PY.spaced(rec.pinyin));
  $('#tagline').textContent = rec.tagline;
  $('#seal').textContent = rec.catGlyph;
  $('#headGlyph').textContent = rec.name.charAt(0);

  /* ---------- 素材状态 ------------------------------------------------ */

  var ST = {};
  if (A) A.status(rec).forEach(function (s) { ST[s.kind + '.' + s.slot] = s; });

  function isReady(kind, slot) {
    return !!(ST[kind + '.' + slot] && ST[kind + '.' + slot].ready);
  }

  /* 建议文件名：中文名优先（按名称），英文 id 亦可 */
  var SLOT_FILE = {
    'img.hero': ['头图', 'hero', '.jpg'],
    'img.explode': ['分解图', 'explode', '.png'],
    'img.main': ['主图', 'main', '.jpg'],
    'img.structure': ['结构图', 'structure', '.jpg'],
    'img.scene': ['场景图', 'scene', '.jpg'],
    'anim.history': ['历史演变', 'history', '.svg'],
    'anim.principle': ['发声原理', 'principle', '.svg'],
    'audio.performance': ['演奏', 'performance', '.mp3']
  };
  var KIND_DIR = { img: 'assets/img/', anim: 'assets/anim/', audio: 'assets/audio/', video: 'assets/video/' };
  var KIND_EXT = { img: '.jpg', anim: '.svg', audio: '.mp3', video: '.mp4' };

  function targetPath(kind, slot) {
    var f = SLOT_FILE[kind + '.' + slot];
    if (!f) return '';
    return KIND_DIR[kind] + rec.name + '-' + f[0] + (f[2] || KIND_EXT[kind]);
  }
  function targetPathAlt(kind, slot) {
    var f = SLOT_FILE[kind + '.' + slot];
    if (!f) return '';
    return KIND_DIR[kind] + rec.id + '-' + f[1] + (f[2] || KIND_EXT[kind]);
  }

  function slotHTML(kind, slot, o) {
    o = o || {};
    var meta = (ST[kind + '.' + slot] || {});
    if (!A) return ph({ kind: kind, ratio: o.ratio, title: o.phTitle, hint: o.hint, size: o.size });
    return A.slot(rec, kind, slot, {
      ratio: o.ratio,
      label: meta.label,
      alt: rec.name + ' · ' + (meta.label || ''),
      phTitle: rec.name + ' · ' + (meta.label || '') + '占位框',
      hint: o.hint || ('建议 ' + (meta.size || '').replace(/^[A-Z]+ · /, '') +
        ' · <code>' + targetPath(kind, slot) + '</code>'),
      size: meta.size
    });
  }

  /* 只有仍是占位框时才显示说明文字 */
  function note(kind, slot, html) {
    return isReady(kind, slot) ? '' : '<p class="ph-note">' + html + '</p>';
  }

  /* ---------- 名称右侧的头图 -------------------------------------------
     高度对齐左侧文字块（面包屑以下的名字 / 拼音 / 一句话），宽度 = 高 × 16/9。
     CSS 里已用 align-self:stretch + aspect-ratio 表达同一件事，
     这里再把像素尺寸写死一次，避免各浏览器对内联尺寸推算不一致。 */

  function fitHeroMedia() {
    var box = document.getElementById('heroMedia');
    var text = document.getElementById('headText');
    if (!box || !text) return;
    /* 窄屏走 CSS 的整幅布局，不写死尺寸 */
    if (window.innerWidth <= 980) {
      box.style.height = '';
      box.style.width = '';
      return;
    }
    var h = Math.round(text.getBoundingClientRect().height);
    if (!h) return;
    var parent = box.parentNode;
    var maxW = Math.round((parent ? parent.getBoundingClientRect().width : 0) * 0.46);
    var w = Math.round(h * 16 / 9);
    if (maxW && w > maxW) {                 /* 太宽就让宽度定高，仍是 16:9 */
      w = maxW;
      h = Math.round(w * 9 / 16);
    }
    box.style.height = h + 'px';
    box.style.width = w + 'px';
  }

  function mountHeroMedia() {
    var box = document.getElementById('heroMedia');
    if (!box) return;
    box.innerHTML = slotHTML('img', 'hero', {
      ratio: '16x9',
      hint: '建议 1600×900（16:9）· <code>' + targetPath('img', 'hero') + '</code>'
    });
    fitHeroMedia();
    /* 字体载入与窗口变化都会改变左列高度，重新量一次 */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeroMedia);
    window.addEventListener('resize', fitHeroMedia);
    window.addEventListener('load', fitHeroMedia);
  }

  /* ---------- 速览三联 ------------------------------------------------- */

  var BATCH_LABEL = {
    1: { t: '大众熟知', s: '★★★★' },
    2: { t: '较为常见', s: '★★★' },
    3: { t: '冷门可考', s: '★★' },
    4: { t: '生僻少见', s: '★' }
  };
  var bl = rec.devised ? { t: '推演新制 · 本站拟作', s: '第 72 件' } : (BATCH_LABEL[rec.batch] || BATCH_LABEL[2]);

  function quickCard(k, v, d) {
    return '<div class="card" data-tilt="6" data-spot style="padding:var(--sp-4)">' +
      '<span class="spot"></span>' +
      '<p class="card__title" style="margin-bottom:9px">' + esc(k) + '</p>' +
      '<p style="font-family:var(--f-serif);font-weight:900;font-size:23px;line-height:1.2;color:var(--cat)">' + v + '</p>' +
      '<p style="font-size:12px;color:var(--bone-4);margin-top:7px;line-height:1.7">' + d + '</p>' +
    '</div>';
  }

  var html = '';

  /* PPT 模版下载：放在最显眼的位置（有模版给大按钮，没有就说明"更新中"） */
  if (window.PDFDOC) html += window.PDFDOC.banner(rec);

  /* 第 72 件：顶部先把话说清楚 —— 这是设计，不是史料 */
  if (rec.devised) {
    html += '<div class="callout" style="margin-bottom:var(--sp-6);--cat:var(--cat-he)">' +
      '<p class="callout__label">先说清楚 · 这不是文物</p>' +
      '<p>「' + esc(rec.name) + '」不存在。它没有出土实物、没有传世乐谱、也没有人演奏过 —— 它是本站按现有 71 件乐器的长处推演出来的第 72 件，一件纸上的乐器。' +
      '下面每一段都是<b>设计说明</b>，不是史料。推导过程（十二条器之能 → 六组冲突 → 八条命题 → 器物设计）见 ' +
      '<a href="he.html" style="color:var(--cat);border-bottom:1px solid currentColor">设计推演专页</a>。</p>' +
    '</div>';
  }

  html += '' +
    '<div class="grid" data-stagger style="grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));margin-bottom:clamp(30px,4.5vw,52px)">' +
      quickCard('八音材质', rec.devised ? '八音俱备' : rec.bayin + ' 音', rec.devised
        ? '金石器革丝木匏竹各九，不专属一材，故标「合」' : '按制作材料分类，属八音中的「' + esc(rec.bayin) + '」') +
      quickCard('所属年代', rec.era || '—', rec.devised
        ? '设计推演的年份，不是出土年代' : '起源与流传的时间跨度') +
      quickCard('知名度', bl.s, rec.devised
        ? bl.t : bl.t + ' · 第 ' + rec.batch + ' 批收录') +
      quickCard('属性', rec.devised ? '推演' : (rec.rare ? '冷门' : '常见'),
        rec.devised ? '不是文物：本站设计，尚无人演奏'
          : (rec.rare ? '冷门或少数民族特色乐器' : '大众认知度较高')) +
    '</div>';

  /* ---------- 内容块 -------------------------------------------------- */

  function block(n, id, title, inner, reveal) {
    return '<section class="block" id="' + id + '" data-reveal="' + (reveal || 'up') + '">' +
      '<div class="block__head">' +
        '<span class="block__num">' + n + '</span>' +
        '<h2 class="block__title">' + title + '</h2>' +
        '<span class="block__line"></span>' +
      '</div>' + inner + '</section>';
  }

  function prose(text) {
    return '<div class="prose"><p>' + esc(text) + '</p></div>';
  }

  /* 01 概述 —— 3D 分解主视觉 + 文字 + 主图 */
  html += block('01', 'overview', '它是什么',
    '<div style="margin-bottom:var(--sp-6)">' +
      slotHTML('img', 'explode', { ratio: '16x9' }) +
    '</div>' +
    note('img', 'explode', '↑ <b>3D 分解图占位框</b>：这件乐器的三维爆炸分解图 —— ' +
      '把各部件按装配顺序拆开、逐个标注，是这一页的主视觉。存成 <code>' +
      targetPath('img', 'explode') + '</code>（或 <code>' + targetPathAlt('img', 'explode') +
      '</code>）后刷新即可自动替换。') +
    prose(rec.desc) +
    '<div style="margin-top:var(--sp-5)">' +
      slotHTML('img', 'main', { ratio: '16x9' }) +
    '</div>' +
    note('img', 'main', '↑ <b>图片占位框</b>：放实物正面全身照或博物馆藏品图。把素材存成 <code>' +
      targetPath('img', 'main') + '</code>（或 <code>' + targetPathAlt('img', 'main') +
      '</code>）后刷新即可自动替换。')
  );

  /* 02 历史渊源 —— 历史动画 */
  html += block('02', 'history', '历史渊源',
    prose(rec.history) +
    '<div style="margin-top:var(--sp-5)">' +
      slotHTML('anim', 'history', { ratio: '16x9' }) +
    '</div>' +
    note('anim', 'history', '↑ <b>动画占位框</b>：适合放「形制演变时间轴」或「出土文物逐个亮起」的动效。' +
      '支持 <code>.svg</code> / <code>.gif</code> / <code>.webm</code> / <code>.json</code>(Lottie) / <code>.html</code>，' +
      '存成 <code>' + targetPath('anim', 'history') + '</code>。')
  );

  /* 03 形制与音色 —— 结构图 + 原理动画（一行一张，尺寸一致，各自带说明） */
  html += block('03', 'feature', '形制与音色',
    prose(rec.feature) +
    '<div class="media-stack" style="margin-top:var(--sp-5)">' +
      '<div>' +
        slotHTML('img', 'structure', { ratio: '16x9' }) +
        note('img', 'structure', '↑ <b>图片占位框</b>（各部件名称标注图）→ <code>' +
          targetPath('img', 'structure') + '</code>') +
      '</div>' +
      '<div>' +
        slotHTML('anim', 'principle', { ratio: '16x9' }) +
        note('anim', 'principle', '↑ <b>动画占位框</b>（弦的振动、气柱的流动、鼓皮的震动都可做成循环动效）→ <code>' +
          targetPath('anim', 'principle') + '</code>') +
      '</div>' +
    '</div>'
  );

  /* 04 文化意象 —— 场景图 */
  html += block('04', 'culture', '文化意象',
    prose(rec.culture) +
    '<div class="callout" style="margin-top:var(--sp-5)">' +
      '<p class="callout__label">八音归属 · ' + esc(rec.bayin) + '</p>' +
      '<p>' + bayinText(rec.bayin) + '</p>' +
    '</div>' +
    '<div style="margin-top:var(--sp-5)">' +
      slotHTML('img', 'scene', { ratio: '16x9' }) +
    '</div>' +
    note('img', 'scene', '↑ <b>图片占位框</b>：古画、壁画、文献书影、演出剧照 → <code>' +
      targetPath('img', 'scene') + '</code>')
  );

  function bayinText(char) {
    var found = null;
    D.bayinStats().forEach(function (b) { if (b.char === char) found = b; });
    if (!found) return '八音分类中暂无对应记录。';
    return esc(found.desc) + ' 同类乐器还有：' +
      found.insts.slice(0, 8).map(function (n) { return esc(n); }).join(' · ') + '。';
  }

  /* 05 当代的回声 —— 演奏音频（播放器 + 来源信息） */
  html += block('05', 'modern', '当代的回声',
    prose(rec.modern) +
    '<div style="margin-top:var(--sp-5)">' +
      (A ? A.audio(rec, 'performance') : '') +
    '</div>' +
    '<p class="ph-note">↑ <b>演奏音频</b>：一段与这件乐器相应的曲目，只取自 <b>公共领域（PD）</b> 或' +
      '<b>知识共享（CC0 / CC BY / CC BY-SA）</b> 的录音；曲名、演奏者、作者、专辑、收录人、日期、文件时长、许可与原始链接' +
      '逐条列在播放器下方。没找到合规录音的乐器会明确标注「未找到」，不放来路不明的声音。' +
      '素材存成 <code>' + targetPath('audio', 'performance') + '</code>，' +
      '来源信息写进 <code>assets/manifest.js</code> 的 <code>audio.performance.meta</code>。</p>'
  );

  /* 06 代表曲目 */
  var worksInner;
  if (rec.works.length) {
    worksInner = '<ul class="works">' + rec.works.map(function (w) {
      return '<li>' + esc(w) + '</li>';
    }).join('') + '</ul>';
  } else {
    worksInner = '<div class="callout"><p>这件乐器属于古代遗存或极少流传的形制，没有可靠的传世独奏曲目记录。与其编一个，不如承认它留下的更多是<strong>器物本身的证据</strong>——那就够了。</p></div>';
  }
  html += block('06', 'works', '代表曲目', worksInner);

  /* 07 同类乐器（第 72 件没有同类：改列它的「优点来源」） */
  var related = D.related(rec.id, rec.devised ? 8 : 4);
  if (related.length) {
    var relTitle = rec.devised ? '它的优点来自这些乐器' : '同类乐器';
    var relBtn = rec.devised
      ? '<a class="btn btn--ghost" href="he.html" data-magnet="8" data-ripple>' +
          '<span class="btn__label">看完整的设计推演（71 件对 1 件）' +
          '<svg class="ico btn__arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
        '</a>'
      : '<a class="btn btn--ghost" href="gallery.html?cat=' + rec.cat + '" data-magnet="8" data-ripple>' +
          '<span class="btn__label">查看全部' + esc(rec.catName) + '（' + D.count(rec.cat) + ' 种）' +
          '<svg class="ico btn__arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
        '</a>';
    html += block('07', 'related', relTitle,
      (rec.devised
        ? '<p class="lede" style="margin-bottom:var(--sp-5)">下面这 8 件都没有被"合并"，它们只是各自出了一条长处 —— ' +
          '第 72 件要做的是把长处排好次序，而不是把乐器堆成一座山。</p>' : '') +
      '<div class="grid" data-stagger style="grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr))">' +
        related.map(C.instCard).join('') +
      '</div>' +
      '<div style="margin-top:var(--sp-5);text-align:center">' + relBtn + '</div>'
    );
  }

  $('#blocks').innerHTML = html;

  /* 演奏音频：多条曲目的顺序播放接线 */
  if (A && A.initAudio) A.initAudio($('#blocks'));

  /* ---------- 页头右侧头图 -------------------------------------------- */
  mountHeroMedia();

  /* ---------- 侧栏信息卡 ---------------------------------------------- */
  var kv = [];
  kv.push(['拼音', esc(PY.display(rec.pinyin)) +
    '<br><span style="color:var(--bone-4);font-size:10.5px;letter-spacing:.06em">' +
    esc(PY.spaced(rec.pinyin)) + '</span>']);
  if (rec.alias.length) kv.push(['别名', esc(rec.alias.join(' / '))]);
  kv.push(['分类', '<a href="gallery.html?cat=' + rec.cat + '" style="color:var(--cat)">' + esc(rec.catName) + '</a>']);
  kv.push(['八音', '<span style="color:var(--cat)">' +
    (rec.devised ? '八音俱备（合）' : esc(rec.bayin) + ' 音') + '</span>']);
  if (rec.era) kv.push(['年代', esc(rec.era)]);
  if (window.PDFDOC) kv.push(window.PDFDOC.kv(rec));
  kv.push(['知名度', esc(bl.s) + ' <span style="color:var(--bone-4);font-size:11px">' + esc(bl.t) + '</span>']);
  kv.push(['属性', rec.devised
    ? '<span class="chip chip--devised" style="font-size:11px">推演新制 · 非历史乐器</span>'
    : (rec.rare
      ? '<span class="chip chip--rare" style="font-size:11px">冷门 / 少数民族</span>'
      : '<span class="chip" style="font-size:11px">常见乐器</span>')]);

  var tagsHtml = '';
  var allTags = (rec.rare ? ['冷门'] : []).concat(rec.tags);
  if (allTags.length) {
    tagsHtml = '<div style="margin-top:var(--sp-4);padding-top:var(--sp-4);border-top:1px solid var(--line)">' +
      '<p class="card__title" style="border:0;padding:0;margin-bottom:10px">标签</p>' +
      '<div class="tagwall">' + allTags.map(function (t) {
        var cls = t === '冷门' ? 'chip chip--rare' : 'chip';
        return '<span class="' + cls + '">' + esc(t) + '</span>';
      }).join('') + '</div></div>';
  }

  $('#infoCard').innerHTML =
    '<p class="card__title">' + esc(rec.name) + ' · Info</p>' +
    '<div class="kv">' + kv.map(function (r) {
      return '<div class="kv__row"><span class="kv__k">' + r[0] + '</span><span class="kv__v">' + r[1] + '</span></div>';
    }).join('') + '</div>' + tagsHtml;

  /* ---------- 目录 + 滚动高亮 ----------------------------------------- */
  var TOC = [
    ['overview', '它是什么'], ['history', '历史渊源'], ['feature', '形制与音色'],
    ['culture', '文化意象'], ['modern', '当代的回声'], ['works', '代表曲目'],
    ['related', '同类乐器']
  ].filter(function (t) { return document.getElementById(t[0]); });

  $('#toc').innerHTML = TOC.map(function (t) {
    return '<a href="#' + t[0] + '">' + t[1] + '</a>';
  }).join('');

  if ('IntersectionObserver' in window) {
    var links = U.$$('#toc a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-on', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });
    TOC.forEach(function (t) {
      var n = document.getElementById(t[0]);
      if (n) spy.observe(n);
    });
  }

  /* ---------- 上 / 下一个 -------------------------------------------- */
  var prev = D.step(rec.id, -1);
  var next = D.step(rec.id, 1);
  var pagerHtml = '';
  if (prev) {
    pagerHtml += '<a class="pager__item" href="detail.html?id=' + encodeURIComponent(prev.id) + '" data-cat="' + prev.cat + '">' +
      '<span class="pager__dir">← 上一个 · ' + esc(prev.catName) + '</span>' +
      '<span class="pager__name">' + esc(prev.name) + '</span></a>';
  }
  if (next) {
    pagerHtml += '<a class="pager__item pager__item--next" href="detail.html?id=' + encodeURIComponent(next.id) + '" data-cat="' + next.cat + '">' +
      '<span class="pager__dir">下一个 · ' + esc(next.catName) + ' →</span>' +
      '<span class="pager__name">' + esc(next.name) + '</span></a>';
  }
  $('#pager').innerHTML = pagerHtml;
  $('#pager').style.gridTemplateColumns = (prev && next) ? '1fr 1fr' : '1fr';

  $('#year').textContent = String(new Date().getFullYear());
})();
