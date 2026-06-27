import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Star, Hotel, Compass, BarChart2, Layers, Map, Compass as ActionIcon, Heart, CalendarDays } from 'lucide-react';
import { getSentimentLabel, getSentimentClass, KEYWORD_INSIGHTS_MAP, PLACES_DATA } from '../data/places';
import './DetailPage.css';
import CompareModal from './CompareModal';
import TravelPlannerModal from './TravelPlannerModal';

function AnimatedBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="sent-track">
      <div className="sent-fill" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

export default function DetailPage({ place, onBack, allPlaces, currentLang = 'en', onSelectPlace })  {
  const cls   = getSentimentClass(place.pos);
  const label = getSentimentLabel(place.pos, currentLang);
  const [showCompare, setShowCompare] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    setActiveCategory('ALL');
    setSelectedKeyword(null);
  }, [place]);

  const getFilteredKeywords = () => {
    if (activeCategory === 'ALL') return place.kws;
    return place.kws.filter((_, index) => {
      if (activeCategory === 'ATTRACTIONS') return index === 0 || index === 1;
      if (activeCategory === 'ACCESSIBILITY') return index === 2 || index === 3;
      if (activeCategory === 'AMENITIES') return index === 4 || index === 5;
      if (activeCategory === 'ACTIVITIES') return index === 6 || index === 7;
      return true;
    });
  };

  const handleKeywordClick = (keywordText) => {
    if (selectedKeyword === keywordText) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keywordText);
    }
  };

  const getNearbyRecommendations = () => {
    return PLACES_DATA.filter(p => 
      p.id !== place.id && 
      p.region.some(r => place.region.includes(r))
    ).sort((a, b) => {
      const placeProvince = place.province || place.loc;
      const aSameProvince = (a.province || a.loc) === placeProvince ? 1 : 0;
      const bSameProvince = (b.province || b.loc) === placeProvince ? 1 : 0;
      return bSameProvince - aSameProvince || b.pos - a.pos;
    }).slice(0, 3);
  };

  return (
    <div className="detail-page">
      <div className="detail-back-bar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={15} /> {currentLang === 'en' ? 'back to Explore' : 'กลับสู่หน้าค้นหา'}
        </button>
      </div>

      <div className="detail-content">
        
        {/* ── 🟢 ส่วนบนสุด (Hero Section) แสดงข้อความยาวเต็มฝั่งซ้าย ไม่มีรูปมาแชร์ ── */}
        <div className="detail-header-main" style={{ marginBottom: '12px' }}>
          <div className="detail-top">
            <h1 className="detail-title">
              <span className="grad-text">{currentLang === 'en' ? place.name : (place.name_th || place.name)}</span>
            </h1>
            <span className={`detail-sent-badge ${cls}`}>{label}</span>
          </div>
          <div className="detail-loc" style={{ marginBottom: '16px' }}>
            <MapPin size={14} /> {currentLang === 'en' ? place.loc : (place.loc_th || place.loc)}
          </div>
        </div>

        {/* บล็อกรายละเอียดเกี่ยวกับสถานที่ (สยายปีกกว้างเต็มหน้าจอ) */}
        <div className="place-desc-wrapper" style={{ marginBottom: '24px' }}>
          <p className="place-desc" style={{ color: 'var(--text-muted, #555)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
            {currentLang === 'en' ? place.description : (place.description_th || place.description || 'ไม่มีข้อมูลรายละเอียดภาษาไทยในขณะนี้')}
          </p>
        </div>

        {/* ── โครงสร้าง GRID ระบบวิเคราะห์ ── */}
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
          
          {/* 🖥️ แผงควบคุมข้อมูลฝั่งซ้าย (วิเคราะห์รีวิว, คีย์เวิร์ด, บทสรุป AI, ไกด์กิจกรรม) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* บล็อก 1: Sentiment Analysis */}
            <div className="detail-panel">
              <div className="panel-title">{currentLang === 'en' ? 'Sentiment Analysis' : 'การวิเคราะห์รีวิว'}</div>
              <div className="sent-bars">
                <div className="sent-row"><span className="sent-lbl">{currentLang === 'en' ? 'Positive' : 'แง่บวก'}</span><AnimatedBar pct={place.pos} color="#22C55E" delay={0} /><span className="sent-pct" style={{ color: '#22C55E' }}>{place.pos}%</span></div>
                <div className="sent-row"><span className="sent-lbl">{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</span><AnimatedBar pct={place.neu} color="#F59E0B" delay={80} /><span className="sent-pct" style={{ color: '#F59E0B' }}>{place.neu}%</span></div>
                <div className="sent-row"><span className="sent-lbl">{currentLang === 'en' ? 'Negative' : 'แง่ลบ'}</span><AnimatedBar pct={place.neg} color="#EF4444" delay={160} /><span className="sent-pct" style={{ color: '#EF4444' }}>{place.neg}%</span></div>
              </div>
              <div className="review-chip">
                <Star size={13} fill="#F59E0B" stroke="none" />
                {currentLang === 'en' ? <>Based on <strong>{place.reviews.toLocaleString()}</strong> foreign reviews</> : <>อ้างอิงจากรีวิวนักท่องเที่ยวต่างชาติ <strong>{place.reviews.toLocaleString()}</strong> รายการ</>}
              </div>
            </div>

            {/* บล็อก 2: ตัวกรองคำสำคัญตามกรอบงานวิจัย */}
            <div className="detail-panel">
              <div className="panel-title">{currentLang === 'en' ? 'Filter Keywords ' : 'กรองคำสำคัญ'}</div>
              <div className="category-tabs">
                {[
                  { id: 'ALL', label: currentLang === 'en' ? 'All Fields' : 'ทุกด้าน' },
                  { id: 'ATTRACTIONS', label: currentLang === 'en' ? 'Attractions' : 'สิ่งดึงดูดใจท่องเที่ยว' },
                  { id: 'ACCESSIBILITY', label: currentLang === 'en' ? 'Accessibility' : 'การเข้าถึง' },
                  { id: 'AMENITIES', label: currentLang === 'en' ? 'Amenities' : 'สิ่งอำนวยความสะดวก' },
                  { id: 'ACTIVITIES', label: currentLang === 'en' ? 'Activities' : 'กิจกรรมการท่องเที่ยว' }
                ].map(tab => (
                  <button key={tab.id} className={`tab-btn ${activeCategory === tab.id ? 'active' : ''}`} onClick={() => { setActiveCategory(tab.id); setSelectedKeyword(null); }}>
                    <Layers size={12} /> {tab.label}
                  </button>
                ))}
                
              </div>
              
              <div className="kw-legend" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 500, color: '#666', marginTop: '-8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
                      {currentLang === 'en' ? 'Positive' : 'แง่บวก'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                      {currentLang === 'en' ? 'Negative' : 'แง่ลบ'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9CA3AF' }} />
                      {currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}
                    </div>
                  </div>

                  {/* กล่องแสดงรายการคีย์เวิร์ด */}
                  <div className="kw-list" style={{ marginTop: '8px' }}>
                    {getFilteredKeywords().map(k => (
                      <span key={k.w} className={`kw-tag ${k.s} clickable ${selectedKeyword === k.w ? 'active' : ''}`} onClick={() => handleKeywordClick(k.w)}>
                        {currentLang === 'en' ? k.w : (k.w_th || k.w)}
                      </span>
                    ))}
              </div>
            </div>
                
            {/* บล็อก 3: บทสรุปสกัดสดอินไซต์โดย AI */}
            <div className={`ai-box ${selectedKeyword ? 'filtered' : ''}`}>
              <div className="ai-box-label">
                {selectedKeyword ? (currentLang === 'en' ? `✦ AI Live Extract: "${selectedKeyword}"` : `✦ ข้อมูลสกัดสดโดย AI: "${selectedKeyword}"`) : (currentLang === 'en' ? '✦ AI Overall Key Insight' : '✦ บทสรุปอินไซต์ภาพรวมโดย AI')}
              </div>
              <div className="ai-box-text">
                {selectedKeyword 
                  ? (typeof KEYWORD_INSIGHTS_MAP[selectedKeyword] === 'object' ? KEYWORD_INSIGHTS_MAP[selectedKeyword]?.[currentLang === 'th' ? 'th' : 'en'] : KEYWORD_INSIGHTS_MAP[selectedKeyword])
                  : (currentLang === 'en' ? place.ai : (place.ai_th || place.ai))
                }
              </div>
              {selectedKeyword && <button className="ai-reset-btn" onClick={() => setSelectedKeyword(null)}>{currentLang === 'en' ? '← Reset to Overall Summary' : '← รีเซ็ตกลับเป็นบทสรุปภาพรวม'}</button>}
            </div>

            {/* บล็อก 4: แผนวางทริปกิจกรรมท่องเที่ยวและไฮไลท์จุดเด่น */}
            <div className="detail-panel travel-plan-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div className="panel-title" style={{ color: 'var(--coral-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ActionIcon size={14} /> {currentLang === 'en' ? 'Recommended Activities' : 'กิจกรรมท่องเที่ยวแนะนำ'}
                </div>
                <ul style={{ paddingLeft: '18px', margin: '10px 0', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.7' }}>
                  {(place.activities || [{en: 'Explore around the venue', th: 'เดินสำรวจรอบบริเวณสถานที่ท่องเที่ยว'}]).map((act, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{currentLang === 'en' ? act.en : act.th}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="panel-title" style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Heart size={14} fill="#22C55E" stroke="none" /> {currentLang === 'en' ? 'Destination Highlights' : 'จุดเด่นสำคัญ'}
                </div>
                <ul style={{ paddingLeft: '18px', margin: '10px 0', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.7' }}>
                  {(place.highlights || [{en: 'Beautiful natural environment', th: 'สภาพแวดล้อมทางธรรมชาติที่งดงามวิจิตร'}]).map((hl, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{currentLang === 'en' ? hl.en : hl.th}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* บาร์หมุดแผนที่ Google Maps ปิดท้ายฟลอร์ข้อมูลท่องเที่ยวฝั่งซ้าย */}
            {place.map_url && (
              <div className="detail-map-inline-footer" style={{ marginTop: '-5px' }}>
                <a 
                  href={place.map_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="action-btn action-btn-outline" 
                  style={{ display: 'flex', textDecoration: 'none', gap: '8px', alignItems: 'center', justifyContent: 'center', padding: '12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, width: '100%' }}
                >
                  <Map size={15} /> {currentLang === 'en' ? 'Open Destination in Google Maps' : 'เปิดแผนที่นำทางไปยังสถานที่แห่งนี้บน Google Maps'}
                </a>
              </div>
            )}
          </div>

          {/* 🧳 แผงควบคุมดีไซน์ฝั่งขวา (การ์ดคะแนนทับรูป, ปุ่มกด, และแกลเลอรีแผงล่างล้อตาม image_00dee4.jpg) */}
          <div className="action-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* กล่องคะแนนรีวิวตัวใหญ่สไตล์ดั้งเดิม สะอาดตาตามสเปกเดิม */}
            <div className="score-big-card">
              <div className="score-big-label">{currentLang === 'en' ? 'Sentiment Score' : 'คะแนนรีวิว'}</div>
              <div className={`score-big-num ${cls}`}>{place.pos}%</div>
              <div className="score-big-sub">{currentLang === 'en' ? 'positive reviews' : 'รีวิวเชิงบวก'}</div>
            </div>

            {/* แผงกลุ่มปุ่มกดจองและเปรียบเทียบ */}
            <div className="action-btns" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="action-btn action-btn-plan" onClick={() => setShowPlanner(true)}>
                <CalendarDays size={15} /> {currentLang === 'en' ? 'Plan Your Trip' : 'วางแผนการท่องเที่ยว'}
              </button>
              <button
                  className="action-btn action-btn-primary"
                  style={{
                    background: '#f67c7c',
                    border: 'none',
                    color: '#fff'
                  }}
                  onClick={() => setShowBookingModal(true)}
                >
                  <Hotel size={15} />
                  {currentLang === 'en'
                    ? 'Book Hotel'
                    : 'จองโรงแรมใกล้เคียง'}
                </button>
              <button className="action-btn action-btn-outline" onClick={() => alert(`Tours at ${place.name}`)}>
                <Compass size={15} /> {currentLang === 'en' ? 'View Tours' : 'ดูแพ็กเกจทัวร์'}
              </button>
              <button className="action-btn action-btn-outline" onClick={() => setShowCompare(true)}>
                <BarChart2 size={15} /> {currentLang === 'en' ? 'Compare Destinations' : 'เปรียบเทียบสถานที่'}
              </button>
            </div>

            {/* ── 🟢 บล็อกย้ายแกลเลอรีรูปภาพ: ย้ายมาต่อท้ายปุ่มกดฝั่งขวาตามภาพ image_00dee4.jpg เป๊ะๆ ── */}
            <div className="place-gallery-sidebar-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '8px' }}>
              {/* ภาพรองขนาดยาวแนวนอน */}
              <img src={(place.gallery && place.gallery[0]) || place.img} alt={place.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setLightboxSrc((place.gallery && place.gallery[0]) || place.img)} />
              
              {/* ภาพย่อยคู่ล่างพร้อมเขียนดีไซน์ badge ซ้อนคำว่า +23 รายการครอบไว้ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <img src={(place.gallery && place.gallery[1]) || place.img} alt="gallery-sub-1" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setLightboxSrc((place.gallery && place.gallery[1]) || place.img)} />
                
                <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                  <img src={place.img} alt="gallery-sub-2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setLightboxSrc(place.img)} />
                  <a
                    href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(currentLang === 'en' ? place.name : (place.name_th || place.name))}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      background: 'rgba(0,0,0,0.5)', borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: '1.05rem', fontWeight: 700, textDecoration: 'none'
                    }}
                  >
                    {currentLang === 'en' ? 'View more' : 'ดูเพิ่มเติม'}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ส่วนล่างสุด: แนะนำสถานที่ใกล้เคียงในภูมิภาค */}
        <div className="nearby-recommendations-section" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-color, #eee)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
            {currentLang === 'en' ? 'Nearby Attractions' : 'สถานที่ใกล้เคียง'}
          </h3>
          <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {getNearbyRecommendations().map(p => {
              const cardLabel = getSentimentLabel(p.pos, currentLang);
              const cardCls   = getSentimentClass(p.pos);
              const scoreColor =
                p.pos >= 80 ? '#007a2d' :
                p.pos >= 65 ? '#71c971' :
                p.pos >= 50 ? '#F59E0B' : '#EF4444';

              return (
                <div 
                  key={p.id} 
                  className="place-card" 
                  style={{ cursor: 'pointer', zIndex: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelectPlace) onSelectPlace(p);
                  }}
                >
                  <div className="card-img-wrap">
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <span className={`sent-badge ${cardCls}`}>{cardLabel}</span>
                  </div>
                  <div className="card-body-inner" style={{ textAlign: 'left' }}>
                    <div className="card-name">
                      {currentLang === 'en' ? p.name : (p.name_th || p.name)}
                    </div>
                    <div className="card-loc"> 
                      <MapPin size={16} fill="#EF4444" stroke="#ffffff" strokeWidth={1} /> 
                      {currentLang === 'en' ? p.loc : (p.loc_th || p.loc)}
                    </div>
                    <div className="mini-bar">
                      <div style={{ flex: p.pos, background: '#04a13b' }} />
                      <div style={{ flex: p.neu, background: '#774b00' }} />
                      <div style={{ flex: p.neg, background: '#EF4444' }} />
                    </div>
                    <div className="card-foot">
                      <span className="card-reviews">
                        {currentLang === 'en' ? `${p.reviews.toLocaleString()} reviews` : `รีวิวทั้งหมด ${p.reviews.toLocaleString()} รายการ`}
                      </span>
                      <span className="card-score" style={{ color: scoreColor, fontWeight: 600 }}>
                        {currentLang === 'en' ? `${p.pos}% positive` : `เชิงบวก ${p.pos}%`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {lightboxSrc && (
        <div
          className="image-lightbox"
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          }}
        >
          <img
            src={lightboxSrc}
            alt="preview"
            style={{ maxWidth: '92%', maxHeight: '92%', borderRadius: 10, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
          />
        </div>
      )}

      {showCompare && <CompareModal currentPlace={place} allPlaces={allPlaces} onClose={() => setShowCompare(false)} currentLang={currentLang} />}
      {showPlanner && <TravelPlannerModal place={place} nearbyPlaces={getNearbyRecommendations()} currentLang={currentLang} onClose={() => setShowPlanner(false)} />}

{showBookingModal && (
  <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
    <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
      
      <h3>{currentLang === 'en' ? 'Recommended Hotel Partners' : 'พันธมิตรผู้ให้บริการที่พักแนะนำ'}</h3>
      <p className="modal-subtitle">
        {currentLang === 'en' 
          ? 'Recommended based on pricing, availability and partner reliability.' 
          : 'ข้อเสนอที่ดีที่สุดคัดสรรตามราคา ห้องว่าง และความน่าเชื่อถือของแพลตฟอร์ม'}
      </p>

      {/* แพลตฟอร์มที่ 1: Agoda (Best Value) */}
      <div className="partner-card best">
        <span className="badge">
          {/* ไอคอนรูปดาวคู่ใจพรีเมียม */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          {currentLang === 'en' ? 'Best Value' : 'คุ้มค่าที่สุด'}
        </span>
        <div className="partner-info">
          <h4>Agoda</h4>
          <p>{currentLang === 'en' ? 'Starting from' : 'เริ่มต้นเพียง'} <strong>฿2,100</strong></p>
        </div>
        <button onClick={() => alert('Redirecting to Agoda...')}>
          {currentLang === 'en' ? 'View Deal' : 'ดูข้อเสนอ'}
        </button>
      </div>

      {/* แพลตฟอร์มที่ 2: Booking.com */}
      <div className="partner-card">
        <span className="badge">
          {/* ไอคอนรูปถ้วยรางวัลสากล */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5V11a4.5 4.5 0 0 0 9 0V6.5A4.5 4.5 0 0 0 12 2z"/></svg>
          {currentLang === 'en' ? 'Most Popular' : 'ยอดนิยม'}
        </span>
        <div className="partner-info">
          <h4>Booking.com</h4>
          <p>{currentLang === 'en' ? 'Starting from' : 'เริ่มต้นเพียง'} <strong>฿2,250</strong></p>
        </div>
        <button onClick={() => alert('Redirecting to Booking.com...')}>
          {currentLang === 'en' ? 'View Deal' : 'ดูข้อเสนอ'}
        </button>
      </div>

      {/* แพลตฟอร์มที่ 3: Trip.com */}
      <div className="partner-card">
        <span className="badge">
          {/* ไอคอนป้ายแท็กราคาหรือเหรียญเงิน */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          {currentLang === 'en' ? 'Lowest Price' : 'ราคาถูกที่สุด'}
        </span>
        <div className="partner-info">
          <h4>Trip.com</h4>
          <p>{currentLang === 'en' ? 'Starting from' : 'เริ่มต้นเพียง'} <strong>฿2,050</strong></p>
        </div>
        <button onClick={() => alert('Redirecting to Trip.com...')}>
          {currentLang === 'en' ? 'View Deal' : 'ดูข้อเสนอ'}
        </button>
      </div>

      {/* ปุ่มปิดมินิมอล */}
      <button className="close-btn" onClick={() => setShowBookingModal(false)}>
        {currentLang === 'en' ? 'Close window' : 'ปิดหน้าต่าง'}
      </button>
      
    </div>
  </div>
)}
    </div>
  );
}
