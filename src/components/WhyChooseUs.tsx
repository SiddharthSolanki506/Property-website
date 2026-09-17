import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  CheckCircle, 
  Zap, 
  MapPin, 
  Award,
  Clock 
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Listings Only',
      desc: 'Every listing undergoes rigorous title checking and verification against state RERA portals and local civic land registries.',
    },
    {
      icon: Users,
      title: 'Trusted Property Professionals',
      desc: 'Collaborate with pre-vetted, RERA-registered real estate advisors and direct owners with zero deceptive middlemen.',
    },
    {
      icon: Search,
      title: 'Intelligent Location Search',
      desc: 'Search intuitively across city sectors, upcoming metro links, expressways, and high-growth micro-markets in seconds.',
    },
    {
      icon: CheckCircle,
      title: '100% Transparent Information',
      desc: 'Accurate carpet area metrics, complete breakdown of maintenance costs, RERA numbers, and approved floor plans upfront.',
    },
    {
      icon: Zap,
      title: 'Instant WhatsApp Enquiries',
      desc: 'Direct one-tap WhatsApp connect with verified sellers and relationship managers for rapid site visit confirmations.',
    },
    {
      icon: MapPin,
      title: 'Deep Local Market Expertise',
      desc: 'Hyperlocal pricing intelligence and capital appreciation trends across Delhi NCR, Mumbai, Bangalore, Pune, and Hyderabad.',
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
            Trust & Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-3">
            Why Choose PropertyDekhey?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Built from the ground up to eliminate ambiguity and bring authentic trust into Indian property discovery.
          </p>
        </div>

        {/* 6 Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0a192f] text-amber-400 flex items-center justify-center mb-4 shadow-sm">
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Trust Metrics Ribbon */}
        <div className="mt-12 bg-gradient-to-r from-[#0a192f] to-[#132744] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {BUSINESS_CONFIG.trustStats.verifiedPropertiesCount}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Verified Properties</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {BUSINESS_CONFIG.trustStats.happyFamiliesCount}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Happy Indian Families</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {BUSINESS_CONFIG.trustStats.partnerBrokersCount}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Registered RERA Agents</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {BUSINESS_CONFIG.trustStats.majorCitiesCount}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">Major Indian Metros</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
