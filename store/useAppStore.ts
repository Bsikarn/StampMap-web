import { create } from 'zustand';

interface AppState {
  // Array of collected location IDs acting as a simple progression tracker
  collectedLocations: string[]; 
  
  // Real-time map coordinate and zoom tracker for smooth view state retention
  mapViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  
  // Appends a new timestamp or boolean unlock via locationId
  addStamp: (locationId: string) => void;
  // Updates the MapBox viewport to cache the last visited coordinate
  setMapViewState: (viewState: { longitude: number; latitude: number; zoom: number }) => void;
}

/**
 * Secondary AppStore 
 * Handles ephemeral and UI-centric map state that doesn't strictly belong in
 * the persistable user Stamp Progress store (`use-stamp-store.ts`).
 */
export const useAppStore = create<AppState>((set) => ({
  collectedLocations: [], // Initial state is empty, grows as user interacts
  
  mapViewState: {
    longitude: 126.5412, // Default Jeju longitude
    latitude: 33.3765,   // Default Jeju latitude
    zoom: 9.5,           // Default Zoom
  },

  /**
   * Safe immutability mutation: We check if the ID already exists before
   * appending it, explicitly returning the exact same state object if so
   * to prevent useless React re-renders.
   */
  addStamp: (locationId) =>
    set((state) => {
      if (state.collectedLocations.includes(locationId)) return state;
      return {
        ...state,
        collectedLocations: [...state.collectedLocations, locationId],
      };
    }),

  /**
   * Refreshes the active view coordinates payload completely
   */
  setMapViewState: (viewState) =>
    set((state) => ({
      ...state,
      mapViewState: viewState,
    })),
}));
