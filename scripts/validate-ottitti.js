/**
 * ottitti consistency checks — slug, sitemap, jadoiche catalog, files on disk.
 * Usage: node scripts/validate-ottitti.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const BASE = "https://whrudwls08.github.io/ottitti";

function loadKkunsub() {
  global.KKUNSUB = undefined;
  eval(
    fs.readFileSync(path.join(root, "js/data.js"), "utf8").replace("window.KKUNSUB", "global.KKUNSUB")
  );
  return global.KKUNSUB;
}

function loadSlugsFromFile() {
  global.KKUNSUB_SLUGS = undefined;
  eval(
    fs
      .readFileSync(path.join(root, "js/ott-slugs.js"), "utf8")
      .replace("window.KKUNSUB_SLUGS", "global.KKUNSUB_SLUGS")
  );
  return global.KKUNSUB_SLUGS;
}

function loadSlugMapFromGenerator() {
  const src = fs.readFileSync(path.join(root, "scripts/generate-cancel-pages.js"), "utf8");
  const m = src.match(/const SLUG = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error("SLUG block not found in generate-cancel-pages.js");
  return Function("return " + m[1])();
}

function loadJadoicheCatalogHrefs() {
  const src = fs.readFileSync(path.join(root, "js/jadoiche-app.js"), "utf8");
  const hrefs = [];
  const re = /href:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(src))) {
    if (!match[1].startsWith("#") && !match[1].startsWith("http")) {
      hrefs.push(match[1]);
    }
  }
  return hrefs;
}

function loadSitemapLocs() {
  const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml))) locs.push(match[1]);
  return locs;
}

const errors = [];
const warnings = [];

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

const kk = loadKkunsub();
const fileSlugs = loadSlugsFromFile();
const genSlugs = loadSlugMapFromGenerator();
const jadoicheHrefs = loadJadoicheCatalogHrefs();
const sitemapLocs = loadSitemapLocs();

if (!kk.storeGuides || !kk.storeGuides.length) {
  warn("data.js: storeGuides is empty or missing");
}

kk.otts.forEach((ott) => {
  const genSlug = genSlugs[ott.id];
  if (!genSlug) {
    err(`SLUG missing for ott id "${ott.id}" in generate-cancel-pages.js`);
    return;
  }

  const htmlName = genSlug + ".html";
  const htmlPath = path.join(root, htmlName);
  if (!fs.existsSync(htmlPath)) {
    err(`Missing HTML file: ${htmlName} (ott id: ${ott.id})`);
  }

  const slugFile = fileSlugs[ott.id];
  if (!slugFile) {
    err(`ott-slugs.js missing entry for id "${ott.id}"`);
  } else if (slugFile !== htmlName) {
    err(`ott-slugs.js["${ott.id}"] = "${slugFile}" but SLUG expects "${htmlName}"`);
  }

  if (!jadoicheHrefs.includes(htmlName)) {
    err(`jadoiche-app.js catalog missing href "${htmlName}" for ott "${ott.name}" (${ott.id})`);
  }

  const expectedLoc = `${BASE}/${htmlName}`;
  if (!sitemapLocs.includes(expectedLoc)) {
    err(`sitemap.xml missing loc: ${expectedLoc}`);
  }

  if (!ott.cancelPaths || !ott.cancelPaths.length) {
    warn(`data.js: "${ott.id}" has no cancelPaths`);
  }
  if (!ott.intro || ott.intro.length < 40) {
    warn(`data.js: "${ott.id}" intro missing or too short (AdSense content quality)`);
  }
  if (!ott.faqs || ott.faqs.length < 3) {
    warn(`data.js: "${ott.id}" faqs missing or fewer than 3`);
  }
});

Object.keys(genSlugs).forEach((id) => {
  if (!kk.otts.find((o) => o.id === id)) {
    err(`SLUG has id "${id}" but data.js otts has no matching entry`);
  }
});

Object.keys(fileSlugs).forEach((id) => {
  if (!genSlugs[id]) {
    err(`ott-slugs.js has id "${id}" but SLUG map does not`);
  }
});

const corePages = [
  "index.html",
  "about.html",
  "cancel.html",
  "compare.html",
  "deals.html",
  "privacy.html",
  "terms.html",
  "tongsin-ott-haeji.html",
  "appstore-ott-haeji.html",
  "disney-tving-bundle-haeji.html",
  "ott-jadoiche.html",
];

corePages.forEach((file) => {
  const loc = file === "index.html" ? `${BASE}/` : `${BASE}/${file}`;
  if (!sitemapLocs.includes(loc)) {
    err(`sitemap.xml missing core page: ${loc}`);
  }
  if (!fs.existsSync(path.join(root, file))) {
    err(`Missing core HTML: ${file}`);
  }
});

if (!fs.existsSync(path.join(root, "og-image.webp"))) {
  warn("og-image.webp not found in project root (referenced by meta tags)");
}

if (warnings.length) {
  console.log("Warnings:");
  warnings.forEach((w) => console.log("  ⚠", w));
}

if (errors.length) {
  console.error("Errors:");
  errors.forEach((e) => console.error("  ✗", e));
  console.error(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}

console.log(`OK — ${kk.otts.length} OTT(s), ${sitemapLocs.length} sitemap URL(s), ${warnings.length} warning(s)`);
