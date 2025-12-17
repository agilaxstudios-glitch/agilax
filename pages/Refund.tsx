import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { GlassCard } from '../components/UI';

export const Refund: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Refund Policy</h1>
      
      <GlassCard className="text-gray-300">
        <div className="flex flex-col items-center justify-center mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <AlertTriangle className="text-red-400 mb-4" size={48} />
            <h2 className="text-xl font-bold text-white m-0 uppercase tracking-wide">Strict No Refund Policy</h2>
            <p className="text-sm text-red-300 mt-2">Please read carefully before purchasing.</p>
        </div>

        <h3 className="text-xl font-bold text-white mt-2 mb-3">1. Digital Products Policy</h3>
        <p className="mb-6 leading-relaxed">
          Due to the nature of digital products, which are downloadable, licensed assets that cannot be "returned" or "revoked" once delivered, <strong>all sales are final.</strong>
        </p>
        <p className="mb-6 leading-relaxed">
          Agilax Versel <strong className="text-white">does not offer refunds</strong>, returns, or exchanges once the access link has been sent to your email address.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">2. Why No Refunds?</h3>
        <p className="mb-6 leading-relaxed">
          Unlike physical goods, digital files can be copied and stored indefinitely. Once you have access to the files, the service is considered fully rendered. We encourage you to review the product details and description carefully before making a purchase.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">3. Exceptions</h3>
        <p className="mb-4 leading-relaxed">
          Refunds will only be considered under the following rare circumstances:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>If you were charged twice for the exact same transaction (Duplicate Payment).</li>
            <li>If the product link was never delivered to you within 48 hours of successful payment verification, and our support team fails to resolve the issue.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">4. Support</h3>
        <p className="mb-6 leading-relaxed">
          If you face any issues with downloading, unzipping, or using the assets, please contact our support team. We are happy to help you access your purchase.
          <br /><br />
          <span className="text-agilax-cyan">Email: support@agilaxversel.com</span>
        </p>
      </GlassCard>
    </div>
  );
};