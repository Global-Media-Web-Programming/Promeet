import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/apis/get/auth';
import { QUERY_KEY } from '@/constants/key';
import useHandleError from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';

// 유저 id로 유저 정보 가져오기
const useGetUserData = (userId) => {
  const handleError = useHandleError();
  const { setUserName, setFixedSchedules, setPromises } = useUserActions();

  return useQuery({
    queryKey: [QUERY_KEY.user, userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId, // userId가 있을때만 실행
    onSuccess: (data) => {
      const { name, fixedSchedules, promises } = data.data;
      setUserName(name);
      setFixedSchedules(fixedSchedules);
      setPromises(promises);
    },
    onError: handleError,
  });
};

export default useGetUserData;
