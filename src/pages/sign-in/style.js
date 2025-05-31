import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  font-family: 'Pretendard Variable', sans-serif;

  background: #ffffff;
`;

export const InnerBox = styled.div`
  position: relative;

  overflow: hidden;

  width: 375px;
  height: 667px;
  border-radius: 24px;

  background: white;
  box-shadow: 0 4px 24px rgb(0, 0, 0, 6%);
`;

export const StatusBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 375px;
  height: 44px;
`;

export const TimeText = styled.div`
  position: absolute;
  top: 14px;
  left: 24.89px;

  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  color: #555555;
`;

export const StatusDot = styled.div`
  position: absolute;
  top: 18.92px;
  left: 343px;

  width: 18px;
  height: 7.67px;
  border-radius: 1.6px;

  background: #555555;
`;

export const Title = styled.div`
  position: absolute;
  top: 212px;
  left: 42%;
  transform: translateX(-50%);

  font-family: 'Pretendard Variable', sans-serif;
  font-size: 25px;
  font-weight: 600;
  line-height: 25px;
  color: #002055;
  word-wrap: break-word;
`;

export const InputWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: 50%;
  transform: translateX(-50%);

  width: 327px; /* 너비 고정 */
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 457px;
  left: 50%;
  transform: translateX(-50%);

  width: 327px;
`;
