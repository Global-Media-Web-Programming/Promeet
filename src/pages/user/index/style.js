import styled from 'styled-components';

export const Container = styled.section`
  position: relative;

  overflow-y: auto;

  max-width: 430px;
  min-height: 1000px;
  margin: 0 auto;

  font-family: Pretendard, 'Helvetica Neue', Arial, sans-serif;

  background: white;
`;

export const FixedCard = styled.div`
  position: absolute;
  top: 153px;
  left: 26px;

  overflow: hidden;

  width: 380px;
  height: 166px;
  border-radius: 16px;

  background: #40b59f;
`;

export const FixedCardBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #3aa690;
`;

export const FixedCardBgBlue = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 100, 255, 10%);
`;

export const FixedCardLight = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgb(255, 255, 255, 30%), transparent);
`;

export const FixedCardTitle = styled.h3`
  position: absolute;
  top: 24px;
  top: 20%;
  left: 20px;

  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const FixedCardDesc = styled.p`
  position: absolute;
  top: 60px;
  top: 60%;
  left: 20px;

  font-size: 16px;
  line-height: 21px;
  color: white;
`;

export const SectionTitle = styled.h4`
  position: absolute;
  left: 26px;

  font-size: 18px;
  font-weight: 600;
  color: #002055;
`;

export const CircleCard = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 98px;
  height: 98px;
  border-radius: 50%;

  background: transparent;
`;

export const CircleProgress = styled.svg`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  width: 98px;
  height: 98px;
`;

export const CircleCardDday = styled.div`
  position: absolute;
  z-index: 2;
  top: 36px;
  left: 0;

  width: 100%;

  font-size: 16px;
  font-weight: bold;
  color: #002055;
  text-align: center;
`;

export const CircleCardLabel = styled.div`
  position: absolute;
  z-index: 2;
  bottom: -28px;

  width: 100%;

  font-size: 12px;
  color: #002055;
  text-align: center;
`;

export const InviteCard = styled.div`
  position: absolute;

  width: 98px;
  height: 98px;
  border: 3px solid #d1e2fe;
  border-radius: 50%;

  background: transparent;
`;

export const InviteCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fef7ec;
`;

export const InviteAccept = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);

  font-size: 12px;
  color: #6dbbae;
`;

export const InviteLabel = styled.div`
  position: absolute;
  top: 20px;
  left: 10px;

  font-size: 14px;
  font-weight: bold;
  color: #002055;
`;

export const UserHeader = styled.div`
  position: absolute;
  top: 30px;
  right: 26px;
  left: 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 40px;
  margin-top: 60px;
`;

export const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: none;
  background: transparent;

  img {
    width: 24px;
    height: 24px;
  }
`;
