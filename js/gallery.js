/* ==========================================================================
   中国传统乐器 · 图鉴页脚本
   --------------------------------------------------------------------------
   状态：分类（all | chui | tan | la | da） + 冷门筛选 + 关键词
   真实地址同步到 ?cat= 以便分享与页脚深链
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP;
  var $ = window.UI.$, $$ = window.UI.$$, on = window.UI.on;

  var grid = $('#grid');
  var emptyBox = $('#empty');
  var state = {
    cat: window.UI.param('cat', 'all') || 'all',
    rare: window.UI.param('rare') === '1',
    q: ''
  };
  if (D.catOrder.indexOf(state.cat) === -1) state.cat = 'all';

  /* ---------- 分类图例 ---------- */
  function legend() {
    var host = $('#catLegend');
    if (!host) return;
    host.innerHTML = D.catOrder.map(function (k) {
      var c = D.cats[k];
      return '<span class="cat-pill" data-cat="' + k + '" style="--cat:' + c.accent + '">' +
        '<i></i>' + c.name + ' ' + D.count(k) + '</span>';
    }).join('');
  }

  /* ---------- 标签页 ---------- */
  function tabs() {
    var host = $('#tabs');
    if (!host) return;
    var items = [{ key: 'all', name: '全部', n: D.all.length }].concat(
      D.catOrder.map(function (k) { return { key: k, name: D.cats[k].name, n: D.count(k) }; })
    );
    host.innerHTML = items.map(function (it) {
      return '<button class="tab' + (it.key === state.cat ? ' is-on' : '') + '"' +
        (it.key !== 'all' ? ' data-cat="' + it.key + '"' : '') +
        ' role="tab" aria-selected="' + (it.key === state.cat) + '" data-tab="' + it.key + '">' +
        C.escape(it.name) + '<span class="tab__n">' + it.n + '</span></button>';
    }).join('');

    $$('.tab', host).forEach(function (btn) {
      on(btn, 'click', function () {
        state.cat = btn.getAttribute('data-tab');
        $$('.tab', host).forEach(function (b) {
          var isOn = b === btn;
          b.classList.toggle('is-on', isOn);
          b.setAttribute('aria-selected', isOn);
        });
        sync();
        render();
      });
    });
  }

  /* ---------- 冷门开关 ---------- */
  function rareSwitch() {
    var sw = $('#rareSwitch');
    if (!sw) return;
    function paint() {
      sw.classList.toggle('is-on', state.rare);
      sw.setAttribute('aria-pressed', String(state.rare));
    }
    on(sw, 'click', function () { state.rare = !state.rare; paint(); sync(); render(); });
    paint();
  }

  /* ---------- 搜索 ---------- */
  function search() {
    var input = $('#q');
    if (!input) return;
    var update = window.UI.throttle(function () {
      state.q = input.value;
      render();
    }, 160);
    on(input, 'input', update);
    on(input, 'keydown', function (e) { if (e.key === 'Escape') { input.value = ''; state.q = ''; render(); } });
  }

  /* ---------- 地址同步 ---------- */
  function sync() {
    try {
      var p = new URLSearchParams();
      if (state.cat !== 'all') p.set('cat', state.cat);
      if (state.rare) p.set('rare', '1');
      var q = p.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
    } catch (e) { /* file:// 下静默忽略 */ }
  }

  /* ---------- 渲染 ---------- */
  var lastSig = '';

  function compute() {
    var list = D.byCat(state.cat);
    if (state.rare) list = list.filter(function (x) { return x.rare; });
    if (state.q) {
      var k = state.q.trim().toLowerCase();
      if (k) {
        list = list.filter(function (x) {
          return (x.name + ' ' + window.PY.search(x.pinyin) + ' ' + x.alias.join(' ') + ' ' +
            x.tags.join(' ') + ' ' + x.bayin + ' ' + x.tagline + ' ' +
            x.desc).toLowerCase().indexOf(k) !== -1;
        });
      }
    }
    return list;
  }

  function render() {
    var list = compute();
    var sig = state.cat + '|' + state.rare + '|' + state.q + '|' + list.length;

    $('#shown').textContent = String(list.length);
    $('#total').textContent = String(D.all.length);

    var mode = state.cat === 'all' ? '全部乐器' : D.cats[state.cat].name;
    if (state.rare) mode += ' · 仅冷门/少数民族';
    if (state.q) mode += ' · 关键词「' + state.q + '」';
    $('#modeLabel').textContent = '当前：' + mode;

    if (!list.length) {
      grid.innerHTML = '';
      emptyBox.hidden = false;
      return;
    }
    emptyBox.hidden = true;

    if (sig === lastSig) return;
    lastSig = sig;

    grid.classList.add('is-swapping');
    window.setTimeout(function () {
      grid.innerHTML = list.map(function (rec, i) {
        var delay = Math.min(i, 14) * 42;
        return C.instCard(rec).replace(
          'class="inst"',
          'class="inst grid-item-in" style="animation-delay:' + delay + 'ms"'
        );
      }).join('');
      grid.classList.remove('is-swapping');
      window.UI.FX.all(grid);
    }, window.UI.reduced ? 0 : 170);
  }

  /* ---------- 重置 ---------- */
  function reset() {
    state.cat = 'all'; state.rare = false; state.q = '';
    var input = $('#q'); if (input) input.value = '';
    var sw = $('#rareSwitch'); if (sw) { sw.classList.remove('is-on'); sw.setAttribute('aria-pressed', 'false'); }
    $$('.tab').forEach(function (b) {
      var on_ = b.getAttribute('data-tab') === 'all';
      b.classList.toggle('is-on', on_);
      b.setAttribute('aria-selected', on_);
    });
    lastSig = '';
    sync();
    render();
  }

  /* ---------- 初始化 ---------- */
  legend();
  tabs();
  rareSwitch();
  search();
  render();
  on($('#resetFilters'), 'click', reset);

  var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());

  /* 页脚 / 其它页面用 ?cat= 进入时，标题也同步一下 */
  if (state.cat !== 'all') {
    var c = D.cats[state.cat];
    document.title = c.name + ' · ' + D.count(state.cat) + ' 种 | 中国传统乐器';
  }
})();
