import './style.css';
import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMapInfo } from '@/hooks/stores/promise/map/useMapStore';
import { useMarkerInfo, useMarkerActions } from '@/hooks/stores/promise/map/useMarkerStore';
import { useBottomSheetActions } from '@/hooks/stores/ui/useBottomSheetStore';
import { CATEGORY, CATEGORY_MARKER_IMAGE, STATION_MARKER_IMAGE } from '@/constants/place';
import { MY_LOC_MARKER_IMG, MY_LOC_MARKER_ID, MAP_BS_ID, ROUTE_COLORS } from '@/constants/map';

const MarkerManager = ({ markers, routes }) => {
  const { map } = useMapInfo();
  const { activeMarkerId } = useMarkerInfo();
  const { setActiveMarkerId, setSelectedOverlayId } = useMarkerActions();
  const { setActiveBottomSheet } = useBottomSheetActions();

  // 마커 관리 refs
  const markersRef = useRef([]); // 모든 마커/오버레이/polyline
  const markerMapRef = useRef(new Map()); // placeId와 마커 매핑
  const currentOverlayRef = useRef(null);
  const myLocationMarkerRef = useRef(null);

  // 마커 정리 함수
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker?.setMap?.(null));
    markersRef.current = [];
    markerMapRef.current.clear();
    currentOverlayRef.current?.setMap(null);
    currentOverlayRef.current = null;
    myLocationMarkerRef.current?.setMap(null);
    myLocationMarkerRef.current = null;
  }, []);

  // 지도 영역 변경시 마커 표시/숨김
  const handleBoundsChanged = useCallback(() => {
    if (!map) return;
    const bounds = map.getBounds();

    markersRef.current.forEach((marker) => {
      if (!marker) return;
      if (marker.getPosition) {
        markersRef.current.forEach((marker) => {
          const position = marker.getPosition();
          marker.setVisible(bounds.contain(position));
        });
      }
    });
  }, [map]);

  // 마커 생성 및 관리
  useEffect(() => {
    if (!map) return;

    clearMarkers();

    // 1. 장소 마커 생성
    markers.forEach((markerData) => {
      if (markerData.placeId === MY_LOC_MARKER_ID) return; // 내 위치 마커는 별도 처리

      const position = new window.kakao.maps.LatLng(markerData.position.La, markerData.position.Ma);
      const imageSrc = CATEGORY_MARKER_IMAGE[markerData.type];
      if (!imageSrc) return;

      const marker = new window.kakao.maps.Marker({
        position,
        image: new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(32, 34), {
          offset: new window.kakao.maps.Point(15, 40),
        }),
        map,
      });

      if (markerData.placeId) {
        markerMapRef.current.set(markerData.placeId, marker);
        window.kakao.maps.event.addListener(marker, 'click', () =>
          setActiveMarkerId(markerData.placeId),
        );
      }

      markersRef.current.push(marker);
    });

    // 2. 내 위치 마커 생성
    const myLocationMarker = markers.find((m) => m.placeId === MY_LOC_MARKER_ID);
    if (myLocationMarker) {
      const position = new window.kakao.maps.LatLng(
        myLocationMarker.position.Ma,
        myLocationMarker.position.La,
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: new window.kakao.maps.MarkerImage(
          MY_LOC_MARKER_IMG,
          new window.kakao.maps.Size(30, 30),
          {
            offset: new window.kakao.maps.Point(20, 20),
          },
        ),
        map,
      });

      myLocationMarkerRef.current = marker;
      markersRef.current.push(marker);
    }

    // 3. 경로 마커 생성
    if (routes) {
      routes.forEach((userRoute, index) => {
        // polyline
        const path = userRoute.route.map(
          (station) =>
            new window.kakao.maps.LatLng(station.station.position.La, station.station.position.Ma),
        );

        const polyline = new window.kakao.maps.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: ROUTE_COLORS[index % ROUTE_COLORS.length],
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
          map,
        });
        markersRef.current.push(polyline);

        // 사용자 정보 오버레이
        const firstStation = userRoute.route[0].station;
        const totalDuration = userRoute.route.reduce((acc, curr) => acc + curr.duration, 0);

        const userOverlay = new window.kakao.maps.CustomOverlay({
          content: `
            <div class="userInfoOverlay">
              <div class="durationContainer">
                <div class="bold">${firstStation.name}</div> 
                에서
                <div class="bold"> ${totalDuration}분</div>
              </div>
              <div class="userName">${userRoute.name}</div>
            </div>
          `,
          position: new window.kakao.maps.LatLng(
            firstStation.position.La,
            firstStation.position.Ma,
          ),
          yAnchor: 1.5,
          map,
        });
        markersRef.current.push(userOverlay);

        // 도착역
        const lastStation = userRoute.route[userRoute.route.length - 1].station;

        // 마커
        const stationPosition = new window.kakao.maps.LatLng(
          lastStation.position.La,
          lastStation.position.Ma,
        );
        const imageSrc = STATION_MARKER_IMAGE;
        if (!imageSrc) return;

        const lastStationMarker = new window.kakao.maps.Marker({
          stationPosition,
          image: new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(30, 30), {
            offset: new window.kakao.maps.Point(10, 30),
          }),
          map,
        });
        markersRef.current.push(lastStationMarker);

        // 오버레이
        const stationOverlay = new window.kakao.maps.CustomOverlay({
          content: `
            <div class="stationInfoOverlay">
              <div class="stationName">${lastStation.name}</div>
            </div>
          `,
          position: stationPosition,
          map,
        });
        markersRef.current.push(stationOverlay);
      });
    }

    // 지도 영역 변경 이벤트 리스너 등록
    window.kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);

    return () => {
      window.kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
      clearMarkers();
    };
  }, [map, markers, routes, clearMarkers, handleBoundsChanged, setActiveMarkerId]);

  // activeMarkerId 변경시 오버레이 처리
  useEffect(() => {
    if (!map || !activeMarkerId) {
      currentOverlayRef.current?.setMap(null);
      currentOverlayRef.current = null;
      return;
    }

    const marker = markerMapRef.current.get(activeMarkerId);
    const markerData = markers.find((m) => m.placeId === activeMarkerId);
    if (!marker || !markerData) return;

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

    console.log(marker);

    const overlay = new window.kakao.maps.CustomOverlay({
      content: container,
      position: marker.getPosition(),
      yAnchor: 1.65,
    });

    overlay.setMap(map);
    currentOverlayRef.current = overlay;
  }, [map, markers, activeMarkerId, setActiveMarkerId, setActiveBottomSheet, setSelectedOverlayId]);

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
    }),
  ).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      route: PropTypes.arrayOf(
        PropTypes.shape({
          station: PropTypes.shape({
            order: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.shape({
              La: PropTypes.number.isRequired,
              Ma: PropTypes.number.isRequired,
            }).isRequired,
          }).isRequired,
          duration: PropTypes.number.isRequired,
        }),
      ),
    }),
  ),
};

export default MarkerManager;
