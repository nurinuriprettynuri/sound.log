import React from "react";
import styled from "styled-components";
import SignInButton from "../authModalButton/authModalButton";
import {
  NavBar,
  MiddleNavWrapper,
  SideNavWrapper,
} from "../designSystem/navbar";
import ToggleMenu from "../toggleButton/toggleButton";
import Autocomplete from "../autocomplete/autocomplete";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ButtonWrapper } from "../wrapper/wrapper";
import { styled as materialStyled } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GitHubIcon from "@material-ui/icons/GitHub";
import { mainOrangeLogo } from "../designSystem/logo";

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

const NavBarLink = styled(Link)`
  text-decoration: none;
  color: #ccc;
  &:hover: {
    color: #fff;
  }
`;

export const RightSection = materialStyled(Button)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  minWidth: "50px",
  fontSize: "14px",
  margin: 0,
  textTransform: "none",
  lineHeight: 0,
  color: "#ccc",
  "&:hover": {
    color: "#fff",
  },
});

const LeftSectionButton = materialStyled(Button)({
  height: "100%",
  textTransform: "none",
  borderRadius: 0,
  borderRight: "1px solid #111",
  width: "100px",
  color: "#ccc",
  "&:hover": {
    color: "#fff",
  },
});

export const Section = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  align-items: center;
  margin-right: 12px;
  justify-content: center;
  height: 100%;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const TopNavBar = ({ currentUser }) => {
  return (
    <NavBar top>
      <SideNavWrapper />
      <MiddleNavWrapper>
        <LeftSectionButton>
          <NavBarLink to="/">{mainOrangeLogo}</NavBarLink>
        </LeftSectionButton>
        <LeftSectionButton>
          <NavBarLink to="/tracks">Home</NavBarLink>
        </LeftSectionButton>
        <LeftSectionButton>
          <NavBarLink to="/library/likes">Library</NavBarLink>
        </LeftSectionButton>
        <Section>
          <Autocomplete />
        </Section>
        {!currentUser ? (
          <React.Fragment>
            <ButtonWrapper>
              <SignInButton text={"Sign in"} />
            </ButtonWrapper>
            <ButtonWrapper>
              <SignInButton text={"Create account"} />
            </ButtonWrapper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RightSection>
              <NavBarLink to="/">
                <GitHubIcon />
              </NavBarLink>
            </RightSection>
            <RightSection>
              <AccountCircleIcon />
              &nbsp;
              <NavBarLink to="/you">{currentUser.username}</NavBarLink>
            </RightSection>
          </React.Fragment>
        )}
        <RightSection>
          <NavBarLink to="/upload">Upload</NavBarLink>
        </RightSection>
        <ToggleMenu />
      </MiddleNavWrapper>
      <SideNavWrapper />
    </NavBar>
  );
};

export default connect(mapStateToProps)(TopNavBar);
