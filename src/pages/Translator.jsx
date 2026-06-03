// ── Chef Tool design tokens ──────────────────────────────────────────────────
const CT = {
  card:        { background:'var(--ct-card-bg)', border:'1px solid var(--ct-border)', borderRadius:22, boxShadow:'0 10px 26px rgba(0,0,0,.09)' },
  section:     { padding:'14px 16px', borderBottom:'1px solid var(--ct-border-soft)' },
  sectionLast: { padding:'14px 16px' },
  labelRow:    { display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:8 },
  label:       { fontWeight:700, letterSpacing:'-0.01em', fontSize:13, color:'var(--ct-label)' },
  hint:        { fontSize:12, color:'var(--ct-hint)' },
  chip: (active) => ({
    display:'inline-flex', alignItems:'center', gap:6, padding:'7px 10px',
    borderRadius:999, cursor:'pointer', fontSize:12, fontWeight:600, letterSpacing:'-0.01em',
    border:      active ? '1px solid rgba(240,99,28,.34)' : '1px solid var(--ct-border)',
    background:  active ? 'rgba(240,99,28,.12)'           : 'var(--ct-chip-idle-bg)',
    color:       active ? 'var(--orange)'                 : 'var(--ct-chip-idle-color)',
    boxShadow:   active ? '0 8px 20px rgba(240,99,28,.10)': 'none',
    transform:   active ? 'translateY(-1px)'               : 'none',
    transition:  'all .16s ease',
  }),
  kicker:      { display:'inline-flex', alignItems:'center', gap:8, padding:'6px 10px', borderRadius:999, background:'var(--ct-kicker-bg)', border:'1px solid var(--ct-border-soft)', color:'var(--ct-kicker-color)', fontSize:12, fontWeight:600, letterSpacing:'-0.01em', marginBottom:12 },
  resultGroup: { background:'var(--ct-card-bg)', border:'1px solid var(--ct-border)', borderRadius:18, boxShadow:'0 8px 22px rgba(0,0,0,.07)', overflow:'hidden' },
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
        <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>{title}</h3>
        {hint && <span style={{ fontSize:12, color:'var(--ct-hint)' }}>{hint}</span>}
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

    // Cuisine matches from Recipe API supported cuisines
    const cuisineMatches = RECIPE_API_CUISINES
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
          onBlur={e  => { setTimeout(() => setFocused(false), 150); e.target.style.borderColor='var(--ct-border-input)'; e.target.style.boxShadow='none'; }}
          placeholder={placeholder}
          style={{ width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid var(--ct-border-input)', background:'var(--ct-input-bg)', outline:'none', fontSize:14, color:'var(--ct-body)', boxSizing:'border-box', transition:'border-color .18s ease,box-shadow .18s ease' }}
        />
        {showDropdown && (
          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0, background:'var(--ct-dropdown-bg)', border:'1px solid var(--ct-border)', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.10)', zIndex:9999, overflow:'hidden' }}>
            {suggestions.map((s, i) => (
              <button key={s.label} onMouseDown={() => pick(s)}
                style={{ width:'100%', padding:'9px 14px', textAlign:'left', background: i === cursor ? 'rgba(240,99,28,.08)' : 'transparent', border:'none', cursor:'pointer', fontSize:13.5, color: i === cursor ? 'var(--orange)' : 'var(--ct-body)', borderBottom: i < suggestions.length - 1 ? '1px solid var(--ct-border-soft)' : 'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
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
        <h2 style={{ fontFamily:'var(--display)', fontSize:28, fontWeight:800, letterSpacing:'-0.04em', lineHeight:.97, margin:'0 0 8px', color:'var(--ct-label)' }}>
          {label === 'find' ? 'Searching the kitchen…' : 'Reshaping your recipe'}
        </h2>
        <p style={{ fontSize:13, color:'var(--ct-muted)', margin:0 }}>This usually takes about 8 seconds.</p>
      </div>
      {/* Progress steps */}
      <div style={{ width:'100%', maxWidth:400, display:'flex', flexDirection:'column', gap:10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, fontSize:13, color:i <= active ? '#161616' : '#aeaeae', opacity:i <= active ? 1 : 0.5, transition:'opacity 220ms ease,color 220ms ease' }}>
            <span style={{ width:22, height:22, borderRadius:99, border:'1.5px solid', borderColor:i <= active ? '#f0631c' : 'var(--ct-border-input)', background:i < active ? '#f0631c' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 220ms ease' }}>
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
    <div style={{ background:'var(--ct-card-bg)', border:'1px solid var(--ct-border)', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 22px rgba(0,0,0,.07)' }}>
      <div style={{ padding:'14px 16px', borderBottom:(phase==='done'&&fullRecipe)?'1px solid var(--ct-border-soft)':'none' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
          <div style={{ minWidth:0 }}>
            <h3 className="dt-serif" style={{ fontSize:18, margin:'0 0 4px', letterSpacing:'-0.03em', color:'var(--ct-label)' }}>{idea.title}</h3>
            <p style={{ margin:0, fontSize:13, color:'var(--ct-text-soft)', lineHeight:1.4 }}>{idea.description}</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5, flexShrink:0 }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, padding:'5px 8px', borderRadius:999, background:'rgba(255,255,255,.80)', border:'1px solid var(--ct-border)', color:'var(--ct-muted)', whiteSpace:'nowrap' }}>{idea.estimatedMinutes} min</span>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, fontWeight:700, padding:'5px 8px', borderRadius:999, background:'rgba(255,255,255,.80)', border:'1px solid var(--ct-border)', color:'var(--ct-muted)' }}>{idea.difficulty}</span>
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
            <div style={{ fontSize:13, color:'var(--ct-muted)', display:'flex', alignItems:'center', gap:8 }}>
              <div className="dt-spin" style={{ width:14, height:14, borderRadius:'50%', background:'conic-gradient(#f0631c,transparent 65%)', WebkitMask:'radial-gradient(closest-side,transparent 60%,#000 62%)', mask:'radial-gradient(closest-side,transparent 60%,#000 62%)' }}/>
              Generating recipe…
            </div>
          )}
          {phase === 'error' && <div style={{ fontSize:13, color:'#c0392b', padding:'8px 12px', background:'#fdf0ee', borderRadius:8 }}>Error: {err}</div>}
        </div>
      </div>
      {phase === 'done' && fullRecipe && (
        <div style={{ padding:'0 16px 16px' }}>
          <div style={{ borderBottom:'1px solid var(--ct-border-soft)', padding:'12px 0' }}>
            <h4 style={{ fontWeight:800, letterSpacing:'-0.02em', fontSize:13, color:'var(--ct-label)', margin:'0 0 8px' }}>Ingredients</h4>
            <ul style={{ listStyle:'none', margin:0, padding:0 }}>
              {fullRecipe.ingredients.map((ing, i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:10, padding:'7px 0', borderBottom:i < fullRecipe.ingredients.length-1 ? '1px solid var(--ct-border-soft)' : 'none', fontSize:13 }}>
                  <span style={{ fontFamily:'var(--mono)', color:'#f0631c', fontWeight:700, fontSize:11 }}>{ing.qty}</span>
                  <span>{ing.item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ paddingTop:12 }}>
            <h4 style={{ fontWeight:800, letterSpacing:'-0.02em', fontSize:13, color:'var(--ct-label)', margin:'0 0 8px' }}>Method</h4>
            {fullRecipe.steps.map((s, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'34px 1fr', gap:8, padding:'10px 0', borderBottom:i < fullRecipe.steps.length-1 ? '1px solid var(--ct-border-soft)' : 'none', alignItems:'start' }}>
                <span style={{ fontFamily:'var(--display)', fontSize:18, color:'var(--ct-step-muted)', fontStyle:'italic', fontWeight:500, lineHeight:1.1 }}>{i+1}</span>
                <p style={{ margin:0, fontSize:13, lineHeight:1.5, color:'var(--ct-text-body)' }}>{s}</p>
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

// ─── TheMealDB recipe detail modal ───────────────────────────────────────────

function RecipeDetailModal({ meal, onClose }) {
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [modalErr, setModalErr] = React.useState('');
  const [servings, setServings] = React.useState(meal.servings || 4);
  const [checked, setChecked] = React.useState({});

  const toggleChecked = i => setChecked(c => ({ ...c, [i]: !c[i] }));

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const d = await getRecipeDetail(meal.id);
        setDetails(d);
      } catch(e) {
        setModalErr(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [meal.id]);

  if (loading) {
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10000 }}>
        <div style={{ background:'white', borderRadius:24, padding:40, textAlign:'center', maxWidth:400 }}>
          <div style={{ fontSize:14, color:'var(--ink-mute)' }}>Loading recipe…</div>
        </div>
      </div>
    );
  }

  if (modalErr || !details) {
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10000 }}>
        <div style={{ background:'white', borderRadius:24, padding:40, textAlign:'center', maxWidth:400 }}>
          <div style={{ fontSize:14, color:'#c0392b', marginBottom:16 }}>Error loading recipe: {modalErr}</div>
          <button onClick={onClose} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid var(--ct-border)', background:'var(--white)', cursor:'pointer' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', overflow:'auto', zIndex:10000, padding:20 }}>
      <div style={{ background:'white', borderRadius:24, maxWidth:900, margin:'0 auto', marginTop:40, marginBottom:40 }}>
        {/* Header with close */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:24, borderBottom:'1px solid var(--ct-border)' }}>
          <h1 style={{ margin:0, fontSize:28, fontWeight:700, letterSpacing:'-0.02em' }}>{details.title}</h1>
          <button onClick={onClose} style={{ fontSize:20, background:'none', border:'none', cursor:'pointer', color:'var(--ink-mute)' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ display:'flex', gap:32, padding:32, maxHeight:'calc(100vh - 200px)', overflow:'auto' }}>
          {/* Main */}
          <div style={{ flex:1, minWidth:0 }}>
            {/* Image */}
            <div style={{ width:'100%', height:300, borderRadius:16, overflow:'hidden', marginBottom:24, background:'#f5f5f5' }}>
              {meal.thumb && <img src={meal.thumb} alt={details.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
            </div>

            {/* Meta info */}
            <div className="dt-recipe-meta-row" style={{ marginBottom:32 }}>
              {[
                details.servings && { label: '🍽️ Serves', val: servings },
                details.minutes && { label: '⏱️ Time', val: `${details.minutes} min` },
                details.cuisine && { label: '🌍 Cuisine', val: details.cuisine },
                details.difficulty && { label: '🔥 Skill', val: details.difficulty },
              ].filter(Boolean).map((m, i) => (
                <div key={i} className="dt-recipe-meta-col">
                  <span className="dt-recipe-meta-label">{m.label}</span>
                  <span className="dt-recipe-meta-value">{m.val}</span>
                </div>
              ))}
            </div>

            {/* Steps */}
            <h2 className="sub">Method</h2>
            {details.steps && details.steps.length > 0 ? (
              details.steps.map((s, i) => (
                <div key={i} className="dt-step">
                  <div className="dt-step-num">{String(i + 1).padStart(2, '0')}</div>
                  <p>{s}</p>
                </div>
              ))
            ) : (
              <p style={{ fontSize:14, color:'var(--ink-mute)' }}>No instructions available.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ width:280, flexShrink:0 }}>
            <div className="dt-side-card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                <h4 style={{ margin:0 }}>Ingredients</h4>
                {details.servings && (
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:12, color:'var(--ink-mute)' }}>Serves</span>
                    <div className="dt-stepper">
                      <button onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
                      <span className="val">{servings}</span>
                      <button onClick={() => setServings(s => s + 1)}>+</button>
                    </div>
                  </div>
                )}
              </div>
              {details.ingredients && details.ingredients.length > 0 ? (
                <ul className="ing-list">
                  {details.ingredients.map((ing, i) => (
                    <li key={i} className={`ing-row ${checked[i] ? 'checked' : ''}`} onClick={() => toggleChecked(i)} style={{ cursor:'pointer' }}>
                      <span className={`ing-check ${checked[i] ? 'on' : ''}`}>
                        {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span className="ing-qty">{ing.qty}</span>
                      <span className="ing-name">{ing.item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize:14, color:'var(--ink-mute)' }}>No ingredients listed.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── TheMealDB recipe card ───────────────────────────────────────────────────

function MealDBRecipeDetail({ meal, details, onBack }) {
  return <RecipeDetail recipe={meal} details={details} onBack={onBack} />;
}

function MealDBCard({ meal, onViewRecipe }) {
  const gradeColors = { 'A': '#22863a', 'B': '#28a745', 'C': '#ffc107', 'D': '#ff8c00', 'F': '#dc3545' };
  const gradeColor = gradeColors[meal.healthGrade] || '#666';

  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--ct-border)', borderRadius:18, overflow:'hidden', cursor:'pointer', transition:'all .2s ease', display:'flex', flexDirection:'column', height:'100%' }} className="dt-feature-card">
      {/* Image */}
      <div onClick={() => onViewRecipe(meal)} style={{ width:'100%', height:200, position:'relative', overflow:'hidden', background:'#f5f5f5' }}>
        {meal.thumb && (
          <img src={meal.thumb} alt={meal.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        )}
        {/* Health grade badge */}
        {meal.healthGrade && (
          <div style={{ position:'absolute', top:8, right:8, width:32, height:32, borderRadius:'50%', background:gradeColor, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
            {meal.healthGrade}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10, flex:1 }}>
        <div>
          <h3 style={{ margin:'0 0 8px', fontFamily:'var(--display)', fontSize:16, fontWeight:700, letterSpacing:'-0.02em', color:'var(--ink)', lineHeight:1.2 }}>{meal.title}</h3>
          {meal.matchedIngredients.length > 0 && (
            <div style={{ fontSize:12, color:'var(--ink-soft)' }}>
              Matches: <span style={{ color:'#f0631c', fontWeight:600 }}>{meal.matchedIngredients.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div style={{ fontSize:12, color:'var(--ink-mute)', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginTop:'auto' }}>
          {meal.servings && <span>Serves {meal.servings}</span>}
          {meal.servings && meal.totalTime && <span style={{ opacity:0.3 }}>•</span>}
          {meal.totalTime && <span>{meal.totalTime}</span>}
        </div>

        {/* Button */}
        <button onClick={() => onViewRecipe(meal)} style={{ width:'100%', padding:'8px 12px', borderRadius:10, border:'1px solid var(--ct-border)', background:'var(--white)', fontSize:12, fontWeight:600, cursor:'pointer', color:'var(--orange)', marginTop:8 }}>
          View recipe →
        </button>
      </div>
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
          <h1 className="dt-serif" style={{ fontSize:34, lineHeight:1.05, margin:0, letterSpacing:'-0.04em', color:'var(--ct-label)' }}>Here's what you can make</h1>
        </div>
        <button onClick={onRevise} className="dt-btn ghost sm" style={{ flexShrink:0 }}>Search again</button>
      </div>

      {/* TheMealDB results */}
      {mealdb.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:10, padding:'0 2px' }}>
            <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>Recipes</h3>
            <span style={{ fontSize:12, color:'var(--ct-hint)' }}>{mealdb.length} found</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {mealdb.map(meal => <MealDBCard key={meal.id} meal={meal} onViewRecipe={onViewRecipe}/>)}
          </div>
        </div>
      )}

      {/* AI-generated ideas */}
      {ideas.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:10, padding:'0 2px' }}>
            <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>
              {mealdb.length > 0 ? 'More ideas from the guru' : 'Ideas from the guru'}
            </h3>
            <span style={{ fontSize:12, color:'var(--ct-hint)' }}>{ideas.length} ideas</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ideas.map((idea, i) => (
              <GeneratedRecipeCard key={i} idea={idea} availableIngredients={availableIngredients}/>
            ))}
          </div>
        </div>
      )}

      {mealdb.length === 0 && ideas.length === 0 && (
        <div style={{ textAlign:'center', padding:'32px 0', color:'var(--ct-muted)', fontSize:14 }}>
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

// ─── Compact recipe view (for translator left pane) ─────────────────────────

function CompactRecipeView({ recipe, details, onBack, onTransform, searchedIngredients = [], showTransformOptions = false }) {
  const [servings, setServings] = React.useState(details.servings || 4);
  const [showTransformPanel, setShowTransformPanel] = React.useState(false);

  // Pre-check ingredients that match searched ingredients
  const initialChecked = {};
  if (searchedIngredients.length > 0 && details.ingredients) {
    details.ingredients.forEach((ing, i) => {
      const ingLower = ing.item.toLowerCase();
      initialChecked[i] = searchedIngredients.some(search => ingLower.includes(search.toLowerCase()));
    });
  }

  const [checked, setChecked] = React.useState(initialChecked);
  const [diet, setDiet] = React.useState([]);
  const [allergies, setAllergies] = React.useState([]);
  const [cuisine, setCuisine] = React.useState('');
  const [time, setTime] = React.useState(details.minutes || 60);
  const [skill, setSkill] = React.useState('Intermediate');

  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const toggleArray = (arr, item) => {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  };

  const scaleQty = (qty, factor) => {
    if (!qty) return '';
    const match = qty.match(/^([\d.]+)\s*(.*)$/);
    if (!match) return qty;
    const [, num, unit] = match;
    const scaled = parseFloat(num) * factor;
    return scaled % 1 === 0 ? `${scaled}${unit}` : `${scaled.toFixed(2)}${unit}`;
  };

  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'var(--ink-mute)', padding:0 }}>← Back</button>
        <span style={{ fontSize:10, fontWeight:700, color:'var(--ct-hint)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{details.cuisine || 'Recipe'}</span>
      </div>

      <h2 style={{ margin:'0 0 10px', fontSize:20, fontWeight:700, fontFamily:'var(--display)', lineHeight:1.2, color:'var(--ink)' }}>{details.title}</h2>

      {recipe.thumb && (
        <img src={recipe.thumb} alt={details.title} style={{ width:'100%', height:160, objectFit:'cover', borderRadius:10, marginBottom:16 }}/>
      )}

      {details.ingredients && details.ingredients.length > 0 && (
        <div style={{ marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <h4 style={{ margin:0, fontSize:12, fontWeight:700, color:'var(--ct-label)' }}>Ingredients</h4>
            {details.servings && (
              <div className="dt-stepper" style={{ transform:'scale(0.8)', transformOrigin:'right' }}>
                <button onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
                <span className="val">{servings}</span>
                <button onClick={() => setServings(s => s + 1)}>+</button>
              </div>
            )}
          </div>
          <ul style={{ listStyle:'none', margin:0, padding:0 }}>
            {details.ingredients.map((ing, i) => (
              <li key={i} onClick={() => toggle(i)} style={{ display:'grid', gridTemplateColumns:'20px 1fr', gap:8, padding:'8px 0', borderBottom:'1px solid var(--line-soft)', fontSize:12, cursor:'pointer', alignItems:'flex-start' }}>
                <span style={{ width:20, height:20, borderRadius:6, border:'1.5px solid var(--line)', background: checked[i] ? 'var(--orange)' : 'var(--white)', marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <div>
                  <span style={{ fontFamily:'var(--mono)', color:'var(--orange)', fontWeight:600, fontSize:11 }}>{details.servings ? scaleQty(ing.qty, servings / details.servings) : ing.qty}</span>
                  <span style={{ display:'block', color: checked[i] ? 'var(--ink-mute)' : 'var(--ink)', textDecoration: checked[i] ? 'line-through' : 'none', marginTop:2 }}>{ing.item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {details.steps && details.steps.length > 0 && (
        <div>
          <h4 style={{ margin:'0 0 10px', fontSize:12, fontWeight:700, color:'var(--ct-label)' }}>Method</h4>
          {details.steps.map((s, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'22px 1fr', gap:8, padding:'10px 0', borderBottom:i < details.steps.length - 1 ? '1px solid var(--line-soft)' : 'none', fontSize:12, lineHeight:1.4 }}>
              <span style={{ fontWeight:700, color:'var(--ct-muted)', marginTop:2 }}>{String(i + 1).padStart(2, '0')}</span>
              <p style={{ margin:0 }}>{s}</p>
            </div>
          ))}
        </div>
      )}

      {/* Expandable Transform Panel */}
      <button
        onClick={() => setShowTransformPanel(!showTransformPanel)}
        style={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          gap:12,
          background:'rgba(240,99,28,.08)',
          border:'1px solid rgba(240,99,28,.20)',
          borderRadius:12,
          padding:'12px 14px',
          marginTop:16,
          marginBottom:0,
          textAlign:'left',
          cursor:'pointer',
          fontWeight:600,
          fontSize:13,
          color:'var(--orange)',
          transition:'all 200ms ease'
        }}
      >
        <span style={{ flex:1 }}>⚡ Reshape this recipe</span>
        <span style={{ fontSize:16 }}>{showTransformPanel ? '▼' : '→'}</span>
      </button>

      {/* Transform Options Panel */}
      {showTransformPanel && (
        <div className="fadeInUp" style={{ marginTop:12, paddingTop:14, borderTop:'1px solid var(--line-soft)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Servings</label>
              <input type="number" min="1" value={servings} onChange={e => setServings(parseInt(e.target.value) || 1)} style={{ width:'100%', padding:'7px 9px', border:'1px solid var(--ct-border)', borderRadius:7, fontSize:12, boxSizing:'border-box' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Time</label>
              <input type="number" min="5" value={time} onChange={e => setTime(parseInt(e.target.value) || 60)} style={{ width:'100%', padding:'7px 9px', border:'1px solid var(--ct-border)', borderRadius:7, fontSize:12, boxSizing:'border-box' }}/>
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Skill level</label>
            <div style={{ display:'flex', gap:6 }}>
              {['Easy', 'Intermediate', 'Advanced'].map(s => (
                <button key={s} onClick={() => setSkill(s)} style={{ flex:1, padding:'6px 0', borderRadius:6, border:'1px solid var(--ct-border)', background: skill === s ? 'var(--orange)' : 'var(--white)', color: skill === s ? 'white' : 'var(--ink)', cursor:'pointer', fontSize:11, fontWeight:600 }}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Cuisine remix</label>
            <input type="text" placeholder="e.g. Thai, Moroccan" value={cuisine} onChange={e => setCuisine(e.target.value)} style={{ width:'100%', padding:'7px 9px', border:'1px solid var(--ct-border)', borderRadius:7, fontSize:12, boxSizing:'border-box' }}/>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Dietary</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'].map(d => (
                <button key={d} onClick={() => setDiet(toggleArray(diet, d))} style={{ padding:'5px 10px', borderRadius:999, border:'1px solid var(--ct-border)', background: diet.includes(d) ? 'rgba(240,99,28,.15)' : 'var(--white)', color: diet.includes(d) ? 'var(--orange)' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{d}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Avoid</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['Nuts', 'Eggs', 'Soy', 'Shellfish'].map(a => (
                <button key={a} onClick={() => setAllergies(toggleArray(allergies, a))} style={{ padding:'5px 10px', borderRadius:999, border:'1px solid var(--ct-border)', background: allergies.includes(a) ? 'rgba(192,57,43,.15)' : 'var(--white)', color: allergies.includes(a) ? '#c0392b' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{a}</button>
              ))}
            </div>
          </div>

          <button onClick={() => {
            const excludedItems = Object.keys(checked).filter(i => !checked[i]).map(i => details.ingredients[parseInt(i)].item);
            onTransform(excludedItems);
          }} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'none', background:'var(--orange)', color:'white', cursor:'pointer', fontWeight:600, fontSize:12, marginTop:12 }}>Transform recipe</button>
        </div>
      )}
    </>
  );
}

// ─── Transform panel ──────────────────────────────────────────────────────────

function TransformPanel({ recipe, recipeDetails, onBack, excludedIngredients = [] }) {
  const [diet, setDiet] = React.useState([]);
  const [allergies, setAllergies] = React.useState([]);
  const [cuisine, setCuisine] = React.useState('');
  const [time, setTime] = React.useState(recipeDetails.minutes || 60);
  const [skill, setSkill] = React.useState('Intermediate');
  const [servings, setServings] = React.useState(recipeDetails.servings || 4);
  const [excluded, setExcluded] = React.useState(excludedIngredients);
  const [transforming, setTransforming] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [err, setErr] = React.useState('');

  const toggleArray = (arr, item) => {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  };

  const onTransform = async () => {
    setTransforming(true);
    setErr('');
    try {
      const config = { servings, diet, allergies, cuisine, time, skill, equipment: [], excluded, pantry: '' };
      const transformed = await transformRecipe(recipe, config);
      setResult(transformed);
    } catch (e) {
      setErr(e.message);
    } finally {
      setTransforming(false);
    }
  };

  if (result) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ background:'var(--white)', border:'1px solid var(--ct-border)', borderRadius:18, padding:'16px', fontSize:13, color:'var(--ink-mute)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <span style={{ fontWeight:700, color:'var(--ink)' }}>Your transformation</span>
            <button onClick={() => setResult(null)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:16, color:'var(--ink-mute)' }}>✕</button>
          </div>
          {result.guruNote && <p style={{ margin:0, fontSize:12, lineHeight:1.5 }}>{result.guruNote}</p>}
          {result.changes.length > 0 && (
            <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid var(--line-soft)' }}>
              <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:6, fontSize:12 }}>Changes:</div>
              <ul style={{ margin:0, padding:'0 0 0 14px', fontSize:11 }}>
                {result.changes.map((c, i) => <li key={i} style={{ marginBottom:4 }}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>
        <button onClick={onBack} style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid var(--ct-border)', background:'var(--white)', cursor:'pointer', fontWeight:600, fontSize:12 }}>Start over</button>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={CT.card}>
        <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--ct-border-soft)' }}>
          <h3 style={{ margin:'0 0 12px', fontSize:12, fontWeight:800, color:'var(--ct-label)', letterSpacing:'-0.01em' }}>Reshape</h3>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--ct-hint)', marginBottom:6 }}>Servings</label>
              <input type="number" min="1" value={servings} onChange={e => setServings(parseInt(e.target.value) || 1)} style={{ width:'100%', padding:'6px 8px', border:'1px solid var(--ct-border)', borderRadius:6, fontSize:12, boxSizing:'border-box' }}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--ct-hint)', marginBottom:6 }}>Max time</label>
              <input type="number" min="5" value={time} onChange={e => setTime(parseInt(e.target.value) || 60)} style={{ width:'100%', padding:'6px 8px', border:'1px solid var(--ct-border)', borderRadius:6, fontSize:12, boxSizing:'border-box' }}/>
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--ct-hint)', marginBottom:6 }}>Skill</label>
            <div style={{ display:'flex', gap:6 }}>
              {['Easy', 'Intermediate', 'Advanced'].map(s => (
                <button key={s} onClick={() => setSkill(s)} style={{ flex:1, padding:'5px 0', borderRadius:6, border:'1px solid var(--ct-border)', background: skill === s ? 'var(--orange)' : 'var(--white)', color: skill === s ? 'white' : 'var(--ink)', cursor:'pointer', fontSize:11, fontWeight:600 }}>{s}</button>
              ))}
            </div>
          </div>

          <input type="text" placeholder="Cuisine remix…" value={cuisine} onChange={e => setCuisine(e.target.value)} style={{ width:'100%', padding:'6px 8px', border:'1px solid var(--ct-border)', borderRadius:6, fontSize:12, marginBottom:12, boxSizing:'border-box' }}/>

          <div style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--ct-hint)', marginBottom:6 }}>Dietary</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'].map(d => (
                <button key={d} onClick={() => setDiet(toggleArray(diet, d))} style={{ padding:'4px 8px', borderRadius:999, border:'1px solid var(--ct-border)', background: diet.includes(d) ? 'rgba(240,99,28,.15)' : 'var(--white)', color: diet.includes(d) ? 'var(--orange)' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{d}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--ct-hint)', marginBottom:6 }}>Avoid</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['Nuts', 'Eggs', 'Soy', 'Shellfish'].map(a => (
                <button key={a} onClick={() => setAllergies(toggleArray(allergies, a))} style={{ padding:'4px 8px', borderRadius:999, border:'1px solid var(--ct-border)', background: allergies.includes(a) ? 'rgba(192,57,43,.15)' : 'var(--white)', color: allergies.includes(a) ? '#c0392b' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{a}</button>
              ))}
            </div>
          </div>
        </div>

        {err && <div style={{ padding:'10px 14px', fontSize:12, color:'#c0392b', background:'#fdf0ee' }}>Error: {err}</div>}
      </div>

      <button onClick={onTransform} disabled={transforming} style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'none', background:'var(--orange)', color:'white', cursor: transforming ? 'not-allowed' : 'pointer', fontWeight:600, fontSize:12, opacity: transforming ? 0.7 : 1 }}>
        {transforming ? 'Transforming…' : 'Transform'}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function Translator({ recipeId, onBack, onNavigate }) {
  const [mode, setMode] = React.useState('find'); // 'find' | 'transform' | 'scan'

  // Chef Tool state
  const [ingredients,     setIngredients]     = React.useState(new Set());
  const [cuisineFilter,   setCuisineFilter]   = React.useState(null);
  const [ingredientInput, setIngredientInput] = React.useState('');
  const [pasteMode,       setPasteMode]       = React.useState(false);
  const [pasteText,       setPasteText]       = React.useState('');
  const [mealdbResults,   setMealdbResults]   = React.useState(null);
  const [mealdbLoading,   setMealdbLoading]   = React.useState(false);
  const [mealdbErr,       setMealdbErr]       = React.useState('');
  const [currentPage,     setCurrentPage]     = React.useState(1);
  const [aiIdeas,         setAiIdeas]         = React.useState(null);
  const [aiLoading,       setAiLoading]       = React.useState(false);
  const [aiErr,           setAiErr]           = React.useState('');
  const [viewingRecipe,   setViewingRecipe]   = React.useState(null);
  const [recipeDetails,   setRecipeDetails]   = React.useState(null);
  const [recipeLoading,   setRecipeLoading]   = React.useState(false);
  const [recipeChecked,   setRecipeChecked]   = React.useState({});
  const [transformStep,   setTransformStep]   = React.useState(null);
  const [excludedIngredients, setExcludedIngredients] = React.useState([]);
  const translatorLeftRef = React.useRef(null);
  const searchId = React.useRef(0);

  React.useEffect(() => {
    if (viewingRecipe && translatorLeftRef.current) {
      translatorLeftRef.current.scrollTop = 0;
    }
  }, [viewingRecipe]);

  const ITEMS_PER_PAGE = 8;
  const paginatedResults = mealdbResults
    ? mealdbResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : [];

  const switchMode = (m) => {
    setMode(m);
    setPasteMode(false);
  };

  const addIngredient = (val, type = 'ingredient') => {
    const clean = val.trim();
    if (!clean) return;
    if (type === 'cuisine') {
      // Match to a known RECIPE_API_CUISINES entry (case-insensitive)
      const matched = RECIPE_API_CUISINES.find(c => c.toLowerCase() === clean.toLowerCase()) || clean;
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

  // Auto-search recipe-api.com whenever ingredients or cuisine changes (debounced)
  React.useEffect(() => {
    if (ingredients.size === 0 && !cuisineFilter) { setMealdbResults(null); setMealdbErr(''); return; }
    const id = ++searchId.current;
    setMealdbLoading(true);
    setMealdbErr('');
    setAiIdeas(null);
    setCurrentPage(1); // Reset to page 1 on new search
    const t = setTimeout(async () => {
      try {
        const results = await searchRecipesByIngredientsAndCuisine([...ingredients], cuisineFilter);
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

  const onViewRecipe = async (meal) => {
    setRecipeLoading(true);
    setRecipeChecked({});
    try {
      const details = await getRecipeDetail(meal.id);
      setViewingRecipe(meal);
      setRecipeDetails(details);
    } catch(e) {
      console.error('Error loading recipe:', e);
      alert('Error loading recipe: ' + e.message);
    } finally {
      setRecipeLoading(false);
    }
  };

  return (
    <div className="dt-translator">
      {/* Desktop left panel / Mobile header */}
      <div ref={translatorLeftRef} className={`dt-translator-left ${viewingRecipe ? 'open' : ''}`}>
        {viewingRecipe && recipeDetails ? (
          <RecipeDetailsComplete recipe={viewingRecipe} details={recipeDetails} onBack={() => { setViewingRecipe(null); setRecipeDetails(null); setTransformStep(null); }} searchedIngredients={[...ingredients]} checked={recipeChecked} setChecked={setRecipeChecked} transformStep={transformStep} setTransformStep={setTransformStep} />
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Offcanvas backdrop for mobile */}
      {viewingRecipe && recipeDetails && (
        <div className="dt-offcanvas-backdrop" onClick={() => { setViewingRecipe(null); setRecipeDetails(null); setTransformStep(null); }}/>
      )}

      <div className="dt-translator-right">
        {/* ── Mode tabs ── */}
        <div className="dt-mode-tabs">
          {[
            { id:'find', label:'Chef Tool', sub:'Cook what you have', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v2"/></svg> },
            { id:'transform', label:'Transform', sub:'Reshape a recipe', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/></svg> },
            { id:'scan', label:'Scanner',    sub:'Read food labels fast', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
          ].map(({ id, label, sub, icon }) => (
            <button
              key={id}
              type="button"
              data-mode={id}
              className={`dt-mode-tab${mode === id ? ' active' : ''}`}
              onClick={() => switchMode(id)}
              aria-pressed={mode === id}
            >
              <span className="dt-mode-tab-icon">{icon}</span>
              <div>
                <div className="dt-mode-tab-title">{label}</div>
                <div className="dt-mode-tab-sub">{sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Chef Tool mode ── */}
        {mode === 'find' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Ingredient input card */}
            <div style={CT.card}>
              <div style={{ padding:'14px 16px', borderBottom: ingredients.size > 0 ? '1px solid var(--ct-border-soft)' : 'none' }}>
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
                    <button onClick={() => { setIngredients(new Set()); setCuisineFilter(null); }} style={{ padding:'6px 10px', borderRadius:999, background:'none', border:'1px solid var(--ct-border)', color:'var(--ct-muted)', fontSize:12, cursor:'pointer' }}>Clear all</button>
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
                  style={{ width:'100%', padding:'11px 16px', background:'none', border:'none', cursor:'pointer', fontSize:13, color:'var(--ct-muted)', textAlign:'left', display:'flex', alignItems:'center', gap:6 }}>
                  <span>📋</span> Or paste a full recipe to extract ingredients
                </button>
              ) : (
                <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
                  <textarea
                    style={{ width:'100%', minHeight:120, resize:'vertical', borderRadius:12, border:'1px solid var(--ct-border-input)', background:'var(--ct-input-bg)', padding:'10px 12px', outline:'none', fontSize:13.5, lineHeight:1.5, color:'var(--ct-body)', boxSizing:'border-box' }}
                    placeholder="Paste any recipe here — we'll pull out the ingredients…"
                    value={pasteText}
                    onChange={e => setPasteText(e.target.value)}
                    onFocus={e => { e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; }}
                    onBlur={e  => { e.target.style.borderColor='var(--ct-border-input)'; e.target.style.boxShadow='none'; }}
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
              <div style={{ textAlign:'center', padding:'24px 0', color:'var(--ct-muted)', fontSize:14 }}>
                Add an ingredient or cuisine to see what you can make
              </div>
            )}

            {mealdbLoading && (ingredients.size > 0 || cuisineFilter) && (
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 2px', fontSize:13, color:'var(--ct-muted)' }}>
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
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {mealdbResults.length > 0 ? (
                  <>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'0 2px' }}>
                      <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>Recipes</h3>
                      <span style={{ fontSize:12, color:'var(--ct-hint)' }}>
                        {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, mealdbResults.length)} of {mealdbResults.length}
                      </span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
                      {paginatedResults.map(meal => <MealDBCard key={meal.id} meal={meal} onViewRecipe={onViewRecipe}/>)}
                    </div>
                    {/* Pagination controls */}
                    {mealdbResults.length > ITEMS_PER_PAGE && (
                      <div style={{ display:'flex', gap:8, justifyContent:'center', padding:'8px 0', borderTop:'1px solid var(--ct-border-soft)' }}>
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          style={{
                            padding:'6px 12px',
                            borderRadius:6,
                            border:'1px solid var(--ct-border)',
                            background:'var(--white)',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1,
                            fontSize:12,
                            fontWeight:600,
                          }}
                        >
                          ← Prev
                        </button>
                        <span style={{ fontSize:12, color:'var(--ct-hint)', display:'flex', alignItems:'center', padding:'0 8px' }}>
                          Page {currentPage}
                        </span>
                        <button
                          onClick={() => setCurrentPage(p => Math.min(Math.ceil(mealdbResults.length / ITEMS_PER_PAGE), p + 1))}
                          disabled={currentPage === Math.ceil(mealdbResults.length / ITEMS_PER_PAGE)}
                          style={{
                            padding:'6px 12px',
                            borderRadius:6,
                            border:'1px solid var(--ct-border)',
                            background:'var(--white)',
                            cursor: currentPage === Math.ceil(mealdbResults.length / ITEMS_PER_PAGE) ? 'not-allowed' : 'pointer',
                            opacity: currentPage === Math.ceil(mealdbResults.length / ITEMS_PER_PAGE) ? 0.5 : 1,
                            fontSize:12,
                            fontWeight:600,
                          }}
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ fontSize:13, color:'var(--ct-muted)', padding:'8px 2px' }}>No recipes found for those ingredients.</div>
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
                  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 2px', fontSize:13, color:'var(--ct-muted)' }}>
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
                      <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>AI ideas</h3>
                      <button onClick={() => setAiIdeas(null)} style={{ fontSize:12, color:'var(--ct-muted)', background:'none', border:'none', cursor:'pointer' }}>Clear</button>
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

        {/* ── Transform panel (when recipe is viewed) ── */}
        {mode === 'find' && viewingRecipe && recipeDetails && (
          <div style={{ marginTop: viewingRecipe ? 24 : -9999, opacity: viewingRecipe ? 1 : 0, pointerEvents: viewingRecipe ? 'auto' : 'none', transition: 'opacity 240ms cubic-bezier(0.22,1,0.36,1), margin-top 240ms cubic-bezier(0.22,1,0.36,1)' }}>
            <h3 style={{ margin:'0 0 16px 2px', fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>Transform</h3>
            <TransformPanel recipe={viewingRecipe} recipeDetails={recipeDetails} onBack={() => { setViewingRecipe(null); setRecipeDetails(null); }} excludedIngredients={excludedIngredients} />
          </div>
        )}

        {/* ── Transform mode ── */}
        {mode === 'transform' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {viewingRecipe && recipeDetails ? (
              <>
                <h3 style={{ margin:'0 0 16px 2px', fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'var(--ct-label)' }}>Transform "{recipeDetails.title}"</h3>
                <TransformPanel recipe={viewingRecipe} recipeDetails={recipeDetails} onBack={() => { setViewingRecipe(null); setRecipeDetails(null); }} excludedIngredients={excludedIngredients} />
              </>
            ) : (
              <div style={{ textAlign:'center', padding:'24px 0', color:'var(--ct-muted)', fontSize:14 }}>
                <p style={{ margin:'0 0 12px' }}>No recipe selected</p>
                <button onClick={() => setMode('find')} style={{ padding:'10px 16px', borderRadius:10, border:'1px solid var(--ct-border)', background:'var(--white)', cursor:'pointer', fontWeight:600, fontSize:12 }}>← Back to search</button>
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
