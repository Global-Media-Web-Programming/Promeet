import { useState, useRef } from 'react';
import * as S from './style';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

const TimeTable = () => {
  const [selected, setSelected] = useState(Array.from({ length: 24 }, () => Array(7).fill(false)));
  const isDragging = useRef(false);
  const dragValue = useRef(true);

  const handleCellMouseDown = (hourIdx, dayIdx) => {
    isDragging.current = true;
    dragValue.current = !selected[hourIdx][dayIdx];
    setSelected((prev) =>
      prev.map((row, h) =>
        row.map((cell, d) => (h === hourIdx && d === dayIdx ? dragValue.current : cell)),
      ),
    );
  };

  const handleCellMouseEnter = (hourIdx, dayIdx) => {
    if (!isDragging.current) return;
    setSelected((prev) =>
      prev.map((row, h) =>
        row.map((cell, d) => (h === hourIdx && d === dayIdx ? dragValue.current : cell)),
      ),
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <S.TableWrapper onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <S.Row>
        <S.HeaderCell $noTop $noLeft />
        {DAYS.map((day) => (
          <S.HeaderCell key={day} $noTop>
            {day}
          </S.HeaderCell>
        ))}
      </S.Row>
      {HOURS.map((hour, hourIdx) => (
        <S.Row key={hour}>
          <S.HeaderCell $noLeft>{hour}</S.HeaderCell>
          {DAYS.map((_, dayIdx) => (
            <S.Cell
              key={dayIdx}
              selected={selected[hourIdx][dayIdx]}
              onMouseDown={() => handleCellMouseDown(hourIdx, dayIdx)}
              onMouseEnter={() => handleCellMouseEnter(hourIdx, dayIdx)}
            />
          ))}
        </S.Row>
      ))}
    </S.TableWrapper>
  );
};

export default TimeTable;
