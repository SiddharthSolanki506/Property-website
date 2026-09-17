import React from 'react';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  ShieldCheck, 
  Share2, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { Property } from '../types/property';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'grid' }) => {
  const { 
    setCurrentView, 
    toggleFavourite, 
    isFavourite, 
    toggleCompare, 
    isCompared, 
    setEnquiryModalOpen,
    setShareModalOpen 
  } = useProperty();

  const isFav = isFavourite(property.id);
  const inCompare = isCompared(property.id);

  const handleCardClick = () => {
    setCurrentView('property-detail', property.id);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = BUSINESS_CONFIG.whatsappTemplates.propertyEnquiry(
      property.title,
      property.id,
      `${property.locality}, ${property.city}`
    );
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div
      id={`property-card-${property.id}`}
      onClick={handleCardClick}
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex cursor-pointer ${
        layout === 'list' ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 ${
        layout === 'list' ? 'w-full md:w-2/5 min-h-[240px]' : 'w-full h-56'
      }`}>
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (property.images[1] && target.src !== property.images[1]) {
              target.src = property.images[1];
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            {/* Property Type Badge */}
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#0a192f]/90 text-white shadow-sm backdrop-blur-sm">
              {property.propertyType}
            </span>

            {/* Featured Badge */}
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-[#0a192f] shadow-sm">
                Featured
              </span>
            )}
          </div>

          {/* Action buttons (Fav + Share + Compare) */}
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(property.id);
              }}
              title="Add to Compare"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors backdrop-blur-md ${
                inCompare
                  ? 'bg-amber-500 text-[#0a192f] font-bold shadow-md'
                  : 'bg-black/40 hover:bg-black/70 text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShareModalOpen(true, property);
              }}
              title="Share Property"
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Favourite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(property.id);
              }}
              title="Save to Favourites"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors backdrop-blur-md ${
                isFav
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-black/40 hover:bg-black/70 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Verification / Legal Status Pill on Bottom Left */}
        {property.status_badge ? (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-amber-950/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{property.status_badge}</span>
          </div>
        ) : property.rera_status === 'RERA Approved' ? (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-emerald-950/90 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-emerald-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>RERA Approved</span>
          </div>
        ) : property.isVerified ? (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-emerald-950/90 text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Property</span>
          </div>
        ) : null}

        {/* Possession Badge Bottom Right */}
        <div className="absolute bottom-3 right-3 text-[11px] font-medium bg-slate-900/80 text-slate-200 px-2 py-0.5 rounded backdrop-blur-sm">
          {property.possession}
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0a192f] tracking-tight">
                {property.price_display || formatIndianCurrency(property.price)}
              </span>
              {property.listingType === 'rent' && (
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              )}
            </div>
            <span className="text-xs text-slate-400 font-medium">
              ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
            <span className="truncate">{property.locality}, {property.city}</span>
          </div>

          {/* Specs Matrix */}
          {property.propertyType === 'Plot' ? (
            <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 mb-4">
              <div className="flex items-center space-x-1.5 truncate">
                <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold truncate">{property.bhk || 'Residential Plots'}</span>
              </div>
              <div className="flex items-center space-x-1.5 justify-end">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold">
                  {property.areaSqFt}
                  {property.superAreaSqFt && property.superAreaSqFt !== property.areaSqFt ? `–${property.superAreaSqFt}` : ''}
                  <span className="text-[10px] text-slate-400 font-normal ml-0.5">sq.ft</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 mb-4">
              <div className="flex items-center space-x-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold">{property.bhk || (property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Bath className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold">{property.areaSqFt} <span className="text-[10px] text-slate-400 font-normal">sq.ft</span></span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* WhatsApp / Quick Contact */}
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* View Details CTA */}
          <button
            onClick={handleCardClick}
            className="flex-1 py-2 px-3 rounded-lg bg-[#0a192f] hover:bg-[#132744] text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1 group-hover:bg-amber-500 group-hover:text-[#0a192f]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
