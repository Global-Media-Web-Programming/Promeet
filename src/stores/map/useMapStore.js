import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useMapStore = create()(
  devtools((set) => ({
    map: null,
    isKakaoLoaded: false,
    actions: {
      setMap: (map) => set(() => ({ map }), false, 'setMap'),
      setIsKakaoLoaded: (flag) => set(() => ({ isKakaoLoaded: flag }), false, 'setIsKakaoLoaded'),
    },
  })),
);

export const useMap = () => useMapStore((state) => state.map);
export const useIsKakaoLoaded = () => useMapStore((state) => state.isKakaoLoaded);
export const useMapActions = () => useMapStore((state) => state.actions);
