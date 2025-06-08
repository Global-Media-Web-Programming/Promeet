import styled from 'styled-components';

export const Title = styled.h1`
  margin: 0 0 20px 5px;
  font-size: 25px;
  font-weight: 600;
  line-height: 25px; /* 100% */
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// ButtonWrapper (버튼 외곽)
export const ButtonWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 60px;
  margin-top: 20px;
  border-radius: 15px;
`;

// ButtonBackground (버튼 배경)
export const ButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 60px;
  border-radius: 15px;

  background: #40b59f;
  box-shadow: 0 2px 8px rgb(16, 105, 227, 30%);
`;

// ButtonText (버튼 텍스트)
export const ButtonText = styled.div`
  position: absolute;
  top: 22px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
  text-align: center;
  letter-spacing: 0.2px;
`;

// DisabledButtonWrapper (비활성화 버튼 외곽)
export const DisabledButtonWrapper = styled.button`
  cursor: not-allowed;

  position: relative;

  width: 100%;
  height: 60px;
  margin-top: 20px;
  padding: 0;
  border: none;
  border-radius: 15px;

  background: none;
  outline: none;
`;

// DisabledButtonBackground (비활성화 배경)
export const DisabledButtonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 60px;
  border-radius: 15px;

  background: #949494;
  box-shadow: 0 2px 8px rgb(16, 105, 227, 30%);
`;

// DisabledButtonText (비활성화 텍스트)
export const DisabledButtonText = styled.span`
  position: absolute;
  top: 22px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 16px;

  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
  text-align: center;
  letter-spacing: 0.2px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 327px;
  height: 94px; /* label(14px) + input(64px) + padding 등 여유 */
`;

export const Label = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #848a94;
`;

export const Input = styled.input`
  position: absolute;
  top: 30px;
  left: 0;

  box-sizing: border-box;
  width: 327px;
  height: 64px;
  padding: 20px;
  border: 1px solid ${(props) => (props.isFocused ? '#40B59F' : '#E9F1FF')};
  border-radius: 16px;

  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000000;

  outline: none;

  transition: border-color 0.2s ease-in-out;
`;
