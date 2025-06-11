import * as S from './style';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapInfo, useMapActions } from '@/hooks/stores/promise/map/useMapStore';

const MapContainer = ({ children, lat, lng }) => {
  const mapRef = useRef(null);
  const { isKakaoLoaded } = useMapInfo();
  const { setMap } = useMapActions();

  // 지도 생성
  useEffect(() => {
    if (!isKakaoLoaded || !mapRef.current) {
      console.log('지도 초기화 조건 미충족:', { isKakaoLoaded, hasMapRef: !!mapRef.current });
      return;
    }

    try {
      console.log('지도 생성 시도:', { lat, lng });
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      console.log('지도 생성 성공:', map);
      setMap(map);

      return () => {
        console.log('지도 정리');
        setMap(null);
      };
    } catch (error) {
      console.error('지도 생성 실패:', error);
    }
  }, [isKakaoLoaded, lat, lng, setMap]);

  return (
    <S.MapDiv id="map" ref={mapRef}>
      {children}
    </S.MapDiv>
  );
};

MapContainer.propTypes = {
  children: PropTypes.node,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default MapContainer;
