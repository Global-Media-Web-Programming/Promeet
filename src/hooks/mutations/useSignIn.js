import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useErrorHandler from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';
import { ROUTES } from '@/constants/routes';
import { postSignIn } from '@/apis/post/auth';
import { getUserData } from '@/apis/get/user';
import { getPromiseData } from '@/apis/get/promise';

const useSignIn = (setError) => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { setUserId, setUserName, setFixedSchedules, setPromises, setUserType } = useUserActions();

  return useMutation({
    mutationFn: async ({ name, password, promiseId }) => {
      const signInResult = await postSignIn(name, password, promiseId);
      const userId = signInResult.data.userId;

      // 약속 페이지에서 로그인한 경우에만 약속 정보 확인
      if (promiseId) {
        const { data: promiseData } = await getPromiseData(promiseId, userId);
        const isInvitedMember = promiseData.members.some(
          (member) => member.userId === userId && member.userId !== promiseData.creatorId,
        );
        return { signInResult, isInvitedMember };
      }

      return { signInResult, isInvitedMember: false };
    },
    onSuccess: async ({ signInResult, isInvitedMember }) => {
      const userId = signInResult.data.userId;
      setUserId(userId);

      // 데이터 프리로드
      const userData = await getUserData(userId);
      const { name, fixedSchedule, promise } = userData.data;

      setUserName(name);
      setFixedSchedules(fixedSchedule);
      setPromises({
        create: promise?.create ?? [],
        join: promise?.join ?? [],
      });

      if (isInvitedMember) {
        setUserType('join');
        navigate(ROUTES.PROMISE_LOCATION);
      } else {
        navigate(ROUTES.HOME);
      }
    },
    onError: (error) => {
      if (error.code === 'INVALID_PASSWORD') {
        setError('password', { message: error.message });
        return;
      }

      // 기타 에러
      handleError(error);
    },
  });
};

export default useSignIn;
