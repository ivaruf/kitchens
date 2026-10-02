/*
 * vietnam.js — the Vietnamese kitchen: its pantry and its dishes.
 *
 * Deliberately small: five dishes and the pantry they need, to feel out
 * whether a second kitchen works beside the Greek one. Same shapes as
 * js/pantry.js and js/recipes.js (see their headers for every field), so the
 * shelves, the counter, the recipe page and the cook-along need nothing new.
 *
 * Some ingredients borrow a Greek picture: js/art.js draws cassia bark as the
 * cinnamon jar and shallots as the small onions (its ALIAS table).
 *
 * THE LESSON THIS KITCHEN BRINGS is balance: salty, sour, sweet and hot,
 * tasted and adjusted at the table as much as in the pot. And it brings
 * gluten where a newcomer would not expect it — soy sauce and most hoisin are
 * brewed with wheat, and some fish sauces carry it too.
 */

export const VN_SHELVES = [
  { id: "herbs", name: "Fresh herbs", note: "By the plateful, picked at the table" },
  { id: "spices", name: "Spices", note: "Toasted dry until they smell" },
  { id: "market", name: "From the market", note: "Bought this morning, cooked tonight" },
  { id: "dry", name: "Rice, in every form", note: "Noodles, paper, and the grain itself" },
  { id: "bottles", name: "Sauces and sugar", note: "Salty, sweet — and what hides wheat" },
  { id: "cold", name: "Meat and seafood", note: "From the river and the market stall" },
];

export const VN_INGREDIENTS = [
  /* ------------------------------------------------------------- herbs */
  {
    id: "thaibasil",
    name: "Thai basil",
    native: "húng quế",
    shelf: "herbs",
    info: "Purple-stemmed, with a scent of anise. Torn into phở at the table, never cooked in the broth.",
  },
  {
    id: "coriander",
    name: "Coriander",
    native: "ngò",
    shelf: "herbs",
    info: "Leaves and tender stems, scattered over almost everything at the end. It loses its point if it cooks.",
  },
  {
    id: "mint",
    name: "Mint",
    native: "rau húng lủi",
    shelf: "herbs",
    info: "One of the many herbs rolled into gỏi cuốn and piled beside every noodle dish — eaten as a vegetable, not a garnish.",
  },
  {
    id: "springonion",
    name: "Spring onions",
    native: "hành lá",
    shelf: "herbs",
    info: "Sliced thin over a bowl of phở or a pot of braised fish, the green tops added last so they stay bright.",
  },

  /* ------------------------------------------------------------ spices */
  {
    id: "staranise",
    name: "Star anise",
    native: "hoa hồi",
    shelf: "spices",
    info: "The smell of phở. Toasted in a dry pan until fragrant before it goes into the broth — a few pods flavour a whole pot.",
  },
  {
    id: "cassia",
    name: "Cassia bark",
    native: "quế",
    shelf: "spices",
    info: "Vietnam's cinnamon: thicker, rougher and stronger than the Ceylon kind. Toasted with the star anise for phở.",
  },
  {
    id: "cloves",
    name: "Cloves",
    native: "đinh hương",
    shelf: "spices",
    info: "A few in the phở spice bag, toasted with the rest. Strong — three or four for a whole pot of broth.",
  },
  {
    id: "blackpepper",
    name: "Black pepper",
    native: "tiêu",
    shelf: "spices",
    info: "Vietnam is the world's biggest pepper grower, and Phú Quốc's is famous. Used generously — a braised fish is meant to be peppery.",
  },

  /* ------------------------------------------------------------ market */
  {
    id: "shallots",
    name: "Shallots",
    native: "hành tím",
    shelf: "market",
    info: "Small purple shallots, sliced into marinades and fried crisp for topping. Sweeter and gentler than onion.",
  },
  {
    id: "garlic",
    name: "Garlic",
    native: "tỏi",
    shelf: "market",
    info: "Fried in hot oil for a few seconds until golden for stir-fries — any longer and it turns bitter. Raw and minced, it floats in nước chấm.",
  },
  {
    id: "ginger",
    name: "Ginger",
    native: "gừng",
    shelf: "market",
    info: "For phở it is charred whole over a flame until blackened in places, which turns its heat sweet and smoky.",
  },
  {
    id: "onion",
    name: "Onion",
    native: "hành tây",
    shelf: "market",
    info: "Charred in its skin over the flame with the ginger, then simmered in the phở broth for hours. It gives sweetness and colour.",
  },
  {
    id: "chilli",
    name: "Red chilli",
    native: "ớt",
    shelf: "market",
    info: "Bird's eye chillies, sliced into nước chấm or put on the table for each person to add. Heat is a choice made at the bowl.",
  },
  {
    id: "lime",
    name: "Limes",
    native: "chanh",
    shelf: "market",
    info: "The sour in salty-sour-sweet-hot. Squeezed into phở at the table and into nước chấm, always fresh.",
  },
  {
    id: "beansprouts",
    name: "Beansprouts",
    native: "giá",
    shelf: "market",
    info: "Mung bean sprouts, added raw to phở for crunch, where the hot broth barely wilts them.",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    native: "xà lách",
    shelf: "market",
    info: "Soft leaves for wrapping: the first layer inside a fresh roll, and the leaf you wrap a mouthful in at the table.",
  },
  {
    id: "waterspinach",
    name: "Water spinach",
    native: "rau muống",
    shelf: "market",
    info: "Morning glory: hollow crisp stems and soft leaves, the everyday green of Vietnam. Stir-fried in minutes with garlic.",
  },

  /* --------------------------------------------------------------- dry */
  {
    id: "ricenoodles",
    name: "Flat rice noodles",
    native: "bánh phở",
    shelf: "dry",
    info: "The flat noodles phở is named after. Made from rice, so naturally gluten-free — still worth a glance at the label.",
  },
  {
    id: "vermicelli",
    name: "Rice vermicelli",
    native: "bún",
    shelf: "dry",
    info: "Thin round rice noodles, cooked, rinsed cold and eaten at room temperature in rolls and noodle salads.",
  },
  {
    id: "ricepaper",
    name: "Rice paper",
    native: "bánh tráng",
    shelf: "dry",
    info: "Brittle sheets of rice (and often tapioca) that soften in a second of warm water. Gluten-free in the usual recipe; check the packet.",
  },
  {
    id: "sugar",
    name: "Sugar",
    native: "đường",
    shelf: "dry",
    info: "Sweet is one of the four tastes every Vietnamese dish balances, not an afterthought — and melted to dark caramel, it is a seasoning of its own.",
  },

  /* ----------------------------------------------------------- bottles */
  {
    id: "fishsauce",
    name: "Fish sauce",
    native: "nước mắm",
    shelf: "bottles",
    info: "Anchovies and salt, fermented for a year or more: the salt and the savour of the whole cuisine. Most is just that, but some brands add wheat-based flavourings — read the label.",
  },
  {
    id: "neutraloil",
    name: "Cooking oil",
    native: "dầu ăn",
    shelf: "bottles",
    info: "A neutral oil for stir-frying over high heat, where olive oil would burn and taste out of place.",
  },
  {
    id: "soysauce",
    name: "Soy sauce",
    native: "xì dầu",
    shelf: "bottles",
    contains: ["gluten"],
    info: "Brewed from soybeans and wheat, so not gluten-free unless the bottle says so (tamari usually does). In Vietnam it is the vegetarian kitchen's fish sauce.",
  },
  {
    id: "hoisin",
    name: "Hoisin sauce",
    native: "tương đen",
    shelf: "bottles",
    contains: ["gluten"],
    info: "Sweet, dark and thick, squeezed into phở in the south and stirred into the peanut dip for fresh rolls. Almost every brand contains wheat.",
  },

  /* -------------------------------------------------------------- cold */
  {
    id: "beef",
    name: "Beef and bones",
    native: "thịt bò",
    shelf: "cold",
    info: "Marrow and knuckle bones for the broth, brisket simmered in it, and raw sirloin sliced paper-thin to cook in the bowl when the boiling broth is poured over.",
  },
  {
    id: "prawns",
    name: "Prawns",
    native: "tôm",
    shelf: "cold",
    info: "Poached for a minute or two until just pink, then halved lengthways so their stripes show through rice paper.",
  },
  {
    id: "fish",
    name: "Catfish",
    native: "cá",
    shelf: "cold",
    info: "River fish from the Mekong delta, cut in thick steaks through the bone, which hold together through a long braise.",
  },
];

export const VN_RECIPES = [
  {
    id: "pho",
    name: "Phở bò",
    native: "Phở bò",
    line: "Beef noodle soup: a clear, spiced broth poured boiling over rice noodles and thin-sliced beef.",
    story: "Born in the north early in the last century and now eaten everywhere, at any hour, often for breakfast. The broth takes all day; the bowl takes a minute; the herbs are added by whoever is eating it.",
    serves: "4",
    time: "4 hours or more, mostly simmering",
    vessel: "pot",
    key: ["beef", "staranise", "ginger", "ricenoodles", "fishsauce"],
    ingredients: [
      { id: "beef", amount: "1.5 kg bones, 500 g brisket, 200 g sirloin" },
      { id: "onion", amount: "1, in its skin" },
      { id: "ginger", amount: "a thumb-length piece" },
      { id: "staranise", amount: "5 pods" },
      { id: "cassia", amount: "1 piece" },
      { id: "cloves", amount: "4" },
      { id: "sugar", amount: "1 tbsp (rock sugar if you have it)" },
      { id: "fishsauce", amount: "3–4 tbsp" },
      { id: "ricenoodles", amount: "400 g flat" },
      { id: "beansprouts", amount: "2 handfuls" },
      { id: "thaibasil", amount: "a bunch" },
      { id: "coriander", amount: "a bunch" },
      { id: "springonion", amount: "4, sliced" },
      { id: "lime", amount: "2, in wedges" },
      { id: "chilli", amount: "2, sliced" },
    ],
    method: [
      {
        text: "Cover the bones and brisket with cold water, bring to the boil for five minutes, then drain and rinse everything.",
        why: "This throws away the grey scum before the real broth starts. It is the first secret of a clear phở.",
        prep: { beef: "blanched and rinsed" },
        heat: 3,
        wait: "5 min",
      },
      {
        text: "Char the onion and ginger over a flame or under the grill until blackened in places. Toast the star anise, cassia and cloves in a dry pan until fragrant.",
        why: "Charring turns onion and ginger sweet and smoky; toasting wakes the spices. Both are where phở's depth comes from.",
        prep: { onion: "charred", ginger: "charred" },
        heat: 3,
        wait: "10 min",
      },
      {
        text: "Put everything in a large pot with about four litres of water and the sugar. Keep it at the barest simmer, skimming, for at least three hours. Lift the brisket out when tender.",
        why: "Never let it boil: boiling churns fat and scum back into the broth and clouds it. Slow and low is what keeps it clear.",
        add: ["beef", "onion", "ginger", "staranise", "cassia", "cloves", "sugar"],
        heat: 1,
        wait: "3 hours or more",
        sauce: "#c9a46a",
      },
      {
        text: "Strain the broth and season it with fish sauce. Taste; it should be a little saltier than you would drink alone.",
        why: "Fish sauce goes in near the end, so its aroma survives. The noodles will dilute it in the bowl.",
        add: ["fishsauce"],
        heat: 2,
        sauce: "#b98a4a",
      },
      {
        text: "Soften the noodles in hot water, divide them between bowls with slices of brisket and raw sirloin, and pour the boiling broth over. Top with spring onion and coriander.",
        why: "The broth must be boiling: it cooks the raw beef in the bowl in seconds.",
        prep: { ricenoodles: "softened", springonion: "sliced", coriander: "picked", beansprouts: "rinsed", thaibasil: "picked", lime: "in wedges", chilli: "sliced" },
        add: ["ricenoodles", "springonion", "coriander"],
        heat: 3,
        sauce: "#b98a4a",
      },
    ],
    serve: "With a plate of beansprouts, Thai basil, lime and chilli for everyone to add — and hoisin and chilli sauce on the table.",
    table: {
      gluten: "The broth and rice noodles are gluten-free; check the fish sauce label. The hoisin on the table almost always contains wheat — leave it off the gluten-free bowl.",
    },
  },
  {
    id: "nuoccham",
    name: "Nước chấm",
    native: "Nước chấm",
    line: "The dipping sauce: fish sauce, lime, sugar, garlic and chilli, in balance.",
    story: "On every Vietnamese table, for spring rolls, grilled meat, rice and noodles. Every family has its proportions; what they share is the balance of salty, sour, sweet and hot — which is the whole cuisine in one bowl.",
    serves: "a small bowl",
    time: "5 minutes",
    vessel: "bowl",
    key: ["fishsauce", "lime", "sugar", "garlic", "chilli"],
    ingredients: [
      { id: "sugar", amount: "2–3 tbsp" },
      { id: "fishsauce", amount: "3 tbsp" },
      { id: "lime", amount: "3 tbsp juice" },
      { id: "garlic", amount: "2 cloves, minced" },
      { id: "chilli", amount: "1, finely chopped" },
    ],
    method: [
      {
        text: "Stir the sugar into six tablespoons of warm water until it dissolves completely.",
        why: "Undissolved sugar sinks and the sauce tastes sharp, then suddenly sweet. Warm water melts it in seconds.",
        add: ["sugar"],
        sauce: "#f3ead6",
      },
      {
        text: "Add the lime juice and fish sauce. Taste, and adjust until no one taste wins: salty, sour and sweet should arrive together.",
        why: "This is the skill, more than the recipe. Too salty, more water and lime; too sharp, a little sugar.",
        prep: { lime: "juiced" },
        add: ["lime", "fishsauce"],
        sauce: "#e8c88a",
      },
      {
        text: "Add the garlic and chilli last.",
        why: "Added last to a sweetened sauce, they float on the surface — the sign of a well-made nước chấm.",
        prep: { garlic: "minced", chilli: "finely chopped" },
        add: ["garlic", "chilli"],
        sauce: "#e8c88a",
      },
    ],
    serve: "In small bowls beside rolls, grilled meat or rice.",
    table: {
      gluten: "Gluten-free if the fish sauce is — most are anchovies and salt, but check the label.",
    },
  },
  {
    id: "goicuon",
    name: "Gỏi cuốn",
    native: "Gỏi cuốn",
    line: "Fresh spring rolls: prawns, rice noodles and herbs wrapped in soft rice paper.",
    story: "Nothing is fried and nothing is hot: a summer roll is about the herbs and the soft, translucent skin, with the pink prawns showing through.",
    serves: "4 (12 rolls)",
    time: "About 40 minutes",
    vessel: "plate",
    key: ["ricepaper", "prawns", "vermicelli", "mint", "lettuce"],
    ingredients: [
      { id: "ricepaper", amount: "12 sheets" },
      { id: "prawns", amount: "12 large" },
      { id: "vermicelli", amount: "100 g" },
      { id: "lettuce", amount: "1 soft head" },
      { id: "mint", amount: "a bunch" },
      { id: "coriander", amount: "a bunch" },
      { id: "fishsauce", amount: "for the nước chấm" },
    ],
    method: [
      {
        text: "Cook the vermicelli, rinse it in cold water and drain well.",
        why: "Rinsing stops it cooking and washes off the starch, so it does not clump inside the roll.",
        prep: { vermicelli: "cooked and rinsed" },
        heat: 3,
        wait: "4 min",
      },
      {
        text: "Poach the prawns for a minute or two until pink, then peel and halve them lengthways.",
        why: "Halved, they lie flat — and laid cut side up against the paper, their stripes show through the finished roll.",
        prep: { prawns: "poached and halved" },
        heat: 2,
        wait: "2 min",
      },
      {
        text: "Dip a sheet of rice paper in warm water for a second or two and lay it on a board. It keeps softening as you fill it.",
        why: "Too long in the water and it tears; it should still feel slightly stiff when you lift it out.",
        prep: { ricepaper: "dipped" },
        add: ["ricepaper"],
        sauce: "#f6f1e6",
      },
      {
        text: "Lay on lettuce, noodles and herbs, then the prawns near the top. Fold in the sides and roll up tightly.",
        why: "Tight is everything — a loose roll falls apart at the first dip.",
        prep: { lettuce: "in leaves", mint: "picked", coriander: "picked" },
        add: ["lettuce", "vermicelli", "mint", "coriander", "prawns"],
        sauce: "#f6f1e6",
      },
    ],
    serve: "At once, with nước chấm — or the peanut and hoisin dip.",
    table: {
      gluten: "The rolls are gluten-free. The usual peanut and hoisin dip is not: serve them with nước chấm instead.",
    },
  },
  {
    id: "cakho",
    name: "Cá kho tộ",
    native: "Cá kho tộ",
    line: "Catfish braised in a clay pot with caramel, fish sauce and plenty of black pepper.",
    story: "A southern home dish from the Mekong delta, cooked in the same small clay pot it is served in. Salty, sticky, peppery, and made to be eaten with a lot of plain rice.",
    serves: "4, with rice",
    time: "About 1 hour",
    vessel: "pot",
    key: ["fish", "fishsauce", "sugar", "blackpepper", "shallots"],
    ingredients: [
      { id: "fish", amount: "500 g steaks" },
      { id: "fishsauce", amount: "3 tbsp" },
      { id: "sugar", amount: "3 tbsp" },
      { id: "shallots", amount: "3, sliced" },
      { id: "garlic", amount: "3 cloves, minced" },
      { id: "blackpepper", amount: "lots, freshly ground" },
      { id: "chilli", amount: "1–2" },
      { id: "springonion", amount: "2, sliced" },
      { id: "neutraloil", amount: "1 tbsp" },
    ],
    method: [
      {
        text: "Toss the fish with the fish sauce, shallots, garlic and a lot of pepper, and leave it for half an hour.",
        prep: { fish: "cut in steaks", shallots: "sliced", garlic: "minced" },
        wait: "30 min",
      },
      {
        text: "In the clay pot, melt the sugar with a splash of water and the oil and cook until it turns deep amber.",
        why: "This caramel, nước màu, gives the colour and a bittersweet depth. Take it too far and it turns bitter — deep amber, not black.",
        add: ["sugar", "neutraloil"],
        heat: 2,
        wait: "5 min",
        sauce: "#8a4a1e",
      },
      {
        text: "Add the fish and its marinade, and water to come halfway up. Simmer low, turning once, until the sauce is thick and sticky.",
        why: "The sauce reduces around the fish until it coats it like glaze. Low heat, or the caramel scorches on the bottom.",
        add: ["fish", "fishsauce", "shallots", "garlic"],
        heat: 1,
        wait: "30–40 min",
        sauce: "#6a3418",
      },
      {
        text: "Finish with more pepper, the chilli and the spring onion.",
        why: "Pepper is a main flavour here, not a seasoning — be generous.",
        prep: { chilli: "sliced", springonion: "sliced" },
        add: ["blackpepper", "chilli", "springonion"],
        heat: 0,
        sauce: "#6a3418",
      },
    ],
    serve: "In its pot, with plain rice and boiled greens.",
    table: {
      gluten: "Gluten-free if the fish sauce is — check the label.",
    },
  },
  {
    id: "raumuong",
    name: "Rau muống xào tỏi",
    native: "Rau muống xào tỏi",
    line: "Water spinach stir-fried in minutes with a lot of garlic.",
    story: "The everyday green on a Vietnamese table, cooked last so it arrives hot. Where Greek fasolakia cooks its beans soft for an hour, this is done in two minutes and stays crisp — two kitchens, opposite ideas of a cooked vegetable.",
    serves: "4, as a side",
    time: "15 minutes",
    vessel: "wok",
    key: ["waterspinach", "garlic", "fishsauce", "neutraloil"],
    ingredients: [
      { id: "waterspinach", amount: "500 g" },
      { id: "garlic", amount: "6 cloves, smashed" },
      { id: "neutraloil", amount: "2 tbsp" },
      { id: "fishsauce", amount: "1 tbsp" },
      { id: "sugar", amount: "a pinch" },
    ],
    method: [
      {
        text: "Cut the water spinach into finger lengths, keeping stems and leaves apart, and wash well.",
        why: "The hollow stems take longer than the leaves, so they go in first.",
        prep: { waterspinach: "cut in lengths", garlic: "smashed" },
      },
      {
        text: "Heat the wok until it smokes, add the oil and garlic and stir for a few seconds until golden.",
        why: "Garlic goes from golden to bitter in seconds at this heat. Some cooks lift half out to scatter on top.",
        add: ["neutraloil", "garlic"],
        heat: 3,
        wait: "30 seconds",
        sauce: "#3a2a20",
      },
      {
        text: "Add the stems, toss for a minute, then the leaves, the fish sauce and the sugar, and toss until just wilted.",
        why: "High heat and speed keep it green and crisp. Crowd the wok and it stews instead — cook it in two goes if needed.",
        add: ["waterspinach", "fishsauce", "sugar"],
        heat: 3,
        wait: "2 min",
        sauce: "#3a2a20",
      },
    ],
    serve: "At once, with rice.",
    table: {
      gluten: "Gluten-free if the fish sauce is. Some cooks use soy sauce or oyster sauce instead, and both usually contain wheat.",
    },
  },
];
