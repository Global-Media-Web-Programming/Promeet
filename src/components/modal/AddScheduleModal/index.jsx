import PropTypes from 'prop-types';
import { useState } from 'react';
import DaySelectModal from '@/components/modal/DaySelectModal';
import TimeSelectModal from '@/components/modal/TimeSelectModal';
import selectIcon from '@/assets/img/icon/dropdown.svg';
import * as S from './style';

const AddScheduleModal = ({ isOpen, onClose }) => {
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('월요일'); // 초기값

  const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
  const [isEndTimeModalOpen, setIsEndTimeModalOpen] = useState(false);
  const [startTime, setStartTime] = useState({ hour: '09', minute: '00' });
  const [endTime, setEndTime] = useState({ hour: '18', minute: '00' });

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsDayModalOpen(false);
  };

  const handleStartTimeSelect = (time) => {
    setStartTime(time);
    setIsStartTimeModalOpen(false);
  };

  const handleEndTimeSelect = (time) => {
    setEndTime(time);
    setIsEndTimeModalOpen(false);
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
            <S.DaySelectButton onClick={() => setIsDayModalOpen(true)}>
              {selectedDay}
              <img src={selectIcon} alt="Select Day" />
            </S.DaySelectButton>
            <S.TimeRow>
              <S.TimeLabel>시작 시간</S.TimeLabel>
              <S.TimeButton onClick={() => setIsStartTimeModalOpen(true)}>
                {startTime.hour}:{startTime.minute}
                <img src={selectIcon} alt="Select Time" />
              </S.TimeButton>
            </S.TimeRow>
            <S.TimeRow>
              <S.TimeLabel>종료 시간</S.TimeLabel>
              <S.TimeButton onClick={() => setIsEndTimeModalOpen(true)}>
                {endTime.hour}:{endTime.minute}
                <img src={selectIcon} alt="Select Time" />
              </S.TimeButton>
            </S.TimeRow>
          </div>
        </S.Slide>
      </S.Overlay>
      <DaySelectModal
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
        onSelect={handleDaySelect}
      />
      <TimeSelectModal
        isOpen={isStartTimeModalOpen}
        onClose={() => setIsStartTimeModalOpen(false)}
        onSelect={handleStartTimeSelect}
        initialHour={startTime.hour}
        initialMinute={startTime.minute}
      />
      <TimeSelectModal
        isOpen={isEndTimeModalOpen}
        onClose={() => setIsEndTimeModalOpen(false)}
        onSelect={handleEndTimeSelect}
        initialHour={endTime.hour}
        initialMinute={endTime.minute}
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
