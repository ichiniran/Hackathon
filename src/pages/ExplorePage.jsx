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
function PlaceCard({ place, onClick }) {
  const label = getSentimentLabel(place.pos);
  const cls   = getSentimentClass(place.pos);
  const scoreColor =
    place.pos >= 85 ? '#22C55E' :
    place.pos >= 70 ? '#5DCAA5' :
    place.pos >= 55 ? '#F59E0B' : '#EF4444';

  return (
    <div className="place-card" onClick={() => onClick(place)}>
      <div className="card-img-wrap">
        <img src={place.img} alt={place.name} loading="lazy" />
        <span className={`sent-badge ${cls}`}>{label}</span>
      </div>
      <div className="card-body-inner">
        <div className="card-name">{place.name}</div>
        <div className="card-loc"> <MapPin size={16}  fill="#EF4444"
              stroke="#ffffff"
              strokeWidth={1} /> {place.loc}</div>
        <div className="mini-bar">
          <div style={{ flex: place.pos, background: '#04a13b' }} />
          <div style={{ flex: place.neu, background: '#774b00' }} />
          <div style={{ flex: place.neg, background: '#EF4444' }} />
        </div>
        <div className="card-foot">
          <span className="card-reviews">{place.reviews.toLocaleString()} reviews</span>
          <span className="card-score" style={{ color: scoreColor }}>{place.pos}% positive</span>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar filter config ── */
const SCORE_BANDS = [
  { label: 'Positive ≥ 80%',  color: '#22C55E', min: 80,  max: 100 },
  { label: 'Good (65–79%)',   color: '#5DCAA5', min: 65,  max: 79  },
  { label: 'Mixed (50–64%)',  color: '#F59E0B', min: 50,  max: 64  },
  { label: 'Needs attention', color: '#EF4444', min: 0,   max: 49  },
];

const TYPE_OPTIONS = [
  { label: 'Park / Nature',       value: 'nature'  },
  { label: 'Temple / Heritage',   value: 'culture' },
  { label: 'Beach / Island',      value: 'beach'   },
];

const SOURCE_OPTIONS = [
  { label: 'TripAdvisor',    value: 'tripadvisor' },
  { label: 'Google Reviews', value: 'google'      },
  { label: 'Booking.com',    value: 'booking'     },
  { label: 'Agoda',          value: 'agoda'       },
];

const REVIEW_OPTIONS = [
  { label: '500+ reviews',  value: '500' },
  { label: '100–499',       value: '100' },
  { label: 'Under 100',     value: '0'   },
];

/* count how many places fall into each score band */
function countBand(min, max) {
  return PLACES_DATA.filter(p => p.pos >= min && p.pos <= max).length;
}

export default function ExplorePage({ onSelectPlace }) {
  const [query,   setQuery]  = useState('');
  const [activeTag, setTag]  = useState('all');
  const [sortBy,  setSortBy] = useState('pos');

  /* sidebar state — all checked by default */
  const [scoreBands,  setScoreBands]  = useState(() => SCORE_BANDS.map(b => b.label));
  const [types,       setTypes]       = useState(() => TYPE_OPTIONS.map(t => t.value));
  const [reviewMin,   setReviewMin]   = useState(() => REVIEW_OPTIONS.map(r => r.value));

  function toggle(list, setList, val) {
    setList(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }

  function resetAll() {
    setScoreBands(SCORE_BANDS.map(b => b.label));
    setTypes(TYPE_OPTIONS.map(t => t.value));
    setReviewMin(REVIEW_OPTIONS.map(r => r.value));
    setQuery('');
    setTag('all');
  }

  const filtered = useMemo(() => {
    let list = PLACES_DATA.filter(p => {
      /* search bar */
      const q = query.toLowerCase();
      if (q && !p.name.includes(q) && !p.loc.includes(q) && !p.nameEn.toLowerCase().includes(q)) return false;

      /* top filter tag */
      if (activeTag !== 'all' && p.region !== activeTag && p.type !== activeTag) return false;

      /* sidebar — score band */
      const inBand = SCORE_BANDS.some(b =>
        scoreBands.includes(b.label) && p.pos >= b.min && p.pos <= b.max
      );
      if (!inBand) return false;

      /* sidebar — type */
      if (!types.includes(p.type)) return false;

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
          Explore{' '}
          <span style={{
            background: 'linear-gradient(135deg,#f67c7c,#a8a7b1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Destinations</span>
        </h1>
        <p>Analyzed from over 50,000 external international reviews, updated daily.</p>

        <div className="search-bar">
          <Search size={17} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search destinations, provinces, or categories... e.g. "Chiang Mai" or "Beach".'
          />
        </div>

        <div className="filter-tags">
          {FILTER_TAGS.map(t => (
            <button
              key={t.value}
              className={`ftag${activeTag === t.value ? ' active' : ''}`}
              onClick={() => setTag(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body: sidebar + cards ── */}
      <div className="explore-body">

        {/* ── Sidebar ── */}
        <aside className="explore-sidebar">

          {/* Sentiment Score */}
          <div className="sidebar-section">
            <div className="sidebar-title">Sentiment Score</div>
            <div className="score-legend">
              {SCORE_BANDS.map(b => (
                <div key={b.label} className="score-legend-row">
                  <div className="score-legend-left">
                    <CbRow
                      label={<><span className="score-dot" style={{ background: b.color }} />{b.label}</>}
                      checked={scoreBands.includes(b.label)}
                      onChange={() => toggle(scoreBands, setScoreBands, b.label)}
                    />
                  </div>
                  <span className="score-count">{countBand(b.min, b.max)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Type */}
          <div className="sidebar-section">
            <div className="sidebar-title">Destination Type</div>
            <div className="cb-list">
              {TYPE_OPTIONS.map(t => (
                <CbRow
                  key={t.value}
                  label={t.label}
                  checked={types.includes(t.value)}
                  onChange={() => toggle(types, setTypes, t.value)}
                />
              ))}
            </div>
          </div>

          {/* Review Source */}
          <div className="sidebar-section">
            <div className="sidebar-title">Review Source</div>
            <div className="cb-list">
              {SOURCE_OPTIONS.map(s => (
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
            <div className="sidebar-title">Review Count</div>
            <div className="cb-list">
              {REVIEW_OPTIONS.map(r => (
                <CbRow
                  key={r.value}
                  label={r.label}
                  checked={reviewMin.includes(r.value)}
                  onChange={() => toggle(reviewMin, setReviewMin, r.value)}
                />
              ))}
            </div>
          </div>

          <button className="sidebar-reset" onClick={resetAll}>Reset all filters</button>
        </aside>

        {/* ── Cards area ── */}
        <div className="explore-cards-area">
          <div className="cards-bar">
            <span className="results-txt">Showing {filtered.length} destinations</span>
            <div className="sort-wrap">
              <label>Sort by</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="pos">% Positive</option>
                <option value="reviews">Review count</option>
              </select>
            </div>
          </div>

          <div className="cards-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <p>No destinations match your filters.</p>
              </div>
            ) : (
              filtered.map(p => (
                <PlaceCard key={p.id} place={p} onClick={onSelectPlace} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
