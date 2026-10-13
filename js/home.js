/* ==========================================================================
   中国传统乐器 · 首页脚本
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP, $ = window.UI.$;

  function num(n) { return '<span class="count" data-count="' + n + '">0</span>'; }

  /* Hero 下方三组数字 */
  function heroStats() {
    var host = $('#heroStats');
    if (!host) return;
    var items = [
      { n: D.all.length, label: '种乐器' },
      { n: D.catOrder.length, label: '大分类' },
      { n: D.bayin.length, label: '八音材质' },
      { n: D.rareCount(), label: '冷门 / 少数民族' }
    ];
    host.innerHTML = items.map(function (it) {
      return '<div class="stat"><span class="stat__num">' + num(it.n) + '</span>' +
        '<span class="stat__label">' + it.label + '</span></div>';
    }).join('');
  }

  /* 数据概览卡片 */
  function statGrid() {
    var host = $('#statGrid');
    if (!host) return;
    var cards = [
      { k: '乐器总数', v: D.all.length, u: '种', d: '四大类 71 件历史乐器，外加 1 件推演新制的第 72 件「龢」，每件都有独立详情页。' },
      { k: '冷门与少数民族', v: D.rareCount(), u: '种', d: '筚篥、芒筒、独弦琴、象脚鼓……大众陌生，但分量很重。' },
      { k: '八音材质', v: D.bayin.length, u: '类', d: '金 · 石 · 土 · 革 · 丝 · 木 · 匏 · 竹，世界上最早的乐器分类法之一。' },
      { k: '历史跨度', v: 9000, u: '年', d: '从贾湖骨笛到今天电影与游戏配乐里的国风采样。' }
    ];
    host.innerHTML = cards.map(function (c) {
      return '<div class="card" data-tilt="6" data-spot>' +
        '<span class="spot"></span>' +
        '<p class="card__title">' + c.k + '</p>' +
        '<div class="stat">' +
          '<span class="stat__num" style="color:var(--gold)">' + num(c.v) +
            '<span style="font-size:13px;font-family:var(--f-mono);color:var(--bone-4);margin-left:5px">' + c.u + '</span>' +
          '</span>' +
        '</div>' +
        '<p style="font-size:13px;color:var(--bone-3);margin-top:10px;line-height:1.8">' + c.d + '</p>' +
      '</div>';
    }).join('');
  }

  /* 四大类 + 一件推演新制 */
  function catGrid() {
    var host = $('#catGrid');
    if (!host) return;
    host.innerHTML = D.catOrder.map(function (k) {
      return C.catCard(D.cats[k], D.count(k));
    }).join('');
  }

  /* 精选乐器 */
  function featGrid() {
    var host = $('#featGrid');
    if (!host) return;
    host.innerHTML = D.featured(8).map(C.instCard).join('');
  }

  /* 八音小格 */
  function bayinStrip() {
    var host = $('#bayinStrip');
    if (!host) return;
    host.innerHTML = D.bayinStats().map(C.bayinCell).join('');
  }

  /* 乐器图墙：每次刷新随机挑一批
     ------------------------------------------------------------------
     优先抽「清楚好认」的图：乐器特写（hero，透明底抠图）与 3D 爆炸分解图（explode）；
     课件整页图（main）文字多、缩到 200 多像素宽会糊成一团，排在其后。
     同一类最多 3 件，避免整面墙都是竹管乐器；8 个位置每次刷新都换。 */
  var WALL_N = 8;

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function wall() {
    var host = $('#wallGrid');
    if (!host) return;
    var M = window.ASSET_MANIFEST || {};
    var all = [];

    D.all.forEach(function (rec) {
      var o = M[rec.name];
      if (!o) return;
      var m = (o.img || {}).main;
      var src = m ? (typeof m === 'string' ? m : m.src) : '';
      if (src) all.push({ rec: rec, src: src });
    });

    var shuffle = function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
      return arr;
    };

    /* 随机抽，但同一类最多 3 件 —— 既保证每次刷新都换一批，
       又不会整面墙都是竹管乐器。类内「特写 / 3D 分解图」优先于课件整页图。 */
    var per = {}, picked = [];
    all = shuffle(all);
    all.forEach(function (p) {
      if (picked.length >= WALL_N) return;
      var k = p.rec.cat || 'other';
      if ((per[k] || 0) >= 3) return;
      per[k] = (per[k] || 0) + 1;
      picked.push(p);
    });
    if (picked.length < WALL_N) {                    /* 类别受限时放宽补满 */
      all.forEach(function (p) {
        if (picked.length < WALL_N && picked.indexOf(p) === -1) picked.push(p);
      });
    }
    if (!picked.length) return;

    /* 排布：按类轮流铺开，避免同类三张挨在一起 */
    var groups = {}, order = [];
    picked.forEach(function (p) {
      var k = p.rec.cat || 'other';
      (groups[k] = groups[k] || []).push(p);
    });
    D.catOrder.concat(['other']).forEach(function (k) {
      if (groups[k]) order.push(groups[k]);
    });
    var pool = [];
    for (var round = 0; pool.length < picked.length && round < WALL_N; round++) {
      order.forEach(function (g) { if (g[round]) pool.push(g[round]); });
    }

    host.innerHTML = pool.map(function (p) {
      return '<a class="wall__item" href="detail.html?id=' + encodeURIComponent(p.rec.id) + '"' +
        ' data-tilt="6" data-ripple>' +
        '<span class="wall__pic"><img src="' + encodeURI(p.src) + '" alt="' + esc(p.rec.name) +
          ' 图片" loading="lazy" decoding="async"></span>' +
        '<span class="wall__name">' + esc(p.rec.name) + '</span>' +
      '</a>';
    }).join('');

    if (window.UI) {
      if (window.UI.FX) window.UI.FX.all(host);
      if (window.UI.Reveal && window.UI.Reveal.init) window.UI.Reveal.init();
    }
  }

  /* 首页主图：按时段自动切换
     ------------------------------------------------------------------
     进来时按「现在几点」选一组图（清晨 / 午后 / 黄昏 / 夜晚），
     组内每 7 秒交叉淡入淡出一张；鼠标悬停暂停，圆点可手动切换。
     想加图，只往 BAND_SLOTS 对应时段里塞一条即可。 */
  var BAND_MS = 7000;

  var BAND_SLOTS = [
    {
      name: '清晨 · 05–11', from: 5, to: 11,
      items: [
        { src: 'assets/img/洞箫-主图.jpg', alt: '洞箫：一管清音', href: 'detail.html?id=dongxiao',
          text: '清晨 · 洞箫「一管清音」—— 竖吹的气声，最接近清晨的呼吸。', link: '洞箫详情 →' },
        { src: 'assets/img/木鱼-主图.jpg', alt: '木鱼：梵呗里的木鱼', href: 'detail.html?id=muyu',
          text: '清晨 · 木鱼「梵呗里的木鱼」—— 一木中空，一声警醒。', link: '木鱼详情 →' },
        { src: 'assets/img/古琴-主图.jpg', alt: '古琴：琴室与雅集', href: 'detail.html?id=guqin',
          text: '清晨 · 古琴「琴室与雅集」—— 声音很小，讲究很多。', link: '古琴详情 →' },
        { src: 'assets/img/笛子-主图.jpg', alt: '笛子：笛韵千年', href: 'detail.html?id=dizi',
          text: '清晨 · 笛子「笛韵千年」—— 一根竹管横过来，张嘴就能出调。', link: '笛子详情 →' }
      ]
    },
    {
      name: '午后 · 11–17', from: 11, to: 17,
      items: [
        { src: 'assets/img/编钟-主图.jpg', alt: '编钟：三层钟架全景', href: 'detail.html?id=bianzhong',
          text: '午后 · 编钟「三层钟架」—— 金石之声，先秦礼乐的重心。', link: '编钟详情 →' },
        { src: 'assets/img/笙-主图.jpg', alt: '笙：合奏里的笙', href: 'detail.html?id=sheng',
          text: '午后 · 笙「合奏里的笙」—— 管子领奏，笙来托腔。', link: '笙详情 →' },
        { src: 'assets/img/管子-主图.jpg', alt: '管子：冀中笙管乐领奏', href: 'detail.html?id=guanzi',
          text: '午后 · 管子「冀中笙管乐」—— 因它领奏，这类乐种才叫笙管乐。', link: '管子详情 →' },
        { src: 'assets/img/扬琴-主图.jpg', alt: '扬琴：广东音乐与四川琴书', href: 'detail.html?id=yangqin',
          text: '午后 · 扬琴「两套语境」—— 广东音乐的竹法，四川琴书的说法。', link: '扬琴详情 →' }
      ]
    },
    {
      name: '黄昏 · 17–21', from: 17, to: 21,
      items: [
        { src: 'assets/img/柳琴-主图.jpg', alt: '柳琴：水边的台子，台口灯亮，台下坐满', href: 'gallery.html',
          text: '黄昏 · 灯亮起来 —— 台口灯亮，台下坐满。', link: '看全部 72 件 →' },
        { src: 'assets/img/马头琴-主图.jpg', alt: '马头琴：当代传承与改良', href: 'detail.html?id=morinhuur',
          text: '黄昏 · 马头琴「当代传承」—— 一响，草原就出现在脑子里。', link: '马头琴详情 →' },
        { src: 'assets/img/三弦-主图.jpg', alt: '三弦：京韵大鼓与苏州评弹', href: 'detail.html?id=sanxian',
          text: '黄昏 · 三弦「书场里的那把琴」—— 京韵大鼓与苏州评弹都少不了它。', link: '三弦详情 →' },
        { src: 'assets/img/唢呐-主图.jpg', alt: '唢呐：唢呐千秋', href: 'detail.html?id=suona',
          text: '黄昏 · 唢呐「唢呐千秋」—— 一支唢呐，能替一整支乐队送行。', link: '唢呐详情 →' }
      ]
    },
    {
      name: '夜晚 · 21–05', from: 21, to: 5,
      items: [
        { src: 'assets/img/月琴-主图.jpg', alt: '月琴：乌蒙山那边的夜', href: 'detail.html?id=yueqin',
          text: '夜晚 · 月琴「乌蒙山那边的夜是圆的」—— 火把围坐，琴声贴着耳朵。', link: '月琴详情 →' },
        { src: 'assets/img/二胡-主图.jpg', alt: '二胡：千年弦音', href: 'detail.html?id=erhu',
          text: '夜晚 · 二胡「千年弦音」—— 两根弦，能拉出整段人生。', link: '二胡详情 →' },
        { src: 'assets/img/口弦-主图.jpg', alt: '口弦：情歌与私语', href: 'detail.html?id=kouxian',
          text: '夜晚 · 口弦「情歌与私语」—— 音量小到只能贴着耳朵听。', link: '口弦详情 →' },
        { src: 'assets/img/龢-主图.jpg', alt: '龢：第 72 件概念特写', href: 'he.html',
          text: '夜晚 · 第 72 件「龢」概念特写 —— 一件还不存在、却已经被画出来的乐器。', link: '看设计推演 →' }
      ]
    }
  ];

  function band() {
    var host = document.getElementById('band');
    if (!host) return;
    var A = document.getElementById('bandA');
    var B = document.getElementById('bandB');
    var txt = document.getElementById('bandText');
    var lnk = document.getElementById('bandLink');
    var badge = document.getElementById('bandSlot');
    var dots = document.getElementById('bandDots');
    if (!A || !B) return;

    /* 按当前小时选时段（夜晚跨零点，所以单独判断） */
    var h = new Date().getHours(), slot = null;
    for (var s = 0; s < BAND_SLOTS.length; s++) {
      var it = BAND_SLOTS[s];
      var inRange = it.from < it.to ? (h >= it.from && h < it.to)
                                    : (h >= it.from || h < it.to);
      if (inRange) { slot = it; break; }
    }
    slot = slot || BAND_SLOTS[0];
    var items = slot.items;

    if (badge) badge.textContent = slot.name;
    if (dots) {
      dots.innerHTML = items.map(function (_, i) {
        return '<button type="button" data-i="' + i + '" aria-label="第 ' + (i + 1) + ' 张"></button>';
      }).join('');
    }

    var idx = -1, top = A, loading = false, paused = false;

    function show(i) {
      if (loading) return;
      var n = items.length;
      var item = items[((i % n) + n) % n];
      var layer = (top === A) ? B : A;          /* 永远换到「没在显示」的那一层 */
      loading = true;
      var loader = new Image();
      loader.onload = loader.onerror = function () {
        layer.src = item.src;
        layer.alt = item.alt || '';
        layer.classList.add('is-on');
        top.classList.remove('is-on');
        top = layer;
        idx = ((i % n) + n) % n;
        if (txt) txt.textContent = item.text;
        if (lnk) { lnk.href = item.href; lnk.textContent = item.link; }
        if (dots) {
          Array.prototype.forEach.call(dots.children, function (b, k) {
            b.classList.toggle('is-on', k === idx);
          });
        }
        loading = false;
      };
      loader.src = item.src;
    }

    show(0);
    setInterval(function () {
      if (!paused && !document.hidden) show(idx + 1);
    }, BAND_MS);

    host.addEventListener('mouseenter', function () { paused = true; });
    host.addEventListener('mouseleave', function () { paused = false; });
    if (dots) {
      dots.addEventListener('click', function (e) {
        var b = e.target && e.target.closest ? e.target.closest('button') : null;
        if (!b || !b.getAttribute('data-i')) return;
        show(parseInt(b.getAttribute('data-i'), 10));
      });
    }
  }

  function year() {
    var y = $('#year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  band();
  heroStats();
  statGrid();
  catGrid();
  featGrid();
  bayinStrip();
  wall();
  year();
})();
