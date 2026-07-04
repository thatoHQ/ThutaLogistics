import React from 'react';
import { useLogistics } from '../../LogisticsContext';
import { useAuth } from '../../AuthContext';

export default function DriverOverview() {
  const { quotes, updateQuoteStatus, vehicles } = useLogistics();
  const { user } = useAuth();
  
  // Filter quotes assigned to this driver
  const myTasks = quotes.filter(q => q.driver_id === user?.id && q.status !== 'Delivered');
  const isDriving = myTasks.some(t => t.status === 'In Transit');

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Assigned Tasks</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold" style={{ color: isDriving ? 'var(--primary)' : 'var(--text-secondary)' }}>
            Status: {isDriving ? 'On Active Trip (In Transit)' : 'Available'}
          </span>
          <button className="btn btn-black">Refresh</button>
        </div>
      </div>

      {myTasks.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <div className="text-secondary">0 Assigned Tasks</div>
          <p className="text-sm mt-2 text-secondary">No active shipments in your queue.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myTasks.map(task => (
            <div key={task.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-lg">{task.tracking_id}</span>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    background: task.status === 'In Transit' ? '#dcfce7' : '#f3f4f6',
                    color: task.status === 'In Transit' ? '#16a34a' : '#4b5563'
                  }}>
                    {task.status}
                  </span>
                </div>
                <div className="text-sm text-secondary mb-1"><strong>Route:</strong> {task.origin} ➔ {task.destination}</div>
                <div className="text-sm text-secondary mb-1"><strong>Vehicle:</strong> {task.vehicle_id}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '200px' }}>
                {task.status === 'Approved & Assigned' && (() => {
                  const vehicle = vehicles.find(v => v.id === task.vehicle_id);
                  const isMaintenance = vehicle?.status === 'Maintenance';
                  return (
                    <button 
                      className="btn btn-black"
                      onClick={() => !isMaintenance && updateQuoteStatus(task.id, 'In Transit')}
                      disabled={isMaintenance}
                      style={{ 
                        opacity: isMaintenance ? 0.5 : 1, 
                        cursor: isMaintenance ? 'not-allowed' : 'pointer',
                        background: isMaintenance ? '#ef4444' : 'var(--black)',
                        borderColor: isMaintenance ? '#ef4444' : 'var(--black)'
                      }}
                    >
                      {isMaintenance ? 'Vehicle Grounded' : 'Start Trip'}
                    </button>
                  );
                })()}
                {task.status === 'In Transit' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => updateQuoteStatus(task.id, 'Delivered')}
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
