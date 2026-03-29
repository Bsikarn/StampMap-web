import { create } from "zustand";

// Type definitions for the stamp map application state
export interface StampItem {
  id: string;
  locationId: string;
  locationName: string;
  image: string;
  description: string;
  collectedAt: string;
}

export interface MapOption {
  id: string;
  name: string;
  region: string;
}

export interface StampStore {
  // Stamp progress data
  collectedStamps: StampItem[];
  totalStamps: number;

  // Map selection configurations
  selectedMap: MapOption;
  availableMaps: MapOption[];

  // Navigation UI state
  activeTab: string;

  // State mutation actions
  setSelectedMap: (map: MapOption) => void;
  setActiveTab: (tab: string) => void;
  addStamp: (stamp: StampItem) => void;
}

// Available map options acting as database seed mocks
const defaultMaps: MapOption[] = [
  { id: "jeju", name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan", region: "East Asia" },
  { id: "japan", name: "Japan", region: "East Asia" },
  { id: "thailand", name: "Thailand", region: "Southeast Asia" },
  { id: "singapore", name: "Singapore", region: "Southeast Asia" },
];

// Sample collected stamps for demo purposes
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

/**
 * Global Zustand Store for Stamp Progress and Map Data
 * 
 * Uses Zustand for lightweight, unopinionated state management.
 * This acts as the single source of truth for map selection and collected stamps.
 */
export const useStampStore = create<StampStore>((set) => ({
  // Initialize state with demo data
  collectedStamps: sampleStamps,
  totalStamps: 25,

  // Default regional map setup
  selectedMap: defaultMaps[0],
  availableMaps: defaultMaps,

  // Controls the globally active BottomNav tab
  activeTab: "map",

  // Action: Switch the active map region
  setSelectedMap: (map) => set({ selectedMap: map }),
  
  // Action: Switch the active bottom bar tab
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Action: Collect a new stamp (ensures immutability by creating a new array reference)
  addStamp: (stamp) =>
    set((state) => ({
      collectedStamps: [...state.collectedStamps, stamp],
    })),
}));
