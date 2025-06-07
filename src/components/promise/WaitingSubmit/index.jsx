import * as S from './style';
import { promiseDataShape } from '@/types/promise';

const WaitingSubmit = ({ promiseData }) => {
  return (
    <S.Contianer>
      <S.WatingText>{`모든 참여자의 입력을\n기다리고 있어요`}</S.WatingText>
      <S.InfoConainer>
        <S.Title>{promiseData.title}</S.Title>
        <S.Description>{promiseData.description}</S.Description>
      </S.InfoConainer>
      <S.Line />
      <S.StatusContainer>
        <S.StatusWrapper>
          <S.TimeIcon /> <p>모든 참여자의 입력을 기다리고 있어요</p>
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.LocationIcon /> <p>모든 참여자의 입력을 기다리고 있어요</p>
        </S.StatusWrapper>
        <S.StatusWrapper>
          <S.PeopleIcon />
          <S.MemberList>
            {promiseData.members.map((member) => (
              <S.MemberItem key={member.userId}>
                <p>{member.name}</p>
                {member.hasSubmittedData && '✅'}
              </S.MemberItem>
            ))}
          </S.MemberList>
        </S.StatusWrapper>
      </S.StatusContainer>
    </S.Contianer>
  );
};

WaitingSubmit.propTypes = {
  promiseData: promiseDataShape,
};

export default WaitingSubmit;
