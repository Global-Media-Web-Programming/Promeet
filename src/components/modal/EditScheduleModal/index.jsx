import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DaySelectModal from '@/components/modal/DaySelectModal';
import TimeSelectModal from '@/components/modal/TimeSelectModal';
import selectIcon from '@/assets/img/icon/dropdown.svg';
import crossIcon from '@/assets/img/icon/cross.svg';
import * as S from './style';

const EditScheduleModal = ({ isOpen, schedule, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: '',
    day: '월요일',
    startTime: { hour: '09', minute: '00' },
    endTime: { hour: '18', minute: '00' },
  });
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    if (schedule) {
      setForm({
        title: schedule.title || '',
        day: schedule.day || '월요일',
        startTime: {
          hour: String(schedule.startTime.hour).padStart(2, '0'),
          minute: String(schedule.startTime.minute).padStart(2, '0'),
        },
        endTime: {
          hour: String(schedule.endTime.hour).padStart(2, '0'),
          minute: String(schedule.endTime.minute).padStart(2, '0'),
        },
      });
    }
  }, [schedule]);

  if (!isOpen || !schedule) return null;

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleDaySelect = (day) => {
    setForm((prev) => ({ ...prev, day }));
    closeModal();
  };

  const handleStartTimeSelect = (time) => {
    setForm((prev) => ({ ...prev, startTime: time }));
    closeModal();
  };

  const handleEndTimeSelect = (time) => {
    setForm((prev) => ({ ...prev, endTime: time }));
    closeModal();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...schedule,
      ...form,
      startTime: {
        hour: form.startTime.hour,
        minute: form.startTime.minute,
      },
      endTime: {
        hour: form.endTime.hour,
        minute: form.endTime.minute,
      },
    });
  };

  return (
    <>
      <S.Overlay>
        <S.TopBar>
          <S.CloseButton onClick={onClose} aria-label="close">
            <img src={crossIcon} alt="Close" />
          </S.CloseButton>
          <S.AddScheduleTitle>일정 수정</S.AddScheduleTitle>
          <S.SubmitButton type="button" onClick={handleSubmit}>
            저장
          </S.SubmitButton>
        </S.TopBar>
        <S.Slide>
          <S.ScheduleInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="일정명"
            required
          />
          <S.Divider />
          <S.TableSetting>
            <S.DayTimeSelect>
              <S.DaySelectButton type="button" onClick={() => openModal('day')}>
                {form.day}
                <img src={selectIcon} alt="Select Day" />
              </S.DaySelectButton>
              <S.TimeRow>
                <S.TimeButton type="button" onClick={() => openModal('start')}>
                  {form.startTime.hour}:{form.startTime.minute}
                  <img src={selectIcon} alt="Select Time" />
                </S.TimeButton>
              </S.TimeRow>
              <S.TimeRow>
                <S.TimeButton type="button" onClick={() => openModal('end')}>
                  {form.endTime.hour === '00' && form.endTime.minute === '00'
                    ? '24:00'
                    : `${form.endTime.hour}:${form.endTime.minute}`}
                  <img src={selectIcon} alt="Select Time" />
                </S.TimeButton>
              </S.TimeRow>
            </S.DayTimeSelect>
          </S.TableSetting>
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
        initialHour={form.startTime.hour}
        initialMinute={form.startTime.minute}
      />
      <TimeSelectModal
        isOpen={modalType === 'end'}
        onClose={closeModal}
        onSelect={handleEndTimeSelect}
        initialHour={form.endTime.hour}
        initialMinute={form.endTime.minute}
        isEnd
      />
    </>
  );
};

EditScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  schedule: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditScheduleModal;
