import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AdminLogin() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="card" onSubmit={onSubmit}>
        <h2>Admin Login</h2>
        {auth && auth._unconfigured && (
          <p className="error">Admin is not configured yet. Add Firebase env keys to .env.local and restart the dev server.</p>
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Login</button>
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
