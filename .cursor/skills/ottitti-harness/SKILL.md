---
name: ottitti-harness
description: >-
  오티티 해지(ottitti) Cursor 하네스. OTT 해지·요금·data.js·해지 페이지·sitemap·
  SEO·GitHub Pages·시트 동기화·자동이체·cancelPaths 작업 시 사용.
---

# ottitti Harness — 오케스트레이터

오티티 해지는 **정적 HTML + vanilla JS** OTT 해지·요금 비교 사이트입니다.

## Phase 1: 도메인 분석

| 영역 | 핵심 파일 |
|------|-----------|
| OTT 마스터 | `js/data.js` (`KKUNSUB.otts`, `storeGuides`) |
| 번들·할인 | `js/deals.js` (`KKUNSUB_DEALS`) |
| 시트 → 런타임 요금 | `js/sheet-loader.js`, `data/ott_snapshots.latest.csv` |
| 동적 해지 | `cancel.html` + `js/cancel.js` |
| 홈·비교 | `index.html`, `compare.html` + `js/main.js` |
| 정적 SEO 랜딩 | `*-haeji.html` (생성물) |
| slug | `js/ott-slugs.js` |
| 자동이체 검색 | `js/jadoiche-app.js` (`catalog`) |
| 생성기 | `scripts/generate-cancel-pages.js` |
| 검증 | `scripts/validate-ottitti.js` |
| 제휴 | `js/partners.js` |
| 배포 | `.github/workflows/deploy-pages.yml` |
| 시트 CI | `.github/workflows/sync-ott-sheet.yml` |

**BASE URL:** `https://whrudwls08.github.io/ottitti`

상세: [references/domain-map.md](references/domain-map.md)

## Phase 2: 패턴 선택

[references/architecture-patterns.md](references/architecture-patterns.md)

| 요청 | 패턴 |
|------|------|
| OTT 추가·해지 절차 변경 | **파이프라인** |
| 전 페이지 SEO | **팬아웃/팬인** |
| data.js → HTML 재생성 | **생성-검증** |
| 모호한 요청 | **감독자** |
| 주제 가이드·번들·시트 | **전문가 풀** |
| 대규모 리팩터 | **계층적 위임** |

## Phase 3: 역할 위임

| 역할 | subagent_type | 담당 |
|------|---------------|------|
| Analyst | `explore` | 영향 범위·의존성 |
| Builder | `generalPurpose` | data/HTML/JS/CSS |
| SEO | `explore` | meta, ld+json, sitemap |
| QA | `shell` | `validate-ottitti.js`, diff |
| Deploy | `shell` | generate, git, Actions |

1~2파일 단순 수정은 직접 처리. OTT 추가·배포·SEO 일괄은 위임.

## Phase 4: 하위 스킬

| 스킬 | 트리거 |
|------|--------|
| [ottitti-add-ott](../ottitti-add-ott/SKILL.md) | OTT 추가·cancelPaths·plans |
| [ottitti-seo](../ottitti-seo/SKILL.md) | 메타·스키마·sitemap |
| [ottitti-deploy](../ottitti-deploy/SKILL.md) | push 전·Pages |
| [ottitti-sheet-sync](../ottitti-sheet-sync/SKILL.md) | Sheet·CSV·번들 가격 |
| [ottitti-manual-pages](../ottitti-manual-pages/SKILL.md) | 통신사·앱스토어 등 수동 HTML |

## Phase 5: 통합 규칙

- 컨벤션: `.cursor/rules/ottitti.mdc`
- `data.js` OTT 변경 → `generate-cancel-pages.js` 실행 → `validate-ottitti.js`
- **sitemap.xml은 생성기가 전체 재작성** — `sitemapUrls` 배열 수정 (XML 직접 편집 금지)
- OTT 추가 시 **4곳 동기화**: `SLUG` · `ott-slugs.js`(생성) · `jadoiche catalog` · sitemap(생성)
- CSS: 생성 페이지는 `V` 상수, 수동 페이지는 [references/css-versions.md](references/css-versions.md)

## Phase 6: 검증

```bash
node scripts/generate-cancel-pages.js   # data 변경 후
node scripts/validate-ottitti.js        # 항상
```

체크리스트: [references/checklists.md](references/checklists.md)

## 한계

Harness Evolution(`/harness:evolve`)은 없음. 검토에서 발견한 개선은 스킬·validate 스크립트를 수동 갱신.
