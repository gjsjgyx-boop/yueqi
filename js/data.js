/* ==========================================================================
   中国传统乐器 · 数据聚合层
   --------------------------------------------------------------------------
   依赖：data/chui.js · data/tan.js · data/la.js · data/da.js · data/he.js
   暴露：window.SITE_DATA
   结构只有两层 —— 四大类 + 一件推演新制 → 具体乐器，不做更深的层级。
   `he` 是第 72 件「龢」：一件按 71 件乐器的优点推演设计、并不存在的乐器，
   单独成一类（合鸣新制），因此不参与"历史乐器"的统计口径。
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 四大类（网站一级分类，也是唯一一级分类） ---------- */

  var CATS = {
    chui: {
      key: 'chui',
      name: '吹管乐器',
      en: 'Wind & Blown',
      glyph: '吹',
      idx: '壹',
      color: 'var(--cat-chui)',
      short: '靠一口气发声',
      desc: '从八千年前的骨哨，到唢呐的高亢、埙的苍茫。它们是所有乐器里最接近呼吸的一类——你呼出的气，就是旋律本身。',
      preview: ['笛子', '洞箫', '埙', '笙', '唢呐', '葫芦丝'],
      rep: 'dizi',
      accent: '#35D6B0'
    },
    tan: {
      key: 'tan',
      name: '弹拨乐器',
      en: 'Plucked',
      glyph: '弹',
      idx: '贰',
      color: 'var(--cat-tan)',
      short: '手指与弦的对话',
      desc: '一颗音符落地，余音自己会长出形状。古琴的散淡、琵琶的急促、筝的绵密，都在同一根弦上被手指重新发明。',
      preview: ['古琴', '古筝', '琵琶', '阮', '箜篌', '扬琴'],
      rep: 'sanxian',
      accent: '#E8B84B'
    },
    la: {
      key: 'la',
      name: '拉弦乐器',
      en: 'Bowed',
      glyph: '拉',
      idx: '叁',
      color: 'var(--cat-la)',
      short: '最长情的一类',
      desc: '弓与弦相持不下，声音是磨出来的。二胡的两根弦能拉出整段人生，马头琴一响，草原就出现在脑子里。',
      preview: ['二胡', '板胡', '京胡', '马头琴', '高胡', '萨它尔'],
      rep: 'erhu',
      accent: '#F0533A'
    },
    da: {
      key: 'da',
      name: '打击乐器',
      en: 'Percussion',
      glyph: '打',
      idx: '肆',
      color: 'var(--cat-da)',
      short: '最早的心跳',
      desc: '人类第一件乐器就是用来敲的。从曾侯乙编钟的青铜共鸣，到象脚鼓在泼水节上震动的空气，节奏从来都是身体的共同语言。',
      preview: ['编钟', '编磬', '大鼓', '锣', '云锣', '象脚鼓'],
      rep: 'bianzhong',
      accent: '#9B6BF2'
    },
    he: {
      key: 'he',
      name: '合鸣新制',
      en: 'Devised',
      glyph: '龢',
      idx: '伍',
      badge: '推演',
      devised: true,
      page: 'he.html',
      color: 'var(--cat-he)',
      short: '八音俱备 · 一器四法',
      desc: '一件不存在的乐器。把 71 件真乐器的长处归成十二条「器之能」，再给每一对互相打架的优点找一处物理上的分工——八种材料都在这件器上，吹、弹、拉、打四种发声法也都在。它是纸上的乐器，同时是一份可以照着做的设计。',
      preview: ['龢', '八音各九', '七十二声'],
      rep: 'he',
      accent: '#7FC4E8'
    }
  };

  var CAT_ORDER = ['chui', 'tan', 'la', 'da', 'he'];

  /* ---------- 八音：中国最早的乐器材质分类法 ---------- */

  var BAYIN = [
    { char: '金', mat: 'Jīn · Metal', color: '#C9CDD6',
      desc: '青铜与金属铸造，先秦礼乐的核心。声音洪亮、穿透力强，也用于军旅号令。钟、铙、钲、铎这些字，最早都是青铜器的名字。',
      insts: ['编钟', '锣', '钹', '云锣', '铙', '铎', '钲', '錞于', '碰铃', '口弦'] },
    { char: '石', mat: 'Shí · Stone', color: '#8FB8C9',
      desc: '玉石或石灰石打磨成片，悬挂成组敲击。音色清越冷冽，是"金石之声"里的那一半。海螺壳质近石，也归入此类。',
      insts: ['编磬', '海螺'] },
    { char: '土', mat: 'Tǔ · Clay', color: '#C89A6B',
      desc: '陶土烧制，最古老的发声材料。埙那种像风穿过空房间的音色，是泥土留下的记忆——它比任何弦和管都更早。',
      insts: ['埙'] },
    { char: '革', mat: 'Gé · Hide', color: '#B8763F',
      desc: '兽皮蒙在木框或陶框上，用槌、用手掌、用拳头去击。鼓声是所有仪式的心跳，也是军队和节庆里最先响起的声音。',
      insts: ['大鼓', '排鼓', '堂鼓', '缸鼓', '象脚鼓', '渔鼓', '角'] },
    { char: '丝', mat: 'Sī · Silk', color: '#E8B84B',
      desc: '蚕丝绞成弦，绷在木制共鸣箱上。细腻、绵长、能唱出滑音，中国乐器里最会表达情绪的一类。要注意：八音成于先秦，那时还没有胡琴——今天所有弹拨与拉弦乐器，按"振动体是弦"的原则都归入丝。',
      insts: ['古琴', '古筝', '琵琶', '二胡', '阮', '三弦', '马头琴', '扬琴'] },
    { char: '木', mat: 'Mù · Wood', color: '#9C7A4E',
      desc: '整块硬木制成，靠撞击发声；木制管身的唢呐、管子也归此类。干脆、短促、颗粒感强，专门负责把节奏钉死在拍子上。',
      insts: ['唢呐', '管子', '胡笳', '木鱼', '梆子', '拍板'] },
    { char: '匏', mat: 'Páo · Gourd', color: '#8FBF6B',
      desc: '葫芦做共鸣体，插上竹管与簧片。中国最早的"和声"乐器，一吹就能同时响好几个音——笙是世界上最早使用自由簧的乐器之一。',
      insts: ['笙', '芦笙', '葫芦丝'] },
    { char: '竹', mat: 'Zhú · Bamboo', color: '#5FC9A8',
      desc: '一节竹子打通就是一根管子。开孔、贴膜、加哨片，变化出中国吹管乐器的大半个家族，也顺带决定了它们清亮的底色。',
      insts: ['笛子', '洞箫', '篪', '筚篥', '巴乌', '排箫', '芒筒', '吐良'] }
  ];

  /* ---------- 「合」：第 72 件专用，不算第八音之外的第九音 ----------
     第 72 件「龢」八音俱备，不专属任何一种材料，所以八音里没有它的位置。
     这里单独给它一格，只为让人一眼看到"八音凑齐了"。 */

  var BAYIN_HE = {
    char: '合', mat: 'Hé · All Eight', color: '#7FC4E8',
    desc: '第 72 件「龢」不属于任何一材：金、石、土、革、丝、木、匏、竹各出九件发声体，全装在它一件器上，正合《尚书》那句「八音克谐」。八音是先秦按材料分的八类，所以它标「合」，不另立第九音。',
    insts: ['龢']
  };

  /* ---------- 时间轴：中国音乐八千年 ---------- */
  var TIMELINE = [
    { era: '约 9000–7500 年前', title: '骨笛与骨哨：最早的音高',
      text: '河南舞阳贾湖遗址出土的骨笛，用鹤类尺骨钻出音孔，至今仍能吹出完整音阶。浙江河姆渡的骨哨、西安半坡的陶埙，说明在文字出现之前，中国人已经在精确地控制音高。' },
    { era: '商周 · 前 1600–前 256', title: '青铜礼乐与"八音"分类',
      text: '青铜铸造技术把乐器推向体量极限。编钟、编磬成组出现，与鼎簋一起构成等级制度。也正是在这一时期，中国人按制作材料把乐器分成金、石、土、革、丝、木、匏、竹八类——比欧洲的乐器分类法早了两千多年。' },
    { era: '先秦 · 前 770–前 221', title: '《诗经》与曾侯乙编钟',
      text: '《诗经》里的"琴瑟友之""钟鼓乐之"，说明乐器已进入日常生活。1978 年湖北随州曾侯乙墓出土 65 件编钟，总音域跨五个八度，一件钟能敲出两个音，改写了对先秦音乐水平的估计。' },
    { era: '汉魏 · 前 202–公元 589', title: '丝路初通，乐器开始混血',
      text: '琵琶、箜篌、胡笳、羌笛沿丝绸之路进入中原，与本土的琴、瑟、笙、竽混编演出。相和歌、清商乐兴起，乐器组合第一次有了"编制"的概念。' },
    { era: '隋唐 · 581–907', title: '燕乐鼎盛：一个什么都敢听的朝代',
      text: '唐代设十部乐，龟兹、疏勒、康国、安国的乐队与中原雅乐同台。筚篥、羯鼓、琵琶成为顶流，教坊与梨园培养出第一批职业乐工。这是中国乐器史上最开放的一段。' },
    { era: '宋元 · 960–1368', title: '弓弦登场，市井有声',
      text: '奚琴演变为胡琴，中国终于有了自己的拉弦家族——它比弹拨更接近人声。勾栏瓦舍里的说唱、杂剧、南戏需要小规模伴奏，三弦、二胡、云锣因此普及。音乐从宫廷走进了街市。' },
    { era: '明清 · 1368–1912', title: '戏曲定腔，独奏成谱',
      text: '昆曲、梆子、京剧各自锁定主奏乐器，京胡、板胡由此定型。古琴留下《神奇秘谱》等大批琴谱，江南丝竹、广东音乐等民间乐种成形。乐器的性格开始按地域分化。' },
    { era: '近现代 · 1912 至今', title: '从改良到国潮',
      text: '刘天华改进二胡技法并把它带进高等学府，民族管弦乐队参照交响乐编制重组。2003 年古琴艺术入选联合国人类非物质文化遗产。今天，这些声音出现在电影配乐、游戏原声和年轻人的歌单里——它们没有成为标本。' },
    /* 时间轴的最后一格不是历史，是本站的推演：八音俱备、一器四法的第 72 件「龢」。
       它被刻意标出来，好让"八千年"与"还没有发生的事"不会混在一起。 */
    { era: '二〇二六年 · 推演', title: '第 72 件：把 71 件的长处排进一件器里',
      devised: true,
      link: 'he.html',
      text: '前八个节点都是已经发生的事，这一个不是。本站把 71 件乐器的长处归成十二条，找出它们互相打架的六组地方，写成八条可检验的命题，再设计出一件八音俱备、吹弹拉打俱全的乐器——「龢」。它不是文物：没有实物、没有录音、没有人演奏过，只是一份可以照着做的设计。放在这条时间轴的末尾，是想说：八千年不是八个句号，最后那一格仍然空着。' }
  ];

  /* ---------- 合并四大类数据 ------------------------------------------ */

  var RAW = {
    chui: window.__CAT_CHUI || [],
    tan: window.__CAT_TAN || [],
    la: window.__CAT_LA || [],
    da: window.__CAT_DA || [],
    he: window.__CAT_HE || []
  };

  var ALL = [];
  var BY_ID = {};

  CAT_ORDER.forEach(function (catKey) {
    var list = RAW[catKey] || [];
    list.forEach(function (item, i) {
      if (!item || !item.id) return;
      var cat = CATS[catKey];
      var rec = {
        /* 必需字段兜底 */
        id: String(item.id),
        name: item.name || item.id,
        pinyin: PY.syl(item.pinyin),
        alias: Array.isArray(item.alias) ? item.alias : [],
        bayin: item.bayin || '竹',
        era: item.era || '',
        rare: !!item.rare,
        batch: item.batch || 2,
        /* 第 72 件专用：推演新制标记 + 优点来源乐器（详情页据此展开"同类"） */
        devised: !!item.devised,
        sourceIds: Array.isArray(item.sourceIds) ? item.sourceIds.slice() : [],
        tagline: item.tagline || '',
        desc: item.desc || '',
        history: item.history || '',
        feature: item.feature || '',
        culture: item.culture || '',
        modern: item.modern || '',
        works: Array.isArray(item.works) ? item.works : [],
        tags: Array.isArray(item.tags) ? item.tags : [],
        /* 派生字段 */
        cat: catKey,
        catName: cat.name,
        catEn: cat.en,
        catGlyph: cat.glyph,
        color: cat.accent,
        order: i,
        idx: ALL.length
      };
      ALL.push(rec);
      BY_ID[rec.id] = rec;
    });
  });

  /* ---------- 查询接口 ------------------------------------------------- */

  var API = {
    cats: CATS,
    catOrder: CAT_ORDER,
    bayin: BAYIN,
    timeline: TIMELINE,
    all: ALL,
    byId: BY_ID,
    PY: PY,

    cat: function (key) { return CATS[key] || null; },

    count: function (catKey) {
      if (!catKey || catKey === 'all') return ALL.length;
      return ALL.filter(function (x) { return x.cat === catKey; }).length;
    },

    rareCount: function () {
      return ALL.filter(function (x) { return x.rare; }).length;
    },

    /* 历史乐器 / 推演新制 的分开计数（第 72 件不计入"历史乐器"口径） */
    devisedCount: function () {
      return ALL.filter(function (x) { return x.devised; }).length;
    },

    historyCount: function () {
      return ALL.filter(function (x) { return !x.devised; }).length;
    },

    byCat: function (catKey) {
      if (!catKey || catKey === 'all') return ALL.slice();
      return ALL.filter(function (x) { return x.cat === catKey; });
    },

    get: function (id) { return BY_ID[id] || null; },

    /* 关键词搜索：名称 / 拼音 / 别名 / 标签 / 八音 / 正文 */
    search: function (q) {
      if (!q) return ALL.slice();
      var k = String(q).trim().toLowerCase();
      if (!k) return ALL.slice();
      return ALL.filter(function (x) {
        return (x.name + ' ' + PY.search(x.pinyin) + ' ' + x.alias.join(' ') + ' ' +
          x.tags.join(' ') + ' ' + x.bayin + ' ' + x.catName + ' ' +
          x.tagline + ' ' + x.desc).toLowerCase().indexOf(k) !== -1;
      });
    },

    /* 首页精选：每类取高知名度乐器，交错排列。
       两轮走：第一轮只挑「已经有配图」的（首页八张卡片尽量都是真图），
       数量不够时第二轮再补没有素材的乐器（卡片上显示空图区占位）。 */
    featured: function (n) {
      n = n || 8;
      var M = window.ASSET_MANIFEST || {};
      var hasPic = function (x) {
        var o = M[x.name];
        if (!o) return false;
        return ['img', 'anim', 'video'].some(function (kind) {
          return o[kind] && Object.keys(o[kind]).length > 0;
        });
      };
      var pools = CAT_ORDER.map(function (k) {
        return API.byCat(k).filter(function (x) { return x.batch <= 2; });
      });
      var out = [], used = [];

      /* 每轮从左到右逛一遍各类，每类取一件；picOnly=只要已有配图的 */
      var pickRound = function (picOnly, round) {
        var progressed = false;
        for (var c = 0; c < pools.length && out.length < n; c++) {
          var p = pools[(round + c) % pools.length];
          for (var j = 0; j < p.length; j++) {
            if (used.indexOf(p[j]) !== -1) continue;
            if (picOnly && !hasPic(p[j])) continue;
            used.push(p[j]);
            out.push(p[j]);
            progressed = true;
            break;
          }
        }
        return progressed;
      };

      var round = 0;
      while (out.length < n && pickRound(true, round)) round++;      /* 先挑有图的 */
      round = 0;
      while (out.length < n && pickRound(false, round)) round++;     /* 不够再补 */
      return out.slice(0, n);
    },

    /* 列表顺序（用于详情页上/下一个） */
    step: function (id, delta) {
      var rec = BY_ID[id];
      if (!rec) return null;
      /* 在同一大类内前后移动，到边界时跨到相邻大类 */
      var list = API.byCat(rec.cat);
      var pos = list.findIndex(function (x) { return x.id === id; });
      var next = pos + delta;
      if (next >= 0 && next < list.length) return list[next];
      var catPos = CAT_ORDER.indexOf(rec.cat) + (delta > 0 ? 1 : -1);
      if (catPos < 0) catPos = CAT_ORDER.length - 1;
      if (catPos >= CAT_ORDER.length) catPos = 0;
      var other = API.byCat(CAT_ORDER[catPos]);
      if (!other.length) return null;
      return delta > 0 ? other[0] : other[other.length - 1];
    },

    /* 相关乐器：同大类、优先同八音材质；
       第 72 件「龢」没有同类，改按它自报的「优点来源」乐器展开 */
    related: function (id, n) {
      n = n || 4;
      var rec = BY_ID[id];
      if (!rec) return [];
      if (rec.sourceIds && rec.sourceIds.length) {
        var src = rec.sourceIds.map(function (sid) { return BY_ID[sid]; })
          .filter(function (x) { return !!x; });
        if (src.length) return src.slice(0, n);
      }
      var same = ALL.filter(function (x) { return x.cat === rec.cat && x.id !== id; });
      same.sort(function (a, b) {
        var sa = (a.bayin === rec.bayin ? 0 : 1) + (a.rare === rec.rare ? 0 : 0.5);
        var sb = (b.bayin === rec.bayin ? 0 : 1) + (b.rare === rec.rare ? 0 : 0.5);
        return sa - sb;
      });
      return same.slice(0, n);
    },

    /* 八音统计（第 72 件八音俱备，作为第九格「合」追加在后面） */
    bayinStats: function () {
      var list = BAYIN.map(function (b) {
        return {
          char: b.char,
          mat: b.mat,
          color: b.color,
          desc: b.desc,
          insts: b.insts,
          n: ALL.filter(function (x) { return x.bayin === b.char; }).length
        };
      });
      var extra = ALL.filter(function (x) { return x.bayin === BAYIN_HE.char; });
      if (extra.length) {
        list.push({
          char: BAYIN_HE.char,
          mat: BAYIN_HE.mat,
          color: BAYIN_HE.color,
          desc: BAYIN_HE.desc,
          insts: BAYIN_HE.insts,
          n: extra.length,
          extra: true
        });
      }
      return list;
    },

    /* 批次统计（第 1 批最知名 … 第 4 批最冷门） */
    batchCount: function (b) {
      return ALL.filter(function (x) { return x.batch === b; }).length;
    }
  };

  window.SITE_DATA = API;

  /* 开发期自检：控制台会提示数据是否齐全 */
  if (window.console && console.info) {
    console.info('[中国传统乐器] 数据载入 ' + ALL.length + ' 种（历史乐器 ' + API.historyCount() +
      ' + 推演新制 ' + API.devisedCount() + '）· 冷门/少数民族 ' + API.rareCount() +
      ' 种 · ' + CAT_ORDER.map(function (k) { return CATS[k].name + API.count(k); }).join(' / '));
  }
})();
