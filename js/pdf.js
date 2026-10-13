/* ==========================================================================
   PPT 模版 PDF · 下载入口渲染
   --------------------------------------------------------------------------
   依赖：assets/pdf-manifest.js（由 tools/scan-pdfs.js 生成）
   暴露：window.PDFDOC
     for(rec)        取某件乐器的模版条目（按 名称 → 别名 → id 查）
     meta()          模版总数 / 扫描日期
     banner(rec)     详情页顶部的大横幅（有模版 / 暂无模版两种）
     kv(rec)         侧栏信息卡里的一行
     chip(rec)       乐器卡上的小角标
     list()          全部模版（关于页用）
     size(bytes)     体积格式化
   ========================================================================== */
(function () {
  'use strict';

  var M = window.PDF_MANIFEST || { meta: { count: 0, scannedAt: '' }, byName: {} };
  var BY = M.byName || {};

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function enc(p) {
    try { return encodeURI(String(p)); } catch (e) { return String(p); }
  }

  function size(bytes) {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  /* 按 名称 → 别名 → id 找条目 */
  function forRec(rec) {
    if (!rec) return null;
    var keys = [rec.name].concat(rec.alias || []).concat([rec.id]);
    for (var i = 0; i < keys.length; i++) {
      if (BY[keys[i]]) return BY[keys[i]];
    }
    return null;
  }

  function meta() {
    return { count: M.meta && M.meta.count || Object.keys(BY).length,
             scannedAt: M.meta && M.meta.scannedAt || '' };
  }

  /* ---------- 详情页：顶部大横幅（加强显示） ---------- */

  function banner(rec) {
    var e = forRec(rec);
    if (!e) {
      return '<div class="dl dl--none">' +
        '<span class="dl__ico">PDF</span>' +
        '<div class="dl__body">' +
          '<p class="dl__title">这件乐器还没有配套 PPT 模版</p>' +
          '<p class="dl__meta">模版不定期更新中 —— 目前已有 ' + meta().count +
            ' 套，去 <a href="about.html#templates">模版下载页</a> 看看有没有别的。</p>' +
        '</div>' +
      '</div>';
    }
    return '<div class="dl">' +
      '<span class="dl__ico">PDF</span>' +
      '<div class="dl__body">' +
        '<p class="dl__title">下载这件乐器的 PPT 模版</p>' +
        '<p class="dl__meta">' + esc(e.file.split('/').pop()) +
          ' · ' + size(e.bytes) + ' · 更新于 ' + esc(e.updated) + '</p>' +
        '<p class="dl__note">课件模版可直接改文字与配图，用于自己的课件、讲义或二次创作。' +
          '<b>模版不定期更新</b>，建议收藏本页。点击后在<b>新标签页</b>打开 PDF，可直接查看或保存。</p>' +
      '</div>' +
      '<a class="dl__btn" href="' + esc(enc(e.file)) + '" target="_blank" rel="noopener noreferrer"' +
        ' title="在新标签页打开 PDF，可直接保存"' +
        ' aria-label="在新标签页打开 ' + esc(rec.name) + ' 的 PPT 模版 PDF">' +
        '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"' +
        ' stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5"/>' +
        '<path d="M4 19h16"/></svg>' +
        '<span>下载 PDF</span>' +
      '</a>' +
    '</div>';
  }

  /* ---------- 侧栏一行 ---------- */

  function kv(rec) {
    var e = forRec(rec);
    if (!e) return ['PPT 模版', '<span style="color:var(--bone-4)">暂无</span>'];
    return ['PPT 模版', '<a href="' + esc(enc(e.file)) + '" target="_blank" rel="noopener noreferrer"' +
      ' title="在新标签页打开 PDF" style="color:var(--gold)">' +
      '下载 PDF（' + size(e.bytes) + '）</a>'];
  }

  /* ---------- 乐器卡角标 ---------- */

  function chip(rec) {
    if (!forRec(rec)) return '';
    return '<span class="chip chip--pdf">PDF 模版</span>';
  }

  /* ---------- 关于页：全部模版 ---------- */

  function list() {
    var names = Object.keys(BY).sort(function (a, b) { return a.localeCompare(b, 'zh'); });
    if (!names.length) {
      return '<div class="dl dl--none"><span class="dl__ico">PDF</span>' +
        '<div class="dl__body"><p class="dl__title">还没有登记模版</p>' +
        '<p class="dl__meta">把 <code>PPT模版-&lt;乐器名&gt;.pdf</code> 放进 <code>assets/pdf/</code> 后运行 <code>node tools/scan-pdfs.js</code> 即可。</p></div></div>';
    }
    return names.map(function (n) {
      var e = BY[n];
      return '<a class="tpl" href="' + esc(enc(e.file)) + '" target="_blank" rel="noopener noreferrer"' +
        ' title="在新标签页打开 PDF"' +
        ' data-tilt="6" data-ripple>' +
        '<span class="tpl__ico">PDF</span>' +
        '<span class="tpl__name">' + esc(n) + '</span>' +
        '<span class="tpl__meta">' + size(e.bytes) + ' · ' + esc(e.updated) + '</span>' +
        '<span class="tpl__go">打开' +
          '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"' +
          ' stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px">' +
          '<path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>' +
        '</span>' +
      '</a>';
    }).join('');
  }

  window.PDFDOC = {
    for: forRec,
    meta: meta,
    banner: banner,
    kv: kv,
    chip: chip,
    list: list,
    size: size,
    has: function () { return Object.keys(BY).length > 0; }
  };
})();
