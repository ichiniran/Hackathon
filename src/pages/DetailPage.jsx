import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Star, Hotel, Compass, BarChart2, Layers, Map, Compass as ActionIcon, Heart } from 'lucide-react';
import { getSentimentLabel, getSentimentClass, KEYWORD_INSIGHTS_MAP, PLACES_DATA } from '../data/places';
import './DetailPage.css';
import CompareModal from './CompareModal';

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

  // 🟢 ตรรกะดึงสถานที่ใกล้เคียง/แนะนำเพิ่มเติม (คัดกรองจากภูมิภาคเดียวกัน)
  const getNearbyRecommendations = () => {
    return PLACES_DATA.filter(p => 
      p.id !== place.id && 
      p.region.some(r => place.region.includes(r))
    ).slice(0, 3);
  };

  return (
    <div className="detail-page">
      <div className="detail-back-bar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={15} /> {currentLang === 'en' ? 'back to Explore' : 'กลับสู่หน้าค้นหา'}
        </button>
      </div>

      <div className="detail-content">
        
        {/* ── ส่วนหัวหลัก (Header) ── */}
        <div className="detail-header-main" style={{ marginBottom: '24px' }}>
          <div className="detail-top">
            <h1 className="detail-title">
              <span className="grad-text">{currentLang === 'en' ? place.name : (place.name_th || place.name)}</span>
            </h1>
            <span className={`detail-sent-badge ${cls}`}>{label}</span>
          </div>
          <div className="detail-loc">
            <MapPin size={14} /> {currentLang === 'en' ? place.loc : (place.loc_th || place.loc)}
          </div>
        </div>

        {/* ── โครงสร้าง GRID หลัก (โฟกัสตัวระบบวิเคราะห์และรีวิวก่อนด้านบน) ── */}
        <div className="detail-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* กล่อง 1: Sentiment Analysis */}
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

            {/* กล่อง 2: ตัวกรองคำสำคัญ (Keywords Group) */}
            <div className="detail-panel">
              <div className="panel-title">{currentLang === 'en' ? 'Filter Keywords by Research Framework' : 'กรองคำสำคัญตามกรอบงานวิจัย'}</div>
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
              <div className="kw-list">
                {getFilteredKeywords().map(k => (
                  <span key={k.w} className={`kw-tag ${k.s} clickable ${selectedKeyword === k.w ? 'active' : ''}`} onClick={() => handleKeywordClick(k.w)}>
                    {currentLang === 'en' ? k.w : (k.w_th || k.w)}
                  </span>
                ))}
              </div>
            </div>

            {/* กล่อง 3: บทสรุปและสกัดข้อมูลด้วย AI */}
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

            {/* ส่วนคำแนะนำสถานที่-รูปภาพด้านล่างกล่องรีวิว */}
            <div className="detail-info-footer-section" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', marginTop: '15px' }}>
              <div>
                <div className="panel-title" style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                  {currentLang === 'en' ? '📍 About this destination' : '📍 เกี่ยวกับสถานที่นี้คร่าวๆ'}
                </div>
                <p className="place-desc" style={{ color: 'var(--text-muted, #555)', fontSize: '0.92rem', lineHeight: '1.6', background: 'var(--bg-panel, #f9f9f9)', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
                  {currentLang === 'en' ? place.description : (place.description_th || place.description || 'ไม่มีข้อมูลรายละเอียดภาษาไทยในขณะนี้')}
                </p>

                {/* ปุ่มปักหมุดเปิดเข้าแผนที่ Google Maps */}
                {place.map_url && (
                  <a href={place.map_url} target="_blank" rel="noreferrer" className="action-btn action-btn-outline" style={{ display: 'inline-flex', textDecoration: 'none', gap: '6px', alignItems: 'center', fontSize: '0.85rem' }}>
                    <Map size={14} /> {currentLang === 'en' ? 'Open in Google Maps' : 'เปิดดูหมุดนำทางบนแผนที่'}
                  </a>
                )}
              </div>

              {/* บล็อกแกลเลอรีรูปภาพเพิ่มเติม */}
              <div className="place-gallery-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <img src={place.img} alt={place.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {(place.gallery || [place.img]).slice(0, 2).map((imgUrl, idx) => (
                    <img key={idx} src={imgUrl} alt="gallery" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* แผนวางทริปกิจกรรมท่องเที่ยวและไฮไลท์เด่น */}
            <div className="detail-panel travel-plan-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
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

          </div>

          {/* แถบกล่องคะแนนและปุ่ม Action ด้านขวา (Sticky Sidebar) */}
          <div className="action-sidebar">
            <div className="score-big-card">
              <div className="score-big-label">{currentLang === 'en' ? 'Sentiment Score' : 'คะแนนรีวิว'}</div>
              <div className={`score-big-num ${cls}`}>{place.pos}%</div>
              <div className="score-big-sub">{currentLang === 'en' ? 'positive reviews' : 'รีวิวเชิงบวก'}</div>
            </div>
            <div className="action-btns">
              <button className="action-btn action-btn-primary" onClick={() => alert(`Booking near ${place.name}`)}><Hotel size={15} /> {currentLang === 'en' ? 'Book Hotel' : 'จองโรงแรมใกล้เคียง'}</button>
              <button className="action-btn action-btn-outline" onClick={() => alert(`Tours at ${place.name}`)}><Compass size={15} /> {currentLang === 'en' ? 'View Tours' : 'ดูแพ็กเกจทัวร์'}</button>
              <button className="action-btn action-btn-outline" onClick={() => setShowCompare(true)}><BarChart2 size={15} /> {currentLang === 'en' ? 'Compare Destinations' : 'เปรียบเทียบจุดหมาย'}</button>
            </div>
          </div>
        </div>

        {/* ── 🟢 ส่วนล่างสุด: แนะนำสถานที่ใกล้เคียง (ที่ถอดแบบการทำงานและการดีไซน์มาจาก PlaceCard ใน ExplorePage) ── */}
        <div className="nearby-recommendations-section" style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-color, #eee)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
            {currentLang === 'en' ? '⚡ Travelers Also Viewed (Nearby Attractions)' : '⚡ นักท่องเที่ยวรายอื่นยังสนใจ (สถานที่ใกล้เคียงในภูมิภาค)'}
          </h3>
          <div className="nearby-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {getNearbyRecommendations().map(p => {
              // 🟢 ถอดสูตร Logic แปลงและคำนวณสี Score มาจาก PlaceCard โดยตรง
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
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectPlace ? onSelectPlace(p) : alert(`Maps to ${p.name}`)}
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
                    {/* แถบสัดส่วนรีวิวสามสีเหมือนหน้าหลัก */}
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

      {showCompare && <CompareModal currentPlace={place} allPlaces={allPlaces} onClose={() => setShowCompare(false)} />}
    </div>
  );
}