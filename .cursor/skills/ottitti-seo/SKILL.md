---
name: ottitti-seo
description: >-
  ottitti SEO, meta, canonical, og, ld+json, sitemap, robots,
  해지 페이지 *-haeji.html, index cancel compare audits.
---

# SEO 감사

**BASE:** `https://whrudwls08.github.io/ottitti`

## 대상

- 생성: `*-haeji.html`
- 핵심: index, cancel, compare, deals
- 수동: tongsin, appstore, disney-tving-bundle, ott-jadoiche, privacy, terms
- `sitemap.xml`, `robots.txt`

## head 필수

lang=ko, title, description, robots, canonical, og 전체, twitter card, theme-color `#07080b`

## 생성 랜딩 ld+json

BreadcrumbList, FAQPage(3), HowTo — `generate-cancel-pages.js` 경유 수정.

## sitemap

- loc = BASE + 경로
- **수정은 `sitemapUrls` + generate** — XML 직접 편집 금지
- validate: `node scripts/validate-ottitti.js`

## CSS/JS cache

[css-versions.md](../ottitti-harness/references/css-versions.md)

## 팬아웃

그룹 A: *-haeji / B: 핵심·주제 / C: sitemap↔파일 → 통합 수정 → validate

검증: [checklists.md](../ottitti-harness/references/checklists.md) B
