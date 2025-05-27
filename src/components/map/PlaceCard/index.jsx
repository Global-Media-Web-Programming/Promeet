import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import { Category } from '@/constants/place';
import useToggleLikePlace from '@/hooks/mutations/useToggleLikePlace';

const PlaceCard = ({ id: placeId, type, name, address, isLiked, likesCount }) => {
  const { mutate: toggleLike } = useToggleLikePlace();

  const handleLikeToggle = () => {
    toggleLike({ placeId, isLiked });
  };

  return (
    <S.PlaceCard>
      <S.CardLeft>
        <S.CardHeaderWrapper>
          {matchIcon(type)}
          <S.PlaceName>{name}</S.PlaceName>
        </S.CardHeaderWrapper>
        <S.PlaceAddress>{address}</S.PlaceAddress>
      </S.CardLeft>

      <S.CardRight onClick={handleLikeToggle}>
        {isLiked ? <S.FilledHeartIcon /> : <S.EmptyHeartIcon />}
        <S.heartCnt>{likesCount}</S.heartCnt>
      </S.CardRight>
    </S.PlaceCard>
  );
};

PlaceCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(Category)).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default PlaceCard;
