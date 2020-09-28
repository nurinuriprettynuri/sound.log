import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Line } from "../trackIndexRow/trackIndexRow";
import {
  BasicFormInput,
  TitleDiv,
  BasicInputLabel,
  BasicForm,
  BasicButton,
} from "../form/basicForm";
import { withRouter } from "react-router-dom";

const AuthFormContainer = styled.div`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 320px;
  height: ${(props) => (props.big ? `520px` : `460px`)};
  position: relative;
`;

const TitleP = styled.p`
  color: #333;
  font-size: 30px;
  width: 100%;
  margin: 0;
  height: 100%;
`;

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
`;

const ErrorP = styled.p`
  font-size: 14px;
  color: #ff0000;
`;

const FormDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const AuthForm = styled(BasicForm)`
  align-items: center;
`;

const AuthButton = styled(BasicButton)`
  width: 100%;
`;

const FormLine = styled(Line)`
  margin: 10px 0;
`;

export const AuthModalForm = ({
  modal,
  err,
  handleSwitch,
  signin,
  registerUser,
  history,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm();

  const submitAction = modal === "signin" ? signin : registerUser;
  console.log(modal)
  const onSubmit = (data) => {
    submitAction(data)
      .then(() => history.push("/tracks"))
      .then(() => closeModal());
  };
  let title = modal === "signin" ? "Sign in" : "Create account";
  let buttonText = "Continue";
  let optionText =
    modal === "signin" ? "Join Sound.Log" : "Already have account";
  let switchModal = modal === "signin" ? "register" : "signin";
  return (
    <AuthFormContainer big={modal !== "signin"}>
      <TitleDiv>
        <TitleP>{title}</TitleP>
      </TitleDiv>
      <ErrorDiv>
        <ErrorP>{err}</ErrorP>
      </ErrorDiv>
      <FormDiv>
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          {modal !== "signin" && (
            <>
              <BasicInputLabel>Username</BasicInputLabel>
              <BasicFormInput name="username" ref={register()} />
            </>
          )}
          <BasicInputLabel>Email</BasicInputLabel>
          <BasicFormInput name="email" ref={register({ required: true })} />
          <BasicInputLabel>Password</BasicInputLabel>
          <BasicFormInput name="password" ref={register({ required: true })} />
          <br />
          <AuthButton type="submit">{buttonText}</AuthButton>
          <AuthButton>Sign in with mock account</AuthButton>
          <br />
          <FormLine />
          <AuthButton onClick={() => handleSwitch(switchModal)}>
            {optionText}
          </AuthButton>
        </AuthForm>
      </FormDiv>
    </AuthFormContainer>
  );
};

export default withRouter(AuthModalForm);
