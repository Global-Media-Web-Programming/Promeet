import { useMutation } from '@tanstack/react-query';
import queryClient from '@/lib/tanstack-query/queryClient';
import { postFixedSchedules } from '@/apis/post/user';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useErrorHandler from '../useHandleError';
import { QUERY_KEY } from '@/constants/key';

const useCreateFixedSchedules = () => {
  const handleError = useErrorHandler();

  const { userId } = useUserInfo();

  return useMutation({
    mutationFn: ({ fixedSchedules }) => postFixedSchedules(userId, fixedSchedules),
    onSuccess: (_, __) => {
      // 유저 정보 캐시 무효화 (고정 일정 포함)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user, userId] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useCreateFixedSchedules;
