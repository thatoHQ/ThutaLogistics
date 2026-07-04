import { Search, MapPin, CheckCircle, Navigation } from 'lucide-react';

export default function TrackShipment() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Tracking Input Header */}
      <section style={{ width: '100%', background: 'var(--bg-secondary)', padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-4xl font-bold mb-4">Track Shipment</h1>
        <p className="text-secondary mb-8">Real-time transparency, wherever your cargo is.</p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Enter Tracking ID (e.g. TR-1021)"
            defaultValue="TR-1021"
            style={{ flex: 1, border: 'none', outline: 'none', padding: '1rem', fontSize: '1rem' }}
          />
          <button className="btn btn-black" style={{ padding: '0 2rem', borderRadius: 0 }}>
            Track
          </button>
        </div>
      </section>

      {/* Tracking Details */}
      <section className="container mt-8" style={{ width: '100%', maxWidth: '1000px', padding: '2rem' }}>
        <div className="card grid grid-cols-2 gap-8" style={{ padding: 0, overflow: 'hidden' }}>
          
          <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="font-bold text-lg mb-2 text-center text-secondary">Awaiting Tracking ID</h3>
            <p className="text-secondary text-center text-sm">Please enter your tracking ID above to view the journey status of your cargo.</p>
          </div>
          
          <div style={{ background: 'var(--bg-secondary)' }}>
            <img 
              src="/truck2.jpg" 
              alt="Truck on road" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

        </div>
      </section>

    </div>
  );
}
