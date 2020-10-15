import React from "react";
import { TrackArtistProfileImage } from "../designSystem/trackStyledComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfileWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 10px 10px;
`;

export const MiniProfile = ({ artist }) => {
  return (
    <ProfileWrapper>
      <br />
      <Link to={`/artist/${artist.artistId}`}>
        <TrackArtistProfileImage img={artist.avatar} />
      </Link>
      <Link to={`/artist/${artist.artistId}`}>
        <span>{artist.username}</span>
      </Link>
    </ProfileWrapper>
  );
};
