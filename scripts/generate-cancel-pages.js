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
const V = "20260728d";
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

function nav(active) {
  const items = [
    ["index.html", "??],
    ["cancel.html", "?´ì? ë°©ë²•"],
    ["compare.html", "?”ê¸ˆ ë¹„êµ"],
    ["deals.html", "???¸ê²Œ"],
    ["index.html#cheap", "?”ê¸ˆ ì¡°ê±´"],
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
  const title = `${ott.name} ?´ì? ë°©ë²• ???¤í‹°???´ì?`;
  const desc = `${ott.name} ?´ì?ë¥??„ì??œë¦´ê²Œìš”. ?¹Â·ì•±?¤í† ?´Â·í†µ? ì‚¬ ??ê²°ì œ?˜ì‹  ê³³ë³„ ?ˆì°¨ë¥??ˆë‚´?©ë‹ˆ??`;

  const pathsHtml = ott.cancelPaths
    .map((p, i) => {
      const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join("\n            ");
      return `
        <section class="panel path-block" id="path-${i}">
          <h2 style="margin:0 0 0.75rem;font-size:1.15rem">${esc(p.path)}</h2>
          <ol class="steps">
            ${steps}
          </ol>
          <p style="margin:0.9rem 0 0">
            <a class="btn btn-ghost" href="${esc(p.official)}" target="_blank" rel="noopener">ê³µì‹ ?ˆë‚´ ë³´ê¸°</a>
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
      q: `${ott.name} ?´ì????´ë””???˜ë‚˜??`,
      a: `${ott.name} ?´ì???ê²°ì œ?˜ì‹  ê³??? ?±ìŠ¤? ì–´, ?µì‹ ?? ë²ˆë“¤)???°ë¼ ë©”ë‰´ê°€ ?¬ë¼?? ?„ë˜?ì„œ ë³¸ì¸ ê²°ì œ ê²½ë¡œë¥?ê³¨ë¼ ?°ë¼ê°€ ì£¼ì„¸??`,
    },
    {
      q: `${ott.name} ?±ë§Œ ì§€?°ë©´ ?´ì??˜ë‚˜??`,
      a: `?±ë§Œ ?? œ?´ì„œ??êµ¬ë…???ë‚˜ì§€ ?ŠëŠ” ê²½ìš°ê°€ ë§ì•„?? ê²°ì œ?˜ì‹  ê³³ì˜ êµ¬ë…Â·ë©¤ë²„??ë©”ë‰´?ì„œ ?´ì???ì£¼ì„¸??`,
    },
    {
      q: `?´ë””??ê²°ì œ?ˆëŠ”ì§€ ëª¨ë¥´ê² ì–´??,
      a: `ì¹´ë“œ ?´ìš©?´ì—­, App Store/Google Play êµ¬ë… ëª©ë¡, ?µì‹ ??ëª…ì„¸?œë? ë¨¼ì? ?•ì¸??ë³´ì‹œë©?ê²°ì œ?˜ì‹  ê³³ì„ ì°¾ëŠ” ???„ì????©ë‹ˆ??`,
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
    name: `${ott.name} ?´ì? ë°©ë²•`,
    description: desc,
    step: howToSteps.slice(0, 12),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "??, item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "?´ì? ë°©ë²•", item: `${BASE}/cancel.html` },
      { "@type": "ListItem", position: 3, name: `${ott.name} ?´ì?`, item: url },
    ],
  };

  const others = allLinks
    .filter((x) => x.slug !== slug)
    .map((x) => `<a class="btn btn-ghost" href="${x.slug}.html">${esc(x.name)} ?´ì?</a>`)
    .join("\n            ");

  const logo = ott.logo
    ? `<img class="ott-logo" src="${esc(ott.logo)}" alt="${esc(ott.name)}" width="48" height="48" />`
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
    <meta property="og:site_name" content="?¤í‹°???´ì?" />
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
    <link href="${FONT}" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=${V}" />
    <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>
    <script type="application/ld+json">${JSON.stringify(howToLd)}</script>
  </head>
  <body>
    <header class="site-header">
      <div class="wrap nav">
        <a class="brand" href="index.html">?¤í‹°??<span>?´ì?</span></a>
        <nav class="nav-links" aria-label="ì£¼ìš” ë©”ë‰´">
          ${nav("cancel.html")}
        </nav>
      </div>
    </header>
    <main>
      <div class="wrap">
        <nav class="notice" aria-label="?ìƒ‰ê²½ë¡œ" style="margin-top:1.25rem">
          <a href="index.html" style="color:var(--cheap)">??/a> Â·
          <a href="cancel.html" style="color:var(--cheap)">?´ì? ë°©ë²•</a> Â·
          <span>${esc(ott.name)} ?´ì?</span>
        </nav>

        <section class="hero" style="padding-top:1.5rem;padding-bottom:1rem;max-width:42rem">
          <div class="kicker">?´ì? ?ˆë‚´</div>
          <div class="result-ott" style="margin-bottom:0.5rem">
            ${logo}
            <h1 style="margin:0;font-size:clamp(1.85rem,5vw,2.8rem)">${esc(ott.name)} <em>?´ì?</em> ë°©ë²•</h1>
          </div>
          <div class="hero-lead">
            <p>${esc(ott.tagline)}</p>
            <p>?´ë””??ê²°ì œ?˜ì…¨?”ì????°ë¼ ?´ì? ?”ë©´???¬ë¼?? ?„ë˜ ì¤?ë³¸ì¸ ?í™©??ë§ëŠ” ê²½ë¡œë¥?? íƒ??ì£¼ì„¸??</p>
          </div>
          <div class="cta-row">
            <a class="btn btn-primary" href="${esc(ott.site)}" target="_blank" rel="noopener">ê³µì‹ ?¬ì´???´ê¸°</a>
          </div>
        </section>

        <section style="padding-top:0;display:grid;gap:1rem;max-width:42rem">
          ${pathsHtml}
          <div class="panel">
            <h2 style="margin:0 0 0.5rem;font-size:1.1rem">?Œì•„?ë©´ ì¢‹ì? ??/h2>
            <ul style="margin:0;padding-left:1.1rem;color:var(--muted)">
            ${tips}
            </ul>
          </div>
          <div class="panel">
            <h2 style="margin:0 0 0.75rem;font-size:1.1rem">?ì£¼ ë¬»ëŠ” ì§ˆë¬¸</h2>
            ${faqMain
              .map(
                (f) => `<div style="margin-bottom:1rem">
              <h3 style="margin:0 0 0.35rem;font-size:1rem">${esc(f.q)}</h3>
              <p style="margin:0;color:var(--muted)">${esc(f.a)}</p>
            </div>`
              )
              .join("")}
          </div>
          <p class="notice">${esc(KKUNSUB.disclaimer)} ì°¸ê³ ?? ${esc(KKUNSUB.lastChecked)}</p>
        </section>

        <section>
          <div class="section-head">
            <div>
              <h2>?¤ë¥¸ ?œë¹„?¤ë„ ë³´ì‹œê² ì–´??</h2>
              <p>?í•˜?œëŠ” ?œë¹„?¤ë? ê³¨ë¼ ?´ì? ?ˆë‚´ë¡??´ë™?????ˆì–´??</p>
            </div>
            <a class="btn btn-ghost" href="cancel.html">?„ì²´ ëª©ë¡</a>
          </div>
          <div class="cta-row" style="flex-wrap:wrap">
            ${others}
          </div>
        </section>
      </div>
    </main>
    <footer class="footer">
      <div class="wrap footer-inner">
        <p><strong>?¤í‹°???´ì?</strong> Â· ì°¸ê³ ???ˆë‚´?…ë‹ˆ?? ìµœì¢… ?•ì¸?€ ê°ì‚¬ ê³µì‹ ?ˆë‚´ë¥??°ì„ ??ì£¼ì„¸??</p>
        <p class="footer-contact">ë¬¸ì˜ <a href="mailto:sun84897@gmail.com">sun84897@gmail.com</a> Â· <a href="privacy.html">ê°œì¸?•ë³´ì²˜ë¦¬ë°©ì¹¨</a> Â· <a href="terms.html">?´ìš©?½ê?</a></p>
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
  { loc: `${BASE}/`, lastmod: "2026-07-28" },
  { loc: `${BASE}/cancel.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/deals.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/compare.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/privacy.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/terms.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/tongsin-ott-haeji.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/appstore-ott-haeji.html`, lastmod: "2026-07-28" },
  { loc: `${BASE}/disney-tving-bundle-haeji.html`, lastmod: "2026-07-28" },
];

KKUNSUB.otts.forEach((ott) => {
  const slug = SLUG[ott.id];
  if (!slug) throw new Error("no slug " + ott.id);
  fs.writeFileSync(path.join(root, `${slug}.html`), pageHtml(ott, slug, allLinks), "utf8");
  sitemapUrls.push({ loc: `${BASE}/${slug}.html`, lastmod: "2026-07-28" });
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
