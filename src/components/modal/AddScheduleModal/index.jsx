import PropTypes from 'prop-types';
import { useState } from 'react';
import DaySelectModal from '@/components/modal/DaySelectModal';
import TimeSelectModal from '@/components/modal/TimeSelectModal';
import selectIcon from '@/assets/img/icon/dropdown.svg';
import deleteIcon from '@/assets/img/icon/delete.svg';
import * as S from './style';

const defaultSchedule = () => ({
  day: '월요일',
  startTime: { hour: '09', minute: '00' },
  endTime: { hour: '18', minute: '00' },
});

const AddScheduleModal = ({ isOpen, onClose }) => {
  const [schedules, setSchedules] = useState([defaultSchedule()]);
  const [activeIdx, setActiveIdx] = useState(null); // 어떤 묶음의 모달이 열렸는지
  const [modalType, setModalType] = useState(null); // 'day' | 'start' | 'end'

  // 모달 열기
  const openModal = (idx, type) => {
    setActiveIdx(idx);
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setActiveIdx(null);
    setModalType(null);
  };

  // 요일 선택
  const handleDaySelect = (day) => {
    setSchedules((schedules) =>
      schedules.map((item, idx) => (idx === activeIdx ? { ...item, day } : item)),
    );
    closeModal();
  };

  // 시간 비교 함수
  const timeToMinutes = (time) => Number(time.hour) * 60 + Number(time.minute);
  const addMinutes = (time, mins) => {
    let total = timeToMinutes(time) + mins;
    if (total < 0) total += 24 * 60;
    total = total % (24 * 60);
    return {
      hour: String(Math.floor(total / 60)).padStart(2, '0'),
      minute: String(total % 60).padStart(2, '0'),
    };
  };

  // 종료 시간 선택
  const handleEndTimeSelect = (time) => {
    setSchedules((schedules) =>
      schedules.map((item, idx) => {
        if (idx !== activeIdx) return item;
        let endMins = timeToMinutes(time);
        const startMins = timeToMinutes(item.startTime);

        // 00:00(24:00)일 때는 1440분으로 간주
        if (time.hour === '00' && time.minute === '00') {
          endMins = 1440;
        }

        if (endMins <= startMins) {
          // 끝 시간이 01:00 이전이면 시작 시간을 00:00으로 설정
          if (endMins < 60) {
            return {
              ...item,
              endTime: time,
              startTime: { hour: '00', minute: '00' },
            };
          }
          return {
            ...item,
            endTime: time,
            startTime: addMinutes(time, -60),
          };
        }
        return { ...item, endTime: time };
      }),
    );
    closeModal();
  };

  // 시작 시간 선택
  const handleStartTimeSelect = (time) => {
    setSchedules((schedules) =>
      schedules.map((item, idx) => {
        if (idx !== activeIdx) return item;
        const startMins = timeToMinutes(time);
        let endMins = timeToMinutes(item.endTime);

        // 끝 시간이 24:00(00:00)이면 1440분으로 간주
        const isEndTimeMidnight = item.endTime.hour === '00' && item.endTime.minute === '00';
        if (isEndTimeMidnight) endMins = 1440;

        if (startMins >= endMins) {
          // 시작 시간이 23:00 이후면 끝 시간을 00:00(24:00)으로
          if (startMins >= 1380) {
            return {
              ...item,
              startTime: time,
              endTime: { hour: '00', minute: '00' },
            };
          }
          // 끝 시간이 24:00(00:00)이면 끝 시간을 그대로 두고 시작 시간만 변경
          if (isEndTimeMidnight) {
            return {
              ...item,
              startTime: time,
              endTime: { hour: '00', minute: '00' },
            };
          }
          // 그 외에는 기존대로 1시간 뒤로 조정
          return {
            ...item,
            startTime: time,
            endTime: addMinutes(time, 60),
          };
        }
        return { ...item, startTime: time };
      }),
    );
    closeModal();
  };

  // 입력 묶음 추가
  const handleAddSchedule = () => {
    setSchedules([...schedules, defaultSchedule()]);
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Overlay>
        <S.Slide>
          <S.CloseButton onClick={onClose} aria-label="close">
            ×
          </S.CloseButton>
          <div>
            <h2>일정명</h2>
            <S.Divider />
            {schedules.map((item, idx) => (
              <S.TableSetting key={idx} style={{ marginBottom: 24 }}>
                <S.DayTimeSelect>
                  <S.DaySelectButton onClick={() => openModal(idx, 'day')}>
                    {item.day}
                    <img src={selectIcon} alt="Select Day" />
                  </S.DaySelectButton>
                  <S.TimeRow>
                    <S.TimeButton onClick={() => openModal(idx, 'start')}>
                      {item.startTime.hour}:{item.startTime.minute}
                      <img src={selectIcon} alt="Select Time" />
                    </S.TimeButton>
                  </S.TimeRow>
                  <S.TimeRow>
                    <S.TimeButton onClick={() => openModal(idx, 'end')}>
                      {item.endTime.hour === '00' && item.endTime.minute === '00'
                        ? '24:00'
                        : `${item.endTime.hour}:${item.endTime.minute}`}
                      <img src={selectIcon} alt="Select Time" />
                    </S.TimeButton>
                  </S.TimeRow>
                </S.DayTimeSelect>
                <S.DeleteButton
                  type="button"
                  onClick={() => setSchedules(schedules.filter((_, i) => i !== idx))}
                >
                  <img src={deleteIcon} alt="Delete Schedule" />
                </S.DeleteButton>
              </S.TableSetting>
            ))}
            <S.AddButton type="button" onClick={handleAddSchedule}>
              시간 추가
            </S.AddButton>
          </div>
        </S.Slide>
      </S.Overlay>
      <DaySelectModal
        isOpen={modalType === 'day'}
        onClose={closeModal}
        onSelect={handleDaySelect}
      />
      <TimeSelectModal
        isOpen={modalType === 'start'}
        onClose={closeModal}
        onSelect={handleStartTimeSelect}
        initialHour={activeIdx !== null ? schedules[activeIdx].startTime.hour : '09'}
        initialMinute={activeIdx !== null ? schedules[activeIdx].startTime.minute : '00'}
      />
      <TimeSelectModal
        isOpen={modalType === 'end'}
        onClose={closeModal}
        onSelect={handleEndTimeSelect}
        initialHour={activeIdx !== null ? schedules[activeIdx].endTime.hour : '18'}
        initialMinute={activeIdx !== null ? schedules[activeIdx].endTime.minute : '00'}
        isEnd
      />
    </>
  );
};

AddScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default AddScheduleModal;
