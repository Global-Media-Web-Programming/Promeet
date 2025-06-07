import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/promise/Header';
import CalendarRange from '@/components/calendar';
import Button from '@/components/ui/Button';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const DatePage = () => {
  const navigate = useNavigate();
  const handleNextBtnClick = () => {
    navigate(ROUTES.PROMISE_CREATE_LOCATION);
  };
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_INFO} />
      <CalendarRange />
      <S.BtnWrapper>
        <Button onClick={handleNextBtnClick}>다음</Button>
      </S.BtnWrapper>
    </S.Container>
  );
};
export default DatePage;
