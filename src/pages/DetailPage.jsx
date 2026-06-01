import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MapPin, Star, Hotel, Compass, BarChart2 } from 'lucide-react';
import { getSentimentLabel, getSentimentClass } from '../data/places';
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
export default function DetailPage({ place, onBack, allPlaces })  {
  const cls   = getSentimentClass(place.pos);
  const label = getSentimentLabel(place.pos);
  const [showCompare, setShowCompare] = useState(false);

  const scoreColor =
    place.pos >= 85 ? '#22C55E' :
    place.pos >= 70 ? '#5DCAA5' :
    place.pos >= 55 ? '#F59E0B' : '#EF4444';

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <div className="detail-page">
      {/* ── Back bar ── */}
      <div className="detail-back-bar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={15} /> back to Explore
        </button>
      </div>

      {/* ── Hero image ──
      <img src={place.img} alt={place.name} className="detail-hero-img" /> */}

      {/* ── Content ── */}
      <div className="detail-content">
        {/* Title row */}
        <div className="detail-top">
          <div>
            <h1 className="detail-title">
              <span className="grad-text">{place.name}</span>
            </h1>
          </div>
          <span className={`detail-sent-badge ${cls}`}>{label}</span>
        </div>

        <div className="detail-loc">
          <MapPin size={14} /> {place.loc}
        </div>

        {/* 2-col layout */}
        <div className="detail-grid">
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Sentiment panel */}
            <div className="detail-panel">
              <div className="panel-title">Sentiment Analysis</div>
              <div className="sent-bars">
                <div className="sent-row">
                  <span className="sent-lbl">Positive</span>
                  <AnimatedBar pct={place.pos} color="#22C55E" delay={0} />
                  <span className="sent-pct" style={{ color: '#22C55E' }}>{place.pos}%</span>
                </div>
                <div className="sent-row">
                  <span className="sent-lbl">Neutral</span>
                  <AnimatedBar pct={place.neu} color="#F59E0B" delay={80} />
                  <span className="sent-pct" style={{ color: '#F59E0B' }}>{place.neu}%</span>
                </div>
                <div className="sent-row">
                  <span className="sent-lbl">Negative</span>
                  <AnimatedBar pct={place.neg} color="#EF4444" delay={160} />
                  <span className="sent-pct" style={{ color: '#EF4444' }}>{place.neg}%</span>
                </div>
              </div>
              <div className="review-chip">
                <Star size={13} fill="#F59E0B" stroke="none" />
                Based on <strong>{place.reviews.toLocaleString()}</strong> foreign tourist reviews
              </div>
              <div className="source-row" style={{ marginTop: 12 }}>
                {['TripAdvisor','Google','Booking.com','Agoda'].map(s => (
                  <span key={s} className="source-chip">{s}</span>
                ))}
              </div>
            </div>

            {/* Keywords panel */}
            <div className="detail-panel">
              <div className="panel-title">Tourist Keywords</div>
              <div className="kw-list">
                {place.kws.map(k => (
                  <span key={k.w} className={`kw-tag ${k.s}`}>{k.w}</span>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="ai-box">
              <div className="ai-box-label">✦ AI Key Insight</div>
              <div className="ai-box-text">{place.ai}</div>
            </div>

          </div>

          {/* Right column — score + actions */}
          <div className="action-sidebar">
            {/* Big score card */}
            <div className="score-big-card">
              <div className="score-big-label">Sentiment Score</div>
              <div className="score-big-num">{place.pos}%</div>
              <div className="score-big-sub">positive reviews</div>
              <div className="score-mini-bars">
                <div className="score-mini-row">
                  <span className="score-mini-lbl">Positive</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.pos}%`, background: '#22C55E' }} />
                  </div>
                  <span className="score-mini-pct">{place.pos}%</span>
                </div>
                <div className="score-mini-row">
                  <span className="score-mini-lbl">Neutral</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.neu}%`, background: '#F59E0B' }} />
                  </div>
                  <span className="score-mini-pct">{place.neu}%</span>
                </div>
                <div className="score-mini-row">
                  <span className="score-mini-lbl">Negative</span>
                  <div className="score-mini-track">
                    <div className="score-mini-fill" style={{ width: `${place.neg}%`, background: '#EF4444' }} />
                  </div>
                  <span className="score-mini-pct">{place.neg}%</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-btns">
              <button className="action-btn action-btn-primary"
                onClick={() => alert(`Open Agoda/Booking.com for hotels near ${place.name}`)}>
                <Hotel size={15} /> Book Hotel 
              </button>
              <button className="action-btn action-btn-outline"
                onClick={() => alert(`Open Klook/Viator for tours at ${place.name}`)}>
                <Compass size={15} />View Tours
              </button>
              <button className="action-btn action-btn-outline"
                onClick={() => setShowCompare(true)}>
                <BarChart2 size={15} /> Compare Destinations
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
