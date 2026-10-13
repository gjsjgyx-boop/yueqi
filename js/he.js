/* ==========================================================================
   中国传统乐器 · 第 72 件「龢」设计推演专页
   --------------------------------------------------------------------------
   这一页的内容分三块：
     1) 推导：71 件乐器的长处 → 十二条器之能 → 六组冲突 → 八条命题
     2) 设计：八音各九 = 七十二发声体 · 四肢分工 · 律制音域 · 造它的五步
     3) 对照：71 件乐器各自贡献了什么（一张完整的表）
   另有「合成试听」：用 Web Audio 现场合成四种发声法，
   因为这件乐器还不存在，没有真实录音可放 —— 这一点在页面上写明了。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA, C = window.COMP;
  var $ = window.UI.$, esc = C.escape;

  /* ---------- 一、十二条器之能 ---------------------------------------- */

  var ABILITIES = [
    { n: '器之能 01', char: '点', desc: '一音即起，短促清晰，负责把句子切成颗粒。没有点，音乐就没有咬字。',
      from: ['琵琶', '柳琴', '月琴', '梆子', '木鱼'] },
    { n: '器之能 02', char: '线', desc: '一条音可以一直不断，从极弱到极强都稳。中国人的抒情多半靠线，不靠和弦。',
      from: ['笙', '洞箫', '二胡', '胡尔', '马头琴'] },
    { n: '器之能 03', char: '韵', desc: '音与音之间还有过程：滑、揉、颤、走手音。这是中国乐器最不像西洋乐器的地方。',
      from: ['古琴', '二胡', '坠琴', '坠胡'] },
    { n: '器之能 04', char: '和', desc: '一件乐器自己就能同时响好几个音。笙比欧洲早了两千多年用上自由簧的和声。',
      from: ['笙', '古筝', '瑟', '阮'] },
    { n: '器之能 05', char: '律', desc: '音高是被造出来的，不靠临场调，误差小到让声学研究者惊讶。',
      from: ['编钟', '编磬', '云锣'] },
    { n: '器之能 06', char: '变', desc: '不换乐器就能换调：移柱、按孔、按指，一套音阶里旋宫转调。',
      from: ['古筝', '笛子', '笙'] },
    { n: '器之能 07', char: '泛', desc: '一根弦上取出整个泛音列，声音薄、亮、远，像从另一个方向传来。',
      from: ['独弦琴', '古琴', '马头琴'] },
    { n: '器之能 08', char: '鸣', desc: '主音之外还有一层在响：共鸣弦自己跟着振，余韵自己长出来。',
      from: ['萨它尔', '编钟', '箜篌'] },
    { n: '器之能 09', char: '噪', desc: '不成乐音的声音也有表情。锣钹一响，场面就换了；海螺一响，山谷都醒了。',
      from: ['锣', '钹', '梆子', '海螺'] },
    { n: '器之能 10', char: '拟', desc: '能模仿人说话、鸟叫、锣鼓经。一件乐器可以演一整台戏。',
      from: ['擂琴', '坠胡', '口弦'] },
    { n: '器之能 11', char: '势', desc: '音量能推到很远，压得住全场，也能把情绪顶到最高处。',
      from: ['唢呐', '大鼓', '角', '缸鼓'] },
    { n: '器之能 12', char: '静', desc: '也能小到贴着呼吸，极弱处依然有音色，留白也是音乐的一部分。',
      from: ['洞箫', '古琴', '牛腿琴', '雅托噶'] }
  ];

  /* ---------- 二、六组冲突 -------------------------------------------- */

  var CONFLICTS = [
    {
      n: '冲突 01', title: '点与线，长不到一起',
      a: { tag: '弹拨的脾气', text: '一拨就衰减，声音天生是「点」。颗粒清楚，却留不住。' },
      b: { tag: '吹拉的脾气', text: '要一直给劲才不断，声音天生是「线」。能留住，却少了咬字。' },
      solve: '把两条线交给两样不怕累的东西：笙的<b>自由簧</b>一进气就持续发声，脚踏的<b>木轮</b>一直在转——等于一把永不换向的弓。弦、金、木、革仍旧是点。点与线于是同时在场，谁也不将就谁。'
    },
    {
      n: '冲突 02', title: '四类奏法，只有两只手',
      a: { tag: '需要的', text: '弹要右手，拉要右手，打也要右手；一件器想把四类都收进来，手不够用。' },
      b: { tag: '现实', text: '一个人只有两只手、一口气，演奏姿势一旦定了，别的奏法就进不来。' },
      solve: '让身体其它部分接管声部：<b>口</b>吹簧与管，<b>双足</b>踏轮，<b>左手</b>按弦与摇杆，<b>右手</b>只负责弹与击。四肢各管一路，这是整件设计里最关键的分配。'
    },
    {
      n: '冲突 03', title: '一件身躯，八种材料',
      a: { tag: '需要的', text: '铜钟、石磬、竹管、丝弦、皮膜、木块、匏簧、陶腔，八套振动体各有各的构造。' },
      b: { tag: '现实', text: '一个共鸣箱装不下八套振动体；硬塞，声音先糊掉。' },
      solve: '不共用振动体，共用<b>共鸣体</b>。台面下的陶制九室是公共腔，八种发声体都朝它耦合：材料各归其位、分散在器台四周，声音却从同一个腔里出来。这就是「八音和鸣」在物理上唯一说得通的做法。'
    },
    {
      n: '冲突 04', title: '准与韵，互相拆台',
      a: { tag: '有柱有品', text: '音准稳、快速乐句靠得住，但音与音之间是断的，滑不出来。' },
      b: { tag: '无柱无品', text: '滑音自由、能哭能笑，但快起来音准全靠耳朵，站不住。' },
      solve: '九根弦分三组：三根<b>有柱</b>管准，三根<b>无柱</b>管韵，三根过<b>摇杆</b>取泛音。要准用柱，要韵用无柱，要亮用摇杆——三组不必二选一，可以同时用。'
    },
    {
      n: '冲突 05', title: '强的会把弱的埋掉',
      a: { tag: '强的一头', text: '唢呐、大鼓、锣一响，声压立刻盖住所有细节。' },
      b: { tag: '弱的一头', text: '可箫与琴最动人的，恰恰是极弱的那一层——这一层最容易被牺牲。' },
      solve: '<b>分区布局</b>加<b>可拆模块</b>：金、革放在器台远端，与人身拉开距离；丝、竹贴近人身。唢呐哨、钹、锣都做成可拆件，需要「喊」的时候才装上去，平时整件器保持低噪、近身。'
    },
    {
      n: '冲突 06', title: '古法好用，今台难用',
      a: { tag: '全按古法', text: '八千年的音色都在，但当代舞台上拾音、扩声、与电子乐合作都很别扭。' },
      b: { tag: '全按今法', text: '好用了，可音色已经不是它自己，成了另一件新乐器。' },
      solve: '原声一件不改，另加<b>拾音与数字接口</b>。器上每一样都按老办法发声，只是可以被拾起来、被采样、被送进今天的音乐里——改的是接口，不是乐器。'
    }
  ];

  /* ---------- 三、八条命题 -------------------------------------------- */

  var PROPS = [
    { t: '四类发声法可以在同一件器上同时进行，而不互相掩蔽。',
      d: '这是整件设计的第一命题。做不到这一条，后面全是空话。',
      c: '判据：同一段录音里，金、石、丝、竹、革的木五个声部都能单独被听出来。' },
    { t: '八种材料各自成为独立的发声体，合计七十二 —— 八音各九。',
      d: '九是「九成」之数：《尚书》说「箫韶九成」，九为完成。八音各九，正好七十二件。',
      c: '判据：部件清单里每种材料恰好九件，且每一件都能单独出声。' },
    { t: '持续音与衰减音可以同时存在。',
      d: '簧与轮给出不衰减的线，弦与金木给出衰减的点，两者叠在一起才是完整的句子。',
      c: '判据：长音进行时，仍能听见点状的弦音与钟磬音。' },
    { t: '一根弦上可以取到完整的泛音列。',
      d: '独弦琴已经证明过：一根弦不是一根音，而是一整列音。',
      c: '判据：摇杆逐段移动时，泛音列逐一应声，音高准确。' },
    { t: '无柱弦可以做出人声级的滑音与揉弦。',
      d: '二胡的无品走手，是「最像人声」这条评价的来源，必须保留。',
      c: '判据：滑音过程中音高连续变化、可控制、可停顿。' },
    { t: '定音金石的音高可以给弦与管当基准。',
      d: '编钟的音准是铸造出来的，不靠临场调；用它校准，琴就不必再靠耳朵。',
      c: '判据：钟磬与弦管的音高互校后，误差落在可辨范围之外。' },
    { t: '一个人可以用四肢同时驱动全部四类发声法。',
      d: '这是「一个人就是一支乐队」能不能成立的关键，也是擂琴留给后人的那条路。',
      c: '判据：一个人独立完成一段包含四类发声法的乐句。' },
    { t: '整器可以拆成八件仍能单独使用的模块。',
      d: '拆开之后，每一块自己也是一件能演奏的乐器——这样它才不至于成为一件只能看的展品。',
      c: '判据：任一模块单独取出后，仍具备完整的演奏功能。' }
  ];

  /* ---------- 四、八音各九 -------------------------------------------- */

  var BAYIN9 = [
    { char: '金', n: '九 枚', name: '合瓦小钟', en: 'Nine Bells', col: '#C9CDD6',
      use: '沿器台后缘悬挂。每枚正鼓部、侧鼓部各出一音，九钟共十八个音位；音高由铸造与打磨定死，是全器的基准。' },
    { char: '石', n: '九 片', name: '玉磬', en: 'Nine Chimes', col: '#8FB8C9',
      use: '嵌在器台前沿的凹槽里，音高与钟互补。清越、短促、穿透力强，专门给句子加一层冷色。' },
    { char: '土', n: '九 室', name: '陶制共鸣腔', en: 'Nine Clay Chambers', col: '#C89A6B',
      use: '台面下的公共共鸣腔，按九个音区分隔。其中一室开吹口成埙，整件器的底色从这里出。' },
    { char: '革', n: '九 处', name: '蒙皮', en: 'Nine Skins', col: '#B8763F',
      use: '中央一面小鼓，外加八处嵌在腔体开孔上的皮膜。鼓给节拍与力度，皮膜让气流与弦振带上一层轻微沙响。' },
    { char: '丝', n: '九 弦', name: '蚕丝弦', en: 'Nine Silk Strings', col: '#E8B84B',
      use: '分三组：有柱三根管准、无柱三根管韵、摇杆三根取泛音。九弦覆在陶腔之上，是这件器最像人声的一层。' },
    { char: '木', n: '九 块', name: '硬木音块', en: 'Nine Wooden Blocks', col: '#9C7A4E',
      use: '九块硬木既是弦的支点（柱），也可以被敲击成声。移动它转调，敲它得清脆的木质颗粒。' },
    { char: '匏', n: '九 簧', name: '匏斗自由簧', en: 'Nine Free Reeds', col: '#8FBF6B',
      use: '葫芦斗内九枚自由簧，口吹即持续发声，一口气可以同时响好几个音，是全器的和声底。' },
    { char: '竹', n: '九 管', name: '竹管', en: 'Nine Bamboo Pipes', col: '#5FC9A8',
      use: '一管一音，按长短排列。最下两根分别作箫管与带膜管，另备一根可插的双簧哨管，负责明亮与悲怆两种极端。' }
  ];

  /* ---------- 五、四肢分工 -------------------------------------------- */

  var LIMBS = [
    { organ: '口', t: '气 · 簧与管', tags: ['笙式自由簧', '排箫式管列', '可插双簧哨'],
      d: '九簧给持续的和声底，九管给气声旋律。呼气同时驱动簧与管，所以最底下那层永不中断——这是「线」的来源。' },
    { organ: '左手', t: '按 · 韵与律', tags: ['按弦走韵', '移柱转调', '推摇杆取泛音'],
      d: '管九弦的左端：滑、揉、颤都在这一只手上；移动木柱换调；推起摇杆，泛音列逐一应声。' },
    { organ: '右手', t: '弹与击 · 点', tags: ['拨弦', '持槌击钟磬', '敲木块'],
      d: '点状的弦音与金、石、木的点全在这一只手上。它管的不是声部，是咬字——句子的每一顿都在这里。' },
    { organ: '双足', t: '踏轮 · 无尽弓', tags: ['左脚低音三弦', '右脚中音三弦', '轮速即力度'],
      d: '踏板带动两只上了松香的木轮，轮转则弦鸣，永不换向。轮速决定持续音的强弱与揉弦的密疏，等于用脚在拉弓。' }
  ];

  /* ---------- 六、71 件各自的贡献 --------------------------------------
     每条三格：乐器名 · 可借之处 · 在「龢」上的落点
     按四大类分组，顺序与图鉴一致。 */

  var MAP = [
    { cat: 'chui', items: [
      ['笛子', '竹管贴膜，气息直接，音色明亮穿透', '竹九管中三根贴笛膜，横吹气息直入管身'],
      ['洞箫', '竖吹低音苍茫，弱奏能到极静', '竹管最下一根作箫管，专任弱奏与长气'],
      ['埙', '陶腔闭环，苍凉古朴，最古老的音色', '土九室中掏出一室作埙腔兼吹口，全器的土色'],
      ['笙', '自由簧，一吹多音，可持续不必换气', '匏斗九簧：口吹持续和声，全器的底色'],
      ['芦笙', '簧管成排，音量足，能带着人跳', '簧管长管列，负责带节奏的强奏段落'],
      ['葫芦丝', '簧加管，柔美如人声低语', '高音区柔音管，管甜而不尖的那一层'],
      ['巴乌', '竹管带簧，音色像人在哭', '一根带簧竹管专供抒情滑音'],
      ['唢呐', '双簧哨片，音量与穿透力第一', '可拆双簧哨管，需要「喊」的时候装上去'],
      ['管子', '双簧，悲怆有骨感', '双簧哨的第二套音色，专走悲调'],
      ['排箫', '一管一音，气流切出清亮', '竹管按长短成列，管列本身就是音阶'],
      ['篪', '比笛更古的闭管吹法，音色沉', '竹管中一根作闭管，与开管音色对照'],
      ['筚篥', '西域双簧，忧伤直上', '双簧音色在旋宫转调里的用法'],
      ['胡笳', '笳声即乡愁，气息里带哭腔', '气息控制做出哭腔式的滑落'],
      ['角', '牛角天然喇叭，声传很远', '器台后缘的角形导音口，强奏时把声音送出去'],
      ['芒筒', '芦笙乐队的低音炮，粗管低鸣', '最低一组竹管，做低音共鸣管'],
      ['吐良', '双管同时发声，天然的「双声道」', '一组双管同吹，形成两音并行的双声'],
      ['口弦', '口腔就是共鸣腔，一簧多音', '陶腔可随身体开合变形，取音如口弦'],
      ['海螺', '螺旋腔的号音，仪式感极强', '陶腔做螺旋导音道，长音带号角式的庄严']
    ] },
    { cat: 'tan', items: [
      ['古琴', '散、按、泛三声，走手取韵', '丝弦三种取音法全留，按音专管走手韵'],
      ['古筝', '移柱转调，多弦刮奏', '木柱可移，一器旋宫；刮奏由右手一次带过'],
      ['琵琶', '颗粒清亮，轮指把点连成线', '拨弦颗粒加轮指式快速连拨'],
      ['阮', '中低音圆润，和声支撑', '中低音三弦的圆润底色'],
      ['柳琴', '高音弹拨，清亮点状', '最高一组弦的清脆点音'],
      ['月琴', '短促干脆，戏曲的节拍器', '拨弦兼作节奏，短促顿音钉拍子'],
      ['三弦', '一根弦也能说书，颗粒粗犷', '低音弦的粗颗粒与说唱式语气'],
      ['箜篌', '弦列长，琶音如流水', '九弦按音阶排布，可作连续琶音'],
      ['瑟', '五十弦的厚度，一弦一柱', '九弦分三组同振，做出合奏式的厚度'],
      ['扬琴', '一槌击弦，八度双音一手可得', '右手小槌兼击弦，八度双音一槌拿下'],
      ['独弦琴', '一弦取泛音列，摇杆控韵', '摇杆组：一根弦上取整个泛音列'],
      ['秦琴', '低调、好合群，广东味', '中音弦不抢戏的合群音色'],
      ['热瓦普', '皮膜共鸣面，一开口就是西域', '革膜共鸣面给弦音加一层皮色'],
      ['都塔尔', '两弦长颈，唱的是心事', '双弦同度与八度的长颈弦法'],
      ['冬不拉', '两弦同体，节奏与旋律一起走', '两弦既弹旋律又打节奏'],
      ['雅托噶', '蒙古筝，古朴少装饰', '保留一种不加花的朴素定弦与弹法'],
      ['轧筝', '竹片擦弦，拉弦乐器的老祖宗', '轮擦取音的祖型：由擦到轮，成为无尽弓']
    ] },
    { cat: 'la', items: [
      ['二胡', '无品走手，最接近人声', '无柱三弦专管滑音与哭腔'],
      ['板胡', '高亢嘹亮，梆子戏的主奏', '高音擦弦的亮度与穿透'],
      ['京胡', '竹筒蛇皮，京剧的嗓子', '竹筒加蛇皮的小共鸣体，走戏曲腔调'],
      ['高胡', '广东音乐的甜', '高音擦弦的甜味：弱力度、贴近指板'],
      ['中胡', '不抢戏，少了它就空', '中音擦弦的填充声部'],
      ['坠胡', '会说话，能拟人声', '拟人声所需的滑揉幅度与顿挫'],
      ['马头琴', '低音加泛音，双弦出和音', '低音擦弦与双弦和音，泛音带草原色'],
      ['擂琴', '一把琴能学人说话、学锣鼓', '拟声这条能力全器继承：弦仿人声，腔仿锣鼓'],
      ['革胡', '民族乐队的低音大块头', '最低音擦弦，配最大的一室陶腔'],
      ['奚琴', '所有胡琴的老祖宗，竹片擦弦', '保留竹片擦奏这一种原始手法'],
      ['椰胡', '椰壳琴筒，柔而不亮', '共鸣腔可换壳：椰壳、陶、木各出一种音色'],
      ['牛腿琴', '只为情歌伴奏，轻声细语', '贴近人身的弱奏音量'],
      ['萨它尔', '主弦之外有共鸣弦，余韵自生', '共鸣弦：不弹也响，给主音垫一层余韵'],
      ['艾捷克', '圆滚共鸣体，新疆胡琴', '球形小共鸣体，声音带圆的鼻音'],
      ['坠琴', '又高又瘦，滑音带口音', '长按板上的大幅滑音，做出带口音的腔'],
      ['胡尔', '史诗伴奏，重复而持续', '低音擦弦的持续铺底与说唱式反复'],
      ['软弓京胡', '弓毛松，能连续抖出细密音', '松弓毛的贴弦感：轮擦时用压力做细颤']
    ] },
    { cat: 'da', items: [
      ['编钟', '一钟双音，音高由铸造定死', '金九钟每钟正鼓、侧鼓各一音，共十八个音位'],
      ['编磬', '石音清越短促，补足金石之半', '石九磬嵌在前沿，音高与钟互补'],
      ['大鼓', '力度极限，一槌全场安静', '一面主鼓给强拍与气势'],
      ['排鼓', '一人一支鼓队，鼓点也有音高', '主鼓旁加两面小鼓，鼓点也能成音阶'],
      ['堂鼓', '短促结实，戏曲的心跳', '中鼓负责人与器之间的心跳节拍'],
      ['锣', '一响气氛拉满，余音可用手掌掐住', '金件中一枚薄铜盘作锣，手掌按停余音'],
      ['钹', '两片铜撞出千军万马', '一对小钹挂在器台边，随取随撞'],
      ['木鱼', '从庙里敲进乐队的节拍器', '木九块之一专任清亮节拍'],
      ['梆子', '一根硬木，敲出北方腔调', '硬木音块给强拍加一声梆的脆响'],
      ['云锣', '十面小锣成列，能打旋律', '钟磬之外的小锣列，打出旋律性点音'],
      ['铙', '商代手持大钹，声洪量大', '大尺寸金件的手持奏法，站着也能用'],
      ['铎', '摇动木舌自响，用来宣政令', '摇奏式金件：不用槌，摇一下就是提示音'],
      ['钲', '行军路上的金属口令，声音长', '长音金件，给大段句读当标点'],
      ['錞于', '虎钮铜筒，一声定进退', '筒形金件，与鼓配合发出号令式的音'],
      ['拍板', '几块木板，管住整个乐队', '踏板旁挂一副拍板，用脚打板眼'],
      ['缸鼓', '花盆形的鼓身，声音能掀屋顶', '大共鸣鼓身兼作低音腔'],
      ['渔鼓', '竹筒蒙皮，边走边唱', '竹筒鼓：竹身与皮膜同体，取下可随身奏'],
      ['碰铃', '两个小铜碗，一碰就是星光', '高音金件的小铃对，作点缀用'],
      ['象脚鼓', '泼水节上最会带节奏', '双手直接击鼓面的舞曲节奏']
    ] }
  ];

  /* ---------- 七、造它的五步 ------------------------------------------ */

  var BUILD = [
    { t: '第一步 · 先把声音做出来（数字原型）',
      d: '四类发声法先用合成器做一遍：簧的持续、弦的点与线、金石的击、鼓与皮膜。这一步不用木料与青铜，只需要耳朵——本页「听一段」就是这个原型最粗的版本。' },
    { t: '第二步 · 用现成乐器验证「一个人能不能同时驱动」',
      d: '找四件真乐器同台：笙、筝、轧筝、编钟复制件。让一个人同时操作四路，看哪一路最先顾不过来。人身体的极限必须在这一步暴露，而不是在木匠开工之后。' },
    { t: '第三步 · 先造公共共鸣体：陶九室加木框',
      d: '先只装一组丝弦与九枚自由簧，绕开铜钟与玉磬。九室的容积、隔断位置、开孔大小在这一步定下来——它决定了整件器的底色与耦合效率。' },
    { t: '第四步 · 补金石与革木',
      d: '按第三步定下的腔体，配九钟九磬九块硬木；铜钟的音高要按陶腔的实际响应微调打磨量。皮膜的位置在这一步试，皮膜太紧会变成噪声，太松没有沙响。' },
    { t: '第五步 · 交给愿意试的人',
      d: '请一位能同时应付两件以上乐器的演奏者，把四肢分工坐实，写出第一份指法说明。到这一步，「龢」才第一次从图纸变成一件乐器；在那之前，它只是一份设计。' }
  ];

  var HONEST = [
    '没有实物 —— 本页所有尺寸、件数、音域都是<b>设计参数</b>，没有一件被真正做出来过。',
    '没有人演奏过 —— 四肢同时驱动四类发声法，在纸面上成立，在身体上还没有被验证。',
    '没有录音 —— 这一页能听到的是四种发声法的<b>合成音</b>，不是这件乐器本身的声音。',
    '没有曲目 —— 《八音龢·第一》《七十二声》是为它拟的名字，谱面上还是空的。',
    '没有师承 —— 没有指法体系、没有教材、没有传承谱系，这些要等它真的响过之后才谈得上。',
    '可能有硬伤 —— 陶九室的耦合、轮擦的噪声控制、九弦与钟磬的声压平衡，都需要实际制作来修正。'
  ];

  /* ---------- 渲染：器之能 -------------------------------------------- */

  function renderAbilities() {
    var host = $('#abilityGrid');
    if (!host) return;
    host.innerHTML = ABILITIES.map(function (a) {
      return '<article class="ability" data-reveal="up">' +
        '<p class="ability__n">' + esc(a.n) + '</p>' +
        '<p class="ability__char">' + esc(a.char) + '</p>' +
        '<p class="ability__desc">' + esc(a.desc) + '</p>' +
        '<p class="ability__from"><b>取自</b> · ' + a.from.map(esc).join(' · ') + '</p>' +
      '</article>';
    }).join('');
  }

  /* ---------- 渲染：冲突 ---------------------------------------------- */

  function renderConflicts() {
    var host = $('#conflictList');
    if (!host) return;
    host.innerHTML = CONFLICTS.map(function (c) {
      return '<article class="conflict" data-reveal="up">' +
        '<div class="conflict__head">' +
          '<span class="conflict__n">' + esc(c.n) + '</span>' +
          '<h3 class="conflict__title">' + esc(c.title) + '</h3>' +
        '</div>' +
        '<div class="conflict__body">' +
          '<div class="conflict__side"><p class="conflict__tag">' + esc(c.a.tag) + '</p><p>' + esc(c.a.text) + '</p></div>' +
          '<div class="conflict__side conflict__side--b"><p class="conflict__tag">' + esc(c.b.tag) + '</p><p>' + esc(c.b.text) + '</p></div>' +
        '</div>' +
        '<div class="conflict__solve"><p class="conflict__tag" style="color:var(--cat-he)">解法</p><p>' + c.solve + '</p></div>' +
      '</article>';
    }).join('');
  }

  /* ---------- 渲染：命题 ---------------------------------------------- */

  var CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

  function renderProps() {
    var host = $('#propList');
    if (!host) return;
    host.innerHTML = PROPS.map(function (p, i) {
      return '<div class="prop" data-reveal="up">' +
        '<div class="prop__n">命题 ' + (CN[i] || (i + 1)) + '</div>' +
        '<div>' +
          '<p class="prop__t">' + esc(p.t) + '</p>' +
          '<p class="prop__d">' + esc(p.d) + '</p>' +
          '<p class="prop__chk"><b>怎么算成立</b> · ' + esc(p.c) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------- 渲染：八音各九 ------------------------------------------ */

  function renderBayin9() {
    var host = $('#bayin9');
    if (!host) return;
    var rows = BAYIN9.map(function (b) {
      return '<div class="bayin9__row" style="--bc:' + b.col + '">' +
        '<div class="bayin9__char">' + esc(b.char) + '</div>' +
        '<div class="bayin9__n">' + esc(b.n) + '</div>' +
        '<div class="bayin9__name">' + esc(b.name) + '<em>' + esc(b.en) + '</em></div>' +
        '<div class="bayin9__use">' + esc(b.use) + '</div>' +
      '</div>';
    }).join('');
    host.innerHTML = rows +
      '<div class="bayin9__foot">' +
        '<span>合</span><span>七十二</span>' +
        '<span>八音各九 = 七十二件发声体 · 九为「九成」之数（《尚书》「箫韶九成」）</span>' +
      '</div>';
  }

  /* ---------- 渲染：四肢分工 ------------------------------------------ */

  function renderLimbs() {
    var host = $('#limbGrid');
    if (!host) return;
    host.innerHTML = LIMBS.map(function (l) {
      return '<article class="limb" data-reveal="up">' +
        '<p class="limb__organ">' + esc(l.organ) + '</p>' +
        '<p class="limb__t">' + esc(l.t) + '</p>' +
        '<p class="limb__d">' + esc(l.d) + '</p>' +
        '<div class="limb__tags">' + l.tags.map(function (t) {
          return '<span class="chip">' + esc(t) + '</span>';
        }).join('') + '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------- 渲染：71 件对照表 --------------------------------------- */

  function recByName(name) {
    var out = null;
    D.all.forEach(function (x) { if (x.name === name) out = x; });
    return out;
  }

  function renderMap() {
    var body = $('#mapBody');
    if (!body) return;
    var total = 0, rows = '';

    MAP.forEach(function (group) {
      var cat = D.cats[group.cat] || {};
      group.items.forEach(function (it, i) {
        var rec = recByName(it[0]);
        total++;
        var nameCell = rec
          ? '<a href="detail.html?id=' + encodeURIComponent(rec.id) + '">' + esc(it[0]) + '</a>' +
            '<em>' + esc(rec.id) + '</em>'
          : esc(it[0]);
        rows += '<tr style="--mc:' + (cat.accent || 'inherit') + '">' +
          (i === 0
            ? '<td class="map-cat" rowspan="' + group.items.length + '">' + esc(cat.glyph || '') + '</td>'
            : '') +
          '<td class="map-name">' + nameCell + '</td>' +
          '<td class="map-gain">' + esc(it[1]) + '</td>' +
          '<td class="map-use">' + esc(it[2]) + '</td>' +
        '</tr>';
      });
    });

    body.innerHTML = rows;
    var cnt = $('#mapCount');
    if (cnt) cnt.textContent = String(total);
  }

  /* ---------- 渲染：造它五步 / 诚实清单 -------------------------------- */

  function renderBuild() {
    var host = $('#buildList');
    if (host) {
      host.innerHTML = BUILD.map(function (b, i) {
        return '<div class="build__step" data-reveal="up">' +
          '<div class="build__n">0' + (i + 1) + '</div>' +
          '<div><p class="build__t">' + esc(b.t) + '</p><p class="build__d">' + esc(b.d) + '</p></div>' +
        '</div>';
      }).join('');
    }
    var h = $('#honestList');
    if (h) {
      h.innerHTML = HONEST.map(function (t) { return '<li>' + t + '</li>'; }).join('');
    }
  }

  /* ---------- 渲染：动态数字 ------------------------------------------ */

  function renderNumbers() {
    var all = D.all.length;
    var hist = D.historyCount();
    var set = function (id, v) { var n = document.getElementById(id); if (n) n.textContent = String(v); };
    set('devTotal', all);
    set('devHistory', hist);
    set('devDevised', D.devisedCount());
    set('devCatTotal', D.catOrder.length);
  }

  /* ==========================================================================
     合成试听 · Web Audio
     --------------------------------------------------------------------------
     四种发声法各写一个声源：
       簧（匏） 双锯齿 + 低通 + 颤音，慢起慢落，持续不断
       弦·弹（丝） Karplus-Strong 拨弦（噪声激励 + 延迟线 + 环内平均）
       弦·擦（丝） 锯齿 + 低通，慢起音 + 揉弦，模拟轮擦
       金（金/石） 多个非谐分音叠加，各自衰减
       革（革/木） 噪声爆发 + 低频撞击
     全部现场合成，不加载任何音频文件 —— 所以离线、file:// 下都能响。
     ========================================================================== */

  var A = null;          /* 音频上下文 */
  var bus = null;        /* 总输出 */
  var playing = false;
  var sources = [];      /* 正在发声的节点，停止时统一收掉 */
  var timers = [];

  function ensureAudio() {
    if (A) return A;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    A = new AC();
    bus = A.createGain();
    bus.gain.value = 0.85;
    var comp = A.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 3;
    bus.connect(comp);
    comp.connect(A.destination);
    return A;
  }

  function track(node) { sources.push(node); return node; }

  /* 收尾包络：避免咔嗒声 */
  function env(gain, t, atk, hold, rel, peak) {
    var g = gain.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(0.0001, t);
    g.exponentialRampToValueAtTime(peak, t + atk);
    g.setValueAtTime(peak, t + atk + hold);
    g.exponentialRampToValueAtTime(0.0001, t + atk + hold + rel);
  }

  /* —— 匏：自由簧的持续和声 —— */
  function reed(t, freq, dur, peak) {
    var out = A.createGain();
    var lp = A.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = Math.min(4200, freq * 9);
    lp.Q.value = 0.8;
    out.connect(lp); lp.connect(bus);
    [0, 4.5].forEach(function (detune) {
      var o = A.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = freq;
      o.detune.value = detune;
      o.connect(out);
      o.start(t);
      o.stop(t + dur + 0.4);
      track(o);
    });
    /* 自由簧特有的轻微颤音 */
    var lfo = A.createOscillator();
    var lg = A.createGain();
    lfo.frequency.value = 5.4;
    lg.gain.value = freq * 0.006;
    lfo.connect(lg);
    lfo.start(t); lfo.stop(t + dur + 0.4);
    track(lfo);
    env(out, t, 1.1, dur, 1.3, peak);
  }

  /* —— 丝·弹：Karplus-Strong 拨弦 —— */
  function pluck(t, freq, dur, peak) {
    var sr = A.sampleRate;
    var N = Math.max(2, Math.round(sr / freq));
    var len = Math.min(Math.round(sr * (dur + 0.2)), sr * 4);
    var buf = A.createBuffer(1, len, sr);
    var d = buf.getChannelData(0);
    var i;
    for (i = 0; i <= N && i < len; i++) d[i] = Math.random() * 2 - 1;
    /* 延迟线反馈：环内两点取平均，越弹越软 */
    var decay = 0.996 - Math.min(0.006, freq / 90000);
    for (i = N + 1; i < len; i++) {
      d[i] = (d[i - N] + d[i - N - 1]) * 0.5 * decay;
    }
    var src = A.createBufferSource();
    src.buffer = buf;
    var lp = A.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 5200;
    var g = A.createGain();
    g.gain.value = peak;
    src.connect(lp); lp.connect(g); g.connect(bus);
    src.start(t);
    track(src);
  }

  /* —— 丝·擦：轮擦出来的持续弦音 —— */
  function bow(t, freq, dur, peak) {
    var o = A.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    var lp = A.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = Math.min(3600, freq * 7);
    lp.Q.value = 1.1;
    var g = A.createGain();
    o.connect(lp); lp.connect(g); g.connect(bus);
    o.start(t); o.stop(t + dur + 0.5);
    track(o);
    /* 揉弦：轮速不匀造成的音高摆动 */
    var lfo = A.createOscillator();
    var lg = A.createGain();
    lfo.frequency.value = 5.1;
    lg.gain.value = freq * 0.009;
    lfo.connect(lg); lg.connect(o.frequency);
    lfo.start(t); lfo.stop(t + dur + 0.5);
    track(lfo);
    env(g, t, 0.55, dur, 0.7, peak);
  }

  /* —— 金：非谐分音的钟磬 —— */
  var BELL_PARTIALS = [
    { r: 1.00, a: 0.5, d: 4.6 },
    { r: 2.76, a: 0.26, d: 2.6 },
    { r: 5.40, a: 0.14, d: 1.4 },
    { r: 8.93, a: 0.07, d: 0.75 },
    { r: 13.34, a: 0.035, d: 0.42 }
  ];
  function bell(t, freq, peak) {
    BELL_PARTIALS.forEach(function (p) {
      var o = A.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq * p.r;
      var g = A.createGain();
      g.gain.value = 0;
      o.connect(g); g.connect(bus);
      var amp = peak * p.a;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(amp, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
      o.start(t); o.stop(t + p.d + 0.1);
      track(o);
    });
  }

  /* —— 革：鼓；木：音块 —— */
  function drum(t, peak) {
    var len = Math.round(A.sampleRate * 0.5);
    var buf = A.createBuffer(1, len, A.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    var src = A.createBufferSource();
    src.buffer = buf;
    var lp = A.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    var g = A.createGain();
    g.gain.value = peak;
    src.connect(lp); lp.connect(g); g.connect(bus);
    src.start(t);
    track(src);

    var o = A.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(96, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.24);
    var og = A.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(peak * 1.1, t + 0.008);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    o.connect(og); og.connect(bus);
    o.start(t); o.stop(t + 0.4);
    track(o);
  }

  function block(t, freq, peak) {
    var o = A.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    var bp = A.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = freq * 2.2;
    bp.Q.value = 1.4;
    var g = A.createGain();
    o.connect(bp); bp.connect(g); g.connect(bus);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.start(t); o.stop(t + 0.3);
    track(o);
  }

  /* —— 乐句：D 宫五声，慢速，四路同时 —— */
  var SCALE = {
    D2: 73.42, A2: 110.00, D3: 146.83, F3: 174.61, G3: 196.00, A3: 220.00,
    C4: 261.63, D4: 293.66, F4: 349.23, G4: 392.00, A4: 440.00,
    C5: 523.25, D5: 587.33, F5: 698.46
  };

  function phrase() {
    var t0 = A.currentTime + 0.12;
    var b = 0.62;                       /* 一拍 0.62 秒，约 96 BPM 的听感 */

    /* 匏：整段的和声底（D 宫 + 五度 + 八度） */
    reed(t0, SCALE.D2, 15.4, 0.10);
    reed(t0 + 0.3, SCALE.A2, 15.0, 0.055);
    reed(t0 + 0.6, SCALE.D3, 14.6, 0.042);

    /* 金：两记钟磬，标出句子的关节 */
    bell(t0 + 0.05, SCALE.D5, 0.24);
    bell(t0 + b * 6, SCALE.A4, 0.20);
    bell(t0 + b * 12, SCALE.D5, 0.22);

    /* 革木：缓慢的节拍与点 */
    [0, 2, 4, 6, 8, 10, 12, 14].forEach(function (i) {
      drum(t0 + b * i, i % 4 === 0 ? 0.30 : 0.16);
    });
    block(t0 + b * 1, 1174.66, 0.05);
    block(t0 + b * 5, 1174.66, 0.045);
    block(t0 + b * 9, 1567.98, 0.045);
    block(t0 + b * 13, 1174.66, 0.045);

    /* 丝·擦：轮擦的旋律线 */
    bow(t0 + b * 1, SCALE.D4, b * 2.4, 0.085);
    bow(t0 + b * 3.6, SCALE.F4, b * 1.6, 0.08);
    bow(t0 + b * 5.4, SCALE.G4, b * 2.0, 0.082);
    bow(t0 + b * 7.6, SCALE.A4, b * 3.2, 0.078);
    bow(t0 + b * 11.2, SCALE.C5, b * 1.4, 0.07);
    bow(t0 + b * 12.8, SCALE.A4, b * 2.4, 0.075);

    /* 丝·弹：点状的弦音，把句子切出颗粒 */
    [[1.0, SCALE.D3], [2.0, SCALE.A3], [3.0, SCALE.D4], [4.0, SCALE.F4],
     [6.0, SCALE.A3], [7.0, SCALE.D4], [9.0, SCALE.F4], [10.0, SCALE.A4],
     [12.0, SCALE.D4], [13.0, SCALE.G4], [14.0, SCALE.F4], [15.0, SCALE.D4]]
      .forEach(function (p) {
        pluck(t0 + b * p[0], p[1], 2.4, 0.16);
      });

    return 15.4 + 2.2;                  /* 总时长，用于自动收尾 */
  }

  function stopAll() {
    playing = false;
    timers.forEach(function (id) { clearTimeout(id); });
    timers = [];
    sources.forEach(function (n) {
      try { n.stop(); } catch (e) { /* 已经停了 */ }
    });
    sources = [];
    var wave = $('#listenWave');
    if (wave) wave.classList.remove('is-on');
    var btn = $('#listenBtn');
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      var lbl = btn.querySelector('.listen__label');
      if (lbl) lbl.textContent = '听一段合成音（15 秒）';
    }
    var st = $('#listenStatus');
    if (st) st.textContent = '已停止。';
  }

  function play() {
    if (playing) { stopAll(); return; }
    if (!ensureAudio()) {
      var st0 = $('#listenStatus');
      if (st0) st0.textContent = '这个浏览器不支持 Web Audio，听不了合成音。';
      return;
    }
    if (A.state === 'suspended' && A.resume) A.resume();

    playing = true;
    var total = phrase();

    var wave = $('#listenWave');
    if (wave) wave.classList.add('is-on');
    var btn = $('#listenBtn');
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      var lbl = btn.querySelector('.listen__label');
      if (lbl) lbl.textContent = '停止';
    }
    var st = $('#listenStatus');
    if (st) {
      st.textContent = '正在合成：匏簧的持续底 · 轮擦的旋律线 · 拨弦的点 · 钟磬与鼓。' +
        '戴耳机更容易听出四层。';
    }

    timers.push(setTimeout(function () { if (playing) stopAll(); }, total * 1000));
  }

  function renderListen() {
    var btn = $('#listenBtn');
    if (!btn) return;
    btn.setAttribute('aria-pressed', 'false');
    window.UI.on(btn, 'click', play);

    /* 波形条：纯装饰，跟着播放状态起伏 */
    var wave = $('#listenWave');
    if (wave && !wave.childNodes.length) {
      var bars = '';
      for (var i = 0; i < 32; i++) bars += '<span class="listen__bar"></span>';
      wave.innerHTML = bars;
    }
    var st = $('#listenStatus');
    if (st) st.textContent = '这是一段现场合成的试听，不是乐器录音 —— 因为这件乐器还不存在。';
  }

  /* ---------- 初始化 -------------------------------------------------- */

  renderNumbers();
  renderAbilities();
  renderConflicts();
  renderProps();
  renderBayin9();
  renderLimbs();
  renderMap();
  renderBuild();
  renderListen();

  var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());
})();
