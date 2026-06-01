// Chef Tool — Recipe transformation via OpenAI gpt-4o-mini

async function transformRecipe(recipe, config) {
  const { servings, diet, allergies, cuisine, time, skill, equipment, excluded, pantry } = config;

  const systemPrompt = `You are the Chef Tool for a recipe website called The Hungry Guru.
Given a recipe and user constraints, rewrite the recipe to match those constraints.
Return ONLY valid JSON using this exact schema:
{
  "ingredients": [
    {
      "qty": "scaled quantity string",
      "original": "original ingredient text (null if brand new ingredient)",
      "replacement": "new ingredient text (null if unchanged)",
      "isNew": false
    }
  ],
  "changes": ["plain English description of change 1", "change 2"],
  "steps": ["step text with [substituted names] wrapped in square brackets"],
  "guruNote": "1-2 sentence summary of what was done and why"
}
Rules:
- Scale all quantities to the target servings.
- If unchanged, set replacement to null. If swapped, set both original and replacement. If brand-new, set original to null and isNew to true.
- In steps, wrap only substituted or new ingredient names in [square brackets].
- changes must be specific — mention the actual swap, not just "dietary change made".
- If no changes were needed for a constraint, do not mention it.`;

  const userPrompt = `Original recipe:
${JSON.stringify({ title: recipe.title, servings: recipe.servings, ingredients: recipe.ingredients, steps: recipe.steps }, null, 2)}

User constraints:
- Target servings: ${servings != null ? `${servings} (original: ${recipe.servings ?? 'unknown'})` : 'not specified — keep original quantities, do not scale'}
- Dietary styles: ${diet.length ? diet.join(', ') : 'none'}
- Allergies/avoid: ${allergies.length ? allergies.join(', ') : 'none'}
- Cuisine remix: ${cuisine}
- Time cap: ${time} minutes (original: ${recipe.minutes} min)
- Skill level: ${skill}
- Skip these ingredients entirely (find substitutes): ${excluded.length ? excluded.join(', ') : 'none'}
- Kitchen constraints: ${equipment.length ? equipment.join(', ') : 'none'}
- Custom request: ${pantry || 'none'}

Rewrite the recipe to satisfy all constraints. Return only the JSON object.`;

  const parsed = await aiCall(systemPrompt, userPrompt, 2048);
  console.log('[chefTransform] raw response:', JSON.stringify(parsed, null, 2));

  const ingredients = parsed.ingredients.map(ing => {
    let item;
    if (ing.isNew) {
      item = [{ kind: 'add', text: ing.replacement }];
    } else if (ing.replacement) {
      item = [{ kind: 'rm', text: ing.original }, { kind: 'add', text: ing.replacement }];
    } else {
      item = [{ kind: 'keep', text: ing.original }];
    }
    return { qty: ing.qty, item, isNew: ing.isNew || false };
  });

  return { ingredients, changes: parsed.changes, steps: parsed.steps, guruNote: parsed.guruNote };
}
