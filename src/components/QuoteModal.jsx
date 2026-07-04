import { useState } from 'react';
import { useLogistics } from '../LogisticsContext';
import { useAuth } from '../AuthContext';

export default function QuoteModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState('Johannesburg, GP');
  const [destination, setDestination] = useState('Durban, KZN');
  const [truckType, setTruckType] = useState('Box Truck');
  const [cargoWeight, setCargoWeight] = useState(4500);
  const { requestQuote } = useLogistics();
  const { user } = useAuth();
  const [trackingId, setTrackingId] = useState('');

  const CITIES = {
    'Johannesburg, GP': [-26.2041, 28.0473],
    'Pretoria, GP': [-25.7479, 28.2293],
    'Cape Town, WC': [-33.9249, 18.4241],
    'Durban, KZN': [-29.8587, 31.0218],
    'Port Elizabeth, EC': [-33.9608, 25.6022],
    'Bloemfontein, FS': [-29.1141, 26.2205],
    'East London, EC': [-32.9972, 27.9150]
  };

  const calculateQuote = () => {
    // Haversine distance
    const [lat1, lon1] = CITIES[origin];
    const [lat2, lon2] = CITIES[destination];
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = origin === destination ? 25 : Math.round(R * c * 1.2);

    let baseRate = 15;
    if (truckType === 'Tank Trailer') baseRate = 25;
    if (truckType === 'Mega Trailer') baseRate = 20;

    const weightRate = (cargoWeight / 1000) * 1.5;
    const subtotal = dist * (baseRate + weightRate);
    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    return {
      distance: dist,
      subtotal: Math.round(subtotal),
      vat: Math.round(vat),
      total: Math.round(total)
    };
  };

  // Fix: Reset modal state properly when closing
  const handleClose = () => {
    setStep(1);
    setTrackingId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="card" style={{ width: '800px', maxWidth: '90vw', position: 'relative', padding: '2.5rem' }}>
        <button 
          onClick={handleClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', lineHeight: 1 }}
        >
          &times;
        </button>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span style={{ color: 'var(--primary)' }}>📋</span> Precision Quote Estimator
            </h2>
            <p className="text-secondary text-sm mb-6">
              Configure your shipment metrics for an instant, architecturally audited cost calculation.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-bold text-secondary block mb-2 uppercase">Origin Hub</label>
                <select 
                  value={origin} 
                  onChange={e => setOrigin(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                >
                  <option>Johannesburg, GP</option>
                  <option>Pretoria, GP</option>
                  <option>Cape Town, WC</option>
                  <option>Durban, KZN</option>
                  <option>Port Elizabeth, EC</option>
                  <option>Bloemfontein, FS</option>
                  <option>East London, EC</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-secondary block mb-2 uppercase">Destination Hub</label>
                <select 
                  value={destination} 
                  onChange={e => setDestination(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                >
                  <option>Durban, KZN</option>
                  <option>Cape Town, WC</option>
                  <option>Pretoria, GP</option>
                  <option>Johannesburg, GP</option>
                  <option>Port Elizabeth, EC</option>
                  <option>Bloemfontein, FS</option>
                  <option>East London, EC</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
               <label className="text-xs font-bold text-secondary block mb-2 uppercase">Select Truck Type</label>
               <div className="grid grid-cols-3 gap-4">
                 <div 
                   onClick={() => setTruckType('Box Truck')}
                   style={{ cursor: 'pointer', border: truckType === 'Box Truck' ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}
                 >
                   <img src="/boxtruck.png" alt="Box Truck" style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
                   <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>Box Truck</div>
                 </div>
                 <div 
                   onClick={() => setTruckType('Tank Trailer')}
                   style={{ cursor: 'pointer', border: truckType === 'Tank Trailer' ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}
                 >
                   <img src="/tanktrailer.png" alt="Tank Trailer" style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
                   <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>Tank Trailer</div>
                 </div>
                 <div 
                   onClick={() => setTruckType('Mega Trailer')}
                   style={{ cursor: 'pointer', border: truckType === 'Mega Trailer' ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}
                 >
                   <img src="/megatrailer.png" alt="Mega Trailer" style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
                   <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>Mega Trailer</div>
                 </div>
               </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-secondary block mb-2 uppercase">Total Cargo Weight (KG)</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="30000" 
                  value={cargoWeight} 
                  onChange={(e) => setCargoWeight(e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--primary)' }} 
                />
                <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {Number(cargoWeight).toLocaleString()} kg
                </div>
              </div>
            </div>

            <div className="mb-8" style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '4px' }}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }} />
                <span className="text-sm font-medium">Add Tier-1 Cargo Protection Insurance (+1.5% premium protection)</span>
              </label>
            </div>

            <button 
              className="btn btn-black w-full" 
              style={{ width: '100%' }}
              onClick={() => setStep(2)}
            >
              Calculate Instant Audit
            </button>
          </>
        )}

        {step === 2 && (
          <>
             <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span style={{ color: 'var(--primary)' }}>📋</span> Precision Quote Estimator
            </h2>
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div className="flex justify-between mb-4">
                <span className="text-secondary">Truck Type:</span>
                <span className="font-bold">{truckType}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-secondary">Est. Distance:</span>
                <span className="font-bold">{calculateQuote().distance.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary">VAT (15%):</span>
                <span className="font-bold">R {calculateQuote().vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">TOTAL QUOTE ESTIMATE:</span>
                <span className="font-bold text-primary-color">R {calculateQuote().total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Recalculate</button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }} 
                onClick={async () => {
                  const id = await requestQuote({ 
                    origin, 
                    destination, 
                    truckType, 
                    cargoWeight, 
                    price: `R ${calculateQuote().total.toLocaleString()}`, 
                    userId: user?.id 
                  });
                  setTrackingId(id);
                  setStep(3);
                }}
              >
                Book Shipment
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-secondary mb-8">Your logistics request has been received, logged, and assigned to active dispatch tracking.</p>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '4px', marginBottom: '2rem' }}>
              <div className="flex justify-between mb-4">
                <span className="text-secondary">TRACKING ID:</span>
                <span className="font-bold">{trackingId}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-secondary">ROUTE:</span>
                <span className="font-bold">{origin} ➔ {destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">TOTAL CHARGE:</span>
                <span className="font-bold">R {calculateQuote().total.toLocaleString()}</span>
              </div>
            </div>

            <button className="btn btn-black w-full" style={{ width: '100%' }} onClick={handleClose}>
              Return to Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
