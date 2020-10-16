import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { CenterWrapper } from "../designSystem/wrapper";
import { LibraryNavBar } from "./libaryNavBar";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";
import { TrackIndexRow } from "../trackIndexRow/trackIndexRow";
import { fetchLikesByUserId } from "../../redux/actions/likeAction";
import { RowWrapper } from "../designSystem/wrapper";
import { RowTrackWrapper } from "../designSystem/trackStyledComponents";
import { TrackItem } from "../trackItem/trackItem";
import { GrayH4 } from "../designSystem/textStyledComponents";

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

  const recc = Object.keys(tracks)
    .slice(0, 5)
    .reduce((result, trackId) => {
      result.push(tracks[trackId]);
      return result;
    }, []);

  const currentTracks = path === "/library/likes" ? likedTracks : myTracks;
  const mapped = currentTracks.map((track) => (
    <TrackItem key={track} track={tracks[track]} />
  ));
  const currentSubTitle =
    path === "/library/likes" ? "Tracks you've liked" : "Tracks you've created";

  return (
    <CenterWrapper>
      <LibraryNavBar path={path} />
      {!currentTracks.length && path === "/library/likes" ? (
        <React.Fragment>
          <TrackIndexRow
            title={"Haven't found your favorite song?"}
            subTitle={"Let's explore!"}
            tracks={recc}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RowWrapper>
            <GrayH4>{currentSubTitle}</GrayH4>
            <RowTrackWrapper>{mapped}</RowTrackWrapper>
          </RowWrapper>
        </React.Fragment>
      )}
    </CenterWrapper>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Library)
);
