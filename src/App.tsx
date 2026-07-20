import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-dark-900 grid-bg">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 导航栏 */}
      <Navbar />

      {/* 主内容 */}
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}

export default App;
