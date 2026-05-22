// Fridge Raid — ingredient-based recipe finder
// Two parts: local search against existing recipes, then AI-generated ideas via Claude Haiku.

function searchExistingRecipes(ingredients) {
  // ingredients: string[] already lowercased and trimmed
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
Given a list of available ingredients, suggest 2-3 achievable recipes the user can make.
Return ONLY valid JSON — no markdown, no explanation, no code fences. Use this exact schema:
{
  "ideas": [
    {
      "title": "Recipe name",
      "description": "1-2 sentence description of the dish",
      "estimatedMinutes": 30,
      "difficulty": "Easy",
      "uses": ["ingredient1", "ingredient2"]
    }
  ]
}
Rules:
- Suggest recipes that primarily use the provided ingredients.
- Note pantry staples (salt, oil, water) are assumed available.
- difficulty is one of: Easy, Intermediate, Advanced.
- uses lists only the provided ingredients actually used (not pantry staples).`;

  const lines = [`Available ingredients: ${ingredients.join(', ')}`];
  if (cuisine) lines.push(`Preferred cuisine: ${cuisine}`);
  if (timeCap) lines.push(`Time cap: ${timeCap} minutes`);
  lines.push('Suggest 2-3 recipes. Return only the JSON object.');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: lines.join('\n') }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || '';

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const stripped = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '').trim();
    parsed = JSON.parse(stripped);
  }

  return parsed.ideas || [];
}

async function getFullRecipe(title, availableIngredients, usedIngredients) {
  const systemPrompt = `You are the Chef Tool for a recipe website called The Hungry Guru.
Generate a complete recipe given a title and the available ingredients.
Return ONLY valid JSON — no markdown, no explanation, no code fences. Use this exact schema:
{
  "title": "Recipe name",
  "description": "2-3 sentence description",
  "minutes": 30,
  "servings": 4,
  "difficulty": "Easy",
  "ingredients": [
    { "qty": "2 tbsp", "item": "ingredient name" }
  ],
  "steps": ["Step 1 text", "Step 2 text"],
  "notes": "Optional chef tip or null"
}
Rules:
- Use the provided ingredients as the base; add pantry staples as needed.
- steps should be clear, numbered instructions (just the text, no number prefix).
- quantities should be realistic and precise.`;

  const userPrompt = `Recipe title: ${title}
Available ingredients: ${availableIngredients.join(', ')}
Key ingredients to use: ${usedIngredients.join(', ')}
Generate the full recipe. Return only the JSON object.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || '';

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const stripped = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '').trim();
    parsed = JSON.parse(stripped);
  }

  return parsed;
}
