import React from "react";
import styled from "styled-components";
import AuthModalForm from "../authForm/authForm";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../redux/actions/modalAction";
import { register, signin } from "../../redux/actions/authAction";
import ClearIcon from "@material-ui/icons/Clear";
import {
  ModalBackground,
  ModalClearDiv,
} from "../designSystem/modalStyledComponents";

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
