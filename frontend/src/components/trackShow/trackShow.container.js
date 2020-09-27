import { connect } from "react-redux";
import { TrackShow } from "./trackShow";
import { fetchTrack } from "../../redux/actions/trackAction";
import { play, pause } from "../../redux/actions/playbarAction";

const mapStateToProps = (state, ownProps) => ({
  track: state.tracks[ownProps.match.params.trackId],
  trackId: ownProps.match.params.trackId,
  playbar: state.playbar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
