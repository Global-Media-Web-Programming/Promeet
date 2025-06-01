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
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px',
          }}
        >
          <S.TopRow style={{ textAlign: 'center' }}>Friday, 30</S.TopRow>
          <img
            src={alarmIcon}
            alt="알람"
            style={{
              position: 'absolute',
              right: '30px',
              width: 50,
              height: 50,
              cursor: 'pointer',
            }}
          />
        </div>
        <S.Greeting style={{ textAlign: 'left', marginTop: '50px' }}>
          박숭실님,
          <br />
          오늘 일정 잊지 않으셨죠?
        </S.Greeting>
      </S.Header>

      <div
        style={{
          position: 'relative',
          width: `${CARD_WIDTH + VISIBLE_WIDTH}px`,
          margin: '0 auto',
          overflow: 'hidden',
          touchAction: 'pan-y',
          height: 180,
        }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
      >
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.3s',
            transform: `translateX(-${cardIdx * (CARD_WIDTH + CARD_GAP)}px)`,
            gap: `${CARD_GAP}px`,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                width: `${CARD_WIDTH}px`,
                minWidth: `${CARD_WIDTH}px`,
                maxWidth: `${CARD_WIDTH}px`,
                opacity: cardIdx === i ? 1 : 0.6,
                boxShadow: cardIdx === i ? '0 4px 24px rgba(0,0,0,0.10)' : 'none',
                borderRadius: 16,
                background: '#fff',
                position: 'relative',
              }}
            >
              <Card
                title={card.title}
                subtitle={card.desc}
                dday={card.dday}
                avatars={card.avatars}
              />
            </div>
          ))}
        </div>
      </div>

      <S.SectionTitle>다가오는 약속</S.SectionTitle>

      <div
        style={{
          maxWidth: '390px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {appointments.map((appointment, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #E9F1FF',
              padding: '0 24px',
              height: '100px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ flex: 1, marginRight: '16px' }}>
              <small style={{ color: '#848A94', fontSize: '13px' }}>{appointment.small}</small>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 600 }}>
                {appointment.title}
              </h4>
              <span style={{ color: '#848A94', fontSize: '13px' }}>{appointment.date}</span>
            </div>
            <AppointmentCard dday={appointment.dday} label="" size={60} />
          </div>
        ))}
      </div>
    </S.Container>
  );
};

export default HomePage;
