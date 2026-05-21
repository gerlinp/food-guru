function Nav({ route, search, setSearch, onHome, onOpenTranslator, onOpenReviews, onOpenRecipeList, onOpenRecipe, onOpenReview, onOpenMap }) {
  const [menuOpen,   setMenuOpen]   = React.useState(false);
  const [searchFocus, setSearchFocus] = React.useState(false);
  const searchRef = React.useRef(null);

  React.useEffect(() => setMenuOpen(false), [route.name]);
  React.useEffect(() => { setSearch(''); setSearchFocus(false); }, [route.name]);

  React.useEffect(() => {
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocus(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const q = search.trim().toLowerCase();
  const recipeResults = q.length > 0 ? RECIPES.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q) ||
    r.author.toLowerCase().includes(q) ||
    (r.tags || []).some(t => t.includes(q))
  ).slice(0, 4) : [];

  const reviewResults = q.length > 0 ? REVIEWS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.city.toLowerCase().includes(q) ||
    r.neighborhood.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const hasResults = recipeResults.length > 0 || reviewResults.length > 0;
  const showBothLabels = recipeResults.length > 0 && reviewResults.length > 0;

  const handleRecipeClick = id => { onOpenRecipe(id); setSearch(''); setSearchFocus(false); };
  const handleReviewClick = id => { onOpenReview(id); setSearch(''); setSearchFocus(false); };

  const handleKeyDown = e => {
    if (e.key === 'Escape') { setSearch(''); setSearchFocus(false); }
  };

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
  const isMap        = route.name === 'map';
  const isTranslator = route.name === 'translator';
  const showDropdown = searchFocus && q.length > 0;

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
          <a className={isMap ? 'active' : ''} onClick={onOpenMap} style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
            <Icon.pin style={{ width:14, height:14 }}/> Map
          </a>
          <a className={isTranslator ? 'active' : ''} onClick={onOpenTranslator} style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Icon.sparkle style={{ width:14, height:14, color:'var(--orange)' }}/> Chef Tool
          </a>
        </div>

        <div className="dt-nav-search" ref={searchRef} style={{ position:'relative' }}>
          <Icon.search/>
          <input
            placeholder="Search recipes or restaurants…"
            value={search}
            onChange={e => { setSearch(e.target.value); setSearchFocus(true); }}
            onFocus={() => setSearchFocus(true)}
            onKeyDown={handleKeyDown}
          />
          {showDropdown && (
            <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, right:0, background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:16, boxShadow:'0 8px 32px rgba(14,26,47,0.12)', zIndex:200, overflow:'hidden' }}>
              {!hasResults ? (
                <div style={{ padding:'16px 18px', fontSize:13, color:'var(--ink-mute)' }}>No results for "{search}"</div>
              ) : (
                <React.Fragment>
                  {recipeResults.length > 0 && (
                    <React.Fragment>
                      {showBothLabels && (
                        <div style={{ padding:'8px 14px 4px', fontSize:11, fontWeight:700, letterSpacing:'0.06em', color:'var(--ink-mute)', textTransform:'uppercase' }}>Recipes</div>
                      )}
                      {recipeResults.map((r, i) => (
                        <div
                          key={r.id}
                          onClick={() => handleRecipeClick(r.id)}
                          style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', cursor:'pointer', borderBottom: (i < recipeResults.length - 1 || reviewResults.length > 0) ? '1px solid var(--line-soft)' : 'none', transition:'background 100ms' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Photo tint={r.tint} src={r.photo || undefined} style={{ width:44, height:44, borderRadius:8, flexShrink:0 }}/>
                          <div style={{ minWidth:0 }}>
                            <div style={{ fontWeight:600, fontSize:14, color:'var(--ink)', lineHeight:1.2 }}>{r.title}</div>
                            <div style={{ fontSize:12, color:'var(--ink-mute)', marginTop:2 }}>{r.cuisine} · {r.category} · <span style={{ color:'var(--orange)' }}>{r.difficulty}</span></div>
                          </div>
                          <div style={{ color:'var(--ink-mute)', fontSize:18, flexShrink:0 }}>→</div>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                  {reviewResults.length > 0 && (
                    <React.Fragment>
                      {showBothLabels && (
                        <div style={{ padding:'8px 14px 4px', fontSize:11, fontWeight:700, letterSpacing:'0.06em', color:'var(--ink-mute)', textTransform:'uppercase' }}>Restaurants</div>
                      )}
                      {reviewResults.map((r, i) => (
                        <div
                          key={r.id}
                          onClick={() => handleReviewClick(r.id)}
                          style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', cursor:'pointer', borderBottom: i < reviewResults.length - 1 ? '1px solid var(--line-soft)' : 'none', transition:'background 100ms' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Photo tint={r.tint} src={r.photo || undefined} style={{ width:44, height:44, borderRadius:8, flexShrink:0 }}/>
                          <div style={{ minWidth:0 }}>
                            <div style={{ fontWeight:600, fontSize:14, color:'var(--ink)', lineHeight:1.2 }}>{r.name}</div>
                            <div style={{ fontSize:12, color:'var(--ink-mute)', marginTop:2 }}>{r.cuisine} · {r.neighborhood}, {r.city}</div>
                          </div>
                          <div style={{ color:'var(--ink-mute)', fontSize:18, flexShrink:0 }}>→</div>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          )}
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
            <a className={`dt-nav-mobile-link ${isMap ? 'active' : ''}`} onClick={close(onOpenMap)}>
              <Icon.pin style={{ color:'var(--orange)', width:16, height:16 }}/> Map
            </a>
            <a className={`dt-nav-mobile-link ${isTranslator ? 'active' : ''}`} onClick={close(onOpenTranslator)}>
              <Icon.sparkle style={{ color:'var(--orange)', width:16, height:16 }}/> Chef Tool
            </a>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
