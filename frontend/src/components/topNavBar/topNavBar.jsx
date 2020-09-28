import React from "react";
import styled from "styled-components";
import SignInButton from "../authModalButton/authModalButton";
import { NavBar, MiddleNavWrapper, SideNavWrapper } from "../nav/navbar";
import ToggleMenu from "../toggleButton/toggleButton";
import Autocomplete from "../autocomplete/autocomplete";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ButtonWrapper } from "../wrapper/wrapper";
import { styled as materialStyled } from "@material-ui/core/styles";
import { connect } from "react-redux";

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const NavBarLink = styled(Link)`
  text-decoration: none;
  color: #ccc;
`;

const RightSection = materialStyled(Button)({
  height: "100%",
  fontSize: "14px",
  margin: 0,

  color: "#ccc",
  "&:hover": {
    color: "#fff",
  },
});

const LeftSectionButton = materialStyled(Button)({
  height: "100%",
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
  margin-right: 10px;
  justify-content: center;
  height: 100%;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const TopNavBar = ({ currentUser, signout }) => {
  return (
    <NavBar top>
      <SideNavWrapper />
      <MiddleNavWrapper>
        <LeftSectionButton>
          <NavBarLink to="/">LOGO</NavBarLink>
        </LeftSectionButton>
        <LeftSectionButton>
          <NavBarLink to="/tracks">Home</NavBarLink>
        </LeftSectionButton>
        <LeftSectionButton>
          <NavBarLink to="/tracks">Library</NavBarLink>
        </LeftSectionButton>
        <Section>
          <Autocomplete />
        </Section>
        {!currentUser ? (
          <>
            <ButtonWrapper>
              <SignInButton text={"Sign in"} />
            </ButtonWrapper>
            <ButtonWrapper>
              <SignInButton text={"Create account"} />
            </ButtonWrapper>
          </>
        ) : (
          <RightSection>
            <NavBarLink to="/upload">SLOWDIVE</NavBarLink>
          </RightSection>
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
