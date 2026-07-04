import { useLogistics } from '../../LogisticsContext';

export default function Drivers() {
  const { drivers } = useLogistics();

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-8">Driver Management</h1>
      {drivers.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="text-secondary">No drivers found.</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {drivers.map(driver => (
            <div key={driver.id} className="card" style={{ padding: '1.5rem' }}>
              <div className="font-bold text-lg mb-1">{driver.full_name}</div>
              <div className="text-sm text-secondary"><strong>ID:</strong> {driver.id}</div>
              <div className="text-sm text-secondary mt-2"><strong>Role:</strong> {driver.role}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
