/*
 * nb/everyday.js — bokmål for the everyday kitchen.
 * Overlaid on js/everyday.js by id (and recipe steps by position); anything
 * missing falls back to English.
 */
export const NB_EVERYDAY = {
  kitchen: {
    name: "Hverdagskjøkkenet",
    intro: "Den enkle, snille maten som står ved siden av den spennende hovedretten — ris, poteter, pasta og et fat grønnsaker, til den ved bordet som vil ha det enkelt.",
  },

  shelves: {
    cupboard: { name: "Skapet", note: "Tørrvarer og flasker som holder seg" },
    veg: { name: "Friske grønnsaker", note: "Fra nederste skuff i kjøleskapet" },
    freezer: { name: "Fryseren", note: "Plukket og frosset, klart på minutter" },
  },

  ingredients: {
    /* -------------------------------------------------------- cupboard */
    rice: {
      name: "Ris",
      info: "Langkornet hvit ris, det enkleste i skapet og det de fleste barn aldri sier nei til. Naturlig glutenfri.",
    },
    gfpasta: {
      name: "Glutenfri pasta",
      info: "Laget av mais, ris eller begge deler i stedet for hvete. Noen merker tilsetter egg for å holde den sammen, så sjekk pakken hvis egg betyr noe ved ditt bord.",
    },
    ricenoodles: {
      name: "Risnudler",
      info: "Tynne eller flate nudler av ris og vann, myke på noen minutter i varmt vann. Naturlig glutenfrie — men verdt et blikk på etiketten likevel.",
    },
    oil: {
      name: "Olivenolje",
      info: "Gjør jobben smøret vanligvis gjør her: i mosen, over pastaen, på potetene. En nøytral olje går fint til å steke risen.",
    },
    salt: {
      name: "Salt",
      info: "En klype i kokevannet er det meste av det som får enkel mat til å smake noe. Barneporsjoner trenger mindre enn de voksnes.",
    },
    tamari: {
      name: "Tamari",
      info: "Japansk soyasaus, som regel brygget uten hvete — det vanlig soyasaus ikke er. Som regel glutenfri, men sjekk etiketten: noen lages med litt hvete.",
    },
    ketchup: {
      name: "Ketchup",
      info: "Tomater, eddik, sukker og salt. De fleste er fri for melk, egg og gluten, men noen få bruker malteddik eller et fortykningsmiddel med hvete i — sjekk etiketten.",
    },

    /* ------------------------------------------------------------- veg */
    potato: {
      name: "Poteter",
      info: "Melne til mos og ovnspoteter, faste til koking. Skrelt eller skrubbet er de den norske middagstallerkenens eldste venn.",
    },
    carrot: {
      name: "Gulrøtter",
      info: "Søte og sprø rå, slik de fleste barn liker dem best. Ofte den ene grønnsaken alle rundt bordet spiser.",
    },
    cucumber: {
      name: "Agurk",
      info: "Kjølig og saftig, mild nok for den mest forsiktige spiseren. Skjær den i staver rett før servering så den holder seg sprø.",
    },
    pepper: {
      name: "Rød paprika",
      info: "Den søteste av paprikaene, sprø og klar i fargen. Røde er modnere og mildere enn grønne.",
    },
    corncob: {
      name: "Maiskolber",
      info: "Ferske på sensommeren, ellers vakuumpakket eller frosne. Spises med hendene, og det er halve grunnen til at barn liker dem.",
    },
    springonion: {
      name: "Vårløk",
      info: "Mild nok til å gå rå i stekt ris helt til slutt. Sett en skål med den på bordet til den som vil ha.",
    },

    /* --------------------------------------------------------- freezer */
    peas: {
      name: "Erter",
      info: "Frosset få timer etter plukking, og ofte søtere enn ferske fra butikken. Rene poser er bare erter; blandinger med smør eller saus er det ikke.",
    },
    sweetcorn: {
      name: "Mais",
      info: "Løse maiskorn, frosne eller fra boks. Søte, gule og en sikker favoritt hos barn.",
    },
  },

  recipes: {
    plainrice: {
      name: "Kokt ris",
      line: "Luftig hvit ris, kokt slik at den suger opp vannet og hvert korn ligger for seg.",
      story: "Det stille tilbehøret som passer til nesten alt, fra en vietnamesisk braisert fisk til en gresk gryte. Et barn som ikke vil spise noe annet, spiser som regel en bolle av dette.",
      serves: "4",
      time: "25 minutter",
      serve: "I en bolle midt på bordet, ved siden av hovedretten, hva den enn er.",
      ingredients: {
        rice: "300 g",
        salt: "en klype",
      },
      method: [
        {
          text: "Skyll risen i en sil under kaldt vann til vannet renner nesten klart.",
          why: "Skyllingen vasker av den løse stivelsen, som er det som gjør risen klissete og klumpete.",
          prep: { rice: "skylt" },
        },
        {
          text: "Ha risen i en kjele med 450 ml vann og saltet, og kok den opp.",
          why: "Halvannen gang så mye vann som ris, målt i volum: risen drikker alt sammen, så ingenting helles av.",
          wait: "5 min",
        },
        {
          text: "Legg på lokket, skru varmen helt ned og la den stå i fred i tolv minutter. Ta den så av varmen og la den stå med lokk i fem minutter til.",
          why: "Ingen røring og ingen titting: dampen under lokket gjør jobben, og hvilen lar den bli ferdig jevnt.",
          wait: "17 min",
        },
        {
          text: "Løs opp risen med en gaffel før servering.",
        },
      ],
    },

    friedrice: {
      name: "Stekt ris",
      line: "Gårsdagens ris stekt med erter, gulrot og vårløk — uten egg.",
      story: "Den beste bruken av rester av ris, og raskt nok til en hverdag. Det meste av stekt ris har egg rørt inn; denne lar det være, så alle rundt bordet kan spise den.",
      serves: "4",
      time: "15 minutter",
      serve: "Varm, med flasken med tamari på bordet.",
      ingredients: {
        rice: "600 g kokt, kald (av 250 g rå)",
        oil: "2 ss",
        carrot: "2, i terninger",
        peas: "150 g frosne",
        springonion: "3, i skiver",
        tamari: "2 ss",
      },
      method: [
        {
          text: "Varm oljen i en wok og stek gulroten i to–tre minutter til den begynner å mykne.",
          why: "Gulrot tar lengst tid, så den går i først; i små terninger blir den ferdig før risen er klar.",
          prep: { carrot: "i terninger" },
          wait: "3 min",
        },
        {
          text: "Ha i den kalde risen, del opp eventuelle klumper, og stek under omrøring til den er varm helt gjennom. Ha i ertene de siste to minuttene.",
          why: "Kald ris fra i går har tørket litt, så den stekes i stedet for å dampe seg til grøt. Fersk ris går også, hvis du brer den utover og lar den kjølne først.",
          prep: { rice: "kokt og kald" },
          wait: "5 min",
        },
        {
          text: "Rør inn tamari og vårløk og server med en gang.",
          why: "Tamari i stedet for soyasaus, som er brygget med hvete. Litt holder til en barnetallerken; mer kan tas ved bordet.",
          prep: { springonion: "i skiver" },
        },
      ],
      table: {
        gluten: "Glutenfri så lenge tamarien er det — sjekk etiketten. Vanlig soyasaus inneholder hvete.",
        egg: "Eggfri slik den står. Det meste av stekt ris, også fra takeaway, har egg i seg.",
      },
    },

    boiledpotatoes: {
      name: "Kokte poteter",
      line: "Poteter kokt i saltet vann til de akkurat er møre.",
      story: "Det enkleste på et norsk middagsbord, og det som oftest passer til alt. Små poteter kan kokes hele med skallet på.",
      serves: "4",
      time: "30 minutter",
      serve: "Varme, til hovedretten — eller med litt olivenolje og salt til den som vil ha dem enkle.",
      ingredients: {
        potato: "1 kg",
        salt: "1 ts",
      },
      method: [
        {
          text: "Skrell potetene, eller bare skrubb dem hvis de er små, og del store i to så alle er omtrent like store.",
          why: "Biter av samme størrelse blir ferdige samtidig, så ingen faller fra hverandre mens andre fortsatt er harde.",
          prep: { potato: "skrelt" },
        },
        {
          text: "Dekk dem med kaldt vann, ha i saltet og kok opp, og la dem så småkoke til en kniv glir lett inn.",
          why: "Med kaldt vann i starten koker de jevnt utenfra og inn; slippes de i kokende vann, er utsiden mos før midten er ferdig.",
          wait: "20 min",
        },
        {
          text: "Hell godt av og la dem dampe seg tørre i kjelen i et minutt.",
        },
      ],
      table: {
        dairy: "Melkefri slik den står. Hvis noen tallerkener liker smør på potetene, sett det ved siden av.",
      },
    },

    mash: {
      name: "Potetmos",
      line: "Myk potetmos laget med olivenolje og litt av kokevannet — uten smør eller melk.",
      story: "Potetmos er som regel smør og melk med litt potet i; denne er potet med god olivenolje, og den er like myk. Den kan spises med skje, og det er derfor den minste liker den.",
      serves: "4",
      time: "30 minutter",
      serve: "I en varm bolle, med litt mer olivenolje på toppen.",
      ingredients: {
        potato: "1 kg melne",
        oil: "4–5 ss",
        salt: "etter smak",
      },
      method: [
        {
          text: "Skrell potetene, del dem i jevne biter og dekk med kaldt, saltet vann. Kok til de er helt møre.",
          why: "Til mos skal de være mykere enn til vanlig koking — en kniv skal ikke møte motstand i det hele tatt.",
          prep: { potato: "skrelt" },
          wait: "20 min",
        },
        {
          text: "Ta vare på en kopp av kokevannet før du heller av. Hell av potetene og mos dem i kjelen.",
          why: "Det stivelsesrike vannet gjør det melk vanligvis gjør: det løser opp mosen uten å gjøre den seig.",
        },
        {
          text: "Rør inn olivenoljen og nok av kokevannet til at den blir myk, og smak til med salt.",
          why: "Rør med en sleiv, ikke en stavmikser: mikseren bearbeider stivelsen til mosen blir lim.",
        },
      ],
      table: {
        dairy: "Melkefri slik den står. Hvis noen tallerkener vil ha det vanlige smøret, rør det bare inn i deres porsjon.",
      },
    },

    ovenchips: {
      name: "Ovnspoteter",
      line: "Potetbåter bakt sprø i ovnen, med ketchup.",
      story: "Potetene med ketchup som ingen barn sier nei til. Bakt i stedet for fritert, så ovnen gjør jobben mens hovedretten lages.",
      serves: "4",
      time: "45 minutter",
      serve: "Rett fra formen, med en skål ketchup å dyppe i.",
      ingredients: {
        potato: "1 kg",
        oil: "3 ss",
        salt: "1 ts",
        ketchup: "til servering",
      },
      method: [
        {
          text: "Sett ovnen på 220 °C. Del potetene i båter med skallet på, og tørk dem med et kjøkkenhåndkle.",
          why: "Tørre poteter blir sprø; våte dampes. Med skallet på sparer du arbeid, og båtene holder seg hele.",
          prep: { potato: "i båter" },
        },
        {
          text: "Vend båtene med olje og salt i en ildfast form og bre dem utover i ett lag.",
          why: "Båter som ligger tett, damper hverandre myke. Bruk to former hvis én ikke holder.",
        },
        {
          text: "Stek i 35–40 minutter, og snu dem én gang halvveis, til de er gylne og sprø i kantene.",
          wait: "35–40 min",
        },
        {
          text: "Server varme, med ketchup.",
        },
      ],
      table: {
        gluten: "Potetene er glutenfrie. Sjekk etiketten på ketchupen — de fleste er greie, men noen få inneholder malteddik eller hvete.",
      },
    },

    pasta: {
      name: "Pasta med olivenolje",
      line: "Glutenfri pasta vendt i olivenolje og en klype salt.",
      story: "Middagen noen barn ville valgt hver dag hvis de fikk spørsmålet. Enkel pasta og god olje, og ingenting på som noen må plukke av.",
      serves: "4",
      time: "15 minutter",
      serve: "Varm, i boller, med mer olivenolje og salt på bordet.",
      ingredients: {
        gfpasta: "400 g",
        salt: "1 ss, til vannet",
        oil: "3 ss",
      },
      method: [
        {
          text: "Kok opp en stor kjele vann og salt det godt.",
          why: "Det saltede vannet er det eneste krydderet selve pastaen får.",
          wait: "10 min",
        },
        {
          text: "Ha i pastaen, rør med en gang og kok den så lenge pakken sier, med en røring nå og da. Smak på en bit et minutt før.",
          why: "Glutenfri pasta setter seg fast det første minuttet og blir fort myk til slutt, så rør tidlig og smak tidlig.",
          wait: "8–10 min",
        },
        {
          text: "Hell av og vend den med en gang i olivenoljen.",
          why: "Glutenfri pasta stivner og klumper seg når den kjølner; oljen holder den løs.",
        },
      ],
      table: {
        gluten: "Vanlig pasta er hvete; bruk glutenfri pasta, og kok den i sin egen kjele med vann.",
        egg: "Noe glutenfri pasta lages med egg — velg en av mais eller ris uten.",
        dairy: "Melkefri slik den står. Revet ost legges på ved bordet, bare på tallerkener som tåler det.",
      },
    },

    plainnoodles: {
      name: "Risnudler",
      line: "Myke risnudler med litt olje og salt.",
      story: "Nudlene fra phở-bollen, uten kraften — til barnet som vil ha nudler, men ikke suppe. Klare på den tiden det tar å koke opp vannkokeren.",
      serves: "4",
      time: "10 minutter",
      serve: "Lune, i små boller, ved siden av phở eller hva som helst annet.",
      ingredients: {
        ricenoodles: "300 g",
        oil: "1–2 ss",
        salt: "en klype",
      },
      method: [
        {
          text: "Legg nudlene i en bolle og dekk dem med nykokt vann. La dem ligge til de er myke, så lenge pakken sier.",
          why: "Risnudler trenger bare å bløtlegges, ikke kokes; kokt blir de bløte og går i stykker.",
          prep: { ricenoodles: "bløtlagt" },
          wait: "5–8 min",
        },
        {
          text: "Hell av, skyll dem kort i varmt vann og vend dem med olje og salt.",
          why: "Skyllingen vasker av stivelse så de ikke klumper seg; oljen holder dem fra hverandre på tallerkenen.",
        },
      ],
    },

    vegsticks: {
      name: "Grønnsaksstaver",
      line: "Rå gulrot, agurk og rød paprika, skåret i staver.",
      story: "Grønnsakene som settes på bordet hver gang, hvem som enn spiser dem. Noen kvelder går bare gulrøttene, og det er greit — de står der igjen i morgen.",
      serves: "4",
      time: "10 minutter",
      serve: "Midt på bordet, før og under middagen.",
      ingredients: {
        carrot: "2",
        cucumber: "½",
        pepper: "1",
      },
      method: [
        {
          text: "Skrell gulrøttene og skjær dem i fingerlange staver.",
          prep: { carrot: "i staver" },
        },
        {
          text: "Skjær agurken og paprikaen i staver av samme størrelse, og ta ut frøene i paprikaen.",
          why: "Skjær agurken til sist, så den ikke blir bløt og våt mens den venter.",
          prep: { cucumber: "i staver", pepper: "i staver" },
        },
        {
          text: "Legg dem i hver sin haug på et fat.",
          why: "Egne hauger lar en forsiktig spiser ta bare den ene de liker, uten at noe annet har vært borti den.",
        },
      ],
    },

    peascorn: {
      name: "Erter og mais",
      line: "Frosne erter og mais, kokt i noen få minutter.",
      story: "To farger i en bolle, søte nok til at barn spiser dem med skje. Fra fryseren til bordet på fem minutter.",
      serves: "4",
      time: "5 minutter",
      serve: "Varme, i en bolle med en skje i.",
      ingredients: {
        peas: "200 g frosne",
        sweetcorn: "200 g frosne",
        salt: "en klype",
      },
      method: [
        {
          text: "Kok opp en liten kjele vann med saltet.",
          wait: "5 min",
        },
        {
          text: "Ha i ertene og maisen rett fra fryseren, kok i tre minutter, og hell av.",
          why: "Bare så vidt kokt holder de seg søte og klare i fargen; lenger, og ertene blir grå og rynkete.",
          wait: "3 min",
        },
      ],
      table: {
        dairy: "Melkefri slik den står. Noen frosne grønnsaksblandinger kommer i smørsaus — bruk rene poser. En klatt smør går bare på tallerkenene som tåler det.",
      },
    },

    corncobs: {
      name: "Maiskolber",
      line: "Hele kolber kokt til de er søte og møre, spist med hendene.",
      story: "En grønnsak du har lov til å holde i, og derfor prøver selv en motvillig spiser den. Delt i to passer kolbene til små hender.",
      serves: "4",
      time: "15 minutter",
      serve: "Varme, på et fat, til å spise med hendene.",
      ingredients: {
        corncob: "4, delt i to",
        salt: "til servering",
        oil: "litt, til servering",
      },
      method: [
        {
          text: "Kok opp en stor kjele vann. Dra av eventuelle blader og tråder, og del kolbene i to.",
          why: "Ikke salt i vannet — det gjør kornene seige. Saltet kommer på ved bordet.",
          prep: { corncob: "delt i to" },
          wait: "10 min",
        },
        {
          text: "Kok kolbene til kornene er klart gule og møre.",
          why: "Fersk mais trenger bare noen få minutter; eldre kolber og frosne trenger nærmere ti.",
          wait: "5–10 min",
        },
        {
          text: "Løft dem opp, pensle dem med litt olivenolje og dryss over salt.",
        },
      ],
      table: {
        dairy: "Melkefri med olivenolje. Mais får som regel smør — sett smøret ved siden av til tallerkenene som tåler det.",
      },
    },
  },
};
