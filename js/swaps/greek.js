/*
 * swaps/greek.js — stand-ins for the Greek pantry, for when you do not have it.
 * Each entry is bilingual on purpose: a stand-in is three short lines, and
 * keeping English and bokmål side by side stops them drifting apart.
 *   use      what to use instead
 *   amount   how much, relative to the original
 *   changes  honestly, what it does to the dish
 *   contains needs it brings that the original did not ("dairy", "egg", "gluten"), if any
 * An empty list means there is no honest stand-in; the card says so.
 *
 * Stand-ins may be anything an ordinary Norwegian or British supermarket
 * sells, not only what is on these shelves. Where a free-from swap is as good
 * as any other, it comes first, because the table this is for cooks without
 * dairy, eggs and gluten.
 */
export const SWAPS_GREEK = {
  /* ------------------------------------------------------------ spices */
  oregano: [
    {
      en: { use: "Dried marjoram", amount: "The same amount", changes: "Oregano's gentler cousin: sweeter and softer, less of the hillside bite." },
      nb: { use: "Tørket merian", amount: "Samme mengde", changes: "Oreganoens mildere slektning: søtere og rundere, mindre av den ville skarpheten." },
    },
    {
      en: { use: "Dried thyme", amount: "Half as much", changes: "More resinous and woody; good in stews and beans, odd raw on a salad." },
      nb: { use: "Tørket timian", amount: "Halvparten så mye", changes: "Mer harpiksaktig og treaktig; fint i gryter og bønner, rart rått på salat." },
    },
    {
      en: { use: "Fresh oregano", amount: "About three times as much", changes: "Greener and milder than dried; add it near the end, not at the start." },
      nb: { use: "Fersk oregano", amount: "Omtrent tre ganger så mye", changes: "Grønnere og mildere enn tørket; ha den i mot slutten, ikke i starten." },
    },
  ],
  cinnamon: [
    {
      en: { use: "Ground cinnamon", amount: "¼ teaspoon for one stick", changes: "The same warmth, but it cannot be fished out and slightly clouds the sauce." },
      nb: { use: "Malt kanel", amount: "¼ teskje for én stang", changes: "Samme varme, men den kan ikke fiskes opp og gjør sausen litt grumsete." },
    },
    {
      en: { use: "Ground allspice", amount: "A pinch for one stick", changes: "Warm in the same direction, with more clove and pepper than sweetness." },
      nb: { use: "Malt allehånde", amount: "En klype for én stang", changes: "Varmer i samme retning, men med mer nellik og pepper enn sødme." },
    },
  ],
  allspice: [
    {
      en: { use: "Ground allspice", amount: "¼ teaspoon for five berries", changes: "Same flavour; it disperses at once, so add it with the liquid." },
      nb: { use: "Malt allehånde", amount: "¼ teskje for fem bær", changes: "Samme smak; den fordeler seg straks, så ha den i sammen med væsken." },
    },
    {
      en: { use: "Cinnamon, clove and black pepper", amount: "A small pinch of each", changes: "Rebuilds the blend the name promises; close, if a little louder." },
      nb: { use: "Kanel, nellik og sort pepper", amount: "En liten klype av hver", changes: "Bygger opp blandingen navnet lover; nært, om enn litt kraftigere." },
    },
  ],
  cloves: [
    {
      en: { use: "Ground cloves", amount: "A small pinch for three cloves", changes: "Very strong and impossible to remove; err on the side of too little." },
      nb: { use: "Malt nellik", amount: "En liten klype for tre nellikspiker", changes: "Svært kraftig og umulig å fjerne; ta heller for lite enn for mye." },
    },
    {
      en: { use: "Whole allspice berries", amount: "Two for every clove", changes: "Softer and rounder; the clove note is there but no longer leads." },
      nb: { use: "Hele allehåndebær", amount: "To for hver nellikspiker", changes: "Mykere og rundere; nellikpreget er der, men leder ikke lenger." },
    },
  ],
  bay: [
    {
      en: { use: "A sprig of thyme", amount: "One sprig for two leaves", changes: "A different herb note, but it does the same quiet work in a long simmer." },
      nb: { use: "En kvist timian", amount: "Én kvist for to blader", changes: "En annen urtetone, men den gjør den samme stille jobben i lang koking." },
    },
    {
      en: { use: "Leave it out", amount: "—", changes: "The pot tastes slightly flatter; most people would never notice." },
      nb: { use: "Dropp det", amount: "—", changes: "Gryta smaker litt flatere; de fleste ville aldri merket det." },
    },
  ],
  blackpepper: [
    {
      en: { use: "White pepper", amount: "A little less", changes: "Hotter and earthier, less fragrant; invisible in pale soups like avgolemono." },
      nb: { use: "Hvit pepper", amount: "Litt mindre", changes: "Sterkere og jordligere, mindre aromatisk; usynlig i lyse supper som avgolemono." },
    },
    {
      en: { use: "Ready-ground black pepper", amount: "The same amount", changes: "The heat is there, the bright fragrance of fresh-ground mostly is not." },
      nb: { use: "Ferdigmalt sort pepper", amount: "Samme mengde", changes: "Styrken er der, men duften fra nykvernet pepper er stort sett borte." },
    },
  ],
  parsley: [
    {
      en: { use: "Curly parsley", amount: "The same amount, chopped fine", changes: "Grassier and a little coarser to eat; chop it finer than flat-leaf." },
      nb: { use: "Kruspersille", amount: "Samme mengde, finhakket", changes: "Mer gressaktig og litt grovere i munnen; hakk den finere enn bladpersille." },
    },
    {
      en: { use: "Celery leaves", amount: "Half as much", changes: "Green and fresh but stronger, with celery's savoury bitterness." },
      nb: { use: "Sellerigrønt", amount: "Halvparten så mye", changes: "Grønt og friskt, men kraftigere, med selleriens krydrede bitterhet." },
    },
  ],
  dill: [
    {
      en: { use: "Frozen dill", amount: "The same amount", changes: "Almost as good as fresh in a cooked dish; too limp for a garnish." },
      nb: { use: "Frossen dill", amount: "Samme mengde", changes: "Nesten like god som fersk i kokt mat; for slapp til pynt." },
    },
    {
      en: { use: "Fennel fronds", amount: "The same amount", changes: "The same feathery freshness, with a soft aniseed note dill does not have." },
      nb: { use: "Fenikkelgrønt", amount: "Samme mengde", changes: "Den samme fjærlette friskheten, med en mild anistone dill ikke har." },
    },
    {
      en: { use: "Dried dill", amount: "A third as much", changes: "Keeps little of the fresh scent; add it earlier so it softens." },
      nb: { use: "Tørket dill", amount: "En tredjedel så mye", changes: "Beholder lite av den friske duften; ha den i tidligere så den mykner." },
    },
  ],
  mint: [
    {
      en: { use: "Dried mint", amount: "A third as much", changes: "Greek cooks use it too; earthier, less bright, and it suits the rice well." },
      nb: { use: "Tørket mynte", amount: "En tredjedel så mye", changes: "Brukes også i Hellas; jordligere og mindre frisk, men passer godt i risen." },
    },
    {
      en: { use: "Peppermint", amount: "Half as much", changes: "Cooler and sharper than spearmint, with a toothpaste edge if overdone." },
      nb: { use: "Peppermynte", amount: "Halvparten så mye", changes: "Kjøligere og skarpere enn grønnmynte, og smaker tannkrem om du tar for mye." },
    },
  ],
  salt: [],

  /* ------------------------------------------------------------ market */
  onion: [
    {
      en: { use: "Shallots", amount: "The same weight", changes: "Sweeter and milder, and they soften faster; fiddlier to peel." },
      nb: { use: "Sjalottløk", amount: "Samme vekt", changes: "Søtere og mildere, og de mykner fortere; mer pirk å skrelle." },
    },
    {
      en: { use: "Leek, white and pale green", amount: "The same weight", changes: "Softer and gentler; it melts rather than browns, so the base is paler." },
      nb: { use: "Purre, det hvite og lysegrønne", amount: "Samme vekt", changes: "Mykere og mildere; den smelter heller enn å brunes, så bunnen blir lysere." },
    },
    {
      en: { use: "Red onion", amount: "The same amount", changes: "Slightly sweeter, and it turns a cooked dish a little grey-purple." },
      nb: { use: "Rødløk", amount: "Samme mengde", changes: "Litt søtere, og den gir kokt mat et lett gråfiolett skjær." },
    },
  ],
  pearl: [
    {
      en: { use: "Small shallots, whole", amount: "The same weight", changes: "The usual stand-in: sweet, holds its shape, and keeps stifado's look." },
      nb: { use: "Små sjalottløk, hele", amount: "Samme vekt", changes: "Den vanlige erstatningen: søt, holder formen og beholder stifadoens utseende." },
    },
    {
      en: { use: "Ordinary onions, in wedges", amount: "The same weight", changes: "Tastes right but collapses into the sauce; no longer stifado's look." },
      nb: { use: "Vanlig løk i båter", amount: "Samme vekt", changes: "Smaker riktig, men faller sammen i sausen; ikke lenger stifadoens utseende." },
    },
  ],
  garlic: [
    {
      en: { use: "Garlic purée from a tube or jar", amount: "1 teaspoon per clove", changes: "Fine cooked, flatter and a little sour raw; check the label for additives." },
      nb: { use: "Hvitløkspuré på tube eller glass", amount: "1 teskje per fedd", changes: "Greit i kokt mat, flatere og litt syrlig rå; sjekk innholdslisten." },
    },
    {
      en: { use: "Garlic granules", amount: "¼ teaspoon per clove", changes: "Sweet and mellow, with none of the bite; not enough for skordalia." },
      nb: { use: "Hvitløksgranulat", amount: "¼ teskje per fedd", changes: "Søtt og mildt, uten noe av bettet; ikke nok til skordalia." },
    },
  ],
  tomato: [
    {
      en: { use: "Tinned chopped tomatoes", amount: "One 400 g tin for about 500 g fresh", changes: "Out of season, often better than fresh for cooking; useless raw." },
      nb: { use: "Hermetiske hakkede tomater", amount: "Én boks à 400 g for ca. 500 g ferske", changes: "Utenom sesong ofte bedre enn ferske til koking; ubrukelig rått." },
    },
    {
      en: { use: "Passata", amount: "400 ml for about 500 g fresh", changes: "Smoother and thinner, with no pieces; cook it a little longer to thicken." },
      nb: { use: "Passata", amount: "4 dl for ca. 500 g ferske", changes: "Glattere og tynnere, uten biter; kok litt lenger så den tykner." },
    },
    {
      en: { use: "Cherry tomatoes, halved", amount: "The same weight", changes: "In winter the sweetest raw option for a salad; more skin, less juice." },
      nb: { use: "Cherrytomater, delt i to", amount: "Samme vekt", changes: "Om vinteren det søteste alternativet i salat; mer skall, mindre saft." },
    },
  ],
  lemon: [
    {
      en: { use: "Bottled lemon juice", amount: "2–3 tablespoons per lemon", changes: "Sour enough, but flatter and without the fragrance; add it at the very end." },
      nb: { use: "Sitronsaft på flaske", amount: "2–3 spiseskjeer per sitron", changes: "Sur nok, men flatere og uten duften; ha den i helt til slutt." },
    },
    {
      en: { use: "Lime", amount: "The same amount of juice", changes: "Sharper and more perfumed; lemon potatoes and avgolemono taste of lime." },
      nb: { use: "Lime", amount: "Samme mengde saft", changes: "Skarpere og mer parfymert; sitronpoteter og avgolemono smaker lime." },
    },
    {
      en: { use: "White wine vinegar", amount: "A third as much", changes: "Gives sharpness and nothing else; fine on beans, wrong where lemon leads." },
      nb: { use: "Hvitvinseddik", amount: "En tredjedel så mye", changes: "Gir syre og ikke noe mer; greit på bønner, feil der sitronen er hovedsaken." },
    },
  ],
  carrot: [
    {
      en: { use: "Parsnip", amount: "The same weight", changes: "Sweeter and more perfumed; it softens sooner and colours the soup paler." },
      nb: { use: "Pastinakk", amount: "Samme vekt", changes: "Søtere og mer parfymert; den mykner tidligere og gir suppen lysere farge." },
    },
    {
      en: { use: "Swede", amount: "The same weight", changes: "Earthier, less sweet, with a faint cabbage note; holds its shape well." },
      nb: { use: "Kålrot", amount: "Samme vekt", changes: "Jordligere, mindre søt, med et svakt kålpreg; holder formen godt." },
    },
  ],
  celery: [
    {
      en: { use: "Celeriac, diced", amount: "About half the weight", changes: "The same savoury backbone, earthier; excellent in soup, no leaves for colour." },
      nb: { use: "Sellerirot i terninger", amount: "Omtrent halv vekt", changes: "Den samme krydrede ryggraden, men jordligere; utmerket i suppe, men uten grønt." },
    },
    {
      en: { use: "Celery seed", amount: "A pinch per stalk", changes: "Gives the flavour but none of the body; strong, so go carefully." },
      nb: { use: "Sellerifrø", amount: "En klype per stang", changes: "Gir smaken, men ikke noe fylde; kraftig, så vær forsiktig." },
    },
  ],
  potato: [
    {
      en: { use: "Waxy or all-round potatoes", amount: "The same weight", changes: "Hold their shape but soak up less; lemon potatoes come out firmer, less sticky." },
      nb: { use: "Faste eller allsidige poteter", amount: "Samme vekt", changes: "Holder formen, men suger opp mindre; sitronpotetene blir fastere og mindre klissete." },
    },
    {
      en: { use: "Sweet potato", amount: "The same weight", changes: "Much sweeter and softer, and it fights the lemon; a different dish." },
      nb: { use: "Søtpotet", amount: "Samme vekt", changes: "Mye søtere og bløtere, og den kjemper mot sitronen; en annen rett." },
    },
  ],
  aubergine: [
    {
      en: { use: "Courgette", amount: "The same weight", changes: "Fine in soufico and briam, though watery rather than silky; no melitzanosalata." },
      nb: { use: "Squash", amount: "Samme vekt", changes: "Greit i soufico og briam, men vassen heller enn silkemyk; ikke til melitzanosalata." },
    },
    {
      en: { use: "Large flat mushrooms", amount: "The same weight", changes: "Soak up oil the same way and turn meaty, but taste of mushroom." },
      nb: { use: "Store flate sopper (portobello)", amount: "Samme vekt", changes: "Suger opp olje på samme måte og blir kjøttfulle, men smaker sopp." },
    },
  ],
  courgette: [
    {
      en: { use: "Yellow courgette", amount: "The same weight", changes: "The same vegetable in another colour; nothing changes but the look." },
      nb: { use: "Gul squash", amount: "Samme vekt", changes: "Samme grønnsak i en annen farge; bare utseendet endres." },
    },
    {
      en: { use: "Aubergine", amount: "The same weight", changes: "Gives no water and drinks oil, so add a splash of water and cook longer." },
      nb: { use: "Aubergine", amount: "Samme vekt", changes: "Gir ikke fra seg vann og drikker olje, så tilsett en skvett vann og kok lenger." },
    },
  ],
  pepper: [
    {
      en: { use: "Pointed sweet peppers", amount: "The same weight", changes: "The closest match: thin-skinned and sweet, though usually red, not green." },
      nb: { use: "Spisspaprika", amount: "Samme vekt", changes: "Det nærmeste: tynt skall og søt, men som regel rød, ikke grønn." },
    },
    {
      en: { use: "Green bell pepper", amount: "The same weight", changes: "Thicker-skinned, grassier and a touch bitter; it needs longer to soften." },
      nb: { use: "Grønn paprika", amount: "Samme vekt", changes: "Tykkere skall, mer gressaktig og litt bitter; trenger lenger tid for å mykne." },
    },
    {
      en: { use: "Red or yellow bell pepper", amount: "The same weight", changes: "Sweeter and fruitier, and the dish turns redder." },
      nb: { use: "Rød eller gul paprika", amount: "Samme vekt", changes: "Søtere og mer fruktig, og retten blir rødere." },
    },
  ],
  redonion: [
    {
      en: { use: "Yellow onion, sliced thin and rinsed", amount: "A little less", changes: "Sharper even after rinsing, and without the purple rings." },
      nb: { use: "Gul løk, tynt skåret og skylt", amount: "Litt mindre", changes: "Skarpere selv etter skylling, og uten de lilla ringene." },
    },
    {
      en: { use: "Shallot, sliced thin", amount: "The same amount", changes: "Mild and sweet raw, a good match in everything but colour." },
      nb: { use: "Sjalottløk, tynt skåret", amount: "Samme mengde", changes: "Mild og søt rå; godt egnet i alt unntatt fargen." },
    },
    {
      en: { use: "Spring onions", amount: "The same amount", changes: "Gentler and greener; a fresh topping for fava rather than a bold one." },
      nb: { use: "Vårløk", amount: "Samme mengde", changes: "Mildere og grønnere; et friskt drys på favaen heller enn et kraftig." },
    },
  ],
  springonion: [
    {
      en: { use: "Leek, in thin rounds", amount: "The same weight", changes: "Just as soft and sweet in spanakorizo; a little less green flavour." },
      nb: { use: "Purre i tynne ringer", amount: "Samme vekt", changes: "Like myk og søt i spanakorizo; litt mindre grønn smak." },
    },
    {
      en: { use: "Ordinary onion, chopped", amount: "Half the weight", changes: "Sharper and heavier; soften it longer, and add chives at the end for green." },
      nb: { use: "Vanlig løk, hakket", amount: "Halv vekt", changes: "Skarpere og tyngre; la den surre lenger, og strø over gressløk til slutt." },
    },
  ],
  cucumber: [
    {
      en: { use: "Fennel bulb, sliced thin", amount: "Half the weight", changes: "Gives crunch, but less water and a clear aniseed taste." },
      nb: { use: "Fenikkel, tynt skåret", amount: "Halv vekt", changes: "Gir knas, men mindre saft og en tydelig anissmak." },
    },
    {
      en: { use: "Leave it out", amount: "Add more tomato", changes: "Still a fine tomato salad, just drier and without the cool crunch." },
      nb: { use: "Dropp den", amount: "Ha i mer tomat", changes: "Fortsatt en god tomatsalat, bare tørrere og uten den kjølige knasen." },
    },
  ],
  spinach: [
    {
      en: { use: "Frozen spinach", amount: "About 450 g for 1 kg fresh", changes: "Already wilted, so it goes in later; softer and a little darker." },
      nb: { use: "Frossen spinat", amount: "Ca. 450 g for 1 kg fersk", changes: "Allerede forvellet, så den skal i senere; mykere og litt mørkere." },
    },
    {
      en: { use: "Chard", amount: "The same weight", changes: "Earthier and firmer; chop the stems and give them a head start." },
      nb: { use: "Mangold", amount: "Samme vekt", changes: "Jordligere og fastere; hakk stilkene og gi dem et forsprang." },
    },
    {
      en: { use: "Kale, stems removed", amount: "Two thirds the weight", changes: "Tougher and stronger; cook it longer, and the dish turns darker green." },
      nb: { use: "Grønnkål uten stilker", amount: "To tredjedeler av vekten", changes: "Seigere og kraftigere; kok den lenger, og retten blir mørkere grønn." },
    },
  ],
  greenbeans: [
    {
      en: { use: "Fine green beans", amount: "The same weight", changes: "Thinner, so they soften sooner; take ten minutes off the simmer." },
      nb: { use: "Haricots verts / tynne aspargesbønner", amount: "Samme vekt", changes: "Tynnere, så de mykner fortere; trekk ti minutter fra koketiden." },
    },
    {
      en: { use: "Frozen green beans", amount: "The same weight", changes: "Made for long cooking anyway; they go in straight from frozen." },
      nb: { use: "Frosne grønne bønner", amount: "Samme vekt", changes: "Egner seg uansett til lang koking; kan gå rett i gryta fra frosne." },
    },
  ],

  /* ------------------------------------------------------------ pulses */
  beans: [
    {
      en: { use: "Tinned cannellini or white beans", amount: "One 400 g tin for 100 g dried", changes: "No soaking; add near the end. The broth is thinner, so mash a few to thicken." },
      nb: { use: "Hermetiske hvite bønner", amount: "Én boks à 400 g for 100 g tørre", changes: "Ingen bløtlegging; ha dem i mot slutten. Most noen så kraften tykner." },
    },
    {
      en: { use: "Tinned butter beans", amount: "One 400 g tin for 100 g dried", changes: "Bigger and creamier; they break up if stirred hard." },
      nb: { use: "Hermetiske smørbønner", amount: "Én boks à 400 g for 100 g tørre", changes: "Større og kremete; de går i stykker hvis du rører hardt." },
    },
  ],
  chickpeas: [
    {
      en: { use: "Tinned chickpeas", amount: "One 400 g tin for 100 g dried", changes: "Firmer and less silky; revithada becomes a quick stew, not a slow one." },
      nb: { use: "Hermetiske kikerter", amount: "Én boks à 400 g for 100 g tørre", changes: "Fastere og mindre silkemyke; revithada blir en rask gryte, ikke en langtidsrett." },
    },
    {
      en: { use: "Chickpeas in a jar", amount: "One 400 g jar for 100 g dried", changes: "Usually softer than tinned, closer to a long cook." },
      nb: { use: "Kikerter på glass", amount: "Ett glass à 400 g for 100 g tørre", changes: "Som regel mykere enn hermetiske, nærmere en lang koking." },
    },
  ],
  lentils: [
    {
      en: { use: "Dried green lentils", amount: "The same amount", changes: "Very close; they hold their shape a little better and take a little longer." },
      nb: { use: "Tørre grønne linser", amount: "Samme mengde", changes: "Svært likt; de holder formen litt bedre og trenger litt lenger tid." },
    },
    {
      en: { use: "Tinned lentils", amount: "One 400 g tin for 100 g dried", changes: "Ten minutes instead of forty; a thinner, less earthy soup." },
      nb: { use: "Hermetiske linser", amount: "Én boks à 400 g for 100 g tørre", changes: "Ti minutter i stedet for førti; en tynnere og mindre jordlig suppe." },
    },
    {
      en: { use: "Red lentils", amount: "The same amount", changes: "They collapse to a purée in twenty minutes; a different, smoother soup." },
      nb: { use: "Røde linser", amount: "Samme mengde", changes: "Koker ut til en puré på tjue minutter; en annen, glattere suppe." },
    },
  ],
  gigantes: [
    {
      en: { use: "Tinned butter beans", amount: "One 400 g tin for 100 g dried", changes: "Smaller and softer; skip the simmer and bake for less time." },
      nb: { use: "Hermetiske smørbønner", amount: "Én boks à 400 g for 100 g tørre", changes: "Mindre og mykere; dropp forkokingen og stek kortere tid." },
    },
    {
      en: { use: "Dried butter beans", amount: "The same amount", changes: "Treat them exactly like gigantes; a little smaller, very close." },
      nb: { use: "Tørre smørbønner", amount: "Samme mengde", changes: "Behandles akkurat som gigantes; litt mindre, svært likt." },
    },
  ],
  splitpeas: [
    {
      en: { use: "Red lentils", amount: "The same amount", changes: "A quicker purée, more orange than gold, and a touch less sweet." },
      nb: { use: "Røde linser", amount: "Samme mengde", changes: "En raskere puré, mer oransje enn gyllen, og litt mindre søt." },
    },
    {
      en: { use: "Green split peas", amount: "The same amount", changes: "The same texture, but earthier and a muddy green rather than golden." },
      nb: { use: "Grønne erter, delte", amount: "Samme mengde", changes: "Samme konsistens, men jordligere og grågrønn i stedet for gyllen." },
    },
  ],
  rice: [
    {
      en: { use: "Risotto rice", amount: "The same amount", changes: "Very close; a little creamier, which suits spanakorizo." },
      nb: { use: "Risottoris", amount: "Samme mengde", changes: "Svært likt; litt kremete, noe som passer spanakorizo." },
    },
    {
      en: { use: "Pudding rice", amount: "The same amount", changes: "Shorter and stickier; good in gemista, a little gluey in soup." },
      nb: { use: "Grøtris", amount: "Samme mengde", changes: "Kortere og klissete; godt i gemista, litt grøtete i suppe." },
    },
    {
      en: { use: "Long-grain rice", amount: "The same amount", changes: "Stays in separate grains, so dishes come out drier and less soft." },
      nb: { use: "Langkornet ris", amount: "Samme mengde", changes: "Holder seg i separate korn, så rettene blir tørrere og mindre myke." },
    },
  ],

  /* ----------------------------------------------------------- bottles */
  oil: [
    {
      en: { use: "Rapeseed oil", amount: "The same amount", changes: "Fine for frying, but in ladera the oil is a flavour, and that is lost." },
      nb: { use: "Rapsolje", amount: "Samme mengde", changes: "Greit til steking, men i ladera er oljen en smak, og den forsvinner." },
    },
    {
      en: { use: "Light or blended olive oil", amount: "The same amount", changes: "The right fat, without the fruity, peppery finish; keep any good oil for the top." },
      nb: { use: "Mild olivenolje", amount: "Samme mengde", changes: "Riktig fett, men uten den fruktige, pepprete avslutningen; spar god olje til toppen." },
    },
  ],
  wine: [
    {
      en: { use: "Stock with red wine vinegar", amount: "200 ml stock and 1 tablespoon vinegar", changes: "Lifts the pan and brings sharpness, but less depth; no alcohol at all." },
      nb: { use: "Kraft med rødvinseddik", amount: "2 dl kraft og 1 spiseskje eddik", changes: "Løser opp stekebunnen og gir syre, men mindre dybde; helt uten alkohol." },
    },
    {
      en: { use: "Alcohol-free red wine", amount: "The same amount", changes: "Close in colour and fruit, a little sweeter and thinner." },
      nb: { use: "Alkoholfri rødvin", amount: "Samme mengde", changes: "Nær i farge og frukt, litt søtere og tynnere." },
    },
    {
      en: { use: "Red grape juice with vinegar", amount: "150 ml juice and 2 tablespoons vinegar", changes: "Sweeter; cut back on any other sweetness and taste before serving." },
      nb: { use: "Rød druejuice med eddik", amount: "1,5 dl juice og 2 spiseskjeer eddik", changes: "Søtere; kutt ned på annen sødme og smak til før servering." },
    },
  ],
  vinegar: [
    {
      en: { use: "White wine or cider vinegar", amount: "The same amount", changes: "Sharper and paler; cider vinegar is a little fruity. Avoid malt, it is barley." },
      nb: { use: "Hvitvins- eller eplecidereddik", amount: "Samme mengde", changes: "Skarpere og lysere; eplecidereddik er litt fruktig. Unngå malteddik, den er bygg." },
    },
    {
      en: { use: "Lemon juice", amount: "Twice as much", changes: "Fresher and brighter; right on lentils, softer than vinegar in stifado." },
      nb: { use: "Sitronsaft", amount: "Dobbelt så mye", changes: "Friskere og lysere; riktig på linser, mildere enn eddik i stifado." },
    },
    {
      en: { use: "Balsamic vinegar", amount: "The same amount", changes: "Sweeter and darker; good in stifado, heavy on lentils." },
      nb: { use: "Balsamicoeddik", amount: "Samme mengde", changes: "Søtere og mørkere; god i stifado, tung på linser." },
    },
  ],
  paste: [
    {
      en: { use: "Passata, cooked down", amount: "3 tablespoons per tablespoon of paste", changes: "Brighter and less concentrated; simmer it until thick before the liquid goes in." },
      nb: { use: "Passata, kokt inn", amount: "3 spiseskjeer per spiseskje puré", changes: "Friskere og mindre konsentrert; kok den tykk før væsken skal i." },
    },
    {
      en: { use: "Sun-dried tomatoes, chopped fine", amount: "1 tablespoon per tablespoon of paste", changes: "Deep and concentrated, a little sweet and chewy if not chopped fine." },
      nb: { use: "Soltørkede tomater, finhakket", amount: "1 spiseskje per spiseskje puré", changes: "Dyp og konsentrert, litt søt og seig om de ikke hakkes fint." },
    },
  ],
  olives: [
    {
      en: { use: "Other black olives in brine", amount: "The same amount", changes: "Less winey and fruity; tinned, sliced black olives taste of very little." },
      nb: { use: "Andre svarte oliven i lake", amount: "Samme mengde", changes: "Mindre vinaktige og fruktige; skivede svarte oliven på boks smaker svært lite." },
    },
    {
      en: { use: "Green olives", amount: "The same amount", changes: "Firmer, saltier and more bitter; the salad looks and tastes different." },
      nb: { use: "Grønne oliven", amount: "Samme mengde", changes: "Fastere, saltere og mer bitre; salaten ser og smaker annerledes." },
    },
  ],
  capers: [
    {
      en: { use: "Green olives, chopped", amount: "Twice as much", changes: "Briny and salty in the same way, but milder and less floral." },
      nb: { use: "Grønne oliven, hakket", amount: "Dobbelt så mye", changes: "Salt og syrlig på samme måte, men mildere og mindre blomsteraktig." },
    },
    {
      en: { use: "Cornichons, chopped fine", amount: "The same amount", changes: "Sharp and crunchy, with a pickle's sweetness capers do not have." },
      nb: { use: "Cornichons, finhakket", amount: "Samme mengde", changes: "Syrlige og sprø, med en sødme kapers ikke har." },
    },
  ],
  tahini: [
    {
      en: { use: "Sunflower seed butter", amount: "The same amount", changes: "The sesame-free choice; earthier, and it can turn faintly green with lemon." },
      nb: { use: "Solsikkefrøsmør", amount: "Samme mengde", changes: "Valget uten sesam; jordligere, og kan bli svakt grønt med sitron." },
    },
    {
      en: { use: "Cashew butter", amount: "The same amount", changes: "Creamy and sweeter, less bitter; tree nuts are an allergen of their own." },
      nb: { use: "Cashewsmør", amount: "Samme mengde", changes: "Kremete og søtere, mindre bitter; nøtter er et eget allergen." },
    },
  ],

  /* -------------------------------------------------------------- cold */
  beef: [
    {
      en: { use: "Beef shin", amount: "The same weight", changes: "Even more collagen; give it an extra half hour and the sauce is glossier still." },
      nb: { use: "Okselegg", amount: "Samme vekt", changes: "Enda mer kollagen; gi den en halvtime ekstra, så blir sausen enda blankere." },
    },
    {
      en: { use: "Lamb shoulder", amount: "The same weight", changes: "Richer and sweeter, a Greek stifado in its own right; skim the fat." },
      nb: { use: "Lammebog", amount: "Samme vekt", changes: "Fyldigere og søtere, en ekte gresk stifado i seg selv; skum av fettet." },
    },
    {
      en: { use: "Pork shoulder or neck", amount: "The same weight", changes: "Paler and milder, and done in about two thirds of the time." },
      nb: { use: "Svinebog eller svinenakke", amount: "Samme vekt", changes: "Lysere og mildere, og ferdig på omtrent to tredjedeler av tiden." },
    },
  ],
  chicken: [
    {
      en: { use: "Bone-in thighs and drumsticks", amount: "About 1.2 kg for a whole bird", changes: "Richer meat and still a good broth, with a little more fat to skim." },
      nb: { use: "Kyllinglår og -klubber med bein", amount: "Ca. 1,2 kg for en hel kylling", changes: "Saftigere kjøtt og fortsatt god kraft, med litt mer fett å skumme av." },
    },
    {
      en: { use: "Ready-made chicken stock and cooked chicken", amount: "1.5 litres stock, 400 g meat", changes: "Quick but thinner and saltier; some stock cubes contain wheat, so check the label." },
      nb: { use: "Ferdig kyllingkraft og ferdigstekt kylling", amount: "1,5 liter kraft, 400 g kjøtt", changes: "Raskt, men tynnere og saltere; noen buljongterninger inneholder hvete, så sjekk." },
    },
  ],
  eggs: [
    {
      en: { use: "Tahini, whisked with the lemon", amount: "3–4 tablespoons for 2 eggs", changes: "Silky and nutty rather than eggy; the tahinosoupa way. Sesame is an allergen." },
      nb: { use: "Tahini, pisket med sitronen", amount: "3–4 spiseskjeer for 2 egg", changes: "Silkemyk og nøtteaktig heller enn eggete; slik tahinosoupa lages. Sesam er et allergen." },
    },
    {
      en: { use: "Cornflour, slaked with the lemon", amount: "2 tablespoons for 2 eggs", changes: "Thick and glossy, but thinner in flavour and paler; simmer one minute to cook it." },
      nb: { use: "Maisstivelse (maisenna), rørt ut i sitronen", amount: "2 spiseskjeer for 2 egg", changes: "Tykk og blank, men tynnere i smaken og blekere; la den småkoke ett minutt." },
    },
  ],
  feta: [
    {
      en: { use: "Plant-based feta-style block", amount: "The same amount", changes: "Salty and crumbly, but softer and coconut-rich; read the label for each need." },
      nb: { use: "Plantebasert fetaerstatning", amount: "Samme mengde", changes: "Salt og smuldrete, men mykere og med kokospreg; les innholdslisten for hvert behov." },
    },
    {
      en: { use: "Firm tofu, marinated", amount: "The same weight", changes: "Cubes soaked in lemon, salt, oregano and oil; fresh and salty, not tangy. Soy is an allergen." },
      nb: { use: "Fast tofu, marinert", amount: "Samme vekt", changes: "Terninger i sitron, salt, oregano og olje; frisk og salt, ikke syrlig. Soya er et allergen." },
    },
    {
      en: { use: "Leave it off", amount: "More olives and capers", changes: "The salt comes from the jars instead; the salad loses its creaminess." },
      nb: { use: "Dropp den", amount: "Mer oliven og kapers", changes: "Saltet kommer fra glassene i stedet; salaten mister det kremete." },
    },
  ],
  bread: [
    {
      en: { use: "Gluten-free bread", amount: "The same amount", changes: "Good for wiping the plate, best toasted; use a separate board and toaster." },
      nb: { use: "Glutenfritt brød", amount: "Samme mengde", changes: "Godt til å tørke opp tallerkenen, best ristet; bruk egen fjøl og egen brødrister." },
    },
    {
      en: { use: "Gluten-free crackers or rice cakes", amount: "A few per person", changes: "Fine for dips like fava; useless for soaking up a stew." },
      nb: { use: "Glutenfrie kjeks eller riskaker", amount: "Noen per person", changes: "Fint til dipper som fava; ubrukelig til å suge opp en gryterett." },
    },
  ],
};
