import React from "react";
import styled, { css } from "styled-components";
import playbutton from "../../images/playbutton.png";
import pausebutton from "../../images/pausebutton.png";
import { connect } from "react-redux";
import { playTrack, pauseTrack } from "../../redux/actions/playbarAction";

const mapStateToProps = (state, ownProps) => {
  console.log(state.playbar, "what??");
  return {
    playbar: state.playbar,
    track: ownProps.track,
  };
};

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
});

const PlayButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  background-size: cover;
  cursor: pointer;
  background-image: ${(props) =>
    props.play ? `url(${pausebutton})` : `url(${playbutton})`};
  ${(props) =>
    props.small &&
    css`
      margin: 0;
      position: absolute;
      top: 38%;
      left: 33.3%;
    `}
`;

const PlayButton = ({ small, track, playbar, playTrack, pauseTrack }) => {
  const isCurrentTrack =
    playbar.isPlaying && playbar.currentTrack.track_id === track.track_id;

  return (
    <PlayButtonWrapper
      onClick={isCurrentTrack ? () => pauseTrack() : () => playTrack(track)}
      play={isCurrentTrack}
      small={small}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
