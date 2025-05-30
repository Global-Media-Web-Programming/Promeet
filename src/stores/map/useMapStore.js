import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';

const useMapStore = create()(
  devtools(
    immer((set) => ({
      map: null,
      isKakaoLoaded: false,
      actions: {
        setMap: (map) => set(() => ({ map }), false, 'setMap'),
        setIsKakaoLoaded: (flag) => set(() => ({ isKakaoLoaded: flag }), false, 'setIsKakaoLoaded'),
      },
    })),
  ),
);

export const useMapInfo = () =>
  useMapStore(
    useShallow((state) => ({
      map: state.map,
      isKakaoLoaded: state.isKakaoLoaded,
    })),
  );

export const useMapActions = () => useMapStore((state) => state.actions);
