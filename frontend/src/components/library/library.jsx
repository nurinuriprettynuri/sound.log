import React from "react";

import { CenterWrapper, TrackShowRowkWrapper } from "../wrapper/wrapper";
import { LibraryNavBar } from "./libaryNavBar";
import { TrackItem } from "../trackItem/trackItem";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = ({ tracks, user }) => ({
  tracks,
  currentUser: user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const Library = ({ tracks, fetchAllTracks, currentUser }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading((pre) => !pre));
  }, []);

  if (isLoading) {
    return null;
  }
  const likedTracks = Object.keys(tracks).filter(
    (trackId) =>
      tracks[trackId].likedByUser === "4745af93-761a-4ca0-b015-04c5820f36ca"
  );

  const myTracks = Object.keys(tracks).filter(
    (trackId) =>
      tracks[trackId].artistId === "4745af93-761a-4ca0-b015-04c5820f36ca"
  );
  
  const mapped = likedTracks.map((trackId) => (
    <TrackItem track={tracks[trackId]} />
  ));

  return (
    <CenterWrapper>
      <LibraryNavBar />
      <TrackShowRowkWrapper>{mapped}</TrackShowRowkWrapper>
    </CenterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
