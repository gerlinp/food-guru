function Footer({ onOpenReviews }) {
  return (
    <footer className="dt-footer">
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
          <div className="dt-logo-mark" style={{ background:'var(--orange)', color:'var(--navy)' }}>G</div>
          <div className="dt-logo-text" style={{ color:'var(--cream)' }}>{SITE_SETTINGS.brand}</div>
        </div>
        <p style={{ margin:0, maxWidth:320, lineHeight:1.6 }}>{SITE_SETTINGS.footerDesc}</p>
      </div>

      <div>
        <h5>Cook</h5>
        <a>All recipes</a>
        <a>By cuisine</a>
        <a>By season</a>
        <a>By time</a>
      </div>

      <div>
        <h5>Eat out</h5>
        <a onClick={onOpenReviews}>Restaurant reviews</a>
        <a>Cities</a>
        <a>Featured</a>
      </div>

      <div>
        <h5>Company</h5>
        <a>About</a>
        <a>Press</a>
        <a>Careers</a>
      </div>
    </footer>
  );
}
