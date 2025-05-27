import { create } from 'zustand';

const useMarkerStore = create((set) => ({
  markerMap: new Map(), // key: placeId, value: kakao.maps.Marker
  setMarker: (id, marker) =>
    set((state) => {
      const newMap = new Map(state.markerMap);
      newMap.set(id, marker);
      return { markerMap: newMap };
    }),
  clearMarkers: () => set({ markerMap: new Map() }),
}));
export default useMarkerStore;
