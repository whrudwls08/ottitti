/**
 * Generate static per-OTT cancel pages + sitemap from data.js
 */
const fs = require("fs");
const path = require("path");

const root = "c:/Users/Jo/Downloads/ottitti";
eval(
  fs.readFileSync(path.join(root, "js/data.js"), "utf8").replace("window.KKUNSUB", "global.KKUNSUB")
);

const BASE = "https://whrudwls08.github.io/ottitti";
const V = "20260727a";

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

function nav(active) {
  const items = [
    ["index.html", "홈"],
    ["pay.html", "결제처 확인"],
    ["cancel.html", "해지 방법"],
    ["compare.html", "요금 비교"],
    ["deals.html", "더 싸게"],
    ["index.html#cheap", "요금 조건"],
  ];
  return items
    .map(([href, label]) => {
      const cur = active === href ? ' aria-current="page"' : "";
      return `<a href="${href}"${cur}>${label}</a>`;
    })
    .join("\n          ");
}

function pageHtml(ott, slug, allLinks) {
  const url = `${BASE}/${slug}.html`;
  const title = `${ott.name} 해지 방법 — 결제처별 안내 | 오티티 해지`;
  const desc = `${ott.name} 해지 방법. 웹·앱스토어·통신사 등 결제처별 절차를 정리했습니다. ${ott.tagline}. 문의: sun84897@gmail.com`;

  const pathsHtml = ott.cancelPaths
    .map((p, i) => {
      const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join("\n            ");
      return `
        <section class="panel path-block" id="path-${i}">
          <h2 style="margin:0 0 0.75rem;font-size:1.15rem;font-family:var(--font-display)">${esc(p.path)}</h2>
          <ol class="steps">
            ${steps}
          </ol>
          <p style="margin:0.9rem 0 0">
            <a class="btn btn-ghost" href="${esc(p.official)}" target="_blank" rel="noopener">공식/관련 안내 열기</a>
          </p>
        </section>`;
    })
    .join("\n");

  const tips = (ott.tips || []).map((t) => `<li>${esc(t)}</li>`).join("\n            ");

  const howToSteps = [];
  ott.cancelPaths.forEach((p) => {
    p.steps.forEach((s) => howToSteps.push({ "@type": "HowToStep", name: s, text: s }));
  });

  const faqMain = [
    {
      q: `${ott.name} 해지는 어디서 하나요?`,
      a: `${ott.name}는 결제처(웹 직접결제·앱스토어·통신사·번들)에 따라 해지 메뉴가 다릅니다. 이 페이지의 결제처별 절차를 확인하세요.`,
    },
    {
      q: `${ott.name} 앱만 지우면 해지되나요?`,
      a: `앱 삭제만으로는 구독·자동결제가 종료되지 않는 경우가 많습니다. 결제처의 구독/멤버십 메뉴에서 해지해야 합니다.`,
    },
    {
      q: `결제처를 모르겠으면?`,
      a: `카드 내역, App Store/Google Play 구독, 통신사 명세서, 또는 오티티 해지 결제처 확인 페이지에서 먼저 확인하세요.`,
    },
  ];

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
    .map(
      (x) =>
        `<a class="btn btn-ghost" href="${x.slug}.html">${esc(x.name)} 해지</a>`
    )
    .join("\n            ");

  const logo = ott.logo
    ? `<img class="ott-logo" src="${esc(ott.logo)}" alt="${esc(ott.name)}" width="48" height="48" />`
    : "";

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
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
    <meta property="og:image" content="${BASE}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${BASE}/og-image.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=${V}" />
    <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
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
          <a href="index.html" style="color:var(--cheap)">홈</a> ·
          <a href="cancel.html" style="color:var(--cheap)">해지 방법</a> ·
          <span>${esc(ott.name)} 해지</span>
        </nav>

        <section class="hero" style="padding-top:1.5rem;padding-bottom:1rem;max-width:42rem">
          <div class="kicker">해지 가이드</div>
          <div class="result-ott" style="margin-bottom:0.5rem">
            ${logo}
            <h1 style="margin:0;font-size:clamp(1.85rem,5vw,2.8rem)">${esc(ott.name)} <em>해지</em> 방법</h1>
          </div>
          <div class="hero-lead">
            <p>${esc(ott.tagline)}</p>
            <p>결제처가 다르면 해지 창구도 다릅니다. 아래 중 본인 결제 경로를 고르세요.</p>
          </div>
          <div class="cta-row">
            <a class="btn btn-ghost" href="pay.html">결제처 먼저 확인</a>
            <a class="btn btn-primary" href="${esc(ott.site)}" target="_blank" rel="noopener">공식 사이트</a>
          </div>
        </section>

        <section style="padding-top:0;display:grid;gap:1rem;max-width:42rem">
          ${pathsHtml}
          <div class="panel">
            <h2 style="margin:0 0 0.5rem;font-size:1.1rem;font-family:var(--font-display)">메모</h2>
            <ul style="margin:0;padding-left:1.1rem;color:var(--muted)">
            ${tips}
            </ul>
          </div>
          <div class="panel">
            <h2 style="margin:0 0 0.75rem;font-size:1.1rem;font-family:var(--font-display)">자주 묻는 질문</h2>
            ${faqMain
              .map(
                (f) => `<div style="margin-bottom:1rem">
              <h3 style="margin:0 0 0.35rem;font-size:1rem">${esc(f.q)}</h3>
              <p style="margin:0;color:var(--muted)">${esc(f.a)}</p>
            </div>`
              )
              .join("")}
          </div>
          <p class="notice">${esc(KKUNSUB.disclaimer)} 참고일: ${esc(KKUNSUB.lastChecked)}</p>
        </section>

        <section>
          <div class="section-head">
            <div>
              <h2>다른 서비스 해지</h2>
              <p>서비스별 고정 안내 페이지입니다.</p>
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
        <p><strong>오티티 해지</strong> · 비공식 참고 가이드. 공식 고객센터 안내가 우선입니다.</p>
        <p class="footer-contact">문의 <a href="mailto:sun84897@gmail.com">sun84897@gmail.com</a></p>
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

const outDir = root;
const sitemapUrls = [
  { loc: `${BASE}/`, lastmod: "2026-07-27" },
  { loc: `${BASE}/pay.html`, lastmod: "2026-07-27" },
  { loc: `${BASE}/cancel.html`, lastmod: "2026-07-27" },
  { loc: `${BASE}/deals.html`, lastmod: "2026-07-27" },
  { loc: `${BASE}/compare.html`, lastmod: "2026-07-27" },
];

KKUNSUB.otts.forEach((ott) => {
  const slug = SLUG[ott.id];
  if (!slug) throw new Error("no slug " + ott.id);
  const html = pageHtml(ott, slug, allLinks);
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, "utf8");
  sitemapUrls.push({ loc: `${BASE}/${slug}.html`, lastmod: "2026-07-27", priority: "0.9" });
  console.log("wrote", slug + ".html");
});

const sm = `<?xml version="1.0" encoding="UTF-8"?>
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
`;
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sm, "utf8");

fs.writeFileSync(
  path.join(outDir, "js/ott-slugs.js"),
  `window.KKUNSUB_SLUGS = ${JSON.stringify(
    Object.fromEntries(allLinks.map((x) => [x.id, x.slug + ".html"])),
    null,
    2
  )};\n`,
  "utf8"
);

console.log("sitemap urls:", sitemapUrls.length);
