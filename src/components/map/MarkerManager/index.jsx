import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMapStore from '@/stores/map/useMapStore';
import { Category, CategoryMarkerImages } from '@/constants/place';
import { MY_LOC_MARKER_IMG } from '@/constants/map';

const MarkerManager = ({ markers }) => {
  const { map } = useMapStore();
  const markersRef = useRef([]);
  const currentOverlayRef = useRef(null);
  const myLocationMarkerRef = useRef(null);

  // 내 위치 마커 관리
  useEffect(() => {
    if (!map) return;

    const myLocationMarker = markers.find((marker) => marker.isMyLocation);
    if (!myLocationMarker) {
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
        myLocationMarkerRef.current = null;
      }
      return;
    }

    if (myLocationMarkerRef.current) {
      const currentPos = myLocationMarkerRef.current.getPosition();
      const newPos = new window.kakao.maps.LatLng(
        myLocationMarker.position.lat,
        myLocationMarker.position.lng,
      );

      if (currentPos.getLat() !== newPos.getLat() || currentPos.getLng() !== newPos.getLng()) {
        myLocationMarkerRef.current.setPosition(newPos);
      }
      return;
    }

    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(20, 20) };
    const myLocMarkerImage = new window.kakao.maps.MarkerImage(
      MY_LOC_MARKER_IMG,
      imageSize,
      imageOption,
    );

    const position = new window.kakao.maps.LatLng(
      myLocationMarker.position.lat,
      myLocationMarker.position.lng,
    );

    const myLocMarker = new window.kakao.maps.Marker({
      position,
      image: myLocMarkerImage,
      map,
    });

    myLocationMarkerRef.current = myLocMarker;
  }, [map, markers]);

  // 장소/프로필 마커 관리
  useEffect(() => {
    if (!map || !markers) return;

    const placeAndProfileMarkers = markers.filter((marker) => !marker.isMyLocation);

    // 기존 마커 제거 (내 위치 마커 제외)
    markersRef.current.forEach((marker) => {
      if (!marker.isMyLocation) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
      currentOverlayRef.current = null;
    }

    // 새로운 마커 생성
    placeAndProfileMarkers.forEach((markerData) => {
      // 장소 마커
      if (markerData.place) {
        const imageSrc = CategoryMarkerImages[markerData.place.type];
        if (!imageSrc) return;

        const imageSize = new window.kakao.maps.Size(32, 34);
        const imageOption = { offset: new window.kakao.maps.Point(15, 40) };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new window.kakao.maps.Marker({
          position: markerData.position,
          image: markerImage,
          map,
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

        marker.setMap(map);
        markersRef.current.push(marker);
      }
      // 프로필 마커
      else if (markerData.profile) {
        const content = `
          <div class="profile-overlay">
            ${markerData.profile.profile_img ? `<img src="${markerData.profile.profile_img}" alt="profile" />` : ''}
            <p>${markerData.profile.nickname}</p>
          </div>
        `;

        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          position: markerData.position,
        });

        overlay.setMap(map);
        markersRef.current.push(overlay);
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
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
    };
  }, [map, markers]);

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
