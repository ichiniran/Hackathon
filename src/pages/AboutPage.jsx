import { useEffect } from 'react';
import { Target, ShieldCheck, Cpu, Database, BarChart3 } from 'lucide-react';
import './AboutPage.css';

// 🟢 เพิ่มการรับ Prop "currentLang" เพื่อควบคุมการแปลภาษาในหน้านี้
export default function AboutPage({ currentLang = 'en' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page">
      {/* ── Header ── */}
      <div className="about-header">
        <h1>
          {currentLang === 'en' ? (
            <>About <span className="grad-text">TravelSense AI</span></>
          ) : (
            <>เกี่ยวกับ <span className="grad-text">TravelSense AI</span></>
          )}
        </h1>
        <p>
          {currentLang === 'en' 
            ? "An intelligent tourism analytics platform built upon natural language processing architecture and dictionary-based sentiment classifiers."
            : "แพลตฟอร์มวิเคราะห์ข้อมูลการท่องเที่ยวอัจฉริยะ พัฒนาขึ้นบนโครงสร้างการประมวลผลภาษาธรรมชาติ (NLP) และระบบจำแนกความรู้สึกตามคลังคำศัพท์พจนานุกรม"}
        </p>
      </div>

      {/* ── Mission & Vision ── */}
      <div className="about-mission-grid">
        <div className="mission-card">
          <div style={{ color: '#f67c7c', marginBottom: 12 }}><Target size={28} /></div>
          <h3>{currentLang === 'en' ? "Our Purpose" : "วัตถุประสงค์ของเรา"}</h3>
          <p>
            {currentLang === 'en' 
              ? "We aim to solve the phenomenon of information overload in modern smart tourism. By processing thousands of public online reviews systematically, we eliminate the need for manual, time-consuming reading, transforming chaotic text into immediate clear direction."
              : "เรามุ่งมั่นที่จะแก้ไขปัญหาภาวะข้อมูลท่วมท้น (Information Overload) ในยุคการท่องเที่ยวอัจฉริยะ ด้วยการประมวลผลรีวิวออนไลน์สาธารณะหลายพันรายการอย่างเป็นระบบ ช่วยลดระยะเวลาที่ต้องเสียไปกับการอ่านข้อมูลด้วยตนเอง และเปลี่ยนข้อความที่กระจัดกระจายให้กลายเป็นแนวทางที่ชัดเจนและนำไปใช้ได้ทันที"}
          </p>
        </div>
        <div className="mission-card">
          <div style={{ color: '#f67c7c', marginBottom: 12 }}><ShieldCheck size={28} /></div>
          <h3>{currentLang === 'en' ? "Academic Integrity" : "ความถูกต้องแม่นยำทางวิชาการ"}</h3>
          <p>
            {currentLang === 'en' 
              ? "Every statistic displayed across our dashboards is supported by rigorous computational linguistics research. We actively bridge academic findings regarding text similarity weights into sleek, real-world solutions for everyday travelers and business operators."
              : "ทุกสถิติที่แสดงบนแดชบอร์ดของเราได้รับการสนับสนุนโดยงานวิจัยด้านภาษาศาสตร์คอมพิวเตอร์ที่เข้มงวด เราตั้งใจเชื่อมโยงผลลัพธ์ทางวิชาการเกี่ยวกับค่าน้ำหนักความคล้ายคลึงของข้อความ (Text Similarity Weights) มาพัฒนาเป็นโซลูชันที่ทันสมัยและใช้งานได้จริงสำหรับนักท่องเที่ยวและผู้ประกอบการธุรกิจ"}
          </p>
        </div>
      </div>

      {/* ── Research Stats Strip ── */}
      <div className="about-stats-strip">
        <div className="about-stat-box">
          <h2>12,035</h2>
          <p>{currentLang === 'en' ? "Foreign Profiles Tested" : "โปรไฟล์ต่างชาติที่ใช้ทดสอบ"}</p>
        </div>
        <div className="about-stat-box">
          <h2>76%</h2>
          <p>{currentLang === 'en' ? "VADER Logic Accuracy" : "ความแม่นยำของตรรกะ VADER"}</p>
        </div>
        <div className="about-stat-box">
          <h2>4ด้าน</h2>
          <p>{currentLang === 'en' ? "Tourism Core Frameworks" : "กรอบแนวคิดหลักด้านการท่องเที่ยว"}</p>
        </div>
      </div>

      {/* ── Core Technology ── */}
      <div className="tech-section">
        <div className="tech-title">
          {currentLang === 'en' ? "Scientific Pipeline" : "กระบวนการประมวลผลทางวิทยาศาสตร์"}
        </div>
        <div className="tech-grid">
          <div className="tech-item">
            <div style={{ color: '#f67c7c', marginBottom: 8 }}><Database size={20} /></div>
            <h4>
              {currentLang === 'en' ? "1. Text Cleansing" : "1. การทำความสะอาดข้อความ"}
            </h4>
            <p>
              {currentLang === 'en'
                ? "Data profiles undergo meticulous preprocessing including symbol scrubbing, stopword omission, and standard lemmatization tracks."
                : "โปรไฟล์ข้อมูลจะผ่านขั้นตอนการเตรียมข้อมูลอย่างละเอียด ทั้งการลบสัญลักษณ์ส่วนเกิน การตัดคำหยุดที่ไม่มีผลต่อความหมาย (Stopwords) และการแปลงคำให้อยู่ในรูปรากศัพท์ฐาน (Lemmatization)"}
            </p>
          </div>
          <div className="tech-item">
            <div style={{ color: '#f67c7c', marginBottom: 8 }}><Cpu size={20} /></div>
            <h4>
              {currentLang === 'en' ? "2. Lexicon Classification" : "2. การจำแนกประเภทด้วยคลังคำศัพท์"}
            </h4>
            <p>
              {currentLang === 'en'
                ? "Evaluating raw phrases through compound valence score systems to reliably flag positive clusters, neutral contexts, and intense negative biases."
                : "ประเมินกลุ่มประโยคดิบผ่านระบบคำนวณคะแนนค่าน้ำหนักความรู้สึก (Compound Valence Score) เพื่อคัดกรองกลุ่มข้อความแง่บวก บริบททั่วไป และแนวโน้มแง่ลบได้อย่างแม่นยำ"}
            </p>
          </div>
          <div className="tech-item">
            <div style={{ color: '#f67c7c', marginBottom: 8 }}><BarChart3 size={20} /></div>
            <h4>
              {currentLang === 'en' ? "3. Vector Similarity" : "3. ความคล้ายคลึงเชิงเวกเตอร์"}
            </h4>
            <p>
              {currentLang === 'en'
                ? "Using high-dimensional TF-IDF multiplication coupled with Cosine Similarity equations to isolate and map key terms right into thematic modules."
                : "ใช้การคำนวณสัดส่วนความถี่คำแบบหลายมิติ (TF-IDF) ควบคู่กับสมการความคล้ายคลึงเชิงคอสแมน (Cosine Similarity) เพื่อแยกและจัดกลุ่มคำสำคัญเข้าสู่หมวดหมู่การวิจัยโดยตรง"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}