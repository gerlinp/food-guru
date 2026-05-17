// ─── Default data ────────────────────────────────────────────────────────────
const RECIPES_DEFAULT = [
  { id:'tagliatelle', title:'Brown Butter Tagliatelle with Crispy Sage', author:'Lina Tovar', cuisine:'Italian', category:'Pasta', tags:['comfort','30-min','vegetarian'], minutes:35, servings:4, difficulty:'Intermediate', rating:4.8, reviews:312, tint:'t5',
    description:'A weeknight Northern Italian classic — nutty browned butter clinging to fresh ribbons of egg pasta, finished with fried sage and a snowfall of Parmigiano.',
    ingredients:[{qty:'12 oz',item:'fresh tagliatelle'},{qty:'8 tbsp',item:'unsalted butter'},{qty:'20',item:'fresh sage leaves'},{qty:'2 cloves',item:'garlic, smashed'},{qty:'½ cup',item:'Parmigiano-Reggiano, finely grated'},{qty:'1 tsp',item:'lemon zest'},{qty:'¼ tsp',item:'freshly grated nutmeg'},{qty:'to taste',item:'flaky sea salt + black pepper'}],
    steps:['Bring a large pot of well-salted water to a boil. Drop the tagliatelle and cook until just shy of al dente, about 2 minutes for fresh pasta.','Meanwhile, melt the butter in a wide skillet over medium heat. Add the garlic and sage and swirl the pan constantly. The butter will foam, then quiet — keep going until the milk solids turn a deep hazelnut brown and smell toasted, about 4–5 minutes.','Pull the sage out onto a plate (it should be crisp), then kill the heat. Add a ladle of pasta water to stop the cooking.','Transfer the pasta straight into the skillet with tongs. Toss vigorously for a full minute, adding splashes of pasta water until the sauce glosses every ribbon.','Off the heat, shower with Parmigiano, lemon zest, and nutmeg. Toss again, taste, and adjust salt.','Plate immediately. Crown each portion with the crisp sage leaves, a final flurry of cheese, and a few cracks of pepper.'],
    notes:"The pan should be hot enough that the butter is actively bubbling — that's where the toasted flavor comes from. If it goes dark too fast, slide the pan off the burner for a few seconds." },
  { id:'eggplant', title:'Miso-Glazed Eggplant Steaks', author:'Hiro Watanabe', cuisine:'Japanese', category:'Vegetable Mains', tags:['vegan','umami','sheet-pan'], minutes:40, servings:2, difficulty:'Easy', rating:4.9, reviews:188, tint:'t6' },
  { id:'risotto', title:'Saffron Risotto alla Milanese', author:'Giulia Romano', cuisine:'Italian', category:'Rice', tags:['classic','creamy'], minutes:45, servings:4, difficulty:'Intermediate', rating:4.7, reviews:521, tint:'t5' },
  { id:'meatballs', title:'Smoky Harissa Lamb Meatballs', author:'Yasmin Beldi', cuisine:'North African', category:'Main', tags:['spicy','one-pan'], minutes:55, servings:6, difficulty:'Easy', rating:4.6, reviews:274, tint:'t2' },
  { id:'octopus', title:'Galician-Style Octopus with Smoked Paprika', author:'Paco Mendez', cuisine:'Spanish', category:'Seafood', tags:['weekend','showstopper'], minutes:90, servings:4, difficulty:'Advanced', rating:4.9, reviews:96, tint:'t3' },
  { id:'steak', title:'Charred Scallion Chimichurri Skirt Steak', author:'Mariana Acosta', cuisine:'Argentine', category:'Grill', tags:['quick','grill','high-heat'], minutes:30, servings:4, difficulty:'Easy', rating:4.8, reviews:401, tint:'t1' },
  { id:'cauliflower', title:'Roasted Cauliflower with Tahini & Pomegranate', author:'Noor Habash', cuisine:'Levantine', category:'Sides', tags:['vegan','sheet-pan'], minutes:40, servings:4, difficulty:'Easy', rating:4.7, reviews:219, tint:'t4' },
  { id:'mango', title:'Coconut Mango Sticky Rice', author:'Anong Suwan', cuisine:'Thai', category:'Dessert', tags:['summer','gluten-free'], minutes:50, servings:4, difficulty:'Easy', rating:4.9, reviews:612, tint:'t7' },
  { id:'chicken-parm-sandwich', title:'Chicken Parm Sandwich', author:'Guru', cuisine:'Italian-American', category:'Sandwiches', tags:['comfort','crispy','weekend'], minutes:45, servings:2, difficulty:'Intermediate', rating:4.8, reviews:0, tint:'t2',
    description:'A proper chicken parm sandwich — pounded breast in a seasoned panko crust, quick tomato sauce, garlicky butter-toasted bread, and a two-minute mozzarella melt. One breast makes two sandwiches.',
    ingredients:[
      {qty:'1',       item:'chicken breast'},
      {qty:'to taste',item:'salt'},
      {qty:'to taste',item:'black pepper'},
      {qty:'to taste',item:'garlic powder'},
      {qty:'1 cup',   item:'flour (varies with breast size)'},
      {qty:'1–2',     item:'large eggs, beaten'},
      {qty:'to cover',item:'panko breadcrumbs'},
      {qty:'1 tsp',   item:'dried oregano (divided — some into panko, some into sauce)'},
      {qty:'1 tsp',   item:'red pepper flakes'},
      {qty:'1 tsp',   item:'sugar'},
      {qty:'1 can (15 oz)', item:'tomato sauce'},
      {qty:'1 can (6 oz)',  item:'tomato paste'},
      {qty:'4 tbsp',  item:'unsalted butter'},
      {qty:'2 cloves',item:'garlic, minced'},
      {qty:'to taste',item:'parsley flakes or fresh parsley'},
      {qty:'to taste',item:'Parmesan, grated'},
      {qty:'to cover',item:'fresh mozzarella, sliced'},
      {qty:'2',       item:'ciabatta or French bread rolls'},
      {qty:'as needed',item:'neutral cooking oil, for frying'},
      {qty:'drizzle', item:'olive oil, for finishing (optional)'},
    ],
    steps:[
      'Using a meat mallet, pound the chicken breast until it is completely even in thickness from end to end. Cut in half — one breast makes two sandwiches.',
      'Season both sides generously with salt, pepper, and garlic powder. Mix a pinch of garlic powder and a pinch of oregano into the panko breadcrumbs.',
      'Set up a breading station: flour, beaten eggs, then seasoned panko. Dip the chicken in each in that order, making sure it is fully coated at every stage before moving on.',
      'Fry in oil heated to 350°F for about 10 minutes, turning once, until golden and cooked through. Timing will vary with the thickness of the breast — keep watch.',
      'While the chicken fries, make the sauce: stir together the tomato sauce, tomato paste, 1 tsp oregano, 1 tsp red pepper flakes, 1 tsp garlic powder, 1 tsp sugar, and salt and pepper to taste.',
      'Make the garlic butter: mix softened butter with minced garlic, a handful of Parmesan, and parsley. Spread on the cut sides of the rolls and cook on a skillet or under the broiler until golden.',
      'Place the fried cutlets on a baking sheet. Spoon sauce over each and lay mozzarella on top. Bake at 375°F for 2–5 minutes, just until the cheese is melted — pull it before it dries out.',
      'To assemble: spread tomato sauce on the bottom bun, lay the sauced chicken on top, and drizzle with olive oil before crowning with the garlic bread top.',
    ],
    notes:'One breast makes two sandwiches — cut it before pounding so each half is uniformly thin and fries evenly. Do not skip the olive oil drizzle at the end; it pulls the whole thing together.' },
];

const REVIEWS_DEFAULT = [
  { id:'nostro', name:'Nostro', cuisine:'Northern Italian', city:'Brooklyn, NY', neighborhood:'Cobble Hill', rating:4.5, price:'$$$', author:'Lina Tovar', date:'May 12, 2026', headline:'A pasta room with bigger ideas than the dough.', excerpt:"The hand-pulled tagliarini gets top billing, but it's the brown-butter agnolotti — fragile, mineral, almost translucent — that lingers on the drive home.", tint:'t5', standout:'Brown-butter agnolotti' },
  { id:'sebo', name:'Sebo', cuisine:'Omakase', city:'San Francisco, CA', neighborhood:'Hayes Valley', rating:4.9, price:'$$$$', author:'Hiro Watanabe', date:'May 6, 2026', headline:'The most quietly confident omakase on the West Coast.', excerpt:"Twelve courses, three hours, zero showmanship. Chef Kanazawa moves like he's been waiting for you all day. The kohada cure alone justifies the price of admission.", tint:'t4', standout:'Kohada (gizzard shad)' },
  { id:'casa-lola', name:'Casa Lola', cuisine:'Modern Mexican', city:'Mexico City, MX', neighborhood:'Roma Norte', rating:4.8, price:'$$$', author:'Mariana Acosta', date:'Apr 29, 2026', headline:'A love letter to the corn she grew up on.', excerpt:"Chef Lola Sandoval cooks with a kind of reverent ferocity. The huitlacoche masa tarts and the goat-cheek tamal are the meal of the year so far.", tint:'t2', standout:'Goat-cheek tamal' },
  { id:'tatami', name:'Tatami', cuisine:'Izakaya', city:'Brooklyn, NY', neighborhood:'Bed-Stuy', rating:4.6, price:'$$', author:'Sasha Aoki', date:'Apr 22, 2026', headline:'Late-night drinking food, treated like it matters.', excerpt:"A 24-seat counter, an open binchotan grill, and a list of nine highballs. The chicken-skin gyoza and the smoked sardine onigiri are reason enough to wait for a stool.", tint:'t6', standout:'Chicken-skin gyoza' },
  { id:'larder', name:'The Larder', cuisine:'Farm-to-table', city:'Asheville, NC', neighborhood:'West Asheville', rating:4.4, price:'$$$', author:'Yasmin Beldi', date:'Apr 15, 2026', headline:'Quiet seasonal cooking that earns every ingredient.', excerpt:"It would be easy to call this place precious, but everything on the plate is the result of a real relationship with a real farm down the road. The whey-braised pork shoulder is a thing of beauty.", tint:'t1', standout:'Whey-braised pork' },
  { id:'meson', name:'Mesón Sevilla', cuisine:'Andalusian tapas', city:'Madrid, ES', neighborhood:'La Latina', rating:4.7, price:'$$', author:'Paco Mendez', date:'Apr 4, 2026', headline:'A century-old tapas bar that still beats the new guard.', excerpt:"Stand at the bar, order three rounds of croquetas and the bone-in jamón, and don't leave until you've had the salt-cured anchovy. Cash only, no apologies.", tint:'t7', standout:'Croquetas de jamón' },
  { id:'akaroa', name:'Akaroa', cuisine:'Modern New Zealand', city:'Los Angeles, CA', neighborhood:'Silver Lake', rating:4.6, price:'$$$', author:'Noor Habash', date:'Mar 28, 2026', headline:'Antipodean cooking that finally feels at home in LA.', excerpt:"The smoked kahawai dip is on every table for a reason. Chef Olafson's vegetable cookery — especially the charred cabbage with horopito — is the quiet star.", tint:'t3', standout:'Charred cabbage with horopito' },
];

const SITE_SETTINGS_DEFAULT = {
  brand:            'The Hungry Guru',
  heroEyebrow:      'Curated by the Guru',
  heroHeadline:     'Favorite recipes,',
  heroHeadlineEm:   'favorite restaurants.',
  heroSub:          'A working notebook of the dishes the Guru cooks on repeat and the rooms she keeps going back to — every recipe tested in three home kitchens, every restaurant visited at least twice before it makes the page.',
  featuredRecipeId: 'tagliatelle',
  stats: [
    { num: '1,240+', label: 'Recipes from 84 cooks' },
    { num: '3×',     label: 'Home-kitchen tested' },
    { num: '32',     label: 'Cuisines covered' },
    { num: '4.9 ★',  label: 'Across 18,000 reviews' },
  ],
  footerDesc: "A working notebook of the Guru's favorite recipes and the restaurants she'd send you to. Tested twice, written honestly.",
  reviewsIntro: 'Long-form reviews from our editors and contributing cooks — written after at least two visits, never comped, and always with a recommendation we\'d send our closest friend. New entries every Wednesday.',
};

// ─── Live data (loaded from localStorage, mutated in-place by admin) ─────────
const RECIPES = JSON.parse(localStorage.getItem('guru_recipes')) || [...RECIPES_DEFAULT.map(r => ({...r}))];
const REVIEWS = JSON.parse(localStorage.getItem('guru_reviews')) || [...REVIEWS_DEFAULT.map(r => ({...r}))];
const SITE_SETTINGS = Object.assign({}, SITE_SETTINGS_DEFAULT, JSON.parse(localStorage.getItem('guru_settings')) || {});

// ─── Persist helpers (called by Admin) ───────────────────────────────────────
function adminSyncRecipes(next) {
  localStorage.setItem('guru_recipes', JSON.stringify(next));
  RECIPES.splice(0, RECIPES.length, ...next);
}
function adminSyncReviews(next) {
  localStorage.setItem('guru_reviews', JSON.stringify(next));
  REVIEWS.splice(0, REVIEWS.length, ...next);
}
function adminSyncSettings(next) {
  localStorage.setItem('guru_settings', JSON.stringify(next));
  Object.assign(SITE_SETTINGS, next);
}
function adminResetAll() {
  ['guru_recipes','guru_reviews','guru_settings'].forEach(k => localStorage.removeItem(k));
  window.location.reload();
}

// ─── UI constants ─────────────────────────────────────────────────────────────
const CATEGORIES = ['All','Quick','Pasta','Vegetarian','Grill','Comfort','Baking','Desserts'];
const REVIEW_CITIES = ['All cities','Brooklyn, NY','San Francisco, CA','Mexico City, MX','Asheville, NC','Madrid, ES','Los Angeles, CA'];

const DT_DIETARY   = ['Vegan','Vegetarian','Pescatarian','Dairy-free','Gluten-free','Keto','Paleo','Low-FODMAP'];
const DT_ALLERGIES = ['Peanuts','Tree nuts','Shellfish','Eggs','Soy','Wheat','Sesame','Fish'];
const DT_CUISINES  = ['Keep as-is','Thai','Mexican','Japanese','Korean','Indian','Moroccan','French'];
const DT_EQUIPMENT = ['No oven','No stand mixer','Instant Pot','Air fryer','Single skillet only','Microwave only'];
const DT_SKILLS    = ['Beginner','Comfortable','Pro'];

// ─── Utilities ────────────────────────────────────────────────────────────────
function buildTranslation() {
  const A = s => ({ kind:'add',  text:s });
  const R = s => ({ kind:'rm',   text:s });
  const K = s => ({ kind:'keep', text:s });
  return {
    ingredients:[
      {qty:'18 oz',  item:[R('fresh tagliatelle'),  A('gluten-free fettuccine')]},
      {qty:'12 tbsp',item:[R('unsalted butter'),     A('vegan cultured butter')]},
      {qty:'30',     item:[K('fresh sage leaves')]},
      {qty:'3 cloves',item:[K('garlic, smashed')]},
      {qty:'¾ cup',  item:[R('Parmigiano-Reggiano'), A('aged cashew parm')]},
      {qty:'1½ tsp', item:[K('lemon zest')]},
      {qty:'⅜ tsp',  item:[K('freshly grated nutmeg')]},
      {qty:'2 tbsp', item:[A('nutritional yeast')],  isNew:true},
      {qty:'to taste',item:[K('flaky sea salt + black pepper')]},
    ],
    changes:[
      'Swapped butter for cultured vegan butter — it still browns and tastes nutty.',
      'Used gluten-free fettuccine; reduce cook time by 30 seconds, the starch behaves differently.',
      'Replaced Parmigiano with aged cashew parmesan + a hit of nutritional yeast for that savory edge.',
      'Scaled everything 1.5× to feed 6.',
      'Combined steps 2 and 3 to fit a 30-minute window — start the sauce while the water is heating.',
    ],
    steps:[
      'Bring a large pot of well-salted water to a boil. Drop the [gluten-free fettuccine] and cook to just shy of al dente, ~2 minutes less than the package says.',
      'While the water heats, melt the [vegan butter] in a wide skillet over medium heat. Add garlic and sage and swirl constantly until the solids turn deep hazelnut and smell toasted, ~4 minutes. Lift the sage onto a plate.',
      'Kill the heat. Add a ladle of pasta water to stop the cooking. Transfer the pasta straight in and toss for a full minute, splashing more pasta water until glossy.',
      'Off heat, shower with [cashew parm], [nutritional yeast], lemon zest, and nutmeg. Toss, taste, adjust salt.',
      'Plate, crown with crisp sage and a few cracks of pepper.',
    ],
  };
}

function scaleQty(qty, factor) {
  if (factor === 1) return qty;
  const fracs = {'½':0.5,'⅓':0.33,'¼':0.25,'⅛':0.125,'¾':0.75,'⅔':0.66,'⅜':0.375};
  const m = qty.match(/^([\d⅛¼⅓⅜½⅔¾]+(?:\.\d+)?)(.*)$/);
  if (!m) return qty;
  let n = parseFloat(m[1]);
  if (isNaN(n)) n = fracs[m[1]] || NaN;
  if (isNaN(n)) return qty;
  return `${Math.round(n * factor * 4) / 4}${m[2]}`;
}
