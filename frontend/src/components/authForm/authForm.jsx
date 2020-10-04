import React, { useState, useEffect } from "react";
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
} from "../designSystem/basicForm";
import { withRouter } from "react-router-dom";
import { authValidation, formText } from "../../util/authValidation";

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
  }, [whichAuth]);

  const handleMockLogin = () => {
    const mockEmail = "slowdive@gmail.com";
    const mockPassword = "password";
    let i = 0;
    (function () {
      let emailRef = setInterval(() => {
        setEmail((pre) => pre + mockEmail[i]);
        i++;
        if (i === mockEmail.length) clearInterval(emailRef);
      }, 100);
    })();
    (function () {
      let j = 0;
      let passwordRef = setInterval(() => {
        setPassword((pre) => pre + mockPassword[j]);
        j++;
        if (j === mockPassword.length) clearInterval(passwordRef);
      }, 100);
    })();
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
      console.log(password, email);
      validate(result);
    }
    submitAction({ username, email, password })
      .then(() => history.push("/tracks"))
      .then(() => closeModal());
  };

  return (
    <AuthFormContainer big={whichAuth !== "signin"}>
      <TitleDiv>
        <TitleP>{title}</TitleP>
      </TitleDiv>
      <FormDiv>
        <AuthForm onSubmit={handleSubmit}>
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
          <AuthButton type="submit">{buttonText}</AuthButton>
          <PurpleAuthButton
            type="button"
            onClick={() => {
              handleSwitch({ type: "auth", data: switchModal }).then(() =>
                handleMockLogin()
              );
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
