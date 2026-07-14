import { useState, useEffect, useRef, useCallback } from "react";

const NL = {
  east: {
    name: "ナ・リーグ 東地区",
    teams: [
      { rank:1, name:"ブレーブス", g:22, w:15, l:7, d:0, pct:".682", gb:"-", r:122, ra:65, hr:29, sb:10, avg:".276", era:"2.66", e:9 },
      { rank:2, name:"マーリンズ", g:22, w:10, l:12, d:0, pct:".455", gb:"5", r:100, ra:101, hr:15, sb:25, avg:".255", era:"4.06", e:18 },
      { rank:2, name:"ナショナルズ", g:22, w:10, l:12, d:0, pct:".455", gb:"0", r:121, ra:134, hr:24, sb:21, avg:".258", era:"5.65", e:21 },
      { rank:4, name:"フィリーズ", g:21, w:8, l:13, d:0, pct:".381", gb:"1.5", r:75, ra:113, hr:22, sb:11, avg:".222", era:"4.84", e:15 },
      { rank:5, name:"メッツ", g:22, w:7, l:15, d:0, pct:".318", gb:"1", r:72, ra:97, hr:16, sb:12, avg:".226", era:"4.06", e:11 },
    ],
    analysis: `【ブレーブス 15勝7敗・単独首位】得失点差+57はMLBダントツ、打率.276/HR29本/防御率2.66と投打絶好調。想定勝率.762で実際.682よりむしろ「まだ伸び代がある」レベル。昨季75勝からの完全復活で、WS制覇筆頭候補に急浮上した感。【メッツ 7勝15敗・地区最下位】衝撃の崩壊——序盤7勝5敗から0勝10敗の大失速、直近もカブスに3連敗(12-4/4-2/2-1)で泥沼継続。注目すべきは失点97(4.4/試合)は決して悪くない——**打撃崩壊(72得点、打率.226、HR16本)が主因**。ソトIL欠場で打線が完全に機能しなくなった。オフの大型補強(ペラルタ・ビシェット・ロバートJr.)も火消しならず。【ナショナルズ 10勝12敗】得点121はNL最多クラスだが失点134で打撃戦負け連発、防御率5.65は深刻。CJアブラムス(打率.371)は驚異的だがエース不在が致命的。【フィリーズ 8勝13敗】得失点差-38。昨季96勝王者が打率.222・得点75と打線が全く機能せず、スアレス放出・カステヤノス離脱後の補強不足が表面化。【マーリンズ 10勝12敗】盗塁25はNL上位、得失点ほぼ五分で均衡。`,
  },
  central: {
    name: "ナ・リーグ 中地区",
    teams: [
      { rank:1, name:"レッズ", g:22, w:14, l:8, d:0, pct:".636", gb:"-", r:78, ra:86, hr:21, sb:19, avg:".202", era:"3.47", e:11 },
      { rank:2, name:"カージナルス", g:21, w:13, l:8, d:0, pct:".619", gb:"0.5", r:103, ra:111, hr:25, sb:16, avg:".233", era:"4.83", e:12 },
      { rank:3, name:"パイレーツ", g:22, w:13, l:9, d:0, pct:".591", gb:"0.5", r:113, ra:88, hr:26, sb:22, avg:".253", era:"3.22", e:14 },
      { rank:4, name:"カブス", g:21, w:12, l:9, d:0, pct:".571", gb:"0.5", r:112, ra:82, hr:24, sb:15, avg:".251", era:"3.59", e:9 },
      { rank:4, name:"ブリュワーズ", g:21, w:12, l:9, d:0, pct:".571", gb:"0", r:106, ra:87, hr:19, sb:33, avg:".232", era:"3.85", e:8 },
    ],
    analysis: `【パイレーツ／カブス／ブリュワーズが実力上位】想定勝率で見るとこの3チームが地区のトップ集団。カブス得失点差+30、パイレーツ+25、ブリュワーズ+19で、首位レッズの-8より明確に投打のバランス良。順位表の並びは僅差だが、中身は大きく違う。【レッズ 14勝8敗・首位だが想定勝率.453】得失点-8で勝率.636は異常な上振れ。打率.202はリーグ最低水準、接戦勝ち・救援運で勝ち星を拾っている状態。防御率3.47は堅実だが、このまま実績勝率を維持するのは困難と見るべき。【パイレーツ 13勝9敗・想定勝率.617】オニール・クルーズら若手覚醒で打率.253/HR26本の攻撃力、防御率3.22はMLB最高タイ。得失点差+25は地区トップで実力は本物。【カブス 12勝9敗・想定勝率.640】得失点差+30はNL中地区最大、HR24本と長打力もあり、エドウィン・カブレラの防御率0.00級投球が支柱。本来なら首位級。【ブリュワーズ 12勝9敗・盗塁33はMLBトップ】スモールボール健在。ペラルタ放出後も防御率3.85を維持。【カージナルス 13勝8敗・想定勝率.463】レッズ同様に大幅上振れ。得失点差-8で防御率4.83では持続性に疑問。NL中地区は順位表とパフォーマンスの乖離が最も大きい地区——今後の揺り戻しに注目。`,
  },
  west: {
    name: "ナ・リーグ 西地区",
    teams: [
      { rank:1, name:"ドジャース", g:21, w:15, l:6, d:0, pct:".714", gb:"-", r:121, ra:73, hr:37, sb:10, avg:".289", era:"3.44", e:5 },
      { rank:2, name:"パドレス", g:22, w:15, l:7, d:0, pct:".682", gb:"0.5", r:96, ra:79, hr:17, sb:21, avg:".232", era:"3.36", e:6 },
      { rank:3, name:"Dバックス", g:22, w:13, l:9, d:0, pct:".591", gb:"2", r:99, ra:102, hr:18, sb:13, avg:".244", era:"4.01", e:11 },
      { rank:4, name:"ロッキーズ", g:22, w:9, l:13, d:0, pct:".409", gb:"4", r:89, ra:99, hr:22, sb:24, avg:".241", era:"4.14", e:10 },
      { rank:4, name:"ジャイアンツ", g:22, w:9, l:13, d:0, pct:".409", gb:"0", r:75, ra:96, hr:13, sb:5, avg:".251", era:"4.15", e:12 },
    ],
    analysis: `【ドジャース 15勝6敗・首位・想定勝率.737】実績.714より想定が高く、まだ伸び代がある本物の強さ。得失点差+48、HR37本・打率.289はMLBトップ、防御率3.44と攻守共に隙がない。ロッキーズ遠征で1勝2敗のカード負けもクアーズ特殊事情。大谷翔平は50試合連続出塁継続でルースに並ぶ。【パドレス 15勝7敗・想定勝率.585】9勝1敗の爆走で肉薄しているが、得失点差+17に対して勝率.682は**明らかな上振れ**(+.097)。HR17本と長打少ない、接戦勝ちの蓄積で今の順位。持続性にはやや疑問。防御率3.36は優秀。【Dバックス 13勝9敗】打率.244・防御率4.01と中庸。コービン・キャロル、Eロドリゲス(防御率0.00級)が支え、7勝3敗ペースで健闘。【ロッキーズ 9勝13敗・想定勝率.447】盗塁24、HR22本と攻撃面の厚み。クアーズ効果込みで得失点-10は地区水準。【ジャイアンツ 9勝13敗】打率.251とそこそこだが、HR13本と長打不足、失策12の守備不安も足を引っ張り勝てず。`,
  },
};

const AL = {
  east: {
    name: "ア・リーグ 東地区",
    teams: [
      { rank:1, name:"ヤンキース", g:22, w:13, l:9, d:0, pct:".591", gb:"-", r:110, ra:82, hr:32, sb:27, avg:".218", era:"3.40", e:12 },
      { rank:2, name:"レイズ", g:21, w:12, l:9, d:0, pct:".571", gb:"0.5", r:103, ra:109, hr:18, sb:24, avg:".259", era:"4.47", e:20 },
      { rank:3, name:"オリオールズ", g:22, w:10, l:12, d:0, pct:".455", gb:"2.5", r:91, ra:98, hr:21, sb:14, avg:".230", era:"4.00", e:12 },
      { rank:4, name:"Rソックス", g:21, w:8, l:13, d:0, pct:".381", gb:"1.5", r:81, ra:96, hr:13, sb:10, avg:".228", era:"4.35", e:14 },
      { rank:4, name:"ブルージェイズ", g:21, w:8, l:13, d:0, pct:".381", gb:"0", r:83, ra:109, hr:18, sb:8, avg:".252", era:"4.56", e:16 },
    ],
    analysis: `【ヤンキース 13勝9敗・首位・想定勝率.635】打率.218はリーグワーストだがHR32・盗塁27で得点量産、防御率3.40と投手力も安定し得失点差+28。実績.591よりも想定が高く、本来もっと勝てる下振れチーム。スタントン.394、ベン・ライスOPS1.167と主軸健在。【レイズ 12勝9敗・想定勝率.474で大幅上振れ】打率.259はAL東トップだが防御率4.47、得失点差-6で勝率.571は**接戦勝ちの蓄積**。ディアス(.371)、シンプソン(.395)の活躍で乗り切っているが、失策20も含め持続性に懸念。【オリオールズ 10勝12敗】HR21本と長打力あり、得失点差-7で想定.466とほぼ実績通り。【Rソックス 8勝13敗・想定.419】得失点差-15で勝率.381は若干下振れ、HR13本の長打不足が深刻。【ブルージェイズ 8勝13敗】打率.252はそこそこだが失点109はAL東最多、得失点差-26で勝率.381は想定通り。WSまで行った昨季から完全に反動局面。`,
  },
  central: {
    name: "ア・リーグ 中地区",
    teams: [
      { rank:1, name:"ガーディアンズ", g:23, w:13, l:10, d:0, pct:".565", gb:"-", r:95, ra:95, hr:25, sb:17, avg:".226", era:"3.91", e:8 },
      { rank:2, name:"タイガース", g:22, w:12, l:10, d:0, pct:".545", gb:"0.5", r:94, ra:75, hr:17, sb:7, avg:".243", era:"3.27", e:12 },
      { rank:3, name:"ツインズ", g:22, w:11, l:11, d:0, pct:".500", gb:"1", r:112, ra:100, hr:26, sb:14, avg:".230", era:"4.06", e:14 },
      { rank:4, name:"Wソックス", g:22, w:8, l:14, d:0, pct:".364", gb:"3", r:82, ra:113, hr:24, sb:18, avg:".210", era:"4.83", e:14 },
      { rank:5, name:"ロイヤルズ", g:22, w:7, l:15, d:0, pct:".318", gb:"1", r:71, ra:103, hr:17, sb:16, avg:".218", era:"4.61", e:7 },
    ],
    analysis: `【タイガース 12勝10敗・想定勝率.593でAL中地区最強】得失点差+19は地区トップ、スクバル(防御率0.69)を軸にしたチーム防御率3.27は地区最高。実力ではすでに首位級で、このまま推移すれば逆転は時間の問題。【ガーディアンズ 13勝10敗・首位だが想定.500ちょうど】得失点差ゼロで勝率.565は接戦勝ちの蓄積。失策8はAL中地区ベストで守備は安定だが、打率.226の打線は物足りず、実力で維持するのは厳しい。【ツインズ 11勝11敗・想定.547】得失点差+12とチームとしては悪くない、得点112はAL中地区最多でHR26本の長打力、ライアンのエース役が安定。負け越すような内容ではないが星が伸びず。【Wソックス 8勝14敗】HR24本と意外な長打力はあるが打率.210と出塁できず、防御率4.83で失点113はAL中地区ワースト。【ロイヤルズ 7勝15敗・最下位】2勝8敗と急落、得点71はAL最少クラス、ウィットJrも打率.278と苦戦。AL中地区はタイガース・ガーディアンズ・ツインズの三つ巴が実態で、順位表(ガーディアンズ首位)とパフォーマンス(タイガース最強)に乖離あり。`,
  },
  west: {
    name: "ア・リーグ 西地区",
    teams: [
      { rank:1, name:"アスレチックス", g:22, w:11, l:11, d:0, pct:".500", gb:"-", r:91, ra:110, hr:20, sb:16, avg:".228", era:"4.82", e:5 },
      { rank:1, name:"レンジャーズ", g:22, w:11, l:11, d:0, pct:".500", gb:"-", r:92, ra:82, hr:24, sb:12, avg:".240", era:"3.57", e:7 },
      { rank:3, name:"エンゼルス", g:23, w:11, l:12, d:0, pct:".478", gb:"0.5", r:115, ra:104, hr:34, sb:10, avg:".224", era:"3.98", e:14 },
      { rank:4, name:"マリナーズ", g:23, w:10, l:13, d:0, pct:".435", gb:"1", r:90, ra:84, hr:21, sb:12, avg:".216", era:"3.22", e:9 },
      { rank:5, name:"アストロズ", g:23, w:8, l:15, d:0, pct:".348", gb:"2", r:121, ra:140, hr:27, sb:10, avg:".255", era:"6.11", e:9 },
    ],
    analysis: `【マリナーズ 10勝13敗・想定勝率.532の大幅下振れ】防御率3.22はAL最高タイ、得失点差+6でも勝率.435しか積めない。**本来なら地区首位候補**。打率.216と打線は弱いが、接戦弱くなければこの位置にはいない。揺り戻しで一気に浮上の可能性。【レンジャーズ 11勝11敗・想定.554】得失点差+10、防御率3.57、HR24本と投打バランス良。デグロム軸のローテは健在、実力では地区首位級だが運に恵まれず。【エンゼルス 11勝12敗・想定.547】**HR34本はMLBトップクラス**、得点115もAL西最多。トラウトが打率.246・OPS1.010・7HR・21得点と完全復活級、ソリアーノ防御率0.45。なのに借金1——下振れの典型。【アスレチックス 11勝11敗・想定.418】得失点差-19で勝率.500は**明らかな上振れ**(+.082)。ランゲリアーズ、クバノフらの活躍はあるが、このペースで首位タイは運頼み。【アストロズ 8勝15敗・最下位】得点121・HR27本は強力だが防御率6.11・失点140で全てぶち壊し。アルバレスOPS1.185の一人相撲では補えず、昨季108勝王朝の解体モード突入。AL西は全体として下振れ集団で、中身とランキングの乖離が大きい。`,
  },
};

function pyth(r, ra) {
  if (r + ra === 0) return 0;
  return (r ** 1.83) / (r ** 1.83 + ra ** 1.83);
}

function getLeagueExtremes(leagueData) {
  const allTeams = [...leagueData.east.teams, ...leagueData.central.teams, ...leagueData.west.teams];
  const numVal = (v) => typeof v === "string" ? parseFloat(v) : v;
  const stats = {};
  for (const k of ["w","l","r","ra","hr","sb","avg","era","e","pct"]) {
    const vals = allTeams.map(t => numVal(t[k]));
    stats[k] = { max: Math.max(...vals), min: Math.min(...vals) };
  }
  const diffs = allTeams.map(t => t.r - t.ra);
  stats.diff = { max: Math.max(...diffs), min: Math.min(...diffs) };
  const pyths = allTeams.map(t => pyth(t.r, t.ra));
  stats.pyth = { max: Math.max(...pyths), min: Math.min(...pyths) };
  return stats;
}

function extremeColor(val, statKey, extremes, higherIsBetter) {
  const s = extremes[statKey];
  if (!s || s.max === s.min) return "#fff";
  if (higherIsBetter) {
    if (val === s.max) return "#ff4444";
    if (val === s.min) return "#4488ff";
  } else {
    if (val === s.min) return "#ff4444";
    if (val === s.max) return "#4488ff";
  }
  return "#fff";
}

const COLS = [
  { key: "g", label: "試", hib: null },
  { key: "w", label: "勝", hib: true },
  { key: "l", label: "敗", hib: false },
  { key: "pct", label: "率", hib: true },
  { key: "pyth", label: "想定率", hib: true },
  { key: "gb", label: "差", hib: null },
  { key: "r", label: "得", hib: true },
  { key: "ra", label: "失", hib: false },
  { key: "diff", label: "差分", hib: true },
  { key: "hr", label: "HR", hib: true },
  { key: "sb", label: "盗", hib: true },
  { key: "avg", label: "打率", hib: true },
  { key: "era", label: "防御率", hib: false },
  { key: "e", label: "失策", hib: false },
];

const DIVISIONS = [
  { key: "nl-east", data: () => NL.east, label: "ナ東" },
  { key: "nl-central", data: () => NL.central, label: "ナ中" },
  { key: "nl-west", data: () => NL.west, label: "ナ西" },
  { key: "al-east", data: () => AL.east, label: "ア東" },
  { key: "al-central", data: () => AL.central, label: "ア中" },
  { key: "al-west", data: () => AL.west, label: "ア西" },
];

function getAllTeams() {
  const result = [];
  for (const d of DIVISIONS) {
    for (const t of d.data().teams) result.push({ ...t, divLabel: d.label });
  }
  result.sort((a, b) => parseFloat(b.pct) - parseFloat(a.pct));
  result.forEach((t, i) => { t.globalRank = i + 1; });
  return result;
}

function getAllExtremes() {
  const teams = [];
  for (const d of DIVISIONS) teams.push(...d.data().teams);
  const numVal = (v) => typeof v === "string" ? parseFloat(v) : v;
  const stats = {};
  for (const k of ["w","l","r","ra","hr","sb","avg","era","e","pct"]) {
    const vals = teams.map(t => numVal(t[k]));
    stats[k] = { max: Math.max(...vals), min: Math.min(...vals) };
  }
  const diffs = teams.map(t => t.r - t.ra);
  stats.diff = { max: Math.max(...diffs), min: Math.min(...diffs) };
  const pyths = teams.map(t => pyth(t.r, t.ra));
  stats.pyth = { max: Math.max(...pyths), min: Math.min(...pyths) };
  return stats;
}

function AllTeamsTable() {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  const teams = getAllTeams();
  const extremes = getAllExtremes();
  const numVal = (v) => typeof v === "string" ? parseFloat(v) : v;

  const getVal = (t, k) => {
    if (k === "pyth") return pyth(t.r, t.ra);
    if (k === "diff") return t.r - t.ra;
    if (k === "gb") return t.gb === "-" ? -1 : parseFloat(t.gb);
    const v = t[k];
    return typeof v === "string" ? parseFloat(v) : v;
  };

  let displayed = [...teams];
  if (sortKey && sortDir) {
    const col = COLS.find((c) => c.key === sortKey);
    const hib = col ? col.hib : null;
    displayed.sort((a, b) => {
      const va = getVal(a, sortKey);
      const vb = getVal(b, sortKey);
      if (hib === true) return sortDir === "desc" ? vb - va : va - vb;
      if (hib === false) return sortDir === "desc" ? va - vb : vb - va;
      return sortDir === "desc" ? vb - va : va - vb;
    });
  }

  const handleClick = (key) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("desc"); return; }
    if (sortDir === "desc") { setSortDir("asc"); return; }
    setSortKey(null); setSortDir(null);
  };

  const arrow = (k) => {
    if (sortKey !== k) return "";
    return sortDir === "desc" ? " ▼" : " ▲";
  };

  const thBase = { padding: "10px 4px", textAlign: "center", borderBottom: "2px solid #ff6b35", background: "#1a1a2e" };
  const thRank = { ...thBase, position: "sticky", left: 0, zIndex: 3, minWidth: 28, width: 28 };
  const thDiv  = { ...thBase, position: "sticky", left: 28, zIndex: 3, minWidth: 34, width: 34, fontFamily: "'Noto Sans JP', sans-serif" };
  const thName = { ...thBase, textAlign: "left", position: "sticky", left: 62, zIndex: 3, minWidth: 80, boxShadow: "inset -1px 0 0 #444", padding: "10px 6px" };

  return (
    <div style={{ overflowX: "auto", marginBottom: 4, WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
        <thead>
          <tr style={{ color: "#e0e0e0", textTransform: "uppercase", fontSize: 10, letterSpacing: 1 }}>
            <th style={thRank}>#</th>
            <th style={thDiv}>地区</th>
            <th style={thName}>チーム</th>
            {COLS.map((c, i) => (
              <th key={i} onClick={() => handleClick(c.key)} style={{
                padding: "10px 6px", textAlign: "center", borderBottom: "2px solid #ff6b35",
                whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
                background: "#1a1a2e", color: sortKey === c.key ? "#ff6b35" : "#e0e0e0",
              }}>{c.label}{arrow(c.key)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayed.map((t, i) => {
            const diff = t.r - t.ra;
            const pythW = pyth(t.r, t.ra);
            const bg = i % 2 === 0 ? "#16162a" : "#1c1c38";
            const vals = { g:t.g, w:t.w, l:t.l, pct:t.pct, gb:t.gb, r:t.r, ra:t.ra, diff, hr:t.hr, sb:t.sb, avg:t.avg, era:t.era, e:t.e, pyth:pythW };
            const tdRank = { padding: "10px 4px", position: "sticky", left: 0, background: bg, zIndex: 1, textAlign: "center", color: "#fff", fontWeight: 600, width: 28 };
            const tdDiv  = { padding: "10px 4px", position: "sticky", left: 28, background: bg, zIndex: 1, textAlign: "center", color: "#888", fontSize: 10, fontFamily: "'Noto Sans JP', sans-serif", width: 34 };
            const tdName = { padding: "10px 6px", position: "sticky", left: 62, background: bg, zIndex: 1, minWidth: 80, boxShadow: "inset -1px 0 0 #444", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" };
            return (
              <tr key={t.divLabel + t.name} style={{ background: bg }}>
                <td style={tdRank}>{t.globalRank}</td>
                <td style={tdDiv}>{t.divLabel}</td>
                <td style={tdName}>{t.name}</td>
                {COLS.map((c, j) => {
                  let v = vals[c.key];
                  let display = v;
                  if (c.key === "pyth") display = v.toFixed(3).replace(/^0/, "");
                  if (c.key === "diff") display = (v >= 0 ? "+" : "") + v;
                  const color = c.hib !== null ? extremeColor(numVal(v), c.key, extremes, c.hib) : "#fff";
                  return (
                    <td key={j} style={{ padding: "10px 6px", textAlign: "center", color, whiteSpace: "nowrap" }}>{display}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StandingsTable({ division, extremes, scrollRef, onScroll }) {
  const numVal = (v) => typeof v === "string" ? parseFloat(v) : v;
  const thSticky = {
    padding: "10px 6px", textAlign: "left", borderBottom: "2px solid #ff6b35",
    position: "sticky", left: 0, background: "#1a1a2e", zIndex: 2, minWidth: 72,
    boxShadow: "inset -1px 0 0 #444",
  };

  return (
    <div ref={scrollRef} onScroll={onScroll}
      style={{ overflowX: "auto", marginBottom: 4, WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
        <thead>
          <tr style={{ background: "#1a1a2e", color: "#e0e0e0", textTransform: "uppercase", fontSize: 10, letterSpacing: 1 }}>
            <th style={thSticky}>チーム</th>
            {COLS.map((c, i) => (
              <th key={i} style={{ padding: "10px 6px", textAlign: "center", borderBottom: "2px solid #ff6b35", whiteSpace: "nowrap" }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {division.teams.map((t, i) => {
            const diff = t.r - t.ra;
            const pythW = pyth(t.r, t.ra);
            const bg = i % 2 === 0 ? "#16162a" : "#1c1c38";
            const vals = { g:t.g, w:t.w, l:t.l, pct:t.pct, gb:t.gb, r:t.r, ra:t.ra, diff, hr:t.hr, sb:t.sb, avg:t.avg, era:t.era, e:t.e, pyth:pythW };
            const tdStickyTeam = {
              padding: "10px 6px", position: "sticky", left: 0, background: bg, zIndex: 1, minWidth: 72,
              boxShadow: "inset -1px 0 0 #444", fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 600, color: "#fff", whiteSpace: "nowrap",
            };
            return (
              <tr key={i} style={{ background: bg }}>
                <td style={tdStickyTeam}>{t.rank}. {t.name}</td>
                {COLS.map((c, j) => {
                  let v = vals[c.key];
                  let display = v;
                  if (c.key === "pyth") display = v.toFixed(3).replace(/^0/, "");
                  if (c.key === "diff") display = (v >= 0 ? "+" : "") + v;
                  const color = c.hib !== null ? extremeColor(numVal(v), c.key, extremes, c.hib) : "#fff";
                  return (
                    <td key={j} style={{ padding: "10px 6px", textAlign: "center", color, whiteSpace: "nowrap" }}>{display}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Accordion({ title, icon, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "left", background: "transparent",
        border: "1px solid #2a2a4a", borderRadius: 6, padding: "8px 12px",
        color: "#ff6b35", fontFamily: "'DM Mono', monospace", fontSize: 12,
        letterSpacing: 1, cursor: "pointer", display: "flex",
        justifyContent: "space-between", alignItems: "center",
      }}>
        <span>{icon} {title}</span>
        <span style={{ fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}

function AnalysisBlock({ text }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      border: "1px solid #2a2a4a", borderLeft: "3px solid #ff6b35", borderRadius: 6,
      padding: "14px 16px", fontSize: 13, lineHeight: 1.8,
      color: "#c8c8d8", fontFamily: "'Noto Sans JP', sans-serif",
    }}>{text}</div>
  );
}

function NotesSection({ divisionKey }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");
  const [loading, setLoading] = useState(true);
  const storageKey = `mlb-notes:${divisionKey}`;

  useEffect(() => {
    window.storage.get(storageKey).then((r) => {
      if (r && r.value) { setNote(r.value); setSaved(r.value); }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [storageKey]);

  const save = () => {
    window.storage.set(storageKey, note).then(() => setSaved(note)).catch((e) => console.error(e));
  };

  if (loading) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <textarea
        value={note} onChange={(e) => setNote(e.target.value)}
        placeholder="この地区についてのメモを追加..."
        style={{
          width: "100%", boxSizing: "border-box", minHeight: 60, background: "#0f0f23",
          border: "1px solid #2a2a4a", borderRadius: 6, color: "#c8c8d8", padding: "10px 12px",
          fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.6, resize: "vertical", outline: "none",
        }}
        onFocus={(e) => e.target.style.borderColor = "#ff6b35"}
        onBlur={(e) => e.target.style.borderColor = "#2a2a4a"}
      />
      {note !== saved && (
        <button onClick={save} style={{
          marginTop: 6, padding: "6px 16px", background: "#ff6b35", color: "#fff",
          border: "none", borderRadius: 4, fontSize: 12, cursor: "pointer", fontWeight: 600,
        }}>保存</button>
      )}
    </div>
  );
}

function DivisionSection({ divKey, division, extremes, scrollRef, onScroll }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h3 style={{
        fontFamily: "'DM Mono', monospace", fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
        color: "#ff6b35", marginBottom: 12, paddingBottom: 6, borderBottom: "1px solid #2a2a4a",
      }}>{division.name}</h3>
      <StandingsTable division={division} extremes={extremes} scrollRef={scrollRef} onScroll={onScroll} />
      <Accordion title="戦況分析" icon="▎" defaultOpen={false}>
        <AnalysisBlock text={division.analysis} />
      </Accordion>
      <Accordion title="メモ" icon="✎" defaultOpen={false}>
        <NotesSection divisionKey={divKey} />
      </Accordion>
    </div>
  );
}

function LeagueAnalysis({ league }) {
  const nlText = `NLはドジャース(15-6)・ブレーブス(15-7)・パドレス(15-7)の三強構造。ドジャース得失点差+48・想定勝率.737、ブレーブス+57・.762、両者とも実力本物。一方パドレスは得失点差+17で想定.585に対し実績.682は**明らかな接戦勝ちの蓄積**。NL中地区は順位表とパフォーマンスの乖離が最大で、首位レッズ(得失点-8)・2位カージナルス(-8)が想定.45前後の上振れ、逆にカブス(+30)・パイレーツ(+25)・ブリュワーズ(+19)の3チームが実力上位。メッツ0勝10敗の崩壊は**打撃崩壊が主因**——失点97は並だが得点72と打率.226が致命的。ソトIL欠場の影響が長引く。`;
  const alText = `AL全体が弱く、勝率.600超のチームがゼロ。AL中地区は**タイガースが想定勝率.593で実力最強**だが、首位ガーディアンズ(得失点差0、想定.500)が接戦勝ちで首位キープ。ツインズも含めた三つ巴の実態。AL西地区はさらに下振れが強く、マリナーズ(想定.532)、レンジャーズ(.554)、エンゼルス(.547)の3チームが実力では首位級だが、首位タイのアスレチックス(得失点-19、想定.418)が上振れで並ぶ混沌。ヤンキースは打率.218ながらHR32・SB27・防御率3.40と各指標が機能しAL東首位を維持、想定.635で下振れ気味。アストロズは得失点-19で最下位、防御率6.11の論外級で王朝解体モード。エンゼルスのHR34本はMLBトップクラス、トラウト復活は本物。`;
  return (
    <Accordion title={`${league === "nl" ? "ナショナル・リーグ" : "アメリカン・リーグ"} 全体概況`} icon="◆" defaultOpen={true}>
      <div style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)",
        border: "1px solid #ff6b35", borderRadius: 8, padding: "18px 20px",
        fontSize: 13, lineHeight: 1.9, color: "#d8d8e8", fontFamily: "'Noto Sans JP', sans-serif",
      }}>
        {league === "nl" ? nlText : alText}
      </div>
    </Accordion>
  );
}

export default function App() {
  const [tab, setTab] = useState("all");

  const leagueData = tab === "nl" ? NL : AL;
  const extremes = tab === "all" ? null : getLeagueExtremes(leagueData);
  const divisions = tab === "nl"
    ? [["nl-east", NL.east], ["nl-central", NL.central], ["nl-west", NL.west]]
    : tab === "al"
    ? [["al-east", AL.east], ["al-central", AL.central], ["al-west", AL.west]]
    : [];

  const scrollRefs = useRef([null, null, null]);
  const isSyncing = useRef(false);

  const handleScroll = useCallback((sourceIdx) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const left = scrollRefs.current[sourceIdx]?.scrollLeft;
    if (left != null) {
      for (let i = 0; i < 3; i++) {
        if (i !== sourceIdx && scrollRefs.current[i]) scrollRefs.current[i].scrollLeft = left;
      }
    }
    requestAnimationFrame(() => { isSyncing.current = false; });
  }, []);

  const tabs = [["all", "全体"], ["al", "ア・リーグ"], ["nl", "ナ・リーグ"]];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", color: "#e0e0e0", fontFamily: "'Noto Sans JP', 'DM Mono', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#0a0a1a", borderBottom: "2px solid #ff6b35", padding: "10px 16px", display: "flex", justifyContent: "center" }}>
        {tabs.map(([key, label], i) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, maxWidth: 160, padding: "10px 0", fontSize: 12, fontWeight: 700,
            fontFamily: "'DM Mono', monospace", letterSpacing: 1,
            background: tab === key ? "#ff6b35" : "transparent",
            color: tab === key ? "#fff" : "#888",
            border: `1px solid ${tab === key ? "#ff6b35" : "#2a2a4a"}`,
            borderRadius: i === 0 ? "6px 0 0 6px" : i === tabs.length - 1 ? "0 6px 6px 0" : "0",
            cursor: "pointer", transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ padding: "20px 16px 40px", maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700,
          letterSpacing: 4, margin: "0 0 4px", color: "#ff6b35", textAlign: "center",
        }}>MLB 2026 DASHBOARD</h1>
        <div style={{ fontSize: 11, color: "#666", marginBottom: 20, fontFamily: "'DM Mono', monospace", textAlign: "center" }}>
          DATA: 2026/4/20
        </div>

        {tab === "all" ? (
          <AllTeamsTable />
        ) : (
          <>
            <LeagueAnalysis league={tab} />
            {divisions.map(([key, div], idx) => (
              <DivisionSection key={key} divKey={key} division={div} extremes={extremes}
                scrollRef={(el) => scrollRefs.current[idx] = el}
                onScroll={() => handleScroll(idx)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}