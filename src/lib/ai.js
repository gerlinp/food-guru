// Shared Groq helper — used by all Chef Tool AI features.
// Model: llama-3.1-8b-instant (free tier: 14,400 req/day)
// Upgrade to llama-3.3-70b-versatile for better quality (1,000 req/day free)

async function aiCall(systemPrompt, userPrompt, maxTokens = 1024) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
  try {
    return JSON.parse(raw);
  } catch {
    const stripped = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '').trim();
    return JSON.parse(stripped);
  }
}
