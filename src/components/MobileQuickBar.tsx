import React from 'react';
import { Phone, MessageSquare, Search, PlusCircle, Heart } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';

export const MobileQuickBar: React.FC = () => {
  const { setCurrentView, selectedPropertyId, properties, setEnquiryModalOpen, favourites, businessConfig: dynamicConfig } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const selectedProp = properties.find((p) => p.id === selectedPropertyId);

  const handleWhatsApp = () => {
    const msg = selectedProp
      ? `Hi PropertyDekhey, I am interested in ${selectedProp.title}. Please share more details.`
      : 'Hi PropertyDekhey, I am interested in a property listed on your website. Please share more details.';
    window.open(getWhatsAppUrl(msg, business.whatsappNumber), '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a192f] border-t border-slate-800 px-3 py-2 flex items-center justify-between shadow-2xl">
      {/* Call Button */}
      <a
        href={`tel:${business.primaryPhone}`}
        className="flex flex-col items-center justify-center text-slate-300 hover:text-white px-2 py-1"
      >
        <Phone className="w-5 h-5 text-amber-400" />
        <span className="text-[10px] font-medium mt-0.5">Call</span>
      </a>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="flex flex-col items-center justify-center text-slate-300 hover:text-white px-2 py-1"
      >
        <MessageSquare className="w-5 h-5 text-emerald-400" />
        <span className="text-[10px] font-medium mt-0.5">WhatsApp</span>
      </button>

      {/* Center Search / Explore Button */}
      <button
        onClick={() => setCurrentView('properties')}
        className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-amber-500 to-amber-400 text-[#0a192f] w-12 h-12 rounded-full shadow-lg font-bold"
      >
        <Search className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Favourites Button */}
      <button
        onClick={() => setCurrentView('dashboard')}
        className="relative flex flex-col items-center justify-center text-slate-300 hover:text-white px-2 py-1"
      >
        <Heart className="w-5 h-5 text-rose-400" />
        <span className="text-[10px] font-medium mt-0.5">Saved</span>
        {favourites.length > 0 && (
          <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
            {favourites.length}
          </span>
        )}
      </button>

      {/* Post Property Button */}
      <button
        onClick={() => setCurrentView('sell')}
        className="flex flex-col items-center justify-center text-slate-300 hover:text-amber-400 px-2 py-1"
      >
        <PlusCircle className="w-5 h-5 text-amber-400" />
        <span className="text-[10px] font-medium mt-0.5">Post Free</span>
      </button>
    </div>
  );
};
