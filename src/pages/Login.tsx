import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { signIn, isAuthenticated } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn(email, password);
      if (result.user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Nieprawidłowy email lub hasło');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-gray-900">
      <div className="flex-grow flex items-center justify-center px-4 bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
        >
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-white">
              Zaloguj się
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Panel administracyjny
            </p>
            
            {/* Mock credentials info */}
            <div className="mt-4 p-3 bg-blue-900/50 rounded-lg text-left">
              <p className="text-xs text-blue-200 font-semibold mb-2">Dane testowe:</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@gogols.pl');
                    setPassword('admin123');
                  }}
                  className="w-full text-xs bg-blue-700 hover:bg-blue-600 text-white p-2 rounded transition-colors"
                >
                  Wypełnij dane Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('superadmin@gogols.pl');
                    setPassword('superadmin123');
                  }}
                  className="w-full text-xs bg-purple-700 hover:bg-purple-600 text-white p-2 rounded transition-colors"
                >
                  Wypełnij dane Super Admin
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Hasło"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-serif font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;