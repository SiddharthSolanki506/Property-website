/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { PropertyProvider, useProperty } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PropertyComparisonBar } from './components/PropertyComparisonBar';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { EnquiryModal } from './components/EnquiryModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { ShareModal } from './components/ShareModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PropertyListingPage } from './pages/PropertyListingPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { SellPropertyPage } from './pages/SellPropertyPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AgentsPage } from './pages/AgentsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { BlogPage } from './pages/BlogPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentView } = useProperty();

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-[#0a192f]">
      {/* Top Main Navigation */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {(currentView === 'properties' || currentView === 'buy' || currentView === 'rent' || currentView === 'commercial') && <PropertyListingPage />}
        {currentView === 'property-detail' && <PropertyDetailPage />}
        {currentView === 'sell' && <SellPropertyPage />}
        {currentView === 'projects' && <ProjectsPage />}
        {currentView === 'agents' && <AgentsPage />}
        {(currentView === 'comparison' || (currentView as string) === 'compare') && <ComparisonPage />}
        {currentView === 'calculators' && <CalculatorsPage />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'dashboard' && <UserDashboardPage />}
        {currentView === 'admin' && <AdminDashboardPage />}
        {currentView === 'about' && <AboutContactPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating & Persistent Global Utilities */}
      <PropertyComparisonBar />
      <FloatingWhatsApp />
      <MobileQuickBar />

      {/* Modals & Notifications */}
      <AuthModal />
      <EnquiryModal />
      <ScheduleVisitModal />
      <ShareModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PropertyProvider>
      <AppContent />
    </PropertyProvider>
  );
}
