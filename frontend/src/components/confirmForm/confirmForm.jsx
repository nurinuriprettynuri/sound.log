import React from "react";
import { BasicForm, TitleDiv, TitleP } from "../designSystem/basicForm";
import { SplashButtonwrapper } from "../splash/splash";
import styled from "styled-components";
import { CustomButton } from "../designSystem/button";

const ConfirmationForm = styled(BasicForm)`
  padding: 10px;
  width: 250px;
  background-color: #dabfde;
  border-radius: 10px;
`;

const DeleteButton = styled(CustomButton)``;

const ConfirmTitle = styled(TitleP)`
  color: #fff;
  font-size: 24px;
`;

export const ConfirmForm = ({ deleteTrack, closeModal, confirmMessage }) => {
  return (
    <ConfirmationForm>
      <TitleDiv>
        <ConfirmTitle>{confirmMessage}</ConfirmTitle>
      </TitleDiv>
      <SplashButtonwrapper>
        <CustomButton handleClick={closeModal} text={"Cancel"} />
        <CustomButton handleClick={deleteTrack} text={"Delete"} orange={true} />
      </SplashButtonwrapper>
    </ConfirmationForm>
  );
};
