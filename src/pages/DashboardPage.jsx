import { useState, useEffect } from 'react';
import './DashboardPage.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview',  notif: null,
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: 'reviews',  label: 'Reviews',   notif: 3,
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'trends',   label: 'Trends',    notif: null,
    icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: 'alerts',   label: 'Alerts',    notif: 2,
    icon: <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { id: 'reports',  label: 'Reports',   notif: null,
    icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
];

const BIZ_ITEMS = [
  { id: 'places', label: 'My Places',
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'competitor', label: 'Competitor',
    icon: <svg viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg> },
  { id: 'settings', label: 'Settings',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg> },
];

/* ── Dark Mode Toggle Button ── */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        /* Sun icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

/* ── Tab: Overview ── */
function TabOverview({ onGoPlans }) {
  return (
    <div>
      <div className="dash-claim-bar">
        <div className="dash-claim-icon">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className="dash-claim-txt">
          <strong>Verified Owner</strong> — You have full access to deep insights, raw reviews, and real-time alerts for this destination.
        </div>
        <div className="dash-claim-badge">🔓 Unlocked</div>
      </div>

      <div className="dash-metrics">
        <div className="dash-metric"><div className="dm-lbl">Sentiment score</div><div className="dm-val pos">76%</div><div className="dm-delta up">↑ +3% from last month</div></div>
        <div className="dash-metric"><div className="dm-lbl">Total reviews</div><div className="dm-val">1,247</div><div className="dm-delta">+82 new this month</div></div>
        <div className="dash-metric"><div className="dm-lbl">Negative reviews</div><div className="dm-val neg">87</div><div className="dm-delta dn">↑ +5 this week</div></div>
        <div className="dash-metric"><div className="dm-lbl">Response rate</div><div className="dm-val warn">34%</div><div className="dm-delta">Industry avg: 58%</div></div>
      </div>

      <div className="dash-row2">
        <div className="dash-panel">
          <div className="dp-title">Sentiment trend — 6 months</div>
          {[['Jan',68,'#F59E0B'],['Feb',71,'#22C55E'],['Mar',65,'#F59E0B'],['Apr',73,'#22C55E'],['May',74,'#22C55E'],['Jun',76,'#22C55E']].map(([m,p,c])=>(
            <div key={m} className="d-trend-row">
              <div className="d-trend-mo">{m}</div>
              <div className="d-trend-track"><div className="d-trend-fill" style={{width:`${p}%`,background:c}}/></div>
              <div className="d-trend-pct">{p}%</div>
            </div>
          ))}
        </div>
        <div className="dash-panel">
          <div className="dp-title">Sentiment breakdown</div>
          {[['Positive',76,'#22C55E'],['Neutral',17,'#F59E0B'],['Negative',7,'#F47C5A']].map(([l,p,c])=>(
            <div key={l} className="d-sent-row">
              <div className="d-sent-lbl">{l}</div>
              <div className="d-sent-track"><div className="d-sent-fill" style={{width:`${p}%`,background:c}}/></div>
              <div className="d-sent-pct" style={{color:c}}>{p}%</div>
            </div>
          ))}
          <div className="d-sec-lbl">Top issues (negative reviews)</div>
          {[['Overcrowding',78,34],['Facilities',48,21],['Entrance fee',34,15]].map(([n,w,p])=>(
            <div key={n} className="d-topic-row">
              <div className="d-topic-name">{n}</div>
              <div className="d-topic-track"><div className="d-topic-fill" style={{width:`${w}%`,background:'#F5C4B3'}}/></div>
              <div className="d-topic-pct">{p}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-row3">
        <div className="dash-panel">
          <div className="dp-title">Top keywords</div>
          <div className="d-sec-lbl">Positive</div>
          <div className="d-kw-cloud" style={{marginBottom:10}}>
            {['wildlife','elephants','stunning views','peaceful','birdwatching'].map(k=>(
              <span key={k} className="d-kw pos">{k}</span>
            ))}
          </div>
          <div className="d-sec-lbl">Negative</div>
          <div className="d-kw-cloud">
            {['crowded','overpriced','no restroom','long queue'].map(k=>(
              <span key={k} className="d-kw neg">{k}</span>
            ))}
          </div>
        </div>
        <div className="dash-panel">
          <div className="dp-title">Negative alerts <span style={{background:'var(--alert-badge-bg)',color:'#F47C5A',fontSize:10,padding:'2px 7px',borderRadius:100,textTransform:'none',fontWeight:500,letterSpacing:0,marginLeft:4}}>2 new</span></div>
          {[
            {c:'#F47C5A',t:'"Too crowded, couldn\'t enjoy the wildlife at all"',s:'TripAdvisor',time:'2h ago'},
            {c:'#F47C5A',t:'"No proper restrooms near the main trail"',s:'Google',time:'5h ago'},
            {c:'#F59E0B',t:'"Fee increased but service hasn\'t improved"',s:'Booking.com',time:'Yesterday'},
          ].map((a,i)=>(
            <div key={i} className="d-alert-item">
              <div className="d-alert-dot" style={{background:a.c}}/>
              <div><div className="d-alert-txt">{a.t}</div><div className="d-alert-meta"><span className="d-plat">{a.s}</span> {a.time}</div></div>
            </div>
          ))}
        </div>
        <div className="dash-panel">
          <div className="dp-title">Recent raw reviews</div>
          {[
            {tag:'pos',label:'Positive',plat:'TripAdvisor',date:'Today',txt:'"Absolutely stunning — saw 3 elephants right by the road!"'},
            {tag:'neg',label:'Negative',plat:'Google',date:'Today',txt:'"Too many people, felt like a theme park."'},
            {tag:'pos',label:'Positive',plat:'Agoda',date:'Yesterday',txt:'"Best birdwatching spot in Thailand. Came at 6am, worth it."'},
          ].map((r,i)=>(
            <div key={i} className="d-review-item">
              <div className="d-review-top">
                <span className={`d-rtag d-rtag-${r.tag}`}>{r.label}</span>
                <span className="d-rplat">{r.plat}</span>
                <span className="d-rdate">{r.date}</span>
              </div>
              <div className="d-rtxt">{r.txt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Reviews ── */
function TabReviews({ onGoPlans }) {
  return (
    <div>
      <div style={{marginBottom:16,fontSize:13,color:'var(--text-muted)'}}>Showing 1,247 reviews · Sorted by newest</div>
      <div className="dash-panel" style={{marginBottom:12}}>
        {[
          {tag:'pos',label:'Positive',plat:'TripAdvisor',date:'Today',txt:'"Absolutely stunning place. Saw 3 elephants right by the road — absolutely magical. Will definitely come back."'},
          {tag:'neg',label:'Negative',plat:'Google',date:'Today',txt:'"Too many tourists, felt like a theme park not a national park. Weekends are a disaster. Go on weekdays only."'},
          {tag:'pos',label:'Positive',plat:'Agoda',date:'Yesterday',txt:'"Best birdwatching spot in Thailand. Arrived at 6am, totally worth the early wake-up. Over 200 species spotted."'},
          {tag:'neu',label:'Neutral', plat:'Booking.com',date:'2 days ago',txt:'"Nice park, but entrance fee has gone up significantly. Experience is still good but might not be worth it for budget travelers."'},
          {tag:'neg',label:'Negative',plat:'Google',date:'3 days ago',txt:'"Facilities are really poor. No proper restrooms near the main trail entrance."'},
        ].map((r,i)=>(
          <div key={i} className="d-review-item">
            <div className="d-review-top">
              <span className={`d-rtag d-rtag-${r.tag}`}>{r.label}</span>
              <span className="d-rplat">{r.plat}</span>
              <span className="d-rdate">{r.date}</span>
            </div>
            <div className="d-rtxt">{r.txt}</div>
          </div>
        ))}
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47C5A" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">Upgrade to Enterprise for competitor review access</div>
          <div className="upgrade-sub">See how competing destinations are reviewed compared to yours.</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>View Plans</button>
      </div>
    </div>
  );
}

/* ── Tab: Trends ── */
function TabTrends({ onGoPlans }) {
  return (
    <div className="dash-row2">
      <div className="dash-panel">
        <div className="dp-title">Monthly sentiment — 12 months</div>
        {[['Jul',62,'#F59E0B'],['Aug',58,'#F47C5A'],['Sep',65,'#F59E0B'],['Oct',70,'#22C55E'],['Nov',72,'#22C55E'],['Dec',69,'#F59E0B'],
          ['Jan',68,'#F59E0B'],['Feb',71,'#22C55E'],['Mar',65,'#F59E0B'],['Apr',73,'#22C55E'],['May',74,'#22C55E'],['Jun',76,'#22C55E']
        ].map(([m,p,c])=>(
          <div key={m} className="d-trend-row">
            <div className="d-trend-mo">{m}</div>
            <div className="d-trend-track"><div className="d-trend-fill" style={{width:`${p}%`,background:c}}/></div>
            <div className="d-trend-pct">{p}%</div>
          </div>
        ))}
      </div>
      <div className="dash-panel">
        <div className="dp-title">Top negative topics over time</div>
        <div className="d-sec-lbl" style={{marginTop:0}}>Jun (this month)</div>
        {[['Overcrowding',78,34],['Facilities',48,21]].map(([n,w,p])=>(
          <div key={n} className="d-topic-row">
            <div className="d-topic-name">{n}</div>
            <div className="d-topic-track"><div className="d-topic-fill" style={{width:`${w}%`,background:'#F5C4B3'}}/></div>
            <div className="d-topic-pct">{p}%</div>
          </div>
        ))}
        <div className="d-sec-lbl">May (last month)</div>
        {[['Overcrowding',70,31],['Entrance fee',42,18]].map(([n,w,p])=>(
          <div key={n} className="d-topic-row">
            <div className="d-topic-name">{n}</div>
            <div className="d-topic-track"><div className="d-topic-fill" style={{width:`${w}%`,background:'#F5C4B3'}}/></div>
            <div className="d-topic-pct">{p}%</div>
          </div>
        ))}
        <div className="upgrade-prompt" style={{marginTop:16}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F47C5A" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div className="upgrade-txt"><div className="upgrade-title">Competitor comparison available in Enterprise</div></div>
          <button className="upgrade-btn" onClick={onGoPlans}>Upgrade</button>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Alerts ── */
function TabAlerts() {
  return (
    <div>
      <div style={{marginBottom:14,fontSize:13,color:'var(--text-muted)'}}>2 new alerts · Last updated 2 hours ago</div>
      <div className="dash-panel">
        {[
          {c:'#F47C5A',t:'"Too crowded, couldn\'t enjoy the wildlife at all during the weekend. We came from overseas specifically for this and were very disappointed."',s:'TripAdvisor',time:'2 hours ago',isNew:true},
          {c:'#F47C5A',t:'"No proper restrooms near the main trail entrance — very disappointing for an international park."',s:'Google',time:'5 hours ago',isNew:true},
          {c:'#F59E0B',t:'"Entrance fee increased significantly but the quality of service and facilities remains the same."',s:'Booking.com',time:'Yesterday',isNew:false},
          {c:'#F59E0B',t:'"Parking is a mess on weekends. Took 45 minutes just to find a spot."',s:'Google',time:'2 days ago',isNew:false},
        ].map((a,i)=>(
          <div key={i} className="d-alert-item">
            <div className="d-alert-dot" style={{background:a.c}}/>
            <div style={{flex:1}}>
              <div className="d-alert-txt">{a.t}</div>
              <div className="d-alert-meta">
                <span className="d-plat">{a.s}</span>
                <span className="d-plat">{a.time}</span>
                {a.isNew && <span style={{color:'#F47C5A',fontSize:10}}>● New</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tab: Reports ── */
function TabReports({ onGoPlans }) {
  const FileIcon = () => <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  const DlIcon = () => <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  return (
    <div>
      <div className="dash-panel" style={{marginBottom:12}}>
        {[
          {name:'Monthly Sentiment Report — June 2024', meta:'Generated today · PDF · 4.2 MB'},
          {name:'Monthly Sentiment Report — May 2024',  meta:'Generated Jun 1 · PDF · 3.8 MB'},
          {name:'Q1 2024 Quarterly Report',             meta:'Generated Apr 1 · PDF · 9.1 MB'},
        ].map((r,i)=>(
          <div key={i} className="report-item">
            <div className="report-icon"><FileIcon /></div>
            <div><div className="report-name">{r.name}</div><div className="report-meta">{r.meta}</div></div>
            <button className="report-dl" onClick={() => alert('Downloading...')}><DlIcon /> Download</button>
          </div>
        ))}
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47C5A" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">Competitor & Regional reports available in Enterprise</div>
          <div className="upgrade-sub">Compare your performance against similar destinations in your region.</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>View Plans</button>
      </div>
    </div>
  );
}

/* ── Tab: My Places ── */
function TabPlaces({ onGoPlans }) {
  return (
    <div>
      <div className="dash-panel" style={{marginBottom:12}}>
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border-color)'}}>
          <div style={{fontSize:28}}>🌿</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:500,color:'var(--text-primary)'}}>Khao Yai National Park</div>
            <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>Nakhon Ratchasima · Verified ✓</div>
          </div>
          <div style={{fontSize:13,fontWeight:500,color:'#22C55E'}}>76%</div>
          <button className="report-dl">View Dashboard</button>
        </div>
        <div style={{padding:'16px 0',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>
          + Claim another destination (2 remaining on Professional Plan)
        </div>
      </div>
      <div className="upgrade-prompt">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F47C5A" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div className="upgrade-txt">
          <div className="upgrade-title">Professional Plan: up to 3 destinations</div>
          <div className="upgrade-sub">Upgrade to Enterprise for unlimited destinations and white-label dashboard.</div>
        </div>
        <button className="upgrade-btn" onClick={onGoPlans}>Upgrade</button>
      </div>
    </div>
  );
}

const TAB_TITLES = { overview:'Overview', reviews:'Reviews', trends:'Trends', alerts:'Alerts', reports:'Reports', places:'My Places' };

/* ─────── MAIN EXPORT ─────── */
export default function DashboardPage({ onLogout, onGoPlans }) {
  const [activeTab, setTab] = useState('overview');
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('ts-theme') === 'dark';
  });

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

  return (
    <div className="dash-page">
      <div className="dash-shell">

        {/* ── Sidebar ── */}
        <aside className="dash-aside">
          <div className="dash-aside-logo">
            <div className="dash-logo-dot">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <span className="dash-logo-name">Travel<span>Sense</span> AI</span>
          </div>

          <div className="dash-place-box">
            <div className="dash-place-name">Khao Yai National Park</div>
            <div className="dash-place-status">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Verified owner
            </div>
          </div>

          <div className="dash-section-lbl">Main</div>
          {NAV_ITEMS.map(item => (
            <div key={item.id} className={`dash-nav-item${activeTab === item.id ? ' active' : ''}`} onClick={() => switchTab(item.id)}>
              {item.icon}
              {item.label}
              {item.notif && <span className="dash-notif">{item.notif}</span>}
            </div>
          ))}

          <div className="dash-section-lbl">Business</div>
          {BIZ_ITEMS.map(item => (
            <div key={item.id} className={`dash-nav-item${activeTab === item.id ? ' active' : ''}`} onClick={() => item.id === 'places' ? switchTab('places') : null}>
              {item.icon}
              {item.label}
            </div>
          ))}

          <div className="dash-aside-footer">
            <div className="dash-user">
              <div className="dash-avatar">SP</div>
              <div>
                <div className="dash-user-name">Somchai P.</div>
                <div className="dash-user-plan">Professional Plan</div>
              </div>
            </div>
            <span className="dash-logout" onClick={onLogout}>← Back to public site</span>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="dash-main">
          <div className="dash-topbar">
            <div>
              <span className="dash-topbar-title">{TAB_TITLES[activeTab]}</span>
              <span className="dash-topbar-sub">· Khao Yai National Park</span>
            </div>
            <div className="dash-topbar-right">
              <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
              <select className="dash-period">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
              <button className="dash-export-btn" onClick={() => alert('Generating PDF report...')}>
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export PDF
              </button>
            </div>
          </div>

          <div className="dash-content">
            <div className={`dash-content-section${activeTab === 'overview'  ? ' active' : ''}`}><TabOverview  onGoPlans={onGoPlans} /></div>
            <div className={`dash-content-section${activeTab === 'reviews'   ? ' active' : ''}`}><TabReviews   onGoPlans={onGoPlans} /></div>
            <div className={`dash-content-section${activeTab === 'trends'    ? ' active' : ''}`}><TabTrends    onGoPlans={onGoPlans} /></div>
            <div className={`dash-content-section${activeTab === 'alerts'    ? ' active' : ''}`}><TabAlerts   /></div>
            <div className={`dash-content-section${activeTab === 'reports'   ? ' active' : ''}`}><TabReports   onGoPlans={onGoPlans} /></div>
            <div className={`dash-content-section${activeTab === 'places'    ? ' active' : ''}`}><TabPlaces    onGoPlans={onGoPlans} /></div>
          </div>
        </div>

      </div>
    </div>
  );
}