import { ArrowRight, Truck } from 'lucide-react';
import { useOutletContext, Link } from 'react-router-dom';

export default function Landing() {
  const { setIsAuthModalOpen } = useOutletContext();
  
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <video 
          src="/truckvid1.mp4" 
          autoPlay loop muted playsInline
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
          }}
        />
        {/* Dark overlay for video */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>

        {/* Seamless white fade transition to the next section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '12vh', background: 'linear-gradient(to bottom, transparent, var(--bg-primary))', zIndex: 3 }}></div>

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <img 
            src="/logo-white.png" 
            alt="Thuta Logistics Logo" 
            style={{ height: '240px', opacity: 0.9 }}
          />
        </div>


      </section>

      {/* Intro Text Section (Moved from Hero) */}
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ lineHeight: 1.1, color: 'var(--text-primary)' }}>
            Precision in Motion.
          </h1>
          <p className="text-xl mb-10 text-secondary" style={{ lineHeight: 1.6 }}>
            A modern approach to fleet management. We ensure your cargo reaches its destination efficiently and safely, with real-time tracking and analytics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1.1rem' }}>
              Our Services
            </Link>
            <button 
              className="btn btn-outline" 
              style={{ padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Get in Touch <ArrowRight size={20} className="ml-2" style={{ marginLeft: '0.5rem' }}/>
            </button>
          </div>
        </div>
      </section>

      {/* Operational Capacity Section */}
      <section className="container mb-8" style={{ paddingBottom: '4rem', position: 'relative', zIndex: 10 }}>
        <h2 className="text-xl font-bold mb-2">Operational Capacity</h2>
        <p className="text-secondary mb-8">What makes our service the best.</p>
        
        <div className="bento-grid">
          
          {/* Fleet Card (Spans 2 cols) */}
          <div className="card flex-col justify-between bento-col-span-2" style={{ 
            padding: '2rem', 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
          }}>
            <div>
              <h3 className="font-bold text-lg mb-2">Our Fleet</h3>
              <p className="text-secondary text-sm">
                A massive fleet of modern trucks equipped with state-of-the-art tracking systems to handle any load, anywhere.
              </p>
            </div>
            <img 
              src="/truck1.jpg" 
              alt="Fleet"
              style={{ width: '100%', height: '120px', objectFit: 'cover', marginTop: '2rem', borderRadius: '8px' }}
            />
          </div>

          {/* New Warehouse Video (Spans 2 cols) */}
          <div className="card bento-col-span-2" style={{ padding: 0, overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
            <video 
              src="/warehousevid1.mp4" 
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px' }}
            />
          </div>

          {/* Stats Mini Cards (Spans 1 col, stacks vertically) */}
          <div className="flex flex-col gap-4 bento-col-span-1">
             <div className="card flex-1 justify-center items-center flex-col" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <h3 className="font-bold text-2xl mb-1">98.4%</h3>
                <p className="text-secondary text-xs text-center">On-Time Delivery</p>
             </div>
             <div className="card flex-1 justify-center items-center flex-col" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <h3 className="font-bold text-2xl mb-1">15m+</h3>
                <p className="text-secondary text-xs text-center">Tons Delivered</p>
             </div>
          </div>

          {/* African Roads Card (Spans 2 cols) */}
          <div className="card flex-col justify-between bento-col-span-2" style={{ 
            background: 'rgba(0, 0, 0, 0.85)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--white)', 
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div>
              <h3 className="font-bold text-lg mb-2">For African Roads</h3>
              <p className="text-sm" style={{ color: '#a1a1aa' }}>
                Our vehicles are optimized for the diverse and challenging terrains of sub-saharan logistics.
              </p>
            </div>
            <div className="flex gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>6+</div>
                <div className="text-sm" style={{ color: '#a1a1aa' }}>Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold">6k</div>
                <div className="text-sm" style={{ color: '#a1a1aa' }}>Active Vehicles</div>
              </div>
            </div>
          </div>

          {/* Bento Truck Image (Spans 1 col) */}
          <div className="card bento-col-span-1" style={{ padding: 0, overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
            <img 
              src="/bento-truck.jpg" 
              alt="Night Truck Bento"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px' }}
            />
          </div>

        </div>
      </section>
      
      {/* Secondary Video Section */}
      <section style={{ position: 'relative', minHeight: '50vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video 
          src="/TLvideo2.mp4" 
          autoPlay loop muted playsInline
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)'
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', padding: '2rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Ready to move your business?</h2>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            onClick={() => setIsAuthModalOpen(true)}
          >
            Request a Quote Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="container flex justify-between items-center">
          <div className="font-bold">Thuta Logistics</div>
          <div className="flex gap-4 text-sm text-secondary">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
