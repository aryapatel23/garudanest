"use client";

import React, { useState } from 'react';
import { teamMembers } from '@/lib/constants';
import { BentoCard } from '@/components/ui/BentoCard';

export const TeamSection = () => {
  const [teamFilter, setTeamFilter] = useState("All");

  const visibleTeam = teamFilter === "All"
    ? teamMembers
    : teamMembers.filter((member) => member.role === teamFilter);

  return (
    <section id="team" className="py-40 px-6 bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12">
          Meet the <span className="text-[#00E5FF]">Elite Circle</span>
        </h2>

        <div className="flex flex-wrap gap-3 mb-10 text-xs uppercase font-bold tracking-widest">
          {['All', 'Frontend', 'Backend', 'AI', 'DevOps'].map((role) => (
            <button
              key={role}
              onClick={() => setTeamFilter(role)}
              className={`px-4 py-2 border transition-all ${teamFilter === role ? 'border-[#FF6B00] bg-[#FF6B00] text-black' : 'border-white/20 hover:border-[#00E5FF]'}`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleTeam.map((member) => (
            <BentoCard key={member.name} className="p-6">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold mb-4">
                {member.name.split(' ').map((word) => word[0]).join('')}
              </div>
              <h3 className="text-lg font-bold uppercase">{member.name}</h3>
              <p className="text-[11px] text-[#00E5FF] uppercase font-bold mt-1">{member.role}</p>
              <p className="text-xs text-slate-500 uppercase leading-loose mt-4">{member.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {member.tags.map((tag) => (
                  <span key={tag} className="text-[9px] border border-white/20 px-2 py-1">{tag}</span>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
};
