import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Rohan & Shweta Kapur',
      role: 'Homebuyers, 3 BHK Noida Sector 150',
      text: 'PropertyDekhey made our property search incredibly simple. We found exactly what we were looking for in Sector 150. Every detail regarding RERA registration and bank approvals was 100% genuine.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: 'Verified Buyer'
    },
    {
      name: 'Sandeep Vohra',
      role: 'NRI Investor, Dubai (Properties in Gurugram)',
      text: 'Being an NRI, distance was always a hurdle for inspecting projects. The relationship manager arranged a high-res video tour, handled the registry paperwork, and coordinated with HDFC for my home loan smoothly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: 'NRI Investor'
    },
    {
      name: 'Priyanka Sen',
      role: 'Software Architect, Bangalore Whitefield',
      text: 'What stood out was the complete absence of spam calls! I scheduled two site visits on WhatsApp, received confirmed slots within an hour, and closed my flat with total transparency.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verified: 'Verified Tenant'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Real Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-2">
            What Homeowners Say About Us
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Hear from genuine buyers, NRI investors, and tenants who found their property match on PropertyDekhey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-400/40 mb-2" />

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  “{t.text}”
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
