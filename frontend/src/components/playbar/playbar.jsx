import React from "react";
import { NavBar } from "../designSystem/navbar";
import ReactAudioPlayer from "react-audio-player";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { MiddleNavWrapper } from "../designSystem/navbar";
import { BasicPlayButton } from "../playButton/playButton";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { styled as materialStyled } from "@material-ui/core/styles";
import { playTrack, pauseTrack } from "../../redux/actions/playbarAction";
import { connect } from "react-redux";

const mapStateToProps = ({ playbar }) => ({
  playbar,
});

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
});

const PlaybarButtonWrapper = materialStyled(Button)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  minWidth: "40px",
  fontSize: "14px",
  margin: 0,
  cursor: "pointer",
  lineHeight: 0,
});

const ProgressBar = styled.div`
  color: #fff;
  width: 500px;
  height: 8px;
  z-index: 3;
  margin: 0 10px;
`;

const Progress = styled.span`
  background-color: #444444;
  height: 8px;
  display: inline-block;
  z-index: 2;
`;

export const PlayBar = ({ playbar, playTrack }) => {
  const { isPlaying, currentTrack, currentTime } = playbar;
  const ref = React.useRef();

  React.useEffect(() => {
    console.log(ref.current);
  });

  if (isPlaying && ref.current) {
    ref.current.audioEl.current.play();
  }

  return (
    <NavBar>
      <MiddleNavWrapper>
        <PlaybarButtonWrapper>
          <SkipPreviousIcon />
        </PlaybarButtonWrapper>
        <PlaybarButtonWrapper>
          <BasicPlayButton track={playbar.currentTrack} />
        </PlaybarButtonWrapper>
        <PlaybarButtonWrapper>
          <SkipNextIcon />
        </PlaybarButtonWrapper>
        <ReactAudioPlayer
          controls
          className={"audio-player"}
          ref={ref}
          src={playbar.currentTrack.audioUrl}
        />
        <ProgressBar>
          <Progress />
        </ProgressBar>
        {playbar.currentTrack.title}
      </MiddleNavWrapper>
    </NavBar>
  );
};

export default connect(mapStateToProps)(PlayBar);
