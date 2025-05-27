import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const PlaceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  padding: 15px;
  border-radius: 15px;

  background: ${theme.color.white};
  box-shadow: 0 3px 8px 0 rgb(0, 0, 0, 25%);
`;

export const PlaceName = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const PlaceAddress = styled.h2`
  color: ${theme.color.text.grey};
`;
