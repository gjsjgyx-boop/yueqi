/* ==========================================================================
   背景音乐 · BGM
   --------------------------------------------------------------------------
   两种音源，优先用你自己的录音：

     1) 文件模式 —— assets/manifest.js 里配置即启用
          "背景音乐": { audio: { main: "assets/audio/松风.mp3" } }
        多条曲目写数组即可轮播。

     2) 合成模式 —— 没有任何音频文件时的内置兜底
        用 Web Audio 现场合成五声音阶（宫商角徵羽）的拨弦乐音：
        Karplus-Strong 物理建模拨弦 + 程序生成混响，听感接近古琴／筝的散音。
        零素材、零版权顾虑、完全离线。放上真实录音后会自动让位。

   浏览器禁止带声自动播放，所以必须由用户点击开启；
   开启后写入 localStorage，翻页时在首次交互后接着上次的位置继续。
   ========================================================================== */
(function () {
  'use strict';

  var K_ON = 'bgm.on';
  var K_VOL = 'bgm.vol';
  var K_TIME = 'bgm.time';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ls(k, v) {
    try {
      if (v === undefined) return window.localStorage.getItem(k);
      window.localStorage.setItem(k, v);
    } catch (e) { /* 隐私模式等，忽略 */ }
    return null;
  }
  function ss(k, v) {
    try {
      if (v === undefined) return window.sessionStorage.getItem(k);
      window.sessionStorage.setItem(k, v);
    } catch (e) { /* 忽略 */ }
    return null;
  }

  /* ---------- 读取清单配置 ---------- */

  function cfg() {
    var m = window.ASSET_MANIFEST || {};
    return m['背景音乐'] || m['BGM'] || {};
  }

  /* 没写 title 就用文件名兜底：assets/audio/松风.mp3 → 松风 */
  function titleFromSrc(src) {
    var base = String(src).split('?')[0].split('#')[0].split('/').pop() || '';
    return base.replace(/\.[a-z0-9]+$/i, '') || '背景音乐';
  }

  function tracks() {
    var a = cfg().audio || {};
    var raw = a.main || a.playlist || null;
    if (!raw) return [];
    var arr = Array.isArray(raw) ? raw : [raw];
    return arr.map(function (v) {
      if (typeof v === 'string') return { src: v, title: titleFromSrc(v), artist: '' };
      var src = v.src || v.url || '';
      return {
        src: src,
        title: v.title || titleFromSrc(src),
        artist: v.artist || v.credit || v.source || ''
      };
    }).filter(function (t) { return t.src; });
  }

  function synthAllowed() {
    var s = cfg().synth;
    if (s === false) return false;
    if (s && s.enabled === false) return false;
    return true;
  }

  function synthOpts() {
    var s = cfg().synth;
    return (s && typeof s === 'object') ? s : {};
  }

  /* ======================================================================
     合成引擎：五声音阶 + Karplus-Strong 拨弦
     ====================================================================== */

  /* Karplus-Strong 参数。
     递推式： y[n] = x[n] + decay·damp·( y[n-N] + y[n-N-1] )
     环内的两点平均滤波带来半采样延迟，所以基频周期是 N + 0.5 而不是 N。
     取 N = round(sr/f - 0.5) 让周期尽量贴近目标，再用 playbackRate 精确补偿。 */
  function ksParams(sr, freq) {
    var N = Math.max(2, Math.round(sr / freq - 0.5));
    var period = N + 0.5;
    var pitch = sr / period;
    return { N: N, period: period, pitch: pitch, rate: freq / pitch };
  }

  /* Karplus-Strong 拨弦的纯计算部分（不依赖 AudioContext，便于单独验证）
     噪声激励 → 延迟线 + 两点平均滤波 → 指数衰减 = 拨弦音色 */
  function ksSamples(sr, freq, dur, decay, damp) {
    decay = decay === undefined ? 0.9885 : decay;
    damp = damp === undefined ? 0.5 : damp;

    var n = Math.max(1, Math.floor(sr * dur));
    var out = new Float32Array(n);
    var N = ksParams(sr, freq).N;

    /* 前 N 个采样作为噪声激励 */
    var ex = new Float32Array(N);
    for (var i = 0; i < N; i++) ex[i] = Math.random() * 2 - 1;

    var loop = decay * damp;      /* 环路增益 = 2·loop = decay（damp=0.5 时） */
    for (var s = 0; s < n; s++) {
      var a = s >= N ? out[s - N] : 0;
      var b = s > N ? out[s - N - 1] : 0;
      var x = s < N ? ex[s] : 0;
      out[s] = x + loop * (a + b);
    }

    /* 尾部淡出，避免截断爆音 */
    var fs = Math.floor(n * 0.8);
    for (var s2 = fs; s2 < n; s2++) out[s2] *= (n - s2) / (n - fs);
    /* 起音 3ms 淡入 */
    var atk = Math.max(1, Math.floor(sr * 0.003));
    for (var s3 = 0; s3 < atk; s3++) out[s3] *= s3 / atk;

    return out;
  }

  function Synth() {
    var ctx = null, master = null, wet = null, dry = null, lp = null, analyser = null;
    var drone = null, droneGain = null;
    var cache = {};
    var timer = null, nextTime = 0;
    var running = false;

    var SCALE = [0, 2, 4, 7, 9];         /* 宫 商 角 徵 羽 */
    var ROOT = 146.83;                   /* D3 */
    var NOTES = [];
    for (var oct = 0; oct < 3; oct++) {
      for (var i = 0; i < SCALE.length; i++) {
        NOTES.push(ROOT * Math.pow(2, (SCALE[i] + 12 * oct) / 12));
      }
    }

    function ensure() {
      if (ctx) return true;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      try { ctx = new AC(); } catch (e) { return false; }

      master = ctx.createGain();
      master.gain.value = 0;

      lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 4200;
      lp.Q.value = 0.4;

      dry = ctx.createGain();
      dry.gain.value = 0.82;
      wet = ctx.createGain();
      wet.gain.value = 0.42;

      analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.82;

      /* 安全限幅：多个音叠加 + 混响有可能超过 0 dBFS */
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10;
      comp.knee.value = 6;
      comp.ratio.value = 4;
      comp.attack.value = 0.004;
      comp.release.value = 0.25;

      /* 程序生成混响脉冲，营造厅堂感 */
      var conv = ctx.createConvolver();
      conv.buffer = makeIR(2.6, 2.4);

      master.connect(lp);
      lp.connect(dry); dry.connect(analyser);
      lp.connect(conv); conv.connect(wet); wet.connect(analyser);
      analyser.connect(comp);
      comp.connect(ctx.destination);
      return true;
    }

    function makeIR(sec, decay) {
      var sr = ctx.sampleRate;
      var n = Math.max(1, Math.floor(sr * sec));
      var buf = ctx.createBuffer(2, n, sr);
      for (var c = 0; c < 2; c++) {
        var d = buf.getChannelData(c);
        for (var i = 0; i < n; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay);
        }
      }
      return buf;
    }

    /* 预渲染成音频缓冲：避免 DelayNode 反馈环在短延时（高音）
       下受渲染量子限制而失真 */
    function pluckBuf(freq) {
      var key = Math.round(freq * 100);
      if (cache[key]) return cache[key];

      var sr = ctx.sampleRate;
      var samples = ksSamples(sr, freq, 3.4);
      var buf = ctx.createBuffer(1, samples.length, sr);
      buf.getChannelData(0).set(samples);
      cache[key] = buf;
      return buf;
    }

    function pluck(freq, at, gain, pan) {
      var src = ctx.createBufferSource();
      src.buffer = pluckBuf(freq);
      var g = ctx.createGain();
      g.gain.value = gain;
      if (ctx.createStereoPanner) {
        var p = ctx.createStereoPanner();
        p.pan.value = pan || 0;
        src.connect(g); g.connect(p); p.connect(master);
      } else {
        src.connect(g); g.connect(master);
      }
      /* 环内平均滤波带来半采样延迟，周期是 N+0.5；
         用 playbackRate 精确补回量化误差，另加极轻微失谐避免"电子感"。 */
      src.playbackRate.value = ksParams(ctx.sampleRate, freq).rate *
        (1 + (Math.random() * 2 - 1) * 0.0025);
      src.start(at);
      return src;
    }

    /* 生成一个乐句：慢速、稀疏、带少量和音与休止 */
    function phrase() {
      var len = 4 + Math.floor(Math.random() * 5);
      var deg = 3 + Math.floor(Math.random() * 5);
      var evts = [];
      var t = 0;
      var steps = [-2, -1, -1, 0, 1, 1, 2, 3];

      for (var i = 0; i < len; i++) {
        var step = steps[Math.floor(Math.random() * steps.length)];
        deg = Math.max(0, Math.min(NOTES.length - 1, deg + step));
        var dur = Math.random() < 0.28 ? 0.5 : (Math.random() < 0.78 ? 1 : 1.5);
        evts.push({
          f: NOTES[deg],
          at: t,
          g: 0.16 + Math.random() * 0.14,
          pan: (Math.random() * 2 - 1) * 0.45
        });
        /* 偶尔叠一个四度／五度和音，像筝的"双音" */
        if (Math.random() < 0.16 && deg + 2 < NOTES.length) {
          evts.push({
            f: NOTES[deg + 2],
            at: t + 0.07,
            g: 0.10 + Math.random() * 0.06,
            pan: (Math.random() * 2 - 1) * 0.45
          });
        }
        t += dur;
        /* 偶尔留白，让句子有呼吸 */
        if (Math.random() < 0.2) t += 0.5;
      }
      return { evts: evts, span: t + 0.8 + Math.random() * 2.2 };
    }

    /* 前瞻调度：每 400ms 把接下来 2.4 秒的乐句排进去 */
    function tick() {
      if (!running) return;
      var now = ctx.currentTime;
      while (nextTime < now + 2.4) {
        var p = phrase();
        for (var i = 0; i < p.evts.length; i++) {
          var e = p.evts[i];
          pluck(e.f, nextTime + e.at, e.g, e.pan);
        }
        nextTime += p.span;
      }
    }

    function startDrone() {
      if (drone) return;
      drone = ctx.createOscillator();
      drone.type = 'triangle';
      drone.frequency.value = ROOT / 2;      /* 低八度主音 */
      var fifth = ctx.createOscillator();
      fifth.type = 'sine';
      fifth.frequency.value = (ROOT / 2) * Math.pow(2, 7 / 12);

      droneGain = ctx.createGain();
      droneGain.gain.value = 0;
      var dLp = ctx.createBiquadFilter();
      dLp.type = 'lowpass';
      dLp.frequency.value = 700;

      drone.connect(dLp); fifth.connect(dLp); dLp.connect(droneGain);
      droneGain.connect(master);
      drone.start(); fifth.start();

      droneGain.gain.setTargetAtTime(0.035, ctx.currentTime, 2.5);
    }

    return {
      start: function () {
        if (!ensure()) return false;
        running = false;
        if (ctx.state === 'suspended') ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.8);
        startDrone();
        running = true;
        nextTime = ctx.currentTime + 0.35;
        tick();
        if (timer) clearInterval(timer);
        timer = window.setInterval(tick, 400);
        return true;
      },
      state: function () { return ctx ? ctx.state : 'none'; },
      pause: function () {
        if (!ctx) return;
        running = false;
        if (timer) { clearInterval(timer); timer = null; }
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      },
      resume: function () {
        if (!ctx) { return this.start(); }
        running = false;
        if (ctx.state === 'suspended') ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.6);
        running = true;
        nextTime = ctx.currentTime + 0.3;
        tick();
        if (timer) clearInterval(timer);
        timer = window.setInterval(tick, 400);
        return true;
      },
      levels: function () {
        if (!analyser) return null;
        var d = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(d);
        return d;
      },
      dispose: function () {
        running = false;
        if (timer) { clearInterval(timer); timer = null; }
        if (ctx) { try { ctx.close(); } catch (e) { /* 忽略 */ } }
        ctx = null;
      }
    };
  }

  /* ======================================================================
     播放器
     ====================================================================== */

  var LIST = tracks();
  var MODE = LIST.length ? 'file' : (synthAllowed() && (window.AudioContext || window.webkitAudioContext) ? 'synth' : 'none');

  var audioEl = null;     /* 文件模式：原生 audio，不用 MediaElementSource */
  var synth = null;
  var ui = null;
  var playing = false;
  var vol = Math.max(0, Math.min(1, parseFloat(ls(K_VOL)) || 0.35));
  var wantOn = ls(K_ON) === '1';
  var idx = 0;
  var raf = null;

  var TITLE = MODE === 'synth'
    ? (synthOpts().title || '松风 · 五声音阶即兴')
    : ((LIST[0] && LIST[0].title) || '背景音乐');
  var SUB = MODE === 'synth'
    ? (synthOpts().note || '内置合成 · 古琴风格拨弦（可替换为你的录音）')
    : ((LIST[0] && LIST[0].artist) || ('来自 assets/audio/ · 共 ' + LIST.length + ' 首'));

  var BASE_HINT = MODE === 'synth'
    ? '合成音源 · 放入真实录音后自动替换'
    : '来自 assets/audio/ · 音量已记忆';
  var HINT = BASE_HINT;

  function buildAudio() {
    if (audioEl) return audioEl;
    audioEl = document.createElement('audio');
    audioEl.loop = LIST.length === 1;
    audioEl.preload = 'metadata';
    audioEl.volume = vol;
    audioEl.src = LIST[idx].src;
    audioEl.addEventListener('ended', function () {
      if (LIST.length > 1) {
        idx = (idx + 1) % LIST.length;
        audioEl.src = LIST[idx].src;
        var p = audioEl.play();
        if (p && p.catch) p.catch(function () {});
        updateTrackLabel();
      }
    });
    document.body.appendChild(audioEl);
    return audioEl;
  }

  function startPlayback() {
    if (MODE === 'none') return;
    if (MODE === 'synth') {
      if (!synth) synth = Synth();
      synth.start();
    } else {
      var a = buildAudio();
      a.volume = vol;
      /* 翻页接着上次的位置 */
      var t = parseFloat(ss(K_TIME) || '0');
      if (t > 1 && isFinite(a.duration) && t < a.duration - 2) { try { a.currentTime = t; } catch (e) { /* 忽略 */ } }
      else if (t > 1) { a.addEventListener('loadedmetadata', function once() { try { a.currentTime = t; } catch (e) {} a.removeEventListener('loadedmetadata', once); }); }
      var p = a.play();
      if (p && p.catch) p.catch(function () { /* 自动播放被拒：保持 UI 为未播放 */ });
    }
    playing = true;
    paint();
    guardResume();
  }

  /* 浏览器可能因"无用户激活"拒绝启动音频。此时 UI 会显示在播放却听不到声音，
     所以检测到 AudioContext 仍是 suspended 就提示，并在下次交互时重试。 */
  function guardResume() {
    if (MODE !== 'synth') return;
    window.setTimeout(function () {
      if (!playing || !synth || synth.state() === 'running') return;
      if (refs.hint) refs.hint.textContent = '浏览器拦住了声音 · 点一下页面任意处继续';
      var retry = function () {
        document.removeEventListener('pointerdown', retry, true);
        document.removeEventListener('keydown', retry, true);
        if (!playing) return;
        synth.resume();
        if (refs.hint) refs.hint.textContent = BASE_HINT;
        guardResume();
      };
      document.addEventListener('pointerdown', retry, true);
      document.addEventListener('keydown', retry, true);
    }, 450);
  }

  function stopPlayback() {
    if (MODE === 'synth' && synth) synth.pause();
    if (MODE === 'file' && audioEl) audioEl.pause();
    playing = false;
    if (refs.hint) refs.hint.textContent = BASE_HINT;
    paint();
  }

  function toggle() {
    if (playing) { ls(K_ON, '0'); stopPlayback(); }
    else { ls(K_ON, '1'); startPlayback(); }
  }

  function setVol(v) {
    vol = Math.max(0, Math.min(1, v));
    ls(K_VOL, String(vol));
    if (audioEl) audioEl.volume = vol;
    if (MODE === 'synth' && ui) {
      /* 合成模式直接改主输出，避免再叠一层 */
      var node = ui.querySelector('.bgm__vol');
      if (node) node.value = String(Math.round(vol * 100));
    }
    paint();
  }

  /* ---------- UI ---------- */

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'bgm';
    wrap.id = 'bgm';
    wrap.innerHTML =
      '<button type="button" class="bgm__btn" aria-pressed="false" aria-label="开启背景音乐" title="背景音乐（快捷键 M）">' +
        '<span class="bgm__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>' +
          '</svg>' +
        '</span>' +
        '<span class="bgm__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' +
      '</button>' +
      '<div class="bgm__panel" role="group" aria-label="背景音乐控制">' +
        '<p class="bgm__title">' + esc(TITLE) + '</p>' +
        '<p class="bgm__sub">' + esc(SUB) + '</p>' +
        '<div class="bgm__row">' +
          '<button type="button" class="bgm__ctrl" data-act="toggle" aria-label="播放或暂停">' +
            '<span class="bgm__ctrl-ico">▶</span>' +
          '</button>' +
          '<input type="range" class="bgm__vol" min="0" max="100" step="1" ' +
            'value="' + Math.round(vol * 100) + '" aria-label="音量">' +
        '</div>' +
        '<p class="bgm__hint">' + esc(HINT) + '</p>' +
      '</div>' +
      '<span class="bgm__nudge" hidden>点这里开背景乐</span>';

    document.body.appendChild(wrap);

    wrap.querySelector('.bgm__btn').addEventListener('click', function () {
      hideNudge();
      toggle();
      if (playing) wrap.classList.add('is-open');
    });
    wrap.querySelector('[data-act="toggle"]').addEventListener('click', toggle);
    wrap.querySelector('.bgm__vol').addEventListener('input', function () {
      setVol(parseInt(this.value, 10) / 100);
    });
    /* 键盘 M 切换 */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'm' || e.key === 'M') {
        var tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
        hideNudge(); toggle();
      }
    });

    ui = wrap;
    refs = {
      btn: wrap.querySelector('.bgm__btn'),
      ico: wrap.querySelector('.bgm__ctrl-ico'),
      vol: wrap.querySelector('.bgm__vol'),
      bars: wrap.querySelectorAll('.bgm__bars i'),
      hint: wrap.querySelector('.bgm__hint'),
      title: wrap.querySelector('.bgm__title'),
      sub: wrap.querySelector('.bgm__sub'),
      nudge: wrap.querySelector('.bgm__nudge')
    };
    return wrap;
  }

  var refs = {};

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* 轮播换曲后刷新标题 */
  function updateTrackLabel() {
    if (!refs.title || MODE !== 'file') return;
    var t = LIST[idx] || {};
    refs.title.textContent = t.title || '背景音乐';
    if (refs.sub) refs.sub.textContent = t.artist || ('来自 assets/audio/ · 共 ' + LIST.length + ' 首');
  }

  function hideNudge() {
    if (refs.nudge) refs.nudge.hidden = true;
    ls('bgm.seen', '1');
  }

  function paint() {
    if (!ui) return;
    ui.classList.toggle('is-on', playing);
    ui.classList.toggle('is-paused', !playing && ls(K_ON) === '1');
    if (refs.btn) refs.btn.setAttribute('aria-pressed', String(playing));
    if (refs.ico) refs.ico.textContent = playing ? '❚❚' : '▶';
    if (refs.vol && document.activeElement !== refs.vol) refs.vol.value = String(Math.round(vol * 100));
    if (MODE === 'synth' && synth && refs.bars && refs.bars.length) {
      var m = synth.levels();
      if (m && playing) {
        for (var i = 0; i < refs.bars.length; i++) {
          var v = m[Math.floor(i * m.length / refs.bars.length / 2)] / 255;
          refs.bars[i].style.setProperty('--lvl', (0.25 + v * 1.35).toFixed(2));
        }
      }
    }
  }

  function loop() {
    if (playing) paint();
    raf = window.requestAnimationFrame(loop);
  }

  /* 文件模式：记录播放位置，翻页接着放 */
  window.addEventListener('pagehide', function () {
    if (MODE === 'file' && audioEl && playing && isFinite(audioEl.currentTime)) {
      ss(K_TIME, String(audioEl.currentTime));
    }
  });

  /* ---------- 启动 ---------- */

  function boot() {
    if (MODE === 'none') return;
    build();

    /* 首次访问给一个温和的提示，不强制 */
    if (!ls('bgm.seen') && !wantOn && refs.nudge) {
      refs.nudge.hidden = false;
      window.setTimeout(hideNudge, 9000);
    }

    if (wantOn) {
      /* 上次开着：等首次用户交互后接着放（浏览器不允许带声自动播放） */
      ui.classList.add('is-paused');
      var arm = function () {
        document.removeEventListener('pointerdown', arm, true);
        document.removeEventListener('keydown', arm, true);
        startPlayback();
      };
      document.addEventListener('pointerdown', arm, true);
      document.addEventListener('keydown', arm, true);
    }

    if (MODE === 'synth') loop();
    paint();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.BGM = {
    mode: MODE,
    tracks: LIST,
    isPlaying: function () { return playing; },
    toggle: toggle,
    play: function () { if (!playing) { ls(K_ON, '1'); startPlayback(); } },
    pause: function () { if (playing) { ls(K_ON, '0'); stopPlayback(); } },
    volume: setVol,
    /* 诊断：当前音源、播放状态、AudioContext 状态（suspended 表示被浏览器自动播放策略挂起） */
    state: function () {
      return {
        mode: MODE,
        playing: playing,
        ctxState: (MODE === 'synth' && synth) ? synth.state() : 'n/a',
        volume: vol
      };
    },
    /* 供测试与调试：Karplus-Strong 纯计算部分 */
    _ks: ksSamples,
    _params: ksParams,
    _scale: function () {
      var SCALE = [0, 2, 4, 7, 9], ROOT = 146.83, out = [];
      for (var o = 0; o < 3; o++) for (var i = 0; i < SCALE.length; i++)
        out.push(ROOT * Math.pow(2, (SCALE[i] + 12 * o) / 12));
      return out;
    }
  };
})();
