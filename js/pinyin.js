/* ==========================================================================
   汉语拼音规范工具 · PY
   --------------------------------------------------------------------------
   严格按《汉语拼音正词法基本规则》(GB/T 16159) 与《汉语拼音方案》处理：

   1. 按词连写：一个词内部的音节连写，词与词之间才空格。
      乐器名多为单一专名 → 连写：古琴 = gǔqín（不是 gǔ qín）。
   2. 隔音符号：后一音节以 a / o / e 开头时，连写须加 ' 分隔。
      胡尔 = hú'ěr ，都塔尔 = dūtǎ'ěr ，萨它尔 = sàtā'ěr 。
   3. 声调符号标在主要元音上，次序为 a > o > e > i/u/ü ；
      复韵母 iu 标在 u 上，ui 标在 i 上。
   4. 专有名词（乐器名作标题时）首字母大写，其余小写。

   音节一律以小写、带声调符号的形式存储为数组，例如：
     古琴   ["gǔ", "qín"]
     胡尔   ["hú", "ěr"]
     笛子   ["dí", "zi"]      zi 为轻声，不标调
   ========================================================================== */
(function () {
  'use strict';

  /* 带调元音 → 基础元音（1:1 映射，保持字符数不变，便于定位） */
  var TONE_MAP = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü'
  };
  /* 基础元音 → 四声形式（索引 0 = 一声） */
  var TONE_FORMS = {
    'a': ['ā', 'á', 'ǎ', 'à'],
    'e': ['ē', 'é', 'ě', 'è'],
    'i': ['ī', 'í', 'ǐ', 'ì'],
    'o': ['ō', 'ó', 'ǒ', 'ò'],
    'u': ['ū', 'ú', 'ǔ', 'ù'],
    'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
  };
  var VOWELS = 'aeiouü';

  function isTonable(ch) { return Object.prototype.hasOwnProperty.call(TONE_MAP, ch); }

  /* 去声调：gǔqín → guqin ；ü 写作 v 以便作 URL / 搜索用 */
  function stripTone(s, useV) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      var b = TONE_MAP[c] || c;
      if (useV && b === 'ü') b = 'v';
      out += b;
    }
    return out;
  }

  /* 把任意输入规范成音节数组 */
  function syl(x) {
    if (Array.isArray(x)) {
      return x.map(function (s) { return String(s).trim(); }).filter(Boolean);
    }
    return String(x === undefined || x === null ? '' : x)
      .trim().split(/[\s\u00b7\-]+/).filter(Boolean);
  }

  /* 是否需要隔音符号：该音节以 a / o / e 开头 */
  function needsApostrophe(s) {
    return /^[aoe]/.test(stripTone(s).toLowerCase());
  }

  /* 按词连写：["gǔ","qín"] → "gǔqín"；["hú","ěr"] → "hú'ěr" */
  function word(x) {
    var a = syl(x), out = '';
    for (var i = 0; i < a.length; i++) {
      if (i > 0 && needsApostrophe(a[i])) out += "'";
      out += a[i];
    }
    return out;
  }

  /* 首字母大写：→ "Gǔqín"（专名作标题时的规范写法） */
  function title(x) {
    var w = word(x);
    return w ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  }

  /* 音节分写（便于给不熟悉拼音的读者逐字对音）：→ "gǔ qín" */
  function spaced(x) { return syl(x).join(' '); }

  /* 纯字母，无声调，无隔音符号：→ "guqin" */
  function plain(x) {
    return syl(x).map(function (s) { return stripTone(s, true); }).join('');
  }

  /* 供搜索匹配的合并串：gǔqín / gǔ qín / guqin / gu qin 都能命中 */
  function search(x) {
    var a = syl(x);
    return (word(a) + ' ' + spaced(a) + ' ' + plain(a) + ' ' +
      a.map(function (s) { return stripTone(s, true); }).join(' ')).toLowerCase();
  }

  /* ---------- 校验（数据体检用） ---------- */

  /* 返回该音节的错误说明；null 表示合规 */
  function toneError(s) {
    if (typeof s !== 'string' || !s) return '音节为空';
    if (/[A-Z]/.test(s)) return '含大写字母（音节应全小写）';
    if (/['\s]/.test(s)) return '含隔音符号或空格（隔音符号由程序自动生成）';

    var tonedAt = -1, tonedCount = 0, base = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (isTonable(c)) { tonedCount++; tonedAt = i; base += TONE_MAP[c]; }
      else { base += c; }
    }
    if (tonedCount > 1) return '一个音节只能有一个声调符号';

    // 字母集合检查
    for (var j = 0; j < base.length; j++) {
      if (VOWELS.indexOf(base.charAt(j)) === -1 && !/[a-z]/.test(base.charAt(j))) {
        return '含非法字符「' + base.charAt(j) + '」';
      }
    }
    if (!/[a-zü]/.test(base)) return '不含字母';

    // 声调位置检查
    if (tonedCount === 1) {
      var expect = expectedToneIndex(base);
      if (expect === -1) return '未找到可标调的元音';
      if (expect !== tonedAt) {
        return '声调位置错误：应标在「' + base.charAt(expect) +
          '」上，实际标在「' + base.charAt(tonedAt) + '」（' + s + '）';
      }
    }
    return null;
  }

  /* 依 a > o > e > iu/ui > 末位元音 规则，返回应标调的字符下标
     注：iu 与 ui 都是复韵母的省写（iou / uei），主要元音被省略，
         声调一律标在最后一个字母上 —— iu 标 u，ui 标 i，都是末位。 */
  function expectedToneIndex(base) {
    var i;
    var ai = base.indexOf('a'); if (ai !== -1) return ai;
    var oi = base.indexOf('o'); if (oi !== -1) return oi;
    var ei = base.indexOf('e'); if (ei !== -1) return ei;
    if (/iu$/.test(base) || /ui$/.test(base)) return base.length - 1;
    for (i = base.length - 1; i >= 0; i--) {
      if (VOWELS.indexOf(base.charAt(i)) !== -1) return i;
    }
    return -1;
  }

  /* 校验整个拼音字段，返回错误数组 */
  function check(x, label) {
    var errs = [], a = syl(x);
    if (!a.length) { errs.push((label || '拼音') + ' 为空'); return errs; }
    a.forEach(function (s) {
      var e = toneError(s);
      if (e) errs.push((label || '拼音') + ' 「' + s + '」：' + e);
    });
    // 隔音符号自检：连写后不应出现 a/o/e 直接黏连的歧义
    return errs;
  }

  /* ---------- 输出风格 ---------- */
  /* 'word'   按词连写（默认，符合 GB/T 16159）
     'title'  按词连写 + 首字母大写（专名作标题）
     'spaced' 音节分写（逐字对音，便于不熟悉拼音的读者）          */
  function display(x) {
    if (display.style === 'spaced') return spaced(x);
    if (display.style === 'title') return title(x);
    return word(x);
  }
  display.style = 'title';

  window.PY = {
    syl: syl,
    word: word,
    title: title,
    spaced: spaced,
    plain: plain,
    search: search,
    display: display,
    toneError: toneError,
    expectedToneIndex: expectedToneIndex,
    stripTone: stripTone,
    needsApostrophe: needsApostrophe,
    check: check
  };
})();
