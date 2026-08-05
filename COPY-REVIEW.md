# Copy review — dvostruka agentska lektura (copywriter HR + SEO)

Datum: 5. kolovoza 2026. · Status: **PRIMIJENJENO** (runda 2, sve stavke 5/5 od oba agenta)

## Proces

1. **Runda 1:** dva neovisna agenta pregledala sve marketinške tekstove (landing, 8 detaljnih
   stranica, wiki indeks + naslovi/excerpti članaka). Copywriter: 42 nalaza (AI fraze, kalkovi,
   kriva značenja, Vaš→vaš). SEO: 18 nalaza (pojmovi, duljine, kanibalizacija, lokalni signal)
   + 5 strukturnih preporuka.
2. **Odluke vlasnika:** ton "stručno + toplo, vi malim slovom"; riječ "potpišete" izbačena iz
   marketinških naslova (ostaje samo gdje opisuje stvarnu radnju kupca u hodogramu);
   banner po copywriteru; cjenovna sekcija oko 10 kW; S1 + S2 strukturne preporuke.
3. **Runda 2:** copywriter dotjerao svih 59 stavki na vlastitih 5/5; SEO validirao —
   sve 5/5 uz jednu gramatičku korekciju ("pripremimo"→"pripremamo").

## Ključne konačne verzije

| Element | Konačni tekst |
|---|---|
| Hero H1 | Solarna elektrana ključ u ruke — vidite svoju **uštedu** prije odluke. |
| OG title | Vidite svoju uštedu prije odluke \| Larsoon Energy |
| Banner | Prijave na FZOEU poticaje kreću **2. rujna** — pripremite dokumentaciju na vrijeme. |
| Kalkulator H2 | Kalkulator uštede i isplativosti solarne elektrane |
| Zašto lead | Domaća tvrtka iz Jastrebarskog, s timom koji u energetici radi više od deset godina. … |
| Hodogram H2 | Od upita do puštanja u pogon — u 8 koraka |
| Rješenja H2 | Elektrana, baterija i punjač. |
| Usluge H2 | Sve što elektrani treba — od projekta do održavanja |
| Radovi H2 | Solarne elektrane diljem Hrvatske. |
| Wiki teaser H2 | Provjerite prije nego odlučite |
| FAQ p4 (+JSON-LD) | Trebam li bateriju za solarnu elektranu? |
| Završni CTA H2 | Od ponude vas dijele **3 minute**. |
| Svi CTA gumbi | Izradite ponudu · Pošaljite poruku |
| Solarne el. title/H1/meta | Solarna elektrana za kuću — cijena i ugradnja 2026. \| od 4.700 € za 5 kW u meta opisu |
| Baterije title/H1 | Baterija za solarnu elektranu — cijena i poticaji / — vlastita struja i navečer |
| Punjači title/H1 | Kućni punjač za električni auto (wallbox) / Punjači za električne automobile — kućni i poslovni |
| Wiki indeks title | Solarne elektrane — vodiči, cijene i propisi \| Larsoon Wiki |
| Članci (novi naslovi) | FZOEU poticaji za solarne panele 2026. — vodič · Isplativost solarne elektrane — kako izračunati ROI? · Dozvole za solarne panele u Hrvatskoj 2026. |
| Excerpti (svih 8) | prepisani: bez "Vaš" velikim, bez listicle fraza, "fotonaponski" umjesto "fotovoltaički" |

Svi ostali usvojeni tekstovi (opisi koraka hodograma, kartice usluga i rješenja, prose odlomci
detaljnih stranica) vidljivi su u git diffovima commitova `copy(...)` od 5. 8. 2026.

## Strukturni dodaci (SEO)

- **S1** LocalBusiness JSON-LD na naslovnici: adresa Trg Ljube Babića 28, Jastrebarsko,
  Zagrebačka županija; geo 45.6689, 15.6461; areaServed Hrvatska. Wiki indeks og:type → website.
- **S2** Nova sekcija "Koliko košta solarna elektrana za kuću?" na /rjesenja/solarne-elektrane:
  10 kW ≈ 8.800 € (0 % PDV), s FZOEU poticajem neto ≈ 4.400 €; struktura pitanje+odgovor
  ciljana na featured snippet za "solarna elektrana cijena".

## Odgođeno za drugi krug

- Lektura **tijela** wiki članaka (8 × ~70 redaka) — isti dvo-agentski proces.
- **S3** novi wiki članak "Koliko solarnih panela treba za kuću?" (pojam "solarni paneli za kuću").
- Kontekstualni linkovi iz tijela članaka prema komercijalnim stranicama.
- Pravne stranice namjerno netaknute (finalni pravni tekstovi vlasnika).
