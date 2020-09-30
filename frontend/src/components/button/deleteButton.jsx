import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteTrack } from "../../redux/actions/trackAction";
import { connect } from "react-redux";
import trackIndex from "../trackIndex/trackIndex";

const mapStateToProps = ({ user: { userId } }, ownProps) => ({
  userId,
  track: ownProps.track,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTrack: (trackId) => dispatch(deleteTrack(trackIndex)),
});

const DeleteButtonDiv = styled.div`
  width: 25px;
  height: 25px;
  right: 0;
  top: 0;
  position: absolute;
`;

const DeleteButton = ({ deleteTrack, track, userId }) => {
  console.log(track.artistId !== userId);
  if (track.artistId !== userId) return null;
  return (
    <DeleteButtonDiv>
      <DeleteIcon
        style={{ color: "#333" }}
        onClick={() => deleteTrack(track.trackId)}
      />
    </DeleteButtonDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
