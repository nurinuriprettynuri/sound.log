import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrapper = styled.div`
  width: 90%;
  padding: 20px 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 2px solid #efefef;
  margin-bottom: 20px;
`;

const NavBarLink = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
  padding: 0 10px;
`;

export const LibraryNavBar = () => {
  return (
    <NavWrapper>
      <NavBarLink to="/likes">Likes</NavBarLink>
      <NavBarLink to="/myTrack">My track</NavBarLink>
    </NavWrapper>
  );
};
