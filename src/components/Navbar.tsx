import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  PlusCircle, 
  Phone, 
  ChevronDown,
  Heart
} from 'lucide-react';
import { useProperty, ActiveView } from '../context/PropertyContext';
import { BUSINESS_CONFIG } from '../config/business';

interface NavLinkItem {
  label: string;
  view: ActiveView;
  listingType?: 'buy' | 'rent';
}

const PRIMARY_NAV_ITEMS: NavLinkItem[] = [
  { label: 'Home', view: 'home' },
  { label: 'Buy', view: 'buy', listingType: 'buy' },
  { label: 'Rent', view: 'rent', listingType: 'rent' },
  { label: 'Sell', view: 'sell' },
  { label: 'Commercial', view: 'commercial' },
  { label: 'New Projects', view: 'projects' },
  { label: 'Agents', view: 'agents' },
  { label: 'Calculators', view: 'calculators' },
  { label: 'Insights', view: 'blog' },
];

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    favourites, 
    currentUser, 
    setAuthModalOpen,
    setFilters,
    businessConfig: dynamicConfig
  } = useProperty();
  const business = dynamicConfig || BUSINESS_CONFIG;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener for compact sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: ActiveView, listingType?: 'buy' | 'rent') => {
    if (listingType) {
      setFilters((prev) => ({ ...prev, listingType, propertyType: '' }));
    } else if (view === 'commercial') {
      setFilters((prev) => ({ ...prev, propertyType: 'commercial' }));
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const isViewActive = (view: ActiveView) => currentView === view;

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-50 transition-all duration-200 border-b border-slate-800 ${
        isScrolled 
          ? 'bg-[#0a192f]/95 backdrop-blur-md py-2.5 shadow-lg shadow-black/20' 
          : 'bg-[#0a192f] py-3.5 shadow-sm'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* ============================================================ */}
        {/* LEFT: PropertyDekhey Logo                                    */}
        {/* ============================================================ */}
        <div 
          id="navbar-brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none shrink-0"
          title="PropertyDekhey - Home"
        >
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="relative flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0a192f] absolute stroke-[2.5]" />
              <span className="text-xl font-black font-serif text-white tracking-tighter ml-2.5 mb-1">P</span>
            </div>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center leading-none">
              Property<span className="text-amber-400">Dekhey</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
              Indian Property Hub
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER: Main Navigation                                      */}
        {/* ============================================================ */}
        
        {/* Desktop Navigation: Full 9 items on XL screens (>=1280px, 1366px, 1440px, 1920px) */}
        <nav 
          id="desktop-main-navigation" 
          className="hidden xl:flex items-center space-x-1 text-[13px] 2xl:text-sm font-medium text-slate-200"
          aria-label="Main Navigation"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const active = isViewActive(item.view);
            return (
              <button
                key={item.label}
                id={`nav-link-${item.view}`}
                onClick={() => handleNavClick(item.view, item.listingType)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  active 
                    ? 'text-amber-400 bg-slate-800/90 font-semibold shadow-xs' 
                    : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Tablet Navigation (1024px to 1279px): Essential items + 'More' dropdown to prevent crowding */}
        <nav 
          id="tablet-main-navigation" 
          className="hidden lg:flex xl:hidden items-center space-x-1 text-xs font-medium text-slate-200"
          aria-label="Tablet Navigation"
        >
          {PRIMARY_NAV_ITEMS.slice(0, 5).map((item) => {
            const active = isViewActive(item.view);
            return (
              <button
                key={item.label}
                id={`nav-tablet-link-${item.view}`}
                onClick={() => handleNavClick(item.view, item.listingType)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  active 
                    ? 'text-amber-400 bg-slate-800/90 font-semibold' 
                    : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* 'More' dropdown for secondary items on tablet */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              id="tablet-more-menu-btn"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1 ${
                ['projects', 'agents', 'calculators', 'blog'].includes(currentView)
                  ? 'text-amber-400 bg-slate-800/90 font-semibold'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-[#0a192f] border border-slate-700/90 rounded-xl shadow-2xl py-1 z-50 text-xs text-slate-200">
                {PRIMARY_NAV_ITEMS.slice(5).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.view, item.listingType)}
                    className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-800 transition-colors flex items-center justify-between ${
                      isViewActive(item.view) ? 'text-amber-400 font-semibold bg-slate-800/40' : 'text-slate-300 hover:text-amber-300'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ============================================================ */}
        {/* RIGHT: Post Property CTA & Clickable Call Us                 */}
        {/* ============================================================ */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          
          {/* Subtle Saved Favourites Heart Icon (Quiet, zero noisy notification badges) */}
          <button
            id="nav-wishlist-btn"
            onClick={() => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                setAuthModalOpen(true);
              }
            }}
            title={favourites.length > 0 ? `Saved Properties (${favourites.length})` : 'Saved Properties'}
            className="hidden 2xl:flex p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors items-center justify-center"
            aria-label="View Saved Properties"
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Primary CTA: Post Property (FREE) */}
          <button
            id="nav-post-property-btn"
            onClick={() => handleNavClick('sell')}
            className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0a192f] font-bold px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl shadow-sm hover:shadow-amber-500/20 text-xs sm:text-sm tracking-tight transition-all active:scale-[0.98] shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Post Property</span>
            <span className="text-[9px] uppercase font-black px-1.5 py-0.5 bg-[#0a192f] text-amber-300 rounded-md ml-0.5 tracking-wider">
              FREE
            </span>
          </button>

          {/* Clickable Call Us Section (Desktop: >= 640px) */}
          <a
            id="nav-call-us-link"
            href={`tel:${business.primaryPhone}`}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200 transition-all group shrink-0"
            title={`Call PropertyDekhey: ${business.primaryPhoneDisplay} (Alternate: ${business.secondaryPhoneDisplay})`}
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 group-hover:bg-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-0.5">
                Call Us
              </span>
              <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors tracking-wide">
                {business.primaryPhoneDisplay}
              </span>
            </div>
          </a>

          {/* Mobile Direct Clickable Phone Icon (< 640px) */}
          <a
            id="nav-mobile-call-icon"
            href={`tel:${business.primaryPhone}`}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/80 text-amber-400 hover:text-amber-300 transition-colors"
            title={`Call Us: ${business.primaryPhoneDisplay}`}
            aria-label={`Call PropertyDekhey at ${business.primaryPhoneDisplay}`}
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile & Tablet Hamburger Menu Toggle */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors shrink-0"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE & TABLET NAVIGATION DRAWER                            */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0a192f] border-t border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          {/* Quick Call Us Card */}
          <div className="mb-3.5 p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300 text-xs font-medium">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Us</span>
              </div>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded-full">
                9 AM – 8 PM
              </span>
            </div>

            {/* Primary Phone Button */}
            <a
              href={`tel:${business.primaryPhone}`}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us: {business.primaryPhoneDisplay}</span>
            </a>

            {/* Alternate Phone Number */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 px-1 border-t border-slate-700/60">
              <span>Alternate:</span>
              <a
                href={`tel:${business.secondaryPhone}`}
                className="text-amber-400 hover:underline font-semibold"
              >
                {business.secondaryPhoneDisplay}
              </a>
            </div>
          </div>

          {/* Full Navigation Links */}
          <div className="space-y-1 font-medium text-slate-200">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const active = isViewActive(item.view);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view, item.listingType)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between text-sm ${
                    active 
                      ? 'bg-slate-800 text-amber-400 font-semibold' 
                      : 'hover:bg-slate-800/60 text-slate-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Post Property CTA */}
          <div className="pt-3.5 mt-3 border-t border-slate-800">
            <button
              onClick={() => handleNavClick('sell')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0a192f] font-bold text-sm text-center flex items-center justify-center space-x-2 shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Post Property</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 bg-[#0a192f] text-amber-300 rounded-md">
                FREE
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
