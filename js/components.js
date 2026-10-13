/* ==========================================================================
   中国传统乐器 · 共享组件渲染
   --------------------------------------------------------------------------
   暴露 window.COMP
     instCard(rec)  乐器卡片（首页 / 图鉴共用）
     catCard(cat)   分类卡片
     bayinCell(b)   八音小格
     escape(str)    HTML 转义
   ========================================================================== */
(function () {
  'use strict';

  var PY = window.PY;

  function escape(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- 乐器卡片 ------------------------------------------------ */

  /* 卡片配图：优先主图，其次场景图 / 结构图 / 图解。
     素材来自 assets/manifest.js（有就上屏，没有就还是纯文字卡）。 */
  /* 卡片配图的优先级：实物主图 → 页头特写 → 场景 → 结构 → 3D 分解图 → 原理 → 历史。
     hero / explode 也纳入，这样只有特写或只有分解图的乐器在卡片上也有图。 */
  var CARD_IMG_ORDER = [
    ['img', 'main'], ['img', 'hero'], ['img', 'scene'], ['img', 'structure'],
    ['img', 'explode'], ['anim', 'principle'], ['anim', 'history']
  ];

  function cardImage(rec, order) {
    var A = window.ASSETS;
    if (!A || !A.get) return null;
    var list = order || CARD_IMG_ORDER;
    for (var i = 0; i < list.length; i++) {
      var item = A.get(rec, list[i][0], list[i][1]);
      if (item && item.src) return { src: item.src, caption: item.caption || '' };
    }
    return null;
  }

  /* 分类卡片的代表图优先用「乐器特写」：卡片图区只有 250px 宽，
     整页课件缩到那么小会看不清，抠图特写反而最清楚 */
  var CAT_IMG_ORDER = [
    ['img', 'hero'], ['img', 'explode'], ['img', 'main'],
    ['img', 'scene'], ['img', 'structure']
  ];

  function enc(p) {
    try { return encodeURI(String(p)); } catch (e) { return String(p); }
  }

  function instCard(rec) {
    var alias = rec.alias.slice(0, 3).join(' · ');
    var chips = '';
    /* 角标：第 72 件「推演新制」优先于「冷门」 */
    var special = rec.devised ? '推演新制' : (rec.rare ? '冷门' : '');
    if (special) {
      chips += '<span class="chip ' + (rec.devised ? 'chip--devised' : 'chip--rare') + '">' +
        special + '</span>';
    }
    var bayinLabel = rec.devised ? '八音俱备' : escape(rec.bayin) + '音';
    chips += '<span class="chip">' + bayinLabel + '</span>';
    /* 有 PPT 模版的乐器在卡片上就标出来（点进详情页即可下载） */
    if (window.PDFDOC) chips += window.PDFDOC.chip(rec);
    rec.tags.filter(function (t) {
      return t !== special && t !== bayinLabel;
    }).slice(0, 1).forEach(function (t) {
      chips += '<span class="chip">' + escape(t) + '</span>';
    });

    /* 有图就在卡片顶部放一个 16:9 图区：图片完整显示，文字在图下方，
       不压图、不裁切、不补边（见 style.css 的 .inst__media）。
       还没有素材的卡片用同样大小的空图区占位，网格高度才整齐。 */
    var pic = cardImage(rec);
    var media = pic
      ? '<span class="inst__media">' +
          '<img class="inst__img" src="' + escape(enc(pic.src)) + '" alt="" loading="lazy" decoding="async">' +
        '</span>'
      : '<span class="inst__media inst__media--void" aria-hidden="true">' +
          '<span class="inst__void">IMG · 待补</span>' +
        '</span>';

    return '' +
      '<a class="inst' + (pic ? ' inst--has-pic' : '') + '" data-cat="' + rec.cat + '" data-tilt="7" data-ripple ' +
        'href="detail.html?id=' + encodeURIComponent(rec.id) + '" ' +
        'aria-label="' + escape(rec.name) + ' 详情">' +
        '<span class="inst__bar"></span>' +
        '<span class="spot"></span>' +
        media +
        '<div class="inst__top">' +
          '<div>' +
            (rec.pinyin && rec.pinyin.length
              ? '<p class="inst__pinyin">' + escape(PY.display(rec.pinyin)) + '</p>'
              : '') +
            '<h3 class="inst__name">' + escape(rec.name) + '</h3>' +
            (alias ? '<p class="inst__alias">' + escape(alias) + '</p>' : '') +
          '</div>' +
        '</div>' +
        (rec.tagline ? '<p class="inst__tagline">' + escape(rec.tagline) + '</p>' : '') +
        '<span class="inst__wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' +
        '<div class="inst__foot">' +
          '<div class="inst__tags">' + chips + '</div>' +
          '<span class="inst__go" aria-hidden="true">' +
            '<svg class="ico" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          '</span>' +
        '</div>' +
      '</a>';
  }

  /* ---------- 分类卡片 ------------------------------------------------ */

  /* 分类卡片的去向：默认进图鉴筛选；
     「合鸣新制」只有一件，直接进它的设计推演专页更有用 */
  function catHref(cat) {
    return cat.page || ('gallery.html?cat=' + cat.key);
  }

  function catCard(cat, count) {
    var preview = cat.preview.map(function (n) {
      return '<span>' + escape(n) + '</span>';
    }).join('');
    var badge = cat.badge
      ? '<span class="cat-card__badge">' + escape(cat.badge) + '</span>'
      : '';
    /* 代表图：取该类的代表乐器在素材清单里的第一张图（没有就整块不显示） */
    var rep = cat.rep && window.SITE_DATA ? window.SITE_DATA.get(cat.rep) : null;
    var pic = rep ? cardImage(rep, CAT_IMG_ORDER) : null;
    var media = pic
      ? '<span class="cat-card__media"><img src="' + escape(enc(pic.src)) + '" alt="' +
          escape(rep.name) + '" loading="lazy" decoding="async"></span>'
      : '';
    return '' +
      '<a class="cat-card' + (pic ? ' cat-card--has-pic' : '') + '" data-cat="' + cat.key + '" href="' + catHref(cat) + '" ' +
        'data-tilt="5" data-spot data-ripple>' +
        '<span class="spot"></span>' +
        badge +
        '<span class="cat-card__idx">' + cat.idx + ' / ' + cat.en.toUpperCase() + '</span>' +
        '<span class="cat-card__glyph" aria-hidden="true">' + cat.glyph + '</span>' +
        media +
        '<div class="cat-card__body">' +
          '<h3 class="cat-card__name">' + escape(cat.name) + '</h3>' +
          '<p class="cat-card__en">' + escape(cat.short) + '</p>' +
          '<p class="cat-card__desc">' + escape(cat.desc) + '</p>' +
          '<div class="cat-card__list">' + preview + '</div>' +
        '</div>' +
        '<div class="cat-card__foot">' +
          '<span>COLLECTION</span>' +
          '<span class="cat-card__count">' + count + ' <span style="font-size:11px;font-family:var(--f-mono)">种</span></span>' +
        '</div>' +
      '</a>';
  }

  /* ---------- 八音小格 ------------------------------------------------ */

  function bayinCell(b) {
    var en = (b.mat.split('·')[1] || b.mat).trim();
    return '' +
      '<a class="bayin-cell' + (b.extra ? ' bayin-cell--all' : '') + '" ' +
        'href="' + (b.extra && window.SITE_DATA && window.SITE_DATA.get('he')
          ? 'detail.html?id=he' : 'culture.html#bayin') + '" title="' + escape(b.desc) + '">' +
        '<div class="bayin-cell__char">' + escape(b.char) + '</div>' +
        '<div class="bayin-cell__mat">' + escape(en) + '</div>' +
        '<div class="bayin-cell__n">' + (b.extra ? '八音俱备 · 第 72 件' : b.n + ' 种') + '</div>' +
      '</a>';
  }

  window.COMP = {
    escape: escape,
    instCard: instCard,
    catCard: catCard,
    bayinCell: bayinCell
  };
})();
