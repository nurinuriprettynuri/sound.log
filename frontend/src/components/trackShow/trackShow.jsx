import React from "react";
import {
  PageWrapper,
  CenterWrapper,
  TopWrapper,
  ButtomWrapper,
  ColSection,
  VerticalLine,
  BottomBorderDiv,
} from "../wrapper/wrapper";
import show_bg from "../../images/show_background.jpg";
import { TrackImage } from "../trackImage/trackImage";
import styled, { css } from "styled-components";
import { TitleSpan } from "../text/text";
import { TextContainer } from "../text/textContainer";
import PlayButton from "../button/playButton";
import { Comment } from "../comment/comment";
import { CommentForm } from "../comment/commentForm";
import { MiniProfile } from "../miniprofile/miniprofile";
import { ColumnSection } from "../columnSection/columnSection";

const mocks = [
  { username: "nuri joen", content: "it was really awesome!" },
  { username: "lamlam lam", content: "i don't like bingrae" },
  { username: "justin rae g", content: "bing is my life cute rae" },
];

const mapped = mocks.map(({ username, content }) => (
  <Comment username={username} content={content} />
));

const TopLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 330px;
  justify-content: space-between;
`;

const BottomLeftSection = styled(ColSection)`
  width: 60%;
  min-width: 400px;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const BottomRightSection = styled(ColSection)`
  box-sizing: border-box;
`;

const BottomRowSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CommentSection = styled(ColSection)`
  margin-left: 40px;
`;

const RelatedTrackSection = styled(ColSection)``;

export const TrackShow = ({ fetchTrack, track, trackId, playbar }) => {
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchTrack(trackId).then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <PageWrapper>
      <CenterWrapper>
        <TopWrapper show img={show_bg}>
          <TopLeftDiv>
            <PlayButton track={track} />
            <TextContainer>
              <TitleSpan>{track.username}</TitleSpan>
              <TitleSpan big>{track.title}</TitleSpan>
            </TextContainer>
          </TopLeftDiv>
          <TrackImage img={track.track_image} />
        </TopWrapper>
        <ButtomWrapper>
          <BottomLeftSection>
            <CommentForm />
            <BottomRowSection left={true}>
              <MiniProfile artist={track} />
              <CommentSection>
                <BottomBorderDiv>Comments</BottomBorderDiv>
                {mapped}
              </CommentSection>
            </BottomRowSection>
          </BottomLeftSection>
          <VerticalLine />
          <BottomRightSection>
            <ColumnSection title={"Related tracks"}>{mapped}</ColumnSection>
          </BottomRightSection>
        </ButtomWrapper>
      </CenterWrapper>
    </PageWrapper>
  );
};
