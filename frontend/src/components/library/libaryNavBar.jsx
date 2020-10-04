import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrapper = styled.div`
  width: 98%;
  padding: 20px 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const NavBarLink = styled(Link)`
  font-size: 24px;
  color: ${(props) => (props.path === props.to ? "#ff7802" : "#333")};
  text-decoration: none;
  padding: 5px 10px;
  border-bottom: ${(props) =>
    props.currentPath === props.to
      ? "2px solid #ff7802;"
      : "2px solid #f2f2f2"};
`;

const Blank = styled(Link)`
  font-size: 24px;
  text-decoration: none;
  padding: 5px 10px;
  flex: 1;
  flex-grow: 1;
  border-bottom: 2px solid #f2f2f2;
`;

export const LibraryNavBar = ({ path }) => {
  return (
    <NavWrapper>
      <NavBarLink to="/library/likes" path={path}>
        Likes
      </NavBarLink>
      <NavBarLink to="/library/myTrack" path={path}>
        My track
      </NavBarLink>
      <Blank to="#"></Blank>
    </NavWrapper>
  );
};
