import { useState } from 'react';
import Calendar from 'react-calendar';
import * as S from './style';
import LeftIcon from '../../assets/img/icon/left.svg';
import RightIcon from '../../assets/img/icon/right.svg';

const CalendarRange = () => {
  const [value, setValue] = useState(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 오늘 이전 날짜 비활성화
  const tileDisabled = ({ date, view }) => {
    if (view !== 'month') return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  // 오늘 이전 날짜 색상 처리
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (d < today) return 'calendar-disabled';
    return '';
  };

  return (
    <S.CalendarWrapper>
      <Calendar
        selectRange
        onChange={setValue}
        value={value}
        locale="en-US"
        next2Label={null}
        prev2Label={null}
        className="custom-calendar"
        prevLabel={<img src={LeftIcon} alt="이전 달" />}
        nextLabel={<img src={RightIcon} alt="다음 달" />}
        formatMonthYear={(_, date) =>
          `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0)
        }
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        showFixedNumberOfWeeks
      />
    </S.CalendarWrapper>
  );
};

export default CalendarRange;
