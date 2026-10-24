/* ============================================================
   LARSOON — Landing page behaviour
   Nav · najavna traka · kalkulator uštede · FAQ · kontakt forma
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // URL upitnika za ponudu (Quote wizard) + UTM po sekciji (plan 0.2).
  // data-wizard="<campaign>" na svakom CTA-u; kalkulator dodaje &bill=<€/mj>.
  var WIZARD_URL = "https://ponuda.larsoon.com/wizard";
  function wizardHref(campaign, bill) {
    var u = WIZARD_URL + "?utm_source=larsoon.com&utm_medium=cta&utm_campaign=" + encodeURIComponent(campaign || "other");
    if (bill) u += "&bill=" + encodeURIComponent(bill);
    return u;
  }
  document.querySelectorAll("[data-wizard]").forEach(function (a) {
    a.href = wizardHref(a.getAttribute("data-wizard"));
    a.addEventListener("click", function () {
      if (window.larsoonTrack) larsoonTrack("cta_click", { location: a.getAttribute("data-wizard") || "other" });
    });
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

  /* ---------- Hodogram na mobitelu: opisi koraka na dodir ---------- */
  var tlMq = window.matchMedia("(max-width:580px)");
  var tlHeads = Array.prototype.slice.call(document.querySelectorAll(".tl__head"));

  function tlSyncA11y() {
    tlHeads.forEach(function (h) {
      if (tlMq.matches) {
        h.setAttribute("role", "button");
        h.setAttribute("tabindex", "0");
        h.setAttribute("aria-expanded",
          h.closest(".tl__step").classList.contains("is-open") ? "true" : "false");
      } else {
        h.removeAttribute("role");
        h.removeAttribute("tabindex");
        h.removeAttribute("aria-expanded");
      }
    });
  }
  function tlToggle(h) {
    if (!tlMq.matches) return;
    var step = h.closest(".tl__step");
    step.classList.toggle("is-open");
    h.setAttribute("aria-expanded", step.classList.contains("is-open") ? "true" : "false");
  }
  tlHeads.forEach(function (h) {
    h.addEventListener("click", function () { tlToggle(h); });
    h.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tlToggle(h); }
    });
  });
  if (tlHeads.length) {
    if (tlMq.addEventListener) tlMq.addEventListener("change", tlSyncA11y);
    else if (tlMq.addListener) tlMq.addListener(tlSyncA11y);
    tlSyncA11y();
  }

  /* ---------- Napomena kalkulatora: na širokom ekranu uvijek otvorena ---------- */
  var calcNote = document.getElementById("calcNote");
  var calcNoteMq = window.matchMedia("(min-width:581px)");
  function calcNoteSync() { if (calcNote && calcNoteMq.matches) calcNote.open = true; }
  if (calcNote) {
    if (calcNoteMq.addEventListener) calcNoteMq.addEventListener("change", calcNoteSync);
    else if (calcNoteMq.addListener) calcNoteMq.addListener(calcNoteSync);
    calcNoteSync();
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

  /* ---------- Najavna traka (data-expires = zadnji dan prikaza, lokalno vrijeme) ---------- */
  var banner = document.getElementById("siteBanner");
  if (banner) {
    var exp = banner.getAttribute("data-expires");
    if (exp && new Date() > new Date(exp + "T23:59:59")) banner.classList.add("is-closed");
    document.getElementById("bannerClose").addEventListener("click", function () {
      banner.classList.add("is-closed");
    });
  }

  /* ---------- Kalkulator uštede ----------
     JEDAN MOTOR IZRAČUNA (zadatak 0.9, odluka 24.10.2026.): ovo je 1:1 port
     funkcija iz ponudbenog wizarda (web/src/lib/calc-engine.ts):
       billToAnnualKwh → settleYear → optimizeSystemSize → calcScenario.
     Mjesečni obračun po modelu samoopskrbe (kSO = 1, od 1. 1. 2026.): bijela
     tarifa (VT/NT 60/40, VT-first), prag 3.000 kWh preuzete energije po
     polugodištu (+35 % na energiju), mjesečno umanjenje za višak po PKC-u.
     Dimenzioniranje = 10-godišnji optimum kWp + baterije ZAJEDNO (0/5/10/15/20
     kWh), bez kape na snagu; snaga se zaokružuje na cijele panele (455 Wp).
     Pretpostavke www-a (wizard ih uzima iz unosa): prinos 1.150 kWh/kW,
     limeni krov (bez doplate), bez sjene, trofazni priključak.
     Svaka promjena konstanti mora proći i u Supabase `config` tablici wizarda
     (compare skripta: scripts/compare-calc.mjs u wizard repozitoriju). */
  var PRINOS = 1150;        // kWh po kW godišnje (E_y)
  var PANEL_WP = 455;       // zadani panel u wizardu (catalog.defaultPanel)
  var TAR = { eVT: 0.097189, eNT: 0.047688, nVT: 0.065702, nNT: 0.028689 };
  var OIE = 0.013239, FIXED = 2.965, VAT = 0.13, UPLIFT = 1.35, THRESHOLD = 3000;
  var FIXED_GROSS = FIXED * (1 + VAT); // ≈ 3,35 €/mj fiksno s PDV-om
  var VT_SHARE = 0.60;
  var PROFILE = [3.9, 5.3, 8.6, 10.4, 11.7, 12.1, 12.6, 11.5, 9.1, 6.7, 4.5, 3.6];
  var SEM = [[3, 4, 5, 6, 7, 8], [9, 10, 11, 0, 1, 2]];
  var SC_BASE = 0.30, SC_PER_KWH = 0.04, SC_MAX = 0.85;
  var ESCAL = 0.03;
  var ANNUITY10 = (Math.pow(1 + ESCAL, 10) - 1) / ESCAL;
  var BATT_CANDIDATES = [0, 5, 10, 15, 20];
  var BATT_EUR_PO_KWH = 200; // €/kWh
  var BATT_SIZING_FACTOR = 0.65; // = config.battery_sizing_factor u wizardu
  var SUB_PV = { rate: 0.5, perKw: 600, cap: 6000 };
  var SUB_BATT = { rate: 0.5, perKwh: 350, cap: 5600 };
  var KWP_MODE_UTIL = 0.85;  // kWp način: potrošnja ≈ 85 % proizvodnje (kao wizard)

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
    power: document.getElementById("kpiPower"),
    gross: document.getElementById("kpiGross"),
    net: document.getElementById("kpiNet"),
    saving20: document.getElementById("kpiSaving20"),
    paybackNote: document.getElementById("paybackNote")
  };

  function fmt(n, d) {
    d = d || 0;
    return n.toLocaleString("hr-HR", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  // Larsoon cjenik ključ-u-ruke, 1–20 kWp (= system_pricing u wizardu)
  var CJENIK_KWP = [1399, 2598, 3597, 4396, 4995, 5874, 6713, 7512, 8271, 8990,
                    9724, 10428, 11102, 11746, 12360, 12944, 13498, 14022, 14516, 14980];

  // = interpolateBaseCost(): ispod 1 kW proporcionalno, iznad 20 kW ekstrapolacija
  // zadnjim korakom cjenika, između linearno.
  function cijenaSustava(kW) {
    var n = CJENIK_KWP.length;
    if (kW <= 1) return CJENIK_KWP[0] * kW;
    if (kW >= n) return CJENIK_KWP[n - 1] + (kW - n) * (CJENIK_KWP[n - 1] - CJENIK_KWP[n - 2]);
    var lo = Math.floor(kW), hi = Math.ceil(kW);
    if (lo === hi) return CJENIK_KWP[lo - 1];
    return CJENIK_KWP[lo - 1] + (kW - lo) * (CJENIK_KWP[hi - 1] - CJENIK_KWP[lo - 1]);
  }

  // Prosječna varijabilna cijena kWh s PDV-om (bijela tarifa, 60/40) ≈ 0,160 €/kWh
  function varPrice() {
    var pVT = (TAR.eVT + TAR.nVT + OIE) * (1 + VAT);
    var pNT = (TAR.eNT + TAR.nNT + OIE) * (1 + VAT);
    return VT_SHARE * pVT + (1 - VT_SHARE) * pNT;
  }

  function scRatio(batt) {
    return batt > 0 ? Math.min(SC_MAX, SC_BASE + SC_PER_KWH * batt) : SC_BASE;
  }

  function prodMonthly(kW) {
    return PROFILE.map(function (pct) { return PRINOS * pct / 100 * kW; });
  }

  // = settleYear(): mjesečni obračun (kSO = 1), VT-first pokrivanje potrošnje,
  // prag 3.000 kWh/polugodište (+35 % energija), umanjenje = PKC × min(preuzeto, predano).
  // Vraća { bill: godišnji račun s PV, gross: godišnji račun bez umanjenja } u € s PDV-om.
  function settleYear(consYear, prod, r) {
    var rows = [], m, x;
    for (m = 0; m < 12; m++) {
      var consVT = consYear / 12 * VT_SHARE, consNT = consYear / 12 * (1 - VT_SHARE);
      var p = prod[m];
      var sc = Math.min(r * p, consVT + consNT);
      var scVT = Math.min(sc, consVT);
      var scNT = Math.min(sc - scVT, consNT);
      var impVT = consVT - scVT, impNT = consNT - scNT;
      rows.push({ impVT: impVT, impNT: impNT, imp: impVT + impNT, exp: p - sc, upKwh: 0 });
    }
    SEM.forEach(function (bucket) {
      var cum = 0;
      bucket.forEach(function (i) {
        x = rows[i];
        x.upKwh = x.imp - Math.max(0, Math.min(x.imp, THRESHOLD - cum));
        cum += x.imp;
      });
    });
    var bill = 0, grossTotal = 0;
    for (m = 0; m < 12; m++) {
      x = rows[m];
      var eBase = x.impVT * TAR.eVT + x.impNT * TAR.eNT;
      var upFrac = x.imp > 1e-9 ? x.upKwh / x.imp : 0;
      var energy = eBase * ((1 - upFrac) + upFrac * UPLIFT);
      var mreza = x.impVT * TAR.nVT + x.impNT * TAR.nNT;
      var gross = (energy + mreza + x.imp * OIE + FIXED) * (1 + VAT);
      var pkc = x.imp > 1e-9 ? energy / x.imp : VT_SHARE * TAR.eVT + (1 - VT_SHARE) * TAR.eNT;
      grossTotal += gross;
      bill += gross - pkc * Math.min(x.imp, x.exp);
    }
    return { bill: bill, gross: grossTotal };
  }

  var ZERO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // = billToAnnualKwh(): račun (€/mj, s PDV-om) → godišnja potrošnja (kWh);
  // prva procjena preko prosječne cijene, zatim kalibracija na simulirani račun.
  function billToAnnualKwh(billMonthly) {
    var kwh = Math.max(0, (billMonthly - FIXED_GROSS) / varPrice()) * 12;
    if (kwh <= 0) return 0;
    var target = billMonthly * 12;
    var fixedAnnual = FIXED_GROSS * 12;
    for (var i = 0; i < 5; i++) {
      var bill = settleYear(kwh, ZERO, 0).gross;
      if (Math.abs(bill - target) < 0.5) break;
      var varActual = bill - fixedAnnual, varTarget = target - fixedAnnual;
      if (varActual <= 0 || varTarget <= 0) break;
      kwh = kwh * (varTarget / varActual);
    }
    return kwh;
  }

  function subsidy(kW, investPv, batt, investBat) {
    return Math.min(SUB_PV.rate * investPv, SUB_PV.perKw * kW, SUB_PV.cap) +
           (batt > 0 ? Math.min(SUB_BATT.rate * investBat, SUB_BATT.perKwh * batt, SUB_BATT.cap) : 0);
  }

  // = optimizeSystemSize(): grid pretraga kWp (korak 0,25, bez kape) × baterija
  // {0,5,10,15,20}; cilj = najveća 10-godišnja neto korist (ušteda eskalirana
  // 3 %/god minus subvencionirana investicija). Vraća { kW, batt }.
  function optimizeSystemSize(consYear) {
    var baseline = settleYear(consYear, ZERO, 0).gross;
    var coverageKwp = consYear / PRINOS;
    var best = { kW: coverageKwp, batt: 0, score: -Infinity };
    var sinceImprovement = 0;
    for (var kW = 1; sinceImprovement < 12 && kW <= 200; kW += 0.25) {
      var prod = prodMonthly(kW);
      var pvCost = cijenaSustava(kW);
      var improved = false;
      for (var b = 0; b < BATT_CANDIDATES.length; b++) {
        var batt = BATT_CANDIDATES[b];
        var bill = settleYear(consYear, prod, scRatio(batt)).bill;
        var battCost = batt * BATT_EUR_PO_KWH;
        var score = (baseline - bill) * ANNUITY10 - (pvCost + battCost - subsidy(kW, pvCost, batt, battCost));
        if (score > best.score) { best = { kW: kW, batt: batt, score: score }; improved = true; }
      }
      if (kW >= coverageKwp) sinceImprovement = improved ? 0 : sinceImprovement + 1;
    }
    return best;
  }

  // Zaokruživanje snage na cijele panele (kao wizard: ceil na panelCount × 455 Wp)
  function roundToPanels(kW) {
    return Math.ceil(kW * 1000 / PANEL_WP) * PANEL_WP / 1000;
  }

  // = calcScenario() za jednu konfiguraciju: cijena, poticaj, neto, ušteda, povrat.
  function scenario(kW, batt, consYear) {
    var investPv = cijenaSustava(kW);
    var investBat = batt > 0 ? batt * BATT_EUR_PO_KWH : 0;
    var invest = investPv + investBat;
    var poticaj = subsidy(kW, investPv, batt, investBat);
    var neto = invest - poticaj;
    var s = settleYear(consYear, prodMonthly(kW), scRatio(batt));
    var baseline = settleYear(consYear, ZERO, 0).gross;
    var usteda = baseline - s.bill;
    return {
      kW: kW, batt: batt, bill: s.bill, usteda: usteda, invest: invest, neto: neto,
      povrat: usteda > 0 ? neto / usteda : Infinity
    };
  }

  function update() {
    var byBill = state.mode === "bill";
    var calcCta = document.getElementById("calcCta");
    if (calcCta) calcCta.href = wizardHref("calculator", byBill ? state.bill : null);
    if (update.ran && window.larsoonTrack) {
      clearTimeout(update.t);
      update.t = setTimeout(function () {
        larsoonTrack("calc_interact", { mode: state.mode, value: byBill ? state.bill : state.power, battery: state.batt });
      }, 800);
    }
    update.ran = true;
    // Jedan motor: elektrana se dimenzionira jednom (zajednički optimum kWp +
    // baterija); prekidač "S baterijom" mijenja samo cijenu i uštedu, ne snagu.
    var consYear, recBatt, kW;
    if (byBill) {
      consYear = billToAnnualKwh(state.bill);
      var opt = optimizeSystemSize(consYear);
      kW = roundToPanels(opt.kW);
      // preporučena baterija: iz optimizacije; ako je optimum bez baterije,
      // dnevna potrošnja × BATT_SIZING_FACTOR, zaokruženo na 5 kWh
      recBatt = opt.batt > 0 ? opt.batt : Math.ceil((consYear / 365 * BATT_SIZING_FACTOR) / 5) * 5;
    } else {
      kW = roundToPanels(state.power);
      consYear = PRINOS * kW * KWP_MODE_UTIL;
      recBatt = Math.ceil(kW / 5) * 5;
    }
    recBatt = Math.max(5, Math.min(50, recBatt));
    var r = scenario(kW, state.batt ? recBatt : 0, consYear);
    var godRacun = r.bill;
    var noviRacun = Math.max(0, godRacun / 12);

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
    el.battLabel.textContent = state.batt ? "S baterijom " + recBatt + " kWh" : "Bez baterije";

    // KPI
    el.newBill.textContent = fmt(Math.round(noviRacun));
    el.saving.textContent = fmt(Math.round(r.usteda));
    el.payback.textContent = fmt(r.povrat, 1);
    el.power.textContent = fmt(kW, 1);
    el.gross.textContent = fmt(Math.round(r.invest));
    el.net.textContent = fmt(Math.round(r.neto));
    el.saving20.textContent = fmt(Math.round(r.usteda * 20));
    el.paybackNote.textContent = "* Povrat uz FZOEU poticaj od 50 %. Bez poticaja: ~" +
      fmt(r.invest / r.usteda, 1) + " god (približno dvostruko dulje).";
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

  /* ---------- FAQ na mobitelu: prikaži sva pitanja ---------- */
  var faqMore = document.getElementById("faqMore");
  if (faqMore) {
    faqMore.addEventListener("click", function () {
      document.getElementById("faqList").classList.add("is-expanded");
      faqMore.setAttribute("aria-expanded", "true");
      faqMore.style.display = "none";
    });
  }

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
