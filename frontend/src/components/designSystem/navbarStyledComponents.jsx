import styled, { css } from "styled-components";

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  justify-content: center;

  position: fixed;
  height: 50px;
  width: 100vw;
  min-width: 900px;
  box-sizing: border-box;
  left: 0;
  z-index: 20;

  ${(props) =>
    props.top
      ? css`
          top: 0;
          background-color: #333;
          color: #fff;
        `
      : css`
          background-color: #f2f2f2;
          border-top: 1px solid #cecece;
          bottom: 0;
          color: #333;
        `}
`;

export const SideNavWrapper = styled.div``;

export const MiddleNavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90vw;
  height: 100%;
  max-width: 1240px;
  min-width: 900px;
  margin: 0;
  position: relative;
  box-sizing: border-box;
`;
