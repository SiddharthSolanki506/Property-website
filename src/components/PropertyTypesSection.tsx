import React from 'react';
import { 
  Building2, 
  Home, 
  Layers, 
  Maximize2, 
  Briefcase, 
  Crown,
  ArrowRight 
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export const PropertyTypesSection: React.FC = () => {
  const { setFilters, setCurrentView } = useProperty();

  const types = [
    {
      id: 'apartment',
      name: 'Flats & Apartments',
      sub: 'High-rise gated societies',
      count: '8,400+ Units',
      icon: Building2,
      color: 'from-blue-500/10 to-blue-500/5',
      iconColor: 'text-blue-600',
    },
    {
      id: 'villa',
      name: 'Independent Villas',
      sub: 'Private luxury & lawns',
      count: '1,850+ Units',
      icon: Home,
      color: 'from-amber-500/10 to-amber-500/5',
      iconColor: 'text-amber-600',
    },
    {
      id: 'builder floor',
      name: 'Builder Floors',
      sub: 'Independent floor living',
      count: '2,200+ Units',
      icon: Layers,
      color: 'from-emerald-500/10 to-emerald-500/5',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'plot',
      name: 'Residential Plots',
      sub: 'Freehold & gated plots',
      count: '3,100+ Plots',
      icon: Maximize2,
      color: 'from-purple-500/10 to-purple-500/5',
      iconColor: 'text-purple-600',
    },
    {
      id: 'commercial',
      name: 'Commercial & Offices',
      sub: 'Grade-A offices & retail',
      count: '1,950+ Spaces',
      icon: Briefcase,
      color: 'from-sky-500/10 to-sky-500/5',
      iconColor: 'text-sky-600',
    },
    {
      id: 'penthouse',
      name: 'Luxury Penthouses',
      sub: 'Sky homes with private decks',
      count: '480+ Skyhomes',
      icon: Crown,
      color: 'from-rose-500/10 to-rose-500/5',
      iconColor: 'text-rose-600',
    }
  ];

  const handleTypeClick = (typeId: string) => {
    if (typeId === 'commercial') {
      setCurrentView('commercial');
      return;
    }
    setFilters((prev) => ({
      ...prev,
      propertyType: typeId,
      searchQuery: '',
    }));
    setCurrentView('properties');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Tailored Choices
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1">
            Browse by Property Type
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Whether you are seeking a city apartment, gated luxury villa, or Grade-A commercial setup, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {types.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleTypeClick(item.id)}
                className="group p-5 rounded-2xl border border-slate-200/80 hover:border-amber-400 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.sub}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-amber-600">
                  <span>{item.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
