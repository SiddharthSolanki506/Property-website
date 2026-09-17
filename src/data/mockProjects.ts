import { Project } from '../types/property';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-201',
    name: 'Godrej Palm Retreat',
    builderName: 'Godrej Properties',
    city: 'Noida',
    locality: 'Sector 150',
    startingPrice: 11500000,
    maxPrice: 32000000,
    configurations: ['2 BHK', '3 BHK', '4 BHK Luxury Residences'],
    possessionDate: 'December 2026',
    reraNumber: 'UPRERAPRJ745613',
    reraStatus: 'Registered',
    projectType: 'Residential',
    totalUnits: 640,
    projectSizeAcres: '14.5 Acres',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Resort Style Wave Pool', 'Floating Cabanas', 'Organic Forest Walk', 'Club House with Bowling', 'Multi-tier Security'],
    overview: 'Noida’s first resort-style residential enclave by Godrej. Designed with low-rise towers to maximize sunlight, lush green views, and cross-ventilation. Located minutes from Sector 148 metro station.',
    brochureAvailable: true
  },
  {
    id: 'PRJ-202',
    name: 'DLF The Arbour',
    builderName: 'DLF Limited',
    city: 'Gurugram',
    locality: 'Sector 63, Golf Course Extension',
    startingPrice: 75000000,
    maxPrice: 120000000,
    configurations: ['4 BHK Luxury Condominiums'],
    possessionDate: 'Ready by mid 2027',
    reraNumber: 'HRERA-PKL-GGM-1304-2023',
    reraStatus: 'Approved',
    projectType: 'Residential',
    totalUnits: 1137,
    projectSizeAcres: '25.8 Acres',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['85,000 sq.ft. Super Luxury Clubhouse', 'Private Heated Pool', 'High-Speed Double Decker Elevators', 'Concierge & Chauffeur Lounge'],
    overview: 'DLF’s flagship low-density luxury high-rise development on Golf Course Extension Road. Featuring column-free spacious living quarters with 9.5-ft deep balconies.',
    brochureAvailable: true
  },
  {
    id: 'PRJ-203',
    name: 'Prestige Park Grove',
    builderName: 'Prestige Group',
    city: 'Bangalore',
    locality: 'Whitefield',
    startingPrice: 6500000,
    maxPrice: 28000000,
    configurations: ['1 BHK', '2 BHK', '3 BHK', '4 BHK Villas'],
    possessionDate: 'June 2027',
    reraNumber: 'PRM/KA/RERA/1251/446/PR/100823/006141',
    reraStatus: 'Registered',
    projectType: 'Integrated Township',
    totalUnits: 3627,
    projectSizeAcres: '71 Acres',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['Central Lake with Amphitheater', '2 Massive Clubhouses', 'Cricket Pitch & Football Turf', 'Pet Park & Senior Citizen Zones'],
    overview: 'A futuristic township in the heart of Whitefield designed like a petal cloverleaf with four thematic quarters for wellness, entertainment, lifestyle, and work.',
    brochureAvailable: true
  },
  {
    id: 'PRJ-204',
    name: 'Tata Promont Residences',
    builderName: 'Tata Housing',
    city: 'Bangalore',
    locality: 'Banashankari',
    startingPrice: 22000000,
    maxPrice: 48000000,
    configurations: ['3 BHK', '4 BHK Hilltop Residences'],
    possessionDate: 'Ready to Move',
    reraNumber: 'PRM/KA/RERA/1251/310/PR/170915/000257',
    reraStatus: 'Approved',
    projectType: 'Residential',
    totalUnits: 312,
    projectSizeAcres: '14 Acres Hillside',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['3-Level Hilltop Infinity Pool', 'Card Room & Squash Court', 'Golf Putting Green', 'Helipad Access & Fine Dining'],
    overview: 'Bangalore’s only hillside gated community. Built on an elevated cliff offering 360-degree views of the garden city. Crafted with Tata’s hallmark engineering trust.',
    brochureAvailable: true
  }
];
