import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const DelScheduleModal = ({ isOpen, schedules, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.Title>일정 삭제</S.Title>
        <S.List>
          {schedules.length === 0 && <S.ListItem>등록된 일정이 없습니다.</S.ListItem>}
          {schedules.map((s) => (
            <S.ListItem key={s.scheduleId}>
              <S.ScheduleInfo>
                <S.TitleText>{s.title}</S.TitleText> {s.day} {s.startTime.hour}:{s.startTime.minute}
                ~{s.endTime.hour}:{s.endTime.minute}
              </S.ScheduleInfo>
              <S.DeleteButton onClick={() => onDelete(s.scheduleId)}>삭제</S.DeleteButton>
            </S.ListItem>
          ))}
        </S.List>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.Modal>
    </S.Overlay>
  );
};

DelScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      scheduleId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      startTime: PropTypes.shape({
        hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }).isRequired,
      endTime: PropTypes.shape({
        hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }).isRequired,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DelScheduleModal;
