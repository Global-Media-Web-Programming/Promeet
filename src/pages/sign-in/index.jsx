import React, { useState } from 'react';
import * as S from './style';
import LoginButton from '@/components/ui/Button';
import InputBox from '@/components/ui/InputBox';

const SignInPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <S.Container>
      {/* 로그인 타이틀 */}
      <S.Title>로그인</S.Title>

      {/* 이름 인풋 */}
      <S.InputWrapper top="267px">
        <InputBox
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </S.InputWrapper>

      {/* 비밀번호 인풋 */}
      <S.InputWrapper top="357px">
        <InputBox
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </S.InputWrapper>

      {/* 버튼 */}
      <S.ButtonWrapper>
        <LoginButton text="로그인하기" />
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default SignInPage;
