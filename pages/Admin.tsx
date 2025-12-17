import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, Download } from 'lucide-react';
import { GlassCard } from '../components/UI';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Order, PayoutRequest, AffiliateUser, EarningData } from '../types';

export const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'affiliates' | 'payouts'>('orders');
  
  // Data State
  const [orders, setOrders] = useState<Order[]>([]);
  const [affiliates, setAffiliates] = useState<AffiliateUser[]>([]);
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [chartData, setChartData] = useState<EarningData[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/admin' } } });
      return;
    }
    
    if (user.role !== 'admin') {
      return; // Will render access denied view
    }

    const loadData = async () => {
      const o = await api.getOrders();
      setOrders(o);
      const a = await api.getAllAffiliates();
      setAffiliates(a);
      const p = await api.getPayouts();
      setPayouts(p);
      const c = await api.getEarningsHistory();
      setChartData(c);
    };
    loadData();
  }, [user, navigate, activeTab]);

  const handleMarkSent = async (id: string) => {
    await api.updateOrder(id, { isBundleSent: true, status: 'completed' });
    // Reload logic or optimistic update
    setOrders(prev => prev.map(o => o.id === id ? { ...o, isBundleSent: true, status: 'completed' } : o));
  };

  const handleMarkPaid = async (id: string) => {
    await api.markPayoutPaid(id);
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'paid' } : p));
  };

  if (!user) return null;

  if (user.role !== 'admin') {
     return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <GlassCard className="text-center p-8 max-w-md border-red-500/30">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Access Denied</h2>
          <p className="text-gray-400 mb-6">You do not have administrative privileges.</p>
          <button onClick={() => navigate('/')} className="text-agilax-cyan hover:underline">Return Home</button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <GlassCard>
           <p className="text-sm text-gray-400">Total Sales</p>
           <p className="text-2xl font-bold text-white">₹{orders.reduce((acc, o) => acc + o.amount, 0)}</p>
        </GlassCard>
        <GlassCard>
           <p className="text-sm text-gray-400">Total Orders</p>
           <p className="text-2xl font-bold text-white">{orders.length}</p>
        </GlassCard>
        <GlassCard>
           <p className="text-sm text-gray-400">Pending Orders</p>
           <p className="text-2xl font-bold text-yellow-400">{orders.filter(o => !o.isBundleSent).length}</p>
        </GlassCard>
        <GlassCard>
           <p className="text-sm text-gray-400">Net Profit</p>
           <p className="text-2xl font-bold text-green-400">₹{orders.reduce((acc, o) => acc + o.amount, 0) - payouts.reduce((acc, p) => p.status === 'paid' ? acc + p.amount : acc, 0)}</p>
        </GlassCard>
      </div>

      <div className="flex gap-4 border-b border-white/10 mb-6 overflow-x-auto">
        {(['orders', 'affiliates', 'payouts'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-agilax-neon text-agilax-neon' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'orders' && (
          <GlassCard className="overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Order Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-gray-200">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Screenshot</th>
                    <th className="p-3">Referred By</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-mono text-xs text-gray-500">{order.id}</td>
                      <td className="p-3 text-white">{order.buyerEmail}</td>
                      <td className="p-3">
                        <a href={order.screenshotUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-agilax-cyan hover:underline">
                           <Download size={14} /> View
                        </a>
                      </td>
                      <td className="p-3">{order.referredBy || '-'}</td>
                      <td className="p-3">
                        {order.isBundleSent ? 
                          <span className="text-green-400 flex items-center gap-1"><Check size={14} /> Sent</span> : 
                          <span className="text-yellow-400 flex items-center gap-1">Pending</span>
                        }
                      </td>
                      <td className="p-3">
                        {!order.isBundleSent && (
                          <button 
                            onClick={() => handleMarkSent(order.id)}
                            className="bg-agilax-neon hover:bg-agilax-purple text-white px-3 py-1 rounded-md text-xs transition-colors"
                          >
                            Mark Sent
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === 'affiliates' && (
          <GlassCard>
            <h3 className="text-xl font-bold mb-4">Affiliate Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-white/5 text-gray-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Code</th>
                    <th className="p-3 text-right">Referrals</th>
                    <th className="p-3 text-right">Earnings</th>
                    <th className="p-3 text-right">Pending</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {affiliates.map(aff => (
                    <tr key={aff.id}>
                      <td className="p-3 font-medium text-white">{aff.name}</td>
                      <td className="p-3 font-mono text-xs">{aff.referralCode}</td>
                      <td className="p-3 text-right">{aff.totalReferrals}</td>
                      <td className="p-3 text-right text-green-400">₹{aff.totalEarnings}</td>
                      <td className="p-3 text-right text-yellow-400">₹{aff.pendingPayout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === 'payouts' && (
          <GlassCard>
             <h3 className="text-xl font-bold mb-4">Payout Requests</h3>
             <div className="space-y-4">
                {payouts.length === 0 && <p className="text-gray-500 text-center py-8">No active payout requests.</p>}
                {payouts.map(payout => (
                  <div key={payout.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-agilax-purple flex items-center justify-center font-bold text-white">
                        {payout.affiliateName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold">{payout.affiliateName}</p>
                        <p className="text-xs text-gray-400">UPI: {payout.affiliateUpi}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-bold text-white">₹{payout.amount}</p>
                       <p className="text-xs text-gray-500">{payout.date}</p>
                    </div>
                    <div>
                      {payout.status === 'pending' ? (
                        <button 
                          onClick={() => handleMarkPaid(payout.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span className="text-green-500 font-semibold text-sm border border-green-500/30 px-3 py-1 rounded">Paid</span>
                      )}
                    </div>
                  </div>
                ))}
             </div>
          </GlassCard>
        )}
      </div>
      
      {/* Sales Chart */}
      <GlassCard className="mt-8">
        <h3 className="text-xl font-bold mb-6">Weekly Earnings Overview</h3>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
               <XAxis dataKey="name" stroke="#888" tick={{fill: '#ccc'}} />
               <YAxis stroke="#888" tick={{fill: '#ccc'}} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#010030', borderColor: '#333' }}
                 itemStyle={{ color: '#fff' }}
               />
               <Bar dataKey="amount" fill="#7226FF" radius={[4, 4, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};