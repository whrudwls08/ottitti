(function () {
  const { otts, storeGuides, disclaimer, lastChecked } = window.KKUNSUB;

  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function render() {
    const nav = document.getElementById("cancel-nav");
    const main = document.getElementById("cancel-main");
    if (!nav || !main) return;

    const selected = getParam("ott") || otts[0].id;

    nav.innerHTML = otts
      .map(
        (ott) =>
          `<a href="?ott=${ott.id}" class="${ott.id === selected ? "active" : ""}" ${
            ott.id === selected ? 'aria-current="page"' : ""
          }>${ott.name}</a>`
      )
      .join("");

    const ott = otts.find((o) => o.id === selected) || otts[0];
    document.title = `${ott.name} 해지 방법 · 오띠띠`;

    const paths = ott.cancelPaths
      .map(
        (p) => `
      <div class="path-block panel">
        <h4>${p.path}</h4>
        <ol class="steps">
          ${p.steps.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        <p style="margin:0.9rem 0 0">
          <a class="btn btn-ghost" href="${p.official}" target="_blank" rel="noopener">공식/관련 안내 열기</a>
        </p>
      </div>`
      )
      .join("");

    const tips = ott.tips.map((t) => `<li>${t}</li>`).join("");

    main.innerHTML = `
      <article class="cancel-article active">
        <div class="kicker">해지 가이드</div>
        <h2 style="margin:0;font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.04em">${ott.name} 끊는 법</h2>
        <p style="margin:0;color:var(--muted)">${ott.tagline}. 결제했던 경로가 다르면 해지 창구도 다릅니다. 아래 중 본인 결제 경로를 고르세요.</p>
        ${paths}
        <div class="panel">
          <h4 style="margin:0 0 0.5rem">메모</h4>
          <ul style="margin:0;padding-left:1.1rem;color:var(--muted)">${tips}</ul>
        </div>
        <div class="panel">
          <h4 style="margin:0 0 0.75rem">스토어·자동이체 공통</h4>
          <div class="ott-grid">
            ${storeGuides
              .map(
                (g) => `<div class="ott-card" style="transform:none">
                  <h3>${g.name}</h3>
                  <ol class="steps">${g.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
                  <a href="${g.url}" target="_blank" rel="noopener" style="color:var(--cheap)">자세히</a>
                </div>`
              )
              .join("")}
          </div>
        </div>
        <p class="notice">${disclaimer}<br>참고일: ${lastChecked}</p>
      </article>`;
  }

  document.addEventListener("DOMContentLoaded", render);
})();
