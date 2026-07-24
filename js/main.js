(function () {
  const { otts, lastChecked, disclaimer } = window.KKUNSUB;

  function won(n) {
    return n === 0 ? "0원" : n.toLocaleString("ko-KR") + "원";
  }

  function minPlan(ott) {
    return ott.plans.reduce((a, b) => (a.price <= b.price ? a : b));
  }

  function logoHtml(ott, cls) {
    const src = ott.logo || "";
    if (!src) {
      return `<div class="badge ${cls || ""}" style="background:${ott.color}">${ott.short.slice(0, 1)}</div>`;
    }
    return `<img class="ott-logo ${cls || ""}" src="${src}" alt="${ott.name}" width="48" height="48" loading="lazy" />`;
  }

  function renderOttCards(root) {
    if (!root) return;
    root.innerHTML = otts
      .map((ott) => {
        const cheapest = minPlan(ott);
        return `
        <article class="ott-card">
          <div class="top">
            ${logoHtml(ott)}
            <span class="tag">${cheapest.ads ? "광고형 있음" : "광고 없음 중심"}</span>
          </div>
          <div>
            <h3>${ott.name}</h3>
            <p class="meta">${ott.tagline}</p>
          </div>
          <div class="from">월 <span class="price-num">${won(cheapest.price)}</span>~ <small style="color:var(--muted);font-weight:500">${cheapest.name}</small></div>
          <div class="actions">
            <a href="cancel.html?ott=${ott.id}">해지 방법</a>
            <a href="${ott.site}" target="_blank" rel="noopener">공식 사이트</a>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderCompareTable(root) {
    if (!root) return;

    const rows = [];
    otts.forEach((ott) => {
      ott.plans.forEach((plan) => {
        rows.push({ ott, plan });
      });
    });

    const state = { key: "price", dir: "asc" };

    const columns = [
      { key: "price", label: "월요금(참고)", type: "number" },
      { key: "service", label: "서비스", type: "string" },
      { key: "plan", label: "요금제", type: "string" },
      { key: "screens", label: "동시", type: "number" },
      { key: "quality", label: "화질", type: "string" },
      { key: "note", label: "비고", type: "string", sortable: false },
    ];

    function valueOf(row, key) {
      if (key === "price") return row.plan.price;
      if (key === "service") return row.ott.name;
      if (key === "plan") return row.plan.name;
      if (key === "screens") return row.plan.screens ?? -1;
      if (key === "quality") return row.plan.quality || "";
      return row.plan.note || row.ott.strengths[0] || "";
    }

    function sortedRows() {
      const col = columns.find((c) => c.key === state.key);
      const dir = state.dir === "asc" ? 1 : -1;
      return [...rows].sort((a, b) => {
        const av = valueOf(a, state.key);
        const bv = valueOf(b, state.key);
        if (col && col.type === "number") return (av - bv) * dir;
        return String(av).localeCompare(String(bv), "ko") * dir;
      });
    }

    function sortIndicator(key) {
      if (state.key !== key) return "↕";
      return state.dir === "asc" ? "↑" : "↓";
    }

    function paint() {
      const sorted = sortedRows();
      const minPrice = Math.min(...rows.map((r) => r.plan.price));

      root.innerHTML = `
        <div class="compare-toolbar">
          <p>헤더 클릭으로 정렬 · 현재: <strong style="color:var(--text)">${
            columns.find((c) => c.key === state.key)?.label || ""
          }</strong> ${state.dir === "asc" ? "오름차순" : "내림차순"}</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                ${columns
                  .map((col) => {
                    if (col.sortable === false) {
                      return `<th>${col.label}</th>`;
                    }
                    const aria =
                      state.key === col.key
                        ? state.dir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none";
                    return `<th class="sortable" data-sort="${col.key}" tabindex="0" role="columnheader" aria-sort="${aria}">${col.label}<span class="sort-ind" aria-hidden="true">${sortIndicator(
                      col.key
                    )}</span></th>`;
                  })
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${sorted
                .map(({ ott, plan }) => {
                  const best =
                    plan.price === minPrice ? '<span class="tag best">최저</span> ' : "";
                  const ads = plan.ads ? '<span class="tag ads">광고</span> ' : "";
                  return `<tr>
                    <td><span class="price-num">${won(plan.price)}</span></td>
                    <td>${ott.name}</td>
                    <td>${plan.name}</td>
                    <td>${plan.screens ?? "—"}</td>
                    <td>${plan.quality ?? "—"}</td>
                    <td>${best}${ads}${plan.note || ott.strengths[0] || ""}</td>
                  </tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>
        <p class="notice">${disclaimer}<br>데이터 기준일(참고): ${lastChecked}</p>`;

      root.querySelectorAll("th.sortable").forEach((th) => {
        const activate = () => {
          const key = th.dataset.sort;
          if (state.key === key) {
            state.dir = state.dir === "asc" ? "desc" : "asc";
          } else {
            state.key = key;
            state.dir = key === "price" || key === "screens" ? "asc" : "asc";
          }
          paint();
        };
        th.addEventListener("click", activate);
        th.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate();
          }
        });
      });
    }

    paint();
  }

  function recommend(answers) {
    const candidates = [];

    otts.forEach((ott) => {
      ott.plans.forEach((plan) => {
        if (answers.ads === "no" && plan.ads) return;
        if (answers.screens === "4" && (plan.screens || 1) < 4) return;
        if (answers.quality === "4k" && !(plan.quality || "").includes("4K")) return;

        let score = 100000 - plan.price;
        if (answers.need === "kr" && ["tving", "wavve", "coupangplay"].includes(ott.id)) score += 3000;
        if (answers.need === "global" && ["netflix", "disney", "appletv"].includes(ott.id)) score += 3000;
        if (answers.need === "delivery" && ott.id === "coupangplay") score += 8000;
        if (answers.need === "youtube" && ott.id === "youtube") score += 8000;
        if (answers.ads === "ok" && plan.ads) score += 1500;
        if (answers.budget === "min") score += Math.max(0, 20000 - plan.price);

        candidates.push({ ott, plan, score });
      });
    });

    candidates.sort((a, b) => b.score - a.score || a.plan.price - b.plan.price);
    return candidates.slice(0, 3);
  }

  function initQuiz() {
    const form = document.getElementById("cheap-quiz");
    const result = document.getElementById("quiz-result");
    if (!form || !result) return;

    const state = {
      ads: "ok",
      screens: "1",
      quality: "hd",
      need: "kr",
      budget: "min",
    };

    form.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.dataset.group;
        form.querySelectorAll(`.chip[data-group="${group}"]`).forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        state[group] = btn.dataset.value;
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const top = recommend(state);
      if (!top.length) {
        result.classList.add("show");
        result.innerHTML = `<div class="result-card"><p>선택하신 조건에 해당하는 요금제가 없습니다. 조건을 조정한 뒤 다시 조회해 주세요.</p></div>`;
        return;
      }

      result.classList.add("show");
      result.innerHTML = top
        .map((item, idx) => {
          const label = idx === 0 ? "우선 후보" : `후보 ${idx + 1}`;
          return `<article class="result-card">
            <div class="label">${label}</div>
            <div class="result-ott">
              ${logoHtml(item.ott, "ott-logo-sm")}
              <h3>${item.ott.name}</h3>
            </div>
            <div class="price">${won(item.plan.price)} <small>/월 · ${item.plan.name}</small></div>
            <p style="margin:0;color:var(--muted)">${item.ott.tagline}. ${item.plan.note || item.ott.strengths.join(" · ")}</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="cancel.html?ott=${item.ott.id}">해지·결제경로 안내</a>
              <a class="btn btn-ghost" href="${item.ott.site}" target="_blank" rel="noopener">공식 요금 확인</a>
            </div>
          </article>`;
        })
        .join("");
    });
  }

  function setDisclaimers() {
    document.querySelectorAll("[data-disclaimer]").forEach((el) => {
      el.textContent = disclaimer;
    });
    document.querySelectorAll("[data-checked]").forEach((el) => {
      el.textContent = lastChecked;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderOttCards(document.getElementById("ott-grid"));
    renderCompareTable(document.getElementById("compare-table"));
    initQuiz();
    setDisclaimers();
  });
})();
