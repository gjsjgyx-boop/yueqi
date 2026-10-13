/* ==========================================================================
   二维码渲染 · QR
   --------------------------------------------------------------------------
   基于本地收录的 qrcode-generator（js/vendor/qrcode.js，MIT）。
   全部离线生成，不发任何外部请求 —— file:// 直接打开也能用。

   已用 jsQR 做过 11 组往返解码验证（含中文 URL、v21 长链接）。

   暴露 window.QR
     .available()                运行库是否就绪
     .svg(text, opts)            内联 SVG 字符串
     .matrix(text, opts)         模块矩阵
     .dataURL(text, opts)        data:image/svg+xml;base64,...
     .panel(url, opts)           平台入口卡片（二维码 + 说明 + 文字链接）
     .placeholder(opts)          预留态的平台入口卡片
   ========================================================================== */
(function () {
  'use strict';

  var LIB = (typeof qrcode === 'function') ? qrcode : (window.qrcode || null);

  /* 启用 UTF-8 支持：平台链接偶尔会带中文路径 */
  if (LIB && LIB.stringToBytesFuncs && LIB.stringToBytesFuncs['UTF-8']) {
    try { LIB.stringToBytes = LIB.stringToBytesFuncs['UTF-8']; } catch (e) { /* 忽略 */ }
  }

  var cache = {};
  var CACHE_MAX = 240;

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function matrix(text, opts) {
    if (!LIB || !text) return null;
    opts = opts || {};
    try {
      var qr = LIB(0, opts.ec || 'M');   /* 0 = 自动选择版本 */
      qr.addData(String(text), 'Byte');
      qr.make();
      return qr;
    } catch (e) {
      return null;                        /* 内容过长等：交给调用方降级 */
    }
  }

  /* 内联 SVG —— 横向游程合并成 path，比逐模块 <rect> 小得多 */
  function svg(text, opts) {
    opts = opts || {};
    if (!LIB || !text) return '';
    var ec = opts.ec || 'M';
    var margin = (opts.margin === undefined) ? 2 : opts.margin;
    /* 二维码必须深色模块 + 浅色底，且四周留白，否则很多扫码器识别不出来 */
    var fg = opts.fg || '#0A0C12';
    var bg = opts.bg || '#FFFFFF';
    var key = ec + '|' + margin + '|' + fg + '|' + bg + '|' + text;
    if (cache[key]) return cache[key];

    var qr = matrix(text, opts);
    if (!qr) return '';

    var n = qr.getModuleCount();
    var size = n + margin * 2;
    var d = '';
    for (var r = 0; r < n; r++) {
      var c = 0;
      while (c < n) {
        if (qr.isDark(r, c)) {
          var start = c;
          while (c < n && qr.isDark(r, c)) c++;
          var len = c - start;
          d += 'M' + (start + margin) + ' ' + (r + margin) +
               'h' + len + 'v1h-' + len + 'z';
        } else {
          c++;
        }
      }
    }

    var out = '<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size +
      '" shape-rendering="crispEdges" role="img" aria-label="二维码：' + esc(text) + '">' +
      '<rect width="' + size + '" height="' + size + '" fill="' + bg + '"/>' +
      '<path d="' + d + '" fill="' + fg + '"/>' +
      '</svg>';

    var keys = Object.keys(cache);
    if (keys.length >= CACHE_MAX) cache = {};
    cache[key] = out;
    return out;
  }

  function dataURL(text, opts) {
    var s = svg(text, opts);
    if (!s) return '';
    try {
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s)));
    } catch (e) {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
    }
  }

  /* 平台入口卡片：二维码 + 平台名 + 说明 + 可点的文字链接（桌面端扫不了自己的屏幕） */
  function panel(url, o) {
    o = o || {};
    var code = svg(url, { ec: o.ec || 'M', margin: 2 });
    var plat = o.platform || '';
    var color = o.color || 'var(--gold)';

    var body = '' +
      '<div class="qr-panel__body">' +
        (plat ? '<span class="qr-panel__plat">' + esc(plat) + '</span>' : '') +
        '<p class="qr-panel__label">' + esc(o.label || '扫码打开') + '</p>' +
        (o.desc ? '<p class="qr-panel__desc">' + esc(o.desc) + '</p>' : '') +
        '<p class="qr-panel__hint">' + esc(o.hint || '手机相机 / 微信「扫一扫」') + '</p>' +
        (url ? '<a class="qr-panel__url" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
          '在电脑上打开 <span aria-hidden="true">↗</span></a>' : '') +
        (url ? '<span class="qr-panel__raw" title="' + esc(url) + '">' + esc(url) + '</span>' : '') +
      '</div>';

    if (!code) {
      /* 链接过长或库不可用：不显示二维码，改为纯文字入口，绝不显示空白方块 */
      return '<div class="qr-panel qr-panel--nofill" data-plat="' + esc(o.key || '') + '" ' +
        'style="--qr:' + color + '">' +
        '<div class="qr-panel__code qr-panel__code--static qr-panel__code--none">' +
          '<span class="qr-panel__nofill">链接过长<br>无法生成二维码</span>' +
        '</div>' + body + '</div>';
    }

    return '<div class="qr-panel" data-plat="' + esc(o.key || '') + '" style="--qr:' + color + '">' +
      '<button type="button" class="qr-panel__code" data-qr="' + esc(url) + '"' +
        ' data-qr-plat="' + esc(plat) + '" data-qr-label="' + esc(o.label || '') + '"' +
        ' title="点开放大二维码" aria-label="放大二维码以便扫描">' +
        code + '<span class="qr-panel__scan" aria-hidden="true"></span>' +
        '<span class="qr-panel__zoom" aria-hidden="true">放大</span>' +
      '</button>' + body + '</div>';
  }

  /* 预留态：还没填链接时显示的占位卡片 */
  function placeholder(o) {
    o = o || {};
    var color = o.color || 'var(--bone-4)';
    return '<div class="qr-panel qr-panel--ph" data-plat="' + esc(o.key || '') + '" ' +
      'style="--qr:' + color + '">' +
      '<div class="qr-panel__code qr-panel__code--static qr-panel__code--ph">' +
        '<svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
          '<g fill="none" stroke="currentColor" stroke-width="1" opacity=".5">' +
            '<rect x="1.5" y="1.5" width="7" height="7"/><rect x="24.5" y="1.5" width="7" height="7"/>' +
            '<rect x="1.5" y="24.5" width="7" height="7"/>' +
          '</g>' +
          '<g fill="currentColor" opacity=".55">' +
            '<rect x="3.5" y="3.5" width="3" height="3"/><rect x="26.5" y="3.5" width="3" height="3"/>' +
            '<rect x="3.5" y="26.5" width="3" height="3"/>' +
            '<rect x="12" y="12" width="2" height="2"/><rect x="16" y="12" width="2" height="2"/>' +
            '<rect x="20" y="15" width="2" height="2"/><rect x="12" y="17" width="2" height="2"/>' +
            '<rect x="17" y="19" width="2" height="2"/><rect x="21" y="21" width="2" height="2"/>' +
          '</g>' +
        '</svg>' +
        '<span class="qr-panel__scan" aria-hidden="true"></span>' +
      '</div>' +
      '<div class="qr-panel__body">' +
        (o.platform ? '<span class="qr-panel__plat">' + esc(o.platform) + '</span>' : '') +
        '<p class="qr-panel__label">扫码入口待填</p>' +
        '<p class="qr-panel__hint">' + (o.hint || '在 assets/manifest.js 里填 platform 链接') + '</p>' +
      '</div>' +
    '</div>';
  }

  /* ---------- 放大查看：小二维码在屏幕上不一定好扫，点开就是大图 ---------- */

  var zoomEl = null;

  function closeZoom() {
    if (!zoomEl) return;
    zoomEl.classList.remove('is-on');
    var el = zoomEl;
    zoomEl = null;
    window.setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, 260);
    document.removeEventListener('keydown', onKey);
    document.documentElement.classList.remove('qr-zoom-open');
  }

  function onKey(e) { if (e.key === 'Escape') closeZoom(); }

  function openZoom(url, plat, label) {
    closeZoom();
    var code = svg(url, { ec: 'M', margin: 3 });
    if (!code) return;

    zoomEl = document.createElement('div');
    zoomEl.className = 'qr-zoom';
    zoomEl.setAttribute('role', 'dialog');
    zoomEl.setAttribute('aria-modal', 'true');
    zoomEl.setAttribute('aria-label', '二维码大图');
    zoomEl.innerHTML =
      '<div class="qr-zoom__backdrop" data-qr-close></div>' +
      '<div class="qr-zoom__box">' +
        '<button type="button" class="qr-zoom__close" data-qr-close aria-label="关闭">✕</button>' +
        (plat ? '<span class="qr-zoom__plat">' + esc(plat) + '</span>' : '') +
        '<div class="qr-zoom__code">' + code + '</div>' +
        (label ? '<p class="qr-zoom__label">' + esc(label) + '</p>' : '') +
        '<p class="qr-zoom__hint">用手机相机或微信「扫一扫」</p>' +
        '<a class="qr-zoom__url" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
          esc(url.length > 64 ? url.slice(0, 61) + '…' : url) + '</a>' +
      '</div>';

    document.body.appendChild(zoomEl);
    document.documentElement.classList.add('qr-zoom-open');
    /* 强制回流后再加 class，保证过渡动画生效 */
    void zoomEl.offsetWidth;
    zoomEl.classList.add('is-on');
    document.addEventListener('keydown', onKey);
  }

  /* 事件委托：面板是动态插入的，用一次全局监听即可 */
  if (!window.__qrZoomBound) {
    window.__qrZoomBound = true;
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var closer = t.closest('[data-qr-close]');
      if (closer) { e.preventDefault(); closeZoom(); return; }
      var btn = t.closest('[data-qr]');
      if (btn) {
        e.preventDefault();
        openZoom(btn.getAttribute('data-qr'),
          btn.getAttribute('data-qr-plat'),
          btn.getAttribute('data-qr-label'));
      }
    });
  }

  window.QR = {
    available: function () { return !!LIB; },
    svg: svg,
    matrix: matrix,
    dataURL: dataURL,
    panel: panel,
    placeholder: placeholder,
    zoom: openZoom,
    closeZoom: closeZoom,
    LIMIT: 2331
  };
})();
