import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const JoinTitle = styled.h1`
  font-family: Pretendard, sans-serif;
  font-size: 36px;
  font-weight: 600;
  font-style: normal;
  color: ${theme.color.text.blue};
`;

export const PromiseName = styled.h2`
  margin-top: 50px;

  font-family: Pretendard, sans-serif;
  font-size: 30px;
  font-weight: 600;
  font-style: normal;
  color: ${theme.color.text.black};
`;

export const PromiseDescription = styled.p`
  margin-top: 25px;

  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  color: ${theme.color.text.black};
`;

export const Divider = styled.div`
  width: 100%;
  height: 11px;
  margin: 30px 0;
  background-color: #e9e9e9;
`;
