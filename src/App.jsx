function App() {
  const [route,  setRoute]  = React.useState({ name:'home' });
  const [search, setSearch] = React.useState('');

  const openRecipe     = id => setRoute({ name:'recipe',       recipeId: id });
  const openTranslator = id => setRoute({ name:'translator',   recipeId: id || 'tagliatelle' });
  const openReviews    = ()  => setRoute({ name:'reviews' });
  const openRecipeList = ()  => setRoute({ name:'recipe-list' });
  const openMap        = ()  => setRoute({ name:'map' });
  const goHome         = ()  => setRoute({ name:'home' });

  React.useEffect(() => {
    window.scrollTo({ top:0, behavior:'instant' });
  }, [route.name, route.recipeId]);

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
        onOpenMap={openMap}
      />
      <div className="dt-body">
        {route.name === 'home'        && <Home       onOpenRecipe={openRecipe} onOpenTranslator={openTranslator} onOpenReviews={openReviews} onOpenRecipeList={openRecipeList}/>}
        {route.name === 'recipe-list' && <RecipeList onOpenRecipe={openRecipe} onOpenTranslator={openTranslator}/>}
        {route.name === 'recipe'      && <Recipe     recipeId={route.recipeId} onBack={openRecipeList} onOpenTranslator={openTranslator}/>}
        {route.name === 'translator'  && <Translator recipeId={route.recipeId} onBack={() => route.recipeId ? openRecipe(route.recipeId) : goHome()}/>}
        {route.name === 'reviews'     && <Reviews/>}
        {route.name === 'map'         && <RestaurantMap onOpenReviews={openReviews}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
