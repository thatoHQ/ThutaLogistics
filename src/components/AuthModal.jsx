import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password, 'user', fullName);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      console.error("Auth Error:", err);
      // Fallback for weird Supabase error objects
      const errMsg = err?.message || err?.error_description || (typeof err === 'object' ? JSON.stringify(err) : String(err));
      setError(errMsg === '{}' ? 'Network Error or Invalid Credentials' : errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="card" style={{ width: '400px', maxWidth: '90vw', padding: '2rem', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', lineHeight: 1 }}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <button 
              type="button"
              className="btn btn-outline" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.75rem', fontWeight: 600, border: '1px solid var(--border)', background: 'var(--white)' }}
              onClick={() => {
                 import('../lib/supabaseClient').then(({ supabase }) => {
                   supabase.auth.signInWithOAuth({ provider: 'google' });
                 });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              {isSignUp ? 'Sign up' : 'Sign in'} with Google
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0 0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <div style={{ padding: '0 1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Or continue with email</div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="text-xs font-bold text-secondary block mb-1 uppercase">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-secondary block mb-1 uppercase">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-secondary block mb-1 uppercase">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-black" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-secondary">
          {isSignUp ? 'Already have an account? ' : 'Need an account? '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
