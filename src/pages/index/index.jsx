import * as S from './style';
import useGetUserData from '@/hooks/queries/useGetUserData';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import Navbar from '@/layouts/Navbar';

const HomePage = () => {
  const { userId, userName } = useUserInfo();
  useGetUserData(userId);

  if (!userId)
    return (
      <S.EnterContainer>
        <S.LogoContainer>
          <S.Logo />
          <S.EnterText>쉽고 빠른 약속 정하기</S.EnterText>
        </S.LogoContainer>
        <button>약속 잡으러가기</button>
      </S.EnterContainer>
    );

  return (
    <>
      <S.Container>
        <S.Header>{userName}님, 오늘 일정 잊지 않으셨요?</S.Header>
      </S.Container>
      <Navbar />
    </>
  );
};

export default HomePage;
