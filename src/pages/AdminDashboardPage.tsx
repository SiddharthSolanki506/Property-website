import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Trash2, 
  Calendar, 
  Eye, 
  TrendingUp, 
  Users,
  Search,
  Filter,
  Phone,
  Settings,
  Save,
  RotateCcw,
  MapPin,
  Check,
  Mail
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency } from '../config/business';

export const AdminDashboardPage: React.FC = () => {
  const { 
    properties, 
    toggleVerification, 
    toggleFeatured, 
    deleteProperty, 
    enquiries, 
    updateEnquiryStatus, 
    visitRequests, 
    setCurrentView,
    addToast,
    businessConfig,
    updateBusinessConfig,
    resetBusinessConfig
  } = useProperty();

  const [activeTab, setActiveTab] = useState<'listings' | 'leads' | 'visits' | 'settings'>('listings');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Contact Form State
  const [primaryPhoneInput, setPrimaryPhoneInput] = useState(businessConfig.primaryPhone);
  const [secondaryPhoneInput, setSecondaryPhoneInput] = useState(businessConfig.secondaryPhone);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveContactConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPrimary = primaryPhoneInput.trim();
    const cleanSecondary = secondaryPhoneInput.trim();

    if (!cleanPrimary || cleanPrimary.length < 10) {
      addToast('error', 'Validation Error', 'Please enter a valid 10-digit primary phone number');
      return;
    }

    if (!cleanSecondary || cleanSecondary.length < 10) {
      addToast('error', 'Validation Error', 'Please enter a valid 10-digit secondary phone number');
      return;
    }

    updateBusinessConfig({
      primaryPhone: cleanPrimary,
      secondaryPhone: cleanSecondary,
    });

    setIsSaved(true);
    addToast('success', 'Configuration Saved', 'Official PropertyDekhey contact numbers updated across the entire website!');
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleResetDefaults = () => {
    resetBusinessConfig();
    setPrimaryPhoneInput('9811451867');
    setSecondaryPhoneInput('7210947690');
    addToast('info', 'Reset Complete', 'Restored default contact configuration (Primary: 9811451867, Secondary: 7210947690)');
  };

  // Metrics
  const totalListings = properties.length;
  const verifiedCount = properties.filter((p) => p.isVerified).length;
  const featuredCount = properties.filter((p) => p.isFeatured).length;
  const totalEnquiries = enquiries.length;
  const totalVisits = visitRequests.length;

  const filteredProperties = properties.filter((p) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Admin Top Banner */}
      <div className="bg-[#0a192f] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Operations & Moderation Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              PropertyDekhey Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Verify legal titles, approve owner submissions, monitor leads, and schedule field executives.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView('sell')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-black rounded-xl text-xs transition-colors"
            >
              + Create Listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Total Active Listings</div>
            <div className="text-2xl font-black text-[#0a192f] mt-1">{totalListings}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">100% Live in Registry</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Verified & RERA OK</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">{verifiedCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">{Math.round((verifiedCount / totalListings) * 100)}% compliance rate</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Total Buyer Inquiries</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{totalEnquiries}</div>
            <div className="text-[11px] text-slate-400 mt-1">WhatsApp & Call leads</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Site Visits Booked</div>
            <div className="text-2xl font-black text-indigo-700 mt-1">{totalVisits}</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">Field reps assigned</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {[
              { id: 'listings', label: `Listings Moderation (${totalListings})` },
              { id: 'leads', label: `Leads & Inquiries (${totalEnquiries})` },
              { id: 'visits', label: `Site Visits (${totalVisits})` },
              { id: 'settings', label: 'Business Contact Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0a192f] text-amber-400 shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'listings' && (
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listing or city..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* TAB 1: LISTINGS MODERATION */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-4">Property</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">RERA Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={p.images[0]} alt="" className="w-12 h-10 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1 max-w-xs">{p.title}</h4>
                          <span className="text-[10px] text-slate-400 capitalize">{p.propertyType} • {p.bhk || (p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'Commercial')}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-black text-slate-900">
                      {p.price_display || formatIndianCurrency(p.price)}
                    </td>

                    <td className="p-4 text-slate-600 font-medium">
                      {p.locality}, {p.city}
                    </td>

                    <td className="p-4">
                      {p.status_badge === 'LOI Received' ? (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                          LOI Received
                        </span>
                      ) : p.rera_status === 'RERA Approved' ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          RERA Approved
                        </span>
                      ) : p.reraNumber ? (
                        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {p.reraNumber}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Not Mentioned</span>
                      )}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleVerification(p.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                          p.isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{p.isVerified ? 'Verified' : 'Pending'}</span>
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className={`p-1.5 rounded-lg border ${
                          p.isFeatured
                            ? 'bg-amber-100 border-amber-400 text-amber-800'
                            : 'border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setCurrentView('property-detail', p.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this listing permanently?')) {
                              deleteProperty(p.id);
                              addToast('info', 'Deleted', 'Listing removed from database.');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: LEADS & INQUIRIES */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-4">Prospect</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70">
                    <td className="p-4 font-bold text-slate-900">
                      {enq.name}
                    </td>
                    <td className="p-4 text-slate-700 font-medium">
                      {enq.propertyTitle}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">+91 {enq.phone}</div>
                      {enq.email && <div className="text-slate-400 text-[11px]">{enq.email}</div>}
                    </td>
                    <td className="p-4 text-slate-500">{enq.createdAt}</td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="visit_scheduled">Visit Scheduled</option>
                        <option value="closed">Closed / Converted</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`https://api.whatsapp.com/send?phone=91${enq.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold inline-flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: VISITS */}
        {activeTab === 'visits' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-4">Visitor</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Slot</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {visitRequests.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{v.visitorName}</div>
                      <div className="text-slate-500 text-[11px]">+91 {v.visitorPhone}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-800">{v.propertyTitle}</td>
                    <td className="p-4 capitalize font-semibold text-amber-700">{v.timeSlot}</td>
                    <td className="p-4 font-bold text-slate-900">{v.date}</td>
                    <td className="p-4 text-slate-500 italic max-w-xs">{v.notes || 'None'}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: BUSINESS CONTACT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl">
            <div className="flex items-start justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Central Business Contact Configuration
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  Manage the official PropertyDekhey phone numbers and business identity. Changes made here persist centrally and automatically update all components across the entire website in real time.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                title="Restore default official phone numbers"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {isSaved && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Configuration successfully saved! All website phone numbers, WhatsApp routes, and CTAs have been updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveContactConfig} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Primary Phone */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Primary Phone Number (Official Business Line)
                  </label>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Used on Navbar, WhatsApp integration, Enquiry modals, Mobile Sticky CTA, and main helpline.
                  </p>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={primaryPhoneInput}
                      onChange={(e) => setPrimaryPhoneInput(e.target.value)}
                      placeholder="9811451867"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Display format: <span className="font-bold text-slate-800">{primaryPhoneInput.replace(/(\d{5})(\d{5})/, '$1 $2')}</span> &bull; Clickable: <span className="text-slate-600 font-mono">tel:{primaryPhoneInput.replace(/\D/g, '')}</span>
                  </div>
                </div>

                {/* Secondary Phone */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Secondary Phone Number (Alternative Support Line)
                  </label>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Used on Contact Page, Footer desk, Navbar alternate, and post-enquiry confirmation details.
                  </p>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={secondaryPhoneInput}
                      onChange={(e) => setSecondaryPhoneInput(e.target.value)}
                      placeholder="7210947690"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Display format: <span className="font-bold text-slate-800">{secondaryPhoneInput.replace(/(\d{5})(\d{5})/, '$1 $2')}</span> &bull; Clickable: <span className="text-slate-600 font-mono">tel:{secondaryPhoneInput.replace(/\D/g, '')}</span>
                  </div>
                </div>
              </div>

              {/* Read-Only Official Registered Address & Email Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 uppercase tracking-wider">
                        Official Headquarters Address
                      </div>
                      <div className="text-slate-700 mt-1 font-medium leading-relaxed">
                        Babu Farm, Bypass Road, Wazirpur, Sector 88, Faridabad - 121002, Haryana, India
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Landmark: <span className="font-semibold text-slate-800">Near Dreamland Farms</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900 uppercase tracking-wider">
                        Official Contact Email
                      </div>
                      <div className="mt-1 font-bold text-slate-800">
                        <a
                          href={`mailto:${businessConfig.email}`}
                          className="hover:text-amber-600 underline transition-colors"
                        >
                          {businessConfig.email}
                        </a>
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Primary inbox for online enquiries, user requests, and customer support.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setPrimaryPhoneInput(businessConfig.primaryPhone);
                    setSecondaryPhoneInput(businessConfig.secondaryPhone);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#0a192f] hover:bg-[#132744] text-amber-400 font-bold text-xs shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save &amp; Update Website</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
