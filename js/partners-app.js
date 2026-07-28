(function () {
  var conf = window.OTTITTI_AFFILIATE;
  var root = document.getElementById("affiliate-partners");
  if (!conf || !root) return;

  var cards = (conf.items || [])
    .map(function (item) {
      return (
        '<article class="panel">' +
        "<h3 style=\"margin:0 0 0.35rem\">" +
        item.title +
        "</h3>" +
        '<p style="margin:0 0 0.75rem;color:var(--muted)">' +
        item.blurb +
        "</p>" +
        '<a class="btn btn-ghost" href="' +
        item.href +
        '" target="_blank" rel="noopener sponsored nofollow">' +
        item.cta +
        "</a>" +
        "</article>"
      );
    })
    .join("");

  root.innerHTML =
    '<div class="section-head"><div>' +
    "<h2>쇼핑 · 멤버십 참고</h2>" +
    "<p>" +
    (conf.disclosure || "") +
    "</p>" +
    "</div></div>" +
    '<div class="ott-grid">' +
    cards +
    "</div>";
})();
