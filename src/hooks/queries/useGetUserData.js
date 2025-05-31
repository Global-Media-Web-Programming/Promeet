import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/apis/get/auth';
import { QUERY_KEY } from '@/constants/key';
import useHandleError from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';

// 유저 id로 유저 정보 가져오기
const useGetUserData = (userId) => {
  const handleError = useHandleError();
  console.log('useGetUserData 실행');
  const { setUserName, setFixedSchedules, setPromises } = useUserActions();

  return useQuery({
    queryKey: [QUERY_KEY.user, userId],
    queryFn: () => getUserData(userId),
    enabled: !!userId,
    onSuccess: (data) => {
      console.log('useGetUserData onSuccess');
      const { name, fixedSchedule, promise } = data.data;

      setUserName(name);
      setFixedSchedules(fixedSchedule);
      setPromises({
        create: promise?.create ?? [],
        join: promise?.join ?? [],
      });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useGetUserData;
