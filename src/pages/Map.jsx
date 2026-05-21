const starHtml = (rating, size = 13) => {
  const filled = Math.round(rating);
  return [1,2,3,4,5].map(i =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24">` +
    `<path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4L1.5 9.6 9 9z" ` +
    `fill="${i <= filled ? '#f0631c' : 'transparent'}" ` +
    `stroke="${i <= filled ? '#f0631c' : '#c5b994'}" ` +
    `stroke-width="1.4" stroke-linejoin="round"/></svg>`
  ).join('');
};

function RestaurantMap({ onOpenReview }) {
  const mapRef          = React.useRef(null);
  const mapInstanceRef  = React.useRef(null);
  const clusterRef      = React.useRef(null);
  const markersRef      = React.useRef({});
  const onOpenReviewRef = React.useRef(onOpenReview);
  React.useEffect(() => { onOpenReviewRef.current = onOpenReview; }, [onOpenReview]);

  const [search, setSearch] = React.useState('');

  const mapped = REVIEWS.filter(r => r.lat && r.lng);
  const q        = search.trim().toLowerCase();
  const filtered = q ? mapped.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.city.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.neighborhood.toLowerCase().includes(q)
  ) : mapped;

  const flyTo = id => {
    const map     = mapInstanceRef.current;
    const marker  = markersRef.current[id];
    const cluster = clusterRef.current;
    if (!map || !marker || !cluster) return;
    cluster.zoomToShowLayer(marker, () => {
      setTimeout(() => marker.openPopup(), 100);
    });
  };

  React.useEffect(() => {
    if (q && filtered.length === 1) flyTo(filtered[0].id);
  }, [search]);

  React.useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    window._guruGoToReview = id => onOpenReviewRef.current(id);

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: true,
      touchZoom: true,
      dragging: true,
      tap: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 60,
      iconCreateFunction: c => L.divIcon({
        className: '',
        html: `<div class="guru-cluster">${c.getChildCount()}</div>`,
        iconSize:   [44, 44],
        iconAnchor: [22, 22],
      }),
    });

    const makeIcon = () => L.divIcon({
      className: '',
      html: `<div class="guru-pin"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 21s-7-7.75-7-12a7 7 0 0114 0c0 4.25-7 12-7 12z" fill="currentColor"/></svg></div>`,
      iconSize:    [36, 36],
      iconAnchor:  [18, 18],
      popupAnchor: [0, -20],
    });

    mapped.forEach(r => {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`;
      const marker = L.marker([r.lat, r.lng], { icon: makeIcon() })
        .bindPopup(
          `<div class="guru-popup">
            <div class="guru-popup-name">${r.name}</div>
            <div class="guru-popup-loc">${r.neighborhood} &middot; ${r.city}</div>
            <div class="guru-popup-stars">${starHtml(r.rating, 14)}</div>
            <div class="guru-popup-meta">${r.cuisine} &middot; ${r.price}</div>
            <div class="guru-popup-hed">&ldquo;${r.headline}&rdquo;</div>
            <div class="guru-popup-actions">
              <a href="${directionsUrl}" target="_blank" rel="noopener" class="guru-popup-btn outline">&#8599; Directions</a>
              <button onclick="window._guruGoToReview('${r.id}')" class="guru-popup-btn">Read review</button>
            </div>
          </div>`,
          { maxWidth: 270, className: 'guru-leaflet-popup' }
        );
      markersRef.current[r.id] = marker;
      cluster.addLayer(marker);
    });

    map.addLayer(cluster);
    clusterRef.current = cluster;

    if (mapped.length > 1) {
      const bounds = L.latLngBounds(mapped.map(r => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [60, 60] });
    } else if (mapped.length === 1) {
      map.setView([mapped[0].lat, mapped[0].lng], 13);
    }

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      clusterRef.current     = null;
      markersRef.current     = {};
      delete window._guruGoToReview;
    };
  }, []);

  return (
    <React.Fragment>
      <div style={{ padding:'48px 56px 32px', borderBottom:'1px solid var(--line-soft)' }}>
        <div className="dt-eyebrow" style={{ marginBottom:8 }}>Restaurant map</div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
          <h1 className="dt-serif" style={{ margin:0, fontSize:42, lineHeight:1.05, letterSpacing:'-0.02em' }}>
            Favorite rooms, mapped.
          </h1>
          <span style={{ fontSize:14, color:'var(--ink-mute)', paddingBottom:6 }}>{mapped.length} restaurants</span>
        </div>
      </div>

      <div style={{ padding:'32px 56px 0' }}>
        <div ref={mapRef} style={{ width:'100%', height:520, borderRadius:18, overflow:'hidden', border:'1px solid var(--line-soft)' }}/>
      </div>

      <div style={{ padding:'28px 56px 64px' }}>
        <div style={{ position:'relative', marginBottom:20 }}>
          <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--ink-mute)', display:'flex', pointerEvents:'none' }}>
            <Icon.search/>
          </div>
          <input
            className="dt-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, city, or cuisine…"
            style={{ paddingLeft:44, height:44, borderRadius:12, width:'100%', boxSizing:'border-box' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'var(--ink-mute)', lineHeight:1 }}
            >×</button>
          )}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign:'center', padding:'40px 0', color:'var(--ink-mute)', fontSize:15 }}>No restaurants match "{search}".</p>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12 }}>
          {filtered.map(r => (
            <div key={r.id} style={{ border:'1px solid var(--line-soft)', borderRadius:14, background:'var(--white)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
              <Photo
                tint={r.tint}
                src={r.photo || undefined}
                label={r.name.toLowerCase()}
                objectPosition={r.photoPosition || 'center'}
                style={{ height:130, flexShrink:0 }}
              />
              <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', flex:1 }}>
                <div onClick={() => flyTo(r.id)} style={{ cursor:'pointer', marginBottom:14 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:'var(--ink)', lineHeight:1.2, marginBottom:6 }}>{r.name}</div>
                  <div style={{ marginBottom:5 }}><Stars value={r.rating} size={13}/></div>
                  <div style={{ fontSize:12, color:'var(--ink-mute)', marginBottom:4 }}>{r.neighborhood} &middot; {r.city}</div>
                  <div style={{ fontSize:13, color:'var(--ink-soft)' }}>{r.cuisine} &middot; {r.price}</div>
                </div>
                <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
                    target="_blank"
                    rel="noopener"
                    style={{ flex:1, padding:'8px 10px', borderRadius:8, fontSize:12, fontWeight:600, textAlign:'center', textDecoration:'none', background:'transparent', color:'var(--ink)', border:'1px solid var(--line-soft)', display:'inline-block' }}
                  >↗ Directions</a>
                  <button
                    onClick={() => onOpenReview(r.id)}
                    style={{ flex:1, padding:'8px 10px', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer', background:'var(--navy)', color:'var(--orange)', border:'none', fontFamily:'inherit' }}
                  >Read review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </React.Fragment>
  );
}
