// Innababy - Website oficial
import { useState, useEffect, useRef } from 'react';

const FORM_URL = 'https://readdy.ai/api/form/d6sbb8k4k19g20dvs2tg';

const FloatingElement = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <div className={`absolute pointer-events-none select-none ${className}`}>{children}</div>
);

const Star = ({ size = 20, color = '#FFD966', style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const Cloud = ({ width = 80, color = '#fff', opacity = 0.7 }: { width?: number; color?: string; opacity?: number }) => (
  <svg width={width} height={width * 0.6} viewBox="0 0 100 60" fill={color} opacity={opacity}>
    <ellipse cx="50" cy="45" rx="45" ry="20" />
    <ellipse cx="35" cy="35" rx="25" ry="20" />
    <ellipse cx="60" cy="30" rx="22" ry="18" />
  </svg>
);

const Butterfly = ({ size = 32, color = '#C8B8D0' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill={color}>
    <ellipse cx="10" cy="15" rx="9" ry="12" opacity="0.8" />
    <ellipse cx="30" cy="15" rx="9" ry="12" opacity="0.8" />
    <ellipse cx="12" cy="28" rx="7" ry="9" opacity="0.6" />
    <ellipse cx="28" cy="28" rx="7" ry="9" opacity="0.6" />
    <ellipse cx="20" cy="20" rx="2" ry="10" fill="#5A4A63" />
  </svg>
);

const WaveDivider = ({ fill = '#FAF7F2', flip = false }: { fill?: string; flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ height: 60 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill} />
    </svg>
  </div>
);

const BlobBg = ({ color, className }: { color: string; className: string }) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      background: color,
      borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
      filter: 'blur(40px)',
      opacity: 0.35,
    }}
  />
);

// Micro dot accent — low opacity, premium feel
const MicroDot = ({ size = 6, color = '#C8B8D0', opacity = 0.25 }: { size?: number; color?: string; opacity?: number }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, background: color, opacity }}
  />
);

// Hero orb — desktop-only decorative floating element (inside image column)
const HeroOrbInline = () => (
  <div
    className="hidden lg:block absolute pointer-events-none select-none"
    style={{
      top: '-36px',
      right: '-28px',
      zIndex: 1,
      animation: 'floatOrb 7s ease-in-out infinite',
      opacity: 0.82,
    }}
  >
    <svg width="290" height="290" viewBox="0 0 290 290" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer dashed ring */}
      <ellipse cx="145" cy="145" rx="132" ry="126" fill="rgba(200,184,208,0.05)" stroke="rgba(200,184,208,0.18)" strokeWidth="1.5" strokeDasharray="5 7" />
      <ellipse cx="145" cy="145" rx="104" ry="99" fill="rgba(244,217,208,0.05)" stroke="rgba(244,217,208,0.12)" strokeWidth="1" />
      {/* Inner soft fill */}
      <ellipse cx="145" cy="138" rx="70" ry="65" fill="rgba(255,248,244,0.5)" />
      {/* Sun core */}
      <circle cx="145" cy="130" r="25" fill="rgba(255,217,102,0.18)" />
      <circle cx="145" cy="130" r="17" fill="rgba(255,217,102,0.24)" />
      <circle cx="145" cy="130" r="10" fill="rgba(255,217,102,0.3)" />
      {/* Sun rays */}
      <line x1="145" y1="96" x2="145" y2="84" stroke="rgba(255,217,102,0.28)" strokeWidth="2" strokeLinecap="round" />
      <line x1="145" y1="164" x2="145" y2="176" stroke="rgba(255,217,102,0.28)" strokeWidth="2" strokeLinecap="round" />
      <line x1="111" y1="130" x2="99"  y2="130" stroke="rgba(255,217,102,0.28)" strokeWidth="2" strokeLinecap="round" />
      <line x1="179" y1="130" x2="191" y2="130" stroke="rgba(255,217,102,0.28)" strokeWidth="2" strokeLinecap="round" />
      <line x1="121" y1="106" x2="113" y2="98"  stroke="rgba(255,217,102,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="169" y1="106" x2="177" y2="98"  stroke="rgba(255,217,102,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="121" y1="154" x2="113" y2="162" stroke="rgba(255,217,102,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="169" y1="154" x2="177" y2="162" stroke="rgba(255,217,102,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cloud 1 — lower left */}
      <ellipse cx="82"  cy="178" rx="26" ry="14" fill="rgba(255,255,255,0.52)" />
      <ellipse cx="68"  cy="170" rx="17" ry="13" fill="rgba(255,255,255,0.48)" />
      <ellipse cx="96"  cy="167" rx="15" ry="12" fill="rgba(255,255,255,0.48)" />
      {/* Cloud 2 — lower right */}
      <ellipse cx="214" cy="188" rx="23" ry="13" fill="rgba(255,255,255,0.42)" />
      <ellipse cx="202" cy="181" rx="15" ry="12" fill="rgba(255,255,255,0.40)" />
      <ellipse cx="224" cy="179" rx="14" ry="11" fill="rgba(255,255,255,0.40)" />
      {/* Mini cloud — top area */}
      <ellipse cx="172" cy="92"  rx="16" ry="9"  fill="rgba(200,184,208,0.22)" />
      <ellipse cx="162" cy="87"  rx="10" ry="8"  fill="rgba(200,184,208,0.20)" />
      {/* 4-point stars */}
      <path d="M108 100 L109.8 106 L116 108 L109.8 110 L108 116 L106.2 110 L100 108 L106.2 106 Z" fill="rgba(255,217,102,0.30)" />
      <path d="M186  91 L187.6  97 L194  99 L187.6 101 L186 107 L184.4 101 L178  99 L184.4  97 Z" fill="rgba(200,184,208,0.36)" />
      <path d="M 68 134 L 69.2 138 L 73 139.2 L 69.2 140.4 L 68 144 L 66.8 140.4 L 63 139.2 L 66.8 138 Z" fill="rgba(168,201,160,0.36)" />
      <path d="M224 118 L225.2 122 L229 123.2 L225.2 124.4 L224 128 L222.8 124.4 L219 123.2 L222.8 122 Z" fill="rgba(244,217,208,0.44)" />
      {/* Twinkling dots */}
      <circle cx="120" cy="82"  r="3"   fill="rgba(255,217,102,0.38)" style={{ animation: 'twinkleDot 2.5s ease-in-out infinite' }} />
      <circle cx="198" cy="162" r="2.5" fill="rgba(168,201,160,0.48)" style={{ animation: 'twinkleDot 3.1s ease-in-out infinite 0.8s' }} />
      <circle cx="58"  cy="164" r="2.2" fill="rgba(200,184,208,0.48)" style={{ animation: 'twinkleDot 2.8s ease-in-out infinite 0.4s' }} />
      <circle cx="234" cy="142" r="2.5" fill="rgba(255,217,102,0.42)" style={{ animation: 'twinkleDot 3.5s ease-in-out infinite 1.2s' }} />
      <circle cx="156" cy="224" r="2"   fill="rgba(244,217,208,0.48)" style={{ animation: 'twinkleDot 2.3s ease-in-out infinite 0.6s' }} />
      <circle cx="110" cy="208" r="2"   fill="rgba(200,184,208,0.38)" />
      <circle cx="190" cy="218" r="2.5" fill="rgba(255,217,102,0.32)" />
    </svg>
  </div>
);

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const RevealSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalContent, setLegalContent] = useState<'privacy' | 'cookies' | 'terms'>('privacy');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setHeroScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openLegal = (type: 'privacy' | 'cookies' | 'terms') => {
    setLegalContent(type);
    setShowLegalModal(true);
  };

  const faqData = [
    { question: 'Ce vârste acceptați?', answer: 'Primim copii organizați pe grupe de vârstă, astfel încât fiecare etapă de dezvoltare să fie susținută potrivit nevoilor copilului.' },
    { question: 'Ce variante de program aveți?', answer: 'Avem program scurt, program lung și program prelungit, pentru ca fiecare familie să poată alege varianta potrivită ritmului său zilnic.' },
    { question: 'Ce include programul copilului?', answer: 'În funcție de programul ales, ziua copilului poate include acomodare, activități educative, gustări, masa de prânz, program de somn, relaxare, activități opționale și timp de joacă.' },
    { question: 'Pot programa o vizită înainte de înscriere?', answer: 'Da, încurajăm părinții să programeze o vizită ca să cunoască spațiul, atmosfera și echipa și să aleagă în cunoștință de cauză.' },
    { question: 'Cum alegeți grupa potrivită pentru copil?', answer: 'Grupele sunt organizate în funcție de vârstă, astfel încât copilul să fie într-un mediu potrivit ritmului său de dezvoltare și activităților specifice etapei în care se află.' },
    { question: 'Aveți un program potrivit și pentru părinții cu program prelungit?', answer: 'Da, avem și program prelungit, gândit pentru familiile care au nevoie de mai multă flexibilitate până seara.' },
  ];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('website')) return;
    if (!formData.get('gdpr_consent')) {
      return;
    }
    setFormStatus('sending');
    fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })
      .then(() => { setFormStatus('success'); form.reset(); })
      .catch(() => setFormStatus('error'));
  };

  const navLinks: [string, string][] = [
    ['despre', 'Despre'],
    ['beneficii', 'De ce noi'],
    ['grupe', 'Grupe'],
    ['programe', 'Programe'],
    ['galerie', 'Galerie'],
    ['faq', 'Întrebări'],
    ['contact', 'Contact'],
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#FFFBF7' }}>

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-lg' : ''}`}
        style={{ background: isScrolled ? 'rgba(255,251,247,0.97)' : 'transparent', backdropFilter: isScrolled ? 'blur(12px)' : 'none' }}
      >
        <div className={`max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center relative transition-all duration-500
          ${!isScrolled ? 'justify-center lg:justify-between py-4 lg:py-5' : 'justify-between py-3 lg:py-4'}`}>
          {/* LOGO */}
          <button onClick={scrollToTop} className="cursor-pointer flex items-center gap-2 z-10">
            <img
              src="/images/fb3730316a70.webp"
              alt="Innababy Logo"
              className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-14 lg:h-16' : 'h-28 lg:h-32'}`}
            />
          </button>
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                className="text-[#5A4A63] hover:text-[#C8B8D0] transition-colors duration-300 whitespace-nowrap text-[15px] font-semibold relative group cursor-pointer">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8B8D0] rounded-full group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
          <button onClick={() => setShowBookingModal(true)}
            className="hidden lg:flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold whitespace-nowrap text-[15px] transition-all duration-300 cursor-pointer cta-glow"
            style={{ background: 'linear-gradient(135deg, #C8B8D0 0%, #A8C9A0 100%)', boxShadow: '0 4px 20px rgba(200,184,208,0.5)' }}>
            <i className="ri-calendar-heart-line"></i> Programează vizită
          </button>
          {/* Mobile hamburger — absolute right when logo is centered (not scrolled), normal flow when scrolled */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-500 ${!isScrolled ? 'absolute right-6' : ''}`}
            style={{ background: 'rgba(200,184,208,0.2)' }}>
            <i className={`text-[#5A4A63] text-xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pb-6 pt-2 space-y-3" style={{ background: 'rgba(255,251,247,0.98)' }}>
            {navLinks.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                className="block w-full text-left text-[#5A4A63] font-semibold py-2.5 px-4 rounded-2xl hover:bg-[#F4D9D0]/30 transition-colors duration-200 cursor-pointer">
                {label}
              </button>
            ))}
            <button onClick={() => { setShowBookingModal(true); setMobileMenuOpen(false); }}
              className="w-full text-white py-3 rounded-full font-bold mt-2 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #C8B8D0 0%, #A8C9A0 100%)' }}>
              Programează vizită
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF5F0 0%, #FFF0F8 40%, #F0F8FF 70%, #F5FFF0 100%)', minHeight: '100vh' }}>

        {/* Background blobs — parallax */}
        <div className="absolute pointer-events-none"
          style={{ width: 560, height: 560, top: -80, left: -160,
            background: '#F4D9D0', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            filter: 'blur(50px)', opacity: 0.3,
            transform: `translateY(${heroScrollY * 0.12}px)` }} />
        <div className="absolute pointer-events-none"
          style={{ width: 420, height: 420, top: 200, right: -100,
            background: '#C8B8D0', borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
            filter: 'blur(50px)', opacity: 0.22,
            transform: `translateY(${heroScrollY * 0.08}px)` }} />
        <div className="absolute pointer-events-none"
          style={{ width: 380, height: 380, bottom: -40, left: '30%',
            background: '#A8C9A0', borderRadius: '50% 60% 40% 50% / 50% 40% 60% 50%',
            filter: 'blur(50px)', opacity: 0.18,
            transform: `translateY(${heroScrollY * 0.06}px)` }} />

        {/* ═══════════════════════════════════════════════════
            DESKTOP LAYOUT — editorial text + arch image
            ═══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex min-h-screen relative items-center">

          {/* ── LEFT: Text column ── */}
          <div className="relative z-20 flex flex-col justify-center"
            style={{
              width: '48%',
              paddingLeft: 'max(5%, calc((100vw - 1280px) / 2 + 40px))',
              paddingRight: '4%',
              paddingTop: 110,
              paddingBottom: 80,
              transform: `translateY(${heroScrollY * -0.06}px)`,
            }}>

            {/* Micro floaters — left side */}
            <div className="absolute pointer-events-none select-none"
              style={{ top: 150, left: '10%', transform: `translateY(${heroScrollY * -0.18}px)`, opacity: 0.65 }}>
              <Star size={22} color="#FFD966" />
            </div>
            <div className="absolute pointer-events-none select-none"
              style={{ bottom: 200, left: '6%', transform: `translateY(${heroScrollY * -0.12}px)`, opacity: 0.45 }}>
              <Butterfly size={34} color="#C8B8D0" />
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8 self-start"
              style={{ background: 'rgba(200,184,208,0.18)', color: '#9B8BA6', border: '1.5px dashed #C8B8D0' }}>
              <span>✨</span> Grădiniță acreditată · Sectorul 1
            </div>

            {/* Headline — editorial hierarchy */}
            <h1 className="leading-[1.06] text-[#3D2E4A] mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(46px, 5.8vw, 78px)', fontWeight: 700, letterSpacing: '-0.025em' }}>
              Pentru că<br />
              un{' '}
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #C8A8B8 0%, #D4A0A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.01em',
              }}>început</span>
              <br />
              <span style={{ color: '#3D2E4A' }}>bun</span>
              {' '}<span style={{ color: '#C8B8D0', fontStyle: 'italic' }}>contează.</span>
            </h1>

            {/* Elegant divider */}
            <div className="flex items-center gap-3 mb-7">
              <div style={{ width: 48, height: 2, borderRadius: 99, background: 'linear-gradient(90deg, #C8A8B8, #A8C9A0)' }}></div>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD966', opacity: 0.8 }}></div>
              <div style={{ width: 24, height: 2, borderRadius: 99, background: 'rgba(200,184,208,0.4)' }}></div>
            </div>

            {/* Description */}
            <p className="text-[#6B5D5D] leading-[1.85] mb-10"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: 400 }}>
              Grădiniță și creșă privată acreditată în Sectorul 1, unde copilul tău este primit cu grijă reală, într-un mediu sigur și cald.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button onClick={() => setShowBookingModal(true)}
                className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap cursor-pointer cta-primary"
                style={{ background: 'linear-gradient(135deg, #A8C9A0 0%, #7DB87A 100%)', boxShadow: '0 8px 30px rgba(168,201,160,0.45)', transition: 'all 0.3s ease' }}>
                <i className="ri-calendar-heart-line text-lg"></i>
                Programează o vizită
              </button>
              <button onClick={() => scrollToSection('programe')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ background: 'rgba(200,184,208,0.12)', color: '#5A4A63', border: '2px solid #C8B8D0' }}>
                Descoperă programele
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8">
              {[
                { value: '15+', label: 'ani experiență', icon: 'ri-award-fill', color: '#F4D9D0', accent: '#C87060' },
                { value: '4.9', label: '100+ recenzii', icon: 'ri-star-fill', color: '#A8C9A0', accent: '#5A8A52', star: true },
                { value: '7–19', label: 'program zilnic', icon: 'ri-time-fill', color: '#FFD966', accent: '#B8860B' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: `${stat.color}55` }}>
                    <i className={`${stat.icon} text-sm`} style={{ color: stat.accent }}></i>
                  </div>
                  <div>
                    <div className="font-black text-[#3D2E4A] text-[17px] leading-none flex items-center gap-1">
                      {stat.value}
                      {(stat as { star?: boolean }).star && (
                        <i className="ri-star-fill text-[11px]" style={{ color: '#FFD966', marginTop: 1 }}></i>
                      )}
                    </div>
                    <div className="text-[11px] text-[#9B8BA6] font-semibold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll progress line */}
            <div className="absolute left-0 top-0 w-[3px] rounded-full overflow-hidden" style={{ height: '100%', background: 'rgba(200,184,208,0.12)' }}>
              <div className="w-full rounded-full transition-all duration-100"
                style={{
                  height: `${Math.min(100, (heroScrollY / (window.innerHeight || 900)) * 100)}%`,
                  background: 'linear-gradient(180deg, #C8B8D0, #A8C9A0)',
                  opacity: 0.7,
                }} />
            </div>
          </div>

          {/* ── RIGHT: Image in premium arch shape ── */}
          <div className="relative z-10 flex-1 flex items-center justify-center"
            style={{
              paddingTop: 100,
              paddingBottom: 60,
              paddingRight: 'max(3%, calc((100vw - 1280px) / 2 + 30px))',
              paddingLeft: 20,
              transform: `translateY(${heroScrollY * 0.05}px)`,
            }}>

            {/* Outer decorative ring — slightly larger than arch */}
            <div className="absolute pointer-events-none"
              style={{
                width: 'min(420px, 36vw)',
                height: 'min(590px, 50vw)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '9999px 9999px 60px 60px',
                border: '1.5px dashed rgba(200,184,208,0.35)',
              }} />
            <div className="absolute pointer-events-none"
              style={{
                width: 'min(450px, 38vw)',
                height: 'min(630px, 53vw)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '9999px 9999px 70px 70px',
                border: '1px dashed rgba(200,184,208,0.18)',
              }} />

            {/* Arch image container */}
            <div style={{
              position: 'relative',
              width: 'min(390px, 33vw)',
              height: 'min(560px, 47vw)',
              borderRadius: '9999px 9999px 40px 40px',
              overflow: 'hidden',
              border: '6px solid rgba(255,255,255,0.95)',
              boxShadow: '0 30px 80px rgba(200,184,208,0.38), 0 8px 24px rgba(244,217,208,0.3)',
              flexShrink: 0,
            }}>
              <img
                src="/images/innababy-hero-v7.webp"
                alt="Copii fericiți la Innababy"
                className="w-full h-full object-cover object-top"
                style={{
                  transform: `translateY(${heroScrollY * 0.3}px) scale(1.05)`,
                  willChange: 'transform',
                  transition: 'transform 0.05s linear',
                }}
                loading="eager"
              />
              {/* Subtle inner shadow top */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,245,240,0.15) 0%, transparent 18%, transparent 75%, rgba(255,245,240,0.25) 100%)' }} />
            </div>

            {/* Floating badge — left of arch */}
            <div className="absolute z-20 pointer-events-none"
              style={{ left: '3%', top: '35%', transform: `translateY(${heroScrollY * -0.15}px)` }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'white', border: '2px solid #F4D9D0', boxShadow: '0 8px 28px rgba(244,217,208,0.5)', transform: 'rotate(-4deg)' }}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #F4D9D0, #C8B8D0)' }}>
                  <i className="ri-award-fill text-white text-base"></i>
                </div>
                <div>
                  <div className="font-black text-[#5A4A63] text-[15px] leading-none">15 ani</div>
                  <div className="text-[11px] text-[#9B8BA6] font-semibold">experiență</div>
                </div>
              </div>
            </div>

            {/* Floating badge — right of arch */}
            <div className="absolute z-20 pointer-events-none"
              style={{ right: '4%', top: '45%', transform: `translateY(${heroScrollY * -0.1}px)` }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'white', border: '2px solid #A8C9A0', boxShadow: '0 8px 28px rgba(168,201,160,0.4)', transform: 'rotate(3deg)' }}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #A8C9A0, #7DB87A)' }}>
                  <i className="ri-star-fill text-white text-base"></i>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-[#5A4A63] text-[17px] leading-none">4.9</span>
                    <i className="ri-star-fill text-[11px]" style={{ color: '#FFD966', marginTop: 1 }}></i>
                  </div>
                  <div className="text-[11px] text-[#9B8BA6] font-semibold whitespace-nowrap">100+ recenzii</div>
                </div>
              </div>
            </div>

            {/* Floating badge — bottom of arch */}
            <div className="absolute z-20 pointer-events-none"
              style={{ left: '50%', bottom: '7%', transform: `translateX(-50%) translateY(${heroScrollY * -0.08}px)` }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'white', border: '2px solid #FFD966', boxShadow: '0 8px 28px rgba(255,217,102,0.35)', whiteSpace: 'nowrap' }}>
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #FFD966, #FFC233)' }}>
                  <i className="ri-time-fill text-white text-base"></i>
                </div>
                <div>
                  <div className="font-black text-[#5A4A63] text-[14px] leading-none">7:00 – 19:00</div>
                  <div className="text-[11px] text-[#9B8BA6] font-semibold">program zilnic</div>
                </div>
              </div>
            </div>

            {/* Twinkling stars around arch */}
            <div className="absolute pointer-events-none select-none"
              style={{ right: '8%', top: '14%', transform: `translateY(${heroScrollY * -0.2}px)`, opacity: 0.8 }}>
              <Star size={22} color="#FFD966" />
            </div>
            <div className="absolute pointer-events-none select-none"
              style={{ left: '8%', top: '20%', transform: `translateY(${heroScrollY * -0.14}px)`, opacity: 0.6 }}>
              <Star size={14} color="#C8B8D0" />
            </div>
            <div className="absolute pointer-events-none select-none"
              style={{ right: '6%', bottom: '22%', transform: `translateY(${heroScrollY * -0.12}px)`, opacity: 0.5 }}>
              <Butterfly size={30} color="#F4D9D0" />
            </div>
            {/* HeroOrb — desktop only decorative */}
            <HeroOrbInline />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            MOBILE LAYOUT — agency award premium
            ═══════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col relative" style={{ minHeight: '100svh' }}>

          {/* Content wrapper — starts below fixed nav */}
          <div className="flex flex-col items-center pt-[90px] px-6 pb-10">

            {/* Tag — centered */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 self-center"
              style={{ background: 'rgba(200,184,208,0.2)', color: '#9B8BA6', border: '1.5px dashed #C8B8D0' }}>
              <span>✨</span> Grădiniță acreditată · Sectorul 1
            </div>

            {/* Headline — centered, dramatic */}
            <h1 className="text-center leading-[1.1] text-[#3D2E4A] mb-5 w-full"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 10vw, 54px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Pentru că<br />
              un{' '}
              <span style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #C8A8B8 0%, #D4A0A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>început</span>
              {' '}
              <span style={{ color: '#C8B8D0', fontStyle: 'italic' }}>bun</span>
              <br />
              contează.
            </h1>

            {/* Thin divider — centered */}
            <div className="flex items-center gap-2 mb-7">
              <div style={{ width: 36, height: 2, borderRadius: 99, background: 'linear-gradient(90deg, transparent, #C8A8B8)' }}></div>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD966', opacity: 0.85 }}></div>
              <div style={{ width: 36, height: 2, borderRadius: 99, background: 'linear-gradient(90deg, #A8C9A0, transparent)' }}></div>
            </div>

            {/* Arch image — centered, premium shape */}
            <div className="relative flex justify-center w-full mb-7" style={{ transform: `translateY(${heroScrollY * -0.04}px)` }}>

              {/* Outer decorative ring */}
              <div className="absolute pointer-events-none"
                style={{
                  width: 'min(292px, 80vw)',
                  height: 'min(390px, 107vw)',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '9999px 9999px 46px 46px',
                  border: '1.5px dashed rgba(200,184,208,0.38)',
                }} />

              {/* Arch container */}
              <div style={{
                position: 'relative',
                width: 'min(268px, 74vw)',
                height: 'min(360px, 99vw)',
                borderRadius: '9999px 9999px 32px 32px',
                overflow: 'hidden',
                border: '5px solid rgba(255,255,255,0.97)',
                boxShadow: '0 24px 60px rgba(200,184,208,0.42), 0 6px 20px rgba(244,217,208,0.3)',
                flexShrink: 0,
              }}>
                <img
                  src="/images/innababy-hero-v7.webp"
                  alt="Copii fericiți la Innababy"
                  className="w-full h-full object-cover object-top"
                  style={{
                    transform: `translateY(${heroScrollY * 0.18}px) scale(1.04)`,
                    willChange: 'transform',
                    transition: 'transform 0.05s linear',
                  }}
                  loading="eager"
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(255,245,240,0.2) 100%)' }} />
              </div>

              {/* Floating stars around arch — mobile */}
              <div className="absolute pointer-events-none select-none"
                style={{ left: 'calc(50% - min(154px, 41vw))', top: '30%', transform: `translateY(${heroScrollY * -0.1}px)`, opacity: 0.75 }}>
                <Star size={18} color="#FFD966" />
              </div>
              <div className="absolute pointer-events-none select-none"
                style={{ right: 'calc(50% - min(154px, 41vw))', top: '20%', transform: `translateY(${heroScrollY * -0.13}px)`, opacity: 0.6 }}>
                <Butterfly size={24} color="#C8B8D0" />
              </div>
              <div className="absolute pointer-events-none select-none"
                style={{ left: 'calc(50% - min(150px, 40vw))', bottom: '8%', transform: `translateY(${heroScrollY * -0.07}px)`, opacity: 0.5 }}>
                <Star size={12} color="#A8C9A0" />
              </div>
            </div>

            {/* Description — centered, concise */}
            <p className="text-center text-[#6B5D5D] leading-[1.8] mb-7 text-[14px]" style={{ maxWidth: 320 }}>
              Grădiniță și creșă privată acreditată în Sectorul 1 — un mediu sigur, cald și bine organizat pentru copilul tău.
            </p>

            {/* Stats row — mobile, centered */}
            <div className="flex items-center justify-center gap-5 mb-8 w-full pb-6"
              style={{ borderBottom: '1.5px dashed rgba(200,184,208,0.4)' }}>
              {[
                { value: '15+', label: 'ani', color: '#F4D9D0', icon: 'ri-award-fill', accent: '#C87060' },
                { value: '4.9', label: '100+ recenzii', color: '#A8C9A0', icon: 'ri-star-fill', accent: '#5A8A52', star: true },
                { value: '7–19', label: 'zilnic', color: '#FFD966', icon: 'ri-time-fill', accent: '#B8860B' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: `${stat.color}55` }}>
                    <i className={`${stat.icon} text-xs`} style={{ color: stat.accent }}></i>
                  </div>
                  <div>
                    <div className="font-black text-[#3D2E4A] text-[15px] leading-none flex items-center gap-1">
                      {stat.value}
                      {(stat as { star?: boolean }).star && (
                        <i className="ri-star-fill text-[10px]" style={{ color: '#FFD966', marginTop: 1 }}></i>
                      )}
                    </div>
                    <div className="text-[10px] text-[#9B8BA6] font-semibold whitespace-nowrap">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs — mobile */}
            <div className="flex flex-col gap-3 w-full" style={{ maxWidth: 340 }}>
              <button onClick={() => setShowBookingModal(true)}
                className="flex items-center justify-center gap-2 text-white py-4 rounded-full font-bold text-[15px] whitespace-nowrap cursor-pointer cta-primary"
                style={{ background: 'linear-gradient(135deg, #A8C9A0 0%, #7DB87A 100%)', boxShadow: '0 8px 30px rgba(168,201,160,0.45)', transition: 'all 0.3s ease' }}>
                <i className="ri-calendar-heart-line text-lg"></i>
                Programează o vizită
              </button>
              <button onClick={() => scrollToSection('programe')}
                className="flex items-center justify-center gap-2 py-4 rounded-full font-bold text-[15px] whitespace-nowrap transition-all duration-300 cursor-pointer"
                style={{ background: 'rgba(200,184,208,0.12)', color: '#5A4A63', border: '2px solid #C8B8D0' }}>
                Descoperă programele
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>

        <WaveDivider fill="#FFFBF7" />
      </section>

      {/* DESPRE */}
      <section id="despre" className="relative py-24 lg:py-36 overflow-hidden" style={{ background: '#FFFBF7' }}>
        <BlobBg color="#F4D9D0" className="w-[600px] h-[600px] -top-40 -right-60" />
        {/* Micro accent dot */}
        <div className="absolute top-40 left-8 w-3 h-3 rounded-full pointer-events-none" style={{ background: '#FFD966', opacity: 0.18, animation: 'twinkleDot 3s ease-in-out infinite' }}></div>
        <div className="absolute bottom-24 right-32 w-2 h-2 rounded-full pointer-events-none" style={{ background: '#C8B8D0', opacity: 0.22, animation: 'twinkleDot 4s ease-in-out infinite 1s' }}></div>

        <FloatingElement className="top-20 left-10 animate-bounce" style={{ animationDuration: '4s' } as React.CSSProperties}>
          <Butterfly size={36} color="#F4D9D0" />
        </FloatingElement>
        <FloatingElement className="bottom-20 right-16 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' } as React.CSSProperties}>
          <Star size={20} color="#FFD966" />
        </FloatingElement>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <RevealSection className="w-full lg:w-[45%]" delay={0}>
              <div className="relative" style={{ minHeight: 480 }}>
                <div style={{ borderRadius: '40% 60% 55% 45% / 45% 55% 40% 60%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(200,184,208,0.35)', width: '85%' }}>
                  <img
                    src="/images/innababy-about-v6a.webp"
                    alt="Spațiul Innababy"
                    className="w-full object-cover object-top"
                    style={{ height: 420 }}
                    loading="lazy"
                  />
                </div>
                <div className="absolute right-0 bottom-0 shadow-2xl"
                  style={{ borderRadius: '55% 45% 40% 60% / 60% 45% 55% 40%', overflow: 'hidden', width: '55%', border: '4px solid white' }}>
                  <img
                    src="/images/innababy-about-v6b.webp"
                    alt="Activități creative Innababy"
                    className="w-full object-cover object-top"
                    style={{ height: 200 }}
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-6 right-4 z-20 w-20 h-20 flex flex-col items-center justify-center rounded-full font-black text-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FFD966, #FFC233)', color: '#5A4A63', transform: 'rotate(12deg)', fontSize: 11, lineHeight: 1.2 }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>❤️</span>
                  <span>Acreditat</span>
                  <span>oficial</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="w-full lg:w-[55%]" delay={150}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                style={{ background: 'rgba(244,217,208,0.3)', color: '#9B8BA6', border: '1.5px dashed #F4D9D0' }}>
                🌸 Despre noi
              </div>
              <h2 className="text-[#3D2E4A] mb-5 leading-[1.1]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700 }}>
                Despre Noi
              </h2>

              {/* ─── Emotional safety badge ─── */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,217,208,0.45) 0%, rgba(200,184,208,0.3) 100%)',
                  border: '1.5px solid rgba(200,184,208,0.55)',
                  color: '#7A6A8A',
                }}>
                <span className="text-lg leading-none">🏠</span>
                <span className="text-sm font-black tracking-widest uppercase" style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: '0.08em' }}>spațiu sigur emoțional</span>
              </div>

              <div className="space-y-6 text-[#6B5D5D] leading-[1.8]" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
                <p>
                  <span className="float-left mr-3 leading-none font-black" style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, color: '#C8B8D0', lineHeight: 0.85 }}>I</span>
                  nnababy este o grădiniță și creșă privată acreditată în care am construit, în timp, un loc în care copilăria este trăită cu grijă, siguranță și atenție zi de zi. Credem că primii ani sunt esențiali și că un mediu cald, echilibrat și bine organizat îl ajută pe copil să se simtă în siguranță, să capete încredere și să se dezvolte armonios.
                </p>
                <p>
                  Ne-am dorit de la început să oferim mai mult decât un program de supraveghere. La Innababy, copiii sunt primiți într-un spațiu prietenos, cu activități potrivite vârstei, cu ritm adaptat nevoilor lor și cu respect pentru fiecare etapă de creștere. De-a lungul timpului, sute de părinți ne-au ales și ne-au încredințat cel mai important lucru: copilul lor.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* BENEFICII */}
      <section id="beneficii" className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF5F8 0%, #F8F5FF 50%, #F5FFF8 100%)' }}>
        <BlobBg color="#C8B8D0" className="w-[500px] h-[500px] top-0 right-0" />
        <BlobBg color="#A8C9A0" className="w-[350px] h-[350px] bottom-0 left-0" />
        <FloatingElement className="top-16 right-20 animate-bounce" style={{ animationDuration: '3.5s' } as React.CSSProperties}>
          <Star size={26} color="#FFD966" />
        </FloatingElement>
        <FloatingElement className="bottom-24 left-12 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.7s' } as React.CSSProperties}>
          <Butterfly size={44} color="#A8C9A0" />
        </FloatingElement>
        {/* Micro accent dots */}
        <div className="absolute top-1/3 right-12 w-2 h-2 rounded-full pointer-events-none" style={{ background: '#F4D9D0', opacity: 0.3, animation: 'twinkleDot 2.7s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/3 left-20 w-2.5 h-2.5 rounded-full pointer-events-none" style={{ background: '#FFD966', opacity: 0.2, animation: 'twinkleDot 3.4s ease-in-out infinite 0.5s' }}></div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(200,184,208,0.2)', color: '#9B8BA6', border: '1.5px dashed #C8B8D0' }}>
              💜 De ce noi
            </div>
            <h2 className="text-[#3D2E4A] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              De ce părinții aleg Innababy
            </h2>
            <p className="text-[#6B5D5D] leading-[1.75] max-w-[680px] mx-auto" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
              Părinții ne aleg pentru că simt că aici copilul lor este văzut, primit cu blândețe și îngrijit cu atenție, nu doar supravegheat.
            </p>
          </RevealSection>

          {/* 8 cards — perfectly balanced 2-col grid, row-based reveal (no zig-zag) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            {[
              { color: '#F4D9D0', accent: '#C8B8D0', title: 'Educatori dedicați și cu experiență', text: 'Echipa noastră este formată din profesioniști pasionați, cu experiență în educația timpurie.', emoji: '👩‍🏫' },
              { color: '#D4EDD0', accent: '#A8C9A0', title: 'Învățare prin joacă, adaptată fiecărei vârste', text: 'Programul nostru educațional respectă ritmul natural de dezvoltare al fiecărui copil.', emoji: '🎨' },
              { color: '#E8E0F0', accent: '#C8B8D0', title: 'Mediu sigur, stabil și acreditat', text: 'Spațiile noastre sunt special amenajate pentru siguranța și confortul copiilor.', emoji: '🛡️' },
              { color: '#FFF0D0', accent: '#FFD966', title: 'Bucătărie proprie și mese echilibrate zilnic', text: 'Preparăm zilnic mese proaspete, echilibrate și adaptate nevoilor nutriționale ale copiilor.', emoji: '🍎' },
              { color: '#F4D9D0', accent: '#F4A090', title: '15 ani de încredere și experiență', text: 'De peste un deceniu și jumătate, familii din Sectorul 1 ne aleg pentru grija și profesionalismul nostru.', emoji: '🏅' },
              { color: '#D4EDD0', accent: '#A8C9A0', title: 'Activități opționale care dezvoltă copilul', text: 'Oferim programe suplimentare de muzică, dans, limba engleză și educație fizică.', emoji: '🎵' },
              { color: '#E8E0F0', accent: '#C8B8D0', title: 'Curte proprie și loc de joacă în aer liber', text: 'Copiii se bucură zilnic de timp petrecut în aer liber, în curtea noastră sigură și bine amenajată.', emoji: '🌿' },
              { color: '#FFF0D0', accent: '#FFD966', title: 'Program adaptat pentru părinți', text: 'Programul nostru extins 7:00 – 19:00 vine în întâmpinarea nevoilor familiilor moderne.', emoji: '⏰' },
            ].map((item, i) => {
              // Row-based delay: same delay for both cards in a row → no zig-zag
              const rowDelay = Math.floor(i / 2) * 130;
              return (
                <RevealSection key={i} delay={rowDelay}>
                  <div className="group cursor-pointer rounded-3xl p-6 lg:p-7 h-full transition-all duration-300 hover:-translate-y-1 flex items-start gap-5"
                    style={{ background: 'white', border: `2px solid ${item.color}`, boxShadow: `0 4px 18px ${item.color}50` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = item.accent; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 24px ${item.color}70`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = item.color; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 18px ${item.color}50`; }}>
                    <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: `linear-gradient(135deg, ${item.color}, ${item.accent}40)` }}>
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="font-black text-[#3D2E4A] mb-2 text-[16px] lg:text-[17px]">{item.title}</h3>
                      <p className="text-[#6B5D5D] text-[14px] lg:text-[15px] leading-[1.65]">{item.text}</p>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRUPE */}
      <section id="grupe" className="relative py-24 lg:py-36 overflow-hidden" style={{ background: '#FFFBF7' }}>
        <BlobBg color="#FFD966" className="w-[450px] h-[450px] top-0 -left-32" />
        <BlobBg color="#F4D9D0" className="w-[350px] h-[350px] bottom-0 right-0" />
        <FloatingElement className="top-16 right-24 animate-bounce" style={{ animationDuration: '3.2s' } as React.CSSProperties}>
          <Star size={28} color="#FFD966" />
        </FloatingElement>
        {/* Micro accents */}
        <div className="absolute top-32 left-1/4 w-2 h-2 rounded-full pointer-events-none" style={{ background: '#C8B8D0', opacity: 0.2, animation: 'twinkleDot 3.6s ease-in-out infinite 0.7s' }}></div>
        <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 rounded-full pointer-events-none" style={{ background: '#A8C9A0', opacity: 0.2, animation: 'twinkleDot 2.5s ease-in-out infinite' }}></div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(255,217,102,0.2)', color: '#B8860B', border: '1.5px dashed #FFD966' }}>
              🌈 Grupele noastre
            </div>
            <h2 className="text-[#3D2E4A] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              Grupele Innababy
            </h2>
            <p className="text-[#6B5D5D] leading-[1.75] max-w-[680px] mx-auto" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>
              Copiii sunt organizați pe grupe de vârstă pentru ca fiecare etapă de dezvoltare să fie susținută potrivit nevoilor lor.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[
              { name: 'Buburuze', age: '1 an – 2 ani și jumătate', emoji: '🐞', color: '#F4D9D0', accent: '#E8A090', bg: 'linear-gradient(135deg, #FFF5F3 0%, #FFE8E0 100%)', text: 'Primii pași în colectivitate, într-un mediu cald și protejat, cu activități senzoriale și joc liber adaptat vârstei.', img: '/images/innababy-grupe-v6a.webp' },
              { name: 'Ciupercuțe', age: '2 ani și jumătate – 4 ani', emoji: '🍄', color: '#C8B8D0', accent: '#9B8BA6', bg: 'linear-gradient(135deg, #F8F5FF 0%, #EDE5F5 100%)', text: 'Explorare, creativitate și socializare prin joc, cu activități care stimulează limbajul și autonomia.', img: '/images/innababy-grupe-v6b.webp' },
              { name: 'Fluturași', age: '4 – 5 ani', emoji: '🦋', color: '#A8C9A0', accent: '#7DB87A', bg: 'linear-gradient(135deg, #F5FFF5 0%, #E0F5E0 100%)', text: 'Pregătire pentru grupa mare prin activități structurate, jocuri de rol și dezvoltarea abilităților sociale.', img: '/images/innababy-grupe-v6c.webp' },
              { name: 'Albinuțe', age: '5 – 6 ani', emoji: '🐝', color: '#FFD966', accent: '#FFC233', bg: 'linear-gradient(135deg, #FFFDF0 0%, #FFF5C0 100%)', text: 'Pregătire pentru școală cu activități educative complexe, dezvoltarea gândirii logice și a independenței.', img: '/images/innababy-grupe-v6d.webp' },
            ].map((g, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                  style={{ background: g.bg, border: `2px solid ${g.color}`, boxShadow: `0 6px 24px ${g.color}50` }}>
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <img src={g.img} alt={g.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    {/* Subtle overlay tint on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(160deg, ${g.color}30 0%, transparent 60%)` }} />
                    {/* Per-card emoji badge — top-right corner, agency-like */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-350 scale-75 group-hover:scale-100"
                      style={{ transformOrigin: 'top right' }}>
                      <div className="flex items-center justify-center rounded-2xl text-[22px] leading-none"
                        style={{
                          width: 48,
                          height: 48,
                          background: 'rgba(255,255,255,0.92)',
                          border: `2.5px solid ${g.color}`,
                          boxShadow: `0 6px 20px ${g.color}80, 0 2px 8px rgba(0,0,0,0.08)`,
                          backdropFilter: 'blur(6px)',
                        }}>
                        {g.emoji}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="font-black text-[#3D2E4A] mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: 26 }}>{g.name}</h3>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold mb-4"
                      style={{ background: `${g.color}40`, color: g.accent }}>
                      {g.age}
                    </div>
                    <p className="text-[#6B5D5D] text-[15px] leading-[1.7]">{g.text}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAME */}
      <section id="programe" className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #F8F5FF 0%, #FFF5F8 60%, #F5FFF8 100%)' }}>

        {/* Background blobs */}
        <BlobBg color="#C8B8D0" className="w-[500px] h-[500px] -top-20 -right-40" />
        <BlobBg color="#A8C9A0" className="w-[400px] h-[400px] bottom-0 -left-32" />
        <BlobBg color="#FFD966" className="w-[300px] h-[300px] top-1/2 left-1/2" />

        <FloatingElement className="top-24 left-16 animate-bounce" style={{ animationDuration: '3.8s' } as React.CSSProperties}>
          <Star size={24} color="#C8B8D0" />
        </FloatingElement>
        <FloatingElement className="bottom-24 right-20 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.6s' } as React.CSSProperties}>
          <Butterfly size={38} color="#FFD966" />
        </FloatingElement>
        <FloatingElement className="top-1/3 right-12 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1s' } as React.CSSProperties}>
          <Star size={14} color="#A8C9A0" />
        </FloatingElement>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">

          {/* Section header */}
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(168,201,160,0.22)', color: '#3D7A35', border: '1.5px dashed #7DB87A' }}>
              ⏰ Programele noastre
            </div>
            <h2 className="text-[#3D2E4A] mb-4 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              Programele Innababy
            </h2>
            <p className="font-black text-[#4A3A55] mb-2" style={{ fontSize: 'clamp(17px, 1.4vw, 20px)' }}>
              Program adaptat nevoilor fiecărei familii
            </p>
            <p className="text-[#7A6A8A] font-semibold" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
              Trei variante de program, aceeași grijă.
            </p>
          </RevealSection>

          {/* 3 Program cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-14">

            {/* ── Program SCURT ── */}
            <RevealSection delay={0}>
              <div className="group relative rounded-[28px] overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-400"
                style={{
                  background: 'white',
                  border: '2.5px solid #A8C9A0',
                  boxShadow: '0 6px 32px rgba(168,201,160,0.22)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(168,201,160,0.38), 0 0 0 3px rgba(168,201,160,0.25)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 32px rgba(168,201,160,0.22)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>

                {/* Card header — colored band */}
                <div className="relative px-7 pt-8 pb-6"
                  style={{ background: 'linear-gradient(135deg, #E8F8E8 0%, #D4EDD0 100%)' }}>
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-5 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'white', boxShadow: '0 4px 16px rgba(168,201,160,0.35)' }}>
                    ☀️
                  </div>
                  <h3 className="font-black text-[#2A4A28] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, letterSpacing: '-0.01em' }}>
                    Program scurt
                  </h3>
                  {/* TIME — big, clear, dominant */}
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black"
                    style={{ background: 'rgba(61,122,53,0.12)', color: '#2A6A25', fontSize: 20, border: '2px solid rgba(61,122,53,0.2)' }}>
                    <i className="ri-time-line text-lg"></i>
                    07:00 – 13:00
                  </div>
                  {/* Decorative stripe */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: 'linear-gradient(90deg, #A8C9A0, #7DB87A, #A8C9A0)' }} />
                </div>

                {/* Card body */}
                <div className="px-7 pt-6 pb-7 flex flex-col flex-1">
                  <p className="text-[#4A4040] leading-[1.75] mb-6 text-[15px]">
                    Ideal pentru adaptare treptată și un ritm mai lejer. Totul de care are nevoie copilul tău dimineața.
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {['Acomodare și primire cu grijă', 'Activități educative adaptate', 'Gustare de dimineață', 'Masă de prânz din bucătăria proprie'].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#4A4040] font-semibold">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(168,201,160,0.35)' }}>
                          <i className="ri-check-line text-[11px] font-black" style={{ color: '#3D7A35' }}></i>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom divider + label */}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1.5px dashed #A8C9A0' }}>
                    <i className="ri-leaf-line text-base" style={{ color: '#5A8A52' }}></i>
                    <span className="text-[13px] font-black text-[#5A8A52] uppercase tracking-wider">Adaptare & ritm lejer</span>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* ── Program LUNG — Popular ── */}
            <RevealSection delay={110}>
              <div className="group relative rounded-[28px] overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-400"
                style={{
                  background: 'white',
                  border: '2.5px solid #C8B8D0',
                  boxShadow: '0 10px 40px rgba(200,184,208,0.35)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 56px rgba(200,184,208,0.5), 0 0 0 3px rgba(200,184,208,0.3)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 40px rgba(200,184,208,0.35)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>

                {/* Popular badge */}
                <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full text-xs font-black text-white flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #9B8BA6, #7A6A8A)', boxShadow: '0 4px 16px rgba(155,139,166,0.5)' }}>
                  ⭐ Cel mai ales
                </div>

                {/* Card header */}
                <div className="relative px-7 pt-8 pb-6"
                  style={{ background: 'linear-gradient(135deg, #F0EBF8 0%, #E5DCF0 100%)' }}>
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-5 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'white', boxShadow: '0 4px 16px rgba(200,184,208,0.4)' }}>
                    🌤️
                  </div>
                  <h3 className="font-black text-[#3A2A4E] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, letterSpacing: '-0.01em' }}>
                    Program lung
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black"
                    style={{ background: 'rgba(122,106,138,0.14)', color: '#4A3A62', fontSize: 20, border: '2px solid rgba(122,106,138,0.25)' }}>
                    <i className="ri-time-line text-lg"></i>
                    07:00 – 16:30
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: 'linear-gradient(90deg, #C8B8D0, #9B8BA6, #C8B8D0)' }} />
                </div>

                {/* Card body */}
                <div className="px-7 pt-6 pb-7 flex flex-col flex-1">
                  <p className="text-[#4A4040] leading-[1.75] mb-6 text-[15px]">
                    Ideal pentru o zi completă, cu timp de odihnă pentru refacere. Ritmul perfect între activitate și relaxare.
                  </p>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {['Tot ce include Programul Scurt', 'Program de somn de după-amiază', 'Gustare de după-amiază', 'Activități de relaxare și joacă'].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#4A4040] font-semibold">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(200,184,208,0.4)' }}>
                          <i className="ri-check-line text-[11px] font-black" style={{ color: '#7A6A8A' }}></i>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1.5px dashed #C8B8D0' }}>
                    <i className="ri-moon-clear-line text-base" style={{ color: '#9B8BA6' }}></i>
                    <span className="text-[13px] font-black text-[#7A6A8A] uppercase tracking-wider">Zi completă & odihnă</span>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* ── Program PRELUNGIT ── */}
            <RevealSection delay={220}>
              <div className="group relative rounded-[28px] overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-400"
                style={{
                  background: 'white',
                  border: '2.5px solid #F4D9D0',
                  boxShadow: '0 6px 32px rgba(244,217,208,0.28)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(244,217,208,0.48), 0 0 0 3px rgba(244,217,208,0.3)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 32px rgba(244,217,208,0.28)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>

                {/* Card header */}
                <div className="relative px-7 pt-8 pb-6"
                  style={{ background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)' }}>
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-5 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: 'white', boxShadow: '0 4px 16px rgba(244,217,208,0.45)' }}>
                    🌙
                  </div>
                  <h3 className="font-black text-[#4A2820] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, letterSpacing: '-0.01em' }}>
                    Program prelungit
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black"
                    style={{ background: 'rgba(180,96,80,0.12)', color: '#8A3820', fontSize: 20, border: '2px solid rgba(180,96,80,0.2)' }}>
                    <i className="ri-time-line text-lg"></i>
                    07:00 – 19:00
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: 'linear-gradient(90deg, #F4D9D0, #E8A090, #F4D9D0)' }} />
                </div>

                {/* Card body */}
                <div className="px-7 pt-6 pb-7 flex flex-col flex-1">
                  <p className="text-[#4A4040] leading-[1.75] mb-6 text-[15px]">
                    Ideal pentru părinți cu program încărcat. Flexibilitate maximă fără compromisuri pentru copil.
                  </p>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {['Tot ce include Programul Lung', 'Activități opționale de după-amiază', 'Cină din bucătăria proprie', 'Joacă liberă și relaxare seara'].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#4A4040] font-semibold">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(244,217,208,0.5)' }}>
                          <i className="ri-check-line text-[11px] font-black" style={{ color: '#C87060' }}></i>
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1.5px dashed #F4D9D0' }}>
                    <i className="ri-heart-line text-base" style={{ color: '#C87060' }}></i>
                    <span className="text-[13px] font-black text-[#C87060] uppercase tracking-wider">Flexibilitate maximă</span>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Comparison note */}
          <RevealSection delay={300}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,184,208,0.4))' }} />
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-bold"
                style={{ background: 'rgba(200,184,208,0.14)', color: '#6A5A7A', border: '1.5px dashed rgba(200,184,208,0.6)' }}>
                <i className="ri-information-line"></i>
                Fiecare program superior îl include pe cel anterior
              </div>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(200,184,208,0.4), transparent)' }} />
            </div>
          </RevealSection>

          {/* CTA */}
          <RevealSection className="text-center" delay={350}>
            <button onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-full font-bold text-[16px] whitespace-nowrap cursor-pointer cta-primary"
              style={{ background: 'linear-gradient(135deg, #A8C9A0 0%, #7DB87A 100%)', boxShadow: '0 8px 30px rgba(168,201,160,0.45)', transition: 'all 0.3s ease' }}>
              <i className="ri-calendar-heart-line text-xl"></i>
              Programează o vizită
            </button>
          </RevealSection>

        </div>
      </section>

      {/* RECENZII */}
      <section className="relative py-24 lg:py-36 overflow-hidden" style={{ background: '#FFFBF7' }}>
        <BlobBg color="#FFD966" className="w-[450px] h-[450px] top-0 -left-32" />
        <BlobBg color="#F4D9D0" className="w-[350px] h-[350px] bottom-0 right-0" />
        <FloatingElement className="top-16 right-24 animate-bounce" style={{ animationDuration: '3.2s' } as React.CSSProperties}>
          <Star size={28} color="#FFD966" />
        </FloatingElement>
        {/* Micro accents */}
        <div className="absolute top-32 left-1/4 w-2 h-2 rounded-full pointer-events-none" style={{ background: '#C8B8D0', opacity: 0.2, animation: 'twinkleDot 3.6s ease-in-out infinite 0.7s' }}></div>
        <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 rounded-full pointer-events-none" style={{ background: '#A8C9A0', opacity: 0.2, animation: 'twinkleDot 2.5s ease-in-out infinite' }}></div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(255,217,102,0.2)', color: '#B8860B', border: '1.5px dashed #FFD966' }}>
              ⭐ Ce spun părinții
            </div>
            <h2 className="text-[#3D2E4A] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              Părinții ne recomandă cu încredere
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { text: 'Am ales Innababy pentru atmosfera caldă și pentru că am simțit de la prima vizită că aici copilul meu va fi în siguranță. Educatoarele sunt minunate, atente și răbdătoare. Fiul meu merge cu drag în fiecare dimineață!', name: 'Ana Maria P.', role: 'Mamă, grupa Ciupercuțe', initials: 'AM', color: '#F4D9D0', accent: '#C87060', rotate: '-2deg' },
              { text: 'Recomand cu toată încrederea! Programul este bine organizat, mâncarea este foarte bună și variată, iar comunicarea cu educatoarele este excelentă. Copiii sunt fericiți și asta contează cel mai mult.', name: 'Mihai C.', role: 'Tată, grupa Fluturași', initials: 'MC', color: '#A8C9A0', accent: '#5A8A52', rotate: '1.5deg' },
              { text: 'Suntem la Innababy de 3 ani și nu ne-am gândit niciodată să schimbăm. Copilul nostru s-a dezvoltat frumos, a învățat multe lucruri și s-a atașat de educatoare. Este ca o a doua familie pentru el.', name: 'Elena R.', role: 'Mamă, grupa Albinuțe', initials: 'ER', color: '#C8B8D0', accent: '#7A6A8A', rotate: '-1deg' },
            ].map((r, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="group cursor-pointer rounded-3xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col review-card"
                  style={{ background: 'white', border: `2px solid ${r.color}`, boxShadow: `0 6px 24px ${r.color}50`, transform: `rotate(${r.rotate})` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) translateY(-8px)'; (e.currentTarget as HTMLDivElement).style.borderColor = r.accent; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${r.rotate})`; (e.currentTarget as HTMLDivElement).style.borderColor = r.color; }}>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-xl">⭐</span>)}
                  </div>
                  <div className="text-6xl leading-none mb-2 font-black" style={{ color: r.color, fontFamily: 'Georgia, serif' }}>"</div>
                  <p className="text-[#6B5D5D] leading-[1.8] mb-6 flex-1 italic" style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>{r.text}</p>
                  <div className="flex items-center gap-4 pt-4" style={{ borderTop: `2px dashed ${r.color}` }}>
                    <div className="w-12 h-12 flex items-center justify-center rounded-full font-black text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${r.color}, ${r.accent})` }}>
                      {r.initials}
                    </div>
                    <div>
                      <div className="font-black text-[#3D2E4A] text-[15px]">{r.name}</div>
                      <div className="text-[13px] text-[#9B8BA6] font-semibold">{r.role}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section id="galerie" className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF5F8 0%, #F8F5FF 50%, #F5FFF8 100%)' }}>
        <BlobBg color="#C8B8D0" className="w-[400px] h-[400px] top-0 right-0" />
        <BlobBg color="#A8C9A0" className="w-[350px] h-[350px] bottom-0 left-0" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(200,184,208,0.2)', color: '#9B8BA6', border: '1.5px dashed #C8B8D0' }}>
              📸 Galerie foto
            </div>
            <h2 className="text-[#3D2E4A] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              Zâmbete, joacă și amintiri frumoase
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <RevealSection className="col-span-2 row-span-2" delay={0}>
              <div className="group cursor-pointer h-full relative overflow-hidden gallery-card"
                style={{ borderRadius: '40% 70% 60% 30% / 30% 60% 70% 40%', minHeight: 320, border: '4px solid white', transition: 'all 0.4s ease' }}>
                <img src="/images/innababy-gal-v6-1.webp"
                  alt="Copii jucându-se la Innababy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" style={{ minHeight: 320 }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(200,255,255,0.2)' }}>
                  <div className="text-4xl">🌟</div>
                </div>
              </div>
            </RevealSection>

            {[
              { src: '/images/innababy-gal-v6-2.webp', alt: 'Activități creative', emoji: '🎨', shape: '30% 70% 60% 40% / 50% 40% 60% 50%', borderHover: '#C8B8D0' },
              { src: '/images/innababy-gal-v6-3.webp', alt: 'Masa la Innababy', emoji: '🍎', shape: '60% 40% 30% 70% / 40% 60% 50% 50%', borderHover: '#A8C9A0' },
              { src: '/images/innababy-gal-v6-4.webp', alt: 'Joacă în aer liber', emoji: '🌿', shape: '50% 50% 40% 60% / 60% 40% 55% 45%', borderHover: '#F4D9D0' },
              { src: '/images/innababy-gal-v6-5.webp', alt: 'Colțul de lectură', emoji: '📚', shape: '40% 60% 55% 45% / 45% 55% 40% 60%', borderHover: '#FFD966' },
            ].map((img, i) => (
              <RevealSection key={i} delay={i * 80 + 100}>
                <div className="group cursor-pointer relative overflow-hidden gallery-card"
                  style={{ borderRadius: img.shape, border: '3px solid white', height: 200, transition: 'all 0.4s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = img.borderHover; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${img.borderHover}60`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'white'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(200,201,160,0.3)'; }}>
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <div className="text-3xl">{img.emoji}</div>
                  </div>
                </div>
              </RevealSection>
            ))}

            <RevealSection className="col-span-2" delay={400}>
              <div className="group cursor-pointer relative overflow-hidden gallery-card"
                style={{ borderRadius: '20% 30% 25% 35% / 35% 25% 30% 20%', border: '3px solid white', height: 200, transition: 'all 0.4s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#F4D9D0'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(244,217,208,0.6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'white'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 36px rgba(244,217,208,0.4)'; }}>
                <img src="/images/innababy-gal-v6-6.webp"
                  alt="Sala de clasă Innababy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="text-3xl">🏫</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 lg:py-36 overflow-hidden" style={{ background: '#FFFBF7' }}>
        <BlobBg color="#F4D9D0" className="w-[500px] h-[500px] top-0 -right-40" />
        <BlobBg color="#C8B8D0" className="w-[350px] h-[350px] bottom-0 -left-20" />
        <FloatingElement className="top-20 left-16 animate-bounce" style={{ animationDuration: '3.5s' } as React.CSSProperties}>
          <Star size={22} color="#FFD966" />
        </FloatingElement>

        <div className="max-w-[900px] mx-auto px-6 lg:px-10 relative z-10">
          <RevealSection className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: 'rgba(168,201,160,0.22)', color: '#3D7A35', border: '1.5px dashed #7DB87A' }}>
              ❓ Întrebări frecvente
            </div>
            <h2 className="text-[#3D2E4A] leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 700 }}>
              Răspunsuri la întrebările tale
            </h2>
          </RevealSection>

          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <RevealSection key={i} delay={i * 60}>
                <div className="rounded-3xl overflow-hidden transition-all duration-300"
                  style={{ background: openFaq === i ? 'linear-gradient(135deg, #FFF5F3 0%, #F8F5FF 100%)' : 'white', border: `2px solid ${openFaq === i ? '#C8B8D0' : '#F4D9D0'}`, boxShadow: openFaq === i ? '0 8px 32px rgba(200,184,208,0.3)' : '0 2px 12px rgba(244,217,208,0.2)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 lg:px-8 py-5 lg:py-6 flex items-center justify-between text-left cursor-pointer">
                    <h3 className="font-black text-[#3D2E4A] pr-4" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)' }}>{faq.question}</h3>
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                      style={{ background: openFaq === i ? 'linear-gradient(135deg, #C8B8D0, #A8C9A0)' : '#F4D9D0' }}>
                      <i className={`ri-arrow-down-s-line text-xl ${openFaq === i ? 'text-white' : 'text-[#9B8BA6]'}`}></i>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-64' : 'max-h-0'}`}>
                    <div className="px-6 lg:px-8 pb-6">
                      <p className="text-[#6B5D5D] leading-[1.75]" style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12" delay={400}>
            <button onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-full font-black text-[16px] whitespace-nowrap cursor-pointer cta-primary"
              style={{ background: 'linear-gradient(135deg, #C8B8D0 0%, #A8C9A0 100%)', boxShadow: '0 8px 30px rgba(168,201,160,0.45)', transition: 'all 0.3s ease' }}>
              <i className="ri-calendar-heart-line text-xl"></i>
              Programează o vizită
            </button>
          </RevealSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #5A4A63 0%, #3D2E4A 50%, #2E4A3D 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: '#C8B8D0', filter: 'blur(60px)' }}></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-10" style={{ background: '#A8C9A0', filter: 'blur(80px)' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10" style={{ background: '#FFD966', filter: 'blur(100px)' }}></div>
        </div>
        <FloatingElement className="top-16 left-16 animate-bounce opacity-40" style={{ animationDuration: '3s' } as React.CSSProperties}>
          <Star size={30} color="#FFD966" />
        </FloatingElement>
        <FloatingElement className="top-20 right-20 animate-bounce opacity-40" style={{ animationDuration: '4s', animationDelay: '0.5s' } as React.CSSProperties}>
          <Butterfly size={44} color="#C8B8D0" />
        </FloatingElement>
        <FloatingElement className="bottom-20 right-1/4 animate-bounce opacity-40" style={{ animationDuration: '2.8s', animationDelay: '0.3s' } as React.CSSProperties}>
          <Star size={20} color="#A8C9A0" />
        </FloatingElement>

        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px dashed rgba(255,255,255,0.4)' }}>
              🏫 Vino să ne cunoști
            </div>
            <h2 className="text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 700 }}>
              Vino să descoperi Innababy în realitate
            </h2>
            <p className="leading-[1.8] mb-12 max-w-[680px] mx-auto" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(16px, 1.3vw, 19px)' }}>
              Vino să descoperi Innababy în realitate și să vezi cum arată o zi obișnuită pentru copilul tău într-un mediu sigur și prietenos.
            </p>
            <button onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-black text-[17px] whitespace-nowrap cursor-pointer cta-white"
              style={{ background: 'white', color: '#5A4A63', boxShadow: '0 12px 40px rgba(0,0,0,0.3)', transition: 'all 0.3s ease' }}>
              <i className="ri-calendar-heart-line text-xl"></i>
              Programează o vizită
            </button>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="relative py-16 lg:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF5F0 0%, #FFF0F8 50%, #F5FFF0 100%)' }}>
        <BlobBg color="#F4D9D0" className="w-[400px] h-[400px] top-0 -left-20" />
        <BlobBg color="#A8C9A0" className="w-[350px] h-[350px] bottom-0 -right-16" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div>
              <button onClick={scrollToTop} className="cursor-pointer mb-6 block">
                <img src="/images/fb3730316a70.webp" alt="Innababy Logo" className="h-14 w-auto object-contain" />
              </button>
              <p className="text-[#6B5D5D] leading-[1.75] mb-6 text-[15px]">
                Grădiniță și creșă privată acreditată în Sectorul 1, București. Un loc în care copilăria este trăită cu grijă, siguranță și atenție.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/innababy" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #C8B8D0, #9B8BA6)', color: 'white' }}>
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a href="https://wa.me/40XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #A8C9A0, #7DB87A)', color: 'white' }}>
                  <i className="ri-whatsapp-fill text-lg"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-black text-[#3D2E4A] mb-6 text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Contact</h4>
              <div className="space-y-4 text-[#6B5D5D] text-[15px]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(244,217,208,0.5)' }}>
                    <i className="ri-map-pin-fill text-[#C87060]"></i>
                  </div>
                  <a href="https://www.google.com/maps/search/?api=1&query=Strada+Timi%C8%19ului+3,+Sectorul+1,+Bucure%C8%99ti"
                    target="_blank" rel="noopener noreferrer" className="hover:text-[#5A4A63] transition-colors duration-300 leading-relaxed">
                    Strada Timișului 3, Sectorul 1, București
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(200,184,208,0.3)' }}>
                    <i className="ri-phone-fill text-[#5A8A52]"></i>
                  </div>
                  <a href="tel:+40XXXXXXXXX" className="hover:text-[#5A4A63] transition-colors duration-300">+40 XXX XXX XXX</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(200,184,208,0.3)' }}>
                    <i className="ri-mail-fill text-[#7A6A8A]"></i>
                  </div>
                  <a href="mailto:contact@innababy.ro" className="hover:text-[#5A4A63] transition-colors duration-300">contact@innababy.ro</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-black text-[#3D2E4A] mb-6 text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Program</h4>
              <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(200,184,208,0.15)', border: '2px dashed #C8B8D0' }}>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B5D5D] font-semibold">Luni – Vineri</span>
                  <span className="font-black text-[#5A4A63]">7:00 – 19:00</span>
                </div>
              </div>
              <button onClick={() => setShowBookingModal(true)}
                className="w-full text-white py-3 rounded-full font-bold cursor-pointer whitespace-nowrap cta-glow"
                style={{ background: 'linear-gradient(135deg, #C8B8D0 0%, #A8C9A0 100%)', boxShadow: '0 6px 20px rgba(200,184,208,0.4)', transition: 'all 0.3s ease' }}>
                Programează o vizită
              </button>
            </div>
          </div>

          <div className="mb-12 rounded-3xl overflow-hidden" style={{ border: '3px solid white' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.8!2d26.0!3d44.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI3JzAwLjAiTiAyNsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sro!4v1234567890"
              width="100%" height="360" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Locația Innababy pe Google Maps">
            </iframe>
          </div>

          <div style={{ borderTop: '2px dashed rgba(200,184,208,0.5)' }} className="pt-8">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-6 text-sm text-[#9B8BA6]">
              {[['privacy', 'Politica de Confidențialitate'], ['cookies', 'Politica Cookies'], ['terms', 'Termeni și Condiții']].map(([type, label]) => (
                <button key={type} onClick={() => openLegal(type as 'privacy' | 'cookies' | 'terms')}
                  className="hover:text-[#5A4A63] transition-colors duration-300 font-semibold cursor-pointer">
                  {label}
                </button>
              ))}
            </div>
            <div className="text-center text-[#9B8BA6] text-sm space-y-2">
              <p className="font-semibold">© {new Date().getFullYear()} Innababy. Toate drepturile rezervate.</p>
              <p>Website creat de{' '}
                <a href="https://websiteon.ro/" target="_blank" rel="noopener noreferrer"
                  className="text-[#C8B8D0] hover:text-[#9B8BA6] transition-colors duration-300 font-bold underline">
                  WebsiteON
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(61,46,74,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowBookingModal(false)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{ background: 'linear-gradient(160deg, #FFFBF7 0%, #FFF5F8 100%)', border: '3px solid #F4D9D0' }}
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 px-8 py-6 flex items-center justify-between rounded-t-3xl"
              style={{ background: 'rgba(255,251,247,0.95)', borderBottom: '2px dashed #F4D9D0', backdropFilter: 'blur(8px)' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📅</span>
                <h3 className="font-black text-[#3D2E4A] text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>Programează o vizită</h3>
              </div>
              <button onClick={() => setShowBookingModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ background: '#F4D9D0' }}>
                <i className="ri-close-line text-xl text-[#5A4A63]"></i>
              </button>
            </div>
            <div className="p-8">
              <p className="text-[#6B5D5D] mb-8 leading-relaxed text-[15px]">
                Completați formularul de mai jos și vă vom contacta în cel mai scurt timp pentru a confirma vizita.
              </p>

              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h4 className="font-black text-[#3D2E4A] text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Mulțumim!</h4>
                  <p className="text-[#6B5D5D]">Vă vom contacta în curând pentru a confirma vizita.</p>
                  <button onClick={() => { setShowBookingModal(false); setFormStatus('idle'); }}
                    className="mt-6 px-8 py-3 rounded-full font-bold text-white cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #A8C9A0, #7DB87A)' }}>
                    Închide
                  </button>
                </div>
              ) : (
                <form id="booking-form-innababy" data-readdy-form action={FORM_URL} method="POST" onSubmit={handleFormSubmit} className="space-y-5">
                  <div style={{ position: 'absolute', left: '-9999px' }}>
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  {[
                    { id: 'nume', label: 'Nume complet', type: 'text', name: 'nume', placeholder: 'Introduceți numele dumneavoastră' },
                    { id: 'telefon', label: 'Telefon', type: 'tel', name: 'telefon', placeholder: '07XX XXX XXX' },
                    { id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'exemplu@email.com' },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-black text-[#5A4A63] mb-2">{field.label} *</label>
                      <input type={field.type} id={field.id} name={field.name} required placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-2xl text-sm transition-all duration-300 outline-none"
                        style={{ border: '2px solid #F4D9D0', background: 'white' }}
                        onFocus={e => { e.currentTarget.style.borderColor = '#C8B8D0'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(200,184,208,0.2)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#F4D9D0'; e.currentTarget.style.boxShadow = 'none'; }} />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="mesaj" className="block text-sm font-black text-[#5A4A63] mb-2">Mesaj (opțional)</label>
                    <textarea id="mesaj" name="mesaj" rows={4} maxLength={500} placeholder="Întrebări sau mențiuni speciale..."
                      className="w-full px-4 py-3 rounded-2xl text-sm transition-all duration-300 outline-none resize-none"
                      style={{ border: '2px solid #F4D9D0', background: 'white' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#C8B8D0'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(200,184,208,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#F4D9D0'; e.currentTarget.style.boxShadow = 'none'; }} />
                    <div className="text-xs text-[#9B8BA6] mt-1">Maxim 500 caractere</div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(200,184,208,0.1)', border: '1.5px dashed #C8B8D0' }}>
                    <input type="checkbox" id="gdpr_consent" name="gdpr_consent" required className="mt-1 w-4 h-4 cursor-pointer" style={{ accentColor: '#C8B8D0' }} />
                    <label htmlFor="gdpr_consent" className="text-sm text-[#6B5D5D] leading-relaxed cursor-pointer">
                      Sunt de acord cu prelucrarea datelor personale conform{' '}
                      <button type="button" onClick={() => openLegal('privacy')} className="font-bold underline cursor-pointer" style={{ color: '#C8B8D0' }}>Politicii de Confidențialitate</button>
                      {' '}și{' '}
                      <button type="button" onClick={() => openLegal('terms')} className="font-bold underline cursor-pointer" style={{ color: '#C8B8D0' }}>Termenilor și Condițiilor</button>. *
                    </label>
                  </div>

                  {formStatus === 'error' && (
                    <div className="p-4 rounded-2xl text-sm font-semibold" style={{ background: '#FFE8E0', color: '#C87060', border: '1.5px solid #F4D9D0' }}>
                      A apărut o eroare. Vă rugăm să încercați din nou.
                    </div>
                  )}

                  <button type="submit" disabled={formStatus === 'sending'}
                    className="w-full text-white py-4 rounded-full font-black text-[16px] cursor-pointer whitespace-nowrap cta-primary"
                    style={{ background: 'linear-gradient(135deg, #A8C9A0 0%, #7DB87A 100%)', boxShadow: '0 6px 24px rgba(168,201,160,0.5)', opacity: formStatus === 'sending' ? 0.7 : 1, transition: 'all 0.3s ease' }}>
                    {formStatus === 'sending' ? '⏳ Se trimite...' : '✨ Trimite cererea'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LEGAL MODAL */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(61,46,74,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowLegalModal(false)}>
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{ background: '#FFFBF7', border: '3px solid #F4D9D0' }}
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 px-8 py-6 flex items-center justify-between rounded-t-3xl"
              style={{ background: 'rgba(255,251,247,0.97)', borderBottom: '2px dashed #F4D9D0', backdropFilter: 'blur(8px)' }}>
              <h3 className="font-black text-[#3D2E4A] text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {legalContent === 'privacy' && '🔒 Politica de Confidențialitate'}
                {legalContent === 'cookies' && '🍪 Politica Cookies'}
                {legalContent === 'terms' && '📋 Termeni și Condiții'}
              </h3>
              <button onClick={() => setShowLegalModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" style={{ background: '#F4D9D0' }}>
                <i className="ri-close-line text-xl text-[#5A4A63]"></i>
              </button>
            </div>
            <div className="p-8 space-y-6 text-[#6B5D5D] leading-relaxed text-[15px]">
              <p><strong>Data ultimei actualizări:</strong> {new Date().toLocaleDateString('ro-RO')}</p>
              {legalContent === 'privacy' && (<>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">1. Introducere</h4>
                <p>Innababy respectă confidențialitatea datelor dumneavoastră personale și se angajează să le protejeze în conformitate cu GDPR și legislația română aplicabilă.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">2. Date colectate</h4>
                <p>Colectăm: date de identificare (nume, prenume), date de contact (email, telefon), mesaje trimise prin formulare.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">3. Scopul prelucrării</h4>
                <p>Programarea vizitelor, comunicarea cu părinții interesați și răspunsul la întrebări.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">4. Drepturile dumneavoastră</h4>
                <p>Aveți dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Puteți depune plângere la ANSPDCP.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">5. Contact</h4>
                <p>contact@innababy.ro</p>
              </>)}
              {legalContent === 'cookies' && (<>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">1. Ce sunt cookie-urile?</h4>
                <p>Fișiere text mici stocate pe dispozitivul dumneavoastră pentru funcționarea corectă a site-ului.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">2. Ce cookie-uri folosim?</h4>
                <p>Exclusiv cookie-uri strict necesare și funcționale. NU folosim cookie-uri de analiză, marketing sau tracking.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">3. Contact</h4>
                <p>contact@innababy.ro</p>
              </>)}
              {legalContent === 'terms' && (<>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">1. Acceptarea termenilor</h4>
                <p>Prin accesarea site-ului, acceptați acești termeni și condiții.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">2. Proprietate intelectuală</h4>
                <p>Tot conținutul (texte, imagini, logo-uri, design) este proprietatea Innababy și protejat de legile drepturilor de autor.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">3. Legea aplicabilă</h4>
                <p>Acești termeni sunt guvernați de legile României. Litigiile vor fi soluționate de instanțele din București.</p>
                <h4 className="font-black text-[#3D2E4A] text-lg mt-6">4. Contact</h4>
                <p>contact@innababy.ro</p>
              </>)}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        /* ─── Prevent horizontal scroll globally ─── */
        html, body {
          overflow-x: hidden;
          max-width: 100%;
        }

        /* ─── Floating orb animation ─── */
        @keyframes floatOrb {
          0%, 100% { transform: translateY(-50%) translateX(0px) rotate(0deg); }
          25%       { transform: translateY(calc(-50% - 14px)) translateX(6px) rotate(1.5deg); }
          50%       { transform: translateY(calc(-50% - 8px)) translateX(-4px) rotate(-1deg); }
          75%       { transform: translateY(calc(-50% - 18px)) translateX(3px) rotate(2deg); }
        }

        /* ─── Twinkling dots ─── */
        @keyframes twinkleDot {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50%       { opacity: 0.45; transform: scale(1.3); }
        }

        /* ─── CTA primary — green glow ─── */
        .cta-primary:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(168,201,160,0.5), 0 0 18px rgba(168,201,160,0.35) !important;
        }

        /* ─── CTA glow — lavender/green ─── */
        .cta-glow:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 22px rgba(200,184,208,0.55), 0 0 14px rgba(200,184,208,0.3) !important;
        }

        /* ─── CTA white dark bg ─── */
        .cta-white:hover {
          transform: scale(1.04);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35), 0 0 20px rgba(255,255,255,0.2) !important;
        }

        /* ─── Gallery card hover box shadow ─── */
        .gallery-card {
          box-shadow: 0 8px 28px rgba(168,201,160,0.25);
        }
        .gallery-card:hover {
          box-shadow: 0 12px 36px rgba(200,184,208,0.45);
        }

        /* ─── Mobile polish ─── */
        @media (max-width: 1023px) {
          /* Remove card rotations on mobile — prevent overflow */
          .review-card {
            transform: none !important;
          }

          /* Hero headline — no overflow */
          h1 {
            max-width: 100%;
            word-break: keep-all;
            overflow-wrap: break-word;
          }

          /* Tighter vertical rhythm on mobile */
          section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }

          /* Consistent padding on mobile */
          .max-w-\\[1280px\\] {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Buttons never overflow */
          button, a {
            max-width: 100%;
          }

          /* Modal max width on small screens */
          .max-w-2xl {
            max-width: calc(100vw - 2rem) !important;
          }
          .max-w-4xl {
            max-width: calc(100vw - 2rem) !important;
          }

          /* Stats row — wrap on very small screens */
          .stats-row {
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          /* Nav CTA on mobile — full width */
          nav button.cta-glow {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          /* Extra small phones — tighter headlines */
          h2 {
            font-size: clamp(28px, 8vw, 40px) !important;
          }

          /* Single column gallery on xs */
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }

          /* Booking form inputs */
          input, textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
