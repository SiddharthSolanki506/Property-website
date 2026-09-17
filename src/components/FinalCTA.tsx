import React from 'react';
import { Search, PlusCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export const FinalCTA: React.FC = () => {
  const { setCurrentView } = useProperty();

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a192f] via-[#0e2444] to-[#071324] text-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Apni Property, Apni Choice.</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Your Dream Property Is Just a Search Away.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore thousands of verified properties across India and take the next confident step towards your perfect residential or commercial investment.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentView('properties')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-amber-500/30 text-sm sm:text-base transition-all group"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentView('sell')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-600 text-sm sm:text-base transition-all"
          >
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <span>Post Your Property – Free</span>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Spam Calls</span>
          </div>
          <span>•</span>
          <div>Free for Direct Owners</div>
          <span>•</span>
          <div>RERA Verified Documents</div>
        </div>

      </div>
    </section>
  );
};
