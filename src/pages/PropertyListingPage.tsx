import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Bell, 
  ShieldCheck, 
  IndianRupee, 
  Home, 
  X,
  ChevronDown
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyAlertModal } from '../components/PropertyAlertModal';
import { ListingType } from '../types/property';

export const PropertyListingPage: React.FC = () => {
  const { 
    filteredProperties, 
    filters, 
    setFilters, 
    resetFilters,
    sortBy, 
    setSortBy 
  } = useProperty();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const handleListingTypeToggle = (type: ListingType) => {
    setFilters((prev) => ({
      ...prev,
      listingType: type,
      minPrice: 0,
      maxPrice: type === 'rent' ? 200000 : 100000000
    }));
  };

  const handleBhkToggle = (bhkVal: string) => {
    setFilters((prev) => {
      const exists = prev.bhk.includes(bhkVal);
      const newBhk = exists 
        ? prev.bhk.filter((b) => b !== bhkVal) 
        : [...prev.bhk, bhkVal];
      return { ...prev, bhk: newBhk };
    });
  };

  const handleTypeToggle = (typeVal: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType === typeVal ? '' : typeVal
    }));
  };

  const citiesList = ['All Cities', 'Faridabad', 'Vrindavan', 'Delhi NCR', 'Noida', 'Gurugram', 'Greater Noida', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-[#0a192f] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1.5">
              <span>Home</span>
              <span>/</span>
              <span className="capitalize">{filters.listingType === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}</span>
              {filters.city && (
                <>
                  <span>/</span>
                  <span className="text-amber-400 font-medium">{filters.city}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {filters.listingType === 'buy' ? 'Properties for Sale' : 'Properties for Rent'} in {filters.city || 'India'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Showing {filteredProperties.length} verified listings ready for immediate inspection.
            </p>
          </div>

          {/* Quick Alert CTA */}
          <button
            onClick={() => setAlertModalOpen(true)}
            className="self-start md:self-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Create Property Alert</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="flex items-center space-x-2">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 bg-[#0a192f] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filters</span>
            </button>

            {/* Quick Buy / Rent Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => handleListingTypeToggle('buy')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filters.listingType === 'buy' ? 'bg-[#0a192f] text-amber-400 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => handleListingTypeToggle('rent')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filters.listingType === 'rent' ? 'bg-[#0a192f] text-amber-400 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Verified Only Pill */}
            <button
              onClick={() => setFilters((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                filters.verifiedOnly
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Only</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort Selector */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="views">Most Popular</option>
              </select>
            </div>

            {/* Layout Toggle (Grid / List) */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layout === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main 2-Column Layout (Sidebar Filters + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>Filter Listings</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Keyword / Locality
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Sector 150, Whitefield..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* City Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                City / Region
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value === 'All Cities' ? '' : e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c === 'All Cities' ? '' : c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Property Types */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Property Type
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'apartment', label: 'Apartment / Flat' },
                  { id: 'villa', label: 'Independent Villa' },
                  { id: 'builder floor', label: 'Builder Floor' },
                  { id: 'plot', label: 'Residential Plot' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'penthouse', label: 'Penthouse' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={filters.propertyType === item.id}
                      onChange={() => handleTypeToggle(item.id)}
                      className="rounded text-amber-500 focus:ring-amber-400"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* BHK Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Bedrooms (BHK)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhkVal) => {
                  const selected = filters.bhk.includes(bhkVal);
                  return (
                    <button
                      key={bhkVal}
                      type="button"
                      onClick={() => handleBhkToggle(bhkVal)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                        selected
                          ? 'bg-[#0a192f] text-amber-400 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {bhkVal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Budget Range */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Max Budget
                </label>
                <span className="text-xs font-bold text-amber-600">
                  {filters.listingType === 'rent'
                    ? `₹${(filters.maxPrice || 100000).toLocaleString('en-IN')}/mo`
                    : `₹${((filters.maxPrice || 30000000) / 10000000).toFixed(1)} Cr`}
                </span>
              </div>
              <input
                type="range"
                min={filters.listingType === 'rent' ? 10000 : 2000000}
                max={filters.listingType === 'rent' ? 200000 : 50000000}
                step={filters.listingType === 'rent' ? 5000 : 1000000}
                value={filters.maxPrice || (filters.listingType === 'rent' ? 100000 : 30000000)}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Furnishing */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Furnishing Status
              </label>
              <select
                value={filters.furnishing}
                onChange={(e) => setFilters((prev) => ({ ...prev, furnishing: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              >
                <option value="">Any Furnishing</option>
                <option value="furnished">Fully Furnished</option>
                <option value="semi-furnished">Semi Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Verified checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center space-x-2 text-xs text-slate-800 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="rounded text-amber-500"
                />
                <span>Only Verified & RERA Checked</span>
              </label>
            </div>

          </aside>

          {/* Results Column */}
          <main className="lg:col-span-9">
            
            {filteredProperties.length > 0 ? (
              <div className={`grid gap-6 ${
                layout === 'list' 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    layout={layout} 
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Properties Found</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  We couldn't find any properties matching your current filter criteria. Try adjusting your budget, BHK configuration, or clearing the search query.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={resetFilters}
                    className="py-2.5 px-6 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs hover:bg-[#132744] transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setAlertModalOpen(true)}
                    className="py-2.5 px-6 bg-amber-500 text-[#0a192f] font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
                  >
                    Get Alert When Available
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Property Alert Modal */}
      <PropertyAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
      />

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Search</label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Sector 150..."
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value === 'All Cities' ? '' : e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c === 'All Cities' ? '' : c}>{c}</option>
                ))}
              </select>
            </div>

            {/* BHK */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">BHK</label>
              <div className="grid grid-cols-2 gap-2">
                {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBhkToggle(b)}
                    className={`py-2 rounded-lg text-xs font-bold ${
                      filters.bhk.includes(b) ? 'bg-[#0a192f] text-amber-400' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#0a192f] text-amber-400 rounded-xl text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
