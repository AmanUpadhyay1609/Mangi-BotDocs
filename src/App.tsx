
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import SessionCrud from './pages/SessionCrud';
import NotFound from './pages/NotFound';

// Create pages for other sections
import JwtAuth from './pages/JwtAuth';
import AdminApproval from './pages/AdminApproval';
import Context from './pages/Context';
import Logging from './pages/Logging';
import Examples from './pages/Examples';
import Contact from './pages/Contact';

// Advanced section pages
import ContextDeepDive from './pages/ContextDeepDive';
import TelegramArchitecture from './pages/TelegramArchitecture';

import BreadcrumbNav from './components/BreadcrumbNav';
import BackToTop from './components/BackToTop';

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDark);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="flex w-full min-h-screen">
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
              
              <div className="flex-1 min-w-0 lg:pl-64 xl:pl-72">
                <Header 
                  onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                  isDark={isDark}
                  onThemeToggle={toggleTheme}
                />
                
                <main className="flex-1 px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 max-w-full overflow-hidden">
                  <div className="max-w-5xl mx-auto">
                    <BreadcrumbNav />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/getting-started" element={<GettingStarted />} />
                      <Route path="/jwt-auth" element={<JwtAuth />} />
                      <Route path="/admin-approval" element={<AdminApproval />} />
                      <Route path="/session-crud" element={<SessionCrud />} />
                      <Route path="/context" element={<Context />} />
                      <Route path="/logging" element={<Logging />} />
                      <Route path="/context-deep-dive" element={<ContextDeepDive />} />
                      <Route path="/telegram-architecture" element={<TelegramArchitecture />} />
                      <Route path="/examples" element={<Examples />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
                <BackToTop />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
