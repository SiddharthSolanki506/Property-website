import React, { useState } from 'react';
import { X, Send, Phone, MessageSquare, ShieldCheck, CheckCircle2, Mail } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

export const EnquiryModal: React.FC = () => {
  const { 
    enquiryModalOpen, 
    setEnquiryModalOpen, 
    activeModalProperty, 
    submitEnquiry, 
    currentUser,
    businessConfig: dynamicConfig
  } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [message, setMessage] = useState('I am interested in this property. Please share full brochure, floor plans and price breakdown.');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!enquiryModalOpen || !activeModalProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      propertyId: activeModalProperty.id,
      propertyTitle: activeModalProperty.title,
      name,
      phone,
      email,
      message,
      whatsappConsent,
      agentId: activeModalProperty.agentId,
    });
    setSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const msg = BUSINESS_CONFIG.whatsappTemplates.propertyEnquiry(
      activeModalProperty.title,
      activeModalProperty.id,
      `${activeModalProperty.locality}, ${activeModalProperty.city}`
    );
    window.open(getWhatsAppUrl(msg), '_blank');
    setEnquiryModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setEnquiryModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#0a192f] p-5 sm:p-6 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
            Official Enquiry
          </span>
          <h3 className="text-xl font-black text-white mt-1.5 line-clamp-1">
            {activeModalProperty.title}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {activeModalProperty.locality}, {activeModalProperty.city} • <strong className="text-amber-400">{formatIndianCurrency(activeModalProperty.price)}</strong>
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Enquiry Received Successfully!</h4>
              <p className="text-sm font-semibold text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Our PropertyDekhey team will contact you shortly.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-800">
                <div className="inline-flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>Phone:</span>
                  <a href={`tel:${business.secondaryPhone}`} className="text-amber-600 hover:underline">
                    {business.secondaryPhoneDisplay}
                  </a>
                </div>
                <div className="inline-flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>Email:</span>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-amber-600 hover:underline">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 justify-center">
                <a
                  href={`tel:${business.primaryPhone}`}
                  className="py-2.5 px-3.5 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}?subject=Enquiry%20for%20${encodeURIComponent(activeModalProperty.title)}`}
                  className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-200"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>Email Us</span>
                </a>
                <button
                  onClick={handleOpenWhatsApp}
                  className="py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property Interested In */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Property Interested In
                </label>
                <input
                  type="text"
                  readOnly
                  value={activeModalProperty.title}
                  className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 cursor-default"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98114 51867"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message or Queries
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please share pricing, floor plans, and site visit availability..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              {/* WhatsApp Checkbox */}
              <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                />
                <span>Send property brochure, floor plans & updates on WhatsApp</span>
              </label>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs sm:text-sm transition-colors border border-emerald-200 flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Instant WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero Spam Promise • We do not share your number with third parties</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
