// Food Scanner — camera barcode detection + health analysis panel

const RATING_META = {
  Great: { color:'#1a7f4b', bg:'#e6f7ee', label:'Great' },
  Good:  { color:'#2e7d32', bg:'#f1f8f1', label:'Good'  },
  Okay:  { color:'#b45309', bg:'#fef3e2', label:'Okay'  },
  Poor:  { color:'#c0392b', bg:'#fdf0ee', label:'Poor'  },
  Avoid: { color:'#7b1b1b', bg:'#fde8e8', label:'Avoid' },
};

function ScoreRing({ score }) {
  const pct   = score / 10;
  const r     = 38;
  const circ  = 2 * Math.PI * r;
  const dash  = pct * circ;
  const color = score >= 7 ? '#1a7f4b' : score >= 5 ? '#b45309' : '#c0392b';
  return (
    <div style={{ position:'relative', width:96, height:96 }}>
      <svg width="96" height="96" style={{ transform:'rotate(-90deg)' }}>
        <circle cx="48" cy="48" r={r} fill="none" stroke="var(--line-soft)" strokeWidth="7"/>
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition:'stroke-dasharray 600ms ease' }}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:26, fontWeight:700, color, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:11, color:'var(--ink-mute)', marginTop:2 }}>/10</span>
      </div>
    </div>
  );
}

function HealthResult({ product, analysis, onReset }) {
  const meta  = RATING_META[analysis.rating] || RATING_META['Okay'];
  const imgUrl = product.image_front_url || product.image_url || null;

  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
            <Icon.sparkle/>
            <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Health Report</span>
          </div>
          <h1 className="dt-serif" style={{ fontSize:28, lineHeight:1.1, margin:'6px 0 4px', letterSpacing:'-0.02em' }}>
            {product.product_name || 'Unknown product'}
          </h1>
          <div style={{ fontSize:13, color:'var(--ink-mute)' }}>{product.brands || ''}</div>
        </div>
        {imgUrl && (
          <img src={imgUrl} alt={product.product_name} style={{ width:72, height:72, objectFit:'contain', borderRadius:12, border:'1px solid var(--line-soft)', background:'#fff', flexShrink:0 }}/>
        )}
      </div>

      {/* Score + Rating */}
      <div style={{ display:'flex', alignItems:'center', gap:20, background:'var(--cream)', borderRadius:18, padding:20 }}>
        <ScoreRing score={analysis.score}/>
        <div>
          <span style={{ display:'inline-block', padding:'4px 12px', borderRadius:99, background:meta.bg, color:meta.color, fontSize:13, fontWeight:700, marginBottom:8 }}>
            {meta.label}
          </span>
          <p style={{ margin:0, fontSize:14, lineHeight:1.55, color:'var(--ink-soft)' }}>{analysis.summary}</p>
        </div>
      </div>

      {/* Positives + Concerns */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {analysis.positives?.length > 0 && (
          <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:16, padding:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#1a7f4b', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:10 }}>Positives</div>
            {analysis.positives.map((p, i) => (
              <div key={i} style={{ display:'flex', gap:8, fontSize:13.5, lineHeight:1.4, marginBottom:i < analysis.positives.length - 1 ? 8 : 0 }}>
                <span style={{ color:'#1a7f4b', flexShrink:0, fontWeight:700 }}>✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        )}
        {analysis.concerns?.length > 0 && (
          <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:16, padding:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#c0392b', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:10 }}>Watch out</div>
            {analysis.concerns.map((c, i) => (
              <div key={i} style={{ display:'flex', gap:8, fontSize:13.5, lineHeight:1.4, marginBottom:i < analysis.concerns.length - 1 ? 8 : 0 }}>
                <span style={{ color:'#c0392b', flexShrink:0, fontWeight:700 }}>!</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Children section */}
      <div style={{ background:'var(--navy)', color:'var(--cream)', borderRadius:18, padding:22 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <span style={{ fontSize:18 }}>👶</span>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--orange)' }}>For Kids & Parents</span>
        </div>
        <p style={{ margin:'0 0 16px', fontSize:14, lineHeight:1.6, color:'rgba(250,245,236,0.9)' }}>{analysis.childrenNote}</p>
        {analysis.childAges && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { key:'under5',    label:'Under 5', icon:'🍼' },
              { key:'ages5to12', label:'Ages 5–12', icon:'🏫' },
              { key:'teens',     label:'Teenagers', icon:'🎒' },
            ].map(({ key, label, icon }) => analysis.childAges[key] && (
              <div key={key} style={{ display:'flex', gap:12, padding:'12px 14px', background:'rgba(255,255,255,0.07)', borderRadius:12 }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--orange)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:13, lineHeight:1.5, color:'rgba(250,245,236,0.85)' }}>{analysis.childAges[key]}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Serving advice + alternative */}
      {(analysis.servingAdvice || analysis.betterAlternative) && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {analysis.servingAdvice && (
            <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:14, padding:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--ink-mute)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Serving tip</div>
              <p style={{ margin:0, fontSize:13.5, lineHeight:1.5 }}>{analysis.servingAdvice}</p>
            </div>
          )}
          {analysis.betterAlternative && (
            <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:14, padding:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--ink-mute)', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Better alternative</div>
              <p style={{ margin:0, fontSize:13.5, lineHeight:1.5 }}>{analysis.betterAlternative}</p>
            </div>
          )}
        </div>
      )}

      {/* Nutriscore / NOVA badges */}
      {(product.nutriscore_grade || product.nova_group) && (
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {product.nutriscore_grade && (
            <span className="dt-chip ghost">Nutri-Score {product.nutriscore_grade.toUpperCase()}</span>
          )}
          {product.nova_group && (
            <span className="dt-chip ghost">NOVA {product.nova_group}</span>
          )}
        </div>
      )}

      <div className="dt-sticky-cta">
        <button onClick={onReset} className="dt-btn primary lg" style={{ flex:1 }}>
          <Icon.sparkle/> Scan another product
        </button>
      </div>
    </div>
  );
}

function ScannerPanel() {
  const hasDetector = typeof BarcodeDetector !== 'undefined';

  const [phase,    setPhase]    = React.useState('idle'); // idle|camera|loading|result|error
  const [loadMsg,  setLoadMsg]  = React.useState('');
  const [product,  setProduct]  = React.useState(null);
  const [analysis, setAnalysis] = React.useState(null);
  const [err,      setErr]      = React.useState('');
  const [manual,   setManual]   = React.useState('');

  const videoRef   = React.useRef(null);
  const streamRef  = React.useRef(null);
  const scanActive = React.useRef(false);

  const stopCamera = () => {
    scanActive.current = false;
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  React.useEffect(() => () => stopCamera(), []);

  const processBarcode = async (code) => {
    stopCamera();
    setPhase('loading');
    setErr('');
    try {
      setLoadMsg('Looking up product…');
      const p = await fetchProduct(code);
      setProduct(p);
      setLoadMsg('Analyzing nutrition…');
      const a = await analyzeProduct(p);
      setAnalysis(a);
      setPhase('result');
    } catch(e) {
      setErr(e.message);
      setPhase('error');
    }
  };

  const startCamera = async () => {
    setErr('');
    setPhase('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      const detector = new BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'],
      });
      scanActive.current = true;
      const scan = async () => {
        if (!scanActive.current || !videoRef.current) return;
        try {
          const results = await detector.detect(videoRef.current);
          if (results.length > 0) {
            await processBarcode(results[0].rawValue);
            return;
          }
        } catch {}
        requestAnimationFrame(scan);
      };
      requestAnimationFrame(scan);
    } catch(e) {
      setErr(e.message.includes('Permission') ? 'Camera permission denied. Use manual entry below.' : e.message);
      setPhase('idle');
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr('');
    setPhase('loading');
    setLoadMsg('Reading barcode…');
    try {
      const bitmap = await createImageBitmap(file);
      const detector = new BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'],
      });
      const results = await detector.detect(bitmap);
      if (!results.length) throw new Error('No barcode found in that image. Try a clearer photo.');
      await processBarcode(results[0].rawValue);
    } catch(e) {
      setErr(e.message);
      setPhase('idle');
    }
  };

  const onManualSubmit = (e) => {
    e.preventDefault();
    const code = manual.trim().replace(/[^0-9a-zA-Z]/g, '');
    if (code) processBarcode(code);
  };

  const onReset = () => {
    stopCamera();
    setPhase('idle');
    setProduct(null);
    setAnalysis(null);
    setErr('');
    setManual('');
  };

  // ── Loading screen ──
  if (phase === 'loading') {
    return (
      <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24, padding:40, minHeight:300 }}>
        <div style={{ position:'relative', width:80, height:80 }}>
          <div className="dt-spin" style={{ position:'absolute', inset:0, borderRadius:'50%', background:'conic-gradient(var(--orange), transparent 65%)', WebkitMask:'radial-gradient(closest-side, transparent 73%, #000 75%)', mask:'radial-gradient(closest-side, transparent 73%, #000 75%)' }}/>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>🔍</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <div className="dt-serif" style={{ fontSize:22, marginBottom:6 }}>{loadMsg}</div>
          <div style={{ fontSize:13, color:'var(--ink-mute)' }}>Powered by Open Food Facts + Claude AI</div>
        </div>
      </div>
    );
  }

  // ── Result screen ──
  if (phase === 'result' && product && analysis) {
    return <HealthResult product={product} analysis={analysis} onReset={onReset}/>;
  }

  // ── Camera screen ──
  if (phase === 'camera') {
    return (
      <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="dt-serif" style={{ fontSize:20 }}>Point camera at barcode</div>
          <button onClick={() => { stopCamera(); setPhase('idle'); }} className="dt-btn ghost sm">Cancel</button>
        </div>
        <div style={{ position:'relative', borderRadius:18, overflow:'hidden', background:'#000', aspectRatio:'4/3' }}>
          <video ref={videoRef} playsInline muted style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
          {/* Scanning overlay */}
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
            <div style={{ width:'60%', aspectRatio:'3/1', border:'2px solid var(--orange)', borderRadius:8, boxShadow:'0 0 0 9999px rgba(0,0,0,0.45)' }}/>
          </div>
          <div style={{ position:'absolute', bottom:16, left:0, right:0, textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.8)' }}>
            Align barcode within the frame
          </div>
        </div>
        <div style={{ fontSize:13, color:'var(--ink-mute)', textAlign:'center' }}>Scanning automatically…</div>
      </div>
    );
  }

  // ── Idle / error screen ──
  return (
    <div className="fadeInUp" style={{ display:'flex', flexDirection:'column', gap:22 }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--orange)' }}>
          <Icon.sparkle/>
          <span className="dt-eyebrow" style={{ color:'var(--orange)' }}>Food Scanner</span>
        </div>
        <h1 className="dt-serif" style={{ fontSize:36, lineHeight:1.1, margin:'8px 0 8px', letterSpacing:'-0.02em' }}>Scan any food label.</h1>
        <p style={{ fontSize:15, color:'var(--ink-soft)', lineHeight:1.55, margin:0 }}>
          Point your camera at a barcode. The guru looks up the product and breaks down exactly how healthy it is — including what it means for kids.
        </p>
      </div>

      {err && (
        <div style={{ fontSize:13, color:'#c0392b', padding:'10px 14px', background:'#fdf0ee', borderRadius:10 }}>
          {err}
        </div>
      )}

      {/* Primary: camera scan */}
      {hasDetector && (
        <button onClick={startCamera} className="dt-btn primary lg" style={{ width:'100%', gap:10 }}>
          <span style={{ fontSize:18 }}>📷</span> Scan barcode with camera
        </button>
      )}

      {/* Secondary: file upload */}
      {hasDetector && (
        <label className="dt-scanner-upload">
          <span style={{ fontSize:18 }}>🖼</span> Upload a photo of the barcode
          <input type="file" accept="image/*" onChange={onFileChange} style={{ display:'none' }}/>
        </label>
      )}

      {!hasDetector && (
        <div style={{ padding:'16px 18px', background:'#fef3e2', border:'1px solid #f6d48a', borderRadius:12, fontSize:14, color:'#7a4a00', lineHeight:1.5 }}>
          Live scanning isn't supported in this browser (try Chrome or Edge). Use the photo upload or enter the barcode below.
          <label style={{ display:'flex', alignItems:'center', gap:8, marginTop:12, cursor:'pointer', fontWeight:600 }}>
            <span>📷 Upload photo</span>
            <input type="file" accept="image/*" capture="environment" onChange={onFileChange} style={{ display:'none' }}/>
          </label>
        </div>
      )}

      {/* Always: manual entry */}
      <div className="dt-translator-section">
        <h4>Or enter barcode manually</h4>
        <div className="sub">Works for any UPC, EAN-13, or EAN-8 number on the package</div>
        <form onSubmit={onManualSubmit} style={{ display:'flex', gap:10, marginTop:4 }}>
          <input
            className="dt-input"
            style={{ flex:1, height:44 }}
            type="text"
            inputMode="numeric"
            placeholder="e.g. 037000132738"
            value={manual}
            onChange={e => setManual(e.target.value)}
          />
          <button type="submit" className="dt-btn dark sm" disabled={!manual.trim()} style={{ flexShrink:0 }}>
            Look up
          </button>
        </form>
      </div>
    </div>
  );
}
