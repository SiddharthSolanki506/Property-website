import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  IndianRupee, 
  BedDouble, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { ListingType } from '../types/property';
import { SAMPLE_LOCALITIES } from '../data/mockProperties';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setFilters } = useProperty();

  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'projects'>('buy');
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [bhk, setBhk] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  // Filter autocomplete suggestions based on location input
  const filteredSuggestions = SAMPLE_LOCALITIES.filter((loc) =>
    loc.name.toLowerCase().includes(locationInput.toLowerCase()) ||
    loc.city.toLowerCase().includes(locationInput.toLowerCase())
  );

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (activeTab === 'projects') {
      setCurrentView('projects');
      return;
    }

    if (activeTab === 'commercial') {
      setFilters((prev) => ({
        ...prev,
        listingType: 'buy',
        propertyType: 'commercial',
        searchQuery: locationInput,
      }));
      setCurrentView('commercial');
      return;
    }

    // Parse budget
    let minPrice = 0;
    let maxPrice = 100000000;
    if (budgetRange === 'under-50l') {
      maxPrice = 5000000;
    } else if (budgetRange === '50l-1cr') {
      minPrice = 5000000;
      maxPrice = 10000000;
    } else if (budgetRange === '1cr-2cr') {
      minPrice = 10000000;
      maxPrice = 20000000;
    } else if (budgetRange === '2cr-plus') {
      minPrice = 20000000;
      maxPrice = 100000000;
    } else if (budgetRange === 'rent-under-30k') {
      maxPrice = 30000;
    } else if (budgetRange === 'rent-30k-60k') {
      minPrice = 30000;
      maxPrice = 60000;
    } else if (budgetRange === 'rent-60k-plus') {
      minPrice = 60000;
      maxPrice = 500000;
    }

    setFilters((prev) => ({
      ...prev,
      listingType: activeTab as ListingType,
      searchQuery: locationInput,
      propertyType: propertyType || '',
      bhk: bhk ? [bhk] : [],
      minPrice,
      maxPrice
    }));

    setCurrentView('properties');
  };

  const handleSelectSuggestion = (locName: string) => {
    setLocationInput(locName);
    setSuggestionsOpen(false);
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#071324] overflow-hidden">
      {/* High-res background image of modern Indian luxury architecture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Modern Indian Luxury Residences"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle Dark Gradient Overlay for optimal legibility & trust */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/95 via-[#0a192f]/85 to-[#071324]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-black/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
        
        {/* Verification & Trust pill */}
        <div className="inline-flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 mb-6 shadow-lg shadow-black/20">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>India’s Most Trusted Real-Estate Discovery Portal</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto drop-shadow-sm">
          Find a Place You’ll Love to Call Home.
        </h1>

        {/* Supporting Text */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed">
          Discover verified properties across India for buying, renting and investment.
        </p>

        {/* Search Card Container */}
        <div className="mt-8 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/20 text-left max-w-4xl mx-auto">
          
          {/* Search Tabs: Buy | Rent | Commercial | Projects */}
          <div className="flex items-center space-x-1 sm:space-x-2 border-b border-slate-200 pb-3 mb-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'buy', label: 'Buy' },
              { id: 'rent', label: 'Rent' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'projects', label: 'New Projects' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setBudgetRange('');
                }}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0a192f] text-amber-400 shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Row */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Location Autocomplete Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setSuggestionsOpen(true);
                  }}
                  onFocus={() => setSuggestionsOpen(true)}
                  placeholder="City, locality or landmark"
                  className="w-full pl-9 pr-7 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
                {locationInput && (
                  <button
                    type="button"
                    onClick={() => setLocationInput('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {suggestionsOpen && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-56 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                    Suggested Corridors & Localities
                  </div>
                  {filteredSuggestions.slice(0, 6).map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSelectSuggestion(item.name)}
                      className="w-full text-left px-3.5 py-2 hover:bg-amber-50/80 flex items-center justify-between text-xs text-slate-800 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Type Dropdown */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment / Flat</option>
                  <option value="villa">Independent Villa</option>
                  <option value="builder floor">Builder Floor</option>
                  <option value="plot">Residential Plot</option>
                  <option value="commercial">Commercial / Office</option>
                  <option value="penthouse">Luxury Penthouse</option>
                </select>
              </div>
            </div>

            {/* Budget Selector */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Budget
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Budget</option>
                  {activeTab === 'rent' ? (
                    <>
                      <option value="rent-under-30k">Under ₹30,000</option>
                      <option value="rent-30k-60k">₹30,000 - ₹60,000</option>
                      <option value="rent-60k-plus">₹60,000 +</option>
                    </>
                  ) : (
                    <>
                      <option value="under-50l">Under ₹50 Lakh</option>
                      <option value="50l-1cr">₹50L - ₹1 Crore</option>
                      <option value="1cr-2cr">₹1Cr - ₹2 Crore</option>
                      <option value="2cr-plus">₹2 Crore +</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Bedrooms (BHK) */}
            <div className="lg:col-span-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                BHK
              </label>
              <div className="relative">
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Any</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK">4+ BHK</option>
                </select>
              </div>
            </div>

            {/* Search Properties CTA Button */}
            <div className="lg:col-span-2 pt-1 sm:pt-0">
              <label className="hidden lg:block text-[11px] font-bold uppercase tracking-wider text-transparent mb-1">
                Search
              </label>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-extrabold rounded-xl shadow-md hover:shadow-amber-500/30 flex items-center justify-center space-x-1.5 text-xs sm:text-sm transition-all duration-150"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Search</span>
              </button>
            </div>

          </form>

          {/* Quick Trending Searches */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700 flex items-center">
              <TrendingUp className="w-3 h-3 text-amber-500 mr-1" />
              Trending:
            </span>
            {[
              { label: '3 BHK in Noida Sec 150', q: 'Noida Sector 150' },
              { label: 'Golf Course Road Gurugram', q: 'Golf Course Road' },
              { label: 'Flats in Dwarka', q: 'Dwarka' },
              { label: 'Whitefield Bengaluru', q: 'Whitefield' }
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setLocationInput(tag.q);
                  setFilters((prev) => ({ ...prev, searchQuery: tag.q }));
                  setCurrentView('properties');
                }}
                className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>

        {/* Small Trust Statement Below Hero */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Thousands of Verified Properties</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Genuine RERA Listings</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Trusted Property Professionals</span>
          </div>
        </div>

      </div>
    </section>
  );
};
