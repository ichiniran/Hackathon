import { useState } from 'react';
import { X, Search } from 'lucide-react';
import './CompareModal.css';

export default function CompareModal({ currentPlace, allPlaces, onClose }) {
  const [selected, setSelected] = useState([currentPlace]);
  const [query, setQuery]       = useState('');

const MAX_VISIBLE = 6;

    const filtered = allPlaces
    .filter(p => p.id !== currentPlace.id)
    .filter(p =>
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.nameEn && p.nameEn.toLowerCase().includes(query.toLowerCase())) ||
        p.loc.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => b.pos - a.pos);   // เรียง sentiment สูงสุดก่อน

    // ถ้ายังไม่ได้พิมพ์ → โชว์แค่ 6 อัน
    const visible = query ? filtered : filtered.slice(0, MAX_VISIBLE);

  const toggle = (place) => {
    if (selected.find(p => p.id === place.id)) return;
    if (selected.length >= 3) return;
    setSelected([...selected, place]);
  };

  const remove = (id) => {
    if (id === currentPlace.id) return;
    setSelected(selected.filter(p => p.id !== id));
  };

  const sentColor = (pos) =>
    pos >= 85 ? '#22C55E' : pos >= 70 ? '#5DCAA5' : pos >= 55 ? '#F59E0B' : '#EF4444';

  return (
    <div className="compare-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="compare-modal">

        {/* Header */}
        <div className="cm-header">
          <span className="cm-title">Compare Destinations</span>
          <button className="cm-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Search + Picker */}
        <div className="cm-picker-label">
          Add destinations to compare ({selected.length}/3)
        </div>

        {/* ← Search bar ใหม่ */}
        <div className="cm-search-wrap">
          <Search size={15} className="cm-search-icon" />
          <input
            className="cm-search-input"
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="cm-search-clear" onClick={() => setQuery('')}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="cm-picker-grid">
                {visible.map(p => {
                    const isPicked = !!selected.find(s => s.id === p.id);
                    const isFull   = selected.length >= 3 && !isPicked;
                    return (
                    <div
                        key={p.id}
                        className={`cm-pick-item ${isPicked ? 'picked' : ''} ${isFull ? 'disabled' : ''}`}
                        onClick={() => !isFull && !isPicked && toggle(p)}
                    >
                        <span className="cm-pick-icon">{p.icon}</span>
                        <span className="cm-pick-name">{p.name}</span>
                        <span className="cm-pick-score" style={{ color: sentColor(p.pos) }}>
                        {p.pos}%
                        </span>
                        {isPicked && <X size={11} style={{ marginLeft: 4, opacity: 0.5 }} />}
                    </div>
                    );
                })}

                {/* hint ตอนยังไม่ค้นหา */}
                {!query && filtered.length > MAX_VISIBLE && (
                    <div style={{ fontSize: '0.78rem', color: '#AAA', padding: '6px 2px', width: '100%' }}>
                    +{filtered.length - MAX_VISIBLE} more — search to find them
                    </div>
                )}

                {/* no result */}
                {query && visible.length === 0 && (
                    <div style={{ fontSize: '0.82rem', color: '#888', padding: '8px 0' }}>
                    No results for "{query}"
                    </div>
                )}
                </div>

        {/* Compare table — เหมือนเดิม */}
        {selected.length > 0 && (
          <div className="cm-table">
            {/* Header row */}
            <div className="cm-row cm-row-header">
              <div className="cm-label-cell" />
              {selected.map(p => (
                <div key={p.id} className="cm-place-cell">
                  <span className="cm-place-icon">{p.icon}</span>
                  <span className="cm-place-name">{p.name}</span>
                  {p.id !== currentPlace.id && (
                    <button className="cm-remove" onClick={() => remove(p.id)}>
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Score */}
            <div className="cm-row">
              <div className="cm-label-cell">Score</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  <span className="cm-score" style={{ color: sentColor(p.pos) }}>{p.pos}%</span>
                  {p.pos === Math.max(...selected.map(s => s.pos)) && selected.length > 1 && (
                    <span className="cm-best">Best</span>
                  )}
                </div>
              ))}
            </div>

            {/* Sentiment bars */}
            <div className="cm-row cm-row-tall">
              <div className="cm-label-cell">Sentiment</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-bars-cell">
                  {[
                    { label: 'Pos', pct: p.pos, color: '#22C55E' },
                    { label: 'Neu', pct: p.neu, color: '#F59E0B' },
                    { label: 'Neg', pct: p.neg, color: '#EF4444' },
                  ].map(({ label, pct, color }) => (
                    <div key={label} className="cm-mini-row">
                      <div className="cm-mini-track">
                        <div className="cm-mini-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <span className="cm-mini-pct" style={{ color }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="cm-row">
              <div className="cm-label-cell">Reviews</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  {p.reviews.toLocaleString()}
                  {p.reviews === Math.max(...selected.map(s => s.reviews)) && selected.length > 1 && (
                    <span className="cm-best">Most</span>
                  )}
                </div>
              ))}
            </div>

            {/* Keywords */}
            <div className="cm-row cm-row-tall">
              <div className="cm-label-cell">Keywords</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-kw-cell">
                  {p.kws.map(k => (
                    <span key={k.w} className={`cm-kw cm-kw-${k.s}`}>{k.w}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div className="cm-row cm-row-ai">
              <div className="cm-label-cell">AI Summary</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-ai-cell">{p.ai}</div>
              ))}
            </div>

            {/* Book */}
            <div className="cm-row">
              <div className="cm-label-cell" />
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  <button className="cm-book-btn" onClick={() => alert(`Book hotel near ${p.name}`)}>
                    Book Hotel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#AAA', fontSize: '0.88rem' }}>
            Select destinations to compare
          </div>
        )}

      </div>
    </div>
  );
}