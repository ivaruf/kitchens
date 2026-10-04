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
    time: "Ca. 1½ time, når bønnene har ligget i bløt over natten",
    serve: "Med brød, oliven og en syltet grønnsak eller to — og veldig ofte feta eller en saltet fisk.",
    ingredients: {
      beans: "300 g tørkede hvite bønner, bløtlagt over natten",
      onion: "1 stor, hakket",
      carrot: "2, i skiver",
      celery: "2 stilker med blad, skåret i skiver",
      garlic: "1–2 fedd, skåret i skiver (valgfritt)",
      paste: "1½ ss",
      tomato: "1 moden, revet — eller 200 ml passata (valgfritt)",
      bay: "1 laurbærblad (valgfritt)",
      oil: "90 ml, halvparten først og halvparten til slutt, og mer på bordet",
      salt: "etter smak",
      blackpepper: "etter smak",
      lemon: "en skvis ved bordet (valgfritt)",
    },
    method: [
      {
        text: "Hell av bønnene og skyll dem.",
        why: "En natt i vann halverer koketiden og får bønnene til å koke jevnt, så skallet holder mens innsiden blir kremete.",
        prep: { beans: "bløtlagt og skylt" },
      },
      {
        text: "Varm halvparten av oljen og la løk, gulrot, selleri og hvitløk bli myke på svak varme i ca. fem minutter. Rør inn tomatpureen og la den steke med i et minutt.",
        why: "Grønnsakene skal bli myke, ikke brune: dette er en søt, stille bunn. Et minutt i oljen gjør pureen søt i stedet for metallisk.",
        prep: { onion: "hakket", carrot: "i skiver", celery: "skåret i skiver", garlic: "skåret i skiver" },
        wait: "6 min",
      },
      {
        text: "Ha i bønnene, tomaten og laurbærbladet hvis du bruker dem, og ca. en liter vann — nok til at det står to fingre over. Kok opp og skum av.",
        why: "Skummingen fjerner det grå skummet og gir en renere suppe. Mange går lenger og koker bønnene for seg først og heller ut vannet; de fleste nøyer seg med å skumme.",
        prep: { tomato: "revet" },
        wait: "10 min",
      },
      {
        text: "Skru ned, legg lokket på skrå og la det småkoke forsiktig i ca. en time, til bønnene er møre helt inn.",
        why: "Et lat bobl, ikke full kok: koker de hardt, sprekker skallet og suppen blir grøt før bønnene er møre inni.",
        wait: "ca. 1 time",
      },
      {
        text: "Smak til med salt og pepper, hell i resten av oljen og la det småkoke uten lokk i ti til femten minutter til, til kraften blir kremete.",
        why: "Saltet kommer sent, når bønnene er møre. Oljen som bobler sammen med stivelsen fra bønnene, er det som tykner kraften — det greske kokker kaller chylomeni. Vil du ha den fyldigere, mos en øse bønner mot gryteveggen.",
        wait: "10–15 min",
      },
      {
        text: "Ta gryta av varmen og la suppen sette seg i noen minutter. Server med en tynn stripe rå olivenolje og en skvis sitron ved bordet til den som vil ha.",
        why: "Fasolada tykner mens den står, og er enda bedre dagen etter. Rå olje ved bordet gir den grønne, pepprete smaken som kokt olje mister.",
        prep: { lemon: "i båter" },
      },
    ],
    table: {
      dairy: "Gryta er melkefri. Fetaen som serveres ved siden av, er det ikke: dropp den, eller legg den på en egen tallerken.",
      gluten: "Gryta er glutenfri. Brødet den spises med, er det ikke: server med glutenfritt brød, eller bare en skje. Noen hvite varianter tykkes med mel — denne trenger det ikke.",
    },
  },

  fakes: {

      name: "Fakes",

      line: "Suppe på brune linser med tomat og laurbærblad, avrundet med en skvett eddik.",

      story: "Den billigste og raskeste gryta i det greske kjøkkenet, og for mange smaken av skolelunsj. Klar på under en time, uten bløtlegging.",

      serves: "4",

      time: "Ca. 1 time",

      serve: "Med brød, oliven og veldig ofte et stykke salt fisk eller feta.",

      ingredients: {

        lentils: "300 g små brune linser, skylt",

        onion: "1, hakket",

        garlic: "2 fedd, skåret i skiver",

        carrot: "1, i terninger",

        celery: "1 stilk, i terninger (valgfritt)",

        paste: "1 ss (valgfritt)",

        tomato: "2 modne, revet — eller 250 ml passata",

        bay: "2 laurbærblad",

        oil: "80 ml, og mer på bordet",

        vinegar: "1–2 ss, og mer på bordet",

        oregano: "en klype (valgfritt)",

        salt: "etter smak",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "Skyll linsene og plukk ut eventuelle små steiner.",

          why: "Linser trenger ikke bløtlegging — de er små nok til å bli møre på førti minutter. Mange koker dem også opp i nytt vann og heller av før de begynner, for en lettere suppe; det er valgfritt.",

          prep: { lentils: "skylt" },

        },

        {

          text: "La løk, gulrot og selleri bli myke i oljen i ca. åtte minutter, og rør så inn hvitløken og tomatpureen i et minutt.",

          why: "Litt steking av pureen gjør den søt i stedet for metallisk. Hvitløken kommer sist så den ikke blir brent.",

          prep: { onion: "hakket", carrot: "i terninger", celery: "i terninger", garlic: "skåret i skiver" },

          wait: "9 min",

        },

        {

          text: "Ha i linsene, tomaten, laurbærbladene og ca. 1,1 liter varmt vann. Legg på lokk og la det småkoke til linsene er møre og suppen har tyknet. Salt halvveis.",

          why: "Linsene tykner sin egen suppe mens de blir møre — ikke noe mel trengs. Med lokk på blir vannet i gryta i stedet for i kjøkkenet.",

          prep: { tomato: "revet" },

          wait: "40–45 min",

        },

        {

          text: "Ta gryta av varmen og rør inn eddik, oregano og litt nykvernet pepper. Smak til, og ha i mer eddik hvis den trenger et løft. Sett mer olje og eddik på bordet.",

          why: "Eddiken til slutt er hele trikset: den skjærer gjennom jordsmaken og får suppen til å smake av mer enn linser. Alle liker ulik mengde, derfor skal flasken på bordet også.",

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

      serves: "6",

      time: "Ca. 1¾ time",

      serve: "Varm, med rikelig sort pepper og sitron på bordet. Noen familier serverer kyllingen på egen tallerken etterpå.",

      ingredients: {

        chicken: "1 hel kylling, ca. 1,7 kg",

        onion: "1, delt i to",

        carrot: "2, i biter",

        celery: "1–2 stilker",

        rice: "180 g (ca. en kopp), grøtris eller mellomkornet ris",

        oil: "2 ss (valgfritt)",

        eggs: "2",

        lemon: "2, presset",

        salt: "etter smak",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "Dekk kyllingen med ca. 3 liter kaldt vann sammen med løk, gulrot, selleri og litt salt. Varm sakte opp til det småkoker og skum av, og la det så trekke forsiktig med lokket på skrå i ca. en time, til kjøttet slipper beinet.",

          why: "Å starte i kaldt vann og aldri la det koke hardt gir klar kraft; skummingen de første minuttene fjerner det grå skummet.",

          prep: { onion: "delt i to", carrot: "i biter", celery: "i biter" },

          wait: "ca. 1 time",

        },

        {

          text: "Løft ut kyllingen og grønnsakene. Sil kraften tilbake i gryta, ha i risen og eventuelt oljen, og la det småkoke til risen er myk. Plukk imens kjøttet av beina og riv det i strimler.",

          why: "Risen koker i kraften og gir den fylde. Kjøttet går tilbake til slutt så det ikke blir overkokt.",

          wait: "15–20 min",

        },

        {

          text: "Pisk eggene godt, og pisk så inn sitronsaften. Pisk hele tiden mens du har i varm kraft en øse om gangen — tre eller fire øser — til bollen kjennes varm.",

          why: "Dette er temperering: eggene varmes gradvis så de tykner i stedet for å skille seg når de møter gryta. Mange pisker hvitene til en myk marengs først og vender inn plommene, for en lettere og luftigere suppe — like tradisjonelt.",

          prep: { eggs: "pisket", lemon: "presset" },

        },

        {

          text: "Ta gryta av varmen og hell i egg og sitron mens du rører. Ha i kyllingen igjen og varm den gjennom på laveste varme i et minutt eller to — aldri la det koke igjen.",

          why: "Koker det, skiller egget seg. Forsiktig varme holder suppen glatt og kremete å se på, uten en dråpe fløte.",

        },

      ],

      table: {

        egg: "Her er egget selve retten. Lag tahinosoupa i stedet — fasteversjonen, med tahini pisket inn i sitron i stedet for egg, temperert med varm kraft på akkurat samme måte.",

        gluten: "Laget med ris er den glutenfri. Mange bruker orzo eller fide-nudler i stedet, og de er hvete.",

      },

    },

  tahinosoupa: {

      name: "Tahinosoupa",

      line: "Fastesuppen: ris kokt i vann, gjort kremete med tahini og sitron.",

      story: "Avgolemonos fastetvilling, spist på fastetidens strenge dager når egg ikke står på bordet — og på Athos-fjellet, der den lages uten en dråpe olje. Tahini pisket med sitron gjør eggets jobb, og suppen blir like silkemyk.",

      serves: "4",

      time: "Ca. 35 minutter",

      serve: "Varm, med sort pepper og en ekstra skvis sitron.",

      ingredients: {

        rice: "100 g grøtris",

        tahini: "100 g (6–7 ss)",

        lemon: "2, presset, og mer på bordet",

        salt: "etter smak",

        blackpepper: "etter smak (valgfritt)",

      },

      method: [

        {

          text: "Kok opp 1,25 liter saltet vann, ha i risen og la det småkoke til den er helt myk.",

          why: "Myk, nesten overkokt ris slipper stivelse som gir suppen fylde.",

          wait: "20–25 min",

        },

        {

          text: "Pisk tahinien i en stor bolle og ha i sitronsaften litt om gangen. Den stivner til en tykk masse — fortsett å piske.",

          why: "Tahini strammer seg når den møter syre. Det er som det skal være; den varme kraften i neste steg løser den opp igjen.",

          prep: { tahini: "pisket", lemon: "presset" },

        },

        {

          text: "Pisk hele tiden mens du har i varm kraft fra gryta en øse om gangen — ca. tre øser — til tahinien er tynn som melk.",

          why: "Temperering, akkurat som med avgolemono: varmet og tynnet ut gradvis blander den seg glatt i stedet for å klumpe seg. Noen løser den opp med en skvett kaldt vann først; kraften gjør samme jobben.",

        },

        {

          text: "Ta gryta av varmen, hell tahinien tilbake og rør. Gi den et minutt på svak varme hvis du vil ha den tykkere, og la den så stå i fem minutter før servering.",

          why: "Tahini kan ikke skille seg slik egg gjør, så litt varme er trygt — men suppen tykner av seg selv mens den står, og ser tynnere ut i gryta enn den blir i tallerkenen.",

          wait: "5 min",

        },

      ],

      table: {

        gluten: "Laget med ris er den glutenfri. Mange bruker orzo, fide eller hilopites i stedet, og de er hvete.",

      },

    },

  revithada: {

      name: "Revithada",

      line: "Kikerter bakt sakte med en mengde løk, olivenolje og sitron.",

      story: "Fra Sifnos, der hver husholdning lørdag kveld bar leirgryta si til bakerens ovn, fortsatt varm etter brødet, og hentet den etter kirken søndag, silkemyk og gyllen.",

      serves: "4",

      time: "Ca. 6 timer i ovnen, nesten alt uten tilsyn",

      serve: "Lun, ikke varm, med sitronbåter, brød og oliven.",

      ingredients: {

        chickpeas: "500 g tørkede, bløtlagt over natten",

        onion: "2 store (ca. 400 g), finhakket",

        oil: "120 ml, og litt mer til slutt",

        bay: "2 laurbærblad",

        lemon: "1, presset, og båter",

        salt: "ca. 1½ ts",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "Hell av kikertene, skyll dem godt, og ha dem i en leirgryte eller tung gryte med løk, olje, laurbærblad, salt og pepper. Velg en gryte de nesten fyller.",

          why: "Løken er ikke pynt. I løpet av timene smelter den helt og blir selve sausen. Mange har en teskje natron på de bløtlagte kikertene i en halvtime først og skyller det av; det gjør skallene mykere.",

          prep: { chickpeas: "avrent og skylt", onion: "finhakket" },

        },

        {

          text: "Ha i vann så det står to–tre centimeter over. Legg et ark folie over gryta, press lokket ned på den, og bak på 150 °C.",

          why: "Lav, jevn ovnsvarme rundt hele gryta koker kikertene silkemyke uten at de noen gang koker hardt. På Sifnos forsegles lokket med en pølse av mel- og vanndeig; folie gjør samme jobben uten gluten.",

          wait: "5–6 timer",

        },

        {

          text: "Titt inn en gang eller to og spe med litt varmt vann hvis det blir tørt. Det skal ende tykt og kremete, ikke suppete.",

          why: "En tett leirgryte mister lite vann; en metallgryte med løst lokk mister mer. Alle gryter er forskjellige, og derfor sier oppskriften: se etter.",

        },

        {

          text: "Fisk ut laurbærbladene. Rør inn sitronsaften og en tynn stråle rå olivenolje rett før servering, og smak til med salt.",

          why: "Sitron som koker i timevis, mister friskheten og kan gjøre kikertene seige. Tilsatt til slutt løfter den all den søte løken.",

          prep: { lemon: "presset" },

        },

      ],

      table: {

        gluten: "Den tradisjonelle forseglingen rundt lokket er mel- og vanndeig — bruk folie under lokket i stedet, som her. Pass på brødet på bordet.",

      },

    },

  fasolakia: {

      name: "Fasolakia",

      line: "Grønne bønner og poteter kokt lenge og mykt i olivenolje og tomat.",

      story: "Sommerlunsjen i hver gresk husholdning, spist lun eller romtemperert, med brødet som skje. Kokt til bønnene er myke og olje og tomat har blitt én saus.",

      serves: "4",

      time: "Ca. 1 time, og litt hvile",

      serve: "Lun eller romtemperert, med brød og en god skive feta.",

      ingredients: {

        greenbeans: "1 kg, gjerne flate, rensket",

        potato: "2 store (ca. 500 g), i biter",

        onion: "1 stor, hakket",

        garlic: "2 fedd, skåret i skiver",

        tomato: "3 modne (ca. 500 g), revet",

        oil: "120 ml",

        parsley: "½ bunt",

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

          text: "Ha i bønnene og potetene og rør til bønnene blir knallgrønne og alt er blankt av olje.",

          why: "Det å vende grønnsakene i den varme oljen først er det som gjør dette til en ladero — kokt i olje, med tomaten som den viktigste væsken.",

          prep: { greenbeans: "rensket og delt", potato: "i biter" },

          wait: "5 min",

        },

        {

          text: "Ha i tomaten, salt og ca. 250 ml varmt vann — nok til at det står halvveis opp på bønnene. Legg på lokk og la det småkoke til alt er mykt.",

          why: "Lenge og mykt med vilje: greske grønne bønner skal gi etter, ikke knirke. Rist gryta i stedet for å røre, så potetene holder seg hele. En klype sukker er vanlig hvis tomatene er syrlige.",

          prep: { tomato: "revet" },

          wait: "40–50 min",

        },

        {

          text: "Ta av lokket de siste minuttene hvis det er vassent, og rør så inn persille og pepper. La retten hvile i 15–30 minutter før servering.",

          why: "Den er ferdig når bare oljen er igjen, blank rundt tomaten. Den smaker bedre lun enn varm, så hvilen er en del av retten.",

          prep: { parsley: "hakket" },

          wait: "15–30 min",

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

      time: "Ca. 45 minutter",

      serve: "Med sitronbåter, oliven — og ofte feta.",

      ingredients: {

        spinach: "750 g, vasket og grovhakket",

        rice: "160 g mellomkornet",

        springonion: "4, skåret i skiver",

        onion: "1, hakket",

        dill: "½ bunt",

        lemon: "1, presset, og båter",

        oil: "90 ml",

        salt: "etter smak",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "La løken og vårløken bli myk i to tredjedeler av oljen uten at den tar farge.",

          prep: { onion: "hakket", springonion: "skåret i skiver" },

          wait: "5 min",

        },

        {

          text: "Ha i spinaten en neve om gangen, og la hver neve falle sammen før du har i neste.",

          why: "Så mye spinat får ikke plass på én gang — men den faller sammen til en tidel av størrelsen etter et minutt på varmen.",

          prep: { spinach: "vasket og hakket" },

          wait: "5 min",

        },

        {

          text: "Rør inn risen, ca. 500 ml varmt vann og salt. Legg på lokk og la det småkoke forsiktig til risen er mør og det meste av væsken er borte.",

          why: "Den skal ende litt løs og kremete, ikke tørr — slik grekere vil ha risen sin.",

          wait: "20 min",

        },

        {

          text: "Ta gryta av varmen og rør inn dill, sitronsaft, pepper og resten av oljen. Legg på lokket og la den hvile i ti minutter før servering.",

          why: "Både dill og sitron mister seg ved koking; tilsatt til slutt holder de retten frisk. Den rå oljen til slutt smaker oliven, ikke stekepanne.",

          prep: { dill: "hakket", lemon: "presset" },

          wait: "10 min",

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

      time: "Ca. 1¼ time",

      serve: "Lun eller romtemperert, med brød, og noen ganger smuldret feta på toppen.",

      ingredients: {

        aubergine: "2 mellomstore, i tykke skiver",

        courgette: "2, i tykke skiver",

        pepper: "2 grønne, i strimler",

        potato: "2, i tykke skiver",

        onion: "2 store, skåret i skiver",

        garlic: "3 fedd, skåret i skiver",

        tomato: "3 modne (ca. 400 g), revet",

        oil: "120 ml",

        oregano: "en klype",

        salt: "etter smak",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "Skjær alt i tykke biter. På Ikaria går grønnsakene rå i gryta; vil du ha en fyldigere festversjon, steker du hver grønnsak for seg i olivenolje til den er gyllen først.",

          why: "Ikarianerne sier at ingenting stekt og ingen røring er det som gjør dette til soufico og ikke briam. Steking først gir dypere smak og silkemykere aubergine, men koster mye mer olje og en halvtime.",

          prep: { aubergine: "i tykke skiver", courgette: "i tykke skiver", pepper: "i strimler", potato: "i tykke skiver", onion: "skåret i skiver", garlic: "skåret i skiver" },

        },

        {

          text: "Legg lagvis i en vid, tung gryte: løk i bunnen, så poteter, så paprika og aubergine, så squash, med hvitløk og salt mellom lagene.",

          why: "Løken blir søt og beskytter bunnen; det som bruker lengst tid, ligger nærmest varmen og det raskeste øverst, så alt blir ferdig samtidig.",

        },

        {

          text: "Fordel den revne tomaten over toppen, hell over oljen, og ha på oregano og pepper. Ikke ha i vann.",

          why: "Squashen og tomatene slipper sitt eget vann mens de koker. Ekstra vann ville gjort det til suppe.",

          prep: { tomato: "revet" },

        },

        {

          text: "Legg på lokk og kok på lav varme uten å røre — rist heller gryta nå og da — til potetene er møre og saften har kokt inn til oljen. La det hvile før servering.",

          why: "Røring gjør lagene til grøt. En risting hindrer at bunnen tar seg, mens alt holder seg helt.",

          wait: "40–50 min",

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

      time: "Ca. 1¾ time, med hvile",

      serve: "Lun eller romtemperert, ofte med feta og brød.",

      ingredients: {

        tomato: "4 store, faste",

        pepper: "4",

        rice: "160 g mellomkornet",

        onion: "1 stor, revet",

        garlic: "2 fedd, knust",

        parsley: "½ bunt, hakket",

        mint: "½ bunt, hakket",

        potato: "2, i båter",

        oil: "150 ml",

        salt: "etter smak",

        blackpepper: "etter smak",

      },

      method: [

        {

          text: "Skjær toppen av tomatene og ta vare på dem som lokk. Skrap ut innmaten i en bolle og kjør den i stavmikser eller hakk den. Skjær toppen av paprikaene og dra ut frøene. Strø litt salt inni hver av dem.",

          why: "Tomatkjøttet kastes ikke — det blir væsken risen koker i.",

          prep: { tomato: "uthult, innmat spart", pepper: "uthult" },

        },

        {

          text: "Bland risen med løk, hvitløk, urter, halvparten av tomatmassen, halvparten av oljen, salt og pepper. En klype sukker hjelper hvis tomatene er syrlige.",

          why: "Risen går i rå: den koker inne i grønnsakene og drikker tomatsaften. Mange lar den surre med løken og tomatmassen i fem minutter først; da går det fortere i ovnen, men risen må fortsatt være halvkokt.",

          prep: { onion: "revet", garlic: "knust", parsley: "hakket", mint: "hakket" },

        },

        {

          text: "Sett grønnsakene i en form, fyll dem tre fjerdedeler fulle og legg på lokkene. Stikk potetbåter inn mellom dem, krydre dem, og hell over resten av tomatmassen og oljen sammen med et lite glass vann.",

          why: "Bare tre fjerdedeler fulle, fordi risen sveller når den koker og ville presset lokkene av. Vannet hindrer at bunnen tar seg før grønnsakene slipper saften sin.",

          prep: { potato: "i båter" },

        },

        {

          text: "Bak på 190 °C under folie i 45 minutter, deretter uten folie til toppene er brune og risen er myk. La formen hvile i 15–30 minutter før servering.",

          why: "Tildekket damper det og risen blir gjennomkokt; uten folie steker toppene og saften tykner. Mens den hviler, drikker risen opp det som er igjen.",

          wait: "1¼ time, så hvile",

        },

      ],

      table: {

        dairy: "Noen rører ost inn i fyllet; denne har ingen. Feta ved siden av til den som vil ha.",

        gluten: "Glutenfri i formen. Noen strør brødsmuler over lokkene — dropp dem. Pass på brødet.",

      },

    },
};
