import { create } from "zustand";
import type { MapPinData } from "@/components/map/map-pins";

// Type definitions for the stamp map application state
export interface StampItem {
  id: string;
  locationId: string;
  locationName: string;
  image: string;
  description: string;
  collectedAt: string;
}

export interface SouvenirItem {
  id: string;
  name: string;
  image: string;
  stampsRequired: number;
  inStock: boolean;
}

export interface MapOption {
  id: string;
  name: string;
}

export interface StampStore {
  // Auth
  userId: string | null;
  
  // Map locations from API
  locations: MapPinData[];
  isLoadingLocations: boolean;

  // Souvenirs from API
  souvenirs: SouvenirItem[];
  isLoadingSouvenirs: boolean;

  // Stamp progress data
  collectedStamps: StampItem[];
  totalStamps: number;

  // Map selection configurations
  selectedMap: MapOption;
  availableMaps: MapOption[];
  userBooks: MapOption[];
  isLoadingBooks: boolean;

  // Navigation UI state
  activeTab: string;

  // State mutation actions
  setUserId: (id: string | null) => void;
  setSelectedMap: (map: MapOption) => void;
  setActiveTab: (tab: string) => void;
  addStamp: (stamp: StampItem) => void;
  fetchAvailableMaps: () => Promise<void>;
  fetchUserBooks: () => Promise<void>;
  addUserBook: (zoneId: string) => Promise<void>;
  deleteUserBook: (zoneId: string) => Promise<void>;
  fetchLocations: (zoneName?: string) => Promise<void>;
  fetchSouvenirs: () => Promise<void>;
  fetchStamps: (zoneName?: string) => Promise<void>;
}

// Available map options acting as database seed mocks
const defaultMaps: MapOption[] = [
  { id: "jeju", name: "Jeju Island" },
  { id: "thailand", name: "Thailand" },
];

// Removed MOCK_USER_ID as we use Supabase Auth now

/**
 * Global Zustand Store for Stamp Progress and Map Data
 * 
 * Uses Zustand for lightweight, unopinionated state management.
 * This acts as the single source of truth for map selection and collected stamps.
 */
export const useStampStore = create<StampStore>((set, get) => ({
  // Auth
  userId: null,

  // Map locations
  locations: [],
  isLoadingLocations: false,

  // Souvenirs
  souvenirs: [],
  isLoadingSouvenirs: false,

  // Initialize state
  collectedStamps: [],
  totalStamps: 0,

  // Default regional map setup
  selectedMap: defaultMaps[0],
  availableMaps: defaultMaps,
  userBooks: [],
  isLoadingBooks: false,

  // Controls the globally active BottomNav tab
  activeTab: "map",

  // Action: Set Auth user ID
  setUserId: (id) => set({ userId: id }),

  // Action: Switch the active map region
  setSelectedMap: (map) => set({ selectedMap: map }),
  
  // Action: Switch the active bottom bar tab
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Action: Collect a new stamp (ensures immutability by creating a new array reference)
  addStamp: (stamp) =>
    set((state) => ({
      collectedStamps: [...state.collectedStamps, stamp],
      locations: state.locations.map(loc => 
        loc.id === stamp.locationId ? { ...loc, collected: true } : loc
      )
    })),
    
  // Action: Fetch real locations from API
  fetchLocations: async (zoneName?: string) => {
    set({ isLoadingLocations: true });
    try {
      const activeZone = zoneName || get().selectedMap.name;
      const url = activeZone ? `/api/locations?zoneName=${activeZone}` : "/api/locations";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      
      const collectedIds = new Set(get().collectedStamps.map((s) => s.locationId));
      
      const mappedLocations: any[] = data.map((loc: any) => ({
        ...loc,
        collected: collectedIds.has(loc.id),
      }));
      
      set({ 
        locations: mappedLocations, 
        totalStamps: mappedLocations.length,
        isLoadingLocations: false 
      });
    } catch (error) {
      console.error(error);
      set({ isLoadingLocations: false });
    }
  },

  // Action: Fetch souvenirs from API
  fetchSouvenirs: async () => {
    set({ isLoadingSouvenirs: true });
    try {
      const url = "/api/souvenirs";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch souvenirs");
      const data = await res.json();
      set({ souvenirs: data, isLoadingSouvenirs: false });
    } catch (error) {
      console.error(error);
      set({ isLoadingSouvenirs: false });
    }
  },

  // Action: Fetch collected stamps
  fetchStamps: async (zoneName?: string) => {
    try {
      const { userId } = get();
      if (!userId) return; // Wait until authenticated

      const activeZone = zoneName || get().selectedMap.name;
      const url = `/api/stamps?userId=${userId}${activeZone ? `&zoneName=${activeZone}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch stamps");
      const data = await res.json();
      
      set({ collectedStamps: data });
      
      set((state) => {
        const collectedIds = new Set(data.map((s: any) => s.locationId));
        return {
          locations: state.locations.map(loc => ({
            ...loc,
            collected: collectedIds.has(loc.id)
          }))
        };
      });
      
    } catch (error) {
      console.error(error);
    }
  },

  // Books Actions
  fetchAvailableMaps: async () => {
    try {
      const res = await fetch('/api/zones');
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((z: any) => ({ id: z.id, name: z.name }));
        set({ availableMaps: mapped });
        if (get().selectedMap.id === "jeju") {
          // Update default selectedMap if the real Jeju zone is found in DB
          const jeju = mapped.find((m: any) => m.name === "Jeju Island");
          if (jeju) set({ selectedMap: jeju });
        }
      }
    } catch (error) { console.error(error); }
  },


  fetchUserBooks: async () => {
    const { userId } = get();
    if (!userId) return;
    set({ isLoadingBooks: true });
    try {
      const res = await fetch(`/api/user-books?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        const books = data.map((b: any) => ({
          id: b.zone.id,
          name: b.zone.name
        }));
        set({ userBooks: books });
      }
    } catch (error) { console.error(error); } finally {
      set({ isLoadingBooks: false });
    }
  },

  addUserBook: async (zoneId: string) => {
    const { userId } = get();
    if (!userId) return;
    set({ isLoadingBooks: true });
    try {
      const res = await fetch('/api/user-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, zoneId })
      });
      if (res.ok) {
        get().fetchUserBooks();
      }
    } catch (error) { console.error(error); } finally {
      set({ isLoadingBooks: false });
    }
  },

  deleteUserBook: async (zoneId: string) => {
    const { userId } = get();
    if (!userId) return;
    set({ isLoadingBooks: true });
    try {
      const res = await fetch(`/api/user-books?userId=${userId}&zoneId=${zoneId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        get().fetchUserBooks();
      }
    } catch (error) { console.error(error); } finally {
      set({ isLoadingBooks: false });
    }
  }
}));
