// TheMealDB API — free, no key required
// Docs: https://www.themealdb.com/api.php

const MEALDB = 'https://www.themealdb.com/api/json/v1/1';

// Strips descriptors so specific ingredient names generalize to what TheMealDB knows.
// e.g. "boneless skinless chicken thighs" → "chicken thighs"
//      "extra virgin olive oil"           → "olive oil"
//      "baby spinach"                     → "spinach"
//      "thick-cut bacon"                  → "bacon"

const DESCRIPTOR_RE = /\b(boneless|skinless|skin-on|bone-in|extra|virgin|fresh|dried|whole|ground|sliced|diced|chopped|minced|grated|shredded|frozen|canned|cooked|raw|organic|free-range|pasture-raised|unsalted|salted|low-sodium|low-fat|full-fat|part-skim|grass-fed|grain-fed|aged|sharp|mild|sweet|smoked|unsmoked|ripe|thick-cut|thin-cut|quick|instant|stone-ground|pearled|semi-pearled|baby|wild|farmed|jumbo|large|small|medium|fine|coarse|dark|light|golden|2%|1%|80\/20|90\/10|U\/10|U\/15)\b/gi;

// Manual overrides for cases the regex can't handle cleanly
const OVERRIDES = {
  'salmon fillet':              'salmon',
  'cod fillet':                 'cod',
  'halibut fillet':             'halibut',
  'sea bass fillet':            'sea bass',
  'tilapia fillet':             'tilapia',
  'trout fillet':               'trout',
  'tuna steak':                 'tuna',
  'swordfish steak':            'swordfish',
  'mahi mahi':                  'mahi mahi',
  'ribeye steak':               'beef',
  'ny strip steak':             'beef',
  'sirloin steak':              'beef',
  'flank steak':                'beef',
  'skirt steak':                'beef',
  'beef chuck roast':           'beef',
  'ground beef':                'beef',
  'ground pork':                'pork',
  'ground lamb':                'lamb',
  'ground chicken':             'chicken',
  'ground turkey':              'turkey',
  'heavy cream':                'cream',
  'heavy whipping cream':       'cream',
  'half and half':              'cream',
  'all-purpose flour':          'flour',
  'bread flour':                'flour',
  'whole wheat flour':          'flour',
  'evaporated milk':            'milk',
  'sweetened condensed milk':   'milk',
  'parmigiano-reggiano':        'parmesan',
  'pecorino romano':            'parmesan',
  'cremini mushrooms':          'mushrooms',
  'shiitake mushrooms':         'mushrooms',
  'portobello mushrooms':       'mushrooms',
  'cherry tomatoes':            'tomatoes',
  'roma tomatoes':              'tomatoes',
  'grape tomatoes':             'tomatoes',
  'heirloom tomatoes':          'tomatoes',
  'red bell pepper':            'red pepper',
  'green bell pepper':          'green pepper',
  'yellow bell pepper':         'yellow pepper',
  'extra virgin olive oil':     'olive oil',
  'toasted sesame oil':         'sesame oil',
  'russet potatoes':            'potatoes',
  'yukon gold potatoes':        'potatoes',
  'red potatoes':               'potatoes',
  'fingerling potatoes':        'potatoes',
  'sweet potatoes':             'sweet potato',
  'yellow onion':               'onion',
  'white onion':                'onion',
  'red onion':                  'onion',
  'green onions':               'spring onions',
  'scallions':                  'spring onions',
  'flat-leaf parsley':          'parsley',
  'thai basil':                 'basil',
  'lacinato kale':              'kale',
  'napa cabbage':               'cabbage',
  'butternut squash':           'butternut squash',
  'acorn squash':               'squash',
  'spaghetti squash':           'squash',
  'kabocha squash':             'squash',
};

function generalizeIngredient(raw) {
  const lower = raw.toLowerCase().trim();
  if (OVERRIDES[lower]) return OVERRIDES[lower];
  const cleaned = lower
    .replace(DESCRIPTOR_RE, '')
    .replace(/\s+/g, ' ')
    .trim();
  // If cleaning removed everything, fall back to original
  return cleaned || lower;
}

// TheMealDB supported cuisine areas — used for autocomplete and filtering
const MEALDB_CUISINES = [
  'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
  'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish', 'Italian',
  'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan',
  'Polish', 'Portuguese', 'Russian', 'Spanish', 'Thai', 'Tunisian',
  'Turkish', 'Ukrainian', 'Vietnamese',
];

async function searchMealsByIngredients(ingredients, cuisine = null) {
  const generalized = [...new Set(ingredients.map(generalizeIngredient))].slice(0, 5);

  // Fetch ingredient results + optional cuisine results in parallel
  const [ingredientResults, cuisineMealIds] = await Promise.all([
    Promise.all(
      generalized.map(ing =>
        fetch(`${MEALDB}/filter.php?i=${encodeURIComponent(ing)}`)
          .then(r => r.json())
          .then(d => d.meals || [])
          .catch(() => [])
      )
    ),
    cuisine
      ? fetch(`${MEALDB}/filter.php?a=${encodeURIComponent(cuisine)}`)
          .then(r => r.json())
          .then(d => new Set((d.meals || []).map(m => m.idMeal)))
          .catch(() => null)
      : Promise.resolve(null),
  ]);

  // Map generalized term back to original for display
  const originalByGeneralized = {};
  ingredients.forEach(orig => {
    const g = generalizeIngredient(orig);
    if (!originalByGeneralized[g]) originalByGeneralized[g] = orig;
  });

  const mealMap = new Map();
  ingredientResults.forEach((meals, idx) => {
    const displayName = originalByGeneralized[generalized[idx]] || generalized[idx];
    meals.forEach(meal => {
      // If cuisine filter is active, skip meals not in that cuisine
      if (cuisineMealIds && !cuisineMealIds.has(meal.idMeal)) return;
      if (!mealMap.has(meal.idMeal)) {
        mealMap.set(meal.idMeal, {
          id:    meal.idMeal,
          title: meal.strMeal,
          thumb: meal.strMealThumb,
          matchCount: 0,
          matchedIngredients: [],
        });
      }
      const entry = mealMap.get(meal.idMeal);
      entry.matchCount++;
      entry.matchedIngredients.push(displayName);
    });
  });

  // If cuisine only (no ingredients), show top meals from that cuisine
  if (ingredients.length === 0 && cuisineMealIds) {
    const cuisineMeals = await fetch(`${MEALDB}/filter.php?a=${encodeURIComponent(cuisine)}`)
      .then(r => r.json())
      .then(d => d.meals || [])
      .catch(() => []);
    cuisineMeals.slice(0, 8).forEach(meal => {
      if (!mealMap.has(meal.idMeal)) {
        mealMap.set(meal.idMeal, {
          id: meal.idMeal, title: meal.strMeal, thumb: meal.strMealThumb,
          matchCount: 0, matchedIngredients: [],
        });
      }
    });
  }

  return [...mealMap.values()]
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 8);
}

async function getMealDetails(id) {
  const res  = await fetch(`${MEALDB}/lookup.php?i=${id}`);
  const data = await res.json();
  const m    = data.meals?.[0];
  if (!m) throw new Error('Meal not found');

  // Parse ingredients — stored as strIngredient1…20 + strMeasure1…20
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const item = m[`strIngredient${i}`]?.trim();
    const qty  = m[`strMeasure${i}`]?.trim();
    if (item) ingredients.push({ qty: qty || '', item });
  }

  // Split instructions into steps
  const raw   = m.strInstructions || '';
  const steps = raw
    .split(/\r?\n|\r/)
    .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(l => l.length > 10);

  return {
    id:          m.idMeal,
    title:       m.strMeal,
    image:       m.strMealThumb,
    cuisine:     m.strArea   || '',
    category:    m.strCategory || '',
    ingredients,
    steps,
    youtubeUrl:  m.strYoutube  || null,
    sourceUrl:   m.strSource   || null,
  };
}
