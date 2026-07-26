import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { navLinks } from '../data/content';
import { useActiveSection } from '../hooks/useScrollReveal';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((href: string) => {
    setIsOpen(false);
    // 立即高亮目标导航项
    const id = href.replace('#', '');
    setActiveSection(id);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [setActiveSection]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded border border-neon-cyan/50 flex items-center justify-center bg-neon-cyan/10 group-hover:bg-neon-cyan/20 transition-colors">
            <Terminal size={16} className="text-neon-cyan" />
          </div>
          <span className="font-mono font-bold text-lg tracking-wider text-white">
            Dev<span className="neon-text-cyan">imL</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`px-4 py-2 font-mono text-sm tracking-wide transition-all duration-300 relative ${
                  isActive
                    ? 'text-neon-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full shadow-[0_0_6px_#00f0ff]" />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
          className="hidden md:block btn-neon text-xs py-2 px-5"
        >
          联系我
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-neon-cyan transition-colors p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                className={`py-3 px-4 font-mono text-sm tracking-wide transition-colors rounded ${
                  isActive
                    ? 'text-neon-cyan bg-neon-cyan/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-neon-cyan/40 mr-2">&gt;</span>
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
            className="btn-neon text-center text-xs mt-2"
          >
            联系我
          </a>
        </div>
      </div>
    </nav>
  );
}
