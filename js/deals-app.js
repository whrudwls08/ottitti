(function () {
  const D = window.KKUNSUB_DEALS;
  if (!D) return;

  function won(n) {
    return n.toLocaleString("ko-KR") + "원";
  }

  function soloSum(ids) {
    let sum = 0;
    const lines = [];
    ids.forEach((id) => {
      const ref = D.soloRef[id];
      if (!ref) return;
      sum += ref.price;
      lines.push({ id, ...ref });
    });
    return { sum, lines };
  }

  function bestBundle(selected) {
    const set = new Set(selected);
    let best = null;
    D.bundles.forEach((b) => {
      const covers = b.includes.every((id) => set.has(id));
      if (!covers) return;
      const solo = soloSum(b.includes);
      const save = solo.sum - b.price;
      const candidate = { bundle: b, soloSum: solo.sum, save, covered: b.includes };
      if (!best || candidate.save > best.save || (candidate.save === best.save && b.price < best.bundle.price)) {
        best = candidate;
      }
    });
    return best;
  }

  function paintBundles() {
    const el = document.getElementById("deals-bundles");
    if (!el) return;
    el.innerHTML = D.bundles
      .map((b) => {
        const solo = soloSum(b.includes);
        const save = solo.sum - b.price;
        const pct = solo.sum ? Math.round((save / solo.sum) * 100) : 0;
        return `<article class="panel deal-card">
          <div class="tag best">공식 번들</div>
          <h3 style="margin:0.5rem 0 0.25rem;font-family:var(--font-display)">${b.name}</h3>
          <p style="margin:0;color:var(--muted);font-size:0.9rem">${b.planNote}</p>
          <div class="price" style="margin-top:0.75rem">${won(b.price)} <small>/월</small></div>
          <p style="margin:0.5rem 0 0;color:var(--muted)">개별 스탠다드 합산 참고 ${won(solo.sum)} → 약 ${won(save)} (${pct}%) 절감 가능(참고)</p>
          <p style="margin:0.75rem 0 0">
            <a class="btn btn-ghost" href="${b.sourceUrl}" target="_blank" rel="noopener">${b.sourceLabel}에서 확인</a>
          </p>
        </article>`;
      })
      .join("");
  }

  function paintGuides() {
    const el = document.getElementById("deals-guides");
    if (!el) return;
    el.innerHTML = D.pathGuides
      .map(
        (g) => `<article class="panel">
          <h3 style="margin:0 0 0.35rem;font-family:var(--font-display)">${g.title}</h3>
          <p style="margin:0 0 0.5rem">${g.summary}</p>
          <p style="margin:0;color:var(--muted);font-size:0.9rem"><strong style="color:var(--text)">적용</strong> ${g.when}</p>
          <p style="margin:0.35rem 0 0;color:var(--muted);font-size:0.9rem"><strong style="color:var(--text)">다음 단계</strong> ${g.action}</p>
        </article>`
      )
      .join("");
  }

  function paintShopping() {
    const el = document.getElementById("deals-shopping");
    if (!el) return;
    el.innerHTML = D.shoppingSafeTips
      .map(
        (t) => `<article class="panel">
          <h3 style="margin:0 0 0.35rem;font-family:var(--font-display)">${t.title}</h3>
          <p style="margin:0;color:var(--muted)">${t.body}</p>
        </article>`
      )
      .join("");
  }

  function paintResult(selected) {
    const box = document.getElementById("deals-result");
    if (!box) return;
    if (!selected.length) {
      box.classList.add("show");
      box.innerHTML = `<div class="result-card"><p>필요한 서비스를 하나 이상 선택해 주세요.</p></div>`;
      return;
    }

    const solo = soloSum(selected);
    const bundleHit = bestBundle(selected);
    const cards = [];

    cards.push(`<article class="result-card">
      <div class="label">개별 구독 합산(참고)</div>
      <div class="price">${won(solo.sum)} <small>/월</small></div>
      <ul style="margin:0.5rem 0 0;padding-left:1.1rem;color:var(--muted)">
        ${solo.lines.map((l) => `<li>${l.name} ${l.plan} ${won(l.price)}</li>`).join("")}
      </ul>
    </article>`);

    if (bundleHit && bundleHit.save > 0) {
      const extra = selected.filter((id) => !bundleHit.covered.includes(id));
      let extraSum = 0;
      const extraLines = [];
      extra.forEach((id) => {
        const ref = D.soloRef[id];
        if (!ref) return;
        extraSum += ref.price;
        extraLines.push(`${ref.name} ${won(ref.price)}`);
      });
      const total = bundleHit.bundle.price + extraSum;
      const vsSolo = solo.sum - total;
      cards.push(`<article class="result-card">
        <div class="label">우선 후보 · 공식 번들</div>
        <h3 style="margin:0">${bundleHit.bundle.name}</h3>
        <div class="price">${won(bundleHit.bundle.price)} <small>/월 번들</small></div>
        <p style="margin:0;color:var(--muted)">번들 대상 개별 합산 ${won(bundleHit.soloSum)} 대비 약 ${won(bundleHit.save)} 절감(참고)</p>
        ${
          extraLines.length
            ? `<p style="margin:0.5rem 0 0;color:var(--muted)">번들 외 추가: ${extraLines.join(", ")} → 합계 참고 <strong class="price-num">${won(total)}</strong></p>`
            : `<p style="margin:0.5rem 0 0;color:var(--muted)">선택 서비스가 번들로 커버됩니다. 개별 합산 대비 약 <strong class="price-num">${won(vsSolo)}</strong> 유리할 수 있습니다.</p>`
        }
        <div class="cta-row" style="margin-top:0.75rem">
          <a class="btn btn-primary" href="${bundleHit.bundle.sourceUrl}" target="_blank" rel="noopener">공식 번들 안내</a>
        </div>
      </article>`);
    } else {
      cards.push(`<article class="result-card">
        <div class="label">번들</div>
        <p style="margin:0;color:var(--muted)">선택 조합에 해당하는 등록된 공식 번들이 없습니다. 광고형·통신사 결합·연간 경로를 아래 가이드에서 확인하세요.</p>
      </article>`);
    }

    if (selected.length === 1 && selected[0] === "tving") {
      cards.push(`<article class="result-card">
        <div class="label">광고형 경로</div>
        <div class="price">${won(D.soloRef.tving_ad.price)} <small>/월 · 광고형 스탠다드(참고)</small></div>
        <p style="margin:0;color:var(--muted)">광고를 허용하면 스탠다드 ${won(D.soloRef.tving.price)}보다 고정비가 낮을 수 있습니다. 공식에서 가입 가능 여부를 확인하세요.</p>
      </article>`);
    }
    if (selected.length === 1 && selected[0] === "netflix") {
      cards.push(`<article class="result-card">
        <div class="label">광고형 경로</div>
        <div class="price">${won(D.soloRef.netflix_ad.price)} <small>/월 · 광고형 스탠다드(참고)</small></div>
        <p style="margin:0;color:var(--muted)">광고 허용 시 스탠다드 ${won(D.soloRef.netflix.price)} 대비 절감 여지가 있습니다. 공식에서 확인하세요.</p>
      </article>`);
    }

    box.classList.add("show");
    box.innerHTML = cards.join("");
  }

  function initPicker() {
    const form = document.getElementById("deals-picker");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const selected = [...form.querySelectorAll('input[name="svc"]:checked')].map((i) => i.value);
      paintResult(selected);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    paintBundles();
    paintGuides();
    paintShopping();
    initPicker();
  });

  document.addEventListener("ottitti-sheet-loaded", () => {
    paintBundles();
  });
})();
