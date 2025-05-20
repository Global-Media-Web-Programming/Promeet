import * as S from './style';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import useMapStore from '@/stores/map/mapStore';

// 지도 표시하는 컴포넌트
const MapContainer = ({ children }) => {
  const mapRef = useRef(null);
  const setMap = useMapStore((state) => state.setMap);
  const Kakao = window.kakao;

  if (!mapRef.current) return;

  const options = {
    center: new Kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  const mapInstance = new Kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

  setMap(mapInstance);

  return (
    <S.MapDiv ref={mapRef} style="width:500px;height:400px;">
      {children}
    </S.MapDiv>
  );
};

MapContainer.propTypes = {
  children: PropTypes.node,
};

export default MapContainer;
