import { useState } from 'react';
import { useLogistics } from '../../LogisticsContext';

export default function QuoteRequests() {
  const { quotes, drivers, vehicles, approveQuote, rejectQuote } = useLogistics();
  const [selectedDriver, setSelectedDriver] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const activeDriverIds = quotes
    .filter(q => q.status === 'Approved & Assigned' || q.status === 'In Transit' || q.status === 'Delayed (Maintenance)')
    .map(q => q.driver_id);

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-2">Quote Requests</h1>
      <p className="text-secondary mb-8">Review, assign, and approve logistics requests from clients.</p>

      {quotes.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <div className="text-secondary">No quote requests in the system.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {quotes.map(quote => (
            <div key={quote.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-lg">{quote.tracking_id}</span>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    background: quote.status === 'Awaiting Admin Approval' ? '#fef3c7' : quote.status === 'Rejected' ? '#fee2e2' : '#dcfce7',
                    color: quote.status === 'Awaiting Admin Approval' ? '#d97706' : quote.status === 'Rejected' ? '#ef4444' : '#22c55e'
                  }}>
                    {quote.status}
                  </span>
                </div>
                <div className="text-sm text-secondary mb-1"><strong>Route:</strong> {quote.origin} ➔ {quote.destination}</div>
                <div className="text-sm text-secondary mb-1"><strong>Truck:</strong> {quote.truck_type}</div>
                <div className="text-sm text-secondary mb-1"><strong>Weight:</strong> {Number(quote.cargo_weight).toLocaleString()} kg</div>
                <div className="text-sm font-bold mt-2">Value: {quote.price}</div>
              </div>

              {quote.status === 'Awaiting Admin Approval' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '250px' }}>
                  <select 
                    className="text-sm" 
                    style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    value={selectedDriver[quote.id] || ''}
                    onChange={(e) => setSelectedDriver({ ...selectedDriver, [quote.id]: e.target.value })}
                  >
                    <option value="" disabled>Select Driver...</option>
                    {drivers.map(d => {
                      const isBusy = activeDriverIds.includes(d.id);
                      return (
                        <option key={d.id} value={d.id} disabled={isBusy}>
                          {d.full_name} {isBusy ? '(On Route)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  
                  <select 
                    className="text-sm" 
                    style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                    value={selectedVehicle[quote.id] || ''}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, [quote.id]: e.target.value })}
                  >
                    <option value="" disabled>Select Vehicle...</option>
                    {vehicles.filter(v => v.status === 'Available').map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>

                  <div className="flex gap-2 mt-2">
                    <button 
                      className="btn btn-outline" 
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}
                      onClick={() => rejectQuote(quote.id)}
                    >
                      Reject
                    </button>
                    <button 
                      className="btn btn-primary" 
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem' }}
                      onClick={() => approveQuote(quote.id, selectedDriver[quote.id], selectedVehicle[quote.id])}
                      disabled={!selectedDriver[quote.id] || !selectedVehicle[quote.id]}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )}

              {quote.status === 'Approved & Assigned' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '250px', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '4px' }}>
                  <div className="text-xs text-secondary uppercase font-bold">Assigned</div>
                  <div className="text-sm"><strong>Driver ID:</strong> {quote.driver_id}</div>
                  <div className="text-sm"><strong>Vehicle:</strong> {quote.vehicle_id}</div>
                  <button 
                    className="btn btn-outline mt-2" 
                    style={{ padding: '0.25rem', fontSize: '0.75rem' }}
                    onClick={() => {
                      // simple print trick for prototype
                      const printContent = `
                        <h2>THUTA LOGISTICS - DIGITAL WAYBILL</h2>
                        <hr/>
                        <p><strong>Tracking ID:</strong> ${quote.tracking_id}</p>
                        <p><strong>Date:</strong> ${new Date(quote.created_at).toLocaleDateString()}</p>
                        <p><strong>Route:</strong> ${quote.origin} to ${quote.destination}</p>
                        <p><strong>Cargo:</strong> ${quote.truck_type} (${Number(quote.cargo_weight).toLocaleString()} kg)</p>
                        <p><strong>Driver ID:</strong> ${quote.driver_id}</p>
                        <p><strong>Vehicle:</strong> ${quote.vehicle_id}</p>
                        <hr/>
                        <p><strong>Total Value:</strong> ${quote.price}</p>
                        <br/><br/><p>Authorized Signature: __________________</p>
                      `;
                      const original = document.body.innerHTML;
                      document.body.innerHTML = printContent;
                      window.print();
                      document.body.innerHTML = original;
                      window.location.reload(); // refresh to restore React DOM correctly
                    }}
                  >
                    Generate PDF Waybill
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
