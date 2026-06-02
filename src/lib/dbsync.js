// Database sync service — manages caching and offline fallback

let syncInitialized = false;

async function initializeSync() {
  if (syncInitialized) return;
  try {
    await initDB();
    syncInitialized = true;
    console.log('Database sync initialized');
  } catch (err) {
    console.error('Failed to initialize database sync:', err);
  }
}

// Try API first, fall back to cached results
async function searchWithFallback(ingredients, cuisine = null) {
  try {
    // Try fresh API call
    return await searchRecipesByIngredients(ingredients, cuisine);
  } catch (error) {
    console.warn('API search failed, falling back to cache:', error);

    // Fall back to local DB
    try {
      const filters = {};
      if (cuisine) filters.cuisine = cuisine;
      if (ingredients && ingredients.length > 0) {
        filters.ingredients = ingredients;
      }
      return await getRecipesByFilters(filters);
    } catch (fallbackErr) {
      console.error('Cache fallback also failed:', fallbackErr);
      return [];
    }
  }
}

// Load recipe with fallback
async function getRecipeWithFallback(id) {
  try {
    // Try API first
    return await getRecipeDetails(id);
  } catch (error) {
    console.warn('API fetch failed, checking cache:', error);

    // Fall back to cached version
    try {
      const cached = await getRecipe(id);
      if (cached) return cached;
      throw new Error('Recipe not found in cache');
    } catch (fallbackErr) {
      console.error('Cache fallback also failed:', fallbackErr);
      throw fallbackErr;
    }
  }
}

// Batch import recipes from API
async function seedDatabase(recipeIds) {
  const results = { success: 0, failed: 0, errors: [] };

  for (const id of recipeIds) {
    try {
      await getRecipeDetails(id);
      results.success++;
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
    } catch (err) {
      results.failed++;
      results.errors.push({ id, error: err.message });
    }
  }

  return results;
}

// Export database for backup/sharing
async function backupDatabase() {
  const data = await exportDatabase();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `food-guru-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return data;
}

// Import database from file
async function restoreDatabase(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const result = await importDatabase(data);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

// Get database statistics
async function getDatabaseInfo() {
  return await getDBStats();
}
