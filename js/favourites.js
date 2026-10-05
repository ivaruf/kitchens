/*
 * favourites.js — OUR FAVOURITES: dishes this family has cooked, changed and
 * liked, or found and means to cook. Edited by hand (on GitHub or locally) or
 * by asking Claude; git is the CMS (CLAUDE.md). This is the one content file
 * meant to be written by people who do not read code, so it explains itself.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A FAVOURITE
 *
 * Copy one block in FAVOURITES below, change it, commit. Two kinds:
 *
 *   kind: "own"    A whole recipe of our own (grandma's, a blog, made up).
 *                  Written out in full: ingredients, steps, both languages.
 *
 *   kind: "tweak"  An existing dish the way we make it. Name the dish in
 *                  `base` ("greek/stifado", "vietnam/pho"), and write only
 *                  what we changed:
 *                    amounts   { id: { en, nb } } — a new amount for one
 *                    without   [ids] — what we leave out
 *                    notes     { en, nb } — what we do differently, and why
 *                  Everything else comes from the original, in both
 *                  languages, and the original stays as it is.
 *
 * Every favourite also has:
 *   id         a short name in lowercase, letters and dashes ("ragu-di-legumi")
 *   status     "to-try"  found it, not cooked yet
 *              "loved"   cooked it, we like it
 *   added      the date it went in, "YYYY-MM-DD"
 *   source     { name, url } — where it came from, for credit (optional for
 *              our own inventions). Write the method in our own words, not
 *              copied from the source.
 *   cuisine    which kitchen's week it belongs in ("greek", "vietnam",
 *              "everyday") — or leave it out for "only in a mix".
 *
 * INGREDIENTS are ids. Anything in another kitchen's pantry is borrowed by
 * listing it in PANTRY as `id: "kitchen"` (onion: "greek"); a new ingredient
 * is written out there with its name and a line about it in both languages,
 * what it contains (dairy, egg, gluten) and whether it spoils.
 *
 * STEPS are written per language (text, and a `why` that teaches), and once
 * for both: `prep` (how each thing is prepared, in English — the pictures
 * read it), `add` (what goes into the pot at this step), `heat` (0 off, 1 low,
 * 2 medium, 3 high, "oven"), `wait`, and `sauce` (the colour in the pot).
 * `look` is how the finished dish is drawn: a sauce colour and the pieces in
 * it (see PIECE in js/art.js for what can be drawn).
 * ──────────────────────────────────────────────────────────────────────────
 */

/* Every ingredient a favourite uses: borrowed from a kitchen, or new here. */
export const FAV_PANTRY = {
  onion: "greek",
  carrot: "greek",
  celery: "greek",
  bay: "greek",
  lentils: "greek",
  chickpeas: "greek",
  wine: "greek",
  tomato: "greek",
  oil: "greek",
  salt: "greek",
  blackpepper: "greek",
  rosemary: {
    shelf: "herbs",
    spoils: true,
    en: { name: "Rosemary", info: "Woody and resinous; a little goes a long way. Strip the needles and chop them fine, or put the whole sprig in and fish it out." },
    nb: { name: "Rosmarin", info: "Treaktig og kvaeaktig; litt rekker langt. Riv av nålene og hakk dem fint, eller legg hele kvisten i og ta den opp igjen." },
    swaps: [
      {
        en: { use: "Dried rosemary", amount: "A third as much", changes: "Stronger and dustier; crumble it in early so it softens." },
        nb: { use: "Tørket rosmarin", amount: "En tredjedel så mye", changes: "Sterkere og støvete; smuldre det i tidlig så det blir mykt." },
      },
      {
        en: { use: "Thyme", amount: "The same amount", changes: "Gentler and more herbal, less pine." },
        nb: { use: "Timian", amount: "Samme mengde", changes: "Mildere og mer urteaktig, mindre furu." },
      },
    ],
  },
  sage: {
    shelf: "herbs",
    spoils: true,
    en: { name: "Sage", info: "Soft, grey-green and savoury; it loves beans and brown butter alike. Chopped, it melts into a slow sauce." },
    nb: { name: "Salvie", info: "Myk, grågrønn og krydret; den elsker bønner og brunet smør like mye. Hakket smelter den inn i en langtidskokt saus." },
    swaps: [
      {
        en: { use: "Dried sage", amount: "A third as much", changes: "Mustier; use sparingly or it turns medicinal." },
        nb: { use: "Tørket salvie", amount: "En tredjedel så mye", changes: "Mer innestengt i smaken; bruk lite, ellers smaker det medisin." },
      },
    ],
  },
  butterbeans: {
    shelf: "pulses",
    en: { name: "Butter beans", info: "Large, creamy white beans, sold cooked in tins and jars. Drain and rinse them; they need only warming through." },
    nb: { name: "Smørbønner", info: "Store, kremete hvite bønner, solgt ferdigkokte på boks og glass. Hell av og skyll dem; de trenger bare å varmes gjennom." },
    swaps: [
      {
        en: { use: "Cannellini or other white beans", amount: "The same amount", changes: "Smaller and a little firmer; just as good in the sauce." },
        nb: { use: "Cannellinibønner eller andre hvite bønner", amount: "Samme mengde", changes: "Mindre og litt fastere; like gode i sausen." },
      },
    ],
  },
  stock: {
    shelf: "bottles",
    en: { name: "Vegetable stock", info: "Homemade, or from a cube or carton. Cubes and powders often contain wheat, and some milk — read the label for a free plate." },
    nb: { name: "Grønnsaksbuljong", info: "Hjemmelaget, eller fra terning eller kartong. Terninger og pulver inneholder ofte hvete, og noen melk — les etiketten for en fri tallerken." },
    swaps: [
      {
        en: { use: "Water and a pinch more salt", amount: "The same amount", changes: "Lighter; the wine, tomatoes and herbs carry the flavour anyway." },
        nb: { use: "Vann og en klype mer salt", amount: "Samme mengde", changes: "Lettere; vinen, tomatene og urtene bærer smaken uansett." },
      },
    ],
  },
  gnocchi: {
    shelf: "pulses",
    contains: ["gluten"],
    en: { name: "Potato gnocchi", info: "Little potato dumplings, bought fresh or vacuum-packed. Most contain wheat flour and some contain egg — gluten-free ones exist; read the label." },
    nb: { name: "Potetgnocchi", info: "Små potetdumplings, kjøpt ferske eller vakuumpakket. De fleste inneholder hvetemel og noen egg — glutenfrie finnes; les etiketten." },
    swaps: [
      {
        en: { use: "Gluten-free gnocchi", amount: "The same amount", changes: "Softer and quicker to fall apart; cook them gently and serve at once." },
        nb: { use: "Glutenfri gnocchi", amount: "Samme mengde", changes: "Mykere og faller lettere fra hverandre; kok dem forsiktig og server med en gang." },
      },
      {
        en: { use: "Boiled potatoes or plain rice", amount: "About 500 g", changes: "No longer gnocchi, but the ragù is just as good over them." },
        nb: { use: "Kokte poteter eller ris", amount: "Omtrent 500 g", changes: "Ikke gnocchi lenger, men ragùen er like god over dem." },
      },
    ],
  },
};

/* The shelves this kitchen draws on, in order. */
export const FAV_SHELVES = [
  { id: "herbs", en: { name: "Herbs", note: "What we pick for these" }, nb: { name: "Urter", note: "Det vi plukker til disse" } },
  { id: "market", en: { name: "Vegetables", note: "From any kitchen's market" }, nb: { name: "Grønnsaker", note: "Fra alle kjøkkenenes torg" } },
  { id: "pulses", en: { name: "Beans, lentils and more", note: "Tins, jars and packets" }, nb: { name: "Bønner, linser og mer", note: "Bokser, glass og pakker" } },
  { id: "bottles", en: { name: "Bottles and jars", note: "Oil, wine and stock" }, nb: { name: "Flasker og glass", note: "Olje, vin og buljong" } },
  { id: "spices", en: { name: "Salt and spice", note: "" }, nb: { name: "Salt og krydder", note: "" } },
];

export const FAVOURITES = [
  /* ------------------------------------------------------------------------
   * Ragù di legumi. Added 2026-10-05, to cook later this week: when it has
   * been cooked, change status to "loved" (or take it out), and write in the
   * notes what we changed.
   * ---------------------------------------------------------------------- */
  {
    id: "ragu-di-legumi",
    kind: "own",
    status: "to-try",
    added: "2026-10-05",
    source: { name: "Our Cooking Journey", url: "https://www.ourcookingjourney.com/recipe-pages/ragu-di-legumi-legume-ragu" },
    cuisine: null,
    course: "main",
    vessel: "pot",
    serves: "4",
    key: ["lentils", "chickpeas", "butterbeans", "gnocchi", "tomato"],
    look: { sauce: "#8a3a22", sheen: true, pieces: [["gnocchi", 14], ["lentil", 30], ["chickpea", 10], ["gigante", 6], ["carrot", 4]] },
    ingredients: ["onion", "carrot", "celery", "rosemary", "sage", "bay", "lentils", "chickpeas", "butterbeans", "wine", "tomato", "stock", "gnocchi", "oil", "salt", "blackpepper"],
    en: {
      name: "Ragù di legumi",
      line: "A slow Italian ragù of lentils, chickpeas and butter beans with rosemary, sage and red wine, over potato gnocchi.",
      story: "A meatless ragù with all the depth of the Sunday meat one: three kinds of beans in place of the mince, cooked down with wine and tomato until it clings. Found on Our Cooking Journey; ours to try this week.",
      time: "About 1 hour",
      serve: "Gnocchi stirred straight into the ragù, a thread of olive oil on top.",
      amounts: {
        onion: "1 small, finely diced (soffritto)",
        carrot: "1, finely diced (soffritto)",
        celery: "1 stalk, finely diced (soffritto) — about 200 g of the three together",
        rosemary: "2 small sprigs",
        sage: "2 small sprigs",
        bay: "1 large or 2 small leaves",
        lentils: "150 g cooked brown lentils",
        chickpeas: "150 g cooked",
        butterbeans: "150 g cooked",
        wine: "100 ml red",
        tomato: "a 500 g tin of plum tomatoes",
        stock: "300 ml vegetable stock",
        gnocchi: "500 g potato gnocchi",
        oil: "a good glug, and more to finish",
        salt: "to taste",
        blackpepper: "to taste",
      },
      steps: [
        { text: "Soften the diced onion, carrot and celery in olive oil over a medium heat for about ten minutes.", why: "This is the soffritto, the sweet base of every Italian ragù. Slow and golden, never brown." },
        { text: "Stir in the chopped rosemary and sage, the bay, and some salt and pepper, and cook for five minutes more.", why: "The herbs bloom in the oil, so their flavour goes through the whole sauce rather than sitting on top." },
        { text: "Add the lentils, chickpeas and butter beans and cook for ten minutes, stirring now and then.", why: "Frying the pulses a little lets them take on the soffritto, and some break down to thicken the sauce." },
        { text: "Pour in the wine and let it bubble for a minute. Crush in the tomatoes with your hands, add the stock, and simmer for about thirty minutes, until thick.", why: "The wine lifts the browned bits from the pot; half an hour turns tomatoes and beans into one sauce." },
        { text: "Boil the gnocchi in salted water until they float, lift them into the ragù, and loosen with a splash of their water if needed. Finish with olive oil and taste for salt.", why: "A little of the starchy water makes the sauce coat the gnocchi instead of sitting under them." },
      ],
      table: {
        gluten: "Most gnocchi are wheat. Use gluten-free gnocchi, or serve the ragù over boiled potatoes or rice — and check the stock cube, which often hides wheat.",
        egg: "Some gnocchi contain egg; read the packet, or serve it over potatoes or rice.",
        dairy: "Dairy-free as written; if you use a stock cube, check it for milk.",
      },
    },
    nb: {
      name: "Ragù di legumi",
      line: "En langtidskokt italiensk ragù av linser, kikerter og smørbønner med rosmarin, salvie og rødvin, over potetgnocchi.",
      story: "En kjøttfri ragù med all dybden fra søndagens kjøttsaus: tre slags belgfrukter i stedet for kjøttdeig, kokt inn med vin og tomat til den henger ved. Funnet hos Our Cooking Journey; vår til å prøve denne uka.",
      time: "Omtrent 1 time",
      serve: "Gnocchien rørt rett inn i ragùen, en tråd olivenolje på toppen.",
      amounts: {
        onion: "1 liten, finhakket (soffritto)",
        carrot: "1, finhakket (soffritto)",
        celery: "1 stilk, finhakket (soffritto) — omtrent 200 g av de tre til sammen",
        rosemary: "2 små kvister",
        sage: "2 små kvister",
        bay: "1 stort eller 2 små blad",
        lentils: "150 g kokte brune linser",
        chickpeas: "150 g kokte",
        butterbeans: "150 g kokte",
        wine: "100 ml rød",
        tomato: "1 boks (500 g) hele plommetomater",
        stock: "300 ml grønnsaksbuljong",
        gnocchi: "500 g potetgnocchi",
        oil: "en god skvett, og mer til slutt",
        salt: "etter smak",
        blackpepper: "etter smak",
      },
      steps: [
        { text: "La finhakket løk, gulrot og selleri surre mykt i olivenolje på middels varme i omtrent ti minutter.", why: "Dette er soffritto, den søte bunnen i all italiensk ragù. Sakte og gyllen, aldri brun." },
        { text: "Rør inn hakket rosmarin og salvie, laurbærbladet og litt salt og pepper, og la det steke i fem minutter til.", why: "Urtene trekker ut i oljen, så smaken går gjennom hele sausen i stedet for å ligge oppå." },
        { text: "Ha i linser, kikerter og smørbønner og la det steke i ti minutter, rør innimellom.", why: "Når belgfruktene steker litt, tar de opp smaken av soffritten, og noen faller fra hverandre og tykner sausen." },
        { text: "Hell i vinen og la den boble et minutt. Knus tomatene i med hendene, ha i buljongen og la det småkoke i omtrent tretti minutter, til det er tykt.", why: "Vinen løsner det brunede i bunnen; en halvtime gjør tomater og bønner til én saus." },
        { text: "Kok gnocchien i saltet vann til den flyter opp, løft den over i ragùen og spe med litt av kokevannet om det trengs. Avslutt med olivenolje og smak til med salt.", why: "Litt av det stivelsesrike kokevannet får sausen til å legge seg rundt gnocchien i stedet for å ligge under." },
      ],
      table: {
        gluten: "De fleste gnocchi er laget med hvete. Bruk glutenfri gnocchi, eller server ragùen over kokte poteter eller ris — og sjekk buljongterningen, som ofte skjuler hvete.",
        egg: "Noen gnocchi inneholder egg; les pakken, eller server over poteter eller ris.",
        dairy: "Melkefri slik den står; bruker du buljongterning, sjekk den for melk.",
      },
    },
    // The same five steps, once for both languages: what is prepared, what
    // goes in, the heat, how long, and the colour in the pot.
    steps: [
      { prep: { onion: "finely diced", carrot: "finely diced", celery: "finely diced" }, add: ["oil", "onion", "carrot", "celery"], heat: 2, wait: "10 min", sauce: "#d9a85a" },
      { prep: { rosemary: "chopped", sage: "chopped" }, add: ["rosemary", "sage", "bay", "salt", "blackpepper"], heat: 2, wait: "5 min", sauce: "#c9954a" },
      { add: ["lentils", "chickpeas", "butterbeans"], heat: 2, wait: "10 min", sauce: "#9a6a3a" },
      { prep: { tomato: "crushed by hand" }, add: ["wine", "tomato", "stock"], heat: 1, wait: "30 min", sauce: "#8a3a22" },
      { add: ["gnocchi"], heat: 2, wait: "3 min", sauce: "#8a3a22" },
    ],
  },
];
