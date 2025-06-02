import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const promiseDataStore = create()(
  devtools(
    immer((set) => ({
      likedPlaces: [],
      fixedPlace: null,
      actions: {
        setLikedPlaces: (places) =>
          set((state) => {
            state.likedPlaces = places;
          }),
        setFixedPlace: (place) =>
          set((state) => {
            state.fixedPlace = place;
          }),
      },
    })),
  ),
);

export default promiseDataStore;
