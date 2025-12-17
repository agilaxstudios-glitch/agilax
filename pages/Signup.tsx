import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GlassCard, GradientButton, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAffiliate: false,
    upiId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.isAffiliate && !formData.upiId) {
      setError('UPI ID is required for Affiliate accounts');
      return;
    }

    setLoading(true);
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAffiliate: formData.isAffiliate,
        upiId: formData.upiId
      });

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Registration failed. Try a different email.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
          <p className="text-gray-400">Join Agilax Versel today</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <Input 
            type="password" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />

          <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.isAffiliate}
                onChange={(e) => setFormData({...formData, isAffiliate: e.target.checked})}
                className="w-5 h-5 rounded border-gray-500 text-agilax-neon focus:ring-agilax-neon"
              />
              <span className="text-sm font-medium text-white">I want to become an Affiliate</span>
            </label>
            {formData.isAffiliate && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                 <Input 
                   placeholder="UPI ID (for payouts)" 
                   value={formData.upiId}
                   onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                   required={formData.isAffiliate}
                   className="text-sm"
                 />
                 <p className="text-xs text-gray-400 mt-1 ml-1">Earn ₹500 per referral.</p>
              </div>
            )}
          </div>

          <GradientButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </GradientButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-agilax-cyan hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
};