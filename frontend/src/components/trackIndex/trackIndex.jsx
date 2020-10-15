import React, { useState, useEffect } from "react";

import { CenterWrapper } from "../designSystem/wrapper";
import { TrackIndexRow } from "../trackIndexRow/trackIndexRow";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";
import {
  fetchLikesByUserId,
  fetchMostLiked,
} from "../../redux/actions/likeAction";

const mapStateToProps = ({ tracks, currentUser: { userId } }) => ({
  tracks,
  userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
  fetchLikesByUserId: (userId) => dispatch(fetchLikesByUserId(userId)),
  fetchMostLiked: () => dispatch(fetchMostLiked()),
});

export const TrackIndex = ({
  tracks,
  fetchAllTracks,
  userId,
  fetchMostLiked,
  fetchLikesByUserId,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTracks()
      .then(() => fetchLikesByUserId(userId))
      .then(() => fetchMostLiked())
      .then(() => setLoading((pre) => !pre));
  }, []);

  if (isLoading) {
    return null;
  }

  const trendyTracks = Object.keys(tracks)
    .filter((e, idx) => tracks[e].trendy && idx < 10)
    .reduce((result, curr) => {
      result.push(tracks[curr]);
      return result;
    }, []);

  const newRelease = Object.keys(tracks)
    .slice(0, 11)
    .reduce((result, curr) => {
      result.push(tracks[curr]);
      return result;
    }, []);

  return (
    <CenterWrapper>
      <TrackIndexRow
        tracks={newRelease}
        title={"New Release"}
        subTitle={"Check out newest tracks on Sound.log!"}
      />
      <TrackIndexRow
        tracks={trendyTracks}
        title={"Sound.log: Trending"}
        subTitle={"Up-and-coming tracks on Sound.log"}
      />
    </CenterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
