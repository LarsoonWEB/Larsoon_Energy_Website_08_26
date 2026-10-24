/* Larsoon · privola za kolačiće + Consent Mode v2 + GA4 + Meta Pixel (plan 0.7)
   Učitava se PRIJE main.js. Bez privole: nema kolačića, gtag radi u "denied" modu
   (cookieless pingovi), fbq se uopće ne učitava.
   Dijeljeno s ponuda.larsoon.com (0.8) — isti ključ u localStorage, iste ID-jeve. */
(function () {
  var GA4_ID = "G-ECPD1TGJF6";
  var PIXEL_ID = "1652012782986516";
  var KEY = "larsoon-consent"; // "granted" | "denied"
  var LINK_DOMAINS = ["larsoon.com"]; // cross-domain: www ↔ ponuda

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", functionality_storage: "granted", security_storage: "granted",
    wait_for_update: 500
  });
  gtag("js", new Date());
  gtag("config", GA4_ID, { linker: { domains: LINK_DOMAINS }, send_page_view: true });

  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(s);

  var pixelLoaded = false;
  function loadPixel() {
    if (pixelLoaded) return; pixelLoaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq("init", PIXEL_ID); fbq("track", "PageView");
  }

  function grant() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    loadPixel();
  }

  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    if (v === "granted") grant();
    var b = document.getElementById("consentBanner"); if (b) b.hidden = true;
  }
  window.larsoonConsent = { set: setChoice, get: function () { return stored; }, open: function () { var b = document.getElementById("consentBanner"); if (b) b.hidden = false; } };

  if (stored === "granted") grant();

  // Banner tek kad je DOM spreman; ne prikazuje se ako je izbor već spremljen
  function ready(fn) { document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    if (stored === "granted" || stored === "denied") return;
    var b = document.getElementById("consentBanner"); if (!b) return;
    b.hidden = false;
    b.querySelector("[data-consent=granted]").addEventListener("click", function () { setChoice("granted"); });
    b.querySelector("[data-consent=denied]").addEventListener("click", function () { setChoice("denied"); });
  });

  // Pomoćna funkcija za evente lijevka (koristi je main.js i wizard)
  window.larsoonTrack = function (name, params) {
    gtag("event", name, params || {});
    if (window.fbq && name === "lead_submit") fbq("track", "Lead");
  };
})();
