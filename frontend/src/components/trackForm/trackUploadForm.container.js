import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllGenres } from "../../redux/actions/genreAction";
import { createTrack } from "../../redux/actions/trackAction";
import { openModal } from "../../redux/actions/modalAction";
import { TrackUploadForm } from "./trackForm";

const mapStateToProps = ({ genres, currentUser: { userId } }, { history }) => {
  return {
    genres,
    history,
    artist: userId,
    formType: "New",
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllGenres: () => dispatch(fetchAllGenres()),
  handleTrackSubmit: (track) => dispatch(createTrack(track)),
  submitLoading: () => dispatch(openModal({ type: "loading", data: true })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrackUploadForm)
);
