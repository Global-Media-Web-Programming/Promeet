import { useState, useRef } from 'react';
import * as S from './style';
import TimeIcon from '../../assets/img/icon/time.svg';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

// [hour][day][quarter] 구조로 상태 관리
const TimeTable = () => {
  const [selected, setSelected] = useState(
    Array.from({ length: 24 }, () => Array.from({ length: 7 }, () => Array(4).fill(false))),
  );
  const isDragging = useRef(false);
  const dragValue = useRef(true);

  // quarter: 0~3 (위에서부터 0,1,2,3)
  const handleQuarterMouseDown = (hourIdx, dayIdx, quarterIdx) => {
    isDragging.current = true;
    dragValue.current = !selected[hourIdx][dayIdx][quarterIdx];
    setSelected((prev) =>
      prev.map((row, h) =>
        row.map((cell, d) =>
          cell.map((val, q) =>
            h === hourIdx && d === dayIdx && q === quarterIdx ? dragValue.current : val,
          ),
        ),
      ),
    );
  };

  const handleQuarterMouseEnter = (hourIdx, dayIdx, quarterIdx) => {
    if (!isDragging.current) return;
    setSelected((prev) =>
      prev.map((row, h) =>
        row.map((cell, d) =>
          cell.map((val, q) =>
            h === hourIdx && d === dayIdx && q === quarterIdx ? dragValue.current : val,
          ),
        ),
      ),
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <S.TableWrapper onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <S.Row>
        <S.HeaderCell $noTop $noLeft>
          <img src={TimeIcon} alt="시간표" width={24} height={24} />
        </S.HeaderCell>
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
            <S.Cell key={dayIdx}>
              {Array.from({ length: 4 }).map((_, quarterIdx) => (
                <S.Quarter
                  key={quarterIdx}
                  selected={selected[hourIdx][dayIdx][quarterIdx]}
                  onMouseDown={() => handleQuarterMouseDown(hourIdx, dayIdx, quarterIdx)}
                  onMouseEnter={() => handleQuarterMouseEnter(hourIdx, dayIdx, quarterIdx)}
                />
              ))}
            </S.Cell>
          ))}
        </S.Row>
      ))}
    </S.TableWrapper>
  );
};

export default TimeTable;
