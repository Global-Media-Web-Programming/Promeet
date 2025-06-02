import { useShallow } from 'zustand/shallow';
import promiseDataStore from '@/stores/promise/promiseDataStore';

export const usePromiseDataInfo = () =>
  promiseDataStore(
    useShallow((state) => ({
      likedPlaces: state.likedPlaces,
    })),
  );

export const usePromiseDataActions = () => promiseDataStore((state) => state.actions);
