function Lightbox({ photos, startIndex = 0, onClose }) {
  const [idx, setIdx] = React.useState(startIndex);

  React.useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  setIdx(i => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft')   setIdx(i => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [photos.length]);

  const photo   = photos[idx];
  const src     = typeof photo === 'string' ? photo : photo.src;
  const caption = typeof photo === 'string' ? '' : photo.caption;

  return (
    <div
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(14,26,47,0.93)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}
    >
      <button
        onClick={onClose}
        style={{ position:'absolute', top:20, right:24, background:'none', border:'none', color:'#fff', fontSize:32, cursor:'pointer', lineHeight:1, opacity:0.8 }}
      >×</button>

      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setIdx(i => Math.max(i - 1, 0)); }}
          style={{ position:'absolute', left:20, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:26, cursor:'pointer', borderRadius:10, padding:'10px 16px', opacity: idx === 0 ? 0.3 : 1, pointerEvents: idx === 0 ? 'none' : 'auto' }}
        >‹</button>
      )}

      <img
        src={src}
        alt={caption}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth:'88vw', maxHeight:'78vh', objectFit:'contain', borderRadius:14, boxShadow:'0 16px 64px rgba(0,0,0,0.5)' }}
      />

      {caption && (
        <div style={{ color:'rgba(255,255,255,0.85)', fontSize:14, fontWeight:500, marginTop:18, letterSpacing:'0.01em' }}>{caption}</div>
      )}

      {photos.length > 1 && (
        <div style={{ display:'flex', gap:8, marginTop:20 }}>
          {photos.map((_, i) => (
            <div
              key={i}
              onClick={e => { e.stopPropagation(); setIdx(i); }}
              style={{ width:8, height:8, borderRadius:99, background: i === idx ? 'var(--orange)' : 'rgba(255,255,255,0.3)', cursor:'pointer', transition:'background 150ms' }}
            />
          ))}
        </div>
      )}

      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setIdx(i => Math.min(i + 1, photos.length - 1)); }}
          style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:26, cursor:'pointer', borderRadius:10, padding:'10px 16px', opacity: idx === photos.length - 1 ? 0.3 : 1, pointerEvents: idx === photos.length - 1 ? 'none' : 'auto' }}
        >›</button>
      )}
    </div>
  );
}
