import React from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/mockProjects';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

export const NewProjectsSection: React.FC = () => {
  const { setCurrentView, setEnquiryModalOpen, addToast } = useProperty();

  const handleDownloadBrochure = (e: React.MouseEvent, projectName: string) => {
    e.stopPropagation();
    addToast('success', 'Brochure Requested', `Official e-brochure & floor plans for ${projectName} sent to your WhatsApp/Email.`);
    const msg = `Namaste PropertyDekhey, please share the official brochure and price sheet for ${projectName}.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Builder Allotments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore New Projects by Top Indian Builders
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              RERA registered residential towers and integrated townships by Godrej, DLF, Prestige, and Tata Housing.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('projects')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-bold text-sm"
          >
            <span>View All New Launches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-amber-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={project.images[0]}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* RERA Badge */}
                <div className="absolute top-3 left-3 bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 backdrop-blur-sm flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>RERA {project.reraStatus}</span>
                </div>

                {/* Developer Tag */}
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-amber-300 flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{project.builderName}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">
                    {project.name}
                  </h3>

                  <div className="flex items-center text-xs text-slate-400 mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
                    <span className="truncate">{project.locality}, {project.city}</span>
                  </div>

                  {/* Price info */}
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50 mb-3">
                    <div className="text-[11px] text-slate-400">Starting From</div>
                    <div className="text-lg font-extrabold text-amber-400">
                      {formatIndianCurrency(project.startingPrice)}
                    </div>
                  </div>

                  {/* Configurations */}
                  <div className="text-xs text-slate-300 mb-2 font-medium">
                    {project.configurations.join(' • ')}
                  </div>

                  {/* Possession */}
                  <div className="flex items-center text-[11px] text-slate-400 mb-4">
                    <Calendar className="w-3 h-3 text-slate-500 mr-1" />
                    <span>Possession: {project.possessionDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-700 flex items-center gap-2">
                  <button
                    onClick={(e) => handleDownloadBrochure(e, project.name)}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download className="w-3 h-3 text-amber-400" />
                    <span>Brochure</span>
                  </button>

                  <button
                    onClick={() => setCurrentView('projects')}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-bold text-xs transition-colors text-center"
                  >
                    View Project
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
