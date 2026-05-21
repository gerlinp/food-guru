function parseHash(hash) {
  const h = hash.replace(/^#/, '');
  if (!h || h === 'home')        return { name:'home' };
  if (h === 'recipes')           return { name:'recipe-list' };
  if (h.startsWith('recipe/'))   return { name:'recipe',     recipeId: h.slice(7) };
  if (h === 'reviews')           return { name:'reviews' };
  if (h.startsWith('review/'))   return { name:'review',     reviewId: h.slice(7) };
  if (h === 'chef')              return { name:'translator',  recipeId:'tagliatelle' };
  if (h.startsWith('chef/'))     return { name:'translator',  recipeId: h.slice(5) };
  if (h === 'map')               return { name:'map' };
  return { name:'home' };
}

function routeToHash(route) {
  switch (route.name) {
    case 'recipe-list': return '#recipes';
    case 'recipe':      return `#recipe/${route.recipeId}`;
    case 'reviews':     return '#reviews';
    case 'review':      return `#review/${route.reviewId}`;
    case 'translator':  return `#chef/${route.recipeId || 'tagliatelle'}`;
    case 'map':         return '#map';
    default:            return '#';
  }
}

function App() {
  const [route,  setRoute]  = React.useState(() => parseHash(window.location.hash));
  const [search, setSearch] = React.useState('');

  const navigate = route => {
    setRoute(route);
    history.pushState(null, '', routeToHash(route));
  };

  const openRecipe     = id => navigate({ name:'recipe',      recipeId: id });
  const openTranslator = id => navigate({ name:'translator',  recipeId: id || 'tagliatelle' });
  const openReviews    = ()  => navigate({ name:'reviews' });
  const openReview     = id => navigate({ name:'review',      reviewId: id });
  const openRecipeList = ()  => navigate({ name:'recipe-list' });
  const openMap        = ()  => navigate({ name:'map' });
  const goHome         = ()  => navigate({ name:'home' });

  React.useEffect(() => {
    const handler = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top:0, behavior:'instant' });
  }, [route.name, route.recipeId, route.reviewId]);

  return (
    <div className="dt-app">
      <Nav
        route={route}
        search={search}
        setSearch={setSearch}
        onHome={goHome}
        onOpenTranslator={() => openTranslator()}
        onOpenReviews={openReviews}
        onOpenRecipeList={openRecipeList}
        onOpenRecipe={openRecipe}
        onOpenReview={openReview}
        onOpenMap={openMap}
      />
      <div className="dt-body">
        {route.name === 'home'        && <Home       onOpenRecipe={openRecipe} onOpenTranslator={openTranslator} onOpenReviews={openReviews} onOpenRecipeList={openRecipeList}/>}
        {route.name === 'recipe-list' && <RecipeList onOpenRecipe={openRecipe} onOpenTranslator={openTranslator}/>}
        {route.name === 'recipe'      && <Recipe     recipeId={route.recipeId} onBack={openRecipeList} onOpenTranslator={openTranslator}/>}
        {route.name === 'translator'  && <Translator recipeId={route.recipeId} onBack={() => route.recipeId ? openRecipe(route.recipeId) : goHome()}/>}
        {route.name === 'reviews'     && <Reviews onOpenReview={openReview}/>}
        {route.name === 'review'      && <ReviewDetail reviewId={route.reviewId} onBack={openReviews}/>}
        {route.name === 'map'         && <RestaurantMap onOpenReview={openReview}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
