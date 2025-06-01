import React, { useState } from 'react';
import Calendar from 'react-calendar';
import * as S from './style';
import 'react-calendar/dist/Calendar.css';

export default function CalendarRange() {
  const [range, setRange] = useState([new Date(), new Date()]);

  // 오늘 기준
  const today = new Date();

  // 날짜 비교 함수
  const isPastDay = (date) => {
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const compare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return compare < todayMidnight;
  };

  return (
    <S.CalendarWrapper>
      <Calendar
        selectRange={true}
        onChange={setRange}
        value={range}
        tileDisabled={({ date }) => isPastDay(date)}
        tileClassName={({ date, view, activeStartDate }) => {
          if (view === 'month') {
            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            if (dateOnly < todayDate) return 'past-day';
            if (date.getMonth() !== activeStartDate.getMonth()) return 'not-this-month'; // ✅ 핵심
            return 'future-day';
          }
          return null;
        }}
        locale="en-US"
        formatMonthYear={(locale, date) =>
          `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 1)
        }
        next2Label={null}
        prev2Label={null}
      />
    </S.CalendarWrapper>
  );
}
