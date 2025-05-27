import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import MarkerManager from '../MarkerManager';
import PlaceCardList from '../PlaceCardList';
import BottomSheet from '@/components/ui/BottomSheet';
import useMapStore from '@/stores/map/useMapStore';
import useMyLocation from '@/stores/map/useMyLocationsStore';
import useGetLikePlaces from '@/hooks/queries/useGetLikePlaces';
import { Category, CategoryLabel } from '@/constants/place';

const SearchPlace = ({ category }) => {
  const { isKakaoLoaded } = useMapStore();
  const { myLocation } = useMyLocation();
  const [places, setPlaces] = useState([]);
  // 좋아요 정보 가져오기 위해 id들 저장
  const [placeIds, setPlaceIds] = useState([]);
  // 지도 검색 로딩용
  const [isLoading, setIsLoading] = useState(false);

  // Places 서비스 초기화
  const ps = useMemo(() => {
    if (!isKakaoLoaded) return null;
    return new window.kakao.maps.services.Places();
  }, [isKakaoLoaded]);

  // 검색 콜백
  const placesSearchCB = useCallback(
    (data, status) => {
      setIsLoading(false); // 검색 완료되면 로딩 종료
      if (status === window.kakao.maps.services.Status.OK) {
        const places = data.map((place) => ({
          id: place.id,
          type: category,
          name: place.place_name,
          phone: place.phone,
          address: place.road_address_name ?? place.address_name,
          link: place.place_url,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        }));
        setPlaces(places);
        setPlaceIds(places.map((p) => p.id));
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        setPlaceIds([]);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        throw new Error('장소 검색 중 에러 발생');
      }
    },
    [category],
  );

  // 장소 정보 + 좋아요 정보
  const LikedPlaces = useGetLikePlaces(placeIds);
  const mergedPlaces = useMemo(() => {
    return places.map((place, i) => {
      const result = LikedPlaces[i]?.data;
      return {
        ...place,
        isLiked: result?.isLiked ?? false,
        likesCount: result?.likesCount ?? 0,
      };
    });
  }, [places, LikedPlaces]);

  // 장소 검색 함수
  const searchPlaces = useCallback(() => {
    if (!ps) return;
    setIsLoading(true); // 검색 시작시 로딩 시작
    const centerStation = '숭실대입구역 '; // 임시 역
    const keyword = centerStation + CategoryLabel[category];
    ps.keywordSearch(keyword, placesSearchCB);
  }, [category, ps, placesSearchCB]);

  useEffect(() => {
    if (!ps) return;
    searchPlaces();
  }, [category, ps, searchPlaces]);

  return (
    <>
      <MarkerManager markers={[...mergedPlaces, ...(myLocation ? [myLocation] : [])]} />;
      <BottomSheet id={'map_place'}>
        <PlaceCardList places={mergedPlaces} isLoading={isLoading} />
      </BottomSheet>
    </>
  );
};

SearchPlace.propTypes = {
  category: PropTypes.oneOf(Object.values(Category)).isRequired,
};

export default SearchPlace;
