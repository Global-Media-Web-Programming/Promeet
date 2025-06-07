import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgb(0, 0, 0, 20%);
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  min-width: 320px;
  padding: 24px;
  border-radius: 12px;

  background: #ffffff;
  box-shadow: 0 2px 16px #00000022;
`;

export const Title = styled.h3`
  margin-bottom: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  font-style: normal;
  color: #000000;
`;

export const List = styled.ul`
  overflow-y: auto;
  max-height: 200px;
  margin-bottom: 16px;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ScheduleInfo = styled.span`
  flex: 1;

  font-family: Pretendard, sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #848a94;
`;

export const TitleText = styled.span`
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #4d5e80;
`;

export const DeleteButton = styled.button`
  cursor: pointer;

  margin-left: 8px;
  padding: 3px 10px;
  border: none;
  border-radius: 4px;

  font-family: Pretendard, sans-serif;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  color: #ffffff;

  background: #ff4d4f;

  &:hover {
    background: #d9363e;
  }
`;

export const CloseButton = styled.button`
  cursor: pointer;

  width: 100%;
  margin-top: 4px;
  padding: 8px 0;
  border: none;
  border-radius: 6px;

  font-size: 1rem;

  background: #eeeeee;

  &:hover {
    background: #e0e7ef;
  }
`;
