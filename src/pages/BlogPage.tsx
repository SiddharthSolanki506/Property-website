import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Share2, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import { INITIAL_ARTICLES } from '../data/mockArticles';
import { Article } from '../types/property';
import { useProperty } from '../context/PropertyContext';

export const BlogPage: React.FC = () => {
  const { addToast } = useProperty();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'RERA & Legal', 'Home Loans', 'City Guides', 'Vastu & Living'];

  const filteredArticles = INITIAL_ARTICLES.filter((art) => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    if (searchQuery && !art.title.toLowerCase().includes(searchQuery.toLowerCase()) && !art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleShareArticle = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Link Copied', `Article link for "${title}" copied to clipboard.`);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-[#0a192f] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PropertyDekhey Knowledge Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Real Estate Guides, RERA Laws & Market Trends
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Empowering Indian buyers, tenants and property owners with legal clarity, verified checklists, and financial wisdom.
          </p>

          {/* Category Tabs & Search */}
          <div className="mt-8 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-[#0a192f]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles & checklists..."
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Full Article Reader View */}
        {selectedArticle ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm animate-in fade-in duration-150">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all guides</span>
            </button>

            <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              {selectedArticle.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-4 leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center space-x-4 text-xs text-slate-500 pb-6 border-b border-slate-100 mb-6">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedArticle.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedArticle.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
              <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="text-base font-semibold text-slate-900 leading-snug">
                {selectedArticle.excerpt}
              </p>
              <p>
                Purchasing or leasing residential real estate in India requires careful diligence across municipal land-use records, encumbrance certificates (EC), and official RERA disclosures. Before handing over earnest money deposits, prospective buyers must demand the registered RERA project registration certificate and verify the dedicated escrow bank account.
              </p>
              <h3 className="text-lg font-bold text-slate-900 pt-2">Key Mandatory Checks</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Verify sanctioned building layout plans approved by the local authority (e.g., NOIDA, DDA, BBMP, MMRDA).</li>
                <li>Check Title Deed and 30-year Encumbrance Certificate at the local Sub-Registrar office.</li>
                <li>Ensure the builder’s bank account is registered as a dedicated 70% project escrow under state RERA provisions.</li>
                <li>Examine Occupancy Certificate (OC) or Completion Certificate (CC) before taking physical possession.</li>
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Tags: {selectedArticle.category}, Real Estate India, RERA</span>
              </div>
              <button
                onClick={() => handleShareArticle(selectedArticle.title)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </button>
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0a192f]/90 text-amber-400 font-bold text-[11px] px-2.5 py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
