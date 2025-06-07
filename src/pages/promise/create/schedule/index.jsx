import * as S from './style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/promise/Header';
import Button from '@/components/ui/Button';
import ShareLinkModal from '@/components/modal/ShareLinkModal';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { usePromiseDataInfo } from '@/hooks/stores/promise/usePromiseDataStore';
import useCreatePromise from '@/hooks/mutations/useCreatePromise';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const SchedulePage = () => {
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const navigate = useNavigate();

  const { userId } = useUserInfo();
  const { name, description, memberCnt, nearestSubwayStation, availableTimes } =
    usePromiseDataInfo();

  const { mutateAsync: createPromise, isPending } = useCreatePromise();

  const handleCreatePromiseBtnClick = async () => {
    const res = await createPromise({
      creatorId: userId,
      promiseName: name,
      promiseDescription: description,
      memberCnt,
      nearestStation: nearestSubwayStation,
      availableTimes,
    });

    const promiseId = res.data.promiseId;
    const shareLink = `https://promeet-develop.vercel.app/promise/${promiseId}/join`;
    setShareLink(shareLink); // ← useState로 관리 필요
    setIsOpenShareModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenShareModal(false);
    navigate(ROUTES.PROMISE_FINALIZE);
  };

  return (
    <>
      <S.Container>
        <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_LOCATION} />
        <div>가능 일정 입력</div>
        <S.BtnWrapper>
          <Button onClick={handleCreatePromiseBtnClick} disabled={isPending}>
            {isPending ? '약속 생성 중...' : '약속 생성'}
          </Button>
        </S.BtnWrapper>
      </S.Container>
      <ShareLinkModal isOpen={isOpenShareModal} shareLink={shareLink} onClose={handleCloseModal} />
    </>
  );
};
export default SchedulePage;
