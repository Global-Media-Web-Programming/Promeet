import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import { Category } from '@/constants/place';

const PlaceCard = ({ type, name, address }) => {
  return (
    <S.PlaceCard>
      <S.CardHeaderWrapper>
        {matchIcon(type)}
        <S.PlaceName>{name}</S.PlaceName>
      </S.CardHeaderWrapper>
      <S.PlaceAddress>{address}</S.PlaceAddress>
    </S.PlaceCard>
  );
};

PlaceCard.propTypes = {
  type: PropTypes.oneOf(Object.values(Category)).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default PlaceCard;
