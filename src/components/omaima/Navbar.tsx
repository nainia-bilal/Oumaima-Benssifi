import React, { useState, useEffect } from 'react';
import { Menu, X, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { OmaimaProfile } from '../../types/omaima';

interface NavbarProps {
  profile: OmaimaProfile;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCustomize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  onOpenCustomize,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'education', label: 'Education' },
    { id: 'videos', label: 'Videos' },
    { id: 'designs', label: 'Designs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-[#2b2b2b]'
          : 'bg-[#1a1a1a]/85 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo matching Omaima Benssifi exactly */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-heading font-bold text-2xl tracking-wide text-white transition-colors duration-300 hover:text-[#e63946]"
        >
          {profile.firstName}
          <span className="text-[#e63946]">{profile.lastName}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative py-1 text-[15px] font-medium transition-colors duration-300 cursor-pointer ${
                      isActive
                        ? 'text-[#e63946] font-semibold'
                        : 'text-white hover:text-[#e63946]'
                    }`}
                  >
                    {item.label}
                    {/* Active red underline bar matching Omaima's site */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e63946] rounded-full transition-all duration-300" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Customize action */}
          <button
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2b2b2b] hover:bg-[#e63946] text-white transition-all duration-300 border border-white/10 cursor-pointer shadow-sm ml-2"
            title="Edit profile & portfolio information"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e63946] group-hover:text-white" />
            <span>Modify</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenCustomize}
            className="p-2 rounded-lg bg-[#2b2b2b] text-white hover:text-[#e63946] transition-colors"
            title="Edit profile information"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#e63946] transition-transform duration-300 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a1a1a]/98 border-b border-[#2b2b2b] px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left py-2 text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-[#e63946] font-semibold border-l-2 border-[#e63946] pl-3'
                      : 'text-neutral-300 hover:text-[#e63946]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
