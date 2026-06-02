function RecipeDetail({ recipe, details, onBack }) {
  const [servings, setServings] = React.useState(details.servings || 4);
  const [checked, setChecked] = React.useState({});
  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const has = !!details.ingredients;

  const scaleQty = (qty, factor) => {
    if (!qty) return '';
    const match = qty.match(/^([\d.]+)\s*(.*)$/);
    if (!match) return qty;
    const [, num, unit] = match;
    const scaled = parseFloat(num) * factor;
    return scaled % 1 === 0 ? `${scaled}${unit}` : `${scaled.toFixed(2)}${unit}`;
  };

  return (
    <React.Fragment>
      {/* Breadcrumb */}
      <div style={{ padding:'24px 56px 0', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, color:'var(--ink-mute)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>Recipes</a>
          <span>/</span>
          <span>{details.cuisine}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="dt-recipe-hero" style={{ marginTop:24 }}>
        {recipe.thumb && <img src={recipe.thumb} alt={details.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>}
        <div className="dt-recipe-hero-content">
          <div style={{ display:'flex', gap:8, marginBottom:6 }}>
            <span className="dt-chip on-photo">{details.cuisine}</span>
            {details.difficulty && <span className="dt-chip on-photo">{details.difficulty}</span>}
          </div>
          <h1 className="dt-recipe-hero-title">{details.title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="dt-recipe-body">
        <div className="dt-recipe-main">
          {/* Ingredients */}
          <h2 className="sub">Ingredients</h2>
          <div className="dt-side-card" style={{ marginTop: 0, marginBottom: 40 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h4 style={{ margin:0 }}>For {servings} servings</h4>
              <div className="dt-stepper">
                <button onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
                <span className="val">{servings}</span>
                <button onClick={() => setServings(s => s + 1)}>+</button>
              </div>
            </div>
            {has ? (
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
                        justifyContent:'center'
                      }}
                    >
                      {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span style={{ fontFamily:'var(--mono)', color:'var(--orange)', fontWeight:600, fontSize:13 }}>{scaleQty(ing.qty, servings / (details.servings || 1))}</span>
                    <span style={{ color: checked[i] ? 'var(--ink-mute)' : 'inherit', textDecoration: checked[i] ? 'line-through' : 'none' }}>{ing.item}</span>
                  </li>
                ))}
              </ul>
            ) : <p style={{ fontSize:14, color:'var(--ink-mute)' }}>Coming soon.</p>}
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
            <p style={{ fontSize:16, color:'var(--ink-mute)' }}>No instructions available.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="dt-side-stick">
        </aside>
      </div>
    </React.Fragment>
  );
}
