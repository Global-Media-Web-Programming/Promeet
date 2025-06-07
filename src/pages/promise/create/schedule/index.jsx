import * as S from './style';
// import { useNavigate } from 'react-router-dom';
import Header from '@/components/promise/Header';
import Button from '@/components/ui/Button';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const SchedulePage = () => {
  // const navigate = useNavigate();
  const handleCreatePromiseBtnClick = () => {};
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_LOCATION} />
      {/* 가능 일정 입력 */}
      <S.BtnWrapper>
        <Button onClick={handleCreatePromiseBtnClick}>약속 생성</Button>
      </S.BtnWrapper>
    </S.Container>
  );
};
export default SchedulePage;
