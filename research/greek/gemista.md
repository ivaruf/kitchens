# Gemista (Γεμιστά), consensus research

Researched 2026-10-04.

**What changed from the current recipe in `js/recipes.js`, and why.** The current recipe was close. The sources do pull it in five places:

- **Fewer, larger vegetables.** It drops to 4 large tomatoes and 4 peppers. The median is two stuffed vegetables per person; the current recipe has ten for four people.
- **Less rice.** It drops from 200 g to 160 g. The weighted median is 160 g for eight vegetables, which is about 1½ tbsp per vegetable.
- **One fewer potato.** The tin takes 2 potatoes, not 3. The weighted median is about 2 medium.
- **A little water in the tin.** 12 of 15 sources add some, median about 135 ml. The current recipe adds none and can catch.
- **A slightly hotter, shorter bake.** 190 °C rather than 180 °C, and about 1¼ hours rather than 1½–2. The sources favour foil first, then uncovered: 7 recipes do this (weighted 10).
- **Rest before serving.** The new recipe tells you to rest the tin before serving.

Three things stayed the same. The filling still goes in raw: raw and pre-cooked fillings split almost exactly (weighted 13 vs 12), so the simpler raw method stays and pre-cooking is explained in the `why`. The vegetables are still filled ¾ full. The oil stays at 150 ml, which is the weighted median.

## Sources

Weighting rule (owner, 2026-10-04): a native and hands-on source counts 2 in medians and majority counts, an ordinary source 1, and an aggregator 0.5 or dropped. In this file, "native" means a Greek or Greek-diaspora cook writing their own or their family's recipe.

| # | Author / site | URL | Serves (as written) | Lang | Weight |
|---|---|---|---|---|---|
| 1 | Giorgos Tsoulis | giorgostsoulis.com/syntages/ospria-ladera/gemista | 5 | el | 2: native, Greek TV chef |
| 2 | Argiro Barbarigou, "Γεμιστά ορφανά" | argiro.gr/recipe/gemista-orfana/ | 6 | el | 2: native chef |
| 3 | Lilian Apostolopoulou, "της γιαγιάς" (Cookpad) | cookpad.com/gr/sintages/16336273 | 6 | el | 2: native home cook, grandmother's recipe |
| 4 | Makos / Efthimis Koukakis, The Hungry Bites | thehungrybites.com/meatless-greek-stuffed-vegetables-gemista/ | 5 | en | 2: native, "my yiayia's kitchen", process notes |
| 5 | Katerina's Kouzina (Poros) | katerinaskouzina.com/vegetarian/gemista-stuffed-tomatoes-peppers.html | 6 | en | 2: native home cook |
| 6 | Elleni Katalanos, The Green Greek | thegreengreekchef.com (blog, gemista) | 2 | en | 1: modernised, no family or process context |
| 7 | alwayshungry.gr | alwayshungry.gr/syntagi-gia-gemista-paradosiaka/ | 6 | el | 1: Greek site, no named author |
| 8 | Diane Kochilas | dianekochilas.com/stuffed-tomatoes-peppers-gemista/ | ~6 (assumed) | en | 2: native, Ikarian cook and author |
| 9 | My Greek Dish | mygreekdish.com/recipe/gemista-stuffed-tomatoes-peppers-and-onions/ | ~6 (assumed) | en | 1: large content site (beef optional) |
| 10 | Elena Paravantes, OliveTomato | olivetomato.com (greek-stuffed-tomatoes-gemista) | 7 | en | 2: native, her mother's recipe |
| 11 | iefimerida.gr, "ορφανά" | iefimerida.gr/gastronomie/syntagi-gia-apaihta-gemista-orfana | ~3 (assumed) | el | 1: newsroom recipe |
| 12 | Petros Syrigos | petros-syrigos.com/gemista-orfana/ | ~7.5 (assumed) | el | 2: native chef |
| 13 | Kitchen Queen | kitchenqueen.gr (γεμιστά ορφανά) | 6 | el | 1: ordinary recipe site |
| 14 | Fotini, Real Greek Recipes | realgreekrecipes.com/stuffed-vegetables/ | 4 (taken) | en | 2: native home cook, process photos |
| 15 | Mia Kouppa | miakouppa.com/yemista-or-gemista/ | 8 | en | 2: Greek-Canadian sisters, their mother's recipe |

Seen but not counted:

- **Dimitra's Dishes.** The recipe has beef, so it was excluded from the counts. Its method was noted: pre-cooked filling, foil at 200 °C, then uncovered at 220 °C.
- **Could not be read.** The Mediterranean Dish, Akis Petretzikis and Vefa Alexiadou all returned 403. A snippet shows Vefa adding tomato paste and a little ketchup to the pulp.
- **Argiro's second, English recipe** is the same author, so it is a note only. It pre-cooks the filling for 5 min, fills ¾ full, bakes at 180 °C covered 45 min then uncovered 45 min, and adds no water.

Weights total 25 (10 native × 2 + 5 ordinary × 1).

## Amounts (normalised to 4 servings)

| Ingredient | Used by (raw n/N · weighted) | Normalised per source | Median (weighted) | Range kept | Outliers dropped |
|---|---|---|---|---|---|
| Tomatoes | 15/15 · 25/25 | 4, 3.3, 4.7, 4, 4, 4, 3.3, 4, 5.3, 2.9, 4, 2.7, 4, 4, ~3 | 4 | 2.7–5.3 | none |
| Peppers | 15/15 · 25/25 | 4, 3.3, 2, 4, 4, 4, 4, 4, 2.7, 3.4, 4, 2.7, 4, 4, ~2 | 4 | 2–4 | none |
| Aubergine / courgette also stuffed | 7/15 · 12/25 | n/a | optional | n/a | n/a |
| Rice (g) | 15/15 | 200, 130, 133, 264, 100, 400, 147, 130, 333, 80, 100, 160, 233, 170, 200 | 160 | 100–264 | #6 400 and #9 333 (high, risotto-style quantities); #10 80 (low, extra courgettes carry the dish) |
| Rice type | short/medium (Carolina, glacé, arborio) 12; parboiled 2; long-grain 1 | n/a | medium grain | n/a | n/a |
| Onion | 15/15 | 1.6, 1.3, 1.3, 0.8, ~4.5, 2, 1.3, 2, 1.3, 0.6, 2.7 small, 1.6, 0.7, ~0.5, 0.5 | 1.3 → 1 large | 0.5–2 | #5 1 kg (≈4.5 onions, a different, onion-heavy style) |
| Garlic (cloves) | 10/15 · 17/25 | 1.6, 1.7, 1.3, 6, 1.3, 1.3, 4, 1.3, 3, ~1.5 | 1.5 → 2 | 1.3–4 | #6 6 cloves |
| Parsley | 15/15 | ~0.17–0.67 bunch | ½ bunch (~30 g) | 0.17–0.67 bunch | none |
| Mint | 13/15 · 21/25 | ~0.33–0.67 bunch (dried in #10) | ½ bunch | n/a | none |
| Dill | 4/15 · 7/25 | n/a | optional (under a third) | n/a | n/a |
| Basil | 2/15 | n/a | optional variant | n/a | n/a |
| Olive oil (ml) | 13 with amounts | 80, 240, 80, 130, 240, 200, 173, 60, 205, 320, 110, 180, 120, (#9 unstated, #12 unstated) | ~170 raw · **150 weighted** | 60–240 | #11 320 (high) |
| Potatoes (medium) | 11/15 · 18/25 | 1.7, 1.6, 2, 4, 1.7, 3.7, ~3, 5.3, 1.3, 3, optional | ~2 | 1.3–4 | #12 5.3 |
| Water in the tin (ml) | 12/15 · 21/25 | 140, 160, ~2 cm, 240, 600 stock, 133, ~60, 800, 137, ~250, ~120, splash, as needed | ~135 | splash–250 | #9 800, #6 600 |
| Tomato paste | 3/15 · 4/25 | ~1 tbsp | not used | n/a | n/a |
| Sugar | 6/15 · 10/25 | pinch to 1.3 tsp | optional pinch | n/a | n/a |
| Raisins / pine nuts | 3/15 · 6/25 | n/a | regional variant | n/a | n/a |
| Breadcrumbs on top | 3/15 | n/a | not used (gluten) | n/a | n/a |
| Cheese in filling | 0/15 | n/a | none | n/a | n/a |

## Method (counts are weighted 2 / 1 / 0.5 as above; raw counts in brackets)

- **Filling, raw or pre-cooked.** Raw: 13 (8). Pre-cooked 5–7 min, or until half done: 12 (7). This is a genuine split. Raw is kept because it is simpler, and the pre-cookers all stress that the rice must stay underdone, so the result is much the same. iefimerida argues explicitly that raw gives a lighter dish and firmer rice.
- **How full.** Leave room (¾, ⅔, "one finger", "don't overfill"): 8 raw. Filled to the top: 1 (#10). Not stated: 6. The consensus is ¾.
- **Lids.** Every recipe that describes it puts the vegetables' own caps back on.
- **Potatoes in the tin.** Yes: 18 (11). No: 7 (4).
- **Liquid in the tin.** Water, or pulp plus water: 21 (12). Only grated tomato and oil: 4 (2).
- **Oven temperature.** Median 190 °C. Range 170 °C fan to 220 °C; most recipes sit between 180 and 200 °C.
- **Covering.** Foil first, then off to brown: 10 (7). Foil only late, to stop burning: 4 (2). Uncovered or not stated: 11 (6). Foil-first is the most common explicit instruction; when used, it stays on 40–60 min, followed by 15–45 min uncovered.
- **Bake time.** Median 75 min, range 40–120. Sources that pre-cook the filling bake shorter (40–50 min).
- **Rest.** Several recipes rest the tin 15–30 min (#4 says 30). It is served warm or at room temperature in essentially all of them.

**Regional and family variants**, noted and not driving the consensus:

- **Raisins, pine nuts and cinnamon.** The Asia Minor and island style (#2, #8, #5, Vefa's "loukoumi").
- **Grated courgette and carrot in the filling.** #11, #12, #15, #4.
- **Basil.** #1, #14.
- **Cloves and allspice.** #10.
- **Paste and paprika.** #13.
- **Breadcrumbs or rusk on the caps.** #2, #7, #12. These contain gluten, so they are left out here.

## Consensus recipe (English)

```js
  {
    id: "gemista",
    name: "Gemista",
    native: "Γεμιστά",
    line: "Tomatoes and peppers stuffed with herbed rice, baked among potato wedges.",
    story: "The dish of high summer, when the tomatoes are almost bursting. Every family argues about the herbs; everyone agrees the potatoes at the bottom of the tin, soaked in the juices, are the best part.",
    serves: "4",
    time: "About 1¾ hours, with a rest",
    fasting: true,
    vessel: "tin",
    key: ["tomato", "pepper", "rice", "mint", "parsley"],
    ingredients: [
      { id: "tomato", amount: "4 large, firm" },
      { id: "pepper", amount: "4" },
      { id: "rice", amount: "160 g medium grain" },
      { id: "onion", amount: "1 large, grated" },
      { id: "garlic", amount: "2 cloves, crushed" },
      { id: "parsley", amount: "½ bunch, chopped" },
      { id: "mint", amount: "½ bunch, chopped" },
      { id: "potato", amount: "2, in wedges" },
      { id: "oil", amount: "150 ml" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Slice the tops off the tomatoes and keep them as lids. Scoop out the insides into a bowl and blend or chop them. Cut the tops off the peppers and pull out the seeds. Sprinkle a little salt inside each one.",
        why: "The tomato flesh is not thrown away — it becomes the liquid the rice cooks in.",
        prep: { tomato: "hollowed, insides kept", pepper: "hollowed" },
      },
      {
        text: "Mix the rice with the onion, garlic, herbs, half the tomato pulp, half the oil, salt and pepper. A pinch of sugar helps if the tomatoes are sharp.",
        why: "The rice goes in raw: it cooks inside the vegetables, drinking the tomato juice. Many cooks soften it with the onion and pulp for five minutes first; it is quicker in the oven but must stay underdone.",
        prep: { onion: "grated", garlic: "crushed", parsley: "chopped", mint: "chopped" },
      },
      {
        text: "Stand the vegetables in a tin, fill them three-quarters full and put on their lids. Tuck potato wedges between them, season them, and pour over the rest of the pulp and oil with a small glass of water.",
        why: "Only three-quarters full, because the rice swells as it cooks and would push the lids off. The water keeps the bottom from catching before the vegetables give up their juice.",
        prep: { potato: "in wedges" },
        add: ["tomato", "pepper", "rice", "onion", "garlic", "parsley", "mint", "potato", "oil", "salt", "blackpepper"],
        sauce: "#d8603a",
      },
      {
        text: "Bake at 190 °C under foil for 45 minutes, then uncovered until the tops are browned and the rice is soft. Rest for 15–30 minutes before serving.",
        why: "Covered, it steams and the rice cooks through; uncovered, the tops roast and the juices thicken. Resting lets the rice finish drinking what is left.",
        heat: "oven",
        wait: "1¼ hours, then rest",
        sauce: "#c24a2a",
      },
    ],
    serve: "Warm or at room temperature, often with feta and bread.",
    table: {
      dairy: "Some cooks stir cheese into the filling; this one has none. Feta on the side for whoever eats it.",
      gluten: "Gluten-free in the tin. Some cooks scatter breadcrumbs over the lids — leave them off. Mind the bread.",
    },
  },
```

No new pantry item is needed. The sugar is an optional pinch, mentioned in the step text only.

## Consensus recipe (bokmål)

```js
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
```

## Confidence

The sources agree strongly on these points:

- Two stuffed vegetables per person.
- Medium-grain rice of about 1–1½ tbsp per vegetable.
- Parsley and mint as the herbs.
- Filling ¾ full, with the caps back on.
- Potatoes in the tin.
- A generous pour of oil, around 150 ml.
- A bake of 180–200 °C for about 75 minutes.

They split on two things. Raw and pre-cooked fillings are an almost exact tie. Covering is mixed: foil-first is the most common explicit choice, but many recipes never mention foil. Oil also varies widely (60–320 ml) even after weighting, and Greek cooks lean towards more of it.

There are caveats on the data:

- Four strong sources could not be read (403): Akis, Vefa, the Mediterranean Dish, and Dimitra's meatless version.
- Servings were assumed for #8, #9, #11, #12 and #14, so their normalised figures are approximate.
- The figures were extracted through a summarising fetch tool, so exact wording may differ slightly.
