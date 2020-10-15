import React from "react";
import styled from "styled-components";
import { RowWrapper } from "../designSystem/wrapper";
import { RowTrackWrapper } from "../designSystem/trackStyledComponents";
import { TrackItem } from "../trackItem/trackItem";
import {
  SectionTitle,
  ItemTitle,
  TextContainer,
} from "../designSystem/textStyledComponents";

export const Line = styled.hr`
  border: 0;
  color: #f00;
  background-color: #f2f2f2;
  height: 2px;
  width: 100%;
  margin: 20px 0 15px;
`;

export const TrackIndexRow = ({ tracks, title, subTitle }) => {
  const mapped = tracks.map((track) => (
    <TrackItem key={track.trackId} track={track} />
  ));

  return (
    <RowWrapper>
      <TextContainer>
        <SectionTitle>{title}</SectionTitle>
        <ItemTitle big>{subTitle}</ItemTitle>
      </TextContainer>
      <RowTrackWrapper>{mapped}</RowTrackWrapper>
      <Line />
    </RowWrapper>
  );
};
