/*
 * i18n.js — which language the cookbook speaks, and every word it says that
 * is not cookbook content.
 *
 * TWO LAYERS, KEPT APART:
 *   STRINGS   the interface: buttons, headings, and the sentences the game
 *             assembles itself ("3 of 4 — still wants"). Some are functions,
 *             because a language is not a template with blanks in it —
 *             Norwegian says "melkefri og glutenfri", English "dairy- and
 *             gluten-free".
 *   localize  the content: each kitchen's ingredient notes and recipes,
 *             written in English in js/pantry.js, js/recipes.js and
 *             js/vietnam.js, with a bokmål overlay from js/nb.js laid over it
 *             by id (and recipe steps by position). Anything the overlay lacks
 *             falls back to English, so a missing line shows English, never a
 *             gap — and says so in the console.
 *
 * Native dish and ingredient names (Greek, Vietnamese) are never translated.
 *
 * ONE THING MUST SURVIVE TRANSLATION UNCHANGED: the English preparation words
 * ("grated", "juiced") that js/art.js reads to pick a picture. localize keeps
 * them on each step as `prepKey` beside the translated `prep` label.
 *
 * The choice is stored as kitchens.lang.v1. With nothing stored, a browser
 * that prefers Norwegian (nb, nn or no) gets bokmål and everyone else English.
 */

import { NB } from "./nb.js";

const LANG_KEY = "kitchens.lang.v1";
export const LANGS = [
  { id: "en", name: "English" },
  { id: "nb", name: "Norsk" },
];

function initial() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "nb") return saved;
  } catch {
    // No storage: fall through to the browser's preference.
  }
  const prefs = navigator.languages || [navigator.language || "en"];
  return prefs.some((l) => /^(nb|nn|no)\b/i.test(l)) ? "nb" : "en";
}

let lang = initial();
document.documentElement.lang = lang;

export const getLang = () => lang;

export function setLang(next) {
  if (next !== "en" && next !== "nb") return;
  lang = next;
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Not remembered; this visit still switches.
  }
  // js/screen.js and js/update.js are self-contained and listen for this.
  document.dispatchEvent(new CustomEvent("kitchens:lang", { detail: lang }));
}

/* ------------------------------------------------------------- the words */

const NOUN = {
  en: { dairy: "dairy", egg: "egg", gluten: "gluten" },
  nb: { dairy: "melk", egg: "egg", gluten: "gluten" },
};
const FREE = {
  en: { dairy: "dairy-free", egg: "egg-free", gluten: "gluten-free" },
  nb: { dairy: "melkefri", egg: "eggfri", gluten: "glutenfri" },
};

/** "a, b and c", in the current language. */
export function list(words) {
  const and = lang === "nb" ? "og" : "and";
  if (words.length < 2) return words.join("");
  return `${words.slice(0, -1).join(", ")} ${and} ${words[words.length - 1]}`;
}
export const noun = (need) => NOUN[lang][need];
export const free = (needs) => list(needs.map((n) => FREE[lang][n]));
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const STRINGS = {
  en: {
    "home.kicker": "An immersive cookbook",
    "home.tagline": "Choose a kitchen. Browse its pantry. Put what tempts you on the counter, and see what it could become.",
    "home.table": "Who is eating?",
    "update.title": "A new edition is ready",
    "update.sub": "Tap to take it",
    "table.kicker": "Before anything is cooked",
    "table.title": "Who is eating?",
    "table.hint": "Who sits at the table, and what each of them cooks without. Every ingredient, recipe and planned week then says what it means for them. This stays on this device and nowhere else.",
    tableShort: (people, needs) => {
      const a = people.filter((p) => p.kind === "adult").length;
      const c = people.length - a;
      const who = list([a && `${a} ${a === 1 ? "adult" : "adults"}`, c && `${c} ${c === 1 ? "child" : "children"}`].filter(Boolean));
      return needs.length ? `${who} · without ${list(needs.map(noun))}` : `${who} · eating everything`;
    },
    personAdult: (n) => `Adult ${n}`,
    personChild: (n) => `Child ${n}`,
    adults: "Adults",
    children: "Children",
    lessAdult: "One adult fewer",
    moreAdult: "One more adult",
    lessChild: "One child fewer",
    moreChild: "One more child",
    cooksWithout: (who) => `What ${who.toLowerCase()} cooks without`,
    tableFor: (need, who) => `No ${noun(need)} (${who}). `,
    sideClash: (needs, who) => `has ${list(needs.map(noun))} — the free way is in its notes, for ${who}`,
    "need.dairy": "No dairy",
    "need.dairy.sub": "Milk, butter, cheese, yogurt",
    "need.egg": "No eggs",
    "need.egg.sub": "Including in sauces and pastry",
    "need.gluten": "No gluten",
    "need.gluten.sub": "Wheat, barley, rye — and what hides them",
    "table.coeliac": "Cooking for coeliac disease? Ingredients are only half of it: crumbs on a shared board, a floured counter, a toaster or a ladle that touched the orzo are enough. Clean surfaces and separate utensils first.",
    back: "Back",
    "home.go": "Home",
    "pantry.title": "The pantry",
    "lit.recipe": "The recipe",
    "lit.done": "Done",
    "counter.title": "At home",
    "counter.clear": "Clear the list",
    "aside.ideas": "You could cook",
    "aside.all": "The dishes",
    "plan.fromHome": "Plan a week from what I have",
    haveLabel: (name) => `I have ${name.toLowerCase()} at home`,
    "set.listHome": "Already at home",
    "recipe.cook": "Cook it step by step",
    "recipe.light": "Light it up in the pantry",
    "recipe.in": "What goes in",
    "recipe.how": "How",
    "recipe.back": "Back to the pantry",
    "cook.backRecipe": "Back to the recipe",
    "cook.prev": "Previous step",
    "cook.do": "Do it",
    why: "Why?",
    "card.into": "Goes into",
    "card.close": "Back",
    exit: "Back to arcade",
    close: "Close",

    table: (needs) => (needs.length ? `Cooking without ${list(needs.map(noun))}` : "Cooking for everyone"),
    containsSr: (needs) => ` — contains ${list(needs.map(noun))}`,
    onCounter: ", at home",
    "counter.empty": "Tick what you already have on the shelves, and the dishes that could use it gather here.",
    putBackLabel: (name) => `${name}, not at home any more`,
    "ideas.empty": "Nothing ticked yet.",
    "ideas.none": "Nothing in this kitchen starts from these alone. Try adding an onion — almost everything does.",
    score: (have, total) => `${have} of ${total} — still wants`,
    "idea.ready": "Everything it needs is here",
    dishClash: (needs) => `has ${list(needs.map(noun))} — see the table notes`,
    litTitle: (name) => `What goes into ${name}`,
    litNote: (n, have) => `${n} things, glowing on the shelves${have ? ` — ${have} already at home` : ""}.`,
    putOk: "Everything is on the counter.",
    cardContains: (c, hit) => (hit.length ? `Contains ${list(c.map(noun))} — not for a ${free(hit)} plate.` : `Contains ${list(c.map(noun))}.`),
    "card.alongside": "Served alongside rather than cooked in — see the recipes' table notes.",
    "card.swaps": "Don't have it?",
    "card.noSwap": "No honest stand-in — this one is worth the trip to the shop.",
    swapClash: (needs) => `contains ${list(needs.map(noun))} — not for your table`,
    meta: (serves, time) => `Serves ${serves} · ${time}`,
    "fasting.summary": "A fasting dish — dairy-free and egg-free by tradition",
    "table.for": "For your table",
    tableNo: (need) => `No ${noun(need)}. `,
    asWritten: (need) => `${cap(FREE.en[need])} as written.`,
    clashNote: (names, hit) => `The ${names} in this recipe is not for a ${free(hit)} plate — see below for what to do instead.`,
    "tile.on": ", at home",
    serve: (s) => `To serve: ${s}`,
    heat: ["Off the heat", "Low heat", "Medium heat", "High heat"],
    "heat.oven": "In the oven",
    into: { pot: "Into the pot", tin: "Into the tin", bowl: "Into the bowl", wok: "Into the wok", plate: "Onto the plate" },
    "cook.prepare": "Prepare them",
    "cook.oven": "Into the oven",
    "cook.wait": "Let it cook",
    "cook.done": "Done",
    "cook.next": "Next step",
    "cook.table": "To the table",
    step: (i, n) => `Step ${i} of ${n}`,
    tapPrep: (how) => `tap to prepare — ${how}`,
    "cook.ready": "ready",
    "cook.asIs": "goes in as it is",
    "cook.atTable": "At the table",
    "sets.title": "Make more of one shop",
    "sets.see": "See the set",
    "sets.none": "Nothing here shares enough to make a set.",
    "sets.meal": "A meal",
    "sets.week": "This week",
    "sets.mealHint": "A table for one evening, course by course, sharing as much of the shopping as it can.",
    "sets.weekHint": "A few days from one shop, using up what spoils instead of throwing half of it away.",
    "set.kickerMeal": "A meal of it",
    "set.kickerWeek": "A week from one shop",
    "set.titleMeal": "One evening's table",
    "set.titleWeek": "Cook it across the week",
    "set.shared": "What they share",
    sharedIn: (n) => `in ${n} dishes`,
    "set.fresh": "fresh",
    "set.freshAll": "Everything fresh is used in more than one dish.",
    freshOnce: (names) => `Bought for one dish only: ${names}.`,
    "set.list": "Shopping list",
    "set.listFresh": "Fresh",
    "set.listKeeps": "From the cupboard",
    "set.copy": "Copy the list",
    "set.copied": "Copied.",
    "set.copyFail": "Could not copy — select the list above instead.",
    "set.light": "Light it all up in the pantry",
    "set.notForTable": "not for your table",
    "set.nothingShared": "Little in common beyond the cupboard — but they still make a good table together.",
    "lit.set": "The set",
    course: { main: "Main", side: "Side", starter: "Starter", sauce: "Sauce", veg: "Veg" },
    "plan.door": "Plan the week",
    "plan.doorSub": "across every kitchen",
    "plan.kicker": "Plan the week",
    "plan.title": "What are we eating this week?",
    "plan.mix": "Mix it up",
    "plan.mixSub": "a bit of everything",
    "plan.dinners": "Dinners",
    "plan.again": "Another week",
    "plan.swapMain": "Another dinner",
    "plan.swapSide": "Another side",
    "plan.swapVeg": "Another veg",
    "plan.plain": "Plain side",
    "plan.veg": "Veg",
    planBorrowed: (n) => `This kitchen has too few mains for the week so far, so ${n === 1 ? "one dinner comes" : `${n} dinners come`} from another.`,
    planShort: (n) => `There are only ${n} dinners this table can eat here; that is the week.`,
    "plan.hint": "Every dinner comes with a plain side and a veg — for the ones at the table who would rather have rice and carrots.",
    weekday: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "cook.finished": "Ready",
  },
  nb: {
    "home.kicker": "En kokebok å gå inn i",
    "home.tagline": "Velg et kjøkken. Se deg rundt i spiskammeret. Legg det som frister på benken, og se hva det kan bli til.",
    "home.table": "Hvem skal spise?",
    "update.title": "En ny utgave er klar",
    "update.sub": "Trykk for å hente den",
    "table.kicker": "Før noe blir laget",
    "table.title": "Hvem skal spise?",
    "table.hint": "Hvem som sitter rundt bordet, og hva hver av dem ikke tåler. Hver ingrediens, oppskrift og planlagt uke sier da hva det betyr for dem. Dette blir liggende på denne enheten og ingen andre steder.",
    tableShort: (people, needs) => {
      const a = people.filter((p) => p.kind === "adult").length;
      const c = people.length - a;
      const who = list([a && `${a} ${a === 1 ? "voksen" : "voksne"}`, c && `${c} barn`].filter(Boolean));
      return needs.length ? `${who} · uten ${list(needs.map(noun))}` : `${who} · spiser alt`;
    },
    personAdult: (n) => `Voksen ${n}`,
    personChild: (n) => `Barn ${n}`,
    adults: "Voksne",
    children: "Barn",
    lessAdult: "Én voksen færre",
    moreAdult: "Én voksen til",
    lessChild: "Ett barn færre",
    moreChild: "Ett barn til",
    cooksWithout: (who) => `Hva ${who.toLowerCase()} ikke tåler`,
    tableFor: (need, who) => `Uten ${noun(need)} (${who}). `,
    sideClash: (needs, who) => `har ${list(needs.map(noun))} — den frie varianten står i notatene, for ${who}`,
    "need.dairy": "Uten melk",
    "need.dairy.sub": "Melk, smør, ost, yoghurt",
    "need.egg": "Uten egg",
    "need.egg.sub": "Også i sauser og bakverk",
    "need.gluten": "Uten gluten",
    "need.gluten.sub": "Hvete, bygg, rug — og der de gjemmer seg",
    "table.coeliac": "Lager du mat til noen med cøliaki? Ingrediensene er bare halve jobben: smuler på et felles skjærebrett, en melet benk, en brødrister eller en øse som har vært i orzoen er nok. Rene flater og egne redskaper først.",
    back: "Tilbake",
    "home.go": "Hjem",
    "pantry.title": "Spiskammeret",
    "lit.recipe": "Oppskriften",
    "lit.done": "Ferdig",
    "counter.title": "Hjemme",
    "counter.clear": "Tøm lista",
    "aside.ideas": "Du kan lage",
    "aside.all": "Rettene",
    "plan.fromHome": "Planlegg en uke ut fra det jeg har",
    haveLabel: (name) => `Jeg har ${name.toLowerCase()} hjemme`,
    "set.listHome": "Har allerede hjemme",
    "recipe.cook": "Lag den steg for steg",
    "recipe.light": "Lys den opp i spiskammeret",
    "recipe.in": "Dette trenger du",
    "recipe.how": "Slik gjør du",
    "recipe.back": "Tilbake til spiskammeret",
    "cook.backRecipe": "Tilbake til oppskriften",
    "cook.prev": "Forrige steg",
    "cook.do": "Gjør det",
    why: "Hvorfor?",
    "card.into": "Brukes i",
    "card.close": "Tilbake",
    exit: "Tilbake til arkaden",
    close: "Lukk",

    table: (needs) => (needs.length ? `Lager mat uten ${list(needs.map(noun))}` : "Lager mat til alle"),
    containsSr: (needs) => ` — inneholder ${list(needs.map(noun))}`,
    onCounter: ", hjemme",
    "counter.empty": "Kryss av det du allerede har på hyllene, så samler rettene som kan bruke det seg her.",
    putBackLabel: (name) => `${name}, ikke hjemme lenger`,
    "ideas.empty": "Ingenting krysset av ennå.",
    "ideas.none": "Ingenting på dette kjøkkenet starter med bare dette. Prøv å legge til en løk — nesten alt gjør det.",
    score: (have, total) => `${have} av ${total} — mangler`,
    "idea.ready": "Alt den trenger er her",
    dishClash: (needs) => `har ${list(needs.map(noun))} — se notatene for bordet`,
    litTitle: (name) => `Dette går i ${name}`,
    litNote: (n, have) => `${n} ting lyser på hyllene${have ? ` — ${have} har du allerede hjemme` : ""}.`,
    putOk: "Alt ligger på benken.",
    cardContains: (c, hit) =>
      hit.length ? `Inneholder ${list(c.map(noun))} — ikke for en ${free(hit)} tallerken.` : `Inneholder ${list(c.map(noun))}.`,
    "card.alongside": "Serveres ved siden av heller enn å lages med — se notatene for bordet i oppskriftene.",
    "card.swaps": "Har du det ikke?",
    "card.noSwap": "Ingen god erstatning — denne er verdt turen til butikken.",
    swapClash: (needs) => `inneholder ${list(needs.map(noun))} — ikke for ditt bord`,
    meta: (serves, time) => `Porsjoner: ${serves} · ${time}`,
    "fasting.summary": "En fasterett — melkefri og eggfri etter tradisjon",
    "table.for": "For ditt bord",
    tableNo: (need) => `Uten ${noun(need)}. `,
    asWritten: (need) => `${cap(FREE.nb[need])} slik den står.`,
    clashNote: (names, hit) => `${cap(names)} i denne oppskriften passer ikke for en ${free(hit)} tallerken — se under for hva du kan gjøre i stedet.`,
    "tile.on": ", hjemme",
    serve: (s) => `Servering: ${s}`,
    heat: ["Av platen", "Lav varme", "Middels varme", "Høy varme"],
    "heat.oven": "I ovnen",
    into: { pot: "I gryta", tin: "I formen", bowl: "I bollen", wok: "I woken", plate: "På fatet" },
    "cook.prepare": "Gjør dem klare",
    "cook.oven": "Inn i ovnen",
    "cook.wait": "La det koke",
    "cook.done": "Ferdig",
    "cook.next": "Neste steg",
    "cook.table": "Til bords",
    step: (i, n) => `Steg ${i} av ${n}`,
    tapPrep: (how) => `trykk for å gjøre klar — ${how}`,
    "cook.ready": "klar",
    "cook.asIs": "går i som den er",
    "cook.atTable": "Til bords",
    "sets.title": "Få mer ut av én handletur",
    "sets.see": "Se settet",
    "sets.none": "Ingenting her deler nok til å bli et sett.",
    "sets.meal": "Et måltid",
    "sets.week": "Denne uken",
    "sets.mealHint": "Et bord for én kveld, rett for rett, som deler så mye av handlingen som mulig.",
    "sets.weekHint": "Noen dager fra én handletur, der det ferske blir brukt opp i stedet for at halvparten kastes.",
    "set.kickerMeal": "Et måltid av det",
    "set.kickerWeek": "En uke fra én handletur",
    "set.titleMeal": "Kveldens bord",
    "set.titleWeek": "Lag det utover uken",
    "set.shared": "Dette deler de",
    sharedIn: (n) => `i ${n} retter`,
    "set.fresh": "fersk",
    "set.freshAll": "Alt det ferske brukes i mer enn én rett.",
    freshOnce: (names) => `Kjøpt til bare én rett: ${names}.`,
    "set.list": "Handleliste",
    "set.listFresh": "Ferskvarer",
    "set.listKeeps": "Fra skapet",
    "set.copy": "Kopier listen",
    "set.copied": "Kopiert.",
    "set.copyFail": "Fikk ikke kopiert — marker listen over i stedet.",
    "set.light": "Lys alt opp i spiskammeret",
    "set.notForTable": "ikke for ditt bord",
    "set.nothingShared": "Lite felles utover det som står i skapet — men de blir et godt bord sammen likevel.",
    "lit.set": "Settet",
    course: { main: "Hovedrett", side: "Tilbehør", starter: "Forrett", sauce: "Saus", veg: "Grønnsak" },
    "plan.door": "Planlegg uka",
    "plan.doorSub": "på tvers av kjøkkenene",
    "plan.kicker": "Planlegg uka",
    "plan.title": "Hva skal vi spise denne uka?",
    "plan.mix": "Bland litt",
    "plan.mixSub": "litt av alt",
    "plan.dinners": "Middager",
    "plan.again": "En annen uke",
    "plan.swapMain": "En annen middag",
    "plan.swapSide": "Annet tilbehør",
    "plan.swapVeg": "Annen grønnsak",
    "plan.plain": "Enkelt tilbehør",
    "plan.veg": "Grønnsak",
    planBorrowed: (n) => `Dette kjøkkenet har for få hovedretter til hele uka foreløpig, så ${n === 1 ? "én middag kommer" : `${n} middager kommer`} fra et annet.`,
    planShort: (n) => `Det finnes bare ${n} middager dette bordet kan spise her; det blir uka.`,
    "plan.hint": "Hver middag får et enkelt tilbehør og en grønnsak — til dem rundt bordet som heller vil ha ris og gulrøtter.",
    weekday: ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],
    "cook.finished": "Ferdig",
  },
};

/** A string, or the function that builds one, called with `args`. */
export function t(key, ...args) {
  const v = key in STRINGS[lang] ? STRINGS[lang][key] : STRINGS.en[key];
  return typeof v === "function" ? v(...args) : v;
}

/** Every [data-i18n] in the page gets its words; [data-i18n-label] its aria-label and title. */
export function paintStatic(root = document) {
  for (const n of root.querySelectorAll("[data-i18n]")) n.textContent = t(n.dataset.i18n);
  for (const n of root.querySelectorAll("[data-i18n-label]")) {
    const words = t(n.dataset.i18nLabel);
    n.setAttribute("aria-label", words);
    n.title = words;
  }
}

/* ----------------------------------------------------------- the content */

const cache = new Map();
const warned = new Set();

function missing(where) {
  if (warned.has(where)) return;
  warned.add(where);
  console.warn(`Kitchens: no ${lang} text for ${where}; showing English.`);
}

/**
 * A kitchen in the current language: the English content with this
 * language's overlay laid over it. Cached per kitchen and language, and
 * returned in the same shape js/kitchens.js builds, so nothing downstream
 * knows a translation happened.
 */
export function localize(k) {
  if (lang === "en") return k;
  const key = `${k.id}:${lang}`;
  if (cache.has(key)) return cache.get(key);
  const o = (NB && NB[k.id]) || {};

  const shelves = k.shelves.map((s) => {
    const x = o.shelves?.[s.id];
    if (!x) missing(`shelf ${k.id}/${s.id}`);
    return { ...s, ...(x || {}) };
  });
  const ingredients = k.ingredients.map((i) => {
    const x = o.ingredients?.[i.id];
    if (!x) missing(`ingredient ${k.id}/${i.id}`);
    return { ...i, ...(x ? { name: x.name || i.name, info: x.info || i.info } : {}) };
  });
  const recipes = k.recipes.map((r) => {
    const x = o.recipes?.[r.id];
    if (!x) {
      missing(`recipe ${k.id}/${r.id}`);
      return { ...r, method: r.method.map((s) => ({ ...s, prepKey: s.prep })) };
    }
    return {
      ...r,
      name: x.name || r.name,
      line: x.line || r.line,
      story: x.story || r.story,
      serves: x.serves || r.serves,
      time: x.time || r.time,
      serve: x.serve || r.serve,
      ingredients: r.ingredients.map((i) => ({ ...i, amount: x.ingredients?.[i.id] || i.amount })),
      method: r.method.map((s, n) => {
        const y = x.method?.[n] || {};
        return {
          ...s,
          text: y.text || s.text,
          why: s.why ? y.why || s.why : s.why,
          wait: s.wait ? y.wait || s.wait : s.wait,
          prep: s.prep ? { ...s.prep, ...(y.prep || {}) } : s.prep,
          prepKey: s.prep,
        };
      }),
      table: { ...r.table, ...(x.table || {}) },
    };
  });

  const out = {
    ...k,
    name: o.kitchen?.name || k.name,
    intro: o.kitchen?.intro || k.intro,
    fastingNote: o.fastingNote || k.fastingNote,
    shelves,
    ingredients,
    recipes,
    byId: Object.fromEntries(ingredients.map((i) => [i.id, i])),
    recipeById: Object.fromEntries(recipes.map((r) => [r.id, r])),
  };
  cache.set(key, out);
  return out;
}
