# Spanakorizo (Σπανακόρυζο), consensus research

Researched 2026-10-04.

**What changed vs the current recipe in `js/recipes.js`, and why.** The current recipe's method is the consensus method. Onions go in first, the spinach is wilted before the rice, then water, then 20 minutes covered. Dill and lemon go in off the heat, and the texture stays loose and creamy. Four things change:

- **Rice drops from 200 g to 160 g.** That is the weighted median.
- **Spinach drops from 1 kg to 750 g.** The sources split in two: Greek-language recipes nearly all use 1 kg and English ones mostly 425–600 g, with a weighted median of about 630 g. 750 g keeps the dish "more spinach than rice" (about 4.5:1, against a median of 4.3:1) without overloading an ordinary pot.
- **Spring onions drop from 6 to 4.** The median is 3–4.
- **Oil is 90 ml, part of it kept back.** The weighted median is 90 ml, and 8 of 20 sources add the last of it raw at the end.

Two smaller changes:

- **The rest is longer.** It goes from 5 to 10 minutes, covered: every recipe that gives a timed rest lands at 2–10 minutes, most often 10.
- **The 500 ml of water stays.** The weighted median ratio is 3.1 ml per g of rice, which gives about 500 ml.

## Sources

Weighting rule (owner, 2026-10-04): native, hands-on source = 2; ordinary = 1; aggregator or farm = 0.5. "Native" means a Greek or Greek-diaspora cook giving their own, family or professional recipe.

| # | Author / site | URL | Serves | Lang | Weight |
|---|---|---|---|---|---|
| 1 | Diane Kochilas | dianekochilas.com/spanakorizo-greek-spinach-rice/ | 6 | en | 2: native cook and author |
| 2 | Elena Paravantes, OliveTomato | olivetomato.com/greek-spinach-and-rice-spanakorizo/ | 4 sides | en | 2: native dietitian |
| 3 | Argiro Barbarigou (red version) | argiro.gr/recipe/spanakoryzo-kokkinisto/ | n/s (4 assumed) | el | 2: native chef |
| 4 | Giorgos Tsoulis | giorgostsoulis.com/syntages/ospria-ladera/spanakorizo | 4 | el | 2: native chef |
| 5 | Petros Syrigos | petros-syrigos.com/en/greek-spinach-and-rice-spanakorizo/ | 4 | el/en | 2: native chef |
| 6 | iefimerida.gr ("grandma's secrets") | iefimerida.gr/gastronomie/syntagi-gia-spanakoryzo-ta-mystika-tis-giagias | n/s (4 assumed) | el | 0.5: unsigned newsroom piece |
| 7 | D. Papazimouris for Chryselia | xriselia.gr/recipe/to-lito-spanakoryzo-kai-ta-5-mystika-toy/ | 4 | el | 2: native chef (on a brand site) |
| 8 | Mia Kouppa (Bitzas sisters), red | miakouppa.com/spanakorizo/ | 4 | en | 2: Greek-Canadian, mother's recipe, process photos |
| 9 | Madame Ginger | madameginger.com (vegan "μελωμένο σπανακόρυζο") | 4 | el | 1: Greek editorial food site |
| 10 | Souvlaki For The Soul | souvlakiforthesoul.com/spanakorizo/ | 4 | en | 2: Greek-Australian, family cooking |
| 11 | Dimitra's Dishes | dimitrasdishes.com/spanakorizo-greek-spinach-rice/ | 4 | en | 2: Greek-American, video |
| 12 | My Greek Dish (red) | mygreekdish.com/recipe/greek-spinach-rice-recipe-spanakorizo/ | 4 | en | 1: large recipe site |
| 13 | Real Greek Recipes | realgreekrecipes.com/greek-spinach-rice-spanakoryzo/ | 2 | en | 2: native home cooks |
| 14 | Akis Petretzikis (via snippets and a queen.gr copy) | akispetretzikis.com/recipe/5261/spanakoryzo | n/s (4 assumed) | el | 2: native chef |
| 15 | Marilena's Kitchen | marilenaskitchen.com/easy-greek-spinach-and-rice-dish-spanakorizo/ | 4 | en | 2: native, cooking teacher |
| 16 | Bovary.gr | bovary.gr/living/taste/syntagi-gia-spanakoryzo-san-tis-giagias | 4 | el | 0.5: lifestyle aggregator, frozen spinach |
| 17 | Yiannis Lucacos (lemon version) | yiannislucacos.gr (σπανακόρυζο λεμονάτο, 7485) | 4 | el | 2: native chef |
| 18 | Olive & Mango | oliveandmango.com/spanakorizo-greek-spinach-rice/ | 4–6 | en | 2: Greek household |
| 19 | Greek Cooking by Katerina | greekcookingbykaterina.com/recipes/recipe/110/spanakorizo | 3 | el | 2: native home cook |
| 20 | Caroline's Cooking | carolinescooking.com/spanakorizo-greek-spinach-rice/ | 2 sides | en | 1: non-Greek, travel-inspired |

Some sources could not be used:

- **Blocked (403):** The Mediterranean Dish and Sip and Feast. Akis's own page was also blocked, so his recipe was read through snippets and a copy.
- **Blocked for the crawler:** gastronomos.gr.
- **Nothing found:** Vefa Alexiadou, NYT, Food52, BBC and the Guardian.

Weights total 34.

## Amounts (normalised to 4 servings)

| Ingredient | Used by (raw · weighted) | Normalised per source | Median (weighted) | Range kept | Outliers dropped |
|---|---|---|---|---|---|
| Spinach, fresh (g) | 20/20 | 454, 450, 1000, 600, 600, 1000, 1000, 567, 1000, 500, 900, 1000, 1000, 1000, 425, 1000 (frozen), 1000, 363, 667, 454 | ~780 raw · ~630 weighted → **750** | 363–1000 | none; distribution bimodal (Greek 1 kg, English ~450–600) |
| Rice (g) | 20/20 | 133, 60, 150, 200, 220, 250, 300, 150, 200, 80, 100, 200, 160, 250, 200, 200, 120, 160, 200, 100 | 180 raw · **160 weighted** | 80–250 | #2 60 (side portion); #7 300 (dry, pilaf-style) |
| Rice type | medium/round (Carolina, glacé, arborio, "medium") 14; long-grain 3; unspecified 2–3 | n/a | medium grain | n/a | n/a |
| Onion | 18/20 | mostly 1 (½–2) | 1 | ½–2 | n/a |
| Spring onion | 17/20 | 2, 2–3, bunch, 3, 4, 3–4, —, 3–4, 3, 4, —, 4, ~4, 2, 3, —, ~4, 3, 4, 2 | 3–4 → **4** | 2–4 | #3 a whole bunch, #17 200 g |
| Leek | 8/20 | 1 | optional (not in pantry) | n/a | n/a |
| Garlic | 6/20 | ~1.5 cloves | optional (under a third) | n/a | #11 6 cloves |
| Dill | 18/20 | Greek ⅓–½ bunch; English 1–4 tbsp | ½ bunch | 1 tbsp–½ bunch | n/a |
| Parsley | 5/20 | n/a | not used | n/a | n/a |
| Mint | 3/20 | n/a | not used | n/a | n/a |
| Lemon | 20/20 | 20–90 ml; zest in 6 | ~46 ml → **1 lemon**, plus wedges | 20–90 ml | none |
| Olive oil (ml) | 18 quantified | 107, 37, 120, 60, n/s, 240, 100, 120, 80, 80, 60, 120, 300, 76, 120, n/s, 110, 48, 90, 60 | ~95 raw · **90 weighted** | 37–120 | #13 300 (ladero style); #6 240 |
| Liquid (ml) | 19 quantified | ratio to rice 1.0–6.0 ml/g | ratio 2.7 raw · **3.1 weighted** → ~500 ml for 160 g | 2.3–3.3 (covered pilaf cluster) | the risotto-style cluster 4.6–6 (#4, #13, #14, #15, #18) is another style; #6 1.0 |
| Tomato (red version) | 4 firm + 2 optional of 20 | n/a | variant only | n/a | n/a |

## Method (counts are weighted 2 / 1 / 0.5; raw in brackets)

- **Onions softened first:** 31.5 (18/20). The exceptions are #6, where everything goes in raw, and #16, where the spinach goes in first.
- **Rice toasted in the oil for at least a minute:** 16.5 (9) vs not toasted 17.5 (11). This is a tie. The current recipe does not toast, and that is kept.
- **Spinach timing:**
  - Wilted before the rice: 21.5 (13).
  - Rice first, then raw spinach: 6 (3).
  - Spinach stirred into cooked rice at the end, to keep it green: 6 (3). All three are Greek chefs doing a risotto-style dish.
  - Everything at once: 0.5 (1).
- **Lid:**
  - Covered: 21 (12).
  - Partly covered: 1.
  - Uncovered and stirred: 3–4. These are the risotto-style recipes and #7.
  - Not stated: 3.
- **Simmer:** median 20 min. The range is 10–45; #1 at 45 min is an outlier.
- **Lemon:**
  - At the end or off the heat: 18/20.
  - Some of it early: 4. #9 puts it all in with the water; #3 and #5 put half on the rice.
- **Dill:** at the end, or in the last 5 minutes, in 12. Two more split it, with the stems early and the leaves late. Four add it early.
- **Rest:** 9 mention one. Where timed, it is 2–3, 5–10, 10, 10 and 10 minutes, covered or under a towel.
- **Texture:** loose, creamy or "μελωμένο" in 10. A dry, separate-grain pilaf in 2–3. Not stated in about 7.

**Variants**, noted and not driving the consensus:

- **Red (κοκκινιστό):** tomato or paste replaces part of the water (#3, #8, #12, #19). Lemon is usually still used.
- **Risotto-style chef's version** (#4, #14, #17): toasted rice, stock, stirred uncovered, with the spinach added late. Akis adds wine.
- **Extras:** fennel in 3 and leek in 8.

## Consensus recipe (English)

```js
  {
    id: "spanakorizo",
    name: "Spanakorizo",
    native: "Σπανακόρυζο",
    line: "Spinach and rice cooked together with spring onion, dill and lemon.",
    story: "A spring dish for when the spinach is everywhere and cheap: a bowl of green rice that is somewhere between a pilaf and a risotto, finished with a lot of lemon.",
    serves: "4",
    time: "About 45 minutes",
    fasting: true,
    vessel: "pot",
    key: ["spinach", "rice", "dill", "lemon", "springonion"],
    ingredients: [
      { id: "spinach", amount: "750 g, washed and roughly chopped" },
      { id: "rice", amount: "160 g medium grain" },
      { id: "springonion", amount: "4, sliced" },
      { id: "onion", amount: "1, chopped" },
      { id: "dill", amount: "½ bunch" },
      { id: "lemon", amount: "1, juiced, and wedges" },
      { id: "oil", amount: "90 ml" },
      { id: "salt", amount: "to taste" },
      { id: "blackpepper", amount: "to taste" },
    ],
    method: [
      {
        text: "Soften the onion and spring onions in two-thirds of the oil without letting them colour.",
        prep: { onion: "chopped", springonion: "sliced" },
        add: ["oil", "onion", "springonion"],
        heat: 2,
        wait: "5 min",
        sauce: "#e0d38a",
      },
      {
        text: "Add the spinach a handful at a time, letting each wilt before the next.",
        why: "This much spinach will not fit at once — but it collapses to a tenth of its size in a minute of heat.",
        prep: { spinach: "washed and chopped" },
        add: ["spinach"],
        heat: 2,
        wait: "5 min",
        sauce: "#6f8f3a",
      },
      {
        text: "Stir in the rice, about 500 ml hot water and salt. Cover and simmer gently until the rice is tender and most of the liquid has gone.",
        why: "It should end a little loose and creamy, not dry — the Greek way with rice.",
        add: ["rice", "salt"],
        heat: 1,
        wait: "20 min",
        sauce: "#7d9a45",
      },
      {
        text: "Off the heat, stir in the dill, lemon juice, pepper and the rest of the oil. Cover and rest ten minutes before serving.",
        why: "Dill and lemon both fade with cooking; added last they keep the dish bright. The raw oil at the end tastes of olives, not of the pan.",
        prep: { dill: "chopped", lemon: "juiced" },
        add: ["dill", "lemon", "blackpepper"],
        heat: 0,
        wait: "10 min",
        sauce: "#7d9a45",
      },
    ],
    serve: "With lemon wedges, olives — and often feta.",
    table: {
      dairy: "Dairy-free in the pot; feta on the side for whoever eats it.",
    },
  },
```

No new pantry item is needed. Leek appears in 8 of 20 sources, which is under half. It would need a pantry entry, and it is not required.

## Consensus recipe (bokmål)

```js
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
```

## Confidence

**Strong agreement.**
- Onions first and spinach before the rice.
- Medium-grain rice.
- Covered for about 20 minutes.
- Dill and lemon at the end.
- A loose, creamy result.

**Real disagreement.**
- *Spinach quantity.* The data is bimodal: Greek-language sources use 1 kg and English sources about 500 g. 750 g is a judgement between them, not a clean median.
- *Liquid.* A pilaf cluster sits at about 2.5–3 ml per g of rice and a risotto-style chef cluster at about 5 ml per g. The consensus follows the covered-pilaf majority.
- *Toasting the rice* is a tie.

**Data caveats.**
- Three sources had assumed servings.
- Akis was read second-hand.
- Cup-to-gram conversions for rice are ±10%.
