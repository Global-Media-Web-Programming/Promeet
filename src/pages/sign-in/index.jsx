import * as S from './style';
import LoginButton from '@/components/ui/Button';
// import InputBox from '@/components/ui/InputBox';

const SignInPage = () => {
  return (
    <S.Container>
      <S.Title>로그인</S.Title>

      <LoginButton text="로그인" />
    </S.Container>
  );
};

export default SignInPage;
