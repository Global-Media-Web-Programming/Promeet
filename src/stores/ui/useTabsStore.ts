import { create } from 'zustand';

interface TabsState {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  option: string;
  setOption: (value: string) => void;
}

const useTabsStore = create<TabsState>((set) => ({
  selectedValue: '',
  setSelectedValue: (value: string) => set({ selectedValue: value }),
  option: '',
  setOption: (value: string) => set({ option: value }),
}));

export default useTabsStore;
