import { BlogPost } from '../types/property';

export const INITIAL_ARTICLES: BlogPost[] = [
  {
    id: 'art-1',
    slug: 'how-to-buy-property-in-india-complete-guide',
    title: 'How to Buy Property in India: The Complete 2026 Homebuyer Guide',
    category: 'Buying Guide',
    readTime: '6 min read',
    date: 'August 28, 2026',
    author: 'Rajiv Malhotra (Legal & Property Advisor)',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    summary: 'A step-by-step checklist on evaluating carpet area vs super area, checking title deeds, validating RERA approvals, and navigating stamp duty registration.',
    content: [
      'Buying your dream home in India is one of the most rewarding milestones, but navigating the legal landscape requires diligent inspection. Here are the core pillars every homebuyer must evaluate before signing an Agreement for Sale.',
      '1. Verify RERA Registration: Always check that the project is registered with the state authority (e.g. UP-RERA, MahaRERA, HRERA). Cross-check the quarterly construction updates and bank escrow account details on the public portal.',
      '2. Understand RERA Carpet Area: Avoid paying for disproportionate super built-up areas. RERA mandates pricing based strictly on net usable carpet area inside outer walls.',
      '3. Encumbrance Certificate (EC) & Title Search: Obtain an EC for the last 30 years from the Sub-Registrar office to confirm the land has no ongoing litigation or outstanding mortgage loans.',
      '4. Occupancy Certificate (OC) & Completion Certificate (CC): For ready-to-move homes, never take possession without an official OC issued by local civic development authorities.'
    ],
    tags: ['RERA', 'Home Buying', 'Legal Checklist', 'Title Deed']
  },
  {
    id: 'art-2',
    slug: 'best-areas-to-invest-in-noida-and-greater-noida',
    title: 'Best Corridors to Invest in Noida & Greater Noida for High Capital Appreciation',
    category: 'Investment',
    readTime: '5 min read',
    date: 'September 02, 2026',
    author: 'Sunil Mathur (Real Estate Market Analyst)',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    summary: 'An analytical review of Sector 150, Noida-Greater Noida Expressway, and the upcoming Noida International Airport (Jewar) corridor.',
    content: [
      'With significant infrastructure spending over the past five years, Noida and Greater Noida have transformed into North India’s hottest real estate corridors.',
      '1. Sector 150: The Low-Density Sports City: Boasting 70% green cover, zero overhead cables, and rapid access to both Noida and Greater Noida via the Faridabad-Noida-Ghaziabad (FNG) expressway.',
      '2. Yamuna Expressway & Jewar International Airport: As the first flights prepare for commercial launch, residential plots and commercial plazas along Yamuna Expressway are seeing steady double-digit annualized appreciation.',
      '3. Greater Noida West (Noida Extension): The preferred choice for millennial families looking for 2 and 3 BHK apartments with high livability scores and upcoming metro line expansion.'
    ],
    tags: ['Noida', 'Investment', 'Jewar Airport', 'Sector 150']
  },
  {
    id: 'art-3',
    slug: 'rera-explained-for-home-buyers',
    title: 'RERA Explained: How the Real Estate Act Protects Indian Homebuyers',
    category: 'RERA & Legal',
    readTime: '4 min read',
    date: 'August 15, 2026',
    author: 'Advocate Sneha Bansal',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    summary: 'Learn how RERA guarantees 5-year defect liability, prevents developer diversion of buyer funds through 70% escrow rules, and enforces compensation for possession delays.',
    content: [
      'The Real Estate (Regulation and Development) Act, 2016 (RERA) fundamentally balanced the Indian property transaction landscape in favor of the consumer.',
      'Key Buyer Protections under RERA include:',
      '• Mandatory Escrow of 70%: Builders must deposit 70% of collections from buyers into a dedicated scheduled bank escrow account, preventing project fund diversion.',
      '• 5-Year Structural Defect Guarantee: Developers are legally required to rectify structural defects or quality issues free of charge within 30 days of notice for five full years after possession.',
      '• Compensation for Delayed Handover: If a builder delays possession beyond the declared date, buyers have the right to either claim a complete refund with interest or receive monthly penal interest until delivery.'
    ],
    tags: ['RERA Act', 'Buyer Rights', 'Consumer Protection', 'Escrow']
  },
  {
    id: 'art-4',
    slug: 'home-loan-emi-everything-you-need-to-know',
    title: 'Home Loan EMI: Tax Benefits Under Section 80C & 24(b) Decoded',
    category: 'Home Loans',
    readTime: '5 min read',
    date: 'August 10, 2026',
    author: 'CA Aniket Singhal',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    summary: 'A clear breakdown of how you can save up to ₹3.5 Lakhs annually on income tax by maximizing home loan interest and principal deductions.',
    content: [
      'Financing your home through a bank loan offers substantial fiscal benefits under the Indian Income Tax Act.',
      '• Principal Repayment (Section 80C): You can claim a tax deduction of up to ₹1.5 Lakh per financial year on the principal portion of your EMI.',
      '• Interest Component (Section 24b): For self-occupied properties, interest payment is deductible up to a maximum limit of ₹2 Lakh per annum.',
      '• First-time Homebuyer Perks: Additional benefits under section 80EEA for affordable housing loans sanctioned within eligible windows.',
      'Tip: Co-borrowing with your spouse or working family member allows both co-owners to claim individual separate limits of ₹2 Lakh on interest and ₹1.5 Lakh on principal!'
    ],
    tags: ['Home Loans', 'Tax Savings', 'Section 80C', 'EMI']
  }
];
