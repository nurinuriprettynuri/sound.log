import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllGenres } from "../../redux/actions/genreAction";
import { createTrack } from "../../redux/actions/trackAction";
import { TrackUploadForm } from "./trackForm";

const mapStateToProps = (state, ownProps) => {
  return {
    genres: state.genres,
    artist_id: state.currentUser.userId,
    history: ownProps.history,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllGenres: () => dispatch(fetchAllGenres()),
  createTrack: (track) => dispatch(createTrack(track)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrackUploadForm)
);
