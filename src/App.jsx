import { useEffect, useRef, useState } from "react";
import { Search, MessageSquare, Layers, Activity, LayoutDashboard } from "lucide-react";
import glowImg from "./assets/glow.png";
import travelerImg from "./assets/traveler.png";
import ExplorePage  from "./pages/ExplorePage";
import DetailPage   from "./pages/DetailPage";
import BusinessPage from "./pages/BusinessPage";
import DashboardPage from "./pages/DashboardPage";
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

const steps = [
  { icon: <MessageSquare size={18} />, title: "Collect Reviews",    desc: "Automatically aggregate reviews from TripAdvisor, Google, Booking.com, and Agoda." },
  { icon: <Layers size={18} />,        title: "NLP Processing",     desc: "Process text using Natural Language Processing — clean, tokenize, and prepare raw review data." },
  { icon: <Activity size={18} />,      title: "Sentiment Analysis", desc: "Classify each review as Positive, Neutral, or Negative using a Lexicon-Based Sentiment Analysis approach." },
  { icon: <LayoutDashboard size={18} />, title: "Actionable Insights", desc: "Display results in an easy-to-understand dashboard with strategic recommendations for improvement." },
];

/* ─────────────────── HOME PAGE ─────────────────── */
function HomePage({ onExplore, onBusiness }) {
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

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <div className="hero-glow-wrap">
            <img src={glowImg} alt="" className="hero-glow-img" aria-hidden="true" />
            <h1>
              Transform Reviews<br />
              Into Actionable<br />
              <span className="grad-text">Insights</span>
            </h1>
          </div>
          <p className="hero-subtitle">
            AI-powered tourism intelligence platform based on NLP and Sentiment Analysis.
            Helping tourists make better decisions and helping businesses understand their customers.
          </p>
          <div className="hero-ctas">
            <button className="btn-coral-lg" onClick={onExplore}>
              <Search size={16} /> Explore Destinations
            </button>
            <button className="btn-outline-lg" onClick={onBusiness}>
              Business Dashboard
            </button>
          </div>
          {/* ── Stats ── */}
          <section className="stats-section" ref={statsRef}>
            <div className="stats-grid">
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={50} suffix="K+" play={statsVisible} />
                <div className="stat-label">Reviews analyzed</div>
              </div>
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={120} suffix="+" play={statsVisible} />
                <div className="stat-label">Destinations</div>
              </div>
              <div className={`stat-item ${statsVisible ? "is-visible" : ""}`}>
                <AnimatedCounter end={92} suffix="%" play={statsVisible} />
                <div className="stat-label">Accuracy rate</div>
              </div>
            </div>
          </section>
        </div>
        <div className="hero-visual">
          <img src={travelerImg} alt="Traveler running with luggage" className="hero-traveler-img" />
        </div>
      </section>

      <section className="stats-analysis-layout">
        {/* ── Live Analysis Card ── */}
        <section
          className="analysis-section"
          ref={analysisRef}
          style={{ '--analysis-offset': `${analysisParallax}px` }}
        >
          <div className="analysis-card">
            <div className="card-header">
              <div>
                <div className="live-label">Live Analysis</div>
                <div className="card-title">Khao Yai National Park</div>
                <div className="card-meta">Based on 1,247 foreign tourist reviews · Updated today</div>
              </div>
              <div className="card-header-right">
                <span className="live-dot" />
                <span className="live-text">Real‑time</span>
              </div>
            </div>
            <div className="sentiment-bars">
              <SentimentBar label="Positive" pct={76} type="positive" animate={true} />
              <SentimentBar label="Neutral"  pct={17} type="neutral"  animate={true} />
              <SentimentBar label="Negative" pct={7}  type="negative" animate={true} />
            </div>
            <div className="tags">
              {["wildlife","stunning","peaceful","elephants","crowded","scenic trail","birdwatching"].map(t => (
                <span key={t} className={`tag${t === "crowded" ? " highlight" : ""}`}>{t}</span>
              ))}
            </div>
            <div className="key-insight">
              <div className="key-insight-label">Key Insight</div>
              <div className="key-insight-text">
                Tourists highly appreciate the wildlife and scenic views, but express concerns about overcrowding during holidays.
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

      {/* ── How It Works ── */}
      <section className="how-section">
        <div className="section-badge-wrap">
          <span className="section-badge">HOW IT WORKS</span>
        </div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          <span className="grad-text">From Raw Reviews to Actionable Insights</span>
        </h2>
        <div className="steps-grid">
          {steps.map(s => (
            <div className="step-card" key={s.title}>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Research ── */}
      <section className="research-section">
        <div className="research-box">
          <div className="research-badge">Academic Foundation</div>
          <h2 className="research-title">
            <span className="grad-text">Built on Proven Research</span>
          </h2>
          <div className="research-paper-title">
            Analysis of Foreign Tourist Review by Natural Language Processing and a Lexicon-Based Sentiment Analysis Tool
          </div>
          <p className="research-desc">
            TravelSense AI is built upon academic research applying NLP and Lexicon-Based Sentiment Analysis to analyze foreign tourist reviews — combining scientific rigor with a practical, user-friendly experience.
          </p>
          <div className="research-tags">
            {["Natural Language Processing","Lexicon-Based Sentiment","Tourism Analytics","Foreign Tourist Reviews"].map(t => (
              <span key={t} className="research-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-title">
          <span className="grad-text">Ready to Analyze Your Reviews?</span>
        </h2>
        <p className="cta-sub">Unlock insights from over 50,000 tourist reviews — Free 14-day trial</p>
        <div className="cta-btns">
          <button className="btn-coral-lg" onClick={onExplore}>
            <Search size={16} /> Explore Destinations
          </button>
          <button className="btn-outline-coral" onClick={onBusiness}>Business Plan</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-logo">Logo</span>
        <span className="footer-copy">© 2024 TravelSense AI · Based on NLP & Lexicon-Based Sentiment Analysis Research</span>
      </footer>
    </>
  );
}

/* ─────────────────── ROOT ─────────────────── */
export default function App() {
  // 'home' | 'explore' | 'detail' | 'business'
 const [page, setPage] = useState(() => sessionStorage.getItem('page') || 'home');
  const [place, setPlace] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);
function go(p) {
  sessionStorage.setItem('page', p);
  setPage(p);
  window.scrollTo(0, 0);
}

// early return อยู่ตรงนี้แทน
if (page === 'dashboard') {
  return (
    <DashboardPage
      onLogout={() => go('home')}
      onGoPlans={() => go('business')}
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
               style={page === 'explore' || page === 'detail' ? { color: '#F47C5A', fontWeight: 600 } : {}}>
              Explore
            </a>
          </li>
          <li>
            <a href="#" onClick={e => { e.preventDefault(); go('business'); }}
               style={page === 'business' ? { color: '#F47C5A', fontWeight: 600 } : {}}>
              Business
            </a>
          </li>
          <li><a href="#">About</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => { setAutoLogin(true); go('business'); }}>
            Log in
          </button>
          <button className="btn-coral" onClick={() => go('business')}>
            Business Plan <span className="arrow">→</span>
          </button>
        </div>
      </nav>

      {/* ── Pages ── */}
      {page === 'home'     && <HomePage     onExplore={() => go('explore')} onBusiness={() => go('business')} />}
      {page === 'explore'  && <ExplorePage  onSelectPlace={p => { setPlace(p); go('detail'); }} />}
      {page === 'detail'   && place && <DetailPage place={place} onBack={() => go('explore')} allPlaces={PLACES_DATA} />}
      {page === 'business' && (
        <BusinessPage
          onLogin={() => go('dashboard')}
          autoLogin={autoLogin}
          onModalClose={() => setAutoLogin(false)}
        />
      )}
    </>
  );
}
