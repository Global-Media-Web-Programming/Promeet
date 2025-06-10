import React, { useState, useRef } from 'react';
import * as S from './style';
import Card from '../../components/ui/card';
import AppointmentCard from '../../components/ui/ddaycard/AppointmentCard';
import alarmIcon from '../../assets/img/icon/alarm.svg';

const cards = [
  { title: '웹플밍 팀플', desc: '18:00 정보과학관 1층', avatars: [], dday: 'D-DAY' },
  { title: '알고리즘 스터디', desc: '20:00 도서관 3층', avatars: [], dday: 'D-2' },
];

const appointments = [
  { small: '롯데월드 앞 사거리', title: '롯데월드 팟', date: '2025.05.01', dday: 'D-1' },
  { small: '중앙대 제 2번 출구', title: '술 약속', date: '2025.05.08', dday: 'D-7' },
  {
    small: '장소가 안정해졌어요. 추천해드릴까요?',
    title: '정기 스터디',
    date: '2025.05.09',
    dday: 'D-8',
  },
];

const CARD_WIDTH = 300;
const CARD_GAP = 16;
const VISIBLE_WIDTH = 60;

const HomePage = () => {
  const [cardIdx, setCardIdx] = useState(0);
  const startX = useRef(null);

  const handleDragStart = (e) => {
    startX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e) => {
    if (startX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current;

    if (diff > 50) {
      setCardIdx((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    } else if (diff < -50) {
      setCardIdx((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }

    startX.current = null;
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderRow>
          <S.TopRow>Friday, 30</S.TopRow>
          <S.AlarmIcon src={alarmIcon} alt="알람" />
        </S.HeaderRow>
        <S.Greeting>
          박숭실님,
          <br />
          오늘 일정 잊지 않으셨죠?
        </S.Greeting>
      </S.Header>

      <S.CardSliderWrapper
        cardWidth={CARD_WIDTH}
        visibleWidth={VISIBLE_WIDTH}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
      >
        <S.CardSlider cardIdx={cardIdx} cardWidth={CARD_WIDTH} cardGap={CARD_GAP}>
          {cards.map((card, i) => (
            <S.CardWrapper key={i} cardWidth={CARD_WIDTH} active={cardIdx === i}>
              <Card
                title={card.title}
                subtitle={card.desc}
                dday={card.dday}
                avatars={card.avatars}
              />
            </S.CardWrapper>
          ))}
        </S.CardSlider>
      </S.CardSliderWrapper>

      <S.SectionTitle>다가오는 약속</S.SectionTitle>

      <S.AppointmentList>
        {appointments.map((appointment, i) => (
          <S.AppointmentItem key={i}>
            <S.AppointmentInfo>
              <small>{appointment.small}</small>
              <h4>{appointment.title}</h4>
              <span>{appointment.date}</span>
            </S.AppointmentInfo>
            <AppointmentCard dday={appointment.dday} label="" size={60} />
          </S.AppointmentItem>
        ))}
      </S.AppointmentList>
    </S.Container>
  );
};

export default HomePage;
