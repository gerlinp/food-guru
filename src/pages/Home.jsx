function Home({ onOpenRecipe, onOpenTranslator, onOpenReviews, onOpenAdmin, onOpenRecipeList }) {
  const featured      = RECIPES.find(r => r.id === SITE_SETTINGS.featuredRecipeId) || RECIPES[0];
  const rail          = RECIPES.filter(r => r.id !== featured.id).slice(0, 3);
  const librarySnap   = RECIPES.filter(r => r.id !== featured.id).slice(0, 4);
  const reviewsTeaser = REVIEWS.slice(0, 3);

  return (
    <React.Fragment>
      {/* Hero */}
      <section className="dt-hero">
        <div className="dt-hero-text">
          <div className="dt-eyebrow">{SITE_SETTINGS.heroEyebrow}</div>
          <h1 className="dt-hero-headline">{SITE_SETTINGS.heroHeadline}<br/><em>{SITE_SETTINGS.heroHeadlineEm}</em></h1>
          <p className="dt-hero-sub">{SITE_SETTINGS.heroSub}</p>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={() => onOpenRecipe(featured.id)} className="dt-btn dark lg">Start with tonight's pick</button>
            <button onClick={onOpenReviews} className="dt-btn ghost lg">Read this week's reviews</button>
          </div>
        </div>

        <div onClick={() => onOpenRecipe(featured.id)} style={{ cursor:'pointer' }}>
          <div className="dt-hero-photo">
            <Photo tint={featured.tint} style={{ position:'absolute', inset:0 }}/>
            <div className="dt-hero-photo-tag">
              <span className="dt-chip accent" style={{ height:28, fontSize:12 }}>Editor's pick</span>
              <span className="dt-chip" style={{ background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.25)', height:28, fontSize:12 }}>
                {featured.cuisine}
              </span>
            </div>
            <div className="photo-label">
              <span>{featured.title.toLowerCase()}</span>
              <span style={{ opacity:0.5 }}>[photo]</span>
            </div>
            <div className="dt-hero-photo-content">
              <h2 className="dt-serif" style={{ fontSize:38, margin:'0 0 12px', maxWidth:480, lineHeight:1.05, letterSpacing:'-0.02em' }}>
                {featured.title}
              </h2>
              <div style={{ display:'flex', alignItems:'center', gap:18, fontSize:14, opacity:0.95 }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon.clock/> {featured.minutes} min</span>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon.bowl/> Serves {featured.servings}</span>
                <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <Stars value={featured.rating} size={12}/> {featured.rating} <span style={{ opacity:0.7 }}>({featured.reviews})</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dt-stats">
        {SITE_SETTINGS.stats.map(s => (
          <div key={s.label}>
            <h3 className="dt-stat-num">{s.num}</h3>
            <div style={{ fontSize:13, color:'var(--ink-mute)' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Featured rail */}
      {rail.length > 0 && (
        <section className="dt-section">
          <div className="dt-section-head">
            <div>
              <div className="dt-eyebrow" style={{ marginBottom:6 }}>This week</div>
              <h2 className="dt-section-title">Hand-picked, freshly tested.</h2>
            </div>
            <button className="dt-btn ghost sm">View all →</button>
          </div>
          <div className="dt-featured-grid">
            <div onClick={() => onOpenRecipe(rail[0].id)} className="dt-feature-card large">
              <Photo tint={rail[0].tint} label={rail[0].cuisine.toLowerCase()}/>
              <div style={{ marginTop:18, display:'flex', gap:6 }}>
                <span className="dt-chip ghost" style={{ height:26, fontSize:11 }}>{rail[0].cuisine}</span>
                <span className="dt-chip ghost" style={{ height:26, fontSize:11 }}>{rail[0].category}</span>
              </div>
              <h3>{rail[0].title}</h3>
              <div className="dt-feature-meta">
                <Icon.clock/> {rail[0].minutes} min<span className="dot"/>
                <Stars value={rail[0].rating} size={11}/> {rail[0].rating}<span className="dot"/>
                {rail[0].difficulty}
              </div>
            </div>
            {rail.slice(1).map(r => (
              <div key={r.id} onClick={() => onOpenRecipe(r.id)} className="dt-feature-card small">
                <Photo tint={r.tint} label={r.cuisine.toLowerCase()}/>
                <div style={{ marginTop:14, display:'flex', gap:6 }}>
                  <span className="dt-chip ghost" style={{ height:24, fontSize:11 }}>{r.cuisine}</span>
                </div>
                <h3>{r.title}</h3>
                <div className="dt-feature-meta">
                  <Icon.clock/> {r.minutes}m<span className="dot"/>
                  <Stars value={r.rating} size={11}/> {r.rating}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Library snapshot + sidebar */}
      <section className="dt-list-grid">
        <div>
          <div className="dt-section-head" style={{ marginBottom:20 }}>
            <div>
              <div className="dt-eyebrow" style={{ marginBottom:6 }}>The library</div>
              <h2 className="dt-section-title">A few to get you started.</h2>
            </div>
            <button onClick={onOpenRecipeList} className="dt-btn ghost sm">All recipes →</button>
          </div>
          <div className="dt-recipe-rows">
            {librarySnap.map(r => (
              <div key={r.id} className="dt-recipe-row" onClick={() => onOpenRecipe(r.id)}>
                <Photo tint={r.tint} src={r.photo || undefined}/>
                <div style={{ minWidth:0 }}>
                  <div className="dt-tags-row">
                    <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>{r.cuisine}</span>
                    <span className="dot"/>
                    <span className="dt-eyebrow">{r.category}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <div className="dt-recipe-row-meta">
                    by <strong style={{ color:'var(--ink)' }}>{r.author}</strong>
                    <span className="dot"/><Icon.clock/> {r.minutes} min
                    <span className="dot"/><Stars value={r.rating} size={11}/> {r.rating}
                    <span style={{ color:'var(--ink-mute)' }}>({r.reviews})</span>
                    <span className="dot"/>{r.difficulty}
                  </div>
                </div>
                <div style={{ color:'var(--ink-mute)', fontSize:20 }}>→</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:20, textAlign:'center' }}>
            <button onClick={onOpenRecipeList} className="dt-btn ghost">Browse all {RECIPES.length} recipes →</button>
          </div>
        </div>

        <aside>
          <div className="dt-side-card" style={{ marginTop:0 }}>
            <h4>Filter by mood</h4>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {['cozy','showstopper','weeknight','crowd-pleaser','one-pan','date night','fridge clean-out','meal-prep'].map(t => (
                <span key={t} className="dt-chip ghost">{t}</span>
              ))}
            </div>
          </div>

          <div className="dt-side-card">
            <h4>Trending this week</h4>
            {RECIPES.filter(r => r.id !== featured.id).slice(0, 3).map((r, i) => (
              <div key={r.id} onClick={() => onOpenRecipe(r.id)} style={{ display:'flex', gap:12, cursor:'pointer', padding:'12px 0', borderBottom:i < 2 ? '1px solid var(--line-soft)' : 'none', alignItems:'center' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:22, fontStyle:'italic', color:'var(--orange)', fontWeight:500, width:24, flexShrink:0 }}>{i + 1}</div>
                <Photo tint={r.tint} style={{ width:56, height:56, borderRadius:10, flexShrink:0 }}/>
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
            <h4 style={{ color:'var(--cream)', margin:'0 0 8px' }}>Need a recipe to flex?</h4>
            <p style={{ fontSize:13.5, lineHeight:1.55, color:'rgba(250,245,236,0.7)', margin:'0 0 14px' }}>
              Any recipe on the site can be reshaped for allergies, servings, pantry, or a different cuisine in seconds.
            </p>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--orange)' }}>How it works →</span>
          </div>
        </aside>
      </section>

      {/* Reviews teaser */}
      {reviewsTeaser.length > 0 && (
        <section className="dt-section" style={{ paddingBottom:0 }}>
          <div className="dt-section-head">
            <div>
              <div className="dt-eyebrow" style={{ marginBottom:6 }}>Restaurant reviews</div>
              <h2 className="dt-section-title">From the field this week.</h2>
            </div>
            <button onClick={onOpenReviews} className="dt-btn ghost sm">All reviews →</button>
          </div>
          <div className="dt-featured-grid">
            {reviewsTeaser.map((r, i) => (
              <div key={r.id} onClick={onOpenReviews} className={`dt-feature-card ${i === 0 ? 'large' : 'small'}`}>
                <Photo tint={r.tint} label={r.name.toLowerCase()}/>
                <div style={{ marginTop:i === 0 ? 18 : 14, display:'flex', gap:6, alignItems:'center' }}>
                  <span className="dt-chip ghost" style={{ height:24, fontSize:11 }}>{r.cuisine}</span>
                  <span style={{ fontSize:11, color:'var(--ink-mute)', textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600 }}>{r.city}</span>
                </div>
                <h3>{r.name}</h3>
                <p style={{ fontSize:14, lineHeight:1.55, color:'var(--ink-soft)', margin:'4px 0 12px' }}>"{r.headline}"</p>
                <div className="dt-feature-meta">
                  <span style={{ padding:'3px 8px', background:'var(--navy)', color:'var(--orange)', borderRadius:6, fontFamily:'var(--mono)', fontWeight:600, fontSize:11 }}>{r.rating.toFixed(1)}</span>
                  <span>{r.price}</span><span className="dot"/><span>by {r.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer onOpenReviews={onOpenReviews} onOpenAdmin={onOpenAdmin}/>
    </React.Fragment>
  );
}
