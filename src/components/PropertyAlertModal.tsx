import React, { useState } from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

interface PropertyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyAlertModal: React.FC<PropertyAlertModalProps> = ({ isOpen, onClose }) => {
  const { createPropertyAlert, currentUser, filters } = useProperty();

  const [city, setCity] = useState(filters.city || 'Noida');
  const [propertyType, setPropertyType] = useState(filters.propertyType || 'apartment');
  const [bhk, setBhk] = useState(filters.bhk[0] || '3 BHK');
  const [maxBudget, setMaxBudget] = useState('1.5 Cr');
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [contactInfo, setContactInfo] = useState(currentUser?.phone || '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPropertyAlert({
      title: `${bhk} in ${city} (Under ₹${maxBudget})`,
      location: city,
      propertyType,
      bhk,
      maxBudget: 15000000,
      notifyWhatsApp,
      notifyEmail,
      contactInfo
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#0a192f] p-5 text-white">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Instant Alerts</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Never Miss a Verified Deal
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Get instant alerts when matching properties are listed in your preferred locality.
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Alert Created Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                You will receive real-time notifications on WhatsApp and Email whenever fresh properties match your parameters.
              </p>
              <button
                onClick={onClose}
                className="py-2 px-6 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="Noida">Noida</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="apartment">Apartment / Flat</option>
                    <option value="villa">Independent Villa</option>
                    <option value="builder floor">Builder Floor</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Configuration (BHK)
                  </label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Max Budget
                  </label>
                  <select
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="50 Lakh">Under ₹50 Lakh</option>
                    <option value="1 Crore">Under ₹1 Crore</option>
                    <option value="1.5 Crore">Under ₹1.5 Crore</option>
                    <option value="2.5 Crore">Under ₹2.5 Crore</option>
                    <option value="5 Crore">Under ₹5 Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your WhatsApp Number / Email *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. 9876543210 or name@example.com"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWhatsApp}
                    onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span>Send alerts via WhatsApp message</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span>Send alerts via Email</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
              >
                <Bell className="w-4 h-4" />
                <span>Activate Property Alert</span>
              </button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero spam • Unsubscribe in one click anytime</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
