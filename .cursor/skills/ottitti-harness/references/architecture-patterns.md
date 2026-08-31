# ottitti 아키텍처 패턴

## 1. 파이프라인

**OTT 추가·해지 대규모 변경**

```
data.js → SLUG → jadoiche catalog → generate → validate-ottitti.js
  → (선택) deals.js → QA
```

## 2. 팬아웃/팬인

**전 페이지 SEO** — HTML 그룹별 `Task explore` → 통합 수정

## 3. 전문가 풀

| 상황 | 스킬 |
|------|------|
| OTT data | ottitti-add-ott |
| SEO | ottitti-seo |
| 배포 | ottitti-deploy |
| Sheet·CSV | ottitti-sheet-sync |
| 수동 HTML | ottitti-manual-pages |
| storeGuides | data.js (add-ott Step 6) |
| 파트너스 | partners.js |

## 4. 생성-검증

```bash
node scripts/generate-cancel-pages.js
node scripts/validate-ottitti.js
git diff --stat
```

## 5. 감독자

모호한 요청 → domain-map → 패턴·스킬 선택

## 6. 계층적 위임

```
L1 data.js (+ storeGuides)
L2 generate-cancel-pages (SLUG, sitemapUrls)
L3 jadoiche catalog, ott-slugs
L4 main.js / cancel.js / deals-app.js
L5 수동 HTML
L6 validate + deploy
```

## subagent_type

| type | 용도 |
|------|------|
| explore | 의존성·SEO 스캔 |
| generalPurpose | 편집·리뷰 |
| shell | generate, validate, git |
| ci-investigator | Actions 실패 |
