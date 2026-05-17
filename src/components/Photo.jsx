function Photo({ tint = 't1', label, children, style = {}, className = '', src }) {
  return (
    <div className={`dt-photo ${tint} ${className}`} style={style}>
      {src && (
        <img
          src={src}
          alt={label || ''}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:1 }}
        />
      )}
      {children}
      {label && !src && (
        <div className="photo-label">
          <span>{label}</span>
          <span style={{ opacity:0.5 }}>[photo]</span>
        </div>
      )}
    </div>
  );
}
