import React from "react";
import styled from "styled-components";
import { TrackImage } from "../trackImage/trackImage";
import { TextContainer } from "../text/textContainer";
import { ItemTitle, GreyH6 } from "../text/text";
import { OrangePlayButton } from "../playButton/playButton";
import LikeButton from "../button/likeButton";
import DeleteButton from "../button/deleteButton";

const TrackItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

export const TrackItem = ({ track }) => {
  return (
    <TrackItemDiv>
      <TrackImage small img={track.imageUrl}>
        <OrangePlayButton small={true} track={track} />
        <DeleteButton track={track}/>
        <LikeButton liked={!!track.likedByUser} trackId={track.trackId} />
      </TrackImage>
      <TextContainer>
        <ItemTitle>{track.title}</ItemTitle>
        <GreyH6>{track.username}</GreyH6>
      </TextContainer>
    </TrackItemDiv>
  );
};
