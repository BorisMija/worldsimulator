import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-2xl px-4">
        <div className="mb-6 bg-slate-900 rounded-lg border border-slate-700 p-4">
          <h2 className="text-xl font-semibold">Bine ai venit pe WorldSimulator</h2>
          <p className="text-sm text-slate-300 mt-2">Funcționalitatea de autentificare a fost dezactivată.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
