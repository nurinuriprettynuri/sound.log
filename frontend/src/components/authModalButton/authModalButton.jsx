import React from "react";
import { CustomButton } from "../designSystem/buttonStyledComponents";
import { openModal } from "../../redux/actions/modalAction";
import { connect } from "react-redux";

const mapStateToProps = ({ currentUser }, { text }) => {
  return {
    currentUser,
    text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (payload) => dispatch(openModal(payload)),
  };
};

export const AuthModalButton = ({ openModal, text, currentUser }) => {
  if (currentUser.userId) return null;
  let whichAuth = text === "Sign in" ? "signin" : "register";
  let isOrange = text !== "Sign in";
  let wide = text !== "Sign in";
  return (
    <CustomButton
      text={text}
      orange={isOrange}
      wide={wide}
      handleClick={() => openModal({ type: "auth", data: whichAuth })}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModalButton);
