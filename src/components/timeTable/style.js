// filepath: [style.js](http://_vscodecontentref_/0)
import styled, { css } from 'styled-components';

export const CELL_SIZE = 40;
export const BORDER_SIZE = 2;

export const TableWrapper = styled.div`
  user-select: none;

  display: inline-block;

  border: none;
  border-radius: 8px;

  background: #ffffff;
  box-shadow: 0 2px 8px rgb(0, 0, 0, 4%);
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border-right: ${BORDER_SIZE}px solid #f5f6f7;
  border-bottom: ${BORDER_SIZE}px solid #f5f6f7;

  font-size: 0.95rem;

  background: ${({ selected }) => (selected ? '#C3E9E0' : '#fff')};

  transition: background 0.15s;

  &:last-child {
    border-right: none;
  }

  &:active {
    background: #c3e9e0;
  }
`;

export const HeaderCell = styled(Cell)`
  background: #ffffff;

  cursor: default;

  color: #6b7a99;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;

  ${({ $noTop }) =>
    $noTop &&
    css`
      border-top: none;
    `}
  ${({ $noLeft }) =>
    $noLeft &&
    css`
      border-left: none;
    `}
`;
