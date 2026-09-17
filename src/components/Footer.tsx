import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter
} from 'lucide-react';
import { useProperty, ActiveView } from '../context/PropertyContext';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';

export const Footer: React.FC = () => {
  const { setCurrentView, setQuickSearch, setFilters, businessConfig: dynamicConfig } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const handleCityClick = (city: string) => {
    setQuickSearch('', 'buy', city);
  };

  const handleNav = (view: ActiveView, listingType?: 'buy' | 'rent') => {
    if (listingType) setFilters((prev) => ({ ...prev, listingType }));
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#071324] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div 
              onClick={() => handleNav('home')}
              className="flex items-center space-x-2.5 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                <div className="relative flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#0a192f] absolute stroke-[2.5]" />
                  <span className="text-xl font-black font-serif text-white tracking-tighter ml-2.5 mb-1">P</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Property<span className="text-amber-400">Dekhey</span>
                </span>
                <span className="text-xs text-amber-300 font-medium tracking-wide">
                  {BUSINESS_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              India's premier real-estate discovery marketplace dedicated to transparent, verified, and hassle-free property transactions. Discover dream homes, commercial landmarks, and profitable land investments across major Indian growth corridors.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address.fullFormatted}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Helpline: <a href={`tel:${business.primaryPhone}`} className="hover:text-amber-400 font-semibold underline">{business.primaryPhoneDisplay}</a>, <a href={`tel:${business.secondaryPhone}`} className="hover:text-amber-400 font-semibold underline">{business.secondaryPhoneDisplay}</a>
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-white underline">{BUSINESS_CONFIG.email}</a></span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-3">
              <a 
                href={BUSINESS_CONFIG.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-[#0a192f] flex items-center justify-center transition-colors text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={BUSINESS_CONFIG.socials.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-[#0a192f] flex items-center justify-center transition-colors text-slate-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={BUSINESS_CONFIG.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-[#0a192f] flex items-center justify-center transition-colors text-slate-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={BUSINESS_CONFIG.socials.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-[#0a192f] flex items-center justify-center transition-colors text-slate-400"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={BUSINESS_CONFIG.socials.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-[#0a192f] flex items-center justify-center transition-colors text-slate-400"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links: Properties */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Properties
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('buy', 'buy')} className="hover:text-amber-400 transition-colors">
                  Buy Property in India
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rent', 'rent')} className="hover:text-amber-400 transition-colors">
                  Rent Residential Homes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('commercial')} className="hover:text-amber-400 transition-colors">
                  Commercial Offices & Shops
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-amber-400 transition-colors">
                  New Builder Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties')} className="hover:text-amber-400 transition-colors">
                  Explore All Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('agents')} className="hover:text-amber-400 transition-colors">
                  Find RERA Agents
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Tools */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Services & Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('sell')} className="text-amber-400 font-semibold hover:underline flex items-center">
                  Post Property — Free
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculators')} className="hover:text-amber-400 transition-colors">
                  Home Loan EMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculators')} className="hover:text-amber-400 transition-colors">
                  Stamp Duty Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculators')} className="hover:text-amber-400 transition-colors">
                  Affordability Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('compare')} className="hover:text-amber-400 transition-colors">
                  Property Comparison Tool
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-amber-400 transition-colors">
                  RERA Legal Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <span className="font-bold text-white text-base block">{BUSINESS_CONFIG.name}</span>
                <span className="text-xs text-amber-300 font-medium italic block mt-0.5">"{BUSINESS_CONFIG.tagline}"</span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Phone:</span>
                <div className="space-y-1">
                  <div>
                    <a
                      href={`tel:${business.primaryPhone}`}
                      className="text-slate-200 hover:text-amber-400 font-semibold transition-colors flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{business.primaryPhoneDisplay}</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${business.secondaryPhone}`}
                      className="text-slate-200 hover:text-amber-400 font-semibold transition-colors flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{business.secondaryPhoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Email:</span>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-slate-200 hover:text-amber-400 font-semibold transition-colors flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{BUSINESS_CONFIG.email}</span>
                </a>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Address:</span>
                <div className="text-xs text-slate-300 leading-relaxed flex items-start space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {BUSINESS_CONFIG.address.line1},<br />
                    {BUSINESS_CONFIG.address.sector}, {BUSINESS_CONFIG.address.city} - {BUSINESS_CONFIG.address.pincode},<br />
                    {BUSINESS_CONFIG.address.landmark}
                  </span>
                </div>
              </div>

              <div className="pt-1 flex items-center space-x-3">
                <button
                  onClick={() => handleNav('contact')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                >
                  Visit Contact Page →
                </button>
              </div>
            </div>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors">
                  About PropertyDekhey
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-amber-400 transition-colors">
                  User Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-amber-400 transition-colors">
                  Admin Portal
                </button>
              </li>
              <li>
                <a 
                  href={getWhatsAppUrl(BUSINESS_CONFIG.whatsappTemplates.general)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors flex items-center"
                >
                  WhatsApp Helpdesk <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Popular Cities Links row */}
        <div className="py-6 border-b border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
            <span className="font-bold text-white uppercase tracking-wider">Top Indian Cities:</span>
            {['Delhi NCR', 'Noida', 'Gurugram', 'Greater Noida', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'].map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Properties in {city}
              </button>
            ))}
          </div>
        </div>

        {/* RERA Legal Disclaimer Box */}
        <div className="pt-6 pb-4 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start space-x-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Legal & RERA Disclaimer:</strong> {BUSINESS_CONFIG.reraDisclaimer} All project information, dimensions, specifications and pricing are curated from registered promoters and verified property owners.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 {BUSINESS_CONFIG.name}. All Rights Reserved. Made for Indian Real Estate.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms & Conditions</span>
            <span>•</span>
            <span>RERA Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
