import * as S from './style';
import Header from '@/components/promise/Header';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const LocationPage = () => {
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_DATE} />
      <label>내 출발 위치</label>
      <input placeholder="출발 위치를 입력해주세요" />
      <S.FixedPlaceText>이미 약속 위치를 정해놨어요</S.FixedPlaceText>
    </S.Container>
  );
};
export default LocationPage;
