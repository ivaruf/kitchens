/*
 * nb/vietnam.js — bokmål for the Vietnamese kitchen.
 * Overlaid on js/vietnam.js by id (and recipe steps by position); anything
 * missing falls back to English.
 */
export const NB_VIETNAM = {
  kitchen: {
    name: "Det vietnamesiske kjøkkenet",
    intro: "Salt, surt, søtt og sterkt, i balanse i hver bolle — og urter i fulle fat. Trykk på hva som helst for å lese om det.",
  },

  shelves: {
    herbs: { name: "Friske urter", note: "I fulle fat, plukket ved bordet" },
    spices: { name: "Krydder", note: "Ristet tørt til de dufter" },
    market: { name: "Fra markedet", note: "Kjøpt i morges, laget i kveld" },
    dry: { name: "Ris i alle former", note: "Nudler, papir og selve kornet" },
    bottles: { name: "Sauser og sukker", note: "Salt, søtt — og det som skjuler hvete" },
    cold: { name: "Kjøtt og sjømat", note: "Fra elva og markedsboden" },
  },

  ingredients: {
    /* ------------------------------------------------------------- herbs */
    thaibasil: {
      name: "Thaibasilikum",
      info: "Lilla stilker og en duft av anis. Revet over phở ved bordet, aldri kokt i kraften.",
    },
    coriander: {
      name: "Koriander",
      info: "Blader og myke stilker, drysset over nesten alt til slutt. Den mister poenget sitt hvis den koker.",
    },
    mint: {
      name: "Mynte",
      info: "En av de mange urtene som rulles inn i gỏi cuốn og legges i hauger ved siden av hver nudelrett — spist som en grønnsak, ikke som pynt.",
    },
    springonion: {
      name: "Vårløk",
      info: "Skåret tynt over en bolle phở eller en gryte braisert fisk, med de grønne toppene til sist så de holder fargen.",
    },

    /* ------------------------------------------------------------ spices */
    staranise: {
      name: "Stjerneanis",
      info: "Lukten av phở. Ristes i tørr panne til den dufter før den går i kraften — noen få stjerner smaker en hel gryte.",
    },
    cassia: {
      name: "Kassiabark",
      info: "Vietnams kanel: tykkere, grovere og kraftigere enn ceylonkanel. Ristes sammen med stjerneanisen til phở.",
    },
    cloves: {
      name: "Nellik",
      info: "Noen få i krydderposen til phở, ristet med resten. Kraftig — tre eller fire holder til en hel gryte kraft.",
    },
    blackpepper: {
      name: "Sort pepper",
      info: "Vietnam dyrker mer pepper enn noe annet land i verden, og pepperen fra Phú Quốc er berømt. Brukes raust — en braisert fisk skal smake pepper.",
    },

    /* ------------------------------------------------------------ market */
    shallots: {
      name: "Sjalottløk",
      info: "Små lilla sjalottløk, skåret i skiver til marinader og stekt sprø til topping. Søtere og mildere enn vanlig løk.",
    },
    garlic: {
      name: "Hvitløk",
      info: "Stekes noen sekunder i varm olje til den er gyllen når det skal wokes — lenger, og den blir bitter. Rå og finhakket flyter den i nước chấm.",
    },
    ginger: {
      name: "Ingefær",
      info: "Til phở svis den hel over åpen flamme til den er svart her og der, og da blir styrken søt og røykaktig.",
    },
    onion: {
      name: "Løk",
      info: "Svis med skallet på over flammen sammen med ingefæren, og trekker så i phở-kraften i timevis. Den gir sødme og farge.",
    },
    chilli: {
      name: "Rød chili",
      info: "Små, sterke chili (bird's eye), skåret i nước chấm eller satt på bordet så hver enkelt kan ta selv. Styrken velger du ved bollen.",
    },
    lime: {
      name: "Lime",
      info: "Det sure i salt-surt-søtt-sterkt. Presses over phở ved bordet og i nước chấm, alltid fersk.",
    },
    beansprouts: {
      name: "Bønnespirer",
      info: "Mungbønnespirer, lagt rå i phở for knasets skyld, der den varme kraften så vidt får dem til å falle sammen.",
    },
    lettuce: {
      name: "Salat",
      info: "Myke blader å rulle inn i: det første laget i en fersk vårrull, og bladet du pakker en munnfull inn i ved bordet.",
    },
    waterspinach: {
      name: "Vannspinat",
      info: "Morning glory: hule, sprø stilker og myke blader, Vietnams hverdagsgrønnsak. Wokes på noen minutter med hvitløk.",
    },

    /* --------------------------------------------------------------- dry */
    ricenoodles: {
      name: "Flate risnudler",
      info: "De flate nudlene phở har fått navnet sitt etter. Laget av ris og dermed naturlig glutenfrie — men verdt et blikk på etiketten likevel.",
    },
    vermicelli: {
      name: "Risvermicelli",
      info: "Tynne, runde risnudler, kokt, skylt i kaldt vann og spist romtemperert i ruller og nudelsalater.",
    },
    ricepaper: {
      name: "Rispapir",
      info: "Sprø ark av ris (og ofte tapioka) som mykner på et sekund i lunkent vann. Glutenfrie etter den vanlige oppskriften; sjekk pakken.",
    },
    sugar: {
      name: "Sukker",
      info: "Søtt er én av de fire smakene hver vietnamesisk rett balanserer, ikke en ettertanke — og smeltet til mørk karamell er det et krydder i seg selv.",
    },

    /* ----------------------------------------------------------- bottles */
    fishsauce: {
      name: "Fiskesaus",
      info: "Ansjos og salt, fermentert i et år eller mer: saltet og dybden i hele kjøkkenet. Som oftest er det bare det, men noen merker tilsetter smakstilsetninger med hvete — les etiketten.",
    },
    neutraloil: {
      name: "Matolje",
      info: "En nøytral olje til woking på høy varme, der olivenolje ville blitt brent og smakt feil.",
    },
    soysauce: {
      name: "Soyasaus",
      info: "Brygget på soyabønner og hvete, så den er ikke glutenfri med mindre flasken sier det (tamari gjør det som regel). I Vietnam er den det vegetariske kjøkkenets fiskesaus.",
    },
    hoisin: {
      name: "Hoisinsaus",
      info: "Søt, mørk og tykk, klemt over phở i sør og rørt inn i peanøttdippen til ferske vårruller. Nesten alle merker inneholder hvete.",
    },

    /* -------------------------------------------------------------- cold */
    beef: {
      name: "Storfekjøtt og margbein",
      info: "Marg- og knokebein til kraften, bryst som trekker i den, og rå ytrefilet skåret papirtynt som garer i bollen når den kokende kraften helles over.",
    },
    prawns: {
      name: "Reker",
      info: "Pocheres et minutt eller to til de så vidt er rosa, og deles så på langs så stripene synes gjennom rispapiret.",
    },
    fish: {
      name: "Malle",
      info: "Elvefisk fra Mekongdeltaet, skåret i tykke skiver tvers gjennom beinet, som holder seg hele gjennom en lang braisering.",
    },
  },

  recipes: {
    pho: {
      name: "Phở bò",
      line: "Nudelsuppe med storfekjøtt: en klar, krydret kraft helt kokende over risnudler og tynne skiver kjøtt.",
      story: "Født i nord tidlig i forrige århundre, og nå spist overalt, til alle døgnets tider, ofte til frokost. Kraften tar hele dagen; bollen tar ett minutt; urtene legges i av den som skal spise.",
      serves: "4",
      time: "4 timer eller mer, mest småkoking",
      serve: "Med et fat bønnespirer, thaibasilikum, lime og chili som alle kan ta av — og hoisin og chilisaus på bordet.",
      ingredients: {
        beef: "1,5 kg bein, 500 g bryst, 200 g ytrefilet",
        onion: "1, med skallet på",
        ginger: "en tommellang bit",
        staranise: "5 stjerner",
        cassia: "1 bit",
        cloves: "4",
        sugar: "1 ss (kandissukker om du har)",
        fishsauce: "3–4 ss",
        ricenoodles: "400 g flate",
        beansprouts: "2 never",
        thaibasil: "en bunt",
        coriander: "en bunt",
        springonion: "4, i skiver",
        lime: "2, i båter",
        chilli: "2, i skiver",
      },
      method: [
        {
          text: "Dekk beina og brystet med kaldt vann, la det koke i fem minutter, og hell så av og skyll alt sammen.",
          why: "Slik kaster du det grå skummet før den egentlige kraften begynner. Det er den første hemmeligheten bak en klar phở.",
          prep: { beef: "forvellet og skylt" },
          wait: "5 min",
        },
        {
          text: "Svi løken og ingefæren over flamme eller under grillelementet til de er svarte her og der. Rist stjerneanis, kassia og nellik i tørr panne til det dufter.",
          why: "Svidd blir løk og ingefær søte og røykaktige; ristingen vekker krydderne. Begge deler er der dybden i phở kommer fra.",
          prep: { onion: "svidd", ginger: "svidd" },
          wait: "10 min",
        },
        {
          text: "Ha alt i en stor gryte med rundt fire liter vann og sukkeret. Hold det på så vidt småkok, og skum, i minst tre timer. Løft ut brystet når det er mørt.",
          why: "La det aldri koke opp: koking pisker fett og skum tilbake i kraften og gjør den grumsete. Lavt og langsomt er det som holder den klar.",
          wait: "3 timer eller mer",
        },
        {
          text: "Sil kraften og smak den til med fiskesaus. Smak; den skal være litt saltere enn du ville drukket den alene.",
          why: "Fiskesausen går i mot slutten, så aromaen overlever. Nudlene tynner den ut i bollen.",
        },
        {
          text: "Bløtlegg nudlene i varmt vann, fordel dem i boller med skiver av bryst og rå ytrefilet, og hell den kokende kraften over. Topp med vårløk og koriander.",
          why: "Kraften må koke: den garer det rå kjøttet i bollen på sekunder.",
          prep: {
            ricenoodles: "bløtlagt",
            springonion: "i skiver",
            coriander: "plukket",
            beansprouts: "skylt",
            thaibasil: "plukket",
            lime: "i båter",
            chilli: "i skiver",
          },
        },
      ],
      table: {
        gluten: "Kraften og risnudlene er glutenfrie; sjekk etiketten på fiskesausen. Hoisinsausen på bordet inneholder nesten alltid hvete — la den være i den glutenfrie bollen.",
      },
    },

    nuoccham: {
      name: "Nước chấm",
      line: "Dippesausen: fiskesaus, lime, sukker, hvitløk og chili, i balanse.",
      story: "På hvert vietnamesisk bord, til vårruller, grillet kjøtt, ris og nudler. Hver familie har sine egne forhold; det de deler, er balansen mellom salt, surt, søtt og sterkt — som er hele kjøkkenet i én bolle.",
      serves: "en liten bolle",
      time: "5 minutter",
      serve: "I små boller ved siden av ruller, grillet kjøtt eller ris.",
      ingredients: {
        sugar: "2–3 ss",
        fishsauce: "3 ss",
        lime: "3 ss saft",
        garlic: "2 fedd, finhakket",
        chilli: "1, finhakket",
      },
      method: [
        {
          text: "Rør sukkeret ut i seks spiseskjeer varmt vann til det har løst seg helt opp.",
          why: "Sukker som ikke er løst opp, synker til bunns, og sausen smaker skarpt og så plutselig søtt. Varmt vann smelter det på sekunder.",
        },
        {
          text: "Tilsett limesaften og fiskesausen. Smak, og juster til ingen smak vinner: salt, surt og søtt skal komme samtidig.",
          why: "Dette er kunsten, mer enn oppskriften. For salt: mer vann og lime; for skarpt: litt sukker.",
          prep: { lime: "presset" },
        },
        {
          text: "Tilsett hvitløk og chili til sist.",
          why: "Når de kommer sist i en søtet saus, flyter de i overflaten — kjennetegnet på en godt laget nước chấm.",
          prep: { garlic: "finhakket", chilli: "finhakket" },
        },
      ],
      table: {
        gluten: "Glutenfri hvis fiskesausen er det — de fleste er bare ansjos og salt, men sjekk etiketten.",
      },
    },

    goicuon: {
      name: "Gỏi cuốn",
      line: "Ferske vårruller: reker, risnudler og urter rullet inn i mykt rispapir.",
      story: "Ingenting er fritert og ingenting er varmt: en sommerrull handler om urtene og det myke, gjennomskinnelige skallet, med de rosa rekene synlige gjennom.",
      serves: "4 (12 ruller)",
      time: "Omtrent 40 minutter",
      serve: "Med en gang, med nước chấm — eller peanøtt- og hoisindippen.",
      ingredients: {
        ricepaper: "12 ark",
        prawns: "12 store",
        vermicelli: "100 g",
        lettuce: "1 hode smørsalat",
        mint: "en bunt",
        coriander: "en bunt",
        fishsauce: "til nước chấm",
      },
      method: [
        {
          text: "Kok risvermicellien, skyll den i kaldt vann og la den renne godt av.",
          why: "Skyllingen stopper kokingen og vasker bort stivelsen, så den ikke klumper seg inni rullen.",
          prep: { vermicelli: "kokt og skylt" },
          wait: "4 min",
        },
        {
          text: "Pocher rekene et minutt eller to til de er rosa, og rens og del dem så på langs.",
          why: "Delt ligger de flatt — og lagt med snittflaten opp mot papiret synes stripene gjennom den ferdige rullen.",
          prep: { prawns: "pochert og delt" },
          wait: "2 min",
        },
        {
          text: "Dypp et rispapirark i lunkent vann i et sekund eller to og legg det på en fjøl. Det fortsetter å mykne mens du fyller det.",
          why: "For lenge i vannet, og det revner; det skal fortsatt kjennes litt stivt når du løfter det opp.",
          prep: { ricepaper: "dyppet" },
        },
        {
          text: "Legg på salat, nudler og urter, og rekene øverst. Brett inn sidene og rull stramt.",
          why: "Stramt er alt — en løs rull faller fra hverandre ved første dypp.",
          prep: { lettuce: "i blader", mint: "plukket", coriander: "plukket" },
        },
      ],
      table: {
        gluten: "Rullene er glutenfrie. Den vanlige peanøtt- og hoisindippen er det ikke: server dem med nước chấm i stedet.",
      },
    },

    cakho: {
      name: "Cá kho tộ",
      line: "Malle braisert i leirgryte med karamell, fiskesaus og masse sort pepper.",
      story: "En hjemmerett fra Mekongdeltaet i sør, laget i den samme lille leirgryta den serveres i. Salt, klissete, pepret, og ment å spises med mye kokt ris.",
      serves: "4, med ris",
      time: "Omtrent 1 time",
      serve: "I gryta, med kokt ris og kokte grønnsaker.",
      ingredients: {
        fish: "500 g i skiver",
        fishsauce: "3 ss",
        sugar: "3 ss",
        shallots: "3, i skiver",
        garlic: "3 fedd, finhakket",
        blackpepper: "masse, nykvernet",
        chilli: "1–2",
        springonion: "2, i skiver",
        neutraloil: "1 ss",
      },
      method: [
        {
          text: "Vend fisken i fiskesaus, sjalottløk, hvitløk og mye pepper, og la den stå en halvtime.",
          prep: { fish: "i skiver", shallots: "skåret i skiver", garlic: "finhakket" },
          wait: "30 min",
        },
        {
          text: "Smelt sukkeret i leirgryta med en skvett vann og oljen, og kok til det blir dypt ravgult.",
          why: "Denne karamellen, nước màu, gir farge og en bittersøt dybde. Går du for langt, blir den bitter — dypt ravgul, ikke svart.",
          wait: "5 min",
        },
        {
          text: "Ha i fisken med marinaden, og vann til den står halvveis opp. La det småkoke på lav varme, snu én gang, til sausen er tykk og klissete.",
          why: "Sausen koker inn rundt fisken til den dekker den som en glasur. Lav varme, ellers svir karamellen seg fast i bunnen.",
          wait: "30–40 min",
        },
        {
          text: "Avslutt med mer pepper, chilien og vårløken.",
          why: "Pepper er en hovedsmak her, ikke bare krydder — vær raus.",
          prep: { chilli: "i skiver", springonion: "i skiver" },
        },
      ],
      table: {
        gluten: "Glutenfri hvis fiskesausen er det — sjekk etiketten.",
      },
    },

    raumuong: {
      name: "Rau muống xào tỏi",
      line: "Vannspinat woket på noen minutter med masse hvitløk.",
      story: "Hverdagsgrønnsaken på et vietnamesisk bord, laget sist så den kommer varm på bordet. Der greske fasolakia koker bønnene myke i en time, er denne ferdig på to minutter og holder seg sprø — to kjøkken, motsatte ideer om hva en kokt grønnsak er.",
      serves: "4, som tilbehør",
      time: "15 minutter",
      serve: "Med en gang, med ris.",
      ingredients: {
        waterspinach: "500 g",
        garlic: "6 fedd, knust",
        neutraloil: "2 ss",
        fishsauce: "1 ss",
        sugar: "en klype",
      },
      method: [
        {
          text: "Skjær vannspinaten i fingerlange biter, hold stilker og blader hver for seg, og vask godt.",
          why: "De hule stilkene trenger lenger tid enn bladene, så de går i først.",
          prep: { waterspinach: "i biter", garlic: "knust" },
        },
        {
          text: "Varm woken til den ryker, ha i oljen og hvitløken og rør noen sekunder til den er gyllen.",
          why: "Hvitløk går fra gyllen til bitter på sekunder ved denne varmen. Noen kokker løfter ut halvparten for å drysse over til slutt.",
          wait: "30 sekunder",
        },
        {
          text: "Ha i stilkene, vend i et minutt, så bladene, fiskesausen og sukkeret, og vend til det så vidt har falt sammen.",
          why: "Høy varme og fart holder den grønn og sprø. Fyller du woken for mye, blir det småkok i stedet — lag den i to omganger om nødvendig.",
          wait: "2 min",
        },
      ],
      table: {
        gluten: "Glutenfri hvis fiskesausen er det. Noen kokker bruker soyasaus eller østerssaus i stedet, og begge inneholder vanligvis hvete.",
      },
    },
  },
};
