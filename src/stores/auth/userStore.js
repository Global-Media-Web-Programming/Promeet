import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const userStore = create()(
  devtools(
    immer((set) => ({
      userId: null,
      actions: {
        setUserId: (userId) => set(() => ({ userId }), false, 'setUserId'),
      },
    })),
  ),
);

export default userStore;
