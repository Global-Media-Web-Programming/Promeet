import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const promiseDataStore = create(
  devtools(
    immer((set) => ({
      promiseData: {
        creatorId: '',
        promiseName: '',
        promiseDescription: '',
        memberCnt: 1,
        nearestStation: null,
        availableTimes: [],
      },
      setPromiseData: (data) =>
        set((state) => {
          state.promiseData = { ...state.promiseData, ...data };
        }),
      resetPromiseData: () =>
        set((state) => {
          state.promiseData = {
            creatorId: '',
            promiseName: '',
            promiseDescription: '',
            memberCnt: 1,
            nearestStation: null,
            availableTimes: [],
          };
        }),
    })),
  ),
);

export default promiseDataStore;
