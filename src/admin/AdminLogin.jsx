import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  // Simple placeholder auth: accept a password defined via env var or default
  const EXPECTED = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password === EXPECTED) {
      login();
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="auth-container">
      <form className="card" onSubmit={onSubmit}>
        <h2>Admin Login</h2>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Login</button>
        <p style={{fontSize:'0.75rem',color:'#6b7280',marginTop:'0.5rem'}}>Use password: <code>{EXPECTED}</code></p>
      </form>
      <style jsx>{`
        .auth-container { display: grid; place-items: center; min-height: 100vh; }
        .card { width: 100%; max-width: 360px; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 12px; background: white; }
        .card h2 { margin: 0 0 1rem; }
        .card input { width: 100%; padding: 0.6rem 0.75rem; margin-bottom: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; }
        .btn { width: 100%; background: #2563eb; color: white; border: none; border-radius: 8px; padding: 0.7rem 1rem; cursor: pointer; }
        .error { color: #b91c1c; margin: 0.5rem 0; }
      `}</style>
    </div>
  );
}
