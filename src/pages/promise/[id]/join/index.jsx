import * as S from './style';
import { useParams } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';
import useGetUserData from '@/hooks/queries/useGetUserData';

const JoinPage = () => {
  const { promiseId } = useParams();
  const { userId } = useUserInfo();
  useGetPromiseData(promiseId, userId);
  const { promiseDataFromServer } = usePromiseDataFromServerInfo(); // store에서 데이터 가져오기
  const { createrId, name, description } = promiseDataFromServer;
  // 생성자 이름 가져오기
  const { data: userData } = useGetUserData(createrId, true);

  return (
    <S.Container>
      <S.CreaterText>{`${userData.name}님이 약속을 공유했어요`}</S.CreaterText>
      <S.InfoContainer>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.InfoContainer>
      <S.Line />
      <SignInForm />
    </S.Container>
  );
};
export default JoinPage;
