import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, IndianRupee, Users, Clock, Edit2, Check, X } from 'lucide-react';
import { GlassCard } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { AffiliateUser } from '../types';

// Mock Ad Component
const AdBanner: React.FC<{ type: 'header' | 'sidebar' }> = ({ type }) => (
  <div className={`bg-gray-800/50 border border-white/5 flex items-center justify-center text-gray-600 text-xs tracking-widest uppercase ${type === 'header' ? 'h-24 w-full mb-8' : 'h-64 w-full'}`}>
    Ad Space ({type})
  </div>
);

export const Affiliate: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // UPI Editing State
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [tempUpi, setTempUpi] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/affiliate' } } });
    } else if (user.role !== 'affiliate') {
      // If user is logged in but not an affiliate, redirect or show message
      // For now, redirect home or show a message
    }
  }, [user, navigate]);

  const copyLink = () => {
    if (user && 'referralCode' in user) {
      navigator.clipboard.writeText(`https://agilax.vercel.app/?ref=${(user as AffiliateUser).referralCode}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleUpdateUpi = async () => {
    if (!tempUpi.trim()) return;
    await updateProfile({ upiId: tempUpi });
    setIsEditingUpi(false);
  };

  if (!user) return null;

  if (user.role !== 'affiliate') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <GlassCard className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Affiliate Access Only</h2>
          <p className="text-gray-400 mb-6">Your account is not registered as an Affiliate.</p>
          <button onClick={() => navigate('/')} className="text-agilax-cyan hover:underline">Return Home</button>
        </GlassCard>
      </div>
    );
  }

  // Cast user to AffiliateUser for this view since we checked role
  const affiliate = user as AffiliateUser;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AdBanner type="header" />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Affiliate Dashboard</h1>
          <p className="text-gray-400">Welcome back, <span className="text-white font-semibold">{affiliate.name}</span></p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
           <span className="text-sm text-gray-400">Status:</span>
           <span className="flex items-center gap-1 text-green-400 text-sm font-semibold"><div className="w-2 h-2 rounded-full bg-green-400"></div> Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="flex items-center gap-4 border-l-4 border-l-agilax-neon">
          <div className="p-3 bg-agilax-neon/20 rounded-lg text-agilax-neon"><Users size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">Total Referrals</p>
            <p className="text-2xl font-bold">{affiliate.totalReferrals}</p>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-center gap-4 border-l-4 border-l-agilax-pink">
          <div className="p-3 bg-agilax-pink/20 rounded-lg text-agilax-pink"><IndianRupee size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-2xl font-bold">₹{affiliate.totalEarnings}</p>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-center gap-4 border-l-4 border-l-agilax-cyan">
          <div className="p-3 bg-agilax-cyan/20 rounded-lg text-agilax-cyan"><Clock size={24} /></div>
          <div>
            <p className="text-gray-400 text-sm">Pending Payout</p>
            <p className="text-2xl font-bold">₹{affiliate.pendingPayout}</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <h3 className="text-xl font-bold mb-4">Your Referral Tools</h3>
            <div className="bg-black/30 p-4 rounded-lg flex items-center justify-between gap-4 border border-white/10">
              <code className="text-agilax-cyan truncate text-sm md:text-base">
                https://agilax.vercel.app/?ref={affiliate.referralCode}
              </code>
              <button 
                onClick={copyLink}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors text-white"
              >
                <Copy size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">Share this link. You earn ₹500 for every successful purchase made through this link.</p>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold mb-4">Recent Payouts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="pb-3 font-semibold text-white">Date</th>
                    <th className="pb-3 font-semibold text-white">Amount</th>
                    <th className="pb-3 font-semibold text-white">Method</th>
                    <th className="pb-3 font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3">Oct 03, 2023</td>
                    <td className="py-3 text-white">₹{affiliate.paidAmount}</td>
                    <td className="py-3">UPI ({affiliate.upiId})</td>
                    <td className="py-3"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Paid</span></td>
                  </tr>
                  {affiliate.pendingPayout > 0 && (
                    <tr>
                      <td className="py-3">Upcoming</td>
                      <td className="py-3 text-white">₹{affiliate.pendingPayout}</td>
                      <td className="py-3">UPI ({affiliate.upiId})</td>
                      <td className="py-3"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs">Pending</span></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
           <GlassCard className="bg-gradient-to-br from-agilax-purple to-agilax-dark">
              <h3 className="text-lg font-bold mb-2 text-white">Payout Info</h3>
              <p className="text-sm text-gray-400 mb-4">Payouts are processed weekly on Mondays via UPI.</p>
              
              <div className="bg-black/20 p-3 rounded border border-white/5 relative">
                <div className="flex justify-between items-start">
                    <p className="text-xs text-gray-500 mb-1">Registered UPI</p>
                    {!isEditingUpi ? (
                         <button onClick={() => { setTempUpi(affiliate.upiId); setIsEditingUpi(true); }} className="text-gray-400 hover:text-white transition-colors">
                             <Edit2 size={14} />
                         </button>
                    ) : (
                        <div className="flex gap-2">
                             <button onClick={handleUpdateUpi} className="text-green-400 hover:text-green-300">
                                 <Check size={16} />
                             </button>
                             <button onClick={() => setIsEditingUpi(false)} className="text-red-400 hover:text-red-300">
                                 <X size={16} />
                             </button>
                        </div>
                    )}
                </div>
                
                {!isEditingUpi ? (
                    <p className="font-mono text-white break-all">{affiliate.upiId}</p>
                ) : (
                    <input 
                        type="text" 
                        value={tempUpi} 
                        onChange={(e) => setTempUpi(e.target.value)}
                        className="w-full bg-black/40 border border-white/20 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-agilax-neon"
                    />
                )}
              </div>
           </GlassCard>
           <AdBanner type="sidebar" />
        </div>
      </div>
    </div>
  );
};