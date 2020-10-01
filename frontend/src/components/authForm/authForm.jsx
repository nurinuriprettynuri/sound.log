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
} from "../designSystem/basicForm";
import { withRouter } from "react-router-dom";

const mockEmail = "welcometosoundlog@gmail.com";
const mockPassword = "hihi";

const PurpleAuthButton = styled(BasicButton)`
  background-color: #dabfde;
  width: 100%;
`;

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
  text-align: center;
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
  whichAuth,
  err,
  handleSwitch,
  signin,
  registerUser,
  history,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm();

  const submitAction = whichAuth === "signin" ? signin : registerUser;

  const onSubmit = (data) => {
    submitAction(data)
      .then(() => history.push("/tracks"))
      .then(() => closeModal());
  };
  let title = whichAuth === "signin" ? "Sign in" : "Create account";
  let buttonText = "Continue";
  let optionText =
    whichAuth === "signin" ? "Join Sound.Log" : "Already have account";
  let switchModal = whichAuth === "signin" ? "register" : "signin";
  return (
    <AuthFormContainer big={whichAuth !== "signin"}>
      <TitleDiv>
        <TitleP>{title}</TitleP>
      </TitleDiv>
      <ErrorDiv>
        <ErrorP>{err}</ErrorP>
      </ErrorDiv>
      <FormDiv>
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          {whichAuth !== "signin" && (
            <React.Fragment>
              <BasicInputLabel>Username</BasicInputLabel>
              <BasicFormInput name="username" ref={register()} />
            </React.Fragment>
          )}
          <BasicInputLabel>Email</BasicInputLabel>
          <BasicFormInput
            name="email"
            type="email"
            ref={register({ required: true })}
          />
          <BasicInputLabel>Password</BasicInputLabel>
          <BasicFormInput
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          <br />
          <AuthButton type="submit">{buttonText}</AuthButton>
          <PurpleAuthButton>Sign in with mock account</PurpleAuthButton>
          <br />
          <FormLine />
          <AuthButton
            onClick={() => handleSwitch({ type: "auth", data: switchModal })}
          >
            {optionText}
          </AuthButton>
        </AuthForm>
      </FormDiv>
    </AuthFormContainer>
  );
};

export default withRouter(AuthModalForm);
