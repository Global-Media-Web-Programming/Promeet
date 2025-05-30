import * as S from './style';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTabsActions } from '@/hooks/stores/ui/useTabsStore';
import List from './components/List';
import Trigger from './components/Trigger';
import Panel from './components/Panel';

/**
 * Tabs 컴포넌트
 *
 * @param {string} option - 탭 종류
 * @param {string} defaultValue - 기본 선택값
 * @param {node} children - 탭 구성 요소
 */
const Tabs = ({ option, defaultValue, children }) => {
  const { setSelectedValue, setOption } = useTabsActions();

  useEffect(() => {
    setSelectedValue(defaultValue);
    setOption(option);
  }, [defaultValue, option, setSelectedValue, setOption]);

  return <S.TabsContainer>{children}</S.TabsContainer>;
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

Tabs.propTypes = {
  option: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;

/**
 * 사용 예시
 * import { FilterTabs } from '@/components'
 * import { useFilterTabsStore } from '@/stores';
 * 
 * <Tabs defaultValue="duration" option="이벤트 필터 탭">
    <Tabs.List>
      <Tabs.Trigger value="duration" label="기간" />
      <Tabs.Trigger value="price" label="비용" />
      <Tabs.Trigger value="location" label="지역" />
    </Tabs.List>
    <Tabs.Panel value="duration">
      <div>요소3</div>
    </Tabs.Panel>
    <Tabs.Panel value="price">
      <div>요소4</div>
    </Tabs.Panel>
    <Tabs.Panel value="location">
      <div>요소5</div>
    </Tabs.Panel>
  </Tabs>
 */
