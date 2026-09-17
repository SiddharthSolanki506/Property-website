import React from 'react';
import { PlusCircle, CheckCircle2, ArrowRight, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export const SellPropertyCTA: React.FC = () => {
  const { setCurrentView } = useProperty();

  return (
    <section className="py-16 bg-[#0a192f] text-white relative overflow-hidden border-b border-slate-800">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Free for Property Owners</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Sell or Rent Your Property Faster on PropertyDekhey
            </h2>
            
            <p className="text-base text-slate-300 mt-2.5 leading-relaxed">
              List your property on PropertyDekhey and connect directly with thousands of genuine, verified buyers and corporate tenants.
            </p>

            {/* 4 Benefits checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center space-x-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Reach 50,000+ Genuine Monthly Buyers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Filter Out Spam & Fake Callers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Simple 2-Minute Guided Form</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated Relationship Manager</span>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center text-center bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-700 max-w-sm">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <PlusCircle className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="font-bold text-lg text-white">
              List In 7 Simple Steps
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Zero listing charges. Instant live review.
            </p>

            <button
              onClick={() => setCurrentView('sell')}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0a192f] font-black text-sm tracking-wide shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Post Your Property – Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Privacy Protected • No Spam</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
