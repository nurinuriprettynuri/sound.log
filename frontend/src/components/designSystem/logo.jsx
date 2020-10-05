import React from "react";
import styled from "styled-components";
import HeadsetIcon from "@material-ui/icons/Headset";

const OrangeLogoDiv = styled.div`
  font-family: "Reenie Beanie", cursive;
  width: 100px;
  height: 50px;
  background-color: #ec9706;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 0 5px;
  box-sizing: border-box;
`;

const TransparentLogoDiv = styled.div`
  font-family: "Reenie Beanie", cursive;
  width: 100px;
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.big ? "32px" : "30px")};
  padding: 0 5px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    color: #dc4e76;
  }
`;

export const mainOrangeLogo = (
  <OrangeLogoDiv>
    <HeadsetIcon />
    {".log()"}
  </OrangeLogoDiv>
);

export const MainLogo = ({ handleClick }) => (
  <TransparentLogoDiv big onClick={handleClick}>
    <HeadsetIcon style={{ fontSize: 30 }} />
    {".log()"}
  </TransparentLogoDiv>
);
