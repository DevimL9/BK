import { Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* 区域标题 */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="tag-green tag mb-4 inline-block">&lt;testimonials /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            合作<span className="text-neon-green" style={{ textShadow: '0 0 7px #00ff88, 0 0 10px #00ff88' }}>评价</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            来自合作伙伴的真实反馈
          </p>
        </div>

        {/* 评价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`glass rounded-lg p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,136,0.08)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Quote size={24} className="text-neon-green/30 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-neon-green/20 flex items-center justify-center font-mono text-sm font-bold text-neon-green">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
