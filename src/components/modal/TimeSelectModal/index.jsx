import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as S from './style';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '10', '20', '30', '40', '50'];

function getPrevNext(arr, current) {
  const idx = arr.indexOf(current);
  const prev = arr[(idx - 1 + arr.length) % arr.length];
  const next = arr[(idx + 1) % arr.length];
  return { prev, next };
}

const TimeSelectModal = ({ isOpen, onClose, onSelect, initialHour, initialMinute }) => {
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  // 모달이 열릴 때마다 초기값 동기화
  useEffect(() => {
    if (isOpen) {
      setSelectedHour(initialHour);
      setSelectedMinute(initialMinute);
    }
  }, [isOpen, initialHour, initialMinute]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleHourWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setSelectedHour(getPrevNext(HOURS, selectedHour).prev);
    } else if (e.deltaY > 0) {
      setSelectedHour(getPrevNext(HOURS, selectedHour).next);
    }
  };

  const handleMinuteWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setSelectedMinute(getPrevNext(MINUTES, selectedMinute).prev);
    } else if (e.deltaY > 0) {
      setSelectedMinute(getPrevNext(MINUTES, selectedMinute).next);
    }
  };

  const handleSelect = () => {
    onSelect({ hour: selectedHour, minute: selectedMinute });
    onClose();
  };

  const { prev: prevHour, next: nextHour } = getPrevNext(HOURS, selectedHour);
  const { prev: prevMinute, next: nextMinute } = getPrevNext(MINUTES, selectedMinute);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal>
        <S.Title>시간 선택</S.Title>
        <S.ScrollPickerWrapper>
          <S.PickerCol onWheel={handleHourWheel} tabIndex={0}>
            <S.PrevNext>{prevHour}</S.PrevNext>
            <S.Selected>{selectedHour}</S.Selected>
            <S.PrevNext>{nextHour}</S.PrevNext>
          </S.PickerCol>
          <S.Colon>:</S.Colon>
          <S.PickerCol onWheel={handleMinuteWheel} tabIndex={0}>
            <S.PrevNext>{prevMinute}</S.PrevNext>
            <S.Selected>{selectedMinute}</S.Selected>
            <S.PrevNext>{nextMinute}</S.PrevNext>
          </S.PickerCol>
        </S.ScrollPickerWrapper>
        <S.ConfirmButton type="button" onClick={handleSelect}>
          확인
        </S.ConfirmButton>
      </S.Modal>
    </S.Overlay>
  );
};

TimeSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  initialHour: PropTypes.string.isRequired,
  initialMinute: PropTypes.string.isRequired,
};

export default TimeSelectModal;
