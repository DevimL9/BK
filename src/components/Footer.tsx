import { Terminal, Heart, ArrowUp } from 'lucide-react';
import { navLinks } from '../data/content';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded border border-neon-cyan/30 flex items-center justify-center bg-neon-cyan/5 group-hover:bg-neon-cyan/10 transition-colors">
              <Terminal size={14} className="text-neon-cyan" />
            </div>
            <span className="font-mono font-bold text-lg tracking-wider text-white">
              Dev<span className="neon-text-cyan">imL</span>
            </span>
          </a>

          {/* 导航链接 */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-neon-cyan transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="divider-neon mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} DevimL.</span>
            <span>Crafted with</span>
            <Heart size={10} className="text-neon-magenta" fill="currentColor" />
            <span>and lots of</span>
            <span className="text-neon-cyan">caffeine</span>
          </p>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
            title="回到顶部"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
