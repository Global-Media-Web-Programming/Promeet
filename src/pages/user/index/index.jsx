import React from 'react';
import * as S from './style';
import logoutIcon from '../../../assets/img/icon/logout.svg';
import AppointmentCard from '../../../components/ui/ddaycard';
import Navbar from '@/layouts/Navbar';
import dayjs from 'dayjs';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import useLogout from '@/hooks/mutations/useLogout';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const FixedScheduleButton = () => {
  const navigate = useNavigate();
  return (
    <S.FixedButton onClick={() => navigate(ROUTES.ENTER_SCHEDULE)}>
      <S.FixedButtonTitle>고정 일정</S.FixedButtonTitle>
      <S.FixedButtonDesc>
        매주 반복되는 일정을 설정하여
        <br />
        편리하게 약속을 잡으세요.
      </S.FixedButtonDesc>
    </S.FixedButton>
  );
};

const _createdPromises = [
  {
    id: 'promise1',
    title: '친구들과 저녁약속',
    description: '오랜만에 모이는 회식자리!',
    fixedTime: [
      {
        id: 'ft1',
        date: '2025-06-12',
        day: 'Sunday',
        startTime: '18:00',
        endTime: '20:00',
      },
    ],
    fixedPlace: {
      placeId: 'p1',
      type: 'restaurant',
      name: '상도 곱창',
      position: { La: 37.49808, Ma: 127.028 },
      address: '서울 동작구 상도로 232',
      phone: '02-123-4567',
      link: 'https://place1.com',
    },
    status: 'proposed',
  },
  {
    id: 'promise2',
    title: '스터디 모임',
    description: '중간고사 대비 스터디',
    fixedTime: [
      {
        id: 'ft2',
        date: '2025-06-10',
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '12:00',
      },
      {
        id: 'ft3',
        date: '2025-06-12',
        day: 'Thursday',
        startTime: '14:00',
        endTime: '16:00',
      },
    ],
    fixedPlace: {
      placeId: 'p2',
      type: 'studyCafe',
      name: '이디야 커피 상도점',
      position: { La: 37.499, Ma: 127.029 },
      address: '서울 동작구 상도로 100',
      phone: '02-234-5678',
      link: 'https://place2.com',
    },
    status: 'proposed',
  },
  {
    id: 'promise5',
    title: '스터디 모임 2',
    description: '자료구조 스터디',
    fixedTime: [
      {
        id: 'ft6',
        date: dayjs().format('YYYY-MM-DD'),
        day: dayjs().format('dddd'),
        startTime: '10:00',
        endTime: '12:00',
      },
    ],
    fixedPlace: {
      placeId: 'p5',
      type: 'studyCafe',
      name: '투썸플레이스 신림점',
      position: { La: 37.5, Ma: 127.03 },
      address: '서울 관악구 신림로 123',
      phone: '02-555-5555',
      link: 'https://place5.com',
    },
    status: 'proposed',
  },
];

const _joinedPromises = [
  {
    id: 'promise3',
    title: '운동 약속',
    description: 'PT 끝나고 다같이 저녁!',
    fixedTime: [
      {
        id: 'ft4',
        date: '2025-06-12',
        day: 'Saturday',
        startTime: '17:00',
        endTime: '18:00',
      },
    ],
    fixedPlace: {
      placeId: 'p3',
      type: 'activity',
      name: '휘트니스 센터',
      position: { La: 37.501, Ma: 127.032 },
      address: '서울 서초구 반포대로 50',
      phone: '02-345-6789',
      link: 'https://gym.com',
    },
    status: 'invited',
  },
  {
    id: 'promise4',
    title: '가족 모임',
    description: '외할머니 생신 기념 모임',
    fixedTime: [
      {
        id: 'ft5',
        date: '2025-06-16',
        day: 'Monday',
        startTime: '12:00',
        endTime: '14:00',
      },
    ],
    fixedPlace: {
      placeId: 'p4',
      type: 'restaurant',
      name: '한정식 궁',
      position: { La: 37.502, Ma: 127.033 },
      address: '서울 강남구 논현로 120',
      phone: '02-456-7890',
      link: 'https://koreanfood.com',
    },
    status: 'invited',
  },
];

// D-day 계산 함수
function getDday(dateStr) {
  if (!dateStr) return '';
  const today = dayjs().startOf('day');
  const target = dayjs(dateStr).startOf('day');
  const diff = target.diff(today, 'day');
  if (diff === 0) return 'D-day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

// 지난 약속 데이터 추출 함수
function getPastAppointments(promises) {
  const today = dayjs().startOf('day');
  return promises
    .filter((p) => p.fixedTime.some((t) => dayjs(t.date).isBefore(today)))
    .map((p) => ({
      label: p.title,
      dday: '완료', // 지난 약속은 "완료"로 표시
    }));
}

const UserPage = () => {
  const { userId, userName } = useUserInfo();
  const { mutate: logout } = useLogout();

  // 오늘 또는 미래 약속만 남기는 필터 함수
  const isUpcoming = (p) => {
    const firstTime = p.fixedTime?.[0];
    if (!firstTime) return false;
    const dday = dayjs(firstTime.date).diff(dayjs().startOf('day'), 'day');
    return dday >= 0;
  };

  // 다가오는 약속: 오늘 또는 미래만
  const upcomingAppointments = _createdPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: getDday(p.fixedTime[0]?.date),
  }));

  // 초대된 약속: 오늘 또는 미래만
  const invitedAppointments = _joinedPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: '수락',
  }));

  // 제안한 약속: 오늘 또는 미래만
  const proposedAppointments = _createdPromises.filter(isUpcoming).map((p) => ({
    label: p.title,
    dday: '제안',
  }));

  // 지난 약속
  const pastAppointments = [
    ...getPastAppointments(_createdPromises),
    ...getPastAppointments(_joinedPromises),
  ];

  return (
    <>
      <S.Container>
        <S.Frame>
          <S.UserHeader>
            <S.UserName>{userName ? `${userName} 님` : '사용자 님'}</S.UserName>
            <S.LogoutButton
              onClick={() => {
                logout({ userId });
              }}
            >
              <img src={logoutIcon} alt="로그아웃" />
            </S.LogoutButton>
          </S.UserHeader>

          <FixedScheduleButton />

          <S.SectionTitle>다가오는 약속</S.SectionTitle>
          <S.CardList>
            {upcomingAppointments.map((item, index) => (
              <S.CardWrapper key={index}>
                <AppointmentCard {...item} />
              </S.CardWrapper>
            ))}
          </S.CardList>

          <S.SectionTitle>초대된 약속</S.SectionTitle>
          <S.CardList>
            {invitedAppointments.map((item, index) => (
              <S.CardWrapper key={index}>
                <AppointmentCard {...item} />
              </S.CardWrapper>
            ))}
          </S.CardList>

          <S.SectionTitle>제안한 약속</S.SectionTitle>
          <S.CardList>
            {proposedAppointments.map((item, index) => (
              <S.CardWrapper key={index}>
                <AppointmentCard {...item} />
              </S.CardWrapper>
            ))}
          </S.CardList>

          <S.SectionTitle>지난 약속</S.SectionTitle>
          <S.CardList>
            {pastAppointments.length === 0 ? (
              <S.CardWrapper>
                <div style={{ color: '#aaa', fontSize: 14 }}>지난 약속이 없습니다.</div>
              </S.CardWrapper>
            ) : (
              pastAppointments.map((item, index) => (
                <S.PastCardWrapper key={index}>
                  <AppointmentCard {...item} />
                </S.PastCardWrapper>
              ))
            )}
          </S.CardList>
        </S.Frame>
      </S.Container>
      <Navbar />
    </>
  );
};

export default UserPage;
