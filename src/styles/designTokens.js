import { css } from 'styled-components';
import { theme } from './theme';

/* 추가로 필요한 css 변수를 정의해주세요  */
const designTokens = css`
  /* --css-variable-example: ${theme.color.point2}; */
  --nav-height: 82px;
  --outlet-padding: 30px;
  --place-category-tab-height: 60px;
  --bs-header-height: 50px;
`;

export default designTokens;
