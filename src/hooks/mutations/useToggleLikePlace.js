import { useMutation } from '@tanstack/react-query';
import { postLike } from '@/apis/post/place';
import { deleteLike } from '@/apis/delete/place';
import useHandleError from '../useHandleError';
import queryClient from '@/lib/tanstack-query/queryClient';
import { QUERY_KEY } from '@/constants/key';

const useToggleLikePlace = () => {
  const handleError = useHandleError();

  return useMutation({
    mutationFn: ({ placeId, userId, isLiked }) =>
      isLiked ? deleteLike(placeId, userId) : postLike(placeId, userId),
    onMutate: async ({ placeId, userId, isLiked }) => {
      // 1. 장소에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.places, placeId, userId],
        exact: true, // 정확히 일치하는 쿼리만
      });

      // 2. 현재 장소 관련 데이터를 캐시에서 가져오기
      // Optimistic Update를 위해 클라이언트에서만 임시로 사용하는 상태
      const prevData = queryClient.getQueryData([QUERY_KEY.places, placeId, userId], {
        exact: true,
      });

      if (!prevData || !placeId || !userId) return { prevData };

      // 3. 서버 응답 기다리지 않고 바로 상태 업데이트
      queryClient.setQueryData([QUERY_KEY.places, placeId, userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            isLiked: !isLiked,
            likesCount: isLiked ? old.data.likesCount - 1 : old.data.likesCount + 1,
          },
        };
      });

      return { prevData };
    },

    // 요청 실패시 롤백
    onError: (error, { placeId, userId }, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([QUERY_KEY.places, placeId, userId], context.prevData);
      }
      handleError(error);
    },

    // 실제 서버의 최신 데이터를 다시 가져옴
    onSettled: (_, __, { placeId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.places, placeId, userId],
        exact: true,
      });
    },
  });
};

export default useToggleLikePlace;
