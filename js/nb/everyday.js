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
    fridge: { name: "Kjøleskapet", note: "Smør, melk og egg" },
    freezer: { name: "Fryseren", note: "Plukket og frosset, klart på minutter" },
  },

  ingredients: {
    /* -------------------------------------------------------- cupboard */
    rice: {
      name: "Ris",
      info: "Langkornet hvit ris, det enkleste i skapet og det de fleste barn aldri sier nei til. Naturlig glutenfri.",
    },
    pasta: {
      name: "Pasta",
      info: "Vanlig tørket pasta av durumhvete. Den enkle middagen de fleste barn ville valgt — og ikke glutenfri.",
    },
    gfpasta: {
      name: "Glutenfri pasta",
      info: "Laget av mais, ris eller begge deler i stedet for hvete: den frie utgaven av pastaen. Noen merker tilsetter egg for å holde den sammen, så sjekk pakken hvis egg betyr noe ved ditt bord.",
    },
    ricenoodles: {
      name: "Risnudler",
      info: "Tynne eller flate nudler av ris og vann, myke på noen minutter i varmt vann. Naturlig glutenfrie — men verdt et blikk på etiketten likevel.",
    },
    oil: {
      name: "Olivenolje",
      info: "Den melkefrie erstatningen for smør: i mosen, over pastaen, på potetene. En nøytral olje går fint til å steke risen.",
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

    /* ---------------------------------------------------------- fridge */
    butter: {
      name: "Smør",
      info: "En klatt på varme poteter, pasta eller mais er det som får enkel mat til å smake hjemme. Olivenolje gjør samme jobben på en melkefri tallerken.",
    },
    milk: {
      name: "Melk",
      info: "Varmet og rørt inn i potetmos for å gjøre den myk. Litt av kokevannet fra potetene gjør det samme uten melk.",
    },
    eggs: {
      name: "Egg",
      info: "Rørt inn i stekt ris i små, gylne biter. Lett å droppe, eller å røre for seg til en tallerken uten egg.",
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
      name: "Stekt ris med egg",
      line: "Gårsdagens ris stekt med egg, erter, gulrot og vårløk.",
      story: "Den beste bruken av rester av ris, og raskt nok til en hverdag. De små gylne eggbitene er det barna plukker ut først.",
      serves: "4",
      time: "15 minutter",
      serve: "Varm, med flasken med tamari på bordet.",
      ingredients: {
        rice: "600 g kokt, kald (av 250 g rå)",
        oil: "2 ss",
        carrot: "2, i terninger",
        eggs: "2, sammenvispet",
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
          text: "Skyv gulroten til side, hell egget i det tomme feltet og rør til det så vidt har stivnet i myke biter.",
          why: "Stekt for seg først holder egget seg i biter i stedet for å legge seg rundt hvert riskorn.",
          prep: { eggs: "sammenvispet" },
          wait: "1 min",
        },
        {
          text: "Ha i den kalde risen, del opp eventuelle klumper, og stek under omrøring til den er varm helt gjennom. Ha i ertene de siste to minuttene.",
          why: "Kald ris fra i går har tørket litt, så den stekes i stedet for å dampe seg til grøt.",
          prep: { rice: "kokt og kald" },
          wait: "5 min",
        },
        {
          text: "Rør inn tamari og vårløk og server med en gang.",
          why: "Tamari i stedet for soyasaus, som er brygget med hvete. Litt holder til en barnetallerken.",
          prep: { springonion: "i skiver" },
        },
      ],
      table: {
        egg: "Dropp egget for en eggfri wok — eller rør det sammen i en egen panne og bland det bare inn i de andre tallerkenene.",
        gluten: "Glutenfri så lenge tamarien er det — sjekk etiketten. Vanlig soyasaus inneholder hvete.",
      },
    },

    boiledpotatoes: {
      name: "Kokte poteter",
      line: "Poteter kokt i saltet vann til de akkurat er møre, med en klatt smør.",
      story: "Det enkleste på et norsk middagsbord, og det som oftest passer til alt. Små poteter kan kokes hele med skallet på.",
      serves: "4",
      time: "30 minutter",
      serve: "Varme, til hovedretten.",
      ingredients: {
        potato: "1 kg",
        salt: "1 ts",
        butter: "en klatt",
      },
      method: [
        {
          text: "Skrell potetene, eller bare skrubb dem hvis de er små, og del store i to så alle er omtrent like store.",
          why: "Biter av samme størrelse blir ferdige samtidig, så ingen faller fra hverandre mens andre fortsatt er harde.",
          prep: { potato: "skrelt" },
        },
        {
          text: "Dekk dem med kaldt vann, ha i saltet og kok opp, og la dem så småkoke til en kniv glir lett inn.",
          why: "Med kaldt vann i starten koker de jevnt utenfra og inn.",
          wait: "20 min",
        },
        {
          text: "Hell godt av, la dem dampe seg tørre i et minutt, og vend dem i smøret.",
        },
      ],
      table: {
        dairy: "Vend de melkefrie potetene i olivenolje i stedet for smør — eller ta dem ut før smøret kommer i.",
      },
    },

    mash: {
      name: "Potetmos",
      line: "Myk potetmos med varm melk og smør.",
      story: "Den kan spises med skje og er myk, og det er derfor den minste liker den. Den ene regelen er å røre den for hånd, aldri med stavmikser.",
      serves: "4",
      time: "30 minutter",
      serve: "I en varm bolle, med litt mer smør på toppen.",
      ingredients: {
        potato: "1 kg melne",
        milk: "150–200 ml",
        butter: "50 g",
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
          text: "Hell av potetene og mos dem i kjelen med smøret.",
          why: "Smøret går i først, mens de er varmest, så det smelter inn i alt.",
        },
        {
          text: "Varm melken og rør den inn litt om gangen til mosen er myk, og smak til med salt.",
          why: "Varm melk holder mosen varm; kald melk gjør den seig. Rør med en sleiv, ikke stavmikser.",
        },
      ],
      table: {
        dairy: "Til en melkefri bolle: ta vare på en kopp av kokevannet og mos med olivenolje og det vannet i stedet for smør og melk — ta porsjonen ut før smøret kommer i.",
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
      name: "Pasta med smør",
      line: "Enkel pasta vendt i smør og en klype salt.",
      story: "Middagen noen barn ville valgt hver dag hvis de fikk spørsmålet. Enkel pasta og smør, og ingenting på som noen må plukke av.",
      serves: "4",
      time: "15 minutter",
      serve: "Varm, i boller.",
      ingredients: {
        pasta: "400 g",
        salt: "1 ss, til vannet",
        butter: "30–40 g",
      },
      method: [
        {
          text: "Kok opp en stor kjele vann og salt det godt.",
          why: "Det saltede vannet er det eneste krydderet selve pastaen får.",
          wait: "10 min",
        },
        {
          text: "Ha i pastaen, rør med en gang og kok den så lenge pakken sier, med en røring nå og da.",
          why: "Røring det første minuttet hindrer at den kleber seg sammen.",
          wait: "8–10 min",
        },
        {
          text: "Hell av og vend den med en gang i smøret til det smelter.",
        },
      ],
      table: {
        gluten: "Kok glutenfri pasta til den glutenfrie tallerkenen, i sin egen kjele med vann — og sjekk at den er eggfri, for noe lages med egg. Den kleber tidlig og blir fort myk, så rør tidlig og smak tidlig.",
        dairy: "Vend den melkefrie porsjonen i olivenolje i stedet for smør.",
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
      line: "Frosne erter og mais, kokt i noen få minutter og vendt i smør.",
      story: "To farger i en bolle, søte nok til at barn spiser dem med skje. Fra fryseren til bordet på fem minutter.",
      serves: "4",
      time: "5 minutter",
      serve: "Varme, i en bolle med en skje i.",
      ingredients: {
        peas: "200 g frosne",
        sweetcorn: "200 g frosne",
        salt: "en klype",
        butter: "en liten klatt",
      },
      method: [
        {
          text: "Kok opp en liten kjele vann med saltet.",
          wait: "5 min",
        },
        {
          text: "Ha i ertene og maisen rett fra fryseren og kok i tre minutter.",
          why: "Bare så vidt kokt holder de seg søte og klare i fargen; lenger, og ertene blir grå og rynkete.",
          wait: "3 min",
        },
        {
          text: "Hell av og vend dem i smøret.",
        },
      ],
      table: {
        dairy: "Dropp smøret, eller bruk litt olivenolje i stedet — rene erter og mais trenger ingenting. Noen frosne blandinger kommer i smørsaus; rene poser er bare grønnsaker.",
      },
    },

    corncobs: {
      name: "Maiskolber",
      line: "Hele kolber kokt til de er søte og møre, smurt med smør og spist med hendene.",
      story: "En grønnsak du har lov til å holde i, og derfor prøver selv en motvillig spiser den. Delt i to passer kolbene til små hender.",
      serves: "4",
      time: "15 minutter",
      serve: "Varme, på et fat, til å spise med hendene.",
      ingredients: {
        corncob: "4, delt i to",
        butter: "til servering",
        salt: "til servering",
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
          text: "Løft dem opp, smør dem med smør og dryss over salt.",
        },
      ],
      table: {
        dairy: "Pensle de melkefrie kolbene med litt olivenolje i stedet, eller server dem med bare salt.",
      },
    },
  },
};
