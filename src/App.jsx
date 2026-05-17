function App() {
  const [route,  setRoute]  = React.useState({ name:'home' });
  const [search, setSearch] = React.useState('');

  const openRecipe     = id => setRoute({ name:'recipe',       recipeId: id });
  const openTranslator = id => setRoute({ name:'translator',   recipeId: id || 'tagliatelle' });
  const openReviews    = ()  => setRoute({ name:'reviews' });
  const openRecipeList = ()  => setRoute({ name:'recipe-list' });
  const openAdmin      = ()  => setRoute({ name:'admin' });
  const goHome         = ()  => setRoute({ name:'home' });

  React.useEffect(() => {
    window.scrollTo({ top:0, behavior:'instant' });
  }, [route.name, route.recipeId]);

  const isAdmin = route.name === 'admin';

  return (
    <div className="dt-app">
      {!isAdmin && (
        <Nav
          route={route}
          search={search}
          setSearch={setSearch}
          onHome={goHome}
          onOpenTranslator={() => openTranslator()}
          onOpenReviews={openReviews}
          onOpenRecipeList={openRecipeList}
        />
      )}
      <div className="dt-body">
        {route.name === 'home'        && <Home       onOpenRecipe={openRecipe} onOpenTranslator={openTranslator} onOpenReviews={openReviews} onOpenAdmin={openAdmin} onOpenRecipeList={openRecipeList}/>}
        {route.name === 'recipe-list' && <RecipeList onOpenRecipe={openRecipe} onOpenTranslator={openTranslator} onOpenAdmin={openAdmin}/>}
        {route.name === 'recipe'      && <Recipe     recipeId={route.recipeId} onBack={openRecipeList} onOpenTranslator={openTranslator}/>}
        {route.name === 'translator'  && <Translator recipeId={route.recipeId} onBack={() => route.recipeId ? openRecipe(route.recipeId) : goHome()}/>}
        {route.name === 'reviews'     && <Reviews    onOpenAdmin={openAdmin}/>}
        {route.name === 'admin'       && <Admin      onBack={goHome}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
