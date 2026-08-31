(function () {
  const { otts, storeGuides, disclaimer, lastChecked } = window.KKUNSUB;

  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getFaqs(ott) {
    if (ott.faqs && ott.faqs.length) return ott.faqs;
    return [
      {
        q: `${ott.name} 해지는 어디서 하나요?`,
        a: "결제하신 곳(웹, 앱스토어, 통신사, 번들)에 따라 메뉴가 달라요. 아래 경로를 골라 주세요.",
      },
      {
        q: `${ott.name} 앱만 지우면 해지되나요?`,
        a: "앱만 삭제해서는 구독이 끝나지 않는 경우가 많아요. 구독·멤버십 메뉴에서 해지해 주세요.",
      },
    ];
  }

  function render() {
    const nav = document.getElementById("cancel-nav");
    const main = document.getElementById("cancel-main");
    if (!nav || !main) return;

    const selected = getParam("ott") || otts[0].id;

    nav.innerHTML = otts
      .map((ott) => {
        const logo = ott.logo
          ? `<img class="ott-logo ott-logo-sm" src="${ott.logo}" alt="" width="28" height="28" />`
          : "";
        return `<a href="?ott=${ott.id}" class="${ott.id === selected ? "active" : ""}" ${
          ott.id === selected ? 'aria-current="page"' : ""
        }>${logo}<span>${ott.name}</span></a>`;
      })
      .join("");

    const ott = otts.find((o) => o.id === selected) || otts[0];
    document.title = `${ott.name} 해지 방법 · 오티티 해지`;

    const paths = ott.cancelPaths
      .map(
        (p) => `
      <div class="path-block panel">
        <h4>${esc(p.path)}</h4>
        <ol class="steps">
          ${p.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
        </ol>
        <p style="margin:0.9rem 0 0">
          <a class="btn btn-ghost" href="${esc(p.official)}" target="_blank" rel="noopener">공식/관련 안내 열기</a>
        </p>
      </div>`
      )
      .join("");

    const tips = (ott.tips || []).map((t) => `<li>${esc(t)}</li>`).join("");
    const faqs = getFaqs(ott)
      .map(
        (f) => `<div style="margin-bottom:1rem">
          <h4 style="margin:0 0 0.35rem;font-size:1rem">${esc(f.q)}</h4>
          <p style="margin:0;color:var(--muted)">${esc(f.a)}</p>
        </div>`
      )
      .join("");

    const intro = ott.intro
      ? `<div class="panel editorial"><h4 style="margin:0 0 0.5rem">이 가이드에서 다루는 내용</h4><p style="margin:0;color:var(--muted);line-height:1.65">${esc(ott.intro)}</p></div>`
      : "";

    const findPayment = ott.findPayment
      ? `<div class="panel"><h4 style="margin:0 0 0.5rem">결제처 찾는 방법</h4><p style="margin:0;color:var(--muted);line-height:1.65">${esc(ott.findPayment)}</p></div>`
      : "";

    const billing = ott.billingNote
      ? `<div class="panel"><h4 style="margin:0 0 0.5rem">해지 후 요금·이용 기간</h4><p style="margin:0;color:var(--muted);line-height:1.65">${esc(ott.billingNote)}</p></div>`
      : "";

    const related =
      ott.relatedGuides && ott.relatedGuides.length
        ? `<div class="panel"><h4 style="margin:0 0 0.75rem">관련 안내</h4><div class="cta-row" style="flex-wrap:wrap">${ott.relatedGuides
            .map((g) => `<a class="btn btn-ghost" href="${esc(g.href)}">${esc(g.label)}</a>`)
            .join("")}</div></div>`
        : "";

    const headLogo = ott.logo
      ? `<img class="ott-logo" src="${ott.logo}" alt="${ott.name}" width="48" height="48" />`
      : "";

    main.innerHTML = `
      <article class="cancel-article active">
        <div class="kicker">해지 가이드</div>
        <div class="result-ott" style="margin-bottom:0.5rem">
          ${headLogo}
          <h2 style="margin:0;font-size:clamp(1.8rem,4vw,2.6rem);letter-spacing:-0.03em;font-weight:700">${esc(ott.name)} 해지 안내</h2>
        </div>
        <p style="margin:0 0 1rem;color:var(--muted)">${esc(ott.tagline)}. 결제하신 곳에 따라 해지 화면이 달라요.</p>
        ${intro}
        ${findPayment}
        ${paths}
        ${billing}
        <div class="panel">
          <h4 style="margin:0 0 0.5rem">알아두면 좋은 점</h4>
          <ul style="margin:0;padding-left:1.1rem;color:var(--muted)">${tips}</ul>
        </div>
        <div class="panel">
          <h4 style="margin:0 0 0.75rem">자주 묻는 질문</h4>
          ${faqs}
        </div>
        ${related}
        <div class="panel">
          <h4 style="margin:0 0 0.75rem">스토어·자동이체 공통</h4>
          <div class="ott-grid">
            ${storeGuides
              .map(
                (g) => `<div class="ott-card" style="transform:none">
                  <h3>${esc(g.name)}</h3>
                  <ol class="steps">${g.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
                  <a href="${esc(g.url)}" target="_blank" rel="noopener" style="color:var(--cheap)">자세히</a>
                </div>`
              )
              .join("")}
          </div>
        </div>
        <p class="notice">${esc(disclaimer)}<br>참고일: ${esc(lastChecked)} · <a href="about.html" style="color:var(--cheap)">운영·편집 정책</a></p>
      </article>`;
  }

  document.addEventListener("DOMContentLoaded", render);
})();
