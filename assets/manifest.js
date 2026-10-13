/* ==========================================================================
   素材清单 · ASSET MANIFEST
   --------------------------------------------------------------------------
   本文件由 tools/scan-assets.js 自动生成与维护，也可以手写。

   结构：  乐器名（中文） → 类型 → 槽位 → 内容

   ── 媒体类型（扫描器管理）──────────────────────────────────────────────
     img    main 主图 · structure 结构图 · scene 场景图
     anim   history 历史演变 · principle 发声原理
     video  performance 演奏

   写法：
     "img":  { "main": "assets/img/古琴-主图.jpg" }
     "img":  { "main": { src, alt, caption } }        带图注
     "video":{ "performance": { src, poster } }       带封面
     "video":{ "performance": { embed: "https://…" } } 嵌入 B 站 / YouTube
     "video":{ "performance": { qr: "https://…", platform: "bilibili" } }
                                                      ↑ 该槽位改为扫码入口

   ── platform 平台入口（不参与扫描，永远原样保留）─────────────────────
     每个平台生成一张二维码卡片。桌面端扫不了自己的屏幕，
     卡片同时给出可点的文字链接。

     "platform": {
       "bilibili":    "https://www.bilibili.com/video/BVxxxx",
       "xiaohongshu": "https://www.xiaohongshu.com/explore/xxxx",
       "douyin":      { url: "https://v.douyin.com/xxxx/", label: "古琴冷知识" }
     }

     可用键：bilibili · xiaohongshu · douyin · weixin · kuaishou
             youtube · weibo · website · link   （也可用任意自定义键）

   ── 背景音乐 audio（不写则使用内置合成音源）──────────────────────────
     把音频丢进 assets/audio/ 后运行扫描即自动登记；多首会变成播放列表。

     "背景音乐": {
       "audio": { "main": "assets/audio/松风.mp3" },              // 单曲
       // "main": ["assets/audio/a.mp3", "assets/audio/b.mp3"]   // 多曲轮播
       // "main": { "src": "...", "title": "松风", "artist": "佚名" }
       "synth": false      // 置 false 可关闭内置合成音源
     }

   ── 页面级条目 ────────────────────────────────────────────────────────
     "八音关系图"  "纪录片"  "小红书合集"  "背景音乐"

   重新扫描：  node tools/scan-assets.js
   ========================================================================== */

window.ASSET_MANIFEST = {

  "艾捷克": {
    img: {
      "main": {"src":"assets/img/艾捷克-主图.jpg","alt":"艾捷克主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/艾捷克-场景图.jpg","alt":"艾捷克场景图","caption":"场景图 · 课件素材（P7）｜丰收时节的绿洲院落，葡萄架下铺开一条毯"},
      "structure": {"src":"assets/img/艾捷克-结构图.jpg","alt":"艾捷克结构图","caption":"结构图 · 课件素材（P9）｜四种木、一只碗、一张皮、两套弦"},
      "hero": "assets/img/艾捷克-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/艾捷克-历史演变.jpg","alt":"艾捷克历史演变","caption":"历史演变 · 课件素材（P15）｜叫这个名字的不是一件琴，是一群各坐各位的琴"},
      "principle": {"src":"assets/anim/艾捷克-发声原理.jpg","alt":"艾捷克发声原理","caption":"发声原理 · 课件素材（P5）｜一只蒙着兽皮的木碗，靠一把马尾弓说话"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/艾捷克/01-DokhtaraneQuchan.mp3","title":"DokhtaraneQuchan（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"DokhtaraneQuchan","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"6:49","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "八音发声原理": {
    anim: {
      "jin": {"src":"assets/anim/八音发声原理-金.jpg","alt":"金类乐器的发声原理图：青铜铸造的打击乐器：钟体刚性好、延展性强，泛音结构规整，一记敲击能拖出很长的余韵","caption":"金 · 发声原理图（本站整理绘制）"},
      "shi": {"src":"assets/anim/八音发声原理-石.jpg","alt":"石类乐器的发声原理图：石片列成的打击乐器：石料质地致密，振动传递快而清亮，音头干脆","caption":"石 · 发声原理图（本站整理绘制）"},
      "tu": {"src":"assets/anim/八音发声原理-土.jpg","alt":"土类乐器的发声原理图：陶土烧制的吹奏与打击乐器：陶胎多孔而坚硬，气流经吹孔边棱起振，音色朴拙","caption":"土 · 发声原理图（本站整理绘制）"},
      "ge": {"src":"assets/anim/八音发声原理-革.jpg","alt":"革类乐器的发声原理图：皮革蒙面的打击乐器：张紧的皮面弹性强，受击后整体振动，音头厚、余韵短","caption":"革 · 发声原理图（本站整理绘制）"},
      "si": {"src":"assets/anim/八音发声原理-丝.jpg","alt":"丝类乐器的发声原理图：丝弦发声的弹拨与拉弦乐器：丝弦由蚕丝绞合，张力下的横向振动经琴腔放大","caption":"丝 · 发声原理图（本站整理绘制）"},
      "mu": {"src":"assets/anim/八音发声原理-木.jpg","alt":"木类乐器的发声原理图：木材制成的打击乐器：木身弹性好、内耗大，振动短促，天生适合打点子","caption":"木 · 发声原理图（本站整理绘制）"},
      "pao": {"src":"assets/anim/八音发声原理-匏.jpg","alt":"匏类乐器的发声原理图：以匏（葫芦）作斗、插竹管装簧的吹奏乐器：气流推动簧片，再经匏斗与管身共鸣","caption":"匏 · 发声原理图（本站整理绘制）"},
      "zhu": {"src":"assets/anim/八音发声原理-竹.jpg","alt":"竹类乐器的发声原理图：竹材制成的吹奏乐器：气流经吹孔边棱或簧片起振，在管内形成气柱","caption":"竹 · 发声原理图（本站整理绘制）"}
    }
  },
  "八音关系图": {
    anim: {
      "map": {"src":"assets/anim/八音关系图-02.jpg","alt":"周代八音分类体系关系图：金 · 石 · 土 · 革 · 丝 · 木 · 匏 · 竹八类材质与各自代表乐器的对应关系","caption":"八音关系图 · 周代八音分类体系：按制作材料分八类，金与石相呼、丝与竹相和，各类对应哪些乐器一目了然（本站整理绘制）"},
      "map2": "assets/anim/八音关系图-02.jpg"
    }
  },
  "巴乌": {
    img: {
      "main": {"src":"assets/img/巴乌-主图.jpg","alt":"巴乌主图","caption":"主图 · 课件素材（P01）｜封面：一个名字，几支人吹"},
      "scene": {"src":"assets/img/巴乌-场景图.jpg","alt":"巴乌场景图","caption":"场景图 · 课件素材（P17）｜室内、院坝、山路上：它常在人声旁边响"},
      "structure": {"src":"assets/img/巴乌-结构图.jpg","alt":"巴乌结构图","caption":"结构图 · 课件素材（P05）｜通名那一件：单簧与八孔"},
      "hero": {"src":"assets/img/巴乌-头图.jpg","alt":"巴乌头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：一个名字，几支人吹"}
    },
    anim: {
      "history": {"src":"assets/anim/巴乌-历史演变.jpg","alt":"巴乌历史演变","caption":"历史演变 · 课件素材（P06）｜三支分列：先看来源到哪一步"},
      "principle": {"src":"assets/anim/巴乌-发声原理.jpg","alt":"巴乌发声原理","caption":"发声原理 · 课件素材（P12）｜孔与簧：通名口径写到这里（孔数、簧片与音高）"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/巴乌/01-巴乌独奏在那遥远的地方王洛宾.mp3","title":"巴乌独奏【在那遥远的地方】王洛宾 作曲  演奏录音 古林 Bawu solo \"In that faraway place\" compose","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"巴乌独奏【在那遥远的地方】王洛宾 作曲  演奏录音 古林 Bawu solo \"In that faraway place\" composed Wang Luobin covering  Gu Lin","performer":"Gu Lin ","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=J8KC6I3IH3g","date":"NA","duration":"2:39","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=J8KC6I3IH3g","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "板胡": {
    img: {
      "main": {"src":"assets/img/板胡-主图.jpg","alt":"板胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/板胡-场景图.jpg","alt":"板胡场景图","caption":"场景图 · 课件素材（P19）｜台上忘词的那一次，整个乐队跟着它走"},
      "structure": {"src":"assets/img/板胡-结构图.jpg","alt":"板胡结构图","caption":"结构图 · 课件素材（P5）｜一把胡琴，为什么可以不蒙皮"},
      "hero": "assets/img/板胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/板胡-历史演变.jpg","alt":"板胡历史演变","caption":"历史演变 · 课件素材（P8）｜台口没有顶棚，声音得自己跑到山那边"},
      "principle": {"src":"assets/anim/板胡-发声原理.jpg","alt":"板胡发声原理","caption":"发声原理 · 课件素材（P7）｜台口没有顶棚，声音得自己跑到山那边"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/板胡/01-站内.mp3","title":"板胡音色示范 · 板胡","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ABanhu.ogg）。原始文件：File:Banhu.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。","meta":{"title":"板胡音色示范","performer":"Francesc Fort","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"TaronjaSatsuma","date":"2023-11-28","duration":"0:43（43 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ABanhu.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ABanhu.ogg）。原始文件：File:Banhu.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}}]}
    }
  },
  "梆子": {
    img: {
      "main": {"src":"assets/img/梆子-主图.jpg","alt":"梆子主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/梆子-场景图.jpg","alt":"梆子场景图","caption":"场景图 · 课件素材（P4）｜夜戏台，他先从布袋里倒出两截木头"},
      "structure": {"src":"assets/img/梆子-结构图.jpg","alt":"梆子结构图","caption":"结构图 · 课件素材（P8）｜更夫、说书人、皮影班子，都用过它"},
      "hero": "assets/img/梆子-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/梆子-历史演变.jpg","alt":"梆子历史演变","caption":"历史演变 · 课件素材（P5）｜一个剧种的名字，是照它敲出来的声音起的"},
      "principle": {"src":"assets/anim/梆子-发声原理.jpg","alt":"梆子发声原理","caption":"发声原理 · 课件素材（P6）｜一个剧种的名字，是照它敲出来的声音起的"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/梆子/01-20190817Testfile.mp3","title":"20190817Testfile（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"20190817Testfile","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"0:28","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "筚篥": {
    img: {
      "main": {"src":"assets/img/筚篥-主图.jpg","alt":"筚篥主图","caption":"主图 · 课件素材（P01）｜封面：以竹为管，以芦为首"},
      "scene": {"src":"assets/img/筚篥-场景图.jpg","alt":"筚篥场景图","caption":"场景图 · 课件素材（P12）｜辽宁瓦房店：复州双管乐"},
      "structure": {"src":"assets/img/筚篥-结构图.jpg","alt":"筚篥结构图","caption":"结构图 · 课件素材（P05）｜一支直管，一片芦苇哨：部件少到一眼能数清"},
      "hero": {"src":"assets/img/筚篥-头图.jpg","alt":"筚篥头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：以竹为管，以芦为首"}
    },
    anim: {
      "history": {"src":"assets/anim/筚篥-历史演变.jpg","alt":"筚篥历史演变","caption":"历史演变 · 课件素材（P03）｜先看一段唐代文献：文献里的那只「悲篥」"},
      "principle": {"src":"assets/anim/筚篥-发声原理.jpg","alt":"筚篥发声原理","caption":"发声原理 · 课件素材（P16）｜八个音孔，前七后一：开闭音孔改变气柱有效长度"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/筚篥/01-筚篥管子喉管演奏录音棚实拍.mp3","title":"筚篥(管子,喉管)演奏 录音棚实拍（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"筚篥(管子,喉管)演奏 录音棚实拍","performer":"羅獅虎","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=93PqzUqxnBw","date":"NA","duration":"4:06","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=93PqzUqxnBw","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "编磬": {
    img: {
      "main": {"src":"assets/img/编磬-主图.jpg","alt":"编磬主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/编磬-场景图.jpg","alt":"编磬场景图","caption":"场景图 · 课件素材（P10）｜从一矩有半，到一寸厚"},
      "structure": {"src":"assets/img/编磬-结构图.jpg","alt":"编磬结构图","caption":"结构图 · 课件素材（P4）｜天不亮，他先敲了三下石头"},
      "hero": "assets/img/编磬-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/编磬-历史演变.jpg","alt":"编磬历史演变","caption":"历史演变 · 课件素材（P8）｜石头从山上来，先得听它脆不脆"},
      "principle": {"src":"assets/anim/编磬-发声原理.jpg","alt":"编磬发声原理","caption":"发声原理 · 课件素材（P6）｜「编」是一个字，「磬」是另一个字"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/编磬/01-世上難得一見整套編鐘編磬演奏.mp3","title":"世上難得一見，整套編鐘編磬演奏再加舞蹈1（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"世上難得一見，整套編鐘編磬演奏再加舞蹈1","performer":"lcwhk","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=n-AXFstmSBU","date":"NA","duration":"2:30","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=n-AXFstmSBU","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "编钟": {
    img: {
      "main": {"src":"assets/img/编钟-主图.jpg","alt":"编钟主图","caption":"主图 · 课件素材（01.png）｜封面：三层钟架全景"},
      "explode": {"src":"assets/img/编钟-分解图.png","alt":"编钟 3D 爆炸分解图：横梁、悬挂系统、钟体、立柱与底座","caption":"3D 分解图 · 站内结构分解图｜横梁 / 悬挂系统 / 钟体 / 立柱 / 底座，按组装顺序拆开"},
      "structure": {"src":"assets/img/编钟-结构图.jpg","alt":"编钟结构图","caption":"结构图 · 课件素材（05.png）｜P05 甬钟部件解剖图：甬 / 旋 / 斡 / 枚 / 隧 / 鼓"},
      "scene": {"src":"assets/img/编钟-场景图.jpg","alt":"编钟场景图","caption":"场景图 · 课件素材（20.png）｜P20 金石之声：编钟与编磬同场"},
      "hero": {"src":"assets/img/编钟-头图.jpg","alt":"编钟头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/编钟-发声原理.jpg","alt":"编钟发声原理","caption":"发声原理 · 课件素材（12.png）｜P12 敲击位置：正鼓部与侧鼓部"},
      "history": {"src":"assets/anim/编钟-历史演变.jpg","alt":"编钟历史演变","caption":"历史演变 · 课件素材（10.png）｜P10 3755 字铭文：错金局部特写"}
    }
  },
  "钹": {
    img: {
      "main": {"src":"assets/img/钹-主图.jpg","alt":"钹主图：两片响铜对击","caption":"主图 · 课件素材（p01）｜封面：戏台上那声炸响 —— 铜制、圆形、两片相击"},
      "scene": {"src":"assets/img/钹-场景图.jpg","alt":"钹场景图：花钹大鼓，鼓带钹声、钹追鼓点","caption":"场景图 · 课件素材（p15）｜花钹大鼓：鼓带钹声，钹追鼓点"},
      "structure": {"src":"assets/img/钹-结构图.jpg","alt":"钹结构图：两片成对、中心隆起成半球形（碗）、正中有孔","caption":"结构图 · 课件素材（p05）｜形制三要素：两片成对 / 中心隆起成半球形（碗）/ 正中有孔"},
      "hero": {"src":"assets/img/钹-头图.jpg","alt":"钹头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/钹-历史演变.jpg","alt":"钹历史演变：花钹大鼓的源流时间轴","caption":"历史演变 · 课件素材（p18）｜花钹大鼓的源流：清乾隆年间 → 清光绪元年（1875）→ 传承人高如常"},
      "principle": {"src":"assets/anim/钹-发声原理.jpg","alt":"钹发声原理：振动体是片体本身，由两片互击激励","caption":"发声原理 · 课件素材（p17）｜发声与音色：振动体是片体本身，两片互击激励，声韵铿锵有力"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/钹/01-鈸Cymbals.mp3","title":"鈸 Cymbals（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"鈸 Cymbals","performer":"香港中樂團HKCO","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=Cf_7k7M7SyY","date":"NA","duration":"1:37","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=Cf_7k7M7SyY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "篪": {
    img: {
      "main": {"src":"assets/img/篪-主图.jpg","alt":"篪主图","caption":"主图 · 课件素材（01 (2).png）｜封面：篪 · 常被认成笛子的两千年古乐器"},
      "structure": {"src":"assets/img/篪-结构图.jpg","alt":"篪结构图","caption":"结构图 · 课件素材（10 (2).png）｜P10 一件篪的五个部分"},
      "scene": {"src":"assets/img/篪-场景图.jpg","alt":"篪场景图","caption":"场景图 · 课件素材（06 (2).png）｜P06 八音之「竹」与它的三种场合"},
      "hero": {"src":"assets/img/篪-头图.jpg","alt":"篪头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/篪-发声原理.jpg","alt":"篪发声原理","caption":"发声原理 · 课件素材（18.png）｜P18 怎么吹：横吹，掌心向里"},
      "history": {"src":"assets/anim/篪-历史演变.jpg","alt":"篪历史演变","caption":"历史演变 · 课件素材（05 (2).png）｜P05 从《周礼》到《说文》：四条文献证据"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/篪/01-尹維鶴篪獨奏云.mp3","title":"尹維鶴篪獨奏云（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"尹維鶴篪獨奏云","performer":"winmax100","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=PX9EQzr8BAk","date":"NA","duration":"3:10","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=PX9EQzr8BAk","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "錞于": {
    img: {
      "main": {"src":"assets/img/錞于-主图.jpg","alt":"錞于主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/錞于-场景图.jpg","alt":"錞于场景图","caption":"场景图 · 课件素材（P10）｜铸一口筒，让铜水自己走满"},
      "structure": {"src":"assets/img/錞于-结构图.jpg","alt":"錞于结构图","caption":"结构图 · 课件素材（P6）｜它不是钟，是一只倒过来的筒"},
      "hero": "assets/img/錞于-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/錞于-历史演变.jpg","alt":"錞于历史演变","caption":"历史演变 · 课件素材（P9）｜铸一口筒，让铜水自己走满"},
      "principle": {"src":"assets/anim/錞于-发声原理.jpg","alt":"錞于发声原理","caption":"发声原理 · 课件素材（P4）｜一锹下去，先碰到的是它的底"}
    }
  },
  "大鼓": {
    img: {
      "main": {"src":"assets/img/大鼓-主图.jpg","alt":"大鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/大鼓-场景图.jpg","alt":"大鼓场景图","caption":"场景图 · 课件素材（P10）｜三十多道手，才轮到蒙皮"},
      "structure": {"src":"assets/img/大鼓-结构图.jpg","alt":"大鼓结构图","caption":"结构图 · 课件素材（P8）｜风一大，鼓皮就先哑"},
      "hero": "assets/img/大鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/大鼓-历史演变.jpg","alt":"大鼓历史演变","caption":"历史演变 · 课件素材（P6）｜一面鼓，是十几个人的拍子"},
      "principle": {"src":"assets/anim/大鼓-发声原理.jpg","alt":"大鼓发声原理","caption":"发声原理 · 课件素材（P4）｜腊月廿八，先抬出来的是那面大鼓"}
    }
  },
  "笛子": {
    img: {
      "main": {"src":"assets/img/笛子-主图.jpg","alt":"笛子主图","caption":"主图 · 课件素材（PPT模版 p1）｜封面：笛韵千年 —— 中国竹笛艺术与演奏教学"},
      "explode": {"src":"assets/img/笛子-分解图.png","alt":"中式竹笛（曲笛）3D 结构分解图：吹口、笛塞、膜孔、按音孔、出音孔与镶口","caption":"3D 分解图 · 站内结构分解图｜吹口 / 笛塞 / 膜孔 / 按音孔×6 / 前出音孔 / 后出音孔 / 管头 / 管尾"},
      "structure": {"src":"assets/img/笛子-结构图.jpg","alt":"笛子结构图","caption":"结构图 · 课件素材（PPT模版 p7）｜竹笛 3D 爆炸分解全图：吹孔、笛塞、膜孔、按音孔、出音孔与镶口"},
      "scene": {"src":"assets/img/笛子-场景图.jpg","alt":"笛子场景图","caption":"场景图 · 课件素材（PPT模版 p19）｜经典曲目赏析：《姑苏行》《牧民新歌》……"},
      "hero": {"src":"assets/img/笛子-头图.png","alt":"笛子头图（课件第 01 页）","caption":"头图 · 站内乐器特写（透明底抠图）｜笛子的通身与吹孔"}
    },
    anim: {
      "principle": {"src":"assets/anim/笛子-发声原理.jpg","alt":"笛子发声原理","caption":"发声原理 · 课件素材（PPT模版 p8）｜笛塞与吹孔 —— 发声之源：边棱音与气柱耦合"},
      "history": {"src":"assets/anim/笛子-历史演变.jpg","alt":"笛子历史演变","caption":"历史演变 · 课件素材（PPT模版 p4）｜历史沿革 · 八千年的回响：新石器时代贾湖骨笛 → 汉 → 隋唐 → 宋元 → 明清"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/笛子/01-站内.mp3","title":"笛子音色示范（中国竹笛） · 笛子","caption":"来源：https://commons.wikimedia.org/wiki/File%3ADiZi_Chinese_Flute_Sample.ogg。一段中国竹笛的采样录音。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。","meta":{"title":"笛子音色示范（中国竹笛）","performer":"Gorgoroth6669（上传者即演奏者，见来源页）","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"Mx. Granger","date":"见来源页","duration":"0:17（17 秒）","license":"CC0 1.0（公共领域贡献）","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ADiZi_Chinese_Flute_Sample.ogg","note":"来源：https://commons.wikimedia.org/wiki/File%3ADiZi_Chinese_Flute_Sample.ogg。一段中国竹笛的采样录音。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。"}},{"src":"assets/audio/笛子/02-香港沙田中央公園帳幕劇場內中.mp3","title":"香港沙田中央公園帳幕劇場內中（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"香港沙田中央公園帳幕劇場內中","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"1:09","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "冬不拉": {
    img: {
      "main": {"src":"assets/img/冬不拉-主图.jpg","alt":"冬不拉主图","caption":"主图 · 课件素材（p01.png）｜冬不拉"},
      "structure": {"src":"assets/img/冬不拉-结构图.jpg","alt":"冬不拉结构图","caption":"结构图 · 课件素材（p06.png）｜一、认识冬不拉 一页看懂冬不拉"},
      "scene": {"src":"assets/img/冬不拉-场景图.jpg","alt":"冬不拉场景图","caption":"场景图 · 课件素材（p14.png）｜三、演奏与乐曲 冬布拉奎依：乐曲有多大"},
      "hero": {"src":"assets/img/冬不拉-头图.jpg","alt":"冬不拉头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/冬不拉-发声原理.jpg","alt":"冬不拉发声原理","caption":"发声原理 · 课件素材（p13.png）｜三、演奏与乐曲 泛音、滑音与和音"},
      "history": {"src":"assets/anim/冬不拉-历史演变.jpg","alt":"冬不拉历史演变","caption":"历史演变 · 课件素材（p03.png）｜一、认识冬不拉 「冬布拉」还是「冬不拉」"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/冬不拉/01-民族之夜哈萨克冬不拉弹唱民歌.mp3","title":"【民族之夜】哈萨克冬不拉弹唱 民歌 过去的往事-Dariga Dauren（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"【民族之夜】哈萨克冬不拉弹唱 民歌 过去的往事-Dariga Dauren","performer":"UNINTENDED MUSiC ","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=J6Ed8zAKo8A","date":"NA","duration":"3:52","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=J6Ed8zAKo8A","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "洞箫": {
    img: {
      "main": {"src":"assets/img/洞箫-主图.jpg","alt":"洞箫主图","caption":"主图 · 课件素材（p01）｜封面：洞箫 · 一管清音"},
      "scene": {"src":"assets/img/洞箫-场景图.jpg","alt":"洞箫场景图：琴箫合奏","caption":"场景图 · 课件素材（p17）｜琴箫合奏：古琴与洞箫两种音色的搭配"},
      "structure": {"src":"assets/img/洞箫-结构图.jpg","alt":"洞箫结构图：吹口、管身、音孔与下端开口","caption":"结构图 · 课件素材（p05）｜一管之形：吹口 / 管身 / 音孔 / 下端开口"},
      "hero": {"src":"assets/img/洞箫-头图.jpg","alt":"洞箫头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/洞箫-历史演变.jpg","alt":"洞箫历史演变：诗文里的洞箫","caption":"历史演变 · 课件素材（p16）｜诗文里的洞箫：苏轼《前赤壁赋》「客有吹洞箫者」"},
      "principle": {"src":"assets/anim/洞箫-发声原理.jpg","alt":"洞箫发声原理：气流过吹口边棱激起管内气柱","caption":"发声原理 · 课件素材（p08）｜吹口与管身：管端缺口处气流激起气柱"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/洞箫/01-南箫X洞箫一首你沒聽過的鐵血.mp3","title":"〖南箫X洞箫〗一首你沒聽過的《鐵血丹心》（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"〖南箫X洞箫〗一首你沒聽過的《鐵血丹心》","performer":"此音國樂","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=LfjCMUx7Ukw","date":"NA","duration":"4:17","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=LfjCMUx7Ukw","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "都塔尔": {
    img: {
      "hero": {"src":"assets/img/都塔尔-头图.jpg","alt":"都塔尔头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/都塔尔-主图.jpg","alt":"都塔尔主图","caption":"主图 · 课件素材（P1）｜天亮前，他先数的是那两根弦"},
      "scene": {"src":"assets/img/都塔尔-场景图.jpg","alt":"都塔尔场景图","caption":"场景图 · 课件素材（P9）｜桑木得先在山里长够年份"},
      "structure": {"src":"assets/img/都塔尔-结构图.jpg","alt":"都塔尔结构图","caption":"结构图 · 课件素材（P5）｜一根不添：两弦、长颈、不蒙皮"}
    },
    anim: {
      "history": {"src":"assets/anim/都塔尔-历史演变.jpg","alt":"都塔尔历史演变","caption":"历史演变 · 课件素材（P8）｜桑木得先在山里长够年份"},
      "principle": {"src":"assets/anim/都塔尔-发声原理.jpg","alt":"都塔尔发声原理","caption":"发声原理 · 课件素材（P6）｜一根不添：两弦、长颈、不蒙皮"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/都塔尔/01-都塔尔弹布尔合奏维吾尔族民歌.mp3","title":"都塔尔&弹布尔 合奏维吾尔族民歌《我们的歌声》（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"都塔尔&弹布尔 合奏维吾尔族民歌《我们的歌声》","performer":"UNINTENDED MUSiC ","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=7lbVcHpcVQc","date":"NA","duration":"2:03","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=7lbVcHpcVQc","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "独弦琴": {
    img: {
      "hero": {"src":"assets/img/独弦琴-头图.jpg","alt":"独弦琴头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/独弦琴-主图.jpg","alt":"独弦琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/独弦琴-场景图.jpg","alt":"独弦琴场景图","caption":"场景图 · 课件素材（P10）｜一根弦前面的几道手"},
      "structure": {"src":"assets/img/独弦琴-结构图.jpg","alt":"独弦琴结构图","caption":"结构图 · 课件素材（P4）｜天没亮，他把那根弦又拉紧一点"}
    },
    anim: {
      "history": {"src":"assets/anim/独弦琴-历史演变.jpg","alt":"独弦琴历史演变","caption":"历史演变 · 课件素材（P9）｜一根弦前面的几道手"},
      "principle": {"src":"assets/anim/独弦琴-发声原理.jpg","alt":"独弦琴发声原理","caption":"发声原理 · 课件素材（P6）｜这件乐器，全身只有一根弦"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/独弦琴/01-越南DanBau.mp3","title":"越南DanBau（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"越南DanBau","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:19","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "铎": {
    img: {
      "main": {"src":"assets/img/铎-主图.jpg","alt":"铎主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/铎-场景图.jpg","alt":"铎场景图","caption":"场景图 · 课件素材（P18）｜那件铜铃，今天被人举在台上"},
      "structure": {"src":"assets/img/铎-结构图.jpg","alt":"铎结构图","caption":"结构图 · 课件素材（P4）｜正月里，官道上响的那一声"},
      "hero": "assets/img/铎-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/铎-历史演变.jpg","alt":"铎历史演变","caption":"历史演变 · 课件素材（P6）｜一只铜铃，腔里挂着一个舌"},
      "principle": {"src":"assets/anim/铎-发声原理.jpg","alt":"铎发声原理","caption":"发声原理 · 课件素材（P20）｜声音还在，只是换了只手"}
    }
  },
  "二胡": {
    img: {
      "main": {"src":"assets/img/二胡-主图.jpg","alt":"二胡主图：PPT 模版课件首页","caption":"主图 · 课件封面（PPT 模版第 1 页）"},
      "explode": {"src":"assets/img/二胡-主视觉.png","alt":"二胡主视觉：站内乐器特写（透明底抠图）","caption":"主视觉 · 站内乐器特写（透明底抠图）｜二胡全器"},
      "structure": {"src":"assets/img/二胡-结构图.jpg","alt":"二胡结构图","caption":"结构图 · 课件素材（PPT模版 p6）｜二胡的构造解析：琴筒、蟒皮、琴杆、琴轴、千金、琴码、琴弓"},
      "scene": {"src":"assets/img/二胡-场景图.jpg","alt":"二胡场景图","caption":"场景图 · 课件素材（PPT模版 p14）｜历代二胡名家：阿炳、刘天华、闵惠芬与二胡艺术的当代面貌"},
      "hero": {"src":"assets/img/二胡-头图.jpg","alt":"二胡头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/二胡-发声原理.jpg","alt":"二胡发声原理","caption":"发声原理 · 课件素材（PPT模版 p8）｜二胡的独特音色：内外弦定弦与音色解析"},
      "history": {"src":"assets/anim/二胡-历史演变.jpg","alt":"二胡历史演变","caption":"历史演变 · 课件素材（PPT模版 p4）｜二胡的起源与发展：唐代 → 宋代 → 明清 → 近代"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/二胡/01-站内.mp3","title":"二泉映月 · 二胡","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3A%E4%BA%8C%E6%B3%89%E6%98%A0%E6%9C%88.ogg）。原始文件：File:二泉映月.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、","meta":{"title":"二泉映月","performer":"张培健（Zhang Peijian）","author":"华彦钧（阿炳）","album":"Wikimedia Commons 单曲","compiler":"David290","date":"上传日期见来源页（曲目录于 1950 年代）","duration":"4:28（268 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3A%E4%BA%8C%E6%B3%89%E6%98%A0%E6%9C%88.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3A%E4%BA%8C%E6%B3%89%E6%98%A0%E6%9C%88.ogg）。原始文件：File:二泉映月.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/二胡/02-CD刘天华刘天华二胡独奏曲集.mp3","title":"CD刘天华刘天华二胡独奏曲集（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"CD刘天华刘天华二胡独奏曲集","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:23","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}},{"src":"assets/audio/二胡/03-미려적신화美丽的神话신화OS.mp3","title":"미려적신화美丽的神话신화OS（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"미려적신화美丽的神话신화OS","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"4:12","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "缸鼓": {
    img: {
      "main": {"src":"assets/img/缸鼓-主图.jpg","alt":"缸鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/缸鼓-场景图.jpg","alt":"缸鼓场景图","caption":"场景图 · 课件素材（P10）｜一张皮至少刨三遍，一具腔要拼到不漏气"},
      "structure": {"src":"assets/img/缸鼓-结构图.jpg","alt":"缸鼓结构图","caption":"结构图 · 课件素材（P6）｜一只倒扣的花盆，蒙着一张牛皮"},
      "hero": "assets/img/缸鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/缸鼓-历史演变.jpg","alt":"缸鼓历史演变","caption":"历史演变 · 课件素材（P8）｜院子里摆着恒温水，皮要等天"},
      "principle": {"src":"assets/anim/缸鼓-发声原理.jpg","alt":"缸鼓发声原理","caption":"发声原理 · 课件素材（P4）｜开演前一个钟头，后台的木架边"}
    }
  },
  "高胡": {
    img: {
      "main": {"src":"assets/img/高胡-主图.jpg","alt":"高胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/高胡-场景图.jpg","alt":"高胡场景图","caption":"场景图 · 课件素材（P7）｜它本来不叫高胡"},
      "structure": {"src":"assets/img/高胡-结构图.jpg","alt":"高胡结构图","caption":"结构图 · 课件素材（P4）｜天没亮，他先夹住的是琴筒"},
      "hero": "assets/img/高胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/高胡-历史演变.jpg","alt":"高胡历史演变","caption":"历史演变 · 课件素材（P5）｜天没亮，他先夹住的是琴筒"},
      "principle": {"src":"assets/anim/高胡-发声原理.jpg","alt":"高胡发声原理","caption":"发声原理 · 课件素材（P13）｜腿一松开，声音就丢了"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/高胡/01-站内.mp3","title":"雨打芭蕉 · 高胡","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3A%E9%9B%A8%E6%89%93%E8%8A%AD%E8%95%89.ogg）。原始文件：File:雨打芭蕉.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、","meta":{"title":"雨打芭蕉","performer":"张培健（Zhang Peijian）","author":"丘鹤俦（改编）","album":"Wikimedia Commons 单曲","compiler":"David290","date":"上传日期见来源页（曲目 1917 年改编）","duration":"4:15（255 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3A%E9%9B%A8%E6%89%93%E8%8A%AD%E8%95%89.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3A%E9%9B%A8%E6%89%93%E8%8A%AD%E8%95%89.ogg）。原始文件：File:雨打芭蕉.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}}]}
    }
  },
  "革胡": {
    img: {
      "main": {"src":"assets/img/革胡-主图.jpg","alt":"革胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/革胡-场景图.jpg","alt":"革胡场景图","caption":"场景图 · 课件素材（P6）｜排练厅最后排，一边是它，一边是大提琴"},
      "structure": {"src":"assets/img/革胡-结构图.jpg","alt":"革胡结构图","caption":"结构图 · 课件素材（P13）｜弦压上去，那张蒙面撑不住这么大的面积"},
      "hero": "assets/img/革胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/革胡-历史演变.jpg","alt":"革胡历史演变","caption":"历史演变 · 课件素材（P7）｜排练厅最后排，一边是它，一边是大提琴"},
      "principle": {"src":"assets/anim/革胡-发声原理.jpg","alt":"革胡发声原理","caption":"发声原理 · 课件素材（P4）｜那把琴比人还高，最低的那层音由它出"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/革胡/01-革胡Gehux笛子Dizi左.mp3","title":"【革胡Gehu x 笛子Dizi】《左手指月 Upwards To The Moon》打破国乐音域极限 (Cover:薩頂頂 Sa Ding","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"【革胡Gehu x 笛子Dizi】《左手指月 Upwards To The Moon》打破国乐音域极限 (Cover:薩頂頂 Sa Dingding) 吴昱忻 郑迪","performer":"Yuxin Wu 吴昱忻","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=br0nqo77ZVc","date":"NA","duration":"3:55","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=br0nqo77ZVc","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "古琴": {
    img: {
      "main": {"src":"assets/img/古琴-主图.jpg","alt":"古琴主图","caption":"主图 · 课件素材（P01）｜封面：七弦十三徽，一琴横陈"},
      "scene": {"src":"assets/img/古琴-场景图.jpg","alt":"古琴场景图","caption":"场景图 · 课件素材（P15）｜文人的琴室与雅集：琴室、雅集与市井，两套语境分开讲"},
      "structure": {"src":"assets/img/古琴-结构图.jpg","alt":"古琴结构图","caption":"结构图 · 课件素材（P05）｜琴面与琴底：琴面是一组名字，翻过来琴底又是一组"},
      "hero": {"src":"assets/img/古琴-头图.jpg","alt":"古琴头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：七弦十三徽，一琴横陈"}
    },
    anim: {
      "history": {"src":"assets/anim/古琴-历史演变.jpg","alt":"古琴历史演变","caption":"历史演变 · 课件素材（P10）｜从文字谱到减字谱：两种谱式各有实物与谱集可查"},
      "principle": {"src":"assets/anim/古琴-发声原理.jpg","alt":"古琴发声原理","caption":"发声原理 · 课件素材（P06）｜它怎么发声：散音、按音、泛音三种取音在同一张琴上"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/古琴/01-站内.mp3","title":"流水（川派） · 古琴","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ALiu_Shui.ogg）。原始文件：File:Liu Shui.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。","meta":{"title":"流水（川派）","performer":"CharlieHuang（见来源页）","author":"传统琴曲（打谱：见来源页）","album":"Wikimedia Commons 单曲","compiler":"CharlieHuang~commonswiki","date":"15 April 2006 (original upload date)","duration":"8:13（493 秒）","license":"CC BY 2.5","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ALiu_Shui.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ALiu_Shui.ogg）。原始文件：File:Liu Shui.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/古琴/02-卫仲乐1934百代.mp3","title":"卫仲乐1934百代（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"卫仲乐1934百代","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:04","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "古筝": {
    img: {
      "main": {"src":"assets/img/古筝-主图.jpg","alt":"古筝主图（4:3 模版页，框内完整显示）","caption":"主图 · 课件素材（模版页 01）｜封面 · 模版页（古筝本册无页序表，标题为艺术字；先占位，待正式配图替换）"},
      "scene": {"src":"assets/img/古筝-场景图.jpg","alt":"古筝场景图（模版页）","caption":"场景图 · 课件素材（模版页 09）｜模版页（古筝本册无页序表，标题为艺术字；先占位，待正式配图替换）"},
      "structure": {"src":"assets/img/古筝-结构图.jpg","alt":"古筝结构图（模版页）","caption":"结构图 · 课件素材（模版页 05）｜模版页（古筝本册无页序表，标题为艺术字；先占位，待正式配图替换）"},
      "hero": {"src":"assets/img/古筝-头图.jpg","alt":"古筝头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/古筝-历史演变.jpg","alt":"古筝历史演变：弦歌不辍，薪火相传","caption":"历史演变 · 课件素材（模版页 03）｜弦歌不辍，薪火相传 —— 从秦声铿锵到筝韵悠扬，历经千载风华"},
      "principle": {"src":"assets/anim/古筝-发声原理.jpg","alt":"古筝发声原理（模版页）","caption":"发声原理 · 课件素材（模版页 07）｜模版页（古筝本册无页序表，标题为艺术字；先占位，待正式配图替换）"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/古筝/01-Brooklyn专场.mp3","title":"Brooklyn专场（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"Brooklyn专场","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"24:42","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}},{"src":"assets/audio/古筝/02-X2DownloadappW.mp3","title":"X2DownloadappW（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"X2DownloadappW","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"2:19","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}},{"src":"assets/audio/古筝/03-古筝OnlyMyRailgu.mp3","title":"古筝OnlyMyRailgu（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"古筝OnlyMyRailgu","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:17","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "管子": {
    img: {
      "main": {"src":"assets/img/管子-主图.jpg","alt":"管子主图","caption":"主图 · 课件素材（p01）｜封面：双簧一管，吹彻鼓吹千年"},
      "scene": {"src":"assets/img/管子-场景图.jpg","alt":"管子场景图：冀中笙管乐以管子领奏","caption":"场景图 · 课件素材（p14）｜乐队里的领奏：冀中笙管乐因管子领奏而得名"},
      "structure": {"src":"assets/img/管子-结构图.jpg","alt":"管子结构图：哨片、管身与音孔","caption":"结构图 · 课件素材（p04）｜一管三件：哨片（芦茎双簧）/ 管身 / 音孔（八孔）"},
      "hero": {"src":"assets/img/管子-头图.jpg","alt":"管子头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/管子-历史演变.jpg","alt":"管子历史演变：唐代已盛行的时间线","caption":"历史演变 · 课件素材（p08）｜唐代已盛行：筚篥自西域入中原，是外来乐器"},
      "principle": {"src":"assets/anim/管子-发声原理.jpg","alt":"管子发声原理：双簧振动激发管内气柱共振","caption":"发声原理 · 课件素材（p06）｜声音为什么高亢：双簧振动 → 管内气柱共振"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/管子/01-管子独奏柳初新.mp3","title":"管子独奏  柳初新（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"管子独奏  柳初新","performer":"北京竹乐团 Bamboo Orchestra of Beiling","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=9MhgY8udkXQ","date":"NA","duration":"6:03","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=9MhgY8udkXQ","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "海螺": {
    img: {
      "main": {"src":"assets/img/海螺-主图.jpg","alt":"海螺主图","caption":"主图 · 课件素材（幻灯片1）｜封面：海螺（螺号）—— 一枚贝壳，一声传远"},
      "structure": {"src":"assets/img/海螺-结构图.jpg","alt":"海螺结构图","caption":"结构图 · 课件素材（幻灯片4）｜一枚贝壳，三样名字：海螺 / 螺号 / 哱啰"},
      "scene": {"src":"assets/img/海螺-场景图.jpg","alt":"海螺场景图","caption":"场景图 · 课件素材（幻灯片17）｜海洋号子：国家级非遗 Ⅱ-97"},
      "hero": {"src":"assets/img/海螺-头图.jpg","alt":"海螺头图（课件第 01 页）","caption":"头图 · 课件素材（幻灯片1）｜封面：海螺（螺号）—— 一枚贝壳，一声传远"}
    },
    anim: {
      "principle": {"src":"assets/anim/海螺-发声原理.jpg","alt":"海螺发声原理","caption":"发声原理 · 课件素材（幻灯片6）｜它为什么用来「发信号」：与笛、唢呐的对比"},
      "history": {"src":"assets/anim/海螺-历史演变.jpg","alt":"海螺历史演变","caption":"历史演变 · 课件素材（幻灯片15）｜1560 年，戚继光写成《纪效新书》，螺号载入军令"}
    }
  },
  "龢": {
    img: {
      "main": {"src":"assets/img/龢-主图.jpg","alt":"「龢」主图：八音俱全的第 72 件概念特写（AI 辅助生成示意，非实物照片）","caption":"主图 · 龢 概念特写（AI 辅助生成示意，非实物照片）"},
      "structure": {"src":"assets/img/龢-结构图.svg","alt":"「龢」结构图：八种材料各自的发声体与公共陶腔的耦合关系","caption":"结构图 · 八套振动体不共用振动体，只共用共鸣体"},
      "scene": {"src":"assets/img/龢-场景图.jpg","alt":"龢与礼乐：乐工列坐，编钟与笙同场","caption":"场景图 · 课件素材（p16）｜龢与礼乐 —— 这里取的是与本站第 72 件同名的历史乐器「龢」（即小笙）"},
      "explode": {"src":"assets/img/龢-分解图.png","alt":"「龢」3D 爆炸分解图：八音各九，按装配顺序拆开","caption":"3D 分解图 · 站内概念图（AI 辅助生成示意）｜八音各九，按装配顺序拆开"},
      "hero": {"src":"assets/img/龢-头图.jpg","alt":"龢头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/龢-发声原理.svg","alt":"「龢」发声原理：口、左手、右手、双足四路激励同时驱动一个共鸣腔","caption":"发声原理 · 四路激励，一个共鸣腔（SVG 动画）"},
      "history": {"src":"assets/anim/龢-历史演变.svg","alt":"「龢」谱系图：吹弹拉打四类乐器在八千年里汇到一件器上","caption":"谱系图 · 四条线索怎么汇到第 72 件"}
    }
  },
  "龢概念总图": {
    img: {
      "concept": "assets/img/龢-概念总图.svg"
    }
  },
  "胡尔": {
    img: {
      "main": {"src":"assets/img/胡尔-主图.jpg","alt":"胡尔主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/胡尔-场景图.jpg","alt":"胡尔场景图","caption":"场景图 · 课件素材（P13）｜一边是围坐的火炕，一边是换掉的场合"},
      "structure": {"src":"assets/img/胡尔-结构图.jpg","alt":"胡尔结构图","caption":"结构图 · 课件素材（P4）｜蒙古包里的灯，先照琴筒上那张皮"},
      "hero": "assets/img/胡尔-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/胡尔-历史演变.jpg","alt":"胡尔历史演变","caption":"历史演变 · 课件素材（P8）｜牧场午休，田埂上，蒙古包的门开着"},
      "principle": {"src":"assets/anim/胡尔-发声原理.jpg","alt":"胡尔发声原理","caption":"发声原理 · 课件素材（P6）｜蒙古语把它叫胡尔，操琴说书的人叫胡尔奇"}
    }
  },
  "胡笳": {
    img: {
      "main": {"src":"assets/img/胡笳-主图.jpg","alt":"胡笳主图","caption":"主图 · 课件素材（P01）｜封面：它的形貌，至今说不准"},
      "scene": {"src":"assets/img/胡笳-场景图.jpg","alt":"胡笳场景图","caption":"场景图 · 课件素材（P17）｜从毡房到敖包：阿勒泰现场里的它"},
      "structure": {"src":"assets/img/胡笳-结构图.jpg","alt":"胡笳结构图","caption":"结构图 · 课件素材（P06）｜四说并列，不择一：形貌有实物，也有待考"},
      "hero": {"src":"assets/img/胡笳-头图.jpg","alt":"胡笳头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：它的形貌，至今说不准"}
    },
    anim: {
      "history": {"src":"assets/anim/胡笳-历史演变.jpg","alt":"胡笳历史演变","caption":"历史演变 · 课件素材（P13）｜文献是一层层加上去的：从《史记》以降的层累记载"},
      "principle": {"src":"assets/anim/胡笳-发声原理.jpg","alt":"胡笳发声原理","caption":"发声原理 · 课件素材（P18）｜喉鼻音托着旋律：现场里的它，与呼麦的关系要先分清"}
    }
  },
  "葫芦丝": {
    img: {
      "main": {"src":"assets/img/葫芦丝-主图.jpg","alt":"葫芦丝主图","caption":"主图 · 课件素材（03 (2).png）｜一 认识葫芦丝 章封：靠什么发声、三管各做什么、为什么叫这个名字"},
      "structure": {"src":"assets/img/葫芦丝-结构图.jpg","alt":"葫芦丝结构图","caption":"结构图 · 课件素材（04 (2).png）｜一 认识葫芦丝 簧片与气柱耦合发声"},
      "scene": {"src":"assets/img/葫芦丝-场景图.jpg","alt":"葫芦丝场景图","caption":"场景图 · 课件素材（17.png）｜三 历史曲目与传承 章封：从滇西的月夜，到 1980 年走进北京的舞台"},
      "hero": {"src":"assets/img/葫芦丝-头图.jpg","alt":"葫芦丝头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/葫芦丝-发声原理.jpg","alt":"葫芦丝发声原理","caption":"发声原理 · 课件素材（06 (2).png）｜一 认识葫芦丝 葫芦（匏）、长三角形铜簧片与调音插口"},
      "history": {"src":"assets/anim/葫芦丝-历史演变.jpg","alt":"葫芦丝历史演变","caption":"历史演变 · 课件素材（14.png）｜二 制作工艺 六步工序"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/葫芦丝/01-站内.mp3","title":"葫芦丝音色示范 · 葫芦丝","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AHulusi.flac）。原始文件：File:Hulusi.flac，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。","meta":{"title":"葫芦丝音色示范","performer":"Subhashish Panigrahi","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"Psubhashish","date":"2017-03-23","duration":"0:27（27 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3AHulusi.flac","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AHulusi.flac）。原始文件：File:Hulusi.flac，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/葫芦丝/02-葫芦丝精选民乐AudioCD.mp3","title":"葫芦丝精选民乐AudioCD（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"葫芦丝精选民乐AudioCD","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"2:49","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "角": {
    img: {
      "main": {"src":"assets/img/角-主图.jpg","alt":"角主图","caption":"主图 · 课件素材（p01）｜封面：中国乐器 · 角 —— 以兽角为体，吹响就够用"},
      "scene": {"src":"assets/img/角-场景图.jpg","alt":"角场景图：诗文里的角","caption":"场景图 · 课件素材（p18）｜诗文里的角：画角起边愁"},
      "structure": {"src":"assets/img/角-结构图.jpg","alt":"角结构图：吹口、角身、喇叭口与装饰","caption":"结构图 · 课件素材（p07）｜一只角的全身图：吹口 / 角身 / 喇叭口 / 装饰"},
      "hero": {"src":"assets/img/角-头图.jpg","alt":"角头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/角-历史演变.jpg","alt":"角历史演变：它什么时候出现","caption":"历史演变 · 课件素材（p16）｜它什么时候出现：汉代始见于周边少数民族，隋唐入军旅"},
      "principle": {"src":"assets/anim/角-发声原理.jpg","alt":"角发声原理：唇振 + 气息 + 口形","caption":"发声原理 · 课件素材（p12）｜没有指孔，它怎么出声：唇振 + 气息 + 口形"}
    }
  },
  "京胡": {
    img: {
      "main": {"src":"assets/img/京胡-主图.jpg","alt":"京胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/京胡-场景图.jpg","alt":"京胡场景图","caption":"场景图 · 课件素材（P10）｜泡皮四十分钟，晾干要一整夜"},
      "structure": {"src":"assets/img/京胡-结构图.jpg","alt":"京胡结构图","caption":"结构图 · 课件素材（P4）｜蛇皮刚蒙上竹筒，还是湿的"},
      "hero": "assets/img/京胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/京胡-历史演变.jpg","alt":"京胡历史演变","caption":"历史演变 · 课件素材（P8）｜皮黄腔起来的时候，它跟着一起起来"},
      "principle": {"src":"assets/anim/京胡-发声原理.jpg","alt":"京胡发声原理","caption":"发声原理 · 课件素材（P6）｜一根竹筒上，为什么要绷一片蛇皮"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/京胡/01-京郊行姜克美京胡独奏.mp3","title":"京郊行  姜克美京胡独奏（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"京郊行  姜克美京胡独奏","performer":"Ang Lam Seng","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=i0E7eG6x19A","date":"NA","duration":"3:27","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=i0E7eG6x19A","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "箜篌": {
    img: {
      "hero": {"src":"assets/img/箜篌-头图.jpg","alt":"箜篌头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": "assets/img/箜篌-主图.jpg",
      "scene": "assets/img/箜篌-场景图.jpg",
      "structure": "assets/img/箜篌-结构图.jpg"
    },
    anim: {
      "history": "assets/anim/箜篌-历史演变.jpg",
      "principle": "assets/anim/箜篌-发声原理.jpg"
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/箜篌/01-彝族舞曲王惠然作曲吴琳箜篌独.mp3","title":"彝族舞曲  王惠然作曲  吴琳箜篌独奏（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"彝族舞曲  王惠然作曲  吴琳箜篌独奏","performer":"Ang Lam Seng","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=gNiJ7ZUwxng","date":"NA","duration":"3:50","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=gNiJ7ZUwxng","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "口弦": {
    img: {
      "main": {"src":"assets/img/口弦-主图.jpg","alt":"口弦主图","caption":"主图 · 课件素材（P01）｜封面：一片簧，五族各说"},
      "scene": {"src":"assets/img/口弦-场景图.jpg","alt":"口弦场景图","caption":"场景图 · 课件素材（P18）｜情歌与私语：私语式的乐器，用在情歌与耳边"},
      "structure": {"src":"assets/img/口弦-结构图.jpg","alt":"口弦结构图","caption":"结构图 · 课件素材（P07）｜三处实物证据：不靠示意图，靠实物本体"},
      "hero": {"src":"assets/img/口弦-头图.jpg","alt":"口弦头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：一片簧，五族各说"}
    },
    anim: {
      "history": {"src":"assets/anim/口弦-历史演变.jpg","alt":"口弦历史演变","caption":"历史演变 · 课件素材（P10）｜同时期的骨与竹：早期口簧不止骨制一种"},
      "principle": {"src":"assets/anim/口弦-发声原理.jpg","alt":"口弦发声原理","caption":"发声原理 · 课件素材（P17）｜音量小到近身可闻：音量决定了它的使用场合"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/口弦/01-站内.mp3","title":"口簧音色示范 · 口弦","caption":"来源：https://commons.wikimedia.org/wiki/File%3AJew%27s_harp_example.ogg。口簧（Jew’s harp，与我国口弦同类）的示范录音。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。","meta":{"title":"口簧音色示范","performer":"见来源页","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"Schwicky~commonswiki","date":"见来源页","duration":"0:16（16 秒）","license":"Public domain（公有领域）","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3AJew%27s_harp_example.ogg","note":"来源：https://commons.wikimedia.org/wiki/File%3AJew%27s_harp_example.ogg。口簧（Jew’s harp，与我国口弦同类）的示范录音。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。"}},{"src":"assets/audio/口弦/02-芬兰口簧.mp3","title":"芬兰口簧（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"芬兰口簧","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"0:41","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}},{"src":"assets/audio/口弦/03-雅库特口簧.mp3","title":"雅库特口簧（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"雅库特口簧","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"0:17","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "擂琴": {
    img: {
      "main": {"src":"assets/img/擂琴-主图.jpg","alt":"擂琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/擂琴-场景图.jpg","alt":"擂琴场景图","caption":"场景图 · 课件素材（P7）｜堂会院子、曲艺场、戏园——三处台口"},
      "structure": {"src":"assets/img/擂琴-结构图.jpg","alt":"擂琴结构图","caption":"结构图 · 课件素材（P5）｜一件琴，为什么要在筒口蒙一张皮"},
      "hero": "assets/img/擂琴-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/擂琴-历史演变.jpg","alt":"擂琴历史演变","caption":"历史演变 · 课件素材（P9）｜四道手上的时间：改器、定名、学艺、入名录"},
      "principle": {"src":"assets/anim/擂琴-发声原理.jpg","alt":"擂琴发声原理","caption":"发声原理 · 课件素材（P4）｜一件琴，为什么要在筒口蒙一张皮"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/擂琴/01-Chineseleiqin雷.mp3","title":"Chinese leiqin 雷琴 solo in the style of Beijing opera (京剧)（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"Chinese leiqin 雷琴 solo in the style of Beijing opera (京剧)","performer":"dbadagna","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=Tuzl9-WqiAM","date":"NA","duration":"2:46","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=Tuzl9-WqiAM","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "柳琴": {
    img: {
      "main": {"src":"assets/img/柳琴-主图.jpg","alt":"柳琴主图","caption":"主图 · 课件素材（P01）｜封面（叙事课件）"},
      "scene": {"src":"assets/img/柳琴-场景图.jpg","alt":"柳琴场景图","caption":"场景图 · 课件素材（P08）｜水边的台子，一唱就是一季：台口灯亮，台下坐满"},
      "structure": {"src":"assets/img/柳琴-结构图.jpg","alt":"柳琴结构图","caption":"结构图 · 课件素材（P06）｜两根弦，七个品，就叫土琵琶"},
      "hero": {"src":"assets/img/柳琴-头图.jpg","alt":"柳琴头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面（叙事课件）"}
    },
    anim: {
      "history": {"src":"assets/anim/柳琴-历史演变.jpg","alt":"柳琴历史演变","caption":"历史演变 · 课件素材（P11）｜改一把琴，花了二十多年：旧丝弦换新钢弦"},
      "principle": {"src":"assets/anim/柳琴-发声原理.jpg","alt":"柳琴发声原理","caption":"发声原理 · 课件素材（P13）｜四根弦的音准：新弦压进阶梯拱形琴码的槽里"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/柳琴/01-2012年器樂大賽柳琴獨奏六.mp3","title":"2012年器樂大賽柳琴獨奏六年級組第一名（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"2012年器樂大賽柳琴獨奏六年級組第一名","performer":"郭宇","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=92tL1AawCrw","date":"NA","duration":"3:50","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=92tL1AawCrw","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "芦笙": {
    img: {
      "main": {"src":"assets/img/芦笙-主图.jpg","alt":"芦笙主图","caption":"主图 · 课件素材（P01）｜封面：竹管成束，多族共响"},
      "scene": {"src":"assets/img/芦笙-场景图.jpg","alt":"芦笙场景图","caption":"场景图 · 课件素材（P16）｜锦鸡舞：男性吹芦笙作前导，女性随后起舞"},
      "structure": {"src":"assets/img/芦笙-结构图.jpg","alt":"芦笙结构图","caption":"结构图 · 课件素材（P07）｜四件套：带簧笙管 · 笙斗 · 吹管 · 共鸣筒"},
      "hero": {"src":"assets/img/芦笙-头图.jpg","alt":"芦笙头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：竹管成束，多族共响"}
    },
    anim: {
      "history": {"src":"assets/anim/芦笙-历史演变.jpg","alt":"芦笙历史演变","caption":"历史演变 · 课件素材（P20）｜非遗身份：Ⅱ-129 / Ⅲ-23 / Ⅷ-33 与五位传承人"},
      "principle": {"src":"assets/anim/芦笙-发声原理.jpg","alt":"芦笙发声原理","caption":"发声原理 · 课件素材（P08）｜怎么吹、能吹什么：口含吹管、吹气呼气鼓簧，可吹八度五度六度和音"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/芦笙/01-云Cloud芦笙曲Qeej纯.mp3","title":"云 Cloud - 芦笙曲 Qeej - 纯演奏版 - No Vocal Version [Hmong New Age Music]（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"云 Cloud - 芦笙曲 Qeej - 纯演奏版 - No Vocal Version [Hmong New Age Music]","performer":"Tee Chan","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=T8Ct53ODD5Y","date":"NA","duration":"4:24","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=T8Ct53ODD5Y","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "锣": {
    img: {
      "hero": {"src":"assets/img/锣-头图.jpg","alt":"锣头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/锣-主图.jpg","alt":"锣主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/锣-场景图.jpg","alt":"锣场景图","caption":"场景图 · 课件素材（P7）｜它是戏台上最先开口的那一件"},
      "structure": {"src":"assets/img/锣-结构图.jpg","alt":"锣结构图","caption":"结构图 · 课件素材（P4）｜入冬第一声，锤砸在烧红的铜饼上"}
    },
    anim: {
      "history": {"src":"assets/anim/锣-历史演变.jpg","alt":"锣历史演变","caption":"历史演变 · 课件素材（P5）｜入冬第一声，锤砸在烧红的铜饼上"},
      "principle": {"src":"assets/anim/锣-发声原理.jpg","alt":"锣发声原理","caption":"发声原理 · 课件素材（P17）｜其实，它从一开始就有音高"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/锣/01-站内.mp3","title":"锣体振动实录 · 锣","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AGong_or_bell_vibrant.ogg）。原始文件：File:Gong or bell vibrant.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、","meta":{"title":"锣体振动实录","performer":"stephan","author":"录音者即兴敲击","album":"Wikimedia Commons 单曲","compiler":"Fæ","date":"2007-04-26","duration":"1:04（64 秒）","license":"Public domain","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3AGong_or_bell_vibrant.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AGong_or_bell_vibrant.ogg）。原始文件：File:Gong or bell vibrant.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/锣/02-稷山锣鼓.mp3","title":"稷山锣鼓（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"稷山锣鼓","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"5:44","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "马头琴": {
    img: {
      "main": {"src":"assets/img/马头琴-主图.jpg","alt":"马头琴主图","caption":"主图 · 课件素材（01.png）｜封面 开篇 ① 主标题「中国乐器马头琴」"},
      "structure": {"src":"assets/img/马头琴-结构图.jpg","alt":"马头琴结构图","caption":"结构图 · 课件素材（05 (2).png）｜全琴部件一览 一 认形制 ① 自琴首至琴底 11 个部件名称与顺序"},
      "scene": {"src":"assets/img/马头琴-场景图.jpg","alt":"马头琴场景图","caption":"场景图 · 课件素材（20.png）｜当代传承与改良 四 怎么听 ① 1974 年出版蒙汉双语《马头琴演奏法》"},
      "hero": {"src":"assets/img/马头琴-头图.jpg","alt":"马头琴头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/马头琴-发声原理.jpg","alt":"马头琴发声原理","caption":"发声原理 · 课件素材（07.png）｜第二章 · 它凭什么响 二 怎么发声 ① 本章目标：从「弦」到「声」的完整路径"},
      "history": {"src":"assets/anim/马头琴-历史演变.jpg","alt":"马头琴历史演变","caption":"历史演变 · 课件素材（19.png）｜它今天的身份：两个国家级项目 四 怎么听 ① 中国国家级（音乐类）：「蒙古族马头琴音乐」…"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/马头琴/01-站内.mp3","title":"蒙古国国立音乐学院现场（马头琴） · 马头琴","caption":"来源：https://archive.org/details/aporee_65110_75202。1999 年 8 月 26 日录于蒙古国国立音乐学院，现场演奏的莫林胡尔（马头琴）。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。","meta":{"title":"蒙古国国立音乐学院现场（马头琴）","performer":"录音：gerrit.kalsbeek（radio aporee 现场采录）","author":"蒙古传统乐曲（即兴演奏）","album":"radio aporee : maps · Ulaanbaatar 现场录音","compiler":"radio@aporee.org","date":"1999-08-26","duration":"2:49（169 秒）","license":"Public Domain Mark 1.0（公有领域）","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://archive.org/details/aporee_65110_75202","note":"来源：https://archive.org/details/aporee_65110_75202。1999 年 8 月 26 日录于蒙古国国立音乐学院，现场演奏的莫林胡尔（马头琴）。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。"}}]}
    }
  },
  "芒筒": {
    img: {
      "main": {"src":"assets/img/芒筒-主图.jpg","alt":"芒筒主图：苗族芒筒芦笙乐舞里的低声部","caption":"主图 · 课件素材（p01）｜封面：笙领于前，芒筒随于后 —— 苗族「芒筒芦笙」乐舞里的低声部"},
      "scene": {"src":"assets/img/芒筒-场景图.jpg","alt":"芒筒场景图：围成圆圈、缓缓向前的芦笙乐舞","caption":"场景图 · 课件素材（p15）｜且吹且舞：围成圆圈、缓缓向前（齐心集鼓社，齐步踩笙堂）"},
      "structure": {"src":"assets/img/芒筒-结构图.jpg","alt":"芒筒结构图：带簧笙管、笙斗、吹管与共鸣筒","caption":"结构图 · 课件素材（p07）｜簧管三部分：带簧笙管 / 笙斗 / 吹管与共鸣筒"},
      "hero": {"src":"assets/img/芒筒-头图.jpg","alt":"芒筒头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/芒筒-历史演变.jpg","alt":"芒筒历史演变：国家级非遗名录与传承人","caption":"历史演变 · 课件素材（p20）｜Ⅱ-129 与今天：国家级非遗名录、传承人杨国堂与制作技艺传承"},
      "principle": {"src":"assets/anim/芒筒-发声原理.jpg","alt":"芒筒发声原理：簧片是簧管乐器的关键件","caption":"发声原理 · 课件素材（p11）｜簧片：一片黄铜决定响不响，加铅增强弹性与韧性"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/芒筒/01-芒筒芦笙丹寨.mp3","title":"#芒筒芦笙  丹寨（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"#芒筒芦笙  丹寨","performer":"杨胜涛","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=GEHXfHHDXvY","date":"NA","duration":"6:08","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=GEHXfHHDXvY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "木鱼": {
    img: {
      "main": {"src":"assets/img/木鱼-主图.jpg","alt":"木鱼主图","caption":"主图 · 课件素材（P01）｜封面：一木中空，一声警醒 —— 木鱼的形、声、工、用"},
      "scene": {"src":"assets/img/木鱼-场景图.jpg","alt":"木鱼场景图","caption":"场景图 · 课件素材（P18）｜梵呗里的木鱼：由「悦众（虎边）」执掌，主诵经节奏"},
      "structure": {"src":"assets/img/木鱼-结构图.jpg","alt":"木鱼结构图","caption":"结构图 · 课件素材（P08）｜九个部件一览：自鱼身至表面涂装，附鱼口与内腔开口、橄榄形木槌"},
      "hero": {"src":"assets/img/木鱼-头图.jpg","alt":"木鱼头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：一木中空，一声警醒 —— 木鱼的形、声、工、用"}
    },
    anim: {
      "history": {"src":"assets/anim/木鱼-历史演变.jpg","alt":"木鱼历史演变","caption":"历史演变 · 课件素材（P05）｜名字从哪来：清规类文献所载，别称鱼鼓、鱼板，属佛教「犍椎」系统"},
      "principle": {"src":"assets/anim/木鱼-发声原理.jpg","alt":"木鱼发声原理","caption":"发声原理 · 课件素材（P09）｜声音从哪来：开口 → 中空腹室 → 木体与腔室共同振动 → 一侧音孔传出"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/木鱼/01-大小木魚蓮花板板Temple.mp3","title":"大小木魚、蓮花板、板 Temple Block, Large Temple Block, Lotus Clappers, Clappers（","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"大小木魚、蓮花板、板 Temple Block, Large Temple Block, Lotus Clappers, Clappers","performer":"香港中樂團HKCO","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=bpGgeY7a2Sw","date":"NA","duration":"0:58","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=bpGgeY7a2Sw","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "铙": {
    img: {
      "main": {"src":"assets/img/铙-主图.jpg","alt":"铙主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/铙-场景图.jpg","alt":"铙场景图","caption":"场景图 · 课件素材（P8）｜长江以南，出土的比中原还大"},
      "structure": {"src":"assets/img/铙-结构图.jpg","alt":"铙结构图","caption":"结构图 · 课件素材（P12）｜铸什么、铸几件，不由他定"},
      "hero": "assets/img/铙-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/铙-历史演变.jpg","alt":"铙历史演变","caption":"历史演变 · 课件素材（P6）｜它口朝上，柄插在木柱里"},
      "principle": {"src":"assets/anim/铙-发声原理.jpg","alt":"铙发声原理","caption":"发声原理 · 课件素材（P4）｜山顶上，一锄头磕到了青铜"}
    }
  },
  "牛腿琴": {
    img: {
      "main": {"src":"assets/img/牛腿琴-主图.jpg","alt":"牛腿琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/牛腿琴-场景图.jpg","alt":"牛腿琴场景图","caption":"场景图 · 课件素材（P9）｜一块整木，掏多深只有木屑知道"},
      "structure": {"src":"assets/img/牛腿琴-结构图.jpg","alt":"牛腿琴结构图","caption":"结构图 · 课件素材（P20）｜弦一响，就有人跟着唱"},
      "hero": "assets/img/牛腿琴-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/牛腿琴-历史演变.jpg","alt":"牛腿琴历史演变","caption":"历史演变 · 课件素材（P7）｜鼓楼下、火塘边、古榕树下"},
      "principle": {"src":"assets/anim/牛腿琴-发声原理.jpg","alt":"牛腿琴发声原理","caption":"发声原理 · 课件素材（P4）｜天擦黑，木楼下支起一条长凳"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/牛腿琴/01-牛腿琴与乐队Live.mp3","title":"牛腿琴与乐队 (Live)（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"牛腿琴与乐队 (Live)","performer":"Release - Topic","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=MTbifxq5OcU","date":"NA","duration":"4:29","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=MTbifxq5OcU","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "拍板": {
    img: {
      "main": {"src":"assets/img/拍板-主图.jpg","alt":"拍板主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/拍板-场景图.jpg","alt":"拍板场景图","caption":"场景图 · 课件素材（P10）｜五道手，才凑出那一下"},
      "structure": {"src":"assets/img/拍板-结构图.jpg","alt":"拍板结构图","caption":"结构图 · 课件素材（P6）｜它是几片木板，串在一根皮条上"},
      "hero": "assets/img/拍板-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/拍板-历史演变.jpg","alt":"拍板历史演变","caption":"历史演变 · 课件素材（P8）｜它站在乐部的哪个位子上"},
      "principle": {"src":"assets/anim/拍板-发声原理.jpg","alt":"拍板发声原理","caption":"发声原理 · 课件素材（P4）｜头一课，不教唱"}
    }
  },
  "排鼓": {
    img: {
      "main": {"src":"assets/img/排鼓-主图.jpg","alt":"排鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/排鼓-场景图.jpg","alt":"排鼓场景图","caption":"场景图 · 课件素材（P18）｜今天，它跟管弦乐队一起响"},
      "structure": {"src":"assets/img/排鼓-结构图.jpg","alt":"排鼓结构图","caption":"结构图 · 课件素材（P19）｜今天，它跟管弦乐队一起响"},
      "hero": "assets/img/排鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/排鼓-历史演变.jpg","alt":"排鼓历史演变","caption":"历史演变 · 课件素材（P5）｜天不亮，他先给五只鼓各校一遍音"},
      "principle": {"src":"assets/anim/排鼓-发声原理.jpg","alt":"排鼓发声原理","caption":"发声原理 · 课件素材（P4）｜天不亮，他先给五只鼓各校一遍音"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/排鼓/01-2026卓越盃排鼓獨奏動.mp3","title":"2026卓越盃排鼓獨奏-動（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"2026卓越盃排鼓獨奏-動","performer":"Hayashi lin","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=-jCZJEGbDws","date":"NA","duration":"4:07","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=-jCZJEGbDws","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "排箫": {
    img: {
      "main": {"src":"assets/img/排箫-主图.jpg","alt":"排箫主图","caption":"主图 · 课件素材（01.png）｜封面：凤翼式排箫"},
      "explode": {"src":"assets/img/排箫-分解图.png","alt":"排箫 3D 结构爆炸图：上下端连接条、竹管、捆绑绳与两端装饰块","caption":"3D 分解图 · 站内结构分解图｜上端连接条 1 / 下端连接条 1 / 竹管 12–18 根 / 捆绑绳 1 / 端部装饰块 2（原图 3:2，框内完整显示）"},
      "structure": {"src":"assets/img/排箫-结构图.jpg","alt":"排箫结构图","caption":"结构图 · 课件素材（03.png）｜P03 结构分解：音管 / 吹口 / 管塞 / 编联带"},
      "scene": {"src":"assets/img/排箫-场景图.jpg","alt":"排箫场景图","caption":"场景图 · 课件素材（12.png）｜P12 敦煌壁画风格的乐队图"},
      "hero": {"src":"assets/img/排箫-头图.jpg","alt":"排箫头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/排箫-发声原理.jpg","alt":"排箫发声原理","caption":"发声原理 · 课件素材（10.png）｜P10 持箫与发声：正面与侧面姿势"},
      "history": {"src":"assets/anim/排箫-历史演变.jpg","alt":"排箫历史演变","caption":"历史演变 · 课件素材（04.png）｜P04 考古三证：骨 · 石 · 竹"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/排箫/01-羋月傳楚國情歌排簫Panfl.mp3","title":"羋月傳-楚國情歌｜排簫  Pan flute（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"羋月傳-楚國情歌｜排簫  Pan flute","performer":"林小楓 Lin Hsiao-Feng (Fongdizi)","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=lzssCB6NrHQ","date":"NA","duration":"2:13","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=lzssCB6NrHQ","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "碰铃": {
    img: {
      "main": {"src":"assets/img/碰铃-主图.jpg","alt":"碰铃主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/碰铃-场景图.jpg","alt":"碰铃场景图","caption":"场景图 · 课件素材（P18）｜排练厅里，一排一排的人等它先出声"},
      "structure": {"src":"assets/img/碰铃-结构图.jpg","alt":"碰铃结构图","caption":"结构图 · 课件素材（P4）｜四点半，殿里先响的不是人声"},
      "hero": "assets/img/碰铃-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/碰铃-历史演变.jpg","alt":"碰铃历史演变","caption":"历史演变 · 课件素材（P7）｜它是一对，但不是一对钹"},
      "principle": {"src":"assets/anim/碰铃-发声原理.jpg","alt":"碰铃发声原理","caption":"发声原理 · 课件素材（P5）｜四点半，殿里先响的不是人声"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/碰铃/01-认识二四拍使用碰铃演奏伦敦桥.mp3","title":"认识二四拍+使用碰铃演奏《伦敦桥》（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"认识二四拍+使用碰铃演奏《伦敦桥》","performer":"Jinling-Bear ","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=-9Wpf8bvEc8","date":"NA","duration":"3:32","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=-9Wpf8bvEc8","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "琵琶": {
    img: {
      "hero": {"src":"assets/img/琵琶-主图.jpg","alt":"琵琶头图：课件封面","caption":"头图 · 课件封面（第 01 页）"},
      "main": {"src":"assets/img/琵琶-主图.jpg","alt":"琵琶主图","caption":"主图 · 课件素材（PPT模版 p1）｜封面：琵琶 · 千年弹拨乐器之王"},
      "structure": {"src":"assets/img/琵琶-结构图.jpg","alt":"琵琶结构图","caption":"结构图 · 课件素材（PPT模版 p6）｜琵琶的构造解析：琴头、弦轴、琴颈、面板、品位、琴弦、缚弦、覆手"},
      "scene": {"src":"assets/img/琵琶-场景图.jpg","alt":"琵琶场景图","caption":"场景图 · 课件素材（PPT模版 p12）｜琵琶十大经典曲目：《十面埋伏》《霸王卸甲》……"}
    },
    anim: {
      "principle": {"src":"assets/anim/琵琶-发声原理.jpg","alt":"琵琶发声原理","caption":"发声原理 · 课件素材（PPT模版 p8）｜琵琶的独特音色：清脆明亮、浑厚低沉与颗粒感"},
      "history": {"src":"assets/anim/琵琶-历史演变.jpg","alt":"琵琶历史演变","caption":"历史演变 · 课件素材（PPT模版 p4）｜琵琶的起源与发展：秦汉 → 魏晋 → 隋唐 → 宋元 → 明清 → 现代"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/琵琶/01-站内.mp3","title":"苏州评弹唱段 · 琵琶","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3APingtan_Treasure.ogg）。原始文件：File:Pingtan Treasure.ogg（application/ogg），本站仅做格式转码为 MP3 96 ","meta":{"title":"苏州评弹唱段","performer":"Jason M. C., Han","author":"苏州评弹传统曲调","album":"Wikimedia Commons 单曲","compiler":"Jason M. C., Han","date":"2017-11-01","duration":"2:41（161 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3APingtan_Treasure.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3APingtan_Treasure.ogg）。原始文件：File:Pingtan Treasure.ogg（application/ogg），本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/琵琶/02-AnttiLuode.mp3","title":"AnttiLuode（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"AnttiLuode","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"2:43","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "秦琴": {
    img: {
      "hero": {"src":"assets/img/秦琴-头图.jpg","alt":"秦琴头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/秦琴-主图.jpg","alt":"秦琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/秦琴-场景图.jpg","alt":"秦琴场景图","caption":"场景图 · 课件素材（P7）｜戏台侧幕、围屋天井、潮州厅堂"},
      "structure": {"src":"assets/img/秦琴-结构图.jpg","alt":"秦琴结构图","caption":"结构图 · 课件素材（P16）｜错在把形制上的少，读成了价值上的低"}
    },
    anim: {
      "history": {"src":"assets/anim/秦琴-历史演变.jpg","alt":"秦琴历史演变","caption":"历史演变 · 课件素材（P4）｜同一张乐师席上，弹拨位坐过两把不一样的小琴"},
      "principle": {"src":"assets/anim/秦琴-发声原理.jpg","alt":"秦琴发声原理","caption":"发声原理 · 课件素材（P5）｜一把小琴，为什么总坐在「配」位上"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/秦琴/01-秦琴Qinqin.mp3","title":"秦琴Qinqin（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"秦琴Qinqin","performer":"香港中樂團HKCO","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=XUnzkArX41c","date":"NA","duration":"4:44","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=XUnzkArX41c","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "热瓦普": {
    img: {
      "hero": {"src":"assets/img/热瓦普-头图.jpg","alt":"热瓦普头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/热瓦普-主图.jpg","alt":"热瓦普主图","caption":"主图 · 课件素材（P1）｜序 · 一张皮，先于弦"},
      "scene": {"src":"assets/img/热瓦普-场景图.jpg","alt":"热瓦普场景图","caption":"场景图 · 课件素材（P8）｜在南疆的院子里，木头要先等两年"},
      "structure": {"src":"assets/img/热瓦普-结构图.jpg","alt":"热瓦普结构图","caption":"结构图 · 课件素材（P4）｜一张皮，先于弦决定这把琴的声音"}
    },
    anim: {
      "history": {"src":"assets/anim/热瓦普-历史演变.jpg","alt":"热瓦普历史演变","caption":"历史演变 · 课件素材（P6）｜瓢形的腔口上，蒙着的不是一块板"},
      "principle": {"src":"assets/anim/热瓦普-发声原理.jpg","alt":"热瓦普发声原理","caption":"发声原理 · 课件素材（P3）｜一张皮，先于弦决定这把琴的声音"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/热瓦普/01-UyghurRawapDad.mp3","title":"Uyghur Rawap Dadam Ustazim | Играем на уйгурском равапе с отцом（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"Uyghur Rawap Dadam Ustazim | Играем на уйгурском равапе с отцом","performer":"Uyghurify","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=CVaZDm9x46k","date":"NA","duration":"3:44","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=CVaZDm9x46k","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "阮": {
    img: {
      "main": {"src":"assets/img/阮-主图.jpg","alt":"阮主图","caption":"主图 · 课件素材（P01）｜封面：阮 —— 中声部的温润"},
      "scene": {"src":"assets/img/阮-场景图.jpg","alt":"阮场景图","caption":"场景图 · 课件素材（P12）｜从教坊到市井：演奏场合与曲目的变化"},
      "structure": {"src":"assets/img/阮-结构图.jpg","alt":"阮结构图","caption":"结构图 · 课件素材（P10）｜部件与功能：四弦、品柱、弦轴、缚弦逐件对照"},
      "hero": {"src":"assets/img/阮-头图.jpg","alt":"阮头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面：阮 —— 中声部的温润"}
    },
    anim: {
      "history": {"src":"assets/anim/阮-历史演变.jpg","alt":"阮历史演变","caption":"历史演变 · 课件素材（P07）｜唐代实物与图像证据：哪些是器物、哪些是图像"},
      "principle": {"src":"assets/anim/阮-发声原理.jpg","alt":"阮发声原理","caption":"发声原理 · 课件素材（P05）｜圆形音箱 + 直项：与梨形曲项琵琶的形制分路"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/阮/01-站内.mp3","title":"中阮音色示范 · 阮","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AZhongruan.ogg）。原始文件：File:Zhongruan.ogg（application/ogg），本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；","meta":{"title":"中阮音色示范","performer":"Francesc Fort","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"TaronjaSatsuma","date":"2023-11-28","duration":"0:32（32 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3AZhongruan.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3AZhongruan.ogg）。原始文件：File:Zhongruan.ogg（application/ogg），本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/阮/02-阮独奏丝路驼铃浓浓的异域风情.mp3","title":"阮独奏《丝路驼铃》，浓浓的异域风情，好听极了！（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"阮独奏《丝路驼铃》，浓浓的异域风情，好听极了！","performer":"三月天音乐","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=MZThvkF8xVY","date":"NA","duration":"4:08","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=MZThvkF8xVY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "软弓京胡": {
    img: {
      "main": {"src":"assets/img/软弓京胡-主图.jpg","alt":"软弓京胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/软弓京胡-场景图.jpg","alt":"软弓京胡场景图","caption":"场景图 · 课件素材（P10）｜十年腕力，换一串嘟噜"},
      "structure": {"src":"assets/img/软弓京胡-结构图.jpg","alt":"软弓京胡结构图","caption":"结构图 · 课件素材（P6）｜两根弦，靠一根不张紧的弓说话"},
      "hero": "assets/img/软弓京胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/软弓京胡-历史演变.jpg","alt":"软弓京胡历史演变","caption":"历史演变 · 课件素材（P7）｜两根弦，靠一根不张紧的弓说话"},
      "principle": {"src":"assets/anim/软弓京胡-发声原理.jpg","alt":"软弓京胡发声原理","caption":"发声原理 · 课件素材（P4）｜开书前，那把弓先垂着"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/软弓京胡/01-百鸟朝凤软弓京胡独奏AHun.mp3","title":"百鸟朝凤 （软弓京胡独奏）A Hundred Birds Paying Homage to the Phoenix （Soft-bow Ji","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"百鸟朝凤 （软弓京胡独奏）A Hundred Birds Paying Homage to the Phoenix （Soft-bow JingHu Solo）","performer":"Vivian Fei","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=BG-V-6_d1jI","date":"NA","duration":"4:03","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=BG-V-6_d1jI","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "萨它尔": {
    img: {
      "main": {"src":"assets/img/萨它尔-主图.jpg","alt":"萨它尔主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/萨它尔-场景图.jpg","alt":"萨它尔场景图","caption":"场景图 · 课件素材（P9）｜五道手做出来，二十多个小时记下来"},
      "structure": {"src":"assets/img/萨它尔-结构图.jpg","alt":"萨它尔结构图","caption":"结构图 · 课件素材（P4）｜歌还没起，他先把弓搁在膝上"},
      "hero": "assets/img/萨它尔-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/萨它尔-历史演变.jpg","alt":"萨它尔历史演变","caption":"历史演变 · 课件素材（P12）｜名录上写着木卡姆，没写这把琴"},
      "principle": {"src":"assets/anim/萨它尔-发声原理.jpg","alt":"萨它尔发声原理","caption":"发声原理 · 课件素材（P5）｜歌还没起，他先把弓搁在膝上"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/萨它尔/01-第88件小众乐器维吾尔族的提.mp3","title":"【第88件小众乐器】维吾尔族的提琴仙乐｜谢尔娜与艾捷克（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"【第88件小众乐器】维吾尔族的提琴仙乐｜谢尔娜与艾捷克","performer":"UNINTENDED MUSiC ","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=1zvCM_V0SnY","date":"NA","duration":"5:00","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=1zvCM_V0SnY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "三弦": {
    img: {
      "main": {"src":"assets/img/三弦-主图.jpg","alt":"三弦主图","caption":"主图 · 课件素材（01 (3).png）｜封面 三弦：三根弦、两面鞔皮、琴柄即指板的弹拨乐器"},
      "explode": {"src":"assets/img/三弦-分解图.png","alt":"三弦结构分解图：琴头、弦轴、琴杆、琴鼓、蟒皮、琴码与琴弦，附各部件细部","caption":"3D 分解图 · 站内结构分解图｜琴头 / 弦轴 / 琴杆 / 琴鼓 / 蟒皮 / 琴码 / 琴弦，下排是各部件细部"},
      "structure": {"src":"assets/img/三弦-结构图.jpg","alt":"三弦结构图","caption":"结构图 · 课件素材（15 (2).png）｜五、源流与历史 清代宫廷形制（营造尺原文）与 20 世纪实物尺寸因琴而异"},
      "scene": {"src":"assets/img/三弦-场景图.jpg","alt":"三弦场景图","caption":"场景图 · 课件素材（20.png）｜八、乐种·曲目·非遗与传承 京韵大鼓、苏州评弹、三弦书、弦板腔与独奏曲目"},
      "hero": {"src":"assets/img/三弦-头图.jpg","alt":"三弦头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "history": {"src":"assets/anim/三弦-历史演变.jpg","alt":"三弦历史演变","caption":"历史演变 · 课件素材（13.png）｜五、源流与历史 起源有多说（弦鼗说／渤海琴说／元代说／木勺说／多元说），不取一说为定论"},
      "principle": "assets/anim/三弦-发声原理.jpg"
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/三弦/01-站内.mp3","title":"苏州评弹（留园实况） · 三弦","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3APingtan_Music_at_the_Lingering_Garden.ogg）。原始文件：File:Pingtan Music at the Lingering Gar","meta":{"title":"苏州评弹（留园实况）","performer":"Lamassu Design","author":"苏州评弹传统曲调","album":"留园实况录音","compiler":"BotMultichillT","date":"2009","duration":"0:47（47 秒）","license":"CC BY-SA 3.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3APingtan_Music_at_the_Lingering_Garden.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3APingtan_Music_at_the_Lingering_Garden.ogg）。原始文件：File:Pingtan Music at the Lingering Garden.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}},{"src":"assets/audio/三弦/02-月光下的鳳尾竹三弦獨奏王學輝.mp3","title":"月光下的鳳尾竹 #三弦獨奏 #王學輝（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"月光下的鳳尾竹 #三弦獨奏 #王學輝","performer":"Jared Chan 123","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=3h1-403ol4o","date":"NA","duration":"1:12","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=3h1-403ol4o","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "瑟": {
    img: {
      "hero": {"src":"assets/img/瑟-头图.jpg","alt":"瑟头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/瑟-主图.jpg","alt":"瑟主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/瑟-场景图.jpg","alt":"瑟场景图","caption":"场景图 · 课件素材（P10）｜一弦一柱，竹笥里还备着一整笥的柱"},
      "structure": {"src":"assets/img/瑟-结构图.jpg","alt":"瑟结构图","caption":"结构图 · 课件素材（P6）｜一块长方木腔，每根弦底下各有一枚柱"}
    },
    anim: {
      "history": {"src":"assets/anim/瑟-历史演变.jpg","alt":"瑟历史演变","caption":"历史演变 · 课件素材（P8）｜钟磬围出一块空地，丝竹被摆在中间"},
      "principle": {"src":"assets/anim/瑟-发声原理.jpg","alt":"瑟发声原理","caption":"发声原理 · 课件素材（P4）｜诗里并排写着的两件乐器，从来不是一件东西"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/瑟/01-国乐故事锦瑟了解中国人的乐器.mp3","title":"【国乐故事】《锦瑟》—— 了解中国人的乐器 瑟（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"【国乐故事】《锦瑟》—— 了解中国人的乐器 瑟","performer":"柳青瑶","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=JXDfrhW74AY","date":"NA","duration":"4:40","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=JXDfrhW74AY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "笙": {
    img: {
      "main": {"src":"assets/img/笙-主图.jpg","alt":"笙主图","caption":"主图 · 课件素材（01 (2).png）｜封面 笙：以竹为骨、以簧为声的古老簧管乐器"},
      "structure": {"src":"assets/img/笙-结构图.jpg","alt":"笙结构图","caption":"结构图 · 课件素材（06 (2).png）｜一 认识笙 四类主要部件：笙斗、笙嘴、笙管、簧片"},
      "scene": {"src":"assets/img/笙-场景图.jpg","alt":"笙场景图","caption":"场景图 · 课件素材（17.png）｜四 演奏与非遗 合奏里的笙：管子领奏、笙来托腔与和声"},
      "hero": {"src":"assets/img/笙-头图.jpg","alt":"笙头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/笙-发声原理.jpg","alt":"笙发声原理","caption":"发声原理 · 课件素材（05 (2).png）｜一 认识笙 发声原理：自由簧 + 气柱共鸣、吹吸皆鸣、能奏和声"},
      "history": {"src":"assets/anim/笙-历史演变.jpg","alt":"笙历史演变","caption":"历史演变 · 课件素材（11.png）｜二 历史源流 1444 智化寺 → 明代材质记载 → 宋元明清雄县古乐 → 2011 省级非遗"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/笙/01-站内.mp3","title":"高音笙半音阶示范 · 笙","caption":"来源：https://commons.wikimedia.org/wiki/File%3ASoprano_Sheng_Chromatic_Scale.ogg。高音笙的半音阶吹奏示范。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。","meta":{"title":"高音笙半音阶示范","performer":"S099001（见来源页）","author":"演奏者示范","album":"Wikimedia Commons 单曲","compiler":"S099001","date":"见来源页","duration":"0:17（17 秒）","license":"CC0 1.0（公共领域贡献）","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ASoprano_Sheng_Chromatic_Scale.ogg","note":"来源：https://commons.wikimedia.org/wiki/File%3ASoprano_Sheng_Chromatic_Scale.ogg。高音笙的半音阶吹奏示范。本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容。"}}]}
    }
  },
  "唢呐": {
    img: {
      "main": {"src":"assets/img/唢呐-主图.jpg","alt":"唢呐主图","caption":"主图 · 课件素材（PPT模版 p1）｜封面：唢呐千秋 —— 结构与演奏教学课件"},
      "explode": {"src":"assets/img/唢呐-分解图.png","alt":"唢呐 3D 爆炸分解全图：哨片、气牌、芯子、杆、碗子五大部件","caption":"3D 分解图 · 站内结构分解图｜① 哨片 ② 气牌 ③ 芯子 ④ 杆（含指孔）⑤ 碗子 —— 五大部件逐层拆解（透明底）"},
      "structure": {"src":"assets/img/唢呐-结构图.jpg","alt":"唢呐结构图","caption":"结构图 · 课件素材（PPT模版 p7）｜唢呐 3D 爆炸分解全图：哨片、气牌、芯子、杆、碗子五大部件"},
      "scene": {"src":"assets/img/唢呐-场景图.jpg","alt":"唢呐场景图：音乐厅舞台上的唢呐手","caption":"场景图 · 课件素材（叙事课件 P19）｜音乐厅里，前排的人回了头 —— 舞台上的唢呐手逆光成剪影"},
      "hero": {"src":"assets/img/唢呐-头图.jpg","alt":"唢呐头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/唢呐-发声原理.jpg","alt":"唢呐发声原理","caption":"发声原理 · 课件素材（PPT模版 p8）｜哨片与芯子 —— 发声之源：气息振动与芯子传导"},
      "history": {"src":"assets/anim/唢呐-历史演变.jpg","alt":"唢呐历史演变","caption":"历史演变 · 课件素材（PPT模版 p4）｜历史沿革 · 千年回响：源起波斯—阿拉伯 → 金元 → 明代 → 清代 → 近现代"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/唢呐/01-站内.mp3","title":"唢呐音色示范 · 唢呐","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ASuona.ogg）。原始文件：File:Suona.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。","meta":{"title":"唢呐音色示范","performer":"Francesc Fort","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"TaronjaSatsuma","date":"2023-11-28","duration":"0:21（21 秒）","license":"CC BY-SA 4.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ASuona.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ASuona.ogg）。原始文件：File:Suona.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}}]}
    }
  },
  "堂鼓": {
    img: {
      "main": {"src":"assets/img/堂鼓-主图.jpg","alt":"堂鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/堂鼓-场景图.jpg","alt":"堂鼓场景图","caption":"场景图 · 课件素材（P7）｜它叫堂鼓，也叫同鼓"},
      "structure": {"src":"assets/img/堂鼓-结构图.jpg","alt":"堂鼓结构图","caption":"结构图 · 课件素材（P11）｜一张皮，要刨三遍"},
      "hero": "assets/img/堂鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/堂鼓-历史演变.jpg","alt":"堂鼓历史演变","caption":"历史演变 · 课件素材（P6）｜它叫堂鼓，也叫同鼓"},
      "principle": {"src":"assets/anim/堂鼓-发声原理.jpg","alt":"堂鼓发声原理","caption":"发声原理 · 课件素材（P4）｜幕布后面，两根槌悬着"}
    }
  },
  "吐良": {
    img: {
      "main": {"src":"assets/img/吐良-主图.jpg","alt":"吐良主图","caption":"主图 · 课件素材（01 (2).png）｜封面 吐良：一根竹管，全管只有一个吹孔"},
      "structure": {"src":"assets/img/吐良-结构图.jpg","alt":"吐良结构图","caption":"结构图 · 课件素材（04 (2).png）｜一 认识吐良 三个身份锚点：无指孔、吹孔在中部、管口＋气息"},
      "scene": {"src":"assets/img/吐良-场景图.jpg","alt":"吐良场景图","caption":"场景图 · 课件素材（21.png）｜七 文献、非遗与传承 国家级检索「吐良」0 条"},
      "hero": {"src":"assets/img/吐良-头图.jpg","alt":"吐良头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/吐良-发声原理.jpg","alt":"吐良发声原理","caption":"发声原理 · 课件素材（08 (2).png）｜二 形制与发声 音域约两个八度（只作定性）"},
      "history": {"src":"assets/anim/吐良-历史演变.jpg","alt":"吐良历史演变","caption":"历史演变 · 课件素材（10 (2).png）｜三 材料与制作 熏烤与制管——只写已知的几个关键动作，不画标准工序图"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/吐良/01-吐良演奏海海人生.mp3","title":"吐良演奏：海海人生（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"吐良演奏：海海人生","performer":"鄭文銓","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=SnS8revlimo","date":"NA","duration":"4:21","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=SnS8revlimo","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "奚琴": {
    img: {
      "main": {"src":"assets/img/奚琴-主图.jpg","alt":"奚琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/奚琴-场景图.jpg","alt":"奚琴场景图","caption":"场景图 · 课件素材（P14）｜戏台上换了一批琴，它淡了出去"},
      "structure": {"src":"assets/img/奚琴-结构图.jpg","alt":"奚琴结构图","caption":"结构图 · 课件素材（P4）｜一片竹片，伸进两根弦中间"},
      "hero": "assets/img/奚琴-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/奚琴-历史演变.jpg","alt":"奚琴历史演变","caption":"历史演变 · 课件素材（P5）｜它的名字，是一个人群的名字"},
      "principle": {"src":"assets/anim/奚琴-发声原理.jpg","alt":"奚琴发声原理","caption":"发声原理 · 课件素材（P6）｜它的名字，是一个人群的名字"}
    }
  },
  "象脚鼓": {
    img: {
      "main": {"src":"assets/img/象脚鼓-主图.jpg","alt":"象脚鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/象脚鼓-场景图.jpg","alt":"象脚鼓场景图","caption":"场景图 · 课件素材（P9）｜一年里，这面鼓要响两回"},
      "structure": {"src":"assets/img/象脚鼓-结构图.jpg","alt":"象脚鼓结构图","caption":"结构图 · 课件素材（P4）｜天刚亮，他先去看塘里泡着的木料"},
      "hero": "assets/img/象脚鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/象脚鼓-历史演变.jpg","alt":"象脚鼓历史演变","caption":"历史演变 · 课件素材（P8）｜一年里，这面鼓要响两回"},
      "principle": {"src":"assets/anim/象脚鼓-发声原理.jpg","alt":"象脚鼓发声原理","caption":"发声原理 · 课件素材（P6）｜一整段木头，掏空成一只象脚"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/象脚鼓/01-舞蹈世界傣族传统民间舞蹈傣族.mp3","title":"[舞蹈世界]傣族传统民间舞蹈《傣族象脚鼓舞》 表演：岩荣 等| CCTV综艺（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"[舞蹈世界]傣族传统民间舞蹈《傣族象脚鼓舞》 表演：岩荣 等| CCTV综艺","performer":"第艺流","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=lh3dE3WeXX8","date":"NA","duration":"1:20","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=lh3dE3WeXX8","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "埙": {
    img: {
      "main": {"src":"assets/img/埙-主图.jpg","alt":"埙主图","caption":"主图 · 课件素材（00封面16-9.png）｜封面：埙的静物主视觉"},
      "explode": {"src":"assets/img/埙-分解图.png","alt":"埙 3D 爆炸结构分解图：吹孔、音孔、内腔与陶壁，附三种形制与制作步骤","caption":"3D 分解图 · 站内结构分解图｜吹孔 / 音孔 / 内腔 / 陶壁，右侧是三种形制与制作步骤"},
      "structure": {"src":"assets/img/埙-结构图.jpg","alt":"埙结构图","caption":"结构图 · 课件素材（04.png）｜P04 埙的构造：吹孔 / 腔体 / 指孔 / 吹口平台 / 底部"},
      "scene": {"src":"assets/img/埙-场景图.jpg","alt":"埙场景图","caption":"场景图 · 课件素材（16.png）｜P16 烧制与装饰：入窑控温与雕刻纹样"},
      "hero": {"src":"assets/img/埙-头图.jpg","alt":"埙头图（课件第 01 页）","caption":"头图 · 课件素材（00封面16-9.png）｜封面：埙的静物主视觉"}
    },
    anim: {
      "principle": {"src":"assets/anim/埙-发声原理.jpg","alt":"埙发声原理","caption":"发声原理 · 课件素材（18.png）｜P18 口风三法：平吹 / 仰吹 / 俯吹"},
      "history": {"src":"assets/anim/埙-历史演变.jpg","alt":"埙历史演变","caption":"历史演变 · 课件素材（07.png）｜P07 七千年的萌芽：河姆渡与半坡陶埙"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/埙/01-站内.mp3","title":"埙音色示范 · 埙","caption":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ARecording_of_Xun.ogg）。原始文件：File:Recording of Xun.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署","meta":{"title":"埙音色示范","performer":"David290（演奏并录制）","author":"演奏者即兴示范","album":"Wikimedia Commons 单曲","compiler":"David290","date":"2011-07-30","duration":"0:28（28 秒）","license":"CC BY-SA 3.0","sourceName":"Wikimedia Commons / Internet Archive","sourceUrl":"https://commons.wikimedia.org/wiki/File%3ARecording_of_Xun.ogg","note":"来源：Wikimedia Commons（https://commons.wikimedia.org/wiki/File%3ARecording_of_Xun.ogg）。原始文件：File:Recording of Xun.ogg，本站仅做格式转码为 MP3 96 kbps，未剪辑、未改内容；完整署名与许可见来源页。"}}]}
    }
  },
  "雅托噶": {
    img: {
      "hero": {"src":"assets/img/雅托噶-头图.jpg","alt":"雅托噶头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"},
      "main": {"src":"assets/img/雅托噶-主图.jpg","alt":"雅托噶主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/雅托噶-场景图.jpg","alt":"雅托噶场景图","caption":"场景图 · 课件素材（P8）｜汗宫、寺庙、陵前，还有一场宴席"},
      "structure": {"src":"assets/img/雅托噶-结构图.jpg","alt":"雅托噶结构图","caption":"结构图 · 课件素材（P15）｜十弦到十六弦的写法，后来只剩两种"}
    },
    anim: {
      "history": {"src":"assets/anim/雅托噶-历史演变.jpg","alt":"雅托噶历史演变","caption":"历史演变 · 课件素材（P5）｜天没亮，她先把两排码子数了一遍"},
      "principle": {"src":"assets/anim/雅托噶-发声原理.jpg","alt":"雅托噶发声原理","caption":"发声原理 · 课件素材（P4）｜天没亮，她先把两排码子数了一遍"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/雅托噶/01-AsianRiffkotoogg.mp3","title":"AsianRiffkotoogg（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"AsianRiffkotoogg","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"0:04","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "轧筝": {
    img: {
      "main": {"src":"assets/img/轧筝-主图.jpg","alt":"轧筝主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/轧筝-场景图.jpg","alt":"轧筝场景图","caption":"场景图 · 课件素材（P11）｜会拉的人还在，场子没了"},
      "structure": {"src":"assets/img/轧筝-结构图.jpg","alt":"轧筝结构图","caption":"结构图 · 课件素材（P6）｜一排琴码、一片弦，看着就是一台筝"},
      "hero": "assets/img/轧筝-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/轧筝-历史演变.jpg","alt":"轧筝历史演变","caption":"历史演变 · 课件素材（P9）｜先削一根秆，再给弦上松香"},
      "principle": {"src":"assets/anim/轧筝-发声原理.jpg","alt":"轧筝发声原理","caption":"发声原理 · 课件素材（P4）｜祖父把琴交给孙子"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/轧筝/01-RevivedChinese.mp3","title":"Revived Chinese yazheng (轧筝, rubbed bridge zither)（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"Revived Chinese yazheng (轧筝, rubbed bridge zither)","performer":"dbadagna","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=SkrA5Dogay4","date":"NA","duration":"3:41","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=SkrA5Dogay4","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "扬琴": {
    img: {
      "main": {"src":"assets/img/扬琴-主图.jpg","alt":"扬琴主图","caption":"主图 · 课件素材（01 (2).png）｜主标题「中国乐器扬琴」"},
      "structure": {"src":"assets/img/扬琴-结构图.jpg","alt":"扬琴结构图","caption":"结构图 · 课件素材（08 (3).png）｜全文十一部件一次点名：共鸣箱、面板、底板、音孔、琴码、琴弦、弦轴、拴弦钩钉、山口、琴竹…"},
      "scene": {"src":"assets/img/扬琴-场景图.jpg","alt":"扬琴场景图","caption":"场景图 · 课件素材（19.png）｜左卡：广东音乐中的扬琴——严老烈「右竹奏法」与《旱天雷》《倒垂帘》等"},
      "hero": {"src":"assets/img/扬琴-头图.jpg","alt":"扬琴头图（课件第 01 页）","caption":"头图 · 课件素材（第 01 页）｜课件封面页"}
    },
    anim: {
      "principle": {"src":"assets/anim/扬琴-发声原理.jpg","alt":"扬琴发声原理","caption":"发声原理 · 课件素材（06 (2).png）｜四条硬差异：击弦工具（竹片 vs 球头槌）／发声方式（击弦 vs 拨弦、擦弦）／弦与码…"},
      "history": {"src":"assets/anim/扬琴-历史演变.jpg","alt":"扬琴历史演变","caption":"历史演变 · 课件素材（18.png）｜发源古波斯（今中亚、地中海一带），波斯语称「桑图尔」"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/扬琴/01-HowieMitchell02P.mp3","title":"HowieMitchell02P（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"HowieMitchell02P","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"2:57","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}},{"src":"assets/audio/扬琴/02-美式dulcimer.mp3","title":"美式dulcimer（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"美式dulcimer","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"1:48","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "椰胡": {
    img: {
      "main": {"src":"assets/img/椰胡-主图.jpg","alt":"椰胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/椰胡-场景图.jpg","alt":"椰胡场景图","caption":"场景图 · 课件素材（P10）｜七大部分，三十多道小工序"},
      "structure": {"src":"assets/img/椰胡-结构图.jpg","alt":"椰胡结构图","caption":"结构图 · 课件素材（P5）｜一只椰壳怎么就成了共鸣筒"},
      "hero": "assets/img/椰胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/椰胡-历史演变.jpg","alt":"椰胡历史演变","caption":"历史演变 · 课件素材（P8）｜它得长在万泉河两岸边"},
      "principle": {"src":"assets/anim/椰胡-发声原理.jpg","alt":"椰胡发声原理","caption":"发声原理 · 课件素材（P6）｜一只椰壳怎么就成了共鸣筒"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/椰胡/01-姜建華二胡望郷の響きNostal.mp3","title":"姜建華二胡望郷の響きNostal（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"姜建華二胡望郷の響きNostal","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:07","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "渔鼓": {
    img: {
      "main": {"src":"assets/img/渔鼓-主图.jpg","alt":"渔鼓主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/渔鼓-场景图.jpg","alt":"渔鼓场景图","caption":"场景图 · 课件素材（P9）｜四道手，把一张皮绷上筒口"},
      "structure": {"src":"assets/img/渔鼓-结构图.jpg","alt":"渔鼓结构图","caption":"结构图 · 课件素材（P8）｜四道手，把一张皮绷上筒口"},
      "hero": "assets/img/渔鼓-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/渔鼓-历史演变.jpg","alt":"渔鼓历史演变","caption":"历史演变 · 课件素材（P4）｜它有个名字，叫道筒"},
      "principle": {"src":"assets/anim/渔鼓-发声原理.jpg","alt":"渔鼓发声原理","caption":"发声原理 · 课件素材（P5）｜它有个名字，叫道筒"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/渔鼓/01-ChineseHunanFo.mp3","title":"Chinese Hunan Folk Drama - Wujiang Ferry  常德渔鼓《乌江渡》中国音乐地图 听见湖南 瑞鸣音乐  R","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"Chinese Hunan Folk Drama - Wujiang Ferry  常德渔鼓《乌江渡》中国音乐地图 听见湖南 瑞鸣音乐  Rhymoi Music","performer":"Musical Map of China 中国音乐地图.瑞鸣音乐 Rhymoi Music","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=q1jpsO3R4UY","date":"NA","duration":"3:59","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=q1jpsO3R4UY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "月琴": {
    img: {
      "main": {"src":"assets/img/月琴-主图.jpg","alt":"月琴主图","caption":"主图 · 课件素材（P01）｜封面（叙事课件）"},
      "scene": {"src":"assets/img/月琴-场景图.jpg","alt":"月琴场景图","caption":"场景图 · 课件素材（P08）｜乌蒙山那边的夜，是圆的：火把围坐，有人怀里抱着圆的琴"},
      "structure": {"src":"assets/img/月琴-结构图.jpg","alt":"月琴结构图","caption":"结构图 · 课件素材（P10）｜一张面、一张背，都是薄桐木 —— 选材、干燥、劈板、刨平、打磨"},
      "hero": {"src":"assets/img/月琴-头图.jpg","alt":"月琴头图（课件第 01 页）","caption":"头图 · 课件素材（P01）｜封面（叙事课件）"}
    },
    anim: {
      "history": {"src":"assets/anim/月琴-历史演变.jpg","alt":"月琴历史演变","caption":"历史演变 · 课件素材（P06）｜一个名字底下，站着好几件琴：月琴的名与实"},
      "principle": {"src":"assets/anim/月琴-发声原理.jpg","alt":"月琴发声原理","caption":"发声原理 · 课件素材（P13）｜差一点，气口就接不上：反复挪动小木条找同一个位置（琴码与音准）"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/月琴/01-陳明章二音和弦理論台灣月琴第.mp3","title":"陳明章二音和弦理論-台灣月琴第十一課〈慶端陽〉（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"陳明章二音和弦理論-台灣月琴第十一課〈慶端陽〉","performer":"陳明章Chen Ming Chang","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=wPZEMVo4gpY","date":"NA","duration":"4:56","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=wPZEMVo4gpY","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "云锣": {
    img: {
      "main": {"src":"assets/img/云锣-主图.jpg","alt":"云锣主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/云锣-场景图.jpg","alt":"云锣场景图","caption":"场景图 · 课件素材（P10）｜一面一个音，配齐一套才算完"},
      "structure": {"src":"assets/img/云锣-结构图.jpg","alt":"云锣结构图","caption":"结构图 · 课件素材（P4）｜天没亮，他先把十面小锣挂上木架"},
      "hero": "assets/img/云锣-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/云锣-历史演变.jpg","alt":"云锣历史演变","caption":"历史演变 · 课件素材（P9）｜一面一个音，配齐一套才算完"},
      "principle": {"src":"assets/anim/云锣-发声原理.jpg","alt":"云锣发声原理","caption":"发声原理 · 课件素材（P6）｜十面小锣，一个木架，一条绳"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/云锣/01-云锣乐器演奏.mp3","title":"云锣乐器演奏（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"云锣乐器演奏","performer":"我是马来西亚华人","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=yrbV-TcqfNo","date":"NA","duration":"1:50","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=yrbV-TcqfNo","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "钲": {
    img: {
      "main": {"src":"assets/img/钲-主图.jpg","alt":"钲主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/钲-场景图.jpg","alt":"钲场景图","caption":"场景图 · 课件素材（P10）｜五道手，最后量出三十一点五厘米"},
      "structure": {"src":"assets/img/钲-结构图.jpg","alt":"钲结构图","caption":"结构图 · 课件素材（P4）｜阵前那一声短响，落下来队伍就停了"},
      "hero": "assets/img/钲-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/钲-历史演变.jpg","alt":"钲历史演变","caption":"历史演变 · 课件素材（P8）｜乌江西岸，礼器和兵器埋在一处"},
      "principle": {"src":"assets/anim/钲-发声原理.jpg","alt":"钲发声原理","caption":"发声原理 · 课件素材（P6）｜它像钟，却只有一根能攥住的柄"}
    }
  },
  "中胡": {
    img: {
      "main": {"src":"assets/img/中胡-主图.jpg","alt":"中胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/中胡-场景图.jpg","alt":"中胡场景图","caption":"场景图 · 课件素材（P4）｜排练前一小时，编制表上那个位置还空着"},
      "structure": {"src":"assets/img/中胡-结构图.jpg","alt":"中胡结构图","caption":"结构图 · 课件素材（P9）｜放大一号：筒、杆、皮、弦，一样一样改"},
      "hero": "assets/img/中胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/中胡-历史演变.jpg","alt":"中胡历史演变","caption":"历史演变 · 课件素材（P6）｜中胡不是胡琴的老名字，是一个新位置"},
      "principle": {"src":"assets/anim/中胡-发声原理.jpg","alt":"中胡发声原理","caption":"发声原理 · 课件素材（P12）｜定音要对上别人，不是对上自己"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/中胡/01-江河水中胡獨奏riverwa.mp3","title":"江河水 (中胡 獨奏) river water (zhong hu)（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"江河水 (中胡 獨奏) river water (zhong hu)","performer":"tonpakfu","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=BvpjutAUm2A","date":"NA","duration":"2:14","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=BvpjutAUm2A","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "坠胡": {
    img: {
      "main": {"src":"assets/img/坠胡-主图.jpg","alt":"坠胡主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/坠胡-场景图.jpg","alt":"坠胡场景图","caption":"场景图 · 课件素材（P9）｜四道功课：拜师、学舌、双弦、把曲子理出来"},
      "structure": {"src":"assets/img/坠胡-结构图.jpg","alt":"坠胡结构图","caption":"结构图 · 课件素材（P5）｜一根长杆拿三弦的杆来用，只是短了一截"},
      "hero": "assets/img/坠胡-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/坠胡-历史演变.jpg","alt":"坠胡历史演变","caption":"历史演变 · 课件素材（P13）｜老规矩管吃管住，名录里却没有它的名字"},
      "principle": {"src":"assets/anim/坠胡-发声原理.jpg","alt":"坠胡发声原理","caption":"发声原理 · 课件素材（P3）｜天没亮，他先把弓毛夹进两根弦中间"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/坠胡/01-DancesWithErhuAn.mp3","title":"DancesWithErhuAn（参考）","caption":"参考音频 · 来源：站外素材 · 版权未核实，仅作本地参照","meta":{"title":"DancesWithErhuAn","performer":"见参考音频/README.md","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：参考音频/README.md","date":"","duration":"3:22","license":"版权未核实（见参考音频/README.md）","sourceName":"站外素材","sourceUrl":"","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  },
  "坠琴": {
    img: {
      "main": {"src":"assets/img/坠琴-主图.jpg","alt":"坠琴主图","caption":"主图 · 课件素材（P1）｜封面"},
      "scene": {"src":"assets/img/坠琴-场景图.jpg","alt":"坠琴场景图","caption":"场景图 · 课件素材（P19）｜曲艺进校园那天，老中青三代同台"},
      "structure": {"src":"assets/img/坠琴-结构图.jpg","alt":"坠琴结构图","caption":"结构图 · 课件素材（P6）｜一根长杆、一只小筒，两根弦各管一件事"},
      "hero": "assets/img/坠琴-头图.jpg"
    },
    anim: {
      "history": {"src":"assets/anim/坠琴-历史演变.jpg","alt":"坠琴历史演变","caption":"历史演变 · 课件素材（P14）｜名录里写着后继乏人，队里一年年少人"},
      "principle": {"src":"assets/anim/坠琴-发声原理.jpg","alt":"坠琴发声原理","caption":"发声原理 · 课件素材（P4）｜开场前的几分钟，琴先替人说话"}
    },
    audio: {
      "performance": {"tracks":[{"src":"assets/audio/坠琴/01-坠琴夸山东吴永平坠琴与乐队.mp3","title":"【坠琴】夸山东吴永平坠琴与乐队（参考）","caption":"参考音频 · 来源：YouTube · 版权未核实，仅作本地参照","meta":{"title":"【坠琴】夸山东吴永平坠琴与乐队","performer":"王志毅","author":"见参考音频/README.md","album":"参考音频（本地素材）","compiler":"来源：https://www.youtube.com/watch?v=nYFcZ5zXXMI","date":"NA","duration":"4:25","license":"版权未核实（仅作参考，未上站发布）","sourceName":"YouTube","sourceUrl":"https://www.youtube.com/watch?v=nYFcZ5zXXMI","note":"本地参考素材：仅供对照音色/技法，正式发布前请替换为自有演奏或授权录音。"}}]}
    }
  }

};
