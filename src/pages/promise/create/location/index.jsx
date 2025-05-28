import * as S from './style';
import Header from '@/components/promise/Header';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const LocationPage = () => {
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.PROMISE_CREATE_DATE} />
    </S.Container>
  );
};
export default LocationPage;
