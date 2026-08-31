---
name: ottitti-add-ott
description: >-
  ottitti OTT 서비스 추가·해지·요금 data.js 갱신. cancelPaths, SLUG,
  generate-cancel-pages, jadoiche catalog, validate-ottitti 파이프라인.
---

# OTT 추가·갱신 (파이프라인)

## 사전

- [domain-map.md](../ottitti-harness/references/domain-map.md)
- 기존 OTT 1건 템플릿
- 공식 해지 FAQ URL (추측 금지)

## Step 1: data.js

`KKUNSUB.otts`에 추가/수정. `lastChecked` 갱신.

필수 editorial 필드 (AdSense·콘텐츠 품질):
- `intro` — 서비스별 고유 서두 (40자+)
- `findPayment` — 결제처 찾는 방법
- `billingNote` — 해지 후 요금·이용 기간
- `faqs` — 서비스별 FAQ 3개+ (템플릿 복붙 금지)
- `relatedGuides` — (선택) 주제 가이드 링크

## Step 2: 로고

`img/otts/{id}.svg`

## Step 3: SLUG

`scripts/generate-cancel-pages.js`:

```javascript
const SLUG = {
  newid: "newid-haeji",  // id와 다를 수 있음
};
```

## Step 4: jadoiche catalog

`js/jadoiche-app.js` — OTT 서비스 `catalog` 배열에 추가:

```javascript
{ q: ["검색키", "영문id"], title: "표시명 자동결제·해지", href: "newid-haeji.html", blurb: "한 줄" },
```

`href`는 SLUG + `.html`과 **정확히 일치**.

## Step 5: (선택) deals.js

`soloRef` / `bundles` — 비교·번들 대상일 때.

## Step 6: (선택) storeGuides

앱스토어·페이인포 **공통** 경로만. OTT 전용은 `cancelPaths`.

## Step 7: 생성·검증

```bash
node scripts/generate-cancel-pages.js
node scripts/validate-ottitti.js
```

생성: `{slug}.html`, `ott-slugs.js`, `sitemap.xml`

새 **주제형** 페이지는 이 스킬이 아니라 [ottitti-manual-pages](../ottitti-manual-pages/SKILL.md).

## Step 8: CSS (styles.css 변경 시)

`V` bump + [css-versions.md](../ottitti-harness/references/css-versions.md) 수동 페이지.

## 동기화 4곳

| # | 위치 |
|---|------|
| 1 | `data.js` id |
| 2 | `SLUG[id]` |
| 3 | `jadoiche-app.js` catalog href |
| 4 | 생성기 → ott-slugs + sitemap (자동) |

## 금지

- data.js만 수정하고 generate/validate 생략
- sitemap.xml 직접 편집
- jadoiche catalog 누락

검증: [checklists.md](../ottitti-harness/references/checklists.md) A·B
