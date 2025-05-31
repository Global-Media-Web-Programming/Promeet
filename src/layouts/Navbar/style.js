// style.js
import styled from 'styled-components';

export const BottomBar = styled.nav`
  position: absolute;
  z-index: 1000;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  max-width: 390px;
  height: 70px;

  background-color: white;
  box-shadow: 0 -1px 6px rgb(0, 0, 0, 10%);
`;

export const NavButton = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  font-size: 24px;
  color: ${(props) => (props.active ? '#6dbbae' : '#002055')};

  background: none;
  outline: none;
`;

export const AddButton = styled.button`
  cursor: pointer;

  transform: translateY(-20%);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;

  font-size: 32px;
  color: white;

  background-color: #6dbbae;
  outline: none;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 20%);
`;
