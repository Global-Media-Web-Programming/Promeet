import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import EmptyHeartSvg from '@/assets/img/icon/empty_heart.svg?react';
import FilledHeartSvg from '@/assets/img/icon/filled_heart.svg?react';

export const PlaceCard = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 15px;
  border-radius: 15px;

  background: ${theme.color.white};
  box-shadow: 0 3px 8px 0 rgb(0, 0, 0, 25%);
`;

const ellipseStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardHeaderWrapper = styled.header`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PlaceName = styled.h3`
  font-weight: 700;
  max-width: 200px;
  ${ellipseStyle}
`;

export const PlaceAddress = styled.p`
  font-size: 12px;
  color: ${theme.color.text.grey};
  max-width: 200px;
  ${ellipseStyle}
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const IconStyle = css`
  cursor: pointer;
`;
export const EmptyHeartIcon = styled(EmptyHeartSvg)`
  ${IconStyle}
`;
export const FilledHeartIcon = styled(FilledHeartSvg)`
  ${IconStyle}
`;

export const heartCnt = styled.p`
  font-weight: 700;
  color: ${theme.color.text.grey};
`;

/* 스켈레톤 */
export const SkeletonName = styled.div`
  width: 125px;
  height: 20px;
  border-radius: 5px;
  background: #e0e0e0;
`;

export const SkeletonAddress = styled.div`
  width: 200px;
  height: 14px;
  border-radius: 5px;
  background: #e0e0e0;
`;
