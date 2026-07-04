import { PackageCheck, ShieldCheck, Globe, Truck, FileText, BarChart3 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

export default function Services() {
  const { setIsAuthModalOpen } = useOutletContext();
  
  const services = [
    {
      title: "Import & Export",
      desc: "Comprehensive global shipping solutions for import and export across borders."
    },
    {
      title: "Custom Clearance",
      desc: "Expert handling of all customs documentation and procedures to ensure smooth transit."
    },
    {
      title: "Warehousing",
      desc: "Secure storage facilities with inventory management and distribution services."
    },
    {
      title: "Last Mile Delivery",
      desc: "Efficient and reliable delivery to the final destination, ensuring customer satisfaction."
    },
    {
      title: "Supply Chain Consulting",
      desc: "Strategic advice to optimize your supply chain for cost and speed."
    },
    {
      title: "Logistics Analytics",
      desc: "Data-driven insights to track performance and improve logistics operations."
    }
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Fixed Parallax Background Image */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <img src="/truck-night.jpg" alt="Night Truck" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.65)' }}></div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Top spacer to push the first panel down slightly below the navbar */}
        <div style={{ height: '10vh' }}></div>

        {/* Parallax Service Sections */}
        {services.map((service, index) => {
          // Alternate left and right alignment
          const isEven = index % 2 === 0;
          
          // Map the uploaded images to the services (reusing some if needed to make 6)
          const serviceImages = [
            '/service4.jpg', // Import & Export (Fabric rolls)
            '/custom_clearance.jpg', // Custom Clearance (Handshake)
            '/warehouse_blue.jpg', // Warehousing (Blue Warehouse)
            '/last_mile.jpg', // Last Mile (Foggy Trucks)
            '/supply_chain.jpg', // Supply Chain Consulting (Packing boxes)
            '/service1.jpg'  // Logistics Analytics (Desk/Charts)
          ];
          const currentImage = serviceImages[index];

          return (
            <section key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '4rem 5%' }}>
              <div className="service-row">
                
                {/* Text Panel (Always on left) */}
                <div 
                  className="hover-scale" 
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    flex: '1',
                    width: '100%',
                    padding: '4rem 3rem',
                    background: 'rgba(15, 15, 15, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '4px solid var(--primary)',
                    borderRadius: '24px',
                    color: 'white',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Faint Background Number */}
                  <span style={{ 
                    position: 'absolute', 
                    top: '-20px', 
                    right: '20px', 
                    fontSize: '150px', 
                    fontWeight: 900, 
                    color: 'rgba(255,255,255,0.03)',
                    zIndex: 0,
                    lineHeight: 1
                  }}>
                    0{index + 1}
                  </span>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{service.title}</h2>
                    <p className="text-lg md:text-xl" style={{ color: '#d1d5db', lineHeight: 1.7 }}>{service.desc}</p>
                  </div>
                </div>

                {/* Service Image (Always on right) */}
                <div 
                  className="hover-scale"
                  style={{
                    position: 'relative',
                    flex: '1',
                    width: '100%',
                    height: '400px', // Fixed height to match text panel proportions nicely
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <img 
                    src={currentImage} 
                    alt={service.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* Subtle dark overlay for premium look */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                </div>

              </div>
            </section>
          );
        })}

        {/* Final CTA Section */}
        <section style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '0 5%', marginBottom: '4rem' }}>
          <div className="hover-scale" style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              padding: '4rem 2rem', 
              background: 'rgba(15, 15, 15, 0.95)', 
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '32px',
              color: 'var(--white)',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
            <h3 className="font-bold text-3xl md:text-4xl">Have a project in mind?</h3>
            <p className="text-lg" style={{ color: '#a1a1aa' }}>Let's build a reliable supply chain together.</p>
            <button 
              style={{ 
                background: 'rgba(255,255,255,0.1)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.2)', 
                padding: '1.2rem 2.5rem', 
                borderRadius: '16px', 
                fontSize: '1.1rem', 
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                marginTop: '1rem'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Get a Quote ↗
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
