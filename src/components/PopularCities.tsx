import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockProperties';
import { useProperty } from '../context/PropertyContext';

export const PopularCities: React.FC = () => {
  const { setQuickSearch } = useProperty();

  const handleCityClick = (cityName: string) => {
    setQuickSearch('', 'buy', cityName);
  };

  // Fallback remote images if local file serving encounters an issue
  const fallbackImages: Record<string, string> = {
    'delhi-ncr': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=85',
    'uttar-pradesh': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85',
    'haryana': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    'dehradun': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=85'
  };

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Prime Indian Real Estate
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1">
              Explore Properties by Top Cities
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Discover residential hubs, booming IT corridors, and high-appreciation investment zones across India.
            </p>
          </div>
          <div className="mt-3 md:mt-0 text-xs font-semibold text-slate-400">
            Click any city to view active verified listings
          </div>
        </div>

        {/* City Cards Grid - Balanced 4 cards across mobile, tablet, and desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {POPULAR_CITIES.map((city) => (
            <div
              key={city.slug}
              onClick={() => handleCityClick(city.name)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-slate-900 h-48 sm:h-56"
            >
              {/* City Photo */}
              <img
                src={city.image}
                alt={city.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fallback = fallbackImages[city.slug];
                  if (fallback && e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-75"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/40 to-transparent" />

              {/* Top Count Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#0a192f] backdrop-blur-sm shadow-sm">
                  {city.propertiesCount}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center space-x-1 text-amber-400 text-xs mb-0.5 font-medium">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>Avg. {city.avgPrice}</span>
                </div>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>{city.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-400" />
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5" title={city.description}>
                  {city.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
