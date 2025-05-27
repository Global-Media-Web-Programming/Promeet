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

  // 시작 시간 선택
  const handleStartTimeSelect = (time) => {
    setSchedules((schedules) =>
      schedules.map((item, idx) => (idx === activeIdx ? { ...item, startTime: time } : item)),
    );
    closeModal();
  };

  // 종료 시간 선택
  const handleEndTimeSelect = (time) => {
    setSchedules((schedules) =>
      schedules.map((item, idx) => (idx === activeIdx ? { ...item, endTime: time } : item)),
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
                      {item.endTime.hour}:{item.endTime.minute}
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
