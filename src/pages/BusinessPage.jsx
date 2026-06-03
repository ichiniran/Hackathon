import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import glowImg from '../assets/glow.png';
import './BusinessPage.css';

/* ── Login Modal ── */
function Modal({ onClose, onLogin, currentLang }) {
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
            <div className="modal-title">
              {currentLang === 'en' ? "You're in!" : "ลงทะเบียนเรียบร้อย!"}
            </div>
            <p className="modal-sub">
              {currentLang === 'en' ? (
                <>We'll send your login details to <strong>{email}</strong> within 24 hours. Your 14-day free trial starts today.</>
              ) : (
                <>เราจะส่งรายละเอียดการเข้าใช้งานไปยังอีเมล <strong>{email}</strong> ของคุณภายใน 24 ชั่วโมง สิทธิ์ทดลองใช้งานฟรี 14 วันของคุณเริ่มตั้งแต่วันนี้เป็นต้นไป</>
              )}
            </p>
            <button className="modal-submit" onClick={onClose}>
              {currentLang === 'en' ? "Got it" : "รับทราบ"}
            </button>
          </div>
        ) : (
          <>
            <div className="modal-title">
              {currentLang === 'en' ? "Start Your Free Trial" : "เริ่มทดลองใช้งานฟรี"}
            </div>
            <p className="modal-sub">
              {currentLang === 'en' 
                ? "For Business Accounts to access your destination dashboard. No credit card required."
                : "สำหรับบัญชีธุรกิจเพื่อเข้าถึงแผงควบคุมข้อมูลเชิงลึก ไม่ต้องใช้บัตรเครดิต"}
            </p>
            <form onSubmit={handleSubmit}>
              <label className="modal-label">{currentLang === 'en' ? "Full Name" : "ชื่อ-นามสกุล"}</label>
              <input className="modal-input" placeholder={currentLang === 'en' ? "Jane Smith" : "สมชาย รักดี"} value={name} onChange={e => setName(e.target.value)} />
              
              <label className="modal-label">{currentLang === 'en' ? "Business Email" : "อีเมลองค์กร/ธุรกิจ"}</label>
              <input className="modal-input" type="email" placeholder="business@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              
              <button className="modal-submit" type="submit">
                {currentLang === 'en' ? "Start Free 14-Day Trial →" : "เริ่มทดลองใช้งานฟรี 14 วัน →"}
              </button>
            </form>
            <p className="modal-note">
              {currentLang === 'en' ? "No credit card required · Cancel anytime" : "ไม่ต้องใช้บัตรเครดิต · ยกเลิกได้ตลอดเวลา"}
            </p>
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

// 🟢 ฟังก์ชันจัดทำแผนราคาแปลภาษาแบบคู่ขนานเพื่อความสละสลวย
const getPlans = (lang) => [
  {
    name: 'Starter',
    price: '฿490',
    desc: lang === 'en' ? 'Perfect for small businesses or getting started with monitoring one destination.' : 'เหมาะสำหรับธุรกิจขนาดเล็ก หรือเริ่มต้นติดตามวิเคราะห์ข้อมูลสำหรับ 1 จุดหมายปลายทาง',
    featured: false,
    features: [
      { text: lang === 'en' ? 'Claim 1 destination' : 'สิทธิ์ดูแล 1 จุดหมายปลายทาง', ok: true },
      { text: lang === 'en' ? 'Sentiment overview (Pos/Neu/Neg)' : 'ภาพรวมความรู้สึก (บวก/ทั่วไป/ลบ)', ok: true },
      { text: lang === 'en' ? 'Top keywords from Lexicon' : 'คำสำคัญยอดนิยมจากระบบคลังคำศัพท์', ok: true },
      { text: lang === 'en' ? 'Weekly AI Summary' : 'รายงานสรุปโดย AI รายสัปดาห์', ok: true },
      { text: lang === 'en' ? 'Read up to 50 raw reviews/month' : 'เข้าอ่านรีวิวดิบได้สูงสุด 50 รีวิว/เดือน', ok: true },
      { text: lang === 'en' ? 'Sentiment trend (6 months)' : 'กราฟแนวโน้มความรู้สึก (ย้อนหลัง 6 เดือน)', ok: false },
      { text: lang === 'en' ? 'Negative review alerts' : 'ระบบแจ้งเตือนเมื่อมีรีวิวเชิงลบ', ok: false },
      { text: lang === 'en' ? 'Export PDF/CSV' : 'ส่งออกรายงานเป็น PDF/CSV', ok: false },
      { text: lang === 'en' ? 'Competitor analysis' : 'ฟังก์ชันวิเคราะห์คู่แข่ง', ok: false },
    ],
    cta: lang === 'en' ? 'Start Free 14 Days' : 'ทดลองใช้ฟรี 14 วัน',
    ctaStyle: 'outline',
  },
  {
    name: 'Professional',
    price: '฿1,990',
    desc: lang === 'en' ? 'For hotels, restaurants, or attractions that need deep insight and real-time alerts.' : 'สำหรับโรงแรม ร้านอาหาร หรือสถานที่ท่องเที่ยวที่ต้องการอินไซต์เชิงลึกและการแจ้งเตือนแบบทันท่วงที',
    featured: true,
    badge: lang === 'en' ? '⭐ Recommended for Business' : '⭐ แนะนำสำหรับผู้ประกอบการ',
    features: [
      { text: lang === 'en' ? 'Claim up to 3 destinations' : 'สิทธิ์ดูแลสูงสุด 3 จุดหมายปลายทาง', ok: true },
      { text: lang === 'en' ? 'Sentiment overview + Breakdown' : 'ภาพรวมความรู้สึกพร้อมระบบจำแนกแยกย่อย', ok: true },
      { text: lang === 'en' ? 'Top keywords + Topic clusters' : 'คำสำคัญยอดนิยมและการจัดกลุ่มหัวข้อกลุ่มคำ', ok: true },
      { text: lang === 'en' ? 'Daily AI Summary' : 'รายงานสรุปโดย AI รายวัน', ok: true },
      { text: lang === 'en' ? 'Unlimited raw review access' : 'เข้าอ่านข้อมูลรีวิวดิบได้ไม่จำกัด', ok: true },
      { text: lang === 'en' ? 'Sentiment trend — last 12 months' : 'กราฟแนวโน้มความรู้สึกย้อนหลัง 12 เดือน', ok: true },
      { text: lang === 'en' ? 'Negative review alerts (real-time)' : 'ระบบแจ้งเตือนรีวิวเชิงลบแบบเรียลไทม์', ok: true },
      { text: lang === 'en' ? 'Export PDF/CSV reports' : 'ส่งออกรายงานสรุปผลเป็น PDF/CSV', ok: true },
      { text: lang === 'en' ? 'Competitor analysis' : 'ฟังก์ชันวิเคราะห์คู่แข่ง', ok: false },
    ],
    cta: lang === 'en' ? 'Start Free 14 Days' : 'ทดลองใช้ฟรี 14 วัน',
    ctaStyle: 'primary',
  },
  {
    name: 'Enterprise',
    price: '฿2,490',
    desc: lang === 'en' ? 'For hotel chains, OTAs, or organizations managing insights across multiple locations.' : 'สำหรับเครือโรงแรม ตัวแทนท่องเที่ยว (OTA) หรือองค์กรที่ต้องบริหารจัดการข้อมูลเชิงลึกในหลายพื้นที่',
    featured: false,
    features: [
      { text: lang === 'en' ? 'Unlimited destination claims' : 'สิทธิ์ดูแลจุดหมายปลายทางได้ไม่จำกัด', ok: true },
      { text: lang === 'en' ? 'Everything in Professional' : 'รวมทุกฟังก์ชันที่มีในแพ็กเกจ Professional', ok: true },
      { text: lang === 'en' ? 'Competitor gap analysis' : 'การวิเคราะห์ช่องว่างเพื่อเปรียบเทียบคู่แข่ง', ok: true },
      { text: lang === 'en' ? 'Regional benchmark reports' : 'รายงานผลประเมินมาตรฐานระดับภูมิภาค', ok: true },
      { text: lang === 'en' ? 'API access (CRM integration)' : 'สิทธิ์เข้าถึงระบบ API เพื่อเชื่อมต่อระบบ CRM', ok: true },
      { text: lang === 'en' ? 'White-label dashboard' : 'แดชบอร์ดสไตล์คัสตอมแบรนด์ตนเอง (White-label)', ok: true },
      { text: lang === 'en' ? 'Custom alert rules' : 'ตั้งค่าเงื่อนไขการแจ้งเตือนแบบกำหนดเอง', ok: true },
      { text: lang === 'en' ? 'Dedicated account manager' : 'เจ้าหน้าที่ดูแลบัญชีผู้ใช้บริการโดยเฉพาะ', ok: true },
      { text: lang === 'en' ? 'SLA 99.9% uptime' : 'การันตีระบบเสถียรตามข้อตกลง SLA 99.9%', ok: true },
    ],
    cta: lang === 'en' ? 'Contact Sales' : 'ติดต่อฝ่ายขาย',
    ctaStyle: 'outline',
  },
];

const getChips = (lang) => [
  lang === 'en' ? 'Real-time review monitoring' : 'ติดตามรีวิวแบบเรียลไทม์',
  lang === 'en' ? 'AI-powered insights' : 'บทวิเคราะห์อินไซต์ขับเคลื่อนด้วย AI',
  lang === 'en' ? 'Multi-platform aggregation' : 'รวบรวมข้อมูลจากหลากหลายแพลตฟอร์ม',
  lang === 'en' ? 'Negative alert system' : 'ระบบแจ้งเตือนกรณีมีรีวิวเชิงลบ',
  lang === 'en' ? 'PDF/CSV export' : 'ส่งออกข้อมูลในรูปแบบ PDF/CSV',
  lang === 'en' ? 'API access' : 'สิทธิ์การเชื่อมต่อผ่านระบบ API',
];

export default function BusinessPage({ onLogin, autoLogin, onModalClose, currentLang = 'en' }) {
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    if (autoLogin) setModal(true);
  }, [autoLogin]);

  const translatedPlans = getPlans(currentLang);
  const translatedChips = getChips(currentLang);

  return (
    <div className="preview-page">
      {showModal && (
        <Modal
          onClose={() => { setModal(false); onModalClose?.(); }}
          onLogin={() => { setModal(false); onLogin(); }}
          currentLang={currentLang}
        />
      )}

      {/* ── Hero ── */}
      <div className="biz-hero">
        <img src={glowImg} alt="" className="biz-hero-glow" aria-hidden="true" />
        <div className="biz-hero-tag">
          {currentLang === 'en' ? "Business Intelligence Platform" : "แพลตฟอร์มข้อมูลอัจฉริยะเพื่อธุรกิจ"}
        </div>
        <h1>
          {currentLang === 'en' ? (
            <>Know Your Customers<br />Deeper Than Ever <em>with AI</em></>
          ) : (
            <>เข้าใจเสียงของลูกค้าเชิงลึก<br />มากกว่าที่เคยมีมา <em>ด้วยขุมพลัง AI</em></>
          )}
        </h1>
        <p>
          {currentLang === 'en' 
            ? "Track Brand Reputation, analyze reviews in depth, receive negative review alerts, and export reports instantly — all from a single platform."
            : "ติดตามความน่าเชื่อถือของแบรนด์ วิเคราะห์ความคิดเห็นเชิงลึก รับระบบแจ้งเตือนกรณีเกิดรีวิวเชิงลบ และส่งออกรายงานสรุปได้ทันที ครบจบในแพลตฟอร์มเดียว"}
        </p>
        <div className="biz-hero-btns">
          <button className="biz-btn-primary" onClick={() => setModal(true)}>
            {currentLang === 'en' ? "Start Free 14-Day Trial" : "เริ่มทดลองใช้งานฟรี 14 วัน"}
          </button>
          <button
            className="biz-btn-outline-white"
            onClick={() => document.getElementById('dashboard-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {currentLang === 'en' ? "View Demo Dashboard ↓" : "ดูตัวอย่างหน้าแดชบอร์ด ↓"}
          </button>
        </div>
        <div className="biz-hero-chips">
          {translatedChips.map(c => (
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
          <div className="section-tag">{currentLang === 'en' ? "PRICING" : "แผนราคาและค่าบริการ"}</div>
          <h2>
            {currentLang === 'en' ? "Choose the Plan That Fits Your Business" : "เลือกแพ็กเกจที่ตอบโจทย์โครงสร้างธุรกิจของคุณ"}
          </h2>
          <p className="section-sub">
            {currentLang === 'en' ? "14-day free trial on every plan — no credit card required." : "สิทธิ์ทดลองใช้งานฟรี 14 วันสำหรับทุกแพ็กเกจ — ไม่ต้องใช้บัตรเครดิต"}
          </p>
        </div>

        <div className="pricing-grid">
          {translatedPlans.map(plan => (
            <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
              {plan.badge && <div className="featured-badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price} <span>{currentLang === 'en' ? '/ month' : '/ เดือน'}</span></div>
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
          <div className="section-tag">{currentLang === 'en' ? "DASHBOARD PREVIEW" : "ภาพตัวอย่างระบบแดชบอร์ด"}</div>
          <h2>{currentLang === 'en' ? "Everything in One Place" : "รวมทุกมิติข้อมูลสรุปจบในหน้าเดียว"}</h2>
          <p className="section-sub">
            {currentLang === 'en' ? "A dashboard designed specifically for tourism businesses." : "หน้าแดชบอร์ดที่ออกแบบและพัฒนาขึ้นเพื่ออุตสาหกรรมการท่องเที่ยวโดยเฉพาะ"}
          </p>
        </div>

        <div className="preview-mock">
          {/* Top bar */}
          <div className="preview-topbar">
            <span className="preview-logo">Travel<span>Sense</span></span>
            <div className="preview-tabs-row">
              {[
                { en: 'Overview', th: 'ภาพรวม' },
                { en: 'Reviews', th: 'ความคิดเห็น' },
                { en: 'Trends', th: 'แนวโน้มข้อมูล' },
                { en: 'Reports', th: 'การออกรายงาน' },
                { en: 'Alerts', th: 'ระบบแจ้งเตือน' }
              ].map((t, i) => (
                <span key={t.en} className={`preview-tab${i === 0 ? ' active' : ''}`}>
                  {currentLang === 'en' ? t.en : t.th}
                </span>
              ))}
            </div>
            <span className="preview-verified">
              {currentLang === 'en' ? "Khao Yai National Park · Verified ✓" : "อุทยานแห่งชาติเขาใหญ่ · ยืนยันสิทธิ์แล้ว ✓"}
            </span>
          </div>

          {/* Metric cards */}
          <div className="preview-metrics">
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">{currentLang === 'en' ? "Sentiment Score" : "คะแนนความรู้สึก"}</div>
              <div className="preview-metric-val pos">76%</div>
              <div className="preview-metric-sub">{currentLang === 'en' ? "↑ +3% from last month" : "↑ +3% จากเดือนก่อนหน้า"}</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">
                {currentLang === 'en' ? "Total Reviews" : "จำนวนความคิดเห็นทั้งหมด"}
              </div>
              <div className="preview-mock-val" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '6px 0', color: '#111' }}>1,247</div>
              <div className="preview-metric-sub">{currentLang === 'en' ? "+82 new reviews this month" : "+82 รีวิวใหม่ในเดือนนี้"}</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">{currentLang === 'en' ? "Negative Reviews" : "ความคิดเห็นเชิงลบ"}</div>
              <div className="preview-metric-val neg">87</div>
              <div className="preview-metric-sub">{currentLang === 'en' ? "7% of all reviews" : "คิดเป็น 7% จากรีวิวทั้งหมด"}</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">{currentLang === 'en' ? "Top Issue" : "ประเด็นปัญหาหลัก"}</div>
              <div className="preview-metric-val warn">{currentLang === 'en' ? "Overcrowding" : "ความหนาแน่นเกินไป"}</div>
              <div className="preview-metric-sub">{currentLang === 'en' ? "Found in 34% of negative reviews" : "พบใน 34% ของรีวิวแง่ลบ"}</div>
            </div>
          </div>

          {/* Bottom panels */}
          <div className="preview-panels">
            <div className="preview-panel">
              <div className="preview-panel-title">
                {currentLang === 'en' ? "Sentiment Trend — 6 Months" : "แนวโน้มดัชนีความรู้สึก — ย้อนหลัง 6 เดือน"}
              </div>
              <TrendBar month={currentLang === 'en' ? "Jan" : "ม.ค."} pct={68} />
              <TrendBar month={currentLang === 'en' ? "Feb" : "ก.พ."} pct={71} />
              <TrendBar month={currentLang === 'en' ? "Mar" : "มี.ค."} pct={65} />
              <TrendBar month={currentLang === 'en' ? "Apr" : "เม.ย."} pct={73} />
              <TrendBar month={currentLang === 'en' ? "May" : "พ.ค."} pct={74} />
              <TrendBar month={currentLang === 'en' ? "Jun" : "มิ.ย."} pct={76} />
            </div>
            <div className="preview-panel">
              <div className="preview-panel-title">
                {currentLang === 'en' ? "Recent Negative Alerts 🔴" : "ระบบแจ้งเตือนกรณีรีวิวเชิงลบล่าสุด 🔴"}
              </div>
              {[
                { 
                  color: '#F0997B', 
                  en: '"Too crowded, couldn\'t enjoy the wildlife at all during weekend"', 
                  th: '"คนเยอะและหนาแน่นเกินไป ช่วงวันหยุดเสาร์-อาทิตย์แทบไม่ได้สัมผัสธรรมชาติหรือเห็นสัตว์ป่าเลย"',
                  time: 'TripAdvisor · 2 hours ago' 
                },
                { 
                  color: '#F0997B', 
                  en: '"Facilities are poor, no proper restrooms near the main trail"', 
                  th: '"สิ่งอำนวยความสะดวกค่อนข้างแย่ ไม่มีห้องน้ำจัดเตรียมไว้ใกล้กับบริเวณเส้นทางเดินป่าหลักเลย"',
                  time: 'Google · 5 hours ago' 
                },
                { 
                  color: '#F59E0B', 
                  en: '"Entrance fee increased but service quality remains the same"', 
                  th: '"มีการปรับเพิ่มราคาค่าเข้าอุทยาน แต่คุณภาพการให้บริการและการดูแลยังคงเท่าเดิม"',
                  time: 'Booking.com · Yesterday' 
                },
              ].map((a, i) => (
                <div key={i} className="alert-item">
                  <div className="alert-dot" style={{ background: a.color }} />
                  <div>
                    <div className="alert-text">{currentLang === 'en' ? a.en : a.th}</div>
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
            {currentLang === 'en' ? "Ready to Grow Your Business?" : "พร้อมที่จะพัฒนาและขับเคลื่อนธุรกิจของคุณหรือยัง?"}
          </span>
        </h2>
        <p>
          {currentLang === 'en' 
            ? "Join hundreds of tourism businesses already using TravelSense AI to understand their customers."
            : "ร่วมเป็นส่วนหนึ่งกับผู้ประกอบการท่องเที่ยวหลายร้อยรายที่เลือกใช้ TravelSense AI เพื่อเข้าถึงความต้องการของลูกค้าอย่างแท้จริง"}
        </p>
        <div className="biz-cta-btns">
          <button className="biz-btn-primary" onClick={() => setModal(true)}>
            {currentLang === 'en' ? "Start Free 14-Day Trial" : "เริ่มทดลองใช้งานฟรี 14 วัน"}
          </button>
          <button className="biz-btn-outline-dark">
            {currentLang === 'en' ? "View Full Feature List" : "ดูฟีเจอร์และฟังก์ชันทั้งหมด"}
          </button>
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