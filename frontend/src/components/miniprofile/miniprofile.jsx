import React from "react";
import { ProfileImage } from "../wrapper/wrapper";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 10px 10px;
`;

export const MiniProfile = ({ artist, avatar }) => {
  return (
    <ProfileWrapper>
      <br />
      <ProfileImage img={artist.avatar} />
      <span>{artist.username}</span>
    </ProfileWrapper>
  );
};
