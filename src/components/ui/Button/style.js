import styled from 'styled-components';

export const BottomBar = styled.nav`
  position: absolute;
  z-index: 1000;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 70px;

  background-color: white;
  box-shadow: 0 -1px 6px rgb(0, 0, 0, 10%);
`;

export const NavButton = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  font-size: 24px;
  color: ${(props) => (props.active ? '#6dbbae' : '#002055')};

  background: none;
  outline: none;
`;

export const AddButton = styled.button`
  cursor: pointer;

  transform: translateY(-20%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;

  font-size: 32px;
  color: white;

  background-color: #6dbbae;
  outline: none;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 20%);
`;

export const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

export const ButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 328px;
  height: 60px;
  border-radius: 15px;

  background: #40b59f;
  box-shadow: 0 2px 8px rgb(16, 105, 227, 30%);
`;

export const ButtonText = styled.div`
  position: absolute;
  top: 22px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 328px;
  height: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
  text-align: center;
  letter-spacing: 0.2px;
  overflow-wrap: break-word;
`;

export const DisabledButtonWrapper = styled.button`
  position: relative;

  width: 328px;
  height: 60px;
  padding: 0;
  border: none;
  border-radius: 15px;

  background: none;
  outline: none;
`;

export const DisabledButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 328px;
  height: 60px;
  border-radius: 15px;

  background: #949494;
  box-shadow: 0 2px 8px rgb(16, 105, 227, 30%);
`;

export const DisabledButtonText = styled.span`
  position: absolute;
  top: 22px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 328px;
  height: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
  text-align: center;
  letter-spacing: 0.2px;
  overflow-wrap: break-word;
`;

export const StartButtonWrapper = styled.button`
  position: relative;

  width: 328px;
  height: 60px;
  padding: 0;
  border: none;
  border-radius: 32px;

  background: none;
  outline: none;
`;

export const StartButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 328px;
  height: 60px;
  border-radius: 15px;

  background: #164b4c;
  box-shadow: 0 2px 8px rgb(16, 105, 227, 30%);
`;

export const StartButtonText = styled.span`
  position: absolute;
  top: 22px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 328px;
  height: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
  text-align: center;
  letter-spacing: 0.2px;
  overflow-wrap: break-word;
`;
