import { useState } from 'react';
import Calendar from 'react-calendar';
import * as S from './style';
import LeftIcon from '../../assets/img/icon/left.svg';
import RightIcon from '../../assets/img/icon/right.svg';

const CalendarRange = () => {
  const [value, setValue] = useState([new Date(), new Date()]);

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
      />
    </S.CalendarWrapper>
  );
};

export default CalendarRange;
