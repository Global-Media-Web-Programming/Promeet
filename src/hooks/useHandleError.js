import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';
import ApiError from '@/apis/apiError';

// api 에러 발생시 에러 바운더리로 사용자에게 표시
const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();
  const handleError = (error) => {
    if (error instanceof AxiosError) {
      showBoundary(error);
    } else {
      showBoundary(new ApiError('UNKNOWN_ERROR', '알 수 없는 에러가 발생했습니다.'));
    }
  };

  return handleError;
};

export default useErrorHandler;
