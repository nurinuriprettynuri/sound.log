import React, { useEffect, useState } from "react";
import {
  CenterWrapper,
  ButtomWrapper,
  ColSection,
  VerticalLine,
  BottomBorderDiv,
} from "../wrapper/wrapper";
import show_bg from "../../images/show_background.jpg";
import { TrackImage } from "../trackImage/trackImage";
import styled from "styled-components";
import { TitleSpan } from "../text/text";
import { TextContainer } from "../text/textContainer";
import { OrangePlayButton } from "../playButton/playButton";
import { Comment } from "../comment/comment";
import CommentForm from "../comment/comment.container";
import { MiniProfile } from "../miniprofile/miniprofile";
import { ColumnSection } from "../columnSection/columnSection";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

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

const TrackShowTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 350px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-content: space-between;
  background-image: url(${(props) => props.img});
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 2.5%;
  bottom: 3%;
`;

const RelatedTrackSection = styled(ColSection)``;

export const TrackShow = ({
  fetchTrack,
  track,
  userId,
  trackId,
  fetchComments,
  comments,
}) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchTrack(trackId)
      .then(() => fetchComments(trackId))
      .then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  const mapped = Object.keys(comments).map((key) => (
    <Comment username={comments[key].userId} content={comments[key].body} />
  ));

  return (
    <CenterWrapper>
      <TrackShowTopWrapper img={show_bg}>
        <TopLeftDiv>
          <OrangePlayButton track={track} />
          <TextContainer>
            <TitleSpan>{track.username}</TitleSpan>
            <TitleSpan big>{track.title}</TitleSpan>
            {track.artistId === userId && (
              <Link to={`/tracks/${track.trackId}/edit`}>
                <IconWrapper>
                  <EditIcon />
                </IconWrapper>
              </Link>
            )}
          </TextContainer>
        </TopLeftDiv>
        <TrackImage img={track.imageUrl} />
      </TrackShowTopWrapper>
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
  );
};
