import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TrackItemButtonDiv } from "../designSystem/button";
import { likeTrack } from "../../redux/actions/trackAction";
import { connect } from "react-redux";

const mapStateToProps = ({ currentUser: { userId } }, { liked, trackId }) => ({
  userId,
  liked,
  trackId,
});

const mapDispatchToProps = (dispatch) => ({
  likeTrack: (payload) => dispatch(likeTrack(payload)),
});

const LikeButtonDiv = styled(TrackItemButtonDiv)`
  right: 0;
  bottom: 0;
`;

const LikeButton = ({ liked, likeTrack, trackId, userId }) => {
  return (
    <LikeButtonDiv>
      <FavoriteIcon
        style={{ color: liked ? "red" : "black" }}
        onClick={() => likeTrack({ userId, trackId })}
      />
    </LikeButtonDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
