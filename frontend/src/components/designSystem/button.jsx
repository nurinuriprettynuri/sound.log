import React from "react";
import styled, { css } from "styled-components";
import colorTheme from "./colorTheme";

export const RegularButton = styled.button`
  display: flex;
  margin: 0 4px;
  width: ${(props) => (props.wide ? "150px" : "100px;")};
  height: 30px;
  color: #fff;
  vertical-align: middle;
  letter-spacing: 0.5px;
  line-height: 50px;
  font-size: 15px;
  border-radius: 5px;
  background-color: transparent;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-weight: bolder;
  border: 2px solid #fff;
  cursor: pointer;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #fff;
  }
  ${(props) =>
    props.orange &&
    css`
      background-color: #ec9706;
      border-color: #ec9706;
      &:hover {
        border-color: #ec9706;
      }
    `}
`;

export const TrackItemButtonDiv = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
`;

export const CustomButton = ({ text, orange, handleClick, wide }) => (
  <RegularButton orange={orange} onClick={handleClick} wide={wide}>
    {text}
  </RegularButton>
);
