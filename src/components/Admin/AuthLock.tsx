import React, { useState, useEffect } from 'react';
import { FiLock, FiKey, FiCheck } from 'react-icons/fi';

const AUTH_STORAGE_KEY = 'spacefix_admin_auth_token';
const DEFAULT_PIN = 'BohdanBiegacz123';

interface Props {
  children: React.ReactNode;
}

export const AuthLock: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved === 'authorized') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'authorized');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Nieprawidłowe hasło dostępu. Spróbuj ponownie.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1c1d11] text-white">
            <FiLock className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-center text-2xl font-bold text-[#1c1d11]">Panel Edycji Cennika</h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Podaj hasło dostępu do panelu zarządzania cenami SpaceFix
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="pin" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Hasło / PIN dostępu
              </label>
              <div className="relative mt-1.5">
                <input
                  id="pin"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Wpisz hasło..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-[#1c1d11] focus:outline-none focus:ring-2 focus:ring-[#1c1d11]/20"
                  autoFocus
                />
                <FiKey className="absolute right-3.5 top-3.5 h-5 w-5 text-slate-400" />
              </div>
              {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1c1d11] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2a2b1a] active:scale-[0.99]"
            >
              <FiCheck className="h-4 w-4" />
              Zaloguj się do panelu
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Panel administratora SpaceFix
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Wyloguj się
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
