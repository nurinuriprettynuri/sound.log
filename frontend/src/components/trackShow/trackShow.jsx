import React, { useEffect, useState } from "react";
import {
  CenterWrapper,
  BottomWrapper,
  ColSection,
  VerticalLine,
} from "../designSystem/wrapper";
import show_bg from "../../images/show_background.jpg";
import { TrackImage, EditLink } from "../designSystem/trackStyledComponents";
import styled from "styled-components";
import { TitleSpan, TextContainer } from "../designSystem/textStyledComponents";
import { OrangePlayButton } from "../playButton/playButton.container";
import { Comment } from "../comment/comment";
import CommentForm from "../comment/comment.container";
import { MiniProfile } from "../miniprofile/miniprofile";
import { ColumnSection } from "../columnSection/columnSection";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const TopLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 330px;
  justify-content: space-between;
`;

const BottomLeftSection = styled(ColSection)`
  min-width: 400px;
  width: 65%;
  justify-content: flex-start;
  box-sizing: border-box;
  flex: 1;
  flex-wrap: wrap;
`;

const BottomRightSection = styled(ColSection)`
  box-sizing: border-box;
  max-width: 500px;
  flex: 0.6;
  flex-wrap: wrap;
`;

const BottomRowSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  background-size: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 2.5%;
  bottom: 3%;
`;

export const TrackShow = ({
  fetchTrack,
  track,
  userId,
  trackId,
  fetchComments,
  comments,
}) => {
  const [isLoading, setLoading] = useState(true);
  const useStyles = makeStyles({
    icon: {
      color: "#fff",
      opacity: "0.5",
      "&:hover": { color: "#dc4e76", opacity: "0.6" },
    },
  });
  const classes = useStyles();
  useEffect(() => {
    fetchTrack(trackId)
      .then(() => fetchComments(trackId))
      .then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  const mapped = Object.keys(comments).map((key) => (
    <Comment
      key={key}
      username={comments[key].username}
      avatar={comments[key].avatar}
      content={comments[key].body}
    />
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
              <EditLink to={`/tracks/${track.trackId}/edit`}>
                <Tooltip title="Edit track">
                  <IconWrapper>
                    <EditIcon className={classes.icon} />
                  </IconWrapper>
                </Tooltip>
              </EditLink>
            )}
          </TextContainer>
        </TopLeftDiv>
        <TrackImage img={track.imageUrl} />
      </TrackShowTopWrapper>
      <BottomWrapper>
        <BottomLeftSection>
          <CommentForm />
          <BottomRowSection left={true}>
            <MiniProfile artist={track} />
            <ColumnSection title={"Comments"}>{mapped}</ColumnSection>
          </BottomRowSection>
        </BottomLeftSection>
        <VerticalLine />
        <BottomRightSection>
          <ColumnSection title={"Related tracks"}>{<></>}</ColumnSection>
        </BottomRightSection>
      </BottomWrapper>
    </CenterWrapper>
  );
};
