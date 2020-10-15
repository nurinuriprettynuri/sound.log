import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import { TrackItemButtonDiv } from "../designSystem/trackStyledComponents";

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
  const useStyles = makeStyles({
    icon: {
      color: liked ? "red" : "#fff",
      opacity: "0.5",
      "&:hover": { color: "#ec9076", opacity: "0.8" },
    },
  });

  const classes = useStyles(liked);

  if (!userId) return null;
  const action = liked ? unlikeTrack : likeTrack;
  return (
    <LikeButtonDiv>
      <FavoriteIcon
        liked={liked}
        className={classes.icon}
        onClick={() => action(userId, trackId)}
      />
    </LikeButtonDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
