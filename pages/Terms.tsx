import React from 'react';
import { GlassCard } from '../components/UI';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>
      <GlassCard className="text-gray-300">
        <h3 className="text-xl font-bold text-white mt-2 mb-3">1. Introduction</h3>
        <p className="mb-6 leading-relaxed">
          Welcome to Agilax Versel. By purchasing our products or using our website, you agree to be bound by these terms and conditions.
        </p>
        
        <h3 className="text-xl font-bold text-white mt-6 mb-3">2. License & Usage Rights</h3>
        <p className="mb-6 leading-relaxed">
          When you purchase the "50GB Editing Bundle", you are granted a non-exclusive, non-transferable, royalty-free license to use the assets in your personal and commercial projects (such as YouTube videos, Instagram content, client work, etc.).
        </p>
        <p className="mb-6 leading-relaxed font-semibold text-white/80">
          You are strictly PROHIBITED from:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Reselling, sub-licensing, sharing, or redistributing the source files (assets) directly.</li>
          <li>Uploading the assets to any public server or file-sharing website.</li>
          <li>Claiming copyright ownership of the raw assets.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">3. Affiliate Program</h3>
        <p className="mb-6 leading-relaxed">
          Affiliates earn a commission for every successful sale referred via their unique link. We reserve the right to withhold payouts or ban accounts if we detect fraudulent activity, spamming, or self-referrals.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">4. Limitation of Liability</h3>
        <p className="mb-6 leading-relaxed">
          Agilax Versel shall not be held liable for any direct, indirect, or consequential damages arising from the use or inability to use our digital products.
        </p>
      </GlassCard>
    </div>
  );
};