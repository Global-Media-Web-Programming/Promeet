import { useShallow } from 'zustand/shallow';
import promiseDataStore from '@/stores/promise/promiseDataStore';

export const usePlaceLikeToggleInfo = () =>
  promiseDataStore(
    useShallow((state) => ({
      likedPlaces: state.likedPlaces,
    })),
  );

export const usePlaceLikeToggleActions = () => promiseDataStore((state) => state.actions);
