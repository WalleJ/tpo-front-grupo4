import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden mesh-gradient pt-16">
      <div className="max-w-[1280px] mx-auto px-gutter w-full grid grid-cols-1 md:grid-cols-12 gap-lg items-center py-xl">
        <div className="md:col-span-6 z-10">
          <div className="inline-flex items-center gap-xs px-sm py-1 bg-primary-container/20 border border-primary/20 rounded-full mb-md">
            <span className="material-symbols-outlined text-[14px] text-on-primary-container">bolt</span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-primary-container">AI Voice Assistant Ready</span>
          </div>
          <h2 className="font-display text-on-surface leading-none text-3xl md:text-5xl mb-sm font-bold">Your home, <span className="text-primary">powered by real AI.</span></h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-md">Discover smart devices with AI voice assistants to automate your home with voice commands, routines and centralized control.</p>
          <div className="flex flex-wrap gap-md">
            <button onClick={() => navigate('/marketplace/store')} className="bg-primary text-on-primary px-lg py-md rounded-xl font-label-caps text-label-caps">VIEW AI PRODUCTS</button>
          </div>
        </div>
        <div className="md:col-span-6 relative h-[400px] md:h-[550px]">
          <img alt="Smart speakers with voice assistants" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" src="/images/Smart%20speakers%20with%20voice%20assistants.jpg" />
        </div>
      </div>
    </section>
  );
}