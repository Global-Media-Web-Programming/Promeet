import * as S from './style';
import PropTypes from 'prop-types';

const PlaceCard = ({ name, address }) => {
  return (
    <S.PlaceCard>
      <S.PlaceName>{name}</S.PlaceName>
      <S.PlaceAddress>{address}</S.PlaceAddress>
    </S.PlaceCard>
  );
};

PlaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default PlaceCard;
