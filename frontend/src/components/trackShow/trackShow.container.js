import { connect } from "react-redux";
import { TrackShow } from "./trackShow";
import { fetchTrack } from "../../redux/actions/trackAction";
import { fetchComments } from "../../redux/actions/commentAction";

const mapStateToProps = (
  { tracks, currentUser: { userId }, comments },
  {
    match: {
      params: { trackId },
    },
  }
) => {
  return {
    track: tracks[trackId],
    userId,
    trackId,
    comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
  fetchComments: (trackId) => dispatch(fetchComments(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
