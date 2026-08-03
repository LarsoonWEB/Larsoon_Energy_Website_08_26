/**
 * Generator detaljnih stranica za Rješenja i Usluge.
 *
 *   node build/build-pages.mjs
 *
 * Sadržaj je definiran u konstanti PAGES niže — uredi tekst ovdje
 * i pokreni skriptu ponovno. Piše rjesenja/*.html i usluge/*.html.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ============================================================
   SADRŽAJ
   ============================================================ */
const PAGES = [
  /* ---------------- RJEŠENJA ---------------- */
  {
    dir: "rjesenja",
    slug: "solarne-elektrane",
    section: "Rješenja",
    eyebrow: "Solarne elektrane",
    title: "Solarne elektrane ključ u ruke",
    lead: "Fotonaponski sustavi za krovove obiteljskih kuća i poslovnih objekata — od dimenzioniranja i projekta, preko papirologije prema HEP-u i FZOEU-u, do montaže i puštanja u pogon. Vi potpisujete, sve ostalo vodimo mi.",
    metaTitle: "Solarne elektrane ključ u ruke — cijena i ugradnja | Larsoon",
    metaDesc:
      "Solarna elektrana za kuću do 20 kW, s 0 % PDV-a i FZOEU poticajem do 6.000 €. Projektiranje, HEP, montaža i puštanje u pogon — sve vodi Larsoon Energy.",
    img: "assets/rjesenja-solar-web.jpg",
    imgAlt: "Solarna elektrana na krovu obiteljske kuće",
    specs: [
      { val: "do 20", unit: "kW", label: "snaga za kućanstva" },
      { val: "1.150", unit: "kWh/kW", label: "prosječan godišnji prinos" },
      { val: "0 %", unit: "", label: "PDV na isporuku i ugradnju" },
      { val: "25", unit: "god", label: "jamstva na panele" },
    ],
    sections: [
      {
        h: "Što sadrži sustav ključ u ruke",
        items: [
          {
            icon: "panels-top-left",
            tint: "cyan",
            t: "Fotonaponski paneli",
            d: "Monokristalni paneli provjerenih proizvođača, s jamstvom na snagu do 25 godina i degradacijom ispod 0,5 % godišnje.",
          },
          {
            icon: "cpu",
            tint: "savings",
            t: "Inverter",
            d: "Pretvara istosmjernu struju panela u izmjeničnu za kućnu mrežu. Jamstvo 5 + 5 godina, sukladnost s normom EN 50549.",
          },
          {
            icon: "wrench",
            tint: "indigo",
            t: "Nosiva konstrukcija",
            d: "Aluminijska podkonstrukcija prilagođena tipu krova — crijep, lim, ravni krov — s ispitanim opterećenjem na vjetar i snijeg.",
          },
          {
            icon: "shield-check",
            tint: "solar",
            t: "Zaštita i mjerenje",
            d: "Prenaponska zaštita, DC i AC rastavljači, ožičenje i uređaj za praćenje proizvodnje s pristupom putem aplikacije.",
          },
        ],
      },
      {
        h: "Zašto elektrana ima smisla i nakon ukidanja net-meteringa",
        prose: [
          "Od 1. siječnja 2026. višak struje predan u mrežu obračunava se po nižoj otkupnoj cijeni, dok svaki kilovatsat koji potrošite iz vlastite elektrane vrijedi punih ~0,18 €. Isplativost se time preselila sa <strong>količine proizvodnje</strong> na <strong>samopotrošnju</strong> — koliko struje potrošite u trenutku kad je proizvodite.",
          "Zato sustav dimenzioniramo prema vašoj stvarnoj potrošnji, a ne prema slobodnoj površini krova. Dobro dimenzionirana elektrana uz FZOEU poticaj vraća se tipično kroz <strong>4,5 do 6 godina</strong>, a radi 25 i više godina.",
        ],
      },
    ],
    cross: [
      { href: "../rjesenja/baterijski-sustavi", t: "Baterijski sustavi", d: "Podignite samopotrošnju s ~30 % na ~70 % i trošite vlastitu struju i navečer." },
      { href: "../usluge/projektiranje", t: "Projektiranje", d: "Idejni i glavni projekt prilagođen vašem krovu i potrošnji." },
      { href: "../wiki/isplativost-solarnih-panela-roi", t: "Wiki: Isplativost i ROI", d: "Kako se računa period povrata i što na njega utječe." },
    ],
  },
  {
    dir: "rjesenja",
    slug: "baterijski-sustavi",
    section: "Rješenja",
    eyebrow: "Baterijski sustavi",
    title: "Baterijski sustavi za vlastitu struju i navečer",
    lead: "Spremnik energije pohranjuje višak proizveden danju i vraća ga kad zaista trošite — ujutro i navečer. Samopotrošnja raste s otprilike 30 % na oko 70 %, a od 2026. i baterije sufinancira FZOEU.",
    metaTitle: "Baterijski sustavi za solarne elektrane — cijena i poticaji | Larsoon",
    metaDesc:
      "Baterija podiže samopotrošnju s ~30 % na ~70 %. FZOEU sufinancira 350 € po kWh baterije, do 5.600 €. Dimenzioniranje, ugradnja i puštanje u pogon — Larsoon Energy.",
    img: "assets/rjesenja-baterija-web.jpg",
    imgAlt: "Kućna baterija na zidu",
    specs: [
      { val: "~70", unit: "%", label: "samopotrošnja s baterijom" },
      { val: "350", unit: "€/kWh", label: "FZOEU poticaj za bateriju" },
      { val: "5.600", unit: "€", label: "najviši iznos poticaja" },
      { val: "6.000+", unit: "ciklusa", label: "tipičan vijek LFP baterije" },
    ],
    sections: [
      {
        h: "Što baterija mijenja u praksi",
        items: [
          {
            icon: "sun-moon",
            tint: "cyan",
            t: "Struja kad je najskuplja",
            d: "Energija proizvedena u podne troši se navečer, u vršnom tarifnom razdoblju, umjesto da se predaje mreži po niskoj otkupnoj cijeni.",
          },
          {
            icon: "trending-up",
            tint: "savings",
            t: "Gotovo dvostruka ušteda",
            d: "Za istu elektranu godišnja ušteda s baterijom raste približno dvostruko, jer se udio vlastite potrošnje penje s ~30 % na ~70 %.",
          },
          {
            icon: "battery-charging",
            tint: "indigo",
            t: "LFP tehnologija",
            d: "Litij-željezo-fosfatne ćelije bez kobalta: stabilne, sigurne i s vijekom trajanja preko 6.000 ciklusa punjenja.",
          },
          {
            icon: "plug-zap",
            tint: "solar",
            t: "Priprema za rezervno napajanje",
            d: "Uz odgovarajući hibridni inverter sustav može održati ključna trošila i pri nestanku struje iz mreže.",
          },
        ],
      },
      {
        h: "Kako biramo kapacitet",
        prose: [
          "Preveliku bateriju plaćate, a ne iskoristite; premala se prazni prije jutra. Kapacitet zato računamo iz vaše <strong>večernje i noćne potrošnje</strong>, a ne iz snage elektrane — za prosječno kućanstvo to je najčešće između 5 i 10 kWh.",
          "Budući da FZOEU sufinancira 350 € po kWh baterije, do najviše 5.600 €, baterija u pravilu <strong>ne produljuje period povrata</strong> cijele investicije, a znatno povećava godišnju uštedu.",
        ],
      },
    ],
    cross: [
      { href: "../rjesenja/solarne-elektrane", t: "Solarne elektrane", d: "Fotonaponski sustav ključ u ruke, do 20 kW za kućanstva." },
      { href: "../wiki/poticaji-i-subvencije-hrvatska-2026", t: "Wiki: Poticaji 2026.", d: "Tko ostvaruje pravo, koliki su iznosi i kako teče prijava." },
      { href: "../wiki/neto-mjerenje-vs-neto-naplata", t: "Wiki: Neto naplata", d: "Što se promijenilo 2026. i zašto je samopotrošnja ključna." },
    ],
  },
  {
    dir: "rjesenja",
    slug: "punjaci-ev",
    section: "Rješenja",
    eyebrow: "Punjači za električna vozila",
    title: "Punjači za električna vozila",
    lead: "Kućni i poslovni punjači povezani s vašom elektranom — vozite na vlastitoj sunčevoj energiji umjesto na struji iz mreže. Ugradnju, zaštitu i pametno upravljanje punjenjem radimo zajedno sa solarnim sustavom ili naknadno.",
    metaTitle: "Punjači za električna vozila — kućni i poslovni | Larsoon",
    metaDesc:
      "Ugradnja wallbox punjača za električna vozila, povezanih sa solarnom elektranom. Punjenje viškom vlastite struje, 7,4 do 22 kW. Larsoon Energy, cijela Hrvatska.",
    img: "assets/rjesenja-punjac-web.jpg",
    imgAlt: "Kućni punjač za električno vozilo na zidu kuće",
    specs: [
      { val: "7,4–22", unit: "kW", label: "snaga punjenja" },
      { val: "Type 2", unit: "", label: "europski standard priključka" },
      { val: "~0,04", unit: "€/kWh", label: "trošak vlastite struje umjesto otkupa" },
      { val: "2", unit: "god", label: "jamstva na izvedene radove" },
    ],
    sections: [
      {
        h: "Što ugrađujemo",
        items: [
          {
            icon: "house-plug",
            tint: "cyan",
            t: "Kućni wallbox",
            d: "Jednofazni 7,4 kW ili trofazni do 22 kW, s vlastitom zaštitnom sklopkom i nadzorom struje kvara tipa B.",
          },
          {
            icon: "sun",
            tint: "savings",
            t: "Punjenje viškom iz elektrane",
            d: "Punjač prati trenutnu proizvodnju i puni automobil onim što biste inače predali mreži po niskoj otkupnoj cijeni.",
          },
          {
            icon: "building-2",
            tint: "indigo",
            t: "Poslovni punjači",
            d: "Više punionica s raspodjelom snage, kontrolom pristupa i evidencijom potrošnje po korisniku ili vozilu.",
          },
          {
            icon: "gauge",
            tint: "solar",
            t: "Zaštita priključka",
            d: "Dinamičko ograničenje snage sprječava preopterećenje kućnog priključka kad se istovremeno puni vozilo i troši u kući.",
          },
        ],
      },
      {
        h: "Zašto punjač i elektrana idu zajedno",
        prose: [
          "Automobil je najveći pojedinačni potrošač u kućanstvu i, za razliku od hladnjaka ili perilice, potpuno je svejedno <strong>kada</strong> se puni. To ga čini idealnim za trošenje viška sunčeve energije usred dana.",
          "Svaki kilovatsat koji tako potrošite vrijedi vam ~0,18 € umjesto ~0,04 € koliko biste dobili predajom u mrežu. Punjač je zbog toga jedan od najbržih načina da podignete samopotrošnju postojeće elektrane.",
        ],
      },
    ],
    cross: [
      { href: "../rjesenja/solarne-elektrane", t: "Solarne elektrane", d: "Proizvedite struju kojom ćete puniti vozilo." },
      { href: "../rjesenja/baterijski-sustavi", t: "Baterijski sustavi", d: "Spremite višak i punite vozilo i nakon zalaska sunca." },
      { href: "../usluge/montaza", t: "Montaža", d: "Certificirani monteri i atesti, diljem Hrvatske." },
    ],
  },

  /* ---------------- USLUGE ---------------- */
  {
    dir: "usluge",
    slug: "projektiranje",
    section: "Usluge",
    eyebrow: "Projektiranje",
    title: "Projektiranje solarnih elektrana",
    lead: "Idejni i glavni projekt prilagođen vašem krovu, potrošnji i priključku. Projekt je temelj svega što slijedi — o njemu ovisi hoće li HEP izdati odobrenje i hoće li elektrana raditi punim kapacitetom.",
    metaTitle: "Projektiranje solarnih elektrana | Larsoon Energy",
    metaDesc:
      "Idejni i glavni projekt solarne elektrane, dimenzioniranje prema potrošnji, dokumentacija za HEP i FZOEU. Larsoon Energy, cijela Hrvatska.",
    img: "assets/radovi-04-web.jpg",
    imgAlt: "Solarni paneli precizno posloženi na krovu",
    specs: [
      { val: "1", unit: "tjedan", label: "do idejnog projekta" },
      { val: "0", unit: "", label: "odbijenih prijava na FZOEU" },
      { val: "10+", unit: "god", label: "iskustva tima" },
    ],
    sections: [
      {
        h: "Što projekt obuhvaća",
        items: [
          {
            icon: "ruler",
            tint: "cyan",
            t: "Dimenzioniranje prema potrošnji",
            d: "Snagu određujemo iz vaše stvarne godišnje potrošnje i profila trošenja, a ne iz slobodne površine krova.",
          },
          {
            icon: "layout-grid",
            tint: "savings",
            t: "Raspored panela",
            d: "Raspored po orijentaciji, nagibu i zasjenjenju krova, s procjenom prinosa po stringu tijekom godine.",
          },
          {
            icon: "file-check-2",
            tint: "indigo",
            t: "Dokumentacija za HEP",
            d: "Zahtjev za prethodnu elektroenergetsku suglasnost i sva prateća dokumentacija za priključenje na mrežu.",
          },
          {
            icon: "badge-euro",
            tint: "solar",
            t: "Podloga za FZOEU",
            d: "Projekt pripremamo tako da zadovoljava uvjete natječaja Fonda, pa prijava prolazi bez ispravaka.",
          },
        ],
      },
      {
        h: "Zašto je projekt najvažniji korak",
        prose: [
          "Loše dimenzionirana elektrana proizvodi previše u podne i premalo kad trošite, pa se višak predaje mreži po niskoj otkupnoj cijeni. Razlika između dobro i loše projektiranog sustava iste snage mjeri se u <strong>godinama povrata investicije</strong>.",
          "Svaka prijava na Fond koju smo do sada vodili — prošla je. To nije sreća, nego posljedica toga što projekt i dokumentaciju radimo prema uvjetima natječaja od prvog dana.",
        ],
      },
    ],
    cross: [
      { href: "../usluge/montaza", t: "Montaža", d: "Certificirani timovi izvode ono što je projektirano." },
      { href: "../wiki/dozvole-za-solarne-panele-hrvatska", t: "Wiki: Dozvole", d: "Koje su suglasnosti potrebne i tko ih pribavlja." },
      { href: "../rjesenja/solarne-elektrane", t: "Solarne elektrane", d: "Sustav ključ u ruke od projekta do pogona." },
    ],
  },
  {
    dir: "usluge",
    slug: "prodaja-opreme",
    section: "Usluge",
    eyebrow: "Prodaja opreme",
    title: "Prodaja solarne opreme",
    lead: "Paneli, inverteri, baterije i punjači provjerenih proizvođača — s jamstvom koje vrijedi i servisom koji je dostupan u Hrvatskoj. Opremu biramo prema projektu, ne prema onome što je trenutno na skladištu.",
    metaTitle: "Prodaja solarne opreme — paneli, inverteri, baterije | Larsoon",
    metaDesc:
      "Fotonaponski paneli, inverteri, baterije i EV punjači vodećih proizvođača, s jamstvom i servisom u Hrvatskoj. Larsoon Energy.",
    img: "assets/rjesenja-solar-web.jpg",
    imgAlt: "Solarni paneli na krovu kuće",
    specs: [
      { val: "25", unit: "god", label: "jamstva na panele" },
      { val: "5 + 5", unit: "god", label: "jamstva na inverter" },
      { val: "0 %", unit: "", label: "PDV uz isporuku s ugradnjom" },
    ],
    sections: [
      {
        h: "Što isporučujemo",
        items: [
          {
            icon: "panels-top-left",
            tint: "cyan",
            t: "Fotonaponski paneli",
            d: "Monokristalni moduli s efikasnošću iznad 21 %, jamstvom na snagu 25 godina i niskom godišnjom degradacijom.",
          },
          {
            icon: "cpu",
            tint: "savings",
            t: "Inverteri",
            d: "Mrežni i hibridni inverteri usklađeni s normom EN 50549, s praćenjem proizvodnje i mogućnošću naknadnog dodavanja baterije.",
          },
          {
            icon: "battery-charging",
            tint: "indigo",
            t: "Baterije",
            d: "LFP spremnici energije kapaciteta od 5 do 15 kWh, modularni i proširivi kasnije bez zamjene invertera.",
          },
          {
            icon: "plug-zap",
            tint: "solar",
            t: "Punjači za vozila",
            d: "Wallbox punjači od 7,4 do 22 kW s Type 2 priključkom i upravljanjem punjenjem iz viška proizvodnje.",
          },
        ],
      },
      {
        h: "Kako biramo proizvođače",
        prose: [
          "Jamstvo od 25 godina vrijedi samo ako proizvođač postoji za 25 godina i ako se reklamacija rješava u Hrvatskoj, a ne prekomorskom poštom. Zato radimo s <strong>proizvođačima koji imaju servisnu mrežu u regiji</strong>.",
          "Uz isporuku s ugradnjom PDV na opremu iznosi <strong>0 %</strong>, što je razlika koju u ukupnoj investiciji osjetite odmah.",
        ],
      },
    ],
    cross: [
      { href: "../usluge/projektiranje", t: "Projektiranje", d: "Oprema se bira prema projektu i vašoj potrošnji." },
      { href: "../usluge/montaza", t: "Montaža", d: "Isporuka i ugradnja iz jedne ruke, uz 0 % PDV-a." },
      { href: "../rjesenja/baterijski-sustavi", t: "Baterijski sustavi", d: "Kapacitet biramo prema večernjoj potrošnji." },
    ],
  },
  {
    dir: "usluge",
    slug: "montaza",
    section: "Usluge",
    eyebrow: "Montaža",
    title: "Montaža solarnih elektrana",
    lead: "Certificirani monteri, uredna instalacija i kompletni atesti — diljem Hrvatske. Montaža tipične kućne elektrane traje jedan do dva dana, a nakon nje slijedi testno puštanje u rad prema europskoj normi EN 50549.",
    metaTitle: "Montaža solarnih elektrana — cijela Hrvatska | Larsoon",
    metaDesc:
      "Certificirani monteri, uredna instalacija i atesti. Montaža kućne solarne elektrane traje 1 do 2 dana, uz testiranje prema EN 50549. Larsoon Energy.",
    img: "assets/radovi-02-web.jpg",
    imgAlt: "Solarni paneli ugrađeni na krovu obiteljske kuće",
    specs: [
      { val: "1–2", unit: "dana", label: "montaža kućne elektrane" },
      { val: "300+", unit: "", label: "ugrađenih elektrana" },
      { val: "2", unit: "god", label: "jamstva na radove" },
      { val: "EN 50549", unit: "", label: "norma testiranja" },
    ],
    sections: [
      {
        h: "Kako izgleda montaža",
        items: [
          {
            icon: "calendar-check",
            tint: "cyan",
            t: "Dogovoreni termin",
            d: "Termin ugovaramo unaprijed, nakon što je oprema na skladištu — bez čekanja s poluugrađenim sustavom na krovu.",
          },
          {
            icon: "hard-hat",
            tint: "savings",
            t: "Konstrukcija i paneli",
            d: "Postavljanje nosive konstrukcije uz očuvanje vodonepropusnosti krova, zatim montaža i spajanje panela u stringove.",
          },
          {
            icon: "zap",
            tint: "indigo",
            t: "Elektro spajanje",
            d: "Ugradnja invertera, zaštitnih uređaja i ožičenja do razdjelnika, uz mjerenja i ispitivanje instalacije.",
          },
          {
            icon: "clipboard-check",
            tint: "solar",
            t: "Testiranje i atesti",
            d: "Testno puštanje u rad uz provjeru sukladnosti s EN 50549 i predaja kompletne dokumentacije s atestima.",
          },
        ],
      },
      {
        h: "Što montaža ne smije ostaviti za sobom",
        prose: [
          "Najčešći problem s jeftinom ugradnjom nije elektrika nego <strong>krov</strong>: probušena hidroizolacija ili loše postavljene kuke pokazuju se tek za prvog jakog pljuska. Nosivu konstrukciju zato prilagođavamo tipu pokrova i ne improviziramo na licu mjesta.",
          "Na izvedene radove dajemo <strong>2 godine jamstva</strong>, uz 25 godina na panele i 5 + 5 godina na inverter.",
        ],
      },
    ],
    cross: [
      { href: "../usluge/nadzor-i-odrzavanje", t: "Nadzor i održavanje", d: "Praćenje proizvodnje nakon puštanja u pogon." },
      { href: "../usluge/projektiranje", t: "Projektiranje", d: "Montaža izvodi ono što je projektom predviđeno." },
      { href: "../#radovi", t: "Naši radovi", d: "Izbor iz više od 300 izvedenih elektrana." },
    ],
  },
  {
    dir: "usluge",
    slug: "ciscenje",
    section: "Usluge",
    eyebrow: "Čišćenje",
    title: "Čišćenje solarnih panela",
    lead: "Prašina, pelud, ptičji izmet i naslage nakon zime smanjuju prinos elektrane. Redovito čišćenje mekom vodom i odgovarajućom opremom vraća proizvodnju na projektiranu razinu bez rizika od oštećenja stakla ili premaza.",
    metaTitle: "Čišćenje solarnih panela — cijena i učestalost | Larsoon",
    metaDesc:
      "Profesionalno čišćenje solarnih panela demineraliziranom vodom. Vraća prinos smanjen zbog prašine, peludi i naslaga. Larsoon Energy, cijela Hrvatska.",
    img: "assets/radovi-03-web.jpg",
    imgAlt: "Čisti solarni paneli na krovu",
    specs: [
      { val: "1–2×", unit: "godišnje", label: "preporučena učestalost" },
      { val: "do 20", unit: "%", label: "gubitka prinosa zbog nečistoće" },
      { val: "1", unit: "dan", label: "trajanje čišćenja tipične elektrane" },
      { val: "100 %", unit: "", label: "demineralizirana voda, bez kemikalija" },
    ],
    sections: [
      {
        h: "Kako čistimo",
        items: [
          {
            icon: "droplets",
            tint: "cyan",
            t: "Demineralizirana voda",
            d: "Voda bez minerala ne ostavlja kamenac ni mrlje pri sušenju, pa nije potreban deterdžent koji bi mogao oštetiti premaz stakla.",
          },
          {
            icon: "brush",
            tint: "savings",
            t: "Meke rotirajuće četke",
            d: "Teleskopska oprema s mekim vlaknima čisti s tla gdje je moguće, bez hodanja po panelima i bez grebanja površine.",
          },
          {
            icon: "search-check",
            tint: "indigo",
            t: "Vizualni pregled",
            d: "Uz čišćenje pregledavamo panele, konstrukciju i ožičenje te javljamo ako uočimo mikropukotine ili olabavljene spojeve.",
          },
          {
            icon: "thermometer-sun",
            tint: "solar",
            t: "U pravo doba dana",
            d: "Čistimo rano ujutro ili navečer, kad su paneli hladni — hladna voda na vrućem staklu može uzrokovati toplinski šok.",
          },
        ],
      },
      {
        h: "Koliko često je stvarno potrebno",
        prose: [
          "U većini krajeva Hrvatske kiša odradi najveći dio posla, pa je <strong>jednom godišnje</strong> dovoljno. Češće čišćenje ima smisla ako ste blizu prometnice, poljoprivrednih površina, gradilišta ili ako na krovu ima ptica.",
          "Nakupljena nečistoća može smanjiti prinos i do <strong>20 %</strong>, a najviše štete radi neravnomjerno zaprljanje: zasjenjena ćelija povlači cijeli string prema dolje.",
        ],
      },
    ],
    cross: [
      { href: "../usluge/nadzor-i-odrzavanje", t: "Nadzor i održavanje", d: "Pad prinosa uočavamo prije nego ga vi primijetite." },
      { href: "../wiki/ciscenje-i-odrzavanje-panela", t: "Wiki: Čišćenje i održavanje", d: "Praktični vodič — čime čistiti i što izbjegavati." },
      { href: "../rjesenja/solarne-elektrane", t: "Solarne elektrane", d: "Sustavi ključ u ruke za obiteljske kuće." },
    ],
  },
  {
    dir: "usluge",
    slug: "nadzor-i-odrzavanje",
    section: "Usluge",
    eyebrow: "Nadzor i održavanje",
    title: "Nadzor i održavanje elektrane",
    lead: "Elektrana koja tiho radi s pola snage izgleda jednako kao i ona koja radi ispravno. Praćenjem proizvodnje uspoređujemo stvarne brojke s projektiranima i reagiramo prije nego kvar primijetite na godišnjem obračunu.",
    metaTitle: "Nadzor i održavanje solarnih elektrana | Larsoon Energy",
    metaDesc:
      "Praćenje proizvodnje, redoviti pregledi i servis solarne elektrane. Kvar uočavamo prije nego se odrazi na godišnji obračun. Larsoon Energy.",
    img: "assets/radovi-05-web.jpg",
    imgAlt: "Solarna elektrana na krovu obiteljske kuće",
    specs: [
      { val: "24/7", unit: "", label: "praćenje proizvodnje" },
      { val: "25", unit: "god", label: "očekivani vijek elektrane" },
      { val: "1×", unit: "godišnje", label: "preporučeni pregled" },
    ],
    sections: [
      {
        h: "Što nadzor obuhvaća",
        items: [
          {
            icon: "activity",
            tint: "cyan",
            t: "Praćenje proizvodnje",
            d: "Stvarnu dnevnu proizvodnju uspoređujemo s očekivanom za tu lokaciju i doba godine, pa odstupanje vidimo odmah.",
          },
          {
            icon: "bell-ring",
            tint: "savings",
            t: "Dojava kvara",
            d: "Ispad invertera, pad snage stringa ili prekid komunikacije javljaju se automatski, bez čekanja da netko pogleda aplikaciju.",
          },
          {
            icon: "search-check",
            tint: "indigo",
            t: "Godišnji pregled",
            d: "Provjera spojeva, zaštitnih uređaja, konstrukcije i stanja panela, uz mjerenja i pisani izvještaj o stanju sustava.",
          },
          {
            icon: "wrench",
            tint: "solar",
            t: "Servis i zamjena",
            d: "Popravak ili zamjena komponente u jamstvenom roku, uz vođenje reklamacije prema proizvođaču umjesto vas.",
          },
        ],
      },
      {
        h: "Zašto je nadzor isplativiji od reakcije",
        prose: [
          "Elektrana bez nadzora najčešće se otkrije kao neispravna tek kad stigne <strong>godišnji obračun</strong> — a tada je izgubljena proizvodnja cijele sezone nepovratna. Jedan neispravan string kroz godinu dana lako vrijedi više od ugovora o održavanju.",
          "Uz redovito praćenje elektrana kroz <strong>25 godina vijeka</strong> radi blizu projektiranog prinosa, što je razlika koja se izravno vidi u periodu povrata investicije.",
        ],
      },
    ],
    cross: [
      { href: "../usluge/ciscenje", t: "Čišćenje", d: "Redovito čišćenje panela za maksimalan prinos." },
      { href: "../wiki/monitoring-solarnog-sustava", t: "Wiki: Monitoring sustava", d: "Koje brojke pratiti i što znače odstupanja." },
      { href: "../rjesenja/solarne-elektrane", t: "Solarne elektrane", d: "Sustav ključ u ruke od projekta do pogona." },
    ],
  },
];

/* ============================================================
   PREDLOŽAK
   ============================================================ */
const page = (p) => {
  const up = "../";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.title,
    description: p.metaDesc,
    provider: {
      "@type": "Organization",
      name: "Larsoon Energy d.o.o.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Trg Ljube Babića 28",
        addressLocality: "Jastrebarsko",
        postalCode: "10450",
        addressCountry: "HR",
      },
      telephone: "+385992495949",
      email: "info@larsoon.com",
    },
    areaServed: { "@type": "Country", name: "Hrvatska" },
    url: `https://www.larsoon.com/${p.dir}/${p.slug}`,
  };

  return `<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.metaTitle)}</title>
<meta name="description" content="${esc(p.metaDesc)}">
<link rel="canonical" href="https://www.larsoon.com/${p.dir}/${p.slug}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(p.metaTitle)}">
<meta property="og:description" content="${esc(p.metaDesc)}">
<meta property="og:image" content="https://www.larsoon.com/assets/og-larsoon-solarna-elektrana.jpg">
<meta property="og:locale" content="hr_HR">
<link rel="icon" type="image/png" href="${up}assets/favicon.png">
<link rel="apple-touch-icon" href="${up}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}css/tokens.css">
<link rel="stylesheet" href="${up}css/main.css">
<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
</head>
<body>

<a class="skip-link" href="#glavni">Preskoči na sadržaj</a>

<header class="nav">
  <div class="nav__inner">
    <a href="${up}" aria-label="Larsoon — početna"><img src="${up}assets/larsoon-logo-light.png" alt="Larsoon" class="nav__logo"></a>
    <nav class="nav__links" aria-label="Glavna navigacija">
      <a href="${up}#kalkulator">Ušteda</a>
      <a href="${up}#zasto">Zašto Larsoon</a>
      <a href="${up}#kako">Kako funkcionira</a>
      <a href="${up}#rjesenja">Rješenja</a>
      <a href="${up}wiki">Wiki</a>
      <a href="${up}#kontakt">Kontakt</a>
    </nav>
    <div class="nav__actions">
      <a href="#" class="btn btn--primary btn--sm" data-wizard>Izradi ponudu</a>
      <button class="nav__menu-btn" type="button" id="menuBtn" aria-label="Izbornik" aria-expanded="false" aria-controls="mobileNav">
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
  <nav class="nav__mobile" id="mobileNav" aria-label="Mobilna navigacija">
    <a href="${up}#kalkulator">Ušteda</a>
    <a href="${up}#zasto">Zašto Larsoon</a>
    <a href="${up}#kako">Kako funkcionira</a>
    <a href="${up}#rjesenja">Rješenja</a>
    <a href="${up}wiki">Wiki</a>
    <a href="${up}#kontakt">Kontakt</a>
  </nav>
</header>

<main id="glavni">
  <section class="detail-hero">
    <span class="detail-hero__glow"></span>
    <span class="grad-rule"></span>
    <div class="detail-hero__grid">
      <div>
        <nav class="crumbs" aria-label="Putanja"><a href="${up}">Početna</a> <span>/</span> <a href="${up}#${p.dir}">${esc(p.section)}</a> <span>/</span> <span aria-current="page">${esc(p.eyebrow)}</span></nav>
        <span class="eyebrow eyebrow--on-dark">${esc(p.eyebrow)}</span>
        <h1>${esc(p.title)}</h1>
        <p class="detail-hero__lead">${esc(p.lead)}</p>
        <div class="detail-hero__ctas">
          <a href="#" class="btn btn--primary btn--md" data-wizard>Izradi ponudu <i data-lucide="arrow-right"></i></a>
          <a href="${up}#kontakt" class="btn btn--ghost-on-dark btn--md">Kontaktirajte nas</a>
        </div>
      </div>
      <div class="detail-hero__img">
        <img src="${up}${p.img}" alt="${esc(p.imgAlt)}" fetchpriority="high">
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section__inner">
      <div class="detail-specs">
${p.specs
  .map(
    (s) => `        <div class="detail-spec">
          <div class="detail-spec__val">${esc(s.val)}${s.unit ? ` <small>${esc(s.unit)}</small>` : ""}</div>
          <div class="detail-spec__label">${esc(s.label)}</div>
        </div>`
  )
  .join("\n")}
      </div>

${p.sections
  .map((sec) => {
    if (sec.items) {
      return `      <div class="section-header section-header--sub">
        <h2>${esc(sec.h)}</h2>
      </div>
      <div class="detail-list">
${sec.items
  .map(
    (it) => `        <div class="detail-list__item">
          <span class="chip chip--${it.tint}"><i data-lucide="${it.icon}"></i></span>
          <div>
            <h3>${esc(it.t)}</h3>
            <p>${it.d}</p>
          </div>
        </div>`
  )
  .join("\n")}
      </div>`;
    }
    return `      <div class="section-header section-header--sub">
        <h2>${esc(sec.h)}</h2>
      </div>
      <div class="prose" style="padding-top:16px">
${sec.prose.map((t) => `        <p>${t}</p>`).join("\n")}
      </div>`;
  })
  .join("\n\n")}
    </div>
  </section>

  <section class="section section--tint">
    <div class="section__inner">
      <div class="section-header">
        <span class="eyebrow">Nastavite dalje</span>
        <h2>Povezano</h2>
      </div>
      <div class="detail-cross">
${p.cross
  .map(
    (c) => `        <a href="${c.href}">
          <strong>${esc(c.t)}</strong>
          <span>${esc(c.d)}</span>
        </a>`
  )
  .join("\n")}
      </div>
    </div>
  </section>

  <section class="cta">
    <span class="grad-rule"></span>
    <span class="cta__glow"></span>
    <div class="cta__inner">
      <h2>Vaša ušteda je <span class="grad-text">3 minute</span> daleko.</h2>
      <p>Ispunite upitnik u 3 minute — personalizirana ponuda s izračunom investicije, poticaja i povrata stiže na vaš e-mail za 10 minuta.</p>
      <a href="#" class="btn btn--primary btn--lg" data-wizard>Izradi ponudu <i data-lucide="arrow-right"></i></a>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="footer__grid">
    <div>
      <img src="${up}assets/larsoon-logo-stacked.png" alt="Larsoon" class="footer__logo">
      <p class="footer__about">Larsoon Energy d.o.o. — projektiranje, prodaja i ugradnja solarnih elektrana, baterijskih sustava i EV punjača.<br>info@larsoon.com · +385 99 249 5949<br>Trg Ljube Babića 28, 10450 Jastrebarsko<br>OIB: 59474815786</p>
    </div>
    <div>
      <div class="footer__col-title">Rješenja</div>
      <ul>
        <li><a href="${up}rjesenja/solarne-elektrane">Solarne elektrane</a></li>
        <li><a href="${up}rjesenja/baterijski-sustavi">Baterijski sustavi</a></li>
        <li><a href="${up}rjesenja/punjaci-ev">Punjači za EV</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Usluge</div>
      <ul>
        <li><a href="${up}usluge/projektiranje">Projektiranje</a></li>
        <li><a href="${up}usluge/montaza">Montaža</a></li>
        <li><a href="${up}usluge/nadzor-i-odrzavanje">Nadzor i održavanje</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Tvrtka</div>
      <ul>
        <li><a href="${up}wiki">Wiki</a></li>
        <li><a href="${up}#radovi">Radovi</a></li>
        <li><a href="${up}#kontakt">Kontakt</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="footer__bottom-inner">
      <span>© 2026 Larsoon Energy d.o.o.</span>
      <span class="footer__legal">
        <a href="${up}pravila-privatnosti">Pravila privatnosti</a>
        <a href="${up}kolacici">Kolačići</a>
        <a href="${up}impressum">Impressum</a>
      </span>
    </div>
  </div>
</footer>

<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js" defer></script>
<script src="${up}js/main.js" defer></script>
</body>
</html>
`;
};

for (const p of PAGES) {
  mkdirSync(join(ROOT, p.dir), { recursive: true });
  writeFileSync(join(ROOT, p.dir, `${p.slug}.html`), page(p), "utf8");
  console.log(`  /${p.dir}/${p.slug}`);
}
console.log(`Generirano: ${PAGES.length} stranica`);
