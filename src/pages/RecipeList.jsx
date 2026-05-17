function RecipeList({ onOpenRecipe, onOpenTranslator }) {
  const [category, setCategory] = React.useState('All');
  const [search,   setSearch]   = React.useState('');

  const filtered = RECIPES.filter(r => {
    const catMatch = (() => {
      if (category === 'All') return true;
      const map = {
        Quick:      r.minutes <= 35,
        Pasta:      r.category === 'Pasta',
        Vegetarian: r.tags.includes('vegetarian') || r.tags.includes('vegan'),
        Grill:      r.category === 'Grill',
        Comfort:    r.tags.includes('comfort'),
        Baking:     r.category === 'Baking',
        Desserts:   r.category === 'Dessert',
      };
      return !!map[category];
    })();
    const q = search.trim().toLowerCase();
    const searchMatch = !q || r.title.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || (r.tags || []).some(t => t.includes(q));
    return catMatch && searchMatch;
  });

  return (
    <React.Fragment>
      {/* Page header */}
      <div style={{ padding:'48px 56px 32px', borderBottom:'1px solid var(--line-soft)' }}>
        <div className="dt-eyebrow" style={{ marginBottom:8 }}>Recipe index</div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          <h1 className="dt-serif" style={{ margin:0, fontSize:42, lineHeight:1.05, letterSpacing:'-0.02em' }}>
            The full library.
          </h1>
          <span style={{ fontSize:14, color:'var(--ink-mute)', paddingBottom:6 }}>{filtered.length} of {RECIPES.length} recipes</span>
        </div>
      </div>

      {/* List + sidebar */}
      <section className="dt-list-grid" style={{ paddingTop:32 }}>
        <div>
          {/* Filters */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:8 }}>
            {CATEGORIES.map(c => (
              <button key={c} className={`dt-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position:'relative', marginBottom:20 }}>
            <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--ink-mute)', display:'flex' }}>
              <Icon.search/>
            </div>
            <input
              className="dt-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, cuisine, or author…"
              style={{ paddingLeft:40, height:44, borderRadius:12, width:'100%', boxSizing:'border-box' }}
            />
          </div>

          {/* Recipe rows */}
          <div className="dt-recipe-rows">
            {filtered.length === 0 && (
              <p style={{ padding:'40px 0', textAlign:'center', color:'var(--ink-mute)', fontSize:15 }}>No recipes match that filter.</p>
            )}
            {filtered.map(r => (
              <div key={r.id} className="dt-recipe-row" onClick={() => onOpenRecipe(r.id)}>
                <Photo tint={r.tint} src={r.photo || undefined}/>
                <div style={{ minWidth:0 }}>
                  <div className="dt-tags-row">
                    <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>{r.cuisine}</span>
                    <span className="dot"/>
                    <span className="dt-eyebrow">{r.category}</span>
                    {(r.tags || []).map(t => (
                      <React.Fragment key={t}>
                        <span className="dot"/>
                        <span className="dt-chip ghost" style={{ height:20, fontSize:10, padding:'0 7px' }}>{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <h4>{r.title}</h4>
                  <div className="dt-recipe-row-meta">
                    by <strong style={{ color:'var(--ink)' }}>{r.author}</strong>
                    <span className="dot"/><Icon.clock/> {r.minutes} min
                    <span className="dot"/><span style={{ color:'var(--orange)' }}>{r.difficulty}</span>
                  </div>
                </div>
                <div style={{ color:'var(--ink-mute)', fontSize:20, flexShrink:0 }}>→</div>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="dt-side-card" style={{ marginTop:0 }}>
            <h4>Filter by mood</h4>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {['cozy','showstopper','weeknight','crowd-pleaser','one-pan','date night','fridge clean-out','meal-prep'].map(t => (
                <span key={t} className="dt-chip ghost" style={{ cursor:'pointer' }} onClick={() => setSearch(t)}>{t}</span>
              ))}
            </div>
          </div>

          <div className="dt-side-card">
            <h4>Trending this week</h4>
            {RECIPES.slice(0, 3).map((r, i) => (
              <div key={r.id} onClick={() => onOpenRecipe(r.id)} style={{ display:'flex', gap:12, cursor:'pointer', padding:'12px 0', borderBottom:i < 2 ? '1px solid var(--line-soft)' : 'none', alignItems:'center' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:22, fontStyle:'italic', color:'var(--orange)', fontWeight:500, width:24, flexShrink:0 }}>{i + 1}</div>
                <Photo tint={r.tint} src={r.photo || undefined} style={{ width:56, height:56, borderRadius:10, flexShrink:0 }}/>
                <div style={{ minWidth:0 }}>
                  <div className="dt-serif" style={{ fontSize:15, lineHeight:1.25 }}>{r.title}</div>
                  <div style={{ fontSize:11, color:'var(--ink-mute)', marginTop:4 }}>{r.cuisine} · {r.minutes}m</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="dt-side-card"
            style={{ background:'var(--navy)', color:'var(--cream)', borderColor:'var(--navy)', cursor:'pointer' }}
            onClick={() => onOpenTranslator(null)}
          >
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span style={{ color:'var(--orange)' }}><Icon.sparkle/></span>
              <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Chef Tool</span>
            </div>
            <h4 style={{ color:'var(--cream)', margin:'0 0 8px' }}>Make any recipe yours.</h4>
            <p style={{ fontSize:13.5, lineHeight:1.55, color:'rgba(250,245,236,0.7)', margin:'0 0 14px' }}>
              Reshape for allergies, servings, pantry limits, or a different cuisine — in seconds.
            </p>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--orange)' }}>How it works →</span>
          </div>
        </aside>
      </section>

      <Footer/>
    </React.Fragment>
  );
}
