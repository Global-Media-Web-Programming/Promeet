import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import * as S from './style.js';
import 'react-day-picker/dist/style.css';

export default function CalendarRange() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  // 제목 포맷 함수
  const formatCaption = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로
    return `${year}.${month}`;
  };

  return (
    <S.CalendarWrapper>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={{ before: new Date() }}
        weekStartsOn={0}
        formatters={{ formatCaption }} // 제목 포맷 함수 적용
        navLayout="around"
        fixedWeeks={true}
        showOutsideDays={true}
      />
    </S.CalendarWrapper>
  );
}
