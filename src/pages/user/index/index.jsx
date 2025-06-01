import React from 'react';
import * as S from './style';
import logoutIcon from '../../../assets/img/icon/logout.svg';
import AppointmentCard from '../../../components/ui/ddaycard/AppointmentCard';

const FixedScheduleCard = () => (
  <S.FixedCard>
    <S.FixedCardBg />
    <S.FixedCardBgBlue />
    <S.FixedCardLight />
    <S.FixedCardTitle>고정 일정</S.FixedCardTitle>
    <S.FixedCardDesc>
      매주 반복되는 일정을 설정하여
      <br />
      편리하게 약속을 잡으세요.
    </S.FixedCardDesc>
  </S.FixedCard>
);

const UserPage = () => {
  const upcomingAppointments = [
    { dday: 'D-1', label: '위량제 먹죽팟' },
    { dday: 'D-4', label: '드래곤 길들이기 2 보기' },
    { dday: 'D-9', label: '위키드 보기' },
  ];

  const invitedAppointments = [
    { label: 'SCON', dday: '초대됨' },
    { label: 'IT 프로젝트 회의', dday: '초대됨' },
  ];

  const proposedAppointments = [{ label: 'SCON', dday: '제안' }];

  return (
    <S.Container>
      <S.UserHeader>
        <S.UserName>박숭실 님</S.UserName>
        <S.LogoutButton onClick={() => console.log('로그아웃')}>
          <img src={logoutIcon} alt="로그아웃" />
        </S.LogoutButton>
      </S.UserHeader>

      <FixedScheduleCard />

      <S.SectionTitle style={{ top: 349 }}>다가오는 약속</S.SectionTitle>
      <div style={{ position: 'relative', height: 140, marginBottom: 50 }}>
        {upcomingAppointments.map((item, index) => (
          <AppointmentCard key={index} {...item} top={390} left={32 + index * 134} />
        ))}
      </div>

      <S.SectionTitle style={{ top: 550 }}>초대된 약속</S.SectionTitle>
      <div style={{ position: 'relative', height: 140, marginBottom: 50 }}>
        {invitedAppointments.map((item, index) => (
          <AppointmentCard key={index} {...item} top={400} left={32 + index * 134} />
        ))}
      </div>

      <S.SectionTitle style={{ top: 750 }}>제안한 약속</S.SectionTitle>
      <div style={{ position: 'relative', height: 140, marginBottom: 50 }}>
        {proposedAppointments.map((item, index) => (
          <AppointmentCard key={index} {...item} top={420} left={32 + index * 134} />
        ))}
      </div>
    </S.Container>
  );
};

export default UserPage;
