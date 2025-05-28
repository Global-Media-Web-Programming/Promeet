import * as S from './style';
import PropTypes from 'prop-types';
import Backward from '@/components/ui/Backward';

/**
 * Promise 관련 Header 컴포넌트
 *
 * @param {string} text - 제목 텍스트
 * @param {boolean} [backward=true] - 뒤로가기 버튼 유무
 * @param {string} [navigateUrl=''] - 뒤로가기시 이동할 경로
 */

const Header = ({ text, backward = true, navigateUrl }) => {
  return (
    <S.Header>
      {backward ? <Backward size={'42px'} navigateUrl={navigateUrl} /> : null}
      <S.Text>{text}</S.Text>
      {backward && <S.DummySpace />}
    </S.Header>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  backward: PropTypes.bool,
  navigateUrl: PropTypes.string,
};

export default Header;
