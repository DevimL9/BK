import { ExternalLink, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

const colorMap = {
  cyan: {
    border: 'border-neon-cyan/20',
    hoverBorder: 'hover:border-neon-cyan/60',
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan/5',
    glow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    gradient: 'from-neon-cyan/20 to-transparent',
    tag: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  },
  magenta: {
    border: 'border-neon-magenta/20',
    hoverBorder: 'hover:border-neon-magenta/60',
    text: 'text-neon-magenta',
    bg: 'bg-neon-magenta/5',
    glow: 'hover:shadow-[0_0_30px_rgba(255,0,229,0.15)]',
    gradient: 'from-neon-magenta/20 to-transparent',
    tag: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/20',
  },
  purple: {
    border: 'border-neon-purple/20',
    hoverBorder: 'hover:border-neon-purple/60',
    text: 'text-neon-purple',
    bg: 'bg-neon-purple/5',
    glow: 'hover:shadow-[0_0_30px_rgba(176,0,255,0.15)]',
    gradient: 'from-neon-purple/20 to-transparent',
    tag: 'bg-neon-purple/10 text-neon-purple border-neon-purple/20',
  },
  green: {
    border: 'border-neon-green/20',
    hoverBorder: 'hover:border-neon-green/60',
    text: 'text-neon-green',
    bg: 'bg-neon-green/5',
    glow: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]',
    gradient: 'from-neon-green/20 to-transparent',
    tag: 'bg-neon-green/10 text-neon-green border-neon-green/20',
  },
};

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const colors = colorMap[project.color];

  return (
    <div
      className={`group relative rounded-lg border transition-all duration-700 overflow-hidden ${colors.border} ${colors.hoverBorder} ${colors.glow} glass ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* 顶部渐变条 */}
      <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />

      <div className="p-6">
        {/* 头部 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-xs ${colors.text} opacity-60`}>
                {project.year}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded">
                  FEATURED
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
              {project.title}
            </h3>
            <p className={`text-sm font-mono ${colors.text} mt-1`}>
              {project.subtitle}
            </p>
          </div>
          <a
            href={project.link}
            className={`w-8 h-8 rounded border ${colors.border} flex items-center justify-center ${colors.text} opacity-0 group-hover:opacity-100 transition-all hover:bg-white/5`}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 描述 */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className={`px-2 py-1 text-[10px] font-mono rounded border ${colors.tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* 技术栈 */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 text-[10px] font-mono text-gray-500 bg-white/5 rounded border border-white/5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { ref: sectionRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);

  return (
    <section id="projects" className="relative py-24 px-6">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* 区域标题 */}
        <div className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="tag mb-4 inline-block">&lt;projects /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            精选<span className="neon-text-magenta">作品</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            每一个项目都是一次技术与创意的碰撞
          </p>
        </div>

        {/* 项目网格 */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} visible={gridVisible} />
          ))}
        </div>

        {/* 查看更多 */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://github.com/DevimL9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-neon-cyan transition-colors group"
          >
            <span>在 GitHub 上查看更多</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
