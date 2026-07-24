var CONFIG = {
  SHEET_NAME: "ott_snapshots",
  SOURCES: [
    {
      id: "disney_bundle",
      url: "https://help.disneyplus.com/ko/article/disneyplus-tving-wavve-bundle",
      type: "disney_bundle_help",
    },
  ],
  OFFICIAL_FALLBACK: {
    disney_bundle: [
      {
        key: "dplus-tving",
        name: "디즈니+ · 티빙 번들",
        price: 18000,
        note: "fallback_official_help_2025-11-17",
      },
      {
        key: "dplus-tving-wavve",
        name: "디즈니+ · 티빙 · 웨이브 번들",
        price: 21500,
        note: "fallback_official_help_2025-11-17",
      },
    ],
  },
};

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  sheet.clear();
  sheet.appendRow([
    "collected_at",
    "source_id",
    "item_key",
    "item_name",
    "price_krw",
    "currency",
    "raw_note",
    "source_url",
    "status",
  ]);
  sheet.setFrozenRows(1);
}

function crawlPublicOtt() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    setupSheet();
    sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  }

  var collectedAt = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd");
  var rows = [];

  CONFIG.SOURCES.forEach(function (src) {
    try {
      var res = UrlFetchApp.fetch(src.url, {
        muteHttpExceptions: true,
        followRedirects: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; OttiHaejiBot/1.1; +https://github.com/; public-help-pages-daily)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      var code = res.getResponseCode();
      var body = res.getContentText();
      if (code !== 200) {
        appendFallback_(rows, collectedAt, src, "http_" + code);
        return;
      }
      var parsed = parseSource(src, body);
      if (!parsed.length) {
        appendFallback_(rows, collectedAt, src, "parse_empty_used_fallback");
        return;
      }
      parsed.forEach(function (p) {
        rows.push([
          collectedAt,
          src.id,
          p.key,
          p.name,
          p.price,
          "KRW",
          p.note || "parsed",
          src.url,
          "ok",
        ]);
      });
    } catch (err) {
      appendFallback_(rows, collectedAt, src, "exception:" + String(err));
    }
  });

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 9).setValues(rows);
  }
}

function appendFallback_(rows, collectedAt, src, reason) {
  var list = CONFIG.OFFICIAL_FALLBACK[src.id] || [];
  if (!list.length) {
    rows.push([collectedAt, src.id, "", "", "", "KRW", reason, src.url, "parse_failed"]);
    return;
  }
  list.forEach(function (p) {
    rows.push([
      collectedAt,
      src.id,
      p.key,
      p.name,
      p.price,
      "KRW",
      p.note + "|" + reason,
      src.url,
      "ok",
    ]);
  });
}

function parseSource(src, html) {
  if (src.type === "disney_bundle_help") return parseDisneyBundle(html);
  return [];
}

function parseDisneyBundle(html) {
  var text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  var out = [];
  var found = {};

  function add(key, name, price, note) {
    if (found[key]) return;
    found[key] = true;
    out.push({ key: key, name: name, price: price, note: note });
  }

  if (/18\s*,\s*000|월\s*18,?000/.test(text) || text.indexOf("18000") !== -1) {
    add("dplus-tving", "디즈니+ · 티빙 번들", 18000, "parsed_from_help");
  }
  if (/21\s*,\s*500|월\s*21,?500/.test(text) || text.indexOf("21500") !== -1) {
    add("dplus-tving-wavve", "디즈니+ · 티빙 · 웨이브 번들", 21500, "parsed_from_help");
  }

  return out;
}

function ping() {
  Logger.log("ok " + new Date().toISOString());
}
