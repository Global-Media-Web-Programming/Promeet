import * as S from './style';
import { useState } from 'react';
import Header from '@/components/promise/Header';
import { usePromiseDataFromServerInfo } from '@/hooks/stores/promise/usePromiseDataFromServerStore';
import { PROMISE_JOIN_HEADER_TEXT } from '@/constants/promise';
import copyToClipboard from '@/utils/copyToClipBoard';
import toast from '@/utils/toast';
import FinalPlaceMap from '@/components/promise/map/FinalPlaceMap';

const SummaryPage = () => {
  const { promiseDataFromServer } = usePromiseDataFromServerInfo();
  const [isMapOpen, setIsMapOpen] = useState(false);
  // const time = promiseDataFromServer.fixedTime
  //   .map(({ date, startTime, endTime }) => {
  //     const [year, month, day] = date.split('-');
  //     return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 ${startTime} ~ ${endTime}`;
  //   })
  //   .join('\n');
  // const place = promiseDataFromServer.fixedPlace
  //   ? `${promiseDataFromServer.fixedPlace.name}\n${promiseDataFromServer.fixedPlace.address}`
  //   : '약속 생성자가 곧 확정할 거예요';

  const time = '2025년 05월 26일 10:00 ~ 10:00';
  const place = '상도 곱창\n서울시 동작구 232';
  const dummyPlace = {
    placeId: '1313432',
    type: 'restaurant',
    name: '상도 곱창',
    position: {
      Ma: 37.49808633653005,
      La: 127.02800140627488,
    },
    address: '서울시 동작구 232',
    phone: '02-123-1234', // 선택
    link: 'https://blabla.com', // 선택
  };

  const handleCopyClick = () => {
    // copyToClipboard(promiseDataFromServer.fixedPlace.address);
    copyToClipboard(dummyPlace.address);
    toast('주소가 복사됐어요');
  };

  const handlePlaceMapClick = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <S.Container>
      <Header text={PROMISE_JOIN_HEADER_TEXT} />
      <S.InfoConainer>
        <S.Name>{promiseDataFromServer.title}</S.Name>
        <S.Description>{promiseDataFromServer.description}</S.Description>
      </S.InfoConainer>
      <S.Line />
      <S.StatusContainer>
        <S.StatusWrapper>
          <S.TimeIcon />
          {time}
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.LocationIcon />
          {place}
          <S.CopyIcon onClick={handleCopyClick} />
          <S.MapIcon onClick={handlePlaceMapClick} />
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.PeopleIcon />
          <S.MemberList>
            {promiseDataFromServer.members.map((member, index) => (
              <p key={index}>{member.name}</p>
            ))}
          </S.MemberList>
        </S.StatusWrapper>
      </S.StatusContainer>
      {isMapOpen ? (
        <S.MapSection>
          <FinalPlaceMap place={dummyPlace} />
        </S.MapSection>
      ) : null}
    </S.Container>
  );
};

export default SummaryPage;
