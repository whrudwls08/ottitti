/**
 * Generate static per-OTT cancel pages + sitemap from data.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
eval(
  fs.readFileSync(path.join(root, "js/data.js"), "utf8").replace("window.KKUNSUB", "global.KKUNSUB")
);

const BASE = "https://whrudwls08.github.io/ottitti";
const V = "20260831d";
const LASTMOD = "2026-08-31";
const OG_IMAGE = `${BASE}/og-image.webp`;
const FONT =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap";

const SLUG = {
  coupangplay: "coupangplay-haeji",
  tving: "tving-haeji",
  appletv: "appletv-haeji",
  netflix: "netflix-haeji",
  wavve: "wavve-haeji",
  watcha: "watcha-haeji",
  disney: "disneyplus-haeji",
  youtube: "youtube-premium-haeji",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SEO = {
  netflix: {
    title: "넷플릭스 해지 방법 | 직접결제·앱스토어·통신사",
    description:
      "netflix.com 직접결제, App Store, Google Play, 통신사·네이버 멤버십별 넷플릭스 해지 단계를 정리했습니다. 해지 버튼이 없을 때 확인법 포함.",
  },
  tving: {
    title: "티빙 해지 방법 | 웹·앱스토어·통신사·번들",
    description:
      "티빙 직접결제, 인앱 구독, SKT·KT·LGU+ 결합, 디즈니+ 번들별 해지 경로와 주의사항을 단계별로 안내합니다.",
  },
  disney: {
    title: "디즈니플러스 해지 방법 | 앱스토어·통신사",
    description:
      "디즈니+ 직접결제, App Store·Google Play, 통신사·티빙 번들 결제별 해지 방법을 정리했습니다.",
  },
  wavve: {
    title: "웨이브 해지 방법 | 웹·앱스토어·통신사",
    description: "웨이브 직접결제, 인앱 구독, 통신사 부가서비스별 해지 단계와 해지 후 이용 기간 안내입니다.",
  },
  coupangplay: {
    title: "쿠팡플레이 해지 방법 | 와우 멤버십·앱",
    description: "쿠팡 와우 멤버십·쿠팡플레이 앱·웹 결제별 해지 경로를 정리했습니다.",
  },
  watcha: {
    title: "왓챠 해지 방법 | 웹·앱스토어",
    description: "왓챠 직접결제와 App Store·Google Play 인앱 구독 해지 방법입니다.",
  },
  youtube: {
    title: "유튜브 프리미엄 해지 | 앱스토어·Google",
    description: "유튜브 프리미엄·유튜브 뮤직 포함, Apple·Google 결제별 해지 단계입니다.",
  },
  appletv: {
    title: "Apple TV+ 해지 방법 | 아이폰·맥·앱스토어",
    description: "Apple TV+ App Store 구독 해지와 가족 공유 계정 주의사항을 안내합니다.",
  },
};

const PAYMENT_ROUTES = [
  { label: "앱스토어 OTT 해지", href: "appstore-ott-haeji.html" },
  { label: "통신사 OTT 해지", href: "tongsin-ott-haeji.html" },
  { label: "OTT 자동이체 확인", href: "ott-jadoiche.html" },
];

function nav(active) {
  const items = [
    ["index.html", "홈"],
    ["cancel.html", "해지 방법"],
    ["compare.html", "요금 비교"],
    ["deals.html", "더 싸게"],
  ];
  return items
    .map(([href, label]) => {
      const cur = active === href ? ' aria-current="page"' : "";
      return `<a href="${href}"${cur}>${label}</a>`;
    })
    .join("\n          ");
}

function defaultFaqs(ott) {
  return [
    {
      q: `${ott.name} 해지는 어디서 하나요?`,
      a: `${ott.name} 해지는 결제하신 곳(웹, 앱스토어, 통신사, 번들)에 따라 메뉴가 달라요. 아래에서 본인 결제 경로를 골라 따라가 주세요.`,
    },
    {
      q: `${ott.name} 앱만 지우면 해지되나요?`,
      a: `앱만 삭제해서는 구독이 끝나지 않는 경우가 많아요. 결제하신 곳의 구독·멤버십 메뉴에서 해지해 주세요.`,
    },
    {
      q: `어디서 결제했는지 모르겠어요`,
      a: `카드 이용내역, App Store/Google Play 구독 목록, 통신사 명세서를 먼저 확인해 보시면 결제하신 곳을 찾는 데 도움이 됩니다.`,
    },
  ];
}

function getFaqs(ott) {
  return ott.faqs && ott.faqs.length ? ott.faqs : defaultFaqs(ott);
}

function pageHtml(ott, slug, allLinks) {
  const url = `${BASE}/${slug}.html`;
  const seo = SEO[ott.id] || {};
  const title = seo.title || `${ott.name} 해지 방법 | 웹·앱스토어·통신사`;
  const desc =
    seo.description ||
    (ott.intro && ott.intro.length > 40
      ? ott.intro.slice(0, 120) + (ott.intro.length > 120 ? "…" : "")
      : `${ott.name} 해지를 웹·앱스토어·통신사 결제처별로 안내합니다.`);

  const faqMain = getFaqs(ott);

  const pathsHtml = ott.cancelPaths
    .map((p, i) => {
      const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join("\n            ");
      return `
        <section class="panel path-block" id="path-${i}">
          <h2>${esc(p.path)}</h2>
          <ol class="steps">
            ${steps}
          </ol>
          <p class="panel-actions">
            <a class="btn btn-ghost" href="${esc(p.official)}" target="_blank" rel="noopener">공식 안내 보기</a>
          </p>
        </section>`;
    })
    .join("\n");

  const tips = (ott.tips || []).map((t) => `<li>${esc(t)}</li>`).join("\n            ");

  const howToSteps = [];
  ott.cancelPaths.forEach((p) => {
    p.steps.forEach((s) => howToSteps.push({ "@type": "HowToStep", name: s, text: s }));
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: desc,
    inLanguage: "ko-KR",
    dateModified: KKUNSUB.lastChecked,
    author: { "@type": "Organization", name: "오티티 해지", url: `${BASE}/about.html` },
    publisher: { "@type": "Organization", name: "오티티 해지", url: BASE + "/" },
    mainEntityOfPage: url,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqMain.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${ott.name} 해지 방법`,
    description: desc,
    step: howToSteps.slice(0, 12),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "해지 방법", item: `${BASE}/cancel.html` },
      { "@type": "ListItem", position: 3, name: `${ott.name} 해지`, item: url },
    ],
  };

  const others = allLinks
    .filter((x) => x.slug !== slug)
    .map((x) => `<a class="btn btn-ghost" href="${x.slug}.html">${esc(x.name)} 해지</a>`)
    .join("\n            ");

  const logo = ott.logo
    ? `<img class="ott-logo" src="${esc(ott.logo)}" alt="${esc(ott.name)}" width="48" height="48" loading="lazy" />`
    : "";

  const introBlock = ott.intro
    ? `<div class="panel editorial">
            <h2 class="subhead">이 가이드에서 다루는 내용</h2>
            <p class="prose">${esc(ott.intro)}</p>
          </div>`
    : "";

  const findPaymentBlock = ott.findPayment
    ? `<div class="panel">
            <h2 class="subhead">결제처 찾는 방법</h2>
            <p class="prose">${esc(ott.findPayment)}</p>
          </div>`
    : "";

  const billingBlock = ott.billingNote
    ? `<div class="panel">
            <h2 class="subhead">해지 후 요금·이용 기간</h2>
            <p class="prose">${esc(ott.billingNote)}</p>
          </div>`
    : "";

  const mistakes = (ott.mistakes || []).map((m) => `<li>${esc(m)}</li>`).join("\n              ");

  const mistakesBlock = mistakes
    ? `<div class="panel">
            <h2 class="subhead">자주 하는 실수</h2>
            <ul class="list-plain">
              ${mistakes}
            </ul>
          </div>`
    : "";

  const unofficialNotice = `<p class="notice notice-inline">비공식 참고 사이트입니다. ${esc(ott.name)}·통신사·스토어 공식 고객센터를 대신하지 않으며, 해지·환불 결과를 보장하지 않습니다.</p>`;

  const relatedLinks = [];
  const seenHref = new Set();
  [...PAYMENT_ROUTES, ...(ott.relatedGuides || [])].forEach((g) => {
    if (!seenHref.has(g.href)) {
      seenHref.add(g.href);
      relatedLinks.push(g);
    }
  });

  const relatedBlock = relatedLinks.length
      ? `<div class="panel">
            <h2>결제 경로·관련 안내</h2>
            <div class="cta-row" style="flex-wrap:wrap">
              ${relatedLinks
                .map(
                  (g) =>
                    `<a class="btn btn-ghost" href="${esc(g.href)}">${esc(g.label)}</a>`
                )
                .join("\n              ")}
            </div>
          </div>`
      : "";

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6643098025712399" crossorigin="anonymous"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QW08MY30CQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", "G-QW08MY30CQ");
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="theme-color" content="#07080b" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="ko_KR" />
    <meta property="og:site_name" content="오티티 해지" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${FONT}" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=${V}" />
    <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
    <script type="application/ld+json">${JSON.stringify(articleLd)}</script>
    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>
    <script type="application/ld+json">${JSON.stringify(howToLd)}</script>
  </head>
  <body>
    <header class="site-header">
      <div class="wrap nav">
        <a class="brand" href="index.html">오티티 <span>해지</span></a>
        <nav class="nav-links" aria-label="주요 메뉴">
          ${nav("cancel.html")}
        </nav>
      </div>
    </header>
    <main>
      <div class="wrap">
        <nav class="notice" aria-label="탐색경로" style="margin-top:1.25rem">
          <a href="index.html" class="text-link">홈</a> ·
          <a href="cancel.html" class="text-link">해지 방법</a> ·
          <span>${esc(ott.name)} 해지</span>
        </nav>

        <section class="hero" style="padding-top:1.5rem;padding-bottom:1rem;max-width:42rem">
          <div class="kicker">해지 안내</div>
          <div class="result-ott hero-cancel">
            ${logo}
            <h1>${esc(ott.name)} <em>해지</em> 방법</h1>
          </div>
          <div class="hero-lead">
            <p>${esc(ott.tagline)}</p>
            <p>어디에 결제하셨는지에 따라 해지 화면이 달라요. 아래 중 본인 상황에 맞는 경로를 선택해 주세요.</p>
          </div>
          <div class="cta-row">
            <a class="btn btn-primary" href="${esc(ott.site)}" target="_blank" rel="noopener">${esc(ott.name)} 공식 사이트</a>
          </div>
        </section>

        <section class="content-stack" style="padding-top:0">
          ${unofficialNotice}
          ${introBlock}
          ${findPaymentBlock}
          ${pathsHtml}
          ${billingBlock}
          ${mistakesBlock}
          <div class="panel">
            <h2 class="subhead">알아두면 좋은 점</h2>
            <ul class="list-plain">
            ${tips}
            </ul>
          </div>
          <div class="panel">
            <h2>자주 묻는 질문</h2>
            <div class="faq-list">
            ${faqMain
              .map(
                (f) => `<div class="faq-item">
              <h3>${esc(f.q)}</h3>
              <p class="prose">${esc(f.a)}</p>
            </div>`
              )
              .join("")}
            </div>
          </div>
          ${relatedBlock}
          <p class="notice">${esc(KKUNSUB.disclaimer)} 참고일: ${esc(KKUNSUB.lastChecked)} · <a href="about.html" class="text-link">운영·편집 정책</a></p>
        </section>

        <section>
          <div class="section-head">
            <div>
              <h2>다른 서비스도 보시겠어요?</h2>
              <p>원하시는 서비스를 골라 해지 안내로 이동할 수 있어요.</p>
            </div>
            <a class="btn btn-ghost" href="cancel.html">전체 목록</a>
          </div>
          <div class="cta-row" style="flex-wrap:wrap">
            ${others}
          </div>
        </section>
      </div>
    </main>
    <footer class="footer">
      <div class="wrap footer-inner">
        <p><strong>오티티 해지</strong> · 참고용 안내입니다. 최종 확인은 각사 공식 안내를 우선해 주세요.</p>
        <p class="footer-contact">문의 <a href="mailto:sun84897@gmail.com">sun84897@gmail.com</a> · <a href="about.html">사이트 소개</a> · <a href="privacy.html">개인정보처리방침</a> · <a href="terms.html">이용약관</a></p>
      </div>
    </footer>
  </body>
</html>
`;
}

const allLinks = KKUNSUB.otts.map((o) => ({
  id: o.id,
  name: o.name,
  slug: SLUG[o.id],
}));

const sitemapUrls = [
  { loc: `${BASE}/`, lastmod: LASTMOD },
  { loc: `${BASE}/cancel.html`, lastmod: LASTMOD },
  { loc: `${BASE}/deals.html`, lastmod: LASTMOD },
  { loc: `${BASE}/compare.html`, lastmod: LASTMOD },
  { loc: `${BASE}/about.html`, lastmod: LASTMOD },
  { loc: `${BASE}/privacy.html`, lastmod: LASTMOD },
  { loc: `${BASE}/terms.html`, lastmod: LASTMOD },
  { loc: `${BASE}/tongsin-ott-haeji.html`, lastmod: LASTMOD },
  { loc: `${BASE}/appstore-ott-haeji.html`, lastmod: LASTMOD },
  { loc: `${BASE}/disney-tving-bundle-haeji.html`, lastmod: LASTMOD },
  { loc: `${BASE}/ott-jadoiche.html`, lastmod: LASTMOD },
];

KKUNSUB.otts.forEach((ott) => {
  const slug = SLUG[ott.id];
  if (!slug) throw new Error("no slug " + ott.id);
  fs.writeFileSync(path.join(root, `${slug}.html`), pageHtml(ott, slug, allLinks), "utf8");
  sitemapUrls.push({ loc: `${BASE}/${slug}.html`, lastmod: LASTMOD });
  console.log("wrote", slug + ".html");
});

fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`,
  "utf8"
);

fs.writeFileSync(
  path.join(root, "js/ott-slugs.js"),
  `window.KKUNSUB_SLUGS = ${JSON.stringify(
    Object.fromEntries(allLinks.map((x) => [x.id, x.slug + ".html"])),
    null,
    2
  )};\n`,
  "utf8"
);

console.log("done", sitemapUrls.length);
