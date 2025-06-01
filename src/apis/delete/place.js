import axiosInstance from '../axiosInstance';

// 좋아요 취소
export const deleteLike = async (placeId, userId) => {
  const { data } = await axiosInstance.delete(`/likes`, {
    placeId,
    userId,
  });
  return data;
};
