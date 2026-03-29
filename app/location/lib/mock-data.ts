export const locationData = {
  id: "1",
  name: "Geumryongsa Temple",
  koreanName: "금룡사",
  description: "A natural temple on Jeju Island featuring a harmonious landscape formed by rocky outcrops and pine trees. Known for the legend of the blue and yellow dragons.",
  rating: 4.8,
  reviewsCount: 124,
  distance: "2.4 km",
  openTime: "06:00 AM - 06:00 PM",
  collected: true,
};

export interface ReviewData {
  id: number;
  user: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export const locationReviews: ReviewData[] = [
  { id: 1, user: "Alice K.", avatar: "AK", avatarColor: "bg-violet-500", rating: 5, date: "2 days ago", comment: "Absolutely breathtaking views! The hike was totally worth it.", likes: 12 },
  { id: 2, user: "Taro M.", avatar: "TM", avatarColor: "bg-emerald-500", rating: 4, date: "1 week ago", comment: "Beautiful scenery and well-maintained trails.", likes: 8 },
];
