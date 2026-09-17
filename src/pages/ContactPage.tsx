import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Clock, 
  ShieldCheck, 
  Building2,
  Navigation,
  Mail
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';
import { useProperty } from '../context/PropertyContext';

export const ContactPage: React.FC = () => {
  const { addToast, businessConfig: dynamicConfig } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyRequirement, setPropertyRequirement] = useState('Buy Residential Property');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('success', 'Enquiry Received', 'Our PropertyDekhey team will contact you shortly.');
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPropertyRequirement('Buy Residential Property');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Hero / Page Header */}
      <div className="bg-[#0a192f] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
            <span>{BUSINESS_CONFIG.name} Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Get in Touch with PropertyDekhey
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Looking to buy, sell or rent a property? Our team is here to help you find the right property.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
        
        {/* Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Primary Phone Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Primary Support / Sales Desk
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                📞 {business.primaryPhoneDisplay}
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Direct line for buyer enquiries, site visits, and instant consultation.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
              <a
                href={`tel:${business.primaryPhone}`}
                className="flex-1 py-2.5 px-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Now</span>
              </a>
              <a
                href={getWhatsAppUrl(`Hi PropertyDekhey, I would like to enquire about properties.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Secondary Contact & WhatsApp Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Secondary / Alternate Helpline
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                📞 {business.secondaryPhoneDisplay}
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Official PropertyDekhey secondary helpline & alternate support desk.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
              <a
                href={`tel:${business.secondaryPhone}`}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-700" />
                <span>Call Now</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Official Email Desk Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Official Business Email
              </span>
              <div className="text-sm font-black text-slate-900 mt-1 break-all">
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-amber-600 transition-colors">
                  ✉️ {BUSINESS_CONFIG.email}
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Direct inbox for property queries, listings, corporate partnerships, and legal verifications.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="w-full py-2.5 px-4 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Office Address Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Head Office Address
              </span>
              <div className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                📍 {BUSINESS_CONFIG.address.line1},<br />
                {BUSINESS_CONFIG.address.sector}, {BUSINESS_CONFIG.address.city} - {BUSINESS_CONFIG.address.pincode}
              </div>
              <div className="mt-2 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg inline-block border border-amber-200">
                Landmark: {BUSINESS_CONFIG.address.landmark}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Contact Form & Office Hours Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Online Enquiry Desk
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mt-1.5">
                Fill in your property requirements and enquiries will be sent directly to our team at{' '}
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-amber-600 font-bold hover:underline">
                  {BUSINESS_CONFIG.email}
                </a>.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-slate-50 rounded-3xl border border-emerald-200 space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-sm font-semibold text-emerald-800 mt-2">
                    Our PropertyDekhey team will contact you shortly. Enquiries are routed to {BUSINESS_CONFIG.email}.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-800">
                    <div className="inline-flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      <span>Phone:</span>
                      <a href={`tel:${business.secondaryPhone}`} className="text-amber-600 hover:underline">
                        {business.secondaryPhoneDisplay}
                      </a>
                    </div>
                    <div className="inline-flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      <span>Email:</span>
                      <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-amber-600 hover:underline">
                        {BUSINESS_CONFIG.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-3 justify-center">
                  <a
                    href={`tel:${business.primaryPhone}`}
                    className="py-2.5 px-4 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs flex items-center space-x-1.5 hover:bg-[#132744] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now ({business.primaryPhoneDisplay})</span>
                  </a>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}?subject=Property%20Enquiry`}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors border border-slate-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>Email Us</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Us</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs text-slate-600 font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98114 51867"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Property Requirement */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Property Requirement *
                  </label>
                  <select
                    value={propertyRequirement}
                    onChange={(e) => setPropertyRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="Buy Residential Apartment (2/3/4 BHK)">Buy Residential Apartment (2/3/4 BHK)</option>
                    <option value="Buy Luxury Villa / Builder Floor">Buy Luxury Villa / Builder Floor</option>
                    <option value="Buy Residential Plot / Land">Buy Residential Plot / Land</option>
                    <option value="Rent Home / Flat">Rent Home / Flat</option>
                    <option value="Buy / Lease Commercial Office or Shop">Buy / Lease Commercial Office or Shop</option>
                    <option value="Sell / List My Property on PropertyDekhey">Sell / List My Property on PropertyDekhey</option>
                    <option value="General Property Consultation">General Property Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about preferred budget, preferred sectors/localities, or specific project requirements..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  />
                </div>

                {/* CTA: Send Enquiry */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center space-x-1 text-emerald-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Zero spam guarantee</span>
                  </span>
                  <span>Direct builder/owner pricing</span>
                </div>

              </form>
            )}
          </div>

          {/* Office Details & Operations Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Connect Actions */}
            <div className="bg-gradient-to-br from-[#0a192f] to-[#132744] text-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Instant Assistance
              </span>
              <h3 className="text-xl font-bold">
                Need Immediate Support?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our Faridabad headquarters property desk for fast answers regarding property bookings, site visits, and RERA verification.
              </p>

              <div className="pt-2 space-y-3">
                <a
                  href={`tel:${business.primaryPhone}`}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now ({business.primaryPhoneDisplay})</span>
                </a>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us ({BUSINESS_CONFIG.whatsappDisplay})</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_CONFIG.email}?subject=Official%20Property%20Assistance`}
                  className="w-full py-3 px-4 bg-[#1e3458] hover:bg-[#284674] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors border border-blue-900/40"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email Us ({BUSINESS_CONFIG.email})</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Trust Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 text-xs">
              <div className="flex items-center space-x-3 text-slate-700">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Official Email</div>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="text-slate-600 hover:text-amber-600 font-semibold transition-colors break-all"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Desk Timings</div>
                  <div className="text-slate-500">{BUSINESS_CONFIG.workingHours}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700 pt-3 border-t border-slate-100">
                <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Registered Entity</div>
                  <div className="text-slate-500">{BUSINESS_CONFIG.legalName}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-slate-500 leading-relaxed">
                <p>
                  <strong>Visitor Notice:</strong> Physical visits for document verification or project consultation can be scheduled at our Bypass Road office or directly at project sales lounges.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* GOOGLE MAPS SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-amber-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Office Location</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Find Our Office on the Map
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                📍 {BUSINESS_CONFIG.address.fullFormatted}
              </p>
            </div>

            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </a>
          </div>

          {/* Clean Map Visualization Card / Interactive Map Embed */}
          <div className="relative bg-slate-100 w-full min-h-[360px] flex flex-col items-center justify-center p-6 text-center">
            {/* Embedded Google Map iframe based on the exact official address without invented GPS coordinates */}
            <iframe
              title="PropertyDekhey Office Location"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS_CONFIG.address.fullFormatted)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-[360px] rounded-2xl"
            />

            <div className="mt-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm max-w-xl w-full text-left flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="font-bold text-slate-900">{BUSINESS_CONFIG.name} — Faridabad Head Office</div>
                <div className="text-slate-600 mt-0.5">{BUSINESS_CONFIG.address.fullFormatted}</div>
                <div className="mt-2 flex items-center space-x-3">
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-300">|</span>
                  <a
                    href={`tel:${business.primaryPhone}`}
                    className="text-slate-700 hover:text-slate-900 font-bold"
                  >
                    Call {business.primaryPhoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
