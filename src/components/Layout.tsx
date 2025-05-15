import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { X, Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/services/api';

interface LayoutProps {
  children: React.ReactNode;
  navItems: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }[];
  role?: 'student' | 'teacher' | 'admin';
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems, role = 'student', userName = 'User' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b">
          <div className="flex items-center">
            <SidebarTrigger />
            <span className="ml-2 font-kollektif text-xl">Easy Exam</span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar className="border-r border-border/40 bg-white/70 backdrop-blur-md hidden md:flex">
            <div className="px-6 py-8">
              <h1 className="text-2xl font-kollektif text-brand-orange animate-fade-in">
                Easy Exam
                <span className="block text-sm text-muted-foreground mt-1">Attendance System</span>
              </h1>
            </div>
            <SidebarContent className="px-4">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const currentPath = location.pathname + location.search;
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange font-medium" 
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </SidebarContent>
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-semibold">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full flex items-center gap-2 border-brand-orange/20 text-brand-orange hover:text-brand-orange hover:bg-brand-orange/5">
                <LogOut size={16} />
                <span onClick={handleLogout}>Logout</span>
              </Button>
            </div>
          </Sidebar>

          {/* Mobile Menu */}
          <div className={cn(
            "fixed inset-0 bg-white z-40 transform transition-transform duration-300 md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-kollektif text-brand-orange">Easy Exam Academy</h1>
                <button 
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const currentPath = location.pathname + location.search;
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg",
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange font-medium" 
                          : "text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4 p-4 border-t">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-semibold">
                    {(userName || 'U').charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{userName || 'User'}</p>
                    <p className="text-xs text-muted-foreground capitalize">{role}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full flex items-center gap-2 border-brand-orange/20 text-brand-orange hover:text-brand-orange hover:bg-brand-orange/5">
                  <LogOut size={16} />
                  <span onClick={handleLogout}>Logout</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-background animate-fade-in">
            <div className="container py-8 px-4 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
