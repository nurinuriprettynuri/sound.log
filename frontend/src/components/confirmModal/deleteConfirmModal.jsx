import React from "react";
import styled from "styled-components";
import { ConfirmForm } from "../confirmForm/confirmForm";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/modalAction";
import { deleteTrack } from "../../redux/actions/trackAction";

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
    closeModal: () => dispatch(closeModal({ type: "confirm" })),
  };
};

const mapStateToProps = ({ modal: { confirm } }) => {
  return {
    confirmModal: confirm,
  };
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: hsla(0, 0%, 94.9%, 0.9);
  z-index: 30;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: animateTop 0.4s;
`;

export const Modal = ({ confirmModal, deleteTrack, closeModal }) => {
  if (!confirmModal) return null;

  return (
    <ModalBackground>
      <ModalWrapper>
        <ConfirmForm
          confirmMessage={"Delete this track?"}
          deleteTrack={() =>
            deleteTrack(confirmModal).then(() =>
              closeModal({ type: "confirm" })
            )
          }
          closeModal={closeModal}
        />
      </ModalWrapper>
    </ModalBackground>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
