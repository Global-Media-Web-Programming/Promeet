import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import * as S from './style';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 요일 이름 커스터마이징
const customLocale = {
  ...ko,
  localize: {
    ...ko.localize,
    day: (n) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][n],
  },
};

export default function CalendarRange() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const formatCaption = (date) => format(date, 'yyyy.MM', { locale: customLocale });

  return (
    <S.CalendarWrapper>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        navLayout="around"
        weekStartsOn={0}
        disabled={{ before: new Date() }}
        fixedWeeks
        showOutsideDays
        locale={customLocale}
        formatters={{
          formatCaption,
        }}
      />
    </S.CalendarWrapper>
  );
}
