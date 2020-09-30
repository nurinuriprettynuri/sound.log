import React from "react";

import { CenterWrapper, TrackShowRowkWrapper } from "../wrapper/wrapper";
import { LibraryNavBar } from "./libaryNavBar";
import { TrackItem } from "../trackItem/trackItem";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = ({ tracks, user }, ownProps) => {
  console.log(ownProps);
  return {
    tracks,
    currentUser: user,
    currentPath: ownProps.location.pathname,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const Library = ({ tracks, fetchAllTracks, currentUser, currentPath }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading((pre) => !pre));
  }, []);

  if (isLoading) {
    return null;
  }

  const likedTracks = Object.keys(tracks).filter(
    (trackId) => tracks[trackId].likedByUser === currentUser.userId
  );

  const myTracks = Object.keys(tracks).filter(
    (trackId) => tracks[trackId].artistId === currentUser.userId
  );

  const currentTracks =
    currentPath === "/library/likes" ? likedTracks : myTracks;

  const mapped = currentTracks.map((trackId) => (
    <TrackItem track={tracks[trackId]} />
  ));

  return (
    <CenterWrapper>
      <LibraryNavBar currentPath={currentPath} />
      <TrackShowRowkWrapper>{mapped}</TrackShowRowkWrapper>
    </CenterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
