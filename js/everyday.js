/*
 * everyday.js — the everyday kitchen: the plain things that go beside the
 * adventurous one.
 *
 * Every other kitchen here is somewhere else. This one is at home. It exists
 * because a family table rarely eats one cuisine at a time: the grown-ups
 * have the Greek stew or the bowl of phở, and beside it there is a pot of
 * plain rice, a tin of oven chips with ketchup, a plate of carrot sticks —
 * the "boring" food the children will actually eat. The vegetables still get
 * served even when only the nine-year-old takes them and the five-year-old
 * takes only the carrots, because a vegetable that is always on the table is
 * one that is eventually eaten.
 *
 * Same shapes as js/pantry.js and js/recipes.js (see their headers for every
 * field). `native` is Norwegian, because this kitchen's own language is the
 * family's; the bokmål overlay (js/nb/everyday.js) gives the same names.
 *
 * WHY IT IS WRITTEN THE ORDINARY WAY. Every other kitchen here writes its
 * dishes free of dairy, egg and gluten. This one does not, on purpose: these
 * sides are for the children, who eat all three (owner, 2026-10-02), so the
 * pasta is buttered, the fried rice has egg in it and the mash has milk —
 * the way a child expects them. Each dish is still *cookable* free, and the
 * free version is its table note: olive oil for butter, gluten-free pasta
 * (gfpasta stays in the pantry for that), the egg left out of the rice.
 * Written this way round, the plain plate is plain and the careful plate is
 * one note away, instead of every child eating the careful version.
 *
 * What to watch even on the free plate: soy sauce is brewed with wheat (so
 * tamari), gluten-free pasta is sometimes made with egg, and a bottle of
 * ketchup is worth reading.
 */

export const ED_KITCHEN_INTRO =
  "The plain, friendly food that goes beside the adventurous main — rice, potatoes, pasta and a plate of vegetables, for whoever at the table wants it simple.";

export const ED_SHELVES = [
  { id: "cupboard", name: "The cupboard", note: "Dry goods and bottles that keep" },
  { id: "veg", name: "Fresh vegetables", note: "From the bottom drawer of the fridge" },
  { id: "fridge", name: "The fridge", note: "Butter, milk and eggs" },
  { id: "freezer", name: "The freezer", note: "Picked and frozen, ready in minutes" },
];

export const ED_INGREDIENTS = [
  /* ---------------------------------------------------------- cupboard */
  {
    id: "rice",
    name: "Rice",
    native: "ris",
    shelf: "cupboard",
    info: "Long-grain white rice, the plainest thing in the cupboard and the one most children never refuse. Naturally gluten-free.",
  },
  {
    id: "pasta",
    name: "Pasta",
    native: "pasta",
    shelf: "cupboard",
    contains: ["gluten"],
    info: "Ordinary dried pasta, made from durum wheat. The plain dinner most children would choose — and not gluten-free.",
  },
  {
    id: "gfpasta",
    name: "Gluten-free pasta",
    native: "glutenfri pasta",
    shelf: "cupboard",
    info: "Made from corn, rice or both instead of wheat: the free version of the pasta. Some brands add egg to hold it together, so check the packet if egg matters at your table.",
  },
  {
    id: "ricenoodles",
    name: "Rice noodles",
    native: "risnudler",
    shelf: "cupboard",
    info: "Thin or flat noodles made from rice and water, soft in a few minutes in hot water. Naturally gluten-free — still worth a glance at the label.",
  },
  {
    id: "oil",
    name: "Olive oil",
    native: "olivenolje",
    shelf: "cupboard",
    info: "The dairy-free stand-in for butter: in the mash, over the pasta, on the potatoes. A neutral oil is fine for frying the rice.",
  },
  {
    id: "salt",
    name: "Salt",
    native: "salt",
    shelf: "cupboard",
    info: "A pinch in the cooking water is most of what makes plain food taste of something. Children's portions want less than grown-ups'.",
  },
  {
    id: "tamari",
    name: "Tamari",
    native: "tamari",
    shelf: "cupboard",
    info: "Japanese soy sauce, usually brewed without wheat — which ordinary soy sauce is not. Usually gluten-free, but check the label: some are made with a little wheat.",
  },
  {
    id: "ketchup",
    name: "Ketchup",
    native: "ketchup",
    shelf: "cupboard",
    info: "Tomatoes, vinegar, sugar and salt. Most are free of dairy, egg and gluten, but a few use malt vinegar or a thickener with wheat in it — check the label.",
  },

  /* --------------------------------------------------------------- veg */
  {
    id: "potato",
    name: "Potatoes",
    native: "potet",
    shelf: "veg",
    info: "Floury ones for mash and chips, firm ones for boiling. Peeled or scrubbed, they are the Norwegian dinner plate's oldest friend.",
  },
  {
    id: "carrot",
    name: "Carrots",
    native: "gulrot",
    shelf: "veg",
    info: "Sweet and crunchy raw, which is how most children like them best. Often the one vegetable everyone at the table will eat.",
  },
  {
    id: "cucumber",
    name: "Cucumber",
    native: "agurk",
    shelf: "veg",
    info: "Cool and watery, mild enough for the most careful eater. Cut in sticks just before serving so it stays crisp.",
  },
  {
    id: "pepper",
    name: "Sweet red pepper",
    native: "rød paprika",
    shelf: "veg",
    info: "The sweetest of the peppers, crunchy and bright. Red ones are riper and milder than green.",
  },
  {
    id: "corncob",
    name: "Corn on the cob",
    native: "maiskolbe",
    shelf: "veg",
    info: "Fresh in late summer, otherwise vacuum-packed or frozen. Eaten in the hand, which is half the reason children like it.",
  },
  {
    id: "springonion",
    name: "Spring onions",
    native: "vårløk",
    shelf: "veg",
    info: "Mild enough to go in fried rice raw at the end. Leave the bowl of them on the table for whoever wants them.",
  },

  /* ------------------------------------------------------------ fridge */
  {
    id: "butter",
    name: "Butter",
    native: "smør",
    shelf: "fridge",
    contains: ["dairy"],
    info: "A knob on hot potatoes, pasta or corn is what makes plain food taste like home. Olive oil does the same job on a dairy-free plate.",
  },
  {
    id: "milk",
    name: "Milk",
    native: "melk",
    shelf: "fridge",
    contains: ["dairy"],
    info: "Warmed and beaten into mash to make it soft. Some of the potato cooking water does it without dairy.",
  },
  {
    id: "eggs",
    name: "Eggs",
    native: "egg",
    shelf: "fridge",
    contains: ["egg"],
    info: "Scrambled through fried rice in little golden pieces. Easy to leave out, or to scramble on the side for a plate without egg.",
  },

  /* ----------------------------------------------------------- freezer */
  {
    id: "peas",
    name: "Peas",
    native: "erter",
    shelf: "freezer",
    info: "Frozen within hours of picking, and often sweeter than fresh ones from the shop. Plain bags are just peas; mixes with butter or sauce are not.",
  },
  {
    id: "sweetcorn",
    name: "Sweetcorn",
    native: "mais",
    shelf: "freezer",
    info: "Loose kernels, frozen or from a tin. Sweet, yellow and a reliable favourite with children.",
  },
];

export const ED_RECIPES = [
  {
    id: "plainrice",
    name: "Plain rice",
    native: "Kokt ris",
    line: "Fluffy white rice, cooked by absorption so every grain is separate.",
    story: "The quiet side that goes with almost anything, from a Vietnamese braise to a Greek stew. A child who will eat nothing else will usually eat a bowl of this.",
    serves: "4",
    time: "25 minutes",
    vessel: "pot",
    key: ["rice", "salt"],
    ingredients: [
      { id: "rice", amount: "300 g" },
      { id: "salt", amount: "a pinch" },
    ],
    method: [
      {
        text: "Rinse the rice in a sieve under cold water until the water runs nearly clear.",
        why: "Rinsing washes off the loose starch, which is what makes rice sticky and clumped.",
        prep: { rice: "rinsed" },
      },
      {
        text: "Put the rice in a pot with 450 ml of water and the salt, and bring it to the boil.",
        why: "One and a half times as much water as rice, by volume: the rice drinks all of it, so nothing is poured away.",
        add: ["rice", "salt"],
        heat: 3,
        wait: "5 min",
        sauce: "#eef0ea",
      },
      {
        text: "Put the lid on, turn the heat right down and leave it alone for twelve minutes. Then take it off the heat and leave it, lid on, for five more.",
        why: "No stirring and no peeking: the steam under the lid does the cooking, and the rest lets it finish evenly.",
        heat: 1,
        wait: "17 min",
        sauce: "#f6f4ec",
      },
      {
        text: "Fluff the rice with a fork before serving.",
        heat: 0,
        sauce: "#f6f4ec",
      },
    ],
    serve: "In a bowl in the middle of the table, beside whatever the main is.",
  },
  {
    id: "friedrice",
    name: "Egg fried rice",
    native: "Stekt ris med egg",
    line: "Yesterday's rice fried with egg, peas, carrot and spring onion.",
    story: "The best use of leftover rice, and quick enough for a weekday. The little golden pieces of egg are the part children pick out first.",
    serves: "4",
    time: "15 minutes",
    vessel: "wok",
    key: ["rice", "eggs", "peas", "tamari"],
    ingredients: [
      { id: "rice", amount: "600 g cooked, cold (from 250 g raw)" },
      { id: "oil", amount: "2 tbsp" },
      { id: "carrot", amount: "2, diced" },
      { id: "eggs", amount: "2, beaten" },
      { id: "peas", amount: "150 g frozen" },
      { id: "springonion", amount: "3, sliced" },
      { id: "tamari", amount: "2 tbsp" },
    ],
    method: [
      {
        text: "Heat the oil in a wok and fry the carrot for two or three minutes until it starts to soften.",
        why: "Carrot takes longest, so it goes in first; diced small, it cooks before the rice is ready.",
        prep: { carrot: "diced" },
        add: ["oil", "carrot"],
        heat: 3,
        wait: "3 min",
        sauce: "#e8a050",
      },
      {
        text: "Push the carrot to one side, pour the egg into the space and stir it until just set in soft pieces.",
        why: "Cooked on its own first, the egg stays in pieces instead of coating every grain.",
        prep: { eggs: "beaten" },
        add: ["eggs"],
        heat: 3,
        wait: "1 min",
        sauce: "#f0d070",
      },
      {
        text: "Add the cold rice, breaking up any lumps, and fry it, tossing, until hot right through. Add the peas for the last two minutes.",
        why: "Cold, day-old rice has dried out a little, so it fries instead of steaming into mush.",
        prep: { rice: "cooked and cold" },
        add: ["rice", "peas"],
        heat: 3,
        wait: "5 min",
        sauce: "#f0e6c8",
      },
      {
        text: "Stir in the tamari and spring onion and serve at once.",
        why: "Tamari rather than soy sauce, which is brewed with wheat. A little is enough for a child's plate.",
        prep: { springonion: "sliced" },
        add: ["tamari", "springonion"],
        heat: 0,
        sauce: "#d8c08a",
      },
    ],
    serve: "Hot, with the bottle of tamari on the table.",
    table: {
      egg: "Leave the egg out for an egg-free wok — or scramble it in a separate pan and stir it into the other plates only.",
      gluten: "Gluten-free as long as the tamari is — check the label. Ordinary soy sauce contains wheat.",
    },
  },
  {
    id: "boiledpotatoes",
    name: "Boiled potatoes",
    native: "Kokte poteter",
    line: "Potatoes boiled in salted water until just tender, with a knob of butter.",
    story: "The plainest thing on a Norwegian dinner table, and the one most likely to go with anything. Small ones can be boiled whole in their skins.",
    serves: "4",
    time: "30 minutes",
    vessel: "pot",
    key: ["potato", "butter"],
    ingredients: [
      { id: "potato", amount: "1 kg" },
      { id: "salt", amount: "1 tsp" },
      { id: "butter", amount: "a knob" },
    ],
    method: [
      {
        text: "Peel the potatoes, or just scrub them if they are small, and cut big ones in halves so they are all about the same size.",
        why: "Pieces of one size are cooked at the same moment, so none fall apart while others are still hard.",
        prep: { potato: "peeled" },
      },
      {
        text: "Cover them with cold water, add the salt and bring to the boil, then simmer until a knife slides in easily.",
        why: "Starting in cold water cooks them evenly from the outside in.",
        add: ["potato", "salt"],
        heat: 2,
        wait: "20 min",
        sauce: "#e6e8de",
      },
      {
        text: "Drain them well, let them steam dry for a minute, and toss with the butter.",
        add: ["butter"],
        heat: 0,
        sauce: "#efe2b8",
      },
    ],
    serve: "Hot, with the main.",
    table: {
      dairy: "Toss the dairy-free potatoes in olive oil instead of butter — or take them out before the butter goes in.",
    },
  },
  {
    id: "mash",
    name: "Mashed potatoes",
    native: "Potetmos",
    line: "Soft mashed potatoes with warm milk and butter.",
    story: "Spoonable and soft, which is why the youngest likes it. The one rule is to beat it by hand, never in a blender.",
    serves: "4",
    time: "30 minutes",
    vessel: "pot",
    key: ["potato", "milk", "butter"],
    ingredients: [
      { id: "potato", amount: "1 kg floury" },
      { id: "milk", amount: "150–200 ml" },
      { id: "butter", amount: "50 g" },
      { id: "salt", amount: "to taste" },
    ],
    method: [
      {
        text: "Peel the potatoes, cut them in even chunks and cover with cold salted water. Boil until very tender.",
        why: "For mash they should be softer than for boiling — a knife should meet no resistance at all.",
        prep: { potato: "peeled" },
        add: ["potato", "salt"],
        heat: 2,
        wait: "20 min",
        sauce: "#e6e8de",
      },
      {
        text: "Drain the potatoes and mash them in the pot with the butter.",
        why: "Butter goes in first, while they are hottest, so it melts into every bit.",
        add: ["butter"],
        heat: 0,
        sauce: "#f2e6b8",
      },
      {
        text: "Warm the milk and beat it in a little at a time until the mash is soft, and taste for salt.",
        why: "Warm milk keeps the mash hot; cold milk makes it gluey. Beat with a spoon, not a blender.",
        add: ["milk"],
        heat: 1,
        sauce: "#f6ecc8",
      },
    ],
    serve: "In a warm bowl, with a little more butter on top.",
    table: {
      dairy: "For a dairy-free bowl, keep back a cupful of the cooking water and mash with olive oil and that water instead of butter and milk — take it out before the butter goes in.",
    },
  },
  {
    id: "ovenchips",
    name: "Oven chips",
    native: "Ovnspoteter",
    line: "Potato wedges baked crisp in the oven, with ketchup.",
    story: "The potatoes with ketchup that no child turns down. Baked rather than fried, so the oven does the work while the main cooks.",
    serves: "4",
    time: "45 minutes",
    vessel: "tin",
    key: ["potato", "oil", "ketchup"],
    ingredients: [
      { id: "potato", amount: "1 kg" },
      { id: "oil", amount: "3 tbsp" },
      { id: "salt", amount: "1 tsp" },
      { id: "ketchup", amount: "to serve" },
    ],
    method: [
      {
        text: "Heat the oven to 220 °C. Cut the potatoes in wedges, skins on, and pat them dry with a cloth.",
        why: "Dry potatoes crisp; wet ones steam. Leaving the skins on saves work and holds the wedges together.",
        prep: { potato: "in wedges" },
      },
      {
        text: "Toss the wedges with the oil and salt in a roasting tin and spread them out in one layer.",
        why: "Crowded wedges steam each other soft. Use two tins if one is not enough.",
        add: ["potato", "oil", "salt"],
        sauce: "#e8d49a",
      },
      {
        text: "Bake for 35–40 minutes, turning them once halfway, until golden and crisp at the edges.",
        heat: "oven",
        wait: "35–40 min",
        sauce: "#d8a04a",
      },
      {
        text: "Serve hot, with ketchup.",
        add: ["ketchup"],
        heat: 0,
        sauce: "#d8a04a",
      },
    ],
    serve: "Straight from the tin, with a bowl of ketchup for dipping.",
    table: {
      gluten: "The chips are gluten-free. Check the ketchup label — most are fine, but a few contain malt vinegar or wheat.",
    },
  },
  {
    id: "pasta",
    name: "Buttered pasta",
    native: "Pasta med smør",
    line: "Plain pasta tossed with butter and a pinch of salt.",
    story: "The dinner some children would choose every day if asked. Plain pasta and butter, and nothing on it that anyone has to pick off.",
    serves: "4",
    time: "15 minutes",
    vessel: "pot",
    key: ["pasta", "butter"],
    ingredients: [
      { id: "pasta", amount: "400 g" },
      { id: "salt", amount: "1 tbsp, for the water" },
      { id: "butter", amount: "30–40 g" },
    ],
    method: [
      {
        text: "Bring a big pot of water to the boil and salt it well.",
        why: "The salted water is the only seasoning the pasta itself gets.",
        add: ["salt"],
        heat: 3,
        wait: "10 min",
        sauce: "#dfe9ec",
      },
      {
        text: "Add the pasta, stir straight away and boil for the time on the packet, stirring now and then.",
        why: "Stirring in the first minute stops it sticking together.",
        add: ["pasta"],
        heat: 3,
        wait: "8–10 min",
        sauce: "#e8e6d4",
      },
      {
        text: "Drain it and toss at once with the butter until it melts.",
        add: ["butter"],
        heat: 0,
        sauce: "#ecd890",
      },
    ],
    serve: "Hot, in bowls.",
    table: {
      gluten: "Cook gluten-free pasta for the gluten-free plate, in its own pot of water — and check it is egg-free, as some is made with egg. It sticks early and softens fast, so stir early and taste early.",
      dairy: "Toss the dairy-free portion in olive oil instead of butter.",
    },
  },
  {
    id: "plainnoodles",
    name: "Plain rice noodles",
    native: "Risnudler",
    line: "Soft rice noodles with a little oil and salt.",
    story: "The noodles from the phở bowl, without the broth — for the child who wants noodles but not the soup. Ready in the time it takes to boil a kettle.",
    serves: "4",
    time: "10 minutes",
    vessel: "bowl",
    key: ["ricenoodles", "oil"],
    ingredients: [
      { id: "ricenoodles", amount: "300 g" },
      { id: "oil", amount: "1–2 tbsp" },
      { id: "salt", amount: "a pinch" },
    ],
    method: [
      {
        text: "Put the noodles in a bowl and cover them with just-boiled water. Leave them until soft, as long as the packet says.",
        why: "Rice noodles only need soaking, not boiling; boiled, they turn soft and break.",
        prep: { ricenoodles: "softened" },
        add: ["ricenoodles"],
        wait: "5–8 min",
        sauce: "#eef0ea",
      },
      {
        text: "Drain them, rinse briefly under warm water and toss with the oil and salt.",
        why: "The rinse washes off starch so they do not clump; the oil keeps them apart on the plate.",
        add: ["oil", "salt"],
        sauce: "#f2ecd0",
      },
    ],
    serve: "Warm, in small bowls, beside the phở or anything else.",
  },
  {
    id: "vegsticks",
    name: "Vegetable sticks",
    native: "Grønnsaksstaver",
    line: "Raw carrot, cucumber and red pepper, cut in sticks.",
    story: "The vegetables that go on the table every time, whoever eats them. Some nights only the carrots go, and that is fine — they will be there again tomorrow.",
    serves: "4",
    time: "10 minutes",
    vessel: "plate",
    key: ["carrot", "cucumber", "pepper"],
    ingredients: [
      { id: "carrot", amount: "2" },
      { id: "cucumber", amount: "½" },
      { id: "pepper", amount: "1" },
    ],
    method: [
      {
        text: "Peel the carrots and cut them in finger-length sticks.",
        prep: { carrot: "in sticks" },
        add: ["carrot"],
        sauce: "#f6f1e6",
      },
      {
        text: "Cut the cucumber and the pepper in sticks of the same size, taking out the pepper's seeds.",
        why: "Cut the cucumber last, so it does not go soft and wet while it waits.",
        prep: { cucumber: "in sticks", pepper: "in sticks" },
        add: ["cucumber", "pepper"],
        sauce: "#f6f1e6",
      },
      {
        text: "Lay them out in separate piles on a plate.",
        why: "Separate piles let a careful eater take only the one they like, without anything else touching it.",
        sauce: "#f6f1e6",
      },
    ],
    serve: "In the middle of the table, before and during dinner.",
  },
  {
    id: "peascorn",
    name: "Peas and sweetcorn",
    native: "Erter og mais",
    line: "Frozen peas and sweetcorn, boiled for a few minutes and tossed with butter.",
    story: "Two colours in a bowl, sweet enough that children eat them by the spoonful. From the freezer to the table in five minutes.",
    serves: "4",
    time: "5 minutes",
    vessel: "pot",
    key: ["peas", "sweetcorn"],
    ingredients: [
      { id: "peas", amount: "200 g frozen" },
      { id: "sweetcorn", amount: "200 g frozen" },
      { id: "salt", amount: "a pinch" },
      { id: "butter", amount: "a small knob" },
    ],
    method: [
      {
        text: "Bring a small pot of water to the boil with the salt.",
        add: ["salt"],
        heat: 3,
        wait: "5 min",
        sauce: "#dfe9ec",
      },
      {
        text: "Add the peas and sweetcorn straight from the freezer and boil for three minutes.",
        why: "Only just boiled, they stay sweet and bright; longer and the peas turn grey and wrinkled.",
        add: ["peas", "sweetcorn"],
        heat: 3,
        wait: "3 min",
        sauce: "#c8d870",
      },
      {
        text: "Drain and toss with the butter.",
        add: ["butter"],
        heat: 0,
        sauce: "#d0d878",
      },
    ],
    serve: "Hot, in a bowl, with a spoon in it.",
    table: {
      dairy: "Leave the butter off, or use a little olive oil instead — plain peas and corn need nothing. Some frozen mixes come in butter sauce; plain bags are just vegetables.",
    },
  },
  {
    id: "corncobs",
    name: "Corn on the cob",
    native: "Maiskolber",
    line: "Whole cobs boiled until sweet and tender, buttered and eaten in the hand.",
    story: "A vegetable you are allowed to hold, which is why even a reluctant eater will try it. Cut in halves, the cobs fit small hands.",
    serves: "4",
    time: "15 minutes",
    vessel: "pot",
    key: ["corncob", "butter"],
    ingredients: [
      { id: "corncob", amount: "4, halved" },
      { id: "butter", amount: "to serve" },
      { id: "salt", amount: "to serve" },
    ],
    method: [
      {
        text: "Bring a big pot of water to the boil. Pull off any husks and silk and cut the cobs in halves.",
        why: "No salt in the water — it toughens the kernels. Salt goes on at the table.",
        prep: { corncob: "halved" },
        heat: 3,
        wait: "10 min",
      },
      {
        text: "Boil the cobs until the kernels are bright yellow and tender.",
        why: "Fresh corn needs only a few minutes; older cobs and frozen ones need nearer ten.",
        add: ["corncob"],
        heat: 3,
        wait: "5–10 min",
        sauce: "#e8d870",
      },
      {
        text: "Lift them out, rub them with butter and sprinkle with salt.",
        add: ["butter", "salt"],
        heat: 0,
        sauce: "#e8d870",
      },
    ],
    serve: "Hot, on a plate, to eat with your hands.",
    table: {
      dairy: "Brush the dairy-free cobs with a little olive oil instead, or serve them with just salt.",
    },
  },
];
