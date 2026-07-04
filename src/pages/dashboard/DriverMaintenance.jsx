import { useState } from 'react';
import { useLogistics } from '../../LogisticsContext';

export default function DriverMaintenance() {
  const { vehicles, reportFault } = useLogistics();
  const [vehicleId, setVehicleId] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleId && description) {
      reportFault(vehicleId, severity, description);
      setSubmitted(true);
      setVehicleId('');
      setDescription('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  return (
    <div style={{ flex: 1, padding: '2rem 3rem' }}>
      <h1 className="text-2xl font-bold mb-2">Report Vehicle Fault</h1>
      <p className="text-secondary mb-8">Log maintenance issues directly to the admin dispatch portal.</p>
      
      {submitted && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', maxWidth: '600px' }}>
          Fault logged successfully! The vehicle is now marked for maintenance.
        </div>
      )}

      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Select Vehicle</label>
              <select 
                className="w-full text-sm" 
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-primary)' }}
                value={vehicleId}
                onChange={e => setVehicleId(e.target.value)}
                required
              >
                <option value="" disabled>Select the vehicle you are driving...</option>
                {vehicles.filter(v => v.status !== 'Maintenance').map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          
          <div className="mb-4">
            <label className="text-xs font-bold text-secondary block mb-2 uppercase">Fault Severity</label>
            <select 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
              value={severity}
              onChange={e => setSeverity(e.target.value)}
            >
              <option>Low (Cosmetic/Minor)</option>
              <option>Medium (Requires checking soon)</option>
              <option>High (Safety Risk - Ground Vehicle)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-xs font-bold text-secondary block mb-2 uppercase">Fault Description</label>
            <textarea 
              rows="4" 
              placeholder="Describe the issue in detail..." 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', resize: 'vertical' }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-black w-full" style={{ width: '100%' }}>Submit Fault Report</button>
        </form>
      </div>
    </div>
  );
}
