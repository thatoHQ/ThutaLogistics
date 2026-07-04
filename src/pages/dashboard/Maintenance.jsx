import React from 'react';
import { useLogistics } from '../../LogisticsContext';

export default function Maintenance() {
  const { faults, vehicles, resolveFault } = useLogistics();
  
  const activeFaults = faults.filter(f => f.status === 'Active');

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-2">Maintenance & Safety Schedules</h1>
      <p className="text-secondary mb-8">Audit vehicle faults, schedule safety checks, and release verified assets back into active status.</p>
      
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Active Service Holds */}
        <div className="card col-span-2" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Active Service Holds
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>VEHICLE NAME</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>REPORTED FAULT</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>PRIORITY</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>CONTROL ACTION</th>
              </tr>
            </thead>
            <tbody>
              {activeFaults.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No active service holds.
                  </td>
                </tr>
              ) : (
                activeFaults.map(fault => {
                  const vehicle = vehicles.find(v => v.id === fault.vehicle_id);
                  return (
                    <tr key={fault.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{vehicle?.name || fault.vehicle_id}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{fault.description}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem', 
                          background: fault.severity === 'High (Safety Risk - Ground Vehicle)' ? '#fee2e2' : '#fef3c7',
                          color: fault.severity === 'High (Safety Risk - Ground Vehicle)' ? '#ef4444' : '#d97706',
                          fontWeight: 'bold'
                        }}>
                          {fault.severity}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <button 
                          className="btn btn-black" 
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                          onClick={() => resolveFault(fault.id, fault.vehicle_id)}
                        >
                          Resolve & Release
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Right Column: Recently Serviced */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
           <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Recently Serviced Vehicles
          </div>
          
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No recent service history.
          </div>
        </div>
      </div>
    </div>
  );
}
