import React from "react";
import styled from "styled-components";
import SignInButton from "../authModalButton/authModalButton";
import {
  NavBar,
  MiddleNavWrapper,
  SideNavWrapper,
} from "../designSystem/navbarStyledComponents";
import ToggleMenu from "../toggleButton/toggleButton";
import Autocomplete from "../autocomplete/autocomplete";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ButtonWrapper } from "../designSystem/wrapper";
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
  height: 100%;
  color: #ccc;
  &:hover: {
    color: "#fff";
  }
`;

export const RightSection = materialStyled(Button)({
  height: "100%",
  display: "flex",
  boxSizing: "border-box",
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
  boxSizing: "border-box",
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
  justify-content: center;
  height: 100%;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: "#fff";
  }
`;

export const TopNavBar = ({ currentUser }) => {
  return (
    <NavBar top>
      <SideNavWrapper />
      <MiddleNavWrapper>
        <NavBarLink to="/">{mainOrangeLogo}</NavBarLink>

        <NavBarLink to="/tracks">
          <LeftSectionButton>Home</LeftSectionButton>
        </NavBarLink>

        <NavBarLink to="/library/likes">
          <LeftSectionButton>Library</LeftSectionButton>
        </NavBarLink>

        <Section>
          <Autocomplete />
        </Section>
        <a
          href="https://github.com/nurinuriprettynuri/sound.log"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RightSection>
            <GitHubIcon />
          </RightSection>
        </a>
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
            <NavBarLink to="/upload">
              <RightSection>Upload</RightSection>
            </NavBarLink>
            <NavBarLink to="/you">
              <RightSection>
                <AccountCircleIcon />
                &nbsp;
                {currentUser.username}
              </RightSection>
            </NavBarLink>
          </React.Fragment>
        )}

        <ToggleMenu />
      </MiddleNavWrapper>
      <SideNavWrapper />
    </NavBar>
  );
};

export default connect(mapStateToProps)(TopNavBar);
