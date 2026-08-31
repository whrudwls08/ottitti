# ottitti 도메인 맵

## 사이트 목적

국내 OTT **해지 방법**, **요금 비교**, **할인·번들**, **자동이체 안내** 참고용 정적 사이트.

## 페이지 유형

### 1. 데이터 구동

| 페이지 | 스크립트 | 데이터 |
|--------|----------|--------|
| `index.html` | `js/main.js` | `KKUNSUB` |
| `cancel.html` | `js/cancel.js` | `KKUNSUB` (+ `storeGuides`) |
| `compare.html` | `js/main.js` | `KKUNSUB` |
| `deals.html` | `js/deals-app.js`, `js/sheet-loader.js` | `KKUNSUB_DEALS` + CSV |
| `ott-jadoiche.html` | `js/jadoiche-app.js` | catalog + 주제 HTML |

### 2. 생성 랜딩 (SEO)

`scripts/generate-cancel-pages.js` → `js/data.js` 기준:

| 산출물 | 설명 |
|--------|------|
| `{slug}.html` | 서비스별 해지 랜딩 |
| `js/ott-slugs.js` | id → html 파일명 |
| `sitemap.xml` | **전체 재작성** (`sitemapUrls` + OTT URL) |

**SLUG 매핑** (`generate-cancel-pages.js` — id ≠ 파일명 주의):

| id | slug 파일 |
|----|-----------|
| coupangplay | coupangplay-haeji.html |
| tving | tving-haeji.html |
| appletv | appletv-haeji.html |
| netflix | netflix-haeji.html |
| wavve | wavve-haeji.html |
| watcha | watcha-haeji.html |
| disney | **disneyplus**-haeji.html |
| youtube | **youtube-premium**-haeji.html |

### 3. 수동 주제형 가이드

생성기 대상 아님 — HTML 직접 작성. sitemap URL은 **`generate-cancel-pages.js`의 `sitemapUrls`** 에 등록:

- `tongsin-ott-haeji.html`
- `appstore-ott-haeji.html`
- `disney-tving-bundle-haeji.html`
- `privacy.html`, `terms.html`

## data.js 스키마

### KKUNSUB.otts[]

```javascript
{
  id, name, short, color, logo, tagline, site,
  plans: [{ name, price, note, screens, quality, ads }],
  strengths: [],
  cancelPaths: [{ path, steps[], official }],
  tips: []
}
```

### KKUNSUB.storeGuides[]

`cancel.js`에서 앱스토어·페이인포 등 **공통 결제처** 안내:

```javascript
{ id, name, steps[], url }
```

## 시트·요금 파이프라인

```
scripts/apps-script-ott-crawl.gs  → Google Sheet (ott_snapshots)
  ↓
.github/workflows/sync-ott-sheet.yml  → data/ott_snapshots.latest.csv
  ↓
js/sheet-loader.js (deals.html)  → KKUNSUB_DEALS.bundles.price 런타임 갱신
```

CSV 컬럼: `collected_at, source_id, item_key, item_name, price_krw, currency, raw_note, source_url, status`

예시: `data/ott_snapshots.example.csv`

## jadoiche catalog

`js/jadoiche-app.js` — OTT별 `href: "{slug}.html"` 하드코딩. **OTT 추가 시 필수 갱신.**

`validate-ottitti.js`가 data.js id ↔ catalog href 일치 검사.

## 제휴

- `js/partners.js` (`window.OTTITTI_AFFILIATE`) — deals.html 파트너스 섹션
- `ads.txt` — AdSense

## 외부·배포

| 항목 | 값 |
|------|-----|
| GA | `G-QW08MY30CQ` |
| AdSense | `ca-pub-6643098025712399` |
| Pages | push main → `deploy-pages.yml` |
| Cloudflare (선택) | `wrangler.toml` |
| BASE | `https://whrudwls08.github.io/ottitti` |

## cancel.html 리다이렉트

`?ott={id}` → `ott-slugs.js` 조회 → 정적 `{slug}.html`로 `location.replace` (SEO canonical).

## 에셋

- `img/otts/*.svg`, `css/styles.css`, `og-image.png`, `favicon.svg`
