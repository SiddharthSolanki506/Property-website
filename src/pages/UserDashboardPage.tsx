import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Building, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Eye,
  Plus
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { formatIndianCurrency } from '../config/business';
import { PropertyCard } from '../components/PropertyCard';

export const UserDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    favouriteIds, 
    properties, 
    enquiries, 
    visitRequests, 
    propertyAlerts, 
    deletePropertyAlert, 
    setCurrentView,
    toggleFavourite,
    setAuthModalOpen
  } = useProperty();

  const [activeTab, setActiveTab] = useState<'saved' | 'visits' | 'enquiries' | 'alerts' | 'my_properties'>('saved');

  const savedProperties = properties.filter((p) => favouriteIds.includes(p.id));
  const userEnquiries = enquiries.filter((e) => e.phone === currentUser?.phone || currentUser?.role === 'buyer');
  const userVisits = visitRequests;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Header Profile Bar */}
      <div className="bg-[#0a192f] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-black text-2xl shadow-inner">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black">{currentUser?.name || 'Guest User'}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-[#0a192f]">
                  {currentUser?.role || 'Buyer'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser?.phone ? `+91 ${currentUser.phone}` : 'Account ID: PD-99214'} • {currentUser?.email || 'verified.user@propertydekhey.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('sell')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0a192f] font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Property</span>
            </button>
            <button
              onClick={() => setCurrentView('properties')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Browse Homes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 mb-8 border-b border-slate-200">
          {[
            { id: 'saved', label: 'Saved Properties', count: savedProperties.length, icon: Heart },
            { id: 'visits', label: 'Scheduled Visits', count: userVisits.length, icon: Calendar },
            { id: 'enquiries', label: 'My Enquiries', count: userEnquiries.length, icon: MessageSquare },
            { id: 'alerts', label: 'Property Alerts', count: propertyAlerts.length, icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center space-x-2 transition-all ${
                  isActive
                    ? 'bg-[#0a192f] text-amber-400 shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-amber-500 text-[#0a192f]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SAVED HOMES */}
        {activeTab === 'saved' && (
          <div>
            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Saved Properties Yet</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Click the heart icon on any property to save it to your dashboard for quick review and comparison.
                </p>
                <button
                  onClick={() => setCurrentView('properties')}
                  className="px-5 py-2.5 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs"
                >
                  Explore Properties
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEDULED VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {userVisits.length > 0 ? (
              userVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {visit.status}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{visit.propertyTitle}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Date: <strong className="text-slate-800">{visit.date}</strong> • Slot: <strong className="text-slate-800 capitalize">{visit.timeSlot}</strong>
                      </p>
                      {visit.notes && <p className="text-xs text-slate-400 italic mt-1">"{visit.notes}"</p>}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('property-detail', visit.propertyId)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Property</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Visits Scheduled</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Book a free physical or assisted walkthrough directly from any property listing page.
                </p>
                <button
                  onClick={() => setCurrentView('properties')}
                  className="px-5 py-2.5 bg-[#0a192f] text-amber-400 font-bold rounded-xl text-xs"
                >
                  Find Properties
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {userEnquiries.length > 0 ? (
              userEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        {enq.status}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{enq.propertyTitle}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Logged on: {enq.createdAt} • Contact: {enq.phone}
                      </p>
                      {enq.message && <p className="text-xs text-slate-600 mt-1">"{enq.message}"</p>}
                    </div>
                  </div>

                  {enq.propertyId && (
                    <button
                      onClick={() => setCurrentView('property-detail', enq.propertyId)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Listing</span>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Enquiries Sent</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Your requests for callbacks and WhatsApp inquiries will be cataloged here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROPERTY ALERTS */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {propertyAlerts.length > 0 ? (
              propertyAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {alert.location} • Max Budget: {formatIndianCurrency(alert.maxBudget)} • WhatsApp: {alert.notifyWhatsApp ? 'Active' : 'Off'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deletePropertyAlert(alert.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
                <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Active Property Alerts</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Set alerts on search results to get notified via WhatsApp as soon as fresh properties hit the market.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
