// PlaceCategoryMap.jsx
import * as S from './style';
import Tabs from '@/components/ui/Tabs';
import MapContainer from '@/components/map/MapContainer';
import SearchPlace from '@/components/map/SearchPlace';
import useTabsStore from '@/stores/ui/useTabsStore';
import useMyLocationsStore from '@/stores/map/useMyLocationsStore';
import { Category, CategoryLabel } from '@/constants/place';

const PlaceCategoryMap = () => {
  const { selectedValue } = useTabsStore();
  const { allowMyLocation, setMyLocation } = useMyLocationsStore();
  const schollLat = 37.494705526855;
  const schoolLng = 126.95994559383;

  const handleMyLocationClick = () => {
    if (!allowMyLocation) alert('위치 동의 필요');
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMyLocation({
              position: { lat: latitude, lng: longitude },
              isMyLocation: true, // 내 위치 마커 구분용
            });
          },
          (error) => console.error(error),
        );
      }
    }
  };

  return (
    <>
      <MapContainer lat={schollLat} lng={schoolLng}>
        <SearchPlace category={selectedValue} />
      </MapContainer>
      <S.TabsWrapper>
        <Tabs defaultValue={Category.RESTAURANT} option="장소 카테고리 탭">
          <Tabs.List>
            {Object.entries(CategoryLabel).map(([value, label]) => (
              <Tabs.Trigger key={value} value={value} label={label} />
            ))}
          </Tabs.List>
        </Tabs>
      </S.TabsWrapper>
      <S.MyLocationIcon onClick={handleMyLocationClick} />
    </>
  );
};

export default PlaceCategoryMap;
