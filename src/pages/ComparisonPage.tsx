import React from 'react';
import { 
  X, 
  Layers, 
  Check, 
  Minus, 
  ArrowLeft, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Trash2,
  Share2
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

export const ComparisonPage: React.FC = () => {
  const { 
    comparedPropertyIds, 
    properties, 
    toggleCompare, 
    clearComparison, 
    setCurrentView,
    setShareModalOpen 
  } = useProperty();

  const comparedProperties = properties.filter((p) => comparedPropertyIds.includes(p.id));

  if (comparedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Properties to Compare</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            Click the "Compare" icon on any property card across the marketplace to evaluate up to 4 homes side-by-side.
          </p>
          <button
            onClick={() => setCurrentView('properties')}
            className="px-6 py-3 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs hover:bg-[#132744] transition-colors"
          >
            Explore Verified Properties
          </button>
        </div>
      </div>
    );
  }

  const allAmenities = Array.from(
    new Set(comparedProperties.flatMap((p) => p.amenities))
  );

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-[#0a192f] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentView('properties')}
              className="flex items-center space-x-1 text-xs text-slate-400 hover:text-amber-400 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to search</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-black">
              Property Comparison Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Comparing {comparedProperties.length} properties side-by-side.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={clearComparison}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setCurrentView('properties')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-black transition-colors"
            >
              + Add More
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Top Row: Cards */}
            <thead>
              <tr className="border-b border-slate-100">
                <th className="p-4 bg-slate-50/50 w-44 font-bold text-xs uppercase text-slate-400 align-top">
                  Property
                </th>
                {comparedProperties.map((p) => (
                  <th key={p.id} className="p-4 w-64 align-top">
                    <div className="relative rounded-2xl overflow-hidden mb-3 h-36 bg-slate-100 group">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-rose-600 text-white p-1 rounded-full"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xl font-extrabold text-[#0a192f] mb-0.5">
                      {formatIndianCurrency(p.price)}
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1 mb-2">
                      {p.title}
                    </h4>

                    {/* Quick CTA */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setCurrentView('property-detail', p.id)}
                        className="flex-1 py-1.5 bg-[#0a192f] hover:bg-[#132744] text-white text-[11px] font-bold rounded-lg flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-3 h-3 text-amber-400" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => {
                          const msg = BUSINESS_CONFIG.whatsappTemplates.propertyEnquiry(p.title, p.id, `${p.locality}, ${p.city}`);
                          window.open(getWhatsAppUrl(msg), '_blank');
                        }}
                        className="py-1.5 px-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold rounded-lg"
                        title="Enquire on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-xs divide-y divide-slate-100">
              {/* Location */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Location</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 font-medium text-slate-800">
                    {p.locality}, {p.city}
                  </td>
                ))}
              </tr>

              {/* Price per sq.ft */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Rate / Sq.Ft</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 font-bold text-amber-600">
                    ₹{p.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
                  </td>
                ))}
              </tr>

              {/* Configuration */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">BHK / Config</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 font-semibold text-slate-800">
                    {p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'Commercial'}
                  </td>
                ))}
              </tr>

              {/* Carpet Area */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Carpet Area</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 font-bold text-slate-900">
                    {p.areaSqFt} sq.ft
                  </td>
                ))}
              </tr>

              {/* Bathrooms & Balconies */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Baths / Balconies</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 text-slate-700">
                    {p.bathrooms} Baths • {p.balconies} Balconies
                  </td>
                ))}
              </tr>

              {/* Floor */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Floor Level</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 text-slate-700">
                    {p.floor} of {p.totalFloors}
                  </td>
                ))}
              </tr>

              {/* Possession */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Possession</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 font-semibold text-emerald-700">
                    {p.possession}
                  </td>
                ))}
              </tr>

              {/* Furnishing */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Furnishing</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 capitalize text-slate-700">
                    {p.furnishing}
                  </td>
                ))}
              </tr>

              {/* Facing */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">Vastu / Facing</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 text-slate-700">
                    {p.facing} Facing
                  </td>
                ))}
              </tr>

              {/* RERA Status */}
              <tr>
                <td className="p-3.5 bg-slate-50/50 font-bold text-slate-600">RERA Registration</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-3.5 text-slate-700 font-mono text-[11px]">
                    {p.reraNumber ? (
                      <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{p.reraNumber}</span>
                      </span>
                    ) : 'Pending / Owner Listing'}
                  </td>
                ))}
              </tr>

              {/* Society Amenities header */}
              <tr>
                <td colSpan={comparedProperties.length + 1} className="p-3 bg-slate-100 font-bold uppercase text-[10px] tracking-wider text-slate-500">
                  Society Amenities Checklist
                </td>
              </tr>

              {allAmenities.map((amenity) => (
                <tr key={amenity}>
                  <td className="p-3.5 bg-slate-50/50 font-medium text-slate-700">{amenity}</td>
                  {comparedProperties.map((p) => {
                    const has = p.amenities.includes(amenity);
                    return (
                      <td key={p.id} className="p-3.5">
                        {has ? (
                          <div className="flex items-center text-emerald-600 font-bold">
                            <Check className="w-4 h-4 mr-1" />
                            <span>Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-slate-300">
                            <Minus className="w-4 h-4 mr-1" />
                            <span>No</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
