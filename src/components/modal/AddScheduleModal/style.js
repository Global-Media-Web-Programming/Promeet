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

export const DaySelectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TimeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 20px;
`;

export const TimeLabel = styled.span`
  min-width: 70px;
  font-size: 1rem;
  color: #555555;
`;

export const TimeButton = styled.button`
  cursor: pointer;

  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;

  font-size: 1rem;
  color: #222222;

  background: #f5f6fa;

  transition:
    background 0.2s,
    border 0.2s;

  &:hover,
  &:focus {
    border-color: #4f8cff;
    background: #e6f0ff;
    outline: none;
  }
`;
