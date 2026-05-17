
function ReviewCard({ review: r }) {
  return (
    <article id={r.id} className="dt-review-card">
      <Photo tint={r.tint} label={r.name.toLowerCase()} style={{ height:240, borderRadius:'18px 18px 0 0' }}/>
      <div style={{ padding:24 }}>
        <div className="dt-eyebrow" style={{ marginBottom:6 }}>{r.city}</div>
        <h3 className="dt-serif" style={{ fontSize:26, lineHeight:1.1, margin:'4px 0 8px', letterSpacing:'-0.015em' }}>{r.name}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, fontSize:12, color:'var(--ink-mute)' }}>
          <span>{r.cuisine}</span><span className="dot"/><span>{r.price}</span><span className="dot"/><Stars value={r.rating} size={13}/>
        </div>
        <p style={{ fontSize:14.5, lineHeight:1.55, color:'var(--ink-soft)', margin:'0 0 16px' }}>{r.excerpt}</p>
        <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:14, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div style={{ fontSize:12, color:'var(--ink-mute)' }}>
            <span style={{ color:'var(--ink)', fontWeight:500 }}>{r.author}</span> · {r.date}
          </div>
          <div style={{ fontSize:12, color:'var(--orange)', fontWeight:600 }}>Read →</div>
        </div>
        <div style={{ marginTop:14, background:'var(--cream-2)', borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, fontSize:12 }}>
          <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Don't miss</span>
          <span style={{ color:'var(--ink)' }}>{r.standout}</span>
        </div>
      </div>
    </article>
  );
}

function Reviews() {
  const [city, setCity] = React.useState('All cities');
  const [sort, setSort] = React.useState('recent');

  const cities   = ['All cities', ...new Set(REVIEWS.map(r => r.city))];
  let filtered   = city === 'All cities' ? [...REVIEWS] : REVIEWS.filter(r => r.city === city);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <React.Fragment>
      {/* Header */}
      <section style={{ padding:'64px 56px 32px', borderBottom:'1px solid var(--line)' }}>
        <div style={{ maxWidth:1120, display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:64, alignItems:'end' }} className="dt-reviews-intro">
          <div>
            <div className="dt-eyebrow">Restaurant Reviews</div>
            <h1 className="dt-serif" style={{ fontSize:72, fontWeight:400, letterSpacing:'-0.025em', lineHeight:0.96, margin:'14px 0 0' }}>
              Where we've been,<br/><em style={{ color:'var(--orange)' }}>honestly told.</em>
            </h1>
          </div>
          <p style={{ fontSize:16, lineHeight:1.65, color:'var(--ink-soft)', margin:0 }}>
            {SITE_SETTINGS.reviewsIntro}
          </p>
        </div>

        <div style={{ marginTop:36, display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', justifyContent:'space-between' }}>
          <div className="dt-chip-grid">
            {cities.map(c => (
              <button key={c} className={`dt-chip ${city === c ? 'active' : ''}`} onClick={() => setCity(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--ink-mute)' }}>
            <span>Sort by</span>
            <div className="dt-segmented" style={{ width:'auto' }}>
              <button className={sort === 'recent' ? 'active' : ''} onClick={() => setSort('recent')} style={{ flex:'none', padding:'0 14px' }}>Most recent</button>
              <button className={sort === 'rating' ? 'active' : ''} onClick={() => setSort('rating')} style={{ flex:'none', padding:'0 14px' }}>Highest rated</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured review */}
      {featured && (
        <section id={featured.id} style={{ padding:'48px 56px 16px' }}>
          <div className="dt-review-featured">
            <div className="dt-review-featured-photo">
              <Photo tint={featured.tint} label={featured.name.toLowerCase()} style={{ position:'absolute', inset:0 }}/>
            </div>
            <div className="dt-review-featured-body">
              <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                <span className="dt-chip accent" style={{ height:26, fontSize:11 }}>This week's pick</span>
                <span className="dt-chip ghost" style={{ height:26, fontSize:11 }}>{featured.cuisine}</span>
              </div>
              <div className="dt-eyebrow" style={{ marginBottom:6 }}>{featured.city} · {featured.neighborhood} · {featured.price}</div>
              <h2 className="dt-serif" style={{ fontSize:42, lineHeight:1.05, letterSpacing:'-0.02em', margin:'6px 0 18px' }}>{featured.name}</h2>
              <p className="dt-serif" style={{ fontSize:22, lineHeight:1.35, color:'var(--ink)', fontStyle:'italic', margin:'0 0 18px' }}>"{featured.headline}"</p>
              <p style={{ fontSize:15, lineHeight:1.65, color:'var(--ink-soft)', margin:'0 0 22px', maxWidth:540 }}>{featured.excerpt}</p>
              <div style={{ display:'flex', alignItems:'center', gap:18, fontSize:13, color:'var(--ink-soft)', marginBottom:24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:99, background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>
                    {featured.author.split(' ').map(p => p[0]).join('')}
                  </div>
                  <span>by <strong>{featured.author}</strong></span>
                </div>
                <span className="dot"/>
                <span>{featured.date}</span>
                <span className="dot"/>
                <Stars value={featured.rating} size={16}/>
              </div>
              <button className="dt-btn dark">Read full review →</button>
            </div>
          </div>
        </section>
      )}

      {/* Review grid */}
      <section style={{ padding:'32px 56px 80px' }}>
        <div className="dt-section-head">
          <h2 className="dt-section-title">More from the field</h2>
          <span style={{ fontSize:13, color:'var(--ink-mute)' }}>{rest.length} reviews</span>
        </div>
        <div className="dt-reviews-grid">
          {rest.map(r => <ReviewCard key={r.id} review={r}/>)}
        </div>
      </section>

      <Footer/>
    </React.Fragment>
  );
}
