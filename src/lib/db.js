// Local IndexedDB wrapper for recipe data persistence

const DB_NAME = 'FoodGuruDB';
const DB_VERSION = 1;

// Object stores
const STORES = {
  recipes: 'recipes',
  searches: 'searches',
  favorites: 'favorites',
};

let dbInstance = null;

function getDB() {
  if (!dbInstance) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // Recipes store: full recipe data
        if (!db.objectStoreNames.contains(STORES.recipes)) {
          const recipeStore = db.createObjectStore(STORES.recipes, { keyPath: 'id' });
          recipeStore.createIndex('cuisine', 'cuisine', { unique: false });
          recipeStore.createIndex('category', 'category', { unique: false });
          recipeStore.createIndex('difficulty', 'difficulty', { unique: false });
          recipeStore.createIndex('title', 'title', { unique: false });
          recipeStore.createIndex('savedAt', 'savedAt', { unique: false });
        }

        // Searches store: track recent searches for analytics
        if (!db.objectStoreNames.contains(STORES.searches)) {
          const searchStore = db.createObjectStore(STORES.searches, { keyPath: 'id', autoIncrement: true });
          searchStore.createIndex('query', 'query', { unique: false });
          searchStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Favorites store: user's favorite recipes
        if (!db.objectStoreNames.contains(STORES.favorites)) {
          db.createObjectStore(STORES.favorites, { keyPath: 'recipeId' });
        }
      };
    });
  }
  return Promise.resolve(dbInstance);
}

// Initialize DB
async function initDB() {
  dbInstance = await getDB();
  return dbInstance;
}

// ─── Recipes ──────────────────────────────────────────────────────────────

async function saveRecipe(recipe) {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readwrite');
  const store = tx.objectStore(STORES.recipes);

  const recipeData = {
    ...recipe,
    savedAt: Date.now(),
    source: 'recipe-api', // Track where this came from
  };

  return new Promise((resolve, reject) => {
    const request = store.put(recipeData);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(recipeData);
  });
}

async function saveRecipes(recipes) {
  return Promise.all(recipes.map(r => saveRecipe(r)));
}

async function getRecipe(id) {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readonly');
  const store = tx.objectStore(STORES.recipes);

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function searchRecipes(query) {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readonly');
  const store = tx.objectStore(STORES.recipes);
  const titleIndex = store.index('title');

  return new Promise((resolve, reject) => {
    const request = titleIndex.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const recipes = request.result;
      const q = query.toLowerCase();
      const filtered = recipes.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.ingredients?.some(ing => ing.item?.toLowerCase().includes(q))
      );
      resolve(filtered);
    };
  });
}

async function getRecipesByFilters(filters = {}) {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readonly');
  const store = tx.objectStore(STORES.recipes);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      let recipes = request.result;

      if (filters.cuisine) {
        recipes = recipes.filter(r => r.cuisine === filters.cuisine);
      }
      if (filters.category) {
        recipes = recipes.filter(r => r.category === filters.category);
      }
      if (filters.difficulty) {
        recipes = recipes.filter(r => r.difficulty === filters.difficulty);
      }
      if (filters.ingredients) {
        recipes = recipes.filter(r => {
          const recipeIngredients = (r.ingredients || []).map(i => i.item.toLowerCase());
          return filters.ingredients.every(ing =>
            recipeIngredients.some(ri => ri.includes(ing.toLowerCase()))
          );
        });
      }

      resolve(recipes);
    };
  });
}

async function getAllRecipes() {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readonly');
  const store = tx.objectStore(STORES.recipes);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function deleteRecipe(id) {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readwrite');
  const store = tx.objectStore(STORES.recipes);

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function clearRecipes() {
  const db = await getDB();
  const tx = db.transaction([STORES.recipes], 'readwrite');
  const store = tx.objectStore(STORES.recipes);

  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// ─── Search History ───────────────────────────────────────────────────────

async function logSearch(query, resultsCount) {
  const db = await getDB();
  const tx = db.transaction([STORES.searches], 'readwrite');
  const store = tx.objectStore(STORES.searches);

  const searchData = {
    query,
    resultsCount,
    timestamp: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const request = store.add(searchData);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(searchData);
  });
}

// ─── Favorites ────────────────────────────────────────────────────────────

async function addFavorite(recipeId) {
  const db = await getDB();
  const tx = db.transaction([STORES.favorites], 'readwrite');
  const store = tx.objectStore(STORES.favorites);

  return new Promise((resolve, reject) => {
    const request = store.put({ recipeId, addedAt: Date.now() });
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function removeFavorite(recipeId) {
  const db = await getDB();
  const tx = db.transaction([STORES.favorites], 'readwrite');
  const store = tx.objectStore(STORES.favorites);

  return new Promise((resolve, reject) => {
    const request = store.delete(recipeId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function getFavorites() {
  const db = await getDB();
  const tx = db.transaction([STORES.favorites], 'readonly');
  const store = tx.objectStore(STORES.favorites);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function isFavorite(recipeId) {
  const db = await getDB();
  const tx = db.transaction([STORES.favorites], 'readonly');
  const store = tx.objectStore(STORES.favorites);

  return new Promise((resolve, reject) => {
    const request = store.get(recipeId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(!!request.result);
  });
}

// ─── Export/Import ────────────────────────────────────────────────────────

async function exportDatabase() {
  const recipes = await getAllRecipes();
  const favorites = await getFavorites();

  return {
    version: DB_VERSION,
    timestamp: new Date().toISOString(),
    recipes,
    favorites,
  };
}

async function importDatabase(data) {
  if (!data.recipes || !Array.isArray(data.recipes)) {
    throw new Error('Invalid import data: missing recipes array');
  }

  await clearRecipes();
  await saveRecipes(data.recipes);

  if (data.favorites && Array.isArray(data.favorites)) {
    for (const fav of data.favorites) {
      await addFavorite(fav.recipeId);
    }
  }

  return { imported: data.recipes.length, favorites: data.favorites?.length || 0 };
}

// ─── Database stats ───────────────────────────────────────────────────────

async function getDBStats() {
  const recipes = await getAllRecipes();
  const favorites = await getFavorites();

  const cuisines = [...new Set(recipes.map(r => r.cuisine))];
  const categories = [...new Set(recipes.map(r => r.category))];

  return {
    recipeCount: recipes.length,
    favoriteCount: favorites.length,
    cuisines: cuisines.sort(),
    categories: categories.sort(),
    lastUpdated: recipes.length > 0 ? Math.max(...recipes.map(r => r.savedAt || 0)) : null,
  };
}
