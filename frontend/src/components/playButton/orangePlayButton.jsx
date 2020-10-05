import React from "react";
import styled, { css } from "styled-components";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    color: "#ec9706",
    fontSize: "60px",
  },
});

const PlayButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.small &&
    css`
      z-index: 10;
      margin: 0;
      position: absolute;
      top: 32%;
      left: 33.3%;
    `}
`;

export const OrangePlayButtonIcon = ({
  small,
  track,
  playbar,
  playTrack,
  pauseTrack,
}) => {
  const classes = useStyles();

  const isCurrentTrack =
    playbar.isPlaying && playbar.currentTrack.trackId === track.trackId;

  const currentButton = isCurrentTrack ? (
    <PauseCircleFilledIcon className={classes.root} />
  ) : (
    <PlayCircleFilledIcon className={classes.root} />
  );

  return (
    <PlayButtonWrapper
      onClick={isCurrentTrack ? () => pauseTrack() : () => playTrack(track)}
      small={small}
    >
      {currentButton}
    </PlayButtonWrapper>
  );
};
