import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background: rgb(0, 0, 0, 30%);
`;

export const Slide = styled.div`
  position: relative;

  width: 100%;
  max-width: 480px;
  padding: 32px 24px 24px;
  border-radius: 16px 16px 0 0;

  background: #ffffff;

  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  cursor: pointer;

  position: absolute;
  top: 16px;
  right: 20px;

  border: none;

  font-size: 2rem;

  background: none;
`;

export const TableSetting = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  margin: 24px 0;
`;

export const DaySelectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 60px;
  margin-right: 20px;
  padding: 0;
  border: none;

  font-family: Pretendard, sans-serif;
  font-weight: 700;
  font-style: normal;

  background: none;
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeButton = styled.button`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 70px;
  padding: 0;
  border: none;

  font-family: Pretendard, sans-serif;
  font-weight: 700;
  font-style: normal;

  background: none;
`;

export const AddButton = styled.button`
  cursor: pointer;

  padding: 0;
  border: none;

  font-family: Pretendard, sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #848a94;

  background: none;
`;
