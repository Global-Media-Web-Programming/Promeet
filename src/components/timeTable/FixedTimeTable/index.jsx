import * as S from './style';
import TimeIcon from '../../../assets/img/icon/time.svg';
import PropTypes from 'prop-types';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

function timeToMinutes({ hour, minute }) {
  return Number(hour) * 60 + Number(minute);
}

const FixedTimeTable = ({ schedules, defaultStart, defaultEnd }) => {
  const defaultMin = timeToMinutes(defaultStart);
  const defaultMax = timeToMinutes(defaultEnd);

  let minTime = defaultMin;
  let maxTime = defaultMax;

  if (schedules.length > 0) {
    const allStart = schedules.map((s) => timeToMinutes(s.startTime));
    const allEnd = schedules.map((s) => timeToMinutes(s.endTime));
    const minSchedule = Math.min(...allStart);
    const maxSchedule = Math.max(...allEnd);

    // 만약 일정이 기본 범위를 벗어나면 확장
    if (minSchedule < defaultMin || maxSchedule > defaultMax) {
      minTime = Math.min(minSchedule, defaultMin);
      maxTime = Math.max(maxSchedule, defaultMax);
    }
  }

  // 시간 라벨 생성
  const hours = [];
  for (let t = minTime; t < maxTime; t += 60) {
    hours.push(String(Math.floor(t / 60)).padStart(2, '0'));
  }

  // 셀에 일정 표시
  const getScheduleForCell = (day, hour, quarter) => {
    const minute = quarter * 15;
    const cellTime = timeToMinutes({ hour, minute: String(minute).padStart(2, '0') });
    return schedules.find(
      (s) =>
        s.day.startsWith(day) &&
        cellTime >= timeToMinutes(s.startTime) &&
        cellTime < timeToMinutes(s.endTime),
    );
  };

  const isScheduleStartCell = (schedule, hour, quarter) => {
    if (!schedule) return false;
    const start = schedule.startTime;
    return Number(hour) === Number(start.hour) && quarter * 15 === Number(start.minute);
  };

  return (
    <S.TableWrapper>
      <S.Row>
        <S.HeaderCell $noTop $noLeft>
          <img src={TimeIcon} alt="시간표 아이콘" width={24} height={24} />
        </S.HeaderCell>
        {DAYS.map((day) => (
          <S.HeaderCell key={day} $noTop>
            {day}
          </S.HeaderCell>
        ))}
      </S.Row>
      {hours.map((hour) => (
        <S.Row key={hour}>
          <S.HeaderCell $noLeft>{hour}</S.HeaderCell>
          {DAYS.map((day) => (
            <S.Cell key={day}>
              {Array.from({ length: 4 }).map((_, quarter) => {
                const schedule = getScheduleForCell(day, hour, quarter);
                const showTitle = isScheduleStartCell(schedule, hour, quarter);
                return (
                  <S.Quarter key={quarter} selected={!!schedule}>
                    {showTitle ? schedule.title : ''}
                  </S.Quarter>
                );
              })}
            </S.Cell>
          ))}
        </S.Row>
      ))}
    </S.TableWrapper>
  );
};

FixedTimeTable.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      day: PropTypes.string,
      startTime: PropTypes.shape({
        hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      endTime: PropTypes.shape({
        hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }),
  ).isRequired,
  defaultStart: PropTypes.shape({
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  defaultEnd: PropTypes.shape({
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default FixedTimeTable;
