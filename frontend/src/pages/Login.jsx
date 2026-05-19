import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const redirect = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, redirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="container-custom py-24 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border border-border p-8 bg-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold uppercase tracking-tighter mb-2">
            Login
          </h1>
          <p className="text-muted-foreground text-sm">
            Access your HyperFit dashboard and order details.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold mb-2">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs uppercase tracking-wider font-bold">Password</label>
              <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-2">
                Forgot Password?
              </Link>
            </div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-4 uppercase font-bold tracking-widest disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          New to HyperFit?{' '}
          <Link to="/register" className="text-foreground font-medium hover:underline underline-offset-2">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
