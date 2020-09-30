import React from "react";

import { CenterWrapper } from "../wrapper/wrapper";
import { TrackIndexRow } from "../trackIndexRow/trackIndexRow";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = ({ tracks }) => ({
  tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

export const TrackIndex = ({ tracks, fetchAllTracks }) => {
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading((pre) => !pre));
  }, []);

  if (isLoading) {
    return null;
  }

  const trandyTracks = tracks;
  const newTracks = tracks;

  return (
    <CenterWrapper>
      <TrackIndexRow
        tracks={trandyTracks}
        title={"New Release"}
        subTitle={""}
      />
      <TrackIndexRow
        tracks={newTracks}
        title={"Sound.log: Trending"}
        subTitle={"Up-and-coming tracks on Sound.log"}
      />
    </CenterWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
