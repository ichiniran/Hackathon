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

// ── Tab: Overview ──
function TabOverview({ currentLang }) {
  return (
    <div>
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

      <div className="dash-row3">
        <div className="dash-panel">
          <div className="dp-title">{currentLang === 'en' ? 'Top keywords' : 'คำสำคัญยอดนิยม'}</div>
          <div className="d-sec-lbl"><span className="text-pos">{currentLang === 'en' ? 'Positive' : 'เชิงบวก'}</span></div>
          <div className="d-kw-cloud" style={{ marginBottom: 10 }}>
            {[
              currentLang === 'en' ? 'wildlife'    : 'สัตว์ป่าธรรมชาติ',
              currentLang === 'en' ? 'elephants'   : 'ฝูงช้างป่า',
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
            { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'Agoda',       date: currentLang === 'en' ? 'Yesterday' : 'เมื่อวานนี้',   en_txt: '"Best birdwatching spot in Thailand. Came at 6am, worth it."',     th_txt: '"จุดส่องนกที่ดีที่สุดในไทย มาตอน 6 โมงเช้า คุ้มค่ามาก"' },
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

// ── Tab: Reviews ──
function TabReviews({ onGoPlans, currentLang }) {
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all | today | yesterday | custom
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const reviews = [
    { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'TripAdvisor', date: currentLang === 'en' ? 'Today'      : 'วันนี้',       et: '"Absolutely stunning place. Saw 3 elephants right by the road — absolutely magical. Will definitely come back."',                                  tt: '"สถานที่งดงามประทับใจมาก เจอช้างป่า 3 ตัวข้างถนน สวยงามราวกับเวทมนตร์ จะกลับมาอีกแน่นอน"' },
    { tag: 'neg', el: 'Negative', tl: 'แง่ลบ',  plat: 'Google',      date: currentLang === 'en' ? 'Today'      : 'วันนี้',       et: '"Too many tourists, felt like a theme park not a national park. Weekends are a disaster. Go on weekdays only."',                                     tt: '"นักท่องเที่ยวหนาแน่นเกินไป บรรยากาศเหมือนสวนสนุก ช่วงวันหยุดคือพังมาก แนะนำมาวันธรรมดาเท่านั้น"' },
    { tag: 'pos', el: 'Positive', tl: 'แง่บวก', plat: 'Agoda',       date: currentLang === 'en' ? 'Yesterday'  : 'เมื่อวานนี้',  et: '"Best birdwatching spot in Thailand. Arrived at 6am, totally worth the early wake-up. Over 200 species spotted."',                                   tt: '"ทำเลส่องนกที่ดีที่สุดในประเทศไทย มาถึงตอน 6 โมงเช้า คุ้มค่ามาก สำรวจพบนกกว่า 200 สายพันธุ์"' },
    { tag: 'neu', el: 'Neutral',  tl: 'ทั่วไป',  plat: 'Booking.com', date: currentLang === 'en' ? '2 days ago' : '2 วันที่แล้ว', et: '"Visited on a weekday and found the park relatively quiet. Entry procedures were smooth, and there was ample parking available."',              tt: '"ไปเที่ยวช่วงวันธรรมดา คนไม่มากนัก การเข้าชมเป็นไปตามขั้นตอนปกติ มีจุดจอดรถเพียงพอ"' },
    { tag: 'neg', el: 'Negative', tl: 'แง่ลบ',  plat: 'Google',      date: currentLang === 'en' ? '3 days ago' : '3 วันที่แล้ว', et: '"Facilities are really poor. No proper restrooms near the main trail entrance."',                                                                   tt: '"ระบบสิ่งอำนวยความสะดวกแย่มาก ไม่มีห้องน้ำบริการใกล้บริเวณจุดบริการเส้นทางเดินป่าหลักเลย"' },
  ];

  // assign demo absolute dates (ISO) based on daysAgo property for realistic filtering
  const reviewsWithDates = reviews.map((r, idx) => {
    // default daysAgo mapping based on index-ish if not provided
    const daysAgo = r.daysAgo ?? (r.date && r.date.toLowerCase().includes('today') ? 0 : r.date && r.date.toLowerCase().includes('yesterday') ? 1 : (idx === 3 ? 2 : idx === 4 ? 3 : 0));
    const iso = new Date(BASE_TS - daysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    return { ...r, daysAgo, dateISO: iso };
  });

  const platforms = ['all', ...new Set(reviewsWithDates.map(r => r.plat))];

  const filteredReviews = reviewsWithDates.filter(r => {
    const sentimentOk = selectedSentiment === 'all' || r.tag === selectedSentiment;
    const sourceOk    = selectedSource    === 'all' || r.plat === selectedSource;

    // date filter
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

  // Use site-wide totals (match Overview main metrics)
  const totalCount = 1247; // match Overview 'Total reviews'
  const posCount = 947;    // positive reviews (from Overview)
  const negCount = 87;     // negative reviews (from Overview)
  const neuCount = totalCount - posCount - negCount; // remaining neutrals
  const pct = (n) => totalCount ? Math.round((n / totalCount) * 100) : 0;

  return (
    <div>
      {/* Summary metrics for reviews */}
      <div className="dash-metrics" style={{ marginBottom: 12 }}>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Total reviews' : 'ความคิดเห็นทั้งหมด'}</div>
          <div className="dm-val">{totalCount}</div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Positive' : 'เชิงบวก'}</div>
          <div className="dm-val pos" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {posCount}
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#22C55E' }}>({pct(posCount)}%)</span>
          </div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</div>
          <div className="dm-val" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {neuCount}
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F59E0B' }}>({pct(neuCount)}%)</span>
          </div>
        </div>
        <div className="dash-metric">
          <div className="dm-lbl">{currentLang === 'en' ? 'Negative' : 'เชิงลบ'}</div>
          <div className="dm-val neg" style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {negCount}
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#EF4444' }}>({pct(negCount)}%)</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
        <div className="review-date-filter" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', marginRight: 6 }}>{currentLang === 'en' ? 'Date' : 'วันที่'}</span>
          <button className={`review-filter-chip${dateFilter === 'all' ? ' active' : ''}`} onClick={() => setDateFilter('all')}>{currentLang === 'en' ? 'All' : 'ทั้งหมด'}</button>
          <button className={`review-filter-chip${dateFilter === 'today' ? ' active' : ''}`} onClick={() => setDateFilter('today')}>{currentLang === 'en' ? 'Today' : 'วันนี้'}</button>
          <button className={`review-filter-chip${dateFilter === 'yesterday' ? ' active' : ''}`} onClick={() => setDateFilter('yesterday')}>{currentLang === 'en' ? 'Yesterday' : 'เมื่อวาน'}</button>
          <button className={`review-filter-chip${dateFilter === 'custom' ? ' active' : ''}`} onClick={() => setDateFilter('custom')}>{currentLang === 'en' ? 'Custom' : 'กำหนดเอง'}</button>
        </div>
        {dateFilter === 'custom' && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} />
            <span style={{ fontSize: 13 }}>—</span>
            <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
            <button className="review-filter-chip" onClick={() => { /* triggers filter as state updates */ }}>{currentLang === 'en' ? 'Apply' : 'ใช้'}</button>
          </div>
        )}
      </div>
      <div className="review-filters">
        <div className="review-filter-group">
          <span className="review-filter-label">{currentLang === 'en' ? 'Sentiment' : 'ประเภทรีวิว'}</span>
          {[
            { value: 'all', label: currentLang === 'en' ? 'All'      : 'ทั้งหมด' },
            { value: 'pos', label: currentLang === 'en' ? 'Positive' : 'บวก'     },
            { value: 'neg', label: currentLang === 'en' ? 'Negative' : 'ลบ'      },
            { value: 'neu', label: currentLang === 'en' ? 'Neutral'  : 'กลาง'    },
          ].map(opt => (
            <button key={opt.value} type="button"
              className={`review-filter-chip${selectedSentiment === opt.value ? ' active' : ''}`}
              onClick={() => setSelectedSentiment(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="review-filter-group">
          <span className="review-filter-label">{currentLang === 'en' ? 'Source' : 'แหล่งรีวิว'}</span>
          {platforms.map(p => (
            <button key={p} type="button"
              className={`review-filter-chip source${selectedSource === p ? ' active' : ''}`}
              onClick={() => setSelectedSource(p)}>
              {p === 'all' ? (currentLang === 'en' ? 'All' : 'ทั้งหมด') : p}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16, marginLeft: 10, fontSize: 13, color: 'var(--text-muted)' }}>
        {currentLang === 'en'
          ? `Showing ${filteredReviews.length} filtered reviews · Sorted by newest`
          : `กำลังแสดงรีวิวที่กรองแล้ว ${filteredReviews.length} รายการ · เรียงตามล่าสุด`}
      </div>
      <div className="dash-panel" style={{ marginBottom: 12 }}>
        {filteredReviews.map((r, i) => (
          <div key={i} className="d-review-item">
            <div className="dash-metric-lbl" style={{ marginBottom: 4 }}>
              <span className={`d-rtag d-rtag-${r.tag}`} style={{ marginRight: 8 }}>{currentLang === 'en' ? r.el : r.tl}</span>
              <span className="d-rplat" style={{ marginRight: 8 }}>{r.plat}</span>
              <span className="d-rdate">{r.date}</span>
            </div>
            <div className="d-rtxt">{currentLang === 'en' ? r.et : r.tt}</div>
          </div>
        ))}
        {filteredReviews.length === 0 && (
          <div style={{ padding: '14px 0', fontSize: 13, color: 'var(--text-muted)' }}>
            {currentLang === 'en' ? 'No reviews match the selected filters.' : 'ไม่พบรีวิวที่ตรงกับตัวกรองที่เลือก'}
          </div>
        )}
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">{currentLang === 'en' ? 'Upgrade to Enterprise for competitor review access' : 'อัปเกรดเป็นระดับ Enterprise เพื่อสิทธิ์เข้าถึงรีวิวของคู่แข่ง'}</div>
          <div className="upgrade-sub">{currentLang === 'en' ? 'See how competing destinations are reviewed compared to yours.' : 'ประเมินและเปรียบเทียบคะแนนรีวิวของสถานที่ท่องเที่ยวคู่แข่งเทียบกับคุณ'}</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>{currentLang === 'en' ? 'View Plans' : 'ดูแผนแพ็กเกจ'}</button>
      </div>
    </div>
  );
}

// ── Tab: Trends ──
function TabTrends({ onGoPlans, currentLang }) {
  return (
    <div className="dash-row2">
      <div className="dash-panel">
        <div className="dp-title">
          {currentLang === 'en' ? 'Monthly sentiment — 12 months' : 'สถิติดัชนีความรู้สึกรายเดือน — ย้อนหลัง 12 เดือน'}
        </div>
        {[
          ['Jul', 52, '#F59E0B'], ['Aug', 58, 'var(--coral-dark)'], ['Sep', 65, '#F59E0B'],
          ['Oct', 70, '#22C55E'], ['Nov', 72, '#22C55E'],           ['Dec', 69, '#F59E0B'],
          ['Jan', 68, '#F59E0B'], ['Feb', 71, '#22C55E'],           ['Mar', 65, '#F59E0B'],
          ['Apr', 73, '#22C55E'], ['May', 74, '#22C55E'],           ['Jun', 76, '#22C55E'],
        ].map(([m, p, c]) => (
          <div key={m} className="d-trend-row">
            <div className="d-trend-mo">{m}</div>
            <div className="d-trend-track"><div className="d-trend-fill" style={{ width: `${p}%`, background: c }} /></div>
            <div className="d-trend-pct">{p}%</div>
          </div>
        ))}
      </div>
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
            <div className="d-topic-track"><div className="d-topic-fill" style={{ width: `${w}%`, background: '#F5C4B3' }} /></div>
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
            <div className="d-topic-track"><div className="d-topic-fill" style={{ width: `${w}%`, background: '#F5C4B3' }} /></div>
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
          { c: '#F59E0B',           et: '"Entrance fee increased significantly but the quality of service remains the same."',  tt: '"ราคาค่าธรรมเนียมปรับเพิ่มขึ้นอย่างมาก แต่คุณภาพการจัดการและสิ่งอำนวยความสะดวกยังคงเท่าเดิม"',                             s: 'Booking.com', time: currentLang === 'en' ? 'Yesterday'   : 'เมื่อวานนี้',   isNew: false },
          { c: '#F59E0B',           et: '"Parking is a mess on weekends. Took 45 minutes just to find a spot."',               tt: '"การจอดรถวุ่นวายมากช่วงวันหยุด ใช้เวลาเดินหาที่จอดรถตั้ง 45 นาที"',                                                        s: 'Google',      time: currentLang === 'en' ? '2 days ago'  : '2 วันที่แล้ว', isNew: false },
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
    { text: currentLang === 'en' ? 'wildlife'         : 'สัตว์ป่า',            value: 95, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'elephants'        : 'ช้างป่า',              value: 88, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'peaceful'         : 'สงบ',                  value: 76, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'stunning'         : 'งดงาม',                value: 70, sentiment: 'pos' },
    { text: currentLang === 'en' ? 'birdwatching'     : 'ส่องนก',               value: 65, sentiment: 'pos' },
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
          <div className="dp-title">🟢 {currentLang === 'en' ? 'Positive Keywords' : 'คำเชิงบวกยอดนิยม'}</div>
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
          <div className="dp-title">🔴 {currentLang === 'en' ? 'Negative Keywords' : 'คำเชิงลบยอดนิยม'}</div>
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
function TabReports({ onGoPlans, currentLang }) {
  const FileIcon = () => <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  const DlIcon   = () => <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  return (
    <div>
      <div className="dash-panel" style={{ marginBottom: 12 }}>
        {[
          { en_name: 'Monthly Sentiment Report — June 2024', th_name: 'รายงานวิเคราะห์สรุปดัชนีความรู้สึก — มิถุนายน 2024', meta: currentLang === 'en' ? 'Generated today · PDF · 4.2 MB'   : 'สร้างวันนี้ · PDF · 4.2 MB' },
          { en_name: 'Monthly Sentiment Report — May 2024',  th_name: 'รายงานวิเคราะห์สรุปดัชนีความรู้สึก — พฤษภาคม 2024',  meta: currentLang === 'en' ? 'Generated Jun 1 · PDF · 3.8 MB' : 'สร้างเมื่อ 1 มิ.ย. · PDF · 3.8 MB' },
          { en_name: 'Q1 2024 Quarterly Report',             th_name: 'รายงานผลสัมฤทธิ์ประจำไตรมาส Q1 2024',                meta: currentLang === 'en' ? 'Generated Apr 1 · PDF · 9.1 MB' : 'สร้างเมื่อ 1 เม.ย. · PDF · 9.1 MB' },
        ].map((r, i) => (
          <div key={i} className="report-item">
            <div className="report-icon"><FileIcon /></div>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div className="report-name">{currentLang === 'en' ? r.en_name : r.th_name}</div>
              <div className="report-meta">{r.meta}</div>
            </div>
            <button className="report-dl" onClick={() => alert('Downloading...')}><DlIcon /> {currentLang === 'en' ? 'Download' : 'ดาวน์โหลด'}</button>
          </div>
        ))}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
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
        <div style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }}>
          {currentLang === 'en'
            ? '+ Claim another destination (2 remaining on Professional Plan)'
            : '+ ยื่นสิทธิ์ดูแลจุดหมายปลายทางเพิ่ม (คงเหลือ 2 สิทธิ์สำหรับแพ็กเกจ Professional)'}
        </div>
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--coral-dark)" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">{currentLang === 'en' ? 'Professional Plan: up to 3 destinations' : 'แผนบริการ Professional: สิทธิ์ดูแลสูงสุด 3 สถานที่'}</div>
          <div className="upgrade-sub">{currentLang === 'en' ? 'Upgrade to Enterprise for unlimited destinations and white-label dashboard.' : 'อัปเกรดเป็นระดับ Enterprise เพื่อสิทธิ์ดูแลไม่จำกัด พร้อมฟังก์ชันปรับแต่งหน้าแบรนด์ตนเอง'}</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>{currentLang === 'en' ? 'Upgrade' : 'อัปเกรด'}</button>
      </div>
    </div>
  );
}

// ─────── MAIN EXPORT ───────
export default function DashboardPage({ onLogout, onGoPlans, currentLang = 'en' }) {
  const [activeTab, setTab] = useState('overview');
  const [dark, setDark] = useState(() => localStorage.getItem('ts-theme') === 'dark');
  const [internalLang, setInternalLang] = useState(currentLang);

  useEffect(() => { if (internalLang !== currentLang) setInternalLang(currentLang); }, [currentLang, internalLang]);

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
    setInternalLang(selectedLang);
    window.dispatchEvent(new Event('storage'));
  }

  const navItems   = getNavItems(internalLang);
  const bizItems   = getBizItems(internalLang);
  const tabTitles  = getTabTitles(internalLang);

  return (
    <div className="dash-page">
      <div className="dash-shell">

        {/* ── Sidebar ── */}
        <aside className="dash-aside">
          <div className="dash-aside-logo">
            <div className="dash-logo-dot">
              <img src={logoImg} alt="Logo G23" className="dash-logo-img" />
            </div>
            <span className="logo-sense">TravelSense</span><span className="logo-ai">AI</span>
          </div>

          <div className="dash-place-box">
            <div className="dash-place-name">{internalLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}</div>
            <div className="dash-place-status">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {internalLang === 'en' ? 'Verified owner' : 'สิทธิ์ผู้ดูแลผ่านการรับรอง'}
            </div>
          </div>

          <div className="dash-section-lbl">{internalLang === 'en' ? 'Main' : 'เมนูหลัก'}</div>
          {navItems.map(item => (
            <div key={item.id}
              className={`dash-nav-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => switchTab(item.id)}>
              {item.icon}
              {item.label}
              {item.notif && <span className="dash-notif">{item.notif}</span>}
            </div>
          ))}

          <div className="dash-section-lbl">{internalLang === 'en' ? 'Business' : 'ฟังก์ชันธุรกิจ'}</div>
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
              <div className="dash-avatar">SC</div>
              <div>
                <div className="dash-user-name">{internalLang === 'en' ? 'Somchai P.' : 'สมชาย พ.'}</div>
                <div className="dash-user-plan">{internalLang === 'en' ? 'Professional Plan' : 'แพ็กเกจ Professional'}</div>
              </div>
            </div>
            <span className="dash-logout" onClick={onLogout}>
              {internalLang === 'en' ? '← Back to public site' : '← กลับสู่หน้าหลักเว็บบอร์ด'}
            </span>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="dash-main">
          <div className="dash-topbar">
            <div>
              <span className="dash-topbar-title">{tabTitles[activeTab]}</span>
              <span className="dash-topbar-sub">· {internalLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'}</span>
            </div>
            <div className="dash-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

              {/* Language toggle */}
              <div className="dash-lang-toggle">
                <button onClick={() => handleLangSwitch('en')} style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                  background: internalLang === 'en' ? 'var(--coral-dark)' : 'transparent',
                  color:      internalLang === 'en' ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s',
                }}>EN</button>
                <button onClick={() => handleLangSwitch('th')} style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                  background: internalLang === 'th' ? 'var(--coral-dark)' : 'transparent',
                  color:      internalLang === 'th' ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s',
                }}>TH</button>
              </div>

              <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} currentLang={internalLang} />

              <select className="dash-period">
                <option>{internalLang === 'en' ? 'Last 30 days'    : 'ย้อนหลัง 30 วัน'}</option>
                <option>{internalLang === 'en' ? 'Last 3 months'   : 'ย้อนหลัง 3 เดือน'}</option>
                <option>{internalLang === 'en' ? 'Last 6 months'   : 'ย้อนหลัง 6 เดือน'}</option>
                <option>{internalLang === 'en' ? 'Last 12 months'  : 'ย้อนหลัง 12 เดือน'}</option>
              </select>

              <button className="dash-export-btn" onClick={() => alert('Generating PDF report...')}>
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {internalLang === 'en' ? 'Export PDF' : 'ส่งออก PDF'}
              </button>
            </div>
          </div>

          <div className="dash-content">
            <div className={`dash-content-section${activeTab === 'overview'    ? ' active' : ''}`}><TabOverview    currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'reviews'     ? ' active' : ''}`}><TabReviews     onGoPlans={onGoPlans} currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'trends'      ? ' active' : ''}`}><TabTrends      onGoPlans={onGoPlans} currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'alerts'      ? ' active' : ''}`}><TabAlerts      currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'wordcloud'   ? ' active' : ''}`}><TabWordCloud   currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'suggestions' ? ' active' : ''}`}><TabSuggestions currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'reports'     ? ' active' : ''}`}><TabReports     onGoPlans={onGoPlans} currentLang={internalLang} /></div>
            <div className={`dash-content-section${activeTab === 'places'      ? ' active' : ''}`}><TabPlaces      onGoPlans={onGoPlans} currentLang={internalLang} /></div>
          </div>
        </div>

      </div>
    </div>
  );
}