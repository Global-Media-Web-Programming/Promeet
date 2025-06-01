import styled from 'styled-components';

export const CircleCard = styled.div`
  position: relative;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CircleProgressWrapper = styled.div`
  position: relative;
  width: 98px;
  height: 98px;
`;

export const CircleProgress = styled.svg`
  position: relative;
  top: 0;
  left: 0;

  width: 98px;
  height: 98px;
`;

export const CircleCardDday = styled.div`
  position: relative;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 18px;
  font-weight: 700;
  color: #002055;
`;

export const CircleCardCenterText = styled.div`
  position: relative;
  z-index: 2;
  top: 36px;

  width: 100%;

  font-size: 16px;
  font-weight: bold;
  color: #002055;
  text-align: center;
`;

export const CircleCenterText = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 16px;
  font-weight: bold;
  color: #001a41;
`;

export const CircleCardLabel = styled.div`
  margin-top: 10px;

  font-size: 13px;
  color: #001a41;
  text-align: center;
  white-space: nowrap;
`;
