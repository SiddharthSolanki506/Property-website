import React from 'react';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency } from '../config/business';

export const PropertyComparisonBar: React.FC = () => {
  const { 
    comparedPropertyIds, 
    properties, 
    toggleCompare, 
    clearComparison, 
    setCurrentView 
  } = useProperty();

  if (comparedPropertyIds.length === 0) return null;

  const comparedProperties = properties.filter((p) => comparedPropertyIds.includes(p.id));

  return (
    <aside aria-label="Property comparison tray" className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-3 sm:px-4">
      <div className="bg-[#0a192f] text-white rounded-2xl shadow-2xl border border-amber-500/40 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
        
        {/* Left count & items preview */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <div className="flex items-center space-x-1.5 text-amber-400 shrink-0 font-bold text-xs sm:text-sm">
            <Layers className="w-4 h-4" />
            <span>Compare ({comparedProperties.length}/4)</span>
          </div>

          <div className="flex items-center space-x-2">
            {comparedProperties.map((p) => (
              <div
                key={p.id}
                className="relative group shrink-0 w-11 h-11 rounded-lg overflow-hidden border border-slate-700 bg-slate-800"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleCompare(p.id)}
                  title="Remove"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearComparison}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors text-xs flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={() => setCurrentView('compare')}
            className="flex-1 sm:flex-initial py-2 px-4 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
