import React from "react";
import { NavBar } from "../nav/navbar";
import ReactAudioPlayer from "react-audio-player";

export const PlayBar = () => {
  return (
    <NavBar>
      <ReactAudioPlayer className={"audio-player"} />
    </NavBar>
  );
};
