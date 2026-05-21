function ReviewDetail({ reviewId, onBack }) {
  const r = REVIEWS.find(rev => rev.id === reviewId) || REVIEWS[0];
  const [lightbox, setLightbox] = React.useState(null);
  const photos = (r.photos || []).map(p => typeof p === 'string' ? { src: p, caption: '' } : p);

  return (
    <React.Fragment>
      {/* Breadcrumb */}
      <div style={{ padding:'24px 56px 0', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, fontSize:13, color:'var(--ink-mute)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <a onClick={onBack} style={{ cursor:'pointer' }}>Reviews</a>
          <span>/</span>
          <span>{r.city}</span>
          <span>/</span>
          <span style={{ color:'var(--ink)' }}>{r.name}</span>
        </div>
        <div style={{ fontSize:12 }}>{r.date}</div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth:1024, margin:'24px auto 0', padding:'0 56px' }}>
      <div className="dt-recipe-hero" style={{ margin:0 }}>
        <Photo tint={r.tint} src={r.photo || undefined} label={r.name.toLowerCase()} objectPosition={r.photoPosition || 'center'} style={{ position:'absolute', inset:0 }}/>
        <div className="dt-recipe-hero-content">
          <div style={{ display:'flex', gap:8, marginBottom:6 }}>
            <span className="dt-chip accent" style={{ height:28, fontSize:12 }}>{r.cuisine}</span>
            <span className="dt-chip" style={{ background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.25)', height:28, fontSize:12 }}>{r.neighborhood}</span>
          </div>
          <h1 className="dt-recipe-hero-title">{r.name}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:14, fontSize:14, opacity:0.95 }}>
            <Stars value={r.rating} size={16}/>
            <span>{r.price}</span>
            <span style={{ opacity:0.7 }}>{r.city}</span>
          </div>
        </div>
      </div>
      </div>

      {/* Food photo grid */}
      {photos.length > 0 && (
        <div style={{ padding:'12px 56px 0', overflowX:'auto' }}>
        <div style={{ display:'flex', gap:10, width:'fit-content', margin:'0 auto' }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              style={{ position:'relative', width:260, height:180, borderRadius:14, overflow:'hidden', cursor:'pointer', flexShrink:0 }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img
                src={photo.src}
                alt={photo.caption || r.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 150ms' }}
              />
              {photo.caption && (
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'28px 12px 10px', background:'linear-gradient(to top, rgba(14,26,47,0.75) 0%, transparent 100%)', color:'#fff', fontSize:12, fontWeight:500, textAlign:'center' }}>
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth:860, margin:'0 auto', padding:'48px 56px 80px' }}>

        {/* Pull quote / headline */}
        <p className="dt-serif" style={{ fontSize:24, lineHeight:1.4, color:'var(--ink)', fontStyle:'italic', margin:'0 0 28px' }}>
          &ldquo;{r.headline}&rdquo;
        </p>

        {/* Byline */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36, paddingBottom:20, borderBottom:'1px solid var(--line-soft)', fontSize:13, color:'var(--ink-mute)', flexWrap:'wrap' }}>
          <div style={{ width:28, height:28, borderRadius:99, background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700, flexShrink:0 }}>
            {r.author.split(' ').map(p => p[0]).join('')}
          </div>
          <span>by <strong style={{ color:'var(--ink)' }}>{r.author}</strong></span>
          <span className="dot"/>
          <span>{r.date}</span>
          <span className="dot"/>
          <Stars value={r.rating} size={13}/>
          <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-soft)' }}>{r.price}</span>
        </div>

        {/* Review body */}
        {r.body ? r.body.map((para, i) => (
          <p key={i} style={{ fontSize:16.5, lineHeight:1.75, color:'var(--ink-soft)', margin:'0 0 22px' }}>{para}</p>
        )) : (
          <p style={{ fontSize:16.5, lineHeight:1.75, color:'var(--ink-soft)' }}>{r.excerpt}</p>
        )}

        {/* Don't miss */}
        {r.standout && (
          <div style={{ background:'var(--navy)', color:'var(--cream)', borderRadius:18, padding:'24px 28px', margin:'36px 0' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, color:'var(--orange)' }}>
              <Icon.sparkle/>
              <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Don't miss</span>
            </div>
            <p style={{ margin:0, fontSize:18, fontWeight:600, color:'var(--cream)' }}>{r.standout}</p>
          </div>
        )}

        {/* Directions */}
        {r.lat && r.lng && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
            target="_blank"
            rel="noopener"
            className="dt-btn ghost"
            style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:8, textDecoration:'none' }}
          >
            <Icon.pin/> Get directions
          </a>
        )}
      </div>

      {lightbox !== null && <Lightbox photos={photos} startIndex={lightbox} onClose={() => setLightbox(null)}/>}
      <Footer onOpenReviews={onBack}/>
    </React.Fragment>
  );
}
