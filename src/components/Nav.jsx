function Nav({ route, search, setSearch, onHome, onOpenTranslator, onOpenReviews, onOpenRecipeList }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => setMenuOpen(false), [route.name]);

  const close = fn => () => { fn(); setMenuOpen(false); };

  const HamburgerIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  const isRecipes    = route.name === 'recipe-list' || route.name === 'recipe';
  const isReviews    = route.name === 'reviews';
  const isTranslator = route.name === 'translator';

  return (
    <React.Fragment>
      <nav className="dt-nav">
        <div className="dt-logo" onClick={close(onHome)}>
          <div className="dt-logo-mark">G</div>
          <div className="dt-logo-text">{SITE_SETTINGS.brand}</div>
        </div>

        <div className="dt-nav-links">
          <a className={isRecipes ? 'active' : ''} onClick={onOpenRecipeList}>Recipes</a>
          <a className={isReviews ? 'active' : ''} onClick={onOpenReviews}>Restaurant Reviews</a>
          <a className={isTranslator ? 'active' : ''} onClick={onOpenTranslator} style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Icon.sparkle style={{ width:14, height:14, color:'var(--orange)' }}/> Chef Tool
          </a>
        </div>

        <div className="dt-nav-search">
          <Icon.search/>
          <input
            placeholder="Search recipes, ingredients, or cooks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="dt-nav-search-kbd">⌘K</span>
        </div>

        <div className="dt-nav-right">
          <button className="dt-btn ghost sm"><Icon.bookmark style={{ width:16, height:16 }}/> Saved</button>
          <div className="dt-avatar">SA</div>
        </div>

        <button
          className="dt-nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <CloseIcon/> : <HamburgerIcon/>}
        </button>
      </nav>

      {menuOpen && (
        <React.Fragment>
          <div className="dt-nav-backdrop" onClick={() => setMenuOpen(false)}/>
          <div className="dt-nav-mobile-menu">
            <a className={`dt-nav-mobile-link ${isRecipes ? 'active' : ''}`} onClick={close(onOpenRecipeList)}>
              Recipes
            </a>
            <a className={`dt-nav-mobile-link ${isReviews ? 'active' : ''}`} onClick={close(onOpenReviews)}>
              Restaurant Reviews
            </a>
            <a className={`dt-nav-mobile-link ${isTranslator ? 'active' : ''}`} onClick={close(onOpenTranslator)}>
              <Icon.sparkle style={{ color:'var(--orange)', width:16, height:16 }}/> Chef Tool
            </a>
            <div className="dt-nav-mobile-footer">
              <button className="dt-btn ghost sm"><Icon.bookmark style={{ width:15, height:15 }}/> Saved</button>
              <div className="dt-avatar">SA</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
