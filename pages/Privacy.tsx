import React from 'react';
import { GlassCard } from '../components/UI';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      <GlassCard className="text-gray-300">
        <h3 className="text-xl font-bold text-white mt-2 mb-3">1. Information We Collect</h3>
        <p className="mb-6 leading-relaxed">
          To provide our services, we collect the following information:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong className="text-white">Buyers:</strong> Name, Email Address, and Payment Screenshots (for order verification). We do not directly store your bank account or card details.</li>
          <li><strong className="text-white">Affiliates:</strong> Name, Email Address, and UPI ID (strictly for payout purposes).</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">2. How We Use Your Information</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>To deliver the digital product to your email inbox.</li>
          <li>To process affiliate payouts securely.</li>
          <li>To communicate important updates regarding your order or our services.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">3. Data Security</h3>
        <p className="mb-6 leading-relaxed">
          We take the security of your data seriously. We use secure cloud storage for screenshot verifications and industry-standard encryption practices. We do not sell or trade your personal information to third parties.
        </p>
      </GlassCard>
    </div>
  );
};