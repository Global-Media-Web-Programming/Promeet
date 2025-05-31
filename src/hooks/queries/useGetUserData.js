import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/apis/get/auth';
import { QUERY_KEY } from '@/constants/key';
import { useUserActions } from '../stores/auth/useUserStore';

const useGetUserData = (userId) => {
  const { setUserName, setFixedSchedules, setPromises } = useUserActions();

  return useQuery({
    queryKey: [QUERY_KEY.user, userId],
    queryFn: async () => {
      const { data } = await getUserData(userId);
      // 데이터를 가져오자마자 store 업데이트
      const { name, fixedSchedule, promise } = data;
      setUserName(name);
      setFixedSchedules(fixedSchedule);
      setPromises({
        create: promise?.create ?? [],
        join: promise?.join ?? [],
      });
      return data;
    },
    enabled: !!userId,
  });
};

export default useGetUserData;
