import React from "react";
import styled from "styled-components";
import { RowWrapper, TrackShowRowkWrapper } from "../wrapper/wrapper";
import { TrackItem } from "../trackItem/trackItem";
import { SectionTitle, ItemTitle } from "../text/text";
import { TextContainer } from "../text/textContainer";

export const Line = styled.hr`
  border: 0;
  color: #f00;
  background-color: #f2f2f2;
  height: 2px;
  width: 100%;
  margin: 30px 0 30px;
`;

export const TrackIndexRow = ({ tracks, title, subTitle }) => {
  const mapped = Object.keys(tracks).map((trackId) => (
    <TrackItem key={trackId} track={tracks[trackId]} />
  ));
  return (
    <RowWrapper>
      <TextContainer>
        <SectionTitle>{title}</SectionTitle>
        <ItemTitle big>{subTitle}</ItemTitle>
      </TextContainer>
      <TrackShowRowkWrapper>{mapped}</TrackShowRowkWrapper>
      <Line />
    </RowWrapper>
  );
};
