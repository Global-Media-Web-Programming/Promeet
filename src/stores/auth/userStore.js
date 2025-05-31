import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const userStore = create()(
  devtools(
    immer((set) => ({
      userId: null,
      userName: null,
      fixedSchedules: [],
      promises: {
        create: [],
        join: [],
      },
      actions: {
        setUserId: (userId) => set(() => ({ userId }), false, 'setUserId'),
        setUserName: (name) => set(() => ({ userName: name }), false, 'setUserName'),
        setFixedSchedules: (schedules) =>
          set(() => ({ fixedSchedules: schedules }), false, 'setFixedSchedules'),
        setPromises: (promises) => set(() => ({ promises }), false, 'setPromises'),
        resetUser: () =>
          set(
            () => ({
              userId: null,
              userName: null,
              fixedSchedules: [],
              promises: { create: [], join: [] },
            }),
            false,
            'resetUser',
          ),
      },
    })),
  ),
);

export default userStore;
