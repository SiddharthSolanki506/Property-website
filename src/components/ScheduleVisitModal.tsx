import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, MessageSquare, Mail } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';

export const ScheduleVisitModal: React.FC = () => {
  const { 
    visitModalOpen, 
    setVisitModalOpen, 
    activeModalProperty, 
    submitVisitRequest,
    currentUser,
    businessConfig: dynamicConfig
  } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  // Tomorrow's date by default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(minDateString);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [visitorName, setVisitorName] = useState(currentUser?.name || '');
  const [visitorPhone, setVisitorPhone] = useState(currentUser?.phone || '');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!visitModalOpen || !activeModalProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitVisitRequest({
      propertyId: activeModalProperty.id,
      propertyTitle: activeModalProperty.title,
      visitorName,
      visitorPhone,
      date,
      timeSlot,
      notes
    });
    setIsBooked(true);
  };

  const slotLabels = {
    morning: 'Morning (10:00 AM - 01:00 PM)',
    afternoon: 'Afternoon (01:00 PM - 04:00 PM)',
    evening: 'Evening (04:00 PM - 07:00 PM)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        
        {/* Close */}
        <button
          onClick={() => setVisitModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#0a192f] p-5 sm:p-6 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
            Free Site Visit
          </span>
          <h3 className="text-xl font-black text-white mt-1.5 line-clamp-1">
            Schedule a Visit
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {activeModalProperty.title} • {activeModalProperty.locality}, {activeModalProperty.city}
          </p>
        </div>

        <div className="p-6">
          {isBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Visit Scheduled Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your site visit has been registered for <strong className="text-slate-900">{date}</strong> during the <strong className="text-slate-900">{slotLabels[timeSlot]}</strong>.
              </p>
              <p className="text-sm font-semibold text-emerald-800 leading-snug">
                Our PropertyDekhey team will contact you shortly to coordinate your arrival.
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
                  href={`mailto:${BUSINESS_CONFIG.email}?subject=Site%20Visit%20Inquiry%20for%20${encodeURIComponent(activeModalProperty.title)}`}
                  className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-200"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>Email Us</span>
                </a>
                <button
                  onClick={() => {
                    const msg = `Hi PropertyDekhey, I have booked a site visit for ${activeModalProperty.title} on ${date}. Please confirm directions.`;
                    window.open(getWhatsAppUrl(msg), '_blank');
                  }}
                  className="py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Date selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={minDateString}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Time slot pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Time Slot *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'morning', label: 'Morning', time: '10am - 1pm' },
                    { id: 'afternoon', label: 'Afternoon', time: '1pm - 4pm' },
                    { id: 'evening', label: 'Evening', time: '4pm - 7pm' }
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setTimeSlot(slot.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        timeSlot === slot.id
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-semibold">{slot.label}</div>
                      <div className="text-[10px] text-slate-500">{slot.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visitor Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Number *
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-bold text-slate-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Requirements or Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Coming with family, require parking pass"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs sm:text-sm transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Site Visit Slot</span>
              </button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero charge • Free cancellation anytime</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
