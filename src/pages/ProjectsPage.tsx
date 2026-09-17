import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/mockProjects';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';
import { useProperty } from '../context/PropertyContext';

export const ProjectsPage: React.FC = () => {
  const { addToast } = useProperty();
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBuilder, setSelectedBuilder] = useState('All');

  const filteredProjects = INITIAL_PROJECTS.filter((p) => {
    if (selectedCity !== 'All' && p.city !== selectedCity) return false;
    if (selectedBuilder !== 'All' && p.builderName !== selectedBuilder) return false;
    return true;
  });

  const builders = ['All', 'Godrej Properties', 'DLF Limited', 'Prestige Group', 'Tata Housing', 'Sobha Developers'];
  const cities = ['All', 'Noida', 'Gurugram', 'Bengaluru', 'Mumbai', 'Pune'];

  const handleBrochureDownload = (projectName: string) => {
    addToast('success', 'Brochure Download', `Official digital brochure for ${projectName} sent to your WhatsApp/Email.`);
    const msg = `Hi PropertyDekhey, please send the official PDF brochure and master plan for ${projectName}.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Hero Header */}
      <div className="bg-[#0a192f] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tier-1 Builders & Developers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            New Project Launches & Gated Communities
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Explore verified new residential launches from Godrej, DLF, Prestige, and Tata. Direct builder price guarantees with zero brokerage.
          </p>

          {/* City & Builder Filters */}
          <div className="mt-8 flex flex-wrap gap-4 items-center bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-amber-400 focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">Builder:</span>
              <select
                value={selectedBuilder}
                onChange={(e) => setSelectedBuilder(e.target.value)}
                className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-amber-400 focus:outline-none"
              >
                {builders.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-400 ml-auto">
              Showing <strong className="text-white">{filteredProjects.length}</strong> official developer projects
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* RERA Badge */}
                <div className="absolute top-4 left-4 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RERA: {project.reraId}</span>
                </div>

                {/* Status */}
                <div className="absolute top-4 right-4 bg-[#0a192f]/80 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-md">
                  {project.status}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {project.builderName}
                  </div>
                  <h3 className="text-xl font-black line-clamp-1">{project.name}</h3>
                  <p className="text-xs text-slate-200 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.locality}, {project.city}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="grid grid-cols-3 gap-3 text-center border-b border-slate-100 pb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Starting From</div>
                    <div className="text-sm font-black text-[#0a192f] mt-0.5">{formatIndianCurrency(project.startingPrice)}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Configurations</div>
                    <div className="text-sm font-black text-[#0a192f] mt-0.5">{project.configurations.join(', ')}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Possession</div>
                    <div className="text-sm font-black text-emerald-700 mt-0.5">{project.possessionYear}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">Project Highlights</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    onClick={() => handleBrochureDownload(project.name)}
                    className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Brochure</span>
                  </button>

                  <button
                    onClick={() => {
                      const msg = `Hi PropertyDekhey, I am interested in booking an exclusive VIP site tour for ${project.name} by ${project.builderName}.`;
                      window.open(getWhatsAppUrl(msg), '_blank');
                    }}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Schedule VIP Tour</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
