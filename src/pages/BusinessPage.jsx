import { useState, useEffect } from 'react';
import { X} from 'lucide-react';
import glowImg from '../assets/glow.png';
import './BusinessPage.css';

/* ── Login Modal ── */
function Modal({ onClose, onLogin }) {
  const [email, setEmail]   = useState('');
  const [name,  setName]    = useState('');
  const [submitted, setSub] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      setSub(true);
      onLogin();
    }
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><X size={14} /></button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🎉</div>
            <div className="modal-title">You're in!</div>
            <p className="modal-sub">We'll send your login details to <strong>{email}</strong> within 24 hours. Your 14-day free trial starts today.</p>
            <button className="modal-submit" onClick={onClose}>Got it</button>
          </div>
        ) : (
          <>
            <div className="modal-title">Start Your Free Trial</div>
            <p className="modal-sub">For Business Accounts to access your destination dashboard. No credit card required.</p>
            <form onSubmit={handleSubmit}>
              <label className="modal-label">Full Name</label>
              <input className="modal-input" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />
              <label className="modal-label">Business Email</label>
              <input className="modal-input" type="email" placeholder="business@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <button className="modal-submit" type="submit">Start Free 14-Day Trial →</button>
            </form>
            <p className="modal-note">No credit card required · Cancel anytime</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Trend bar ── */
function TrendBar({ month, pct }) {
  return (
    <div className="trend-row">
      <span className="trend-month">{month}</span>
      <div className="trend-track">
        <div className="trend-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="trend-pct">{pct}%</span>
    </div>
  );
}

const plans = [
  {
    name: 'Starter',
    price: '฿490',
    desc: 'Perfect for small businesses or getting started with monitoring one destination.',
    featured: false,
    features: [
      { text: 'Claim 1 destination',                  ok: true },
      { text: 'Sentiment overview (Pos/Neu/Neg)',      ok: true },
      { text: 'Top keywords from Lexicon',             ok: true },
      { text: 'Weekly AI Summary',                     ok: true },
      { text: 'Read up to 50 raw reviews/month',      ok: true },
      { text: 'Sentiment trend (6 months)',            ok: false },
      { text: 'Negative review alerts',                ok: false },
      { text: 'Export PDF/CSV',                        ok: false },
      { text: 'Competitor analysis',                   ok: false },
    ],
    cta: 'Start Free 14 Days',
    ctaStyle: 'outline',
  },
  {
    name: 'Professional',
    price: '฿1,290',
    desc: 'For hotels, restaurants, or attractions that need deep insight and real-time alerts.',
    featured: true,
    badge: '⭐ Recommended for Business',
    features: [
      { text: 'Claim up to 3 destinations',           ok: true },
      { text: 'Sentiment overview + Breakdown',       ok: true },
      { text: 'Top keywords + Topic clusters',        ok: true },
      { text: 'Daily AI Summary',                     ok: true },
      { text: 'Unlimited raw review access',          ok: true },
      { text: 'Sentiment trend — last 12 months',    ok: true },
      { text: 'Negative review alerts (real-time)',   ok: true },
      { text: 'Export PDF/CSV reports',               ok: true },
      { text: 'Competitor analysis',                  ok: false },
    ],
    cta: 'Start Free 14 Days',
    ctaStyle: 'primary',
  },
  {
    name: 'Enterprise',
    price: '฿2,490',
    desc: 'For hotel chains, OTAs, or organizations managing insights across multiple locations.',
    featured: false,
    features: [
      { text: 'Unlimited destination claims',         ok: true },
      { text: 'Everything in Professional',           ok: true },
      { text: 'Competitor gap analysis',              ok: true },
      { text: 'Regional benchmark reports',           ok: true },
      { text: 'API access (CRM integration)',         ok: true },
      { text: 'White-label dashboard',                ok: true },
      { text: 'Custom alert rules',                   ok: true },
      { text: 'Dedicated account manager',            ok: true },
      { text: 'SLA 99.9% uptime',                    ok: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
];

const chips = [
  'Real-time review monitoring',
  'AI-powered insights',
  'Multi-platform aggregation',
  'Negative alert system',
  'PDF/CSV export',
  'API access',
];

export default function BusinessPage({ onLogin, autoLogin, onModalClose }) {
  const [showModal, setModal] = useState(false);

  // เปิด modal อัตโนมัติถ้า autoLogin = true
  useEffect(() => {
    if (autoLogin) setModal(true);
  }, [autoLogin]);

  return (
    <div className="preview-page">
      {showModal && (
        <Modal
          onClose={() => { setModal(false); onModalClose?.(); }}
          onLogin={() => { setModal(false); onLogin(); }}
        />
      )}

      {/* ── Hero ── */}
      <div className="biz-hero">
        <img src={glowImg} alt="" className="biz-hero-glow" aria-hidden="true" />
        <div className="biz-hero-tag">Business Intelligence Platform</div>
        <h1>
          Know Your Customers<br />
          Deeper Than Ever <em>with AI</em>
        </h1>
        <p>
          Track Brand Reputation, analyze reviews in depth, receive negative review alerts,
          and export reports instantly — all from a single platform.
        </p>
        <div className="biz-hero-btns">
          <button className="biz-btn-primary" onClick={() => setModal(true)}>
            Start Free 14-Day Trial
          </button>
          <button
            className="biz-btn-outline-white"
            onClick={() => document.getElementById('dashboard-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            View Demo Dashboard ↓
          </button>
        </div>
        <div className="biz-hero-chips">
          {chips.map(c => (
            <span key={c} className="biz-chip">
              <span className="biz-chip-dot" />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Pricing ── */}
      <section className="pricing-section">
        <div className="section-center">
          <div className="section-tag">PRICING</div>
          <h2>Choose the Plan That Fits Your Business</h2>
          <p className="section-sub">14-day free trial on every plan — no credit card required.</p>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
              {plan.badge && <div className="featured-badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price} <span>/ month</span></div>
              <div className="plan-desc">{plan.desc}</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                {plan.features.map(f => (
                  <li key={f.text} className={`plan-feature${f.ok ? '' : ' no'}`}>{f.text}</li>
                ))}
              </ul>
              <button
                className={`plan-cta plan-cta-${plan.ctaStyle}`}
                onClick={() => setModal(true)}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="preview-section" id="dashboard-preview">
        <div className="section-center">
          <div className="section-tag">DASHBOARD PREVIEW</div>
          <h2>Everything in One Place</h2>
          <p className="section-sub">A dashboard designed specifically for tourism businesses.</p>
        </div>

        <div className="preview-mock">
          {/* Top bar */}
          <div className="preview-topbar">
            <span className="preview-logo">Travel<span>Sense</span></span>
            <div className="preview-tabs-row">
              {['Overview','Reviews','Trends','Reports','Alerts'].map((t, i) => (
                <span key={t} className={`preview-tab${i === 0 ? ' active' : ''}`}>{t}</span>
              ))}
            </div>
            <span className="preview-verified">Khao Yai National Park · Verified ✓</span>
          </div>

          {/* Metric cards */}
          <div className="preview-metrics">
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">Sentiment Score</div>
              <div className="preview-metric-val pos">76%</div>
              <div className="preview-metric-sub">↑ +3% from last month</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">Total Reviews</div>
              <div className="preview-metric-val">1,247</div>
              <div className="preview-metric-sub">+82 new reviews this month</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">Negative Reviews</div>
              <div className="preview-metric-val neg">87</div>
              <div className="preview-metric-sub">7% of all reviews</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">Top Issue</div>
              <div className="preview-metric-val warn">Overcrowding</div>
              <div className="preview-metric-sub">Found in 34% of negative reviews</div>
            </div>
          </div>

          {/* Bottom panels */}
          <div className="preview-panels">
            <div className="preview-panel">
              <div className="preview-panel-title">Sentiment Trend — 6 Months</div>
              <TrendBar month="Jan" pct={68} />
              <TrendBar month="Feb" pct={71} />
              <TrendBar month="Mar" pct={65} />
              <TrendBar month="Apr" pct={73} />
              <TrendBar month="May" pct={74} />
              <TrendBar month="Jun" pct={76} />
            </div>
            <div className="preview-panel">
              <div className="preview-panel-title">Recent Negative Alerts 🔴</div>
              {[
                { color: '#F0997B', text: '"Too crowded, couldn\'t enjoy the wildlife at all during weekend"', time: 'TripAdvisor · 2 hours ago' },
                { color: '#F0997B', text: '"Facilities are poor, no proper restrooms near the main trail"',   time: 'Google · 5 hours ago' },
                { color: '#F59E0B', text: '"Entrance fee increased but service quality remains the same"',     time: 'Booking.com · Yesterday' },
              ].map((a, i) => (
                <div key={i} className="alert-item">
                  <div className="alert-dot" style={{ background: a.color }} />
                  <div>
                    <div className="alert-text">{a.text}</div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="biz-cta">
        <h2>
          <span style={{
            background: 'linear-gradient(135deg,#FE907F,#191D33)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Ready to Grow Your Business?
          </span>
        </h2>
        <p>Join hundreds of tourism businesses already using TravelSense AI to understand their customers.</p>
        <div className="biz-cta-btns">
          <button className="biz-btn-primary" onClick={() => setModal(true)}>
            Start Free 14-Day Trial
          </button>
          <button className="biz-btn-outline-dark">View Full Feature List</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">Logo</span>
        <span className="footer-copy">© 2024 TravelSense AI · Business Intelligence for Tourism</span>
      </footer>
    </div>
  );
}
