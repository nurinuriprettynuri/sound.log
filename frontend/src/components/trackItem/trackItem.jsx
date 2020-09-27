import React from "react";
import styled from "styled-components";
import { TrackImage } from "../trackImage/trackImage";
import { TextContainer } from "../text/textContainer";
import { ItemTitle, GreyH6 } from "../text/text";
import PlayButton from "../button/playButton";
import { LikeButton } from "../button/likeButton";

const TrackItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover ${PlayButton} {
    display: block;
  }
`;

export const TrackItem = ({ img, title, artist }) => {
  return (
    <TrackItemDiv>
      <TrackImage small img={img}>
        <PlayButton small={true} />
        <LikeButton />
      </TrackImage>
      <TextContainer>
        <ItemTitle>{title}</ItemTitle>
        <GreyH6>{artist}</GreyH6>
      </TextContainer>
    </TrackItemDiv>
  );
};
