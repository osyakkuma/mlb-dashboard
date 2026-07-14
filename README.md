# MLB 2026 Dashboard

個人用MLB順位表ダッシュボード。モバイルSafari向け。

## 構成
- `mlb-dashboard.jsx` — ダッシュボード本体(Claude.ai Artifactとして動作)
- `CLAUDE.md` — プロジェクト運用ルール

## 機能
- 全30チーム・14指標(勝敗・得失点・HR・盗塁・打率・防御率・失策・想定勝率)
- 3タブ: 全体 / ア・リーグ / ナ・リーグ
- カラムソート、地区別分析テキスト、メモ機能
- ピタゴラス勝率による上振れ/下振れ分析

## データソース
- Sportsnavi (Yahoo Japan Sports)
- 更新: 日本時間午前中に前日分反映
