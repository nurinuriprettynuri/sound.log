import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment } from "../../redux/actions/commentAction";
import { CommentForm } from "./commentForm";

const mapStateToProps = (
  { currentUser: { userId, avatar } },
  {
    match: {
      params: { trackId },
    },
  }
) => {
  return {
    userId,
    trackId,
    avatar,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
