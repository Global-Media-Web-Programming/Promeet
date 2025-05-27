import * as S from './style';
import PropTypes from 'prop-types';
import PlaceCard from '@/components/map/PlaceCard';
import PlaceCardSkeleton from '@/components/map/PlaceCard/PlaceCardSkeleton';
import { Category } from '@/constants/place';

const PlaceCardList = ({ places, isLoading }) => {
  if (isLoading) {
    return (
      <S.Container>
        {[...Array(5)].map((_, i) => (
          <PlaceCardSkeleton key={i} />
        ))}
      </S.Container>
    );
  }
  return (
    <S.Container>
      {places.length > 0 ? (
        places.map((place, i) => (
          <PlaceCard
            key={i}
            id={place.id}
            position={place.position}
            type={place.type}
            name={place.name}
            address={place.address}
            isLiked={place.isLiked}
            likesCount={place.likesCount}
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
      id: PropTypes.string.isRequired,
      position: PropTypes.shape({
        La: PropTypes.string.isRequired,
        Ma: PropTypes.string.isRequired,
      }).isRequired,
      type: PropTypes.oneOf(Object.values(Category)).isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      isLiked: PropTypes.bool.isRequired,
      likesCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PlaceCardList;
