import * as S from './style';
import PropTypes from 'prop-types';

/**
 * Button 컴포넌트
 *
 * @property {string} text - 버튼 글자
 */

const Button = ({ text }) => {
  return <S.Button>{text}</S.Button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

const LoginButton = ({ text }) => {
  return (
    <S.ButtonWrapper>
      <S.ButtonBackground />
      <S.ButtonText>{text}</S.ButtonText>
    </S.ButtonWrapper>
  );
};

LoginButton.propTypes = {
  text: PropTypes.string.isRequired, 
};


const DisabledButton = ({ text }) => {
  return (
    <S.DisabledButtonWrapper disabled>
      <S.DisabledButtonBackground />
      <S.DisabledButtonText>{text}</S.DisabledButtonText>
    </S.DisabledButtonWrapper>
  );
};

DisabledButton.propTypes = {
  text: PropTypes.string.isRequired,
};


const StartButton = ({ text }) => {
  return (
    <S.StartButtonWrapper disabled>
      <S.StartButtonBackground />
      <S.StartButtonText>{text}</S.StartButtonText>
    </S.StartButtonWrapper>
  );
};

StartButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LoginButton;
export { DisabledButton, Button, StartButton };
