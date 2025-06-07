import { useState } from 'react';
import * as S from './style';
import DelScheduleModal from '@/components/modal/DelScheduleModal';
import AddScheduleModal from '@/components/modal/AddScheduleModal';
import FixedTimeTable from '@/components/timeTable/FixedTimeTable';
import delIcon from '@/assets/img/icon/delete.svg';
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
  const [delOpen, setDelOpen] = useState(false);

  // 일정 삭제 (scheduleId로 삭제)
  const handleDeleteSchedule = (scheduleId) => {
    setFixedScheduleData((prev) => ({
      ...prev,
      fixedSchedules: prev.fixedSchedules.filter((s) => s.scheduleId !== scheduleId),
    }));
    setDelOpen(false);
    // 서버 연동 시: DELETE /api/schedule/:scheduleId 등으로 요청
  };

  // 일정 추가 (AddScheduleModal에서 여러 일정 한 번에 추가)
  const handleAddSchedules = (schedules) => {
    // scheduleId 부여(임시, 서버 연동 전)
    const withId = schedules.map((s) => ({
      ...s,
      scheduleId: Math.random().toString(36).slice(2, 12), // 임시 id
    }));
    setFixedScheduleData((prev) => ({
      ...prev,
      fixedSchedules: [...prev.fixedSchedules, ...withId],
    }));
    setOpen(false);
  };

  return (
    <S.Container>
      <S.TopBar>
        <S.FixedScheduleTitle>고정 일정</S.FixedScheduleTitle>
        <S.ButtonOptions>
          <S.DelSchedulButton onClick={() => setDelOpen(true)}>
            <img src={delIcon} alt="Delete" />
          </S.DelSchedulButton>
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
      <DelScheduleModal
        isOpen={delOpen}
        schedules={fixedScheduleData.fixedSchedules}
        onClose={() => setDelOpen(false)}
        onDelete={handleDeleteSchedule}
      />
      스케줄 입력 페이지
    </S.Container>
  );
};

export default EnterSchedulePage;
