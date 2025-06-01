import axiosInstance from '../axiosInstance';

// 좋아요
export const postLike = async (placeId, userId) => {
  const { data } = await axiosInstance.post(`/likes`, {
    placeId,
    userId,
  });
  return data;
};
