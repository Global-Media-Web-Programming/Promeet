import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMapStore from '@/stores/map/mapStore';
import { Category, CategoryMarkerImages } from '@/constants/place';

const MarkerManager = ({ markers }) => {
  const { map } = useMapStore();
  const markersRef = useRef([]);
  const currentOverlayRef = useRef(null);

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

  useEffect(() => {
    if (!map || !markers) return;

    // 기존 마커 제거
    clearMarkers();

    // 새로운 마커 생성
    markers.forEach((markerData) => {
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
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
    };
  }, [map, markers]); // markers props가 바뀔때 마커 변경

  return null;
};

MarkerManager.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
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
