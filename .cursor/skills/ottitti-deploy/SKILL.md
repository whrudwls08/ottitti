---
name: ottitti-deploy
description: >-
  ottitti GitHub Pages 배포, generate-cancel-pages, validate-ottitti,
  push 전 검증, GitHub Actions 실패 조사.
---

# 배포 검증

## 호스팅

- **Primary:** GitHub Pages — `deploy-pages.yml`, path `.`
- **Optional:** Cloudflare — `wrangler.toml`

## push 전 (필수 순서)

```bash
node scripts/generate-cancel-pages.js   # data.js OTT 변경 시
node scripts/validate-ottitti.js      # 항상
git diff --stat
```

validate 실패 시 push 금지.

## generate-cancel-pages.js

- `root`: `path.join(__dirname, "..")` — 이식 가능
- `BASE`, `SLUG`, `V`, `sitemapUrls` 상수 확인
- **sitemap.xml 전체 재작성** — 수동 XML 편집 무효

## deploy-pages.yml

push main/master → upload-pages-artifact → deploy-pages

## sync-ott-sheet.yml

- cron UTC 15:00
- secrets: `SHEET_CSV_URL` 또는 `SHEET_ID` + `SHEETS_API_KEY`
- 산출: `data/ott_snapshots.latest.csv` auto-commit

상세: [ottitti-sheet-sync](../ottitti-sheet-sync/SKILL.md)

## Actions 실패

| workflow | 원인 |
|----------|------|
| deploy-pages | Pages 권한·environment |
| sync-ott-sheet | secret·empty sheet |

`ci-investigator` subagent 활용.

## 커밋

사용자 요청 시에만.

검증: [checklists.md](../ottitti-harness/references/checklists.md) C
