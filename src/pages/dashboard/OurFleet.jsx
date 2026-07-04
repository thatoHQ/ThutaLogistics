import { useLogistics } from '../../LogisticsContext';

export default function OurFleet() {
  const { vehicles } = useLogistics();

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-8">Our Fleet</h1>
      
      {vehicles.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="text-secondary">No active vehicles to display.</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg-secondary)', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {vehicle.image_url ? (
                  <img src={vehicle.image_url} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                ) : (
                  <div className="text-secondary text-sm">No Image</div>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    background: vehicle.status === 'Available' ? '#dcfce7' : vehicle.status === 'In Transit' ? '#dbeafe' : '#fee2e2',
                    color: vehicle.status === 'Available' ? '#22c55e' : vehicle.status === 'In Transit' ? '#3b82f6' : '#ef4444'
                  }}>
                    {vehicle.status}
                  </span>
                </div>
                <div className="text-sm text-secondary"><strong>ID:</strong> {vehicle.id}</div>
                <div className="text-sm text-secondary mt-1"><strong>Type:</strong> {vehicle.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
