export const PLACES_DATA = [
  {
    id: 'phangnga',
    name: 'Phang Nga Bay',
    name_th: 'อ่าวพังงา',
    nameEn: 'Phang Nga Bay',
    loc: 'Phang Nga',
    loc_th: 'พังงา',
    province: 'Phang Nga',
    province_th: 'พังงา',
    region: ['south'],
    type: ['nature'],
    pos: 91, neu: 7, neg: 2,
    reviews: 876,
    emoji: '🌊',
    img: 'https://www.khaosok.com/wp-content/uploads/2023/11/Phang-Nga-Bay-e1700882609161-845x684.jpeg',
    kws: [
      { w: 'stunning limestone cliffs', w_th: 'หน้าผาหินปูนที่สวยงามตระการตา', s: 'pos' },
      { w: 'breathtaking scenery', w_th: 'ทัศนียภาพอันน่าทึ่ง', s: 'pos' },
      { w: 'smooth boat access', w_th: 'การเดินทางด้วยเรือที่สะดวกสบาย', s: 'pos' },
      { w: 'crowded boat pier', w_th: 'ท่าเรือมีความแออัด', s: 'neg' },
      { w: 'standard admission fee', w_th: 'ค่าธรรมเนียมการเข้าชมระดับมาตรฐาน', s: 'neu' },
      { w: 'overpriced local food', w_th: 'อาหารท้องถิ่นราคาแพงเกินไป', s: 'neg' },
      { w: 'fantastic kayaking', w_th: 'กิจกรรมพายเรือคายัคที่ยอดเยี่ยม', s: 'pos' },
      { w: 'rushed island tour', w_th: 'ทัวร์เที่ยวเกาะที่เร่งรีบเกินไป', s: 'neg' }
    ],
    ai: 'The highest sentiment score in the database. Sentiment analysis confirms visitors overwhelmingly love the pristine sea and limestone cliffs. However, text mining flags isolated complaints regarding overpriced private boat tours and waiting times at the pier.',
    ai_th: 'ได้รับคะแนนความรู้สึกสูงที่สุดในฐานข้อมูล ผลวิเคราะห์ยืนยันว่านักท่องเที่ยวชื่นชอบน้ำทะเลที่ใสสะอาดและหน้าผาหินปูนอย่างท่วมท้น อย่างไรก็ตาม ระบบตรวจพบข้อร้องเรียนประปรายเกี่ยวกับทัวร์เรือส่วนตัวราคาแพงและการรอคิวที่ยาวนานบริเวณท่าเรือ',
  },
  {
    id: 'doiinthanon',
    name: 'Doi Inthanon',
    name_th: 'ดอยอินทนนท์',
    nameEn: 'Doi Inthanon',
    loc: 'Chiang Mai',
    loc_th: 'เชียงใหม่',
    province: 'Chiang Mai',
    province_th: 'เชียงใหม่',
    region: ['north'],
    type: ['nature'],
    pos: 88, neu: 9, neg: 3,
    reviews: 934,
    emoji: '🏔',
    img: 'https://www.easydaythailand.com/wp-content/uploads/2018/07/Doi-Inthanon-.jpg',
    kws: [
      { w: 'beautiful misty sunrise', w_th: 'ทัศนียภาพพระอาทิตย์ขึ้นท่ามกลางทะเลหมอก', s: 'pos' },
      { w: 'ordinary landmark sign', w_th: 'ป้ายจุดเช็คอินบนยอดเขาค่อนข้างธรรมดา', s: 'neu' },
      { w: 'scenic paved road', w_th: 'เส้นทางถนนลาดยางวิวสวยงาม', s: 'pos' },
      { w: 'exhausting long drive', w_th: 'ระยะเวลาการขับรถที่ยาวนานและเหน็ดเหนื่อย', s: 'neg' },
      { w: 'clean visitor facilities', w_th: 'สิ่งอำนวยความสะดวกสำหรับนักท่องเที่ยวสะอาดดี', s: 'pos' },
      { w: 'limited restaurant choices', w_th: 'ตัวเลือกของร้านอาหารมีจำกัด', s: 'neg' },
      { w: 'amazing nature trekking', w_th: 'เส้นทางเดินศึกษาธรรมชาติที่ยอดเยี่ยม', s: 'pos' },
      { w: 'slippery hiking paths', w_th: 'ทางเดินเท้ามีความลื่น', s: 'neg' }
    ],
    ai: 'Highly positive sentiment driven by the refreshing cool weather and misty mountain views. The text summarizer shows that the main negative points are concentrated on the exhausting long drive and steep, slippery walking steps for older visitors.',
    ai_th: 'กระแสความรู้สึกเป็นไปในเชิงบวกอย่างมากจากสภาพอากาศที่เย็นสบายและทิวทัศน์ทะเลหมอกบนภูเขา ผลสรุปข้อความชี้ว่าประเด็นเชิงลบหลักอยู่ที่ระยะเวลาการขับรถที่ยาวนานจนเหนื่อยล้า และขั้นบันไดเดินเท้าที่ชันและลื่นสำหรับนักท่องเที่ยวผู้สูงอายุ',
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya Historical Park',
    name_th: 'อุทยานประวัติศาสตร์พระนครศรีอยุธยา',
    nameEn: 'Ayutthaya',
    loc: 'Ayutthaya',
    loc_th: 'พระนครศรีอยุธยา',
    province: 'Ayutthaya',
    province_th: 'พระนครศรีอยุธยา',
    region: ['central'],
    type: ['culture'],
    pos: 88, neu: 9, neg: 3,
    reviews: 2156,
    emoji: '🏛',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4qCr4VRlDlQ5q_mAU1s0AeYyeMRishCzmA&s',
    kws: [
      { w: 'magnificent ancient temples', w_th: 'โบราณสถานและวัดเก่าแก่ที่งดงามวิจิตร', s: 'pos' },
      { w: 'extremely hot weather', w_th: 'สภาพอากาศร้อนจัด', s: 'neg' },
      { w: 'easy train access', w_th: 'การเดินทางด้วยรถไฟสะดวกสบาย', s: 'pos' },
      { w: 'aggressive tuktuk scams', w_th: 'การตื๊อโก่งราคาจากรถตุ๊กตุ๊กในพื้นที่', s: 'neg' },
      { w: 'typical information boards', w_th: 'ป้ายข้อมูลประวัติศาสตร์รูปแบบทั่วไป', s: 'neu' },
      { w: 'lacks shaded rest areas', w_th: 'ขาดแคลนพื้นที่นั่งพักใต้ร่มเงา', s: 'neg' },
      { w: 'enjoyable bicycle riding', w_th: 'การปั่นจักรยานท่องเที่ยวที่เพลิดเพลิน', s: 'pos' },
      { w: 'congested walking routes', s: 'neg', w_th: 'เส้นทางเดินเท้ามีความหนาแน่นบางช่วง' }
    ],
    ai: 'A prominent UNESCO site praised for its magnificent ancient temples. Our NLP pipeline notes a clear pattern where tourists strongly complain about the extremely hot afternoon weather and aggressive local transport providers, making morning tours highly recommended.',
    ai_th: 'แหล่งมรดกโลกของยูเนสโกที่ได้รับคำชื่นชมอย่างมากในเรื่องความงามของวัดโบราณ ระบบ NLP ตรวจพบพฤติกรรมข้อมูลว่านักท่องเที่ยวไม่พึงพอใจกับสภาพอากาศที่ร้อนจัดในช่วงบ่ายและการโก่งราคาของยานพาหนะท้องถิ่น จึงแนะนำให้เลือกท่องเที่ยวช่วงเช้าเป็นหลัก',
  },
  {
    id: 'grandpalace',
    name: 'Wat Phra Kaew',
    name_th: 'วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)',
    nameEn: 'Wat Phra Kaew',
    loc: 'Bangkok',
    loc_th: 'กรุงเทพฯ',
    province: 'Bangkok',
    province_th: 'กรุงเทพฯ',
    region: ['BKK'],
    type: ['culture'],
    pos: 82, neu: 12, neg: 6,
    reviews: 3812,
    emoji: '🛕',
    img: 'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/62/2024/08/29074619/Wat-Phra-Kaew.jpg',
    kws: [
      { w: 'magnificent architecture', w_th: 'สถาปัตยกรรมที่งดงามวิจิตรบรรจง', s: 'pos' },
      { w: 'overwhelming crowds', w_th: 'ฝูงชนหนาแน่นและแออัดมากเกินไป', s: 'neg' },
      { w: 'central city location', w_th: 'ทำเลที่ตั้งใจกลางเมืองเดินทางสะดวก', s: 'pos' },
      { w: 'chaotic traffic outside', w_th: 'การจราจรด้านนอกรอบพื้นที่วุ่นวาย', s: 'neg' },
      { w: 'standard ticket counter', w_th: 'เคาน์เตอร์จำหน่ายตั๋วระดับทั่วไป', s: 'neu' },
      { w: 'strict dress code', w_th: 'กฎระเบียบการแต่งกายที่เข้มงวด', s: 'neg' },
      { w: 'deeply cultural experience', w_th: 'ประสบการณ์ทางวัฒนธรรมที่ลึกซึ้ง', s: 'pos' },
      { w: 'tiring walking loops', w_th: 'เส้นทางการเดินชมระยะไกลทำให้เหนื่อยล้า', s: 'neg' }
    ],
    ai: 'Boasts high volume and positive scores for architectural beauty. However, semantic analysis reveals significant friction regarding the strict dress code enforcement and overwhelming tourist crowds inside the main chapel.',
    ai_th: 'โดดเด่นด้วยปริมาณรีวิวและคะแนนเชิงบวกในแง่ความงามทางสถาบันกรรม อย่างไรก็ตาม การวิเคราะห์บริบทพบจุดติดขัดสำคัญเกี่ยวกับการบังคับใช้กฎระเบียบเครื่องแต่งกายที่เข้มงวดเกินไป และความแออัดของกลุ่มทัวร์ภายในพระอุโบสถหลัก',
  },
  {
    id: 'khaoyai',
    name: 'Khao Yai National Park',
    name_th: 'อุทยานแห่งชาติเขาใหญ่',
    nameEn: 'Khao Yai National Park',
    loc: 'Nakhon Ratchasima',
    loc_th: 'นครราชสีมา',
    province: 'Nakhon Ratchasima',
    province_th: 'นครราชสีма',
    region: ['central'],
    type: ['nature'],
    pos: 76, neu: 14, neg: 10,
    reviews: 12035,
    emoji: '🌿',
    img: 'https://www.pelago.com/img/products/TH-Thailand/khao-yai-national-park-tour/0713-1603_khao-yai-national-park-tour-thailand-pelago-xlarge.jpg',
    kws: [
      { w: 'rich biodiversity', w_th: 'ความหลากหลายทางชีวภาพที่อุดมสมบูรณ์', s: 'pos' },
      { w: 'stunning waterfall', w_th: 'น้ำตกที่สวยงามตระการตา', s: 'pos' },
      { w: 'dual pricing system', w_th: 'ระบบการเก็บราคาค่าเข้าชมสองมาตรฐาน', s: 'neg' },
      { w: 'inconvenient public transport', w_th: 'ระบบขนส่งสาธารณะภายในไม่สะดวก', s: 'neg' },
      { w: 'basic visitor amenities', w_th: 'สิ่งอำนวยความสะดวกขั้นพื้นฐานทั่วไป', s: 'neu' },
      { w: 'language barrier staff', w_th: 'กำแพงภาษาในการสื่อสารของเจ้าหน้าที่', s: 'neg' },
      { w: 'wonderful bird watching', w_th: 'กิจกรรมส่องนกที่ยอดเยี่ยม', s: 'pos' },
      { w: 'disorganized campsite', w_th: 'พื้นที่กางเต็นท์ขาดความเป็นระเบียบ', s: 'neg' }
    ],
    ai: 'Analyzed using VADER with 76% accuracy. Foreign tourists highly praise its natural beauty, waterfalls, and rich biodiversity. However, systematic text analysis reveals significant negative sentiments regarding the dual pricing system (400 THB entry fee for foreigners) and lack of public transportation inside the park.',
    ai_th: 'วิเคราะห์ผ่านโมเดล VADER ด้วยความแม่นยำ 76% นักท่องเที่ยวต่างชาติชื่นชมความงามทางธรรมชาติ น้ำตก และความหลากหลายทางชีวภาพอย่างมาก ทว่าการวิเคราะห์ข้อความชี้ให้เห็นอารมณ์เชิงลบเด่นชัดเรื่องการเก็บค่าเข้าสองมาตรฐาน (ชาวต่างชาติ 400 บาท) และการไม่มีรถสาธารณะบริการภายในอุทยาน',
  },
  {
    id: 'samui',
    name: 'Koh Samui',
    name_th: 'เกาะสมุย',
    nameEn: 'Koh Samui',
    loc: 'Surat Thani',
    loc_th: 'สุราษฎร์ธานี',
    province: 'Surat Thani',
    province_th: 'สุราษฎร์ธานี',
    region: ['south'],
    type: ['beach'],
    pos: 74, neu: 16, neg: 10,
    reviews: 1893,
    emoji: '🏖',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
    kws: [
      { w: 'gorgeous white beach', w_th: 'ชายหาดทรายขาวที่สวยงามระยิบระยับ', s: 'pos' },
      { w: 'polluted beach areas', w_th: 'พบคราบขยะมลพิษบนชายหาดบางส่วน', s: 'neg' },
      { w: 'ordinary ferry schedule', w_th: 'ตารางการเดินเรือข้ามฟากระดับปกติ', s: 'neu' },
      { w: 'highly expensive taxis', w_th: 'รถแท็กซี่ท้องถิ่นราคาแพงมาก', s: 'neg' },
      { w: 'luxurious resort amenities', w_th: 'สิ่งอำนวยความสะดวกในรีสอร์ทหรูหรา', s: 'pos' },
      { w: 'overpriced food options', w_th: 'ราคาอาหารตามแหล่งท่องเที่ยวแพงเกินไป', s: 'neg' },
      { w: 'exciting water sports', w_th: 'กิจกรรมกีฬาทางน้ำที่ตื่นเต้นเร้าใจ', s: 'pos' },
      { w: 'noisy beach parties', w_th: 'งานปาร์ตี้ริมหาดส่งเสียงดังรบกวน', s: 'neg' }
    ],
    ai: 'While famous for its gorgeous beaches and luxurious resorts, text sentiment is visibly dragged down by the island transportation issue. Taxis are heavily criticized as highly expensive and unmetered by international standards.',
    ai_th: 'แม้จะมีชื่อเสียงเรื่องชายหาดที่สวยงามและรีสอร์ทที่หรูหรา แต่อารมณ์ความรู้สึกกลับถูกฉุดลงอย่างเห็นได้ชัดจากปัญหาระบบขนส่งบนเกาะ โดยแท็กซี่ในพื้นที่ถูกวิพากษ์วิจารณ์อย่างหนักว่าราคาแพงเกินไปและไม่มีการเปิดมิเตอร์ตามมาตรฐานสากล',
  },
  {
    id: 'phuket',
    name: 'Patong Beach',
    name_th: 'หาดป่าตอง',
    nameEn: 'Patong Beach',
    loc: 'Phuket',
    loc_th: 'ภูเก็ต',
    province: 'Phuket',
    province_th: 'ภูเก็ต',
    region: ['south'],
    type: ['beach'],
    pos: 64, neu: 18, neg: 18,
    reviews: 2341,
    emoji: '🌴',
    img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80',
    kws: [
      { w: 'lively beach activities', w_th: 'กิจกรรมริมชายหาดที่คึกคักมีชีวิตชีวา', s: 'pos' },
      { w: 'stressful tourist traps', w_th: 'กับดักนัดท่องเที่ยวที่ทำให้อึดอัด', s: 'neg' },
      { w: 'standard airport bus', w_th: 'รถบัสรับส่งสนามบินระดับมาตรฐานทั่วไป', s: 'neu' },
      { w: 'dangerous tuktuk drivers', w_th: 'คนขับรถตุ๊กตุ๊กขับขี่อันตราย', s: 'neg' },
      { w: 'abundant hotel choices', w_th: 'มีตัวเลือกโรงแรมที่พักจำนวนมาก', s: 'pos' },
      { w: 'overpriced beach chairs', w_th: 'ค่าเช่าเตียงผ้าใบชายหาดราคาแพงเกินไป', s: 'neg' },
      { w: 'vibrant nightlife experience', w_th: 'ประสบการณ์แสงสียามค่ำคืนที่คึกคัก', s: 'pos' },
      { w: 'aggressive street vendors', w_th: 'คนขายของริมทางเดินตื๊อลูกค้าเกินไป', s: 'neg' }
    ],
    ai: 'Opinions are strongly polarized. The lexicon analyzer detects highly positive scores for its vibrant nightlife and party atmosphere, which directly conflicts with severe negative feedback labeling the area as a stressful tourist trap with overpriced services.',
    ai_th: 'ความคิดเห็นแตกออกเป็นสองขั้วอย่างชัดเจน เครื่องมือวิเคราะห์พบการชื่นชมในแง่บวกสูงมากต่อแสงสียามค่ำคืนและบรรยากาศปาร์ตี้ ซึ่งขัดแย้งโดยตรงกับข้อเสนอแนะเชิงลบที่รุนแรงซึ่งมองว่าพื้นที่นี้เป็นกับดักนักท่องเที่ยวที่ตึงเครียดและมีบริการที่ราคาแพงเกินจริง',
  },
  {
    id: 'chiangrai',
    name: 'White Temple',
    name_th: 'วัดร่องขุ่น (White Temple)',
    nameEn: 'White Temple',
    loc: 'Chiang Rai',
    loc_th: 'เชียงราย',
    province: 'Chiang Rai',
    province_th: 'เชียงราย',
    region: ['north'],
    type: ['culture', 'nature'],
    pos: 89, neu: 8, neg: 3,
    reviews: 1102,
    emoji: '⛩',
    img: 'https://nomadicated.com/wp-content/uploads/2023/02/White-Temple-Chiang-Rai-7.jpg',
    kws: [
      { w: 'stunning unique architecture', w_th: 'สถาปัตยกรรมที่มีเอกลักษณ์สวยงามโดดเด่น', s: 'pos' },
      { w: 'incredible artistic details', w_th: 'รายละเอียดงานศิลปะที่น่าทึ่ง', s: 'pos' },
      { w: 'typical highway route', w_th: 'เส้นทางถนนไฮเวย์รูปแบบปกติทั่วไป', s: 'neu' },
      { w: 'disorganized parking area', w_th: 'พื้นที่จอดรถขาดการจัดระเบียบที่ดี', s: 'neg' },
      { w: 'ordinary souvenir shops', w_th: 'ร้านขายของที่ระลึกระดับธรรมดาทั่วไป', s: 'neu' },
      { w: 'crowded public restrooms', w_th: 'ห้องน้ำสาธารณะมีความหนาแน่นแออัด', s: 'neg' },
      { w: 'fascinating art viewing', w_th: 'การเข้าชมงานศิลปะที่น่าหลงใหล', s: 'pos' },
      { w: 'restrictive photo rules', w_th: 'กฎระเบียบการห้ามถ่ายภาพที่เข้มงวดเกินไป', s: 'neg' }
    ],
    ai: 'Receives outstanding praise for its stunning unique architecture. The sentiment analysis algorithm shows near-perfect scores for artistic design, with minor neutral-to-negative friction regarding restrictive indoor photo rules and disorganized parking.',
    ai_th: 'ได้รับความชื่นชมอย่างโดดเด่นในเรื่องสถาปัตยกรรมที่มีเอกลักษณ์เฉพาะตัว อัลกอริทึมวิเคราะห์ความรู้สึกแสดงผลคะแนนเกือบเต็มในแง่การออกแบบเชิงศิลปะ โดยมีจุดติดขัดเล็กน้อยในเชิงลบเรื่องกฎห้ามถ่ายภาพภายในอุโบสถและที่จอดรถที่ขาดความเป็นระเบียบ',
  },
  {
    id: 'khaokheow',
    name: 'Khao Kheow Open Zoo',
    name_th: 'สวนสัตว์เปิดเขาเขียว',
    nameEn: 'Khao Kheow Open Zoo',
    loc: 'Chonburi',
    loc_th: 'ชลบุรี',
    province: 'Chonburi',
    province_th: 'ชลบุรี',
    region: ['central'],
    type: ['zoo', 'nature'],
    pos: 86, neu: 9, neg: 5,
    reviews: 1450,
    emoji: '🦛',
    img: 'https://static.ticket2attraction.com/gallery/916baa58-88e5-4270-ba16-b367ba6a72a2/f66bbf8d-9853-4319-8f61-16cebcd25a37-1200.webp',
    kws: [
      { w: 'adorable pygmy hippo', w_th: 'ลูกฮิปโปแคระที่น่ารักน่าเอ็นดู', s: 'pos' },
      { w: 'interactive animal feeding', w_th: 'กิจกรรมให้อาหารสัตว์อย่างใกล้ชิด', s: 'pos' },
      { w: 'standard golf cart rental', w_th: 'การเช่ารถกอล์ฟระดับบริการทั่วไป', s: 'neu' },
      { w: 'long queues on holidays', w_th: 'การรอคิวยาวนานในวันหยุด', s: 'neg' },
      { w: 'spacious natural enclosures', w_th: 'ส่วนจัดแสดงธรรมชาติที่กว้างขวาง', s: 'pos' },
      { w: 'hot weather walking routes', w_th: 'เส้นทางการเดินชมมีอากาศร้อนจัด', s: 'neg' },
      { w: 'wonderful wildlife education', w_th: 'การเรียนรู้ชีวิตสัตว์ป่าที่ยอดเยี่ยม', s: 'pos' },
      { w: 'limited shuttle buses', w_th: 'รถบริการรับส่งภายในมีจำนวนจำกัด', s: 'neg' }
    ],
    ai: 'Very strong positive sentiment driven by high-profile animal stars and interactive feeding zones. The NLP pipeline indicates high visitor satisfaction with spacious natural habitats, while negative marks appear around holiday gridlocks and golf cart availability.',
    ai_th: 'กระแสความรู้สึกเชิงบวกแข็งแกร่งมากจากการดึงดูดของสัตว์ป่าดาวเด่นและโซนกิจกรรมให้อาหารสัตว์ ระบบ NLP ชี้ว่าผู้เข้าชมพึงพอใจกับส่วนจัดแสดงที่เป็นธรรมชาติและกว้างขวาง ทว่ามีคะแนนเชิงลบในเรื่องความแออัดช่วงวันหยุดและการรอคิวรถกอล์ฟ',
  },
  {
    id: 'safariworld',
    name: 'Safari World',
    name_th: 'ซาฟารีเวิลด์ (Safari World)',
    nameEn: 'Safari World',
    loc: 'Bangkok',
    loc_th: 'กรุงเทพฯ',
    province: 'Bangkok',
    province_th: 'กรุงเทพฯ',
    region: ['BKK'],
    type: ['zoo', 'culture'],
    pos: 84, neu: 10, neg: 6,
    reviews: 2840,
    emoji: '🦁',
    img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80',
    kws: [
      { w: 'incredible drive-through safari', w_th: 'โซนขับรถชมสัตว์ป่าเปิดที่น่าตื่นตาตื่นใจ', s: 'pos' },
      { w: 'world-class dolphin show', w_th: 'การแสดงปลาโลมามาตรฐานระดับโลก', s: 'pos' },
      { w: 'standard double pricing', w_th: 'การเก็บราคาตั๋วแบบสองมาตรฐานทั่วไป', s: 'neu' },
      { w: 'extremely expensive food', w_th: 'อาหารและน้ำดื่มด้านในราคาแพงมาก', s: 'neg' },
      { w: 'clean theme park facilities', w_th: 'สิ่งอำนวยความสะดวกในธีมปาร์คสะอาดดี', s: 'pos' },
      { w: 'heavy weekend crowds', w_th: 'ฝูงชนหนาแน่นมากในช่วงวันหยุด', s: 'neg' },
      { w: 'amazing giraffe feeding', w_th: 'กิจกรรมป้อนอาหารฝูงยีราฟที่น่าประทับใจ', s: 'pos' },
      { w: 'exhausting walking loops', w_th: 'เส้นทางการเดินชมกว้างขวางจนเหนื่อยล้า', s: 'neg' }
    ],
    ai: 'Boasts high positive sentiment scores for its unique open safari drive-through and engaging marine shows. However, text analysis reports typical theme-park friction regarding heavily inflated food prices inside and massive pedestrian crowds during national holidays.',
    ai_th: 'ได้รับคะแนนความรู้สึกเชิงบวกสูงมากในส่วนของโซนเปิดขับรถชมสัตว์ป่าที่เป็นเอกลักษณ์และการแสดงสัตว์น้ำที่ดึงดูดใจ ทว่าผลวิเคราะห์ข้อความตรวจพบจุดติดขัดตามสไตล์ธีมปาร์คทั่วไป เรื่องราคาอาหารเครื่องดื่มด้านในที่สูงเกินไปและฝูงชนที่หนาแน่นมากในช่วงวันหยุดเทศกาล',
  },
  {
    id: 'haadrin',
    name: 'Haad Rin (Full Moon Beach)',
    name_th: 'หาดริ้น (หาดฟูลมูนปาร์ตี้)',
    nameEn: 'Haad Rin',
    loc: 'Surat Thani',
    loc_th: 'สุราษฎร์ธานี',
    province: 'Surat Thani',
    province_th: 'สุราษฎร์ธานี',
    region: ['south'],
    type: ['beach', 'culture'],
    pos: 48, neu: 20, neg: 32,
    reviews: 1980,
    emoji: '🌕',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    kws: [
      { w: 'vibrant party atmosphere', w_th: 'บรรยากาศงานปาร์ตี้ที่คึกคักเต็มไปด้วยพลัง', s: 'pos' },
      { w: 'beautiful morning shoreline', w_th: 'แนวชายหาดยามเช้าที่สวยงามสงบ', s: 'pos' },
      { w: 'standard beach access', w_th: 'ทางเข้าถึงพื้นที่ชายหาดระดับทั่วไป', s: 'neu' },
      { w: 'massive plastic trash', w_th: 'ขยะพลาสติกตกค้างจำนวนมหาศาล', s: 'neg' },
      { w: 'extremely noisy music', w_th: 'เสียงดนตรีอึกทึกครึกโครมรบกวนการนอน', s: 'neg' },
      { w: 'overpriced drink buckets', w_th: 'ถังเครื่องดื่มแอลกอฮอล์ราคาแพงเกินจริง', s: 'neg' },
      { w: 'exciting fire shows', w_th: 'การแสดงควงกระบองไฟที่ตื่นตาตื่นใจ', s: 'pos' },
      { w: 'aggressive drunk tourists', w_th: 'พฤติกรรมก้าวร้าวของนักท่องเที่ยวที่มึนเมา', s: 'neg' }
    ],
    ai: 'Sentiment analysis triggers a critical alert. While the beach is praised for its energetic nightlife and fire shows, text mining detects severe negative clusters regarding massive plastic waste left on the sand post-party, extreme noise pollution affecting nearby hotels, and friction with intoxicated individuals.',
    ai_th: 'ระบบวิเคราะห์ความรู้สึกยิงสัญญาณเตือนวิกฤต (Alert) แม้ชายหาดจะได้รับคำชมเรื่องแสงสียามค่ำคืนและการแสดงไฟ ทว่าการขุดข้อความตรวจพบกระแสลบรุนแรงมากในเรื่องขยะพลาสติกเกลื่อนหาดหลังจบปาร์ตี้ มลภาวะทางเสียงที่ดังรบกวนการพักผ่อน และพฤติกรรมที่น่ากังวลของนักท่องเที่ยวที่มึนเมา',
  },
  {
    id: 'damnoensaduak',
    name: 'Damnoen Saduak Floating Market',
    name_th: 'ตลาดน้ำดำเนินสะดวก',
    nameEn: 'Damnoen Saduak',
    loc: 'Ratchaburi',
    loc_th: 'ราชบุรี',
    province: 'Ratchaburi',
    province_th: 'ราชบุรี',
    region: ['central'],
    type: ['culture'],
    pos: 42, neu: 18, neg: 40,
    reviews: 3120,
    emoji: '🛶',
    img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
    kws: [
      { w: 'traditional canal lifestyle', w_th: 'ภาพจำวิถีชีวิตริมคลองแบบดั้งเดิม', s: 'pos' },
      { w: 'colorful photo opportunities', w_th: 'โอกาสในการถ่ายภาพสีสันวิถีคลองที่สวยงาม', s: 'pos' },
      { w: 'standard souvenir items', w_th: 'สินค้าของฝากที่ระลึกรูปแบบทั่วไป', s: 'neu' },
      { w: 'exorbitant boat rentals', w_th: 'ค่าเช่าเรือพายราคาขูดรีดแพงมหาโหด', s: 'neg' },
      { w: 'aggressive scam vendors', w_th: 'ผู้ค้าบางส่วนตื๊อขายของแกมบังคับและหลอกลวง', s: 'neg' },
      { w: 'intense canal boat traffic', w_th: 'การจราจรทางเรือในคลองติดขัดวุ่นวาย', s: 'neg' },
      { w: 'tasty local boat noodles', w_th: 'ก๋วยเตี๋ยวเรือท้องถิ่นรสชาติดี', s: 'pos' },
      { w: 'unpleasant diesel fumes', w_th: 'กลิ่นควันไอเสียเรือยนต์ที่เหม็นอึดอัด', s: 'neg' }
    ],
    ai: 'The most heavily criticized tourist trap in the NLP pipeline. Text analysis tracks consistent, intense negative feedback targeted at local boat operators charging extortionate fees (up to 2,000 THB) and aggressive sales tactics, heavily damaging the authentic cultural experience.',
    ai_th: 'พื้นที่ที่ได้รับคำวิจารณ์เชิงลบเรื่องกับดักนักท่องเที่ยวรุนแรงที่สุดในระบบ วิเคราะห์พบบริบทข้อความเชิงลบเข้มข้นต่อเนื่องเจาะจงเรื่องราคาค่าเช่าเรือที่แพงมหาโหด (บางรายเรียกเก็บถึง 2,000 บาท) รวมถึงกลยุทธ์การขายที่ก้าวร้าวบีบบังคับ ซึ่งทำลายภาพลักษณ์สถาปัตยกรรมทางวัฒนธรรมดั้งเดิมอย่างมาก',
  }
];

// 🟢 แก้ไขจุดสำคัญ: แปลง KEYWORD_INSIGHTS_MAP เป็นวัตถุ Object 2 ภาษา { en, th } ของทุกคำสำคัญในระบบ
export const KEYWORD_INSIGHTS_MAP = {
  // === Phang Nga Bay ===
  'stunning limestone cliffs': {
    en: 'Attraction Insight: Vector clustering shows near 100% positive validation for geological rock formations.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การจัดกลุ่มเวกเตอร์แสดงการยอมรับเชิงบวกเกือบ 100% สำหรับลักษณะทางธรณีวิทยาของกลุ่มหน้าผาหินปูน'
  },
  'หน้าผาหินปูนที่สวยงามตระการตา': {
    en: 'Attraction Insight: Vector clustering shows near 100% positive validation for geological rock formations.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การจัดกลุ่มเวกเตอร์แสดงการยอมรับเชิงบวกเกือบ 100% สำหรับลักษณะทางธรณีวิทยาของกลุ่มหน้าผาหินปูน'
  },
  'breathtaking scenery': {
    en: 'Attraction Insight: Widely captured in reviews as an unforgettable global maritime panorama.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ถูกบันทึกในรีวิวอย่างกว้างขวางว่าเป็นทัศนียภาพทางทะเลระดับโลกที่งดงามยากจะลืมเลือน'
  },
  'ทัศนียภาพอันน่าทึ่ง': {
    en: 'Attraction Insight: Widely captured in reviews as an unforgettable global maritime panorama.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ถูกบันทึกในรีวิวอย่างกว้างขวางว่าเป็นทัศนียภาพทางทะเลระดับโลกที่งดงามยากจะลืมเลือน'
  },
  'smooth boat access': {
    en: 'Accessibility Fact: Modern pier facilities offer smooth transitions to speedboats during stable seasons.',
    th: 'ข้อเท็จจริงการเข้าถึง: สิ่งอำนวยความสะดวกของท่าเรือที่ทันสมัยช่วยให้การขึ้นเรือท่องเที่ยวและเรือสปีดโบ๊ทสะดวกราบรื่นดี'
  },
  'การเดินทางด้วยเรือที่สะดวกสบาย': {
    en: 'Accessibility Fact: Modern pier facilities offer smooth transitions to speedboats during stable seasons.',
    th: 'ข้อเท็จจริงการเข้าถึง: สิ่งอำนวยความสะดวกของท่าเรือที่ทันสมัยช่วยให้การขึ้นเรือท่องเที่ยวและเรือสปีดโบ๊ทสะดวกราบรื่นดี'
  },
  'crowded boat pier': {
    en: 'Friction Point: Heavy queues observed around midday. High negative concentration on peak-hour congestion.',
    th: 'จุดติดขัด: พบแถวต่อคิวหนาแน่นในช่วงเที่ยงวัน มีกระแสความไม่พึงพอใจกระจุกตัวสูงในช่วงเวลาเร่งด่วน'
  },
  'ท่าเรือมีความแออัด': {
    en: 'Friction Point: Heavy queues observed around midday. High negative concentration on peak-hour congestion.',
    th: 'จุดติดขัด: พบแถวต่อคิวหนาแน่นในช่วงเที่ยงวัน มีความไม่พึงพอใจกระจุกตัวสูงในช่วงเวลาเร่งด่วน'
  },
  'standard admission fee': {
    en: 'Neutral Fact: Standard national park fees apply. Most foreign tourists view this as an ordinary administrative policy.',
    th: 'ข้อเท็จจริงทั่วไป: อัตราค่าเข้าชมอุทยานเป็นไปตามเกณฑ์มาตรฐานปกติ นักท่องเที่ยวต่างชาติส่วนใหญ่มองว่าเป็นนโยบายทั่วไป'
  },
  'ค่าธรรมเนียมการเข้าชมระดับมาตรฐาน': {
    en: 'Neutral Fact: Standard national park fees apply. Most foreign tourists view this as an ordinary administrative policy.',
    th: 'ข้อเท็จจริงทั่วไป: อัตราค่าเข้าชมอุทยานเป็นไปตามเกณฑ์มาตรฐานปกติ นักท่องเที่ยวต่างชาติส่วนใหญ่มองว่าเป็นนโยบายทั่วไป'
  },
  'overpriced local food': {
    en: 'Amenity Issue: Multiple reviews suggest bringing personal snacks due to inflated tourist premiums on food.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: รีวิวหลายรายการแนะนำให้พกขนมขบเคี้ยวมาเอง เนื่องจากร้านค้าในพื้นที่ปรับราคาอาหารสูงขึ้นสำหรับนักท่องเที่ยว'
  },
  'อาหารท้องถิ่นราคาแพงเกินไป': {
    en: 'Amenity Issue: Multiple reviews suggest bringing personal snacks due to inflated tourist premiums on food.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: รีวิวหลายรายการแนะนำให้พกขนมขบเคี้ยวมาเอง เนื่องจากร้านค้าในพื้นที่ปรับราคาอาหารสูงขึ้นสำหรับนักท่องเที่ยว'
  },
  'fantastic kayaking': {
    en: 'Activity Praise: Highlighted by independent travelers as an intimate way to explore hidden sea caves.',
    th: 'คำชมกิจกรรม: นักท่องเที่ยวอิสระเน้นย้ำว่าเป็นกิจกรรมพายเรือที่ยอดเยี่ยมในการเข้าไปสำรวจความมหัศจรรย์ของถ้ำทะเล'
  },
  'กิจกรรมพายเรือคายัคที่ยอดเยี่ยม': {
    en: 'Activity Praise: Highlighted by independent travelers as an intimate way to explore hidden sea caves.',
    th: 'คำชมกิจกรรม: นักท่องเที่ยวอิสระเน้นย้ำว่าเป็นกิจกรรมพายเรือที่ยอดเยี่ยมในการเข้าไปสำรวจความมหัศจรรย์ของถ้ำทะเล'
  },
  'rushed island tour': {
    en: 'Activity Limitation: Package groups express annoyance over strictly limited times allowed on-shore.',
    th: 'ข้อจำกัดกิจกรรม: นักท่องเที่ยวกลุ่มทัวร์แสดงความอึดอัดใจกับกำหนดการขึ้นชมแต่ละเกาะที่จำกัดเวลาเร่งรีบจนเกินไป'
  },
  'ทัวร์เที่ยวเกาะที่เร่งรีบเกินไป': {
    en: 'Activity Limitation: Package groups express annoyance over strictly limited times allowed on-shore.',
    th: 'ข้อจำกัดกิจกรรม: นักท่องเที่ยวกลุ่มทัวร์แสดงความอึดอัดใจกับกำหนดการขึ้นชมแต่ละเกาะที่จำกัดเวลาเร่งรีบจนเกินไป'
  },

  // === Doi Inthanon ===
  'beautiful misty sunrise': {
    en: 'Attraction Insight: The Kew Mae Pan viewpoint receives outstanding remarks for atmospheric visuals.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: จุดชมวิวกิ่วแม่ปานได้รับคะแนนความประทับใจดีเยี่ยมในเรื่องแสงสีช่วงพระอาทิตย์ขึ้นคู่ทะเลหมอก'
  },
  'ทัศนียภาพพระอาทิตย์ขึ้นท่ามกลางทะเลหมอก': {
    en: 'Attraction Insight: The Kew Mae Pan viewpoint receives outstanding remarks for atmospheric visuals.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: จุดชมวิวกิ่วแม่ปานได้รับคะแนนความประทับใจดีเยี่ยมในเรื่องแสงสีช่วงพระอาทิตย์ขึ้นคู่ทะเลหมอก'
  },
  'ordinary landmark sign': {
    en: 'Neutral Comment: The highest peak sign is noted by visitors merely as a typical spot for a quick milestone photo.',
    th: 'ความคิดเห็นทั่วไป: ป้ายจุดสูงสุดแดนสยามถูกบันทึกว่าเป็นเพียงจุดแวะยืนถ่ายภาพเป็นที่ระลึกรูปแบบทั่วไปเท่านั้น'
  },
  'ป้ายจุดเช็คอินบนยอดเขาค่อนข้างธรรมดา': {
    en: 'Neutral Comment: The highest peak sign is noted by visitors merely as a typical spot for a quick milestone photo.',
    th: 'ความคิดเห็นทั่วไป: ป้ายจุดสูงสุดแดนสยามถูกบันทึกว่าเป็นเพียงจุดแวะยืนถ่ายภาพเป็นที่ระลึกรูปแบบทั่วไปเท่านั้น'
  },
  'scenic paved road': {
    en: 'Accessibility Praise: Major infrastructure routes are smooth, well-paved, and highly safe for motorbikes.',
    th: 'คำชมการเข้าถึง: เส้นทางถนนยางมะตอยหลักขึ้นเขาค่อนข้างเรียบ ขับขี่ง่าย และปลอดภัยสำหรับรถจักรยานยนต์'
  },
  'เส้นทางถนนลาดยางวิวสวยงาม': {
    en: 'Accessibility Praise: Major infrastructure routes are smooth, well-paved, and highly safe for motorbikes.',
    th: 'คำชมการเข้าถึง: เส้นทางถนนยางมะตอยหลักขึ้นเขาค่อนข้างเรียบ ขับขี่ง่าย และปลอดภัยสำหรับรถจักรยานยนต์'
  },
  'exhausting long drive': {
    en: 'Accessibility Warning: Demands nearly 2 hours of steep alpine accent from downtown Chiang Mai.',
    th: 'คำเตือนการเข้าถึง: ทางค่อนข้างชันและต้องใช้ระยะเวลาขับขี่ไกลเกือบ 2 ชั่วโมงเต็มหากเดินทางจากตัวเมืองเชียงใหม่'
  },
  'ระยะเวลาการขับรถที่ยาวนานและเหน็ดเหนื่อย': {
    en: 'Accessibility Warning: Demands nearly 2 hours of steep alpine accent from downtown Chiang Mai.',
    th: 'คำเตือนการเข้าถึง: ทางค่อนข้างชันและต้องใช้ระยะเวลาขับขี่ไกลเกือบ 2 ชั่วโมงเต็มหากเดินทางจากตัวเมืองเชียงใหม่'
  },
  'clean visitor facilities': {
    en: 'Amenity Praise: National park offices and primary hubs are commended for cleanliness and support.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ที่ทำการอุทยาน ศูนย์บริการนักท่องเที่ยว และห้องน้ำสะอาดเรียบร้อยดี'
  },
  'สิ่งอำนวยความสะดวกสำหรับนักท่องเที่ยวสะอาดดี': {
    en: 'Amenity Praise: National park offices and primary hubs are commended for cleanliness and support.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ที่ทำการอุทยาน ศูนย์บริการนักท่องเที่ยว และห้องน้ำสะอาดเรียบร้อยดี'
  },
  'limited restaurant choices': {
    en: 'Amenity Issue: Reviews mention a scarcity of versatile international dining spots near the summit.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: รีวิวระบุว่าร้านอาหารและเมนูอาหารนานาชาติบนยอดเขามีตัวเลือกให้เลือกทานน้อยเกินไป'
  },
  'ตัวเลือกของร้านอาหารมีจำกัด': {
    en: 'Amenity Issue: Reviews mention a scarcity of versatile international dining spots near the summit.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: รีวิวระบุว่าร้านอาหารและเมนูอาหารนานาชาติบนยอดเขามีตัวเลือกให้เลือกทานน้อยเกินไป'
  },
  'amazing nature trekking': {
    en: 'Activity Praise: Guided waterfall walk trails are heavily applauded for pristine preservation.',
    th: 'คำชมกิจกรรม: นักท่องเที่ยวชื่นชมเส้นทางศึกษาธรรมชาติเดินป่าชมน้ำตกและผืนป่าที่อุดมสมบูรณ์'
  },
  'เส้นทางเดินศึกษาธรรมชาติที่ยอดเยี่ยม': {
    en: 'Activity Praise: Guided waterfall walk trails are heavily applauded for pristine preservation.',
    th: 'คำชมกิจกรรม: นักท่องเที่ยวชื่นชมเส้นทางศึกษาธรรมชาติเดินป่าชมน้ำตกและผืนป่าที่อุดมสมบูรณ์'
  },
  'slippery hiking paths': {
    en: 'Activity Warning: Heavy humidity and mist make wooden steps highly slippery; caution advised for elderly.',
    th: 'คำเตือนกิจกรรม: ละอองหมอกและความชื้นสูงทำตามทางเดินบันไดไม้ค่อนข้างลื่นมาก ควรระวังเป็นพิเศษหากมีผู้สูงอายุเดินทางมาด้วย'
  },
  'ทางเดินเท้ามีความลื่น': {
    en: 'Activity Warning: Heavy humidity and mist make wooden steps highly slippery; caution advised for elderly.',
    th: 'คำเตือนกิจกรรม: ละอองหมอกและความชื้นสูงทำตามทางเดินบันไดไม้ค่อนข้างลื่นมาก ควรระวังเป็นพิเศษหากมีผู้สูงอายุเดินทางมาด้วย'
  },

  // === Ayutthaya ===
  'magnificent ancient temples': {
    en: 'Attraction Insight: Historic ruins evoke extreme structural and archeological wonder in foreign reviews.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ซากปรักหักพังของโบราณสถานและวัดเก่าสร้างความตื่นตาตื่นใจในเชิงสถาปัตยกรรมแก่ชาวต่างชาติอย่างมาก'
  },
  'โบราณสถานและวัดเก่าแก่ที่งดงามวิจิตร': {
    en: 'Attraction Insight: Historic ruins evoke extreme structural and archeological wonder in foreign reviews.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ซากปรักหักพังของโบราณสถานและวัดเก่าสร้างความตื่นตาตื่นใจในเชิงสถาปัตยกรรมแก่ชาวต่างชาติอย่างมาก'
  },
  'extremely hot weather': {
    en: 'Environmental Obstacle: Drastic heat levels around noon trigger heavy negative sentiment tags.',
    th: 'อุปสรรคทางสิ่งแวดล้อม: อุณหภูมิแดดและอากาศร้อนจัดในช่วงเที่ยงวันและบ่ายเป็นปัจจัยหลักที่ทำให้ติดแท็กเชิงลบ'
  },
  'สภาพอากาศร้อนจัด': {
    en: 'Environmental Obstacle: Drastic heat levels around noon trigger heavy negative sentiment tags.',
    th: 'อุปสรรคทางสิ่งแวดล้อม: อุณหภูมิแดดและอากาศร้อนจัดในช่วงเที่ยงวันและบ่ายเป็นปัจจัยหลักที่ทำให้ติดแท็กเชิงลบ'
  },
  'easy train access': {
    en: 'Accessibility Praise: Highly rated for budgetary independent travelers coming straight from Bangkok.',
    th: 'คำชมการเข้าถึง: ได้รับคำชมสูงในกลุ่มนักท่องเที่ยวสายเดินทางประหยัด (Backpacker) ที่นั่งรถไฟตรงมาจากกรุงเทพฯ'
  },
  'การเดินทางด้วยรถไฟสะดวกสบาย': {
    en: 'Accessibility Praise: Highly rated for budgetary independent travelers coming straight from Bangkok.',
    th: 'คำชมการเข้าถึง: ได้รับคำชมสูงในกลุ่มนักท่องเที่ยวสายเดินทางประหยัด (Backpacker) ที่นั่งรถไฟตรงมาจากกรุงเทพฯ'
  },
  'aggressive tuktuk scams': {
    en: 'Friction Alert: Text analysis captures persistent warnings regarding unregulated local driver overcharges.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: อัลกอริทึมตรวจจับพบคำเตือนหนาแน่นเรื่องคนขับรถตุ๊กตุ๊กท้องถิ่นบางส่วนตื๊อและเรียกเก็บค่าบริการแพงเกินจริง'
  },
  'การตื๊อโก่งราคาจากรถตุ๊กตุ๊กในพื้นที่': {
    en: 'Friction Alert: Text analysis captures persistent warnings regarding unregulated local driver overcharges.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: อัลกอริทึมตรวจจับพบคำเตือนหนาแน่นเรื่องคนขับรถตุ๊กตุ๊กท้องถิ่นบางส่วนตื๊อและเรียกเก็บค่าบริการแพงเกินจริง'
  },
  'typical information boards': {
    en: 'Neutral Observation: Educational signs provide standard historical context. Visitors find them ordinary but informative.',
    th: 'ข้อสังเกตทั่วไป: ป้ายอธิบายประวัติศาสตร์ติดตั้งตามเกณฑ์ปกติ นักท่องเที่ยวพบว่าดูธรรมดาทั่วไปแต่ข้อมูลครบถ้วนดี'
  },
  'ป้ายข้อมูลประวัติศาสตร์รูปแบบทั่วไป': {
    en: 'Neutral Observation: Educational signs provide standard historical context. Visitors find them ordinary but informative.',
    th: 'ข้อสังเกตทั่วไป: ป้ายอธิบายประวัติศาสตร์ติดตั้งตามเกณฑ์ปกติ นักท่องเที่ยวพบว่าดูธรรมดาทั่วไปแต่ข้อมูลครบถ้วนดี'
  },
  'lacks shaded rest areas': {
    en: 'Amenity Deficit: Tourists urge authorities to construct canopy structures to shield against the intense sun.',
    th: 'สิ่งอำนวยความสะดวกบกพร่อง: นักท่องเที่ยวแนะนำให้สร้างซุ้มศาลาหรือจุดนั่งพักหลบแดดใต้ร่มเงาเพิ่มขึ้น'
  },
  'ขาดแคลนพื้นที่นั่งพักใต้ร่มเงา': {
    en: 'Amenity Deficit: Tourists urge authorities to construct canopy structures to shield against the intense sun.',
    th: 'สิ่งอำนวยความสะดวกบกพร่อง: นักท่องเที่ยวแนะนำให้สร้างซุ้มศาลาหรือจุดนั่งพักหลบแดดใต้ร่มเงาเพิ่มขึ้น'
  },
  'enjoyable bicycle riding': {
    en: 'Activity Praise: Flat terrains make bike rentals the definitive, pleasant way to cross park boundaries.',
    th: 'คำชมกิจกรรม: พื้นที่รอบโบราณสถานเป็นทางราบเรียบ การเช่าจักรยานปั่นจึงเป็นกิจกรรมที่เพลิดเพลินและคุ้มค่าที่สุด'
  },
  'การปั่นจักรยานท่องเที่ยวที่เพลิดเพลิน': {
    en: 'Activity Praise: Flat terrains make bike rentals the definitive, pleasant way to cross park boundaries.',
    th: 'คำชมกิจกรรม: พื้นที่รอบโบราณสถานเป็นทางราบเรียบ การเช่าจักรยานปั่นจึงเป็นกิจกรรมที่เพลิดเพลินและคุ้มค่าที่สุด'
  },
  'congested walking routes': {
    en: 'Activity Friction: Heavy tour-bus drops cause brief pedestrian bottlenecks near focal altars.',
    th: 'ข้อขัดแย้งกิจกรรม: ช่วงเวลาที่รถทัวร์คณะใหญ่ลงจอดพร้อมกัน อาจทำให้ทางเดินเท้าเข้าอุโบสถหลักติดขัดหนาแน่นชั่วคราว'
  },
  'เส้นทางเดินเท้ามีความหนาแน่นบางช่วง': {
    en: 'Activity Friction: Heavy tour-bus drops cause brief pedestrian bottlenecks near focal altars.',
    th: 'ข้อขัดแย้งกิจกรรม: ช่วงเวลาที่รถทัวร์คณะใหญ่ลงจอดพร้อมกัน อาจทำให้ทางเดินเท้าเข้าอุโบสถหลักติดขัดหนาแน่นชั่วคราว'
  },

  // === Wat Phra Kaew ===
  'magnificent architecture': {
    en: 'Attraction Insight: Gilded structures and mural precision generate elite positive feedback ranks.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: พระอุโบสถสีทองประกายและความวิจิตรของจิตรกรรมฝาผนังดึงดูดคะแนนเชิงบวกพึงพอใจขั้นสูงสุด'
  },
  'สถาปัตยกรรมที่งดงามวิจิตรบรรจง': {
    en: 'Attraction Insight: Gilded structures and mural precision generate elite positive feedback ranks.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: พระอุโบสถสีทองประกายและความวิจิตรของจิตรกรรมฝาผนังดึงดูดคะแนนเชิงบวกพึงพอใจขั้นสูงสุด'
  },
  'overwhelming crowds': {
    en: 'Friction Alert: Extreme density creates a high sensory overload, affecting relaxing review values.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: ปริมาณคณะทัวร์ต่างชาติที่แออัดมากทำให้เกิดความอึดอัด รบกวนความเงียบสงบในการเข้าชม'
  },
  'ฝูงชนหนาแน่นและแออัดมากเกินไป': {
    en: 'Friction Alert: Extreme density creates a high sensory overload, affecting relaxing review values.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: ปริมาณคณะทัวร์ต่างชาติที่แออัดมากทำให้เกิดความอึดอัด รบกวนความเงียบสงบในการเข้าชม'
  },
  'central city location': {
    en: 'Accessibility Praise: Superb transit pathways via Chao Phraya express boats right to the gates.',
    th: 'คำชมการเข้าถึง: ทำเลใจกลางเมืองชั้นในเดินทางมาง่ายมากโดยเฉพาะการนั่งเรือด่วนเจ้าพระยามาลงที่ท่าเรือหน้าวัด'
  },
  'ทำเลที่ตั้งใจกลางเมืองเดินทางสะดวก': {
    en: 'Accessibility Praise: Superb transit pathways via Chao Phraya express boats right to the gates.',
    th: 'คำชมการเข้าถึง: ทำเลใจกลางเมืองชั้นในเดินทางมาง่ายมากโดยเฉพาะการนั่งเรือด่วนเจ้าพระยามาลงที่ท่าเรือหน้าวัด'
  },
  'chaotic traffic outside': {
    en: 'Accessibility Warning: Surrounding street blocks suffer intense gridlocks and aggressive scam touts.',
    th: 'คำเตือนการเข้าถึง: การจราจรบนบล็อกถนนด้านนอกติดขัดวุ่นวาย และมีกลุ่มรถรับจ้างตื๊อหลอกลวงราคาจอดรอบพื้นที่'
  },
  'การจราจรด้านนอกรอบพื้นที่วุ่นวาย': {
    en: 'Accessibility Warning: Surrounding street blocks suffer intense gridlocks and aggressive scam touts.',
    th: 'คำเตือนการเข้าถึง: การจราจรบนบล็อกถนนด้านนอกติดขัดวุ่นวาย และมีกลุ่มรถรับจ้างตื๊อหลอกลวงราคาจอดรอบพื้นที่'
  },
  'standard ticket counter': {
    en: 'Neutral Data: Standard entry queues are reported. It is processed regularly without major praise or complaints.',
    th: 'ข้อมูลทั่วไป: แถวรอซื้อตั๋วเข้าชมตรงเคาน์เตอร์รันระบบระเบียบตามปกติ ไม่ได้เป็นจุดเด่นชื่นชมหรือจุดร้องเรียนหลัก'
  },
  'เคาน์เตอร์จำหน่ายตั๋วระดับทั่วไป': {
    en: 'Neutral Data: Standard entry queues are reported. It is processed regularly without major praise or complaints.',
    th: 'ข้อมูลทั่วไป: แถวรอซื้อตั๋วเข้าชมตรงเคาน์เตอร์รันระบบระเบียบตามปกติ ไม่ได้เป็นจุดเด่นชื่นชมหรือจุดร้องเรียนหลัก'
  },
  'strict dress code': {
    en: 'Friction Point: Severe dissatisfaction from tourists forced to buy or rent cover sarongs due to minor violations.',
    th: 'จุดติดขัด: นักท่องเที่ยวต่างชาติบ่นเรื่องการตรวจระเบียบเสื้อผ้าที่ตึงเกินไป ทำให้ต้องเสียเงินซื้อหรือเช่าผ้าคลุมเพิ่ม'
  },
  'กฎระเบียบการแต่งกายที่เข้มงวด': {
    en: 'Friction Point: Severe dissatisfaction from tourists forced to buy or rent cover sarongs due to minor violations.',
    th: 'จุดติดขัด: นักท่องเที่ยวต่างชาติบ่นเรื่องการตรวจระเบียบเสื้อผ้าที่ตึงเกินไป ทำให้ต้องเสียเงินซื้อหรือเช่าผ้าคลุมเพิ่ม'
  },
  'deeply cultural experience': {
    en: 'Activity Praise: Unmatched historical exposure regarding royal Thai heritage and Buddhist customs.',
    th: 'คำชมกิจกรรม: มอบประสบการณ์การเรียนรู้ขนบธรรมเนียมพุทธศาสนาและมรดกประวัติศาสตร์ราชสำนักไทยที่หาจากที่อื่นไม่ได้'
  },
  'ประสบการณ์ทางวัฒนธรรมที่ลึกซึ้ง': {
    en: 'Activity Praise: Unmatched historical exposure regarding royal Thai heritage and Buddhist customs.',
    th: 'คำชมกิจกรรม: มอบประสบการณ์การเรียนรู้ขนบธรรมเนียมพุทธศาสนาและมรดกประวัติศาสตร์ราชสำนักไทยที่หาจากที่อื่นไม่ได้'
  },
  'tiring walking loops': {
    en: 'Activity Warning: Massive open brick courtyards with minimal seating induce quick exhaustion.',
    th: 'คำเตือนกิจกรรม: พื้นที่ระเบียงคดและลานอิฐกว้างกลางแจ้งไม่มีร่มเงาและที่นั่งพัก ทำให้ร่างกายเหนื่อยล้าแดดได้ง่าย'
  },
  'เส้นทางการเดินชมระยะไกลทำให้เหนื่อยล้า': {
    en: 'Activity Warning: Massive open brick courtyards with minimal seating induce quick exhaustion.',
    th: 'คำเตือนกิจกรรม: พื้นที่ระเบียงคดและลานอิฐกว้างกลางแจ้งไม่มีร่มเงาและที่นั่งพัก ทำให้ร่างกายเหนื่อยล้าแดดได้ง่าย'
  },

  // === Khao Yai ===
  'rich biodiversity': {
    en: 'Attraction Insight: Over 2,010 foreign reviews are highly fascinated by encountering wild hornbills and mammals.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: รีวิวของชาวต่างชาติประทับใจมากกับการมีโอกาสเดินป่าส่องพบเจอนกเงือก นกป่า และสัตว์ป่าธรรมชาติตัวเป็นๆ'
  },
  'ความหลากหลายทางชีวภาพที่อุดมสมบูรณ์': {
    en: 'Attraction Insight: Over 2,010 foreign reviews are highly fascinated by encountering wild hornbills and mammals.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: รีวิวของชาวต่างชาติประทับใจมากกับการมีโอกาสเดินป่าส่องพบเจอนกเงือก นกป่า และสัตว์ป่าธรรมชาติตัวเป็นๆ'
  },
  'stunning waterfall': {
    en: 'Attraction Insight: Beautiful and highly recommended during the wet season. Beware steep stairs without rails.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: น้ำตกสวยงามระยิบระยับแนะนำให้มาช่วงฤดูฝน ทว่าควรระวังบันไดเดินเท้าลงจุดชมวิวที่ชันและลื่น'
  },
  'น้ำตกที่สวยงามตระการตา': {
    en: 'Attraction Insight: Beautiful and highly recommended during the wet season. Beware steep stairs without rails.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: น้ำตกสวยงามระยิบระยับแนะนำให้มาช่วงฤดูฝน ทว่าควรระวังบันไดเดินเท้าลงจุดชมวิวที่ชันและลื่น'
  },
  'dual pricing system': {
    en: 'ALERT (Sentiment Bias): Over 2,912 high-rating reviews express severe irritation over the 400 THB entry charge.',
    th: 'แจ้งเตือน (อคติเชิงความรู้สึก): รีวิวจำนวนมากระบุว่าไม่พึงพอใจกับระบบราคาตั๋วเข้าสองมาตรฐานที่เก็บชาวต่างชาติสูงถึง 400 บาท'
  },
  'ระบบการเก็บราคาค่าเข้าชมสองมาตรฐาน': {
    en: 'ALERT (Sentiment Bias): Over 2,912 high-rating reviews express severe irritation over the 400 THB entry charge.',
    th: 'แจ้งเตือน (อคติเชิงความรู้สึก): รีวิวจำนวนมากระบุว่าไม่พึงพอใจกับระบบราคาตั๋วเข้าสองมาตรฐานที่เก็บชาวต่างชาติสูงถึง 400 บาท'
  },
  'inconvenient public transport': {
    en: 'Critical Infrastructure Issue: Analysis confirms vast sub-attraction distances make a private car mandatory.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: จุดท่องเที่ยวและจุดกางเต็นท์ห่างกันหลายกิโลเมตร จำเป็นต้องขับรถส่วนตัวเข้ามาเท่านั้น ไม่มีรถสาธารณะรองรับ'
  },
  'ระบบขนส่งสาธารณะภายในไม่สะดวก': {
    en: 'Critical Infrastructure Issue: Analysis confirms vast sub-attraction distances make a private car mandatory.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: จุดท่องเที่ยวและจุดกางเต็นท์ห่างกันหลายกิโลเมตร จำเป็นต้องขับรถส่วนตัวเข้ามาเท่านั้น ไม่มีรถสาธารณะรองรับ'
  },
  'basic visitor amenities': {
    en: 'Neutral Evaluation: Restrooms and information desks are standard. Visitors find them plain but acceptable.',
    th: 'ข้อเท็จจริงทั่วไป: ห้องสุขาและเคาน์เตอร์ให้คำแนะนำอยู่เกณฑ์มาตรฐานใช้งานทั่วไป นักท่องเที่ยวรู้สึกเรียบๆ แต่รับได้'
  },
  'สิ่งอำนวยความสะดวกขั้นพื้นฐานทั่วไป': {
    en: 'Neutral Evaluation: Restrooms and information desks are standard. Visitors find them plain but acceptable.',
    th: 'ข้อเท็จจริงทั่วไป: ห้องสุขาและเคาน์เตอร์ให้คำแนะนำอยู่เกณฑ์มาตรฐานใช้งานทั่วไป นักท่องเที่ยวรู้สึกเรียบๆ แต่รับได้'
  },
  'language barrier staff': {
    en: 'Amenity Deficit: Communication gaps prevent travelers from acquiring deep ecological safety data.',
    th: 'ข้อบกพร่องสิ่งอำนวยความสะดวก: ช่องว่างทางภาษาอังกฤษของเจ้าหน้าที่หน้างาน ทำให้สื่อสารแนะนำเรื่องความปลอดภัยระบบนิเวศได้ไม่ลึกพอ'
  },
  'กำแพงภาษาในการสื่อสารของเจ้าหน้าที่': {
    en: 'Amenity Deficit: Communication gaps prevent travelers from acquiring deep ecological safety data.',
    th: 'ข้อบกพร่องสิ่งอำนวยความสะดวก: ช่องว่างทางภาษาอังกฤษของเจ้าหน้าที่หน้างาน ทำให้สื่อสารแนะนำเรื่องความปลอดภัยระบบนิเวศได้ไม่ลึกพอ'
  },
  'wonderful bird watching': {
    en: 'Activity Praise: A global hotspot destination for ornithologists and professional photographers.',
    th: 'คำชมกิจกรรม: พื้นที่ป่าอุทยานเป็นสวรรค์ของนักดูนกและช่างภาพสัตว์ป่าระดับสากลในการส่องนกหายาก'
  },
  'กิจกรรมส่องนกที่ยอดเยี่ยม': {
    en: 'Activity Praise: A global hotspot destination for ornithologists and professional photographers.',
    th: 'คำชมกิจกรรม: พื้นที่ป่าอุทยานเป็นสวรรค์ของนักดูนกและช่างภาพสัตว์ป่าระดับสากลในการส่องนกหายาก'
  },
  'disorganized campsite': {
    en: 'Activity Friction: Campsites lack structural order and are prone to nocturnal wildlife foraging.',
    th: 'ข้อขัดแย้งกิจกรรม: บริเวณลานกางเต็นท์ขาดความเป็นระเบียบและบางครั้งมีสัตว์ป่า (กวาง/ลิง) เข้ามารบกวนคุ้ยขยะตอนดึก'
  },
  'พื้นที่กางเต็นท์ขาดความเป็นระเบียบ': {
    en: 'Activity Friction: Campsites lack structural order and are prone to nocturnal wildlife foraging.',
    th: 'ข้อขัดแย้งกิจกรรม: บริเวณลานกางเต็นท์ขาดความเป็นระเบียบและบางครั้งมีสัตว์ป่า (กวาง/ลิง) เข้ามารบกวนคุ้ยขยะตอนดึก'
  },

  // === Koh Samui ===
  'gorgeous white beach': {
    en: 'Attraction Insight: Chaweng and Lamai shorelines capture peak aesthetic scores for tropical relaxation.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ชายหาดหาดเฉวงและหาดละไมทรายขาวนุ่ม ได้รับเกรดความงามอันดับหนึ่งด้านการนอนพักผ่อนชายทะเล'
  },
  'ชายหาดทรายขาวที่สวยงามระยิบระยับ': {
    en: 'Attraction Insight: Chaweng and Lamai shorelines capture peak aesthetic scores for tropical relaxation.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ชายหาดหาดเฉวงและหาดละไมทรายขาวนุ่ม ได้รับเกรดความงามอันดับหนึ่งด้านการนอนพักผ่อนชายทะเล'
  },
  'polluted beach areas': {
    en: 'Friction Alert: Flash storms occasionally washed marine garbage debris onto unmanaged sand patches.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: มรสุมหรือคลื่นซัดบางฤดูส่งผลให้มีคราบเศษขยะทะเลพัดขึ้นมาสะสมบนหาดในจุดที่ไร้คนดูแล'
  },
  'พบคราบขยะมลพิษบนชายหาดบางส่วน': {
    en: 'Friction Alert: Flash storms occasionally washed marine garbage debris onto unmanaged sand patches.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: มรสุมหรือคลื่นซัดบางฤดูส่งผลให้มีคราบเศษขยะทะเลพัดขึ้นมาสะสมบนหาดในจุดที่ไร้คนดูแล'
  },
  'ordinary ferry schedule': {
    en: 'Neutral Routine: Ferry timetables to the mainland run as normal. Tourists report a standard, unremarkable transit experience.',
    th: 'ขั้นตอนทั่วไป: รอบเที่ยวเรือเฟอร์รี่ข้ามฟากวิ่งตามเวลาปกติ นักท่องเที่ยวรายงานว่าเป็นประสบการณ์เดินทางข้ามเกาะแบบทั่วไป'
  },
  'ตารางการเดินเรือข้ามฟากระดับปกติ': {
    en: 'Neutral Routine: Ferry timetables to the mainland run as normal. Tourists report a standard, unremarkable transit experience.',
    th: 'ขั้นตอนทั่วไป: รอบเที่ยวเรือเฟอร์รี่ข้ามฟากวิ่งตามเวลาปกติ นักท่องเที่ยวรายงานว่าเป็นประสบการณ์เดินทางข้ามเกาะแบบทั่วไป'
  },
  'highly expensive taxis': {
    en: 'Critical Infrastructure Issue: Massive negative density on unmetered local transit cartels.',
    th: 'ปัญหาโครงสร้างพื้นฐานวิกฤต: รีวิวบ่นหนาแน่นมากเรื่องระบบรถแท็กซี่เหมาบนเกาะราคาแพงมหาโหดและไม่ยอมเปิดมิเตอร์วิ่งตามเกณฑ์'
  },
  'รถแท็กซี่ท้องถิ่นราคาแพงมาก': {
    en: 'Critical Infrastructure Issue: Massive negative density on unmetered local transit cartels.',
    th: 'ปัญหาโครงสร้างพื้นฐานวิกฤต: รีวิวบ่นหนาแน่นมากเรื่องระบบรถแท็กซี่เหมาบนเกาะราคาแพงมหาโหดและไม่ยอมเปิดมิเตอร์วิ่งตามเกณฑ์'
  },
  'luxurious resort amenities': {
    en: 'Amenity Praise: Premium beachfront wellness architectures receive exceptional global ratings.',
    th: 'คำชมสิ่งอำนวยความสะดวก: บรรดารีสอร์ทหรูหราติดชายหาดและสปาดูแลสุขภาพได้รับคำชื่นชมและคะแนนดีเยี่ยมระดับโลก'
  },
  'สิ่งอำนวยความสะดวกในรีสอร์ทหรูหรา': {
    en: 'Amenity Praise: Premium beachfront wellness architectures receive exceptional global ratings.',
    th: 'คำชมสิ่งอำนวยความสะดวก: บรรดารีสอร์ทหรูหราติดชายหาดและสปาดูแลสุขภาพได้รับคำชื่นชมและคะแนนดีเยี่ยมระดับโลก'
  },
  'overpriced food options': {
    en: 'Amenity Issue: High tourist clustering inflates standard meal valuations compared to northern cities.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: การกระจุกตัวของย่านท่องเที่ยวทำค่าอาหารริมหาดปรับราคาสูงลิ่วเมื่อเทียบกับภาคอื่นๆ'
  },
  'ราคาอาหารตามแหล่งท่องเที่ยวแพงเกินไป': {
    en: 'Amenity Issue: High tourist clustering inflates standard meal valuations compared to northern cities.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: การกระจุกตัวของย่านท่องเที่ยวทำค่าอาหารริมหาดปรับราคาสูงลิ่วเมื่อเทียบกับภาคอื่นๆ'
  },
  'exciting water sports': {
    en: 'Activity Praise: Jet-skiing and scuba transit packages are highly vibrant and easily bookable.',
    th: 'คำชมกิจกรรม: แพ็กเกจขับเจ็ทสกี พาราเซลลิ่ง และวันเดย์ทริปดำน้ำลึกสนุกสนานและหาจองบริการได้ง่ายมาก'
  },
  'กิจกรรมกีฬาทางน้ำที่ตื่นเต้นเร้าใจ': {
    en: 'Activity Praise: Jet-skiing and scuba transit packages are highly vibrant and easily bookable.',
    th: 'คำชมกิจกรรม: แพ็กเกจขับเจ็ทสกี พาราเซลลิ่ง และวันเดย์ทริปดำน้ำลึกสนุกสนานและหาจองบริการได้ง่ายมาก'
  },
  'noisy beach parties': {
    en: 'Activity Friction: Polarized feedback; beloved by nightlife seekers but hated by families seeking quiet.',
    th: 'ข้อขัดแย้งกิจกรรม: ความเห็นแตกเป็นสองฝั่ง เป็นสวรรค์ของสายท่องราตรีแต่สร้างความปวดหัวให้กลุ่มครอบครัวที่ต้องการนอนสงบ'
  },
  'งานปาร์ตี้ริมหาดส่งเสียงดังรบกวน': {
    en: 'Activity Friction: Polarized feedback; beloved by nightlife seekers but hated by families seeking quiet.',
    th: 'ข้อขัดแย้งกิจกรรม: ความเห็นแตกเป็นสองฝั่ง เป็นสวรรค์ของสายท่องราตรีแต่สร้างความปวดหัวให้กลุ่มครอบครัวที่ต้องการนอนสงบ'
  },

  // === Patong Beach ===
  'lively beach activities': {
    en: 'Attraction Insight: Parasailing and vibrant beach volleyball draw extensive active crowds.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: กิจกรรมพาราเซลลิ่ง เจ็ทสกี และการเล่นวอลเลย์บอลชายหาดสร้างความคึกคักดึงดูดใจฝูงชนอย่างมาก'
  },
  'กิจกรรมริมชายหาดที่คึกคักมีชีวิตชีวา': {
    en: 'Attraction Insight: Parasailing and vibrant beach volleyball draw extensive active crowds.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: กิจกรรมพาราเซลลิ่ง เจ็ทสกี และการเล่นวอลเลย์บอลชายหาดสร้างความคึกคักดึงดูดใจฝูงชนอย่างมาก'
  },
  'stressful tourist traps': {
    en: 'Friction Alert: Lexicon modeling records heavy keyword clusters warning against pushy tailors and bars.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: ระบบวิเคราะห์พบคีย์เวิร์ดเตือนภัยเรื่องการตื๊อขายของอย่างรุนแรงจากร้านตัดสูท บาร์ และแท็กซี่'
  },
  'กับดักนัดท่องเที่ยวที่ทำให้อึดอัด': {
    en: 'Friction Alert: Lexicon modeling records heavy keyword clusters warning against pushy tailors and bars.',
    th: 'การแจ้งเตือนข้อขัดแย้ง: ระบบวิเคราะห์พบคีย์เวิร์ดเตือนภัยเรื่องการตื๊อขายของอย่างรุนแรงจากร้านตัดสูท บาร์ และแท็กซี่'
  },
  'standard airport bus': {
    en: 'Neutral Transportation: The local bus operates on regular hours. It provides a plain, functional option without extra comfort.',
    th: 'การขนส่งทั่วไป: รถบัสส้มเข้าเมืองและไปสนามบินวิ่งตามรอบปกติ เป็นทางเลือกเน้นใช้งานราคาประหยัดแบบทั่วไป ไม่ได้หรูหรา'
  },
  'รถบัสรับส่งสนามบินระดับมาตรฐานทั่วไป': {
    en: 'Neutral Transportation: The local bus operates on regular hours. It provides a plain, functional option without extra comfort.',
    th: 'การขนส่งทั่วไป: รถบัสส้มเข้าเมืองและไปสนามบินวิ่งตามรอบปกติ เป็นทางเลือกเน้นใช้งานราคาประหยัดแบบทั่วไป ไม่ได้หรูหรา'
  },
  'dangerous tuktuk drivers': {
    en: 'Accessibility Warning: High negative correlation with aggressive nighttime driving and price manipulation.',
    th: 'คำเตือนการเข้าถึง: คนขับรถตุ๊กตุ๊กบางรายมีพฤติกรรมขับซิ่งน่ากลัวตอนดึกๆ และมีการรวมกลุ่มปั่นราคาค่าโดยสาร'
  },
  'คนขับรถตุ๊กตุ๊กขับขี่อันตราย': {
    en: 'Accessibility Warning: High negative correlation with aggressive nighttime driving and price manipulation.',
    th: 'คำเตือนการเข้าถึง: คนขับรถตุ๊กตุ๊กบางรายมีพฤติกรรมขับซิ่งน่ากลัวตอนดึกๆ และมีการรวมกลุ่มปั่นราคาค่าโดยสาร'
  },
  'abundant hotel choices': {
    en: 'Amenity Praise: Exceptional density of sleep accommodations fitting every financial tier.',
    th: 'คำชมสิ่งอำนวยความสะดวก: มีความหนาแน่นของโรงแรม โฮสเทล และรีสอร์ทสูงมาก ตอบโจทย์ความต้องการครบทุกระดับงบประมาณ'
  },
  'มีตัวเลือกโรงแรมที่พักจำนวนมาก': {
    en: 'Amenity Praise: Exceptional density of sleep accommodations fitting every financial tier.',
    th: 'คำชมสิ่งอำนวยความสะดวก: มีความหนาแน่นของโรงแรม โฮสเทล และรีสอร์ทสูงมาก ตอบโจทย์ความต้องการครบทุกระดับงบประมาณ'
  },
  'overpriced beach chairs': {
    en: 'Amenity Friction: Repetitive comments criticizing aggressive localized leasing of beachfront space.',
    th: 'ข้อขัดแย้งสิ่งอำนวยความสะดวก: มีเสียงบ่นหนาแน่นเกี่ยวกับการจัดโซนล็อคเตียงผ้าใบและร่มชายหาดที่เรียกเก็บค่าเช่าแพงเกินเหตุ'
  },
  'ค่าเช่าเตียงผ้าใบชายหาดราคาแพงเกินไป': {
    en: 'Amenity Friction: Repetitive comments criticizing aggressive localized leasing of beachfront space.',
    th: 'ข้อขัดแย้งสิ่งอำนวยความสะดวก: มีเสียงบ่นหนาแน่นเกี่ยวกับการจัดโซนล็อคเตียงผ้าใบและร่มชายหาดที่เรียกเก็บค่าเช่าแพงเกินเหตุ'
  },
  'vibrant nightlife experience': {
    en: 'Activity Praise: Bangla Road sets the standard for high-energy bars, clubs, and neon performances.',
    th: 'คำชมกิจกรรม: ซอยบางลาเป็นจุดเด่นอันดับหนึ่งในเรื่องแสงสีเสียง ผับบาร์ และความบันเทิงยามค่ำคืนที่เต็มไปด้วยพลังงาน'
  },
  'ประสบการณ์แสงสียามค่ำคืนที่คึกคัก': {
    en: 'Activity Praise: Bangla Road sets the standard for high-energy bars, clubs, and neon performances.',
    th: 'คำชมกิจกรรม: ซอยบางลาเป็นจุดเด่นอันดับหนึ่งในเรื่องแสงสีเสียง ผับบาร์ และความบันเทิงยามค่ำคืนที่เต็มไปด้วยพลังงาน'
  },
  'aggressive street vendors': {
    en: 'Activity Friction: Tourists indicate physical crowding by vendors disrupts walking relaxation.',
    th: 'ข้อขัดแย้งกิจกรรม: พ่อค้าแม่ค้าหาบเร่เดินเท้าตื๊อเสนอขายของขายทัวร์ถี่เกินไป รบกวนบรรยากาศการเดินเล่นผ่อนคลายริมหาด'
  },
  'คนขายของริมทางเดินตื๊อลูกค้าเกินไป': {
    en: 'Activity Friction: Tourists indicate physical crowding by vendors disrupts walking relaxation.',
    th: 'ข้อขัดแย้งกิจกรรม: พ่อค้าแม่ค้าหาบเร่เดินเท้าตื๊อเสนอขายของขายทัวร์ถี่เกินไป รบกวนบรรยากาศการเดินเล่นผ่อนคลายริมหาด'
  },

  // === White Temple ===
  'stunning unique architecture': {
    en: 'Attraction Insight: Complete artistic shock value. Near-perfect positive weightings for visual originality.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: คุณค่าความประทับใจทางสถาปัตยกรรมระดับสูง โบสถ์สีขาวประดับกระจกสะท้อนดีไซน์เชิงศิลปะที่วิจิตรไม่เหมือนใคร'
  },
  'สถาปัตยกรรมที่มีเอกลักษณ์สวยงามโดดเด่น': {
    en: 'Attraction Insight: Complete artistic shock value. Near-perfect positive weightings for visual originality.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: คุณค่าความประทับใจทางสถาปัตยกรรมระดับสูง โบสถ์สีขาวประดับกระจกสะท้อนดีไซน์เชิงศิลปะที่วิจิตรไม่เหมือนใคร'
  },
  'incredible artistic details': {
    en: 'Attraction Insight: Surreal contemporary art implementations generate extreme intellectual awe.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การใส่ดีเทลงานประติมากรรมและภาพวาดร่วมสมัยสร้างความตื่นตาตาใจเชิงปรัชญาแก่ผู้เข้าชมอย่างลึกซึ้ง'
  },
  'รายละเอียดงานศิลปะที่น่าทึ่ง': {
    en: 'Attraction Insight: Surreal contemporary art implementations generate extreme intellectual awe.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การใส่ดีเทลงานประติมากรรมและภาพวาดร่วมสมัยสร้างความตื่นตาตาใจเชิงปรัชญาแก่ผู้เข้าชมอย่างลึกซึ้ง'
  },
  'typical highway route': {
    en: 'Neutral Accessibility: Road conditions are standard for Thailand highways. The path is functional and straightforward.',
    th: 'การเข้าถึงทั่วไป: เส้นทางสัญจรจากตัวเมืองมายังวัดตั้งอยู่ริมทางหลวงหลัก ถนนเรียบขับง่ายและตรงไปตรงมาตามระบบปกติ'
  },
  'เส้นทางถนนไฮเวย์รูปแบบปกติทั่วไป': {
    en: 'Neutral Accessibility: Road conditions are standard for Thailand highways. The path is functional and straightforward.',
    th: 'การเข้าถึงทั่วไป: เส้นทางสัญจรจากตัวเมืองมายังวัดตั้งอยู่ริมทางหลวงหลัก ถนนเรียบขับง่ายและตรงไปตรงมาตามระบบปกติ'
  },
  'disorganized parking area': {
    en: 'Accessibility Friction: Tour bus overlaps create immense vehicle maneuvering blocks during midday.',
    th: 'ข้อขัดแย้งการเข้าถึง: บริเวณลานจอดรถด้านหน้ามีการจอดซ้อนคันของรถบัสทัวร์ขนาดใหญ่ ทำให้รถยนต์หมุนเวียนติดขัดช่วงเที่ยง'
  },
  'พื้นที่จอดรถขาดการจัดระเบียบที่ดี': {
    en: 'Accessibility Friction: Tour bus overlaps create immense vehicle maneuvering blocks during midday.',
    th: 'ข้อขัดแย้งการเข้าถึง: บริเวณลานจอดรถด้านหน้ามีการจอดซ้อนคันของรถบัสทัวร์ขนาดใหญ่ ทำให้รถยนต์หมุนเวียนติดขัดช่วงเที่ยง'
  },
  'ordinary souvenir shops': {
    en: 'Neutral Observation: Shops sell typical local crafts. Prices and selections are plain and expected.',
    th: 'ข้อสังเกตทั่วไป: ร้านจำหน่ายสินค้าที่ระลึกรอบวัดขายสินค้าหัตถกรรมพื้นเมืองรูปแบบทั่วไป ราคาและของฝากอยู่ในเกณฑ์ปกติ'
  },
  'ร้านขายของที่ระลึกระดับธรรมดาทั่วไป': {
    en: 'Neutral Observation: Shops sell typical local crafts. Prices and selections are plain and expected.',
    th: 'ข้อสังเกตทั่วไป: ร้านจำหน่ายสินค้าที่ระลึกรอบวัดขายสินค้าหัตถกรรมพื้นเมืองรูปแบบทั่วไป ราคาและของฝากอยู่ในเกณฑ์ปกติ'
  },
  'crowded public restrooms': {
    en: 'Amenity Issue: Peak traveler loads occasionally overwhelm cleaning cycles during winter seasons.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: ห้องน้ำสีทองที่งดงามบางช่วงเวลาสุขภัณฑ์หนาแน่นเกินไป ทำให้ระบบทำความสะอาดรอบเช้ามืดไม่ทัน'
  },
  'ห้องน้ำสาธารณะมีความหนาแน่นแออัด': {
    en: 'Amenity Issue: Peak traveler loads occasionally overwhelm cleaning cycles during winter seasons.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: ห้องน้ำสีทองที่งดงามบางช่วงเวลาสุขภัณฑ์หนาแน่นเกินไป ทำให้ระบบทำความสะอาดรอบเช้ามืดไม่ทัน'
  },
  'fascinating art viewing': {
    en: 'Activity Praise: Tourists are deeply engaged by the profound heaven-and-hell philosophical architecture.',
    th: 'คำชมกิจกรรม: ผู้เข้าชมเพลิดเพลินกับการเดินชมภาพจำลองสะพานวัฏสงสารและศิลปะที่สื่อถึงสัจธรรมนรก-สวรรค์ลึกซึ้ง'
  },
  'การเข้าชมงานศิลปะที่น่าหลงใหล': {
    en: 'Activity Praise: Tourists are deeply engaged by the profound heaven-and-hell philosophical architecture.',
    th: 'คำชมกิจกรรม: ผู้เข้าชมเพลิดเพลินกับการเดินชมภาพจำลองสะพานวัฏสงสารและศิลปะที่สื่อถึงสัจธรรมนรก-สวรรค์ลึกซึ้ง'
  },
  'restrictive photo rules': {
    en: 'Activity Friction: Heavy enforcement of strict no-camera bans inside the primary white pavilion.',
    th: 'ข้อขัดแย้งกิจกรรม: มีกฎระเบียบและเจ้าหน้าที่คุมเข้มงวดห้ามใช้กล้องบันทึกภาพถ่ายภายในพระอุโบสถหลักเด็ดขาด'
  },
  'กฎระเบียบการห้ามถ่ายภาพที่เข้มงวดเกินไป': {
    en: 'Activity Friction: Heavy enforcement of strict no-camera bans inside the primary white pavilion.',
    th: 'ข้อขัดแย้งกิจกรรม: มีกฎระเบียบและเจ้าหน้าที่คุมเข้มงวดห้ามใช้กล้องบันทึกภาพถ่ายภายในพระอุโบสถหลักเด็ดขาด'
  },

  // === Khao Kheow Open Zoo ===
  'adorable pygmy hippo': {
    en: 'Attraction Insight: Global viral phenomenon generates near 100% positive data clustering for visual cuteness.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ปรากฏการณ์ฮิปโปแคระไวรัลระดับโลก ดึงดูดคะแนนบวกความประทับใจและความน่ารักพุ่งขึ้นแตะ 100%'
  },
  'ลูกฮิปโปแคระที่น่ารักน่าเอ็นดู': {
    en: 'Attraction Insight: Global viral phenomenon generates near 100% positive data clustering for visual cuteness.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ปรากฏการณ์ฮิปโปแคระไวรัลระดับโลก ดึงดูดคะแนนบวกความประทับใจและความน่ารักพุ่งขึ้นแตะ 100%'
  },
  'interactive animal feeding': {
    en: 'Activity Praise: Highly rated by families for safe, direct contact experiences with giraffes and elephants.',
    th: 'คำชมกิจกรรม: ได้รับคำชมสูงมากจากกลุ่มครอบครัวในแง่การเปิดพื้นที่ให้อาหารฝูงยีราฟ แรด และนกยูงอย่างใกล้ชิดและปลอดภัย'
  },
  'กิจกรรมให้อาหารสัตว์อย่างใกล้ชิด': {
    en: 'Activity Praise: Highly rated by families for safe, direct contact experiences with giraffes and elephants.',
    th: 'คำชมกิจกรรม: ได้รับคำชมสูงมากจากกลุ่มครอบครัวในแง่การเปิดพื้นที่ให้อาหารฝูงยีราฟ แรด และนกยูงอย่างใกล้ชิดและปลอดภัย'
  },
  'standard golf cart rental': {
    en: 'Neutral Fact: Cart rentals operate via standard registration. Visitors find the booking track regular but necessary.',
    th: 'ข้อเท็จจริงทั่วไป: ระบบเช่ารถกอล์ฟขับชมสวนสัตว์เป็นไปตามเกณฑ์ลงทะเบียนปกติ นักท่องเที่ยวเห็นว่าเป็นเรื่องปกติแต่จำเป็นต้องเช่าเพื่อเดินทาง'
  },
  'การเช่ารถกอล์ฟระดับบริการทั่วไป': {
    en: 'Neutral Fact: Cart rentals operate via standard registration. Visitors find the booking track regular but necessary.',
    th: 'ข้อเท็จจริงทั่วไป: ระบบเช่ารถกอล์ฟขับชมสวนสัตว์เป็นไปตามเกณฑ์ลงทะเบียนปกติ นักท่องเที่ยวเห็นว่าเป็นเรื่องปกติแต่จำเป็นต้องเช่าเพื่อเดินทาง'
  },
  'long queues on holidays': {
    en: 'Friction Point: Text mining signals massive wait times for vehicle processing during weekend holiday gridlocks.',
    th: 'จุดติดขัด: ช่วงวันหยุดนักขัตฤกษ์มีปริมาณรถยนต์หนาแน่นมาก ทำให้เกิดแถวรอคิวจองรถกอล์ฟและการเคลื่อนตัวในสวนสัตว์ติดขัดยาวนาน'
  },
  'การรอคิวยาวนานในวันหยุด': {
    en: 'Friction Point: Text mining signals massive wait times for vehicle processing during weekend holiday gridlocks.',
    th: 'จุดติดขัด: ช่วงวันหยุดนักขัตฤกษ์มีปริมาณรถยนต์หนาแน่นมาก ทำให้เกิดแถวรอคิวจองรถกอล์ฟและการเคลื่อนตัวในสวนสัตว์ติดขัดยาวนาน'
  },
  'spacious natural enclosures': {
    en: 'Amenity Praise: Applauded by eco-conscious travelers for maintaining high animal welfare standards.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ได้รับคำชมเชยจากนักอนุรักษ์ธรรมชาติในแง่การจัดสภาพแวดล้อมส่วนจัดแสดงที่เปิดกว้างและดูแลสวัสดิภาพสัตว์ได้ดี'
  },
  'ส่วนจัดแสดงธรรมชาติที่กวางขวาง': {
    en: 'Amenity Praise: Applauded by eco-conscious travelers for maintaining high animal welfare standards.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ได้รับคำชมเชยจากนักอนุรักษ์ธรรมชาติในแง่การจัดสภาพแวดล้อมส่วนจัดแสดงที่เปิดกว้างและดูแลสวัสดิภาพสัตว์ได้ดี'
  },
  'hot weather walking routes': {
    en: 'Friction Point: Massive open areas require golf carts or vehicles due to heavy heat exhaustion during noon loops.',
    th: 'จุดติดขัด: ผืนป่ากว้างขวางมาก หากเลือกใช้วิธีเดินเท้าเปล่าในช่วงบ่าย อากาศแดดร้อนจัดอาจทำให้ร่างกายเพลียแดดได้ง่าย'
  },
  'เส้นทางการเดินชมมีอากาศร้อนจัด': {
    en: 'Friction Point: Massive open areas require golf carts or vehicles due to heavy heat exhaustion during noon loops.',
    th: 'จุดติดขัด: ผืนป่ากว้างขวางมาก หากเลือกใช้วิธีเดินเท้าเปล่าในช่วงบ่าย อากาศแดดร้อนจัดอาจทำให้ร่างกายเพลียแดดได้ง่าย'
  },
  'wonderful wildlife education': {
    en: 'Activity Praise: Informative signage and shows present valuable biodiversity learning for international students.',
    th: 'คำชมกิจกรรม: ป้ายแสดงข้อมูลการอนุรักษ์และรอบกิจกรรมวิชาการสัตว์ป่ามอบสาระความรู้ที่ดีเยี่ยมให้แก่เยาวชนและนักท่องเที่ยวต่างชาติ'
  },
  'การเรียนรู้ชีวิตสัตว์ป่าที่ยอดเยี่ยม': {
    en: 'Activity Praise: Informative signage and shows present valuable biodiversity learning for international students.',
    th: 'คำชมกิจกรรม: ป้ายแสดงข้อมูลการอนุรักษ์และรอบกิจกรรมวิชาการสัตว์ป่ามอบสาระความรู้ที่ดีเยี่ยมให้แก่เยาวชนและนักท่องเที่ยวต่างชาติ'
  },
  'limited shuttle buses': {
    en: 'Critical Infrastructure Issue: Waiting lines for internal public trams are heavily criticized during peak load hours.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: รถรางลากของสวนสัตว์มีปริมาณคิวรอคิวยาวเกินไปในช่วงเวลาเร่งด่วน ทำให้นักท่องเที่ยวบางส่วนรอนาน'
  },
  'รถบริการรับส่งภายในมีจำนวนจำกัด': {
    en: 'Critical Infrastructure Issue: Waiting lines for internal public trams are heavily criticized during peak load hours.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: รถรางลากของสวนสัตว์มีปริมาณคิวรอคิวยาวเกินไปในช่วงเวลาเร่งด่วน ทำให้นักท่องเที่ยวบางส่วนรอนาน'
  },

  // === Safari World ===
  'incredible drive-through safari': {
    en: 'Attraction Insight: Review analytics indicate top-tier ratings for the open enclosure allowing close visual contact with apex predators.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การขับรถเข้าส่องดูสิงโต เสือหมี ในโซนซาฟารีปาร์คเปิด ได้รับการรีวิวให้เป็นไฮไลท์อันดับหนึ่งที่น่าตื่นเต้นที่สุด'
  },
  'โซนขับรถชมสัตว์ป่าเปิดที่น่าตื่นตาตื่นใจ': {
    en: 'Attraction Insight: Review analytics indicate top-tier ratings for the open enclosure allowing close visual contact with apex predators.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การขับรถเข้าส่องดูสิงโต เสือหมี ในโซนซาฟารีปาร์คเปิด ได้รับการรีวิวให้เป็นไฮไลท์อันดับหนึ่งที่น่าตื่นเต้นที่สุด'
  },
  'world-class dolphin show': {
    en: 'Attraction Insight: Highly recommended across family travel blogs for exceptional choreography and animal welfare care.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การแสดงโลมาอัจฉริยะได้รับคะแนนชื่นชมสูงสุดในกลุ่มบล็อกเกอร์ทริปครอบครัวในแง่ความสนุกและการดูแลที่ดี'
  },
  'การแสดงปลาโลมามาตรฐานระดับโลก': {
    en: 'Attraction Insight: Highly recommended across family travel blogs for exceptional choreography and animal welfare care.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: การแสดงโลมาอัจฉริยะได้รับคะแนนชื่นชมสูงสุดในกลุ่มบล็อกเกอร์ทริปครอบครัวในแง่ความสนุกและการดูแลที่ดี'
  },
  'standard double pricing': {
    en: 'Neutral Comment: Foreign ticket counters follow localized agent rates. Most tourists accept this as a typical commercial policy.',
    th: 'ความคิดเห็นทั่วไป: ราคาขายตั๋วหน้างานของชาวต่างชาติเป็นระบบเรทสากล นักท่องเที่ยวส่วนใหญ่เข้าใจว่าเป็นกลยุทธ์พาณิชย์ของสวนสัตว์'
  },
  'การเก็บราคาตั๋วแบบสองมาตรฐานทั่วไป': {
    en: 'Neutral Comment: Foreign ticket counters follow localized agent rates. Most tourists accept this as a typical commercial policy.',
    th: 'ความคิดเห็นทั่วไป: ราคาขายตั๋วหน้างานของชาวต่างชาติเป็นระบบเรทสากล นักท่องเที่ยวส่วนใหญ่เข้าใจว่าเป็นกลยุทธ์พาณิชย์ของสวนสัตว์'
  },
  'extremely expensive food': {
    en: 'Amenity Issue: Severe negative clustering on strict policy banning external lunch boxes combined with high internal restaurant prices.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: มีกระแสบ่นลบหนาแน่นเรื่องกฎห้ามนำน้ำและอาหารจากภายนอกเข้า ประกอบกับราคาศูนย์อาหารด้านในที่แพงเกินควร'
  },
  'อาหารและน้ำดื่มด้านในราคาแพงมาก': {
    en: 'Amenity Issue: Severe negative clustering on strict policy banning external lunch boxes combined with high internal restaurant prices.',
    th: 'ปัญหาสิ่งอำนวยความสะดวก: มีกระแสบ่นลบหนาแน่นเรื่องกฎห้ามนำน้ำและอาหารจากภายนอกเข้า ประกอบกับราคาศูนย์อาหารด้านในที่แพงเกินควร'
  },
  'clean theme park facilities': {
    en: 'Amenity Praise: Walking zones, rest benches, and public restrooms are heavily commended for high-frequency cleaning schedules.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ลานเดินมารีนปาร์ค ม้านั่ง จุดพักผ่อนหลบแดด และห้องน้ำได้รับการทำความสะอาดดูแลได้ดีถี่ถ้วน'
  },
  'สิ่งอำนวยความสะดวกในธีมปาร์คสะอาดดี': {
    en: 'Amenity Praise: Walking zones, rest benches, and public restrooms are heavily commended for high-frequency cleaning schedules.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ลานเดินมารีนปาร์ค ม้านั่ง จุดพักผ่อนหลบแดด และห้องน้ำได้รับการทำความสะอาดดูแลได้ดีถี่ถ้วน'
  },
  'heavy weekend crowds': {
    en: 'Friction Point: Massive school excursions and tour groups trigger long queue blocks near main show arenas around 11 AM.',
    th: 'จุดติดขัด: ขบวนทัศนศึกษาของโรงเรียนและคณะทัวร์ต่างชาติทำให้บริเวณหน้าอาคารจัดการแสดงนกและสิงโตทะเลแออัดช่วงสาย'
  },
  'ฝูงชนหนาแน่นมากในช่วงวันหยุด': {
    en: 'Friction Point: Massive school excursions and tour groups trigger long queue blocks near main show arenas around 11 AM.',
    th: 'จุดติดขัด: ขบวนทัศนศึกษาของโรงเรียนและคณะทัวร์ต่างชาติทำให้บริเวณหน้าอาคารจัดการแสดงนกและสิงโตทะเลแออัดช่วงสาย'
  },
  'amazing giraffe feeding': {
    en: 'Activity Praise: Identified as an unmatched interactive encounter, allowing continuous feeding from an elevated wooden terrace.',
    th: 'คำชมกิจกรรม: กิจกรรมซื้อกล้วยป้อนอาหารฝูงยีราฟบนระเบียงศาลาไม้สูงยาว สร้างความตื่นเต้นและประทับใจแก่เด็กๆ สูงสุด'
  },
  'กิจกรรมป้อนอาหารฝูงยีราฟที่น่าประทับใจ': {
    en: 'Activity Praise: Identified as an unmatched interactive encounter, allowing continuous feeding from an elevated wooden terrace.',
    th: 'คำชมกิจกรรม: กิจกรรมซื้อกล้วยป้อนอาหารฝูงยีราฟบนระเบียงศาลาไม้สูงยาว สร้างความตื่นเต้นและประทับใจแก่เด็กๆ สูงสุด'
  },
  'exhausting walking loops': {
    en: 'Activity Warning: Sprawling Marine Park walkways under tropical humidity induce swift physical fatigue; umbrella use encouraged.',
    th: 'คำเตือนกิจกรรม: แผนผังทางเดินค่อนข้างกว้างไกลมากท่ามกลางอากาศร้อนชื้นแนะให้เตรียมร่ม หมวก หรือรถเข็นเด็กมาด้วยจะดีที่สุด'
  },
  'เส้นทางการเดินชมกว้างขวางจนเหนื่อยล้า': {
    en: 'Activity Warning: Sprawling Marine Park walkways under tropical humidity induce swift physical fatigue; umbrella use encouraged.',
    th: 'คำเตือนกิจกรรม: แผนผังทางเดินค่อนข้างกว้างไกลมากท่ามกลางอากาศร้อนชื้นแนะให้เตรียมร่ม หมวก หรือรถเข็นเด็กมาด้วยจะดีที่สุด'
  },

  // === Haad Rin ===
  'vibrant party atmosphere': {
    en: 'Attraction Insight: Highly rated by international backpackers for event spacing and electronic music subcultures.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: แหล่งท่องเที่ยวชื่อดังที่สายแบ็คแพ็คเกอร์ชื่นชอบในแง่การจัดระบบความบันเทิงและดนตรีแดนซ์ยามค่ำคืน'
  },
  'บรรยากาศงานปาร์ตี้ที่คึกคักเต็มไปด้วยพลัง': {
    en: 'Attraction Insight: Highly rated by international backpackers for event spacing and electronic music subcultures.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: แหล่งท่องเที่ยวชื่อดังที่สายแบ็คแพ็คเกอร์ชื่นชอบในแง่การจัดระบบความบันเทิงและดนตรีแดนซ์ยามค่ำคืน'
  },
  'beautiful morning shoreline': {
    en: 'Attraction Insight: Reviews confirm the beach returns to a highly scenic, pristine state 48 hours post-event.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ทัศนียภาพชายหาดยามเช้าวันธรรมดามีความสวยงาม ทรายนุ่ม ทะเลสีฟ้าสดใสหากไม่มีการจัดงานปาร์ตี้'
  },
  'แนวชายหาดยามเช้าที่สวยงามสงบ': {
    en: 'Attraction Insight: Reviews confirm the beach returns to a highly scenic, pristine state 48 hours post-event.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: ทัศนียภาพชายหาดยามเช้าวันธรรมดามีความสวยงาม ทรายนุ่ม ทะเลสีฟ้าสดใสหากไม่มีการจัดงานปาร์ตี้'
  },
  'standard beach access': {
    en: 'Neutral Data: Public walking entry pathways are open normally. No entry premiums are recorded for daytime walkers.',
    th: 'ข้อเท็จจริงทั่วไป: ทางเดินเท้าเข้าสู่ตัวหาดริ้นเปิดสาธารณะเป็นปกติ ไม่มีการเก็บค่าธรรมเนียมในช่วงเวลาปกติกลางวัน'
  },
  'ทางเข้าถึงพื้นที่ชายหาดระดับทั่วไป': {
    en: 'Neutral Data: Public walking entry pathways are open normally. No entry premiums are recorded for daytime walkers.',
    th: 'ข้อเท็จจริงทั่วไป: ทางเดินเท้าเข้าสู่ตัวหาดริ้นเปิดสาธารณะเป็นปกติ ไม่มีการเก็บค่าธรรมเนียมในช่วงเวลาปกติกลางวัน'
  },
  'massive plastic trash': {
    en: 'Critical Friction: Heavy environmental alarm. Text mining registers extreme disapproval of discarded cups and straws on the tide line.',
    th: 'จุดติดขัดวิกฤต: สัญญาณเตือนภัยสิ่งแวดล้อมรุนแรง รีวิวส่วนใหญ่ร้องเรียนเรื่องเศษแก้วและขยะพลาสติกเกลื่อนหาดหลังคืนฟูลมูน'
  },
  'ขยะพลาสติกตกค้างจำนวนมหาศาล': {
    en: 'Critical Friction: Heavy environmental alarm. Text mining registers extreme disapproval of discarded cups and straws on the tide line.',
    th: 'จุดติดขัดวิกฤต: สัญญาณเตือนภัยสิ่งแวดล้อมรุนแรง รีวิวส่วนใหญ่ร้องเรียนเรื่องเศษแก้วและขยะพลาสติกเกลื่อนหาดหลังคืนฟูลมูน'
  },
  'extremely noisy music': {
    en: 'Friction Point: High negative correlation with hotel sleep quality values. Sound bleed affects non-party visitors directly.',
    th: 'จุดติดขัด: เสียงลำโพงเบสเปิดดังสนั่นอึกทึกจากบาร์ริมหาดทะลุเข้าห้องพัก รบกวนการนอนของผู้ที่ต้องการพักผ่อนอย่างรุนแรง'
  },
  'เสียงดนตรีอึกทึกครึกโครมรบกวนการนอน': {
    en: 'Friction Point: High negative correlation with hotel sleep quality values. Sound bleed affects non-party visitors directly.',
    th: 'จุดติดขัด: เสียงลำโพงเบสเปิดดังสนั่นอึกทึกจากบาร์ริมหาดทะลุเข้าห้องพัก รบกวนการนอนของผู้ที่ต้องการพักผ่อนอย่างรุนแรง'
  },
  'overpriced drink buckets': {
    en: 'Amenity Friction: Repetitive warnings noting high pricing consistency and variable quality markers across storefront vendors.',
    th: 'ข้อขัดแย้งสิ่งอำนวยความสะดวก: มีคำเตือนหนาแน่นเรื่องเครื่องดื่มแอลกอฮอล์แบบถังผสมตั้งราคาแพงเกินจริงและคุณภาพเหล้าไม่ได้มาตรฐาน'
  },
  'ถังเครื่องดื่มแอลกอฮอล์ราคาแพงเกินจริง': {
    en: 'Amenity Friction: Repetitive warnings noting high pricing consistency and variable quality markers across storefront vendors.',
    th: 'ข้อขัดแย้งสิ่งอำนวยความสะดวก: มีคำเตือนหนาแน่นเรื่องเครื่องดื่มแอลกอฮอล์แบบถังผสมตั้งราคาแพงเกินจริงและคุณภาพเหล้าไม่ได้มาตรฐาน'
  },
  'exciting fire shows': {
    en: 'Activity Praise: Performance precision by local artists generates outstanding visual applause markers.',
    th: 'คำชมกิจกรรม: โชว์ควงกระบองไฟและพ่นไฟริมชายหาดจากทีมงานท้องถิ่นมีความตื่นตาตื่นใจและได้รับคำชมล้นหลาม'
  },
  'การแสดงควงกระบองไฟที่ตื่นตาตื่นใจ': {
    en: 'Activity Praise: Performance precision by local artists generates outstanding visual applause markers.',
    th: 'คำชมกิจกรรม: โชว์ควงกระบองไฟและพ่นไฟริมชายหาดจากทีมงานท้องถิ่นมีความตื่นตาตื่นใจและได้รับคำชมล้นหลาม'
  },
  'aggressive drunk tourists': {
    en: 'Safety Friction: Lexicon models flag social vulnerability metrics due to minor thefts and public misconduct during peak intoxication hours.',
    th: 'ข้อขัดแย้งความปลอดภัย: พฤติกรรมโวยวาย ขาดสติ และลวนลามของนักท่องเที่ยวที่มึนเมาจัดในช่วงดึก สร้างความรู้สึกไม่ปลอดภัย'
  },
  'พฤติกรรมก้าวร้าวของนักท่องเที่ยวที่มึนเมา': {
    en: 'Safety Friction: Lexicon models flag social vulnerability metrics due to minor thefts and public misconduct during peak intoxication hours.',
    th: 'ข้อขัดแย้งความปลอดภัย: พฤติกรรมโวยวาย ขาดสติ และลวนลามของนักท่องเที่ยวที่มึนเมาจัดในช่วงดึก สร้างความรู้สึกไม่ปลอดภัย'
  },

  // === Damnoen Saduak ===
  'traditional canal lifestyle': {
    en: 'Attraction Insight: Historical marketing vectors pull initial curiosity, though long-term validity ranks low due to heavy commercialization.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: มีภาพลักษณ์การท่องเที่ยววิถีชีวิตชาวคลองขายของบนเรือตามสไตล์ไทยโบราณที่ดึงดูดนักท่องเที่ยวต่างชาติได้ดี'
  },
  'ภาพจำวิถีชีวิตริมคลองแบบดั้งเดิม': {
    en: 'Attraction Insight: Historical marketing vectors pull initial curiosity, though long-term validity ranks low due to heavy commercialization.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: มีภาพลักษณ์การท่องเที่ยววิถีชีวิตชาวคลองขายของบนเรือตามสไตล์ไทยโบราณที่ดึงดูดนักท่องเที่ยวต่างชาติได้ดี'
  },
  'colorful photo opportunities': {
    en: 'Attraction Insight: Visual framing scores remain positive for bright fruit boats and structural rustic canal backdrops.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: เป็นจุดที่ถ่ายรูปออกมาได้สีสันสวยงามจากเรือพายขายผลไม้และวิวกระท่อมไม้ริมคลองแบบไทยๆ'
  },
  'โอกาสในการถ่ายภาพสีสันวิถีคลองที่สวยงาม': {
    en: 'Attraction Insight: Visual framing scores remain positive for bright fruit boats and structural rustic canal backdrops.',
    th: 'ข้อมูลสิ่งดึงดูดใจ: เป็นจุดที่ถ่ายรูปออกมาได้สีสันสวยงามจากเรือพายขายผลไม้และวิวกระท่อมไม้ริมคลองแบบไทยๆ'
  },
  'standard souvenir items': {
    en: 'Neutral Observation: Stalls display generic Thai crafts seen across major city night markets. Prices require heavy negotiation.',
    th: 'ข้อสังเกตทั่วไป: สินค้าของฝากตามซุ้มริมน้ำเป็นงานฝีมือทั่วไปเหมือนไนท์มาร์เก็ตอื่น จำเป็นต้องอาศัยทักษะการต่อรองราคาหนักๆ'
  },
  'สินค้าของฝากที่ระลึกรูปแบบทั่วไป': {
    en: 'Neutral Observation: Stalls display generic Thai crafts seen across major city night markets. Prices require heavy negotiation.',
    th: 'ข้อสังเกตทั่วไป: สินค้าของฝากตามซุ้มริมน้ำเป็นงานฝีมือทั่วไปเหมือนไนท์มาร์เก็ตอื่น จำเป็นต้องอาศัยทักษะการต่อรองราคาหนักๆ'
  },
  'exorbitant boat rentals': {
    en: 'CRITICAL friction alert: Systematic price price-gouging (1,500-2,000 THB) acts as the primary driver of severe negative metrics.',
    th: 'ข้อขัดแย้งวิกฤต: เป็นจุดโดนร้องเรียน (Scam) หนักที่สุดเรื่องมาเฟียท่าเรือโก่งราคาเช่าเรือพายสูงถึง 1,500-2,000 บาทต่อชั่วโมง'
  },
  'ค่าเช่าเรือพายราคาขูดรีดแพงมหาโหด': {
    en: 'CRITICAL friction alert: Systematic price price-gouging (1,500-2,000 THB) acts as the primary driver of severe negative metrics.',
    th: 'ข้อขัดแย้งวิกฤต: เป็นจุดโดนร้องเรียน (Scam) หนักที่สุดเรื่องมาเฟียท่าเรือโก่งราคาเช่าเรือพายสูงถึง 1,500-2,000 บาทต่อชั่วโมง'
  },
  'aggressive scam vendors': {
    en: 'Critical Friction: Tourists express high anxiety levels due to pushy, forced boat detours into highly marked-up souvenir docks.',
    th: 'จุดติดขัดวิกฤต: พ่อค้าแม่ค้าและคนพายเรือบางส่วนแสดงพฤติกรรมก้าวร้าวตื๊อขายของ ยื้อเรือบีบบังคับให้นักท่องเที่ยวต้องซื้อสินค้า'
  },
  'ผู้ค้าบางส่วนตื๊อขายของแกมบังคับและหลอกลวง': {
    en: 'Critical Friction: Tourists express high anxiety levels due to pushy, forced boat detours into highly marked-up souvenir docks.',
    th: 'จุดติดขัดวิกฤต: พ่อค้าแม่ค้าและคนพายเรือบางส่วนแสดงพฤติกรรมก้าวร้าวตื๊อขายของ ยื้อเรือบีบบังคับให้นักท่องเที่ยวต้องซื้อสินค้า'
  },
  'intense canal boat traffic': {
    en: 'Infrastructure Deficit: Motorized longtails block paddling routes, inducing heavy aquatic gridlocks and high passenger stress.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: คลองค่อนข้างแคบ เมื่อเรือหางยาวติดเครื่องยนต์วิ่งมารวมกันทำจราจรในน้ำติดขัดระเนระนาดและสร้างความเครียด'
  },
  'การจราจรทางเรือในคลองติดขัดวุ่นวาย': {
    en: 'Infrastructure Deficit: Motorized longtails block paddling routes, inducing heavy aquatic gridlocks and high passenger stress.',
    th: 'ปัญหาโครงสร้างพื้นฐาน: คลองค่อนข้างแคบ เมื่อเรือหางยาวติดเครื่องยนต์วิ่งมารวมกันทำจราจรในน้ำติดขัดระเนระนาดและสร้างความเครียด'
  },
  'tasty local boat noodles': {
    en: 'Amenity Praise: Small authentic vendors preparing traditional dishes on wooden longtails maintain minor positive core validation.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ก๋วยเตี๋ยวเรือต้มยำแบบพายเรือทำสดๆ รสชาติเข้มข้นอร่อย ได้บรรยากาศดั้งเดิมและราคาเป็นมิตร'
  },
  'ก๋วยเตี๋ยวเรือท้องถิ่นรสชาติดี': {
    en: 'Amenity Praise: Small authentic vendors preparing traditional dishes on wooden longtails maintain minor positive core validation.',
    th: 'คำชมสิ่งอำนวยความสะดวก: ก๋วยเตี๋ยวเรือต้มยำแบบพายเรือทำสดๆ รสชาติเข้มข้นอร่อย ได้บรรยากาศดั้งเดิมและราคาเป็นมิตร'
  },
  'unpleasant diesel fumes': {
    en: 'Environmental issue: Heavy negative tagging on toxic air emissions and dark water pollution from localized boat engines.',
    th: 'ปัญหาสิ่งแวดล้อม: เรือติดเครื่องยนต์ยนต์ปล่อยกลิ่นควันไอเสียดีเซลเหม็นคลุ้งทั่วลำคลอง และมีคราบน้ำมันเครื่องลอยทำน้ำเน่าเสีย'
  },
  'กลิ่นควันไอเสียเรือยนต์ที่เหม็นอึดอัด': {
    en: 'Environmental issue: Heavy negative tagging on toxic air emissions and dark water pollution from localized boat engines.',
    th: 'ปัญหาสิ่งแวดล้อม: เรือติดเครื่องยนต์ยนต์ปล่อยกลิ่นควันไอเสียดีเซลเหม็นคลุ้งทั่วลำคลอง และมีคราบน้ำมันเครื่องลอยทำน้ำเน่าเสีย'
  }
};

export const FILTER_TAGS = [
  { value: 'all',     label: 'All',               labelTh: 'ทั้งหมด' },
  { value: 'BKK',     label: 'Bangkok',           labelTh: 'กรุงเทพฯ' },
  { value: 'north',   label: 'Northern Thailand', labelTh: 'ภาคเหนือ' },
  { value: 'south',   label: 'Southern Thailand', labelTh: 'ภาคใต้' },
  { value: 'central', label: 'Central Thailand',  labelTh: 'ภาคกลาง' },
  { value: 'east',    label: 'Eastern Thailand',  labelTh: 'ภาคอีสาน/ตะวันออก' },
  { value: 'nature',  label: 'Nature',            labelTh: 'ธรรมชาติ' },
  { value: 'culture', label: 'Culture',           labelTh: 'วัฒนธรรม' },
  { value: 'beach',   label: 'Beach',             labelTh: 'ชายหาด / เกาะ' },
  { value: 'zoo',     label: 'Zoo / Aquarium',    labelTh: 'สวนสัตว์ / อควาเรียม' }
];

export function getSentimentLabel(pos, lang = 'en') {
  if (lang === 'th') {
    if (pos >= 85) return 'ดีเยี่ยม';
    if (pos >= 70) return 'ดีมาก';
    if (pos >= 55) return 'ปะปนกัน';
    return 'ควรปรับปรุง';
  } else {
    if (pos >= 85) return 'Excellent';
    if (pos >= 70) return 'Good';
    if (pos >= 55) return 'Mixed';
    return 'Needs work';
  }
}

export function getSentimentClass(pos) {
  if (pos >= 85) return 'excellent';
  if (pos >= 70) return 'good';
  if (pos >= 55) return 'mixed';
  return 'warn';
}