/*
 * swaps/vietnam.js — stand-ins for the Vietnamese pantry, for when you do not have it.
 * Each entry is bilingual on purpose: a stand-in is three short lines, and
 * keeping English and bokmål side by side stops them drifting apart.
 *   use      what to use instead
 *   amount   how much, relative to the original
 *   changes  honestly, what it does to the dish
 *   contains needs it brings that the original did not ("dairy", "egg", "gluten"), if any
 * An empty list means there is no honest stand-in; the card says so.
 */
export const SWAPS_VIETNAM = {
  /* ------------------------------------------------------------- herbs */
  thaibasil: [
    {
      en: { use: "Ordinary basil and a little mint", amount: "The same amount", changes: "Sweeter and softer, without the anise note." },
      nb: { use: "Vanlig basilikum og litt mynte", amount: "Samme mengde", changes: "Søtere og mildere, uten anistonen." },
    },
    {
      en: { use: "Ordinary basil alone", amount: "The same amount", changes: "Fine in a bowl of phở, but rounder and without the liquorice edge." },
      nb: { use: "Bare vanlig basilikum", amount: "Samme mengde", changes: "Fungerer i phở, men rundere og uten lakrisbittet." },
    },
  ],
  coriander: [
    {
      en: { use: "Flat-leaf parsley", amount: "The same amount", changes: "Green and fresh, but without coriander's citrus and soapiness." },
      nb: { use: "Bladpersille", amount: "Samme mengde", changes: "Grønt og friskt, men uten korianderens sitrustone." },
    },
    {
      en: { use: "More mint and basil", amount: "Make up the bunch", changes: "Still herby; the bowl leans sweeter and cooler." },
      nb: { use: "Mer mynte og basilikum", amount: "Fyll opp bunten", changes: "Fortsatt urterikt, men søtere og kjøligere." },
    },
  ],
  mint: [
    {
      en: { use: "More coriander and basil", amount: "Make up the bunch", changes: "Loses the cool lift, but the rolls stay full of herbs." },
      nb: { use: "Mer koriander og basilikum", amount: "Fyll opp bunten", changes: "Mister det kjølige, men rullene blir like urterike." },
    },
  ],
  springonion: [
    {
      en: { use: "Chives", amount: "The same amount, snipped", changes: "Milder and finer; almost the same on top of a bowl." },
      nb: { use: "Gressløk", amount: "Samme mengde, klippet", changes: "Mildere og finere; nesten likt strødd over en bolle." },
    },
    {
      en: { use: "Leek greens, sliced paper-thin", amount: "Half the amount", changes: "Tougher and more oniony; slice very thin." },
      nb: { use: "Det grønne av purre, skåret tynt", amount: "Halv mengde", changes: "Seigere og mer løkaktig; skjær det veldig tynt." },
    },
  ],

  /* ------------------------------------------------------------ spices */
  staranise: [
    {
      en: { use: "Fennel seeds", amount: "1 tsp for every 2 pods", changes: "The same family of flavour, sweeter and less deep." },
      nb: { use: "Fennikelfrø", amount: "1 ts per 2 stjerner", changes: "Samme slags smak, men søtere og mindre dyp." },
    },
    {
      en: { use: "Five-spice powder, in a tea bag or cloth", amount: "½ tsp for the whole pot", changes: "Has star anise in it, but brings extra spices and can cloud the broth." },
      nb: { use: "Femkrydder, i en tepose eller klut", amount: "½ ts til hele gryta", changes: "Inneholder stjerneanis, men gir flere krydder og kan blakke kraften." },
    },
  ],
  cassia: [
    {
      en: { use: "A cinnamon stick", amount: "One and a half times as much", changes: "Ceylon cinnamon is gentler and sweeter; hardly noticed in phở." },
      nb: { use: "Kanelstang", amount: "Halvannen gang så mye", changes: "Mildere og søtere, men knapt merkbart i phở." },
    },
    {
      en: { use: "Ground cinnamon", amount: "A small pinch", changes: "Works, but powder clouds the broth — tie it in cloth." },
      nb: { use: "Malt kanel", amount: "En liten klype", changes: "Fungerer, men pulver blakker kraften — bind det inn i en klut." },
    },
  ],
  cloves: [
    {
      en: { use: "Allspice berries", amount: "The same number", changes: "Warmer and rounder, less sharp; the broth barely changes." },
      nb: { use: "Hel allehånde", amount: "Samme antall", changes: "Varmere og rundere, mindre skarpt; kraften endrer seg knapt." },
    },
    {
      en: { use: "Leave them out", amount: "—", changes: "Cloves are a background note; the phở is still phở without them." },
      nb: { use: "Dropp dem", amount: "—", changes: "Nellik er en bakgrunnstone; phở blir fortsatt phở uten." },
    },
  ],
  blackpepper: [
    {
      en: { use: "White pepper", amount: "A little less", changes: "Hotter and earthier, less fragrant — also used in Vietnam." },
      nb: { use: "Hvit pepper", amount: "Litt mindre", changes: "Sterkere og jordligere, mindre aromatisk — brukes også i Vietnam." },
    },
    {
      en: { use: "Ready-ground black pepper", amount: "The same amount", changes: "Duller; the braised fish loses some of its bite." },
      nb: { use: "Ferdigmalt sort pepper", amount: "Samme mengde", changes: "Flatere; fisken mister noe av bittet." },
    },
  ],

  /* ------------------------------------------------------------ market */
  shallots: [
    {
      en: { use: "Red onion", amount: "About half the volume", changes: "Sharper and less sweet; slice it thin." },
      nb: { use: "Rødløk", amount: "Omtrent halvparten", changes: "Skarpere og mindre søt; skjær den tynt." },
    },
    {
      en: { use: "Yellow onion", amount: "About half the volume", changes: "Harsher raw, but fine once cooked in the braise." },
      nb: { use: "Gul løk", amount: "Omtrent halvparten", changes: "Skarpere rå, men helt greit kokt i fisken." },
    },
    {
      en: { use: "Shop-bought crispy fried onions, for topping", amount: "A handful", changes: "Quick and crunchy, but most are coated in wheat flour." },
      nb: { use: "Ferdig ristet løk, til topping", amount: "En håndfull", changes: "Raskt og sprøtt, men de fleste er vendt i hvetemel." },
      contains: ["gluten"],
    },
  ],
  garlic: [
    {
      en: { use: "Garlic from a jar or tube", amount: "½ tsp per clove", changes: "Flatter and a little sour; it spits and burns faster in the wok." },
      nb: { use: "Hvitløk fra glass eller tube", amount: "½ ts per fedd", changes: "Flatere og litt syrlig; spruter og svir fortere i woken." },
    },
    {
      en: { use: "Garlic powder", amount: "¼ tsp per clove", changes: "Only for the braise; it cannot fry golden or float in nước chấm." },
      nb: { use: "Hvitløkspulver", amount: "¼ ts per fedd", changes: "Bare til fisken; det kan ikke stekes gyllent eller flyte i nước chấm." },
    },
  ],
  ginger: [
    {
      en: { use: "Ginger from a jar or tube", amount: "1 tbsp per thumb", changes: "Cannot be charred, so the broth loses its smoky sweetness." },
      nb: { use: "Ingefær fra glass eller tube", amount: "1 ss per tommel", changes: "Kan ikke svis, så kraften mister den røkte sødmen." },
    },
    {
      en: { use: "Ground ginger", amount: "½ tsp", changes: "A weak, dusty warmth; better than none, far from fresh." },
      nb: { use: "Malt ingefær", amount: "½ ts", changes: "En svak, støvete varme; bedre enn ingenting, langt fra fersk." },
    },
  ],
  onion: [
    {
      en: { use: "Red onion", amount: "The same", changes: "Chars and sweetens the same; the broth may darken slightly." },
      nb: { use: "Rødløk", amount: "Samme mengde", changes: "Svis og søtner like godt; kraften kan bli litt mørkere." },
    },
    {
      en: { use: "Shallots", amount: "3–4 for one onion", changes: "Sweeter; char them whole and in their skins." },
      nb: { use: "Sjalottløk", amount: "3–4 for én løk", changes: "Søtere; svi dem hele, med skallet på." },
    },
  ],
  chilli: [
    {
      en: { use: "Any fresh red chilli", amount: "More, to taste", changes: "Larger chillies are milder and fleshier; taste before adding more." },
      nb: { use: "Hvilken som helst fersk rød chili", amount: "Mer, etter smak", changes: "Store chilier er mildere og kjøttfullere; smak før du tar mer." },
    },
    {
      en: { use: "Dried chilli flakes", amount: "A pinch per chilli", changes: "Heat without freshness; they will not float prettily in nước chấm." },
      nb: { use: "Tørkede chiliflak", amount: "En klype per chili", changes: "Varme uten friskhet; de flyter ikke pent i nước chấm." },
    },
    {
      en: { use: "Sriracha or sambal oelek, on the table", amount: "A little, to taste", changes: "Brings garlic and vinegar too; fine at the bowl, wrong in nước chấm." },
      nb: { use: "Sriracha eller sambal oelek, på bordet", amount: "Litt, etter smak", changes: "Gir også hvitløk og eddik; greit i bollen, feil i nước chấm." },
    },
  ],
  lime: [
    {
      en: { use: "Lemon", amount: "The same amount", changes: "Sharper and less floral; almost no one will notice." },
      nb: { use: "Sitron", amount: "Samme mengde", changes: "Skarpere og mindre blomstrete; nesten ingen merker det." },
    },
    {
      en: { use: "Bottled lime juice", amount: "A little less", changes: "Duller and slightly bitter; fine in nước chấm, sad squeezed over phở." },
      nb: { use: "Limejuice på flaske", amount: "Litt mindre", changes: "Flatere og litt bitter; greit i nước chấm, trist over phở." },
    },
    {
      en: { use: "Rice vinegar", amount: "About two-thirds", changes: "Sour without fruit; the sauce tastes flatter." },
      nb: { use: "Riseddik", amount: "Omtrent to tredjedeler", changes: "Syrlig uten frukt; sausen smaker flatere." },
    },
  ],
  beansprouts: [
    {
      en: { use: "White cabbage, shredded very fine", amount: "A smaller handful", changes: "Crunch without the sprouts' juiciness; a stronger cabbage taste." },
      nb: { use: "Hvitkål, strimlet veldig fint", amount: "En mindre håndfull", changes: "Knas uten spirenes saftighet, og tydeligere kålsmak." },
    },
    {
      en: { use: "Leave them out", amount: "—", changes: "The bowl loses its crunch, nothing else." },
      nb: { use: "Dropp dem", amount: "—", changes: "Bollen mister knasingen, ellers ingenting." },
    },
  ],
  lettuce: [
    {
      en: { use: "Little gem or iceberg", amount: "The same", changes: "Crisper and stiffer; tear out the thick ribs so the roll stays tight." },
      nb: { use: "Hjertesalat eller isberg", amount: "Samme mengde", changes: "Sprøere og stivere; riv bort de tykke nervene så rullen blir stram." },
    },
    {
      en: { use: "Chinese leaf", amount: "The same, leaves only", changes: "Milder and juicier; the white ribs are too thick to roll." },
      nb: { use: "Kinakål", amount: "Samme mengde, bare bladene", changes: "Mildere og saftigere; de hvite stilkene er for tykke å rulle." },
    },
  ],
  waterspinach: [
    {
      en: { use: "Spinach", amount: "The same weight", changes: "Wilts in seconds and has no crisp stems; add it all at once." },
      nb: { use: "Spinat", amount: "Samme vekt", changes: "Faller sammen på sekunder og har ingen sprø stilker; ha i alt på en gang." },
    },
    {
      en: { use: "Pak choi", amount: "The same weight", changes: "Juicier stems and a milder leaf; closest in crunch." },
      nb: { use: "Pak choi", amount: "Samme vekt", changes: "Saftigere stilker og mildere blad; nærmest i knas." },
    },
    {
      en: { use: "Tenderstem broccoli", amount: "The same weight", changes: "Needs a few minutes more; a good dish, a different vegetable." },
      nb: { use: "Brokkolini", amount: "Samme vekt", changes: "Trenger noen minutter mer; en god rett, men en annen grønnsak." },
    },
  ],

  /* --------------------------------------------------------------- dry */
  ricenoodles: [
    {
      en: { use: "Pad thai rice noodles", amount: "The same weight", changes: "Essentially the same noodle; slightly firmer." },
      nb: { use: "Risnudler til pad thai", amount: "Samme vekt", changes: "I praksis samme nudel, bare litt fastere." },
    },
    {
      en: { use: "Rice vermicelli", amount: "The same weight", changes: "Thin and round, so a softer bowl — closer to bún than phở." },
      nb: { use: "Tynne risnudler (vermicelli)", amount: "Samme vekt", changes: "Tynne og runde, så bollen blir mykere — nærmere bún enn phở." },
    },
    {
      en: { use: "Glass noodles", amount: "Slightly less", changes: "Slippery and springy, made from mung bean; a different texture." },
      nb: { use: "Glassnudler", amount: "Litt mindre", changes: "Glatte og spenstige, laget av mungbønner; en annen konsistens." },
    },
  ],
  vermicelli: [
    {
      en: { use: "Glass noodles", amount: "The same weight", changes: "Chewier and see-through; rinse cold the same way." },
      nb: { use: "Glassnudler", amount: "Samme vekt", changes: "Seigere og gjennomsiktige; skyll dem kalde på samme måte." },
    },
    {
      en: { use: "Thin flat rice noodles", amount: "The same weight", changes: "Bulkier in the roll; cut them shorter after cooking." },
      nb: { use: "Tynne flate risnudler", amount: "Samme vekt", changes: "Fyller mer i rullen; klipp dem kortere etter koking." },
    },
  ],
  ricepaper: [
    {
      en: { use: "Whole soft lettuce leaves", amount: "One leaf per roll", changes: "No longer gỏi cuốn: a lettuce wrap, crisper and looser." },
      nb: { use: "Hele, myke salatblader", amount: "Ett blad per rull", changes: "Ikke lenger gỏi cuốn, men en salatwrap — sprøere og løsere." },
    },
  ],
  sugar: [
    {
      en: { use: "Light brown sugar", amount: "The same amount", changes: "A faint caramel note; the caramel darkens faster, so watch it." },
      nb: { use: "Lys brunt sukker", amount: "Samme mengde", changes: "En svak karamelltone; karamellen mørkner fortere, så følg med." },
    },
    {
      en: { use: "Honey, for nước chấm only", amount: "A little less", changes: "Floral and dissolves easily; it burns too fast for the braise caramel." },
      nb: { use: "Honning, bare i nước chấm", amount: "Litt mindre", changes: "Blomstrete og løser seg lett; den svir for fort til karamellen." },
    },
  ],

  /* ----------------------------------------------------------- bottles */
  fishsauce: [
    {
      en: { use: "Anchovy fillets mashed with a little salt and water", amount: "2 fillets per tbsp", changes: "The same fish at its root, but oilier and less clean." },
      nb: { use: "Ansjosfileter i olje (ikke søtsaltet «ansjos»), moset med litt salt og vann", amount: "2 fileter per ss", changes: "Samme fisk i bunnen, men fetere og mindre rent." },
    },
    {
      en: { use: "Tamari (check the label)", amount: "A little less", changes: "Salty and savoury but not fishy; the dish tastes of soy." },
      nb: { use: "Tamari (sjekk etiketten)", amount: "Litt mindre", changes: "Salt og fyldig, men ikke fiskete; retten smaker soya." },
    },
    {
      en: { use: "Soy sauce", amount: "A little less", changes: "Salty but not fishy, and brewed with wheat." },
      nb: { use: "Soyasaus", amount: "Litt mindre", changes: "Salt, men ikke fiskete, og brygget med hvete." },
      contains: ["gluten"],
    },
  ],
  neutraloil: [
    {
      en: { use: "Rapeseed or sunflower oil", amount: "The same", changes: "Nothing — either is a neutral oil." },
      nb: { use: "Raps- eller solsikkeolje", amount: "Samme mengde", changes: "Ingenting — begge er nøytrale oljer." },
    },
    {
      en: { use: "Light (not extra virgin) olive oil", amount: "The same", changes: "A faint olive taste and it smokes sooner; keep the heat a notch lower." },
      nb: { use: "Lett olivenolje (ikke extra virgin)", amount: "Samme mengde", changes: "Svak olivensmak og ryker tidligere; hold varmen litt lavere." },
    },
  ],
  soysauce: [
    {
      en: { use: "Tamari (check the label)", amount: "The same amount", changes: "Darker and a little richer; usually wheat-free." },
      nb: { use: "Tamari (sjekk etiketten)", amount: "Samme mengde", changes: "Mørkere og litt fyldigere; som regel uten hvete." },
    },
    {
      en: { use: "Fish sauce", amount: "About two-thirds", changes: "Saltier and fishy, and no longer vegetarian." },
      nb: { use: "Fiskesaus", amount: "Omtrent to tredjedeler", changes: "Saltere og fiskete, og ikke lenger vegetarisk." },
    },
    {
      en: { use: "Coconut aminos", amount: "A little more", changes: "Sweeter and much less salty; add a pinch of salt." },
      nb: { use: "Kokosaminos", amount: "Litt mer", changes: "Søtere og langt mindre salt; ha i en klype salt." },
    },
  ],
  hoisin: [
    {
      en: { use: "Tamari, peanut butter, sugar and a drop of vinegar, stirred together", amount: "1 tbsp each, ½ tsp vinegar", changes: "Close for the peanut dip; less dark and without hoisin's spice." },
      nb: { use: "Tamari, peanøttsmør, sukker og en skvett eddik, rørt sammen", amount: "1 ss av hver, ½ ts eddik", changes: "Nær nok til peanøttdippen; lysere og uten hoisinens krydder." },
    },
    {
      en: { use: "A hoisin labelled gluten-free", amount: "The same", changes: "Much the same; such bottles exist but are rare." },
      nb: { use: "Hoisin merket glutenfri", amount: "Samme mengde", changes: "Omtrent det samme; slike flasker finnes, men er sjeldne." },
    },
    {
      en: { use: "Leave it off and serve nước chấm", amount: "—", changes: "Salt-sour instead of sweet-thick; the traditional dip anyway." },
      nb: { use: "Dropp den og server nước chấm", amount: "—", changes: "Salt og syrlig i stedet for søtt og tykt; den tradisjonelle dippen uansett." },
    },
  ],

  /* -------------------------------------------------------------- cold */
  beef: [
    {
      en: { use: "Oxtail, shin or short rib for the bones and brisket; any tender steak for the sirloin", amount: "The same weight", changes: "Still phở bò; oxtail makes it richer and fattier." },
      nb: { use: "Oksehale, skank eller høyrygg i stedet for bein og bryst; en mør biff i stedet for ytrefilet", amount: "Samme vekt", changes: "Fortsatt phở bò; oksehale gir en fyldigere, fetere kraft." },
    },
    {
      en: { use: "A whole chicken or chicken thighs", amount: "About 1.5 kg", changes: "A different dish — phở gà — lighter, and done in half the time." },
      nb: { use: "En hel kylling eller kyllinglår", amount: "Omtrent 1,5 kg", changes: "En annen rett — phở gà — lettere, og ferdig på halve tiden." },
    },
  ],
  prawns: [
    {
      en: { use: "Cooked peeled prawns", amount: "The same weight", changes: "Smaller and softer, so the stripes no longer show through." },
      nb: { use: "Kokte, pillede reker", amount: "Samme vekt", changes: "Mindre og mykere, så stripene ikke synes gjennom papiret." },
    },
    {
      en: { use: "Thin slices of boiled pork belly or chicken", amount: "The same weight", changes: "Meatier; pork belly with prawns is a common Vietnamese filling anyway." },
      nb: { use: "Tynne skiver kokt sideflesk eller kylling", amount: "Samme vekt", changes: "Kjøttfullere; sideflesk er uansett et vanlig fyll i Vietnam." },
    },
    {
      en: { use: "Firm tofu, fried golden and sliced", amount: "About 200 g", changes: "Makes them vegetarian rolls — gỏi cuốn chay, a dish of its own." },
      nb: { use: "Fast tofu, stekt gyllen og skåret i skiver", amount: "Omtrent 200 g", changes: "Gir vegetarruller — gỏi cuốn chay, en egen rett." },
    },
  ],
  fish: [
    {
      en: { use: "Pangasius", amount: "The same weight", changes: "It is a catfish, but sold as fillets: braise it for less time." },
      nb: { use: "Pangasius", amount: "Samme vekt", changes: "Det er en malle, men selges som filet: kok den kortere." },
    },
    {
      en: { use: "Mackerel or salmon steaks", amount: "The same weight", changes: "Oilier and richer; both are braised this way in Vietnam too." },
      nb: { use: "Makrell- eller laksekoteletter", amount: "Samme vekt", changes: "Fetere og fyldigere; begge kokes slik i Vietnam også." },
    },
    {
      en: { use: "Cod or another white fish, in thick pieces", amount: "The same weight", changes: "Flakes apart easily; add it later and turn it gently." },
      nb: { use: "Torsk eller annen hvit fisk, i tykke stykker", amount: "Samme vekt", changes: "Faller lett fra hverandre; ha den i senere og snu forsiktig." },
    },
  ],
};
