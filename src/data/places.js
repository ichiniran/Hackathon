export const PLACES_DATA = [
  {
    id: 'phangnga',
    name: 'Phang Nga Bay',
    nameEn: 'Phang Nga Bay',
    loc: 'Phang Nga',
    region: 'south',
    type: 'nature',
    pos: 91, neu: 7, neg: 2,
    reviews: 876,
    emoji: '🌊',
    img: 'https://www.khaosok.com/wp-content/uploads/2023/11/Phang-Nga-Bay-e1700882609161-845x684.jpeg',
    kws: [
      { w: 'breathtaking', s: 'pos' },
      { w: 'kayaking', s: 'pos' },
      { w: 'limestone cliffs', s: 'pos' },
      { w: 'boat tour', s: 'pos' },
    ],
    ai: 'The highest sentiment score in the database. Visitors particularly love the sea and limestone cliffs, with almost no negative reviews.',
  },
  {
    id: 'doiinthanon',
    name: 'Doi Inthanon',
    nameEn: 'Doi Inthanon',
    loc: 'Chiang Mai',
    region: 'north',
    type: 'nature',
    pos: 88, neu: 9, neg: 3,
    reviews: 934,
    emoji: '🏔',
    img: 'https://www.easydaythailand.com/wp-content/uploads/2018/07/Doi-Inthanon-.jpg',
    kws: [
      { w: 'highest peak', s: 'pos' },
      { w: 'cool weather', s: 'pos' },
      { w: 'misty', s: 'pos' },
      { w: 'long drive', s: 'neg' },
    ],
    ai: 'Overwhelmingly positive reviews. Visitors enjoy the cool weather and misty atmosphere, while only a few mention the long travel distance.',
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya Historical Park',
    nameEn: 'Ayutthaya',
    loc: 'Ayutthaya',
    region: 'central',
    type: 'culture',
    pos: 88, neu: 9, neg: 3,
    reviews: 2156,
    emoji: '🏛',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4qCr4VRlDlQ5q_mAU1s0AeYyeMRishCzmA&s',
    kws: [
      { w: 'UNESCO', s: 'pos' },
      { w: 'ancient temples', s: 'pos' },
      { w: 'well preserved', s: 'pos' },
      { w: 'hot weather', s: 'neg' },
    ],
    ai: 'A UNESCO World Heritage Site highly praised by visitors. Early morning or evening visits are recommended due to the heat.',
  },
  {
    id: 'grandpalace',
    name: 'Wat Phra Kaew',
    nameEn: 'Wat Phra Kaew',
    loc: 'Bangkok',
    region: 'central',
    type: 'culture',
    pos: 82, neu: 12, neg: 6,
    reviews: 3812,
    emoji: '🛕',
    img: 'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/62/2024/08/29074619/Wat-Phra-Kaew.jpg',
    kws: [
      { w: 'magnificent', s: 'pos' },
      { w: 'must visit', s: 'pos' },
      { w: 'dress code', s: 'neg' },
      { w: 'crowds', s: 'neg' },
    ],
    ai: 'One of Bangkok’s top attractions. Visitors are impressed by its beauty, though crowds and dress code requirements are common concerns.',
  },
  {
    id: 'khaoyai',
    name: 'Khao Yai National Park',
    nameEn: 'Khao Yai National Park',
    loc: 'Nakhon Ratchasima',
    region: 'east',
    type: 'nature',
    pos: 76, neu: 17, neg: 7,
    reviews: 1247,
    emoji: '🌿',
    img: 'https://www.pelago.com/img/products/TH-Thailand/khao-yai-national-park-tour/0713-1603_khao-yai-national-park-tour-thailand-pelago-xlarge.jpg',
    kws: [
      { w: 'wildlife', s: 'pos' },
      { w: 'elephants', s: 'pos' },
      { w: 'stunning', s: 'pos' },
      { w: 'crowded', s: 'neg' },
    ],
    ai: 'Wildlife diversity is the main highlight. The most common concern is overcrowding during holidays.',
  },
  {
    id: 'samui',
    name: 'Koh Samui',
    nameEn: 'Koh Samui',
    loc: 'Surat Thani',
    region: 'south',
    type: 'beach',
    pos: 74, neu: 16, neg: 10,
    reviews: 1893,
    emoji: '🏖',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
    kws: [
      { w: 'beautiful beach', s: 'pos' },
      { w: 'luxury resort', s: 'pos' },
      { w: 'expensive', s: 'neg' },
      { w: 'transport', s: 'neg' },
    ],
    ai: 'Praised for its beaches and luxury resorts, though visitors often mention high costs and inconvenient transportation.',
  },
  {
    id: 'phuket',
    name: 'Patong Beach',
    nameEn: 'Patong Beach',
    loc: 'Phuket',
    region: 'south',
    type: 'beach',
    pos: 64, neu: 18, neg: 18,
    reviews: 2341,
    emoji: '🌴',
    img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80',
    kws: [
      { w: 'nightlife', s: 'pos' },
      { w: 'beach', s: 'pos' },
      { w: 'tourist trap', s: 'neg' },
      { w: 'overpriced', s: 'neg' },
    ],
    ai: 'Opinions are divided. Visitors who enjoy nightlife love it, while others feel it is overcrowded and overpriced.',
  },
  {
    id: 'chiangrai',
    name: 'White Temple',
    nameEn: 'White Temple',
    loc: 'Chiang Rai',
    region: 'north',
    type: 'culture',
    pos: 89, neu: 8, neg: 3,
    reviews: 1102,
    emoji: '⛩',
    img: 'https://nomadicated.com/wp-content/uploads/2023/02/White-Temple-Chiang-Rai-7.jpg',
    kws: [
      { w: 'stunning architecture', s: 'pos' },
      { w: 'unique', s: 'pos' },
      { w: 'white temple', s: 'pos' },
      { w: 'parking', s: 'neg' },
    ],
    ai: 'Its unique architecture receives outstanding praise. Visitors are impressed by both its beauty and originality.',
  },

];
export const FILTER_TAGS = [
  { value: 'all', label: 'All' },
  { value: 'north', label: 'Northern Thailand' },
  { value: 'south', label: 'Southern Thailand' },
  { value: 'beach', label: 'Beach' },
  { value: 'nature', label: 'Nature' },
  { value: 'culture', label: 'Culture' },
];

export function getSentimentLabel(pos) {
  if (pos >= 85) return 'Excellent';
  if (pos >= 70) return 'Good';
  if (pos >= 55) return 'Mixed';
  return 'Needs work';
}

export function getSentimentClass(pos) {
  if (pos >= 85) return 'excellent';
  if (pos >= 70) return 'good';
  if (pos >= 55) return 'mixed';
  return 'warn';
}
