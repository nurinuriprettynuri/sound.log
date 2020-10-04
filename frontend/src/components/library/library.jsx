import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { CenterWrapper, RowkWrapper } from "../wrapper/wrapper";
import { LibraryNavBar } from "./libaryNavBar";
import { TrackItem } from "../trackItem/trackItem";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";

import { fetchLikesByUserId } from "../../redux/actions/likeAction";

const mapStateToProps = ({ tracks, currentUser }, ownProps) => {
  return {
    tracks,
    currentUser,
    path: ownProps.location.pathname,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
  fetchLikesByUserId: (userId) => dispatch(fetchLikesByUserId(userId)),
});

const Library = ({
  tracks,
  fetchAllTracks,
  fetchLikesByUserId,
  currentUser,
  path,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTracks()
      .then(() => fetchLikesByUserId(currentUser.userId))
      .then(() => setLoading((pre) => !pre));
  }, []);

  if (isLoading) {
    return null;
  }

  const likedTracks = Object.keys(tracks).filter(
    (trackId) => tracks[trackId].liked
  );

  const myTracks = Object.keys(tracks).filter(
    (trackId) => tracks[trackId].artistId === currentUser.userId
  );

  const currentTracks = path === "/library/likes" ? likedTracks : myTracks;

  const mapped = currentTracks.map((trackId) => (
    <TrackItem track={tracks[trackId]} />
  ));

  return (
    <CenterWrapper>
      <LibraryNavBar path={path} />
      {!currentTracks.length && (
        <React.Fragment>
          <RowkWrapper />
        </React.Fragment>
      )}
      <RowkWrapper>{mapped}</RowkWrapper>
    </CenterWrapper>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Library)
);
