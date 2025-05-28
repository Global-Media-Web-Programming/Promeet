import * as S from './style';
import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import PlaceCardList from '@/components/place/PlaceCardList';
import useMapStore from '@/stores/map/useMapStore';
// import useMyLocation from '@/stores/map/useMyLocationsStore';
import { PROMISE_LOCATION_HEADER_TEXT } from '@/constants/promise';
import useDebounce from '@/hooks/useDebounce';

const SearchLocation = ({ onBack }) => {
  const [searchInput, setSearchInput] = useState('');
  const searchTerm = useDebounce(searchInput, 300);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isKakaoLoaded } = useMapStore();
  // const { myLocation } = useMyLocation();

  // Places 서비스 초기화
  const ps = useMemo(() => {
    console.log(isKakaoLoaded);
    if (!isKakaoLoaded) return null;
    return new window.kakao.maps.services.Places();
  }, [isKakaoLoaded]);

  // 검색 콜백
  const placesSearchCB = useCallback((data, status) => {
    setIsLoading(false); // 검색 완료되면 로딩 종료
    if (status === window.kakao.maps.services.Status.OK) {
      const places = data.map((place) => ({
        id: place.id,
        name: place.place_name,
        address: place.road_address_name ?? place.address_name,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      }));
      setPlaces(places);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setPlaces([]);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      throw new Error('장소 검색 중 에러 발생');
    }
  }, []);

  // 장소 검색 함수
  const searchPlaces = useCallback(() => {
    if (!ps) return;
    if (!searchTerm.trim()) return;
    console.log('searchPlaces 실행');
    setIsLoading(true); // 검색 시작시 로딩 시작
    ps.keywordSearch(searchTerm, placesSearchCB);
  }, [ps, placesSearchCB, searchTerm]);

  useEffect(() => {
    console.log('ps', ps);
    console.log('searchTerm', searchTerm);
    if (!ps || !searchTerm.trim()) return;
    searchPlaces();
  }, [ps, searchPlaces, searchTerm]);

  const emptyText = !searchTerm.trim() ? '주소를 입력해주세요' : '찾으시는 장소가 없어요';

  return (
    <S.Container>
      <Header
        text={PROMISE_LOCATION_HEADER_TEXT}
        backwardSize="22px"
        backwardType="arrow"
        onBackwardClick={onBack}
      />
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="주소를 입력해주세요"
      />
      <S.CurrLocationButton>
        <S.LocationIcon />
        <span>현위치 불러오기</span>
      </S.CurrLocationButton>
      <PlaceCardList places={places} isLoading={isLoading} emptyText={emptyText} />
    </S.Container>
  );
};

SearchLocation.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default SearchLocation;
