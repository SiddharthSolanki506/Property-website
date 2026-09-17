import React from 'react';
import { Home, Key, ArrowRight, Check } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export const BuyRentCTA: React.FC = () => {
  const { setCurrentView, setFilters } = useProperty();

  const handleGo = (listingType: 'buy' | 'rent') => {
    setFilters((prev) => ({ ...prev, listingType }));
    setCurrentView(listingType);
  };

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Buy Dream Home */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                <Home className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight">
                Buy Your Dream Property
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Explore handpicked luxury apartments, independent villas, builder floors and residential plots with end-to-end legal title checks.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified RERA registered societies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lowest home loan interest rate tie-ups (SBI, HDFC, ICICI)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero brokerage on builder new launches</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleGo('buy')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0a192f] hover:bg-[#132744] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors group"
              >
                <span>Browse Homes for Sale</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Rent Next Home */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-200">
                <Key className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight">
                Find Your Next Rental Home
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Furnished and semi-furnished 1, 2 & 3 BHK flats, studios and shared spaces near IT hubs and metro stations.
              </p>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct owner listings with genuine security deposits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Family and bachelor-friendly filter options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digital rent agreements and online police verification support</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleGo('rent')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-extrabold px-6 py-3 rounded-xl text-sm transition-colors group shadow-sm"
              >
                <span>Explore Rental Homes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
