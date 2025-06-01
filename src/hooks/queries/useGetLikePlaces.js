import { useQueries } from '@tanstack/react-query';
import { getLike } from '@/apis/get/place';
import { QUERY_KEY } from '@/constants/key';
import useHandleError from '../useHandleError';

// 장소 id들로 좋아요 여부 가져오기
const useGetLikePlaces = (placeIds, userId) => {
  const handleError = useHandleError();

  return useQueries({
    queries: placeIds.map((placeId) => ({
      queryKey: [QUERY_KEY.places, placeId, userId],
      queryFn: async () => {
        try {
          const { data } = await getLike(placeId, userId);
          return data;
        } catch (error) {
          handleError(error);
          return error;
        }
      },
      enabled: !!placeId || !!userId,
    })),
  });
};

export default useGetLikePlaces;
