import { ArrowUpRight, ArrowDownRight, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLogistics } from '../../LogisticsContext';

export default function AdminOverview() {
  const { quotes, vehicles, drivers } = useLogistics();

  const totalFleet = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === 'In Transit').length;
  const activeStatusPct = totalFleet ? Math.round((activeVehicles / totalFleet) * 100) : 0;

  const activeRoutes = quotes.filter(q => q.status === 'In Transit' || q.status === 'Delayed (Maintenance)');

  const getDriverName = (id) => {
    const d = drivers.find(drv => drv.id === id);
    return d ? d.full_name : 'Unknown';
  };

  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Fleet Overview</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-secondary">Last updated: Just now</span>
          <button className="btn btn-black">Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
          <div className="text-sm text-secondary font-medium mb-2">Total Fleet</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold">{totalFleet}</div>
            <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>Vehicles</div>
          </div>
        </div>
        
        <div className="card" style={{ borderTop: '4px solid var(--black)' }}>
          <div className="text-sm text-secondary font-medium mb-2">Active Utilization</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold">{activeStatusPct}%</div>
            <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>of total capacity</div>
          </div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--border)' }}>
          <div className="text-sm text-secondary font-medium mb-2">In Transit</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold">{activeVehicles}</div>
            <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>Vehicles active</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="flex justify-between items-center" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-bold text-lg">Active Routes</h2>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View All</button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Tracking ID</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Origin</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Destination</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Driver</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {activeRoutes.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No active routes found.
                </td>
              </tr>
            ) : (
              activeRoutes.map(route => (
                <tr key={route.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{route.tracking_id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{route.origin}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{route.destination}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{getDriverName(route.driver_id)}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: route.status === 'Delayed (Maintenance)' ? '#fee2e2' : '#dcfce7',
                      color: route.status === 'Delayed (Maintenance)' ? '#ef4444' : '#22c55e'
                    }}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
