import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Users, 
  Send,
  Sparkles
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';
import { useProperty } from '../context/PropertyContext';

export const AboutContactPage: React.FC = () => {
  const { addToast, businessConfig: dynamicConfig } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Noida',
    subject: 'General Query',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    addToast('success', 'Message Received', 'Our relationship officer will connect with you within 2 business hours.');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-[#0a192f] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apni Property, Apni Choice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About PropertyDekhey
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Transforming Indian real estate with radical transparency, verified title deeds, direct owner connections, and professional site visit coordination.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Story & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Our Founding Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Solving the Trust Deficit in Indian Property Buying
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded to eliminate misleading listings, phantom prices, and high-pressure sales tactics, <strong>PropertyDekhey</strong> connects buyers, tenants, owners, and developers on a single verified platform.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every home on our marketplace is screened for ownership legitimacy, municipal zoning, and RERA registration. We believe property discovery should be as joyful and transparent as choosing your dream life.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <div className="text-xl font-black text-[#0a192f]">100%</div>
                <div className="text-xs text-slate-500 font-semibold">Verified Title Deeds</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <div className="text-xl font-black text-emerald-600">Zero</div>
                <div className="text-xs text-slate-500 font-semibold">Fake / Duplicate Rates</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
              alt="PropertyDekhey Headquarters"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Regional Offices Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-slate-900">Regional Experience Centers</h2>
            <p className="text-xs text-slate-500 mt-1">Walk in for free documentation verification, loan guidance and physical site visit booking.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Delhi NCR (Head Office)',
                address: 'Tower B, Logix Cyber Park, Sector 62, Noida, UP 201301',
                phone: '+91 98765 43210'
              },
              {
                city: 'Gurugram',
                address: 'Level 5, DLF Cyber City, Phase II, Gurugram, Haryana 122002',
                phone: '+91 98765 43211'
              },
              {
                city: 'Mumbai',
                address: 'Platina, Bandra Kurla Complex (BKC), Mumbai, MH 400051',
                phone: '+91 98765 43212'
              },
              {
                city: 'Bengaluru',
                address: 'ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066',
                phone: '+91 98765 43213'
              }
            ].map((office) => (
              <div key={office.city} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{office.city}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{office.address}</p>
                <div className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{office.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Direct Support */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Connect With Us</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Get in Touch with our Support Desk</h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Have a question about a property, want to list your society, or need assistance with RERA title verification? Reach out today.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Helpline (9am - 8pm)</div>
                    <div className="text-xs font-bold text-slate-900">
                      <a href={`tel:${business.primaryPhone}`} className="hover:text-amber-600 mr-2">
                        +91 {business.primaryPhoneDisplay}
                      </a>
                      <span className="text-slate-300">|</span>
                      <a href={`tel:${business.secondaryPhone}`} className="hover:text-amber-600 ml-2">
                        +91 {business.secondaryPhoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Email Desk</div>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors"
                    >
                      {BUSINESS_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-2xl">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-emerald-700 font-bold">WhatsApp Channel</div>
                    <a
                      href={getWhatsAppUrl('Hi PropertyDekhey support, I need assistance.')}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-800 hover:underline"
                    >
                      Chat with Customer Care
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-600">
                    Thank you for writing to PropertyDekhey. Your enquiry has been routed to{' '}
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="font-bold text-amber-600 hover:underline">
                      {BUSINESS_CONFIG.email}
                    </a>. A dedicated property specialist will contact you on your registered phone.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Aditya Sharma"
                        className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@gmail.com"
                        className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your City</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                      >
                        {['Noida', 'Gurugram', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">How can we assist you?</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the property you want to buy, rent, or list..."
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to PropertyDekhey Desk</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
