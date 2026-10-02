/*
 * swaps/everyday.js — stand-ins for the everyday pantry, for when you do not have it.
 * Each entry is bilingual on purpose: a stand-in is three short lines, and
 * keeping English and bokmål side by side stops them drifting apart.
 *   use      what to use instead
 *   amount   how much, relative to the original
 *   changes  honestly, what it does to the dish
 *   contains needs it brings that the original did not ("dairy", "egg", "gluten"), if any
 * An empty list means there is no honest stand-in; the card says so.
 */
export const SWAPS_EVERYDAY = {
  /* ---------------------------------------------------------- cupboard */
  rice: [
    {
      en: { use: "Basmati or jasmine rice", amount: "The same amount", changes: "More fragrant; jasmine is a little stickier. Both fry well." },
      nb: { use: "Basmati- eller jasminris", amount: "Samme mengde", changes: "Mer duftende; jasmin er litt klissete. Begge kan stekes." },
    },
    {
      en: { use: "Boil-in-bag rice", amount: "The same amount", changes: "Quicker and foolproof, a little blander. Cook it by the packet." },
      nb: { use: "Ris i kokepose", amount: "Samme mengde", changes: "Raskere og sikrere, litt blassere. Kok etter pakken." },
    },
  ],
  pasta: [
    {
      en: { use: "Gluten-free pasta", amount: "The same amount", changes: "Softer and quicker to overcook; stir early and taste early. Check it is egg-free if that matters." },
      nb: { use: "Glutenfri pasta", amount: "Samme mengde", changes: "Mykere og fortere overkokt; rør tidlig og smak tidlig. Sjekk at den er eggfri hvis det betyr noe." },
    },
    {
      en: { use: "Rice noodles", amount: "Three-quarters of the amount", changes: "Softer and slippier, but just as plain — soak, do not boil." },
      nb: { use: "Risnudler", amount: "Tre fjerdedeler av mengden", changes: "Mykere og glattere, men like enkle — bløtlegg, ikke kok." },
    },
  ],
  gfpasta: [
    {
      en: { use: "Rice noodles", amount: "Three-quarters of the amount", changes: "Softer and slippier, but just as plain — soak, do not boil." },
      nb: { use: "Risnudler", amount: "Tre fjerdedeler av mengden", changes: "Mykere og glattere, men like enkle — bløtlegg, ikke kok." },
    },
    {
      en: { use: "Ordinary wheat pasta, for plates that can have gluten", amount: "The same amount", changes: "Firmer and more forgiving, but not gluten-free — cook it in its own pot." },
      nb: { use: "Vanlig hvetepasta, til tallerkener som tåler gluten", amount: "Samme mengde", changes: "Fastere og mer tilgivende, men ikke glutenfri — kok den i egen kjele." },
      contains: ["gluten"],
    },
  ],
  ricenoodles: [
    {
      en: { use: "Rice vermicelli", amount: "The same amount", changes: "Thinner and softer in a couple of minutes; children often like them more." },
      nb: { use: "Risvermicelli", amount: "Samme mengde", changes: "Tynnere og myke på et par minutter; barn liker dem ofte bedre." },
    },
    {
      en: { use: "Gluten-free pasta", amount: "A little more", changes: "Firmer and less slippery; boil it rather than soaking." },
      nb: { use: "Glutenfri pasta", amount: "Litt mer", changes: "Fastere og mindre glatt; kok den i stedet for å bløtlegge." },
    },
  ],
  oil: [
    {
      en: { use: "Rapeseed or sunflower oil", amount: "The same amount", changes: "Neutral where olive oil is fruity; best for frying, plainer in mash." },
      nb: { use: "Raps- eller solsikkeolje", amount: "Samme mengde", changes: "Nøytral der olivenolje er fruktig; best til steking, blassere i mos." },
    },
    {
      en: { use: "Butter, for plates that can have dairy", amount: "The same amount", changes: "Richer, and what most mash and corn is made with — but not dairy-free." },
      nb: { use: "Smør, til tallerkener som tåler melk", amount: "Samme mengde", changes: "Fyldigere, og det de fleste lager mos og mais med — men ikke melkefritt." },
      contains: ["dairy"],
    },
  ],
  salt: [],
  tamari: [
    {
      en: { use: "Coconut aminos", amount: "A little more", changes: "Sweeter and milder, and free of soy and wheat." },
      nb: { use: "Kokosaminos", amount: "Litt mer", changes: "Søtere og mildere, og uten soya og hvete." },
    },
    {
      en: { use: "Salt", amount: "A good pinch", changes: "Seasons the rice but loses the dark savoury taste and colour." },
      nb: { use: "Salt", amount: "En god klype", changes: "Krydrer risen, men mister den mørke, fyldige smaken og fargen." },
    },
    {
      en: { use: "Ordinary soy sauce", amount: "The same amount", changes: "Tastes almost the same, but is brewed with wheat." },
      nb: { use: "Vanlig soyasaus", amount: "Samme mengde", changes: "Smaker nesten likt, men er brygget med hvete." },
      contains: ["gluten"],
    },
  ],
  ketchup: [
    {
      en: { use: "Tomato purée with a little sugar and vinegar", amount: "2 tbsp purée, a pinch of sugar, a few drops of vinegar", changes: "Sharper and less smooth, but close enough to dip in." },
      nb: { use: "Tomatpuré med litt sukker og eddik", amount: "2 ss puré, en klype sukker, noen dråper eddik", changes: "Skarpere og mindre glatt, men nært nok til å dyppe i." },
    },
    {
      en: { use: "Nothing but salt", amount: "—", changes: "Plenty of children eat chips plain. The rest will say so." },
      nb: { use: "Bare salt", amount: "—", changes: "Mange barn spiser ovnspoteter uten noe. Resten sier fra." },
    },
  ],

  /* --------------------------------------------------------------- veg */
  potato: [
    {
      en: { use: "Sweet potato", amount: "The same weight", changes: "Sweeter and softer; wedges brown faster, so check them sooner." },
      nb: { use: "Søtpotet", amount: "Samme vekt", changes: "Søtere og mykere; båtene blir brune fortere, så sjekk dem tidligere." },
    },
    {
      en: { use: "Frozen oven chips", amount: "The same weight", changes: "Quicker; most are just potato and oil, but some coatings have wheat — check the bag." },
      nb: { use: "Frosne ovnspoteter", amount: "Samme vekt", changes: "Raskere; de fleste er bare potet og olje, men noen er vendt i noe med hvete — sjekk posen." },
    },
  ],
  carrot: [
    {
      en: { use: "Frozen diced carrot or mixed veg, in fried rice", amount: "The same amount", changes: "Softer, but no chopping. Raw sticks need fresh carrots." },
      nb: { use: "Frosne gulrotterninger eller grønnsaksblanding, i stekt ris", amount: "Samme mengde", changes: "Mykere, men ingen hakking. Rå staver krever ferske gulrøtter." },
    },
    {
      en: { use: "Sugar snap peas, for the stick plate", amount: "A handful", changes: "Just as sweet and crunchy, a different green." },
      nb: { use: "Sukkererter, til stavfatet", amount: "En neve", changes: "Like søte og sprø, bare grønne." },
    },
  ],
  cucumber: [
    {
      en: { use: "Celery sticks", amount: "The same amount", changes: "Crunchier and stringier, with a stronger taste many children dislike." },
      nb: { use: "Stangselleri", amount: "Samme mengde", changes: "Sprøere og trådete, med en kraftigere smak mange barn ikke liker." },
    },
    {
      en: { use: "More carrot and pepper", amount: "Make up the plate", changes: "Loses the cool, watery one, but the plate stays full." },
      nb: { use: "Mer gulrot og paprika", amount: "Fyll opp fatet", changes: "Mister den kjølige, saftige, men fatet blir like fullt." },
    },
  ],
  pepper: [
    {
      en: { use: "Yellow or orange pepper", amount: "The same amount", changes: "Nearly as sweet; green ones are sharper and less liked." },
      nb: { use: "Gul eller oransje paprika", amount: "Samme mengde", changes: "Nesten like søt; grønne er skarpere og mindre populære." },
    },
    {
      en: { use: "Cherry tomatoes, halved", amount: "A handful", changes: "Sweet and juicy instead of crunchy." },
      nb: { use: "Cherrytomater, delt i to", amount: "En neve", changes: "Søte og saftige i stedet for sprø." },
    },
  ],
  corncob: [
    {
      en: { use: "Sweetcorn kernels, frozen or tinned", amount: "About 100 g per cob", changes: "The same taste, eaten with a spoon instead of in the hand." },
      nb: { use: "Maiskorn, frosne eller fra boks", amount: "Omtrent 100 g per kolbe", changes: "Samme smak, spist med skje i stedet for med hendene." },
    },
  ],
  springonion: [
    {
      en: { use: "Chives", amount: "The same amount, snipped", changes: "Milder and finer; almost the same on top." },
      nb: { use: "Gressløk", amount: "Samme mengde, klippet", changes: "Mildere og finere; nesten likt strødd på toppen." },
    },
    {
      en: { use: "Leave them out", amount: "—", changes: "Many children would rather you did; the rice is still good." },
      nb: { use: "Dropp dem", amount: "—", changes: "Mange barn foretrekker det; risen er god likevel." },
    },
  ],

  /* ------------------------------------------------------------ fridge */
  butter: [
    {
      en: { use: "Olive oil", amount: "About the same amount", changes: "Fruitier and less rich, and dairy-free. In mash, add some potato cooking water too." },
      nb: { use: "Olivenolje", amount: "Omtrent samme mengde", changes: "Mer fruktig og mindre fyldig, og melkefri. I mos, ha i litt av kokevannet også." },
    },
    {
      en: { use: "Dairy-free spread", amount: "The same amount", changes: "Closest to butter in taste and melt; check the tub, as some contain buttermilk." },
      nb: { use: "Melkefritt margarin", amount: "Samme mengde", changes: "Nærmest smør i smak og smelting; sjekk boksen, for noen inneholder kjernemelk." },
    },
  ],
  milk: [
    {
      en: { use: "Potato cooking water", amount: "The same amount", changes: "Dairy-free and already in the pot; the mash is lighter and less creamy." },
      nb: { use: "Kokevann fra potetene", amount: "Samme mengde", changes: "Melkefritt og allerede i kjelen; mosen blir lettere og mindre kremet." },
    },
    {
      en: { use: "Unsweetened oat drink", amount: "The same amount", changes: "Creamy and mild, and dairy-free; some oat drinks are not gluten-free, so check the carton." },
      nb: { use: "Usøtet havredrikk", amount: "Samme mengde", changes: "Kremet og mild, og melkefri; noen havredrikker er ikke glutenfrie, så sjekk kartongen." },
    },
  ],
  eggs: [
    {
      en: { use: "Leave them out", amount: "—", changes: "The fried rice is still good, just plainer — and egg-free." },
      nb: { use: "Dropp dem", amount: "—", changes: "Den stekte risen er god likevel, bare enklere — og eggfri." },
    },
    {
      en: { use: "A little extra veg, such as sweetcorn or more peas", amount: "A handful", changes: "Brings back colour and sweetness, not the soft egg pieces." },
      nb: { use: "Litt ekstra grønnsaker, som mais eller mer erter", amount: "En neve", changes: "Gir tilbake farge og sødme, men ikke de myke eggbitene." },
    },
  ],

  /* ----------------------------------------------------------- freezer */
  peas: [
    {
      en: { use: "Frozen green beans, cut short", amount: "The same amount", changes: "Less sweet and a little longer to cook." },
      nb: { use: "Frosne aspargesbønner, skåret korte", amount: "Samme mengde", changes: "Mindre søte og trenger litt lengre tid." },
    },
    {
      en: { use: "Tinned peas, drained", amount: "The same amount", changes: "Softer and paler; only warm them through." },
      nb: { use: "Erter fra boks, avrent", amount: "Samme mengde", changes: "Mykere og blekere; bare varm dem gjennom." },
    },
  ],
  sweetcorn: [
    {
      en: { use: "Tinned sweetcorn, drained", amount: "The same amount", changes: "Almost the same; only warm it through." },
      nb: { use: "Mais fra boks, avrent", amount: "Samme mengde", changes: "Nesten likt; bare varm den gjennom." },
    },
    {
      en: { use: "Kernels cut from a cooked cob", amount: "About 100 g per cob", changes: "Sweeter and fresher, and a little more work." },
      nb: { use: "Korn skåret av en kokt kolbe", amount: "Omtrent 100 g per kolbe", changes: "Søtere og friskere, og litt mer arbeid." },
    },
  ],
};
