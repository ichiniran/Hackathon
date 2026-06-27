import { useMemo, useState } from 'react';
import { BedDouble, BusFront, CalendarDays, CarFront, Check, Clock3, ExternalLink, MapPin, Sparkles, Ticket, Utensils, Users, WalletCards, X } from 'lucide-react';
import './TravelPlannerModal.css';

const INTERESTS = [
  { id: 'nature', en: 'Nature', th: 'ธรรมชาติ' },
  { id: 'culture', en: 'Culture', th: 'วัฒนธรรม' },
  { id: 'food', en: 'Food', th: 'อาหาร' },
  { id: 'photo', en: 'Photography', th: 'ถ่ายภาพ' },
];

const BUDGET_RATES = {
  low: { transport: 500, stay: 700, food: 450, activity: 300 },
  medium: { transport: 900, stay: 1500, food: 800, activity: 700 },
  high: { transport: 1800, stay: 3200, food: 1400, activity: 1600 },
};

function todayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function localized(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang === 'th' ? 'th' : 'en'] || value?.en || '';
}

function buildTravelEssentials(place, budget, isThai) {
  const location = isThai ? place.loc_th || place.loc : place.loc;
  const placeName = isThai ? place.name_th || place.name : place.name;
  const types = place.type || [];
  const isBangkok = place.region?.includes('BKK');
  const isCoastal = types.includes('beach') || place.id === 'similan' || place.id === 'phangnga';
  const isNature = types.includes('nature');
  const rates = BUDGET_RATES[budget];
  const stayLabel = {
    low: isThai ? `ที่พักราคาประหยัดใน${location}` : `Budget stay in ${location}`,
    medium: isThai ? `โรงแรมบูทีคใกล้${placeName}` : `Boutique hotel near ${placeName}`,
    high: isThai ? `รีสอร์ทพรีเมียมใน${location}` : `Premium resort in ${location}`,
  }[budget];

  let transport;
  if (isBangkok) {
    transport = {
      title: isThai ? 'รถไฟฟ้าและแท็กซี่ท้องถิ่น' : 'Rail transit & local taxi',
      detail: isThai ? 'เหมาะสำหรับหลีกเลี่ยงการจราจรและเดินทางต่อระยะสั้น' : 'Best for avoiding traffic with a short local connection.',
    };
  } else if (isCoastal) {
    transport = {
      title: isThai ? 'รถรับส่งร่วมและเรือโดยสาร' : 'Shared transfer & passenger boat',
      detail: isThai ? 'แนะนำให้จองรอบเรือและรถรับส่งล่วงหน้า' : 'Reserve boat and transfer times before departure.',
    };
  } else if (isNature) {
    transport = {
      title: isThai ? 'รถเช่าหรือรถตู้พร้อมคนขับ' : 'Rental car or shared van',
      detail: isThai ? 'คล่องตัวกว่ารถสาธารณะสำหรับเส้นทางธรรมชาติ' : 'More practical than public transit for nature routes.',
    };
  } else {
    transport = {
      title: isThai ? 'ขนส่งสาธารณะและรถท้องถิ่น' : 'Public transit & local ride',
      detail: isThai ? 'เหมาะกับการเดินทางระยะสั้นระหว่างจุดท่องเที่ยว' : 'Suitable for short connections between attractions.',
    };
  }

  const mainActivity = localized(place.activities?.[0], isThai ? 'th' : 'en');
  return [
    {
      id: 'stay',
      icon: <BedDouble size={18} />,
      label: isThai ? 'ที่พักแนะนำ' : 'Recommended stay',
      title: stayLabel,
      detail: isThai ? 'ตัวเลือกสอดคล้องกับระดับงบและอยู่ใกล้สถานที่หลัก' : 'Matched to your budget and close to the main destination.',
      price: isThai ? `เริ่มต้น ฿${rates.stay.toLocaleString()}/คืน` : `From ฿${rates.stay.toLocaleString()}/night`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`hotels near ${place.name}`)}`,
    },
    {
      id: 'transport',
      icon: isBangkok ? <BusFront size={18} /> : <CarFront size={18} />,
      label: isThai ? 'การเดินทางแนะนำ' : 'Recommended transport',
      title: transport.title,
      detail: transport.detail,
      price: isThai ? `ประมาณ ฿${rates.transport.toLocaleString()}/คน` : `About ฿${rates.transport.toLocaleString()}/person`,
      url: place.map_url || `https://www.google.com/maps/search/${encodeURIComponent(place.name)}`,
    },
    {
      id: 'tour',
      icon: <Ticket size={18} />,
      label: isThai ? 'ทัวร์และกิจกรรม' : 'Tour & activity',
      title: mainActivity || (isThai ? `ทัวร์ชม${placeName}` : `${placeName} guided tour`),
      detail: isThai ? 'กิจกรรมเด่นที่เหมาะกับสถานที่และความสนใจของคุณ' : 'A signature experience matched to this destination.',
      price: isThai ? `เริ่มต้น ฿${rates.activity.toLocaleString()}/คน` : `From ฿${rates.activity.toLocaleString()}/person`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${place.name} tour activity`)}`,
    },
  ];
}

export default function TravelPlannerModal({ place, nearbyPlaces = [], currentLang = 'en', onClose }) {
  const isThai = currentLang === 'th';
  const [startDate, setStartDate] = useState(todayString());
  const [days, setDays] = useState(2);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState('medium');
  const [interests, setInterests] = useState(['nature']);
  const [selectedStops, setSelectedStops] = useState(() => nearbyPlaces.slice(0, 2).map(item => item.id));
  const [plan, setPlan] = useState(null);
  const [saved, setSaved] = useState(false);

  const selectedNearby = useMemo(
    () => nearbyPlaces.filter(item => selectedStops.includes(item.id)),
    [nearbyPlaces, selectedStops],
  );

  const toggleStop = (id) => {
    setSelectedStops(current => current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id]);
  };

  const toggleInterest = (id) => {
    setInterests(current => current.includes(id)
      ? (current.length > 1 ? current.filter(item => item !== id) : current)
      : [...current, id]);
  };

  const generatePlan = () => {
    const rates = BUDGET_RATES[budget];
    const rooms = Math.ceil(travelers / 2);
    const nights = Math.max(0, days - 1);
    const breakdown = {
      transport: rates.transport * travelers,
      stay: rates.stay * rooms * nights,
      food: rates.food * travelers * days,
      activity: rates.activity * travelers * days,
    };
    const estimated = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
    const slots = [
      { time: '09:00', en: 'Morning discovery', th: 'เที่ยวชมช่วงเช้า' },
      { time: '12:30', en: 'Local lunch & rest', th: 'รับประทานอาหารท้องถิ่นและพักผ่อน' },
      { time: '15:00', en: 'Afternoon highlight', th: 'เก็บไฮไลต์ช่วงบ่าย' },
    ];

    const itinerary = Array.from({ length: days }, (_, dayIndex) => {
      // Day 1 must always begin at the destination the user selected.
      // Following days can rotate through nearby recommendations.
      const destination = dayIndex === 0
        ? place
        : (selectedNearby[(dayIndex - 1) % selectedNearby.length] || place);
      const activities = destination.activities || place.activities || [];
      const highlights = destination.highlights || place.highlights || [];
      const date = new Date(`${startDate}T12:00:00`);
      date.setDate(date.getDate() + dayIndex);

      return {
        day: dayIndex + 1,
        date: date.toLocaleDateString(isThai ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short' }),
        destination,
        items: slots.map((slot, index) => ({
          ...slot,
          detail: index === 1
            ? (isThai ? `พักและลองอาหารขึ้นชื่อใน${destination.loc_th || destination.loc}` : `Rest and try local food in ${destination.loc}`)
            : localized(activities[index === 0 ? 0 : 1] || highlights[index] || slot, currentLang),
        })),
      };
    });

    setPlan({ itinerary, breakdown, estimated, essentials: buildTravelEssentials(place, budget, isThai) });
    setSaved(false);
  };

  const savePlan = () => {
    const savedPlans = JSON.parse(localStorage.getItem('travelsense-plans') || '[]');
    const entry = {
      id: `${place.id}-${Date.now()}`,
      placeId: place.id,
      placeName: place.name,
      startDate,
      days,
      travelers,
      budget,
      interests,
      selectedStops,
      itinerary: plan.itinerary,
      breakdown: plan.breakdown,
      estimated: plan.estimated,
    };
    localStorage.setItem('travelsense-plans', JSON.stringify([entry, ...savedPlans]));
    setSaved(true);
  };

  return (
    <div className="planner-overlay" onMouseDown={onClose} role="presentation">
      <section className="planner-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="planner-title">
        <header className="planner-header">
          <div className="planner-heading-icon"><Sparkles size={20} /></div>
          <div>
            <span className="planner-eyebrow">TRAVELSENSE TRIP PLANNER</span>
            <h2 id="planner-title">{isThai ? 'วางแผนทริปของคุณ' : 'Plan your perfect trip'}</h2>
            <p>{isThai ? `เริ่มต้นที่ ${place.name_th || place.name}` : `Starting with ${place.name}`}</p>
          </div>
          <button className="planner-close" onClick={onClose} aria-label={isThai ? 'ปิด' : 'Close'}><X size={20} /></button>
        </header>

        <div className="planner-body">
          <div className="planner-form">
            <div className="planner-primary-place">
              <img src={place.img} alt="" />
              <div>
                <span>{isThai ? 'สถานที่หลักของทริป' : 'PRIMARY DESTINATION'}</span>
                <strong>{isThai ? place.name_th || place.name : place.name}</strong>
                <small><MapPin size={12} /> {isThai ? place.loc_th || place.loc : place.loc}</small>
              </div>
              <span className="planner-day-one-badge">{isThai ? 'วันที่ 1' : 'DAY 1'}</span>
            </div>

            <label className="planner-field">
              <span><CalendarDays size={15} /> {isThai ? 'วันเริ่มเดินทาง' : 'Start date'}</span>
              <input type="date" min={todayString()} value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </label>

            <label className="planner-field">
              <span><Clock3 size={15} /> {isThai ? 'จำนวนวัน' : 'Trip length'}</span>
              <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
                {[1, 2, 3, 4, 5].map(value => <option key={value} value={value}>{value} {isThai ? 'วัน' : value === 1 ? 'day' : 'days'}</option>)}
              </select>
            </label>

            <label className="planner-field">
              <span><Users size={15} /> {isThai ? 'ผู้เดินทาง' : 'Travelers'}</span>
              <select value={travelers} onChange={(event) => setTravelers(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6].map(value => <option key={value} value={value}>{value} {isThai ? 'คน' : value === 1 ? 'person' : 'people'}</option>)}
              </select>
            </label>

            <div className="planner-field planner-budget-field">
              <span><WalletCards size={15} /> {isThai ? 'ระดับงบประมาณ' : 'Budget level'}</span>
              <div className="planner-segmented">
                {[
                  { id: 'low', en: 'Save', th: 'ประหยัด' },
                  { id: 'medium', en: 'Comfort', th: 'สบาย ๆ' },
                  { id: 'high', en: 'Premium', th: 'พรีเมียม' },
                ].map(item => <button key={item.id} className={budget === item.id ? 'active' : ''} onClick={() => setBudget(item.id)}>{isThai ? item.th : item.en}</button>)}
              </div>
            </div>

            <div className="planner-interests">
              <span>{isThai ? 'สไตล์ที่สนใจ' : 'Travel interests'}</span>
              <div>{INTERESTS.map(item => <button key={item.id} className={interests.includes(item.id) ? 'active' : ''} onClick={() => toggleInterest(item.id)}>{interests.includes(item.id) && <Check size={13} />}{isThai ? item.th : item.en}</button>)}</div>
            </div>

            {nearbyPlaces.length > 0 && (
              <div className="planner-recommendations">
                <div className="planner-section-heading">
                  <span><Sparkles size={14} /> {isThai ? 'สถานที่ใกล้เคียงแนะนำ' : 'Recommended nearby'}</span>
                  <small>{isThai ? 'เลือกเพื่อเพิ่มในวันที่ถัดไป' : 'Choose stops for the next days'}</small>
                </div>
                <div className="planner-recommendation-list">
                  {nearbyPlaces.map(item => {
                    const sameProvince = (item.province || item.loc) === (place.province || place.loc);
                    const selected = selectedStops.includes(item.id);
                    return (
                      <button key={item.id} className={`planner-recommendation ${selected ? 'selected' : ''}`} onClick={() => toggleStop(item.id)}>
                        <img src={item.img} alt="" />
                        <div>
                          <strong>{isThai ? item.name_th || item.name : item.name}</strong>
                          <span>{sameProvince ? (isThai ? 'จังหวัดเดียวกัน' : 'Same province') : (isThai ? 'ภูมิภาคเดียวกัน' : 'Same region')} · {item.pos}% {isThai ? 'รีวิวเชิงบวก' : 'positive'}</span>
                        </div>
                        <span className="planner-recommendation-check">{selected && <Check size={13} />}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button className="planner-generate" onClick={generatePlan}><Sparkles size={16} /> {isThai ? (plan ? 'จัดแผนใหม่' : 'สร้างแผนการเดินทาง') : (plan ? 'Regenerate itinerary' : 'Create my itinerary')}</button>
          </div>

          <div className="planner-result">
            {!plan ? (
              <div className="planner-empty">
                <div><MapPin size={25} /></div>
                <h3>{isThai ? 'แผนของคุณจะปรากฏที่นี่' : 'Your itinerary will appear here'}</h3>
                <p>{isThai ? 'เลือกรายละเอียดทริป แล้วให้เราจัดลำดับสถานที่และกิจกรรมให้เหมาะกับคุณ' : 'Choose your trip details and we will arrange destinations and activities for you.'}</p>
              </div>
            ) : (
              <div className="planner-itinerary">
                <div className="planner-result-top">
                  <div><span>{isThai ? 'แผนแนะนำ' : 'Suggested itinerary'}</span><strong>{days} {isThai ? 'วัน' : days === 1 ? 'day' : 'days'} · {travelers} {isThai ? 'คน' : travelers === 1 ? 'traveler' : 'travelers'}</strong></div>
                  <div className="planner-estimate"><span>{isThai ? 'งบประมาณรวม' : 'Estimated total'}</span><strong>฿{plan.estimated.toLocaleString()}</strong></div>
                </div>

                <div className="planner-cost-box">
                  <div className="planner-cost-heading">
                    <div><WalletCards size={16} /><span>{isThai ? 'ประมาณการค่าใช้จ่าย' : 'Cost estimate'}</span></div>
                    <small>{isThai ? 'ราคาโดยประมาณ อาจเปลี่ยนตามช่วงเวลา' : 'Indicative prices may vary by season'}</small>
                  </div>
                  <div className="planner-cost-grid">
                    {[
                      { key: 'transport', icon: <CarFront size={15} />, th: 'การเดินทาง', en: 'Transport' },
                      { key: 'stay', icon: <BedDouble size={15} />, th: 'ที่พัก', en: 'Accommodation' },
                      { key: 'food', icon: <Utensils size={15} />, th: 'อาหาร', en: 'Food' },
                      { key: 'activity', icon: <Ticket size={15} />, th: 'กิจกรรม/ค่าเข้า', en: 'Activities & tickets' },
                    ].map(item => (
                      <div className="planner-cost-item" key={item.key}>
                        <span>{item.icon} {isThai ? item.th : item.en}</span>
                        <strong>฿{plan.breakdown[item.key].toLocaleString()}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="planner-days">
                  {plan.itinerary.map(day => (
                    <article className="planner-day" key={day.day}>
                      <div className="planner-day-marker">{day.day}</div>
                      <div className="planner-day-content">
                        <div className="planner-day-title"><div><span>{isThai ? `วันที่ ${day.day}` : `Day ${day.day}`} · {day.date}</span><strong>{isThai ? day.destination.name_th || day.destination.name : day.destination.name}</strong></div><MapPin size={15} /></div>
                        {day.items.map(item => <div className="planner-stop" key={item.time}><time>{item.time}</time><div><strong>{isThai ? item.th : item.en}</strong><span>{item.detail}</span></div></div>)}
                      </div>
                    </article>
                  ))}
                </div>

                <section className="planner-essentials">
                  <div className="planner-essentials-heading">
                    <div>
                      <span>{isThai ? 'ตัวช่วยจัดทริป' : 'TRIP ESSENTIALS'}</span>
                      <h3>{isThai ? 'ที่พัก การเดินทาง และกิจกรรมแนะนำ' : 'Stay, transport and activity picks'}</h3>
                    </div>
                    <small>{isThai ? 'ข้อมูลตัวอย่าง · ราคาโดยประมาณ' : 'Sample data · estimated prices'}</small>
                  </div>
                  <div className="planner-essential-grid">
                    {plan.essentials.map(item => (
                      <article className="planner-essential-card" key={item.id}>
                        <div className={`planner-essential-icon ${item.id}`}>{item.icon}</div>
                        <span className="planner-essential-label">{item.label}</span>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                        <div className="planner-essential-footer">
                          <span>{item.price}</span>
                          <a href={item.url} target="_blank" rel="noreferrer" aria-label={`${isThai ? 'ดูตัวเลือก' : 'View options'}: ${item.title}`}>
                            {isThai ? 'ดูตัวเลือก' : 'View options'} <ExternalLink size={12} />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <button className={`planner-save ${saved ? 'saved' : ''}`} onClick={savePlan} disabled={saved}>{saved && <Check size={16} />}{saved ? (isThai ? 'บันทึกแผนแล้ว' : 'Itinerary saved') : (isThai ? 'บันทึกแผนการเดินทาง' : 'Save itinerary')}</button>
                {saved && <p className="planner-saved-note">{isThai ? 'บันทึกข้อมูลแผนไว้ในอุปกรณ์นี้เรียบร้อยแล้ว' : 'The itinerary has been saved on this device.'}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
