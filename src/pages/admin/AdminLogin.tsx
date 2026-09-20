import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldAlert, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated, sessionExpired, clearSessionExpired } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(trimmedEmail, password);
    setIsSubmitting(false);

    if (result.ok) {
      clearSessionExpired();
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07151D] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1479D1_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Company Identity Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1479D1] to-[#063A58] text-white font-serif font-bold text-xl shadow-lg border border-white/20 mb-3">
            ISG
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white uppercase font-serif">
            Infinity Space Group
          </h1>
          <p className="text-xs tracking-widest text-[#F4C542] uppercase font-mono mt-1">
            Administrative Portal
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Ranchi, Jharkhand, India
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-xl border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#07151D] tracking-tight">
              Sign In to Admin Console
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your authorized credentials to access client enquiries.
            </p>
          </div>

          {/* Session Expiration Warning */}
          {sessionExpired && (
            <div className="mb-5 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start space-x-2 text-xs text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Your session has expired. Please sign in again to continue.</span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-700"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1"
              >
                Admin Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@infinityspacegroup.in"
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1479D1] focus:border-[#1479D1] transition-colors outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1479D1] focus:border-[#1479D1] transition-colors outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#063A58] hover:bg-[#1479D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1479D1] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400">
              Authorized personnel only. Access is monitored and rate-limited.
            </p>
          </div>
        </div>

        {/* Back to Live Site Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-xs text-gray-400 hover:text-[#F4C542] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
