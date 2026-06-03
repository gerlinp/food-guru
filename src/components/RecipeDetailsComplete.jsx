function RecipeDetailsComplete({ recipe, details, onBack, searchedIngredients = [], checked = {}, setChecked, showTransform = false, setShowTransform, transformStep = null, setTransformStep }) {
  const [diet, setDiet] = React.useState([]);
  const [allergies, setAllergies] = React.useState([]);
  const [cuisine, setCuisine] = React.useState('');
  const [time, setTime] = React.useState(details.minutes || 60);
  const [skill, setSkill] = React.useState('Intermediate');

  // Auto-check ingredients that match searched ingredients (only on mount)
  React.useEffect(() => {
    if (!details.ingredients || searchedIngredients.length === 0) return;
    const newChecked = {};
    details.ingredients.forEach(({ item }, idx) => {
      const ingName = item.toLowerCase().trim();
      // Remove leading numbers/quantities (e.g., "4 whole chicken" -> "whole chicken")
      const cleanName = ingName.replace(/^[\d\s.,-]+/, '').trim();
      const isMatched = searchedIngredients.some(search => {
        const searchLower = search.toLowerCase().trim();
        const cleanWords = cleanName.split(/\s+/);
        // Exact match or searched term is a word in the ingredient
        return cleanName === searchLower || cleanWords.includes(searchLower);
      });
      if (isMatched) newChecked[idx] = true;
    });
    setChecked(newChecked);
  }, [recipe.id]);

  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const toggleArray = (arr, item) => {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  };


  const gradeColors = { 'A': '#22863a', 'B': '#28a745', 'C': '#ffc107', 'D': '#ff8c00', 'F': '#dc3545' };

  return (
    <React.Fragment>
      {/* Hero */}
      <div className="dt-recipe-hero" style={{ position:'relative', background:'#ccc', width:'100%', aspectRatio:'16/9' }}>
        {(recipe.thumb || details.image) && <img src={recipe.thumb || details.image} alt={details.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>}
        <div className="dt-recipe-hero-content" style={{ position:'absolute', bottom:0, left:0, right:0 }}>
          <div style={{ display:'flex', gap:8, marginBottom:6 }}>
            <span className="dt-chip on-photo">{details.cuisine}</span>
            {details.difficulty && <span className="dt-chip on-photo">{details.difficulty}</span>}
          </div>
          <h1 className="dt-recipe-hero-title">{details.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding:'0 24px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, color:'var(--ink-mute)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>Recipes</a>
          <span>/</span>
          <span>{details.cuisine}</span>
        </div>
      </div>

      {/* Body */}
      <div className="dt-recipe-body" style={{ padding:'24px 24px 64px', gridTemplateColumns:'1fr' }}>
        <div className="dt-recipe-main" style={{ padding:'0' }}>
          {/* Metadata Row */}
          <div className="dt-recipe-meta-row" style={{ marginBottom:32 }}>
            {[
              details.minutes && { label:'⏱️ Total', val:`${details.minutes} min` },
              details.difficulty && { label:'🔥 Skill', val:details.difficulty },
              details.cuisine && { label:'🌍 Cuisine', val:details.cuisine },
            ].filter(Boolean).map((m, i) => (
              <div key={i} className="dt-recipe-meta-col">
                <span className="dt-recipe-meta-label">{m.label}</span>
                <span className="dt-recipe-meta-value">{m.val}</span>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <h2 className="sub">Ingredients</h2>
          <p style={{ fontSize:13, color:'var(--ink-soft)', marginBottom:16, marginTop:-8 }}>Do you have everything?</p>
          <div className="dt-side-card" style={{ marginTop: 0, marginBottom: 40 }}>
            {details.ingredients && details.ingredients.length > 0 ? (
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {details.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className={`ing-row ${checked[i] ? 'checked' : ''}`}
                    onClick={() => toggle(i)}
                    style={{
                      display:'grid',
                      gridTemplateColumns:'22px 80px 1fr',
                      alignItems:'flex-start',
                      gap:12,
                      padding:'13px 0',
                      borderBottom:'1px solid var(--line-soft)',
                      fontSize:'14.5px',
                      lineHeight:1.4,
                      cursor:'pointer'
                    }}
                  >
                    <span
                      style={{
                        width:20,
                        height:20,
                        borderRadius:6,
                        border:'1.5px solid var(--line)',
                        background: checked[i] ? 'var(--orange)' : 'var(--white)',
                        marginTop:1,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        flexShrink:0
                      }}
                    >
                      {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span style={{ fontFamily:'var(--mono)', color:'var(--orange)', fontWeight:600, fontSize:13 }}>{ing.qty}</span>
                    <span style={{ color: checked[i] ? 'var(--ink-mute)' : 'inherit', textDecoration: checked[i] ? 'line-through' : 'none' }}>{ing.item}</span>
                  </li>
                ))}
              </ul>
            ) : <p style={{ fontSize:14, color:'var(--ink-mute)' }}>Coming soon.</p>}
          </div>

          {/* Transform Button */}
          <button
            onClick={() => { if(setTransformStep) setTransformStep('ingredients'); else setShowTransform(true); }}
            style={{
              width:'100%',
              display:'flex',
              alignItems:'center',
              gap:12,
              background:'rgba(240,99,28,.08)',
              border:'1px solid rgba(240,99,28,.20)',
              borderRadius:12,
              padding:'12px 14px',
              marginBottom:40,
              textAlign:'left',
              cursor:'pointer',
              fontWeight:600,
              fontSize:13,
              color:'var(--orange)',
              transition:'all 200ms ease'
            }}
          >
            <span style={{ flex:1 }}>⚡ Reshape this recipe</span>
            <span style={{ fontSize:16 }}>→</span>
          </button>

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
            <p style={{ fontSize:16, color:'var(--ink-mute)' }}>No instructions available.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="dt-side-stick">
          <div className="dt-side-card">
            <button className="dt-btn primary" style={{ width:'100%' }}>
              Transform recipe
            </button>
            <button className="dt-btn ghost" style={{ width:'100%', marginTop:10 }}>
              Save to my book
            </button>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
}
