// Chef Tool — Recipe transformation via Claude Haiku
// Converts a recipe + user config into a diff-ready transformed result.

async function transformRecipe(recipe, config) {
  const { servings, diet, allergies, cuisine, time, skill, equipment, pantry } = config;

  const systemPrompt = `You are the Chef Tool for a recipe website called The Hungry Guru.
Given a recipe and user constraints, rewrite the recipe to match those constraints.
Return ONLY valid JSON — no markdown, no explanation, no code fences. Use this exact schema:
{
  "ingredients": [
    {
      "qty": "scaled quantity string",
      "original": "original ingredient text (null if brand new ingredient)",
      "replacement": "new ingredient text (null if unchanged)",
      "isNew": false
    }
  ],
  "changes": ["plain English description of change 1", "change 2", ...],
  "steps": ["step text with [substituted names] wrapped in square brackets", ...],
  "guruNote": "1-2 sentence summary of what was done and why"
}
Rules:
- Scale all quantities to the target servings.
- For each original ingredient: if unchanged, set replacement to null; if swapped, set both original and replacement; if it's a brand-new addition, set original to null, isNew to true.
- In steps, wrap only the names of substituted or new ingredients in [square brackets].
- changes must be specific and useful (mention the actual swap, not just "dietary change made").
- If no changes were needed for a constraint, do not mention it.`;

  const userPrompt = `Original recipe:
${JSON.stringify({
  title: recipe.title,
  servings: recipe.servings,
  ingredients: recipe.ingredients,
  steps: recipe.steps,
}, null, 2)}

User constraints:
- Target servings: ${servings} (original: ${recipe.servings})
- Dietary styles: ${diet.length ? diet.join(', ') : 'none'}
- Allergies/avoid: ${allergies.length ? allergies.join(', ') : 'none'}
- Cuisine remix: ${cuisine}
- Time cap: ${time} minutes (original: ${recipe.minutes} min)
- Skill level: ${skill}
- Kitchen constraints: ${equipment.length ? equipment.join(', ') : 'none'}
- Pantry notes: ${pantry || 'none'}

Rewrite the recipe to satisfy all constraints. Return only the JSON object.`;

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
    // Strip any accidental markdown fences then retry
    const stripped = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '').trim();
    parsed = JSON.parse(stripped);
  }

  // Convert {original, replacement} pairs to item:[{kind,text}] diff spans
  const ingredients = parsed.ingredients.map(ing => {
    let item;
    if (ing.isNew) {
      item = [{ kind: 'add', text: ing.replacement }];
    } else if (ing.replacement) {
      item = [
        { kind: 'rm',  text: ing.original },
        { kind: 'add', text: ing.replacement },
      ];
    } else {
      item = [{ kind: 'keep', text: ing.original }];
    }
    return { qty: ing.qty, item, isNew: ing.isNew || false };
  });

  return {
    ingredients,
    changes:  parsed.changes,
    steps:    parsed.steps,
    guruNote: parsed.guruNote,
  };
}
