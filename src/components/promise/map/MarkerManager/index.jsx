import './style.css';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useMarkerInfo, useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { CATEGORY, CATEGORY_MARKER_IMAGE } from '@/constants/place';
import { MY_LOC_MARKER_IMG, MY_LOC_MARKER_ID, MAP_BS_ID } from '@/constants/map';

const MarkerManager = ({ markers }) => {
  const { map } = useMapInfo();
  const { activeMarkerId } = useMarkerInfo();
  const { setActiveMarkerId, setSelectedOverlayId } = useMarkerActions();
  const markersRef = useRef([]);
  const markerMapRef = useRef(new Map()); // 마커 ID와 마커 객체를 매핑
  const currentOverlayRef = useRef(null);
  const myLocationMarkerRef = useRef(null);
  const { setActiveBottomSheet } = useBottomSheetActions();

  // 내 위치 마커 관리
  useEffect(() => {
    if (!map) return;

    const myLocationMarker = markers.find((marker) => marker.placeId === MY_LOC_MARKER_ID);
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
        myLocationMarker.position.Ma,
        myLocationMarker.position.La,
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
      myLocationMarker.position.Ma,
      myLocationMarker.position.La,
    );

    const myLocMarker = new window.kakao.maps.Marker({
      position,
      image: myLocMarkerImage,
      map,
    });

    myLocationMarkerRef.current = myLocMarker;
  }, [map, markers]);

  // activeMarkerId 변경 감지해 오버레이 표시
  useEffect(() => {
    if (!map || !activeMarkerId) {
      if (currentOverlayRef.current) {
        currentOverlayRef.current.setMap(null);
        currentOverlayRef.current = null;
      }
      return;
    }

    const marker = markerMapRef.current.get(activeMarkerId);
    if (!marker) return;

    const markerData = markers.find((m) => m.placeId === activeMarkerId);
    if (!markerData) return;

    // 이전 오버레이 닫고
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
    }

    const container = document.createElement('div');
    container.className = 'infoContainer';
    container.onclick = () => {
      setSelectedOverlayId(markerData.placeId);
      setActiveBottomSheet(MAP_BS_ID);
    };

    const header = document.createElement('header');
    header.className = 'header';

    const title = document.createElement('h2');
    title.className = 'title ellipsis';
    title.textContent = markerData.name;

    const closeBtn = document.createElement('div');
    closeBtn.className = 'close';
    closeBtn.title = '닫기';
    closeBtn.textContent = '닫기';
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      setActiveMarkerId(null);
      container.remove();
    };

    header.appendChild(title);
    header.appendChild(closeBtn);
    container.appendChild(header);

    const body = document.createElement('div');
    body.className = 'body';

    if (markerData.address) {
      const address = document.createElement('div');
      address.className = 'ellipsis';
      address.textContent = markerData.address;
      body.appendChild(address);
    }

    container.appendChild(body);

    const overlay = new window.kakao.maps.CustomOverlay({
      content: container,
      position: marker.getPosition(),
      yAnchor: 1.65,
    });

    overlay.setMap(map);
    currentOverlayRef.current = overlay;
  }, [map, markers, activeMarkerId, setActiveMarkerId, setActiveBottomSheet, setSelectedOverlayId]);

  // 장소/프로필 마커 관리
  useEffect(() => {
    if (!map || !markers) return;

    const placeAndProfileMarkers = markers.filter((marker) => !marker.isMyLocation);
    markerMapRef.current.clear();

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
      const position = new window.kakao.maps.LatLng(markerData.position.La, markerData.position.Ma);

      // 프로필 마커
      if (markerData.profile) {
        const content = `
          <div class="profile-overlay">
            ${markerData.profile.profile_img ? `<img src="${markerData.profile.profile_img}" alt="profile" />` : ''}
            <p>${markerData.profile.nickname}</p>
          </div>
        `;

        const overlay = new window.kakao.maps.CustomOverlay({
          content,
          position,
        });

        overlay.setMap(map);
        markersRef.current.push(overlay);
      }
      // 장소 마커
      if (markerData) {
        const imageSrc = CATEGORY_MARKER_IMAGE[markerData.type];
        if (!imageSrc) return;

        const imageSize = new window.kakao.maps.Size(32, 34);
        const imageOption = { offset: new window.kakao.maps.Point(15, 40) };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new window.kakao.maps.Marker({
          position,
          image: markerImage,
          map,
        });

        if (markerData.placeId) {
          markerMapRef.current.set(markerData.placeId, marker);
        }

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (markerData.placeId) {
            setActiveMarkerId(markerData.placeId);
          }
        });

        marker.setMap(map);
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
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
    };
  }, [map, markers, setActiveMarkerId]);

  return null;
};

MarkerManager.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        La: PropTypes.number.isRequired,
        Ma: PropTypes.number.isRequired,
      }).isRequired,
      placeId: PropTypes.string,
      type: PropTypes.oneOf(Object.values(CATEGORY)),
      name: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      link: PropTypes.string,
      isLiked: PropTypes.bool,
      likesCount: PropTypes.number,
      // 내 프로필 마커
      profile: PropTypes.shape({
        profile_img: PropTypes.string,
        nickname: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default MarkerManager;
