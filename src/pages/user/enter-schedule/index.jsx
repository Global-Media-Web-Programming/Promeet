import { useState } from 'react';
import AddScheduleModal from '@/components/modal/AddScheduleModal';
import addIcon from '@/assets/img/icon/add.svg';

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <img src={addIcon} alt="Add" />
      </button>
      <AddScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default UserPage;
