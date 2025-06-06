import { useState } from 'react';
import * as S from './style';
import AddScheduleModal from '@/components/modal/AddScheduleModal';
import FixedTimeTable from '@/components/timeTable/FixedTimeTable';
import addIcon from '@/assets/img/icon/add.svg';

const DEFAULT_START = { hour: 9, minute: 0 };
const DEFAULT_END = { hour: 18, minute: 0 };

const userId = 'abc123';

const EnterSchedulePage = () => {
  // 서버에 보낼 데이터 구조로 state 관리
  const [fixedScheduleData, setFixedScheduleData] = useState({
    userId,
    fixedSchedules: [],
  });
  const [open, setOpen] = useState(false);

  // 일정 추가 (AddScheduleModal에서 여러 일정 한 번에 추가)
  const handleAddSchedules = (schedules) => {
    setFixedScheduleData((prev) => ({
      ...prev,
      fixedSchedules: [...prev.fixedSchedules, ...schedules],
    }));
    setOpen(false);
  };

  return (
    <S.Container>
      <S.TopBar>
        <S.FixedScheduleTitle>고정 일정</S.FixedScheduleTitle>
        <S.ButtonOptions>
          <S.AddScheduleButton onClick={() => setOpen(true)}>
            <img src={addIcon} alt="Add" />
          </S.AddScheduleButton>
        </S.ButtonOptions>
      </S.TopBar>
      <FixedTimeTable
        schedules={fixedScheduleData.fixedSchedules}
        defaultStart={DEFAULT_START}
        defaultEnd={DEFAULT_END}
      />
      <AddScheduleModal isOpen={open} onClose={() => setOpen(false)} onAdd={handleAddSchedules} />
      스케줄 입력 페이지
    </S.Container>
  );
};

export default EnterSchedulePage;
