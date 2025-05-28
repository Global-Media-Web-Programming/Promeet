import * as S from './style';
import FixedTimeTable from '@/components/timeTable/FixedTimeTable';

const UserPage = () => {
  return (
    <>
      <S.Container>스케줄 입력 페이지</S.Container>
      <FixedTimeTable />
    </>
  );
};
export default UserPage;
