import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom';
import { LayoutDashboard, Truck, Map, Users, Settings, LogOut, FileText, Phone, Wrench } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const { setIsQuoteModalOpen } = useOutletContext();

  const isActive = (route) => path === route || path === route + '/';

  if (user?.role === 'driver') {
    return (
      <div style={{ display: 'flex', width: '100%', background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 65px)' }}>
        <aside style={{ width: '240px', background: 'var(--white)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Driver Portal</div>
            <Link to="/dashboard" className={`flex items-center gap-3 ${isActive('/dashboard') ? 'bg-red-100 text-primary' : 'text-secondary hover:text-primary'}`} style={{ padding: '0.75rem 1rem', borderRadius: '4px', fontWeight: 500, background: isActive('/dashboard') ? '#fee2e2' : 'transparent', color: isActive('/dashboard') ? 'var(--primary)' : 'inherit' }}>
              <LayoutDashboard size={18} /> My Dashboard
            </Link>
            <Link to="/dashboard/map" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/map') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/map') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
              <Map size={18} /> Map View
            </Link>
            <Link to="/dashboard/report-fault" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/report-fault') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/report-fault') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
              <Wrench size={18} /> Report Fault
            </Link>
          </div>
          <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <a href="#" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
              <Settings size={18} /> Settings
            </a>
          </div>
        </aside>
        <Outlet context={{ setIsQuoteModalOpen }} />
      </div>
    );
  }

  if (user?.role === 'user') {
    return (
      <div style={{ display: 'flex', width: '100%', background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 65px)' }}>
        {/* User Sidebar */}
        <aside style={{ width: '240px', background: 'var(--white)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>User Portal</div>
            <Link to="/dashboard" className={`flex items-center gap-3 ${isActive('/dashboard') ? 'bg-red-100 text-primary' : 'text-secondary hover:text-primary'}`} style={{ padding: '0.75rem 1rem', borderRadius: '4px', fontWeight: 500, background: isActive('/dashboard') ? '#fee2e2' : 'transparent', color: isActive('/dashboard') ? 'var(--primary)' : 'inherit' }}>
              <LayoutDashboard size={18} /> My Dashboard
            </Link>
            <Link to="/dashboard/map" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/map') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/map') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
              <Map size={18} /> Map View
            </Link>
            <Link to="/dashboard/track" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/track') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/track') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
              <FileText size={18} /> Track Shipments
            </Link>
          </div>
          
          <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <a href="#" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
              <Phone size={18} /> Contact Admin
            </a>
            <a href="#" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
              <Settings size={18} /> Settings
            </a>
          </div>
        </aside>

        {/* Dynamic Content */}
        <Outlet context={{ setIsQuoteModalOpen }} />
      </div>
    );
  }

  // Admin Sidebar
  return (
    <div style={{ display: 'flex', width: '100%', background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 65px)' }}>
      <aside style={{ width: '240px', background: 'var(--white)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Main Menu</div>
          <Link to="/dashboard" className="flex items-center gap-3" style={{ padding: '0.75rem 1rem', borderRadius: '4px', fontWeight: 500, background: isActive('/dashboard') ? '#fee2e2' : 'transparent', color: isActive('/dashboard') ? 'var(--primary)' : 'var(--text-secondary)' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/dashboard/fleet" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/fleet') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/fleet') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <Truck size={18} /> Our Fleet
          </Link>
          <Link to="/dashboard/quote-requests" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/quote-requests') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/quote-requests') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <FileText size={18} /> Quote Requests
          </Link>
          <Link to="/dashboard/maintenance" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/maintenance') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/maintenance') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <Wrench size={18} /> Maintenance
          </Link>
          <Link to="/dashboard/map" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/map') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/map') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <Map size={18} /> Map View
          </Link>
          <Link to="/dashboard/drivers" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/drivers') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/drivers') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <Users size={18} /> Drivers
          </Link>
          <Link to="/dashboard/clients" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500, background: isActive('/dashboard/clients') ? '#fee2e2' : 'transparent', color: isActive('/dashboard/clients') ? 'var(--primary)' : 'inherit', borderRadius: '4px' }}>
            <Users size={18} /> Clients
          </Link>
        </div>
        
        <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <a href="#" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
            <Settings size={18} /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 text-secondary hover:text-primary" style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
            <LogOut size={18} /> Logout
          </a>
        </div>
      </aside>

      {/* Dynamic Content */}
      <Outlet context={{ setIsQuoteModalOpen }} />
    </div>
  );
}
