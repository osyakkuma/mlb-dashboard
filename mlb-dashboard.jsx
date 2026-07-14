import { useState, useEffect, useRef, useCallback } from "react";

const NL = {
  east: {
    name: "ナ・リーグ 東地区",
    teams: [
      { rank:1, name:"ブレーブス", g:95, w:55, l:40, d:0, pct:".579", gb:"-", r:460, ra:368, hr:121, sb:50, avg:".246", era:"3.60", e:42 },
      { rank:2, name:"フィリーズ", g:97, w:54, l:43, d:0, pct:".557", gb:"2", r:424, ra:434, hr:124, sb:74, avg:".236", era:"4.23", e:47 },
      { rank:3, name:"マーリンズ", g:97, w:52, l:45, d:0, pct:".536", gb:"2", r:439, ra:415, hr:98, sb:101, avg:".253", era:"4.02", e:60 },
      { rank:4, name:"ナショナルズ", g:97, w:48, l:49, d:0, pct:".495", gb:"4", r:516, ra:509, hr:138, sb:103, avg:".250", era:"4.75", e:74 },
      { rank:5, name:"メッツ", g:97, w:40, l:57, d:0, pct:".412", gb:"8", r:398, ra:463, hr:112, sb:47, avg:".234", era:"4.27", e:65 },
    ],
    analysis: `【ブレーブス 55勝40敗・地区首位】得失点差+92、想定勝率.601で実績.579はやや下振れ。セール防御率2.20がエース格で投手陣安定(チームERA3.60)。HR121本・得点460と攻撃力も健在。【フィリーズ 54勝43敗・2G差で追走】得失点差-10にもかかわらず54勝は接戦強さの証。HR124本はNL東トップ。【マーリンズ 52勝45敗】盗塁101はMLBトップクラス、打率.253と安打製造機。得失点差+24で想定勝率.529とほぼ実績通り。【ナショナルズ 48勝49敗】得点516・HR138はNL東最多だが失点509・失策74(MLBワースト級)で相殺。打撃戦に持ち込むも守備で自滅する構図。【メッツ 40勝57敗・最下位】得失点差-65、16G差で完全脱落。`,
  },
  central: {
    name: "ナ・リーグ 中地区",
    teams: [
      { rank:1, name:"ブリュワーズ", g:96, w:59, l:37, d:0, pct:".615", gb:"-", r:489, ra:363, hr:89, sb:89, avg:".254", era:"3.48", e:40 },
      { rank:2, name:"カブス", g:96, w:54, l:42, d:0, pct:".563", gb:"5", r:484, ra:432, hr:121, sb:68, avg:".244", era:"4.33", e:37 },
      { rank:3, name:"カージナルス", g:95, w:50, l:45, d:0, pct:".526", gb:"3.5", r:429, ra:423, hr:107, sb:59, avg:".242", era:"4.13", e:46 },
      { rank:4, name:"パイレーツ", g:97, w:50, l:47, d:0, pct:".515", gb:"1", r:516, ra:472, hr:125, sb:88, avg:".263", era:"4.32", e:57 },
      { rank:5, name:"レッズ", g:95, w:43, l:52, d:0, pct:".453", gb:"6", r:395, ra:455, hr:119, sb:65, avg:".230", era:"4.52", e:50 },
    ],
    analysis: `【ブリュワーズ 59勝37敗・NL最高勝率】得失点差+126はMLBトップ、防御率3.48・得点489・盗塁89と投打走すべてが機能。ミジオロウスキー防御率1.62がエース。想定勝率.638で実績.615はまだ伸び代あり。HR89本と長打は少ないがスモールボールで補う。【カブス 54勝42敗】得失点差+52、HR121本と長打力あり。5G差だが実力は本物。【パイレーツ 50勝47敗】得点516・打率.263はNL中地区トップだが防御率4.32・失策57で自滅気味。得失点差+44は想定.536で実績.515と若干の下振れ。【カージナルス 50勝45敗】得失点差+6、中庸な成績。【レッズ 43勝52敗】4月首位から大失速、得失点差-60で想定.420。打率.230の打線不振が深刻。`,
  },
  west: {
    name: "ナ・リーグ 西地区",
    teams: [
      { rank:1, name:"ドジャース", g:97, w:61, l:36, d:0, pct:".629", gb:"-", r:506, ra:357, hr:127, sb:37, avg:".262", era:"3.55", e:35 },
      { rank:2, name:"Dバックス", g:96, w:49, l:47, d:0, pct:".510", gb:"11.5", r:416, ra:429, hr:89, sb:64, avg:".237", era:"4.21", e:35 },
      { rank:3, name:"パドレス", g:96, w:48, l:48, d:0, pct:".500", gb:"1", r:379, ra:422, hr:99, sb:101, avg:".226", era:"4.23", e:35 },
      { rank:4, name:"ジャイアンツ", g:96, w:41, l:55, d:0, pct:".427", gb:"7", r:395, ra:459, hr:106, sb:35, avg:".256", era:"4.46", e:65 },
      { rank:5, name:"ロッキーズ", g:98, w:39, l:59, d:0, pct:".398", gb:"3", r:466, ra:555, hr:110, sb:67, avg:".255", era:"5.44", e:61 },
    ],
    analysis: `【ドジャース 61勝36敗・MLB最多勝】得失点差+149はMLB最大、想定勝率.659で実績.629はまだ下振れ気味という圧倒的な中身。HR127本・得点506・防御率3.55・失策35(MLBベスト)と投打守すべてがリーグトップクラス。2位Dバックスに11.5G差の独走。オオタニの膝の状態が後半戦の鍵。【Dバックス 49勝47敗】得失点差-13で.510は若干の上振れ。Eロドリゲス防御率2.29が支柱。【パドレス 48勝48敗】4月の勢いから大失速、得失点差-43で想定.449。盗塁101は多いが打率.226の打線不振が深刻。【ジャイアンツ 41勝55敗】失策65はNLワースト級、守備崩壊。打率.256はそこそこだがHR106本では得点力不足。【ロッキーズ 39勝59敗】防御率5.44・失点555はMLBワースト。クアーズ込みでも論外級。`,
  },
};

const AL = {
  east: {
    name: "ア・リーグ 東地区",
    teams: [
      { rank:1, name:"レイズ", g:94, w:56, l:38, d:0, pct:".596", gb:"-", r:425, ra:393, hr:94, sb:89, avg:".259", era:"3.80", e:57 },
      { rank:2, name:"ヤンキース", g:96, w:54, l:42, d:0, pct:".563", gb:"3", r:462, ra:371, hr:142, sb:96, avg:".237", era:"3.37", e:57 },
      { rank:3, name:"Rソックス", g:94, w:46, l:48, d:0, pct:".489", gb:"7", r:385, ra:358, hr:85, sb:72, avg:".243", era:"3.59", e:41 },
      { rank:4, name:"オリオールズ", g:97, w:46, l:51, d:0, pct:".474", gb:"1.5", r:447, ra:466, hr:117, sb:48, avg:".239", era:"4.29", e:60 },
      { rank:5, name:"ブルージェイズ", g:96, w:45, l:51, d:0, pct:".469", gb:"0.5", r:392, ra:427, hr:98, sb:41, avg:".244", era:"4.13", e:61 },
    ],
    analysis: `【レイズ 56勝38敗・AL首位】得失点差+32、打率.259はAL東トップ、盗塁89と機動力あり。ディアス打率.322がリーグ首位。防御率3.80は堅実。想定勝率.537で実績.596はかなりの上振れ——接戦強さの蓄積。【ヤンキース 54勝42敗】得失点差+91はAL最大級、HR142本はMLBトップ、盗塁96と破壊力抜群。防御率3.37はAL最高。想定勝率.604で実績.563は大幅な下振れ——実力では首位級。シュリトラー防御率2.05がエース。【Rソックス 46勝48敗】得失点差+27、防御率3.59と投手陣は優秀。S.グレイ防御率2.54が支柱。想定.535で下振れ。【オリオールズ 46勝51敗】HR117本と長打力はあるが失策60で守備崩壊。【ブルージェイズ 45勝51敗】得失点差-35。`,
  },
  central: {
    name: "ア・リーグ 中地区",
    teams: [
      { rank:1, name:"Wソックス", g:95, w:50, l:45, d:0, pct:".526", gb:"-", r:454, ra:419, hr:129, sb:61, avg:".241", era:"4.12", e:48 },
      { rank:2, name:"ガーディアンズ", g:97, w:51, l:46, d:0, pct:".526", gb:"0", r:385, ra:387, hr:93, sb:93, avg:".229", era:"3.71", e:47 },
      { rank:3, name:"ツインズ", g:97, w:48, l:49, d:0, pct:".495", gb:"3", r:471, ra:485, hr:120, sb:56, avg:".248", era:"4.62", e:51 },
      { rank:4, name:"タイガース", g:96, w:44, l:52, d:0, pct:".458", gb:"3.5", r:407, ra:383, hr:115, sb:31, avg:".235", era:"3.65", e:44 },
      { rank:5, name:"ロイヤルズ", g:97, w:38, l:59, d:0, pct:".392", gb:"6.5", r:411, ra:499, hr:97, sb:73, avg:".246", era:"4.95", e:45 },
    ],
    analysis: `【Wソックス/ガーディアンズ 同率首位】勝率.526で並ぶ混戦。Wソックスは得失点差+35・HR129本と長打力で、ガーディアンズは得失点差-2・盗塁93と機動力で対照的。想定勝率ではWソックス.539>ガーディアンズ.497。実力的にはWソックスが上。メシック防御率2.73がガーディアンズの支柱。【タイガース 44勝52敗】4月は想定勝率.593で地区最強だったが大失速。ただし得失点差+24・防御率3.65は地区2位の水準で、想定.530——借金8は大幅な下振れ。盗塁31はMLB最少。【ツインズ 48勝49敗】得失点差-14、得点471と攻撃力はあるが防御率4.62で失点も多い。【ロイヤルズ 38勝59敗】得失点差-88、防御率4.95で最下位定着。`,
  },
  west: {
    name: "ア・リーグ 西地区",
    teams: [
      { rank:1, name:"レンジャーズ", g:96, w:49, l:47, d:0, pct:".510", gb:"-", r:399, ra:414, hr:109, sb:46, avg:".245", era:"4.13", e:44 },
      { rank:2, name:"マリナーズ", g:97, w:48, l:49, d:0, pct:".495", gb:"1.5", r:392, ra:376, hr:115, sb:73, avg:".230", era:"3.61", e:49 },
      { rank:3, name:"アストロズ", g:98, w:47, l:51, d:0, pct:".480", gb:"1.5", r:449, ra:496, hr:133, sb:34, avg:".242", era:"4.81", e:42 },
      { rank:4, name:"アスレチックス", g:96, w:41, l:55, d:0, pct:".427", gb:"5", r:422, ra:528, hr:117, sb:50, avg:".243", era:"5.21", e:39 },
      { rank:5, name:"エンゼルス", g:97, w:38, l:59, d:0, pct:".392", gb:"3.5", r:430, ra:485, hr:110, sb:47, avg:".240", era:"4.65", e:58 },
    ],
    analysis: `【レンジャーズ 49勝47敗・地区首位だが得失点差-15】想定勝率.480で実績.510は上振れ——接戦勝ちで首位を維持しているが中身は弱い。【マリナーズ 48勝49敗】得失点差+16、防御率3.61はAL西トップで想定勝率.522。実力では首位級だが勝ちきれない下振れ体質は開幕から変わらず。【アストロズ 47勝51敗】HR133本はAL最多だが防御率4.81で全て相殺。得失点差-47で想定.451——序盤の崩壊からはやや持ち直したが、AL西全体が低調で浮上できず。【アスレチックス 41勝55敗】得失点差-106はMLBワースト級、防御率5.21は論外。4月の上振れが完全に剥落。【エンゼルス 38勝59敗】得失点差-55、最下位。AL西は全地区が借金または五分で、MLB最弱地区。`,
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
  const nlText = `NLはドジャース(61-36)とブリュワーズ(59-37)の二強。ドジャース得失点差+149はMLB最大、ブリュワーズ+126で投打走すべて充実。ブレーブス(55-40)は4月の独走から少し落ち着いたが依然NL東首位で地区2G差。フィリーズ(54-43)が4月8勝13敗の崩壊から劇的回復、NL東2位に浮上。パドレス(48-48)は4月の上振れが完全に剥落し五分に。NL中地区はブリュワーズが5G差独走、カブス(54-42)が実力通り2位。レッズ(43-52)は4月首位から最下位へ大逆転——想定勝率通りの着地。メッツ(40-57)は前半戦16G差で完全脱落。`;
  const alText = `ALはレイズ(56-38)がAL首位だが得失点差+32で想定.537と上振れ。実力で最強はヤンキース(54-42)——得失点差+91、HR142本MLBトップ、防御率3.37AL最高。想定.604で下振れ気味、後半戦の巻き返しが最も期待されるチーム。AL中地区はWソックスとガーディアンズが同率.526で混戦、4月最強だったタイガースが44-52に大失速(ただし得失点差+24で想定.530、大幅下振れ)。AL西地区はレンジャーズ(.510)が首位だが得失点差-15で中身は弱く、MLB最弱地区。全体として.600超がレイズのみ、NLに比べて戦力格差が小さい。`;
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
          DATA: 2026/7/13 (前半戦終了)
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