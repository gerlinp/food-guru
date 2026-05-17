function Stars({ value = 4.8, size = 12 }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i}>{Icon.star(i <= Math.round(value), size)}</span>
      ))}
    </span>
  );
}
