import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const promiseDataStore = create()(
  devtools(
    immer((set) => ({
      likedPlaces: [],
      actions: {
        setLikedPlaces: (arr) =>
          set((state) => {
            state.likedPlaces = arr;
          }),
      },
    })),
  ),
);

export default promiseDataStore;
