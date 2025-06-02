import { useMutation } from '@tanstack/react-query';
import { postLike } from '@/apis/post/place';
import { deleteLike } from '@/apis/delete/place';
import useHandleError from '../useHandleError';
import queryClient from '@/lib/tanstack-query/queryClient';
import { QUERY_KEY } from '@/constants/key';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import {
  usePromiseDataInfo,
  usePromiseDataActions,
} from '@/hooks/stores/promise/usePromiseDataStore';

const useToggleLikePlace = () => {
  const handleError = useHandleError();
  const { userId } = useUserInfo();
  const { likedPlaces } = usePromiseDataInfo();
  const { setLikedPlaces } = usePromiseDataActions();

  return useMutation({
    mutationFn: ({ place, isLiked }) => {
      isLiked
        ? deleteLike(place.placeId, userId)
        : postLike({
            place,
            userId,
          });
    },
    onMutate: async ({ place, isLiked }) => {
      // 1. 장소에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.places, place.placeId, userId],
        exact: true,
      });

      // 2. 현재 좋아요 상태 저장
      const prevLikedPlaces = likedPlaces;

      // 3. 낙관적 업데이트
      const updatedLikedPlaces = prevLikedPlaces.map((likedPlace) => {
        // 이미 좋아요 정보 있는 장소면
        if (likedPlace.place.placeId === place.placeId) {
          return {
            ...likedPlace,
            userIds: isLiked
              ? likedPlace.userIds.filter((id) => id !== userId)
              : [...likedPlace.userIds, userId],
            likesCount: isLiked ? likedPlace.likesCount - 1 : likedPlace.likesCount + 1,
          };
        }
        return likedPlace;
      });

      // 처음 좋아요되는 장소인 경우 반영
      const finalLikedPlaces =
        !isLiked && !prevLikedPlaces.some((p) => p.place.placeId === place.placeId)
          ? [
              ...updatedLikedPlaces,
              {
                userIds: [userId],
                likesCount: 1,
                place: {
                  placeId: place.placeId,
                  type: place.type,
                  name: place.name,
                  position: place.position,
                  address: place.address,
                  phone: place.phone,
                  link: place.link,
                },
              },
            ]
          : updatedLikedPlaces;

      setLikedPlaces(finalLikedPlaces);
      return { prevLikedPlaces };
    },

    // 요청 실패시 롤백
    onError: (error, _, context) => {
      if (context?.prevLikedPlaces) {
        setLikedPlaces(context.prevLikedPlaces);
      }
      handleError(error);
    },

    // 실제 서버의 최신 데이터를 다시 가져옴
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.places],
      });
    },
  });
};

export default useToggleLikePlace;
