import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { TrackItemButtonDiv } from "../designSystem/button";
import { deleteTrack } from "../../redux/actions/trackAction";
import { openModal } from "../../redux/actions/modalAction";
import { connect } from "react-redux";

const mapStateToProps = ({ currentUser: { userId } }, { track }) => ({
  userId,
  track,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (payload) => dispatch(openModal(payload)),
});

const DeleteButtonDiv = styled(TrackItemButtonDiv)`
  right: 0;
  top: 0;
`;

const DeleteButton = ({ track, userId, openModal }) => {
  if (track.artistId !== userId) return null;

  return (
    <DeleteButtonDiv>
      <DeleteIcon
        style={{ color: "#333" }}
        onClick={() => openModal({ type: "confirm", data: track.trackId })}
      />
    </DeleteButtonDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
