/**
 * Central Business Configuration for PropertyDekhey
 * Official business contact details, addresses, and messaging templates.
 * All components MUST import contact details from here.
 */

// Structured address object that also stringifies to the full address string
const addressObject = Object.assign(
  function () { return 'Babu Farm, Bypass Road, Wazirpur, Sector 88, Faridabad - 121002, Haryana, India'; },
  {
    line1: 'Babu Farm, Bypass Road, Wazirpur',
    sector: 'Sector 88',
    city: 'Faridabad',
    pincode: '121002',
    state: 'Haryana',
    country: 'India',
    landmark: 'Near Dreamland Farms',
    fullFormatted: 'Babu Farm, Bypass Road, Wazirpur, Sector 88, Faridabad - 121002, Haryana, India',
    toString() {
      return 'Babu Farm, Bypass Road, Wazirpur, Sector 88, Faridabad - 121002, Haryana, India';
    }
  }
);

export const BUSINESS_CONFIG = {
  // Official Business Identity
  businessName: 'PropertyDekhey',
  name: 'PropertyDekhey',
  category: 'Real Estate',
  legalName: 'PropertyDekhey Realtech Private Limited',
  tagline: 'Apni Property, Apni Choice.',
  subTagline: 'Find. Buy. Sell. Rent.',
  description: 'India\'s premier real-estate discovery marketplace for verified properties, new projects, and rental homes.',
  location: 'Faridabad, Haryana, India',

  // Official Business Phone Numbers
  primaryPhone: '9811451867',
  primaryPhoneDisplay: '98114 51867',
  secondaryPhone: '7210947690',
  secondaryPhoneDisplay: '72109 47690',

  // Header / Navbar Phone Display & Links
  navbarPhone: '9811451867',
  navbarPhoneDisplay: '98114 51867',
  navbarPhoneAlternate: '7210947690',
  navbarPhoneAlternateDisplay: '72109 47690',

  // General phone alias helpers
  phone: '9811451867',
  phoneDisplay: '98114 51867',

  // Official WhatsApp Business Number (Using PRIMARY 9811451867)
  whatsappNumber: '919811451867', // International format for wa.me
  whatsappDisplay: '98114 51867',

  // Official Email Addresses
  email: 'propertdekhey@gmail.com',
  businessEmail: 'propertdekhey@gmail.com',

  // Official Business Headquarters Address
  address: addressObject,
  landmark: 'Near Dreamland Farms',

  // Google Maps Search Query URL (using exact official address)
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Babu+Farm+Bypass+Road+Wazirpur+Sector+88+Faridabad+121002+Near+Dreamland+Farms',

  // Operational Hours
  workingHours: 'Monday – Sunday: 9:00 AM to 8:00 PM IST',

  // WhatsApp Default Message Templates
  whatsappTemplates: {
    general: 'Hi PropertyDekhey, I am interested in a property listed on your website. Please share more details.',
    propertyEnquiry: (title: string, _id?: string, _loc?: string) => 
      `Hi PropertyDekhey, I am interested in ${title}. Please share more details.`,
    scheduleVisit: (title: string, date?: string, time?: string) =>
      `Hi PropertyDekhey, I would like to schedule a site visit for "${title}"${date ? ` on ${date}` : ''}${time ? ` at ${time}` : ''}. Please share more details.`,
    sellProperty: 'Hi PropertyDekhey, I want to list my property for Sale/Rent. Please assist me.',
  },

  // Social Channels
  socials: {
    instagram: 'https://instagram.com/propertydekhey',
    facebook: 'https://facebook.com/propertydekhey',
    linkedin: 'https://linkedin.com/company/propertydekhey',
    youtube: 'https://youtube.com/@propertydekhey',
    twitter: 'https://twitter.com/propertydekhey',
  },

  // Trust Markers
  trustStats: {
    verifiedPropertiesCount: '15,000+',
    happyFamiliesCount: '28,000+',
    partnerBrokersCount: '1,200+',
    majorCitiesCount: '12+',
    customerRating: '4.8/5 (from 9,500+ reviews)',
  },

  // Regulatory Compliance Note
  reraDisclaimer: 'PropertyDekhey is an Indian digital discovery marketplace connecting property seekers with verified owners, developers and registered RERA real-estate agents. Please verify RERA numbers with respective state portals (e.g., HRERA, UP-RERA, MahaRERA) before executing financial transactions.'
};

export function getWhatsAppUrl(message?: string, phoneNumber?: string): string {
  const phone = phoneNumber || BUSINESS_CONFIG.whatsappNumber;
  const text = message ? encodeURIComponent(message) : encodeURIComponent(BUSINESS_CONFIG.whatsappTemplates.general);
  return `https://wa.me/${phone}?text=${text}`;
}

export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

