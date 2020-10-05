import React, { useEffect, useRef, useState } from "react";
import { NavBar } from "../designSystem/navbar";
import ReactAudioPlayer from "react-audio-player";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { MiddleNavWrapper } from "../designSystem/navbar";
import { BasicPlayButton } from "../playButton/playButton";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { styled as materialStyled } from "@material-ui/core/styles";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import { connect } from "react-redux";

const mapStateToProps = ({ playbar }) => ({
  playbar,
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
  background-color: #fff;
  width: 480px;
  height: 8px;
  margin: 0 20px;
  position: relative;
`;

const Progress = styled.span`
  background-color: #dabfde;
  height: 8px;
  display: inline-block;
  width: ${(props) => props.currentWidth};
  position: absolute;
  left: 0;
`;

export const PlayBar = ({ playbar }) => {
  const { isPlaying, currentTrack } = playbar;
  const ref = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [playingStatus, setStatus] = useState(false);
  const [volume, setVolume] = useState(1);

  let tick;
  useEffect(() => {
    if (isPlaying && ref.current) {
      ref.current.audioEl.current.play();
      setStatus(true);
      setCurrentTime(ref.current.audioEl.current.currentTime);
    }
    if (!isPlaying && ref.current) {
      ref.current.audioEl.current.pause();
      setStatus(false);
    }
  }, [playbar]);

  useEffect(() => {
    if (playingStatus) {
      tick = setTimeout(() => {
        setCurrentTime((pre) => pre + 0.5);
      }, 500);
    }
  }, [playingStatus, currentTime]);

  return (
    <NavBar>
      <MiddleNavWrapper>
        <PlaybarButtonWrapper>
          <SkipPreviousIcon />
        </PlaybarButtonWrapper>
        <PlaybarButtonWrapper>
          <BasicPlayButton track={currentTrack} />
        </PlaybarButtonWrapper>
        <PlaybarButtonWrapper>
          <SkipNextIcon />
        </PlaybarButtonWrapper>
        <ReactAudioPlayer ref={ref} src={currentTrack.audioUrl} />
        <ProgressBar>
          <Progress
            currentWidth={
              ref.current &&
              `${Math.round(
                (currentTime / ref.current.audioEl.current.duration) * 100,
                10
              )}%`
            }
          />
        </ProgressBar>
        {playbar.currentTrack.title}
        <PlaybarButtonWrapper>
          <VolumeDownIcon />
        </PlaybarButtonWrapper>
      </MiddleNavWrapper>
    </NavBar>
  );
};

export default connect(mapStateToProps)(PlayBar);
