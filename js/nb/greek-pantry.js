/*
 * nb/greek-pantry.js — bokmål for the Greek kitchen's pantry.
 * Overlaid on js/pantry.js by id; anything missing falls back to English.
 */
export const NB_GREEK_PANTRY = {
  kitchen: {
    name: "Det greske kjøkkenet",
    intro: "Olivenolje i glassevis, sitron til slutt, tørket oregano og kanel i kjøttet. Trykk på hva som helst for å lese om det.",
  },
  fastingNote:
    "En fasterett. På ortodokse fastedager — mer enn halve året for de troende — går det tradisjonelle bordet uten kjøtt, meieriprodukter og egg, og derfor er så mye av det greske kjøkkenet melkefritt og eggfritt helt av seg selv.",
  shelves: {
    spices: { name: "Urter og krydder", note: "Tørket i lia, varmet i oljen" },
    market: { name: "Fra torget", note: "Det sesongen har å by på" },
    pulses: { name: "Bønner, linser og ris", note: "Billig, mettende og halve årets fastemat" },
    bottles: { name: "Olje, vin og glass", note: "Olivenoljen går i med glasset" },
    cold: { name: "Slakter- og ostedisken", note: "Til festdager, og til bordet" },
  },
  ingredients: {
    /* ------------------------------------------------------------ spices */
    oregano: {
      name: "Oregano",
      info: "Gresk oregano brukes tørket, plukket i fjellsidene om sommeren og gnidd mellom håndflatene over gryta. Tørket er den sterkere enn fersk.",
    },
    cinnamon: {
      name: "Kanel",
      info: "I kjøtt, ikke bare i kaker: stifado og moussaka har det, et streif av det østlige middelhavskjøkkenet. En hel stang varmet i oljen, fisket opp før servering.",
    },
    allspice: {
      name: "Allehånde",
      info: "Greske kokker kaller det bare «bahari» — krydder. Noen få hele bær lukter kanel, nellik og pepper på én gang.",
    },
    cloves: {
      name: "Nellik",
      info: "Så sterk at tre er rikelig til en hel gryte. Flere enn det, og de tar over.",
    },
    bay: {
      name: "Laurbærblad",
      info: "Laurbær, som vokser vilt over hele Hellas. Det jobber stille gjennom lang småkoking; ta bladene ut før servering.",
    },
    blackpepper: {
      name: "Sort pepper",
      info: "Nykvernet, mot slutten, når varmen er på sitt klareste.",
    },
    parsley: {
      name: "Persille",
      info: "Bladpersille, brukt i never og ikke i kvaster, hakket og rørt inn til slutt så den holder seg grønn.",
    },
    dill: {
      name: "Dill",
      info: "Fersk og fjærlett, brukt i never i spinatris og med bønner. Tørket dill beholder lite av det som gjør den verdt å ha i.",
    },
    mint: {
      name: "Mynte",
      info: "Grønn mynte, det greske kjøkkenets mynte: hakket inn i risen til fylte grønnsaker, der noen få blader rekker langt.",
    },
    salt: {
      name: "Havsalt",
      info: "Litt tidlig, resten til slutt: når en gryte koker inn, blir saltet sterkere. Bønner kan saltes fra start — den gamle advarselen om at de blir seige, er en myte.",
    },

    /* ------------------------------------------------------------ market */
    onion: {
      name: "Løk",
      info: "Starten på nesten alt. Myknet langsomt i olivenolje blir den søt; jaget over høy varme svir den i kantene før midten er myk.",
    },
    pearl: {
      name: "Småløk",
      info: "Små, hele løk, selve hjertet i stifado — det skal være nesten like mye løk som kjøtt. Forvell dem et minutt, så glir skallet av.",
    },
    garlic: {
      name: "Hvitløk",
      info: "Går i etter løken, aldri før: skivet hvitløk blir brun på sekunder, og brent hvitløk er bitter tvers igjennom.",
    },
    tomato: {
      name: "Tomater",
      info: "Greske kokker river ofte modne tomater på et rivjern og kaster skallet. Utenom sesongen er en boks gode hakkede tomater det ærlige valget.",
    },
    lemon: {
      name: "Sitroner",
      info: "Tilsettes mot slutten, ikke i starten: friskheten i sitron blekner jo lenger den koker. En skvett over en bolle bønner forandrer hele retten.",
    },
    carrot: {
      name: "Gulrøtter",
      info: "Sammen med løk og selleri bygger den den søte, stille grunnen i fasolada. Skåret i skiver holder den formen gjennom lang småkoking.",
    },
    celery: {
      name: "Selleri",
      info: "Gresk selleri er bladrikere og sterkere enn de tykke stilkene som selges andre steder, og bladene skal med. Den gir suppa sin smaksrike ryggrad.",
    },
    potato: {
      name: "Poteter",
      info: "Faste poteter holder seg hele gjennom lang koking; melne poteter suger til seg sitron og olje og smelter i kantene — og det er akkurat det sitronpoteter vil ha.",
    },
    aubergine: {
      name: "Aubergine",
      info: "En svamp for olivenolje. Kokt til den faller sammen blir den silkemyk; for lite kokt knirker den og smaker nesten ingenting.",
    },
    courgette: {
      name: "Squash",
      info: "Mest vann, så den mykner fort og gir vannet fra seg til gryta — og slik koker soufico uten at noe tilsettes.",
    },
    pepper: {
      name: "Grønn paprika",
      info: "Den lange, tynnskallede greske paprikaen er søtere og mildere enn vanlig paprika, og havner i nesten hver eneste sommergryte.",
    },
    redonion: {
      name: "Rødløk",
      info: "Mildere og søtere spist rå — løken til horiatiki og til ringene på toppen av fava. Skåret tynt og skylt i kaldt vann mister den brodden.",
    },
    springonion: {
      name: "Vårløk",
      info: "Vårens løk, grønne topper og alt: den myke, søte grunnen i spanakorizo og mange av fasterettene.",
    },
    cucumber: {
      name: "Agurk",
      info: "Skåret i tykke biter til horiatiki, med litt av skallet på. Den gir vann og knas, og er grunnen til at salaten ikke trenger bladsalat.",
    },
    spinach: {
      name: "Spinat",
      info: "Faller sammen til en brøkdel av seg selv — en kilo blir en bolle. Skyll den i flere omganger vann; sand gjemmer seg i stilkene.",
    },
    greenbeans: {
      name: "Grønne bønner",
      info: "Flate brekkbønner er grekernes favoritt, kokt lenge i olje og tomat til de er myke — det motsatte av sprø og knirkende, og med vilje.",
    },

    /* ------------------------------------------------------------ pulses */
    beans: {
      name: "Hvite bønner",
      info: "Tørkede bønner trenger åtte til tolv timer i kaldt vann før koking. Småkokt forsiktig blir de kremete; kokt hardt sprekker skallet.",
    },
    chickpeas: {
      name: "Kikerter",
      info: "Bløtlagt over natten, så kokt i timevis. På Sifnos står de i bakerovnen i landsbyen hele natten i en leirgryte, og det er derfra silkemykheten i revithada kommer.",
    },
    lentils: {
      name: "Brune linser",
      info: "Belgfrukten som ikke trenger bløtlegging: førti minutter i gryta, så er de ferdige. Fakes, linsesuppe, avsluttes med en skvett eddik.",
    },
    gigantes: {
      name: "Kjempebønner",
      info: "Store, smøraktige hvite bønner, de beste fra Kastoria og Prespes i nord. Bløtlegg over natten og småkok dem forsiktig før ovnen, så de blir møre helt gjennom uten å sprekke.",
    },
    splitpeas: {
      name: "Gule erter",
      info: "Kokt til en gyllen puré som heter fava. På Santorini lages den av en lokal belgvekst i stedet; gule erter er versjonen som kokes overalt ellers. Trenger ikke bløtlegging.",
    },
    rice: {
      name: "Ris",
      info: "Mellomkornet ris til gemista og spanakorizo, kokt myk og litt løs heller enn korn for korn. Naturlig glutenfri.",
    },

    /* ----------------------------------------------------------- bottles */
    oil: {
      name: "Olivenolje",
      info: "Ikke bare stekefett, men en ingrediens: «ladera»-rettene bruker et glass eller mer, og fasolada avsluttes med rå olje helt over toppen.",
    },
    wine: {
      name: "Rødvin",
      info: "Helt i en varm gryte etter bruningen løfter den det brune belegget fra bunnen og inn i sausen. Lang småkoking koker bort det meste av alkoholen — ikke alt.",
    },
    vinegar: {
      name: "Rødvinseddik",
      info: "Syrligheten i stifado, og skvetten som vekker en bolle linser. Vineddik, ikke malteddik: malteddik lages av bygg.",
    },
    paste: {
      name: "Tomatpuré",
      info: "Stekt i oljen et minutt til den mørkner fra knallrød til teglrød, mister den den metalliske kanten. Rørt rett ut i vann gjør den det aldri.",
    },
    olives: {
      name: "Kalamataoliven",
      info: "Mandelformede, lilla-svarte, lagt i lake og eddik. På hvert bord, og i hver horiatiki.",
    },
    capers: {
      name: "Kapers",
      info: "Syltede blomsterknopper fra en plante som vokser ut av steinmurene på øyene; de fra Santorini er berømte. Skyll av laken før bruk.",
    },
    tahini: {
      name: "Tahini",
      info: "Sesampasta — og sesam er et vanlig allergen i seg selv, verdt å spørre om. I fasten, pisket med sitron, tar den eggets plass: tahinosoupa er avgolemonos fastetvilling.",
    },

    /* -------------------------------------------------------------- cold */
    sugar: {
      name: "Sukker",
      info: "En teskje, ikke søtning: i stifado og tomatsauser runder den av det syrlige fra eddik og tomat. De fleste greske kokker bruker det; smak først.",
    },
    beef: {
      name: "Storfebog",
      info: "Det billige, senete stykket med vilje. Kollagenet smelter til gelatin over flere timer, så kjøttet faller fra hverandre og sausen blir blank. Et magert stykke ville bare tørket ut.",
    },
    chicken: {
      name: "Kylling",
      info: "En hel fugl småkokt til suppe gir både kraften og kjøttet. Hold rå kylling, og fjøla og kniven den har vært på, unna alt som ikke skal varmebehandles.",
    },
    eggs: {
      name: "Egg",
      info: "Pisket med sitron og varmet langsomt opp med varm kraft blir de avgolemono — silkemykt i stedet for eggerøre, så lenge kraften går i én øse om gangen.",
    },
    feta: {
      name: "Feta",
      info: "Ost av sauemelk lagret i lake, på bordet ved siden av nesten hvilken som helst bønnerett. Er det ulike behov rundt bordet, hører den hjemme på sin egen tallerken i stedet for smuldret over gryta.",
    },
    bread: {
      name: "Landsbybrød",
      info: "På hvert gresk bord, til å tørke tallerkenen ren. Det er hvete, så ikke for en glutenfri tallerken — og en kilde til smuler på ei delt fjøl.",
    },
  },
};
