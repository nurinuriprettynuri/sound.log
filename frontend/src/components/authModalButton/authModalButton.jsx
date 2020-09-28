import React from "react";
import { CustomButton } from "../button/customButton";
import { openModal } from "../../redux/actions/modalAction";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    currentUser: state.currentUser,
    text: ownProps.text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};



export const AuthModalButton = ({ openModal, text, currentUser }) => {
  if (currentUser) return null;
  let modal = text === "Sign in" ? "signin" : "register";
  let isOrange = text !== "Sign in";

  return (
    <CustomButton
      text={text}
      orange={isOrange}
      handleClick={() => openModal(modal)}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModalButton);
