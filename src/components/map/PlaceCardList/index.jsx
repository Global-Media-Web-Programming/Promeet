import * as S from './style';
import PropTypes from 'prop-types';
import PlaceCard from '@/components/map/PlaceCard';
import { Category } from '@/constants/place';

const PlaceCardList = ({ places }) => {
  return (
    <S.Container>
      {places.length > 0 ? (
        places.map((placeData, i) => (
          <PlaceCard
            key={i}
            type={placeData.place.type}
            name={placeData.place.name}
            address={placeData.place.address}
          />
        ))
      ) : (
        <S.EmptyText>주변 장소가 없어요</S.EmptyText>
      )}
    </S.Container>
  );
};

PlaceCardList.propTypes = {
  places: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        La: PropTypes.string.isRequired,
        Ma: PropTypes.string.isRequired,
      }).isRequired,
      place: PropTypes.shape({
        type: PropTypes.oneOf(Object.values(Category)).isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};

export default PlaceCardList;
