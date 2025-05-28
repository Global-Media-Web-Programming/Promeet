import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FixedPlaceText = styled.p`
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.color.text.blue};

  &:hover {
    text-decoration: underline;
  }
`;
