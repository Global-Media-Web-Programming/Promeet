import * as S from './style';
import PropTypes from 'prop-types';
import Header from '../Header';
import { PROMISE_LOCATION_HEADER_TEXT } from '@/constants/promise';

const SearchLocation = ({ onBack }) => {
  return (
    <S.Container>
      <Header
        text={PROMISE_LOCATION_HEADER_TEXT}
        backwardSize="22px"
        backwardType="arrow"
        onBackwardClick={onBack}
      />
      <input placeholder="주소를 입력해주세요" />
      <S.CurrLocationButton>
        <S.LocationIcon />
        <span>현위치 불러오기</span>
      </S.CurrLocationButton>
    </S.Container>
  );
};

SearchLocation.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default SearchLocation;
