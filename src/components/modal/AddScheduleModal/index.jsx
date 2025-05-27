import PropTypes from 'prop-types';
import { useState } from 'react';
import DaySelectModal from '@/components/modal/DaySelectModal';
import selectIcon from '@/assets/img/icon/dropdown.svg';
import * as S from './style';

const AddScheduleModal = ({ isOpen, onClose }) => {
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('월요일'); // 초기값

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsDayModalOpen(false);
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
          </div>
        </S.Slide>
      </S.Overlay>
      <DaySelectModal
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
        onSelect={handleDaySelect}
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
