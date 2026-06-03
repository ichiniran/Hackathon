import { useState, useMemo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { PLACES_DATA, FILTER_TAGS, getSentimentLabel, getSentimentClass } from '../data/places';
import './ExplorePage.css';

/* ── Checkbox row ── */
function CbRow({ label, checked, onChange }) {
  return (
    <label className={`cb-row${checked ? ' checked' : ''}`} onClick={onChange}>
      <div className="cb-box">
        <svg className="cb-check" viewBox="0 0 10 10">
          <polyline points="1.5,5 4,7.5 8.5,2.5" />
        </svg>
      </div>
      {label}
    </label>
  );
}

/* ── Place Card ── */
function PlaceCard({ place, onClick, currentLang }) {
  const label = getSentimentLabel(place.pos, currentLang);
  const cls   = getSentimentClass(place.pos);
  const scoreColor =
    place.pos >= 85 ? '#007a2d' :
    place.pos >= 70 ? '#71c971' :
    place.pos >= 55 ? '#F59E0B' : '#EF4444';

  return (
    <div className="place-card" onClick={() => onClick(place)}>
      <div className="card-img-wrap">
        <img src={place.img} alt={place.name} loading="lazy" />
        <span className={`sent-badge ${cls}`}>{label}</span>
      </div>
      <div className="card-body-inner">
        <div className="card-name">{currentLang === 'en' ? place.name : (place.name_th || place.name)}</div>
        <div className="card-loc"> 
          <MapPin size={16} fill="#EF4444" stroke="#ffffff" strokeWidth={1} /> 
          {currentLang === 'en' ? place.loc : (place.loc_th || place.loc)}
        </div>
        <div className="mini-bar">
          <div style={{ flex: place.pos, background: '#04a13b' }} />
          <div style={{ flex: place.neu, background: '#774b00' }} />
          <div style={{ flex: place.neg, background: '#EF4444' }} />
        </div>
        <div className="card-foot">
          <span className="card-reviews">
            {currentLang === 'en' ? `${place.reviews.toLocaleString()} reviews` : `รีวิวทั้งหมด ${place.reviews.toLocaleString()} รายการ`}
          </span>
          <span className="card-score" style={{ color: scoreColor }}>
            {currentLang === 'en' ? `${place.pos}% positive` : `เชิงบวก ${place.pos}%`}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar configuration using static IDs to prevent state wiping ── */
const SCORE_BANDS_CONFIG = [
  { id: 'band_excellent', labelEn: 'Excellent ≥ 80%', labelTh: 'ดีเยี่ยม ≥ 80%', color: '#007a2d', min: 80, max: 100 },
  { id: 'band_good',      labelEn: 'Good (65–79%)',  labelTh: 'ดี (65–79%)',  color: '#71c971', min: 65, max: 79  },
  { id: 'band_mixed',     labelEn: 'Neutral (50–64%)', labelTh: 'กลาง (50–64%)', color: '#F59E0B', min: 50, max: 64  },
  { id: 'band_warn',      labelEn: 'Needs attention',labelTh: 'ควรปรับปรุง (0-49%)',color: '#EF4444', min: 0,  max: 49  },
];

// ⚠️ มองหาตัวแปร TYPE_OPTIONS ตัวนี้ใน ExplorePage.jsx แล้วแก้เป็นโครงสร้างแบบนี้นะคะ
const TYPE_OPTIONS = [
  { value: 'nature',  labelEn: 'Park / Nature',      labelTh: 'อุทยาน / ธรรมชาติ' },
  { value: 'culture', labelEn: 'Temple / Heritage',   labelTh: 'วัด / แหล่งมรดกประวัติศาสตร์' },
  { value: 'beach',   labelEn: 'Beach / Island',     labelTh: 'ชายหาด / เกาะทะเล' },
  { value: 'zoo',     labelEn: 'Zoo / Aquarium',     labelTh: 'สวนสัตว์ / สถานแสดงพันธุ์สัตว์น้ำ' }, // 🟢 เพิ่มบรรทัดนี้ลงไปตรงนี้ด้วยค่ะ!
];
const REVIEW_OPTIONS = [
  { value: '500', labelEn: '500+ reviews', labelTh: '500 รีวิวขึ้นไป' },
  { value: '100', labelEn: '100–499',       labelTh: '100–499 รีวิว' },
  { value: '0',   labelEn: 'Under 100',     labelTh: 'น้อยกว่า 100 รีวิว' },
];

export default function ExplorePage({ onSelectPlace, currentLang = 'en' }) {
  const [query,   setQuery]  = useState('');
  const [activeTag, setTag]  = useState('all');
  const [sortBy,  setSortBy] = useState('pos');

  /* 🟢 แก้ไขจุดที่ 1: เปลี่ยนมาใช้สถิติ ID ผูกติดการเก็บสเตตัสปุ่ม จะไม่หลุดเมื่อเปลี่ยนภาษา */
  const [scoreBands,  setScoreBands]  = useState(() => SCORE_BANDS_CONFIG.map(b => b.id));
  const [types,       setTypes]       = useState(() => TYPE_OPTIONS.map(t => t.value));
  const [reviewMin,   setReviewMin]   = useState(() => REVIEW_OPTIONS.map(r => r.value));

  function toggle(list, setList, val) {
    setList(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }

  function resetAll() {
    setScoreBands(SCORE_BANDS_CONFIG.map(b => b.id));
    setTypes(TYPE_OPTIONS.map(t => t.value));
    setReviewMin(REVIEW_OPTIONS.map(r => r.value));
    setQuery('');
    setTag('all');
  }

  function countBand(min, max) {
    return PLACES_DATA.filter(p => p.pos >= min && p.pos <= max).length;
  }

  const filtered = useMemo(() => {
  let list = PLACES_DATA.filter(p => {
    /* ── 🟢 1. การปรับปรุงช่องค้นหา (Search bar) ให้ตรวจจับคำค้นหาจากชื่อจังหวัดได้ด้วย ── */
    const q = query.toLowerCase();
    const placeName = (p.name || '').toLowerCase();
    const placeLoc = (p.loc || '').toLowerCase();
    const placeNameEn = (p.nameEn || p.name || '').toLowerCase();
    const placeNameTh = p.name_th ? p.name_th.toLowerCase() : '';
    const placeLocTh = p.loc_th ? p.loc_th.toLowerCase() : '';
    const provEn = p.province ? p.province.toLowerCase() : '';
    const provTh = p.province_th ? p.province_th.toLowerCase() : '';

    if (q && 
      !placeName.includes(q) && 
      !placeLoc.includes(q) && 
      !placeNameEn.includes(q) &&
        !placeNameTh.includes(q) &&
        !placeLocTh.includes(q) &&
        !provEn.includes(q) && // ตรวจจับจังหวัดภาษาอังกฤษ
        !provTh.includes(q))   // ตรวจจับจังหวัดภาษาไทย
    {
      return false;
    }

    /* ⚠️ มองหาจุดคัดกรองนี้ใน ExplorePage.jsx แล้วอัปเดตตรงบล็อกเงื่อนไขภูมิภาคตามนี้ค่ะ */

    if (activeTag !== 'all') {
      const checkMatch = (field, target) => Array.isArray(field) ? field.includes(target) : field === target;
      
      let isMatch = checkMatch(p.type, activeTag);
      
      // ตรวจสอบเงื่อนไขการจับคู่ภูมิภาคและกลุ่มคำที่หลากหลาย
      if (activeTag === 'BKK' && (checkMatch(p.region, 'Bangkok') || checkMatch(p.region, 'BKK'))) isMatch = true;
      if (activeTag === 'north' && (checkMatch(p.region, 'north') || checkMatch(p.region, 'North') || checkMatch(p.region, 'Northern Thailand'))) isMatch = true;
      if (activeTag === 'south' && (checkMatch(p.region, 'south') || checkMatch(p.region, 'South') || checkMatch(p.region, 'Southern Thailand'))) isMatch = true;
      
      // 🟢 เพิ่มบรรทัดนี้: รองรับระบบคัดกรองภาคกลาง (อยุธยา)
      if (activeTag === 'central' && (checkMatch(p.region, 'central') || checkMatch(p.region, 'Central'))) isMatch = true;
      
      // 🟢 เพิ่มบรรทัดนี้: รองรับระบบคัดกรองภาคตะวันออก/อีสาน (เขาใหญ่)
      if (activeTag === 'east' && (checkMatch(p.region, 'east') || checkMatch(p.region, 'East'))) isMatch = true;
      
      if (activeTag === 'nature' && checkMatch(p.type, 'nature')) isMatch = true;
      if (activeTag === 'culture' && checkMatch(p.type, 'culture')) isMatch = true;
      if (activeTag === 'beach' && checkMatch(p.type, 'beach')) isMatch = true;
      if (activeTag === 'zoo' && checkMatch(p.type, 'zoo')) isMatch = true;
      
      if (!isMatch) return false;
    }

    /* sidebar — score band matched by static ID */
    const inBand = SCORE_BANDS_CONFIG.some(b =>
      scoreBands.includes(b.id) && p.pos >= b.min && p.pos <= b.max
    );
    if (!inBand) return false;

    /* ── 🟢 3. ตรวจสอบการเลือกติ๊กถูกด้านซ้ายมือ (Sidebar Type) ร่วมกับ Array ของสถานที่ ── */
    if (Array.isArray(p.type)) {
      const hasValidType = p.type.some(t => types.includes(t));
      if (!hasValidType) return false;
    } else {
      if (!types.includes(p.type)) return false;
    }

    /* sidebar — review count */
    const inRev = reviewMin.some(rv => {
      if (rv === '500') return p.reviews >= 500;
      if (rv === '100') return p.reviews >= 100 && p.reviews < 500;
      return p.reviews < 100;
    });
    if (!inRev) return false;

    return true;
  });

  return [...list].sort((a, b) => sortBy === 'pos' ? b.pos - a.pos : b.reviews - a.reviews);
}, [query, activeTag, sortBy, scoreBands, types, reviewMin]);

  return (
    <div className="explore-page">
      {/* ── Header ── */}
      <div className="explore-header">
        <h1>
          {currentLang === 'en' ? (
            <>Explore <span style={{ background: 'linear-gradient(135deg,#f67c7c,#a8a7b1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Destinations</span></>
          ) : (
            <>ค้นหา <span style={{ background: 'linear-gradient(135deg,#f67c7c,#a8a7b1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>จุดหมายปลายทาง</span></>
          )}
        </h1>
        <p>
          {currentLang === 'en'
            ? "Analyzed from over 50,000 external international reviews, updated daily."
            : "ประมวลผลและวิเคราะห์จากรีวิวนักท่องเที่ยวต่างชาติมากกว่า 50,000 รายการ อัปเดตข้อมูลทุกวัน"}
        </p>

        <div className="search-bar">
          <Search size={17} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              currentLang === 'en'
                ? 'Search destinations, provinces, or categories... e.g. "Chiang Mai" or "Beach".'
                : 'ค้นหาสถานที่ท่องเที่ยว, จังหวัด, หรือหมวดหมู่... เช่น "เชียงใหม่" หรือ "ชายหาด"'
            }
          />
        </div>

        <div className="filter-tags">
          {FILTER_TAGS.map(t => {
            let labelText = t.label;
            
            if (currentLang === 'th') {
              if (t.value === 'all') labelText = 'ทั้งหมด';
              if (t.value === 'BKK') labelText = 'กรุงเทพฯ';
              if (t.value === 'north') labelText = 'ภาคเหนือ';
              if (t.value === 'south') labelText = 'ภาคใต้';
              
              // 🟢 เพิ่ม/แก้ไขให้เป็นตัวพิมพ์เล็ก 'central' เพื่อรองรับปุ่มภาคกลาง
              if (t.value === 'central') labelText = 'ภาคกลาง';
              
              // 🟢 เพิ่ม/แก้ไขให้เป็นตัวพิมพ์เล็ก 'east' เพื่อรองรับปุ่มภาคตะวันออก/อีสาน
              if (t.value === 'east') labelText = 'ภาคอีสาน/ตะวันออก';
              
              if (t.value === 'nature') labelText = 'ธรรมชาติ';
              if (t.value === 'culture') labelText = 'วัฒนธรรม';
              if (t.value === 'beach') labelText = 'ทะเล / เกาะ';
              if (t.value === 'zoo') labelText = 'สวนสัตว์ / อควาเรียม';
            }
            
            return (
              <button
                key={t.value}
                className={`ftag${activeTag === t.value ? ' active' : ''}`}
                onClick={() => setTag(t.value)}
              >
                {labelText}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Body: sidebar + cards ── */}
      <div className="explore-body">

        {/* ── Sidebar ── */}
        <aside className="explore-sidebar">

          {/* Sentiment Score */}
          <div className="sidebar-section">
            <div className="sidebar-title">{currentLang === 'en' ? "Sentiment Score" : "ระดับคะแนนความรู้สึก"}</div>
            <div className="score-legend">
              {SCORE_BANDS_CONFIG.map(b => (
                <div key={b.id} className="score-legend-row">
                  <div className="score-legend-left">
                    <CbRow
                      label={<><span className="score-dot" style={{ background: b.color }} />{currentLang === 'en' ? b.labelEn : b.labelTh}</>}
                      checked={scoreBands.includes(b.id)}
                      onChange={() => toggle(scoreBands, setScoreBands, b.id)}
                    />
                  </div>
                  <span className="score-count">{countBand(b.min, b.max)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Type */}
          <div className="sidebar-section">
            <div className="sidebar-title">{currentLang === 'en' ? "Destination Type" : "ประเภทสถานที่"}</div>
            <div className="cb-list">
              {TYPE_OPTIONS.map(t => (
                <CbRow
                  key={t.value}
                  label={currentLang === 'en' ? t.labelEn : t.labelTh}
                  checked={types.includes(t.value)}
                  onChange={() => toggle(types, setTypes, t.value)}
                />
              ))}
            </div>
          </div>

          {/* Review Source */}
          <div className="sidebar-section">
            <div className="sidebar-title">{currentLang === 'en' ? "Review Source" : "แหล่งข้อมูลรีวิว"}</div>
            <div className="cb-list">
              {[
                { label: 'TripAdvisor',   value: 'tripadvisor' },
                { label: 'Google Reviews', value: 'google'      },
                { label: 'Booking.com',    value: 'booking'     },
                { label: 'Agoda',          value: 'agoda'       },
              ].map(s => (
                <CbRow
                  key={s.value}
                  label={s.label}
                  checked={true}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Review Count */}
          <div className="sidebar-section">
            <div className="sidebar-title">{currentLang === 'en' ? "Review Count" : "จำนวนฐานรีวิว"}</div>
            <div className="cb-list">
              {REVIEW_OPTIONS.map(r => (
                <CbRow
                  key={r.value}
                  label={currentLang === 'en' ? r.labelEn : r.labelTh}
                  checked={reviewMin.includes(r.value)}
                  onChange={() => toggle(reviewMin, setReviewMin, r.value)}
                />
              ))}
            </div>
          </div>

          <button className="sidebar-reset" onClick={resetAll}>
            {currentLang === 'en' ? "Reset all filters" : "ล้างตัวเลือกตัวกรองทั้งหมด"}
          </button>
        </aside>

        {/* ── Cards area ── */}
        <div className="explore-cards-area">
          <div className="cards-bar">
            <span className="results-txt">
              {currentLang === 'en' ? `Showing ${filtered.length} destinations` : `พบจุดหมายปลายทาง ${filtered.length} แห่ง`}
            </span>
            <div className="sort-wrap">
              <label>{currentLang === 'en' ? "Sort by" : "เรียงตาม"}</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="pos">{currentLang === 'en' ? "% Positive" : "% รีวิวเชิงบวก"}</option>
                <option value="reviews">{currentLang === 'en' ? "Review count" : "จำนวนรีวิวสูงสุด"}</option>
              </select>
            </div>
          </div>

          <div className="cards-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>{currentLang === 'en' ? "No destinations match your filters." : "ไม่พบสถานที่ท่องเที่ยวที่ตรงกับตัวกรองของคุณ"}</p>
              </div>
            ) : (
              filtered.map(p => (
                <PlaceCard key={p.id} place={p} onClick={onSelectPlace} currentLang={currentLang} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}