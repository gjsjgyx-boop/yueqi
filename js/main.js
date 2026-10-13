/* ==========================================================================
   中国传统乐器 · 共享运行时
   --------------------------------------------------------------------------
   1. 工具函数
   2. 氛围画布：墨雾 + 浮尘 + 声音涟漪
   3. 自定义光标
   4. 导航 / 抽屉 / 页脚注入
   5. 滚动编排：入场揭示、数字滚动、进度条、回到顶部
   6. 交互特效：3D 倾斜、磁吸、涟漪、光斑
   7. 占位框渲染器（图片 / 动画 / 视频）
   8. 初始化
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. 工具函数 --------------------------------------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rand(a, b) { return a + Math.random() * (b - a); }

  function throttle(fn, ms) {
    var last = 0, timer = null, lastArgs = null;
    return function () {
      var now = Date.now();
      lastArgs = arguments;
      if (now - last >= ms) { last = now; fn.apply(this, lastArgs); }
      else if (!timer) {
        timer = setTimeout(function () {
          timer = null; last = Date.now(); fn.apply(null, lastArgs);
        }, ms - (now - last));
      }
    };
  }

  /* 获取查询参数 */
  function param(key, fallback) {
    try {
      var v = new URLSearchParams(window.location.search).get(key);
      return v === null || v === '' ? (fallback === undefined ? null : fallback) : v;
    } catch (e) { return fallback === undefined ? null : fallback; }
  }

  /* 把空格分隔的 class 一次性写进元素 */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined && html !== null) n.innerHTML = html;
    return n;
  }

  /* 分类元数据（与 data.js 的 CATS 保持一致，供各页复用） */
  var CATS = {
    chui: { key: 'chui', name: '吹管乐器', en: 'Wind · Blown', color: 'var(--cat-chui)', glyph: '吹', idx: '壹' },
    tan:  { key: 'tan',  name: '弹拨乐器', en: 'Plucked',      color: 'var(--cat-tan)',  glyph: '弹', idx: '贰' },
    la:   { key: 'la',   name: '拉弦乐器', en: 'Bowed',        color: 'var(--cat-la)',   glyph: '拉', idx: '叁' },
    da:   { key: 'da',   name: '打击乐器', en: 'Percussion',   color: 'var(--cat-da)',   glyph: '打', idx: '肆' },
    he:   { key: 'he',   name: '合鸣新制', en: 'Devised',      color: 'var(--cat-he)',   glyph: '龢', idx: '伍' }
  };

  /* ---------- 2. 氛围画布 --------------------------------------------- */

  var Atmosphere = {
    init: function () {
      var cv = $('#ink-canvas');
      if (!cv || REDUCED) { if (cv) cv.style.display = 'none'; return; }
      var ctx = cv.getContext('2d', { alpha: true });
      if (!ctx) return;

      var RES = 0.62;          // 画布内部分辨率系数（墨雾本就模糊，省算力）
      var W = 0, H = 0, dpr = 1;
      var motes = [];
      var blobs = [];
      var ripples = [];
      var pointer = { x: -9999, y: -9999, active: false };
      var raf = null, running = true, t = 0;

      /* 预渲染墨雾贴图为离屏画布，避免每帧建渐变 */
      function makeBlobTex(hue, alpha) {
        var S = 256;
        var c = document.createElement('canvas');
        c.width = c.height = S;
        var g = c.getContext('2d');
        var grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
        grad.addColorStop(0, 'hsla(' + hue + ', 78%, 58%, ' + alpha + ')');
        grad.addColorStop(0.42, 'hsla(' + hue + ', 70%, 44%, ' + (alpha * 0.42) + ')');
        grad.addColorStop(1, 'hsla(' + hue + ', 60%, 30%, 0)');
        g.fillStyle = grad;
        g.fillRect(0, 0, S, S);
        return c;
      }

      var PALETTE = [
        { hue: 8,   alpha: 0.30 },  // 朱砂
        { hue: 44,  alpha: 0.22 },  // 鎏金
        { hue: 165, alpha: 0.24 },  // 青玉
        { hue: 268, alpha: 0.20 },  // 紫电
        { hue: 205, alpha: 0.18 }   // 石青
      ];

      function resize() {
        var w = window.innerWidth, h = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 1.6);
        W = Math.max(320, w); H = Math.max(320, h);
        cv.width = Math.round(W * RES * dpr);
        cv.height = Math.round(H * RES * dpr);
        cv.style.width = W + 'px';
        cv.style.height = H + 'px';
        build();
      }

      function build() {
        var area = W * H;
        // 墨雾团：尺寸大、移动慢
        blobs = PALETTE.map(function (p, i) {
          var size = rand(0.34, 0.62) * Math.max(W, H);
          return {
            tex: makeBlobTex(p.hue, p.alpha),
            x: rand(0, W), y: rand(0, H),
            size: size,
            vx: rand(-0.09, 0.09) * (i % 2 ? -1 : 1),
            vy: rand(-0.07, 0.07),
            ph: rand(0, Math.PI * 2),
            ps: rand(0.00025, 0.0006),
            rot: rand(0, Math.PI * 2),
            vr: rand(-0.0004, 0.0004)
          };
        });
        // 浮尘：细小、向上飘
        var count = clamp(Math.round(area / 16000), 28, 110);
        motes = [];
        for (var i = 0; i < count; i++) {
          motes.push({
            x: rand(0, W), y: rand(0, H),
            r: rand(0.5, 1.9),
            vx: rand(-0.14, 0.14),
            vy: rand(-0.42, -0.1),
            a: rand(0.12, 0.5),
            hue: Math.random() < 0.72 ? 42 : (Math.random() < 0.5 ? 8 : 165)
          });
        }
      }

      function pushRipple(x, y, strong) {
        ripples.push({
          x: x, y: y,
          r: 6,
          max: strong ? rand(190, 300) : rand(70, 130),
          v: strong ? rand(2.4, 3.4) : rand(1.1, 1.9),
          a: strong ? 0.5 : 0.26,
          lw: strong ? 1.5 : 1
        });
        if (ripples.length > 26) ripples.shift();
      }

      var lastRipple = { x: -999, y: -999, t: 0 };
      function moveRipple(x, y) {
        var now = performance.now();
        var d = Math.hypot(x - lastRipple.x, y - lastRipple.y);
        if (d > 86 && now - lastRipple.t > 170) {
          lastRipple = { x: x, y: y, t: now };
          pushRipple(x, y, false);
        }
      }

      function frame() {
        if (!running) return;
        t += 1;
        var s = RES * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cv.width, cv.height);

        /* --- 墨雾 --- */
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 0; i < blobs.length; i++) {
          var b = blobs[i];
          b.x += b.vx; b.y += b.vy; b.ph += b.ps; b.rot += b.vr;
          // 缓慢环绕 + 呼吸缩放
          var breathe = 1 + Math.sin(b.ph) * 0.13;
          var sz = b.size * breathe;

          // 鼠标轻微吸引，让画面"活"起来
          if (pointer.active) {
            var dx = pointer.x - b.x, dy = pointer.y - b.y;
            var dist = Math.hypot(dx, dy) || 1;
            if (dist < 620) {
              b.x += (dx / dist) * 0.16;
              b.y += (dy / dist) * 0.16;
            }
          }
          // 环绕边界
          if (b.x < -sz * 0.6) b.x = W + sz * 0.6;
          if (b.x > W + sz * 0.6) b.x = -sz * 0.6;
          if (b.y < -sz * 0.6) b.y = H + sz * 0.6;
          if (b.y > H + sz * 0.6) b.y = -sz * 0.6;

          ctx.save();
          ctx.translate(b.x * s, b.y * s);
          ctx.rotate(b.rot);
          ctx.globalAlpha = 0.5;
          ctx.drawImage(b.tex, -sz * s / 2, -sz * s / 2, sz * s, sz * s);
          ctx.restore();
        }

        /* --- 浮尘 --- */
        ctx.globalCompositeOperation = 'lighter';
        for (var m = 0; m < motes.length; m++) {
          var p = motes[m];
          p.x += p.vx; p.y += p.vy;
          if (pointer.active) {
            var ddx = p.x - pointer.x, ddy = p.y - pointer.y;
            var dd = Math.hypot(ddx, ddy);
            if (dd < 110 && dd > 0.01) {
              var f = (110 - dd) / 110;
              p.x += (ddx / dd) * f * 1.5;
              p.y += (ddy / dd) * f * 1.5;
            }
          }
          if (p.y < -6) { p.y = H + 6; p.x = rand(0, W); }
          if (p.x < -6) p.x = W + 6;
          if (p.x > W + 6) p.x = -6;

          ctx.beginPath();
          ctx.arc(p.x * s, p.y * s, p.r * s, 0, 6.2832);
          ctx.fillStyle = 'hsla(' + p.hue + ', 72%, 68%, ' + p.a + ')';
          ctx.fill();
        }

        /* --- 声音涟漪 --- */
        ctx.globalCompositeOperation = 'source-over';
        for (var k = ripples.length - 1; k >= 0; k--) {
          var rp = ripples[k];
          rp.r += rp.v;
          rp.a *= 0.982;
          if (rp.r > rp.max || rp.a < 0.012) { ripples.splice(k, 1); continue; }
          ctx.beginPath();
          ctx.arc(rp.x * s, rp.y * s, rp.r * s, 0, 6.2832);
          ctx.strokeStyle = 'rgba(240, 83, 58, ' + rp.a + ')';
          ctx.lineWidth = rp.lw * s;
          ctx.stroke();
          // 第二圈金边，制造"声波"层次
          if (rp.a > 0.14) {
            ctx.beginPath();
            ctx.arc(rp.x * s, rp.y * s, rp.r * s * 0.62, 0, 6.2832);
            ctx.strokeStyle = 'rgba(232, 184, 75, ' + rp.a * 0.5 + ')';
            ctx.lineWidth = rp.lw * s * 0.7;
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(frame);
      }

      on(window, 'resize', throttle(resize, 220));
      on(window, 'pointermove', function (e) {
        pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
        moveRipple(e.clientX, e.clientY);
      }, { passive: true });
      on(window, 'pointerdown', function (e) {
        pushRipple(e.clientX, e.clientY, true);
      }, { passive: true });
      on(window, 'pointerleave', function () { pointer.active = false; });
      on(document, 'visibilitychange', function () {
        if (document.hidden) {
          running = false;
          if (raf) cancelAnimationFrame(raf);
          raf = null;
        } else if (!running) {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      });

      resize();
      raf = requestAnimationFrame(frame);

      /* 点击时叠加一个 DOM 墨圈（更锐利的反馈） */
      on(window, 'pointerdown', function (e) {
        var d = el('span', 'ink-ripple');
        var size = 26;
        d.style.width = d.style.height = size + 'px';
        d.style.left = (e.clientX - size / 2) + 'px';
        d.style.top = (e.clientY - size / 2) + 'px';
        document.body.appendChild(d);
        setTimeout(function () { d.remove(); }, 1600);
      }, { passive: true });
    }
  };

  /* ---------- 3. 自定义光标 ------------------------------------------- */

  var Cursor = {
    init: function () {
      if (!FINE_POINTER || REDUCED) return;
      var ring = el('div', 'cursor');
      var dot = el('div', 'cursor-dot');
      document.body.appendChild(ring);
      document.body.appendChild(dot);

      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var rx = mx, ry = my;

      on(window, 'pointermove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
      on(window, 'pointerdown', function () { ring.classList.add('is-down'); });
      on(window, 'pointerup', function () { ring.classList.remove('is-down'); });

      var HOVER_SEL = 'a, button, [data-hover], .inst, .cat-card, .tab, .switch, input, .ph, .bayin-cell, .bayin-card, .pager__item';
      on(document, 'pointerover', function (e) {
        if (e.target.closest && e.target.closest(HOVER_SEL)) ring.classList.add('is-hover');
      });
      on(document, 'pointerout', function (e) {
        if (e.target.closest && e.target.closest(HOVER_SEL)) ring.classList.remove('is-hover');
      });

      (function loop() {
        rx = lerp(rx, mx, 0.18);
        ry = lerp(ry, my, 0.18);
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
    }
  };

  /* ---------- 4. 导航 / 抽屉 ------------------------------------------ */

  var NAV_ITEMS = [
    { href: 'index.html',   label: '首页',          en: 'Home' },
    { href: 'gallery.html', label: '乐器图鉴',      en: 'Gallery' },
    { href: 'culture.html', label: '八音文化',      en: 'Culture' },
    { href: 'he.html',      label: '第 72 件 · 龢', en: 'Devised' },
    { href: 'about.html',   label: '关于本站',      en: 'About' }
  ];

  var Nav = {
    init: function () {
      var nav = $('.nav');
      if (!nav) return;

      /* 抽屉 */
      var drawer = el('div', 'drawer');
      NAV_ITEMS.forEach(function (it, i) {
        var a = el('a', 'drawer__link');
        a.href = it.href;
        a.innerHTML = '<em>0' + (i + 1) + '</em><span>' + it.label + '</span>';
        drawer.appendChild(a);
      });
      document.body.appendChild(drawer);

      var burger = $('.nav__burger');
      function close() {
        nav.classList.remove('is-open');
        drawer.classList.remove('is-open');
        document.body.classList.remove('is-locked');
      }
      on(burger, 'click', function () {
        var open = !drawer.classList.contains('is-open');
        nav.classList.toggle('is-open', open);
        drawer.classList.toggle('is-open', open);
        document.body.classList.toggle('is-locked', open);
      });
      $$('.drawer__link').forEach(function (a) { on(a, 'click', close); });
      on(document, 'keydown', function (e) { if (e.key === 'Escape') close(); });

      /* 滚动吸顶 */
      var onScrollNav = function () {
        nav.classList.toggle('is-stuck', window.scrollY > 24);
      };
      on(window, 'scroll', onScrollNav, { passive: true });
      onScrollNav();

      /* 当前页高亮 */
      var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      $$('.nav__link').forEach(function (a) {
        var href = (a.getAttribute('href') || '').toLowerCase();
        if (href === file) a.classList.add('is-active');
      });

      /* 回到顶部 + 进度条 */
      var top = el('button', 'to-top');
      top.setAttribute('aria-label', '回到顶部');
      top.innerHTML = '<svg class="ico" viewBox="0 0 24 24" style="width:18px;height:18px"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
      document.body.appendChild(top);
      on(top, 'click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

      var bar = el('div', 'progress');
      document.body.appendChild(bar);

      var onScroll = throttle(function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h > 0 ? clamp(window.scrollY / h, 0, 1) : 0;
        bar.style.width = (p * 100).toFixed(2) + '%';
        top.classList.toggle('is-on', window.scrollY > 620);
      }, 32);
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();
    }
  };

  /* ---------- 5. 滚动编排 --------------------------------------------- */

  var Reveal = {
    init: function () {
      var targets = $$('[data-reveal], [data-stagger], .line-mask, .shine');
      if (!targets.length) return;

      if (!('IntersectionObserver' in window) || REDUCED) {
        targets.forEach(function (n) { n.classList.add('is-in'); });
        return;
      }

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

      targets.forEach(function (n) { io.observe(n); });
    }
  };

  var Counters = {
    init: function () {
      var nodes = $$('[data-count]');
      if (!nodes.length) return;

      function run(node) {
        var target = parseFloat(node.getAttribute('data-count')) || 0;
        var dur = 1400;
        var decimals = (node.getAttribute('data-count').split('.')[1] || '').length;
        if (REDUCED) { node.textContent = target.toFixed(decimals); return; }
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var p = clamp((ts - start) / dur, 0, 1);
          // easeOutExpo
          var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          node.textContent = (target * e).toFixed(decimals);
          if (p < 1) requestAnimationFrame(step);
          else node.textContent = target.toFixed(decimals);
        }
        requestAnimationFrame(step);
      }

      if (!('IntersectionObserver' in window)) { nodes.forEach(run); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      nodes.forEach(function (n) { io.observe(n); });
    }
  };

  /* ---------- 6. 交互特效 --------------------------------------------- */

  var FX = {
    /* 3D 倾斜 */
    tilt: function (scope) {
      if (!FINE_POINTER || REDUCED) return;
      $$('[data-tilt]', scope).forEach(function (node) {
        if (node.__tilt) return;
        node.__tilt = true;
        node.classList.add('tilt');

        var rafId = null, tx = 0, ty = 0;

        function apply() {
          rafId = null;
          node.style.setProperty('--rx', ty.toFixed(2) + 'deg');
          node.style.setProperty('--ry', tx.toFixed(2) + 'deg');
        }

        on(node, 'pointerenter', function () { node.classList.add('is-tracking'); });
        on(node, 'pointermove', function (e) {
          var r = node.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          var max = parseFloat(node.getAttribute('data-tilt')) || 8;
          tx = clamp(px * max * 2, -max, max);
          ty = clamp(-py * max * 2, -max, max);
          if (!rafId) rafId = requestAnimationFrame(apply);

          /* 光斑跟随 */
          var spot = node.querySelector('.spot');
          if (spot) {
            spot.style.left = (e.clientX - r.left) + 'px';
            spot.style.top = (e.clientY - r.top) + 'px';
            spot.classList.add('is-on');
          }
        });
        on(node, 'pointerleave', function () {
          node.classList.remove('is-tracking');
          node.style.setProperty('--rx', '0deg');
          node.style.setProperty('--ry', '0deg');
          var spot = node.querySelector('.spot');
          if (spot) spot.classList.remove('is-on');
        });
      });
    },

    /* 磁吸 */
    magnet: function (scope) {
      if (!FINE_POINTER || REDUCED) return;
      $$('[data-magnet]', scope).forEach(function (node) {
        if (node.__magnet) return;
        node.__magnet = true;
        node.classList.add('magnet');
        var strength = parseFloat(node.getAttribute('data-magnet')) || 12;
        on(node, 'pointermove', function (e) {
          var r = node.getBoundingClientRect();
          var x = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
          var y = ((e.clientY - r.top) / r.height - 0.5) * strength;
          node.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        });
        on(node, 'pointerleave', function () { node.style.transform = ''; });
      });
    },

    /* 点击涟漪 */
    ripple: function (scope) {
      $$('[data-ripple]', scope).forEach(function (node) {
        if (node.__ripple) return;
        node.__ripple = true;
        node.classList.add('ripple-host');
        on(node, 'pointerdown', function (e) {
          var r = node.getBoundingClientRect();
          var size = Math.max(r.width, r.height) * 1.15;
          var d = el('span', 'ripple');
          d.style.width = d.style.height = size + 'px';
          d.style.left = (e.clientX - r.left - size / 2) + 'px';
          d.style.top = (e.clientY - r.top - size / 2) + 'px';
          node.appendChild(d);
          setTimeout(function () { d.remove(); }, 760);
        });
      });
    },

    /* 悬停光斑容器 */
    spots: function (scope) {
      $$('[data-spot]', scope).forEach(function (node) {
        if (node.__spot) return;
        node.__spot = true;
        if (!node.querySelector('.spot')) node.insertBefore(el('span', 'spot'), node.firstChild);
      });
    },

    all: function (scope) {
      FX.tilt(scope); FX.magnet(scope); FX.ripple(scope); FX.spots(scope);
    }
  };

  /* ---------- 7. 占位框渲染器 ----------------------------------------- */

  var PH_ICONS = {
    img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.8" cy="9" r="1.6"/><path d="M21 15.5l-4.5-4.5L7 20.5"/></svg>',
    anim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c2.4-6.5 5.6-6.5 8 0s5.6 6.5 8 0"/><path d="M3 7h4M10 4h7M17.5 10H21" opacity=".65"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="14" height="14" rx="2.5"/><path d="M16.5 10.5l5-3v9l-5-3z"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5v3M8 7.5v9M12 5v14M16 8.5v7M20 11v2"/></svg>'
  };
  var PH_KIND_LABEL = { img: '图片占位框', anim: '动画占位框', video: '视频占位框', audio: '音频位' };
  var PH_BADGE = { img: 'IMG', anim: 'ANIM', video: 'VIDEO', audio: 'AUDIO' };

  /**
   * 生成占位框 HTML
   * @param {Object} o
   *   kind    'img' | 'anim' | 'video' | 'audio'
   *   ratio   '16x9' | '4x3' | '3x4' | '21x9' | '1x1' | 'auto'
   *   title   覆盖默认标题
   *   hint    补充说明（HTML）
   *   size    右下角替换提示文本
   * @returns {String} HTML
   */
  function ph(o) {
    o = o || {};
    var kind = o.kind || 'img';
    var ratio = o.ratio || '16x9';
    var hint = o.hint || '';
    return '' +
      '<div class="ph ph--' + kind + ' ph--' + ratio + '" role="img" aria-label="' +
      (o.title || PH_KIND_LABEL[kind]) + '">' +
        '<span class="ph__scan"></span>' +
        '<span class="ph__corner ph__corner--tl"></span>' +
        '<span class="ph__corner ph__corner--tr"></span>' +
        '<span class="ph__corner ph__corner--bl"></span>' +
        '<span class="ph__corner ph__corner--br"></span>' +
        '<span class="ph__badge">' + PH_BADGE[kind] + '</span>' +
        (o.size ? '<span class="ph__size">' + o.size + '</span>' : '') +
        '<div class="ph__inner">' +
          '<span class="ph__icon">' + PH_ICONS[kind] + '</span>' +
          '<span class="ph__kind">' + (o.title || PH_KIND_LABEL[kind]) + '</span>' +
          (hint ? '<span class="ph__hint">' + hint + '</span>' : '') +
        '</div>' +
      '</div>';
  }

  /* 注入占位框：给容器加 data-ph="img:16x9" 即可 */
  function mountPlaceholders(scope) {
    $$('[data-ph]', scope).forEach(function (node) {
      if (node.__ph) return;
      node.__ph = true;
      var parts = (node.getAttribute('data-ph') || 'img:16x9').split(':');
      node.innerHTML = ph({
        kind: parts[0] || 'img',
        ratio: parts[1] || '16x9',
        title: node.getAttribute('data-ph-title') || '',
        hint: node.getAttribute('data-ph-hint') || '',
        size: node.getAttribute('data-ph-size') || ''
      });
    });
  }

  /* 页脚「已配图」统计：按素材清单实时算，不在 HTML 里写死数字 */
  function mountFillStats() {
    var host = document.getElementById('fillCount');
    if (!host || !window.SITE_DATA || !window.ASSET_MANIFEST) return;
    var M = window.ASSET_MANIFEST;
    var all = window.SITE_DATA.all || [];
    var filled = all.filter(function (r) {
      var o = M[r.name];
      if (!o) return false;
      return ['img', 'anim', 'audio', 'video'].some(function (kind) {
        return o[kind] && Object.keys(o[kind]).length > 0;
      });
    }).length;
    if (filled) host.textContent = String(filled);
  }

  /* ---------- 8. 初始化 ----------------------------------------------- */

  function boot() {
    /* 自定义光标：隐藏系统光标（输入控件保留） */
    if (FINE_POINTER && !REDUCED) document.documentElement.classList.add('dsh-cursor');

    Atmosphere.init();
    Cursor.init();
    Nav.init();
    mountPlaceholders(document);
    mountFillStats();
    Reveal.init();
    Counters.init();
    FX.all(document);

    /* 跑马灯：复制轨道内容实现无缝循环 */
    $$('.marquee__track').forEach(function (track) {
      if (track.__dup) return;
      track.__dup = true;
      track.innerHTML = track.innerHTML + track.innerHTML;
    });

    /* 首屏墨晕淡出 */
    var curtain = $('.curtain');
    if (curtain) {
      requestAnimationFrame(function () {
        curtain.classList.add('curtain--out');
        setTimeout(function () { curtain.remove(); }, 700);
      });
    }
  }

  /* 暴露给各页脚本 */
  window.UI = {
    $: $, $$: $$, on: on, clamp: clamp, lerp: lerp, rand: rand,
    throttle: throttle, param: param, el: el,
    CATS: CATS, ph: ph, mountPlaceholders: mountPlaceholders,
    FX: FX, Reveal: Reveal, Counters: Counters,
    reduced: REDUCED, finePointer: FINE_POINTER
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
