import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import glowImg from '../assets/glow.png';
import './BusinessPage.css';

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

const getPlans = (lang) => [
  {
    name: 'Professional',
    price: '฿1,990',
    desc: lang === 'en' ? 'For hotels, restaurants, or attractions that need deep insight and real-time alerts.' : 'สำหรับสถานที่ท่องเที่ยวที่ต้องการอินไซต์เชิงลึกและการแจ้งเตือนแบบทันท่วงที',
    featured: true,
    badge: lang === 'en' ? '⭐ Recommended for Business' : '⭐ แนะนำสำหรับผู้ประกอบการ',
    features: [
      { text: lang === 'en' ? 'Claim up to 1 destinations' : 'สิทธิ์ดูแลสูงสุด 1 สถานที่', ok: true },
      { text: lang === 'en' ? 'Sentiment overview + Breakdown' : 'ภาพรวมความรู้สึกพร้อมระบบจำแนกแยกย่อย', ok: true },
      { text: lang === 'en' ? 'Top keywords + Topic clusters' : 'คำสำคัญยอดนิยมและการจัดกลุ่มหัวข้อกลุ่มคำ', ok: true },
      { text: lang === 'en' ? 'Daily AI Summary' : 'รายงานสรุปโดย AI รายวัน', ok: true },
      { text: lang === 'en' ? 'Unlimited raw review access' : 'เข้าอ่านข้อมูลรีวิวดิบได้ไม่จำกัด', ok: true },
      { text: lang === 'en' ? 'Sentiment trend — last 12 months' : 'กราฟแนวโน้มความรู้สึกย้อนหลัง 12 เดือน', ok: true },
      { text: lang === 'en' ? 'Negative review alerts (real-time)' : 'ระบบแจ้งเตือนรีวิวเชิงลบแบบเรียลไทม์', ok: true },
      { text: lang === 'en' ? 'Export PDF/CSV reports' : 'ส่งออกรายงานสรุปผลเป็น PDF/CSV', ok: true },
      { text: lang === 'en' ? 'Competitor analysis' : 'ฟังก์ชันวิเคราะห์คู่แข่ง', ok: false },
    ],
    cta: lang === 'en' ? 'Register Now' : 'สมัครเลย',
    ctaStyle: 'primary',
    locked: false
  },
  {
    name: 'Enterprise',
    price: '฿X,XXX',
    locked: true,
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
    ctaStyle: 'locked',
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

export default function BusinessPage({ onOpenRegisterModal, currentLang = 'en', autoLogin }) {
  const translatedPlans = getPlans(currentLang);
  const translatedChips = getChips(currentLang);

  // 👈 เพิ่ม useEffect ตัวนี้กลับเข้าไปใน BusinessPage เพื่อคอยดักฟังคำสั่งจาก Navbar
  useEffect(() => {
    if (autoLogin) {
      onOpenRegisterModal(); // สั่งให้ App.js เปิด Modal ทันที
    }
  }, [autoLogin]);
  return (
    <div className="preview-page">
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
          <button className="biz-btn-primary" onClick={onOpenRegisterModal}>
            {currentLang === 'en' ? "Register Now" : "สมัครเลย"}
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
            {currentLang === 'en' ? "Business verification required — your account is reviewed before activation." : "จำเป็นต้องยืนยันตัวตนเจ้าของธุรกิจ — บัญชีจะได้รับการตรวจสอบก่อนเปิดใช้งาน"}
          </p>
        </div>

        <div className="pricing-grid">
          {translatedPlans.map(plan => (
            <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}${plan.locked ? ' locked' : ''}`}>
              {plan.badge && <div className="featured-badge">{plan.badge}</div>}
              
              <div className="plan-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {plan.name}
                {plan.locked && <Lock size={16} color="#C0C0C0" />}
              </div>

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
                disabled={plan.locked}
                onClick={() => !plan.locked && onOpenRegisterModal()}
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

          <div className="preview-metrics">
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">{currentLang === 'en' ? "Sentiment Score" : "คะแนนความรู้สึก"}</div>
              <div className="preview-metric-val pos">76%</div>
              <div className="preview-metric-sub">{currentLang === 'en' ? "↑ +3% from last month" : "↑ +3% จากเดือนก่อนหน้า"}</div>
            </div>
            <div className="preview-metric-box">
              <div className="preview-metric-lbl">{currentLang === 'en' ? "Total Reviews" : "จำนวนความคิดเห็นทั้งหมด"}</div>
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
                { color: '#F0997B', en: '"Too crowded, couldn\'t enjoy the wildlife at all during weekend"', th: '"คนเยอะและหนาแน่นเกินไป ช่วงวันหยุดเสาร์-อาทิตย์แทบไม่ได้สัมผัสธรรมชาติหรือเห็นสัตว์ป่าเลย"', time: 'TripAdvisor · 2 hours ago' },
                { color: '#F0997B', en: '"Facilities are poor, no proper restrooms near the main trail"', th: '"สิ่งอำนวยความสะดวกค่อนข้างแย่ ไม่มีห้องน้ำจัดเตรียมไว้ใกล้กับบริเวณเส้นทางเดินป่าหลักเลย"', time: 'Google · 5 hours ago' },
                { color: '#F59E0B', en: '"Entrance fee increased but service quality remains the same"', th: '"มีการปรับเพิ่มราคาค่าเข้าอุทยาน แต่คุณภาพการให้บริการและการดูแลยังคงเท่าเดิม"', time: 'Booking.com · Yesterday' },
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
          <span style={{ background: 'linear-gradient(135deg,#FE907F,#191D33)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {currentLang === 'en' ? "Ready to Grow Your Business?" : "พร้อมที่จะพัฒนาและขับเคลื่อนธุรกิจของคุณหรือยัง?"}
          </span>
        </h2>
        <p>
          {currentLang === 'en'
            ? "Join hundreds of tourism businesses already using TravelSense AI to understand their customers."
            : "ร่วมเป็นส่วนหนึ่งกับผู้ประกอบการท่องเที่ยวหลายร้อยรายที่เลือกใช้ TravelSense AI เพื่อเข้าถึงความต้องการของลูกค้าอย่างแท้จริง"}
        </p>
        <div className="biz-cta-btns">
          <button className="biz-btn-primary" onClick={onOpenRegisterModal}>
            {currentLang === 'en' ? "Register Now" : "สมัครเลย"}
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