/* ==========================================================================
   中国传统乐器 · 关于页脚本（渲染全部乐器索引）
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP;
  var $ = window.UI.$, esc = C.escape;

  /* 全部乐器索引：按四大类 + 合鸣新制分组，列出可点击的名称 + id */
  function allIndex() {
    var host = $('#allIndex');
    if (!host) return;

    host.innerHTML = D.catOrder.map(function (k) {
      var cat = D.cats[k];
      var list = D.byCat(k);
      var items = list.map(function (r, i) {
        return '<a class="idx-item" data-cat="' + k + '" href="detail.html?id=' + encodeURIComponent(r.id) + '">' +
          '<span class="idx-item__n">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="idx-item__name">' + esc(r.name) + (r.rare ? '<em class="idx-item__rare">冷门</em>' : '') + '</span>' +
          '<span class="idx-item__id">' + esc(r.id) + '</span>' +
        '</a>';
      }).join('');

      return '<section style="margin-bottom:var(--sp-7)" data-reveal="up">' +
        '<div class="block__head" style="margin-bottom:var(--sp-4)">' +
          '<span class="block__num">' + cat.idx + '</span>' +
          '<h3 class="block__title" style="font-size:clamp(19px,2.2vw,24px)">' + esc(cat.name) + '</h3>' +
          '<span class="block__count">' + list.length + ' 种</span>' +
          '<span class="block__line"></span>' +
        '</div>' +
        '<div class="idx-grid" data-cat="' + k + '">' + items + '</div>' +
      '</section>';
    }).join('');
  }

  allIndex();

  /* PPT 模版清单（由 assets/pdf-manifest.js 提供） */
  (function templates() {
    var host = document.getElementById('tplGrid');
    if (!host || !window.PDFDOC) return;
    host.innerHTML = window.PDFDOC.list();
    window.UI.FX.all(host);
    var m = window.PDFDOC.meta();
    var n = document.getElementById('tplCount');
    if (n) n.textContent = String(m.count);
    var s = document.getElementById('tplScan');
    if (s && m.scannedAt) s.textContent = '最后核对：' + m.scannedAt;
  })();

  var rt = $('#rareTotal'); if (rt) rt.textContent = String(D.rareCount());
  var it = $('#idxTotal'); if (it) it.textContent = String(D.all.length);

  var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());
})();
