/* ==========================================================================
   中国传统乐器 · 八音文化页脚本
   --------------------------------------------------------------------------
   1. 八音大卡（代表乐器直达详情页）
   2. 八千年时间轴
   3. 冷门 / 少数民族乐器专区
   4. 页面级媒体位：八音关系图（anim.map，紧跟 banner）
      + 八音发声原理（金 · 石 · 土 · 革 · 丝 · 木 · 匏 · 竹 各一张，anim.jin…zhu）
      + 入门纪录片(video)
      素材存在时渲染真实媒体，否则渲染占位框。
      对应 assets/manifest.js 中按名称索引的条目：「八音关系图」「八音发声原理」「纪录片」
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP, A = window.ASSETS;
  var $ = window.UI.$, esc = C.escape;

  /* ---------- 八音大卡 ------------------------------------------------ */
  function bayinGrid() {
    var host = $('#bayinGrid');
    if (!host) return;
    host.innerHTML = D.bayinStats().map(function (b) {
      /* 把乐器名转成直达详情页的链接 */
      var links = b.insts.map(function (name) {
        var rec = null;
        D.all.forEach(function (x) { if (x.name === name) rec = x; });
        return rec
          ? '<a href="detail.html?id=' + encodeURIComponent(rec.id) + '" style="color:inherit;border-bottom:1px solid var(--line-2)">' + esc(name) + '</a>'
          : esc(name);
      }).join(' · ');

      return '<article class="bayin-card" data-tilt="7" data-spot style="--bc:' + b.color + '">' +
        '<span class="spot"></span>' +
        '<span class="bayin-card__char">' + esc(b.char) + '</span>' +
        '<p class="bayin-card__mat">' + esc(b.mat) + ' · 本站收录 ' + b.n + ' 种</p>' +
        '<p class="bayin-card__desc">' + esc(b.desc) + '</p>' +
        '<p class="bayin-card__inst"><b>代表乐器</b> · ' + links + '</p>' +
      '</article>';
    }).join('');
  }

  /* ---------- 时间轴 -------------------------------------------------- */
  /* 前八个节点是历史，最后一个是本站的推演（第 72 件「龢」），
     所以它单独带虚线框、虚线圆点与「推演新制」角标，并直通设计推演专页。 */
  function timeline() {
    var host = $('#timeline');
    if (!host) return;
    host.innerHTML = D.timeline.map(function (t) {
      return '<article class="tl-item' + (t.devised ? ' tl-item--devised' : '') + '">' +
        '<p class="tl-item__era">' + esc(t.era) + '</p>' +
        '<h3 class="tl-item__title">' + esc(t.title) +
          (t.devised ? ' <span class="chip chip--devised" style="font-size:10px;vertical-align:middle">推演新制</span>' : '') +
        '</h3>' +
        '<p>' + esc(t.text) + '</p>' +
        (t.link
          ? '<div class="tl-item__cta"><a class="btn btn--ghost" href="' + esc(t.link) + '" data-magnet="8" data-ripple>' +
              '<span class="btn__label">看这件乐器怎么推出来的' +
              '<svg class="ico btn__arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
            '</a></div>'
          : '') +
      '</article>';
    }).join('');
    window.UI.FX.all(host);
  }

  /* ---------- 冷门乐器 ------------------------------------------------ */
  function rareGrid() {
    var host = $('#rareGrid');
    if (!host) return;
    var list = D.all.filter(function (x) { return x.rare; }).slice(0, 12);
    host.innerHTML = list.map(C.instCard).join('');
  }

  /* ---------- 页面级媒体位 -------------------------------------------- */

  function mountMedia(hostId, titleId, key, kind, slot, o) {
    var host = document.getElementById(hostId);
    if (!host) return;
    var ready = A ? A.pageReady(key, kind, slot) : false;
    host.innerHTML = A
      ? A.page(key, kind, slot, o)
      : '';

    /* 标题与说明随就位状态变化 */
    var title = document.getElementById(titleId);
    if (title) {
      title.textContent = o.heading + (ready ? '' : ' · 占位框');
    }
    if (!ready && o.note) {
      var p = document.createElement('p');
      p.className = 'ph-note';
      p.innerHTML = o.note;
      host.parentNode.insertBefore(p, host.nextSibling);
    }
  }

  /* ---------- 平台入口（已按需求移除该区块） ----------
   culture.html 不再有 #platforms 容器，platformSection() 保持空转；
   想恢复时在页面加 <div id="platforms"></div> 并重新调用即可。 */
  function platformSection() {
    var host = document.getElementById("platforms");
    if (!host || !window.QR) return;
    var list = A ? A.pagePlatforms("小红书合集") : [];
    host.innerHTML = '<div class="qr-card-grid" data-stagger>' +
      (A ? A.platformCards(list) : '') + '</div>';
  }

  bayinGrid();
  timeline();
  rareGrid();

  mountMedia('bayinAnim', 'bayinAnimTitle', '八音关系图', 'anim', 'map', {
    heading: '八音关系图',
    ratio: '16x9',
    phTitle: '八音关系图占位框',
    hint: '把图存成 <code>assets/anim/八音关系图-02.jpg</code>',
    size: 'ANIM · 1600×900'
  });

  /* 八音各自的发声原理：金 · 石 · 土 · 革 · 丝 · 木 · 匏 · 竹 各一张，
     每张图下面配该类的说明（材料特性 + 发声方式 + 本站收录的乐器）。 */
  function bayinPrinciples() {
    var host = document.getElementById('bayinPrinciples');
    if (!host) return;
    var list = [
      ['金', 'jin'], ['石', 'shi'], ['土', 'tu'], ['革', 'ge'],
      ['丝', 'si'], ['木', 'mu'], ['匏', 'pao'], ['竹', 'zhu']
    ];
    var stats = {};
    if (D && D.bayinStats) D.bayinStats().forEach(function (b) { stats[b.char] = b; });

    var ready = 0;
    host.innerHTML = '<div class="bayin-media-grid">' + list.map(function (p) {
      var ok = A && A.pageReady('八音发声原理', 'anim', p[1]);
      if (ok) ready++;
      var media = A
        ? A.page('八音发声原理', 'anim', p[1], {
            ratio: '16x9',
            phTitle: p[0] + '类乐器发声原理占位框',
            hint: '把图存成 <code>assets/anim/八音发声原理-' + p[0] + '.jpg</code>',
            size: 'ANIM · 1600×900'
          })
        : '';
      var b = stats[p[0]] || {};
      var links = (b.insts || []).map(function (name) {
        var rec = null;
        D.all.forEach(function (x) { if (x.name === name) rec = x; });
        return rec
          ? '<a href="detail.html?id=' + encodeURIComponent(rec.id) + '">' + esc(name) + '</a>'
          : esc(name);
      }).join(' · ');
      return '<div class="bayin-media" data-mat="' + p[0] + '">' + media +
          '<div class="bayin-media__cap">' +
            '<span class="bayin-media__char" aria-hidden="true">' + p[0] + '</span>' +
            '<span class="bayin-media__text">' +
              '<b>' + p[0] + ' · ' + esc(b.mat || '') + '　本站收录 ' + (b.n || 0) + ' 种</b>' +
              '<span class="bayin-media__desc">' + esc(b.desc || '') + '</span>' +
              (links ? '<span class="bayin-media__inst">代表乐器 · ' + links + '</span>' : '') +
            '</span>' +
          '</div>' +
        '</div>';
    }).join('') + '</div>';

    var title = document.getElementById('bayinPrinciplesTitle');
    if (title) {
      title.textContent = '八音各自的发声原理' + (ready >= list.length ? '' : '（' + ready + ' / ' + list.length + ' 就位）');
    }
    if (window.UI && UI.FX) UI.FX.all(host);
  }

  bayinPrinciples();

  mountMedia('docVideo', 'docVideoTitle', '纪录片', 'video', 'main', {
    heading: '入门纪录片',
    ratio: '16x9',
    phTitle: '中国乐器纪录片占位框',
    hint: '建议 1920×1080 · <code>assets/video/纪录片-main.mp4</code>',
    size: 'VIDEO · 1920×1080',
    note: '↑ <b>视频占位框</b>：适合放一部 3–10 分钟的入门纪录片，或把八种材料的发声片段剪成一条对照组。' +
      '存成 <code>assets/video/纪录片-main.mp4</code>，或在 <code>assets/manifest.js</code> 里用 <code>{ embed: "视频平台链接" }</code> 嵌入。'
  });

  var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());
})();
