// ── Chef Tool design tokens ──────────────────────────────────────────────────
const CT = {
  card:        { background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:22, boxShadow:'0 10px 26px rgba(0,0,0,.09)', overflow:'hidden' },
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

// ─── Transform result ─────────────────────────────────────────────────────────

function TransformResult({ translated, servings, diet, time, skill, cuisine, onRevise }) {
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:0 }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
        <div>
          <div style={CT.kicker}>
            <Icon.sparkle style={{ width:14, height:14 }}/>
            Reshaped
          </div>
          <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.05, margin:0, letterSpacing:'-0.03em', color:'#0b1220' }}>Your version</h1>
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <button onClick={onRevise} className="dt-btn ghost sm">Revise</button>
          <button className="dt-btn dark sm"><Icon.bookmark style={{ width:14, height:14 }}/> Save</button>
          <button className="dt-btn dark sm"><Icon.share style={{ width:14, height:14 }}/> Share</button>
        </div>
      </div>

      {/* Summary tags */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
        {diet.map(d => (
          <span key={d} style={{ display:'inline-flex', alignItems:'center', padding:'7px 10px', borderRadius:999, background:'rgba(240,99,28,.10)', border:'1px solid rgba(240,99,28,.22)', color:'#f0631c', fontSize:12, fontWeight:700 }}>{d}</span>
        ))}
        {[`${servings} servings`,`${time} min cap`,skill,...(cuisine!=='Keep as-is'?[`${cuisine} remix`]:[])].map(t => (
          <span key={t} style={{ display:'inline-flex', alignItems:'center', padding:'7px 10px', borderRadius:999, background:'rgba(14,26,47,.06)', border:'1px solid rgba(14,26,47,.10)', color:'#1a305c', fontSize:12, fontWeight:600 }}>{t}</span>
        ))}
      </div>

      {/* Guru's notes */}
      <div style={{ background:'#0e1a2f', borderRadius:22, padding:'20px 22px', marginBottom:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
          <Icon.sparkle style={{ color:'#f0631c', width:16, height:16 }}/>
          <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', color:'#f0631c' }}>Guru's notes</span>
        </div>
        <p style={{ margin:0, fontSize:14, lineHeight:1.6, color:'rgba(250,245,236,.88)' }}>{translated.guruNote}</p>
      </div>

      {/* What changed */}
      <ResultGroup title="What changed" hint={`${translated.changes.length} changes`}>
        {translated.changes.map((c, i) => (
          <div key={i} style={{ display:'flex', gap:14, padding:'14px 16px', borderBottom:i < translated.changes.length-1 ? '1px solid rgba(14,26,47,.08)' : 'none' }}>
            <span style={{ width:24, height:24, borderRadius:999, background:'rgba(240,99,28,.10)', color:'#f0631c', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0 }}>{i+1}</span>
            <p style={{ margin:0, fontSize:13.5, lineHeight:1.55, color:'#161616' }}>{c}</p>
          </div>
        ))}
      </ResultGroup>

      {/* Reshaped ingredients */}
      <ResultGroup title="Reshaped ingredients" hint={`${translated.ingredients.length} items`}>
        {translated.ingredients.map((ing, i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'88px 1fr', gap:12, alignItems:'baseline', padding:'12px 16px', borderBottom:i < translated.ingredients.length-1 ? '1px solid rgba(14,26,47,.08)' : 'none', fontSize:13.5 }}>
            <span style={{ fontFamily:'var(--mono)', color:'#f0631c', fontWeight:700, fontSize:12 }}>{ing.qty}</span>
            <div style={{ lineHeight:1.4 }}>
              {ing.isNew && <span className="diff-add-dot"/>}
              {ing.item.map((sp, j) => {
                if (sp.kind === 'rm')  return <span key={j} className="diff-removed">{sp.text}</span>;
                if (sp.kind === 'add') return <span key={j} className="diff-added">{sp.text}</span>;
                return <span key={j}>{sp.text}</span>;
              })}
            </div>
          </div>
        ))}
      </ResultGroup>

      {/* Reshaped method */}
      <ResultGroup title="Reshaped method" hint={`${translated.steps.length} steps`}>
        {translated.steps.map((s, i) => {
          const parts = s.split(/(\[[^\]]+\])/g).map((p, j) => {
            if (p.startsWith('[') && p.endsWith(']')) return <span key={j} className="diff-added">{p.slice(1,-1)}</span>;
            return <span key={j}>{p}</span>;
          });
          return (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'38px 1fr', gap:10, padding:'12px 16px', borderBottom:i < translated.steps.length-1 ? '1px solid rgba(14,26,47,.08)' : 'none', alignItems:'start' }}>
              <span style={{ fontFamily:'var(--display)', fontSize:20, color:'rgba(14,26,47,.22)', fontStyle:'italic', fontWeight:500, lineHeight:1.1 }}>{i+1}</span>
              <p style={{ margin:0, fontSize:13.5, lineHeight:1.55, color:'#3d3d3d' }}>{parts}</p>
            </div>
          );
        })}
      </ResultGroup>

      <div className="dt-sticky-cta">
        <button onClick={onRevise} className="dt-btn ghost lg" style={{ flex:1 }}>Revise</button>
        <button className="dt-btn primary lg" style={{ flex:1 }}>
          <Icon.bookmark style={{ width:16, height:16 }}/> Save to my book
        </button>
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

// ─── Find Mode results panel ──────────────────────────────────────────────────

function FindResults({ results, availableIngredients, onRevise, onViewRecipe }) {
  const { local, ideas } = results;
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:0 }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
        <div>
          <div style={CT.kicker}>
            <Icon.sparkle style={{ width:14, height:14 }}/>
            Fridge Raid
          </div>
          <h1 className="dt-serif" style={{ fontSize:34, lineHeight:1.05, margin:0, letterSpacing:'-0.04em', color:'#0b1220' }}>Here's what you can make</h1>
        </div>
        <button onClick={onRevise} className="dt-btn ghost sm" style={{ flexShrink:0 }}>Search again</button>
      </div>

      {local.length > 0 && (
        <ResultGroup title="From the library" hint={`${local.length} match${local.length!==1?'es':''}`}>
          {local.map(({ recipe, score, matchedIngredients }, i) => (
            <div key={recipe.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:14, padding:'12px 16px', borderBottom:i < local.length-1 ? '1px solid rgba(14,26,47,.08)' : 'none' }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontFamily:'var(--display)', fontSize:16, fontWeight:700, letterSpacing:'-0.02em', marginBottom:3, color:'#0b1220' }}>{recipe.title}</div>
                <div style={{ fontSize:12, color:'#515151' }}>
                  Uses {score} ingredient{score!==1?'s':''}: <span style={{ color:'#f0631c', fontWeight:600 }}>{matchedIngredients.join(', ')}</span>
                </div>
              </div>
              <button onClick={() => onViewRecipe(recipe.id)} className="dt-btn ghost sm" style={{ flexShrink:0 }}>View →</button>
            </div>
          ))}
        </ResultGroup>
      )}

      {ideas.length > 0 && (
        <div>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:10, padding:'0 2px' }}>
            <h3 style={{ margin:0, fontWeight:800, letterSpacing:'-0.02em', fontSize:14, color:'#0b1220' }}>
              {local.length===0 ? 'AI-generated ideas' : 'More ideas from the guru'}
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

      <div className="dt-sticky-cta" style={{ marginTop:16 }}>
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

  return {
    title,
    servings: 4,
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
  // recipeId kept for back-compat with App.jsx routing but not used in transform mode
  // Shared
  const [mode, setMode] = React.useState('transform'); // 'transform' | 'find' | 'scan'

  // Transform mode state
  const [phase,       setPhase]       = React.useState('config'); // 'config'|'translating'|'result'
  const [recipeText,  setRecipeText]  = React.useState('');
  const [servings,    setServings]    = React.useState(4);
  const [diet,        setDiet]        = React.useState(new Set());
  const [allergies,   setAllergies]   = React.useState(new Set());
  const [cuisine,     setCuisine]     = React.useState('Keep as-is');
  const [time,        setTime]        = React.useState(60);
  const [skill,       setSkill]       = React.useState('Comfortable');
  const [equipment,   setEquipment]   = React.useState(new Set());
  const [pantry,      setPantry]      = React.useState('');
  const [translated,  setTranslated]  = React.useState(null);
  const [transformErr, setTransformErr] = React.useState('');

  // Find mode state
  const [fridgeInput, setFridgeInput] = React.useState('');
  const [findPhase,   setFindPhase]   = React.useState('input'); // 'input'|'searching'|'results'
  const [findResults, setFindResults] = React.useState(null);
  const [findErr,     setFindErr]     = React.useState('');

  const tog = (set, setter, val) => {
    const n = new Set(set);
    n.has(val) ? n.delete(val) : n.add(val);
    setter(n);
  };

  const switchMode = (m) => {
    setMode(m);
    setPhase('config');
    setFindPhase('input');
    setTransformErr('');
    setFindErr('');
  };

  const onTranslate = async () => {
    if (!recipeText.trim()) return;
    setPhase('translating');
    setTransformErr('');
    try {
      const parsed = parseRecipeText(recipeText);
      const result = await transformRecipe(parsed, {
        servings, diet:[...diet], allergies:[...allergies],
        cuisine, time, skill, equipment:[...equipment], pantry,
      });
      setTranslated(result);
      setPhase('result');
    } catch(e) {
      setTransformErr(e.message);
      setPhase('config');
    }
  };

  const onFindRecipes = async () => {
    const parsed = fridgeInput.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (!parsed.length) return;
    setFindPhase('searching');
    setFindErr('');
    try {
      const local = searchExistingRecipes(parsed);
      const ideas = await generateRecipeIdeas(parsed, {});
      setFindResults({ local, ideas, parsedIngredients: parsed });
      setFindPhase('results');
    } catch(e) {
      setFindErr(e.message);
      setFindPhase('input');
    }
  };

  const showOriginalSide = mode === 'transform';

  return (
    <div className="dt-translator">
      {/* Left: original recipe (transform mode only) */}
      <div className="dt-translator-left">
        <div style={{ fontSize:13, color:'var(--ink-mute)' }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>← Back to recipe</a>
        </div>

        {showOriginalSide ? (
          <>
            <div>
              <div className="dt-eyebrow">Chef Tool</div>
              <h1 className="dt-serif" style={{ fontSize:34, lineHeight:1.05, margin:'8px 0 14px', letterSpacing:'-0.02em' }}>Paste any recipe.<br/>Reshape it your way.</h1>
              <p style={{ fontSize:14, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>
                Copy from any website, cookbook, food blog, or your own notes. The guru will rewrite ingredients, adjust quantities, and re-flow the method to match your constraints.
              </p>
            </div>

            {recipeText.trim() ? (
              <div className="dt-side-card" style={{ marginTop:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.07em', textTransform:'uppercase', color:'var(--ink-mute)' }}>Your recipe</span>
                </div>
                <pre style={{ margin:0, fontSize:12.5, lineHeight:1.65, color:'var(--ink-soft)', fontFamily:'var(--mono)', whiteSpace:'pre-wrap', wordBreak:'break-word', maxHeight:340, overflowY:'auto' }}>{recipeText.length > 700 ? recipeText.slice(0, 700) + '\n…' : recipeText}</pre>
              </div>
            ) : (
              <div className="dt-side-card" style={{ marginTop:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)', marginBottom:14 }}>What the guru can do</div>
                {[
                  { icon:'🥗', label:'Vegetarian',    desc:'Swap out meat and dairy for plant-based alternatives' },
                  { icon:'⚡', label:'Quick version',  desc:'Compress the method to fit a 30-minute window' },
                  { icon:'💚', label:'Healthier',      desc:'Cut calories and fat without losing flavour' },
                  { icon:'🚫', label:'Dairy-free',     desc:'Route around all dairy — milk, butter, cheese' },
                  { icon:'🌾', label:'Gluten-free',    desc:'Substitute all wheat-based ingredients' },
                  { icon:'🍜', label:'Cuisine remix',  desc:'Reinterpret through another culinary tradition' },
                ].map(({ icon, label, desc }) => (
                  <div key={label} style={{ display:'flex', gap:12, padding:'10px 0', borderBottom:'1px solid var(--line-soft)' }}>
                    <span style={{ fontSize:18, lineHeight:1, flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{label}</div>
                      <div style={{ fontSize:12, color:'var(--ink-soft)', lineHeight:1.4 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : mode === 'find' ? (
          <div>
            <div className="dt-eyebrow">Fridge Raid</div>
            <h1 className="dt-serif" style={{ fontSize:32, lineHeight:1.05, margin:'8px 0 12px', letterSpacing:'-0.02em' }}>What's in your kitchen?</h1>
            <p style={{ fontSize:14, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>
              List what you have and the guru will search the recipe library — then generate fresh ideas for anything that doesn't match.
            </p>
          </div>
        ) : (
          <div>
            <div className="dt-eyebrow">Food Scanner</div>
            <h1 className="dt-serif" style={{ fontSize:32, lineHeight:1.05, margin:'8px 0 12px', letterSpacing:'-0.02em' }}>Know what you're eating.</h1>
            <p style={{ fontSize:14, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>
              Scan any packaged food barcode. The guru looks up the product and tells you exactly how healthy it is — including what it means for kids of every age.
            </p>
            <div style={{ marginTop:20, padding:'16px 18px', background:'var(--cream)', borderRadius:14, fontSize:13, color:'var(--ink-soft)', lineHeight:1.6 }}>
              <strong style={{ display:'block', marginBottom:4 }}>How it works</strong>
              Barcodes are matched against the Open Food Facts database — over 3 million products worldwide. Claude then reads the nutrition label and ingredients to give you a plain-English health breakdown.
            </div>
          </div>
        )}
      </div>

      {/* Right: mode switcher + content */}
      <div className="dt-translator-right">
        {/* ── Mode tabs — card grid ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:14 }}>
          {[
            { id:'transform', label:'Transform',  sub:'Paste & reshape any recipe', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9Z"/><path d="M12 2C6.5 2 2 6.5 2 12c5.5 0 10-4.5 10-10Z"/></svg> },
            { id:'find',      label:'Fridge Raid', sub:'Cook what you have',       icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v2"/></svg> },
            { id:'scan',      label:'Scanner',     sub:'Read food labels fast',    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
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

        {/* ── Transform mode ── */}
        {mode === 'transform' && phase === 'config' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:0 }}>

            {/* Hero */}
            <div style={{ marginBottom:18 }}>
              <div style={CT.kicker}>
                <Icon.sparkle style={{ width:14, height:14 }}/>
                Chef Tool
              </div>
              <h1 className="dt-serif" style={{ fontSize:36, fontWeight:800, letterSpacing:'-0.05em', lineHeight:.97, margin:'0 0 10px', color:'#0b1220' }}>Paste any recipe.<br/>Reshape it your way.</h1>
              <p style={{ fontSize:14, color:'#515151', lineHeight:1.45, margin:0 }}>Swap ingredients, adjust for dietary needs, rescale servings, and re-flow the method — in one tap.</p>
            </div>

            {/* Config card */}
            <div style={CT.card}>

              {/* ── Recipe paste area ── */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Your recipe</span>
                  <span style={CT.hint}>Paste from anywhere</span>
                </div>
                <textarea
                  style={{ width:'100%', minHeight:130, resize:'vertical', borderRadius:14, border:'1px solid rgba(14,26,47,.14)', background:'rgba(250,245,236,.55)', padding:'10px 12px', outline:'none', fontFamily:'var(--body)', fontSize:13.5, lineHeight:1.5, color:'#161616', transition:'border-color .18s ease,box-shadow .18s ease,background .18s ease', boxSizing:'border-box' }}
                  placeholder={"Paste any recipe here — ingredients + instructions — from any website, cookbook, or food blog.\n\nOr tap an example below to try it out."}
                  value={recipeText}
                  onChange={e => setRecipeText(e.target.value)}
                  onFocus={e => { e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; e.target.style.background='rgba(255,255,255,.88)'; }}
                  onBlur={e  => { e.target.style.borderColor='rgba(14,26,47,.14)';  e.target.style.boxShadow='none'; e.target.style.background='rgba(250,245,236,.55)'; }}
                />
                <div style={{ marginTop:10 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:'#8a8a8a', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:6 }}>Try an example</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {(typeof RECIPES !== 'undefined' ? RECIPES : []).slice(0, 5).map(r => (
                      <button
                        key={r.id}
                        onClick={() => setRecipeText(formatRecipeAsText(r))}
                        style={{ display:'inline-flex', alignItems:'center', padding:'6px 10px', borderRadius:999, cursor:'pointer', fontSize:12, fontWeight:600, border:'1px solid rgba(14,26,47,.10)', background:'rgba(250,245,236,.78)', color:'#1a305c', transition:'all .14s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.background='rgba(240,99,28,.08)'; e.currentTarget.style.borderColor='rgba(240,99,28,.25)'; e.currentTarget.style.color='#f0631c'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='rgba(250,245,236,.78)'; e.currentTarget.style.borderColor='rgba(14,26,47,.10)'; e.currentTarget.style.color='#1a305c'; }}
                      >{r.title}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Servings */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Servings</span>
                  <span style={CT.hint}>{servings} people</span>
                </div>
                <div className="dt-stepper" style={{ height:40, width:'fit-content' }}>
                  <button style={{ width:40, height:40 }} onClick={() => setServings(s => Math.max(1, s-1))}>−</button>
                  <span className="val" style={{ fontSize:15, minWidth:32 }}>{servings}</span>
                  <button style={{ width:40, height:40 }} onClick={() => setServings(s => s+1)}>+</button>
                </div>
              </div>

              {/* Dietary style */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Dietary style</span><span style={CT.hint}>Pick any that apply</span></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {DT_DIETARY.map(item => <CTChip key={item} label={item} active={diet.has(item)} onClick={() => tog(diet, setDiet, item)}/>)}
                </div>
              </div>

              {/* Allergies */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Allergies &amp; avoid</span><span style={CT.hint}>Routed around in every swap</span></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {DT_ALLERGIES.map(item => <CTChip key={item} label={item} active={allergies.has(item)} onClick={() => tog(allergies, setAllergies, item)}/>)}
                </div>
              </div>

              {/* Cuisine remix */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Cuisine remix</span><span style={CT.hint}>Reinterpret through another tradition</span></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {DT_CUISINES.map(c => <CTChip key={c} label={c} active={cuisine===c} onClick={() => setCuisine(c)}/>)}
                </div>
              </div>

              {/* Time cap */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Time cap</span><span style={CT.hint}>{time} min</span></div>
                <div style={{ fontFamily:'var(--mono)', fontSize:28, fontWeight:700, color:'#161616', lineHeight:1, marginBottom:10 }}>
                  {time}<span style={{ fontSize:14, fontWeight:500, color:'#8a8a8a', marginLeft:4 }}>min</span>
                </div>
                <input type="range" min="15" max="180" step="5" value={time} onChange={e => setTime(Number(e.target.value))} style={{ width:'100%', accentColor:'#f0631c' }}/>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#aeaeae', marginTop:4 }}><span>15m</span><span>60m</span><span>180m</span></div>
              </div>

              {/* Skill level */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Skill level</span></div>
                <div className="dt-segmented">
                  {DT_SKILLS.map(s => <button key={s} className={skill===s?'active':''} onClick={() => setSkill(s)}>{s}</button>)}
                </div>
              </div>

              {/* Kitchen constraints */}
              <div style={CT.section}>
                <div style={CT.labelRow}><span style={CT.label}>Kitchen constraints</span><span style={CT.hint}>Anything you're working without?</span></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {DT_EQUIPMENT.map(item => <CTChip key={item} label={item} active={equipment.has(item)} onClick={() => tog(equipment, setEquipment, item)}/>)}
                </div>
              </div>

              {/* Pantry notes */}
              <div style={CT.sectionLast}>
                <div style={CT.labelRow}><span style={CT.label}>Pantry notes</span><span style={CT.hint}>What you have or want to use up</span></div>
                <textarea
                  style={{ width:'100%', minHeight:80, resize:'vertical', borderRadius:14, border:'1px solid rgba(14,26,47,.14)', background:'rgba(250,245,236,.55)', padding:'10px 12px', outline:'none', fontFamily:'var(--body)', fontSize:13.5, lineHeight:1.45, color:'#161616', transition:'border-color .18s ease,box-shadow .18s ease,background .18s ease', boxSizing:'border-box' }}
                  placeholder="e.g. I have arborio rice but no tagliatelle, half a lemon, and some leftover white miso..."
                  value={pantry}
                  onChange={e => setPantry(e.target.value)}
                  onFocus={e => { e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; e.target.style.background='rgba(255,255,255,.88)'; }}
                  onBlur={e  => { e.target.style.borderColor='rgba(14,26,47,.14)';  e.target.style.boxShadow='none'; e.target.style.background='rgba(250,245,236,.55)'; }}
                />
              </div>
            </div>

            {transformErr && (
              <div style={{ marginTop:12, fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
                Error: {transformErr}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={onTranslate}
              disabled={!recipeText.trim()}
              style={{ marginTop:14, width:'100%', border:'none', outline:'none', borderRadius:18, padding:'14px 14px', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontFamily:'var(--body)', fontWeight:700, letterSpacing:'-0.01em', fontSize:15, color:'white', cursor: recipeText.trim() ? 'pointer' : 'default', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#f0631c,#ff8a3d 45%,#f9a849 100%)', boxShadow:'0 18px 40px rgba(240,99,28,.24)', transition:'transform .18s ease,box-shadow .18s ease', filter: recipeText.trim() ? 'none' : 'saturate(.45)', opacity: recipeText.trim() ? 1 : .7 }}
              onMouseEnter={e => { if (recipeText.trim()) { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 22px 55px rgba(240,99,28,.28)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 18px 40px rgba(240,99,28,.24)'; }}
            >
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(120px 60px at 22% 12%,rgba(255,255,255,.55),transparent 60%)', opacity:.9, pointerEvents:'none' }}/>
              <Icon.sparkle style={{ position:'relative', zIndex:1, width:18, height:18 }}/>
              <span style={{ position:'relative', zIndex:1 }}>{recipeText.trim() ? 'Reshape recipe' : 'Paste a recipe above'}</span>
            </button>
          </div>
        )}

        {mode === 'transform' && phase === 'translating' && <Translating label="transform"/>}

        {mode === 'transform' && phase === 'result' && translated && (
          <TransformResult
            translated={translated}
            servings={servings}
            diet={[...diet]}
            time={time}
            skill={skill}
            cuisine={cuisine}
            onRevise={() => setPhase('config')}
          />
        )}

        {/* ── Find mode ── */}
        {mode === 'find' && findPhase === 'input' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:0 }}>

            {/* Hero */}
            <div style={{ marginBottom:18 }}>
              <div style={CT.kicker}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v2"/></svg>
                Fridge Raid
              </div>
              <h1 className="dt-serif" style={{ fontSize:36, fontWeight:800, letterSpacing:'-0.05em', lineHeight:.97, margin:'0 0 10px', color:'#0b1220' }}>What's in your kitchen?</h1>
              <p style={{ fontSize:14, color:'#515151', lineHeight:1.45, margin:0 }}>
                List your ingredients and the guru will find recipes you can make — searching the library first, then generating fresh ideas.
              </p>
            </div>

            {/* Card */}
            <div style={CT.card}>
              <div style={CT.sectionLast}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Your ingredients</span>
                  <span style={CT.hint}>Separate with commas</span>
                </div>
                <textarea
                  style={{ width:'100%', minHeight:120, resize:'vertical', borderRadius:14, border:'1px solid rgba(14,26,47,.14)', background:'rgba(250,245,236,.55)', padding:'10px 12px', outline:'none', fontFamily:'var(--body)', fontSize:13.5, lineHeight:1.45, color:'#161616', transition:'border-color .18s ease,box-shadow .18s ease,background .18s ease' }}
                  placeholder="e.g. chicken thighs, soy sauce, garlic, sesame oil, ginger, honey…&#10;&#10;Pantry staples like salt, oil, and water are assumed."
                  value={fridgeInput}
                  onChange={e => setFridgeInput(e.target.value)}
                  onFocus={e => { e.target.style.borderColor='rgba(240,99,28,.40)'; e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)'; e.target.style.background='rgba(255,255,255,.88)'; }}
                  onBlur={e  => { e.target.style.borderColor='rgba(14,26,47,.14)';  e.target.style.boxShadow='none'; e.target.style.background='rgba(250,245,236,.55)'; }}
                />
              </div>
            </div>

            {findErr && (
              <div style={{ marginTop:12, fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
                Error: {findErr}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={onFindRecipes}
              disabled={!fridgeInput.trim()}
              style={{ marginTop:14, width:'100%', border:'none', outline:'none', borderRadius:18, padding:'14px 14px', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontFamily:'var(--body)', fontWeight:700, letterSpacing:'-0.01em', fontSize:15, color:'white', cursor: fridgeInput.trim() ? 'pointer' : 'default', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#f0631c,#ff8a3d 45%,#f9a849 100%)', boxShadow:'0 18px 40px rgba(240,99,28,.24)', transition:'transform .18s ease,box-shadow .18s ease', filter: fridgeInput.trim() ? 'none' : 'saturate(.5)', opacity: fridgeInput.trim() ? 1 : .85 }}
              onMouseEnter={e => { if (fridgeInput.trim()) { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 22px 55px rgba(240,99,28,.28)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 18px 40px rgba(240,99,28,.24)'; }}
            >
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(120px 60px at 22% 12%,rgba(255,255,255,.55),transparent 60%)', opacity:.9, pointerEvents:'none' }}/>
              <Icon.sparkle style={{ position:'relative', zIndex:1, width:18, height:18 }}/>
              <span style={{ position:'relative', zIndex:1 }}>Find recipes</span>
            </button>
          </div>
        )}

        {mode === 'find' && findPhase === 'searching' && <Translating label="find"/>}

        {mode === 'find' && findPhase === 'results' && findResults && (
          <FindResults
            results={findResults}
            availableIngredients={findResults.parsedIngredients}
            onRevise={() => setFindPhase('input')}
            onViewRecipe={(id) => onNavigate && onNavigate({ name:'recipe', recipeId:id })}
          />
        )}

        {/* ── Scan mode ── */}
        {mode === 'scan' && <ScannerPanel/>}
      </div>
    </div>
  );
}
