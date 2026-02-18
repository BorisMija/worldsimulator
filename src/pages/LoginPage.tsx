import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location.state?.from?.pathname || '/';

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await auth.login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await auth.register(username, password);
      await auth.login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Register failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-2xl px-4">
        <div className="mb-6 bg-slate-900 rounded-lg border border-slate-700 p-4">
          <h2 className="text-xl font-semibold">Bine ai venit pe WorldSimulator</h2>
          <p className="text-sm text-slate-300 mt-2">Crează scenarii, salvează-le și experimentează consecințele deciziilor tale. Înregistrează-te pentru a păstra istoricul tău.</p>
        </div>
        <form className="w-full max-w-sm p-6 bg-slate-800 rounded shadow" onSubmit={handleLogin}>
        <h2 className="text-xl font-semibold mb-4">Autentificare</h2>
        {error && <div className="mb-3 text-red-300">{error}</div>}
        <div className="mb-3">
          <label className="block text-sm">Username</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-700" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Parolă</label>
          <input type="password" className="w-full mt-1 p-2 rounded bg-slate-700" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-sky-500 px-3 py-2 rounded">Conectare</button>
          <button type="button" onClick={handleRegister} className="flex-1 bg-emerald-500 px-3 py-2 rounded">Înregistrare</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
