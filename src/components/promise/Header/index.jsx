import * as S from './style';
import PropTypes from 'prop-types';
import Backward from '@/components/ui/Backward';

/**
 * Promise 관련 Header 컴포넌트
 *
 * @param {string} text - 텍스트
 * @param {boolean} [backward=true] - 뒤로가기 버튼 유무
 */

const Header = ({ text, backward = true }) => {
  return (
    <S.Header>
      {backward ? <Backward /> : null}
      <S.Text>{text}</S.Text>
    </S.Header>
  );
};

Header.propTypes = {
  text: PropTypes.string,
  backward: PropTypes.bool,
};

export default Header;
