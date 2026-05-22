function Translating({ label }) {
  const steps = label === 'find'
    ? ['Parsing your ingredients…', 'Searching the library…', 'Generating recipe ideas…', 'Checking flavor balance…', 'Almost there…']
    : ['Parsing original ingredients…', 'Mapping substitutions for your diet…', 'Rescaling quantities for your servings…', 'Compressing steps into your time cap…', 'Re-checking flavor balance…'];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => Math.min(a + 1, steps.length - 1)), 480);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fadeInUp" style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36, padding:40 }}>
      <div style={{ position:'relative', width:120, height:120 }}>
        <div className="dt-spin" style={{ position:'absolute', inset:0, borderRadius:'50%', background:'conic-gradient(var(--orange), transparent 65%)', WebkitMask:'radial-gradient(closest-side, transparent 73%, #000 75%)', mask:'radial-gradient(closest-side, transparent 73%, #000 75%)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--orange)' }}>
          <Icon.sparkle style={{ width:44, height:44 }}/>
        </div>
      </div>
      <div style={{ textAlign:'center' }}>
        <h1 className="dt-serif" style={{ fontSize:32, margin:0, letterSpacing:'-0.02em' }}>
          {label === 'find' ? 'Searching the kitchen…' : 'The guru is rewriting your recipe'}
        </h1>
        <div style={{ fontSize:14, color:'var(--ink-mute)', marginTop:8 }}>This usually takes about 8 seconds.</div>
      </div>
      <div style={{ width:'100%', maxWidth:440, display:'flex', flexDirection:'column', gap:12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, color:i <= active ? 'var(--ink)' : 'var(--ink-mute)', opacity:i <= active ? 1 : 0.55, transition:'opacity 200ms ease' }}>
            <span style={{ width:22, height:22, borderRadius:99, border:'1.5px solid', borderColor:i <= active ? 'var(--orange)' : 'var(--line)', background:i < active ? 'var(--orange)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {i < active  && <svg width="12" height="12" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>}
              {i === active && <span style={{ width:8, height:8, borderRadius:99, background:'var(--orange)' }}/>}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function TransformResult({ translated, servings, diet, time, skill, cuisine, onRevise }) {
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:22 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
            <Icon.sparkle/>
            <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Reshaped</span>
          </div>
          <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.1, margin:'8px 0 6px', letterSpacing:'-0.02em' }}>Your version</h1>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onRevise} className="dt-btn ghost sm">Revise</button>
          <button className="dt-btn dark sm"><Icon.bookmark style={{ width:14, height:14 }}/> Save</button>
          <button className="dt-btn dark sm"><Icon.share style={{ width:14, height:14 }}/> Share</button>
        </div>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {diet.map(d => <span key={d} className="dt-chip accent">{d}</span>)}
        <span className="dt-chip ghost">{servings} servings</span>
        <span className="dt-chip ghost">{time} min cap</span>
        <span className="dt-chip ghost">{skill}</span>
        {cuisine !== 'Keep as-is' && <span className="dt-chip ghost">{cuisine} remix</span>}
      </div>

      <div style={{ background:'var(--navy)', color:'var(--cream)', borderRadius:22, padding:26 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <Icon.sparkle style={{ color:'var(--orange)' }}/>
          <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Guru's notes</span>
        </div>
        <p style={{ margin:0, fontSize:15, lineHeight:1.6, color:'rgba(250,245,236,0.88)' }}>
          {translated.guruNote}
        </p>
      </div>

      <div>
        <h2 className="dt-serif" style={{ fontSize:22, margin:'0 0 14px', letterSpacing:'-0.01em' }}>What changed</h2>
        <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:'6px 22px' }}>
          {translated.changes.map((c, i) => (
            <div key={i} style={{ display:'flex', gap:14, padding:'16px 0', borderBottom:i < translated.changes.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
              <span style={{ width:26, height:26, borderRadius:99, background:'var(--orange-tint)', color:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{i + 1}</span>
              <p style={{ margin:0, fontSize:14.5, lineHeight:1.55, color:'var(--ink)' }}>{c}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="dt-serif" style={{ fontSize:22, margin:'0 0 14px', letterSpacing:'-0.01em' }}>Reshaped ingredients</h2>
        <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:'6px 22px' }}>
          {translated.ingredients.map((ing, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'90px 1fr', gap:14, alignItems:'baseline', padding:'14px 0', borderBottom:i < translated.ingredients.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
              <span className="dt-mono" style={{ color:'var(--orange)', fontWeight:600, fontSize:13 }}>{ing.qty}</span>
              <div style={{ fontSize:15, lineHeight:1.4 }}>
                {ing.isNew && <span className="diff-add-dot"/>}
                {ing.item.map((sp, j) => {
                  if (sp.kind === 'rm')  return <span key={j} className="diff-removed">{sp.text}</span>;
                  if (sp.kind === 'add') return <span key={j} className="diff-added">{sp.text}</span>;
                  return <span key={j}>{sp.text}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="dt-serif" style={{ fontSize:22, margin:'0 0 14px', letterSpacing:'-0.01em' }}>Reshaped method</h2>
        {translated.steps.map((s, i) => {
          const parts = s.split(/(\[[^\]]+\])/g).map((p, j) => {
            if (p.startsWith('[') && p.endsWith(']')) return <span key={j} className="diff-added">{p.slice(1, -1)}</span>;
            return <span key={j}>{p}</span>;
          });
          return (
            <div key={i} className="dt-step">
              <div className="dt-step-num">{String(i + 1).padStart(2, '0')}</div>
              <p>{parts}</p>
            </div>
          );
        })}
      </div>

      <div className="dt-sticky-cta">
        <button onClick={onRevise} className="dt-btn ghost lg" style={{ flex:1 }}>Revise</button>
        <button className="dt-btn primary lg" style={{ flex:1 }}>
          <Icon.bookmark style={{ width:16, height:16 }}/> Save to my book
        </button>
      </div>
    </div>
  );
}

// ─── Find Mode: full recipe card generated on demand ────────────────────────

function GeneratedRecipeCard({ idea, availableIngredients }) {
  const [phase, setPhase]     = React.useState('idle'); // 'idle'|'loading'|'done'|'error'
  const [fullRecipe, setFull] = React.useState(null);
  const [err, setErr]         = React.useState('');

  const onExpand = async () => {
    setPhase('loading');
    setErr('');
    try {
      const r = await getFullRecipe(idea.title, availableIngredients, idea.uses);
      setFull(r);
      setPhase('done');
    } catch(e) {
      setErr(e.message);
      setPhase('error');
    }
  };

  return (
    <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:22, display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
        <div>
          <h3 className="dt-serif" style={{ fontSize:20, margin:'0 0 6px', letterSpacing:'-0.01em' }}>{idea.title}</h3>
          <p style={{ margin:0, fontSize:14, color:'var(--ink-soft)', lineHeight:1.5 }}>{idea.description}</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0 }}>
          <span className="dt-chip ghost" style={{ fontSize:12 }}>{idea.estimatedMinutes} min</span>
          <span className="dt-chip ghost" style={{ fontSize:12 }}>{idea.difficulty}</span>
        </div>
      </div>

      {idea.uses && idea.uses.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {idea.uses.map(u => <span key={u} className="dt-chip accent" style={{ fontSize:12 }}>{u}</span>)}
        </div>
      )}

      {phase === 'idle' && (
        <button onClick={onExpand} className="dt-btn ghost sm" style={{ alignSelf:'flex-start' }}>
          See full recipe →
        </button>
      )}

      {phase === 'loading' && (
        <div style={{ fontSize:13, color:'var(--ink-mute)', display:'flex', alignItems:'center', gap:8 }}>
          <div className="dt-spin" style={{ width:16, height:16, borderRadius:'50%', background:'conic-gradient(var(--orange), transparent 65%)', WebkitMask:'radial-gradient(closest-side, transparent 60%, #000 62%)', mask:'radial-gradient(closest-side, transparent 60%, #000 62%)' }}/>
          Generating recipe…
        </div>
      )}

      {phase === 'error' && (
        <div style={{ fontSize:13, color:'#c0392b' }}>Error: {err}</div>
      )}

      {phase === 'done' && fullRecipe && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:16 }}>
            <h4 className="dt-serif" style={{ fontSize:16, margin:'0 0 10px' }}>Ingredients</h4>
            <ul style={{ listStyle:'none', margin:0, padding:0 }}>
              {fullRecipe.ingredients.map((ing, i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:10, padding:'7px 0', borderBottom:i < fullRecipe.ingredients.length - 1 ? '1px solid var(--line-soft)' : 'none', fontSize:13.5 }}>
                  <span className="dt-mono" style={{ color:'var(--orange)', fontWeight:600, fontSize:12 }}>{ing.qty}</span>
                  <span>{ing.item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="dt-serif" style={{ fontSize:16, margin:'0 0 10px' }}>Method</h4>
            {fullRecipe.steps.map((s, i) => (
              <div key={i} className="dt-step">
                <div className="dt-step-num">{String(i + 1).padStart(2, '0')}</div>
                <p style={{ fontSize:13.5 }}>{s}</p>
              </div>
            ))}
          </div>
          {fullRecipe.notes && (
            <div style={{ background:'var(--navy)', color:'var(--cream)', borderRadius:14, padding:18 }}>
              <span className="dt-eyebrow" style={{ color:'var(--orange)', display:'block', marginBottom:6 }}>Guru's note</span>
              <p style={{ margin:0, fontSize:13.5, lineHeight:1.55, color:'rgba(250,245,236,0.88)' }}>{fullRecipe.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Find Mode results panel ─────────────────────────────────────────────────

function FindResults({ results, availableIngredients, onRevise, onViewRecipe }) {
  const { local, ideas } = results;
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
            <Icon.sparkle/>
            <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Fridge Raid</span>
          </div>
          <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.1, margin:'8px 0 0', letterSpacing:'-0.02em' }}>Here's what you can make</h1>
        </div>
        <button onClick={onRevise} className="dt-btn ghost sm">Search again</button>
      </div>

      {local.length > 0 && (
        <div>
          <h2 className="dt-serif" style={{ fontSize:20, margin:'0 0 12px', letterSpacing:'-0.01em' }}>From the library</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {local.map(({ recipe, score, matchedIngredients }) => (
              <div key={recipe.id} style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:16, padding:18, display:'flex', justifyContent:'space-between', alignItems:'center', gap:14 }}>
                <div>
                  <div className="dt-serif" style={{ fontSize:17, fontWeight:600, marginBottom:4 }}>{recipe.title}</div>
                  <div style={{ fontSize:13, color:'var(--ink-soft)' }}>
                    Uses {score} of your ingredient{score !== 1 ? 's' : ''}: <span style={{ color:'var(--orange)' }}>{matchedIngredients.join(', ')}</span>
                  </div>
                </div>
                <button onClick={() => onViewRecipe(recipe.id)} className="dt-btn ghost sm" style={{ flexShrink:0 }}>
                  View recipe →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {ideas.length > 0 && (
        <div>
          <h2 className="dt-serif" style={{ fontSize:20, margin:'0 0 12px', letterSpacing:'-0.01em' }}>
            {local.length === 0 ? 'No library matches — here are AI-generated ideas' : 'More ideas from the guru'}
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ideas.map((idea, i) => (
              <GeneratedRecipeCard key={i} idea={idea} availableIngredients={availableIngredients}/>
            ))}
          </div>
        </div>
      )}

      <div className="dt-sticky-cta">
        <button onClick={onRevise} className="dt-btn ghost lg" style={{ flex:1 }}>Search again</button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function Translator({ recipeId, onBack, onNavigate }) {
  const recipe = RECIPES.find(r => r.id === recipeId) || RECIPES[0];

  // Shared
  const [mode, setMode] = React.useState('transform'); // 'transform' | 'find' | 'scan'

  // Transform mode state
  const [phase,     setPhase]     = React.useState('config'); // 'config'|'translating'|'result'
  const [servings,  setServings]  = React.useState(recipe.servings);
  const [diet,      setDiet]      = React.useState(new Set());
  const [allergies, setAllergies] = React.useState(new Set());
  const [cuisine,   setCuisine]   = React.useState('Keep as-is');
  const [time,      setTime]      = React.useState(recipe.minutes);
  const [skill,     setSkill]     = React.useState('Comfortable');
  const [equipment, setEquipment] = React.useState(new Set());
  const [pantry,    setPantry]    = React.useState('');
  const [translated, setTranslated] = React.useState(null);
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
    // Reset sub-phases when switching
    setPhase('config');
    setFindPhase('input');
    setTransformErr('');
    setFindErr('');
  };

  const onTranslate = async () => {
    setPhase('translating');
    setTransformErr('');
    try {
      const result = await transformRecipe(recipe, {
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
  const showLeftPanel    = true; // always render left panel, content changes per mode

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
              <div className="dt-eyebrow">Original</div>
              <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.05, margin:'8px 0 16px', letterSpacing:'-0.02em' }}>{recipe.title}</h1>
              <div style={{ display:'flex', alignItems:'center', gap:14, fontSize:13, color:'var(--ink-soft)', flexWrap:'wrap' }}>
                <span>by <strong>{recipe.author}</strong></span>
                <span className="dot"/>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}><Icon.clock/> {recipe.minutes} min</span>
                <span className="dot"/>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}><Icon.bowl/> Serves {recipe.servings}</span>
                <span className="dot"/>
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="dt-summary-card">
              <div className="dt-summary-photo">
                <Photo tint={recipe.tint} label={recipe.title.toLowerCase()} style={{ position:'absolute', inset:0 }}/>
              </div>
              <div className="dt-summary-body">
                <h4 className="dt-serif" style={{ fontSize:18, margin:'0 0 12px' }}>Original ingredients</h4>
                <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                  {recipe.ingredients && recipe.ingredients.map((ing, i) => (
                    <li key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr', alignItems:'baseline', gap:12, padding:'8px 0', borderBottom:i < recipe.ingredients.length - 1 ? '1px solid var(--line-soft)' : 'none', fontSize:14 }}>
                      <span className="dt-mono" style={{ color:'var(--orange)', fontWeight:600, fontSize:12 }}>{ing.qty}</span>
                      <span>{ing.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(phase === 'result' || phase === 'translating') && recipe.steps && (
              <div className="dt-side-card" style={{ marginTop:0 }}>
                <h4 className="dt-serif" style={{ fontSize:18, margin:'0 0 12px' }}>Original method</h4>
                {recipe.steps.map((s, i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'32px 1fr', gap:12, padding:'12px 0', borderBottom:i < recipe.steps.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                    <span className="dt-serif" style={{ fontSize:18, color:'var(--ink-mute)', fontStyle:'italic', fontWeight:500 }}>{i + 1}</span>
                    <p style={{ margin:0, fontSize:13.5, lineHeight:1.5, color:'var(--ink-soft)' }}>{s}</p>
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
        {/* Mode switcher — always visible */}
        <div style={{ display:'flex', background:'var(--cream)', border:'1px solid var(--line-soft)', borderRadius:14, padding:4, gap:4, marginBottom:4 }}>
          {[
            { id:'transform', label:'Transform' },
            { id:'find',      label:'Fridge Raid' },
            { id:'scan',      label:'📷 Scan' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => switchMode(id)}
              style={{ flex:1, padding:'10px 10px', borderRadius:10, border:'none', cursor:'pointer', fontSize:13, fontWeight:600, background: mode === id ? 'var(--white)' : 'transparent', color: mode === id ? 'var(--ink)' : 'var(--ink-mute)', boxShadow: mode === id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition:'all 150ms ease' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Transform mode ── */}
        {mode === 'transform' && phase === 'config' && (
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
                <Icon.sparkle/>
                <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Chef Tool</span>
              </div>
              <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.1, margin:'8px 0 8px', letterSpacing:'-0.02em' }}>Tell the guru how to bend it.</h1>
              <p style={{ fontSize:15, color:'var(--ink-soft)', maxWidth:540, lineHeight:1.55, margin:0 }}>The Chef Tool will rewrite ingredients, swap substitutions, scale the recipe, and re-flow the steps.</p>
            </div>

            {/* Servings */}
            <div className="dt-translator-section">
              <h4>Servings</h4>
              <div className="sub">How many people are eating?</div>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div className="dt-stepper" style={{ height:44 }}>
                  <button style={{ width:44, height:44 }} onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
                  <span className="val" style={{ fontSize:16, minWidth:36 }}>{servings}</span>
                  <button style={{ width:44, height:44 }} onClick={() => setServings(s => s + 1)}>+</button>
                </div>
                <span style={{ fontSize:13, color:'var(--ink-mute)' }}>
                  {servings > recipe.servings ? `↑ ${servings - recipe.servings} more than original`
                    : servings < recipe.servings ? `↓ ${recipe.servings - servings} fewer than original`
                    : 'matches original'}
                </span>
              </div>
            </div>

            {/* Diet + Allergies */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              <div className="dt-translator-section">
                <h4>Dietary style</h4>
                <div className="sub">Pick any that apply</div>
                <div className="dt-chip-grid">
                  {DT_DIETARY.map(item => (
                    <button key={item} className={`dt-chip ${diet.has(item) ? 'active' : ''}`} onClick={() => tog(diet, setDiet, item)}>
                      {diet.has(item) && <span style={{ marginLeft:-2 }}>✓</span>}{item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="dt-translator-section">
                <h4>Allergies & avoid</h4>
                <div className="sub">Routed around in every swap</div>
                <div className="dt-chip-grid">
                  {DT_ALLERGIES.map(item => (
                    <button key={item} className={`dt-chip ${allergies.has(item) ? 'active' : ''}`} onClick={() => tog(allergies, setAllergies, item)}>
                      {allergies.has(item) && <span style={{ marginLeft:-2 }}>✓</span>}{item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cuisine remix */}
            <div className="dt-translator-section">
              <h4>Cuisine remix</h4>
              <div className="sub">Reinterpret the dish through another tradition</div>
              <div className="dt-chip-grid">
                {DT_CUISINES.map(c => (
                  <button key={c} className={`dt-chip ${cuisine === c ? 'active' : ''}`} onClick={() => setCuisine(c)}>{c}</button>
                ))}
              </div>
            </div>

            {/* Time cap + Skill */}
            <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:18 }}>
              <div className="dt-translator-section">
                <h4>Time cap</h4>
                <div className="sub">Total time including prep</div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10, alignItems:'baseline' }}>
                  <span className="dt-mono" style={{ fontSize:28, fontWeight:600, color:'var(--ink)' }}>{time} min</span>
                  <span style={{ fontSize:12, color:'var(--ink-mute)' }}>original: {recipe.minutes} min</span>
                </div>
                <input type="range" min="15" max="180" step="5" value={time} onChange={e => setTime(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--orange)' }}/>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--ink-mute)', marginTop:4 }}>
                  <span>15m</span><span>60m</span><span>120m</span><span>180m</span>
                </div>
              </div>
              <div className="dt-translator-section">
                <h4>Skill level</h4>
                <div className="sub">How techy can it get?</div>
                <div className="dt-segmented">
                  {DT_SKILLS.map(s => (
                    <button key={s} className={skill === s ? 'active' : ''} onClick={() => setSkill(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="dt-translator-section">
              <h4>Kitchen constraints</h4>
              <div className="sub">Anything you're working without?</div>
              <div className="dt-chip-grid">
                {DT_EQUIPMENT.map(item => (
                  <button key={item} className={`dt-chip ${equipment.has(item) ? 'active' : ''}`} onClick={() => tog(equipment, setEquipment, item)}>
                    {equipment.has(item) && <span style={{ marginLeft:-2 }}>✓</span>}{item}
                  </button>
                ))}
              </div>
            </div>

            {/* Pantry notes */}
            <div className="dt-translator-section">
              <h4>Pantry notes</h4>
              <div className="sub">What you have, what's missing, what you want to use up</div>
              <textarea
                className="dt-input"
                style={{ minHeight:90 }}
                placeholder="e.g. I have arborio rice but no tagliatelle, half a lemon, and some leftover white miso..."
                value={pantry}
                onChange={e => setPantry(e.target.value)}
              />
            </div>

            {transformErr && (
              <div style={{ fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
                Error: {transformErr}
              </div>
            )}

            <div className="dt-sticky-cta">
              <button onClick={onTranslate} className="dt-btn primary lg" style={{ flex:1 }}>
                <Icon.sparkle/> Reshape recipe
              </button>
            </div>
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
          <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
                <Icon.sparkle/>
                <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Fridge Raid</span>
              </div>
              <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.1, margin:'8px 0 8px', letterSpacing:'-0.02em' }}>What's in your kitchen?</h1>
              <p style={{ fontSize:15, color:'var(--ink-soft)', maxWidth:540, lineHeight:1.55, margin:0 }}>
                List your ingredients and the guru will find recipes you can make — searching the library first, then generating fresh ideas.
              </p>
            </div>

            <div className="dt-translator-section">
              <h4>Your ingredients</h4>
              <div className="sub">Separate with commas — pantry staples like salt, oil, and water are assumed</div>
              <textarea
                className="dt-input"
                style={{ minHeight:120 }}
                placeholder="e.g. chicken thighs, soy sauce, garlic, sesame oil, ginger, honey…"
                value={fridgeInput}
                onChange={e => setFridgeInput(e.target.value)}
              />
            </div>

            {findErr && (
              <div style={{ fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
                Error: {findErr}
              </div>
            )}

            <div className="dt-sticky-cta">
              <button
                onClick={onFindRecipes}
                className="dt-btn primary lg"
                style={{ flex:1 }}
                disabled={!fridgeInput.trim()}
              >
                <Icon.sparkle/> Find recipes
              </button>
            </div>
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
