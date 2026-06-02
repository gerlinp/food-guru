// TheMealDB API — free, no key required
// Docs: https://www.themealdb.com/api.php

const MEALDB = 'https://www.themealdb.com/api/json/v1/1';

// Descriptor removal for ingredient generalization
const DESCRIPTOR_RE = /\b(boneless|skinless|skin-on|bone-in|extra|virgin|fresh|dried|whole|ground|sliced|diced|chopped|minced|grated|shredded|frozen|canned|cooked|raw|organic|free-range|pasture-raised|unsalted|salted|low-sodium|low-fat|full-fat|part-skim|grass-fed|grain-fed|aged|sharp|mild|sweet|smoked|unsmoked|ripe|thick-cut|thin-cut|quick|instant|stone-ground|pearled|semi-pearled|baby|wild|farmed|jumbo|large|small|medium|fine|coarse|dark|light|golden)\b/gi;

const OVERRIDES = {
  'salmon fillet': 'salmon',
  'cod fillet': 'cod',
  'ground beef': 'beef',
  'ground pork': 'pork',
  'ground chicken': 'chicken',
  'heavy cream': 'cream',
  'all-purpose flour': 'flour',
  'parmesan cheese': 'parmesan',
  'olive oil': 'olive oil',
  'soy sauce': 'soy sauce',
};

function generalizeIngredient(raw) {
  const lower = raw.toLowerCase().trim();
  if (OVERRIDES[lower]) return OVERRIDES[lower];
  const cleaned = lower
    .replace(DESCRIPTOR_RE, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned || lower;
}

// TheMealDB supported cuisines
const RECIPE_API_CUISINES = [
  'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
  'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish', 'Italian',
  'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan',
  'Polish', 'Portuguese', 'Russian', 'Spanish', 'Thai', 'Tunisian',
  'Turkish', 'Ukrainian', 'Vietnamese',
];

// Calculate health grade (A-F) based on ingredient analysis
function calculateNutritionScore(ingredients) {
  if (!ingredients || ingredients.length === 0) return { score: 50, grade: 'D' };

  let score = 50;

  // More ingredients = better balanced
  if (ingredients.length > 6) score += 15;
  else if (ingredients.length > 4) score += 8;

  const ingredientText = ingredients.join(' ').toLowerCase();

  // Reward healthy ingredients
  const healthyKeywords = ['vegetable', 'fruit', 'protein', 'fish', 'chicken', 'bean', 'lentil', 'olive oil', 'yogurt', 'herb'];
  healthyKeywords.forEach(kw => {
    if (ingredientText.includes(kw)) score += 3;
  });

  // Penalize unhealthy ingredients
  const unhealthyKeywords = ['fried', 'deep fried', 'cream', 'butter', 'sugar', 'candy'];
  unhealthyKeywords.forEach(kw => {
    if (ingredientText.includes(kw)) score -= 5;
  });

  const clampedScore = Math.max(0, Math.min(100, score));
  if (clampedScore >= 80) return { score: clampedScore, grade: 'A' };
  if (clampedScore >= 65) return { score: clampedScore, grade: 'B' };
  if (clampedScore >= 50) return { score: clampedScore, grade: 'C' };
  if (clampedScore >= 35) return { score: clampedScore, grade: 'D' };
  return { score: clampedScore, grade: 'F' };
}

async function searchRecipesByIngredientsAndCuisine(ingredients, cuisine = null) {
  // TheMealDB: search by ingredients, optionally filter by cuisine

  try {
    if (ingredients.length === 0 && !cuisine) {
      return [];
    }

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
            id: meal.idMeal,
            title: meal.strMeal,
            thumb: meal.strMealThumb,
            matchCount: 0,
            matchedIngredients: new Set(),
            searchedIngredients: new Set(),
          });
        }
        const entry = mealMap.get(meal.idMeal);
        entry.matchCount++;
        entry.searchedIngredients.add(displayName);
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
            id: meal.idMeal,
            title: meal.strMeal,
            thumb: meal.strMealThumb,
            matchCount: 0,
            matchedIngredients: new Set(),
            searchedIngredients: new Set(),
          });
        }
      });
    }

    // Get top results and fetch details for them to verify ingredient matches
    const topMeals = [...mealMap.values()]
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5); // Only fetch details for top 5 to avoid rate limiting

    const mealDetailsPromises = topMeals.map(meal =>
      fetch(`${MEALDB}/lookup.php?i=${meal.id}`)
        .then(r => r.json())
        .then(d => {
          const m = d.meals?.[0];
          if (!m) return meal;

          // Extract actual ingredients from the meal
          const actualIngredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = m[`strIngredient${i}`]?.trim();
            if (ing) actualIngredients.push(ing.toLowerCase());
          }

          // Match searched ingredients against actual recipe ingredients
          ingredients.forEach(searchIng => {
            const searchLower = searchIng.toLowerCase();
            const isMatched = actualIngredients.some(recipeIng =>
              recipeIng.includes(searchLower) || searchLower.includes(recipeIng)
            );
            if (isMatched) {
              meal.matchedIngredients.add(searchIng);
            }
          });

          return meal;
        })
        .catch(() => meal)
    );

    const mealsWithDetails = await Promise.all(mealDetailsPromises);

    // Merge back with remaining meals (that we didn't fetch details for)
    const remainingMeals = [...mealMap.values()].filter(m => !topMeals.includes(m));
    const allResults = [...mealsWithDetails, ...remainingMeals];

    // Calculate health grades and format results
    const results = allResults.map(meal => {
      const matchedArray = Array.from(meal.matchedIngredients.size > 0 ? meal.matchedIngredients : meal.searchedIngredients);
      const nutritionScore = calculateNutritionScore(matchedArray);
      return {
        id: meal.id,
        title: meal.title,
        thumb: meal.thumb,
        cuisine: cuisine || 'Unknown',
        difficulty: 'Unknown',
        totalTime: null,
        servings: null,
        matchedIngredients: matchedArray,
        nutrition: null,
        healthGrade: nutritionScore?.grade,
        healthScore: nutritionScore?.score,
      };
    });

    // Sort by: match count (desc) → health grade (A > F)
    return results
      .sort((a, b) => {
        const gradeOrder = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };

        if (a.matchedIngredients.length !== b.matchedIngredients.length) {
          return b.matchedIngredients.length - a.matchedIngredients.length;
        }

        const gradeA = gradeOrder[a.healthGrade] || 0;
        const gradeB = gradeOrder[b.healthGrade] || 0;
        return gradeB - gradeA;
      });
  } catch (e) {
    console.error('[mealdb] search error:', e);
    throw e;
  }
}

async function getRecipeDetail(id) {
  try {
    if (!id) throw new Error('No recipe ID provided');

    const url = `${MEALDB}/lookup.php?i=${id}`;
    console.log('[mealdb] fetching detail:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const m = data.meals?.[0];
    if (!m) throw new Error('Meal not found in response');

    // Parse ingredients — stored as strIngredient1…20 + strMeasure1…20
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const item = m[`strIngredient${i}`]?.trim();
      const qty = m[`strMeasure${i}`]?.trim();
      if (item) ingredients.push({ qty: qty || '', item });
    }

    // Split instructions into steps
    const raw = m.strInstructions || '';
    const steps = raw
      .split(/\r?\n|\r/)
      .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(l => l.length > 10);

    return {
      id: m.idMeal,
      title: m.strMeal,
      image: m.strMealThumb,
      cuisine: m.strArea || '',
      category: m.strCategory || '',
      ingredients,
      steps,
      youtubeUrl: m.strYoutube || null,
      sourceUrl: m.strSource || null,
    };
  } catch (e) {
    console.error('[mealdb] detail error:', e);
    throw e;
  }
}

async function getCuisines() {
  return RECIPE_API_CUISINES;
}
