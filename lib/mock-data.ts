// Mock data for the StampMap application
// Edit this file to change the data displayed in the app

export const STAMP_BOOKS = [
  { id: "jeju-1", country: "Jeju Island", region: "South Korea", bookNumber: 1, stampsCollected: 3, totalStamps: 25, lastStampDate: "2025-12-17" },
  { id: "taiwan-1", country: "Taiwan", region: "East Asia", bookNumber: 1, stampsCollected: 8, totalStamps: 20, lastStampDate: "2025-11-24" },
  { id: "japan-1", country: "Japan", region: "East Asia", bookNumber: 1, stampsCollected: 0, totalStamps: 30, lastStampDate: "" },
];

export const AVAILABLE_COUNTRIES = [
  { id: "jeju", name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan", region: "East Asia" },
  { id: "japan", name: "Japan", region: "East Asia" },
  { id: "thailand", name: "Thailand", region: "Southeast Asia" },
];

export const STAMP_PAGES = [
  {
    id: "s1",
    locationName: "Geumryongsa",
    koreanName: "금룡사",
    description: "Geumryongsa Temple, located in Gimnyeong-ri, eastern Jeju Island, is a natural temple where the harmonious harmony of the blue dragon and yellow dragon, formed by the intertwining of rocky outcrops and pine trees, creates a harmonious landscape. Since 2010.",
    stampDate: "2024-01-15",
    stamped: true,
    stampImage: "true"
  },
  {
    id: "s2",
    locationName: "Seongsan Ilchulbong",
    koreanName: "성산 일출봉",
    description: "UNESCO World Heritage sunrise peak on Jeju's eastern shore. A tuff cone formed by hydrovolcanic eruptions.",
    stampDate: "2024-01-16",
    stamped: true,
    stampImage: "true"
  },
  {
    id: "s3",
    locationName: "Manjanggul Cave",
    koreanName: "만장굴",
    description: "One of the finest lava tunnels in the world, stretching 7.4km underground.",
    stampDate: "",
    stamped: false,
  },
];

export const LOCATIONS = [
  {
    id: "1",
    name: "Geumryongsa Temple",
    koreanName: "금룡사",
    description: "A natural temple on Jeju Island featuring a harmonious landscape formed by rocky outcrops and pine trees. Known for the legend of the blue and yellow dragons.",
    rating: 4.8,
    reviews: 124,
    distance: "2.4 km",
    openTime: "06:00 AM - 06:00 PM",
    collected: true,
  },
  {
    id: "2",
    name: "Seongsan Ilchulbong",
    koreanName: "성산 일출봉",
    description: "A spectacular tuff cone formed by hydrovolcanic eruptions upon a shallow seabed about 5 thousand years ago. Famous for its breathtaking sunrise views.",
    rating: 4.9,
    reviews: 850,
    distance: "15 km",
    openTime: "07:00 AM - 08:00 PM",
    collected: true,
  }
];

export const SOUVENIRS = [
  {
    id: "s1",
    name: "Jeju Orange Pin",
    emoji: "🍊",
    stampsRequired: 5,
    stock: 24,
    color: "bg-orange-100",
  },
  {
    id: "s2",
    name: "Dol Hareubang",
    emoji: "🗿",
    stampsRequired: 10,
    stock: 5,
    color: "bg-slate-200",
  },
  {
    id: "s3",
    name: "Abalone Shell",
    emoji: "🐚",
    stampsRequired: 15,
    stock: 0,
    color: "bg-blue-100",
  },
  {
    id: "s4",
    name: "Black Pork Plush",
    emoji: "🐷",
    stampsRequired: 20,
    stock: 12,
    color: "bg-pink-100",
  },
];
