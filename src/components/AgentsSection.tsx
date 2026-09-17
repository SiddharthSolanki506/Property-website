import React from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Award,
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { INITIAL_AGENTS } from '../data/mockAgents';
import { useProperty } from '../context/PropertyContext';
import { getWhatsAppUrl } from '../config/business';

export const AgentsSection: React.FC = () => {
  const { setCurrentView } = useProperty();

  const handleWhatsApp = (agentName: string) => {
    const msg = `Namaste ${agentName}, I saw your verified profile on PropertyDekhey and would like advisory for property options.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              RERA Certified Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-2">
              Find Trusted Property Experts
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Connect with government-registered RERA property brokers and consultants with verified track records in your locality.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('agents')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[#0a192f] hover:text-amber-600 font-bold text-sm"
          >
            <span>Browse Full Agent Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_AGENTS.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row with Avatar & Rating */}
                <div className="flex items-start space-x-3.5 mb-4">
                  <div className="relative">
                    <img
                      src={agent.avatarUrl}
                      alt={agent.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                    />
                    {agent.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5" title="Verified RERA Agent">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-slate-900 text-base truncate">
                        {agent.name}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-amber-700 truncate">
                      {agent.agency}
                    </p>
                    <div className="flex items-center text-xs text-slate-500 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 mr-1 shrink-0" />
                      <span className="truncate">{agent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Specs */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-white rounded-xl border border-slate-100 text-center mb-3">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Experience</div>
                    <div className="text-xs font-bold text-slate-800">{agent.experienceYears} Yrs</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Listings</div>
                    <div className="text-xs font-bold text-slate-800">{agent.propertiesCount}+</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Rating</div>
                    <div className="text-xs font-bold text-amber-600 flex items-center justify-center">
                      <Star className="w-3 h-3 fill-current text-amber-500 mr-0.5" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>
                </div>

                {/* About Snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {agent.about}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2">
                <button
                  onClick={() => handleWhatsApp(agent.name)}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#0a192f] hover:bg-[#132744] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Agent</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
