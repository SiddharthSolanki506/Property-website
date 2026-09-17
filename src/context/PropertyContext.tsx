import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Property, 
  Enquiry, 
  VisitRequest, 
  PropertyAlert, 
  UserProfile, 
  FilterState,
  ListingType 
} from '../types/property';
import { INITIAL_PROPERTIES } from '../data/mockProperties';
import { BUSINESS_CONFIG } from '../config/business';

export type ActiveView = 
  | 'home' 
  | 'properties' 
  | 'property-detail' 
  | 'buy' 
  | 'rent' 
  | 'commercial' 
  | 'projects' 
  | 'sell' 
  | 'agents' 
  | 'calculators' 
  | 'blog' 
  | 'about' 
  | 'contact' 
  | 'dashboard' 
  | 'admin' 
  | 'compare';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface PropertyContextType {
  // Properties Data
  properties: Property[];
  addProperty: (propertyData: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'enquiriesCount'>) => Property;
  updatePropertyStatus: (id: string, status: Property['status']) => void;
  toggleVerifyProperty: (id: string) => void;
  toggleFeaturedProperty: (id: string) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
  
  // Navigation & Routing
  currentView: ActiveView;
  setCurrentView: (view: ActiveView, propertyId?: string) => void;
  selectedPropertyId: string | null;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;

  // Filters & Discovery
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setQuickSearch: (query: string, listingType?: ListingType, city?: string, bhk?: string) => void;
  filteredProperties: Property[];

  // User & Auth
  currentUser: UserProfile | null;
  loginUser: (role?: 'user' | 'agent' | 'admin', name?: string, phoneOrEmail?: string) => void;
  logoutUser: () => void;
  
  // Favourites
  favourites: string[];
  toggleFavourite: (propertyId: string) => void;
  isFavourite: (propertyId: string) => boolean;

  // Comparison
  comparedPropertyIds: string[];
  toggleCompare: (propertyId: string) => void;
  clearComparison: () => void;
  isCompared: (propertyId: string) => boolean;

  // Enquiries & Leads
  enquiries: Enquiry[];
  submitEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;

  // Site Visits
  visits: VisitRequest[];
  scheduleVisit: (visitData: Omit<VisitRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateVisitStatus: (id: string, status: VisitRequest['status']) => void;

  // Property Alerts
  alerts: PropertyAlert[];
  createAlert: (alertData: Omit<PropertyAlert, 'id' | 'createdAt' | 'active'>) => void;
  deleteAlert: (id: string) => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  scheduleModalOpen: boolean;
  setScheduleModalOpen: (open: boolean, property?: Property | null) => void;
  enquiryModalOpen: boolean;
  setEnquiryModalOpen: (open: boolean, property?: Property | null) => void;
  activeModalProperty: Property | null;
  shareModalOpen: boolean;
  setShareModalOpen: (open: boolean, property?: Property | null) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Central Business Configuration
  businessConfig: typeof BUSINESS_CONFIG;
  updateBusinessConfig: (newConfig: Partial<typeof BUSINESS_CONFIG>) => void;
  resetBusinessConfig: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  listingType: 'buy',
  city: '',
  locality: '',
  propertyType: '',
  minPrice: 0,
  maxPrice: 100000000,
  bhk: [],
  furnishing: '',
  possession: '',
  verifiedOnly: false,
  sortBy: 'relevance'
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-901',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98712 34567',
  role: 'user',
  savedPropertyIds: ['PD-1001', 'PD-1002'],
  recentSearches: ['Noida Sector 150', 'Sector 80 Faridabad', 'Whitefield Bangalore']
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Properties state with persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('pd_properties_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleanParsed = parsed.filter((p: any) => p.id !== 'PD-1003' && !p.title?.includes('Ultra-Luxury 3 BHK'));
          const existingIds = new Set(cleanParsed.map((p: any) => p.id));
          const missing = INITIAL_PROPERTIES.filter((p) => !existingIds.has(p.id));
          if (missing.length > 0) {
            return [...missing, ...cleanParsed];
          }
          return cleanParsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored properties', e);
    }
    return INITIAL_PROPERTIES;
  });

  // Current view and selected property
  const [currentView, setCurrentViewInternal] = useState<ActiveView>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // User auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUser = localStorage.getItem('pd_current_user_v2');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER; // Default logged-in as demo buyer for instant rich dashboard testing
  });

  // Favourites
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pd_favourites_v2');
      const parsed = saved ? JSON.parse(saved) : ['PD-1001', 'PD-1002'];
      return Array.isArray(parsed) ? parsed.filter(id => id !== 'PD-1003') : ['PD-1001', 'PD-1002'];
    } catch {
      return ['PD-1001', 'PD-1002'];
    }
  });

  // Property comparison (up to 4 items)
  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>(['PD-1001', 'PD-1002']);

  // Enquiries & Leads
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('pd_enquiries_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'enq-101',
          propertyId: 'PD-1001',
          propertyTitle: 'Luxury 3 BHK High-Rise Apartment in Sector 150',
          propertyCity: 'Noida',
          name: 'Rahul Sharma',
          phone: '+91 98712 34567',
          email: 'rahul.sharma@example.com',
          message: 'Interested in a site visit this Saturday. Please share the floor plan booklet.',
          status: 'contacted',
          createdAt: '2026-09-06T11:00:00Z'
        },
        {
          id: 'enq-102',
          propertyId: 'PD-1002',
          propertyTitle: 'Premium 2 BHK Modern Apartment in Dwarka',
          propertyCity: 'Delhi',
          name: 'Manish Chawla',
          phone: '+91 98100 87654',
          email: 'manish.c@deloitte.com',
          message: 'Looking for NRI documentation and bank loan tie-up assistance.',
          status: 'new',
          createdAt: '2026-09-08T15:30:00Z'
        }
      ];
    } catch {
      return [];
    }
  });

  // Site visits
  const [visits, setVisits] = useState<VisitRequest[]>(() => {
    try {
      const saved = localStorage.getItem('pd_visits_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'vst-201',
          propertyId: 'PD-1001',
          propertyTitle: 'Luxury 3 BHK High-Rise Apartment in Sector 150',
          propertyLocation: 'Sector 150, Noida',
          propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
          date: '2026-09-12',
          timeSlot: '11:00 AM - 01:00 PM',
          userName: 'Rahul Sharma',
          userPhone: '+91 98712 34567',
          userEmail: 'rahul.sharma@example.com',
          notes: 'Will be accompanied by architect for layout inspection.',
          status: 'confirmed',
          createdAt: '2026-09-07T09:00:00Z'
        }
      ];
    } catch {
      return [];
    }
  });

  // Alerts
  const [alerts, setAlerts] = useState<PropertyAlert[]>(() => {
    try {
      const saved = localStorage.getItem('pd_alerts_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'alt-301',
          city: 'Noida',
          locality: 'Sector 150',
          maxBudget: 15000000,
          bhk: '3 BHK',
          propertyType: 'Apartment',
          email: 'rahul.sharma@example.com',
          phone: '+91 98712 34567',
          notifyVia: ['email', 'whatsapp'],
          createdAt: '2026-09-05T10:00:00Z',
          active: true
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpenState] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpenState] = useState(false);
  const [shareModalOpen, setShareModalOpenState] = useState(false);
  const [activeModalProperty, setActiveModalProperty] = useState<Property | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Central Business Configuration State (Synced with localStorage and fallback to default BUSINESS_CONFIG)
  const [businessConfig, setBusinessConfig] = useState<typeof BUSINESS_CONFIG>(() => {
    try {
      const saved = localStorage.getItem('propertydekhey_business_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...BUSINESS_CONFIG,
          ...parsed,
          email: BUSINESS_CONFIG.email,
          businessEmail: BUSINESS_CONFIG.businessEmail,
          primaryPhoneDisplay: parsed.primaryPhoneDisplay || (parsed.primaryPhone ? parsed.primaryPhone.replace(/(\d{5})(\d{5})/, '$1 $2') : BUSINESS_CONFIG.primaryPhoneDisplay),
          secondaryPhoneDisplay: parsed.secondaryPhoneDisplay || (parsed.secondaryPhone ? parsed.secondaryPhone.replace(/(\d{5})(\d{5})/, '$1 $2') : BUSINESS_CONFIG.secondaryPhoneDisplay),
        };
      }
    } catch {
      // fallback to BUSINESS_CONFIG
    }
    return BUSINESS_CONFIG;
  });

  const updateBusinessConfig = (newConfig: Partial<typeof BUSINESS_CONFIG>) => {
    setBusinessConfig((prev) => {
      const primaryRaw = newConfig.primaryPhone || prev.primaryPhone;
      const secondaryRaw = newConfig.secondaryPhone || prev.secondaryPhone;
      const updated = {
        ...prev,
        ...newConfig,
        primaryPhone: primaryRaw,
        primaryPhoneDisplay: newConfig.primaryPhoneDisplay || primaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
        secondaryPhone: secondaryRaw,
        secondaryPhoneDisplay: newConfig.secondaryPhoneDisplay || secondaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
        navbarPhone: primaryRaw,
        navbarPhoneDisplay: newConfig.primaryPhoneDisplay || primaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
        navbarPhoneAlternate: secondaryRaw,
        navbarPhoneAlternateDisplay: newConfig.secondaryPhoneDisplay || secondaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
        phone: primaryRaw,
        phoneDisplay: newConfig.primaryPhoneDisplay || primaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
        whatsappNumber: `91${primaryRaw.replace(/\D/g, '')}`,
        whatsappDisplay: newConfig.primaryPhoneDisplay || primaryRaw.replace(/(\d{5})(\d{5})/, '$1 $2'),
      };
      try {
        localStorage.setItem('propertydekhey_business_config', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save business config', e);
      }
      return updated;
    });
  };

  const resetBusinessConfig = () => {
    setBusinessConfig(BUSINESS_CONFIG);
    try {
      localStorage.removeItem('propertydekhey_business_config');
    } catch (e) {
      console.error(e);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pd_properties_v6', JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('pd_favourites_v2', JSON.stringify(favourites));
    } catch (e) {
      console.error(e);
    }
  }, [favourites]);

  useEffect(() => {
    try {
      localStorage.setItem('pd_enquiries_v2', JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('pd_visits_v2', JSON.stringify(visits));
    } catch (e) {
      console.error(e);
    }
  }, [visits]);

  useEffect(() => {
    try {
      localStorage.setItem('pd_alerts_v2', JSON.stringify(alerts));
    } catch (e) {
      console.error(e);
    }
  }, [alerts]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('pd_current_user_v2', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('pd_current_user_v2');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Toast helper
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // View navigation helper
  const setCurrentView = (view: ActiveView, propertyId?: string) => {
    setCurrentViewInternal(view);
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Property actions
  const getPropertyById = (id: string) => properties.find((p) => p.id === id);

  const addProperty = (data: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'enquiriesCount'>): Property => {
    const newId = 'PD-' + Math.floor(1000 + Math.random() * 9000);
    const newProperty: Property = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      enquiriesCount: 0,
      status: 'active',
      isFeatured: false,
    };
    setProperties((prev) => [newProperty, ...prev]);
    addToast('success', 'Property Listed Successfully!', `Listing "${newProperty.title}" is now live on PropertyDekhey.`);
    return newProperty;
  };

  const updatePropertyStatus = (id: string, status: Property['status']) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    addToast('info', 'Status Updated', `Property ${id} status set to "${status}".`);
  };

  const toggleVerifyProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const hasVerified = p.verificationBadges.includes('verified');
          const newBadges = hasVerified
            ? p.verificationBadges.filter((b) => b !== 'verified')
            : [...p.verificationBadges, 'verified' as const];
          return { ...p, verificationBadges: newBadges };
        }
        return p;
      })
    );
    addToast('success', 'Verification Updated', `Property ${id} verification badge toggled.`);
  };

  const toggleFeaturedProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    addToast('info', 'Featured Status Updated', `Property ${id} featured status toggled.`);
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    addToast('warning', 'Property Deleted', `Property ${id} was permanently removed.`);
  };

  // Favourites actions
  const toggleFavourite = (propertyId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      addToast('info', 'Login Required', 'Please sign in to save your favorite properties.');
      return;
    }
    setFavourites((prev) => {
      const exists = prev.includes(propertyId);
      if (exists) {
        addToast('info', 'Removed from Favourites', 'Property removed from your saved list.');
        return prev.filter((id) => id !== propertyId);
      } else {
        addToast('success', 'Saved to Favourites', 'Property added to your saved collection.');
        return [...prev, propertyId];
      }
    });
  };

  const isFavourite = (propertyId: string) => favourites.includes(propertyId);

  // Comparison actions
  const toggleCompare = (propertyId: string) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(propertyId)) {
        addToast('info', 'Removed from Comparison', 'Property removed from compare tray.');
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 4) {
        addToast('warning', 'Limit Reached', 'You can compare up to 4 properties at a time.');
        return prev;
      }
      addToast('success', 'Added to Comparison', `Property added. Compare tray: ${prev.length + 1}/4`);
      return [...prev, propertyId];
    });
  };

  const clearComparison = () => {
    setComparedPropertyIds([]);
    addToast('info', 'Comparison Cleared', 'All properties removed from compare tray.');
  };

  const isCompared = (propertyId: string) => comparedPropertyIds.includes(propertyId);

  // Enquiry submission
  const submitEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = 'enq-' + Math.floor(100 + Math.random() * 900);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    if (enquiryData.propertyId) {
      setProperties((prev) =>
        prev.map((p) => (p.id === enquiryData.propertyId ? { ...p, enquiriesCount: p.enquiriesCount + 1 } : p))
      );
    }
    addToast('success', 'Enquiry Submitted!', 'Our verified property executive will contact you shortly via Call/WhatsApp.');
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  // Schedule visit
  const scheduleVisit = (visitData: Omit<VisitRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = 'vst-' + Math.floor(200 + Math.random() * 800);
    const newVisit: VisitRequest = {
      ...visitData,
      id,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setVisits((prev) => [newVisit, ...prev]);
    addToast('success', 'Site Visit Scheduled!', `Your visit for ${visitData.date} at ${visitData.timeSlot} is confirmed. Agent details shared on SMS/WhatsApp.`);
  };

  const updateVisitStatus = (id: string, status: VisitRequest['status']) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  // Alerts
  const createAlert = (alertData: Omit<PropertyAlert, 'id' | 'createdAt' | 'active'>) => {
    const id = 'alt-' + Math.floor(300 + Math.random() * 700);
    const newAlert: PropertyAlert = {
      ...alertData,
      id,
      active: true,
      createdAt: new Date().toISOString()
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addToast('success', 'Property Alert Activated', `You will receive instant alerts for ${alertData.bhk || ''} in ${alertData.city}.`);
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Alert Deleted', 'Property alert has been removed.');
  };

  // User auth
  const loginUser = (role: 'user' | 'agent' | 'admin' = 'user', name = 'Rahul Sharma', phoneOrEmail = '+91 98712 34567') => {
    const user: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name: role === 'admin' ? 'PropertyDekhey Admin Desk' : role === 'agent' ? 'Vikramjit Singh (Apex Realty)' : name,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phoneOrEmail.includes('@') ? '+91 98110 54321' : phoneOrEmail,
      role,
      savedPropertyIds: favourites,
      recentSearches: ['Noida Sector 150', 'Sector 80 Faridabad']
    };
    setCurrentUser(user);
    setAuthModalOpen(false);
    addToast('success', `Welcome, ${user.name}!`, `Logged in as ${role.toUpperCase()}.`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    addToast('info', 'Logged Out', 'You have been signed out of PropertyDekhey.');
  };

  // Modals wrappers
  const setScheduleModalOpen = (open: boolean, property?: Property | null) => {
    setActiveModalProperty(property || null);
    setScheduleModalOpenState(open);
  };

  const setEnquiryModalOpen = (open: boolean, property?: Property | null) => {
    setActiveModalProperty(property || null);
    setEnquiryModalOpenState(open);
  };

  const setShareModalOpen = (open: boolean, property?: Property | null) => {
    setActiveModalProperty(property || null);
    setShareModalOpenState(open);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const setQuickSearch = (query: string, listingType: ListingType = 'buy', city?: string, bhk?: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      listingType,
      city: city || prev.city,
      bhk: bhk ? [bhk] : prev.bhk
    }));
    setCurrentView('properties');
  };

  // Filtering logic
  const filteredProperties = properties.filter((prop) => {
    // Only show active properties for public search
    if (prop.status !== 'active') return false;

    // Listing type: buy or rent
    if (filters.listingType && prop.listingType !== filters.listingType) return false;

    // Query match across title, description, city, locality, address, rera
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const match = 
        prop.title.toLowerCase().includes(q) ||
        prop.locality.toLowerCase().includes(q) ||
        prop.city.toLowerCase().includes(q) ||
        prop.address.toLowerCase().includes(q) ||
        prop.propertyType.toLowerCase().includes(q) ||
        (prop.reraNumber && prop.reraNumber.toLowerCase().includes(q));
      if (!match) return false;
    }

    // City match
    if (filters.city && filters.city !== 'All Cities') {
      const selectedCity = filters.city.toLowerCase().trim();
      const propCity = prop.city.toLowerCase();
      const propLocality = prop.locality.toLowerCase();
      const propAddress = prop.address ? prop.address.toLowerCase() : '';

      if (selectedCity === 'delhi ncr') {
        const isNCR = propCity.includes('delhi') || propCity.includes('noida') || propCity.includes('gurugram') || propCity.includes('faridabad') || propCity.includes('greater noida') || propLocality.includes('ncr');
        if (!isNCR) return false;
      } else if (selectedCity === 'uttar pradesh') {
        const isUP = propCity.includes('noida') || propCity.includes('greater noida') || propCity.includes('vrindavan') || propCity.includes('lucknow') || propCity.includes('ghaziabad') || propCity.includes('agra') || propAddress.includes('uttar pradesh') || propAddress.includes('up');
        if (!isUP) return false;
      } else if (selectedCity === 'haryana') {
        const isHR = propCity.includes('faridabad') || propCity.includes('gurugram') || propCity.includes('panipat') || propCity.includes('sonipat') || propCity.includes('karnal') || propAddress.includes('haryana');
        if (!isHR) return false;
      } else if (selectedCity === 'dehradun') {
        const isDdn = propCity.includes('dehradun') || propLocality.includes('dehradun') || propLocality.includes('rajpur') || propLocality.includes('sahastradhara') || propAddress.includes('dehradun');
        if (!isDdn) return false;
      } else if (!propCity.includes(selectedCity) && !propLocality.includes(selectedCity) && !propAddress.includes(selectedCity)) {
        return false;
      }
    }

    // Locality match
    if (filters.locality && !prop.locality.toLowerCase().includes(filters.locality.toLowerCase())) return false;

    // Property type match
    if (filters.propertyType && filters.propertyType !== 'all') {
      const pType = filters.propertyType.toLowerCase();
      if (pType === 'commercial') {
        const isCommercial = 
          prop.propertyType.toLowerCase().includes('commercial') || 
          prop.propertyType.toLowerCase().includes('office') || 
          prop.propertyType.toLowerCase().includes('warehouse') ||
          prop.propertyType.toLowerCase().includes('showroom') ||
          (prop.propertyType.toLowerCase().includes('plot') && (prop.title.toLowerCase().includes('industrial') || prop.bhk?.toLowerCase().includes('industrial')));
        if (!isCommercial) return false;
      } else if (!prop.propertyType.toLowerCase().includes(pType)) {
        return false;
      }
    }

    // BHK match
    if (filters.bhk.length > 0) {
      const propBhk = `${prop.bedrooms} BHK`;
      const matchesBhk = filters.bhk.some((b) => {
        if (b === '4+ BHK') return prop.bedrooms >= 4;
        if (b === 'Commercial') return prop.propertyType.toLowerCase().includes('office') || prop.propertyType.toLowerCase().includes('commercial') || prop.propertyType.toLowerCase().includes('showroom');
        if (prop.configurations && prop.configurations.includes(b)) return true;
        if (prop.bhk && prop.bhk.includes(b.replace(' BHK', ''))) return true;
        return b === propBhk;
      });
      if (!matchesBhk) return false;
    }

    // Price range
    if (filters.minPrice > 0) {
      const upperPrice = prop.maxPrice || prop.price;
      if (upperPrice < filters.minPrice) return false;
    }
    if (filters.maxPrice < 100000000) {
      if (prop.price > filters.maxPrice) return false;
    }

    // Furnishing
    if (filters.furnishing && prop.furnishing !== filters.furnishing) return false;

    // Possession
    if (filters.possession && prop.possession !== filters.possession) return false;

    // Verified only
    if (filters.verifiedOnly && (!prop.verificationBadges || prop.verificationBadges.length === 0)) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (filters.sortBy === 'area_desc') return b.areaSqFt - a.areaSqFt;
    // Default relevance: featured first, then views
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return b.viewsCount - a.viewsCount;
  });

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updatePropertyStatus,
        toggleVerifyProperty,
        toggleFeaturedProperty,
        deleteProperty,
        getPropertyById,

        currentView,
        setCurrentView,
        selectedPropertyId,
        selectedArticleSlug,
        setSelectedArticleSlug,

        filters,
        setFilters,
        resetFilters,
        setQuickSearch,
        filteredProperties,

        currentUser,
        loginUser,
        logoutUser,

        favourites,
        toggleFavourite,
        isFavourite,

        comparedPropertyIds,
        toggleCompare,
        clearComparison,
        isCompared,

        enquiries,
        submitEnquiry,
        updateEnquiryStatus,

        visits,
        scheduleVisit,
        updateVisitStatus,

        alerts,
        createAlert,
        deleteAlert,

        authModalOpen,
        setAuthModalOpen,
        scheduleModalOpen,
        setScheduleModalOpen,
        enquiryModalOpen,
        setEnquiryModalOpen,
        activeModalProperty,
        shareModalOpen,
        setShareModalOpen,

        toasts,
        addToast,
        removeToast,

        businessConfig,
        updateBusinessConfig,
        resetBusinessConfig,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
