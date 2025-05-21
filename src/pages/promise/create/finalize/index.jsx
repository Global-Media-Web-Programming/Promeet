import * as S from './style';
import Tabs from '@/components/ui/Tabs';
import MapContainer from '@/components/map/MapContainer';
import MarkerManager from '@/components/map/MapContainer';
import useTabsStore from '@/stores/ui/useTabsStore';

const FinalizePage = () => {
  const { selectedValue } = useTabsStore();
  console.log('선택된 탭 값', selectedValue);
  return (
    <>
      <S.TabsWrapper>
        <Tabs defaultValue={'restaurant'} option="장소 카테고리 탭">
          <Tabs.List>
            <Tabs.Trigger value={'restaurant'} label="음식점" />
            <Tabs.Trigger value={'cafe'} label="카페" />
            <Tabs.Trigger value={'studyCafe'} label="스터디 카페" />
            <Tabs.Trigger value={'activity'} label="놀거리" />
          </Tabs.List>
        </Tabs>
      </S.TabsWrapper>
      <MapContainer>
        <MarkerManager />
      </MapContainer>
    </>
  );
};

export default FinalizePage;
