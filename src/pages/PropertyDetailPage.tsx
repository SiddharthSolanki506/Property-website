import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Layers, 
  Phone, 
  MessageSquare, 
  Calculator, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  Info, 
  Clock,
  Check,
  AlertCircle,
  FileText,
  IndianRupee,
  Tag,
  ShieldAlert,
  CheckSquare,
  Send,
  Download,
  Flame
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency, getWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';
import { PropertyCard } from '../components/PropertyCard';

export const PropertyDetailPage: React.FC = () => {
  const { 
    selectedPropertyId, 
    properties, 
    setCurrentView, 
    toggleFavourite, 
    isFavourite, 
    toggleCompare, 
    isCompared, 
    setEnquiryModalOpen, 
    setVisitModalOpen, 
    setShareModalOpen,
    submitEnquiry,
    businessConfig: dynamicConfig
  } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const property = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

  // Sticky Enquiry Form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Embedded EMI Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Sync default message when property changes
  useEffect(() => {
    if (property) {
      setEnquiryMessage(
        `I am interested in ${property.title} in ${property.locality}. Please share more details and arrange a callback.`
      );
      setEnquirySubmitted(false);

      // Dynamic SEO Title & Meta Tag handling
      if (property.id === 'anjani-putra-flats-sector-6-prithla') {
        document.title = 'Anjani Putra Flats Sector 6 Prithla | PropertyDekhey';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Explore Anjani Putra Flats, a new affordable housing project in Sector-6, Prithla, Greater Faridabad offering 3 BHK flats.'
          );
        }
      } else if (property.id === 'sector-112-greater-faridabad-2-3-bhk') {
        document.title = '2 & 3 BHK Flats Sector 112 Greater Faridabad | PropertyDekhey';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Explore upcoming 2 & 3 BHK high-rise apartments in Sector-112, Greater Faridabad with modern amenities and flexible payment options.'
          );
        }
      } else if (property.id === 'bptp-wa-vana-sector-80-faridabad') {
        document.title = 'BPTP Wa Vana Sector 80 Faridabad | Luxury Plots | PropertyDekhey';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Explore BPTP Wa Vana in Sector 80, Greater Faridabad. RERA-approved luxury nature-inspired residential plots featuring a 1-acre Japanese forest.'
          );
        }
      } else if (property.id === 'industrial-plots-near-imt-faridabad') {
        document.title = 'Industrial Plots Near IMT Faridabad | Clear Title Land | PropertyDekhey';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Explore prime industrial plots near IMT Faridabad Sector 68. 20-30m heavy duty roads, high-tension power, and direct NH-19 connectivity.'
          );
        }
      } else if (property.id === 'radhavan-residency-vrindavan') {
        document.title = 'Radhavan Residency Vrindavan | Gated Plotted Township | PropertyDekhey';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Explore Radhavan Residency in Vrindavan, Mathura. 50-acre gated spiritual township offering 100 to 576 sq.yd residential plots near Yamuna Expressway.'
          );
        }
      } else {
        document.title = `${property.title} in ${property.locality}, ${property.city} | PropertyDekhey`;
      }
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4 font-bold">Property not found.</p>
          <button
            onClick={() => setCurrentView('properties')}
            className="px-5 py-2.5 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-sm"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  // Handle unit options if present
  const currentUnit = property.unit_options ? property.unit_options[selectedUnitIndex] : null;
  const effectivePrice = currentUnit ? currentUnit.finalPrice : property.price;

  // Calculate Loan & EMI
  const downPaymentAmount = (effectivePrice * downPaymentPercent) / 100;
  const loanAmount = effectivePrice - downPaymentAmount;
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );

  const isFav = isFavourite(property.id);
  const inCompare = isCompared(property.id);

  const handleWhatsApp = () => {
    const msg = `Hi PropertyDekhey, I am interested in ${property.title}. Please share more details.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;

    submitEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCity: property.city,
      userName: enquiryName,
      userPhone: enquiryPhone,
      userEmail: enquiryEmail || 'Not Provided',
      message: enquiryMessage
    });

    setEnquirySubmitted(true);
  };

  // Find similar properties in same city or property type
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28 lg:pb-20">
      
      {/* Top Header Breadcrumb & Back button */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setCurrentView('properties')}
              className="flex items-center space-x-1 hover:text-amber-600 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to search</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setCurrentView('properties')}
              className="hover:text-amber-600 transition-colors"
            >
              {property.city}
            </button>
            <span>/</span>
            <span className="truncate max-w-[200px] font-semibold text-slate-800">{property.title}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleCompare(property.id)}
              className={`p-2 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1 ${
                inCompare ? 'bg-amber-500 text-[#0a192f] border-amber-500' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">{inCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true, property)}
              className="p-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-1"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => toggleFavourite(property.id)}
              className={`p-2 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1 ${
                isFav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'Shortlisted' : 'Shortlist'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Main Title, Badges & Price Header */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {property.status_badge === 'LOI Received' && (
                  <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 text-xs font-black px-2.5 py-1 rounded-lg border border-amber-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>LOI Received</span>
                  </span>
                )}
                {property.rera_status === 'RERA Approved' && (
                  <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-lg border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>RERA Approved</span>
                  </span>
                )}
                {property.isVerified && (
                  <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Property</span>
                  </span>
                )}
                <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                  {property.possession}
                </span>
                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                  {property.propertyType}
                </span>
                {property.bhk && (
                  <span className="bg-indigo-50 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-200">
                    {property.bhk}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {property.title}
              </h1>

              {/* Project & Location */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600">
                {property.project_name && property.project_name !== 'Not Mentioned' && (
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    Project: {property.project_name}
                  </span>
                )}
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {property.address || `${property.locality}, ${property.city}`}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="md:text-right shrink-0 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-slate-100">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                Pricing Overview
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#0a192f] tracking-tight">
                {property.price_display || formatIndianCurrency(property.price)}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Effective: ₹{property.pricePerSqFt.toLocaleString('en-IN')} / sq.ft.
              </div>
              {property.status_badge && (
                <div className="mt-1 text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block md:block">
                  Status: {property.status_badge}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs mb-8">
          <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 group">
            <img
              src={property.images[activeImageIndex]}
              alt={`${property.title} view ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Image counter pill */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
              Photo {activeImageIndex + 1} of {property.images.length}
            </div>

            {/* Floating verification indicator */}
            <div className="absolute top-4 left-4 flex gap-2">
              {property.status_badge ? (
                <div className="bg-amber-900/90 text-amber-300 text-xs font-black px-3 py-1.5 rounded-xl backdrop-blur-md border border-amber-500/40 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{property.status_badge}</span>
                </div>
              ) : property.rera_status === 'RERA Approved' ? (
                <div className="bg-emerald-900/90 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-xl backdrop-blur-md border border-emerald-500/40 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RERA Approved</span>
                </div>
              ) : property.isVerified ? (
                <div className="bg-emerald-900/90 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-emerald-500/40 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Property</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Thumbnails list */}
          <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                  activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8-Column Details */}
          <div className="lg:col-span-8 space-y-8">

            {/* UNIT OPTIONS SWITCHER (for 2 BHK & 3 BHK multi-unit projects) */}
            {property.unit_options && property.unit_options.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-600" />
                      Available Unit Configurations & Pricing
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select a configuration to view individual carpet area, base cost, launch discount, and booking terms.
                    </p>
                  </div>
                </div>

                {/* Configuration Tabs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {property.unit_options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedUnitIndex(idx)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all ${
                        selectedUnitIndex === idx
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-400/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base font-black text-slate-900">{option.bhk}</span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                          {option.areaSqFt} sq.ft
                        </span>
                      </div>
                      <div className="text-lg font-extrabold text-[#0a192f]">
                        {formatIndianCurrency(option.finalPrice)}
                      </div>
                      <div className="text-[11px] text-slate-500 line-through">
                        Base: {formatIndianCurrency(option.basePrice)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Unit Breakdown Box */}
                {currentUnit && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                      <div>
                        <div className="text-sm font-black text-slate-900">{currentUnit.bhk} Apartment Specifications</div>
                        <div className="text-xs text-slate-500">All prices computed at ₹6,050 / sq.ft effective discounted rate</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Save {formatIndianCurrency(currentUnit.discount)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-slate-400 font-semibold">Apartment Area</div>
                        <div className="text-sm font-black text-slate-900">{currentUnit.areaSqFt} sq.ft</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-slate-400 font-semibold">Base Price (@ ₹6,250/sq.ft)</div>
                        <div className="text-sm font-black text-slate-700">{formatIndianCurrency(currentUnit.basePrice)}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-emerald-600 font-semibold">Inaugural Discount (@ ₹200/sq.ft)</div>
                        <div className="text-sm font-black text-emerald-700">- {formatIndianCurrency(currentUnit.discount)}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-amber-700 font-semibold">Final Apartment Price</div>
                        <div className="text-base font-black text-[#0a192f]">{formatIndianCurrency(currentUnit.finalPrice)}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-slate-400 font-semibold">Booking Amount</div>
                        <div className="text-sm font-black text-slate-900">{formatIndianCurrency(currentUnit.bookingAmount)}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <div className="text-[11px] text-slate-400 font-semibold">Power Backup Included</div>
                        <div className="text-sm font-black text-emerald-700">{currentUnit.powerBackup}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TRANSPARENT PRICE BREAKDOWN TABLE */}
            {property.price_breakdown && property.price_breakdown.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-amber-600" />
                  Detailed Price Structure & Breakdown
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Transparent itemized rates provided as per official listing documents.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase text-[11px] tracking-wider">
                        <th className="py-3 px-4 rounded-l-xl font-bold">Component</th>
                        <th className="py-3 px-4 font-bold">Value / Rate</th>
                        <th className="py-3 px-4 rounded-r-xl font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {property.price_breakdown.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-800">{row.item}</td>
                          <td className="py-3 px-4 font-black text-[#0a192f]">{row.value}</td>
                          <td className="py-3 px-4 text-slate-500">{row.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MILESTONE-BASED CONSTRUCTION & PAYMENT PLAN */}
            {property.payment_plan && property.payment_plan.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Construction-Linked Milestone Payment Plan
                </h2>
                <p className="text-xs text-slate-500 mb-5">
                  Milestone instalments scheduled according to project approvals and structural completion stages.
                </p>

                <div className="relative border-l-2 border-amber-300 ml-4 pl-6 space-y-6">
                  {property.payment_plan.map((stage, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-amber-500 group-hover:scale-125 transition-transform" />
                      
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 hover:bg-amber-50/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className="font-extrabold text-sm text-slate-900">
                            Stage {idx + 1}: {stage.stage}
                          </span>
                          <span className="font-black text-sm text-[#0a192f] sm:text-right">
                            {stage.amount}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Timeline: {stage.timeline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FLOOR PLAN ROOM DIMENSIONS (Property #1) */}
            {property.floor_plan_dimensions && property.floor_plan_dimensions.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-amber-600" />
                  Floor Plan Room Dimensions & Layout
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Internal space measurements based on official project architectural plan.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.floor_plan_dimensions.map((dim, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <span className="text-xs font-semibold text-slate-500">{dim.room}</span>
                      <span className="text-sm font-black text-slate-900 mt-1">{dim.dimensions}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IMPORTANT CHARGES & CONDITIONS (Property #2) */}
            {property.additional_charges_conditions && property.additional_charges_conditions.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-600" />
                  Important Charges & Booking Conditions
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Standard developmental and statutory terms applicable to unit bookings:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.additional_charges_conditions.map((cond, i) => (
                    <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MARKETING DISCLAIMER NOTICE (Property #2) */}
            {property.marketing_disclaimer && (
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-3xl flex items-start space-x-3.5 text-xs text-amber-900">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 mb-1">Listing Marketing Notice:</div>
                  <p className="leading-relaxed text-slate-700">
                    {property.marketing_disclaimer}
                  </p>
                </div>
              </div>
            )}

            {/* PROJECT & DEVELOPER DETAILS CARD */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                Project & Developer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">Project Name</div>
                  <div className="font-black text-slate-900 mt-0.5">{property.project_name || property.title}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">Developer Information</div>
                  <div className="font-black text-amber-700 mt-0.5">{property.developer || 'Details Coming Soon'}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">Listing & Marketing Platform</div>
                  <div className="font-black text-[#0a192f] mt-0.5">{property.listed_by || 'PropertyDekhey'}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">Legal / Approval Status</div>
                  <div className="font-black text-slate-900 mt-0.5">
                    {property.status_badge === 'LOI Received'
                      ? 'LOI Received'
                      : property.rera_status || (property.reraNumber ? 'RERA Approved' : 'Not Mentioned')}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">RERA Registration ID</div>
                  <div className="font-black text-slate-900 mt-0.5">
                    {property.reraNumber || 'Not Mentioned (Details Coming Soon)'}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-slate-400 font-medium text-[11px]">Project Scale / Land Area</div>
                  <div className="font-black text-slate-900 mt-0.5">{property.totalLandArea || 'Not Mentioned'}</div>
                </div>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                Property Overview & Specs
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Carpet Area</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">
                    {currentUnit ? `${currentUnit.areaSqFt} sq.ft` : `${property.areaSqFt} sq.ft`}
                  </div>
                  <div className="text-[10px] text-slate-400">Super: {property.superAreaSqFt || property.areaSqFt} sq.ft</div>
                </div>

                {property.propertyType === 'Plot' ? (
                  <>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[11px] text-slate-400 font-medium">Plot Sizes / Config</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">
                        {property.bhk || 'Plots'}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{property.configurations?.join(', ') || 'Demarcated plots'}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[11px] text-slate-400 font-medium">Permissible Floors</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">Up to {property.totalFloors} Floors</div>
                      <div className="text-[10px] text-slate-400">As per building bye-laws</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[11px] text-slate-400 font-medium">Bedrooms</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">
                        {currentUnit ? currentUnit.bhk : property.bhk || `${property.bedrooms} BHK`}
                      </div>
                      <div className="text-[10px] text-slate-400">{property.bathrooms} Bathrooms</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[11px] text-slate-400 font-medium">Floor Level</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">{property.floor} of {property.totalFloors}</div>
                      <div className="text-[10px] text-slate-400">{property.balconies} Balconies</div>
                    </div>
                  </>
                )}

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Possession Status</div>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">{property.possession}</div>
                  <div className="text-[10px] text-slate-400">Age: {property.propertyAge || 'New Launch'}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Facing</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{property.facing} Facing</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Vastu Friendly</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Furnishing</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5 capitalize">{property.furnishing}</div>
                  <div className="text-[10px] text-slate-400">Ready for customization</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Reserved Parking</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{property.parking} Dedicated</div>
                  <div className="text-[10px] text-slate-400">Covered parking</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">Ownership Type</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{property.ownershipType || 'Freehold'}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Clear title</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                About this Property
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Society & Project Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-2.5 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Locality & Connectivity Highlights */}
            {property.localityHighlights && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  Neighbourhood & Connectivity
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.localityHighlights.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive EMI Calculator Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center space-x-2 mb-2 text-amber-600">
                <Calculator className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Financial Planning</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Home Loan EMI Calculator for this Property
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Calculate estimated monthly installment for {currentUnit ? currentUnit.bhk : property.title}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="text-[#0a192f]">{formatIndianCurrency(downPaymentAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Interest Rate ({interestRate}% p.a.)</span>
                      <span className="text-[#0a192f]">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={7}
                      max={12}
                      step={0.25}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Loan Tenure ({tenureYears} Years)</span>
                      <span className="text-[#0a192f]">{tenureYears} Yrs</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0a192f] to-[#132744] text-white p-6 rounded-3xl text-center shadow-lg">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Estimated Monthly EMI
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight my-2">
                    ₹{emi.toLocaleString('en-IN')}
                    <span className="text-xs text-slate-300 font-normal"> /mo</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 mt-4 pt-4 border-t border-slate-700/60">
                    <div className="flex justify-between">
                      <span>Principal Loan Amount:</span>
                      <span className="text-white font-bold">{formatIndianCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest Payable:</span>
                      <span className="text-white font-bold">{formatIndianCurrency(emi * months - loanAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right 4-Column Sticky Enquiry Panel (DESKTOP) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24" id="enquiry-panel">
            
            {/* STICKY ENQUIRY & CONTACT PANEL */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md">
              <div className="flex items-center space-x-2 text-amber-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider">Verified Listing Desk</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Interested in this Property?
              </h3>
              <p className="text-sm font-bold text-amber-600 mt-0.5 mb-3">
                Talk to PropertyDekhey
              </p>

              {/* Official Direct Phone Numbers */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 mb-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Phone:</span>
                  <a
                    href={`tel:${business.primaryPhone}`}
                    className="font-bold text-slate-900 hover:text-amber-600 flex items-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>{business.primaryPhoneDisplay}</span>
                  </a>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70">
                  <span className="text-slate-500 font-semibold">Secondary:</span>
                  <a
                    href={`tel:${business.secondaryPhone}`}
                    className="font-bold text-slate-900 hover:text-amber-600 flex items-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>{business.secondaryPhoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Direct Instant Action Buttons: Call Now & WhatsApp */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <a
                  href={`tel:${business.primaryPhone}`}
                  className="py-3 px-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {enquirySubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 mb-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">Enquiry Received!</h4>
                  <p className="text-sm font-semibold text-emerald-800 leading-snug">
                    Our PropertyDekhey team will contact you shortly.
                  </p>
                  <div className="pt-2">
                    <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-slate-800">
                      <span>Phone:</span>
                      <a href={`tel:${business.secondaryPhone}`} className="text-amber-600 hover:underline">
                        {business.secondaryPhoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`tel:${business.primaryPhone}`}
                      className="w-full py-2.5 px-3 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 hover:bg-[#132744] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now ({business.primaryPhoneDisplay})</span>
                    </a>
                    <button
                      onClick={() => setEnquirySubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-medium pt-1"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form id="enquiry-form" onSubmit={handleEnquirySubmit} className="space-y-3 mb-4">
                  {/* Property Interested In */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Property Interested In
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={property.title}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-100/80 cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs text-slate-600 font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98114 51867"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50 resize-none"
                    />
                  </div>

                  {/* Button 3: Request a Callback */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#0a192f] hover:bg-[#132744] text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Request a Callback</span>
                  </button>
                </form>
              )}

              {/* Button 4: Schedule a Visit */}
              <div className="space-y-2.5">
                <button
                  onClick={() => setVisitModalOpen(true, property)}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Visit</span>
                </button>
              </div>

              {/* Developer and Marketing Attribution */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 text-center">
                <div>
                  Developer: <span className="font-bold text-slate-700">{property.developer || 'Details Coming Soon'}</span>
                </div>
                <div>
                  Marketed by: <span className="font-bold text-[#0a192f]">{property.listed_by || 'PropertyDekhey'}</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-emerald-600 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero spam guarantee • 100% Privacy Protected</span>
                </div>
              </div>
            </div>

            {/* Trust Assurance Badge */}
            <div className="bg-gradient-to-br from-[#0a192f] to-[#132744] text-white p-5 rounded-3xl shadow-sm">
              <div className="flex items-center space-x-2 text-amber-400 mb-2 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>PropertyDekhey Assurance</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• Transparent pricing with zero hidden charges</li>
                <li>• Free assisted documentation & site visits</li>
                <li>• Official builder price matching guarantee</li>
              </ul>
            </div>

          </aside>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
              Similar Verified Properties in {property.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MOBILE STICKY BOTTOM CTA (Call Now | WhatsApp | Callback | Visit) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 shadow-2xl">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5">
          {/* 1. Call Now */}
          <a
            href={`tel:${business.primaryPhone}`}
            className="flex flex-col items-center justify-center py-2 px-1 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold text-[10px] transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-600 mb-0.5" />
            <span>Call Now</span>
          </a>

          {/* 2. WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[10px] transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <span>WhatsApp</span>
          </button>

          {/* 3. Callback */}
          <button
            onClick={() => {
              const el = document.getElementById('enquiry-panel');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setEnquiryModalOpen(true, property);
              }
            }}
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#0a192f] hover:bg-[#132744] text-amber-400 rounded-xl font-bold text-[10px] transition-colors shadow-sm"
          >
            <Send className="w-4 h-4 mb-0.5 text-amber-400" />
            <span>Callback</span>
          </button>

          {/* 4. Schedule Visit */}
          <button
            onClick={() => setVisitModalOpen(true, property)}
            className="flex flex-col items-center justify-center py-2 px-1 bg-amber-500 hover:bg-amber-400 text-[#0a192f] rounded-xl font-bold text-[10px] transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Visit</span>
          </button>
        </div>
      </div>

    </div>
  );
};
