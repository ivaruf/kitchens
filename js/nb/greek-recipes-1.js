/*
 * nb/greek-recipes-1.js — bokmål for the first half of the Greek recipes.
 * Overlaid on js/recipes.js by id and by step position; anything missing
 * falls back to English.
 */
export const NB_GREEK_RECIPES_1 = {
  fasolada: {
    name: "Fasolada",
    line: "Suppe på hvite bønner med gulrot, selleri og tomat i rikelig med olivenolje.",
    story: "Ofte kalt Hellas' nasjonalrett, og den mest hverdagslige maten som finnes: en gryte bønner til en vinterhverdag, gjort fyldig av ingenting annet enn olivenolje og tålmodighet.",
    serves: "4",
    time: "Ca. 2 timer, når bønnene har ligget i bløt",
    serve: "Med brød, oliven og en syltet grønnsak eller to — og veldig ofte feta.",
    ingredients: {
      beans: "500 g tørkede, bløtlagt over natten",
      onion: "1 stor, hakket",
      carrot: "2, i skiver",
      celery: "2 stilker med blad, skåret i skiver",
      garlic: "2 fedd, skåret i skiver",
      tomato: "2 modne, revet — eller 1 ss tomatpuré",
      bay: "1 laurbærblad",
      oil: "120 ml, og mer til slutt",
      salt: "etter smak",
      blackpepper: "etter smak",
      parsley: "en neve, til slutt",
    },
    method: [
      {
        text: "Hell av bløtleggingsvannet, dekk bønnene med nytt vann, kok i fem minutter og hell av igjen.",
        why: "Mange kokker heller ut det første vannet. Skummet forsvinner med det, og suppen får en renere smak.",
        prep: { beans: "kokt opp og avrent" },
        wait: "5 min",
      },
      {
        text: "Varm halvparten av oljen og la løk, gulrot, selleri og hvitløk surre forsiktig i ca. ti minutter. De skal bli myke, ikke brune.",
        why: "Dette er den søte, stille bunnen. Bruning ville gitt en stekt smak som fasolada ikke skal ha.",
        prep: { onion: "hakket", carrot: "i skiver", celery: "skåret i skiver", garlic: "skåret i skiver" },
        wait: "10 min",
      },
      {
        text: "Ha i bønnene, tomaten og laurbærbladet, og vann så det står et par fingre over.",
        why: "Nok vann til å koke bønnene og bli kraft — men hver kopp ekstra er smak som blir utvannet.",
        prep: { tomato: "revet" },
      },
      {
        text: "La det småkoke forsiktig med lokket på skrå i en til halvannen time, til bønnene er kremete helt inn. Salt underveis.",
        why: "Et lat bobl, ikke full kok: koker de hardt, sprekker skallet og suppen blir grøt før bønnene er møre inni.",
        wait: "1–1½ time",
      },
      {
        text: "Ta gryta av varmen, hell i resten av oljen, kvern over pepper og dryss over persillen.",
        why: "Rå olivenolje til slutt er det som gjør det til fasolada — den smaker grønt og pepprete på en måte kokt olje ikke gjør.",
        prep: { parsley: "hakket" },
      },
    ],
    table: {
      dairy: "Gryta er melkefri. Fetaen som serveres ved siden av, er det ikke: dropp den, eller legg den på en egen tallerken.",
      gluten: "Gryta er glutenfri. Brødet den spises med, er det ikke: server med glutenfritt brød, eller bare en skje.",
    },
  },

  fakes: {
    name: "Fakes",
    line: "Suppe på brune linser med laurbærblad og tomat, avrundet med en skvett eddik.",
    story: "Den billigste og raskeste gryta i det greske kjøkkenet, og for mange smaken av skolelunsj. Klar på under en time, uten bløtlegging.",
    serves: "4",
    time: "Ca. 1 time",
    serve: "Med brød, oliven og veldig ofte et stykke salt fisk eller feta.",
    ingredients: {
      lentils: "250 g brune eller grønne, skylt",
      onion: "1, hakket",
      garlic: "2 fedd, skåret i skiver",
      carrot: "1, i terninger (valgfritt)",
      paste: "1 ss",
      bay: "2 laurbærblad",
      oil: "80 ml, og mer til slutt",
      vinegar: "1 ss, eller etter smak",
      oregano: "en klype",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Skyll linsene og plukk ut eventuelle små steiner.",
        why: "Linser trenger ikke bløtlegging — de er små nok til å bli møre på førti minutter.",
        prep: { lentils: "skylt" },
      },
      {
        text: "La løk, hvitløk og gulrot bli myke i oljen, og rør så inn tomatpureen i et minutt.",
        why: "Litt steking av pureen gjør den søt i stedet for metallisk.",
        prep: { onion: "hakket", garlic: "skåret i skiver", carrot: "i terninger" },
        wait: "8 min",
      },
      {
        text: "Ha i linsene, laurbærbladene og ca. 1,2 liter vann. La det småkoke til linsene er møre og suppen har tyknet.",
        why: "Linsene tykner sin egen suppe mens de blir møre — ikke noe mel trengs.",
        wait: "40–50 min",
      },
      {
        text: "Salt, og ha i eddik og oregano når gryta er tatt av varmen. Smak til, og ha i mer eddik hvis den trenger et løft.",
        why: "Eddiken til slutt er hele trikset: den skjærer gjennom jordsmaken og får suppen til å smake av mer enn linser.",
      },
    ],
    table: {
      dairy: "Melkefri i bollen; feta ved siden av til den som vil ha.",
      gluten: "Glutenfri i bollen; pass på brødet.",
    },
  },

  avgolemono: {
    name: "Kyllingsuppe avgolemono",
    line: "Kylling- og rissuppe gjort silkemyk med egg og sitron.",
    story: "Suppen man lager når noen er forkjølet, når noen har fått barn, når bestemor kommer på besøk. Trikset alle yiayiaer kan, er tempereringen: varm kraft pisket inn i eggene en øse om gangen, så de tykner i stedet for å bli eggerøre.",
    serves: "4 til 6",
    time: "Ca. 1½ time",
    serve: "Varm, med rikelig sort pepper.",
    ingredients: {
      chicken: "1 liten hel kylling, ca. 1,5 kg",
      onion: "1, delt i to",
      carrot: "2, i biter",
      celery: "1 stilk",
      rice: "150 g",
      eggs: "2",
      lemon: "2, presset",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Dekk kyllingen med kaldt vann sammen med løk, gulrot og selleri, varm sakte opp til det småkoker og skum av. La det trekke forsiktig i ca. en time.",
        why: "Å starte i kaldt vann og aldri la det koke hardt gir klar kraft; skummingen fjerner det grå skummet.",
        prep: { onion: "delt i to", carrot: "i biter", celery: "i biter" },
        wait: "1 time",
      },
      {
        text: "Løft ut kyllingen og grønnsakene. Sil kraften tilbake i gryta, ha i risen og la det småkoke til den er myk. Riv kjøttet i strimler.",
        why: "Risen koker i kraften og gir den fylde. Kjøttet går tilbake til slutt så det ikke blir overkokt.",
        wait: "15–20 min",
      },
      {
        text: "Pisk eggene luftige, og pisk så inn sitronsaften. Pisk hele tiden mens du har i varm kraft en øse om gangen, fire eller fem øser.",
        why: "Dette er temperering: eggene varmes gradvis så de tykner i stedet for å skille seg når de møter gryta.",
        prep: { eggs: "pisket", lemon: "presset" },
      },
      {
        text: "Ta gryta av varmen og hell egg og sitron tilbake mens du rører. Ha i kyllingen igjen og varm forsiktig opp — aldri la det koke igjen.",
        why: "Koker det, skiller egget seg. Forsiktig varme holder suppen glatt og kremete å se på, uten en dråpe fløte.",
      },
    ],
    table: {
      egg: "Her er egget selve retten. Lag tahinosoupa i stedet — fasteversjonen, med tahini pisket inn i sitron i stedet for egg, temperert med varm kraft på akkurat samme måte.",
    },
  },

  tahinosoupa: {
    name: "Tahinosoupa",
    line: "Fastesuppen: ris kokt i vann, gjort kremete med tahini og sitron.",
    story: "Avgolemonos fastetvilling, spist på fastetidens strenge dager når egg ikke står på bordet. Tahini pisket med sitron gjør eggets jobb, og suppen blir like silkemyk.",
    serves: "4",
    time: "Ca. 30 minutter",
    serve: "Varm, med sort pepper og en ekstra skvis sitron.",
    ingredients: {
      rice: "150 g",
      tahini: "4 ss",
      lemon: "2, presset",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Kok opp 1,5 liter saltet vann, ha i risen og la det småkoke til den er helt myk.",
        why: "Myk, nesten overkokt ris slipper stivelse som gir suppen fylde.",
        wait: "15–20 min",
      },
      {
        text: "Pisk tahinien med sitronsaften i en bolle. Den stivner og tykner — fortsett å piske, og ha i litt kaldt vann til den er glatt.",
        why: "Tahini strammer seg når den møter syre. En skvett vann løser den opp igjen til en krem som kan helles.",
        prep: { tahini: "pisket", lemon: "presset" },
      },
      {
        text: "Pisk noen øser av den varme suppen inn i tahinien, ta gryta av varmen, hell alt tilbake og rør.",
        why: "Temperering, akkurat som med avgolemono: varmet gradvis blander den seg glatt i stedet for å klumpe seg.",
      },
    ],
    table: {
      gluten: "Laget med ris er den glutenfri. Noen bruker orzo eller fide-nudler, som er hvete.",
    },
  },

  revithada: {
    name: "Revithada",
    line: "Kikerter bakt sakte med en mengde løk, olivenolje og sitron.",
    story: "Fra Sifnos, der hver husholdning lørdag kveld bar leirgryta si til bakerens ovn, fortsatt varm etter brødet, og hentet den etter kirken søndag, silkemyk og gyllen.",
    serves: "4",
    time: "3 til 4 timer i ovnen, nesten alt uten tilsyn",
    serve: "Lun, ikke varm, med brød og oliven.",
    ingredients: {
      chickpeas: "500 g tørkede, bløtlagt over natten",
      onion: "2 store, i tynne skiver",
      oil: "150 ml",
      bay: "2 laurbærblad",
      lemon: "1, presset",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Hell av kikertene og ha dem i en leirgryte eller tung gryte med løk, olje, laurbærblad og en god klype salt.",
        why: "Løken er ikke pynt. I løpet av timene smelter den helt og blir selve sausen.",
        prep: { chickpeas: "avrent", onion: "i tynne skiver" },
      },
      {
        text: "Ha i vann så det står to–tre centimeter over, legg på lokket og bak på 160 °C.",
        why: "Lav, jevn ovnsvarme rundt hele gryta koker kikertene silkemyke uten at de noen gang koker hardt. På platen gjør den forsiktigste småkoking i to timer nesten samme nytten.",
        wait: "3–4 timer",
      },
      {
        text: "Titt inn en gang eller to og spe med litt varmt vann hvis det blir tørt. Det skal ende tykt, ikke suppete.",
        why: "En tett leirgryte mister lite vann; en metallgryte med løst lokk mister mer. Alle gryter er forskjellige, og derfor sier oppskriften: se etter.",
      },
      {
        text: "Rør inn sitronsaften rett før servering, og smak til med salt.",
        why: "Sitron som koker i timevis, mister friskheten. Tilsatt til slutt løfter den all den søte løken.",
        prep: { lemon: "presset" },
      },
    ],
    table: {
      gluten: "Noen oppskrifter jevner den med en skje mel. Det trengs ikke — mos en øse kikerter og rør dem inn igjen. Pass på brødet på bordet.",
    },
  },

  fasolakia: {
    name: "Fasolakia",
    line: "Grønne bønner og poteter kokt lenge og mykt i olivenolje og tomat.",
    story: "Sommerlunsjen i hver gresk husholdning, spist lun eller romtemperert, med brødet som skje. Kokt til bønnene er myke og olje og tomat har blitt én saus.",
    serves: "4",
    time: "Ca. 1 time",
    serve: "Lun, med brød og en god skive feta.",
    ingredients: {
      greenbeans: "800 g flate bønner, rensket",
      potato: "2, i biter",
      onion: "1, hakket",
      garlic: "2 fedd, skåret i skiver",
      tomato: "3 modne, revet",
      oil: "150 ml",
      parsley: "en neve",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "La løk og hvitløk bli myke og blanke i oljen.",
        prep: { onion: "hakket", garlic: "skåret i skiver" },
        wait: "5 min",
      },
      {
        text: "Ha i bønnene og rør til de blir knallgrønne og blanke av olje.",
        why: "Det å vende bønnene i den varme oljen først er det som gjør dette til en ladero — kokt i olje, med tomaten som eneste væske.",
        prep: { greenbeans: "rensket og delt" },
        wait: "5 min",
      },
      {
        text: "Ha i potetene, tomaten, salt og et glass vann. Legg på lokk og la det småkoke til alt er mykt.",
        why: "Lenge og mykt med vilje: greske grønne bønner skal gi etter, ikke knirke. Rist gryta i stedet for å røre, så potetene holder seg hele.",
        prep: { potato: "i biter", tomato: "revet" },
        wait: "40–50 min",
      },
      {
        text: "Ta av lokket de siste minuttene hvis det er vassent, og rør så inn persille og pepper.",
        why: "Sausen skal være tykk og blank: olje og tomat kokt sammen til ett.",
        prep: { parsley: "hakket" },
      },
    ],
    table: {
      dairy: "Dropp fetaen, eller legg den på en egen tallerken.",
      gluten: "Glutenfri i gryta; pass på brødet.",
    },
  },

  spanakorizo: {
    name: "Spanakorizo",
    line: "Spinat og ris kokt sammen med vårløk, dill og sitron.",
    story: "En vårrett for når spinaten er overalt og billig: en bolle grønn ris et sted mellom pilaff og risotto, avrundet med mye sitron.",
    serves: "4",
    time: "Ca. 40 minutter",
    serve: "Med sitronbåter, oliven — og ofte feta.",
    ingredients: {
      spinach: "1 kg, vasket og grovhakket",
      rice: "200 g",
      springonion: "6, skåret i skiver",
      onion: "1, hakket",
      dill: "en stor neve",
      lemon: "1, presset",
      oil: "100 ml",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "La løken og vårløken bli myk i oljen.",
        prep: { onion: "hakket", springonion: "skåret i skiver" },
        wait: "5 min",
      },
      {
        text: "Ha i spinaten en neve om gangen, og la hver neve falle sammen før du har i neste.",
        why: "En kilo spinat får ikke plass på én gang — men den faller sammen til en tidel av størrelsen etter et minutt på varmen.",
        prep: { spinach: "vasket og hakket" },
        wait: "5 min",
      },
      {
        text: "Rør inn risen, ca. 500 ml varmt vann og salt. Legg på lokk og la det småkoke forsiktig til risen er mør og det meste av væsken er borte.",
        why: "Den skal ende litt løs og kremete, ikke tørr — slik grekere vil ha risen sin.",
        wait: "18–20 min",
      },
      {
        text: "Ta gryta av varmen og rør inn dill, sitronsaft og pepper. La den hvile i fem minutter før servering.",
        why: "Både dill og sitron mister seg ved koking; tilsatt til slutt holder de retten frisk.",
        prep: { dill: "hakket", lemon: "presset" },
      },
    ],
    table: {
      dairy: "Melkefri i gryta; feta ved siden av til den som vil ha.",
    },
  },

  soufico: {
    name: "Soufico",
    line: "Ikarias sommergrønnsaker lagt lagvis i én gryte og kokt ned i olivenolje og tomat.",
    story: "Fra Ikaria, øya kjent for sine langlivede folk. Det hagen ga i august, havnet i én gryte, uten en dråpe vann, og kom ut som noe langt mer enn grønnsaker.",
    serves: "4",
    time: "Ca. 1½ time",
    serve: "Lun, med brød, og noen ganger smuldret feta på toppen.",
    ingredients: {
      aubergine: "2, i tykke skiver",
      courgette: "3, i tykke skiver",
      pepper: "2, i strimler",
      potato: "2, i tykke skiver",
      onion: "2, skåret i skiver",
      garlic: "3 fedd, skåret i skiver",
      tomato: "4 modne, revet",
      oil: "150 ml",
      oregano: "en klype",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Skjær alt i tykke biter. Tradisjonelt stekes så hver grønnsak for seg i olivenolje til den er gyllen; vil du ha en lettere versjon, hopper du over det og legger dem rå.",
        why: "Steking først gir dypere smak og silkemykere aubergine; å legge dem rå går raskere og bruker mindre olje. Begge deler lages på Ikaria.",
        prep: { aubergine: "i tykke skiver", courgette: "i tykke skiver", pepper: "i strimler", potato: "i tykke skiver", onion: "skåret i skiver", garlic: "skåret i skiver" },
      },
      {
        text: "Legg lagvis i en vid gryte: poteter i bunnen, så løk og paprika, så aubergine, så squash, med hvitløk og salt mellom lagene.",
        why: "Det som bruker lengst tid, ligger nærmest varmen og det raskeste øverst, så alt blir ferdig samtidig.",
      },
      {
        text: "Fordel den revne tomaten over toppen, hell over oljen, og ha på oregano og pepper. Ikke ha i vann.",
        why: "Squashen og tomatene slipper sitt eget vann mens de koker. Ekstra vann ville gjort det til suppe.",
        prep: { tomato: "revet" },
      },
      {
        text: "Legg på lokk og kok på lav varme uten å røre — rist heller gryta nå og da. La det hvile før servering.",
        why: "Røring gjør lagene til grøt. En risting hindrer at bunnen tar seg, mens alt holder seg helt.",
        wait: "45–60 min",
      },
    ],
    table: {
      dairy: "Dropp fetaen, eller server den ved siden av. God olje og litt salt gjør samme jobben.",
      gluten: "Glutenfri i gryta; pass på brødet.",
    },
  },

  gemista: {
    name: "Gemista",
    line: "Tomater og paprika fylt med urteris, bakt mellom potetbåter.",
    story: "Høysommerens rett, når tomatene nesten sprekker. Alle familier krangler om urtene; alle er enige om at potetene i bunnen av formen, gjennomtrukket av saften, er det beste.",
    serves: "4",
    time: "Ca. 2 timer",
    serve: "Lun eller romtemperert, ofte med feta og brød.",
    ingredients: {
      tomato: "6 store, faste",
      pepper: "4",
      rice: "200 g",
      onion: "1, revet",
      garlic: "2 fedd, knust",
      parsley: "en stor neve, hakket",
      mint: "en neve, hakket",
      potato: "3, i båter",
      oil: "150 ml",
      salt: "etter smak",
      blackpepper: "etter smak",
    },
    method: [
      {
        text: "Skjær toppen av tomatene og ta vare på dem som lokk. Skrap ut innmaten i en bolle og kjør den i stavmikser eller hakk den. Skjær toppen av paprikaene og dra ut frøene.",
        why: "Tomatkjøttet kastes ikke — det blir væsken risen koker i.",
        prep: { tomato: "uthult, innmat spart", pepper: "uthult" },
      },
      {
        text: "Bland risen med løk, hvitløk, urter, halvparten av tomatmassen, halvparten av oljen, salt og pepper.",
        why: "Risen går i rå: den koker inne i grønnsakene og drikker tomatsaften.",
        prep: { onion: "revet", garlic: "knust", parsley: "hakket", mint: "hakket" },
      },
      {
        text: "Sett grønnsakene i en form, fyll dem tre fjerdedeler fulle og legg på lokkene. Stikk potetbåter inn mellom dem og hell over resten av tomatmassen og oljen.",
        why: "Bare tre fjerdedeler fulle, fordi risen sveller når den koker og ville presset lokkene av.",
        prep: { potato: "i båter" },
      },
      {
        text: "Bak på 180 °C, tildekket den første timen, deretter uten lokk til toppene er brune og risen er myk.",
        why: "Tildekket damper det og risen blir gjennomkokt; uten lokk steker toppene og saften tykner.",
        wait: "1½–2 timer",
      },
    ],
    table: {
      dairy: "Noen rører ost inn i fyllet; denne har ingen. Feta ved siden av til den som vil ha.",
      gluten: "Glutenfri i formen; pass på brødet.",
    },
  },
};
