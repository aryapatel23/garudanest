import React from 'react';

export const BentoCard = ({ children, className = "" }) => {
  return (
    <div className={`bento-card bg-[#0a0a0a] border border-white/05 transition-all duration-500 hover:border-[#FF6B00] hover:bg-[#0f0f0f] hover:-translate-y-1.5 hover:shadow-[0_10px_40px_-20px_rgba(255,107,0,0.3)] ${className}`}>
        {children}
    </div>
  );
};
