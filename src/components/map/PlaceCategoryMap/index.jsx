// PlaceCategoryMap.jsx
import * as S from './style';
import Tabs from '@/components/ui/Tabs';
import MapContainer from '@/components/map/MapContainer';
import SearchPlace from '@/components/map/SearchPlace';
import useTabsStore from '@/stores/ui/useTabsStore';
import { Category, CategoryLabel } from '@/constants/place';

const PlaceCategoryMap = () => {
  const { selectedValue } = useTabsStore();

  return (
    <>
      <S.TabsWrapper>
        <Tabs defaultValue={Category.RESTAURANT} option="장소 카테고리 탭">
          <Tabs.List>
            {Object.entries(CategoryLabel).map(([value, label]) => (
              <Tabs.Trigger key={value} value={value} label={label} />
            ))}
          </Tabs.List>
        </Tabs>
      </S.TabsWrapper>

      <MapContainer>
        <SearchPlace category={selectedValue} />
      </MapContainer>
    </>
  );
};

export default PlaceCategoryMap;
