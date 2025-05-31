import userStore from '@/stores/auth/userStore';
import { useShallow } from 'zustand/shallow';

export const useUserInfo = () =>
  userStore(
    useShallow((state) => ({
      userId: state.userId,
    })),
  );

export const useUserActions = () => userStore((state) => state.actions);
