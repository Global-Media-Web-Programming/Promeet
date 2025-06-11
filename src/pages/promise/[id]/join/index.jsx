import * as S from './style';
import SignInForm from '@/components/auth/SignInForm';

const JoinPage = () => {
  return (
    <S.Container>
      <S.JoinTitle>
        OOO 님이
        <br />
        약속을 공유했습니다.
      </S.JoinTitle>
      <S.PromiseName>약속 제목</S.PromiseName>
      <S.PromiseDescription>약속 내용</S.PromiseDescription>
      <S.Divider />
      <SignInForm />
    </S.Container>
  );
};
export default JoinPage;
