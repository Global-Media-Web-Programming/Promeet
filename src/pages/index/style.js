import styled from 'styled-components';

export const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  padding-bottom: 90px;

  font-family: Pretendard, sans-serif;
  color: #333333;
`;

export const Header = styled.header`
  padding: 24px;
`;

export const HeaderRow = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 30px;
`;

export const AlarmIcon = styled.img`
  cursor: pointer;

  position: absolute;
  right: 30px;

  width: 50px;
  height: 50px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 20px;
  font-weight: 500;
  line-height: 18px;
  color: var(--text-blue, #002055);
  text-align: center;
`;

export const Greeting = styled.div`
  margin-top: 50px;

  font-size: 25px;
  font-weight: 700;
  line-height: 36px;
  color: var(--text-black, #555555);
  text-align: left;
`;

export const CardSliderWrapper = styled.div`
  touch-action: pan-y;

  position: relative;

  overflow: hidden;

  width: ${({ cardWidth, visibleWidth }) => cardWidth + visibleWidth}px;
  height: 180px;
  margin: 0 auto;
`;

export const CardSlider = styled.div`
  transform: ${({ cardIdx, cardWidth, cardGap }) =>
    `translateX(-${cardIdx * (cardWidth + cardGap)}px)`};
  display: flex;
  gap: ${({ cardGap }) => cardGap}px;
  transition: transform 0.3s;
`;

export const CardWrapper = styled.div`
  position: relative;

  width: ${({ cardWidth }) => cardWidth}px;
  min-width: ${({ cardWidth }) => cardWidth}px;
  max-width: ${({ cardWidth }) => cardWidth}px;
  border-radius: 16px;

  opacity: ${({ active }) => (active ? 100% : 60%)};
  background: #ffffff;
  box-shadow: ${({ active }) => (active ? '0 4px 24px rgba(0,0,0,0.10)' : 'none')};
`;

export const SectionTitle = styled.div`
  margin: 24px 24px 12px;

  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  color: var(--text-blue, #002055);
`;

export const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  max-width: 390px;
  margin: 0 auto;
`;

export const AppointmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
  height: 100px;
  padding: 0 24px;
  border: 1px solid #e9f1ff;
  border-radius: 16px;

  background: white;
`;

export const AppointmentInfo = styled.div`
  flex: 1;
  margin-right: 16px;

  small {
    font-size: 13px;
    color: #848a94;
  }

  h4 {
    margin: 4px 0 0;
    font-size: 18px;
    font-weight: 600;
  }

  span {
    font-size: 13px;
    color: #848a94;
  }
`;
