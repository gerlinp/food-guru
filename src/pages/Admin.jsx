// ─── Admin primitives ─────────────────────────────────────────────────────────

const TINTS = ['t1','t2','t3','t4','t5','t6','t7'];
const TINT_BG = { t1:'#3d4a2a', t2:'#5a3520', t3:'#4a2532', t4:'#2c4250', t5:'#5c4520', t6:'#4d3a55', t7:'#6a4318' };
const DIFFICULTIES = ['Easy','Intermediate','Advanced'];
const PRICES = ['$','$$','$$$','$$$$'];

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function AdminField({ label, hint, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-mute)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</label>
      {hint && <span style={{ fontSize:12, color:'var(--ink-mute)', marginTop:-3 }}>{hint}</span>}
      {children}
    </div>
  );
}

function AdminInput({ value, onChange, type='text', placeholder, style={}, ...rest }) {
  return (
    <input
      className="dt-input"
      type={type}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      style={{ height:40, borderRadius:10, ...style }}
      {...rest}
    />
  );
}

function AdminTextarea({ value, onChange, placeholder, rows=3 }) {
  return (
    <textarea
      className="dt-input"
      value={value ?? ''}
      placeholder={placeholder}
      rows={rows}
      onChange={e => onChange(e.target.value)}
      style={{ borderRadius:10, resize:'vertical', padding:'10px 14px' }}
    />
  );
}

function TintPicker({ value, onChange }) {
  return (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      {TINTS.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{ width:36, height:36, borderRadius:10, background:TINT_BG[t], border:value === t ? '3px solid var(--orange)' : '2px solid transparent', cursor:'pointer', outline:'none', transition:'border 120ms ease' }}
          title={t}
        />
      ))}
    </div>
  );
}

function IngredientsEditor({ value=[], onChange }) {
  const update = (i, key, val) => onChange(value.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  const add    = () => onChange([...value, { qty:'', item:'' }]);
  const remove = i => onChange(value.filter((_, idx) => idx !== i));
  const move   = (i, dir) => {
    const next = [...value], j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      {value.map((ing, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:'100px 1fr auto', gap:6, alignItems:'center' }}>
          <input className="dt-input" placeholder="qty" value={ing.qty} onChange={e => update(i, 'qty', e.target.value)} style={{ height:36, borderRadius:8, fontSize:13, padding:'0 10px' }}/>
          <input className="dt-input" placeholder="ingredient" value={ing.item} onChange={e => update(i, 'item', e.target.value)} style={{ height:36, borderRadius:8, fontSize:13, padding:'0 10px' }}/>
          <div style={{ display:'flex', gap:4 }}>
            <button onClick={() => move(i, -1)} className="dt-btn ghost sm" style={{ padding:'0 8px' }}>↑</button>
            <button onClick={() => move(i,  1)} className="dt-btn ghost sm" style={{ padding:'0 8px' }}>↓</button>
            <button onClick={() => remove(i)}   className="dt-btn ghost sm" style={{ padding:'0 8px', color:'var(--orange)' }}>✕</button>
          </div>
        </div>
      ))}
      <button onClick={add} className="dt-btn ghost sm" style={{ alignSelf:'flex-start', marginTop:2 }}>+ ingredient</button>
    </div>
  );
}

function StepsEditor({ value=[], onChange }) {
  const update = (i, val) => onChange(value.map((s, idx) => idx === i ? val : s));
  const add    = () => onChange([...value, '']);
  const remove = i => onChange(value.filter((_, idx) => idx !== i));
  const move   = (i, dir) => {
    const next = [...value], j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      {value.map((step, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:'28px 1fr auto', gap:8, alignItems:'flex-start' }}>
          <span style={{ fontFamily:'var(--display)', fontSize:18, fontStyle:'italic', color:'var(--orange)', paddingTop:8, textAlign:'center' }}>{i + 1}</span>
          <textarea className="dt-input" value={step} onChange={e => update(i, e.target.value)} style={{ borderRadius:10, resize:'vertical', padding:'8px 12px', fontSize:13, lineHeight:1.5, minHeight:56 }}/>
          <div style={{ display:'flex', flexDirection:'column', gap:4, paddingTop:4 }}>
            <button onClick={() => move(i, -1)} className="dt-btn ghost sm" style={{ padding:'0 7px', fontSize:11 }}>↑</button>
            <button onClick={() => move(i,  1)} className="dt-btn ghost sm" style={{ padding:'0 7px', fontSize:11 }}>↓</button>
            <button onClick={() => remove(i)}   className="dt-btn ghost sm" style={{ padding:'0 7px', color:'var(--orange)' }}>✕</button>
          </div>
        </div>
      ))}
      <button onClick={add} className="dt-btn ghost sm" style={{ alignSelf:'flex-start', marginTop:2 }}>+ step</button>
    </div>
  );
}

// ─── Recipe form ──────────────────────────────────────────────────────────────

function blankRecipe() {
  return { id:'', title:'', author:'', cuisine:'', category:'', tags:[], minutes:30, servings:4, difficulty:'Easy', rating:4.5, reviews:0, tint:'t1', description:'', notes:'', ingredients:[], steps:[], photo:'', video:'' };
}

function RecipeForm({ initial, onSave, onCancel }) {
  const [r, setR] = React.useState({ ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : (initial.tags || '') });
  const set = (key, val) => setR(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    if (!r.title.trim()) return alert('Title is required.');
    const tags = r.tags.split(',').map(t => t.trim()).filter(Boolean);
    onSave({ ...r, id: r.id || toSlug(r.title), tags });
  };

  return (
    <div style={{ background:'var(--cream-2)', border:'2px solid var(--orange)', borderRadius:18, padding:28, display:'flex', flexDirection:'column', gap:18 }}>
      <h3 className="dt-serif" style={{ margin:0, fontSize:20 }}>{initial.id ? 'Edit recipe' : 'New recipe'}</h3>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <AdminField label="Title"><AdminInput value={r.title} onChange={v => set('title', v)} placeholder="Recipe title"/></AdminField>
        <AdminField label="Author"><AdminInput value={r.author} onChange={v => set('author', v)} placeholder="Author name"/></AdminField>
        <AdminField label="Cuisine"><AdminInput value={r.cuisine} onChange={v => set('cuisine', v)} placeholder="Italian, Japanese…"/></AdminField>
        <AdminField label="Category"><AdminInput value={r.category} onChange={v => set('category', v)} placeholder="Pasta, Dessert…"/></AdminField>
        <AdminField label="Tags" hint="Comma-separated"><AdminInput value={r.tags} onChange={v => set('tags', v)} placeholder="vegan, quick, comfort"/></AdminField>
        <AdminField label="Difficulty">
          <select className="dt-input" value={r.difficulty} onChange={e => set('difficulty', e.target.value)} style={{ height:40, borderRadius:10 }}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </AdminField>
        <AdminField label="Minutes"><AdminInput type="number" value={r.minutes} onChange={v => set('minutes', v)}/></AdminField>
        <AdminField label="Servings"><AdminInput type="number" value={r.servings} onChange={v => set('servings', v)}/></AdminField>
        <AdminField label="Rating (0–5)"><AdminInput type="number" step="0.1" min="0" max="5" value={r.rating} onChange={v => set('rating', v)}/></AdminField>
        <AdminField label="Review count"><AdminInput type="number" value={r.reviews} onChange={v => set('reviews', v)}/></AdminField>
      </div>

      <AdminField label="Photo tint" hint="Used as background until a real photo is added"><TintPicker value={r.tint} onChange={v => set('tint', v)}/></AdminField>

      <AdminField label="Photo" hint="Upload a file or paste a direct image URL">
        <div style={{ display:'flex', gap:8 }}>
          <AdminInput value={r.photo || ''} onChange={v => set('photo', v)} placeholder="https://…" style={{ flex:1 }}/>
          <label style={{ cursor:'pointer', padding:'0 14px', height:40, display:'inline-flex', alignItems:'center', background:'var(--surface)', border:'1px solid var(--line)', borderRadius:10, fontSize:13, fontWeight:500, color:'var(--ink-soft)', whiteSpace:'nowrap', flexShrink:0 }}>
            Upload
            <input type="file" accept="image/*" style={{ display:'none' }} onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => set('photo', ev.target.result);
              reader.readAsDataURL(file);
            }}/>
          </label>
        </div>
        {r.photo && (
          <div style={{ marginTop:8, height:140, borderRadius:12, overflow:'hidden', position:'relative' }}>
            <img src={r.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.style.display='none'}/>
          </div>
        )}
      </AdminField>

      <AdminField label="Video URL" hint="YouTube or Vimeo link — shown on the recipe page">
        <AdminInput value={r.video || ''} onChange={v => set('video', v)} placeholder="https://www.youtube.com/watch?v=… or https://vimeo.com/…"/>
      </AdminField>

      <AdminField label="Description"><AdminTextarea value={r.description} onChange={v => set('description', v)} placeholder="Short description shown on recipe page…" rows={3}/></AdminField>
      <AdminField label="Guru's note"><AdminTextarea value={r.notes} onChange={v => set('notes', v)} placeholder="Optional tip…" rows={2}/></AdminField>
      <AdminField label="Ingredients"><IngredientsEditor value={r.ingredients || []} onChange={v => set('ingredients', v)}/></AdminField>
      <AdminField label="Steps"><StepsEditor value={r.steps || []} onChange={v => set('steps', v)}/></AdminField>

      <div style={{ display:'flex', gap:10, justifyContent:'flex-end', borderTop:'1px solid var(--line)', paddingTop:16 }}>
        <button onClick={onCancel} className="dt-btn ghost sm">Cancel</button>
        <button onClick={handleSave} className="dt-btn primary sm">Save recipe</button>
      </div>
    </div>
  );
}

// ─── Review form ──────────────────────────────────────────────────────────────

function blankReview() {
  return { id:'', name:'', cuisine:'', city:'', neighborhood:'', rating:4.5, price:'$$$', author:'', date:'', headline:'', excerpt:'', standout:'', tint:'t1' };
}

function ReviewForm({ initial, onSave, onCancel }) {
  const [r, setR] = React.useState({ ...initial });
  const set = (key, val) => setR(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    if (!r.name.trim()) return alert('Restaurant name is required.');
    onSave({ ...r, id: r.id || toSlug(r.name) });
  };

  return (
    <div style={{ background:'var(--cream-2)', border:'2px solid var(--orange)', borderRadius:18, padding:28, display:'flex', flexDirection:'column', gap:18 }}>
      <h3 className="dt-serif" style={{ margin:0, fontSize:20 }}>{initial.id ? 'Edit review' : 'New review'}</h3>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <AdminField label="Restaurant name"><AdminInput value={r.name} onChange={v => set('name', v)} placeholder="Restaurant name"/></AdminField>
        <AdminField label="Cuisine type"><AdminInput value={r.cuisine} onChange={v => set('cuisine', v)} placeholder="Northern Italian, Omakase…"/></AdminField>
        <AdminField label="City"><AdminInput value={r.city} onChange={v => set('city', v)} placeholder="Brooklyn, NY"/></AdminField>
        <AdminField label="Neighborhood"><AdminInput value={r.neighborhood} onChange={v => set('neighborhood', v)} placeholder="Cobble Hill"/></AdminField>
        <AdminField label="Rating (0–5)"><AdminInput type="number" step="0.1" min="0" max="5" value={r.rating} onChange={v => set('rating', v)}/></AdminField>
        <AdminField label="Price">
          <select className="dt-input" value={r.price} onChange={e => set('price', e.target.value)} style={{ height:40, borderRadius:10 }}>
            {PRICES.map(p => <option key={p}>{p}</option>)}
          </select>
        </AdminField>
        <AdminField label="Author / Reviewer"><AdminInput value={r.author} onChange={v => set('author', v)} placeholder="Name"/></AdminField>
        <AdminField label="Date"><AdminInput value={r.date} onChange={v => set('date', v)} placeholder="May 12, 2026"/></AdminField>
        <AdminField label="Standout dish" hint="shown in 'Don't miss' card"><AdminInput value={r.standout} onChange={v => set('standout', v)} placeholder="Brown-butter agnolotti"/></AdminField>
      </div>

      <AdminField label="Photo tint"><TintPicker value={r.tint} onChange={v => set('tint', v)}/></AdminField>
      <AdminField label="Headline"><AdminInput value={r.headline} onChange={v => set('headline', v)} placeholder="One-line review hook…"/></AdminField>
      <AdminField label="Excerpt"><AdminTextarea value={r.excerpt} onChange={v => set('excerpt', v)} placeholder="Short excerpt shown on card…" rows={4}/></AdminField>

      <div style={{ display:'flex', gap:10, justifyContent:'flex-end', borderTop:'1px solid var(--line)', paddingTop:16 }}>
        <button onClick={onCancel} className="dt-btn ghost sm">Cancel</button>
        <button onClick={handleSave} className="dt-btn primary sm">Save review</button>
      </div>
    </div>
  );
}

// ─── Settings form ────────────────────────────────────────────────────────────

function SettingsForm({ initial, onSave }) {
  const [s, setS] = React.useState({ ...initial, stats: initial.stats.map(st => ({ ...st })) });
  const set = (key, val) => setS(prev => ({ ...prev, [key]: val }));
  const setStat = (i, key, val) => setS(prev => ({ ...prev, stats: prev.stats.map((st, idx) => idx === i ? { ...st, [key]: val } : st) }));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

      {/* Brand */}
      <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:22 }}>
        <h4 className="dt-serif" style={{ margin:'0 0 16px', fontSize:18 }}>Brand</h4>
        <AdminField label="Site name"><AdminInput value={s.brand} onChange={v => set('brand', v)} placeholder="The Hungry Guru"/></AdminField>
      </div>

      {/* Hero */}
      <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:22, display:'flex', flexDirection:'column', gap:14 }}>
        <h4 className="dt-serif" style={{ margin:'0 0 2px', fontSize:18 }}>Hero section</h4>
        <AdminField label="Eyebrow"><AdminInput value={s.heroEyebrow} onChange={v => set('heroEyebrow', v)} placeholder="Curated by the Guru"/></AdminField>
        <AdminField label="Headline"><AdminInput value={s.heroHeadline} onChange={v => set('heroHeadline', v)} placeholder="Favorite recipes,"/></AdminField>
        <AdminField label="Headline (italic / orange part)"><AdminInput value={s.heroHeadlineEm} onChange={v => set('heroHeadlineEm', v)} placeholder="favorite restaurants."/></AdminField>
        <AdminField label="Subtext"><AdminTextarea value={s.heroSub} onChange={v => set('heroSub', v)} rows={3}/></AdminField>
        <AdminField label="Featured recipe" hint="ID of the recipe shown in the hero">
          <select className="dt-input" value={s.featuredRecipeId} onChange={e => set('featuredRecipeId', e.target.value)} style={{ height:40, borderRadius:10 }}>
            {RECIPES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
          </select>
        </AdminField>
      </div>

      {/* Stats */}
      <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:22 }}>
        <h4 className="dt-serif" style={{ margin:'0 0 16px', fontSize:18 }}>Stats strip</h4>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {s.stats.map((st, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:10 }}>
              <AdminInput value={st.num} onChange={v => setStat(i, 'num', v)} placeholder="1,240+"/>
              <AdminInput value={st.label} onChange={v => setStat(i, 'label', v)} placeholder="Recipes from 84 cooks"/>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:18, padding:22, display:'flex', flexDirection:'column', gap:14 }}>
        <h4 className="dt-serif" style={{ margin:'0 0 2px', fontSize:18 }}>Footer &amp; Reviews page</h4>
        <AdminField label="Footer description"><AdminTextarea value={s.footerDesc} onChange={v => set('footerDesc', v)} rows={2}/></AdminField>
        <AdminField label="Reviews page intro"><AdminTextarea value={s.reviewsIntro} onChange={v => set('reviewsIntro', v)} rows={3}/></AdminField>
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <button onClick={() => onSave(s)} className="dt-btn primary">Save settings</button>
      </div>
    </div>
  );
}

// ─── Admin list rows ──────────────────────────────────────────────────────────

function RecipeRow({ recipe: r, index, editing, onEdit, onDelete, onSave, onCancel }) {
  if (editing) return <RecipeForm initial={r} onSave={onSave} onCancel={onCancel}/>;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:14, padding:'12px 16px' }}>
      <div className={`dt-photo ${r.tint}`} style={{ width:48, height:48, borderRadius:10, flexShrink:0 }}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:14, lineHeight:1.2, color:'var(--ink)' }}>{r.title}</div>
        <div style={{ fontSize:12, color:'var(--ink-mute)', marginTop:3 }}>{r.cuisine} · {r.category} · {r.minutes}m · {r.difficulty} · ★{r.rating}</div>
      </div>
      <div style={{ display:'flex', gap:8, flexShrink:0 }}>
        <button onClick={onEdit}   className="dt-btn ghost sm">Edit</button>
        <button onClick={onDelete} className="dt-btn ghost sm" style={{ color:'var(--orange)' }}>Delete</button>
      </div>
    </div>
  );
}

function ReviewRow({ review: r, index, editing, onEdit, onDelete, onSave, onCancel }) {
  if (editing) return <ReviewForm initial={r} onSave={onSave} onCancel={onCancel}/>;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, background:'var(--white)', border:'1px solid var(--line-soft)', borderRadius:14, padding:'12px 16px' }}>
      <div className={`dt-photo ${r.tint}`} style={{ width:48, height:48, borderRadius:10, flexShrink:0 }}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:14, lineHeight:1.2, color:'var(--ink)' }}>{r.name}</div>
        <div style={{ fontSize:12, color:'var(--ink-mute)', marginTop:3 }}>{r.cuisine} · {r.city} · {r.price} · ★{r.rating}</div>
      </div>
      <div style={{ display:'flex', gap:8, flexShrink:0 }}>
        <button onClick={onEdit}   className="dt-btn ghost sm">Edit</button>
        <button onClick={onDelete} className="dt-btn ghost sm" style={{ color:'var(--orange)' }}>Delete</button>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportDataJs() {
  const content = `// ─── Default data ────────────────────────────────────────────────────────────
const RECIPES_DEFAULT = ${JSON.stringify(RECIPES, null, 2)};

const REVIEWS_DEFAULT = ${JSON.stringify(REVIEWS, null, 2)};

const SITE_SETTINGS_DEFAULT = ${JSON.stringify(SITE_SETTINGS, null, 2)};

// ─── Live data (loaded from localStorage, mutated in-place by admin) ─────────
const RECIPES = JSON.parse(localStorage.getItem('guru_recipes')) || [...RECIPES_DEFAULT.map(r => ({...r}))];
const REVIEWS = JSON.parse(localStorage.getItem('guru_reviews')) || [...REVIEWS_DEFAULT.map(r => ({...r}))];
const SITE_SETTINGS = Object.assign({}, SITE_SETTINGS_DEFAULT, JSON.parse(localStorage.getItem('guru_settings')) || {});

// ─── Persist helpers (called by Admin) ───────────────────────────────────────
function adminSyncRecipes(next) {
  localStorage.setItem('guru_recipes', JSON.stringify(next));
  RECIPES.splice(0, RECIPES.length, ...next);
}
function adminSyncReviews(next) {
  localStorage.setItem('guru_reviews', JSON.stringify(next));
  REVIEWS.splice(0, REVIEWS.length, ...next);
}
function adminSyncSettings(next) {
  localStorage.setItem('guru_settings', JSON.stringify(next));
  Object.assign(SITE_SETTINGS, next);
}
function adminResetAll() {
  ['guru_recipes','guru_reviews','guru_settings'].forEach(k => localStorage.removeItem(k));
  window.location.reload();
}

// ─── UI constants ─────────────────────────────────────────────────────────────
const CATEGORIES = ['All','Quick','Pasta','Vegetarian','Grill','Comfort','Baking','Desserts'];
const REVIEW_CITIES = ['All cities','Brooklyn, NY','San Francisco, CA','Mexico City, MX','Asheville, NC','Madrid, ES','Los Angeles, CA'];

const DT_DIETARY   = ['Vegan','Vegetarian','Pescatarian','Dairy-free','Gluten-free','Keto','Paleo','Low-FODMAP'];
const DT_ALLERGIES = ['Peanuts','Tree nuts','Shellfish','Eggs','Soy','Wheat','Sesame','Fish'];
const DT_CUISINES  = ['Keep as-is','Thai','Mexican','Japanese','Korean','Indian','Moroccan','French'];
const DT_EQUIPMENT = ['No oven','No stand mixer','Instant Pot','Air fryer','Single skillet only','Microwave only'];
const DT_SKILLS    = ['Beginner','Comfortable','Pro'];

// ─── Utilities ────────────────────────────────────────────────────────────────
function buildTranslation() {
  const A = s => ({ kind:'add',  text:s });
  const R = s => ({ kind:'rm',   text:s });
  const K = s => ({ kind:'keep', text:s });
  return {
    ingredients:[
      {qty:'18 oz',  item:[R('fresh tagliatelle'),  A('gluten-free fettuccine')]},
      {qty:'12 tbsp',item:[R('unsalted butter'),     A('vegan cultured butter')]},
      {qty:'30',     item:[K('fresh sage leaves')]},
      {qty:'3 cloves',item:[K('garlic, smashed')]},
      {qty:'\\u00be cup',  item:[R('Parmigiano-Reggiano'), A('aged cashew parm')]},
      {qty:'1\\u00bd tsp', item:[K('lemon zest')]},
      {qty:'\\u215b tsp',  item:[K('freshly grated nutmeg')]},
      {qty:'2 tbsp', item:[A('nutritional yeast')],  isNew:true},
      {qty:'to taste',item:[K('flaky sea salt + black pepper')]},
    ],
    changes:[
      'Swapped butter for cultured vegan butter \\u2014 it still browns and tastes nutty.',
      'Used gluten-free fettuccine; reduce cook time by 30 seconds, the starch behaves differently.',
      'Replaced Parmigiano with aged cashew parmesan + a hit of nutritional yeast for that savory edge.',
      'Scaled everything 1.5\\u00d7 to feed 6.',
      'Combined steps 2 and 3 to fit a 30-minute window \\u2014 start the sauce while the water is heating.',
    ],
    steps:[
      'Bring a large pot of well-salted water to a boil. Drop the [gluten-free fettuccine] and cook to just shy of al dente, ~2 minutes less than the package says.',
      'While the water heats, melt the [vegan butter] in a wide skillet over medium heat. Add garlic and sage and swirl constantly until the solids turn deep hazelnut and smell toasted, ~4 minutes. Lift the sage onto a plate.',
      'Kill the heat. Add a ladle of pasta water to stop the cooking. Transfer the pasta straight in and toss for a full minute, splashing more pasta water until glossy.',
      'Off heat, shower with [cashew parm], [nutritional yeast], lemon zest, and nutmeg. Toss, taste, adjust salt.',
      'Plate, crown with crisp sage and a few cracks of pepper.',
    ],
  };
}

function scaleQty(qty, factor) {
  if (factor === 1) return qty;
  const fracs = {'\\u00bd':0.5,'\\u2153':0.33,'\\u00bc':0.25,'\\u215b':0.125,'\\u00be':0.75,'\\u2154':0.66,'\\u215c':0.375};
  const m = qty.match(/^([\\d\\u215b\\u00bc\\u2153\\u215c\\u00bd\\u2154\\u00be]+(?:\\.\\d+)?)(.*)$/);
  if (!m) return qty;
  let n = parseFloat(m[1]);
  if (isNaN(n)) n = fracs[m[1]] || NaN;
  if (isNaN(n)) return qty;
  return \`\${Math.round(n * factor * 4) / 4}\${m[2]}\`;
}
`;

  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: 'data.js' });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Admin page ───────────────────────────────────────────────────────────────

function Admin({ onBack }) {
  const [tab,     setTab]    = React.useState('recipes');
  const [recipes, setRecipes]= React.useState([...RECIPES]);
  const [reviews, setReviews]= React.useState([...REVIEWS]);
  const [editing, setEditing]= React.useState(null); // { type, index } | null
  const [flash,   setFlash]  = React.useState('');

  const saved = (msg='Saved') => {
    setFlash(msg);
    setTimeout(() => setFlash(''), 2200);
  };

  const stopEditing = () => setEditing(null);
  const switchTab = t => { stopEditing(); setTab(t); };

  // Recipe CRUD
  const saveRecipe = recipe => {
    const next = editing.index === 'new'
      ? [...recipes, recipe]
      : recipes.map((r, i) => i === editing.index ? recipe : r);
    setRecipes(next);
    adminSyncRecipes(next);
    stopEditing();
    saved('Recipe saved');
  };

  const deleteRecipe = i => {
    if (!confirm(`Delete "${recipes[i].title}"?`)) return;
    const next = recipes.filter((_, idx) => idx !== i);
    setRecipes(next);
    adminSyncRecipes(next);
    saved('Recipe deleted');
  };

  // Review CRUD
  const saveReview = review => {
    const next = editing.index === 'new'
      ? [...reviews, review]
      : reviews.map((r, i) => i === editing.index ? review : r);
    setReviews(next);
    adminSyncReviews(next);
    stopEditing();
    saved('Review saved');
  };

  const deleteReview = i => {
    if (!confirm(`Delete "${reviews[i].name}"?`)) return;
    const next = reviews.filter((_, idx) => idx !== i);
    setReviews(next);
    adminSyncReviews(next);
    saved('Review deleted');
  };

  // Settings
  const saveSettings = next => {
    adminSyncSettings(next);
    saved('Settings saved');
  };

  return (
    <div style={{ maxWidth:860, margin:'0 auto', padding:'40px 32px 100px' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:32 }}>
        <div>
          <a onClick={onBack} style={{ cursor:'pointer', fontSize:13, color:'var(--ink-mute)' }}>← Back to site</a>
          <h1 className="dt-serif" style={{ fontSize:40, margin:'8px 0 4px', letterSpacing:'-0.02em' }}>Content</h1>
          <p style={{ margin:0, fontSize:13, color:'var(--ink-mute)' }}>
            Changes apply immediately and persist across reloads via localStorage.
          </p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center', paddingTop:28 }}>
          {flash && (
            <span style={{ fontSize:13, fontWeight:600, color:'#2a8a50', display:'flex', alignItems:'center', gap:6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
              {flash}
            </span>
          )}
          <button onClick={exportDataJs} className="dt-btn ghost sm">
            Export data.js
          </button>
          <button onClick={adminResetAll} className="dt-btn ghost sm" style={{ color:'var(--orange)', borderColor:'#f6c8a8' }}>
            Reset all to defaults
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'inline-flex', background:'var(--cream-2)', borderRadius:999, padding:4, marginBottom:28, border:'1px solid var(--line-soft)' }}>
        {[['recipes', `Recipes (${recipes.length})`], ['reviews', `Reviews (${reviews.length})`], ['settings', 'Settings']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            style={{ padding:'6px 18px', borderRadius:999, fontSize:13, fontWeight:600, color:tab === key ? 'var(--ink)' : 'var(--ink-mute)', background:tab === key ? 'var(--white)' : 'transparent', boxShadow:tab === key ? '0 1px 3px rgba(14,26,47,0.08)' : 'none', transition:'all 120ms ease' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Recipes tab */}
      {tab === 'recipes' && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {!editing && (
            <button onClick={() => setEditing({ type:'recipe', index:'new' })} className="dt-btn primary sm" style={{ alignSelf:'flex-start', marginBottom:4 }}>
              + New recipe
            </button>
          )}
          {editing && editing.type === 'recipe' && editing.index === 'new' && (
            <RecipeForm initial={blankRecipe()} onSave={saveRecipe} onCancel={stopEditing}/>
          )}
          {recipes.map((r, i) => (
            <RecipeRow
              key={r.id || i}
              recipe={r}
              index={i}
              editing={editing && editing.type === 'recipe' && editing.index === i}
              onEdit={() => setEditing({ type:'recipe', index:i })}
              onDelete={() => deleteRecipe(i)}
              onSave={saveRecipe}
              onCancel={stopEditing}
            />
          ))}
        </div>
      )}

      {/* Reviews tab */}
      {tab === 'reviews' && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {!editing && (
            <button onClick={() => setEditing({ type:'review', index:'new' })} className="dt-btn primary sm" style={{ alignSelf:'flex-start', marginBottom:4 }}>
              + New review
            </button>
          )}
          {editing && editing.type === 'review' && editing.index === 'new' && (
            <ReviewForm initial={blankReview()} onSave={saveReview} onCancel={stopEditing}/>
          )}
          {reviews.map((r, i) => (
            <ReviewRow
              key={r.id || i}
              review={r}
              index={i}
              editing={editing && editing.type === 'review' && editing.index === i}
              onEdit={() => setEditing({ type:'review', index:i })}
              onDelete={() => deleteReview(i)}
              onSave={saveReview}
              onCancel={stopEditing}
            />
          ))}
        </div>
      )}

      {/* Settings tab */}
      {tab === 'settings' && (
        <SettingsForm initial={{ ...SITE_SETTINGS, stats: SITE_SETTINGS.stats.map(s => ({ ...s })) }} onSave={saveSettings}/>
      )}
    </div>
  );
}
