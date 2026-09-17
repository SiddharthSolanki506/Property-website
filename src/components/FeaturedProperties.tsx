import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { PropertyCard } from './PropertyCard';

export const FeaturedProperties: React.FC = () => {
  const { properties, setCurrentView, setQuickSearch } = useProperty();
  const [activeCityTab, setActiveCityTab] = useState('All');

  const cityTabs = ['All', 'Faridabad', 'Vrindavan', 'Noida', 'Gurugram', 'Delhi', 'Mumbai', 'Bangalore'];

  const featuredList = properties.filter((p) => {
    if (activeCityTab === 'All') return p.isFeatured;
    return p.isFeatured && p.city.toLowerCase().includes(activeCityTab.toLowerCase());
  });

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Verified Selections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
              Featured Properties
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Handpicked properties worth exploring across India’s leading residential hotspots.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="mt-4 md:mt-0 flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            {cityTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCityTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  activeCityTab === tab
                    ? 'bg-[#0a192f] text-amber-400 shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentView('properties')}
            className="inline-flex items-center space-x-2 bg-[#0a192f] hover:bg-[#132744] text-white font-bold px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm group"
          >
            <span>Explore All Verified Properties</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
