import React from "react";
import { RowWrapper, RowTrackWrapper } from "../wrapper/wrapper";
import { TrackItem } from "../trackItem/trackItem";
import sample from "../../images/8.jpeg";
import { SectionTitle, ItemTitle } from "../text/text";
import { TextContainer } from "../text/textContainer";
import styled from "styled-components";

export const Line = styled.hr`
  border: 0;
  color: #f00;
  background-color: #f2f2f2;
  height: 2px;
  width: 98%;
  margin: 0;
`;

export const TrackIndexRow = ({ tracks }) => {
  const mapped = tracks.map((track) => <TrackItem track={track} />);
  return (
    <RowWrapper>
      <TextContainer>
        <SectionTitle>TRACKS</SectionTitle>
        <ItemTitle big>Tracks you can enjoy</ItemTitle>
      </TextContainer>
      <RowTrackWrapper>{mapped}</RowTrackWrapper>
      <Line />
    </RowWrapper>
  );
};
