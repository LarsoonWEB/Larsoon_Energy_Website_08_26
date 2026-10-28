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
  function wizardHref(campaign, bill, kwp) {
    var u = WIZARD_URL + "?utm_source=larsoon.com&utm_medium=cta&utm_campaign=" + encodeURIComponent(campaign || "other");
    if (bill) u += "&bill=" + encodeURIComponent(bill);
    if (kwp) u += "&kwp=" + encodeURIComponent(kwp); // 2.8 · prefill snage iz cjenovnih kartica
    return u;
  }
  document.querySelectorAll("[data-wizard]").forEach(function (a) {
    a.href = wizardHref(a.getAttribute("data-wizard"), null, a.getAttribute("data-wizard-kwp"));
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
    }, { threshold: 0, rootMargin: "0px 0px 20% 0px" }); // 2.9 · korak se pojavljuje prije ulaska u viewport (bez praznih sekcija pri scrollu)
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
     2.13: potrošnja po mjesecima = HEP ODS profil kućanstva (K0); udio vlastite
     potrošnje po mjesecu iz kalibrirane tablice (PVGIS satna simulacija, HTW Berlin
     sidra) — ovisi o omjeru proizvodnja/potrošnja i baterija/dnevna potrošnja.
     Dimenzioniranje = 10-godišnji optimum kWp + baterije ZAJEDNO (0/5/10/15/20
     kWh), bez kape na snagu; panel se bira iz kataloga (450/455/460/470 W) tako da
     n × Wp bude najbliže ciljanoj snazi (1.11, odluka 24.10.2026.).
     Pretpostavke www-a (wizard ih uzima iz unosa): prinos 1.150 kWh/kW,
     limeni krov (bez doplate), bez sjene, trofazni priključak.
     Svaka promjena konstanti mora proći i u Supabase `config` tablici wizarda
     (compare skripta: npm run compare:www u wizard repozitoriju). */
  var PRINOS = 1150;        // kWh po kW godišnje (E_y)
  var PANEL_OPTIONS_WP = [450, 455, 460, 470]; // = panel_catalog u wizardu (1.11)
  var TAR = { eVT: 0.097189, eNT: 0.047688, nVT: 0.065702, nNT: 0.028689 };
  var OIE = 0.013239, FIXED = 2.965, VAT = 0.13, UPLIFT = 1.35, THRESHOLD = 3000;
  var FIXED_GROSS = FIXED * (1 + VAT); // ≈ 3,35 €/mj fiksno s PDV-om
  var VT_SHARE = 0.60;
  var PROFILE = [3.9, 5.3, 8.6, 10.4, 11.7, 12.1, 12.6, 11.5, 9.1, 6.7, 4.5, 3.6];
  var SEM = [[3, 4, 5, 6, 7, 8], [9, 10, 11, 0, 1, 2]];
  // 2.13 · udio vlastite potrošnje r po mjesecu iz kalibrirane tablice (= sc-tables.ts K):
  // redovi = baterija [kWh] / prosječna dnevna potrošnja mjeseca, stupci = proizvodnja/potrošnja mjeseca.
  var SC_RATIO = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7, 10];
  var SC_BATT = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  var SC_K = [[0.961,0.807,0.664,0.548,0.516,0.487,0.359,0.315,0.264,0.228,0.181,0.154,0.131,0.101,0.084,0.063,0.052],[1,0.989,0.941,0.853,0.816,0.774,0.594,0.517,0.432,0.37,0.29,0.243,0.206,0.157,0.129,0.095,0.077],[1,0.999,0.991,0.961,0.928,0.889,0.756,0.677,0.569,0.487,0.379,0.314,0.264,0.198,0.16,0.115,0.089],[1,1,0.999,0.992,0.977,0.953,0.86,0.774,0.651,0.553,0.424,0.345,0.288,0.214,0.17,0.119,0.091],[1,1,1,0.999,0.993,0.981,0.916,0.838,0.705,0.59,0.444,0.356,0.294,0.216,0.17,0.12,0.091],[1,1,1,1,0.999,0.989,0.935,0.837,0.71,0.601,0.454,0.364,0.302,0.222,0.173,0.123,0.092],[1,1,1,1,1,0.994,0.956,0.869,0.745,0.621,0.461,0.366,0.3,0.219,0.172,0.124,0.091],[1,1,1,1,1,0.998,0.973,0.897,0.78,0.643,0.471,0.369,0.301,0.22,0.172,0.128,0.104]];
  var SC_LOG_RATIO = SC_RATIO.map(function (r) { return Math.log(r); });
  // 2.13 · mjesečni profil kućanstva (HEP ODS NKO K0 2026) i broj dana (= HOUSEHOLD_MONTHLY_WEIGHTS)
  var HH_W = [0.1140, 0.0935, 0.0875, 0.0693, 0.0710, 0.0706, 0.0750, 0.0759, 0.0709, 0.0709, 0.0866, 0.1147];
  var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var ESCAL = 0.03;
  var ANNUITY10 = (Math.pow(1 + ESCAL, 10) - 1) / ESCAL;
  var BATT_CANDIDATES = [0, 4.8, 9.6, 14.4, 19.2]; // 0.12 · moduli 4,8 kWh
  var BATT_MODULE = 4.8, BATT_MIN = 4.8, BATT_MAX = 28.8;
  var SIZING_MAX_COVERAGE = 1.5; // 0.12 · kapa dimenzioniranja ≤ 1,5 × pokrića
  // = batteryPricePerKwh(): €/kWh baterije na cijelom kW = (s baterijom − bez) / ref. kWh; linearno između.
  function battEurPoKwh(kW) {
    var n = CJENIK_BAT.length;
    var per = function (i) { return (CJENIK_BAT[i][1] - CJENIK_KWP[i]) / CJENIK_BAT[i][0]; };
    if (kW <= 1) return per(0);
    if (kW >= n) return per(n - 1);
    var lo = Math.floor(kW), hi = Math.ceil(kW);
    if (lo === hi) return per(lo - 1);
    return per(lo - 1) + (kW - lo) * (per(hi - 1) - per(lo - 1));
  }
  function battCost(kW, batt) { return batt > 0 ? batt * battEurPoKwh(kW) : 0; }
  var BATT_SIZING_FACTOR = 0.65; // = config.battery_sizing_factor u wizardu
  function roundToModule(kwh) { return Math.min(BATT_MAX, Math.round(Math.max(1, Math.ceil(kwh / BATT_MODULE - 1e-9)) * BATT_MODULE * 10) / 10); }
  // = referenceBatteryKwh(): referentni kapacitet cjenika za zaokruženu snagu
  function refBatteryKwh(kW) { var k = Math.max(1, Math.min(CJENIK_BAT.length, Math.round(kW))); return CJENIK_BAT[k - 1][0]; }
  // = recommended_battery_kwh u calcEngine: optimum → ref. kWh cjenika (kWp način) → dnevna × 0,65
  function recBattery(kW, consYear, optBatt, byBill) {
    var b = optBatt > 0 ? optBatt : (byBill ? roundToModule(consYear / 365 * BATT_SIZING_FACTOR) : refBatteryKwh(kW));
    return Math.max(BATT_MIN, Math.min(BATT_MAX, roundToModule(b)));
  }
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
  var CJENIK_KWP = [3849, 4329, 4989, 5449, 5939, 6429, 6959, 7512, 8271, 8990,
                    9724, 10428, 11102, 11746, 12360, 12944, 13498, 14022, 14516, 14980];
  // 0.12 · cjenik 10/2026 „s preporučenom baterijom“ (= system_pricing_battery): [kWh, cijena] po kW 1–20
  var CJENIK_BAT = [[4.8, 5419], [4.8, 5899], [4.8, 6559], [4.8, 7019], [4.8, 7509], [4.8, 7999], [4.8, 8729],
                    [9.6, 9449], [9.6, 10179], [9.6, 10899], [9.6, 11609], [9.6, 12319],
                    [14.4, 13029], [14.4, 13739], [14.4, 14449], [14.4, 15159], [14.4, 15869],
                    [19.2, 16579], [19.2, 17289], [19.2, 17999]];

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

  function interp1(xs, ys, x) {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[xs.length - 1]) return ys[ys.length - 1];
    for (var i = 1; i < xs.length; i++) {
      if (x <= xs[i]) { var f = (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[i - 1] + f * (ys[i] - ys[i - 1]); }
    }
    return ys[ys.length - 1];
  }
  // = selfConsumptionRatio('K', …): bilinearna interpolacija (log omjer × baterija)
  function scRatio(prod, cons, days, batt) {
    if (!(prod > 0) || !(cons > 0)) return 0;
    var lr = Math.log(Math.max(prod / cons, 1e-6));
    var cols = SC_K.map(function (row) { return interp1(SC_LOG_RATIO, row, lr); });
    return interp1(SC_BATT, cols, batt / (cons / days));
  }

  function prodMonthly(kW) {
    return PROFILE.map(function (pct) { return PRINOS * pct / 100 * kW; });
  }

  // = settleYear(): mjesečni obračun (kSO = 1), VT-first pokrivanje potrošnje,
  // prag 3.000 kWh/polugodište (+35 % energija), umanjenje = PKC × min(preuzeto, predano).
  // Vraća { bill: godišnji račun s PV, gross: godišnji račun bez umanjenja } u € s PDV-om.
  function settleYear(consYear, prod, batt) {
    var rows = [], m, x;
    for (m = 0; m < 12; m++) {
      var consM = consYear * HH_W[m];
      var consVT = consM * VT_SHARE, consNT = consM * (1 - VT_SHARE);
      var p = prod[m];
      var sc = Math.min(scRatio(p, consM, DAYS[m], batt) * p, consVT + consNT);
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
    var maxKwp = Math.max(1, coverageKwp * SIZING_MAX_COVERAGE);
    var best = { kW: Math.min(coverageKwp, maxKwp), batt: 0, score: -Infinity };
    var sinceImprovement = 0;
    for (var kW = 1; sinceImprovement < 12 && kW <= Math.min(200, maxKwp); kW += 0.25) {
      var prod = prodMonthly(kW);
      var pvCost = cijenaSustava(kW);
      var improved = false;
      for (var b = 0; b < BATT_CANDIDATES.length; b++) {
        var batt = BATT_CANDIDATES[b];
        var bill = settleYear(consYear, prod, batt).bill;
        var bCost = battCost(kW, batt);
        var score = (baseline - bill) * ANNUITY10 - (pvCost + bCost - subsidy(kW, pvCost, batt, bCost));
        if (score > best.score) { best = { kW: kW, batt: batt, score: score }; improved = true; }
      }
      if (kW >= coverageKwp) sinceImprovement = improved ? 0 : sinceImprovement + 1;
    }
    return best;
  }

  // = selectPanel() (1.11): iz kataloga bira snagu panela i broj panela tako da
  // n × Wp bude najbliže ciljanoj snazi; izjednačenje → jači panel. Vraća kWp.
  function selectPanel(kW) {
    var targetW = kW * 1000, best = null;
    PANEL_OPTIONS_WP.forEach(function (wp) {
      var n = Math.max(1, Math.round(targetW / wp));
      var diff = Math.abs(n * wp - targetW);
      if (!best || diff < best.diff - 1e-9 || (Math.abs(diff - best.diff) <= 1e-9 && wp > best.wp)) {
        best = { wp: wp, n: n, diff: diff };
      }
    });
    return { kW: best.n * best.wp / 1000, wp: best.wp, n: best.n };
  }
  function roundToPanels(kW) { return selectPanel(kW).kW; }

  /* ---------- 2.8 · Cjenovne kartice: brojke iz istog motora (cjenik, FZOEU, panel, prinos) ---------- */
  document.querySelectorAll("[data-paket-kw]").forEach(function (card) {
    var kW = parseFloat(card.getAttribute("data-paket-kw"));
    var cijena = cijenaSustava(kW);
    var poticaj = subsidy(kW, cijena, 0, 0);
    var panel = selectPanel(kW);
    var set = function (sel, val) { var el = card.querySelector(sel); if (el) el.textContent = val; };
    set("[data-paket-price]", fmt(Math.round(cijena)));
    set("[data-paket-subsidy]", fmt(Math.round(poticaj)));
    set("[data-paket-net]", fmt(Math.round(cijena - poticaj)));
    set("[data-paket-perkw]", fmt(Math.round(cijena / kW)));
    set("[data-paket-panels]", panel.n + " × " + panel.wp + " W");
    set("[data-paket-kwh]", fmt(Math.round(panel.kW * PRINOS / 100) * 100));
  });

  // = calcScenario() za jednu konfiguraciju: cijena, poticaj, neto, ušteda, povrat.
  function scenario(kW, batt, consYear) {
    var investPv = cijenaSustava(kW);
    var investBat = battCost(kW, batt);
    var invest = investPv + investBat;
    var poticaj = subsidy(kW, investPv, batt, investBat);
    var neto = invest - poticaj;
    var s = settleYear(consYear, prodMonthly(kW), batt);
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
      recBatt = recBattery(kW, consYear, opt.batt, true);
    } else {
      kW = roundToPanels(state.power);
      consYear = PRINOS * kW * KWP_MODE_UTIL;
      recBatt = recBattery(kW, consYear, 0, false);   // = referentna baterija cjenika za tu snagu
    }
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
    el.battLabel.textContent = state.batt ? "S baterijom " + fmt(recBatt, 1) + " kWh" : "Bez baterije";

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
