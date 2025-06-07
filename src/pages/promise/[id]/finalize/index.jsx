import { useParams } from 'react-router-dom';
import WaitingSubmit from '@/components/promise/WaitingSubmit';
import PlaceCategoryMap from '@/components/promise/map/PlaceCategoryMap';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';
import { useUserInfo } from '@/hooks/stores/auth/useUserStore';
import { promiseDataShape } from '@/types/promise';

const FinalizePage = () => {
  const { promiseId } = useParams();
  const { userId } = useUserInfo();

  const { data: promiseData } = useGetPromiseData(promiseId, userId);

  if (!promiseData.isAllParticipantsSubmit) {
    return <WaitingSubmit promiseData={promiseData} />;
  }

  return <PlaceCategoryMap promiseData={promiseData} />;
};

FinalizePage.propTypes = {
  promiseData: promiseDataShape,
};

export default FinalizePage;
