import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/content';

const roles = [
  '创意全栈开发者',
  'UI/UX 设计师',
  '开源贡献者',
  '数字工匠',
  '创意编码艺术家',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 大型渐变光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 状态标签 */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#00ff88]" />
          <span className="font-mono text-sm text-neon-green tracking-wide">
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up">
          <span className="block text-white mb-2">你好，我是</span>
          <span className="block bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta bg-clip-text text-transparent">
            {profile.name}
          </span>
        </h1>

        {/* 打字机效果的职位 */}
        <div className="h-12 flex items-center justify-center mb-8">
          <span className="font-mono text-xl md:text-2xl text-gray-300">
            <span className="text-neon-cyan">&gt;</span> {text}
            <span className="inline-block w-[3px] h-6 bg-neon-cyan ml-1 animate-blink align-middle" />
          </span>
        </div>

        {/* 简介 */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
          {profile.tagline}
        </p>

        {/* 位置信息 */}
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-10">
          <MapPin size={14} />
          <span className="font-mono text-sm">{profile.location}</span>
        </div>

        {/* CTA 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={scrollToProjects} className="btn-neon-solid rounded-sm">
            探索作品集
          </button>
          <a href="#contact" className="btn-neon rounded-sm">
            开始对话
          </a>
        </div>

        {/* 社交链接 */}
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: Github, href: profile.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-300"
              title={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-xs text-gray-500 tracking-widest">SCROLL</span>
        <ChevronDown size={16} className="text-neon-cyan/50" />
      </div>
    </section>
  );
}
