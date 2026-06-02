function toEmbedUrl(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vi = url.match(/vimeo\.com\/(\d+)/);
  if (vi) return `https://player.vimeo.com/video/${vi[1]}`;
  return null;
}

function Recipe({ recipeId, onBack, onOpenTranslator }) {
  const recipe   = RECIPES.find(r => r.id === recipeId) || RECIPES[0];
  const [servings, setServings] = React.useState(recipe.servings || 4);
  const [checked, setChecked]   = React.useState({});
  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const has = !!recipe.ingredients;
  const embedUrl = toEmbedUrl(recipe.video);

  return (
    <React.Fragment>
      {/* Breadcrumb */}
      <div style={{ padding:'24px 56px 0', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, color:'var(--ink-mute)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>Recipes</a>
          <span>/</span>
          <span>{recipe.cuisine}</span>
          <span>/</span>
          <span style={{ color:'var(--ink)' }}>{recipe.category}</span>
        </div>
        {recipe.date && (
          <div style={{ fontSize:12 }}>
            Published {recipe.date}
            {recipe.updated && <span> · Updated {recipe.updated}</span>}
          </div>
        )}
      </div>

      {/* Hero */}
      <div className="dt-recipe-hero" style={{ marginTop:24 }}>
        <Photo tint={recipe.tint} label={recipe.title.toLowerCase()} src={recipe.photo || undefined} style={{ position:'absolute', inset:0 }}/>
        <div className="dt-recipe-hero-content">
          <div style={{ display:'flex', gap:8, marginBottom:6 }}>
            <span className="dt-chip accent" style={{ height:28, fontSize:12 }}>Editor's pick</span>
            <span className="dt-chip on-photo">{recipe.cuisine}</span>
            <span className="dt-chip on-photo">{recipe.category}</span>
          </div>
          <h1 className="dt-recipe-hero-title">{recipe.title}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:18, fontSize:14, opacity:0.95 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:99, background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>
                {recipe.author.split(' ').map(p => p[0]).join('')}
              </div>
              <span>by <strong style={{ fontWeight:600 }}>{recipe.author}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      {recipe.photos && recipe.photos.length > 1 && (
        <div style={{ display:'flex', gap:10, padding:'16px 56px 0', overflowX:'auto' }}>
          {recipe.photos.map((src, i) => (
            <div key={i} style={{ flexShrink:0, width:260, height:180, borderRadius:14, overflow:'hidden' }}>
              <img src={src} alt={`${recipe.title} ${i + 1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="dt-recipe-body">
        <div className="dt-recipe-main">
          <p className="desc" style={{ margin:0 }}>{recipe.description}</p>

          <div className="dt-recipe-meta-row">
            {[
              { label:<><Icon.clock/> Active</>,  val:`${Math.max(15, recipe.minutes - 10)} min` },
              { label:<><Icon.clock/> Total</>,   val:`${recipe.minutes} min` },
              { label:<><Icon.bowl/> Serves</>,   val:servings },
              { label:<><Icon.flame/> Skill</>,   val:<span style={{ color:'var(--orange)' }}>{recipe.difficulty}</span> },
              { label:<><Icon.fork/> Cuisine</>,  val:recipe.cuisine },
            ].map((m, i) => (
              <div key={i} className="dt-recipe-meta-col">
                <span className="dt-recipe-meta-label">{m.label}</span>
                <span className="dt-recipe-meta-value">{m.val}</span>
              </div>
            ))}
          </div>

          {/* Chef Tool CTA */}
          <button
            onClick={() => onOpenTranslator(recipe.id)}
            style={{ width:'100%', display:'flex', alignItems:'center', gap:16, background:'var(--orange-tint)', border:'1px solid var(--orange-border)', borderRadius:18, padding:'16px 20px', textAlign:'left', cursor:'pointer', marginBottom:32 }}
          >
            <div style={{ width:44, height:44, borderRadius:12, background:'var(--orange)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon.sparkle/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'var(--ink)' }}>Reshape this recipe with the Chef Tool</div>
              <div style={{ fontSize:13, color:'var(--ink-soft)' }}>Vegan, gluten-free, halved, dairy-free, Thai-style — your call.</div>
            </div>
            <div style={{ color:'var(--orange)', fontWeight:700, fontSize:14 }}>Open →</div>
          </button>

          {/* Video */}
          {embedUrl && (
            <React.Fragment>
              <h2 className="sub" style={{ marginTop:0 }}>Watch it come together</h2>
              <div style={{ position:'relative', paddingBottom:'56.25%', height:0, borderRadius:18, overflow:'hidden' }}>
                <iframe
                  src={embedUrl}
                  title={recipe.title}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
                  allowFullScreen
                />
              </div>
              <div style={{ fontSize:13, color:'var(--ink-mute)', marginTop:12 }}>Optional. The written recipe below has everything you need.</div>
            </React.Fragment>
          )}

          {/* Steps */}
          <h2 className="sub">Method</h2>
          {has ? recipe.steps.map((s, i) => (
            <div key={i} className="dt-step">
              <div className="dt-step-num">{String(i + 1).padStart(2, '0')}</div>
              <p>{s}</p>
            </div>
          )) : <p style={{ fontSize:16, color:'var(--ink-mute)' }}>Full instructions coming soon.</p>}

          {/* Guru note */}
          {recipe.notes && (
            <React.Fragment>
              <h2 className="sub">Guru's note</h2>
              <div style={{ background:'var(--navy)', color:'var(--cream)', borderRadius:18, padding:'26px 28px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, color:'var(--orange)' }}>
                  <Icon.sparkle/>
                  <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Tip from {recipe.author}</span>
                </div>
                <p style={{ margin:0, fontSize:16, lineHeight:1.65, color:'rgba(250,245,236,0.9)' }}>{recipe.notes}</p>
              </div>
            </React.Fragment>
          )}
        </div>

        {/* Sidebar */}
        <aside className="dt-side-stick">
          <div className="dt-side-card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h4 style={{ margin:0 }}>Ingredients</h4>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:12, color:'var(--ink-mute)' }}>Serves</span>
                <div className="dt-stepper">
                  <button onClick={() => setServings(s => Math.max(1, s - 1))}>−</button>
                  <span className="val">{servings}</span>
                  <button onClick={() => setServings(s => s + 1)}>+</button>
                </div>
              </div>
            </div>
            {has ? (
              <ul className="ing-list">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className={`ing-row ${checked[i] ? 'checked' : ''}`} onClick={() => toggle(i)} style={{ cursor:'pointer' }}>
                    <span className={`ing-check ${checked[i] ? 'on' : ''}`}>
                      {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span className="ing-qty">{scaleQty(ing.qty, servings / recipe.servings)}</span>
                    <span className="ing-name">{ing.item}</span>
                  </li>
                ))}
              </ul>
            ) : <p style={{ fontSize:14, color:'var(--ink-mute)' }}>Coming soon.</p>}
            <button onClick={() => onOpenTranslator(recipe.id)} className="dt-btn primary" style={{ width:'100%', marginTop:18 }}>
              <Icon.sparkle/> Open Chef Tool
            </button>
            <button className="dt-btn ghost" style={{ width:'100%', marginTop:10 }}>
              <Icon.bookmark style={{ width:16, height:16 }}/> Save to my book
            </button>
          </div>

          <div className="dt-side-card">
            <h4>Pairings</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {RECIPES.slice(1, 4).map(r => (
                <div key={r.id} style={{ display:'flex', gap:12, cursor:'pointer' }}>
                  <Photo tint={r.tint} style={{ width:64, height:64, borderRadius:10, flexShrink:0 }}/>
                  <div style={{ minWidth:0 }}>
                    <div className="dt-serif" style={{ fontSize:14, lineHeight:1.25 }}>{r.title}</div>
                    <div style={{ fontSize:11, color:'var(--ink-mute)', marginTop:4, display:'flex', alignItems:'center', gap:4 }}>
                      <Icon.clock/> {r.minutes}m · {r.difficulty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
}
