import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import useMapStore from '@/stores/map/useMapStore';
import { Category, CategoryMarkerImages } from '@/constants/place';
import { MY_LOC_MARKER_IMG } from '@/constants/map';

const MarkerManager = ({ markers }) => {
  const { map } = useMapStore();
  const markersRef = useRef([]);
  const currentOverlayRef = useRef(null);
  const myLocationMarkerRef = useRef(null); // 내 위치 마커 별도로 관리
  const prevMyLocationRef = useRef(null); // 이전 내 위치 저장

  // console.log('map 사용시 정보', map);

  // 마커 초기화 함수
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
      currentOverlayRef.current = null;
    }
  };

  // 내 위치 마커 업데이트 함수
  const updateMyLocationMarker = useCallback(
    (markerData) => {
      // 위치가 같으면 업데이트 안함
      if (
        prevMyLocationRef.current &&
        markerData &&
        prevMyLocationRef.current.position.lat === markerData.position.lat &&
        prevMyLocationRef.current.position.lng === markerData.position.lng
      ) {
        return;
      }

      console.log('내 위치 마커 업데이트');
      // 기존 내 위치 마커 제거
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
      }

      if (!markerData) {
        prevMyLocationRef.current = null;
        return;
      }

      const imageSize = new window.kakao.maps.Size(30, 30);
      const imageOption = { offset: new window.kakao.maps.Point(20, 40) };
      const myLocMarkerImage = new window.kakao.maps.MarkerImage(
        MY_LOC_MARKER_IMG,
        imageSize,
        imageOption,
      );

      const position =
        markerData.position instanceof window.kakao.maps.LatLng
          ? markerData.position
          : new window.kakao.maps.LatLng(markerData.position.lat, markerData.position.lng);

      const myLocationMarker = new window.kakao.maps.Marker({
        position,
        image: myLocMarkerImage,
        map,
      });

      myLocationMarkerRef.current = myLocationMarker;
      prevMyLocationRef.current = markerData;
    },
    [map],
  ); // map만 의존성으로 추가

  // 내 위치 마커만 따로 관리하는 useEffect
  useEffect(() => {
    if (!map) return;
    const myLocationData = markers.find((marker) => marker.isMyLocation);
    if (!myLocationData) return;

    // 위치가 변경됐을 때만 업데이트
    const currentPosition = myLocationData.position;
    const prevPosition = prevMyLocationRef.current?.position;

    if (
      !prevPosition ||
      currentPosition.lat !== prevPosition.lat ||
      currentPosition.lng !== prevPosition.lng
    ) {
      updateMyLocationMarker(myLocationData);
    }
  }, [map, markers, updateMyLocationMarker]);

  // 일반 마커 관리를 위한 useEffect
  useEffect(() => {
    if (!map || !markers) return;

    console.log('마커 데이터:', markers); // 마커 데이터 확인

    // 기존 마커 제거 (내 위치 마커 제외)
    clearMarkers();

    // 새로운 마커 생성 (내 위치 마커 제외)
    markers.forEach((markerData) => {
      if (markerData.isMyLocation) return; // 내 위치 마커는 건너뛰기

      // 장소 마커
      if (markerData.place) {
        const imageSrc = CategoryMarkerImages[markerData.place.type];
        if (!imageSrc) return;

        const imageSize = new window.kakao.maps.Size(32, 34);
        const imageOption = { offset: new window.kakao.maps.Point(15, 45) };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new window.kakao.maps.Marker({
          position: markerData.position,
          image: markerImage,
          map: map,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (currentOverlayRef.current) {
            currentOverlayRef.current.setMap(null);
          }

          const content = `
            <div class="wrap">
              <div class="info">
                <div class="title">
                  ${markerData.place.name}
                  <div class="close" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" title="닫기"></div>
                </div>
                <div class="body">
                  <div class="desc">
                    <div class="ellipsis">${markerData.place.phone || ''}</div>
                    <div class="ellipsis">${markerData.place.address || ''}</div>
                    ${markerData.place.link ? `<div><a href="${markerData.place.link}" target="_blank" rel="noopener noreferrer" class="link">정보 보기</a></div>` : ''}
                  </div>
                </div>
              </div>
            </div>
          `;

          const overlay = new window.kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition(),
            yAnchor: 1,
          });

          overlay.setMap(map);
          currentOverlayRef.current = overlay;
        });

        markersRef.current.push(marker);
      }
      // 프로필 마커
      else if (markerData.profile) {
        const marker = new window.kakao.maps.Marker({
          position: markerData.position,
          map: map,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (currentOverlayRef.current) {
            currentOverlayRef.current.setMap(null);
          }

          const content = `
            <div class="profile-overlay">
              ${markerData.profile.profile_img ? `<img src="${markerData.profile.profile_img}" alt="profile" />` : ''}
              <p>${markerData.profile.nickname}</p>
            </div>
          `;

          const overlay = new window.kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition(),
            yAnchor: 1.5,
          });

          overlay.setMap(map);
          currentOverlayRef.current = overlay;

          // 해당 마커로 부드럽게 이동
          map.panTo(marker.getPosition());
        });

        markersRef.current.push(marker);
      }
    });

    // 지도 영역 변경시 마커 표시/숨김 처리
    const boundsChangedListener = window.kakao.maps.event.addListener(map, 'bounds_changed', () => {
      const bounds = map.getBounds();
      markersRef.current.forEach((marker) => {
        const position = marker.getPosition();
        marker.setVisible(bounds.contain(position));
      });
    });

    return () => {
      clearMarkers();
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
      }
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
    };
  }, [map, markers.filter((marker) => !marker.isMyLocation)]); // 내 위치 마커를 제외한 마커들이 변경될 때만 실행

  return null;
};

MarkerManager.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      isMyLocation: PropTypes.bool,
      place: PropTypes.shape({
        type: PropTypes.oneOf(Object.values(Category)).isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string,
        address: PropTypes.string.isRequired,
        link: PropTypes.string,
      }),
      profile: PropTypes.shape({
        profile_img: PropTypes.string,
        nickname: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};

export default MarkerManager;
