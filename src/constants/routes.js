export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign-up',

  // 약속 생성 관련
  PROMISE_CREATE_INFO: '/promise/create/info',
  PROMISE_CREATE_DATE: '/promise/create/date',
  PROMISE_CREATE_LOCATION: '/promise/create/location',
  PROMISE_CREATE_PLACE: '/promise/create/place',
  PROMISE_CREATE_SCHEDULE: '/promise/create/schedule',
  PROMISE_CREATE_FINALIZE: '/promise/:promiseId/finalize', // 위치 확정

  // 공유 링크를 통해 접근하는 약속 참여 관련
  PROMISE_DETAIL: '/promise/:promiseId',
  PROMISE_SUGGESTIONS: '/promise/:promiseId/suggestions', // 장소 제안
  PROMISE_CONFIRMED: '/promise/:promiseId/confirmed', // 약속 최종 정보

  // 유저가 자신의 일정을 입력
  USER: 'user',
  ENTER_SCHEDULE: '/user/enter-schedule',
  NOT_FOUND: '*',
};
