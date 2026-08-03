/* ============================================================
   LARSOON — Landing page behaviour
   Nav · FZOEU banner · kalkulator uštede · FAQ · kontakt forma
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // URL upitnika za ponudu — postaviti kada wizard bude live.
  var WIZARD_URL = "#";
  document.querySelectorAll("[data-wizard]").forEach(function (a) {
    a.href = WIZARD_URL;
  });

  /* ---------- Lucide ikone ---------- */
  function renderIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
  }
  if (window.lucide) renderIcons();
  else window.addEventListener("load", renderIcons);

  /* ---------- Mobilni izbornik ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var mobileNav = document.getElementById("mobileNav");
  function setMenu(open) {
    mobileNav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    renderIcons();
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!mobileNav.classList.contains("is-open"));
  });
  mobileNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---------- Scroll-spy: označi aktivnu sekciju u navigaciji ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a[href^='#']"));
  var spyTargets = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyTargets.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal: koraci hodograma ulaze postupno ---------- */
  var tlSteps = document.querySelectorAll(".tl__step");
  if ("IntersectionObserver" in window && tlSteps.length) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in-view");
          reveal.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    tlSteps.forEach(function (s) { reveal.observe(s); });
  } else {
    tlSteps.forEach(function (s) { s.classList.add("in-view"); });
  }

  /* ---------- Wiki: pretraga i filtar po kategoriji ---------- */
  var wikiGrid = document.getElementById("wikiGrid");
  if (wikiGrid) {
    var wikiCards = Array.prototype.slice.call(wikiGrid.querySelectorAll(".wiki-card"));
    var wikiInput = document.getElementById("wikiSearch");
    var wikiEmpty = document.getElementById("wikiEmpty");
    var wikiFilters = Array.prototype.slice.call(document.querySelectorAll(".wiki-filter"));
    var activeCat = "all";

    function applyWikiFilter() {
      var q = (wikiInput.value || "").trim().toLowerCase();
      var shown = 0;
      wikiCards.forEach(function (card) {
        var okCat = activeCat === "all" || card.dataset.cat === activeCat;
        var okText = !q || card.dataset.search.indexOf(q) !== -1;
        var visible = okCat && okText;
        card.hidden = !visible;
        if (visible) shown++;
      });
      wikiEmpty.hidden = shown > 0;
    }

    wikiInput.addEventListener("input", applyWikiFilter);
    wikiFilters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        wikiFilters.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        activeCat = btn.dataset.cat;
        applyWikiFilter();
      });
    });
  }

  /* ---------- Članak: označi aktivni naslov u sadržaju ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var headings = tocLinks
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    var tocSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-96px 0px -70% 0px" });
    headings.forEach(function (h) { tocSpy.observe(h); });
  }

  /* ---------- FZOEU banner ---------- */
  document.getElementById("bannerClose").addEventListener("click", function () {
    document.getElementById("fzoeuBanner").classList.add("is-closed");
  });

  /* ---------- Kalkulator uštede ---------- */
  var CIJENA_STRUJE = 0.18; // €/kWh
  var OTKUP_VISKA = 0.04;   // €/kWh
  var PRINOS = 1150;        // kWh po kW godišnje

  var state = { mode: "bill", bill: 160, power: 6, batt: true };

  var el = {
    tabPower: document.getElementById("tabPower"),
    tabBill: document.getElementById("tabBill"),
    lead: document.getElementById("calcLead"),
    value: document.getElementById("calcValue"),
    unit: document.getElementById("calcUnit"),
    slider: document.getElementById("calcSlider"),
    sliderLabel: document.getElementById("sliderLabel"),
    sliderFill: document.getElementById("sliderFill"),
    readout: document.getElementById("sliderReadout"),
    readoutUnit: document.getElementById("sliderReadoutUnit"),
    battChip: document.getElementById("battChip"),
    battLabel: document.getElementById("battLabel"),
    newBill: document.getElementById("kpiNewBill"),
    saving: document.getElementById("kpiSaving"),
    payback: document.getElementById("kpiPayback"),
    net: document.getElementById("kpiNet"),
    roi: document.getElementById("kpiRoi")
  };

  function fmt(n, d) {
    d = d || 0;
    return n.toLocaleString("hr-HR", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function calc(kW, battery) {
    var proizvodnja = kW * PRINOS;
    var samop = battery ? 0.70 : 0.30;
    var usteda = proizvodnja * samop * CIJENA_STRUJE +
                 proizvodnja * (1 - samop) * OTKUP_VISKA;
    var cijenaPoKw = 1000 - (250 / 19) * (kW - 1); // 1.000 €/kW @1 kW → 750 €/kW @20 kW
    var investPv = kW * cijenaPoKw;
    var invest = investPv + (battery ? 5000 : 0);
    var poticaj = Math.min(600 * kW, 6000, 0.5 * investPv) +
                  (battery ? Math.min(3500, 5600, 0.5 * 5000) : 0);
    var neto = invest - poticaj;
    var povrat = neto / usteda;
    var roi20 = (usteda * 20 - neto) / neto * 100;
    return { usteda: usteda, neto: neto, povrat: povrat, roi20: roi20 };
  }

  function update() {
    var byBill = state.mode === "bill";
    var kW, racunPrije;
    if (byBill) {
      var potrosnjaGod = (state.bill - 3) * 12 / CIJENA_STRUJE;
      kW = Math.min(20, Math.max(1, Math.round(potrosnjaGod / PRINOS * 10) / 10));
      racunPrije = state.bill;
    } else {
      kW = state.power;
      racunPrije = Math.round(kW * PRINOS * CIJENA_STRUJE / 12);
    }
    var r = calc(kW, state.batt);
    var noviRacun = Math.max(0, racunPrije - r.usteda / 12);

    // Tabovi
    el.tabBill.setAttribute("aria-pressed", byBill ? "true" : "false");
    el.tabPower.setAttribute("aria-pressed", byBill ? "false" : "true");

    // Velika vrijednost + klizač
    el.lead.textContent = byBill ? "Moj mjesečni račun za struju je" : "Snaga moje elektrane bila bi";
    el.value.textContent = byBill ? fmt(state.bill) : fmt(kW, 1);
    el.unit.textContent = byBill ? "€" : "kWp";
    el.sliderLabel.textContent = byBill ? "Mjesečni račun za struju" : "Snaga elektrane";
    el.readout.textContent = byBill ? fmt(state.bill) : fmt(state.power);
    el.readoutUnit.textContent = byBill ? "€" : "kWp";
    el.slider.min = byBill ? 30 : 1;
    el.slider.max = byBill ? 500 : 20;
    el.slider.step = byBill ? 10 : 1;
    el.slider.value = byBill ? state.bill : state.power;
    el.slider.setAttribute("aria-valuetext",
      (byBill ? state.bill + " eura mjesečno" : state.power + " kilovata"));
    var pct = (el.slider.value - el.slider.min) / (el.slider.max - el.slider.min) * 100;
    el.sliderFill.style.width = pct + "%";

    // Baterija
    el.battChip.setAttribute("aria-pressed", state.batt ? "true" : "false");
    el.battLabel.textContent = state.batt ? "S baterijom" : "Bez baterije";

    // KPI
    el.newBill.textContent = fmt(Math.round(noviRacun));
    el.saving.textContent = fmt(Math.round(r.usteda));
    el.payback.textContent = fmt(r.povrat, 1);
    el.net.textContent = fmt(Math.round(r.neto));
    el.roi.textContent = fmt(Math.round(r.roi20));
  }

  el.tabBill.addEventListener("click", function () { state.mode = "bill"; update(); });
  el.tabPower.addEventListener("click", function () { state.mode = "power"; update(); });
  el.slider.addEventListener("input", function () {
    var v = Number(el.slider.value);
    if (state.mode === "bill") state.bill = v; else state.power = v;
    update();
  });
  el.battChip.addEventListener("click", function () { state.batt = !state.batt; update(); });
  update();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    item.querySelector(".faq__q").addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item").forEach(function (it) {
        it.classList.remove("is-open");
        it.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        item.querySelector(".faq__q").setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Kontakt forma ---------- */
  var form = document.getElementById("contactForm");
  var gdpr = document.getElementById("gdprCheck");
  var submitBtn = document.getElementById("formSubmit");
  var hint = document.getElementById("formHint");

  function syncGdpr() {
    submitBtn.disabled = !gdpr.checked;
    hint.style.display = gdpr.checked ? "none" : "";
  }
  gdpr.addEventListener("change", syncGdpr);
  syncGdpr();

  // Upiti se šalju na info@larsoon.com preko FormSubmit servisa.
  // Prvi upit nakon objave stranice zatražit će jednokratnu aktivaciju
  // na info@larsoon.com (FormSubmit šalje potvrdni e-mail).
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/info@larsoon.com";
  var formError = document.getElementById("formError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!gdpr.checked) return;
    if (!form.querySelector("#fName").value.trim() ||
        !form.querySelector("#fEmail").checkValidity()) {
      form.querySelector("#fName").reportValidity();
      form.querySelector("#fEmail").reportValidity();
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = "Šaljem…";
    formError.style.display = "none";
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Upit s larsoon.com — kontakt forma",
        _template: "table",
        ime: form.querySelector("#fName").value.trim(),
        email: form.querySelector("#fEmail").value.trim(),
        poruka: form.querySelector("#fMsg").value.trim()
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.classList.add("is-sent");
      renderIcons();
    }).catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Pošalji poruku";
      formError.style.display = "block";
    });
  });
})();
