import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import useMapStore from '@/stores/map/useMapStore';

const MapContainer = ({ children, lat, lng }) => {
  const mapRef = useRef(null);
  const { setMap, setIsKakaoLoaded } = useMapStore();

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        // 이미 kakao 객체가 로드된 경우
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
          return;
        }

        // Kakao Maps SDK가 아직 로드되지 않았다면
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        script.async = true;
        script.onload = () => {
          resolve(window.kakao);
        };
        script.onerror = () => {
          reject(new Error('[카카오맵 스크립트 로드 실패]'));
        };
        document.head.appendChild(script);
      });
    };

    loadKakaoMapScript()
      .then((kakao) => {
        kakao.maps.load(() => {
          if (!mapRef.current) {
            return;
          }

          const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
          };

          const map = new kakao.maps.Map(mapRef.current, options);
          setMap(map);
          setIsKakaoLoaded(true);
          // console.log('map 생성시 정보', map);

          // 지도 정보 얻어오기 - 디버깅용
          // const bounds = map.getBounds();
          // const mapInfo = {
          //   지도타입: map.getMapTypeId(),
          //   중심좌표: map.getCenter(),
          //   레벨: map.getLevel(),
          //   영역str: bounds.toString(),
          //   swLatlng: bounds.getSouthWest(),
          //   neLatlng: bounds.getNorthEast(),
          // };
          // console.log(mapInfo);
        });
      })
      .catch((_err) => {
        throw new Error(`[카카오 맵 로드 에러]`);
      });
  }, [setMap, setIsKakaoLoaded, lat, lng]);

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
