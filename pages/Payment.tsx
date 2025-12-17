import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { GlassCard, GradientButton, Input } from '../components/UI';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/payment' } } });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !file) return;

    setIsSubmitting(true);
    await api.submitOrder(user.email, file);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (!user) return null; // Or loading spinner

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="max-w-md w-full text-center border-agilax-neon/50">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Submitted!</h2>
          <p className="text-gray-300 mb-8">
            Thank you for your purchase. Within 24 hours your editing bundle will be sent to 
            <span className="text-agilax-cyan font-semibold"> {user.email}</span>.
          </p>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
            <p className="text-sm font-semibold text-agilax-pink uppercase tracking-wide mb-2">Want to earn back your money?</p>
            <h3 className="text-xl font-bold mb-2">Refer & Earn ₹500</h3>
            <p className="text-xs text-gray-400 mb-4">Join our affiliate program and earn ₹500 for every friend who buys the bundle.</p>
            {user.role === 'affiliate' ? (
               <GradientButton onClick={() => navigate('/affiliate')} className="w-full flex items-center justify-center gap-2">
                 Go to Dashboard <ArrowRight size={18} />
               </GradientButton>
            ) : (
              <p className="text-xs text-agilax-cyan">Contact support to upgrade to Affiliate.</p>
            )}
          </div>
          
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white text-sm">Return Home</button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Complete Your Purchase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Step 1: Payment Details */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-agilax-neon flex items-center justify-center font-bold text-white">1</div>
            <h2 className="text-xl font-bold">Make Payment</h2>
          </div>
          
          <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center space-y-4">
             {/* Mock QR Code */}
             <div className="relative">
                <QrCode size={180} className="text-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-2 font-bold text-black text-xs">UPI QR</span>
                </div>
             </div>
             <p className="text-black font-bold text-lg tracking-wider">₹999.00</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg flex justify-between items-center border border-white/10">
              <span className="text-gray-400">UPI ID:</span>
              <div className="flex items-center gap-2">
                <code className="text-agilax-cyan font-mono bg-black/30 px-2 py-1 rounded">agilax@ptyes</code>
                <button className="text-xs text-agilax-pink hover:underline" onClick={() => navigator.clipboard.writeText('agilax@ptyes')}>COPY</button>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>1. Open any UPI App (GPay, PhonePe, Paytm).</p>
              <p>2. Scan QR or enter UPI ID.</p>
              <p>3. Pay ₹999 and take a <strong>screenshot</strong>.</p>
            </div>
          </div>
        </GlassCard>

        {/* Step 2: Submission Form */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-agilax-neon flex items-center justify-center font-bold text-white">2</div>
            <h2 className="text-xl font-bold">Confirm Order</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed">
                {user.email}
              </div>
              <p className="text-xs text-gray-500">Logged in as {user.name}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Upload Payment Screenshot</label>
              <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors group cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400 group-hover:text-agilax-neon mb-3 transition-colors" size={32} />
                  <p className="text-sm text-gray-300 font-medium">
                    {file ? file.name : "Click to upload screenshot"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG allowed</p>
                </div>
              </div>
            </div>

            <GradientButton 
              type="submit" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Submit & Get Access'}
            </GradientButton>
            
            <p className="text-xs text-center text-gray-500">
              By submitting, you agree to our Terms of Service.
            </p>
          </form>
        </GlassCard>

      </div>
    </div>
  );
};