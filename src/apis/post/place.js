import axiosInstance from '../axiosInstance';

// 좋아요
export const postLike = async (place, userId) => {
  const { data } = await axiosInstance.post(`/likes`, {
    place,
    userId,
  });
  return data;
};
