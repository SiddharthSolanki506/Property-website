import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Award,
  Search
} from 'lucide-react';
import { INITIAL_AGENTS } from '../data/mockAgents';
import { getWhatsAppUrl } from '../config/business';
import { useProperty } from '../context/PropertyContext';

export const AgentsPage: React.FC = () => {
  const { setFilters, setCurrentView } = useProperty();
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = INITIAL_AGENTS.filter((agent) => {
    if (selectedCity !== 'All' && !agent.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) && !agent.agency.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-[#0a192f] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>RERA Registered Property Advisors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Find Certified Real Estate Experts
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Work with verified local neighborhood specialists with verified track records, legal documentation expertise, and zero bogus listings.
          </p>

          {/* Search & City Filter */}
          <div className="mt-8 flex flex-wrap gap-3 items-center bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search advisor by name, agency or locality..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-amber-400 focus:outline-none"
              >
                {['All', 'Noida', 'Gurugram', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Pune'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={agent.avatarUrl}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-amber-400"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{agent.agency}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs">
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        {agent.rating}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{agent.experienceYears} Years Exp</span>
                    </div>
                  </div>
                </div>

                {/* Operating areas */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-4 space-y-1 text-xs">
                  <div className="flex items-center text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
                    <span className="truncate">{agent.operatingAreas.join(', ')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>RERA: {agent.reraRegistration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 mb-4 px-1">
                  <span>Languages: <strong>{agent.languages.join(', ')}</strong></span>
                  <span className="text-amber-600 font-bold">{agent.activeListingsCount} Active Listings</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    const msg = `Hi ${agent.name}, I found your profile on PropertyDekhey. I am looking for property assistance in ${agent.operatingAreas[0]}.`;
                    window.open(getWhatsAppUrl(msg), '_blank');
                  }}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Call Advisor</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
