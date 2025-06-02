import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { CATEGORY } from '@/constants/place';
import useToggleLikePlace from '@/hooks/mutations/useToggleLikePlace';

const PlaceCard = ({
  id: placeId,
  position,
  type,
  name,
  address,
  phone,
  link,
  isLiked,
  likesCount,
  onClick,
}) => {
  const { map } = useMapInfo();
  const { setActiveBottomSheet } = useBottomSheetActions();
  const { setActiveMarkerId } = useMarkerActions();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // 기본 동작
    // 카드 클릭시 지도 위치 부드럽게 이동, 지도 영역 밖이면 그냥 이동
    // 바텀 시트 닫기
    setActiveBottomSheet(null);
    // 지도 중심 이동 (부드럽게)
    const moveLatLng = new window.kakao.maps.LatLng(position.La, position.Ma);
    map.panTo(moveLatLng);
    // 해당 마커의 오버레이 열기
    setActiveMarkerId(placeId);
  };

  const { mutate: toggleLike } = useToggleLikePlace();

  const handleLikeToggle = () => {
    const place = {
      placeId,
      type,
      name,
      position,
      address,
      phone,
      link,
    };
    toggleLike({ place, isLiked });
  };

  return (
    <S.PlaceCard onClick={handleCardClick}>
      <S.CardLeft>
        <S.CardHeaderWrapper>
          {matchIcon(type)}
          <S.PlaceName>{name}</S.PlaceName>
        </S.CardHeaderWrapper>
        <S.PlaceAddress>{address}</S.PlaceAddress>
      </S.CardLeft>

      <S.CardRight>
        <S.HeartWrapper onClick={handleLikeToggle}>
          {isLiked === undefined ? null : isLiked ? <S.FilledHeartIcon /> : <S.EmptyHeartIcon />}
        </S.HeartWrapper>
        <S.heartCnt>{likesCount}</S.heartCnt>
      </S.CardRight>
    </S.PlaceCard>
  );
};

PlaceCard.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.shape({
    La: PropTypes.string.isRequired,
    Ma: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(CATEGORY)),
  phone: PropTypes.string,
  link: PropTypes.string,
  isLiked: PropTypes.bool,
  likesCount: PropTypes.number,
  onClick: PropTypes.func,
};

export default PlaceCard;
