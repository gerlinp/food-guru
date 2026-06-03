function TransformPanel({ details, step, onStepChange, checked, setChecked }) {
  const toggleArray = (arr, item) => {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  };

  const [diet, setDiet] = React.useState([]);
  const [allergies, setAllergies] = React.useState([]);
  const [cuisine, setCuisine] = React.useState('');
  const [time, setTime] = React.useState(details?.minutes || 60);
  const [skill, setSkill] = React.useState('Intermediate');

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', padding:'24px' }}>
      {step === 'ingredients' && (
        <>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <h2 style={{ fontSize:18, fontWeight:600, margin:0, marginBottom:4 }}>Confirm ingredients</h2>
              <p style={{ fontSize:13, color:'var(--ink-soft)', margin:0 }}>Check off what you have</p>
            </div>
            <button onClick={() => { const allChecked = {}; details.ingredients.forEach((_, i) => { allChecked[i] = true; }); setChecked(allChecked); }} style={{ padding:'6px 12px', borderRadius:6, border:'1px solid var(--orange)', background:'var(--white)', color:'var(--orange)', cursor:'pointer', fontWeight:600, fontSize:11, whiteSpace:'nowrap' }}>I have it all</button>
          </div>
          <ul style={{ padding:0, margin:0, listStyle:'none', marginBottom:24, flex:1, overflowY:'auto' }}>
            {details.ingredients && details.ingredients.map((ing, i) => (
              <li key={i} onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))} style={{ display:'grid', gridTemplateColumns:'22px 1fr', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid var(--line-soft)', cursor:'pointer' }}>
                <span style={{ width:20, height:20, borderRadius:6, border:'1.5px solid var(--line)', background:checked[i] ? 'var(--orange)' : 'var(--white)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {checked[i] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span style={{ color:checked[i] ? 'var(--ink-mute)' : 'inherit', textDecoration:checked[i] ? 'line-through' : 'none' }}>{ing.item}</span>
              </li>
            ))}
          </ul>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <button onClick={() => onStepChange(null)} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--ct-border)', background:'var(--white)', cursor:'pointer', fontWeight:600, fontSize:12 }}>Cancel</button>
            <button onClick={() => onStepChange('options')} style={{ padding:'10px 12px', borderRadius:8, border:'none', background:'var(--orange)', color:'white', cursor:'pointer', fontWeight:600, fontSize:12 }}>Next</button>
          </div>
        </>
      )}

      {step === 'options' && (
        <>
          <h2 style={{ fontSize:18, fontWeight:600, margin:0, marginBottom:4 }}>Transform options</h2>
          <p style={{ fontSize:13, color:'var(--ink-soft)', margin:0, marginBottom:20 }}>Customize your recipe</p>

          <div style={{ flex:1, overflowY:'auto', marginBottom:20 }}>
            <div style={{ marginBottom:12 }}>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Time</label>
              <input type="number" min="5" value={time} onChange={e => setTime(parseInt(e.target.value) || 60)} style={{ width:'100%', padding:'7px 9px', border:'1px solid var(--ct-border)', borderRadius:7, fontSize:12, boxSizing:'border-box' }}/>
            </div>

            <div style={{ marginBottom:12 }}>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Skill level</label>
              <div style={{ display:'flex', gap:6 }}>
                {['Easy', 'Intermediate', 'Advanced'].map(s => (
                  <button key={s} onClick={() => setSkill(s)} style={{ flex:1, padding:'6px 0', borderRadius:6, border:'1px solid var(--ct-border)', background:skill === s ? 'var(--orange)' : 'var(--white)', color:skill === s ? 'white' : 'var(--ink)', cursor:'pointer', fontSize:11, fontWeight:600 }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:12 }}>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Cuisine remix</label>
              <input type="text" placeholder="e.g. Thai, Moroccan" value={cuisine} onChange={e => setCuisine(e.target.value)} style={{ width:'100%', padding:'7px 9px', border:'1px solid var(--ct-border)', borderRadius:7, fontSize:12, boxSizing:'border-box' }}/>
            </div>

            <div style={{ marginBottom:12 }}>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Dietary</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'].map(d => (
                  <button key={d} onClick={() => setDiet(toggleArray(diet, d))} style={{ padding:'5px 10px', borderRadius:999, border:'1px solid var(--ct-border)', background:diet.includes(d) ? 'rgba(240,99,28,.15)' : 'var(--white)', color:diet.includes(d) ? 'var(--orange)' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{d}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:12 }}>
              <label style={{ display:'block', fontSize:10, fontWeight:700, color:'var(--ct-hint)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Avoid</label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {['Nuts', 'Eggs', 'Soy', 'Shellfish'].map(a => (
                  <button key={a} onClick={() => setAllergies(toggleArray(allergies, a))} style={{ padding:'5px 10px', borderRadius:999, border:'1px solid var(--ct-border)', background:allergies.includes(a) ? 'rgba(192,57,43,.15)' : 'var(--white)', color:allergies.includes(a) ? '#c0392b' : 'var(--ink)', cursor:'pointer', fontSize:10, fontWeight:600 }}>{a}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <button onClick={() => onStepChange('ingredients')} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--ct-border)', background:'var(--white)', cursor:'pointer', fontWeight:600, fontSize:12 }}>Back</button>
            <button style={{ padding:'10px 12px', borderRadius:8, border:'none', background:'var(--orange)', color:'white', cursor:'pointer', fontWeight:600, fontSize:12 }}>Transform recipe</button>
          </div>
        </>
      )}
    </div>
  );
}
