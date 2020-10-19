import React from "react";
import styled from "styled-components";
import { TrackImage } from "../designSystem/trackStyledComponents";

import {
  ItemTitle,
  GreyH6,
  TextContainer,
} from "../designSystem/textStyledComponents";
import { OrangePlayButton } from "../playButton/playButton.container";
import LikeButton from "../likeButton/likeButton";
import DeleteButton from "../deleteButton/deleteButton";
import { Link } from "react-router-dom";

const TrackItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 20%;
`;

const TrackItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 35px;
  position: relative;
`;

export const TrackItem = ({ track }) => {
  return (
    <TrackItemWrapper>
      <TrackItemDiv>
        <Link to={`/tracks/${track.trackId}`}>
          <TrackImage small img={track.imageUrl} />
        </Link>
        <OrangePlayButton small={true} track={track} />
        <DeleteButton track={track} />
        <LikeButton liked={track.liked ? 1 : 0} trackId={track.trackId} />
        <TextContainer>
          <ItemTitle>{track.title}</ItemTitle>
          <GreyH6>{track.username}</GreyH6>
        </TextContainer>
      </TrackItemDiv>
    </TrackItemWrapper>
  );
};
