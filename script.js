// DATA
const RECIPES = [
  { id:'tagliatelle', title:'Brown Butter Tagliatelle with Crispy Sage', author:'Lina Tovar', cuisine:'Italian', category:'Pasta', tags:['comfort','30-min','vegetarian'], minutes:35, servings:4, difficulty:'Intermediate', rating:4.8, reviews:312, tint:'t5',
    description:'A weeknight Northern Italian classic — nutty browned butter clinging to fresh ribbons of egg pasta, finished with fried sage and a snowfall of Parmigiano.',
    ingredients:[{qty:'12 oz',item:'fresh tagliatelle'},{qty:'8 tbsp',item:'unsalted butter'},{qty:'20',item:'fresh sage leaves'},{qty:'2 cloves',item:'garlic, smashed'},{qty:'½ cup',item:'Parmigiano-Reggiano, finely grated'},{qty:'1 tsp',item:'lemon zest'},{qty:'¼ tsp',item:'freshly grated nutmeg'},{qty:'to taste',item:'flaky sea salt + black pepper'}],
    steps:['Bring a large pot of well-salted water to a boil. Drop the tagliatelle and cook until just shy of al dente, about 2 minutes for fresh pasta.','Meanwhile, melt the butter in a wide skillet over medium heat. Add the garlic and sage and swirl the pan constantly. The butter will foam, then quiet — keep going until the milk solids turn a deep hazelnut brown and smell toasted, about 4–5 minutes.','Pull the sage out onto a plate (it should be crisp), then kill the heat. Add a ladle of pasta water to stop the cooking.','Transfer the pasta straight into the skillet with tongs. Toss vigorously for a full minute, adding splashes of pasta water until the sauce glosses every ribbon.','Off the heat, shower with Parmigiano, lemon zest, and nutmeg. Toss again, taste, and adjust salt.','Plate immediately. Crown each portion with the crisp sage leaves, a final flurry of cheese, and a few cracks of pepper.'],
    notes:"The pan should be hot enough that the butter is actively bubbling — that's where the toasted flavor comes from. If it goes dark too fast, slide the pan off the burner for a few seconds." },
  { id:'eggplant', title:'Miso-Glazed Eggplant Steaks', author:'Hiro Watanabe', cuisine:'Japanese', category:'Vegetable Mains', tags:['vegan','umami','sheet-pan'], minutes:40, servings:2, difficulty:'Easy', rating:4.9, reviews:188, tint:'t6' },
  { id:'risotto', title:'Saffron Risotto alla Milanese', author:'Giulia Romano', cuisine:'Italian', category:'Rice', tags:['classic','creamy'], minutes:45, servings:4, difficulty:'Intermediate', rating:4.7, reviews:521, tint:'t5' },
  { id:'meatballs', title:'Smoky Harissa Lamb Meatballs', author:'Yasmin Beldi', cuisine:'North African', category:'Main', tags:['spicy','one-pan'], minutes:55, servings:6, difficulty:'Easy', rating:4.6, reviews:274, tint:'t2' },
  { id:'octopus', title:'Galician-Style Octopus with Smoked Paprika', author:'Paco Mendez', cuisine:'Spanish', category:'Seafood', tags:['weekend','showstopper'], minutes:90, servings:4, difficulty:'Advanced', rating:4.9, reviews:96, tint:'t3' },
  { id:'steak', title:'Charred Scallion Chimichurri Skirt Steak', author:'Mariana Acosta', cuisine:'Argentine', category:'Grill', tags:['quick','grill','high-heat'], minutes:30, servings:4, difficulty:'Easy', rating:4.8, reviews:401, tint:'t1' },
  { id:'cauliflower', title:'Roasted Cauliflower with Tahini & Pomegranate', author:'Noor Habash', cuisine:'Levantine', category:'Sides', tags:['vegan','sheet-pan'], minutes:40, servings:4, difficulty:'Easy', rating:4.7, reviews:219, tint:'t4' },
  { id:'mango', title:'Coconut Mango Sticky Rice', author:'Anong Suwan', cuisine:'Thai', category:'Dessert', tags:['summer','gluten-free'], minutes:50, servings:4, difficulty:'Easy', rating:4.9, reviews:612, tint:'t7' },
];
const CATEGORIES = ['All','Quick','Pasta','Vegetarian','Grill','Comfort','Baking','Desserts'];

const REVIEWS = [
  { id:'nostro', name:'Nostro', cuisine:'Northern Italian', city:'Brooklyn, NY', neighborhood:'Cobble Hill', rating:4.5, price:'$$$', author:'Lina Tovar', date:'May 12, 2026', headline:'A pasta room with bigger ideas than the dough.', excerpt:"The hand-pulled tagliarini gets top billing, but it's the brown-butter agnolotti — fragile, mineral, almost translucent — that lingers on the drive home.", tint:'t5', standout:'Brown-butter agnolotti' },
  { id:'sebo', name:'Sebo', cuisine:'Omakase', city:'San Francisco, CA', neighborhood:'Hayes Valley', rating:4.9, price:'$$$$', author:'Hiro Watanabe', date:'May 6, 2026', headline:'The most quietly confident omakase on the West Coast.', excerpt:"Twelve courses, three hours, zero showmanship. Chef Kanazawa moves like he's been waiting for you all day. The kohada cure alone justifies the price of admission.", tint:'t4', standout:'Kohada (gizzard shad)' },
  { id:'casa-lola', name:'Casa Lola', cuisine:'Modern Mexican', city:'Mexico City, MX', neighborhood:'Roma Norte', rating:4.8, price:'$$$', author:'Mariana Acosta', date:'Apr 29, 2026', headline:'A love letter to the corn she grew up on.', excerpt:"Chef Lola Sandoval cooks with a kind of reverent ferocity. The huitlacoche masa tarts and the goat-cheek tamal are the meal of the year so far.", tint:'t2', standout:'Goat-cheek tamal' },
  { id:'tatami', name:'Tatami', cuisine:'Izakaya', city:'Brooklyn, NY', neighborhood:'Bed-Stuy', rating:4.6, price:'$$', author:'Sasha Aoki', date:'Apr 22, 2026', headline:'Late-night drinking food, treated like it matters.', excerpt:"A 24-seat counter, an open binchotan grill, and a list of nine highballs. The chicken-skin gyoza and the smoked sardine onigiri are reason enough to wait for a stool.", tint:'t6', standout:'Chicken-skin gyoza' },
  { id:'larder', name:'The Larder', cuisine:'Farm-to-table', city:'Asheville, NC', neighborhood:'West Asheville', rating:4.4, price:'$$$', author:'Yasmin Beldi', date:'Apr 15, 2026', headline:'Quiet seasonal cooking that earns every ingredient.', excerpt:"It would be easy to call this place precious, but everything on the plate is the result of a real relationship with a real farm down the road. The whey-braised pork shoulder is a thing of beauty.", tint:'t1', standout:'Whey-braised pork' },
  { id:'meson', name:'Mesón Sevilla', cuisine:'Andalusian tapas', city:'Madrid, ES', neighborhood:'La Latina', rating:4.7, price:'$$', author:'Paco Mendez', date:'Apr 4, 2026', headline:'A century-old tapas bar that still beats the new guard.', excerpt:"Stand at the bar, order three rounds of croquetas and the bone-in jamón, and don't leave until you've had the salt-cured anchovy. Cash only, no apologies.", tint:'t7', standout:'Croquetas de jamón' },
  { id:'akaroa', name:'Akaroa', cuisine:'Modern New Zealand', city:'Los Angeles, CA', neighborhood:'Silver Lake', rating:4.6, price:'$$$', author:'Noor Habash', date:'Mar 28, 2026', headline:'Antipodean cooking that finally feels at home in LA.', excerpt:"The smoked kahawai dip is on every table for a reason. Chef Olafson's vegetable cookery — especially the charred cabbage with horopito — is the quiet star.", tint:'t3', standout:'Charred cabbage with horopito' },
];
const REVIEW_CITIES = ['All cities','Brooklyn, NY','San Francisco, CA','Mexico City, MX','Asheville, NC','Madrid, ES','Los Angeles, CA'];

function buildTranslation() {
  const A=s=>({kind:'add',text:s}), R=s=>({kind:'rm',text:s}), K=s=>({kind:'keep',text:s});
  return {
    ingredients:[
      {qty:'18 oz',item:[R('fresh tagliatelle'),A('gluten-free fettuccine')]},
      {qty:'12 tbsp',item:[R('unsalted butter'),A('vegan cultured butter')]},
      {qty:'30',item:[K('fresh sage leaves')]},
      {qty:'3 cloves',item:[K('garlic, smashed')]},
      {qty:'¾ cup',item:[R('Parmigiano-Reggiano'),A('aged cashew parm')]},
      {qty:'1½ tsp',item:[K('lemon zest')]},
      {qty:'⅜ tsp',item:[K('freshly grated nutmeg')]},
      {qty:'2 tbsp',item:[A('nutritional yeast')],isNew:true},
      {qty:'to taste',item:[K('flaky sea salt + black pepper')]},
    ],
    changes:['Swapped butter for cultured vegan butter — it still browns and tastes nutty.','Used gluten-free fettuccine; reduce cook time by 30 seconds, the starch behaves differently.','Replaced Parmigiano with aged cashew parmesan + a hit of nutritional yeast for that savory edge.','Scaled everything 1.5× to feed 6.','Combined steps 2 and 3 to fit a 30-minute window — start the sauce while the water is heating.'],
    steps:['Bring a large pot of well-salted water to a boil. Drop the [gluten-free fettuccine] and cook to just shy of al dente, ~2 minutes less than the package says.','While the water heats, melt the [vegan butter] in a wide skillet over medium heat. Add garlic and sage and swirl constantly until the solids turn deep hazelnut and smell toasted, ~4 minutes. Lift the sage onto a plate.','Kill the heat. Add a ladle of pasta water to stop the cooking. Transfer the pasta straight in and toss for a full minute, splashing more pasta water until glossy.','Off heat, shower with [cashew parm], [nutritional yeast], lemon zest, and nutmeg. Toss, taste, adjust salt.','Plate, crown with crisp sage and a few cracks of pepper.'],
  };
}

function scaleQty(qty, factor) {
  if (factor === 1) return qty;
  const fracs={'½':0.5,'⅓':0.33,'¼':0.25,'⅛':0.125,'¾':0.75,'⅔':0.66,'⅜':0.375};
  const m=qty.match(/^([\d⅛¼⅓⅜½⅔¾]+(?:\.\d+)?)(.*)$/);
  if (!m) return qty;
  let n=parseFloat(m[1]);
  if (isNaN(n)) n=fracs[m[1]]||NaN;
  if (isNaN(n)) return qty;
  return `${Math.round(n*factor*4)/4}${m[2]}`;
}

// ICONS
const Icon = {
  search: p => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  bookmark: p => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 4h12v17l-6-4-6 4V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  share: p => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 16V4m0 0l-4 4m4-4l4 4M5 14v5a1 1 0 001 1h12a1 1 0 001-1v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clock: p => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  fork: p => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 3v8a3 3 0 003 3v7m4-18v8a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  star: (filled=true, size=12) => <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4L1.5 9.6 9 9z" fill={filled?'#f0631c':'transparent'} stroke={filled?'#f0631c':'#c5b994'} strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  sparkle: p => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l1.8 5.7L19.5 10l-5.7 1.8L12 18l-1.8-6.2L4.5 10l5.7-1.3L12 3zM19 17l.8 2.2 2.2.8-2.2.8L19 23l-.8-2.2-2.2-.8 2.2-.8L19 17zM5 14l.6 1.7 1.7.6-1.7.6L5 18.5l-.6-1.6L2.7 16.3l1.7-.6L5 14z" fill="currentColor"/></svg>,
  flame: p => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3c0 4-5 5-5 10a5 5 0 0010 0c0-2-1-3-2-4 0 2-1 3-2 3 0-3 1-5-1-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  bowl: p => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11h18a9 9 0 01-18 0z" stroke="currentColor" strokeWidth="1.5"/><path d="M5 11c0-3 3-5 7-5s7 2 7 5" stroke="currentColor" strokeWidth="1.5"/></svg>,
};

function Stars({ value=4.8, size=12 }) {
  return <span className="stars">{[1,2,3,4,5].map(i=><span key={i}>{Icon.star(i<=Math.round(value),size)}</span>)}</span>;
}

function Photo({ tint='t1', label, children, style={}, className='' }) {
  return (
    <div className={`dt-photo ${tint} ${className}`} style={style}>
      {children}
      {label && <div className="photo-label"><span>{label}</span><span style={{opacity:0.5}}>[photo]</span></div>}
    </div>
  );
}

// NAV
function Nav({ route, search, setSearch, onHome, onOpenTranslator, onOpenReviews }) {
  return (
    <nav className="dt-nav">
      <div className="dt-logo" onClick={onHome}>
        <div className="dt-logo-mark">G</div>
        <div className="dt-logo-text">The Hungry Guru</div>
      </div>
      <div className="dt-nav-links">
        <a className={route.name==='home'||route.name==='recipe'?'active':''} onClick={onHome}>Recipes</a>
        <a className={route.name==='reviews'?'active':''} onClick={onOpenReviews}>Restaurant Reviews</a>
        <a className={route.name==='translator'?'active':''} onClick={onOpenTranslator} style={{display:'inline-flex',alignItems:'center',gap:6}}>
          <Icon.sparkle style={{width:14,height:14,color:'var(--orange)'}}/> Chef Tool
        </a>
      </div>
      <div className="dt-nav-search">
        <Icon.search/>
        <input placeholder="Search recipes, ingredients, or cooks…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <span style={{fontSize:11,padding:'3px 7px',borderRadius:6,background:'var(--white)',border:'1px solid var(--line)',color:'var(--ink-mute)',fontFamily:'var(--mono)'}}>⌘K</span>
      </div>
      <div className="dt-nav-right">
        <button className="dt-btn ghost sm"><Icon.bookmark style={{width:16,height:16}}/> Saved</button>
        <div className="dt-avatar">SA</div>
      </div>
    </nav>
  );
}

// FOOTER
function Footer({ onOpenReviews, onOpenTranslator }) {
  return (
    <footer className="dt-footer">
      <div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
          <div className="dt-logo-mark" style={{background:'var(--orange)',color:'var(--navy)'}}>G</div>
          <div className="dt-logo-text" style={{color:'var(--cream)'}}>The Hungry Guru</div>
        </div>
        <p style={{margin:0,maxWidth:320,lineHeight:1.6}}>A working notebook of the Guru's favorite recipes and the restaurants she'd send you to. Tested twice, written honestly.</p>
      </div>
      <div><h5>Cook</h5><a>All recipes</a><a>By cuisine</a><a>By season</a><a>By time</a></div>
      <div><h5>Eat out</h5><a onClick={onOpenReviews}>Restaurant reviews</a><a>Cities</a><a>This week's pick</a></div>
      <div><h5>Company</h5><a>About</a><a>Press</a><a>Careers</a><a>Contact</a></div>
    </footer>
  );
}

// HOME PAGE
function Home({ onOpenRecipe, onOpenTranslator, onOpenReviews }) {
  const [category, setCategory] = React.useState('All');
  const filtered = RECIPES.filter(r => {
    if (category==='All') return true;
    const map={Quick:r.minutes<=35,Pasta:r.category==='Pasta',Vegetarian:r.tags.includes('vegetarian')||r.tags.includes('vegan'),Grill:r.category==='Grill',Comfort:r.tags.includes('comfort'),Baking:r.category==='Baking',Desserts:r.category==='Dessert'};
    return !!map[category];
  });
  const featured=RECIPES[0], rail=[RECIPES[5],RECIPES[3],RECIPES[7]];
  const listShown=filtered.filter(r=>r.id!==featured.id);
  const reviewsTeaser=REVIEWS.slice(0,3);

  return (
    <React.Fragment>
      {/* Hero */}
      <section className="dt-hero">
        <div className="dt-hero-text">
          <div className="dt-eyebrow">Curated by the Guru</div>
          <h1 className="dt-hero-headline">Favorite recipes,<br/><em>favorite restaurants.</em></h1>
          <p className="dt-hero-sub">A working notebook of the dishes the Guru cooks on repeat and the rooms she keeps going back to — every recipe tested in three home kitchens, every restaurant visited at least twice before it makes the page.</p>
          <div style={{display:'flex',gap:12}}>
            <button onClick={()=>onOpenRecipe(featured.id)} className="dt-btn dark lg">Start with tonight's pick</button>
            <button onClick={onOpenReviews} className="dt-btn ghost lg">Read this week's reviews</button>
          </div>
        </div>
        <div onClick={()=>onOpenRecipe(featured.id)} style={{cursor:'pointer'}}>
          <div className="dt-hero-photo">
            <Photo tint={featured.tint} style={{position:'absolute',inset:0}}/>
            <div className="dt-hero-photo-tag">
              <span className="dt-chip accent" style={{height:28,fontSize:12}}>Editor's pick</span>
              <span className="dt-chip" style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1px solid rgba(255,255,255,0.25)',height:28,fontSize:12}}>{featured.cuisine}</span>
            </div>
            <div className="photo-label"><span>{featured.title.toLowerCase()}</span><span style={{opacity:0.5}}>[photo]</span></div>
            <div className="dt-hero-photo-content">
              <h2 className="dt-serif" style={{fontSize:38,margin:'0 0 12px',maxWidth:480,lineHeight:1.05,letterSpacing:'-0.02em'}}>{featured.title}</h2>
              <div style={{display:'flex',alignItems:'center',gap:18,fontSize:14,opacity:0.95}}>
                <span style={{display:'flex',alignItems:'center',gap:6}}><Icon.clock/> {featured.minutes} min</span>
                <span style={{display:'flex',alignItems:'center',gap:6}}><Icon.bowl/> Serves {featured.servings}</span>
                <span style={{display:'flex',alignItems:'center',gap:8}}><Stars value={featured.rating} size={12}/> {featured.rating} <span style={{opacity:0.7}}>({featured.reviews})</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dt-stats">
        {[{num:'1,240+',label:'Recipes from 84 cooks'},{num:'3×',label:'Home-kitchen tested'},{num:'32',label:'Cuisines covered'},{num:'4.9 ★',label:'Across 18,000 reviews'}].map(s=>(
          <div key={s.label}><h3 className="dt-stat-num">{s.num}</h3><div style={{fontSize:13,color:'var(--ink-mute)'}}>{s.label}</div></div>
        ))}
      </section>

      {/* Featured rail */}
      <section className="dt-section">
        <div className="dt-section-head">
          <div><div className="dt-eyebrow" style={{marginBottom:6}}>This week</div><h2 className="dt-section-title">Hand-picked, freshly tested.</h2></div>
          <button className="dt-btn ghost sm">View all →</button>
        </div>
        <div className="dt-featured-grid">
          <div onClick={()=>onOpenRecipe(rail[0].id)} className="dt-feature-card large">
            <Photo tint={rail[0].tint} label={rail[0].cuisine.toLowerCase()}/>
            <div style={{marginTop:18,display:'flex',gap:6}}>
              <span className="dt-chip ghost" style={{height:26,fontSize:11}}>{rail[0].cuisine}</span>
              <span className="dt-chip ghost" style={{height:26,fontSize:11}}>{rail[0].category}</span>
            </div>
            <h3>{rail[0].title}</h3>
            <div className="dt-feature-meta"><Icon.clock/> {rail[0].minutes} min<span className="dot"/><Stars value={rail[0].rating} size={11}/> {rail[0].rating}<span className="dot"/>{rail[0].difficulty}</div>
          </div>
          {rail.slice(1).map(r=>(
            <div key={r.id} onClick={()=>onOpenRecipe(r.id)} className="dt-feature-card small">
              <Photo tint={r.tint} label={r.cuisine.toLowerCase()}/>
              <div style={{marginTop:14,display:'flex',gap:6}}><span className="dt-chip ghost" style={{height:24,fontSize:11}}>{r.cuisine}</span></div>
              <h3>{r.title}</h3>
              <div className="dt-feature-meta"><Icon.clock/> {r.minutes}m<span className="dot"/><Stars value={r.rating} size={11}/> {r.rating}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Library list + sidebar */}
      <section className="dt-list-grid">
        <div>
          <div className="dt-section-head" style={{marginBottom:12}}><h2 className="dt-section-title">The library</h2></div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
            {CATEGORIES.map(c=><button key={c} className={`dt-chip ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}
          </div>
          <div className="dt-recipe-rows">
            {listShown.map(r=>(
              <div key={r.id} className="dt-recipe-row" onClick={()=>onOpenRecipe(r.id)}>
                <Photo tint={r.tint}/>
                <div style={{minWidth:0}}>
                  <div className="dt-tags-row">
                    <span className="dt-eyebrow" style={{color:'var(--orange)'}}>{r.cuisine}</span>
                    <span className="dot"/><span className="dt-eyebrow">{r.category}</span>
                  </div>
                  <h4>{r.title}</h4>
                  <div className="dt-recipe-row-meta">
                    by <strong style={{color:'var(--ink)'}}>{r.author}</strong>
                    <span className="dot"/><Icon.clock/> {r.minutes} min
                    <span className="dot"/><Stars value={r.rating} size={11}/> {r.rating}
                    <span style={{color:'var(--ink-mute)'}}>({r.reviews})</span>
                    <span className="dot"/>{r.difficulty}
                  </div>
                </div>
                <div style={{color:'var(--ink-mute)',fontSize:20}}>→</div>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="dt-side-card" style={{marginTop:0}}>
            <h4>Filter by mood</h4>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {['cozy','showstopper','weeknight','crowd-pleaser','one-pan','date night','fridge clean-out','meal-prep'].map(t=><span key={t} className="dt-chip ghost">{t}</span>)}
            </div>
          </div>
          <div className="dt-side-card">
            <h4>Trending this week</h4>
            {[RECIPES[2],RECIPES[6],RECIPES[1]].map((r,i)=>(
              <div key={r.id} onClick={()=>onOpenRecipe(r.id)} style={{display:'flex',gap:12,cursor:'pointer',padding:'12px 0',borderBottom:i<2?'1px solid var(--line-soft)':'none',alignItems:'center'}}>
                <div style={{fontFamily:'var(--display)',fontSize:22,fontStyle:'italic',color:'var(--orange)',fontWeight:500,width:24,flexShrink:0}}>{i+1}</div>
                <Photo tint={r.tint} style={{width:56,height:56,borderRadius:10,flexShrink:0}}/>
                <div style={{minWidth:0}}>
                  <div className="dt-serif" style={{fontSize:15,lineHeight:1.25}}>{r.title}</div>
                  <div style={{fontSize:11,color:'var(--ink-mute)',marginTop:4}}>{r.cuisine} · {r.minutes}m</div>
                </div>
              </div>
            ))}
          </div>
          <div className="dt-side-card" style={{background:'var(--navy)',color:'var(--cream)',borderColor:'var(--navy)',cursor:'pointer'}} onClick={()=>onOpenTranslator(null)}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
              <span style={{color:'var(--orange)'}}><Icon.sparkle/></span>
              <span className="dt-eyebrow" style={{color:'var(--orange)'}}>Chef Tool</span>
            </div>
            <h4 style={{color:'var(--cream)',margin:'0 0 8px'}}>Need a recipe to flex?</h4>
            <p style={{fontSize:13.5,lineHeight:1.55,color:'rgba(250,245,236,0.7)',margin:'0 0 14px'}}>Any recipe on the site can be reshaped for allergies, servings, pantry, or a different cuisine in seconds.</p>
            <span style={{fontSize:13,fontWeight:600,color:'var(--orange)'}}>How it works →</span>
          </div>
        </aside>
      </section>

      {/* Reviews teaser */}
      <section className="dt-section" style={{paddingBottom:0}}>
        <div className="dt-section-head">
          <div><div className="dt-eyebrow" style={{marginBottom:6}}>Restaurant reviews</div><h2 className="dt-section-title">From the field this week.</h2></div>
          <button onClick={onOpenReviews} className="dt-btn ghost sm">All reviews →</button>
        </div>
        <div className="dt-featured-grid">
          {reviewsTeaser.map((r,i)=>(
            <div key={r.id} onClick={onOpenReviews} className={`dt-feature-card ${i===0?'large':'small'}`}>
              <Photo tint={r.tint} label={r.name.toLowerCase()}/>
              <div style={{marginTop:i===0?18:14,display:'flex',gap:6,alignItems:'center'}}>
                <span className="dt-chip ghost" style={{height:24,fontSize:11}}>{r.cuisine}</span>
                <span style={{fontSize:11,color:'var(--ink-mute)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600}}>{r.city}</span>
              </div>
              <h3>{r.name}</h3>
              <p style={{fontSize:14,lineHeight:1.55,color:'var(--ink-soft)',margin:'4px 0 12px'}}>"{r.headline}"</p>
              <div className="dt-feature-meta">
                <span style={{padding:'3px 8px',background:'var(--navy)',color:'var(--orange)',borderRadius:6,fontFamily:'var(--mono)',fontWeight:600,fontSize:11}}>{r.rating.toFixed(1)}</span>
                <span>{r.price}</span><span className="dot"/><span>by {r.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer onOpenReviews={onOpenReviews} onOpenTranslator={onOpenTranslator}/>
    </React.Fragment>
  );
}

// RECIPE PAGE
function Recipe({ recipeId, onBack, onOpenTranslator }) {
  const recipe=RECIPES.find(r=>r.id===recipeId)||RECIPES[0];
  const [servings,setServings]=React.useState(recipe.servings||4);
  const [checked,setChecked]=React.useState({});
  const toggle=i=>setChecked(c=>({...c,[i]:!c[i]}));
  const has=!!recipe.ingredients;

  return (
    <React.Fragment>
      <div style={{padding:'24px 56px 0',display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--ink-mute)'}}>
        <a onClick={onBack} style={{cursor:'pointer'}}>Recipes</a><span>/</span>
        <span>{recipe.cuisine}</span><span>/</span>
        <span style={{color:'var(--ink)'}}>{recipe.category}</span>
      </div>

      <div className="dt-recipe-hero" style={{marginTop:24}}>
        <Photo tint={recipe.tint} label={recipe.title.toLowerCase()} style={{position:'absolute',inset:0}}/>
        <div className="dt-recipe-hero-content">
          <div style={{display:'flex',gap:8,marginBottom:6}}>
            <span className="dt-chip accent" style={{height:28,fontSize:12}}>Editor's pick</span>
            <span className="dt-chip" style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1px solid rgba(255,255,255,0.25)',height:28,fontSize:12}}>{recipe.cuisine}</span>
            <span className="dt-chip" style={{background:'rgba(255,255,255,0.15)',color:'#fff',border:'1px solid rgba(255,255,255,0.25)',height:28,fontSize:12}}>{recipe.category}</span>
          </div>
          <h1 className="dt-recipe-hero-title">{recipe.title}</h1>
          <div style={{display:'flex',alignItems:'center',gap:18,fontSize:14,opacity:0.95}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:28,height:28,borderRadius:99,background:'var(--orange)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{recipe.author.split(' ').map(p=>p[0]).join('')}</div>
              <span>by <strong style={{fontWeight:600}}>{recipe.author}</strong></span>
            </div>
            <span style={{display:'flex',alignItems:'center',gap:8}}><Stars value={recipe.rating} size={12}/> {recipe.rating} <span style={{opacity:0.7}}>({recipe.reviews} reviews)</span></span>
          </div>
        </div>
      </div>

      <div className="dt-recipe-body">
        <div className="dt-recipe-main">
          <p className="desc" style={{margin:0}}>{recipe.description||'A weeknight favorite from the Hungry Guru library.'}</p>
          <div className="dt-recipe-meta-row">
            {[{label:<><Icon.clock/> Active</>,val:`${Math.max(15,recipe.minutes-10)} min`},{label:<><Icon.clock/> Total</>,val:`${recipe.minutes} min`},{label:<><Icon.bowl/> Serves</>,val:servings},{label:<><Icon.flame/> Skill</>,val:recipe.difficulty},{label:<><Icon.fork/> Cuisine</>,val:recipe.cuisine}].map((m,i)=>(
              <div key={i} className="dt-recipe-meta-col">
                <span className="dt-recipe-meta-label">{m.label}</span>
                <span className="dt-recipe-meta-value">{m.val}</span>
              </div>
            ))}
          </div>

          <button onClick={()=>onOpenTranslator(recipe.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:16,background:'var(--orange-tint)',border:'1px solid #f6c8a8',borderRadius:18,padding:'16px 20px',textAlign:'left',cursor:'pointer',marginBottom:32}}>
            <div style={{width:44,height:44,borderRadius:12,background:'var(--orange)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon.sparkle/></div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:'var(--ink)'}}>Reshape this recipe with the Chef Tool</div>
              <div style={{fontSize:13,color:'var(--ink-soft)'}}>Vegan, gluten-free, halved, dairy-free, Thai-style — your call.</div>
            </div>
            <div style={{color:'var(--orange)',fontWeight:700,fontSize:14}}>Open →</div>
          </button>

          <h2 className="sub" style={{marginTop:0}}>Watch it come together</h2>
          <div className="dt-video-card">
            <Photo tint={recipe.tint} style={{position:'absolute',inset:0}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(14,26,47,0.2) 0%,rgba(14,26,47,0.55) 100%)',zIndex:2}}/>
            <div className="dt-video-play"><div className="dt-video-play-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8V4z"/></svg></div></div>
            <div className="dt-video-meta"><span style={{padding:'4px 10px',borderRadius:99,background:'rgba(14,26,47,0.55)'}}>4:12</span><span>with {recipe.author}</span></div>
          </div>
          <div style={{fontSize:13,color:'var(--ink-mute)',marginTop:12}}>Optional. The written recipe below has everything you need.</div>

          <h2 className="sub">Method</h2>
          {has ? recipe.steps.map((s,i)=>(
            <div key={i} className="dt-step"><div className="dt-step-num">{String(i+1).padStart(2,'0')}</div><p>{s}</p></div>
          )) : <p style={{fontSize:16,color:'var(--ink-mute)'}}>Full instructions coming soon.</p>}

          {recipe.notes && (
            <React.Fragment>
              <h2 className="sub">Guru's note</h2>
              <div style={{background:'var(--navy)',color:'var(--cream)',borderRadius:18,padding:'26px 28px'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,color:'var(--orange)'}}><Icon.sparkle/><span className="dt-eyebrow" style={{color:'var(--orange)'}}>Tip from {recipe.author}</span></div>
                <p style={{margin:0,fontSize:16,lineHeight:1.65,color:'rgba(250,245,236,0.9)'}}>{recipe.notes}</p>
              </div>
            </React.Fragment>
          )}
        </div>

        <aside className="dt-side-stick">
          <div className="dt-side-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h4 style={{margin:0}}>Ingredients</h4>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:12,color:'var(--ink-mute)'}}>Serves</span>
                <div className="dt-stepper">
                  <button onClick={()=>setServings(s=>Math.max(1,s-1))}>−</button>
                  <span className="val">{servings}</span>
                  <button onClick={()=>setServings(s=>s+1)}>+</button>
                </div>
              </div>
            </div>
            {has ? (
              <ul className="ing-list">
                {recipe.ingredients.map((ing,i)=>(
                  <li key={i} className={`ing-row ${checked[i]?'checked':''}`} onClick={()=>toggle(i)} style={{cursor:'pointer'}}>
                    <span className={`ing-check ${checked[i]?'on':''}`}>{checked[i]&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span>
                    <span className="ing-qty">{scaleQty(ing.qty,servings/recipe.servings)}</span>
                    <span className="ing-name">{ing.item}</span>
                  </li>
                ))}
              </ul>
            ) : <p style={{fontSize:14,color:'var(--ink-mute)'}}>Coming soon.</p>}
            <button onClick={()=>onOpenTranslator(recipe.id)} className="dt-btn primary" style={{width:'100%',marginTop:18}}><Icon.sparkle/> Open Chef Tool</button>
            <button className="dt-btn ghost" style={{width:'100%',marginTop:10}}><Icon.bookmark style={{width:16,height:16}}/> Save to my book</button>
          </div>
          <div className="dt-side-card">
            <h4>Pairings</h4>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {RECIPES.slice(1,4).map(r=>(
                <div key={r.id} style={{display:'flex',gap:12,cursor:'pointer'}}>
                  <Photo tint={r.tint} style={{width:64,height:64,borderRadius:10,flexShrink:0}}/>
                  <div style={{minWidth:0}}>
                    <div className="dt-serif" style={{fontSize:14,lineHeight:1.25}}>{r.title}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)',marginTop:4,display:'flex',alignItems:'center',gap:4}}><Icon.clock/> {r.minutes}m · {r.difficulty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
}

// TRANSLATOR PAGE
const DT_DIETARY=['Vegan','Vegetarian','Pescatarian','Dairy-free','Gluten-free','Keto','Paleo','Low-FODMAP'];
const DT_ALLERGIES=['Peanuts','Tree nuts','Shellfish','Eggs','Soy','Wheat','Sesame','Fish'];
const DT_CUISINES=['Keep as-is','Thai','Mexican','Japanese','Korean','Indian','Moroccan','French'];
const DT_EQUIPMENT=['No oven','No stand mixer','Instant Pot','Air fryer','Single skillet only','Microwave only'];
const DT_SKILLS=['Beginner','Comfortable','Pro'];

// ── Chef Tool design tokens (matching chef-tool.html) ────────────────────────
const CT = {
  card:     { background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:22, boxShadow:'0 10px 26px rgba(0,0,0,.09)', overflow:'hidden' },
  section:  { padding:'14px 16px', borderBottom:'1px solid rgba(14,26,47,.08)' },
  sectionLast: { padding:'14px 16px' },
  labelRow: { display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, marginBottom:8 },
  label:    { fontWeight:700, letterSpacing:'-0.01em', fontSize:13, color:'#0b1220' },
  hint:     { fontSize:12, color:'#666' },
  chip: (active) => ({
    display:'inline-flex', alignItems:'center', gap:6, padding:'7px 10px',
    borderRadius:999, cursor:'pointer', fontSize:12, fontWeight:600, letterSpacing:'-0.01em',
    border: active ? '1px solid rgba(240,99,28,.34)' : '1px solid rgba(14,26,47,.10)',
    background: active ? 'rgba(240,99,28,.12)' : 'rgba(250,245,236,.78)',
    color: active ? '#f0631c' : '#1a305c',
    boxShadow: active ? '0 8px 20px rgba(240,99,28,.10)' : 'none',
    transform: active ? 'translateY(-1px)' : 'none',
    transition:'all .16s ease',
  }),
  kicker: { display:'inline-flex', alignItems:'center', gap:8, padding:'6px 10px', borderRadius:999, background:'rgba(14,26,47,.06)', border:'1px solid rgba(14,26,47,.08)', color:'#142647', fontSize:12, fontWeight:600, letterSpacing:'-0.01em', marginBottom:12 },
  resultGroup: { background:'rgba(255,255,255,.88)', border:'1px solid rgba(14,26,47,.10)', borderRadius:18, boxShadow:'0 8px 22px rgba(0,0,0,.07)', overflow:'hidden' },
  resultItem: (last) => ({ padding:'12px 16px', borderBottom: last ? 'none' : '1px solid rgba(14,26,47,.08)', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, fontSize:13, lineHeight:1.3, color:'#161616' }),
  pill: { fontFamily:'var(--mono)', fontSize:11, fontWeight:800, color:'#8a8a8a', padding:'5px 8px', borderRadius:999, background:'rgba(255,255,255,.80)', border:'1px solid rgba(14,26,47,.10)', flexShrink:0, userSelect:'none' },
};

function CTChip({ label, active, onClick }) {
  return (
    <button style={CT.chip(active)} onClick={onClick}>
      {active && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      {label}
    </button>
  );
}

function ResultGroup({ title, hint, children }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:10,marginBottom:8,padding:'0 2px'}}>
        <h3 style={{margin:0,fontWeight:800,letterSpacing:'-0.02em',fontSize:14,color:'#0b1220',display:'flex',alignItems:'center',gap:8}}>{title}</h3>
        {hint && <span style={{fontSize:12,color:'#666'}}>{hint}</span>}
      </div>
      <div style={CT.resultGroup}>{children}</div>
    </div>
  );
}

function Translator({ recipeId, onBack }) {
  const recipe=RECIPES.find(r=>r.id===recipeId)||RECIPES[0];
  const [phase,setPhase]=React.useState('config');
  const [servings,setServings]=React.useState(6);
  const [diet,setDiet]=React.useState(new Set(['Vegan','Gluten-free']));
  const [allergies,setAllergies]=React.useState(new Set());
  const [cuisine,setCuisine]=React.useState('Keep as-is');
  const [time,setTime]=React.useState(30);
  const [skill,setSkill]=React.useState('Beginner');
  const [equipment,setEquipment]=React.useState(new Set(['Single skillet only']));
  const [pantry,setPantry]=React.useState('');
  const tog=(set,setter,val)=>{const n=new Set(set);if(n.has(val))n.delete(val);else n.add(val);setter(n);};
  const translated=buildTranslation();
  const onTranslate=()=>{setPhase('translating');setTimeout(()=>setPhase('result'),2400);};

  return (
    <div className="dt-translator">
      {/* Left: original recipe — unchanged */}
      <div className="dt-translator-left">
        <div style={{fontSize:13,color:'var(--ink-mute)'}}><a onClick={onBack} style={{cursor:'pointer'}}>← Back to recipe</a></div>
        <div>
          <div className="dt-eyebrow">Original</div>
          <h1 className="dt-serif" style={{fontSize:36,lineHeight:1.05,margin:'8px 0 16px',letterSpacing:'-0.02em'}}>{recipe.title}</h1>
          <div style={{display:'flex',alignItems:'center',gap:14,fontSize:13,color:'var(--ink-soft)',flexWrap:'wrap'}}>
            <span>by <strong>{recipe.author}</strong></span>
            <span className="dot"/><span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon.clock/> {recipe.minutes} min</span>
            <span className="dot"/><span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon.bowl/> Serves {recipe.servings}</span>
            <span className="dot"/><span>{recipe.difficulty}</span>
          </div>
        </div>
        <div className="dt-summary-card">
          <div className="dt-summary-photo"><Photo tint={recipe.tint} label={recipe.title.toLowerCase()} style={{position:'absolute',inset:0}}/></div>
          <div className="dt-summary-body">
            <h4 className="dt-serif" style={{fontSize:18,margin:'0 0 12px'}}>Original ingredients</h4>
            <ul style={{listStyle:'none',margin:0,padding:0}}>
              {recipe.ingredients&&recipe.ingredients.map((ing,i)=>(
                <li key={i} style={{display:'grid',gridTemplateColumns:'80px 1fr',alignItems:'baseline',gap:12,padding:'8px 0',borderBottom:i<recipe.ingredients.length-1?'1px solid var(--line-soft)':'none',fontSize:14}}>
                  <span className="dt-mono" style={{color:'var(--orange)',fontWeight:600,fontSize:12}}>{ing.qty}</span><span>{ing.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {(phase==='result'||phase==='translating')&&recipe.steps&&(
          <div className="dt-side-card" style={{marginTop:0}}>
            <h4 className="dt-serif" style={{fontSize:18,margin:'0 0 12px'}}>Original method</h4>
            {recipe.steps.map((s,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'32px 1fr',gap:12,padding:'12px 0',borderBottom:i<recipe.steps.length-1?'1px solid var(--line-soft)':'none'}}>
                <span className="dt-serif" style={{fontSize:18,color:'var(--ink-mute)',fontStyle:'italic',fontWeight:500}}>{i+1}</span>
                <p style={{margin:0,fontSize:13.5,lineHeight:1.5,color:'var(--ink-soft)'}}>{s}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: redesigned config / loading / result */}
      <div className="dt-translator-right">
        {phase==='config'&&(
          <div className="fadeInUp" style={{display:'flex',flexDirection:'column',gap:0}}>

            {/* ── Hero ── */}
            <div style={{marginBottom:22}}>
              <div style={CT.kicker}>
                <Icon.sparkle style={{width:14,height:14}}/>
                Chef Tool
              </div>
              <h1 className="dt-serif" style={{fontSize:38,fontWeight:800,letterSpacing:'-0.05em',lineHeight:.97,margin:'0 0 10px',color:'#0b1220'}}>Tell the guru<br/>how to bend it.</h1>
              <p style={{fontSize:14,color:'#515151',lineHeight:1.45,margin:0}}>Rewrite ingredients, swap substitutions, scale the recipe, and re-flow the steps — in one tap.</p>
            </div>

            {/* ── Config card ── */}
            <div style={CT.card}>

              {/* Servings */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Servings</span>
                  <span style={CT.hint}>
                    {servings>recipe.servings?`↑ ${servings-recipe.servings} more`:servings<recipe.servings?`↓ ${recipe.servings-servings} fewer`:'matches original'}
                  </span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div className="dt-stepper" style={{height:40}}>
                    <button style={{width:40,height:40}} onClick={()=>setServings(s=>Math.max(1,s-1))}>−</button>
                    <span className="val" style={{fontSize:15,minWidth:32}}>{servings}</span>
                    <button style={{width:40,height:40}} onClick={()=>setServings(s=>s+1)}>+</button>
                  </div>
                </div>
              </div>

              {/* Dietary style */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Dietary style</span>
                  <span style={CT.hint}>Pick any that apply</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {DT_DIETARY.map(item=><CTChip key={item} label={item} active={diet.has(item)} onClick={()=>tog(diet,setDiet,item)}/>)}
                </div>
              </div>

              {/* Allergies */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Allergies &amp; avoid</span>
                  <span style={CT.hint}>Routed around in every swap</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {DT_ALLERGIES.map(item=><CTChip key={item} label={item} active={allergies.has(item)} onClick={()=>tog(allergies,setAllergies,item)}/>)}
                </div>
              </div>

              {/* Cuisine remix */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Cuisine remix</span>
                  <span style={CT.hint}>Reinterpret through another tradition</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {DT_CUISINES.map(c=><CTChip key={c} label={c} active={cuisine===c} onClick={()=>setCuisine(c)}/>)}
                </div>
              </div>

              {/* Time cap + Skill */}
              <div style={{...CT.section,display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:18,alignItems:'start'}}>
                <div>
                  <div style={CT.labelRow}>
                    <span style={CT.label}>Time cap</span>
                    <span style={CT.hint}>original: {recipe.minutes}m</span>
                  </div>
                  <div style={{fontFamily:'var(--mono)',fontSize:28,fontWeight:700,color:'#161616',lineHeight:1,marginBottom:10}}>{time}<span style={{fontSize:14,fontWeight:500,color:'#8a8a8a',marginLeft:4}}>min</span></div>
                  <input type="range" min="15" max="180" step="5" value={time} onChange={e=>setTime(Number(e.target.value))} style={{width:'100%',accentColor:'#f0631c'}}/>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#aeaeae',marginTop:4}}><span>15m</span><span>60m</span><span>180m</span></div>
                </div>
                <div>
                  <div style={{...CT.labelRow,marginBottom:10}}>
                    <span style={CT.label}>Skill level</span>
                  </div>
                  <div className="dt-segmented">{DT_SKILLS.map(s=><button key={s} className={skill===s?'active':''} onClick={()=>setSkill(s)}>{s}</button>)}</div>
                </div>
              </div>

              {/* Kitchen constraints */}
              <div style={CT.section}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Kitchen constraints</span>
                  <span style={CT.hint}>Anything you're working without?</span>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {DT_EQUIPMENT.map(item=><CTChip key={item} label={item} active={equipment.has(item)} onClick={()=>tog(equipment,setEquipment,item)}/>)}
                </div>
              </div>

              {/* Pantry notes */}
              <div style={CT.sectionLast}>
                <div style={CT.labelRow}>
                  <span style={CT.label}>Pantry notes</span>
                  <span style={CT.hint}>What you have or want to use up</span>
                </div>
                <textarea
                  style={{width:'100%',minHeight:88,resize:'vertical',borderRadius:14,border:'1px solid rgba(14,26,47,.14)',background:'rgba(250,245,236,.55)',padding:'10px 12px',outline:'none',fontFamily:'var(--body)',fontSize:13.5,lineHeight:1.45,color:'#161616',transition:'border-color .18s ease,box-shadow .18s ease,background .18s ease'}}
                  placeholder="e.g. I have arborio rice but no tagliatelle, half a lemon, and some leftover white miso..."
                  value={pantry}
                  onChange={e=>setPantry(e.target.value)}
                  onFocus={e=>{e.target.style.borderColor='rgba(240,99,28,.40)';e.target.style.boxShadow='0 0 0 4px rgba(240,99,28,.10)';e.target.style.background='rgba(255,255,255,.88)';}}
                  onBlur={e=>{e.target.style.borderColor='rgba(14,26,47,.14)';e.target.style.boxShadow='none';e.target.style.background='rgba(250,245,236,.55)';}}
                />
              </div>
            </div>

            {/* ── CTA ── */}
            <button
              onClick={onTranslate}
              style={{marginTop:14,width:'100%',border:'none',outline:'none',borderRadius:18,padding:'14px 14px',display:'flex',alignItems:'center',justifyContent:'center',gap:10,fontFamily:'var(--body)',fontWeight:700,letterSpacing:'-0.01em',fontSize:15,color:'white',cursor:'pointer',position:'relative',overflow:'hidden',background:'linear-gradient(135deg,#f0631c,#ff8a3d 45%,#f9a849 100%)',boxShadow:'0 18px 40px rgba(240,99,28,.24)',transition:'transform .18s ease,box-shadow .18s ease'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 22px 55px rgba(240,99,28,.28)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 18px 40px rgba(240,99,28,.24)';}}
            >
              <div style={{position:'absolute',inset:0,background:'radial-gradient(120px 60px at 22% 12%,rgba(255,255,255,.55),transparent 60%)',opacity:.9,pointerEvents:'none'}}/>
              <Icon.sparkle style={{position:'relative',zIndex:1,width:18,height:18}}/>
              <span style={{position:'relative',zIndex:1}}>Reshape recipe</span>
            </button>
          </div>
        )}

        {phase==='translating'&&<Translating/>}
        {phase==='result'&&<Result translated={translated} servings={servings} diet={[...diet]} time={time} skill={skill} cuisine={cuisine} onRevise={()=>setPhase('config')}/>}
      </div>
    </div>
  );
}

function Translating() {
  const steps=['Parsing original ingredients…','Mapping substitutions for your diet…','Rescaling quantities for your servings…','Compressing steps into your time cap…','Re-checking flavor balance…'];
  const [active,setActive]=React.useState(0);
  React.useEffect(()=>{const t=setInterval(()=>setActive(a=>Math.min(a+1,steps.length-1)),480);return()=>clearInterval(t);},[]);
  return (
    <div className="fadeInUp" style={{padding:'52px 16px',display:'flex',flexDirection:'column',alignItems:'center',gap:32}}>

      {/* Spinner ring */}
      <div style={{position:'relative',width:84,height:84}}>
        <div className="dt-spin" style={{position:'absolute',inset:0,borderRadius:'50%',background:'conic-gradient(#f0631c,transparent 65%)',WebkitMask:'radial-gradient(closest-side,transparent 73%,#000 75%)',mask:'radial-gradient(closest-side,transparent 73%,#000 75%)'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#f0631c'}}>
          <Icon.sparkle style={{width:32,height:32}}/>
        </div>
      </div>

      {/* Title */}
      <div style={{textAlign:'center'}}>
        <h2 style={{fontFamily:'var(--display)',fontSize:28,fontWeight:800,letterSpacing:'-0.04em',lineHeight:.97,margin:'0 0 8px',color:'#0b1220'}}>Reshaping your recipe</h2>
        <p style={{fontSize:13,color:'#8a8a8a',margin:0}}>This usually takes about 8 seconds.</p>
      </div>

      {/* Progress steps */}
      <div style={{width:'100%',maxWidth:400,display:'flex',flexDirection:'column',gap:10}}>
        {steps.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,fontSize:13,color:i<=active?'#161616':'#aeaeae',opacity:i<=active?1:0.5,transition:'opacity 220ms ease,color 220ms ease'}}>
            <span style={{width:22,height:22,borderRadius:99,border:'1.5px solid',borderColor:i<=active?'#f0631c':'rgba(14,26,47,.14)',background:i<active?'#f0631c':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 220ms ease'}}>
              {i<active&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {i===active&&<span style={{width:7,height:7,borderRadius:99,background:'#f0631c'}}/>}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function Result({ translated, servings, diet, time, skill, cuisine, onRevise }) {
  return (
    <div className="fadeInUp" style={{display:'flex',flexDirection:'column',gap:0}}>

      {/* ── Header ── */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
        <div>
          <div style={CT.kicker}>
            <Icon.sparkle style={{width:14,height:14}}/>
            Reshaped
          </div>
          <h1 className="dt-serif" style={{fontSize:36,lineHeight:1.05,margin:0,letterSpacing:'-0.03em',color:'#0b1220'}}>Your version</h1>
        </div>
        <div style={{display:'flex',gap:8,flexShrink:0}}>
          <button onClick={onRevise} className="dt-btn ghost sm">Revise</button>
          <button className="dt-btn dark sm"><Icon.bookmark style={{width:14,height:14}}/> Save</button>
          <button className="dt-btn dark sm"><Icon.share style={{width:14,height:14}}/> Share</button>
        </div>
      </div>

      {/* ── Summary tags ── */}
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:18}}>
        {diet.map(d=>(
          <span key={d} style={{display:'inline-flex',alignItems:'center',padding:'7px 10px',borderRadius:999,background:'rgba(240,99,28,.10)',border:'1px solid rgba(240,99,28,.22)',color:'#f0631c',fontSize:12,fontWeight:700}}>{d}</span>
        ))}
        {[`${servings} servings`,`${time} min cap`,skill,...(cuisine!=='Keep as-is'?[`${cuisine} remix`]:[])].map(t=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',padding:'7px 10px',borderRadius:999,background:'rgba(14,26,47,.06)',border:'1px solid rgba(14,26,47,.10)',color:'#1a305c',fontSize:12,fontWeight:600}}>{t}</span>
        ))}
      </div>

      {/* ── Guru's notes ── */}
      <div style={{background:'#0e1a2f',borderRadius:22,padding:'20px 22px',marginBottom:18}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
          <Icon.sparkle style={{color:'#f0631c',width:16,height:16}}/>
          <span style={{fontSize:11,fontWeight:800,letterSpacing:'0.07em',textTransform:'uppercase',color:'#f0631c'}}>Guru's notes</span>
        </div>
        <p style={{margin:0,fontSize:14,lineHeight:1.6,color:'rgba(250,245,236,.88)'}}>
          Kept the brown-butter soul of the dish, swapped the dairy and gluten, scaled to {servings}, and trimmed it into a single skillet flow that fits in {time} minutes.
        </p>
      </div>

      {/* ── What changed ── */}
      <ResultGroup title="What changed" hint={`${translated.changes.length} changes`}>
        {translated.changes.map((c,i)=>(
          <div key={i} style={{display:'flex',gap:14,padding:'14px 16px',borderBottom:i<translated.changes.length-1?'1px solid rgba(14,26,47,.08)':'none'}}>
            <span style={{width:24,height:24,borderRadius:999,background:'rgba(240,99,28,.10)',color:'#f0631c',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</span>
            <p style={{margin:0,fontSize:13.5,lineHeight:1.55,color:'#161616'}}>{c}</p>
          </div>
        ))}
      </ResultGroup>

      {/* ── Reshaped ingredients ── */}
      <ResultGroup title="Reshaped ingredients" hint={`${translated.ingredients.length} items`}>
        {translated.ingredients.map((ing,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'88px 1fr',gap:12,alignItems:'baseline',padding:'12px 16px',borderBottom:i<translated.ingredients.length-1?'1px solid rgba(14,26,47,.08)':'none',fontSize:13.5}}>
            <span style={{fontFamily:'var(--mono)',color:'#f0631c',fontWeight:700,fontSize:12}}>{ing.qty}</span>
            <div style={{lineHeight:1.4}}>
              {ing.isNew&&<span className="diff-add-dot"/>}
              {ing.item.map((sp,j)=>{
                if(sp.kind==='rm')  return <span key={j} className="diff-removed">{sp.text}</span>;
                if(sp.kind==='add') return <span key={j} className="diff-added">{sp.text}</span>;
                return <span key={j}>{sp.text}</span>;
              })}
            </div>
          </div>
        ))}
      </ResultGroup>

      {/* ── Reshaped method ── */}
      <ResultGroup title="Reshaped method" hint={`${translated.steps.length} steps`}>
        {translated.steps.map((s,i)=>{
          const parts=s.split(/(\[[^\]]+\])/g).map((p,j)=>{
            if(p.startsWith('[')&&p.endsWith(']')) return <span key={j} className="diff-added">{p.slice(1,-1)}</span>;
            return <span key={j}>{p}</span>;
          });
          return (
            <div key={i} style={{display:'grid',gridTemplateColumns:'38px 1fr',gap:10,padding:'12px 16px',borderBottom:i<translated.steps.length-1?'1px solid rgba(14,26,47,.08)':'none',alignItems:'start'}}>
              <span style={{fontFamily:'var(--display)',fontSize:20,color:'rgba(14,26,47,.22)',fontStyle:'italic',fontWeight:500,lineHeight:1.1}}>{i+1}</span>
              <p style={{margin:0,fontSize:13.5,lineHeight:1.55,color:'#3d3d3d'}}>{parts}</p>
            </div>
          );
        })}
      </ResultGroup>

      <div className="dt-sticky-cta">
        <button onClick={onRevise} className="dt-btn ghost lg" style={{flex:1}}>Revise</button>
        <button className="dt-btn primary lg" style={{flex:1}}><Icon.bookmark style={{width:16,height:16}}/> Save to my book</button>
      </div>
    </div>
  );
}

// REVIEWS PAGE
function ReviewScore({ value, small=false }) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:'var(--mono)',fontWeight:600,fontSize:small?12:13,color:'var(--ink)'}}>
      <span style={{width:small?22:26,height:small?22:26,borderRadius:7,background:'var(--navy)',color:'var(--orange)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:small?11:12,fontWeight:700}}>{value.toFixed(1)}</span>
      <span style={{color:'var(--ink-mute)',fontWeight:400}}>/ 5</span>
    </span>
  );
}

function ReviewCard({ review: r }) {
  return (
    <article className="dt-review-card">
      <Photo tint={r.tint} label={r.name.toLowerCase()} style={{height:240,borderRadius:'18px 18px 0 0'}}/>
      <div style={{padding:24}}>
        <div className="dt-eyebrow" style={{marginBottom:6}}>{r.city}</div>
        <h3 className="dt-serif" style={{fontSize:26,lineHeight:1.1,margin:'4px 0 8px',letterSpacing:'-0.015em'}}>{r.name}</h3>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14,fontSize:12,color:'var(--ink-mute)'}}>
          <span>{r.cuisine}</span><span className="dot"/><span>{r.price}</span><span className="dot"/><ReviewScore value={r.rating} small/>
        </div>
        <p style={{fontSize:14.5,lineHeight:1.55,color:'var(--ink-soft)',margin:'0 0 16px'}}>{r.excerpt}</p>
        <div style={{borderTop:'1px solid var(--line-soft)',paddingTop:14,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <div style={{fontSize:12,color:'var(--ink-mute)'}}><span style={{color:'var(--ink)',fontWeight:500}}>{r.author}</span> · {r.date}</div>
          <div style={{fontSize:12,color:'var(--orange)',fontWeight:600}}>Read →</div>
        </div>
        <div style={{marginTop:14,background:'var(--cream-2)',borderRadius:12,padding:'10px 14px',display:'flex',alignItems:'center',gap:10,fontSize:12}}>
          <span className="dt-eyebrow" style={{color:'var(--orange)'}}>Don't miss</span>
          <span style={{color:'var(--ink)'}}>{r.standout}</span>
        </div>
      </div>
    </article>
  );
}

function Reviews({ onBack }) {
  const [city,setCity]=React.useState('All cities');
  const [sort,setSort]=React.useState('recent');
  let filtered=city==='All cities'?[...REVIEWS]:REVIEWS.filter(r=>r.city===city);
  if(sort==='rating') filtered.sort((a,b)=>b.rating-a.rating);
  const featured=filtered[0], rest=filtered.slice(1);
  return (
    <React.Fragment>
      <section style={{padding:'64px 56px 32px',borderBottom:'1px solid var(--line)'}}>
        <div style={{maxWidth:1120,display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:64,alignItems:'end'}} className="dt-reviews-intro">
          <div>
            <div className="dt-eyebrow">Restaurant Reviews</div>
            <h1 className="dt-serif" style={{fontSize:72,fontWeight:400,letterSpacing:'-0.025em',lineHeight:0.96,margin:'14px 0 0'}}>
              Where we've been,<br/><em style={{color:'var(--orange)'}}>honestly told.</em>
            </h1>
          </div>
          <p style={{fontSize:16,lineHeight:1.65,color:'var(--ink-soft)',margin:0}}>Long-form reviews from our editors and contributing cooks — written after at least two visits, never comped, and always with a recommendation we'd send our closest friend. New entries every Wednesday.</p>
        </div>
        <div style={{marginTop:36,display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',justifyContent:'space-between'}}>
          <div className="dt-chip-grid">{REVIEW_CITIES.map(c=><button key={c} className={`dt-chip ${city===c?'active':''}`} onClick={()=>setCity(c)}>{c}</button>)}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--ink-mute)'}}>
            <span>Sort by</span>
            <div className="dt-segmented" style={{width:'auto'}}>
              <button className={sort==='recent'?'active':''} onClick={()=>setSort('recent')} style={{flex:'none',padding:'0 14px'}}>Most recent</button>
              <button className={sort==='rating'?'active':''} onClick={()=>setSort('rating')} style={{flex:'none',padding:'0 14px'}}>Highest rated</button>
            </div>
          </div>
        </div>
      </section>
      {featured&&(
        <section style={{padding:'48px 56px 16px'}}>
          <div className="dt-review-featured">
            <div className="dt-review-featured-photo"><Photo tint={featured.tint} label={featured.name.toLowerCase()} style={{position:'absolute',inset:0}}/></div>
            <div className="dt-review-featured-body">
              <div style={{display:'flex',gap:8,marginBottom:14}}>
                <span className="dt-chip accent" style={{height:26,fontSize:11}}>This week's pick</span>
                <span className="dt-chip ghost" style={{height:26,fontSize:11}}>{featured.cuisine}</span>
              </div>
              <div className="dt-eyebrow" style={{marginBottom:6}}>{featured.city} · {featured.neighborhood} · {featured.price}</div>
              <h2 className="dt-serif" style={{fontSize:42,lineHeight:1.05,letterSpacing:'-0.02em',margin:'6px 0 18px'}}>{featured.name}</h2>
              <p className="dt-serif" style={{fontSize:22,lineHeight:1.35,color:'var(--ink)',fontStyle:'italic',margin:'0 0 18px'}}>"{featured.headline}"</p>
              <p style={{fontSize:15,lineHeight:1.65,color:'var(--ink-soft)',margin:'0 0 22px',maxWidth:540}}>{featured.excerpt}</p>
              <div style={{display:'flex',alignItems:'center',gap:18,fontSize:13,color:'var(--ink-soft)',marginBottom:24}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:28,height:28,borderRadius:99,background:'var(--orange)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>{featured.author.split(' ').map(p=>p[0]).join('')}</div>
                  <span>by <strong>{featured.author}</strong></span>
                </div>
                <span className="dot"/><span>{featured.date}</span><span className="dot"/><ReviewScore value={featured.rating}/>
              </div>
              <button className="dt-btn dark">Read full review →</button>
            </div>
          </div>
        </section>
      )}
      <section style={{padding:'32px 56px 80px'}}>
        <div className="dt-section-head">
          <h2 className="dt-section-title">More from the field</h2>
          <span style={{fontSize:13,color:'var(--ink-mute)'}}>{rest.length} reviews</span>
        </div>
        <div className="dt-reviews-grid">{rest.map(r=><ReviewCard key={r.id} review={r}/>)}</div>
      </section>
      <Footer/>
    </React.Fragment>
  );
}

// APP SHELL
function App() {
  const [route,setRoute]=React.useState({name:'home'});
  const [search,setSearch]=React.useState('');
  const openRecipe=id=>setRoute({name:'recipe',recipeId:id});
  const openTranslator=id=>setRoute({name:'translator',recipeId:id||'tagliatelle'});
  const openReviews=()=>setRoute({name:'reviews'});
  const goHome=()=>setRoute({name:'home'});
  React.useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[route.name,route.recipeId]);

  return (
    <div className="dt-app">
      <Nav route={route} search={search} setSearch={setSearch} onHome={goHome} onOpenTranslator={()=>openTranslator()} onOpenReviews={openReviews}/>
      <div className="dt-body">
        {route.name==='home'&&<Home onOpenRecipe={openRecipe} onOpenTranslator={openTranslator} onOpenReviews={openReviews}/>}
        {route.name==='recipe'&&<Recipe recipeId={route.recipeId} onBack={goHome} onOpenTranslator={openTranslator}/>}
        {route.name==='translator'&&<Translator recipeId={route.recipeId} onBack={()=>route.recipeId?openRecipe(route.recipeId):goHome()}/>}
        {route.name==='reviews'&&<Reviews onBack={goHome}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
