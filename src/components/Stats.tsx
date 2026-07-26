import { stats } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Stats() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-magenta/5" />
      <div
        ref={ref}
        className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center p-6 glass rounded-lg border border-white/5 hover:border-neon-cyan/20 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="font-mono text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">
              {stat.label}
              {stat.suffix && <span className="text-gray-500 ml-1">{stat.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
