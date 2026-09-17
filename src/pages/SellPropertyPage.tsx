import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Home, 
  IndianRupee, 
  CheckCircle2, 
  Image as ImageIcon, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { PropertyType, ListingType, FurnishingType, Property } from '../types/property';

export const SellPropertyPage: React.FC = () => {
  const { addProperty, setCurrentView, currentUser, addToast } = useProperty();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic
    listingType: 'buy' as ListingType,
    propertyType: 'apartment' as PropertyType,
    title: '',

    // Step 2: Location
    city: 'Noida',
    locality: '',
    address: '',
    pincode: '201301',

    // Step 3: Specs
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    areaSqFt: 1750,
    superAreaSqFt: 2100,
    floor: 8,
    totalFloors: 24,
    facing: 'North-East',
    furnishing: 'semi-furnished' as FurnishingType,
    ageOfProperty: '0-1 Years',

    // Step 4: Pricing & Legal
    price: 13500000,
    maintenanceCharges: 4500,
    reraNumber: 'UPRERAAGT2025/119',
    possession: 'Ready to Move',

    // Step 5: Amenities
    amenities: ['Clubhouse', 'Swimming Pool', '24/7 Security', 'Power Backup', 'Gym', 'EV Charging'] as string[],

    // Step 6: Photos & Description
    description: '',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ] as string[],
    newImageUrl: '',

    // Step 7: Contact
    contactName: currentUser?.name || '',
    contactPhone: currentUser?.phone || '',
    contactEmail: currentUser?.email || ''
  });

  const availableAmenities = [
    'Clubhouse', 'Swimming Pool', 'Gymnasium', '24/7 Security',
    'Power Backup', 'Lift Access', 'Children Play Area', 'EV Charging Point',
    'Landscaped Gardens', 'Intercom Facility', 'Visitor Parking', 'Jogging Track',
    'Badminton Court', 'Fire Fighting System', 'Gas Pipeline', 'Vastu Compliant'
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter((a) => a !== amenity) 
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleAddImage = () => {
    if (formData.newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, prev.newImageUrl.trim()],
        newImageUrl: ''
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.locality || !formData.price) {
      addToast('error', 'Missing Information', 'Please complete all required fields.');
      return;
    }

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      listingType: formData.listingType,
      propertyType: formData.propertyType,
      price: Number(formData.price),
      pricePerSqFt: Math.round(Number(formData.price) / Number(formData.areaSqFt)),
      maintenanceCharges: Number(formData.maintenanceCharges),
      city: formData.city,
      locality: formData.locality,
      address: formData.address,
      pincode: formData.pincode,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      balconies: Number(formData.balconies),
      areaSqFt: Number(formData.areaSqFt),
      superAreaSqFt: Number(formData.superAreaSqFt),
      floor: Number(formData.floor),
      totalFloors: Number(formData.totalFloors),
      facing: formData.facing,
      furnishing: formData.furnishing,
      ageOfProperty: formData.ageOfProperty,
      possession: formData.possession,
      possessionDate: 'Immediate',
      reraNumber: formData.reraNumber || undefined,
      verificationBadges: ['owner_verified', 'verified_property'],
      isFeatured: false,
      isVerified: true,
      amenities: formData.amenities,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: formData.description || `${formData.bedrooms} BHK spacious apartment located in ${formData.locality}, ${formData.city}. Excellent natural light and ventilation with gated society amenities.`,
      agentId: 'agent-1',
      datePosted: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      inquiriesCount: 0
    };

    addProperty(newProperty);
    addToast('success', 'Listing Live!', 'Your property has been listed and is now visible to thousands of verified buyers.');
    setCurrentView('property-detail', newProperty.id);
  };

  const stepsList = [
    { num: 1, title: 'Basic Info' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Property Specs' },
    { num: 4, title: 'Price & Legal' },
    { num: 5, title: 'Amenities' },
    { num: 6, title: 'Photos & Info' },
    { num: 7, title: 'Contact Details' }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header Card */}
        <div className="bg-[#0a192f] text-white p-6 sm:p-8 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Brokerage For Direct Owners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Post Your Property for Free
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            List your apartment, villa, commercial office or plot on PropertyDekhey. Reach 50,000+ genuine buyers and verified tenants.
          </p>
        </div>

        {/* 7-Step Horizontal Progress Tracker */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {stepsList.map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <div 
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive 
                      ? 'bg-amber-500 text-[#0a192f] ring-4 ring-amber-100 shadow-sm' 
                      : isPast 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${
                    isActive ? 'text-slate-900' : isPast ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                  {step.num < 7 && <div className="w-4 h-[1px] bg-slate-200" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
          
          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 1: Basic Property Details</h2>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, listingType: 'buy' })}
                    className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      formData.listingType === 'buy'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Sell My Property
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, listingType: 'rent' })}
                    className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      formData.listingType === 'rent'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Rent Out My Property
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Property Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'apartment', label: 'Apartment / Flat' },
                    { id: 'villa', label: 'Independent Villa' },
                    { id: 'builder floor', label: 'Builder Floor' },
                    { id: 'plot', label: 'Residential Plot' },
                    { id: 'commercial', label: 'Commercial Space' },
                    { id: 'penthouse', label: 'Luxury Penthouse' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: t.id as any })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                        formData.propertyType === t.id
                          ? 'border-[#0a192f] bg-[#0a192f] text-amber-400'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Spacious 3 BHK Luxury Flat in ATS Pristine, Sector 150"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 2: Property Location</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none"
                  >
                    {['Noida', 'Gurugram', 'Delhi NCR', 'Greater Noida', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Locality / Sector / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    placeholder="e.g. Sector 150, Expressway"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Project / Society Name & Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Tower 4, Flat 802, ATS Pristine"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none"
                />
              </div>

              <div className="max-w-xs">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="201301"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Property Specs */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 3: Specifications & Configuration</h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Balconies</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={formData.balconies}
                    onChange={(e) => setFormData({ ...formData, balconies: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Carpet Area (sq.ft) *</label>
                  <input
                    type="number"
                    value={formData.areaSqFt}
                    onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Super Built-up Area (sq.ft)</label>
                  <input
                    type="number"
                    value={formData.superAreaSqFt}
                    onChange={(e) => setFormData({ ...formData, superAreaSqFt: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Floor No.</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Floors</label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => setFormData({ ...formData, totalFloors: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facing</label>
                  <select
                    value={formData.facing}
                    onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  >
                    <option value="North-East">North-East (Vastu)</option>
                    <option value="East">East</option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Furnishing</label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => setFormData({ ...formData, furnishing: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  >
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="furnished">Fully Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age of Property</label>
                  <select
                    value={formData.ageOfProperty}
                    onChange={(e) => setFormData({ ...formData, ageOfProperty: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  >
                    <option value="0-1 Years">0-1 Years (Brand New)</option>
                    <option value="1-5 Years">1-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Price & Legal */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 4: Pricing & Legal Verification</h2>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Expected {formData.listingType === 'buy' ? 'Selling Price (₹)' : 'Monthly Rent (₹)'} *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black focus:outline-none"
                  />
                </div>
                <div className="text-xs text-amber-600 font-semibold mt-1">
                  In Words: {formData.price >= 10000000 ? `₹${(formData.price / 10000000).toFixed(2)} Crore` : `₹${(formData.price / 100000).toFixed(2)} Lakh`}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Monthly Maintenance (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.maintenanceCharges}
                    onChange={(e) => setFormData({ ...formData, maintenanceCharges: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Possession Status
                  </label>
                  <select
                    value={formData.possession}
                    onChange={(e) => setFormData({ ...formData, possession: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  RERA Registration Number (Optional, boosts trust badge)
                </label>
                <input
                  type="text"
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  placeholder="e.g. UPRERAAGT2025/119"
                  className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Amenities */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 5: Society Amenities</h2>
              <p className="text-xs text-slate-500">Select all amenities available in your apartment complex or society.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableAmenities.map((amenity) => {
                  const checked = formData.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        checked
                          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{amenity}</span>
                      <CheckCircle2 className={`w-4 h-4 ${checked ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Photos & Description */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 6: Photos & Description</h2>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Property Photos ({formData.images.length} added)
                </label>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative h-24 rounded-xl overflow-hidden group border">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.newImageUrl}
                    onChange={(e) => setFormData({ ...formData, newImageUrl: e.target.value })}
                    placeholder="Paste image URL..."
                    className="flex-1 px-3 py-2 bg-slate-50 border rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Property Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Highlight key advantages such as corner flat, park facing, modular kitchen, metro connectivity, etc."
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 7: Contact Info */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-slate-900">Step 7: Owner Contact Information</h2>
              <p className="text-xs text-slate-500">Prospective buyers will be verified before being connected with you.</p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (+91) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="ramesh@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Zero-Spam Verification:</strong> Your contact number is guarded. Only screened enquiries that confirm budget and timeframe will be routed to your WhatsApp.
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls between Steps */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-7 py-3 bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-colors shadow-md"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-sm flex items-center space-x-2 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Listing Free</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
