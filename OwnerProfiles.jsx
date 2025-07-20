export default function OwnerProfiles() {
  const owners = []; // Replace with data source
  return (
    <div>
      <h2>Owner Profiles</h2>
      {owners.map((o, i) => (
        <div key={i}>
          <h3>{o.name}</h3>
          <p>{o.items.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}