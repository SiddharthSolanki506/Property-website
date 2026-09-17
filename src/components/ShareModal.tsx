import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Twitter, Facebook, Mail, Share2 } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency } from '../config/business';

export const ShareModal: React.FC = () => {
  const { shareModalOpen, setShareModalOpen, activeModalProperty, addToast } = useProperty();
  const [copied, setCopied] = useState(false);

  if (!shareModalOpen || !activeModalProperty) return null;

  const currentUrl = window.location.href;
  const shareText = `Check out this verified property on PropertyDekhey: ${activeModalProperty.title} (${formatIndianCurrency(activeModalProperty.price)}) located in ${activeModalProperty.locality}, ${activeModalProperty.city}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    addToast('success', 'Link Copied', 'Property link copied to your clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const url = `mailto:?subject=${encodeURIComponent(activeModalProperty.title)}&body=${encodeURIComponent(shareText + '\n\n' + currentUrl)}`;
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative p-6">
        
        {/* Close Button */}
        <button
          onClick={() => setShareModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-amber-600 mb-1">
          <Share2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Share Listing</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
          {activeModalProperty.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 mb-5">
          Share this property with family, co-buyers or financial advisors.
        </p>

        {/* Share buttons row */}
        <div className="grid grid-cols-4 gap-3 mb-6 text-center">
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-sm">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </button>

          <button
            onClick={handleTwitter}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center mb-1.5 shadow-sm">
              <Twitter className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[11px] font-semibold">X (Twitter)</span>
          </button>

          <button
            onClick={handleFacebook}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-sm">
              <Facebook className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[11px] font-semibold">Facebook</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center mb-1.5 shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold">Email</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Or copy direct link:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0a192f] hover:bg-[#132744] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
