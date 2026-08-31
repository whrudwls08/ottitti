# ottitti 검증 체크리스트

## 자동 (Phase 6 필수)

```bash
node scripts/generate-cancel-pages.js   # data.js OTT 변경 후
node scripts/validate-ottitti.js        # 항상
```

`validate-ottitti.js` 검사 항목:
- data.js id ↔ SLUG ↔ ott-slugs.js ↔ HTML 파일
- jadoiche catalog href
- sitemap loc ↔ 핵심·OTT 페이지
- storeGuides 존재

## A. OTT 추가/수정 후

- [ ] `js/data.js` — id, cancelPaths, plans, tips
- [ ] `generate-cancel-pages.js` — `SLUG[id]`
- [ ] `img/otts/{id}.svg`
- [ ] `js/jadoiche-app.js` — catalog 항목 (`q`, `title`, `href`)
- [ ] 생성 + validate 성공
- [ ] (선택) `js/deals.js` soloRef / bundles
- [ ] `lastChecked` 갱신

## B. SEO (페이지당)

- [ ] title `{서비스명} 해지 방법 — 오티티 해지`
- [ ] canonical·og:url = BASE + 경로
- [ ] og:image = BASE/og-image.png
- [ ] ld+json: BreadcrumbList, FAQPage, HowTo (생성 랜딩)
- [ ] h1 1개

## C. 배포 전

- [ ] generate + validate 통과
- [ ] CSS `V` / 수동 페이지 bump ([css-versions.md](css-versions.md))
- [ ] secret 미커밋
- [ ] push → deploy-pages

## D. deals/번들

- [ ] `deals.js` evidence, sourceUrl
- [ ] CSV `item_key` ↔ bundles `id`
- [ ] deals.html sheet-loader 동작

## E. storeGuides

- [ ] `data.js` storeGuides steps·url
- [ ] cancel.html 렌더 확인

## F. sitemap (수동 URL)

새 주제 페이지 추가 시 **`generate-cancel-pages.js`의 `sitemapUrls`** 에 `{ loc, lastmod }` 추가 후 생성기 실행. **sitemap.xml 직접 편집하지 않음.**

## G. AdSense·콘텐츠 품질

- [ ] 각 OTT: `intro`, `findPayment`, `billingNote`, `faqs`(3개+) — data.js
- [ ] 서비스별 FAQ가 동일 템플릿만 반복하지 않음
- [ ] `about.html` — 운영·편집 정책·광고 고지
- [ ] footer / 해지 페이지 → about 링크
- [ ] Article ld+json (생성 랜딩)

AdSense 검토 전 Google 최소 콘텐츠 요건·thin content 가이드 대조.
