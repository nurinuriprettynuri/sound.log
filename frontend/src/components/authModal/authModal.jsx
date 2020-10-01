import React from "react";
import styled from "styled-components";
import AuthModalForm from "../authForm/authForm";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../redux/actions/modalAction";
import { register, signin } from "../../redux/actions/authAction";
import ClearIcon from "@material-ui/icons/Clear";
import { TrackItemButtonDiv } from "../designSystem/button";

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (payload) => dispatch(openModal(payload)),
    closeModal: () => dispatch(closeModal({ type: "auth" })),
    signin: (user) => dispatch(signin(user)),
    registerUser: (user) => dispatch(register(user)),
  };
};

const mapStateToProps = ({ modal: { auth } }) => {
  return {
    authModal: auth,
  };
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: hsla(0, 0%, 94.9%, 0.9);
  z-index: 20;
`;

const ModalClearDiv = styled(TrackItemButtonDiv)`
  top: 0;
  right: 1%;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: animateTop 0.4s;
`;

export const Modal = ({
  authModal,
  closeModal,
  openModal,
  registerUser,
  signin,
}) => {
  if (!authModal) return null;

  return (
    <ModalBackground>
      <ModalClearDiv onClick={closeModal}>
        <ClearIcon fontSize={"large"} />
      </ModalClearDiv>
      <ModalWrapper>
        <AuthModalForm
          whichAuth={authModal}
          handleSwitch={openModal}
          signin={signin}
          registerUser={registerUser}
          closeModal={closeModal}
        />
      </ModalWrapper>
    </ModalBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
