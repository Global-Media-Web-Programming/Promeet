import * as S from './style';
import { useParams } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import DeferredLoader from '@/components/ui/DeferredLoader';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';
import useGetUserData from '@/hooks/queries/useGetUserData';

const JoinPage = () => {
  const { promiseId } = useParams();
  const { userId } = useUserInfo();
  const { data: promiseData, isPending: isPromisePending } = useGetPromiseData(promiseId, userId);

  const { data: userData, isPending: isUserPending } = useGetUserData(promiseData?.creatorId, true);

  if (isPromisePending || isUserPending) {
    return <DeferredLoader />;
  }

  const { name, description } = promiseData;

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
