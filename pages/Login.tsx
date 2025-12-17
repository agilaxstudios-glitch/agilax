import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { GlassCard, GradientButton, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const user = await login(email, password);
    setLoading(false);
    
    if (user) {
      // Role-based redirection logic
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'affiliate') {
        navigate('/affiliate', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-agilax-neon/20 rounded-full blur-3xl"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Lock className="text-agilax-cyan" size={24} />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
          <p className="text-gray-400">Login to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <GradientButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </GradientButton>
        </form>

        <div className="mt-6 text-center relative z-10">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-agilax-cyan hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};