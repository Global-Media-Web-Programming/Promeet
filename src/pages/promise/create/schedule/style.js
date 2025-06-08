import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: ${theme.color.point1};
`;

export const TableScrollWrapper = styled.div`
  overflow: auto;

  width: 100%;
  max-width: 400px;
  max-height: 600px;
`;

export const TableInnerWrapper = styled.div`
  width: fit-content;
  min-width: 400px;
`;
