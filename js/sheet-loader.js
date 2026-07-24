window.KKUNSUB_SHEET = {
  csvUrl: "",
  repoCsv: "data/ott_snapshots.latest.csv",
  localExample: "data/ott_snapshots.example.csv",
};

(function () {
  function parseCsv(text) {
    var lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    var headers = lines[0].split(",").map(function (h) {
      return h.trim();
    });
    return lines.slice(1).map(function (line) {
      var cols = line.split(",");
      var row = {};
      headers.forEach(function (h, i) {
        row[h] = (cols[i] || "").trim();
      });
      return row;
    });
  }

  function latestOkRows(rows) {
    var ok = rows.filter(function (r) {
      return r.status === "ok" && r.price_krw;
    });
    if (!ok.length) return { date: null, rows: [] };
    var dates = ok
      .map(function (r) {
        return r.collected_at;
      })
      .sort();
    var latest = dates[dates.length - 1];
    return {
      date: latest,
      rows: ok.filter(function (r) {
        return r.collected_at === latest;
      }),
    };
  }

  function applyToDeals(latest, mode) {
    if (!window.KKUNSUB_DEALS || !latest.date) return;
    window.KKUNSUB_DEALS.collectedAt = latest.date;
    window.KKUNSUB_DEALS.collectionMode = mode || "csv";

    latest.rows.forEach(function (r) {
      var price = parseInt(r.price_krw, 10);
      if (!price) return;
      var b = (window.KKUNSUB_DEALS.bundles || []).find(function (x) {
        return x.id === r.item_key;
      });
      if (b) {
        b.price = price;
        b.sourceUrl = r.source_url || b.sourceUrl;
      }
    });

    var el = document.getElementById("deals-freshness");
    if (!el) return;
    var collected = new Date(latest.date + "T00:00:00+09:00");
    var now = new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var c0 = new Date(collected.getFullYear(), collected.getMonth(), collected.getDate());
    var diff = Math.round((start - c0) / 86400000);
    var ago = diff <= 0 ? "오늘 기준" : diff === 1 ? "1일 전 수집" : diff + "일 전 수집";
    el.innerHTML =
      "<strong>데이터 기준일 " +
      latest.date +
      "</strong> · " +
      ago +
      " · 수집방식: " +
      (mode || "csv");
  }

  function tryFetch(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("csv_http_" + r.status);
      return r.text();
    });
  }

  function load() {
    var conf = window.KKUNSUB_SHEET || {};
    var chain = [];
    if (conf.csvUrl) chain.push({ url: conf.csvUrl, mode: "google_sheet_published_csv" });
    if (conf.repoCsv) chain.push({ url: conf.repoCsv, mode: "repo_csv_from_actions" });
    if (conf.localExample) chain.push({ url: conf.localExample, mode: "local_example_csv" });

    function next(i) {
      if (i >= chain.length) return Promise.resolve();
      return tryFetch(chain[i].url)
        .then(function (text) {
          applyToDeals(latestOkRows(parseCsv(text)), chain[i].mode);
        })
        .catch(function () {
          return next(i + 1);
        });
    }
    return next(0);
  }

  window.KKUNSUB_loadSheetSnapshot = load;
})();
