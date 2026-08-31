# CSS 캐시 버스트 정책

## 형식

`css/styles.css?v=YYYYMMDD` + 선택적 접미사 (`a`, `b`, `c`, `d`)

같은 날 여러 번 bump 시 접미사 증가.

## 생성 페이지

`scripts/generate-cancel-pages.js` 상수 **`V`** — `*-haeji.html` 전체에 적용.

CSS 변경 후:
1. `V` bump
2. `node scripts/generate-cancel-pages.js`

## 수동 페이지 (개별 bump)

| 파일 | 현재 예시 |
|------|-----------|
| `index.html` | `20260730c` |
| `compare.html` | `20260730d` |
| `cancel.html` | `20260728d` |
| `deals.html` | `20260728d` |
| `ott-jadoiche.html` | `20260730b` |
| `tongsin-ott-haeji.html` 등 주제 가이드 | `20260728d` |
| `privacy.html`, `terms.html` | `20260728d` |

**styles.css 변경 시** 위 수동 파일 + `V` + 생성기 재실행.

## JS 캐시

일부 HTML: `js/ott-slugs.js?v=...`, `js/jadoiche-app.js?v=...` — 해당 JS 변경 시 bump.

## SEO 스킬 연계

전체 CSS bump 후 `ottitti-seo`로 link href 일관성 spot-check.
