import { create } from 'zustand';

const useLocationStore = create((set) => ({
  location: '', // 임시
  setLocation: (value) =>
    set({
      location: value,
    }),
}));

export default useLocationStore;
