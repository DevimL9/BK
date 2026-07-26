import { useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
import { profile } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

const API_URL = window.location.origin;

export function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = '请输入姓名';
    if (!formState.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!formState.message.trim()) newErrors.message = '请输入消息内容';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitError(data.error || '发送失败，请稍后再试');
      }
    } catch (error) {
      setSubmitError('网络错误，请检查网络连接后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* 区域标题 */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="tag-magenta tag mb-4 inline-block">&lt;contact /&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            开始<span className="neon-text-magenta">对话</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            有项目想法？让我们一起把它变成现实
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 联系信息 */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-lg p-5 border border-neon-magenta/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded bg-neon-magenta/10 flex items-center justify-center">
                  <Mail size={14} className="text-neon-magenta" />
                </div>
                <span className="text-sm text-gray-400">邮箱</span>
              </div>
              <a href={`mailto:${profile.email}`} className="text-white hover:text-neon-magenta transition-colors font-mono text-sm">
                {profile.email}
              </a>
            </div>

            <div className="glass rounded-lg p-5 border border-neon-magenta/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded bg-neon-magenta/10 flex items-center justify-center">
                  <MapPin size={14} className="text-neon-magenta" />
                </div>
                <span className="text-sm text-gray-400">位置</span>
              </div>
              <span className="text-white font-mono text-sm">{profile.location}</span>
            </div>

            <div className="flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-lg p-4 border border-white/5 hover:border-neon-cyan/30 flex items-center justify-center gap-2 text-gray-400 hover:text-neon-cyan transition-all text-sm"
              >
                <Github size={16} />
                <span className="font-mono">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-lg p-4 border border-white/5 hover:border-neon-cyan/30 flex items-center justify-center gap-2 text-gray-400 hover:text-neon-cyan transition-all text-sm"
              >
                <Linkedin size={16} />
                <span className="font-mono">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* 表单 */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {submitted ? (
              <div className="glass rounded-lg p-8 border border-neon-green/20 text-center">
                <CheckCircle size={48} className="text-neon-green mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">消息已发送！</h3>
                <p className="text-gray-400 text-sm">感谢你的来信，我会尽快回复。</p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }); }}
                  className="btn-neon mt-6 text-xs"
                >
                  发送新消息
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-lg p-6 border border-neon-magenta/10 space-y-5">
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    <span className="text-neon-magenta">$</span> 姓名
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full bg-dark-900 border rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-magenta/50 transition-colors ${
                      errors.name ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="你的姓名"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    <span className="text-neon-magenta">$</span> 邮箱
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full bg-dark-900 border rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-magenta/50 transition-colors ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">
                    <span className="text-neon-magenta">$</span> 消息
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className={`w-full bg-dark-900 border rounded px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-neon-magenta/50 transition-colors resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="说些什么..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm font-mono">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon-solid w-full rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>发送中...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>发送消息</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
