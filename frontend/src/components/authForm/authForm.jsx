import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Line } from "../trackIndexRow/trackIndexRow";
import {
  BasicFormInput,
  TitleDiv,
  TitleP,
  BasicInputLabel,
  BasicForm,
  BasicButton,
  FormWarningSpan,
} from "../designSystem/basicFormStyledComponents";
import { withRouter } from "react-router-dom";
import { authValidation, formText } from "../../util/authValidation";
import { asyncInterval } from "../../util/asyncInterval";

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

const FormDiv = styled.div`
  width: 100%;
  min-height: 510px;
  padding: 15px;
  box-sizing: border-box;
`;

const AuthForm = styled(BasicForm)`
  align-items: flex-start;
`;

const AuthButton = styled(BasicButton)`
  width: 100%;
`;

const FormLine = styled(Line)`
  margin: 10px 0;
`;

export const AuthModalForm = ({
  whichAuth,
  handleSwitch,
  signin,
  registerUser,
  history,
  closeModal,
}) => {
  const [isValid, validate] = useState([true]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setpasswordconfirm] = useState("");

  useEffect(() => {
    setPassword("");
    setEmail("");
    setUsername("");
    validate([true]);
  }, [whichAuth]);

  const handleMockLogin = () => {
    const mockPassword = "password";
    const mockEmail = "orangecat@gmail.com";
    let i = 0;
    let j = 0;

    asyncInterval(
      () => {
        setEmail((pre) => pre + mockEmail[j]);
        j++;
        return j === mockEmail.length;
      },
      80,
      mockEmail.length
    )
      .then(() =>
        asyncInterval(
          () => {
            setPassword((pre) => pre + mockPassword[i]);
            i++;
            return i === mockPassword.length;
          },
          80,
          mockPassword.length
        )
      )
      .then(() => inputRef.current.click());
  };

  const { submitAction, title, buttonText, optionText, switchModal } = formText(
    whichAuth,
    signin,
    registerUser
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, username, password, passwordconfirm };
    const result = authValidation(data, whichAuth);

    if (!result[0]) {
      validate(result);
      return;
    } else {
      validate(result);
    }
    submitAction({ username, email, password })
      .then(() => history.push("/tracks"))
      .then(() => closeModal());
  };
  const inputRef = useRef(null);

  return (
    <AuthFormContainer big={whichAuth !== "signin"}>
      <TitleDiv>
        <TitleP>{title}</TitleP>
      </TitleDiv>
      <FormDiv>
        <AuthForm onSubmit={handleSubmit} autocomplete="off">
          {whichAuth !== "signin" && (
            <React.Fragment>
              <BasicInputLabel>Username</BasicInputLabel>
              <BasicFormInput
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {!isValid[0] && isValid[1].username && (
                <FormWarningSpan>{isValid[1]["username"]}</FormWarningSpan>
              )}
            </React.Fragment>
          )}
          <BasicInputLabel>Email</BasicInputLabel>
          <BasicFormInput
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isValid[0] && isValid[1]["email"] && (
            <FormWarningSpan>{isValid[1].email}</FormWarningSpan>
          )}
          <BasicInputLabel>Password</BasicInputLabel>
          <BasicFormInput
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isValid[0] && isValid[1]["password"] && (
            <FormWarningSpan>{isValid[1].password}</FormWarningSpan>
          )}
          {whichAuth !== "signin" && (
            <React.Fragment>
              <BasicInputLabel>Password Confirm</BasicInputLabel>
              <BasicFormInput
                name="passwordconfirm"
                type="password"
                value={passwordconfirm}
                onChange={(e) => setpasswordconfirm(e.target.value)}
              />
              {!isValid[0] && isValid[1].passwordconfirm && (
                <FormWarningSpan>{isValid[1].passwordconfirm}</FormWarningSpan>
              )}
            </React.Fragment>
          )}
          <br />
          <AuthButton type="submit" ref={inputRef}>
            {buttonText}
          </AuthButton>
          <PurpleAuthButton
            type="button"
            onClick={() => {
              handleSwitch({ type: "auth", data: "signin" });
              handleMockLogin();
            }}
          >
            Sign in with mock account
          </PurpleAuthButton>
          <br />
          <FormLine />
          <AuthButton
            type="button"
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
