function Translating() {
  const steps = [
    'Parsing original ingredients…',
    'Mapping substitutions for your diet…',
    'Rescaling quantities for your servings…',
    'Compressing steps into your time cap…',
    'Re-checking flavor balance…',
  ];
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
        <h1 className="dt-serif" style={{ fontSize:32, margin:0, letterSpacing:'-0.02em' }}>The guru is rewriting your recipe</h1>
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

function Result({ translated, servings, diet, time, skill, cuisine, onRevise }) {
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
          Kept the brown-butter soul of the dish, swapped the dairy and gluten, scaled to {servings}, and trimmed it into a single skillet flow that fits in {time} minutes.
        </p>
      </div>

      {/* What changed */}
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

      {/* Reshaped ingredients */}
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

      {/* Reshaped method */}
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

function Translator({ recipeId, onBack }) {
  const recipe = RECIPES.find(r => r.id === recipeId) || RECIPES[0];
  const [phase,     setPhase]     = React.useState('config');
  const [servings,  setServings]  = React.useState(6);
  const [diet,      setDiet]      = React.useState(new Set(['Vegan','Gluten-free']));
  const [allergies, setAllergies] = React.useState(new Set());
  const [cuisine,   setCuisine]   = React.useState('Keep as-is');
  const [time,      setTime]      = React.useState(30);
  const [skill,     setSkill]     = React.useState('Beginner');
  const [equipment, setEquipment] = React.useState(new Set(['Single skillet only']));
  const [pantry,    setPantry]    = React.useState('');

  const tog = (set, setter, val) => {
    const n = new Set(set);
    n.has(val) ? n.delete(val) : n.add(val);
    setter(n);
  };

  const translated  = buildTranslation();
  const onTranslate = () => { setPhase('translating'); setTimeout(() => setPhase('result'), 2400); };

  return (
    <div className="dt-translator">
      {/* Left: original recipe */}
      <div className="dt-translator-left">
        <div style={{ fontSize:13, color:'var(--ink-mute)' }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>← Back to recipe</a>
        </div>
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
      </div>

      {/* Right: config / loading / result */}
      <div className="dt-translator-right">
        {phase === 'config' && (
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

            <div className="dt-sticky-cta">
              <button onClick={onTranslate} className="dt-btn primary lg" style={{ flex:1 }}>
                <Icon.sparkle/> Reshape recipe
              </button>
            </div>
          </div>
        )}

        {phase === 'translating' && <Translating/>}

        {phase === 'result' && (
          <Result
            translated={translated}
            servings={servings}
            diet={[...diet]}
            time={time}
            skill={skill}
            cuisine={cuisine}
            onRevise={() => setPhase('config')}
          />
        )}
      </div>
    </div>
  );
}
