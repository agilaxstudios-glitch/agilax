import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Camera, Music, Palette, CheckCircle, Zap, Shield, Smartphone } from 'lucide-react';
import { GradientButton, GlassCard, SectionBadge } from '../components/UI';
import { useAuth } from '../context/AuthContext';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 rounded-lg bg-gradient-to-br from-agilax-purple to-agilax-dark border border-white/10 text-agilax-cyan shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{desc}</p>
    </div>
  </div>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuy = () => {
    if (user) {
      navigate('/payment');
    } else {
      // Redirect to signup, then back to payment
      navigate('/signup', { state: { from: { pathname: '/payment' } } });
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <SectionBadge>Limited Time Offer</SectionBadge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            The Ultimate <span className="gradient-text neon-text">50GB Editing Bundle</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to edit like a pro. Cinematic LUTs, SFX, Presets & More. Pay once, use forever.
          </p>
          
          <div className="flex flex-col items-center gap-4 pt-8">
            <div className="text-center">
               <span className="text-gray-400 line-through text-lg">₹9,999</span>
               <span className="text-4xl font-bold text-white ml-3">₹999 Only</span>
            </div>
            <GradientButton onClick={handleBuy} className="text-lg px-12 py-4 animate-pulse">
              GET INSTANT ACCESS
            </GradientButton>

            {/* Adsterra Banner Placeholder 720x90 */}
            <div className="w-full max-w-[728px] h-[90px] bg-gray-900/40 border border-white/5 rounded flex items-center justify-center my-4 overflow-hidden">
                <span className="text-gray-600 text-xs uppercase tracking-widest">Adsterra Banner (720x90)</span>
                {/* Insert Adsterra Script Here */}
            </div>

            <p className="text-sm text-gray-500">Digital Delivery • 100% Secure</p>
          </div>
        </div>
      </section>

      {/* Bundle Contents Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Inside The Box?</h2>
          <p className="text-gray-400">Over 50GB of premium assets sorted for creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <GlassCard className="hover:bg-white/10 transition-colors">
            <FeatureItem 
              icon={<Video size={24} />}
              title="Video Editing Assets"
              desc="4K Cinematic LUTs, Premiere Pro Presets, After Effects Transitions, Motion Graphics."
            />
          </GlassCard>
          <GlassCard className="hover:bg-white/10 transition-colors">
            <FeatureItem 
              icon={<Camera size={24} />}
              title="Photo Editing Assets"
              desc="Lightroom Presets (Mobile + PC), Photoshop Actions, Overlays, Sky replacements."
            />
          </GlassCard>
          <GlassCard className="hover:bg-white/10 transition-colors">
            <FeatureItem 
              icon={<Music size={24} />}
              title="Audio Mastery"
              desc="Background Music Library, Cinematic SFX, Trending Reels & Shorts Sound Effects."
            />
          </GlassCard>
          <GlassCard className="hover:bg-white/10 transition-colors">
            <FeatureItem 
              icon={<Palette size={24} />}
              title="Graphic Design"
              desc="Canva Pro Templates, YouTube Thumbnails, Instagram Reels Covers, Premium Fonts."
            />
          </GlassCard>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-agilax-neon/20 flex items-center justify-center text-agilax-cyan mb-4">
                 <Shield size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
               <p className="text-sm text-gray-400">One time payment. No monthly subscriptions.</p>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-agilax-neon/20 flex items-center justify-center text-agilax-cyan mb-4">
                 <Smartphone size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Mobile & PC</h3>
               <p className="text-sm text-gray-400">Assets work perfectly on both mobile and desktop.</p>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-agilax-neon/20 flex items-center justify-center text-agilax-cyan mb-4">
                 <CheckCircle size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
               <p className="text-sm text-gray-400">Easy to use drag and drop assets.</p>
             </div>
           </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="buy" className="max-w-4xl mx-auto px-4 text-center">
        <GlassCard className="border-agilax-pink/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Video size={200} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Content?</h2>
          <p className="text-gray-300 mb-8">Join 10,000+ creators using Agilax Versel assets today.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="text-left">
              <p className="text-sm text-gray-400">Total Bundle Value</p>
              <p className="text-3xl font-bold line-through text-gray-500">₹9,999</p>
            </div>
            <div className="h-12 w-px bg-white/20 hidden md:block"></div>
            <div className="text-left">
              <p className="text-sm text-agilax-cyan font-bold">Today's Price</p>
              <p className="text-5xl font-bold text-white">₹999</p>
            </div>
          </div>
          <div className="mt-8">
            <GradientButton onClick={handleBuy} className="w-full md:w-auto text-xl py-4 px-16">
              BUY NOW SECURELY
            </GradientButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};