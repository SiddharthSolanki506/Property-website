export type ListingType = 'buy' | 'rent';

export type UserRole = 'buyer' | 'owner' | 'agent' | 'admin' | 'user';

export type PropertyCategory = 
  | 'Apartment'
  | 'Villa'
  | 'Independent House'
  | 'Builder Floor'
  | 'Plot'
  | 'Penthouse'
  | 'Farm House'
  | 'Office Space'
  | 'Commercial Shop'
  | 'Showroom'
  | 'Warehouse'
  | 'Co-working'
  | string;

export type PropertyType = PropertyCategory;

export type BHKType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5+ BHK' | 'Studio' | 'Commercial' | string;

export type FurnishingType = 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished' | 'furnished' | 'semi-furnished' | 'unfurnished';

export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'Immediate' | 'Within 6 Months' | string;

export type VerificationBadge = 'verified' | 'owner_verified' | 'agent_verified' | 'rera_verified' | 'verified_property';

export interface NearbyPlace {
  name: string;
  type: 'metro' | 'school' | 'hospital' | 'mall' | 'airport' | 'highway';
  distance: string;
}

export interface PropertyFloorPlan {
  name: string;
  bhk: string;
  areaSqFt: number;
  imageUrl: string;
  description?: string;
}

export interface Property {
  id: string;
  title: string;
  slug?: string;
  description: string;
  propertyType: PropertyCategory;
  listingType: ListingType;
  price: number; // in Rupees
  pricePerSqFt: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  areaSqFt: number;
  superAreaSqFt?: number;
  city: string;
  locality: string;
  address: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  furnishing: FurnishingType;
  parking?: number;
  floor: number;
  totalFloors: number;
  facing?: string;
  propertyAge?: string;
  ageOfProperty?: string;
  maintenanceCharges?: number;
  possession: PossessionStatus;
  possessionDate?: string;
  reraNumber?: string;
  verificationBadges: VerificationBadge[];
  isFeatured: boolean;
  isVerified?: boolean;
  isOwnerListing?: boolean;
  ownerName?: string;
  ownerPhone?: string;
  ownershipType?: string;
  agentId?: string;
  images: string[];
  features?: string[];
  amenities: string[];
  floorPlans?: PropertyFloorPlan[];
  nearbyPlaces?: NearbyPlace[];
  localityHighlights?: string[];
  status?: 'active' | 'pending' | 'rejected' | 'sold';
  createdAt?: string;
  created_at?: string;
  datePosted?: string;
  viewsCount: number;
  enquiriesCount?: number;
  inquiriesCount?: number;

  // Rich property listing fields
  project_name?: string;
  price_display?: string;
  bhk?: string;
  configurations?: string[];
  maxPrice?: number;
  developer?: string;
  listed_by?: string;
  rera_status?: string;
  status_badge?: string;
  featured?: boolean;
  verified?: boolean;
  totalLandArea?: string;
  towerHeight?: string;
  totalFlats?: string;
  price_breakdown?: Array<{ item: string; value: string; detail?: string }>;
  payment_plan?: Array<{ stage: string; amount: string; timeline?: string }>;
  additional_charges_conditions?: string[];
  floor_plan_dimensions?: Array<{ room: string; dimensions: string }>;
  unit_options?: Array<{
    bhk: string;
    areaSqFt: number;
    basePrice: number;
    discount: number;
    finalPrice: number;
    bookingAmount: number;
    powerBackup: string;
  }>;
  marketing_disclaimer?: string;
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  location: string;
  city: string;
  experienceYears: number;
  propertiesCount: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  avatarUrl: string;
  phone: string;
  email: string;
  specialization: string[];
  about: string;
  languages: string[];
  operatingAreas?: string[];
  reraRegistration?: string;
  activeListingsCount?: number;
}

export interface Project {
  id: string;
  name: string;
  builderName: string;
  builderLogo?: string;
  city: string;
  locality: string;
  startingPrice: number;
  maxPrice: number;
  configurations: string[];
  possessionDate: string;
  possessionYear?: string;
  reraNumber: string;
  reraId?: string;
  reraStatus: 'Registered' | 'Applied' | 'Approved';
  status?: string;
  images: string[];
  coverImage?: string;
  projectType: 'Residential' | 'Commercial' | 'Integrated Township';
  totalUnits: number;
  projectSizeAcres: string;
  amenities: string[];
  overview: string;
  highlights?: string[];
  brochureAvailable: boolean;
}

export interface Enquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyCity?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  requirementType?: 'buy' | 'rent' | 'general';
  budgetRange?: string;
  status: 'new' | 'contacted' | 'site_visit' | 'visit_scheduled' | 'closed';
  createdAt: string;
}

export interface VisitRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation?: string;
  propertyImage?: string;
  date: string;
  timeSlot: string;
  userName?: string;
  visitorName?: string;
  userPhone?: string;
  visitorPhone?: string;
  userEmail?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface PropertyAlert {
  id: string;
  title?: string;
  city?: string;
  location?: string;
  locality?: string;
  maxBudget: number;
  minBudget?: number;
  bhk: string;
  propertyType: string;
  email?: string;
  phone?: string;
  contactInfo?: string;
  notifyWhatsApp?: boolean;
  notifyEmail?: boolean;
  notifyVia?: ('email' | 'whatsapp' | 'sms')[];
  createdAt?: string;
  active?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'agent' | 'admin' | 'buyer' | 'owner';
  avatar?: string;
  savedPropertyIds: string[];
  recentSearches: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  coverImage?: string;
  summary: string;
  excerpt?: string;
  content: string[];
  tags: string[];
}

export type Article = BlogPost;

export interface FilterState {
  searchQuery: string;
  listingType: ListingType;
  city: string;
  locality: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bhk: string[];
  furnishing: string;
  possession: string;
  verifiedOnly: boolean;
  sortBy: 'relevance' | 'newest' | 'price_asc' | 'price_desc' | 'area_desc' | 'featured' | 'views';
}
