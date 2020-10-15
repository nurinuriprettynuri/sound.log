import { UserProfile } from "./profile";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/authAction";

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
