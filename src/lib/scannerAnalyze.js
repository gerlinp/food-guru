// Food Scanner — product lookup + health analysis via OpenAI gpt-4o-mini

async function fetchProduct(barcode) {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
    { headers: { 'User-Agent': 'TheHungryGuru/1.0 (food-guru)' } }
  );
  if (!res.ok) throw new Error('Could not reach the food database. Check your connection.');
  const data = await res.json();
  if (data.status === 0 || !data.product) throw new Error('Product not found. Try scanning again or enter the code manually.');
  return data.product;
}

async function analyzeProduct(product) {
  const n = product.nutriments || {};
  const per100 = [
    n['energy-kcal_100g'] != null ? `${n['energy-kcal_100g']} kcal`         : null,
    n['fat_100g']          != null ? `Fat: ${n['fat_100g']}g`                : null,
    n['saturated-fat_100g'] != null ? `Sat fat: ${n['saturated-fat_100g']}g` : null,
    n['sugars_100g']       != null ? `Sugars: ${n['sugars_100g']}g`          : null,
    n['fiber_100g']        != null ? `Fiber: ${n['fiber_100g']}g`            : null,
    n['proteins_100g']     != null ? `Protein: ${n['proteins_100g']}g`       : null,
    n['salt_100g']         != null ? `Salt: ${n['salt_100g']}g`              : null,
  ].filter(Boolean).join(', ');

  const additives = (product.additives_tags || [])
    .map(a => a.replace('en:', '').toUpperCase())
    .join(', ');

  const systemPrompt = `You are a nutritionist for a food website. Analyze a packaged food product and return an honest, clear health summary useful for adults and parents of children.
Return ONLY valid JSON using this exact schema:
{
  "rating": "Good",
  "score": 8,
  "summary": "2-3 sentence overview of the product health profile",
  "positives": ["benefit 1", "benefit 2"],
  "concerns": ["concern 1", "concern 2"],
  "childrenNote": "Overall note for parents: is this appropriate for kids?",
  "childAges": {
    "under5": "Specific guidance for toddlers and young children under 5",
    "ages5to12": "Guidance for school-age children",
    "teens": "Guidance for teenagers"
  },
  "servingAdvice": "Practical note on how much / how often to eat this",
  "betterAlternative": "A healthier alternative or what to look for instead"
}
Rules:
- rating must be one of: "Great", "Good", "Okay", "Poor", "Avoid"
- score is 1-10 (10 = perfectly healthy)
- Be specific — mention actual ingredients and nutrients by name
- For children, consider sugar, additives, sodium, processed fats, and portion size
- Never be alarmist, but be honest about concerns`;

  const userPrompt = `Product: ${product.product_name || 'Unknown'} by ${product.brands || 'Unknown brand'}
Serving size: ${product.serving_size || 'not listed'}
Nutrition per 100g: ${per100 || 'not available'}
Ingredients: ${product.ingredients_text || 'not listed'}
Additives: ${additives || 'none listed'}
Allergens: ${product.allergens || 'none listed'}
Nutri-Score: ${(product.nutriscore_grade || '').toUpperCase() || 'not available'}
NOVA group: ${product.nova_group || 'not available'} (1=unprocessed, 4=ultra-processed)

Analyze this product for adults and children of all ages. Return only the JSON object.`;

  return await aiCall(systemPrompt, userPrompt, 1024);
}
