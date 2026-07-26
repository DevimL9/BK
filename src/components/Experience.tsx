import { Briefcase, Calendar } from 'lucide-react';
import { experience } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* 区域标题 */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="tag-purple tag mb-4 inline-block">&lt;experience /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            职业<span className="neon-text-purple">旅程</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            持续成长，不断突破的技术之路
          </p>
        </div>

        {/* 时间线 */}
        <div className="relative">
          {/* 中心线 */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple/50 via-neon-cyan/30 to-transparent" />

          {experience.map((exp, index) => (
            <div
              key={exp.company}
              className={`relative mb-12 last:mb-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* 时间线节点 */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-purple border-2 border-dark-900 shadow-[0_0_10px_rgba(176,0,255,0.5)] z-10" />

              {/* 卡片 - 交替左右 */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
              }`}>
                <div className="glass rounded-lg p-5 border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(176,0,255,0.1)]">
                  {/* 时间标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={12} className="text-neon-purple" />
                    <span className="font-mono text-xs text-neon-purple">
                      {exp.period}
                    </span>
                  </div>

                  {/* 职位 */}
                  <h3 className="text-lg font-bold text-white mb-1">
                    {exp.role}
                  </h3>

                  {/* 公司 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={12} className="text-gray-500" />
                    <span className="text-sm text-gray-400">{exp.company}</span>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
