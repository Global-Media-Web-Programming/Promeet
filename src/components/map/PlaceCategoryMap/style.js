import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const TabsWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 16px;
  left: 16px;
`;

export const List = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 200px;
  background-color: ${theme.color.white};
`;
