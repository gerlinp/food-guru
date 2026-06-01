// ── Chef Tool design tokens ──────────────────────────────────────────────────
const CT = {
  card:        { background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:22, boxShadow:'0 10px 26px rgba(0,0,0,.09)' },
  section:     { padding:'14px 16px', borderBottom:'1px solid rgba(14,26,47,.08)' },
  sectionLast: { padding:'14px 16px' },
  labelRow:    { display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:8 },
  label:       { fontWeight:700, letterSpacing:'-0.01em', fontSize:13, color:'#0b1220' },
  hint:        { fontSize:12, color:'#666' },
  chip: (active) => ({
    display:'inline-flex', alignItems:'center', gap:6, padding:'7px 10px',
    borderRadius:999, cursor:'pointer', fontSize:12, fontWeight:600, letterSpacing:'-0.01em',
    border:      active ? '1px solid rgba(240,99,28,.34)' : '1px solid rgba(14,26,47,.10)',
    background:  active ? 'rgba(240,99,28,.12)'           : 'rgba(250,245,236,.78)',
    color:       active ? '#f0631c'                        : '#1a305c',
    boxShadow:   active ? '0 8px 20px rgba(240,99,28,.10)': 'none',
    transform:   active ? 'translateY(-1px)'               : 'none',
    transition:  'all .16s ease',
  }),
  kicker:      { display:'inline-flex', alignItems:'center', gap:8, padding:'6px 10px', borderRadius:999, background:'rgba(14,26,47,.06)', border:'1px solid rgba(14,26,47,.08)', color:'#142647', fontSize:12, fontWeight:600, letterSpacing:'-0.01em', marginBottom:12 },
  resultGroup: { background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:18, boxShadow:'0 8px 22px rgba(0,0,0,.07)', overflow:'hidden' },
};

function CTChip({ label, active, onClick }) {
  return (
    <button style={CT.chip(active)} onClick={onClick}>
      {active && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      {label}
    </button>
  );
}

function ResultGroup({ title, hint, children }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:8, padding:'0 2px' }}>
        <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>{title}</h3>
        {hint && <span style={{ fontSize:12, color:'#666' }}>{hint}</span>}
      </div>
      <div style={CT.resultGroup}>{children}</div>
    </div>
  );
}


// ─── Ingredient autocomplete input ────────────────────────────────────────────

function IngredientInput({ value, onChange, onAdd, placeholder }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [focused, setFocused]         = React.useState(false);
  const [cursor, setCursor]           = React.useState(-1);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const q = value.trim().toLowerCase();
    if (!q || q.length < 2) { setSuggestions([]); setCursor(-1); return; }

    // Ingredient matches
    const ingMatches = INGREDIENT_LIST
      .filter(i => i.startsWith(q) || i.includes(q))
      .sort((a, b) => (a.startsWith(q) ? -1 : 1) - (b.startsWith(q) ? -1 : 1))
      .slice(0, 6)
      .map(i => ({ label: i, type: 'ingredient' }));

    // Cuisine matches from TheMealDB supported areas
    const cuisineMatches = MEALDB_CUISINES
      .filter(c => c.toLowerCase().startsWith(q) || c.toLowerCase().includes(q))
      .slice(0, 3)
      .map(c => ({ label: c, type: 'cuisine' }));

    setSuggestions([...ingMatches, ...cuisineMatches]);
    setCursor(-1);
  }, [value]);

  const pick = (item) => {
    onAdd(item.label, item.type);
    setSuggestions([]);
    setCursor(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, suggestions.length - 1)); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, -1)); return; }
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (cursor >= 0 && suggestions[cursor]) pick(suggestions[cursor]);
      else onAdd(value, 'ingredient');
    }
    if (e.key === 'Escape') { setSuggestions([]); setCursor(-1); }
  };

  const showDropdown = focused && suggestions.length > 0;

  return (
    <div style={{ position:'relative', display:'flex', gap:8 }}>
      <div style={{ flex:1, position:'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={e => { setFocused(true); e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; }}
          onBlur={e  => { setTimeout(() => setFocused(false), 150); e.target.style.borderColor='rgba(14,26,47,.14)'; e.target.style.boxShadow='none'; }}
          placeholder={placeholder}
          style={{ width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid rgba(14,26,47,.14)', background:'rgba(250,245,236,.55)', outline:'none', fontSize:14, color:'#161616', boxSizing:'border-box', transition:'border-color .18s ease,box-shadow .18s ease' }}
        />
        {showDropdown && (
          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0, background:'#fff', border:'1px solid rgba(14,26,47,.12)', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.10)', zIndex:9999, overflow:'hidden' }}>
            {suggestions.map((s, i) => (
              <button key={s.label} onMouseDown={() => pick(s)}
                style={{ width:'100%', padding:'9px 14px', textAlign:'left', background: i === cursor ? 'rgba(240,99,28,.08)' : 'transparent', border:'none', cursor:'pointer', fontSize:13.5, color: i === cursor ? '#f0631c' : '#161616', borderBottom: i < suggestions.length - 1 ? '1px solid rgba(14,26,47,.06)' : 'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span>{s.label}</span>
                {s.type === 'cuisine' && (
                  <span style={{ fontSize:11, fontWeight:700, color:'#8a6fff', background:'rgba(138,111,255,.10)', padding:'2px 7px', borderRadius:99 }}>cuisine</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => onAdd(value, 'ingredient')} className="dt-btn dark sm" disabled={!value.trim()}>Add</button>
    </div>
  );
}


// ─── Loading state ────────────────────────────────────────────────────────────

function Translating({ label }) {
  const steps = label === 'find'
    ? ['Parsing your ingredients…','Searching the library…','Generating recipe ideas…','Checking flavor balance…','Almost there…']
    : ['Parsing original ingredients…','Mapping substitutions for your diet…','Rescaling quantities for your servings…','Compressing steps into your time cap…','Re-checking flavor balance…'];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => Math.min(a + 1, steps.length - 1)), 480);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fadeInUp" style={{ padding:'52px 16px', display:'flex', flexDirection:'column', alignItems:'center', gap:32 }}>
      {/* Spinner ring */}
      <div style={{ position:'relative', width:84, height:84 }}>
        <div className="dt-spin" style={{ position:'absolute', inset:0, borderRadius:'50%', background:'conic-gradient(#f0631c,transparent 65%)', WebkitMask:'radial-gradient(closest-side,transparent 73%,#000 75%)', mask:'radial-gradient(closest-side,transparent 73%,#000 75%)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#f0631c' }}>
          <Icon.sparkle style={{ width:32, height:32 }}/>
        </div>
      </div>
      {/* Title */}
      <div style={{ textAlign:'center' }}>
        <h2 style={{ fontFamily:'var(--display)', fontSize:28, fontWeight:800, letterSpacing:'-0.04em', lineHeight:.97, margin:'0 0 8px', color:'#0b1220' }}>
          {label === 'find' ? 'Searching the kitchen…' : 'Reshaping your recipe'}
        </h2>
        <p style={{ fontSize:13, color:'#8a8a8a', margin:0 }}>This usually takes about 8 seconds.</p>
      </div>
      {/* Progress steps */}
      <div style={{ width:'100%', maxWidth:400, display:'flex', flexDirection:'column', gap:10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, fontSize:13, color:i <= active ? '#161616' : '#aeaeae', opacity:i <= active ? 1 : 0.5, transition:'opacity 220ms ease,color 220ms ease' }}>
            <span style={{ width:22, height:22, borderRadius:99, border:'1.5px solid', borderColor:i <= active ? '#f0631c' : 'rgba(14,26,47,.14)', background:i < active ? '#f0631c' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 220ms ease' }}>
              {i < active  && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {i === active && <span style={{ width:7, height:7, borderRadius:99, background:'#f0631c' }}/>}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── Find Mode: generated recipe card ────────────────────────────────────────

function GeneratedRecipeCard({ idea, availableIngredients }) {
  const [phase, setPhase] = React.useState('idle');
  const [fullRecipe, setFull] = React.useState(null);
  const [err, setErr]         = React.useState('');

  const onExpand = async () => {
    setPhase('loading'); setErr('');
    try {
      const r = await getFullRecipe(idea.title, availableIngredients, idea.uses);
      setFull(r); setPhase('done');
    } catch(e) { setErr(e.message); setPhase('error'); }
  };

  return (
    <div style={{ background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 22px rgba(0,0,0,.07)' }}>
      <div style={{ padding:'14px 16px', borderBottom:(phase==='done'&&fullRecipe)?'1px solid rgba(14,26,47,.08)':'none' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
          <div style={{ minWidth:0 }}>
            <h3 className="dt-serif" style={{ fontSize:18, margin:'0 0 4px', letterSpacing:'-0.03em', color:'#0b1220' }}>{idea.title}</h3>
            <p style={{ margin:0, fontSize:13, color:'#515151', lineHeight:1.4 }}>{idea.description}</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5, flexShrink:0 }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, padding:'5px 8px', borderRadius:999, background:'rgba(255,255,255,.80)', border:'1px solid rgba(14,26,47,.10)', color:'#8a8a8a', whiteSpace:'nowrap' }}>{idea.estimatedMinutes} min</span>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, padding:'5px 8px', borderRadius:999, background:'rgba(255,255,255,.80)', border:'1px solid rgba(14,26,47,.10)', color:'#8a8a8a' }}>{idea.difficulty}</span>
          </div>
        </div>
        {idea.uses && idea.uses.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
            {idea.uses.map(u => (
              <span key={u} style={{ display:'inline-flex', padding:'5px 9px', borderRadius:999, background:'rgba(240,99,28,.10)', border:'1px solid rgba(240,99,28,.22)', color:'#f0631c', fontSize:11, fontWeight:600 }}>{u}</span>
            ))}
          </div>
        )}
        <div style={{ marginTop:12 }}>
          {phase === 'idle' && <button onClick={onExpand} className="dt-btn ghost sm">See full recipe →</button>}
          {phase === 'loading' && (
            <div style={{ fontSize:13, color:'#8a8a8a', display:'flex', alignItems:'center', gap:8 }}>
              <div className="dt-spin" style={{ width:14, height:14, borderRadius:'50%', background:'conic-gradient(#f0631c,transparent 65%)', WebkitMask:'radial-gradient(closest-side,transparent 60%,#000 62%)', mask:'radial-gradient(closest-side,transparent 60%,#000 62%)' }}/>
              Generating recipe…
            </div>
          )}
          {phase === 'error' && <div style={{ fontSize:13, color:'#c0392b', padding:'8px 12px', background:'#fdf0ee', borderRadius:8 }}>Error: {err}</div>}
        </div>
      </div>
      {phase === 'done' && fullRecipe && (
        <div style={{ padding:'0 16px 16px' }}>
          <div style={{ borderBottom:'1px solid rgba(14,26,47,.08)', padding:'12px 0' }}>
            <h4 style={{ fontWeight:800, letterSpacing:'-0.02em', fontSize:13, color:'#0b1220', margin:'0 0 8px' }}>Ingredients</h4>
            <ul style={{ listStyle:'none', margin:0, padding:0 }}>
              {fullRecipe.ingredients.map((ing, i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:10, padding:'7px 0', borderBottom:i < fullRecipe.ingredients.length-1 ? '1px solid rgba(14,26,47,.06)' : 'none', fontSize:13 }}>
                  <span style={{ fontFamily:'var(--mono)', color:'#f0631c', fontWeight:700, fontSize:11 }}>{ing.qty}</span>
                  <span>{ing.item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ paddingTop:12 }}>
            <h4 style={{ fontWeight:800, letterSpacing:'-0.02em', fontSize:13, color:'#0b1220', margin:'0 0 8px' }}>Method</h4>
            {fullRecipe.steps.map((s, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'34px 1fr', gap:8, padding:'10px 0', borderBottom:i < fullRecipe.steps.length-1 ? '1px solid rgba(14,26,47,.06)' : 'none', alignItems:'start' }}>
                <span style={{ fontFamily:'var(--display)', fontSize:18, color:'rgba(14,26,47,.22)', fontStyle:'italic', fontWeight:500, lineHeight:1.1 }}>{i+1}</span>
                <p style={{ margin:0, fontSize:13, lineHeight:1.5, color:'#3d3d3d' }}>{s}</p>
              </div>
            ))}
          </div>
          {fullRecipe.notes && (
            <div style={{ background:'#0e1a2f', borderRadius:14, padding:16, marginTop:12 }}>
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', color:'#f0631c', display:'block', marginBottom:6 }}>Guru's note</span>
              <p style={{ margin:0, fontSize:13, lineHeight:1.5, color:'rgba(250,245,236,0.88)' }}>{fullRecipe.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TheMealDB recipe card ────────────────────────────────────────────────────

function MealDBCard({ meal }) {
  const [phase,   setPhase]   = React.useState('idle'); // idle|loading|done|error
  const [details, setDetails] = React.useState(null);
  const [err,     setErr]     = React.useState('');

  const onExpand = async () => {
    setPhase('loading');
    try {
      const d = await getMealDetails(meal.id);
      setDetails(d);
      setPhase('done');
    } catch(e) {
      setErr(e.message);
      setPhase('error');
    }
  };

  return (
    <div style={{ background:'var(--white)', border:'1px solid rgba(14,26,47,.10)', borderRadius:18, overflow:'hidden' }}>
      {/* Summary row */}
      <div style={{ display:'flex', gap:14, padding:16, alignItems:'center' }}>
        <img src={meal.thumb} alt={meal.title} style={{ width:64, height:64, borderRadius:12, objectFit:'cover', flexShrink:0 }}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'var(--display)', fontSize:16, fontWeight:700, letterSpacing:'-0.02em', marginBottom:4, color:'#0b1220' }}>{meal.title}</div>
          <div style={{ fontSize:12, color:'#515151' }}>
            Matches <span style={{ color:'#f0631c', fontWeight:600 }}>{meal.matchedIngredients.join(', ')}</span>
          </div>
        </div>
        {phase === 'idle' && (
          <button onClick={onExpand} className="dt-btn ghost sm" style={{ flexShrink:0 }}>See recipe →</button>
        )}
        {phase === 'loading' && (
          <div style={{ fontSize:12, color:'#8a8a8a', flexShrink:0 }}>Loading…</div>
        )}
        {phase === 'error' && (
          <div style={{ fontSize:12, color:'#c0392b', flexShrink:0 }}>{err}</div>
        )}
      </div>

      {/* Full recipe */}
      {phase === 'done' && details && (
        <div style={{ borderTop:'1px solid rgba(14,26,47,.08)', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
          {(details.cuisine || details.category) && (
            <div style={{ display:'flex', gap:6 }}>
              {details.cuisine   && <span style={{ padding:'4px 10px', borderRadius:999, background:'rgba(14,26,47,.06)', fontSize:12, fontWeight:600, color:'#1a305c' }}>{details.cuisine}</span>}
              {details.category  && <span style={{ padding:'4px 10px', borderRadius:999, background:'rgba(14,26,47,.06)', fontSize:12, fontWeight:600, color:'#1a305c' }}>{details.category}</span>}
            </div>
          )}

          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#8a8a8a', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 }}>Ingredients</div>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {details.ingredients.map((ing, i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:10, padding:'7px 0', borderBottom: i < details.ingredients.length - 1 ? '1px solid rgba(14,26,47,.06)' : 'none', fontSize:13.5 }}>
                  <span style={{ fontFamily:'var(--mono)', color:'#f0631c', fontWeight:600, fontSize:12 }}>{ing.qty}</span>
                  <span>{ing.item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#8a8a8a', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:8 }}>Method</div>
            {details.steps.map((s, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'34px 1fr', gap:8, padding:'10px 0', borderBottom: i < details.steps.length - 1 ? '1px solid rgba(14,26,47,.06)' : 'none', alignItems:'start' }}>
                <span style={{ fontFamily:'var(--display)', fontSize:18, color:'rgba(14,26,47,.22)', fontStyle:'italic', fontWeight:500 }}>{i + 1}</span>
                <p style={{ margin:0, fontSize:13.5, lineHeight:1.55, color:'#3d3d3d' }}>{s}</p>
              </div>
            ))}
          </div>

          {details.youtubeUrl && (
            <a href={details.youtubeUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'#f0631c', textDecoration:'none' }}>
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Find Mode results panel ──────────────────────────────────────────────────

function FindResults({ results, availableIngredients, onRevise, onViewRecipe }) {
  const { mealdb = [], ideas = [] } = results;
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:0 }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
        <div>
          <div style={CT.kicker}>
            <Icon.sparkle style={{ width:14, height:14 }}/>
            Chef Tool
          </div>
          <h1 className="dt-serif" style={{ fontSize:34, lineHeight:1.05, margin:0, letterSpacing:'-0.04em', color:'#0b1220' }}>Here's what you can make</h1>
        </div>
        <button onClick={onRevise} className="dt-btn ghost sm" style={{ flexShrink:0 }}>Search again</button>
      </div>

      {/* TheMealDB results */}
      {mealdb.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:10, padding:'0 2px' }}>
            <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>Recipes</h3>
            <span style={{ fontSize:12, color:'#666' }}>{mealdb.length} found</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {mealdb.map(meal => <MealDBCard key={meal.id} meal={meal}/>)}
          </div>
        </div>
      )}

      {/* AI-generated ideas */}
      {ideas.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:10, padding:'0 2px' }}>
            <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>
              {mealdb.length > 0 ? 'More ideas from the guru' : 'Ideas from the guru'}
            </h3>
            <span style={{ fontSize:12, color:'#666' }}>{ideas.length} ideas</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ideas.map((idea, i) => (
              <GeneratedRecipeCard key={i} idea={idea} availableIngredients={availableIngredients}/>
            ))}
          </div>
        </div>
      )}

      {mealdb.length === 0 && ideas.length === 0 && (
        <div style={{ textAlign:'center', padding:'32px 0', color:'#8a8a8a', fontSize:14 }}>
          No recipes found. Try different ingredients.
        </div>
      )}

      <div className="dt-sticky-cta">
        <button onClick={onRevise} className="dt-btn ghost lg" style={{ flex:1 }}>Search again</button>
      </div>
    </div>
  );
}

// ─── Recipe text helpers ──────────────────────────────────────────────────────

function parseRecipeText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const stepHeaderRe = /^(method|steps?|directions?|instructions?|how to( make)?|preparation)/i;
  const ingHeaderRe  = /^(ingredients?|what you('ll)? need)/i;

  let title = 'Your Recipe';
  let ingredientLines = [];
  let stepLines = [];
  let section = 'ingredients';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0 && !(/^\d|^[-*•]/).test(line) && line.length < 80) { title = line; continue; }
    if (stepHeaderRe.test(line))   { section = 'steps';       continue; }
    if (ingHeaderRe.test(line))    { section = 'ingredients'; continue; }
    if (/^\d+[\.\)]\s/.test(line)) {
      section = 'steps';
      stepLines.push(line.replace(/^\d+[\.\)]\s*/, ''));
      continue;
    }
    if (section === 'steps') stepLines.push(line);
    else ingredientLines.push(line);
  }

  if (stepLines.length === 0) {
    const newIng = [], newSteps = [];
    for (const l of ingredientLines) {
      if (l.split(' ').length > 9) newSteps.push(l);
      else newIng.push(l);
    }
    ingredientLines = newIng;
    stepLines = newSteps;
  }

  const ingredients = ingredientLines.map(line => {
    const m = line.match(/^([\d\s\/\.\-]+(?:cups?|tbsp?|tsp?|oz|g|kg|lb|ml|l|cloves?|heads?|cans?)?)\s+(.+)/i);
    return m ? { qty: m[1].trim(), item: m[2].trim() } : { qty: '', item: line };
  });

  const servingsMatch = text.match(/\b(?:serves?|servings?|yield|makes?)\s*:?\s*(\d+)/i);
  const servings = servingsMatch ? parseInt(servingsMatch[1], 10) : null;

  return {
    title,
    servings,
    minutes:  60,
    ingredients: ingredients.length ? ingredients : [{ qty: '', item: 'see recipe above' }],
    steps:    stepLines.length ? stepLines : ['Follow the pasted instructions.'],
  };
}

function formatRecipeAsText(recipe) {
  const lines = [recipe.title, '', 'Ingredients:'];
  (recipe.ingredients || []).forEach(ing => lines.push(`${ing.qty ? ing.qty + ' ' : ''}${ing.item}`));
  lines.push('', 'Method:');
  (recipe.steps || []).forEach((step, i) => lines.push(`${i + 1}. ${step}`));
  return lines.join('\n');
}

// ─── Main component ───────────────────────────────────────────────────────────

function Translator({ recipeId, onBack, onNavigate }) {
  const [mode, setMode] = React.useState('find'); // 'find' | 'scan'

  // Chef Tool state
  const [ingredients,     setIngredients]     = React.useState(new Set());
  const [cuisineFilter,   setCuisineFilter]   = React.useState(null);
  const [ingredientInput, setIngredientInput] = React.useState('');
  const [pasteMode,       setPasteMode]       = React.useState(false);
  const [pasteText,       setPasteText]       = React.useState('');
  const [mealdbResults,   setMealdbResults]   = React.useState(null);
  const [mealdbLoading,   setMealdbLoading]   = React.useState(false);
  const [mealdbErr,       setMealdbErr]       = React.useState('');
  const [aiIdeas,         setAiIdeas]         = React.useState(null);
  const [aiLoading,       setAiLoading]       = React.useState(false);
  const [aiErr,           setAiErr]           = React.useState('');
  const searchId = React.useRef(0);

  const switchMode = (m) => {
    setMode(m);
    setPasteMode(false);
  };

  const addIngredient = (val, type = 'ingredient') => {
    const clean = val.trim();
    if (!clean) return;
    if (type === 'cuisine') {
      // Match to a known MEALDB_CUISINES entry (case-insensitive)
      const matched = MEALDB_CUISINES.find(c => c.toLowerCase() === clean.toLowerCase()) || clean;
      setCuisineFilter(matched);
    } else {
      const items = clean.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      if (!items.length) return;
      setIngredients(prev => { const n = new Set(prev); items.forEach(i => n.add(i)); return n; });
    }
    setIngredientInput('');
  };

  const removeIngredient = (item) => {
    setIngredients(prev => { const n = new Set(prev); n.delete(item); return n; });
  };

  const extractFromPaste = () => {
    const parsed = parseRecipeText(pasteText);
    const items = parsed.ingredients.map(i => i.item.toLowerCase()).filter(i => i !== 'see recipe above');
    setIngredients(prev => { const n = new Set(prev); items.forEach(i => n.add(i)); return n; });
    setPasteMode(false);
    setPasteText('');
  };

  // Auto-search TheMealDB whenever ingredients or cuisine changes (debounced)
  React.useEffect(() => {
    if (ingredients.size === 0 && !cuisineFilter) { setMealdbResults(null); setMealdbErr(''); return; }
    const id = ++searchId.current;
    setMealdbLoading(true);
    setMealdbErr('');
    setAiIdeas(null);
    const t = setTimeout(async () => {
      try {
        const results = await searchMealsByIngredients([...ingredients], cuisineFilter);
        if (searchId.current !== id) return;
        setMealdbResults(results);
      } catch(e) {
        if (searchId.current !== id) return;
        setMealdbErr(e.message);
      } finally {
        if (searchId.current === id) setMealdbLoading(false);
      }
    }, 700);
    return () => clearTimeout(t);
  }, [ingredients, cuisineFilter]);

  const onGenerateAiIdeas = async () => {
    const list = [...ingredients];
    if (!list.length) return;
    setAiLoading(true);
    setAiErr('');
    try {
      const ideas = await generateRecipeIdeas(list, {});
      setAiIdeas(ideas);
    } catch(e) {
      setAiErr(e.message);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="dt-translator">
      <div className="dt-translator-left">
        <div style={{ fontSize:13, color:'var(--ink-mute)' }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>← Back</a>
        </div>
        {mode === 'find' ? (
          <div>
            <div className="dt-eyebrow">Chef Tool</div>
            <h1 className="dt-serif" style={{ fontSize:32, lineHeight:1.05, margin:'8px 0 12px', letterSpacing:'-0.02em' }}>What's in your kitchen?</h1>
            <p style={{ fontSize:14, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>
              Add your ingredients one by one, or paste a full recipe and we'll pull them out automatically. The guru finds what you can cook.
            </p>
          </div>
        ) : (
          <div>
            <div className="dt-eyebrow">Food Scanner</div>
            <h1 className="dt-serif" style={{ fontSize:32, lineHeight:1.05, margin:'8px 0 12px', letterSpacing:'-0.02em' }}>Know what you're eating.</h1>
            <p style={{ fontSize:14, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>
              Scan any packaged food barcode. The guru looks up the product and breaks down exactly how healthy it is — including what it means for kids.
            </p>
          </div>
        )}
      </div>

      <div className="dt-translator-right">
        {/* ── Mode tabs ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
          {[
            { id:'find', label:'Chef Tool', sub:'Cook what you have', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v2"/></svg> },
            { id:'scan', label:'Scanner',    sub:'Read food labels fast', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
          ].map(({ id, label, sub, icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                onClick={() => switchMode(id)}
                style={{
                  position:'relative', borderRadius:18, border: active ? '1px solid rgba(240,99,28,.35)' : '1px solid rgba(14,26,47,.10)',
                  background: active ? 'rgba(255,255,255,.98)' : 'rgba(255,255,255,.75)',
                  overflow:'hidden', cursor:'pointer', minHeight:106, padding:'12px 10px',
                  display:'flex', flexDirection:'column', justifyContent:'space-between',
                  boxShadow: active ? '0 18px 42px rgba(14,26,47,.16)' : 'none',
                  transform: active ? 'translateY(-1px)' : 'none',
                  transition:'all .18s ease', textAlign:'left',
                }}
              >
                <span style={{ width:30, height:30, borderRadius:14, display:'grid', placeItems:'center', background:'rgba(14,26,47,.06)', border:'1px solid rgba(14,26,47,.08)', color:'#142647', flexShrink:0, alignSelf:'flex-start' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily:'var(--display)', fontWeight:750, letterSpacing:'-0.03em', fontSize:14, color:'#0b1220' }}>{label}</div>
                  <div style={{ fontSize:11, lineHeight:1.3, color:'#515151', marginTop:4 }}>{sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Chef Tool mode ── */}
        {mode === 'find' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Ingredient input card */}
            <div style={CT.card}>
              <div style={{ padding:'14px 16px', borderBottom: ingredients.size > 0 ? '1px solid rgba(14,26,47,.08)' : 'none' }}>
                {(ingredients.size > 0 || cuisineFilter) && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                    {/* Cuisine tag */}
                    {cuisineFilter && (
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 10px', borderRadius:999, background:'rgba(138,111,255,.10)', border:'1px solid rgba(138,111,255,.30)', color:'#6c47ff', fontSize:13, fontWeight:600 }}>
                        🌍 {cuisineFilter}
                        <button onClick={() => setCuisineFilter(null)} style={{ background:'none', border:'none', cursor:'pointer', padding:0, lineHeight:1, color:'#6c47ff', fontSize:15 }}>×</button>
                      </span>
                    )}
                    {/* Ingredient tags */}
                    {[...ingredients].map(ing => (
                      <span key={ing} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 10px', borderRadius:999, background:'rgba(240,99,28,.10)', border:'1px solid rgba(240,99,28,.22)', color:'#f0631c', fontSize:13, fontWeight:600 }}>
                        {ing}
                        <button onClick={() => removeIngredient(ing)} style={{ background:'none', border:'none', cursor:'pointer', padding:0, lineHeight:1, color:'#f0631c', fontSize:15 }}>×</button>
                      </span>
                    ))}
                    <button onClick={() => { setIngredients(new Set()); setCuisineFilter(null); }} style={{ padding:'6px 10px', borderRadius:999, background:'none', border:'1px solid rgba(14,26,47,.10)', color:'#8a8a8a', fontSize:12, cursor:'pointer' }}>Clear all</button>
                  </div>
                )}
                <IngredientInput
                  value={ingredientInput}
                  onChange={setIngredientInput}
                  onAdd={addIngredient}
                  placeholder={ingredients.size === 0 && !cuisineFilter ? 'e.g. chicken, garlic, Italian…' : 'Add more…'}
                />
              </div>
              {!pasteMode ? (
                <button onClick={() => setPasteMode(true)}
                  style={{ width:'100%', padding:'11px 16px', background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#8a8a8a', textAlign:'left', display:'flex', alignItems:'center', gap:6 }}>
                  <span>📋</span> Or paste a full recipe to extract ingredients
                </button>
              ) : (
                <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
                  <textarea
                    style={{ width:'100%', minHeight:120, resize:'vertical', borderRadius:12, border:'1px solid rgba(14,26,47,.14)', background:'rgba(250,245,236,.55)', padding:'10px 12px', outline:'none', fontSize:13.5, lineHeight:1.5, color:'#161616', boxSizing:'border-box' }}
                    placeholder="Paste any recipe here — we'll pull out the ingredients…"
                    value={pasteText}
                    onChange={e => setPasteText(e.target.value)}
                    onFocus={e => { e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; }}
                    onBlur={e  => { e.target.style.borderColor='rgba(14,26,47,.14)'; e.target.style.boxShadow='none'; }}
                  />
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={extractFromPaste} className="dt-btn dark sm" disabled={!pasteText.trim()} style={{ flex:1 }}>Extract ingredients</button>
                    <button onClick={() => { setPasteMode(false); setPasteText(''); }} className="dt-btn ghost sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Live results */}
            {ingredients.size === 0 && !cuisineFilter && (
              <div style={{ textAlign:'center', padding:'24px 0', color:'#aeaeae', fontSize:14 }}>
                Add an ingredient or cuisine to see what you can make
              </div>
            )}

            {mealdbLoading && (ingredients.size > 0 || cuisineFilter) && (
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 2px', fontSize:13, color:'#8a8a8a' }}>
                <div className="dt-spin" style={{ width:16, height:16, borderRadius:'50%', background:'conic-gradient(#f0631c,transparent 65%)', WebkitMask:'radial-gradient(closest-side,transparent 60%,#000 62%)', mask:'radial-gradient(closest-side,transparent 60%,#000 62%)', flexShrink:0 }}/>
                Searching recipes…
              </div>
            )}

            {mealdbErr && (
              <div style={{ fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
                {mealdbErr}
              </div>
            )}

            {!mealdbLoading && mealdbResults !== null && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {mealdbResults.length > 0 ? (
                  <>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'0 2px' }}>
                      <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>Recipes</h3>
                      <span style={{ fontSize:12, color:'#666' }}>{mealdbResults.length} found</span>
                    </div>
                    {mealdbResults.map(meal => <MealDBCard key={meal.id} meal={meal}/>)}
                  </>
                ) : (
                  <div style={{ fontSize:13, color:'#8a8a8a', padding:'8px 2px' }}>No recipes found for those ingredients.</div>
                )}
              </div>
            )}

            {/* AI ideas button */}
            {(ingredients.size > 0 || cuisineFilter) && !mealdbLoading && (
              <div>
                {!aiIdeas && !aiLoading && (
                  <button
                    onClick={onGenerateAiIdeas}
                    style={{ width:'100%', border:'none', outline:'none', borderRadius:14, padding:'13px 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontWeight:700, fontSize:14, color:'white', cursor:'pointer', background:'linear-gradient(135deg,#f0631c,#ff8a3d 45%,#f9a849 100%)', boxShadow:'0 10px 28px rgba(240,99,28,.20)', transition:'transform .18s ease,box-shadow .18s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(240,99,28,.26)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 10px 28px rgba(240,99,28,.20)'; }}
                  >
                    <Icon.sparkle style={{ width:16, height:16 }}/> Generate AI recipe ideas
                  </button>
                )}

                {aiLoading && (
                  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 2px', fontSize:13, color:'#8a8a8a' }}>
                    <div className="dt-spin" style={{ width:16, height:16, borderRadius:'50%', background:'conic-gradient(#f0631c,transparent 65%)', WebkitMask:'radial-gradient(closest-side,transparent 60%,#000 62%)', mask:'radial-gradient(closest-side,transparent 60%,#000 62%)', flexShrink:0 }}/>
                    Generating ideas…
                  </div>
                )}

                {aiErr && (
                  <div style={{ fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>{aiErr}</div>
                )}

                {aiIdeas && aiIdeas.length > 0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'0 2px' }}>
                      <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>AI ideas</h3>
                      <button onClick={() => setAiIdeas(null)} style={{ fontSize:12, color:'#8a8a8a', background:'none', border:'none', cursor:'pointer' }}>Clear</button>
                    </div>
                    {aiIdeas.map((idea, i) => (
                      <GeneratedRecipeCard key={i} idea={idea} availableIngredients={[...ingredients]}/>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Scan mode ── */}
        {mode === 'scan' && <ScannerPanel/>}
      </div>
    </div>
  );
}
