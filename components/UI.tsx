import React from 'react';

export const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button
      className={`bg-gradient-to-r from-agilax-neon to-agilax-pink text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-agilax-neon/30 hover:shadow-agilax-neon/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <input
        className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-agilax-neon focus:ring-1 focus:ring-agilax-neon transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export const SectionBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block py-1 px-3 rounded-full bg-agilax-neon/10 border border-agilax-neon/30 text-agilax-cyan text-xs font-bold tracking-wider uppercase mb-4">
    {children}
  </span>
);

export const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agilax-neon"></div>
  </div>
);