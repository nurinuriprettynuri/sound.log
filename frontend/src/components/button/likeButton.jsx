import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { likeTrack } from "../../redux/actions/trackAction";
import { connect } from "react-redux";

const mapStateToProps = ({ user: { userId } }, ownProps) => ({
  userId,
  liked: ownProps.liked,
  trackId: ownProps.trackId,
});

const mapDispatchToProps = (dispatch) => ({
  likeTrack: (payload) => dispatch(likeTrack(payload)),
});

const LikeButtonDiv = styled.div`
  width: 25px;
  height: 25px;
  right: 0;
  bottom: 0;
  position: absolute;
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
