import axiosInstance from '../axiosInstance';

// 로그인
export const postSignIn = async (name, password, promiseId) => {
  const { data } = await axiosInstance.post(`/auth/signin`, {
    name,
    password,
    promiseId,
  });
  return data;
};
