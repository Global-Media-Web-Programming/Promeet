import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import MarkerManager from '../MarkerManager';
import PlaceCardList from '../PlaceCardList';
import BottomSheet from '@/components/ui/BottomSheet';
import useMapStore from '@/stores/map/useMapStore';
import useMyLocation from '@/stores/map/useMyLocationsStore';
import { Category, CategoryLabel } from '@/constants/place';

const SearchPlace = ({ category }) => {
  const { isKakaoLoaded } = useMapStore();
  const { myLocation } = useMyLocation();
  const [places, setPlaces] = useState([]);

  // Places 서비스 초기화
  const ps = useMemo(() => {
    if (!isKakaoLoaded) return null;
    return new window.kakao.maps.services.Places();
  }, [isKakaoLoaded]);

  // 검색 콜백
  const placesSearchCB = useCallback(
    (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const markersData = data.map((place) => ({
          position: new window.kakao.maps.LatLng(place.y, place.x),
          place: {
            type: category,
            name: place.place_name,
            phone: place.phone,
            address: place.road_address_name ?? place.address_name,
            link: place.place_url,
          },
        }));
        setPlaces(markersData);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        console.error('장소 검색 중 에러 발생');
      }
    },
    [category],
  );

  // 장소 검색 함수
  const searchPlaces = useCallback(() => {
    if (!ps) return;
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
      <MarkerManager markers={[...places, ...(myLocation ? [myLocation] : [])]} />;
      <BottomSheet id={'map_place'}>
        <PlaceCardList places={places} />
      </BottomSheet>
    </>
  );
};

SearchPlace.propTypes = {
  category: PropTypes.oneOf(Object.values(Category)).isRequired,
};

export default SearchPlace;
