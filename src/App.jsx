import { useEffect, useRef, useState } from "react";
import { Search, MessageSquare, Layers, Activity, LayoutDashboard, MapPin, Star, Globe } from "lucide-react";
import glowImg from "./assets/glow.png";
import travelerImg from "./assets/traveler.png";
import ExplorePage  from "./pages/ExplorePage";
import DetailPage   from "./pages/DetailPage";
import BusinessPage from "./pages/BusinessPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";
import { PLACES_DATA } from './data/places';

/* ── Animated sentiment bar ── */
function SentimentBar({ label, pct, type, animate }) {
  return (
    <div className="sentiment-row">
      <span className="sentiment-label">{label}</span>
      <div className="sentiment-bar-bg">
        <div className={`sentiment-bar-fill ${type}`} style={{ width: animate ? `${pct}%` : "0%" }} />
      </div>
      <span className={`sentiment-pct ${type}`}>{pct}%</span>
    </div>
  );
}

function AnimatedCounter({ end, suffix = "", duration = 1400, format = value => value.toString(), play = false }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) {
      setValue(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, play]);

  return (
    <div className="stat-number" aria-label={`${format(end)}${suffix}`}>
      {format(value)}<span className="coral">{suffix}</span>
    </div>
  );
}

// 🟢 ปรับเปลี่ยนเนื้อหาของขั้นตอนตามโครงสร้างภาษาที่เลือกใช้งาน
const getSteps = (lang) => [
  { 
    icon: <MessageSquare size={18} />, 
    title: lang === 'en' ? "Collect Reviews" : "รวบรวมรีวิว", 
    desc: lang === 'en' ? "Automatically aggregate reviews from TripAdvisor, Google, Booking.com, and Agoda." : "รวบรวมข้อมูลรีวิวจากแหล่งท่องเที่ยวชั้นนำ เช่น TripAdvisor, Google, Booking.com และ Agoda โดยอัตโนมัติ" 
  },
  { 
    icon: <Layers size={18} />, 
    title: lang === 'en' ? "NLP Processing" : "ประมวลผลด้วย NLP", 
    desc: lang === 'en' ? "Process text using Natural Language Processing — clean, tokenize, and prepare raw review data." : "ประมวลผลข้อความด้วยระบบ Natural Language Processing ทั้งการคลีนข้อมูล จัดหมวดคำ และเตรียมข้อมูลดิบ" 
  },
  { 
    icon: <Activity size={18} />, 
    title: lang === 'en' ? "Sentiment Analysis" : "วิเคราะห์ความรู้สึก", 
    desc: lang === 'en' ? "Classify each review as Positive, Neutral, or Negative using a Lexicon-Based Sentiment Analysis approach." : "จำแนกอารมณ์ของรีวิวแต่ละชิ้นออกเป็น แง่บวก, ทั่วไป หรือแง่ลบ โดยใช้โมเดลวิเคราะห์ข้อมูลฐานพจนานุกรมคำศัพท์ (Lexicon-Based)" 
  },
  { 
    icon: <LayoutDashboard size={18} />, 
    title: lang === 'en' ? "Actionable Insights" : "ข้อมูลเชิงลึกพร้อมใช้", 
    desc: lang === 'en' ? "Display results in an easy-to-understand dashboard with strategic recommendations for improvement." : "แสดงผลลัพธ์ผ่านแดชบอร์ดที่เข้าใจง่าย พร้อมข้อเสนอแนะเชิงกลยุทธ์เพื่อนำไปพัฒนาต่อยอดได้ทันที" 
  },
];

/* ─────────────────── HOME PAGE ─────────────────── */
function HomePage({ onExplore, onBusiness, lang }) {
  const statsRef = useRef(null);
  const analysisRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [analysisParallax, setAnalysisParallax] = useState(0);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = analysisRef.current;
    if (!node) return;

    let frameId = 0;

    const updateParallax = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const viewportCenter = viewportHeight * 0.55;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const range = viewportHeight * 0.9;
      const nextOffset = Math.max(-28, Math.min(28, (-distance / range) * 28));
      setAnalysisParallax(nextOffset);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const translatedSteps = getSteps(lang);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <div className="hero-glow-wrap">
            <img src={glowImg} alt="" className="hero-glow-img" aria-hidden="true" />
            <h1>
              {lang === 'en' ? <>Transform Reviews<br />Into Actionable<br /><span className="grad-text">Insights</span></> : <>เปลี่ยนทุกความคิดเห็น<br />เป็นข้อมูลอินไซต์<br /><span className="grad-text">ที่ใช้งานได้จริง</span></>}
            </h1>
          </div>
          <p className="hero-subtitle">
            {lang === 'en' 
              ? "AI-powered tourism intelligence platform based on NLP and Sentiment Analysis. Helping tourists make better decisions and helping businesses understand their customers."
              : "แพลตฟอร์มวิเคราะห์ข้อมูลอัจฉริยะเพื่อการท่องเที่ยว ขับเคลื่อนด้วยระบบ NLP และการวิเคราะห์ความรู้สึก ช่วยให้นักท่องเที่ยวตัดสินใจได้ดีขึ้น และช่วยให้ภาคธุรกิจเข้าใจลูกค้าได้อย่างลึกซึ้ง"}
          </p>
          <div className="hero-ctas">
            <button className="btn-coral-lg" onClick={onExplore}>
              <Search size={16} /> {lang === 'en' ? "Explore Destinations" : "ค้นหาสถานที่ท่องเที่ยว"}
            </button>
            <button className="btn-outline-lg" onClick={onBusiness}>
              {lang === 'en' ? "Business Dashboard" : "แดชบอร์ดสำหรับธุรกิจ"}
            </button>
          </div>
          {/* ── Stats ── */}
          <section className="stats-section" ref={statsRef}>
            <div className="stats-grid">
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={50} suffix="K+" play={statsVisible} />
                <div className="stat-label">{lang === 'en' ? "Reviews analyzed" : "รีวิวที่ถูกวิเคราะห์"}</div>
              </div>
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={120} suffix="+" play={statsVisible} />
                <div className="stat-label">{lang === 'en' ? "Destinations" : "สถานที่ท่องเที่ยว"}</div>
              </div>
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={92} suffix="%" play={statsVisible} />
                <div className="stat-label">{lang === 'en' ? "Accuracy rate" : "อัตราความแม่นยำ"}</div>
              </div>
            </div>
          </section>
        </div>
        <div className="hero-visual">
          <img src={travelerImg} alt="Traveler running with luggage" className="hero-traveler-img" />
        </div>
      </section>

      <section className="stats-analysis-layout">
        <section
          className="analysis-section"
          ref={analysisRef}
          style={{ '--analysis-offset': `${analysisParallax}px` }}
        >
          <div className="analysis-card">
            <div className="card-header">
              <div>
                <div className="live-label">{lang === 'en' ? "Live Analysis" : "การวิเคราะห์สด"}</div>
                <div className="card-title">{lang === 'en' ? "Khao Yai National Park" : "อุทยานแห่งชาติเขาใหญ่"}</div>
                <div className="detail-loc" style={{ marginBottom: -5, marginTop: 4 ,fontSize: 13, fontWeight: 400, color: 'var(--gray-600)' }}>
                  <MapPin size={12} /> {lang === 'en' ? "Nakhon Ratchasima" : "นครราชสีมา"}
                </div>
              </div>
              <div className="card-header-right">
                <span className="live-dot" />
                <span className="live-text">{lang === 'en' ? "Real‑time" : "เรียลไทม์"}</span>
              </div>
            </div>
            
            <div className="sentiment-bars">
              <SentimentBar label={lang === 'en' ? "Positive" : "แง่บวก"} pct={76} type="positive" animate={true} />
              <SentimentBar label={lang === 'en' ? "Neutral" : "ทั่วไป"}  pct={14} type="neutral"  animate={true} />
              <SentimentBar label={lang === 'en' ? "Negative" : "แง่ลบ"} pct={10}  type="negative" animate={true} />
            </div>
            
            <div className="review-chip" style={{ marginTop: 0 }}>
              <Star size={13} fill="#F59E0B" stroke="none" />
              {lang === 'en' ? <>Based on <strong>12,035</strong> foreign tourist reviews</> : <>อ้างอิงจากรีวิวนักท่องเที่ยวต่างชาติ <strong>12,035</strong> รายการ</>}
            </div>
            
            <div className="tags">
              <span className="tag pos-tag">{lang === 'en' ? "rich biodiversity" : "ความหลากหลายทางชีวภาพสูง"}</span>
              <span className="tag neu-tag">{lang === 'en' ? "basic visitor amenities" : "สิ่งอำนวยความสะดวกขั้นพื้นฐาน"}</span>
              <span className="tag neg-tag">{lang === 'en' ? "dual pricing system" : "การเก็บค่าบริการสองมาตรฐาน"}</span>
            </div>
            
            <div className="ai-box">
              <div className="ai-box-label">{lang === 'en' ? "✦ AI Key Insight" : "✦ สรุปอินไซต์หลักโดย AI"}</div>
              <div className="ai-box-text">
                {lang === 'en' ? (
                  "Foreign tourists highly praise Khao Yai's natural beauty and rich biodiversity. However, text analysis reports clear structural friction regarding the dual pricing entry fee system and inadequate public transportation networks within the reserve boundaries."
                ) : (
                  "นักท่องเที่ยวต่างชาติชื่นชมความงามตามธรรมชาติและความหลากหลายทางชีวภาพของเขาใหญ่เป็นอย่างมาก อย่างไรก็ตาม ผลการวิเคราะห์ข้อความชี้ให้เห็นถึงปัญหาเชิงโครงสร้างที่ชัดเจนในเรื่องระบบการเก็บค่าเข้าสองมาตรฐาน (Dual Pricing) และเครือข่ายระบบขนส่งสาธารณะที่ไม่เพียงพอภายในพื้นที่อุทยาน"
                )}
              </div>
            </div>
            <div className="source-pills">
              {["TripAdvisor","Google","Booking.com","Agoda"].map(s => (
                <span key={s} className="source-pill">{s}</span>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="how-section">
        <div className="section-badge-wrap">
          <span className="section-badge">{lang === 'en' ? "HOW IT WORKS" : "ขั้นตอนการทำงาน"}</span>
        </div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          <span className="grad-text">{lang === 'en' ? "From Raw Reviews to Actionable Insights" : "จากรีวิวดิบสู่ข้อมูลเชิงลึกพร้อมใช้งาน"}</span>
        </h2>
        <div className="steps-grid">
          {translatedSteps.map(s => (
            <div className="step-card" key={s.title}>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="research-section">
        <div className="research-box">
          <div className="research-badge">{lang === 'en' ? "Academic Foundation" : "ฐานงานวิจัยรองรับ"}</div>
          <h2 className="research-title">
            <span className="grad-text">{lang === 'en' ? "Built on Proven Research" : "ต่อยอดบนงานวิจัยที่พิสูจน์แล้ว"}</span>
          </h2>
          <div className="research-paper-title">
            Analysis of Foreign Tourist Review by Natural Language Processing and a Lexicon-Based Sentiment Analysis Tool
          </div>
          <p className="research-desc">
            {lang === 'en'
              ? "TravelSense AI is built upon academic research applying NLP and Lexicon-Based Sentiment Analysis to analyze foreign tourist reviews — combining scientific rigor with a practical, user-friendly experience."
              : "TravelSense AI พัฒนาขึ้นโดยอ้างอิงจากงานวิจัยเชิงวิชาการที่ประยุกต์ใช้ระบบ NLP และเครื่องมือวิเคราะห์ความรู้สึกฐานคลังคำศัพท์ (Lexicon-Based) เพื่อประเมินรีวิวของนักท่องเที่ยวชาวต่างชาติ ผสมผสานความแม่นยำทางวิทยาศาสตร์เข้ากับประสบการณ์ใช้งานที่ง่าย"}
          </p>
          <div className="research-tags">
            {["Natural Language Processing","Lexicon-Based Sentiment","Tourism Analytics","Foreign Tourist Reviews"].map(t => (
              <span key={t} className="research-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">
          <span className="grad-text">{lang === 'en' ? "Ready to Analyze Your Reviews?" : "พร้อมเริ่มต้นวิเคราะห์รีวิวของคุณหรือยัง?"}</span>
        </h2>
        <p className="cta-sub">{lang === 'en' ? "Unlock insights from over 50,000 tourist reviews — Free 14-day trial" : "เปิดล็อกข้อมูลอินไซต์จากรีวิวนักท่องเที่ยวกว่า 50,000 รายการ — ทดลองใช้ฟรี 14 วัน"}</p>
        <div className="cta-btns">
          <button className="btn-coral-lg" onClick={onExplore}>
            <Search size={16} /> {lang === 'en' ? "Explore Destinations" : "ค้นหาสถานที่ท่องเที่ยว"}
          </button>
          <button className="btn-outline-coral" onClick={onBusiness}>{lang === 'en' ? "Business Plan" : "แผนธุรกิจ"}</button>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">Logo</span>
        <span className="footer-copy">© 2024 TravelSense AI · Based on NLP & Lexicon-Based Sentiment Analysis Research</span>
      </footer>
    </>
  );
}

/* ─────────────────── ROOT ─────────────────── */
export default function App() {
  const [page, setPage] = useState(() => sessionStorage.getItem('page') || 'home');
  const [place, setPlace] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);
  
  // 🟢 เพิ่ม State ควบคุมภาษาของระบบ (EN เป็นค่าเริ่มต้น)
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'en');

  function go(p) {
    sessionStorage.setItem('page', p);
    setPage(p);
    window.scrollTo(0, 0);
  }

  // ฟังก์ชันสลับภาษา
  function toggleLang(selectedLang) {
    localStorage.setItem('app_lang', selectedLang);
    setLang(selectedLang);
  }

if (page === 'dashboard') {
  return (
    <DashboardPage
      onLogout={() => go('home')}
      onGoPlans={() => go('business')}
      currentLang={lang} // เพิ่มคุณสมบัตินี้เข้าไปเพื่อให้เปลี่ยนภาษาตามหน้าหลักได้ครับ
    />
  );
}

  return (
    <>
      {/* ── Persistent Navbar ── */}
      <nav className="navbar">
        <span
          className="nav-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => go('home')}
        >
          Logo
        </span>
        <ul className="nav-links">
          <li>
            <a href="#" onClick={e => { e.preventDefault(); go('explore'); }}
               style={page === 'explore' || page === 'detail' ? { color: ' #f67c7c', fontWeight: 600 } : {}}>
              {lang === 'en' ? 'Explore' : 'ค้นหา'}
            </a>
          </li>
          <li>
            <a href="#" onClick={e => { e.preventDefault(); go('business'); }}
               style={page === 'business' ? { color: ' #f67c7c', fontWeight: 600 } : {}}>
              {lang === 'en' ? 'Business' : 'ภาคธุรกิจ'}
            </a>
          </li>
          <li>
            <a href="#" onClick={e => { e.preventDefault(); go('about'); }}
                style={page === 'about' ? { color: ' #f67c7c', fontWeight: 600 } : {}}>
              {lang === 'en' ? 'About' : 'เกี่ยวกับเรา'}
            </a>
          </li>
        </ul>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* 🟢 ปุ่มสลับภาษา TH / EN แบบกำหนดเอง เสถียรและใช้งานได้แน่นอน */}
          <div className="custom-lang-switcher" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F5F5F7', padding: '3px', borderRadius: '20px', border: '1px solid #E8E8E8' }}>
            <button 
              onClick={() => toggleLang('en')}
              style={{
                padding: '4px 10px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: lang === 'en' ? 'var(--coral-dark)' : 'transparent', color: lang === 'en' ? '#fff' : '#666', transition: 'all 0.2s'
              }}
            >EN</button>
            <button 
              onClick={() => toggleLang('th')}
              style={{
                padding: '4px 10px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: lang === 'th' ? 'var(--coral-dark)' : 'transparent', color: lang === 'th' ? '#fff' : '#666', transition: 'all 0.2s'
              }}
            >TH</button>
          </div>

          <button className="btn-ghost" onClick={() => { setAutoLogin(true); go('business'); }}>
            {lang === 'en' ? 'Log in' : 'เข้าสู่ระบบ'}
          </button>
          <button className="btn-coral" onClick={() => go('business')}>
            {lang === 'en' ? 'Business Plan' : 'แพ็กเกจธุรกิจ'} <span className="arrow">→</span>
          </button>
        </div>
      </nav>

      {/* ── Pages ── */}
  {/* ── Pages ── */}
      {page === 'home'     && <HomePage onExplore={() => go('explore')} onBusiness={() => go('business')} lang={lang} />}
      {page === 'explore'  && <ExplorePage  onSelectPlace={p => { setPlace(p); go('detail'); }} currentLang={lang} />}
      
      {/* 🟢 แก้ไขจุดวิกฤต: ใส่พร็อพ onSelectPlace ส่งต่อฟังก์ชันให้ตัวลูก เพื่อกดสลับดูสถานที่แนะนําต่อได้จริง */}
      {page === 'detail'   && place && (
        <DetailPage 
          place={place} 
          onBack={() => go('explore')} 
          allPlaces={PLACES_DATA} 
          currentLang={lang} 
          onSelectPlace={(targetPlace) => setPlace(targetPlace)} 
        />
      )}
      
      {page === 'business' && (
        <BusinessPage
          onLogin={() => go('dashboard')}
          autoLogin={autoLogin}
          onModalClose={() => setAutoLogin(false)}
          currentLang={lang} 
        />
      )}
      {page === 'about' && <AboutPage currentLang={lang} />}
    </>
  );
}