import { useState } from 'react';
// import * as S from './style';
import CommonModal from '@/components/modal/CommonModal';
import addIcon from '@/assets/img/icon/add.svg';

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <img src={addIcon} alt="Add" />
      </button>
      <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>테스트 모달</h2>
        <p>이곳에 원하는 내용을 넣으세요.</p>
      </CommonModal>
    </>
  );
};

export default UserPage;
