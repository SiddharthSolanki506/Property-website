import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, Phone } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';
import { useProperty } from '../context/PropertyContext';

export const FloatingWhatsApp: React.FC = () => {
  const { currentView, selectedPropertyId, properties, businessConfig: dynamicConfig } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Detect current property if viewing a detail page
  const activeProperty = currentView === 'property-detail' && selectedPropertyId
    ? properties.find((p) => p.id === selectedPropertyId)
    : null;

  // Dynamic prefilled message based on context
  const defaultMessage = activeProperty
    ? `Hi PropertyDekhey, I am interested in ${activeProperty.title}. Please share more details.`
    : 'Hi PropertyDekhey, I am interested in a property listed on your website. Please share more details.';

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalMsg = customMsg.trim() || defaultMessage;
    window.open(getWhatsAppUrl(finalMsg, business.whatsappNumber), '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  const handleDirectOpen = () => {
    window.open(getWhatsAppUrl(defaultMessage, business.whatsappNumber), '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-[#0a192f] p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">PropertyDekhey WhatsApp</h4>
                <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>+{business.whatsappDisplay} • Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
              aria-label="Close WhatsApp Desk"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-xs leading-relaxed">
              Namaste! 👋 Welcome to PropertyDekhey. How can our property advisors help you today?
            </div>

            {/* Context Notice if on property page */}
            {activeProperty ? (
              <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-2.5 text-amber-900">
                <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Active Listing</div>
                <div className="font-bold text-xs truncate mt-0.5">{activeProperty.title}</div>
              </div>
            ) : null}

            {/* Direct 1-Click WhatsApp CTA */}
            <button
              onClick={handleDirectOpen}
              className="w-full py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp ({business.whatsappDisplay})</span>
            </button>

            {/* Pre-formatted message preview */}
            <div className="bg-slate-100/80 rounded-xl p-2.5 text-[11px] text-slate-600 border border-slate-200/60">
              <span className="font-bold text-slate-700 block mb-0.5">Pre-filled message:</span>
              <span className="italic">"{defaultMessage}"</span>
            </div>
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Or type custom enquiry..."
              className="flex-1 text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
            <button
              type="submit"
              className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
          </span>
          <MessageSquare className="w-7 h-7 fill-current" />
        </button>
      </div>
    </div>
  );
};
