import * as S from './style';
import Header from '@/components/promise/Header';
import CalendarRange from '@/components/calendar';
import Button from '@/components/ui/Button';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const DatePage = () => {
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_INFO} />
      <CalendarRange />
      <S.BtnWrapper>
        <Button>다음</Button>
      </S.BtnWrapper>
    </S.Container>
  );
};
export default DatePage;
