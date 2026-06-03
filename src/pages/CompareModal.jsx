import { useState } from 'react';
import { X, Search } from 'lucide-react';
import './CompareModal.css';

export default function CompareModal({ currentPlace, allPlaces, onClose, currentLang = 'en' }) {
  const [selected, setSelected] = useState([currentPlace]);
  const [query, setQuery]       = useState('');

const MAX_VISIBLE = 6;

    const filtered = allPlaces
    .filter(p => p.id !== currentPlace.id)
    .filter(p =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query.toLowerCase())) ||
      (p.name_th && p.name_th.toLowerCase().includes(query.toLowerCase())) ||
      p.loc.toLowerCase().includes(query.toLowerCase()) ||
      (p.loc_th && p.loc_th.toLowerCase().includes(query.toLowerCase()))
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
          <span className="cm-title">{currentLang === 'en' ? 'Compare Destinations' : 'เปรียบเทียบจุดหมาย'}</span>
          <button className="cm-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Search + Picker */}
        <div className="cm-picker-label">
          {currentLang === 'en' ? `Add destinations to compare (${selected.length}/3)` : `เพิ่มจุดหมายเพื่อเปรียบเทียบ (${selected.length}/3)`}
        </div>

        {/* ← Search bar ใหม่ */}
        <div className="cm-search-wrap">
          <Search size={15} className="cm-search-icon" />
          <input
            className="cm-search-input"
            type="text"
            placeholder={currentLang === 'en' ? 'Search destinations...' : 'ค้นหาจุดหมาย...'}
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
                        <span className="cm-pick-name">{currentLang === 'en' ? p.name : (p.name_th || p.name)}</span>
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
                    {currentLang === 'en'
                      ? `+${filtered.length - MAX_VISIBLE} more — search to find them`
                      : `+${filtered.length - MAX_VISIBLE} เพิ่มเติม — ค้นหาเพื่อหา`}
                    </div>
                )}

                {/* no result */}
                {query && visible.length === 0 && (
                  <div style={{ fontSize: '0.82rem', color: '#888', padding: '8px 0' }}>
                  {currentLang === 'en' ? `No results for "${query}"` : `ไม่พบผลลัพธ์สำหรับ "${query}"`}
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
                  <span className="cm-place-name">{currentLang === 'en' ? p.name : (p.name_th || p.name)}</span>
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
              <div className="cm-label-cell">{currentLang === 'en' ? 'Score' : 'คะแนน'}</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  <span className="cm-score" style={{ color: sentColor(p.pos) }}>{p.pos}%</span>
                  {p.pos === Math.max(...selected.map(s => s.pos)) && selected.length > 1 && (
                    <span className="cm-best">{currentLang === 'en' ? 'Best' : 'ดีที่สุด'}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Sentiment bars */}
            <div className="cm-row cm-row-tall">
              <div className="cm-label-cell">{currentLang === 'en' ? 'Sentiment' : 'แนวโน้มความรู้สึก'}</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-bars-cell">
                  {[
                    { label: currentLang === 'en' ? 'Pos' : 'บวก', pct: p.pos, color: '#22C55E' },
                    { label: currentLang === 'en' ? 'Neu' : 'กลาง', pct: p.neu, color: '#F59E0B' },
                    { label: currentLang === 'en' ? 'Neg' : 'ลบ', pct: p.neg, color: '#EF4444' },
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
              <div className="cm-label-cell">{currentLang === 'en' ? 'Reviews' : 'รีวิว'}</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  {currentLang === 'en' ? `${p.reviews.toLocaleString()} reviews` : `รีวิวทั้งหมด ${p.reviews.toLocaleString()} รายการ`}
                  {p.reviews === Math.max(...selected.map(s => s.reviews)) && selected.length > 1 && (
                    <span className="cm-best">{currentLang === 'en' ? 'Most' : 'มากที่สุด'}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Keywords */}
            <div className="cm-row cm-row-tall">
              <div className="cm-label-cell">{currentLang === 'en' ? 'Keywords' : 'คำสำคัญ'}</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-kw-cell">
                  {p.kws.map(k => (
                    <span key={k.w} className={`cm-kw cm-kw-${k.s}`}>{currentLang === 'en' ? k.w : (k.w_th || k.w)}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div className="cm-row cm-row-ai">
              <div className="cm-label-cell">{currentLang === 'en' ? 'AI Summary' : 'สรุปโดย AI'}</div>
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell cm-ai-cell">{currentLang === 'en' ? p.ai : (p.ai_th || p.ai)}</div>
              ))}
            </div>

            {/* Book */}
            <div className="cm-row">
              <div className="cm-label-cell" />
              {selected.map(p => (
                <div key={p.id} className="cm-data-cell">
                  <button className="cm-book-btn" onClick={() => alert(currentLang === 'en' ? `Book hotel near ${p.name}` : `จองโรงแรมใกล้ ${p.name}`)}>
                    {currentLang === 'en' ? 'Book Hotel' : 'จองโรงแรม'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#AAA', fontSize: '0.88rem' }}>
            {currentLang === 'en' ? 'Select destinations to compare' : 'เลือกจุดหมายเพื่อเปรียบเทียบ'}
          </div>
        )}

      </div>
    </div>
  );
}