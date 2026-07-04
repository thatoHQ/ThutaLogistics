import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Menu } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import QuoteModal from './QuoteModal';
import AuthModal from './AuthModal';

function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isServices = location.pathname === '/services'; // Detect if we are on the dark services page
  
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  // Dynamic styling based on route
  const navTextColor = isServices ? 'white' : 'var(--text-primary)';
  const logoSrc = isServices ? '/logo-white.png' : '/logo-black.png';
  const buttonStyle = isServices ? {
    color: 'white',
    borderColor: 'rgba(255,255,255,0.6)',
    fontWeight: 600
  } : {
    fontWeight: 600
  };

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Main Navbar */}
      <nav className="navbar flex items-center justify-between" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: isServices ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.15)', // Darker glass for services
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isServices ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        color: navTextColor
      }}>
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logoSrc} alt="Thuta Logistics Logo" style={{ height: '32px' }} />
          </Link>
        </div>
        
        {!user && (
          <div className="nav-links flex items-center gap-8">
            <Link to="/" style={{ color: navTextColor }}>Home</Link>
            <Link to="/services" style={{ color: navTextColor }}>Services</Link>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          {!user ? (
            <button 
              className="btn btn-outline" 
              style={buttonStyle}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In
            </button>
          ) : (
            <button 
              className="btn btn-outline" 
              style={buttonStyle}
              onClick={logout}
            >
              Logout ({user.role})
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex' }}>
        <Outlet context={{ setIsQuoteModalOpen, setIsAuthModalOpen }} />
      </main>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default Layout;
