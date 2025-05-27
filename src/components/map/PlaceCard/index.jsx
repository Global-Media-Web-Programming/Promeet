import * as S from './style';
import PropTypes from 'prop-types';
import matchIcon from '@/utils/matchIcon.jsx';
import useMapStore from '@/stores/map/useMapStore';
import useBottomSheetStore from '@/stores/ui/useBottomSheetStore';
import useMarkerStore from '@/stores/map/useMarkerStore';
import { Category } from '@/constants/place';
import useToggleLikePlace from '@/hooks/mutations/useToggleLikePlace';

const PlaceCard = ({ id: placeId, position, type, name, address, isLiked, likesCount }) => {
  const { map } = useMapStore();
  const { setActiveBottomSheet } = useBottomSheetStore();
  const { markerMap } = useMarkerStore();

  // 카드 클릭시 지도 위치 부드럽게 이동, 지도 영역 밖이면 그냥 이동
  const handleCardClick = () => {
    // 바텀 시트 닫기
    setActiveBottomSheet(null);
    // 지도 중심 이동 (부드럽게)
    const moveLatLng = new window.kakao.maps.LatLng(position.Ma, position.La);
    map.panTo(moveLatLng);

    // 마커 찾아서 클릭 이벤트 트리거 - 오버레이 띄우기
    const marker = markerMap.get(placeId);

    if (marker) {
      window.kakao.maps.event.trigger(marker, 'click');
    }
  };

  const { mutate: toggleLike } = useToggleLikePlace();

  const handleLikeToggle = () => {
    toggleLike({ placeId, isLiked });
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

      <S.CardRight onClick={handleLikeToggle}>
        {isLiked ? <S.FilledHeartIcon /> : <S.EmptyHeartIcon />}
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
  type: PropTypes.oneOf(Object.values(Category)).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
};

export default PlaceCard;
