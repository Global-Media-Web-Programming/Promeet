import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BUILD_ROUTES, ROUTES } from '../constants/routes';
import { useUserInfo, useUserActions } from '@/hooks/stores/auth/useUserStore';
import { usePromiseDataActions } from '@/hooks/stores/promise/usePromiseDataStore';
import useGetPromiseData from '@/hooks/queries/useGetPromiseData';

// 로그인 안됐을 때 페이지 보호
export const ProtectedPageWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate(ROUTES.SIGN_IN);
      return;
    }
  }, [userId, navigate]);

  return children;
};

ProtectedPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속 생성자만 접근 가능
export const CreateOnlyWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { data: promiseData } = useGetPromiseData(promiseId, userId);
  const { setUserType } = useUserActions();

  // 유저가 생성한 약속이 아니면 홈으로 리다이렉트
  useEffect(() => {
    const isCreator = promiseData.creatorId === userId;
    if (!isCreator) {
      navigate(ROUTES.HOME);
      return null;
    }

    // 유저 타입 정의
    setUserType('create');
  }, [promiseData.creatorId, userId, navigate, setUserType]);

  return children;
};

CreateOnlyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 참여 요청 받은 사람만 접근 가능
export const JoinOnlyWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { pathname } = useLocation();
  const { setUserType } = useUserActions();
  const { data: promiseData } = useGetPromiseData(promiseId, userId);
  const { hasNearestSubwayStationData } = usePromiseDataActions();

  useEffect(() => {
    if (!promiseData) return;

    // 초대받은 사람 체크 (생성자가 아니면서 members에 있는 경우)
    const isInvitedMember = promiseData.members.some(
      (member) => member.userId === userId && member.userId !== promiseData.creatorId,
    );

    // 참여 권한 없음 → 홈으로 이동
    if (!isInvitedMember) {
      navigate(ROUTES.HOME);
      return;
    }

    // schedule 페이지에서 위치 정보 체크
    if (pathname === ROUTES.PROMISE_SCHEDULE) {
      // 위치 정보 (가까운 지하철 정보) 미제출시 위치 입력 페이지로 이동
      const hasNS = hasNearestSubwayStationData();
      if (!hasNS) {
        navigate(BUILD_ROUTES.PROMISE_LOCATION(promiseId));
        return;
      }
    }

    // result 페이지에서 데이터 제출 체크
    if (pathname === ROUTES.PROMISE_RESULT) {
      const currentMember = promiseData.members.find((member) => member.userId === userId);
      // 정보 입력 안된 사용자면 위치 입력부터 하게 함
      if (!currentMember?.hasSubmittedData) {
        navigate(BUILD_ROUTES.PROMISE_LOCATION(promiseId));
        return;
      }
    }

    // 참여자 유형 저장
    setUserType('join');
  }, [
    promiseData,
    userId,
    pathname,
    promiseId,
    navigate,
    setUserType,
    hasNearestSubwayStationData,
  ]);

  return children;
};

JoinOnlyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속에 포함된 사람이면 접근 가능
export const PromiseMemberWrapper = ({ children }) => {
  const { userId } = useUserInfo();
  const navigate = useNavigate();
  const { promiseId } = useParams();
  const { data: promiseData } = useGetPromiseData(promiseId, userId);

  useEffect(() => {
    // 약속 멤버 체크
    const isMember = promiseData.members.some((member) => member.userId === userId);
    if (!isMember) {
      navigate(ROUTES.HOME);
      return;
    }

    // 약속 상태 체크
    if (promiseData && !promiseData.isFixed) {
      // 홈 페이지로 리다이렉트
      navigate(ROUTES.HOME);
    }
  }, [promiseData, userId, promiseId, navigate]);

  return children;
};

PromiseMemberWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// 약속 생성 플로우 래퍼
export const PromiseCreateWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { hasDataUntil } = usePromiseDataActions();

  useEffect(() => {
    // 약속 생성 플로우 경로인지 확인
    const isPromiseCreatePath = Object.values(ROUTES).some(
      (path) => path === pathname && path.startsWith('/promise/create'),
    );

    if (!isPromiseCreatePath) return;

    // info 페이지는 체크하지 않음
    if (pathname === ROUTES.PROMISE_CREATE_INFO) return;

    // 이전 단계 데이터 체크
    const step = pathname.split('/').pop(); // 'date', 'location', 'schedule'
    const hasRequiredData = hasDataUntil(step);

    if (!hasRequiredData) {
      // 이전 단계로 리다이렉트
      const steps = ['info', 'date', 'location', 'schedule'];
      const currentStepIndex = steps.indexOf(step);
      const prevStep = steps[currentStepIndex - 1] ?? 'info';
      navigate(BUILD_ROUTES.PROMISE_CREATE(prevStep));
    }
  }, [pathname, hasDataUntil, navigate]);

  return children;
};
