---
name: ottitti-manual-pages
description: >-
  ottitti 수동 HTML 주제 가이드 — tongsin, appstore, bundle, privacy, terms,
  ott-jadoiche. sitemapUrls 등록, SEO, nav 패턴.
---

# 수동 주제형 페이지

생성기(`generate-cancel-pages.js`) **대상 아님**. HTML 직접 작성·수정.

## 페이지 목록

| 파일 | 주제 |
|------|------|
| `tongsin-ott-haeji.html` | 통신사 결합 OTT |
| `appstore-ott-haeji.html` | App Store / Google Play |
| `disney-tving-bundle-haeji.html` | 디즈니+·티빙 번들 |
| `ott-jadoiche.html` | 자동이체·결제일 (jadoiche-app.js) |
| `privacy.html`, `terms.html` | 법적 |

## HTML 패턴

기존 `tongsin-ott-haeji.html` 또는 `appstore-ott-haeji.html` 복제:

- head: GA, AdSense, meta, og, canonical (BASE 기준)
- header nav: index / cancel / compare / deals / #cheap
- footer: disclaimer, privacy, terms, email
- `css/styles.css?v=...` — [css-versions.md](../ottitti-harness/references/css-versions.md)

## sitemap 등록

**`scripts/generate-cancel-pages.js`의 `sitemapUrls` 배열**에 추가:

```javascript
{ loc: `${BASE}/new-topic-haeji.html`, lastmod: "YYYY-MM-DD" },
```

그 다음:

```bash
node scripts/generate-cancel-pages.js
node scripts/validate-ottitti.js
```

`sitemap.xml` 직접 편집하지 않음 (다음 generate에 덮어씀).

## jadoiche 연동

주제가 검색 대상이면 `js/jadoiche-app.js` catalog에 `href` 추가.

## OTT data와 관계

- 서비스별 해지 → `data.js` + add-ott 스킬
- **결제 경로·주제** (통신사, 앱스토어, 번들) → 이 스킬

## SEO

수동 페이지도 canonical·og·(필요 시) FAQ ld+json. [ottitti-seo](../ottitti-seo/SKILL.md) B 섹션.

검증: validate-ottitti (core pages in sitemap)
