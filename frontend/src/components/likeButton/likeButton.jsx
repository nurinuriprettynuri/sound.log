import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TrackItemButtonDiv } from "../designSystem/button";

import {
  fetchLikeByUserId,
  deleteLikeByUserId,
} from "../../redux/actions/likeAction";
import { connect } from "react-redux";

const mapStateToProps = ({ currentUser: { userId } }, { trackId, liked }) => ({
  userId,
  trackId,
  liked,
});

const mapDispatchToProps = (dispatch) => ({
  likeTrack: (userId, trackId) => dispatch(fetchLikeByUserId(userId, trackId)),
  unlikeTrack: (userId, trackId) =>
    dispatch(deleteLikeByUserId(userId, trackId)),
});

const LikeButtonDiv = styled(TrackItemButtonDiv)`
  right: 0;
  bottom: 15%;
  z-index: 9;
`;

const LikeButton = ({ likeTrack, trackId, userId, liked, unlikeTrack }) => {
  if (!userId) return null;
  const action = liked ? unlikeTrack : likeTrack;

  return (
    <LikeButtonDiv>
      <FavoriteIcon
        style={{ color: liked ? "red" : "black" }}
        onClick={() => action(userId, trackId)}
      />
    </LikeButtonDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
