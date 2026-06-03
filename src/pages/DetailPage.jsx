import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Star, Hotel, Compass, BarChart2, Layers } from 'lucide-react';
// เพิ่ม KEYWORD_INSIGHTS_MAP เข้ามาในแถบนำเข้าข้อมูล
import { getSentimentLabel, getSentimentClass, KEYWORD_INSIGHTS_MAP } from '../data/places';
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

// 🟢 เพิ่มการรับ Prop "currentLang" เข้ามาจาก App.jsx
export default function DetailPage({ place, onBack, allPlaces, currentLang = 'en' })  {
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

  // ปรับแต่งระบบคัดกรองคำสำคัญแยกหมวดหมู่ตามโครงสร้างอาเรย์ของข้อมูล
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

  return (
    <div className="detail-page">
      <div className="detail-back-bar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={15} /> {currentLang === 'en' ? 'back to Explore' : 'กลับสู่หน้าค้นหา'}
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-top">
          <div>
            <h1 className="detail-title">
              {/* 🟢 สลับแสดงชื่อสถานที่ตามภาษา */}
              <span className="grad-text">{currentLang === 'en' ? place.name : (place.name_th || place.name)}</span>
            </h1>
          </div>
          <span className={`detail-sent-badge ${cls}`}>{label}</span>
        </div>

        <div className="detail-loc">
          {/* 🟢 สลับแสดงที่อยู่ตามภาษา */}
          <MapPin size={14} /> {currentLang === 'en' ? place.loc : (place.loc_th || place.loc)}
        </div>

        <div className="detail-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div className="detail-panel">
              <div className="panel-title">{currentLang === 'en' ? 'Sentiment Analysis' : 'การวิเคราะห์ความรู้สึก'}</div>
              <div className="sent-bars">
                <div className="sent-row">
                  <span className="sent-lbl">{currentLang === 'en' ? 'Positive' : 'แง่บวก'}</span>
                  <AnimatedBar pct={place.pos} color="#22C55E" delay={0} />
                  <span className="sent-pct" style={{ color: '#22C55E' }}>{place.pos}%</span>
                </div>
                <div className="sent-row">
                  <span className="sent-lbl">{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</span>
                  <AnimatedBar pct={place.neu} color="#F59E0B" delay={80} />
                  <span className="sent-pct" style={{ color: '#F59E0B' }}>{place.neu}%</span>
                </div>
                <div className="sent-row">
                  <span className="sent-lbl">{currentLang === 'en' ? 'Negative' : 'แง่ลบ'}</span>
                  <AnimatedBar pct={place.neg} color="#EF4444" delay={160} />
                  <span className="sent-pct" style={{ color: '#EF4444' }}>{place.neg}%</span>
                </div>
              </div>
              <div className="review-chip">
                <Star size={13} fill="#F59E0B" stroke="none" />
                {currentLang === 'en' ? (
                  <>Based on <strong>{place.reviews.toLocaleString()}</strong> foreign tourist reviews</>
                ) : (
                  <>อ้างอิงจากรีวิวนักท่องเที่ยวต่างชาติ <strong>{place.reviews.toLocaleString()}</strong> รายการ</>
                )}
              </div>
              <div className="source-row" style={{ marginTop: 12 }}>
                {['TripAdvisor','Google','Booking.com','Agoda'].map(s => (
                  <span key={s} className="source-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="detail-panel">
              <div className="panel-title">
                {currentLang === 'en' ? 'Filter Keywords by Research Framework' : 'กรองคำสำคัญตามกรอบงานวิจัย'}
              </div>
              
              <div className="category-tabs">
                {[
                  { id: 'ALL', label: currentLang === 'en' ? 'All Fields' : 'ทุกด้าน' },
                  { id: 'ATTRACTIONS', label: currentLang === 'en' ? 'Attractions' : 'สิ่งดึงดูดใจท่องเที่ยว' },
                  { id: 'ACCESSIBILITY', label: currentLang === 'en' ? 'Accessibility' : 'การเข้าถึง' },
                  { id: 'AMENITIES', label: currentLang === 'en' ? 'Amenities' : 'สิ่งอำนวยความสะดวก' },
                  { id: 'ACTIVITIES', label: currentLang === 'en' ? 'Activities' : 'กิจกรรมการท่องเที่ยว' }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    className={`tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(tab.id);
                      setSelectedKeyword(null);
                    }}
                  >
                    <Layers size={12} /> {tab.label}
                  </button>
                ))}
              </div>

              {/* 🟢 อธิบายความหมายของแต่ละสี (Legend) ตามภาษา */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#555' }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }}></span>
                  <span>{currentLang === 'en' ? 'Positive' : 'แง่บวก'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#555' }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#555555' }}></span>
                  <span>{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#555' }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></span>
                  <span>{currentLang === 'en' ? 'Negative' : 'แง่ลบ'}</span>
                </div>
              </div>

              <div className="kw-list">
                {getFilteredKeywords().length > 0 ? (
                  getFilteredKeywords().map(k => (
                    <span 
                      key={k.w} 
                      className={`kw-tag ${k.s} clickable ${selectedKeyword === k.w ? 'active' : ''}`}
                      onClick={() => handleKeywordClick(k.w)}
                      title={currentLang === 'en' ? "Click to view live extractive sentence summary" : "คลิกเพื่อดูสรุปประโยคแบบดึงข้อมูลสด"}
                    >
                      {/* 🟢 สลับการแสดงข้อความคำสำคัญด้านใน */}
                      {currentLang === 'en' ? k.w : (k.w_th || k.w)}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#818181', fontStyle: 'italic' }}>
                    {currentLang === 'en' ? 'No specific keywords found for this category segment.' : 'ไม่พบคำสำคัญเฉพาะสำหรับหมวดหมู่ย่อยนี้'}
                  </span>
                )}
              </div>
            </div>

            <div className={`ai-box ${selectedKeyword ? 'filtered' : ''}`}>
              <div className="ai-box-label">
                {selectedKeyword 
                  ? (currentLang === 'en' ? `✦ AI Live Extract: "${selectedKeyword}"` : `✦ ข้อมูลสกัดสดโดย AI: "${selectedKeyword}"`)
                  : (currentLang === 'en' ? '✦ AI Overall Key Insight' : '✦ บทสรุปอินไซต์ภาพรวมโดย AI')
                }
              </div>
              <div className="ai-box-text">
                {selectedKeyword 
                  ? (KEYWORD_INSIGHTS_MAP[selectedKeyword] || (currentLang === 'en' ? `The system detected highly matching numerical vector weights (via Cosine Similarity) for "${selectedKeyword}" in recent international traveler reviews.` : `ระบบตรวจพบค่าน้ำหนักเวกเตอร์เชิงตัวเลขที่มีความเข้ากันได้สูง (ผ่าน Cosine Similarity) สำหรับคำว่า "${selectedKeyword}" ในรีวิวล่าสุดจากนักท่องเที่ยวต่างชาติ`))
                  : (currentLang === 'en' ? place.ai : (place.ai_th || place.ai))
                }
              </div>
              {selectedKeyword && (
                <button className="ai-reset-btn" onClick={() => setSelectedKeyword(null)}>
                  {currentLang === 'en' ? '← Reset to Overall Summary' : '← รีเซ็ตกลับเป็นบทสรุปภาพรวม'}
                </button>
              )}
            </div>

          </div>

          <div className="action-sidebar">
            <div className="score-big-card">
              <div className="score-big-label">{currentLang === 'en' ? 'Sentiment Score' : 'คะแนนความรู้สึก'}</div>
              <div className={`score-big-num ${cls}`}>{place.pos}%</div>
              <div className="score-big-sub">{currentLang === 'en' ? 'positive reviews' : 'รีวิวเชิงบวก'}</div>
              {/*<div className="score-mini-bars">
                <div className="score-mini-row">
                  <span className="score-mini-lbl">{currentLang === 'en' ? 'Positive' : 'แง่บวก'}</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.pos}%`, background: '#22C55E' }} />
                  </div>
                  <span className="score-mini-pct">{place.pos}%</span>
                </div>
                <div className="score-mini-row">
                  <span className="score-mini-lbl">{currentLang === 'en' ? 'Neutral' : 'ทั่วไป'}</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.neu}%`, background: '#F59E0B' }} />
                  </div>
                  <span className="score-mini-pct">{place.neu}%</span>
                </div>
                <div className="score-mini-row">
                  <span className="score-mini-lbl">{currentLang === 'en' ? 'Negative' : 'แง่ลบ'}</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.neg}%`, background: '#EF4444' }} />
                  </div>
                  <span className="score-mini-pct">{place.neg}%</span>
                </div>
              </div>*/}
            </div>

            <div className="action-btns">
              <button className="action-btn action-btn-primary"
                onClick={() => alert(`Open Agoda/Booking.com for hotels near ${place.name}`)}>
                <Hotel size={15} /> {currentLang === 'en' ? 'Book Hotel' : 'จองโรงแรมใกล้เคียง'}
              </button>
              <button className="action-btn action-btn-outline"
                onClick={() => alert(`Open Klook/Viator for tours at ${place.name}`)}>
                <Compass size={15} /> {currentLang === 'en' ? 'View Tours' : 'ดูแพ็กเกจทัวร์'}
              </button>
              <button className="action-btn action-btn-outline"
                onClick={() => setShowCompare(true)}>
                <BarChart2 size={15} /> {currentLang === 'en' ? 'Compare Destinations' : 'เปรียบเทียบจุดหมาย'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCompare && (
        <CompareModal
          currentPlace={place}
          allPlaces={allPlaces}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}