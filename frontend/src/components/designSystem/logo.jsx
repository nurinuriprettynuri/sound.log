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
  font-size: 30px;
  padding: 0 5px;
  box-sizing: border-box;
`;

export const mainOrangeLogo = (
  <OrangeLogoDiv>
    <HeadsetIcon />
    {".log()"}
  </OrangeLogoDiv>
);

export const mainLogo = (
  <TransparentLogoDiv>
    <HeadsetIcon />
    {".log()"}
  </TransparentLogoDiv>
);
