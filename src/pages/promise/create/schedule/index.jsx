import * as S from './style';
import AbleTimeTable from '@/components/timeTable/AbleTimeTable';
import promiseDataStore from '@/stores/promise/promiseDataStore';
import { useRef } from 'react';

// 시간 인덱스를 "HH:MM" 문자열로 변환
function getTimeFromIndex(hourIdx, quarterIdx) {
  const hour = String(hourIdx).padStart(2, '0');
  const minute = String(quarterIdx * 15).padStart(2, '0');
  return `${hour}:${minute}`;
}

// 선택된 시간표에서 연속된 구간 추출
function extractTimeRanges(selectedDayArr) {
  const ranges = [];
  let rangeStart = null;
  for (let h = 0; h < 24; h++) {
    for (let q = 0; q < 4; q++) {
      if (selectedDayArr[h][q]) {
        if (rangeStart === null) rangeStart = { hour: h, quarter: q };
      } else {
        if (rangeStart !== null) {
          ranges.push({
            start: getTimeFromIndex(rangeStart.hour, rangeStart.quarter),
            end: getTimeFromIndex(h, q),
          });
          rangeStart = null;
        }
      }
    }
  }
  if (rangeStart !== null) {
    ranges.push({
      start: getTimeFromIndex(rangeStart.hour, rangeStart.quarter),
      end: '24:00',
    });
  }
  return ranges;
}

// 테스트용 고정 일정 데이터
const fixedSchedule = [
  { id: 'schedule1', day: 'Monday', startTime: '10:00', endTime: '12:00' },
  { id: 'schedule2', day: 'Wednesday', startTime: '14:00', endTime: '16:00' },
];

const SchedulePage = () => {
  const { promiseData, setPromiseData } = promiseDataStore();
  const prevAvailableTimesRef = useRef(null);

  // 시간표 선택 결과를 availableTimes에 반영
  const handleTimeTableChange = (selected) => {
    const newAvailableTimes = promiseData.availableTimes.map((item, dayIdx) => {
      const dayArr = Array.from({ length: 24 }, (_, h) =>
        Array.from({ length: 4 }, (_, q) => selected[h][dayIdx][q]),
      );
      const ranges = extractTimeRanges(dayArr);
      return {
        ...item,
        timeRanges: ranges.map((r) => ({
          startTime: r.start,
          endTime: r.end,
        })),
        startTime: ranges[0] ? ranges[0].start : '',
        endTime: ranges[0] ? ranges[0].end : '',
      };
    });

    // 상태 변경이 있을 때만 저장
    const prev = prevAvailableTimesRef.current;
    const isSame = prev && JSON.stringify(prev) === JSON.stringify(newAvailableTimes);

    if (!isSame) {
      prevAvailableTimesRef.current = newAvailableTimes;
      setPromiseData({ availableTimes: newAvailableTimes });
      // api 요청 데이터 형식 확인
      console.log('API 요청용 availableTimes:', newAvailableTimes);
    }
  };

  return (
    <S.Container>
      <S.TableScrollWrapper>
        <S.TableInnerWrapper>
          <AbleTimeTable
            days={promiseData.availableTimes}
            onChange={handleTimeTableChange}
            fixedSchedule={fixedSchedule}
          />
        </S.TableInnerWrapper>
      </S.TableScrollWrapper>
    </S.Container>
  );
};

export default SchedulePage;
