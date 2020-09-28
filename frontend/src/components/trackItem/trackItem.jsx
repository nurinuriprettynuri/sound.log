import React from "react";
import styled from "styled-components";
import { TrackImage } from "../trackImage/trackImage";
import { TextContainer } from "../text/textContainer";
import { ItemTitle, GreyH6 } from "../text/text";
import PlayButton from "../playButton/playButton";
import { LikeButton } from "../button/likeButton";

const TrackItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const TrackItem = ({ track }) => {
  return (
    <TrackItemDiv>
      <TrackImage small img={track.track_image}>
        <PlayButton small={true} track={track} />
        <LikeButton />
      </TrackImage>
      <TextContainer>
        <ItemTitle>{track.title}</ItemTitle>
        <GreyH6>{track.username}</GreyH6>
      </TextContainer>
    </TrackItemDiv>
  );
};
