import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  padding: 40px 16px;

  background: ${theme.color.white};
`;

export const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.color.point1};
`;
