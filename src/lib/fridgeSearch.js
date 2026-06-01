// Fridge Raid — ingredient-based recipe finder via OpenAI gpt-4o-mini

function searchExistingRecipes(ingredients) {
  if (!ingredients.length) return [];
  return RECIPES
    .map(recipe => {
      const matched = ingredients.filter(ing =>
        recipe.ingredients.some(ri => ri.item.toLowerCase().includes(ing))
      );
      return { recipe, score: matched.length, matchedIngredients: matched };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

async function generateRecipeIdeas(ingredients, preferences = {}) {
  const { cuisine, timeCap } = preferences;

  const systemPrompt = `You are the Chef Tool for a recipe website called The Hungry Guru.
Given available ingredients, suggest 2-3 achievable recipes the user can make.
Return ONLY valid JSON using this exact schema:
{
  "ideas": [
    {
      "title": "Recipe name",
      "description": "1-2 sentence description",
      "estimatedMinutes": 30,
      "difficulty": "Easy",
      "uses": ["ingredient1", "ingredient2"]
    }
  ]
}
Rules:
- Suggest recipes that primarily use the provided ingredients.
- Pantry staples (salt, oil, water) are assumed available.
- difficulty is one of: Easy, Intermediate, Advanced.
- uses lists only the provided ingredients actually used (not pantry staples).`;

  const lines = [`Available ingredients: ${ingredients.join(', ')}`];
  if (cuisine) lines.push(`Preferred cuisine: ${cuisine}`);
  if (timeCap) lines.push(`Time cap: ${timeCap} minutes`);
  lines.push('Suggest 2-3 recipes. Return only the JSON object.');

  const parsed = await aiCall(systemPrompt, lines.join('\n'), 1024);
  return parsed.ideas || [];
}

async function getFullRecipe(title, availableIngredients, usedIngredients) {
  const systemPrompt = `You are the Chef Tool for a recipe website called The Hungry Guru.
Generate a complete recipe given a title and available ingredients.
Return ONLY valid JSON using this exact schema:
{
  "title": "Recipe name",
  "description": "2-3 sentence description",
  "minutes": 30,
  "servings": 4,
  "difficulty": "Easy",
  "ingredients": [{ "qty": "2 tbsp", "item": "ingredient name" }],
  "steps": ["Step 1 text", "Step 2 text"],
  "notes": "Optional chef tip or null"
}
Rules:
- Use the provided ingredients as the base; add pantry staples as needed.
- steps are plain text with no number prefix.
- quantities should be realistic and precise.`;

  const userPrompt = `Recipe title: ${title}
Available ingredients: ${availableIngredients.join(', ')}
Key ingredients to use: ${usedIngredients.join(', ')}
Generate the full recipe. Return only the JSON object.`;

  return await aiCall(systemPrompt, userPrompt, 2048);
}
