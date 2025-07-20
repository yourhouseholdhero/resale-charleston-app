export default function SalesReport() {
  const sales = []; // Replace with real sales data
  return (
    <div>
      <h2>Sales Breakdown</h2>
      {sales.map((s, i) => (
        <div key={i}>
          <p>{s.owner}: ${s.total}</p>
        </div>
      ))}
    </div>
  );
}