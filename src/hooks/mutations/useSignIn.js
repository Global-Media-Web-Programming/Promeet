import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useErrorHandler from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';
import { ROUTES } from '@/constants/routes';
import { postSignIn } from '@/apis/post/auth';

const useSignIn = (setError) => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { setUserId } = useUserActions();

  return useMutation({
    mutationFn: async ({ name, password, promiseId }) => {
      const data = await postSignIn(name, password, promiseId);
      if (!data.success) {
        throw data.error;
      }
      return data;
    },
    onSuccess: (data) => {
      setUserId(data.data.userId);
      navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error) => {
      if (error.code === 'MISSING_REQUIRED_FIELD') {
        setError('name', '.');
        setError('password', { message: error.message }); // 비번 필드 밑에만 에러 메시지 표시
        return;
      }

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
