import { Monitor, Server, Cloud, Palette } from 'lucide-react';
import { skills } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Cloud,
  Palette,
};

const colorClasses = {
  cyan: {
    border: 'border-neon-cyan/20 hover:border-neon-cyan/50',
    bg: 'bg-neon-cyan/5',
    text: 'text-neon-cyan',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]',
    dot: 'bg-neon-cyan',
    tag: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  },
  magenta: {
    border: 'border-neon-magenta/20 hover:border-neon-magenta/50',
    bg: 'bg-neon-magenta/5',
    text: 'text-neon-magenta',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,0,229,0.1)]',
    dot: 'bg-neon-magenta',
    tag: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/20',
  },
  purple: {
    border: 'border-neon-purple/20 hover:border-neon-purple/50',
    bg: 'bg-neon-purple/5',
    text: 'text-neon-purple',
    shadow: 'hover:shadow-[0_0_20px_rgba(176,0,255,0.1)]',
    dot: 'bg-neon-purple',
    tag: 'bg-neon-purple/10 text-neon-purple border-neon-purple/20',
  },
  green: {
    border: 'border-neon-green/20 hover:border-neon-green/50',
    bg: 'bg-neon-green/5',
    text: 'text-neon-green',
    shadow: 'hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]',
    dot: 'bg-neon-green',
    tag: 'bg-neon-green/10 text-neon-green border-neon-green/20',
  },
};

export function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* 区域标题 */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="tag mb-4 inline-block">&lt;skills /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            技术<span className="neon-text-cyan">矩阵</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            全栈技术能力，从创意到落地的一站式解决方案
          </p>
        </div>

        {/* 技能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            const colors = colorClasses[skill.color];
            return (
              <div
                key={skill.category}
                className={`group p-6 rounded-lg border transition-all duration-500 cursor-default ${colors.border} ${colors.shadow} glass ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={24} className={colors.text} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${colors.text} mb-3 font-mono`}>
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${colors.tag} group-hover:border-opacity-50`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
