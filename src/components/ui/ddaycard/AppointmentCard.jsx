import React from 'react';
import * as S from './style';
import PropTypes from 'prop-types';

const getProgress = (dday, max = 10) => {
  const n = Number(String(dday).replace(/D-/, ''));
  return Math.max(0, Math.min(1, (max - n + 1) / max));
};

const AppointmentCard = ({ dday, label, left, top, size = 80 }) => {
  const isInviteOrProposal = dday === '초대됨' || dday === '제안함' || dday === '제안';
  const centerText = dday === '초대됨' ? '수락' : dday;
  const progress = isInviteOrProposal ? 0 : getProgress(dday, 10);

  const style = {};
  if (left !== undefined) style.left = left;
  if (top !== undefined) style.top = top;
  if (left !== undefined || top !== undefined) style.position = 'absolute';

  return (
    <S.CircleCard style={style}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="#eaf1ff" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isInviteOrProposal ? '#D1E2FE' : '#40b59f'}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={isInviteOrProposal ? 0 : 2 * Math.PI * 45 * (1 - progress)}
            strokeLinecap="round"
          />
        </svg>
        <S.CircleCenterText
          style={{
            fontSize: size / 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            userSelect: 'none',
          }}
        >
          {centerText}
        </S.CircleCenterText>
      </div>
      <S.CircleCardLabel>{label}</S.CircleCardLabel>
    </S.CircleCard>
  );
};

AppointmentCard.propTypes = {
  dday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AppointmentCard;
