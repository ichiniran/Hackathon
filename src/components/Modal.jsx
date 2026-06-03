import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ onClose, onLogin, currentLang, mode = 'register' }) {
  // 👈 ซิงค์ค่าเริ่มต้นให้เปลี่ยนไปตามโหมดที่ App.js สั่งเปิด (Login หรือ Register)
  const [activeMode, setActiveMode] = useState(mode); 
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', bizName: '', bizType: '', location: '', website: '',
    verifyMethod: '', docFile: null,
  });

  // คอยอัปเดตโหมดภายในกรณีที่ผู้ใช้เปิดป๊อปอัปค้างไว้แล้วกดสลับจากภายนอก
  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  const bizTypes = currentLang === 'en'
    ? ['Hotel / Resort', 'Restaurant / Café', 'National Park / Attraction', 'Tour Operator', 'OTA / Travel Agency', 'Other']
    : ['โรงแรม / รีสอร์ท', 'ร้านอาหาร / คาเฟ่', 'อุทยาน / สถานที่ท่องเที่ยว', 'บริษัทนำเที่ยว', 'OTA / ตัวแทนท่องเที่ยว', 'อื่นๆ'];

  const verifyMethods = currentLang === 'en'
    ? [
        { id: 'google', label: 'Google Business Profile', desc: 'Verify via Google Maps listing ownership' },
        { id: 'doc',    label: 'Business License / Registration',  desc: 'Upload a government-issued document' },
        { id: 'email',  label: 'Official Domain Email',  desc: 'Send from your business domain (e.g. manager@hotel.com)' },
      ]
    : [
        { id: 'google', label: 'Google Business Profile', desc: 'ยืนยันผ่านสิทธิ์เจ้าของหน้า Google Maps' },
        { id: 'doc',    label: 'ใบอนุญาตประกอบการ / จดทะเบียนธุรกิจ', desc: 'อัปโหลดเอกสารราชการที่ออกโดยหน่วยงานที่รับรอง' },
        { id: 'email',  label: 'อีเมลโดเมนองค์กรอย่างเป็นทางการ', desc: 'ส่งจากอีเมลโดเมนธุรกิจของคุณ เช่น manager@hotel.com' },
      ];

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const step1Valid = form.name && form.email && form.bizName && form.bizType && form.location;
  const step2Valid = form.verifyMethod && (form.verifyMethod !== 'doc' || form.docFile);

  function handleSubmit() {
    setStep(3);
    onLogin?.();
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: activeMode === 'login' ? 400 : 480, maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}><X size={14} /></button>

        {activeMode === 'login' ? (
          /* ── โหมดเข้าสู่ระบบ (แบบใหม่) ── */
          <div style={{ padding: '10px 0' }}>
            <div className="modal-title">{currentLang === 'en' ? 'Sign In' : 'เข้าสู่ระบบ'}</div>
            <p className="modal-sub" style={{ marginBottom: 20 }}>
              {currentLang === 'en' ? 'Welcome back! Enter your details.' : 'ยินดีต้อนรับกลับมา! กรุณากรอกข้อมูลของคุณ'}
            </p>
            
            <label className="modal-label">{currentLang === 'en' ? 'Business Email' : 'อีเมลธุรกิจ'}</label>
            <input className="modal-input" type="email" placeholder="manager@example.com" />
            
            <label className="modal-label">{currentLang === 'en' ? 'Password' : 'รหัสผ่าน'}</label>
            <input className="modal-input" type="password" placeholder="••••••••" />
            
            <button className="modal-submit" onClick={onLogin}>
              {currentLang === 'en' ? 'Sign In →' : 'เข้าสู่ระบบ →'}
            </button>
            
            <p className="modal-note" style={{ cursor: 'pointer', marginTop: 18, color: '#FE907F', fontWeight: 500, textAlign: 'center' }} onClick={() => setActiveMode('register')}>
              {currentLang === 'en' ? "Don't have an account? Register" : "ยังไม่มีบัญชี? สมัครบัญชีสำหรับธุรกิจ"}
            </p>
          </div>
        ) : (
          /* ── โหมดสมัครสมาชิก (แบบเดิม) ── */
          <>
            {step < 3 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', fontSize: 12, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step >= s ? '#FE907F' : '#f0f0f0', color: step >= s ? '#fff' : '#999', flexShrink: 0,
                    }}>{s}</div>
                    <span style={{ fontSize: 12, color: step === s ? '#111' : '#999', fontWeight: step === s ? 600 : 400 }}>
                      {s === 1 ? (currentLang === 'en' ? 'Business Info' : 'ข้อมูลธุรกิจ') : (currentLang === 'en' ? 'Verify Ownership' : 'ยืนยันความเป็นเจ้าของ')}
                    </span>
                    {s < 2 && <div style={{ width: 28, height: 1, background: '#e0e0e0' }} />}
                  </div>
                ))}
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="modal-title">{currentLang === 'en' ? 'Create Your Business Account' : 'สร้างบัญชีธุรกิจของคุณ'}</div>
                <p className="modal-sub" style={{ marginBottom: 16 }}>{currentLang === 'en' ? 'Tell us about your business.' : 'บอกเราเกี่ยวกับธุรกิจของคุณ'}</p>
                
                <label className="modal-label">{currentLang === 'en' ? 'Your Full Name *' : 'ชื่อ-นามสกุล *'}</label>
                <input className="modal-input" placeholder={currentLang === 'en' ? 'Jane Smith' : 'สมชาย รักดี'} value={form.name} onChange={e => set('name', e.target.value)} />
                
                <label className="modal-label">{currentLang === 'en' ? 'Business Email *' : 'อีเมลธุรกิจ *'}</label>
                <input className="modal-input" type="email" placeholder="manager@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                
                <label className="modal-label">{currentLang === 'en' ? 'Business / Place Name *' : 'ชื่อธุรกิจ / สถานที่ *'}</label>
                <input className="modal-input" placeholder={currentLang === 'en' ? 'Khao Yai National Park' : 'อุทยานแห่งชาติเขาใหญ่'} value={form.bizName} onChange={e => set('bizName', e.target.value)} />
                
                <label className="modal-label">{currentLang === 'en' ? 'Business Type *' : 'ประเภทธุรกิจ *'}</label>
                <select className="modal-input" value={form.bizType} onChange={e => set('bizType', e.target.value)} style={{ cursor: 'pointer' }}>
                  <option value="">{currentLang === 'en' ? '— Select type —' : '— เลือกประเภท —'}</option>
                  {bizTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                
                <label className="modal-label">{currentLang === 'en' ? 'Location / Province *' : 'ที่ตั้ง / จังหวัด *'}</label>
                <input className="modal-input" placeholder={currentLang === 'en' ? 'Nakhon Ratchasima, Thailand' : 'นครราชสีมา, ประเทศไทย'} value={form.location} onChange={e => set('location', e.target.value)} />
                
                <label className="modal-label">{currentLang === 'en' ? 'Website (optional)' : 'เว็บไซต์ (ถ้ามี)'}</label>
                <input className="modal-input" placeholder="https://..." value={form.website} onChange={e => set('website', e.target.value)} />
                
                <button className="modal-submit" disabled={!step1Valid} style={{ opacity: step1Valid ? 1 : 0.45, cursor: step1Valid ? 'pointer' : 'not-allowed' }} onClick={() => step1Valid && setStep(2)}>
                  {currentLang === 'en' ? 'Next: Verify Ownership →' : 'ถัดไป: ยืนยันความเป็นเจ้าของ →'}
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div className="modal-title">{currentLang === 'en' ? 'Verify Business Ownership' : 'ยืนยันความเป็นเจ้าของธุรกิจ'}</div>
                <p className="modal-sub" style={{ marginBottom: 16 }}>{currentLang === 'en' ? 'We verify every account.' : 'เราตรวจสอบทุกบัญชีเพื่อความปลอดภัย'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                  {verifyMethods.map(m => (
                    <label key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', border: `1.5px solid ${form.verifyMethod === m.id ? '#FE907F' : '#e8e8e8'}`, borderRadius: 10, cursor: 'pointer', background: form.verifyMethod === m.id ? '#fff5f3' : '#fafafa', transition: 'all 0.15s' }}>
                      <input type="radio" name="verify" value={m.id} checked={form.verifyMethod === m.id} onChange={() => set('verifyMethod', m.id)} style={{ marginTop: 3, accentColor: '#FE907F', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{m.label}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {form.verifyMethod === 'doc' && (
                  <div style={{ marginBottom: 16 }}>
                    <label className="modal-label">{currentLang === 'en' ? 'Upload Document *' : 'อัปโหลดเอกสาร *'}</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1.5px dashed #ccc', borderRadius: 8, cursor: 'pointer', background: '#fafafa', fontSize: 13, color: '#666' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FE907F" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      {form.docFile ? form.docFile.name : (currentLang === 'en' ? 'Click to upload PDF, JPG, PNG (max 10MB)' : 'คลิกเพื่ออัปโหลด PDF, JPG, PNG (ไม่เกิน 10MB)')}
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => set('docFile', e.target.files[0])} />
                    </label>
                  </div>
                )}

                {form.verifyMethod === 'google' && (
                  <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#0369a1' }}>
                    {currentLang === 'en' ? "💡 We'll send a code to your Google Business Profile." : "💡 เราจะส่งรหัสยืนยันไปยัง Google Business Profile ของคุณ"}
                  </div>
                )}

                {form.verifyMethod === 'email' && (
                  <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#0369a1' }}>
                    {currentLang === 'en' ? `💡 Send email to verify@travelsense.ai with subject "Verify: ${form.bizName || 'Your Business'}"` : `💡 ส่งอีเมลมาที่ verify@travelsense.ai หัวข้อ "Verify: ${form.bizName || 'ชื่อธุรกิจ'}"`}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ flex: '0 0 auto', padding: '11px 18px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', color: '#555', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                    ← {currentLang === 'en' ? 'Back' : 'ย้อนกลับ'}
                  </button>
                  <button className="modal-submit" style={{ flex: 1, opacity: step2Valid ? 1 : 0.45, cursor: step2Valid ? 'pointer' : 'not-allowed' }} disabled={!step2Valid} onClick={() => step2Valid && handleSubmit()}>
                    {currentLang === 'en' ? 'Submit Application →' : 'ส่งคำขอสมัคร →'}
                  </button>
                </div>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
                <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>📬</div>
                <div className="modal-title">{currentLang === 'en' ? 'Application Submitted!' : 'ส่งคำขอสมัครสำเร็จแล้ว!'}</div>
                <p className="modal-sub" style={{ marginBottom: 10 }}>
                  {currentLang === 'en' ? (
                    <>We've received your application for <strong>{form.bizName}</strong>.<br />Review takes <strong>1–2 business days</strong>.</>
                  ) : (
                    <>เราได้รับคำขอสมัครสำหรับ <strong>{form.bizName}</strong> เรียบร้อยแล้ว<br />ระบบจะตรวจสอบภายใน <strong>1–2 วันทำการ</strong></>
                  )}
                </p>
                <button className="modal-submit" onClick={onClose}>{currentLang === 'en' ? 'Got it, thanks!' : 'รับทราบ ขอบคุณ!'}</button>
              </div>
            )}

            {step < 3 && (
              <p className="modal-note" style={{ marginTop: 12 }}>
                {currentLang === 'en' ? 'No credit card required · Cancel anytime' : 'ไม่ต้องใช้บัตรเครดิต · ยกเลิกได้ตลอดเวลา'}
              </p>
            )}
            
            <p className="modal-note" style={{ cursor: 'pointer', marginTop: 15, color: '#555', fontWeight: 500, textAlign: 'center' }} onClick={() => setActiveMode('login')}>
              {currentLang === 'en' ? "Already have a business account? Sign In" : "มีบัญชีธุรกิจอยู่แล้ว? เข้าสู่ระบบที่นี่"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}