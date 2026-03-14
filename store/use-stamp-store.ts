import { create } from "zustand";

// Type definitions for the stamp map application state
interface StampItem {
  id: string;
  locationId: string;
  locationName: string;
  image: string;
  description: string;
  collectedAt: string;
}

interface MapOption {
  id: string;
  name: string;
  region: string;
}

interface StampStore {
  // Stamp progress
  collectedStamps: StampItem[];
  totalStamps: number;

  // Map selection
  selectedMap: MapOption;
  availableMaps: MapOption[];

  // UI state
  activeTab: string;

  // Actions
  setSelectedMap: (map: MapOption) => void;
  setActiveTab: (tab: string) => void;
  addStamp: (stamp: StampItem) => void;
}

// Available map options
const defaultMaps: MapOption[] = [
  { id: "jeju", name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan", region: "East Asia" },
  { id: "japan", name: "Japan", region: "East Asia" },
  { id: "thailand", name: "Thailand", region: "Southeast Asia" },
  { id: "singapore", name: "Singapore", region: "Southeast Asia" },
];

// Sample collected stamps for demo
const sampleStamps: StampItem[] = [
  {
    id: "s1",
    locationId: "loc1",
    locationName: "Hallasan Mountain",
    image: "/stamps/hallasan.jpg",
    description: "The highest peak in South Korea",
    collectedAt: "2025-12-15",
  },
  {
    id: "s2",
    locationId: "loc2",
    locationName: "Seongsan Ilchulbong",
    image: "/stamps/seongsan.jpg",
    description: "UNESCO World Heritage sunrise peak",
    collectedAt: "2025-12-16",
  },
  {
    id: "s3",
    locationId: "loc3",
    locationName: "Manjanggul Cave",
    image: "/stamps/manjanggul.jpg",
    description: "One of the finest lava tunnels in the world",
    collectedAt: "2025-12-17",
  },
];

export const useStampStore = create<StampStore>((set) => ({
  // Initial stamp progress (demo data)
  collectedStamps: sampleStamps,
  totalStamps: 25,

  // Default map is Jeju Island
  selectedMap: defaultMaps[0],
  availableMaps: defaultMaps,

  // Default active navigation tab
  activeTab: "map",

  // Actions
  setSelectedMap: (map) => set({ selectedMap: map }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  addStamp: (stamp) =>
    set((state) => ({
      collectedStamps: [...state.collectedStamps, stamp],
    })),
}));
