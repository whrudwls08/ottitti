(function () {
  var form = document.getElementById("jadoiche-search");
  var input = document.getElementById("jadoiche-q");
  var out = document.getElementById("jadoiche-search-result");
  var topics = Array.prototype.slice.call(document.querySelectorAll(".topic"));
  var services = Array.prototype.slice.call(document.querySelectorAll("#service-links a"));

  var catalog = [
    { q: ["넷플릭스", "netflix"], title: "넷플릭스 자동결제·해지", href: "netflix-haeji.html", blurb: "멤버십에서 다음 결제일·해지" },
    { q: ["티빙", "tving"], title: "티빙 자동결제·해지", href: "tving-haeji.html", blurb: "이용권/구독 관리" },
    { q: ["디즈니", "disney"], title: "디즈니+ 자동결제·해지", href: "disneyplus-haeji.html", blurb: "멤버십 취소·파트너 결제" },
    { q: ["웨이브", "wavve"], title: "웨이브 자동결제·해지", href: "wavve-haeji.html", blurb: "이용권·자동결제 해지" },
    { q: ["쿠팡", "쿠플", "coupang"], title: "쿠팡플레이 해지", href: "coupangplay-haeji.html", blurb: "와우·패스와 함께 확인" },
    { q: ["왓챠", "watcha"], title: "왓챠 해지", href: "watcha-haeji.html", blurb: "구독·결제 경로 확인" },
    { q: ["유튜브", "youtube"], title: "유튜브 프리미엄 해지", href: "youtube-premium-haeji.html", blurb: "구독·가족·스토어 결제" },
    { q: ["애플", "apple"], title: "Apple TV+ 해지", href: "appletv-haeji.html", blurb: "Apple 구독에서 취소" },
    { q: ["페이인포", "payinfo", "자동납부"], title: "페이인포 조회", href: "https://www.payinfo.or.kr/", blurb: "계좌·카드 자동납부", ext: true },
    { q: ["앱스토어", "인앱", "구글플레이", "플레이"], title: "앱스토어 OTT 해지", href: "appstore-ott-haeji.html", blurb: "다음 결제일·구독 취소" },
    { q: ["통신사", "skt", "kt", "lgu"], title: "통신사 OTT 해지", href: "tongsin-ott-haeji.html", blurb: "부가서비스 청구 주기" },
    { q: ["번들"], title: "디즈니+·티빙 번들", href: "disney-tving-bundle-haeji.html", blurb: "번들 결제처에서 해지" },
    { q: ["결제일", "갱신일", "다음", "출금", "날짜", "변경"], title: "결제일·갱신일 확인", href: "#jadoiche-topics", blurb: "구독 화면·명세서에서 확인" },
    { q: ["자동이체", "자동결제"], title: "자동이체 종류·해지 경로", href: "#jadoiche-topics", blurb: "이 페이지 안내" },
  ];

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function matchKeys(keys, q) {
    return keys.some(function (k) {
      var nk = norm(k);
      return q.indexOf(nk) !== -1 || nk.indexOf(q) !== -1;
    });
  }

  function resetView() {
    topics.forEach(function (el) {
      el.hidden = false;
    });
    services.forEach(function (a) {
      a.hidden = false;
    });
    out.innerHTML = "";
    out.classList.remove("show");
  }

  function runSearch(raw) {
    var q = norm(raw);
    if (!q) {
      resetView();
      return;
    }

    var hits = catalog.filter(function (item) {
      return matchKeys(item.q, q);
    });

    topics.forEach(function (el) {
      var blob = norm((el.getAttribute("data-keys") || "") + " " + el.textContent);
      el.hidden = blob.indexOf(q) === -1;
    });

    services.forEach(function (a) {
      var name = norm(a.getAttribute("data-name") || a.textContent);
      a.hidden = !(name.indexOf(q) !== -1 || q.indexOf(name) !== -1);
    });

    if (!hits.length && topics.every(function (t) { return t.hidden; })) {
      resetView();
      out.classList.add("show");
      out.innerHTML =
        '<div class="result-card"><p>검색 결과가 없어요. 서비스명(넷플릭스)이나 “결제일”, “페이인포”로 다시 검색해 보세요.</p></div>';
      return;
    }

    out.classList.add("show");
    out.innerHTML =
      '<div class="result-card"><p class="label">검색 결과</p><ul class="search-hit-list">' +
      (hits.length
        ? hits
            .map(function (h) {
              var rel = h.ext ? ' target="_blank" rel="noopener"' : "";
              return (
                "<li><a href=\"" +
                h.href +
                "\"" +
                rel +
                ">" +
                h.title +
                "</a><span>" +
                h.blurb +
                "</span></li>"
              );
            })
            .join("")
        : "<li><span>아래 관련 안내를 확인해 주세요.</span></li>") +
      "</ul></div>";
  }

  if (form && input) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      runSearch(input.value);
    });
    input.addEventListener("input", function () {
      if (!input.value.trim()) resetView();
    });
    var params = new URLSearchParams(location.search);
    if (params.get("q")) {
      input.value = params.get("q");
      runSearch(input.value);
    }
  }
})();
