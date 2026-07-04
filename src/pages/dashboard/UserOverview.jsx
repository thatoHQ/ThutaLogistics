import { Link, useOutletContext } from 'react-router-dom';
import { useLogistics } from '../../LogisticsContext';
import { useAuth } from '../../AuthContext';

export default function UserOverview() {
  const { setIsQuoteModalOpen } = useOutletContext();
  const { quotes, drivers, vehicles } = useLogistics();
  const { user } = useAuth();
  
  const myQuotes = quotes.filter(q => q.user_id === user?.id);
  const activeQuotes = myQuotes.filter(q => q.status !== 'Delivered' && q.status !== 'Rejected');
  const pastQuotes = myQuotes.filter(q => q.status === 'Delivered' || q.status === 'Rejected');

  const getDriverName = (id) => {
    const d = drivers.find(drv => drv.id === id);
    return d ? d.full_name : 'Unknown';
  };

  const getVehicleName = (id) => {
    const v = vehicles.find(veh => veh.id === id);
    return v ? v.name : 'Unknown';
  };

  const renderQuoteCard = (quote) => (
    <div key={quote.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
      <div style={{ flex: 1 }}>
        <div className="flex justify-between mb-2">
          <span className="font-bold text-lg">{quote.tracking_id}</span>
          <span style={{ 
            padding: '0.25rem 0.5rem', 
            borderRadius: '4px', 
            fontSize: '0.75rem', 
            fontWeight: 600,
            background: (quote.status === 'Awaiting Admin Approval' || quote.status === 'Delayed (Maintenance)') ? '#fef3c7' : quote.status === 'Rejected' ? '#fee2e2' : '#dcfce7',
            color: (quote.status === 'Awaiting Admin Approval' || quote.status === 'Delayed (Maintenance)') ? '#d97706' : quote.status === 'Rejected' ? '#ef4444' : '#22c55e'
          }}>
            {quote.status}
          </span>
        </div>
        <div className="text-sm text-secondary mb-1"><strong>Route:</strong> {quote.origin} ➔ {quote.destination}</div>
        <div className="text-sm text-secondary mb-1"><strong>Truck:</strong> {quote.truck_type}</div>
        <div className="text-sm text-secondary mb-1"><strong>Weight:</strong> {Number(quote.cargo_weight).toLocaleString()} kg</div>
        <div className="text-sm font-bold mt-2">Value: {quote.price}</div>
      </div>
      
      {(quote.status === 'Approved & Assigned' || quote.status === 'In Transit' || quote.status === 'Delivered' || quote.status === 'Delayed (Maintenance)') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '250px', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '4px' }}>
          <div className="text-xs text-secondary uppercase font-bold">Dispatch Info</div>
          <div className="text-sm"><strong>Driver:</strong> {getDriverName(quote.driver_id)}</div>
          <div className="text-sm"><strong>Vehicle:</strong> {getVehicleName(quote.vehicle_id)}</div>
          {(quote.status === 'In Transit' || quote.status === 'Delayed (Maintenance)') && (
            <Link to="/dashboard/map" className="text-primary text-sm font-bold mt-2">Track on Map &rarr;</Link>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-8">Welcome to Thuta Logistics</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="card text-center" style={{ padding: '3rem 2rem' }}>
          <h3 className="font-bold text-xl mb-2">Need to ship something?</h3>
          <p className="text-secondary mb-6">Get an instant, architecturally audited cost calculation.</p>
          <button className="btn btn-primary w-full" onClick={() => setIsQuoteModalOpen(true)}>Get a Quote</button>
        </div>
        
        <div className="card text-center" style={{ padding: '3rem 2rem' }}>
          <h3 className="font-bold text-xl mb-2">Track your Cargo</h3>
          <p className="text-secondary mb-6">Real-time transparency, wherever your cargo is.</p>
          <Link to="/dashboard/track" className="btn btn-black w-full" style={{ display: 'block' }}>Track Shipment</Link>
        </div>
      </div>

      {myQuotes.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="text-secondary">No active shipments to display.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {activeQuotes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Active Quotes & Shipments</h2>
              {activeQuotes.map(renderQuoteCard)}
            </div>
          )}
          
          {pastQuotes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Past Shipments</h2>
              {pastQuotes.map(renderQuoteCard)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
