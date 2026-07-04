import { useLogistics } from '../../LogisticsContext';

export default function Clients() {
  const { clients } = useLogistics();

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-8">Client Management</h1>
      {clients.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="text-secondary">No clients found.</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="card" style={{ padding: '1.5rem' }}>
              <div className="font-bold text-lg mb-1">{client.full_name || 'Unnamed Client'}</div>
              <div className="text-sm text-secondary"><strong>ID:</strong> {client.id}</div>
              <div className="text-sm text-secondary mt-2"><strong>Role:</strong> {client.role}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
