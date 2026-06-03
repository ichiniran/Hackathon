import { useState, useEffect } from 'react';
import './DashboardPage.css';
import logoImg from '../assets/Logo_G23.png';

// compute base dates once at module load to avoid impure calls during render
const BASE_TS = Date.now();
const TODAY_ISO = new Date(BASE_TS).toISOString().slice(0,10);
const YESTERDAY_ISO = new Date(BASE_TS - 24 * 60 * 60 * 1000).toISOString().slice(0,10);

// ── Navigation items ──
const getNavItems = (lang) => [
  { id: 'overview',     label: lang === 'en' ? 'Overview'    : 'ภาพรวมระบบ',         notif: null,
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: 'reviews',      label: lang === 'en' ? 'Reviews'     : 'ความคิดเห็น',          notif: 3,
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'trends',       label: lang === 'en' ? 'Trends'      : 'แนวโน้มข้อมูล',         notif: null,
    icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: 'alerts',       label: lang === 'en' ? 'Alerts'      : 'ระบบแจ้งเตือน',         notif: 2,
    icon: <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { id: 'wordcloud',    label: lang === 'en' ? 'Word Cloud'  : 'กลุ่มคำ',              notif: null,
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg> },
  { id: 'suggestions',  label: lang === 'en' ? 'Suggestions' : 'คำแนะนำ',              notif: null,
    icon: <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { id: 'reports',      label: lang === 'en' ? 'Reports'     : 'รายงานสรุปผล',          notif: null,
    icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
];

const getBizItems = (lang) => [
  { id: 'places',     label: lang === 'en' ? 'My Places'  : 'สถานที่ของฉัน',
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'competitor', label: lang === 'en' ? 'Competitor'  : 'การวิเคราะห์คู่แข่ง',
    icon: <svg viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg> },
  { id: 'settings',   label: lang === 'en' ? 'Settings'    : 'ตั้งค่าระบบ',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg> },
];

const getTabTitles = (lang) => ({
  overview:    lang === 'en' ? 'Overview'               : 'ภาพรวมระบบ',
  reviews:     lang === 'en' ? 'Reviews'                : 'รายการความคิดเห็น',
  trends:      lang === 'en' ? 'Trends'                 : 'แนวโน้มการเติบโต',
  alerts:      lang === 'en' ? 'Alerts'                 : 'กล่องแจ้งเตือนภัย',
  suggestions: lang === 'en' ? 'Suggestions'            : 'คำแนะนำการปรับปรุง',
  wordcloud:   lang === 'en' ? 'Word Cloud'             : 'กลุ่มคำรีวิว',
  reports:     lang === 'en' ? 'Reports'                : 'การออกรายงานผล',
  places:      lang === 'en' ? 'My Places'              : 'สถานที่ของฉัน',
});

// ── Theme Toggle ──
function ThemeToggle({ dark, onToggle, currentLang }) {
  const label = currentLang === 'en'
    ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
    : (dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด');
  return (
    <button className="theme-toggle" onClick={onToggle} title={label} aria-label={label}>
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

// ── Tab: Overview (ย้ายระบบกรองเวลาและปุ่มส่งออกเข้าคอมโพเนนต์) ──
function TabOverview({ currentLang }) {
  // เพิ่ม State ภายในสำหรับจัดการปุ่มกดตัวกรองช่วงเวลาในหน้านี้
  const [timePeriod, setTimePeriod] = useState('7days'); // today | 7days | 2weeks | 1month

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* ── 🟢 แถบเครื่องมือควบคุมใหม่ (Mini Toolbar Panel) ── */}
      <div className="dash-panel" style={{ padding: '12px 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
        
        {/* ฝั่งซ้าย: ตัวเลือกช่วงเวลากระชับสัดส่วนดีไซน์ชิป */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginRight: '4px' }}>
            {currentLang === 'en' ? 'Period:' : 'ช่วงเวลา:'}
          </span>
          <button 
            className={`review-filter-chip${timePeriod === 'today' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('today')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? 'Today' : 'วันนี้'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '7days' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('7days')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '7 Days' : '7 วันที่แล้ว'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '2weeks' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('2weeks')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '2 Weeks' : '2 สัปดาห์'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '1month' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('1month')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '1 Month' : '1 เดือนที่แล้ว'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '3month' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('3month')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '3 Month' : '3 เดือนที่แล้ว'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '6month' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('6month')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '6 Month' : '6 เดือนที่แล้ว'}
          </button>
          <button 
            className={`review-filter-chip${timePeriod === '1year' ? ' active' : ''}`} 
            onClick={() => setTimePeriod('1year')}
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            {currentLang === 'en' ? '1 Year' : '1 ปีที่แล้ว'}
          </button>
        </div>

        {/* ฝั่งขวา: กลุ่มปุ่มกดส่งออกไฟล์ แยกโครงสร้างชัดเจน */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
            {currentLang === 'en' ? 'Export:' : 'ส่งออกข้อมูล:'}
          </span>
          
          {/* ปุ่มส่งออก PDF */}
          <button 
            className="dash-export-btn" 
            onClick={() => alert('Generating PDF report...')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '11px', borderRadius: '6px', height: 'auto' }}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            PDF
          </button>
          
          {/* ปุ่มส่งออก CSV */}
          <button 
            className="dash-export-btn" 
            onClick={() => alert('Exporting CSV sheet data...')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '11px', borderRadius: '6px', height: 'auto', color: '#22C55E', borderColor: '#22C55E' }}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            CSV
          </button>
        </div>

      </div>

      {/* ── 1. แผงตัวเลขสถิติหลัก ── */}
      <div className="dash-metrics">
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Sentiment score' : 'คะแนนดัชนีความรู้สึก'}</div>
          <div className="dm-val pos" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'baseline', gap: 6 }}>
            76%
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#22C55E' }}>
              {currentLang === 'en' ? '(Good)' : '(ดีมาก)'}
            </span>
          </div>
          <div className="dm-delta up">{currentLang === 'en' ? '↑ +3% from last month' : '↑ +3% จากเดือนก่อนหน้า'}</div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Total reviews' : 'ความคิดเห็นทั้งหมด'}</div>
          <div className="dm-val">1,247</div>
          <div className="dm-delta">{currentLang === 'en' ? '+82 new this month' : '+82 รายการใหม่เดือนนี้'}</div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Negative reviews' : 'ความคิดเห็นเชิงลบ'}</div>
          <div className="dm-val neg" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            87
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#EF4444' }}>
              {currentLang === 'en' ? '(7% of total)' : '(7% ของทั้งหมด)'}
            </span>
          </div>
          <div className="dm-delta dn">{currentLang === 'en' ? '↑ +5 this week' : '↑ +5 รายการสัปดาห์นี้'}</div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Positive reviews' : 'ความคิดเห็นเชิงบวก'}</div>
          <div className="dm-val pos" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            947
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#22C55E' }}>
              {currentLang === 'en' ? '(76% of total)' : '(76% ของทั้งหมด)'}
            </span>
          </div>
          <div className="dm-delta up">{currentLang === 'en' ? '↑ +12 this week' : '↑ +12 รายการสัปดาห์นี้'}</div>
        </div>
      </div>

      {/* ── 2. แผงควบคุมกราฟแนวโน้ม และ Topic จำแนก ── */}
      <div className="dash-row2 dash-row2-overview">
        <div className="dash-panel">
          <div className="dp-title">
            {currentLang === 'en' ? 'Sentiment trend — 6 months' : 'แนวโน้มดัชนีความรู้สึก — ย้อนหลัง 6 เดือน'}
          </div>
          {[
            [currentLang === 'en' ? 'Jan' : 'ม.ค.', 68, '#F59E0B'],
            [currentLang === 'en' ? 'Feb' : 'ก.พ.', 71, '#22C55E'],
            [currentLang === 'en' ? 'Mar' : 'มี.ค.', 65, '#F59E0B'],
            [currentLang === 'en' ? 'Apr' : 'เม.ย.', 73, '#22C55E'],
            [currentLang === 'en' ? 'May' : 'พ.ค.', 74, '#22C55E'],
            [currentLang === 'en' ? 'Jun' : 'มิ.ย.', 76, '#22C55E'],
          ].map(([m, p, c]) => (
            <div key={m} className="d-trend-row">
              <div className="d-trend-mo">{m}</div>
              <div className="d-trend-track"><div className="d-trend-fill" style={{ width: `${p}%`, background: c }} /></div>
              <div className="d-trend-pct">{p}%</div>
            </div>
          ))}
        </div>
        <div className="dash-panel">
          <div className="dp-title">{currentLang === 'en' ? 'Sentiment breakdown' : 'สัดส่วนการจำแนกความรู้สึก'}</div>
          {[
            [currentLang === 'en' ? 'Positive' : 'แง่บวก', 76, '#22C55E'],
            [currentLang === 'en' ? 'Neutral'  : 'ทั่วไป',  17, '#F59E0B'],
            [currentLang === 'en' ? 'Negative' : 'แง่ลบ',   7, 'var(--coral-dark)'],
          ].map(([l, p, c]) => (
            <div key={l} className="d-sent-row">
              <div className="d-sent-lbl">{l}</div>
              <div className="d-sent-track"><div className="d-sent-fill" style={{ width: `${p}%`, background: c }} /></div>
              <div className="d-sent-pct" style={{ color: c }}>{p}%</div>
            </div>
          ))}
          <div className="d-sec-lbl">{currentLang === 'en' ? 'Top issues (negative reviews)' : 'หัวข้อปัญหาหลัก (จากรีวิวแง่ลบ)'}</div>
          {[
            [currentLang === 'en' ? 'Overcrowding' : 'ความแออัดของนักท่องเที่ยว', 78, 34],
            [currentLang === 'en' ? 'Facilities'   : 'สิ่งอำนวยความสะดวกไม่เพียงพอ', 48, 21],
            [currentLang === 'en' ? 'Entrance fee' : 'ราคาค่าเข้าชมอุทยาน', 34, 15],
          ].map(([n, w, p]) => (
            <div key={n} className="d-topic-row">
              <div className="d-topic-name">{n}</div>
              <div className="d-topic-track"><div className="d-topic-fill" style={{ width: `${w}%`, background: '#ff876f' }} /></div>
              <div className="d-topic-pct">{p}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. แผงควบคุม คีย์เวิร์ด และ ตัวแจ้งเตือนด่วนด้านล่าง ── */}
      <div className="dash-row3">
        <div className="dash-panel">
          <div className="dp-title">{currentLang === 'en' ? 'Top keywords' : 'คำสำคัญยอดนิยม'}</div>
          <div className="d-sec-lbl"><span className="text-pos">{currentLang === 'en' ? 'Positive' : 'เชิงบวก'}</span></div>
          <div className="d-kw-cloud" style={{ marginBottom: 10 }}>
            {[
              currentLang === 'en' ? 'beautiful waterfalls' : 'น้ำตกสวยงามมาก',
              currentLang === 'en' ? 'lush green nature'    : 'ป่าไม้อุดมสมบูรณ์',
              currentLang === 'en' ? 'stunning views' : 'ทัศนียภาพงดงาม',
              currentLang === 'en' ? 'peaceful'    : 'ความสงบ',
              currentLang === 'en' ? 'birdwatching': 'กิจกรรมส่องนก',
            ].map(k => <span key={k} className="d-kw pos">{k}</span>)}
          </div>
          <div className="d-sec-lbl"><span className="text-neg">{currentLang === 'en' ? 'Negative' : 'เชิงลบ'}</span></div>
          <div className="d-kw-cloud">
            {[
              currentLang === 'en' ? 'crowded'     : 'ความแออัด',
              currentLang === 'en' ? 'overpriced'  : 'ราคาแพงเกินไป',
              currentLang === 'en' ? 'no restroom' : 'ไม่มีห้องน้ำ',
              currentLang === 'en' ? 'long queue'  : 'คิวยาวมาก',
            ].map(k => <span key={k} className="d-kw neg">{k}</span>)}
          </div>
        </div>
        <div className="dash-panel">
          <div className="dp-title">
            {currentLang === 'en' ? <><span className="text-neg">Negative</span> alerts</> : <>ระบบแจ้งเตือนกรณีรีวิว<span className="text-neg">เชิงลบ</span></>}{' '}
            <span style={{ background: 'var(--alert-badge-bg)', color: 'var(--coral-dark)', fontSize: 10, padding: '2px 7px', borderRadius: 100, textTransform: 'none', fontWeight: 500, letterSpacing: 0, marginLeft: 4 }}>
              {currentLang === 'en' ? '2 new' : 'ใหม่ 2 รายการ'}
            </span>
          </div>
          {[
            { c: 'var(--coral-dark)', en: '"Too crowded, couldn\'t enjoy the wildlife at all"',      th: '"แออัดเกินไป ไม่สามารถเพลิดเพลินกับการชมสัตว์ป่าธรรมชาติได้เลย"', s: 'TripAdvisor', time: currentLang === 'en' ? '2h ago'    : '2 ชม. ที่แล้ว' },
            { c: 'var(--coral-dark)', en: '"No proper restrooms near the main trail"',                th: '"ไม่มีห้องน้ำที่ถูกสุขลักษณะจัดเตรียมไว้ใกล้กับเส้นทางเดินป่าหลัก"', s: 'Google',      time: currentLang === 'en' ? '5h ago'    : '5 ชม. ที่แล้ว' },
            { c: '#F59E0B',           en: '"Fee increased but service hasn\'t improved"',             th: '"ปรับเพิ่มค่าธรรมเนียม แต่การบริการและการจัดการยังไม่พัฒนา"',          s: 'Booking.com', time: currentLang === 'en' ? 'Yesterday' : 'เมื่อวานนี้' },
          ].map((a, i) => (
            <div key={i} className="d-alert-item">
              <div className="d-alert-dot" style={{ background: a.c }} />
              <div>
                <div className="d-alert-txt">{currentLang === 'en' ? a.en : a.th}</div>
                <div className="d-alert-meta"><span className="d-plat">{a.s}</span> {a.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="dash-panel">
          <div className="dp-title">{currentLang === 'en' ? 'Recent raw reviews' : 'ความคิดเห็นดิบล่าสุด'}</div>
          {[
            { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'TripAdvisor', date: currentLang === 'en' ? 'Today'     : 'วันนี้',        en_txt: '"Absolutely stunning — saw 3 elephants right by the road!"',        th_txt: '"งดงามมากจริงๆ เจอช้างป่า 3 ตัวเดินอยู่ข้างถนนเลย!"' },
            { tag: 'neg', el: 'Negative', tl: 'แง่ลบ',  plat: 'Google',      date: currentLang === 'en' ? 'Today'     : 'วันนี้',        en_txt: '"Too many people, felt like a theme park."',                        th_txt: '"นักท่องเที่ยวเยอะเกินไป บรรยากาศเหมือนสวนสนุก"' },
            { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'Agoda',        date: currentLang === 'en' ? 'Yesterday' : 'เมื่อวานนี้',   en_txt: '"Best birdwatching spot in Thailand. Came at 6am, worth it."',     th_txt: '"จุดส่องนกที่ดีที่สุดในไทย มาตอน 6 โมงเช้า คุ้มค่ามาก"' },
          ].map((r, i) => (
            <div key={i} className="d-review-item">
              <div className="d-review-top">
                <span className={`d-rtag d-rtag-${r.tag}`}>{currentLang === 'en' ? r.el : r.tl}</span>
                <span className="d-rplat">{r.plat}</span>
                <span className="d-rdate">{r.date}</span>
              </div>
              <div className="d-rtxt">{currentLang === 'en' ? r.en_txt : r.th_txt}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
// ── Tab: Reviews (Compact Version - No Search) ──
function TabReviews({ onGoPlans, currentLang }) {
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all | today | yesterday | custom
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const reviews = [
    { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'TripAdvisor', date: currentLang === 'en' ? 'Today' : 'วันนี้', et: '"Absolutely stunning place. Saw 3 elephants right by the road — absolutely magical. Will definitely come back."', tt: '"สถานที่งดงามประทับใจมาก เจอช้างป่า 3 ตัวข้างถนน สวยงามราวกับเวทมนตร์ จะกลับมาอีกแน่นอน"' },
    { tag: 'neg', el: 'Negative', tl: 'แง่ลบ', plat: 'Google', date: currentLang === 'en' ? 'Today' : 'วันนี้', et: '"Too many tourists, felt like a theme park not a national park. Weekends are a disaster. Go on weekdays only."', tt: '"นักท่องเที่ยวหนาแน่นเกินไป บรรยากาศเหมือนสวนสนุก ช่วงวันหยุดคือพังมาก แนะนำมาวันธรรมดาเท่านั้น"' },
    { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'Agoda', date: currentLang === 'en' ? 'Yesterday' : 'เมื่อวานนี้', et: '"Best birdwatching spot in Thailand. Arrived at 6am, totally worth the early wake-up. Over 200 species spotted."', tt: '"ทำเลส่องนกที่ดีที่สุดในประเทศไทย มาถึงตอน 6 โมงเช้า คุ้มค่ามาก สำรวจพบนกกว่า 200 สายพันธุ์"' },
    { tag: 'neu', el: 'Neutral', tl: 'ทั่วไป', plat: 'Booking.com', date: currentLang === 'en' ? '2 days ago' : '2 วันที่แล้ว', et: '"Visited on a weekday and found the park relatively quiet. Entry procedures were smooth, and there was ample parking available."', tt: '"ไปเที่ยวช่วงวันธรรมดา คนไม่มากนัก การเข้าชมเป็นไปตามขั้นตอนปกติ มีจุดจอดรถเพียงพอ"' },
    { tag: 'neg', el: 'Negative', tl: 'แง่ลบ', plat: 'Google', date: currentLang === 'en' ? '3 days ago' : '3 วันที่แล้ว', et: '"Facilities are really poor. No proper restrooms near the main trail entrance."', tt: '"ระบบสิ่งอำนวยความสะดวกแย่มาก ไม่มีห้องน้ำบริการใกล้บริเวณจุดบริการเส้นทางเดินป่าหลักเลย"' },
  ];

  const reviewsWithDates = reviews.map((r, idx) => {
    const daysAgo = r.daysAgo ?? (r.date && r.date.toLowerCase().includes('today') ? 0 : r.date && r.date.toLowerCase().includes('yesterday') ? 1 : (idx === 3 ? 2 : idx === 4 ? 3 : 0));
    const iso = new Date(BASE_TS - daysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    return { ...r, daysAgo, dateISO: iso };
  });

  const platforms = ['all', ...new Set(reviewsWithDates.map(r => r.plat))];

  const filteredReviews = reviewsWithDates.filter(r => {
    const sentimentOk = selectedSentiment === 'all' || r.tag === selectedSentiment;
    const sourceOk = selectedSource === 'all' || r.plat === selectedSource;

    let dateOk = true;
    if (dateFilter === 'today') {
      dateOk = r.dateISO === TODAY_ISO;
    } else if (dateFilter === 'yesterday') {
      dateOk = r.dateISO === YESTERDAY_ISO;
    } else if (dateFilter === 'custom' && customStart && customEnd) {
      dateOk = r.dateISO >= customStart && r.dateISO <= customEnd;
    }

    return sentimentOk && sourceOk && dateOk;
  });

  const totalCount = 1247;
  const posCount = 947;    
  const negCount = 87;     
  const neuCount = totalCount - posCount - negCount;
  const pct = (n) => totalCount ? Math.round((n / totalCount) * 100) : 0;

  return (
    <div>
      {/* 1. สถิติด้านบน */}
      <div className="dash-metrics" style={{ marginBottom: 12, gap: 10 }}>
        <div className="dash-metric" style={{ padding: '10px 14px' }}>
          <div className="dm-lbl" style={{ fontSize: 11 }}>{currentLang === 'en' ? 'Total' : 'ทั้งหมด'}</div>
          <div className="dm-val" style={{ fontSize: '1.25rem' }}>{totalCount}</div>
        </div>
        <div className="dash-metric" style={{ padding: '10px 14px' }}>
          <div className="dm-lbl" style={{ fontSize: 11 }}>{currentLang === 'en' ? 'Positive' : 'เชิงบวก'}</div>
          <div className="dm-val pos" style={{ fontSize: '1.25rem' }}>{posCount} <span style={{ fontSize: 11, color: '#22C55E' }}>{pct(posCount)}%</span></div>
        </div>
        <div className="dash-metric" style={{ padding: '10px 14px' }}>
          <div className="dm-lbl" style={{ fontSize: 11 }}>{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</div>
          <div className="dm-val" style={{ fontSize: '1.25rem' }}>{neuCount} <span style={{ fontSize: 11, color: '#F59E0B' }}>{pct(neuCount)}%</span></div>
        </div>
        <div className="dash-metric" style={{ padding: '10px 14px' }}>
          <div className="dm-lbl" style={{ fontSize: 11 }}>{currentLang === 'en' ? 'Negative' : 'เชิงลบ'}</div>
          <div className="dm-val neg" style={{ fontSize: '1.25rem' }}>{negCount} <span style={{ fontSize: 11, color: '#EF4444' }}>{pct(negCount)}%</span></div>
        </div>
      </div>

      {/* 2. 🟢 แถบตัวกรองขนาดเล็กแถวเดียว ครบทั้ง (ทั้งหมด / บวก / กลาง / ลบ) */}
      <div className="dash-panel" style={{ padding: '10px 14px', marginBottom: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        
        {/* เลือกความรู้สึกแบบครบ 3 ป้ายตามสเปกเดิม */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { value: 'all', label: currentLang === 'en' ? 'All' : 'ทั้งหมด' },
            { value: 'pos', label: currentLang === 'en' ? 'Positive' : 'บวก' },
            { value: 'neu', label: currentLang === 'en' ? 'Neutral' : 'กลาง' },
            { value: 'neg', label: currentLang === 'en' ? 'Negative' : 'ลบ' },
          ].map(opt => (
            <button key={opt.value} type="button" className={`review-filter-chip${selectedSentiment === opt.value ? ' active' : ''}`} onClick={() => setSelectedSentiment(opt.value)} style={{ padding: '4px 10px', fontSize: '11px' }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* แหล่งที่มา Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderLeft: '1px solid #eee', paddingLeft: '10px' }}>
          <select 
            value={selectedSource} 
            onChange={e => setSelectedSource(e.target.value)}
            style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--border-color, #E8E8E8)', background: 'transparent', fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            <option value="all">{currentLang === 'en' ? 'All Sources' : 'ทุกแหล่งรีวิว'}</option>
            {platforms.filter(p => p !== 'all').map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* ช่วงเวลา Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #eee', paddingLeft: '10px' }}>
          <select 
            value={dateFilter} 
            onChange={e => setDateFilter(e.target.value)}
            style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--border-color, #E8E8E8)', background: 'transparent', fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            <option value="all">{currentLang === 'en' ? 'All Time' : 'ทุกช่วงเวลา'}</option>
            <option value="today">{currentLang === 'en' ? 'Today' : 'วันนี้'}</option>
            <option value="yesterday">{currentLang === 'en' ? 'Yesterday' : 'เมื่อวาน'}</option>
            <option value="custom">{currentLang === 'en' ? 'Custom...' : 'กำหนดวันเอง...'}</option>
          </select>

          {dateFilter === 'custom' && (
            <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px' }} />
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '11px' }} />
            </div>
          )}
        </div>
      </div>

      {/* 3. รายการผลลัพธ์ข้อมูล */}
      <div style={{ marginBottom: 8, marginLeft: 4, fontSize: 12, color: 'var(--text-muted)' }}>
        {currentLang === 'en'
          ? `Found ${filteredReviews.length} reviews`
          : `พบข้อมูลรีวิวทั้งหมด ${filteredReviews.length} รายการ`}
      </div>

      <div className="dash-panel" style={{ marginBottom: 12 }}>
        {filteredReviews.map((r, i) => (
          <div key={i} className="d-review-item" style={{ padding: '10px 0' }}>
            <div className="dash-metric-lbl" style={{ marginBottom: 4, fontSize: '11px' }}>
              <span className={`d-rtag d-rtag-${r.tag}`} style={{ marginRight: 6, padding: '2px 6px' }}>{currentLang === 'en' ? r.el : r.tl}</span>
              <span className="d-rplat" style={{ marginRight: 6 }}>{r.plat}</span>
              <span className="d-rdate">{r.date}</span>
            </div>
            <div className="d-rtxt" style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>{currentLang === 'en' ? r.et : r.tt}</div>
          </div>
        ))}
        
        {filteredReviews.length === 0 && (
          <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
            🔍 {currentLang === 'en' ? 'No results found.' : 'ไม่พบข้อมูลที่ตรงตามเงื่อนไข'}
          </div>
        )}
      </div>

      <div className="upgrade-prompt" style={{ padding: '12px 16px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title" style={{ fontSize: '13px' }}>{currentLang === 'en' ? 'Upgrade to Enterprise for competitor review access' : 'อัปเกรดเป็นระดับ Enterprise เพื่อสิทธิ์เข้าถึงรีวิวของคู่แข่ง'}</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans} style={{ padding: '6px 12px', fontSize: '12px' }}>{currentLang === 'en' ? 'View Plans' : 'ดูแพ็กเกจ'}</button>
      </div>
    </div>
  );
}
// ── Tab: Trends ──
function TabTrends({ onGoPlans, currentLang }) {
  // 🟢 1. เพิ่ม State สำหรับเลือกกรองปี (ค่าเริ่มต้นเป็นปีปัจจุบัน 2026)
  const [selectedYear, setSelectedYear] = useState('2026');

  // 🟢 2. จัดกลุ่มชุดข้อมูลจำลองแยกรายเดือน (Jan - Dec) ตามปี
  const trendDataByYear = {
    '2026': [
      ['Jan', 68], ['Feb', 71], ['Mar', 65], ['Apr', 73], ['May', 74], ['Jun', 76],
      ['Jul', 78], ['Aug', 80], ['Sep', 75], ['Oct', 79], ['Nov', 82], ['Dec', 85]
    ],
    '2025': [
      ['Jan', 60], ['Feb', 62], ['Mar', 58], ['Apr', 64], ['May', 66], ['Jun', 69],
      ['Jul', 52], ['Aug', 58], ['Sep', 65], ['Oct', 70], ['Nov', 72], ['Dec', 69]
    ]
  };

  // ดึงข้อมูลของปีที่เลือกมาแสดงผลบนกราฟเส้น
  const currentDataset = trendDataByYear[selectedYear] || trendDataByYear['2026'];

  return (
    <div className="dash-row2">
      <div className="dash-panel">
        
        {/* ── 🟢 3. ส่วนหัวและปุ่มกดกรองเลือกปี ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div className="dp-title" style={{ marginBottom: 0 }}>
            {currentLang === 'en' ? `Monthly sentiment — Year ${selectedYear}` : `สถิติดัชนีความรู้สึกรายเดือน — ประจำปี ${selectedYear}`}
          </div>
          
          {/* ปุ่มสลับฟิลเตอร์ปีล้อตามสไตล์ระบบเดิม */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '4px' }}>
              {currentLang === 'en' ? 'Year:' : 'ปี:'}
            </span>
            <button 
              className={`review-filter-chip${selectedYear === '2026' ? ' active' : ''}`} 
              onClick={() => setSelectedYear('2026')}
            >
              2026
            </button>
            <button 
              className={`review-filter-chip${selectedYear === '2025' ? ' active' : ''}`} 
              onClick={() => setSelectedYear('2025')}
            >
              2025
            </button>
          </div>
        </div>

        {/* ── ส่วนโครงสร้างกราฟเส้น SVG (Jan - Dec) ── */}
        <div className="sentiment-line-chart-wrapper" style={{ width: '100%', overflowX: 'auto', padding: '10px 0' }}>
          <svg viewBox="0 0 600 220" width="100%" height="220" style={{ overflow: 'visible' }}>
            {/* 1. เส้นกริดแนวตั้งและชื่อเดือน (X-Axis มกราคม - ธันวาคม) */}
            {currentDataset.map(([m, p], i) => {
              const x = 30 + i * 50; 
              const y = 180 - (p - 40) * 4; 

              return (
                <g key={m}>
                  <line x1={x} y1="20" x2={x} y2="180" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4 4" />
                  <text x={x} y="202" fill="#9CA3AF" fontSize="12" textAnchor="middle" fontWeight="500">
                    {m}
                  </text>
                  <circle cx={x} cy={y} r="5" fill="#fff" stroke={p >= 70 ? '#22C55E' : p >= 60 ? '#F59E0B' : '#EF4444'} strokeWidth="3" />
                  <text x={x} y={y - 10} fill="#4B5563" fontSize="11" fontWeight="600" textAnchor="middle">
                    {p}%
                  </text>
                </g>
              );
            })}

            {/* 2. เส้นแกนล่างสุด (Baseline X) */}
            <line x1="15" y1="180" x2="590" y2="180" stroke="#E5E7EB" strokeWidth="1.5" />

            {/* 3. ตัวลากเส้นกราฟหลักเชื่อมต่อพิกัดแนวโน้มไดนามิก */}
            <path
              d={currentDataset.reduce((acc, [_, p], i) => {
                const x = 30 + i * 50;
                const y = 180 - (p - 40) * 4;
                return acc + `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
              }, '')}
              fill="none"
              stroke="url(#trend-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <defs>
              <linearGradient id="trend-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── ส่วนคำอธิบายสัญลักษณ์สีใต้กราฟ ── */}
        <div className="chart-legend" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F3F4F6', fontSize: '0.78rem', fontWeight: 500, color: '#666' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
            {currentLang === 'en' ? 'Positive (≥ 70%)' : 'แง่บวก (≥ 70%)'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
            {currentLang === 'en' ? 'Neutral (60% - 69%)' : 'ทั่วไป (60% - 69%)'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
            {currentLang === 'en' ? 'Negative (< 60%)' : 'แง่ลบ (< 60%)'}
          </div>
        </div>
      </div>

      {/* บล็อกวิเคราะห์ประเด็นเชิงลบด้านล่าง คงเดิมทุกประการ */}
      <div className="dash-panel">
        <div className="dp-title">
          {currentLang === 'en' ? 'Top negative topics over time' : 'ประเด็นข้อขัดแย้งเชิงลบหลักในแต่ละช่วงเวลา'}
        </div>
        <div className="d-sec-lbl" style={{ marginTop: 0 }}>{currentLang === 'en' ? 'Jun (this month)' : 'มิ.ย. (เดือนนี้)'}</div>
        {[
          [currentLang === 'en' ? 'Overcrowding' : 'ความแออัดของนักท่องเที่ยว',          78, 34],
          [currentLang === 'en' ? 'Facilities'   : 'สิ่งอำนวยความสะดวกชำรุด/ไม่เพียงพอ', 48, 21],
        ].map(([n, w, p]) => (
          <div key={n} className="d-topic-row">
            <div className="d-topic-name">{n}</div>
            <div className="d-topic-track"><div className="d-topic-fill" style={{ width: `${w}%`, background: '#EF4444' }} /></div>
            <div className="d-topic-pct">{p}%</div>
          </div>
        ))}
        <div className="d-sec-lbl">{currentLang === 'en' ? 'May (last month)' : 'พ.ค. (เดือนที่แล้ว)'}</div>
        {[
          [currentLang === 'en' ? 'Overcrowding' : 'ความแออัดของนักท่องเที่ยว', 70, 31],
          [currentLang === 'en' ? 'Entrance fee' : 'ราคาค่าธรรมเนียมเข้าชมสูง',  42, 18],
        ].map(([n, w, p]) => (
          <div key={n} className="d-topic-row">
            <div className="d-topic-name">{n}</div>
            <div className="d-topic-track"><div className="d-topic-fill" style={{ width: `${w}%`, background: '#EF4444' }} /></div>
            <div className="d-topic-pct">{p}%</div>
          </div>
        ))}
        <div className="upgrade-prompt" style={{ marginTop: 16 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div className="upgrade-txt">
            <div className="upgrade-title">{currentLang === 'en' ? 'Competitor comparison available in Enterprise' : 'ฟังก์ชันเปรียบเทียบคู่แข่งใช้งานได้เฉพาะระดับ Enterprise'}</div>
          </div>
          <button className="upgrade-btn" onClick={onGoPlans}>{currentLang === 'en' ? 'Upgrade' : 'อัปเกรด'}</button>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Alerts ──
function TabAlerts({ currentLang }) {
  return (
    <div>
      <div style={{ marginBottom: 14, fontSize: 13, color: 'var(--text-muted)' }}>
        {currentLang === 'en' ? '2 new alerts · Last updated 2 hours ago' : 'การแจ้งเตือนใหม่ 2 รายการ · อัปเดตล่าสุดเมื่อ 2 ชม. ที่แล้ว'}
      </div>
      <div className="dash-panel">
        {[
          { c: 'var(--coral-dark)', et: '"Too crowded, couldn\'t enjoy the wildlife at all during the weekend."',              tt: '"ความหนาแน่นมากเกินไป ไม่ได้รับความสนุกในการรับชมสัตว์ป่าธรรมชาติเลยช่วงวันหยุด"',                                        s: 'TripAdvisor', time: currentLang === 'en' ? '2 hours ago' : '2 ชม. ที่แล้ว',  isNew: true  },
          { c: 'var(--coral-dark)', et: '"No proper restrooms near the main trail entrance — very disappointing."',             tt: '"ไม่มีห้องน้ำที่จัดการดีๆ ใกล้กับจุดเส้นทางเดินป่าหลักเลย น่าผิดหวังมาก"',                                               s: 'Google',      time: currentLang === 'en' ? '5 hours ago' : '5 ชม. ที่แล้ว',  isNew: true  },
          { c: 'var(--coral-dark)',           et: '"Entrance fee increased significantly but the quality of service remains the same."',  tt: '"ราคาค่าธรรมเนียมปรับเพิ่มขึ้นอย่างมาก แต่คุณภาพการจัดการและสิ่งอำนวยความสะดวกยังคงเท่าเดิม"',                             s: 'Booking.com', time: currentLang === 'en' ? 'Yesterday'   : 'เมื่อวานนี้',   isNew: false },
          { c: 'var(--coral-dark)',           et: '"Parking is a mess on weekends. Took 45 minutes just to find a spot."',               tt: '"การจอดรถวุ่นวายมากช่วงวันหยุด ใช้เวลาเดินหาที่จอดรถตั้ง 45 นาที"',                                                        s: 'Google',      time: currentLang === 'en' ? '2 days ago'  : '2 วันที่แล้ว', isNew: false },
        ].map((a, i) => (
          <div key={i} className="d-alert-item">
            <div className="d-alert-dot" style={{ background: a.c }} />
            <div style={{ flex: 1 }}>
              <div className="d-alert-txt">{currentLang === 'en' ? a.et : a.tt}</div>
              <div className="d-alert-meta">
                <span className="d-plat">{a.s}</span>
                <span className="d-plat">{a.time}</span>
                {a.isNew && <span style={{ color: 'var(--coral-dark)', fontSize: 10, fontWeight: 600 }}>{currentLang === 'en' ? '● New' : '● ใหม่'}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Suggestions (คำแนะนำการปรับปรุง) ──
function TabSuggestions({ currentLang }) {
  const issues = [
    {
      id: 1, priority: 'high', icon: '🚨',
      en_title: 'Overcrowding Management',
      th_title: 'จัดการความแออัดของนักท่องเที่ยว',
      en_count: '34% of negative reviews', th_count: '34% ของรีวิวเชิงลบ',
      suggestions: [
        { en: 'Implement timed entry tickets to limit daily visitors',          th: 'ออกบัตรเข้าชมแบบกำหนดเวลา เพื่อควบคุมจำนวนผู้เข้าชมต่อวัน' },
        { en: 'Add real-time crowd level indicator on website/app',             th: 'แสดงระดับความแออัดแบบเรียลไทม์บนเว็บไซต์และแอป' },
        { en: 'Offer early-bird discount to encourage off-peak visits',         th: 'มอบส่วนลดช่วงเช้าเพื่อกระจายนักท่องเที่ยวออกจากช่วงพีค' },
      ],
    },
    {
      id: 2, priority: 'high', icon: '🚽',
      en_title: 'Restroom & Facilities',
      th_title: 'ห้องน้ำและสิ่งอำนวยความสะดวก',
      en_count: '21% of negative reviews', th_count: '21% ของรีวิวเชิงลบ',
      suggestions: [
        { en: 'Install additional portable restrooms near main trail',          th: 'ติดตั้งห้องน้ำสำเร็จรูปเพิ่มเติมบริเวณเส้นทางเดินป่าหลัก' },
        { en: 'Increase cleaning frequency during peak hours',                  th: 'เพิ่มรอบการทำความสะอาดในช่วงเวลาที่มีนักท่องเที่ยวมาก' },
        { en: 'Add rest shelters with drinking water stations',                 th: 'จัดเพิ่มศาลาพักและจุดบริการน้ำดื่มตามเส้นทาง' },
      ],
    },
    {
      id: 3, priority: 'medium', icon: '💰',
      en_title: 'Entrance Fee Perception',
      th_title: 'การรับรู้เรื่องราคาค่าเข้าชม',
      en_count: '15% of negative reviews', th_count: '15% ของรีวิวเชิงลบ',
      suggestions: [
        { en: 'Clearly communicate what fee covers (conservation fund, etc.)', th: 'สื่อสารให้ชัดเจนว่าค่าธรรมเนียมนำไปใช้ทำอะไรบ้าง (กองทุนอนุรักษ์ ฯลฯ)' },
        { en: 'Bundle value-adds: guided tour, trail map, drinking water',      th: 'จัดแพ็กเกจคุ้มค่า: ไกด์นำชม แผนที่เส้นทาง น้ำดื่ม' },
        { en: 'Introduce loyalty passes for repeat visitors',                   th: 'ออกบัตรสะสมสิทธิ์สำหรับนักท่องเที่ยวที่กลับมาซ้ำ' },
      ],
    },
    {
      id: 4, priority: 'low', icon: '🅿️',
      en_title: 'Parking Management',
      th_title: 'การจัดการที่จอดรถ',
      en_count: '10% of negative reviews', th_count: '10% ของรีวิวเชิงลบ',
      suggestions: [
        { en: 'Add parking availability signage at entrance road',              th: 'ติดป้ายแสดงสถานะที่จอดรถตั้งแต่ต้นทางก่อนถึงลานจอด' },
        { en: 'Open overflow parking on weekends with shuttle service',         th: 'เปิดพื้นที่จอดรถสำรองวันหยุด พร้อมรถรับส่ง' },
      ],
    },
  ];

  const priorityConfig = {
    high:   { en: 'High Priority',   th: 'ความเร่งด่วนสูง',       color: 'var(--coral-dark)', bg: '#FEF0EB' },
    medium: { en: 'Medium Priority', th: 'ความเร่งด่วนปานกลาง',   color: '#F59E0B',           bg: '#FFFBEB' },
    low:    { en: 'Low Priority',    th: 'ความเร่งด่วนต่ำ',        color: '#22C55E',           bg: '#F0FDF9' },
  };

  return (
    <div>
      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        {[
          { en: 'Based on',   th: 'วิเคราะห์จาก',  val: '87', en_unit: 'negative reviews',         th_unit: 'รีวิวเชิงลบ',               color: 'var(--coral-dark)' },
          { en: 'Issues found', th: 'ปัญหาที่พบ',  val: '4',  en_unit: 'key topics',                th_unit: 'หัวข้อหลัก',                color: '#F59E0B' },
          { en: 'Suggestions',  th: 'ข้อเสนอแนะ',  val: '11', en_unit: 'action items',              th_unit: 'รายการที่ดำเนินการได้',     color: '#22C55E' },
        ].map((s, i) => (
          <div key={i} className="dash-metric" style={{ flex: '1 1 160px', minWidth: 140 }}>
            <div className="dm-lbl">{currentLang === 'en' ? s.en : s.th}</div>
            <div className="dm-val" style={{ color: s.color }}>{s.val}</div>
            <div className="dm-delta">{currentLang === 'en' ? s.en_unit : s.th_unit}</div>
          </div>
        ))}
      </div>

      {/* Issue cards */}
      {issues.map(issue => {
        const pc = priorityConfig[issue.priority];
        return (
          <div key={issue.id} className="dash-panel" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{issue.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {currentLang === 'en' ? issue.en_title : issue.th_title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  {currentLang === 'en' ? issue.en_count : issue.th_count}
                </div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
                background: pc.bg, color: pc.color, border: `1px solid ${pc.color}33`,
              }}>
                {currentLang === 'en' ? pc.en : pc.th}
              </span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 10 }}>
              <div className="d-sec-lbl" style={{ marginTop: 0 }}>
                {currentLang === 'en' ? 'Recommended Actions' : 'แนวทางที่แนะนำ'}
              </div>
              {issue.suggestions.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{
                    minWidth: 20, height: 20, borderRadius: '50%',
                    background: pc.bg, color: pc.color,
                    fontSize: 11, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>{idx + 1}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {currentLang === 'en' ? s.en : s.th}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── CSS Word Cloud helper ──
function CSSWordCloud({ words, currentLang }) {
  const [tooltip, setTooltip] = useState(null);

  const minVal = Math.min(...words.map(w => w.value));
  const maxVal = Math.max(...words.map(w => w.value));
  const fontSize = (val) => {
    const t = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);
    return Math.round(13 + t * 49);
  };

  const shuffled = [...words].sort((a, b) => {
    const seeds = [4,0,2,6,1,3,5,7,8,9,10,11,12,13,14,15];
    const ia = words.indexOf(a), ib = words.indexOf(b);
    return (seeds[ia] ?? ia) - (seeds[ib] ?? ib);
  });

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 300,
      display: 'flex', flexWrap: 'wrap', alignItems: 'center',
      justifyContent: 'center', gap: '10px 14px', padding: '24px 16px' }}>
      {shuffled.map((w, i) => {
        const fs = fontSize(w.value);
        const color = w.sentiment === 'pos' ? '#16A34A' : '#DC2626';
        const bgAlpha = w.sentiment === 'pos' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)';
        return (
          <span
            key={w.text}
            onMouseEnter={(e) => setTooltip({ text: w.text, value: w.value, x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setTooltip(null)}
            style={{
              fontSize: fs,
              fontWeight: fs > 38 ? 700 : fs > 24 ? 600 : 500,
              color,
              background: bgAlpha,
              borderRadius: 6,
              padding: fs > 36 ? '4px 10px' : '2px 6px',
              cursor: 'default',
              lineHeight: 1.25,
              transition: 'opacity 0.15s',
              display: 'inline-block',
              transform: i % 5 === 1 ? 'rotate(-8deg)' : i % 5 === 3 ? 'rotate(6deg)' : 'rotate(0deg)',
              userSelect: 'none',
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            {w.text}
          </span>
        );
      })}
      {tooltip && (
        <div style={{
          position: 'fixed', left: tooltip.x + 12, top: tooltip.y - 36,
          background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
          borderRadius: 6, padding: '4px 10px', fontSize: 12,
          color: 'var(--text-secondary)', pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 9999,
          whiteSpace: 'nowrap',
        }}>
          {currentLang === 'en' ? 'Mentions' : 'จำนวน'}: <strong>{tooltip.value}</strong>
        </div>
      )}
    </div>
  );
}

// ── Tab: Word Cloud ──
function TabWordCloud({ currentLang }) {
  const [filter, setFilter] = useState('all');

  const allWords = [
{ text: currentLang === 'en' ? 'beautiful waterfalls' : 'น้ำตกสวยงามมาก', value: 95, sentiment: 'pos' },
{ text: currentLang === 'en' ? 'lush green nature'    : 'ป่าไม้อุดมสมบูรณ์', value: 88, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'peaceful'         : 'สงบ',                  value: 76, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'stunning'         : 'งดงาม',                value: 70, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'nature'           : 'ธรรมชาติ',             value: 62, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'fresh air'        : 'อากาศบริสุทธิ์',       value: 55, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'memorable'        : 'ประทับใจ',              value: 50, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'magical'          : 'มหัศจรรย์',             value: 45, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'crowded'          : 'แออัด',                 value: 90, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'overpriced'       : 'แพงเกินไป',             value: 72, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'no restroom'      : 'ไม่มีห้องน้ำ',          value: 68, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'long queue'       : 'คิวยาว',                value: 60, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'hot'              : 'ร้อนมาก',               value: 55, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'parking'          : 'ที่จอดรถ',              value: 48, sentiment: 'neg' },
    { text: currentLang === 'en' ? 'noisy'            : 'เสียงดัง',              value: 38, sentiment: 'neg' },
  ];

  const filtered = filter === 'all' ? allWords : allWords.filter(w => w.sentiment === filter);

  const chipStyle = (val) => ({
    padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
    border: `1px solid ${filter === val ? 'var(--coral-dark)' : 'var(--border-color)'}`,
    background: filter === val ? 'var(--coral-dark)' : 'var(--bg-secondary)',
    color: filter === val ? '#fff' : 'var(--text-secondary)',
    cursor: 'pointer', transition: 'all 0.15s',
  });

  return (
    <div>
      {/* Filter + Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={chipStyle('all')} onClick={() => setFilter('all')}>
            {currentLang === 'en' ? 'All words' : 'ทั้งหมด'}
          </button>
          <button style={chipStyle('pos')} onClick={() => setFilter('pos')}>
            {currentLang === 'en' ? 'Positive' : 'เชิงบวก'}
          </button>
          <button style={chipStyle('neg')} onClick={() => setFilter('neg')}>
            {currentLang === 'en' ? 'Negative' : 'เชิงลบ'}
          </button>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {currentLang === 'en'
            ? 'Larger = more mentions · Green = positive · Red = negative'
            : 'ขนาดใหญ่ = พูดถึงมาก · เขียว = บวก · แดง = ลบ'}
        </span>
      </div>

      {/* Word Cloud */}
      <div className="dash-panel" style={{ minHeight: 360, marginBottom: 14 }}>
        <CSSWordCloud words={filtered} currentLang={currentLang} />
      </div>

      {/* Keyword breakdown */}
      <div className="dash-row2">
        <div className="dash-panel">
          <div className="dp-title" style={{ color: '#22C55E' }}>{currentLang === 'en' ? 'Positive Keywords' : 'คำเชิงบวกยอดนิยม'}</div>
          <div className="d-kw-cloud">
            {allWords.filter(w => w.sentiment === 'pos').sort((a, b) => b.value - a.value).map(w => (
              <span key={w.text} className="d-kw pos"
                style={{ fontSize: Math.max(10, Math.min(18, 8 + w.value / 8)) }}>
                {w.text} <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{w.value}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="dash-panel">
         <div className="dp-title" style={{ color: '#EF4444' }}>{currentLang === 'en' ? 'Negative Keywords' : 'คำเชิงลบยอดนิยม'}</div>
          <div className="d-kw-cloud">
            {allWords.filter(w => w.sentiment === 'neg').sort((a, b) => b.value - a.value).map(w => (
              <span key={w.text} className="d-kw neg"
                style={{ fontSize: Math.max(10, Math.min(18, 8 + w.value / 8)) }}>
                {w.text} <span style={{ opacity: 0.6, fontSize: '0.85em' }}>{w.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Reports ──
// ── Tab: Reports ──
function TabReports({ onGoPlans, currentLang }) {
  const [reportType, setReportType] = useState('all'); // all | daily | monthly | quarterly

  const FileIcon = () => <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  const DlIcon   = () => <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  
  const allReports = [
    { 
      type: 'daily',
      en_name: 'Daily AI Sentiment Summary — June 4, 2026', 
      th_name: 'รายงานสรุปโดย AI รายวัน — 4 มิถุนายน 2026', 
      meta: currentLang === 'en' ? 'Generated today (08:00 AM) · PDF · 1.1 MB' : 'สร้างวันนี้ (08:00 น.) · PDF · 1.1 MB' 
    },
    { 
      type: 'daily',
      en_name: 'Daily AI Sentiment Summary — June 3, 2026', 
      th_name: 'รายงานสรุปโดย AI รายวัน — 3 มิถุนายน 2026', 
      meta: currentLang === 'en' ? 'Generated yesterday · PDF · 1.3 MB' : 'สร้างเมื่อวานนี้ · PDF · 1.3 MB' 
    },
    { 
      type: 'monthly',
      en_name: 'Monthly Sentiment Report — June 2024', 
      th_name: 'รายงานวิเคราะห์สรุปดัชนีความรู้สึก — มิถุนายน 2024', 
      meta: currentLang === 'en' ? 'Generated today · PDF · 4.2 MB' : 'สร้างวันนี้ · PDF · 4.2 MB' 
    },
    { 
      type: 'monthly',
      en_name: 'Monthly Sentiment Report — May 2024',  
      th_name: 'รายงานวิเคราะห์สรุปดัชนีความรู้สึก — พฤษภาคม 2024',  
      meta: currentLang === 'en' ? 'Generated Jun 1 · PDF · 3.8 MB' : 'สร้างเมื่อ 1 มิ.ย. · PDF · 3.8 MB' 
    },
    { 
      type: 'quarterly',
      en_name: 'Q1 2024 Quarterly Report',             
      th_name: 'รายงานผลสัมฤทธิ์ประจำไตรมาส Q1 2024',                
      meta: currentLang === 'en' ? 'Generated Apr 1 · PDF · 9.1 MB' : 'สร้างเมื่อ 1 เม.ย. · PDF · 9.1 MB' 
    },
  ];

  // ฟังก์ชันกรองข้อมูลตามประเภทที่เลือก
  const filteredReports = allReports.filter(r => reportType === 'all' || r.type === reportType);

  return (
    <div>
      {/* ── 🟢 เพิ่มกลุ่มปุ่มสำหรับกดกรองข้อมูลรายงาน ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginRight: '6px' }}>
          {currentLang === 'en' ? 'Filter:' : 'ตัวกรอง:'}
        </span>
        <button 
          className={`review-filter-chip${reportType === 'all' ? ' active' : ''}`} 
          onClick={() => setReportType('all')}
        >
          {currentLang === 'en' ? 'All' : 'ทั้งหมด'}
        </button>
        <button 
          className={`review-filter-chip${reportType === 'daily' ? ' active' : ''}`} 
          onClick={() => setReportType('daily')}
        >
          {currentLang === 'en' ? 'Daily AI' : 'รายวัน (AI)'}
        </button>
        <button 
          className={`review-filter-chip${reportType === 'monthly' ? ' active' : ''}`} 
          onClick={() => setReportType('monthly')}
        >
          {currentLang === 'en' ? 'Monthly' : 'รายเดือน'}
        </button>
        <button 
          className={`review-filter-chip${reportType === 'quarterly' ? ' active' : ''}`} 
          onClick={() => setReportType('quarterly')}
        >
          {currentLang === 'en' ? 'Quarterly' : 'รายไตรมาส'}
        </button>
      </div>

      {/* รายการรายงานหลังผ่านตัวกรอง */}
      <div className="dash-panel" style={{ marginBottom: 12 }}>
        {filteredReports.map((r, i) => (
          <div key={i} className="report-item">
            <div className="report-icon"><FileIcon /></div>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div className="report-name">{currentLang === 'en' ? r.en_name : r.th_name}</div>
              <div className="report-meta">{r.meta}</div>
            </div>
            <button className="report-dl" onClick={() => alert('Downloading...')}><DlIcon /> {currentLang === 'en' ? 'Download' : 'ดาวน์โหลด'}</button>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            {currentLang === 'en' ? 'No reports found for this category.' : 'ไม่พบรายการรายงานในหมวดหมู่นี้'}
          </div>
        )}
      </div>
      
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">{currentLang === 'en' ? 'Competitor & Regional reports available in Enterprise' : 'รายงานเชิงเปรียบเทียบคู่แข่งและภาพรวมภูมิภาคมีให้เฉพาะระดับ Enterprise'}</div>
          <div className="upgrade-sub">{currentLang === 'en' ? 'Compare your performance against similar destinations in your region.' : 'เปรียบเทียบขีดความสามารถของคุณร่วมกับสถานที่ท่องเที่ยวใกล้เคียงในภูมิภาค'}</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>{currentLang === 'en' ? 'View Plans' : 'ดูแผนแพ็กเกจ'}</button>
      </div>
    </div>
  );
}
// ── Tab: My Places ──
function TabPlaces({ onGoPlans, currentLang }) {
  return (
    <div>
      <div className="dash-panel" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0'}}>
          <div style={{ fontSize: 28 }}>🌿</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
              {currentLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {currentLang === 'en' ? 'Nakhon Ratchasima · Verified ✓' : 'นครราชสีมา · ยืนยันสิทธิ์สำเร็จ ✓'}
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#22C55E' }}>76%</div>
          <button className="report-dl">{currentLang === 'en' ? 'View Dashboard' : 'เปิดแดชบอร์ด'}</button>
        </div>
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">{currentLang === 'en' ? 'Professional Plan: up to 1 destinations' : 'แผนบริการ Professional: สิทธิ์ดูแลสูงสุด 1 สถานที่'}</div>
          <div className="upgrade-sub">{currentLang === 'en' ? 'Upgrade to Enterprise for unlimited destinations and white-label dashboard.' : 'อัปเกรดเป็นระดับ Enterprise เพื่อสิทธิ์ดูแลไม่จำกัด พร้อมฟังก์ชันปรับแต่งหน้าแบรนด์ตนเอง'}</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>{currentLang === 'en' ? 'Upgrade' : 'อัปเกรด'}</button>
      </div>
    </div>
  );
}

// ─────── MAIN EXPORT ───────
export default function DashboardPage({ onLogout, onGoPlans, currentLang = 'en', onToggleLang }) {
  const [activeTab, setTab] = useState('overview');
  const [dark, setDark] = useState(() => localStorage.getItem('ts-theme') === 'dark');
  //const [internalLang, setInternalLang] = useState(currentLang);

  //useEffect(() => { if (internalLang !== currentLang) setInternalLang(currentLang); }, [currentLang, internalLang]);

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('ts-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('ts-theme', 'light');
    }
  }, [dark]);

  function switchTab(id) { setTab(id); window.scrollTo(0, 0); }

  function handleLangSwitch(selectedLang) {
    localStorage.setItem('app_lang', selectedLang);
    
    // 🟢 หากใน App.js มีฟังก์ชันจัดการสลับภาษาอยู่แล้ว ให้เรียกใช้ผ่าน Prop ได้เลย
    if (onToggleLang) {
      onToggleLang(selectedLang);
    } else {
      // 🛡️ แผนสำรอง: หากไม่มีการส่งฟังก์ชันมา ให้ใช้วิธี dispatch Event เพื่อสะกิดให้ App.js ตื่นและเปลี่ยนค่าตาม Storage
      window.dispatchEvent(new Event('storage'));
    }
  }

const navItems   = getNavItems(currentLang);
  const bizItems   = getBizItems(currentLang);
  const tabTitles  = getTabTitles(currentLang);

  return (
    <div className="dash-page">
      <div className="dash-shell">

        {/* ── Sidebar ── */}
        <aside className="dash-aside">
          <div className="dash-aside-logo">
            <div className="dash-logo-dot">
              <img src={logoImg} alt="Logo G23" className="dash-logo-img" />
            </div>
            <span className="logo-sense">TravelSense</span>
          </div>

          <div className="dash-place-box">
            <div className="dash-place-name">{currentLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}</div>
            <div className="dash-place-status">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {currentLang === 'en' ? 'Verified owner' : 'สิทธิ์ผู้ดูแลผ่านการรับรอง'}
            </div>
          </div>

          <div className="dash-section-lbl">{currentLang === 'en' ? 'Main' : 'เมนูหลัก'}</div>
          {navItems.map(item => (
            <div key={item.id}
              className={`dash-nav-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => switchTab(item.id)}>
              {item.icon}
              {item.label}
              {item.notif && <span className="dash-notif">{item.notif}</span>}
            </div>
          ))}

          <div className="dash-section-lbl">{currentLang === 'en' ? 'Business' : 'ฟังก์ชันธุรกิจ'}</div>
          {bizItems.map(item => (
            <div key={item.id}
              className={`dash-nav-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => item.id === 'places' ? switchTab('places') : null}>
              {item.icon}
              {item.label}
            </div>
          ))}

          <div className="dash-aside-footer">
            <div className="dash-user">
              <div className="dash-avatar">KY</div>
              <div>
                <div className="dash-user-name">{currentLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}</div>
                <div className="dash-user-plan">{currentLang === 'en' ? 'Professional Plan' : 'แพ็กเกจ Professional'}</div>
              </div>
            </div>
            <span className="dash-logout" onClick={onLogout}>
              {currentLang === 'en' ? '← Back to public site' : '← กลับสู่หน้าหลักเว็บบอร์ด'}
            </span>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="dash-main">
          <div className="dash-topbar">
            <div>
              <span className="dash-topbar-title">{tabTitles[activeTab]}</span>
              <span className="dash-topbar-sub">· {currentLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}</span>
            </div>
            <div className="dash-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

              {/* Language toggle */}
              {/* Language toggle ในส่วนของ return UI */}
              <div className="dash-lang-toggle">
                <button onClick={() => handleLangSwitch('en')} style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                  background: currentLang === 'en' ? 'var(--coral-dark)' : 'transparent',
                  color:      currentLang === 'en' ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s',
                }}>EN</button>
                <button onClick={() => handleLangSwitch('th')} style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                  background: currentLang === 'th' ? 'var(--coral-dark)' : 'transparent',
                  color:      currentLang === 'th' ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s',
                }}>TH</button>
              </div>

              <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} currentLang={currentLang} />

             
            </div>
          </div>

          <div className="dash-content">
            <div className={`dash-content-section${activeTab === 'overview'    ? ' active' : ''}`}><TabOverview    currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'reviews'     ? ' active' : ''}`}><TabReviews     onGoPlans={onGoPlans} currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'trends'      ? ' active' : ''}`}><TabTrends      onGoPlans={onGoPlans} currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'alerts'      ? ' active' : ''}`}><TabAlerts      currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'wordcloud'   ? ' active' : ''}`}><TabWordCloud   currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'suggestions' ? ' active' : ''}`}><TabSuggestions currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'reports'     ? ' active' : ''}`}><TabReports     onGoPlans={onGoPlans} currentLang={currentLang} /></div>
            <div className={`dash-content-section${activeTab === 'places'      ? ' active' : ''}`}><TabPlaces      onGoPlans={onGoPlans} currentLang={currentLang} /></div>
          </div>
        </div>

      </div>
    </div>
  );
}