import React from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import DeferredLoader from '@/components/ui/DeferredLoader';
import Button from '@/components/ui/Button';
import Navbar from '@/layouts/Navbar';
import useGetUserData from '@/hooks/queries/useGetUserData';
// import useGetMultiplePromiseData from '@/hooks/queries/useGetMultiplePromiseData';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
// import useLogout from '@/hooks/mutations/useLogout';
import { ROUTES } from '@/constants/routes';
import alarmIcon from '@/assets/img/icon/alarm.svg';
import Card from '@/components/ui/card';
import AppointmentCard from '@/components/ui/ddaycard';

// 오늘, 다가오는 약속 추출
const classifyPromises = (Promises) => {
  const today = dayjs().format('YYYY-MM-DD');
  const todayPromises = [];
  const futurePromises = [];

  Promises.forEach((promise) => {
    if (!promise?.fixedTime || !promise?.fixedPlace) return;

    let isToday = false;
    let isFuture = false;

    promise.fixedTime.forEach((slot) => {
      if (slot.date === today) isToday = true;
      else if (dayjs(slot.date).isAfter(today)) isFuture = true;
    });

    // dday 계산 추가
    const firstTime = promise.fixedTime[0];
    const dday = dayjs(firstTime.date).diff(today, 'day');

    if (isToday) todayPromises.push({ ...promise, dday: 0 });
    else if (isFuture) futurePromises.push({ ...promise, dday });
  });

  futurePromises.sort((a, b) => {
    const getEarliestTime = (p) =>
      p.fixedTime
        .filter((t) => dayjs(t.date).isAfter(today)) // 오늘 이후의 일정만
        .map((t) => dayjs(`${t.date} ${t.startTime}`))
        .sort((x, y) => x - y)[0]; // 시간순 정렬 후, 가장 빠른 시간 반환

    return getEarliestTime(a) - getEarliestTime(b);
  });

  return { todayPromises, futurePromises };
};

const HomePage = () => {
  const [cardIdx, setCardIdx] = React.useState(0);
  const startX = React.useRef(null);

  const navigate = useNavigate();
  const { userId, userName } = useUserInfo();

  const { isPending: isGetUserDataPending } = useGetUserData(userId);

  // const createIds = promises.create ?? []; // 생성한 약속 ids
  // const joinIds = promises.join ?? []; // 초대받은 약속 ids

  // const createQueries = useGetMultiplePromiseData(createIds, userId);
  // const joinQueries = useGetMultiplePromiseData(joinIds, userId);

  // const { mutate: logout, isPending: isLogoutPending } = useLogout();
  // const handleLogout = () => {
  //   logout({ userId });
  // };

  // const isLoading =
  //   isGetUserDataPending ||
  //   createQueries.some((q) => q.isPending) ||
  //   joinQueries.some((q) => q.isPending);
  const isLoading = isGetUserDataPending;

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

  const _allPromises = [..._createdPromises, ..._joinedPromises];
  const { todayPromises: _todayPromises, futurePromises: _futurePromises } =
    classifyPromises(_allPromises);

  // 오늘 약속 데이터
  const todayPromises = _todayPromises;
  // 드래그 시작
  const handleDragStart = (e) => {
    startX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };

  // 드래그 끝
  const handleDragEnd = (e) => {
    if (startX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX.current;

    if (diff < -50) {
      // 왼쪽으로 넘기면 다음 카드
      setCardIdx((prev) => (prev === todayPromises.length - 1 ? 0 : prev + 1));
    } else if (diff > 50) {
      // 오른쪽으로 넘기면 이전 카드
      setCardIdx((prev) => (prev === 0 ? todayPromises.length - 1 : prev - 1));
    }
    startX.current = null;
  };

  const handleCreatePromiseBtnClick = () => {
    if (!userId) navigate(ROUTES.SIGN_IN);
    else navigate(ROUTES.PROMISE_CREATE_INFO);
  };

  if (!userId)
    return (
      <S.EnterContainer>
        <S.LogoContainer>
          <S.Logo />
          <S.EnterText>쉽고 빠른 약속 정하기</S.EnterText>
        </S.LogoContainer>
        <Button color="point1" onClick={handleCreatePromiseBtnClick}>
          약속 잡으러가기
        </Button>
      </S.EnterContainer>
    );

  return (
    <>
      {isLoading ? (
        <DeferredLoader />
      ) : (
        <>
          <S.Container>
            {/* 상단 헤더 */}
            <S.Header>
              <S.HeaderRow>
                <S.TopRow>{dayjs().format('ddd, D')}</S.TopRow>
                <S.AlarmIcon src={alarmIcon} alt="알람" />
              </S.HeaderRow>
              <S.Greeting style={{ marginTop: '24px' }}>
                {userName}님,
                <br />
                오늘 일정 잊지 않으셨죠?
              </S.Greeting>
            </S.Header>

            <S.SectionTitle />
            <S.TodayCardWrapper>
              <S.TodayCardScroller
                cardIdx={cardIdx}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
              >
                {todayPromises.map((card, i) => (
                  <S.TodayCard
                    key={card.id}
                    style={{ opacity: cardIdx === i ? 1 : 0.6 }}
                    active={cardIdx === i}
                  >
                    <Card
                      title={card.title}
                      subtitle={`${card.fixedTime?.[0]?.date} ${card.fixedTime?.[0]?.startTime}`}
                      dday={
                        card.dday === 0 || card.dday === '0' ? 'D-DAY' : `D-${card.dday ?? '0'}`
                      }
                      avatars={card.avatars ?? []}
                    />
                  </S.TodayCard>
                ))}
              </S.TodayCardScroller>
            </S.TodayCardWrapper>

            {/* 다가오는 약속 리스트 */}
            <S.SectionTitle>다가오는 약속</S.SectionTitle>

            {/* 내가 생성한 약속 리스트 */}
            <S.SectionTitle2>내가 생성한 약속</S.SectionTitle2>
            {_createdPromises
              .filter((promise) => {
                const firstTime = promise.fixedTime?.[0];
                if (!firstTime) return false;
                const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
                return dday >= 0;
              })
              .sort((a, b) => {
                const ddayA = dayjs(a.fixedTime?.[0]?.date).diff(
                  dayjs().format('YYYY-MM-DD'),
                  'day',
                );
                const ddayB = dayjs(b.fixedTime?.[0]?.date).diff(
                  dayjs().format('YYYY-MM-DD'),
                  'day',
                );
                return ddayA - ddayB;
              })
              .map((promise) => (
                <S.Appointment key={promise.id}>
                  <div>
                    <small>내가 생성함</small>
                    <h4>{promise.title}</h4>
                    <span>{promise.fixedTime?.[0]?.date}</span>
                  </div>
                  <AppointmentCard
                    dday={getDday(promise.fixedTime?.[0]?.date)}
                    label=""
                    size={40}
                  />
                </S.Appointment>
              ))}

            {/* 초대받은 약속 리스트 */}
            <S.SectionTitle2>초대받은 약속</S.SectionTitle2>
            {_joinedPromises
              .filter((promise) => {
                const firstTime = promise.fixedTime?.[0];
                if (!firstTime) return false;
                const dday = dayjs(firstTime.date).diff(dayjs().format('YYYY-MM-DD'), 'day');
                return dday >= 0;
              })
              .sort((a, b) => {
                const ddayA = dayjs(a.fixedTime?.[0]?.date).diff(
                  dayjs().format('YYYY-MM-DD'),
                  'day',
                );
                const ddayB = dayjs(b.fixedTime?.[0]?.date).diff(
                  dayjs().format('YYYY-MM-DD'),
                  'day',
                );
                return ddayA - ddayB;
              })
              .map((promise) => (
                <S.Appointment key={promise.id}>
                  <div>
                    <small>초대받음</small>
                    <h4>{promise.title}</h4>
                    <span>{promise.fixedTime?.[0]?.date}</span>
                  </div>
                  <AppointmentCard
                    dday={getDday(promise.fixedTime?.[0]?.date)}
                    label=""
                    size={40}
                  />
                </S.Appointment>
              ))}
          </S.Container>
          <Navbar />
        </>
      )}
    </>
  );
};

export default HomePage;

// D-day 계산 함수
function getDday(dateStr) {
  if (!dateStr) return '';
  const today = dayjs().startOf('day');
  const target = dayjs(dateStr).startOf('day');
  const diff = target.diff(today, 'day');
  if (diff === 0) return 'D-0'; // 당일이면 D-0
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}
