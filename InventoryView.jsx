export default function InventoryView() {
  const items = []; // Replace with real data source
  if (items.length === 0) {
    return <div>Come back soon, more items are loading.</div>;
  }
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>
          <h3>{item.title}</h3>
          <p>{item.owner} - ${item.price}</p>
        </div>
      ))}
    </div>
  );
}