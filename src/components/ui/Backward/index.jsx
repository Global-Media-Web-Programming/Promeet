import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { BACKWARD_ICON } from '@/constants/ui';
import PropTypes from 'prop-types';

/**
 * Backward 컴포넌트
 *
 * @param {'back' | 'arrow'} [type='back'] - 종류
 * @param {string} [size='24px'] - 사이즈
 * @param {boolean} [isErrorFallback=false] - 에러 컴포넌트 여부
 * @param {string} [navigateUrl=''] - 클릭시 이동할 경로
 */

const ICON_MAP = {
  back: S.BackIcon,
  arrow: S.BackIconArrow,
};

const Backward = ({ type = 'back', size = '24px', isErrorFallback = false, navigateUrl = '' }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // 에러 컴포넌트에서는 window.history로 전으로 이동
    if (isErrorFallback) {
      window.history.back();
      return;
    }
    // 이동 경로 받았으면
    if (navigateUrl) {
      navigate(navigateUrl);
    } else {
      // 아니면 전으로 이동
      navigate(-1);
    }
  };

  const Icon = ICON_MAP[type] ?? S.BackIcon1;

  return <Icon $size={size} onClick={handleBackClick} />;
};

Backward.propTypes = {
  type: PropTypes.oneOf(Object.values(BACKWARD_ICON)),
  size: PropTypes.string,
  isErrorFallback: PropTypes.bool,
  navigateUrl: PropTypes.string,
};

export default Backward;
