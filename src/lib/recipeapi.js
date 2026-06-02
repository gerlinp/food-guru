// Recipe API — https://recipe-api.com
// Docs: https://recipe-api.com/docs

const RECIPE_API = 'https://recipe-api.com/api/v1';

// Supported cuisines (from Recipe API)
const MEALDB_CUISINES = [
  'American', 'Asian', 'British', 'Caribbean', 'Central America', 'Chinese',
  'Eastern Europe', 'French', 'German', 'Indian', 'Italian', 'Japanese',
  'Korean', 'Latin America', 'Mediterranean', 'Mexican', 'Middle Eastern',
  'Nordic', 'North African', 'Seafood', 'Southeast Asian', 'South Asian',
];

function getRecipeApiHeaders() {
  return {
    'Content-Type': 'application/json',
    ...(RECIPE_API_KEY && RECIPE_API_KEY !== 'your-recipe-api-key-here' ? { 'X-API-Key': RECIPE_API_KEY } : {}),
  };
}

async function searchRecipesByIngredients(ingredients, cuisine = null) {
  try {
    const params = new URLSearchParams();

    // Add ingredients as a query search
    if (ingredients && ingredients.length > 0) {
      const ingredientQuery = ingredients.slice(0, 5).join(' ');
      params.append('q', ingredientQuery);
    }

    if (cuisine) {
      params.append('cuisine', cuisine);
    }

    params.append('per_page', '8');

    const url = `${RECIPE_API}/recipes?${params.toString()}`;
    const res = await fetch(url, {
      headers: getRecipeApiHeaders(),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    // Transform and save API response
    const recipes = (data.data || []).map(recipe => ({
      id: recipe.id,
      title: recipe.name,
      thumb: null, // Recipe API doesn't return thumbnails in search
      matchCount: ingredients ? ingredients.length : 0,
      matchedIngredients: ingredients || [],
      description: recipe.description,
      cuisine: recipe.cuisine,
      category: recipe.category,
      difficulty: recipe.difficulty,
    }));

    // Save to local DB in background (don't block the response)
    if (typeof saveRecipes !== 'undefined') {
      saveRecipes(recipes).catch(err => console.warn('Failed to cache recipes:', err));
    }

    // Log search
    if (typeof logSearch !== 'undefined') {
      logSearch((ingredients || []).join(', '), recipes.length).catch(e => console.warn('Failed to log search:', e));
    }

    return recipes;
  } catch (error) {
    console.error('Recipe API search error:', error);
    return [];
  }
}

async function getRecipeDetails(id) {
  try {
    const res = await fetch(`${RECIPE_API}/recipes/${id}`, {
      headers: getRecipeApiHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Recipe not found: ${res.status}`);
    }

    const data = await res.json();
    const recipe = data.data;

    // Parse ingredients from grouped structure
    const ingredients = [];
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(item => {
            const qtyParts = [];
            if (item.quantity) qtyParts.push(item.quantity);
            if (item.unit) qtyParts.push(item.unit);
            ingredients.push({
              qty: qtyParts.join(' '),
              item: item.name,
            });
          });
        }
      });
    }

    // Parse instructions
    const steps = (recipe.instructions || [])
      .map(instruction => instruction.text)
      .filter(text => text && text.length > 0);

    const recipeDetails = {
      id: recipe.id,
      title: recipe.name,
      image: null,
      cuisine: recipe.cuisine || '',
      category: recipe.category || '',
      ingredients,
      steps,
      youtubeUrl: null,
      sourceUrl: null,
      difficulty: recipe.difficulty,
      meta: recipe.meta,
      nutrition: recipe.nutrition,
    };

    // Save full recipe to DB in background
    if (typeof saveRecipe !== 'undefined') {
      saveRecipe(recipeDetails).catch(err => console.warn('Failed to cache recipe:', err));
    }

    return recipeDetails;
  } catch (error) {
    console.error('Recipe API detail error:', error);
    throw error;
  }
}
