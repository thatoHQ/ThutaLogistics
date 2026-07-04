import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import TrackShipment from './pages/TrackShipment';
import Services from './pages/Services';
import Layout from './components/Layout';
import './index.css';

import { AuthProvider, useAuth } from './AuthContext';
import { LogisticsProvider } from './LogisticsContext';
import { Toaster } from 'react-hot-toast';

// Dashboard sub-pages
import AdminOverview from './pages/dashboard/AdminOverview';
import UserOverview from './pages/dashboard/UserOverview';
import MapView from './pages/dashboard/MapView';
import OurFleet from './pages/dashboard/OurFleet';
import Drivers from './pages/dashboard/Drivers';
import Clients from './pages/dashboard/Clients';
import Maintenance from './pages/dashboard/Maintenance';
import QuoteRequests from './pages/dashboard/QuoteRequests';
import DriverOverview from './pages/dashboard/DriverOverview';
import DriverMaintenance from './pages/dashboard/DriverMaintenance';

// A wrapper to handle the index route of dashboard based on role
function DashboardIndex() {
  const { user } = useAuth();
  if (user?.role === 'user') return <UserOverview />;
  if (user?.role === 'driver') return <DriverOverview />;
  if (user?.role === 'admin') return <AdminOverview />;
  return <Navigate to="/" />; // fallback
}

// A wrapper to protect public routes from logged-in users
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// A wrapper to protect dashboard routes (Any logged-in user)
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

// A wrapper to protect admin-only routes
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

// A wrapper to protect driver-only routes
function DriverRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== 'driver' && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes - redirect to dashboard if logged in */}
        <Route index element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="services" element={<PublicRoute><Services /></PublicRoute>} />
        
        {/* Protected Dashboard Routes */}
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<DashboardIndex />} />
          <Route path="map" element={<MapView />} />
          <Route path="track" element={<TrackShipment />} />
          
          {/* Admin Only Routes */}
          <Route path="fleet" element={<AdminRoute><OurFleet /></AdminRoute>} />
          <Route path="drivers" element={<AdminRoute><Drivers /></AdminRoute>} />
          <Route path="clients" element={<AdminRoute><Clients /></AdminRoute>} />
          <Route path="maintenance" element={<AdminRoute><Maintenance /></AdminRoute>} />
          <Route path="quote-requests" element={<AdminRoute><QuoteRequests /></AdminRoute>} />
          
          {/* Driver Routes */}
          <Route path="report-fault" element={<DriverRoute><DriverMaintenance /></DriverRoute>} />
        </Route>
        
        {/* Public Track (deprecated, moving to dashboard, but keep for fallback) */}
        <Route path="track" element={<PublicRoute><TrackShipment /></PublicRoute>} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <LogisticsProvider>
        <Router>
          <Toaster position="top-center" />
          <AppRoutes />
        </Router>
      </LogisticsProvider>
    </AuthProvider>
  );
}

export default App;
