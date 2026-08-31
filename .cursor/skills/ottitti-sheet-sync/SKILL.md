---
name: ottitti-sheet-sync
description: >-
  ottitti Google Sheet OTT 요금 스냅샷, sync-ott-sheet workflow,
  ott_snapshots CSV, sheet-loader, deals 번들 가격, apps-script crawl.
---

# 시트·요금 동기화

## 데이터 흐름

```
scripts/apps-script-ott-crawl.gs
  → Google Sheet (ott_snapshots)
  → .github/workflows/sync-ott-sheet.yml
  → data/ott_snapshots.latest.csv (repo commit)
  → js/sheet-loader.js (deals.html 로드 시)
  → KKUNSUB_DEALS.bundles[].price 런타임 갱신
```

## CSV 스키마

`data/ott_snapshots.example.csv`:

| 컬럼 | 용도 |
|------|------|
| collected_at | 스냅샷 일자 |
| item_key | `deals.js` bundles `id`와 매칭 |
| price_krw | 번들 가격 |
| source_url | 출처 |
| status | `ok`만 적용 |

## sheet-loader.js

우선순위: `KKUNSUB_SHEET.csvUrl` → `repoCsv` → `localExample`

`applyToDeals`: `item_key === bundle.id` → price·sourceUrl 덮어쓰기

## deals.html

```html
<script src="js/sheet-loader.js"></script>
<script>KKUNSUB_loadSheetSnapshot().then(...)</script>
```

## GitHub secrets

- `SHEET_CSV_URL` (published CSV) **또는**
- `SHEET_ID` + `SHEETS_API_KEY`
- optional `SHEET_RANGE` (default `ott_snapshots!A:I`)

로컬 설정 예: `data/SHEET_INFO.example.txt` (실제 `SHEET_INFO.txt`는 gitignore)

## Apps Script

`scripts/apps-script-ott-crawl.gs` — Sheet에 크롤 결과 append. CONFIG.SOURCES·OFFICIAL_FALLBACK 확인.

## 수동 시드

`deals.js` bundles/soloRef — CSV 없을 때 fallback. `evidence: "official"`·sourceUrl 유지.

## 검증

- CSV row `item_key`가 bundles에 존재
- sync workflow 수동 dispatch 후 CSV diff
- deals 페이지에서 collectedAt 표시

체크리스트: [checklists.md](../ottitti-harness/references/checklists.md) D·F

## data.js와 구분

**OTT plans** → `js/data.js` (정적). **번들 스냅샷** → CSV + sheet-loader (동적).

번들 정책 변경은 deals.js + (선택) Apps Script + CSV 양쪽 검토.
