import { useState } from 'react';
import Calendar from 'react-calendar';
import * as S from './style';
import LeftIcon from '../../assets/img/icon/left.svg';
import RightIcon from '../../assets/img/icon/right.svg';

const CalendarRange = () => {
  const [range, setRange] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isBetween = (date, start, end) => {
    const time = date.getTime();
    return start && end && time > start.getTime() && time < end.getTime();
  };

  const handleMouseDown = (date) => {
    setDragStart(date);
    setDragEnd(date);
    setIsDragging(true);
  };

  const handleMouseEnter = (date) => {
    if (!isDragging) return;
    setDragEnd(date);
  };

  const handleMouseUp = () => {
    if (dragStart && dragEnd) {
      const [start, end] = [dragStart, dragEnd].sort((a, b) => a - b);
      setRange([start, end]);
    }
    setIsDragging(false);
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (d < today) return 'calendar-disabled';

    const start = isDragging ? dragStart : range?.[0];
    const end = isDragging ? dragEnd : range?.[1];

    if (start && isSameDate(d, start)) return 'react-calendar__tile--rangeStart';
    if (end && isSameDate(d, end)) return 'react-calendar__tile--rangeEnd';
    if (start && end && isBetween(d, start, end)) return 'react-calendar__tile--range';

    return '';
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (d < today) return null;

    return (
      <div
        onMouseDown={() => handleMouseDown(d)}
        onMouseEnter={() => handleMouseEnter(d)}
        onMouseUp={handleMouseUp}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      />
    );
  };

  return (
    <S.CalendarWrapper>
      <Calendar
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
        tileDisabled={({ date }) => date < today}
        tileClassName={tileClassName}
        tileContent={tileContent}
        showFixedNumberOfWeeks
      />
    </S.CalendarWrapper>
  );
};

export default CalendarRange;
