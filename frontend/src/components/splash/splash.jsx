import React, { useEffect, useState } from "react";
import {
  CenterWrapper,
  TopWrapper,
  ButtonWrapper,
  BottomWrapper,
} from "../designSystem/wrapper";
import { SectionTitle } from "../designSystem/textStyledComponents";
import { TrackItem } from "../trackItem/trackItem";
import SignInButton from "../authModalButton/authModalButton";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";
import { openModal } from "../../redux/actions/modalAction";
import { setCurrentTrack } from "../../redux/actions/playbarAction";
import { RowTrackWrapper } from "../designSystem/trackStyledComponents";
import styled from "styled-components";
import { MainLogo } from "../designSystem/logo";
import main from "../../images/sp.gif";

const mapStateToProps = ({ tracks }) => ({
  tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
  openModal: () => dispatch(openModal({ type: "auth", data: "signin" })),
});

export const SplashButtonwrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: inherit;
  padding: 35px 25px;
  box-sizing: border-box;
`;

const SplashWrapper = styled(CenterWrapper)`
  padding-top: 0;
`;

const SplashImage = styled(TopWrapper)`
  background-color: #dabfde;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TempDiv = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const SplashTitle = styled.p`
  color: #fff;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;

  font-family: "Reenie Beanie", cursive;
  cursor: pointer;
  &:hover {
    color: #dc4e76;
  }
`;

const Splash = ({ fetchAllTracks, tracks, openModal }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTracks()
      .then(() => setCurrentTrack(tracks[Object.keys(tracks)[0]]))
      .then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  const mapped = Object.keys(tracks).map((trackId) => (
    <TrackItem key={trackId} track={tracks[trackId]} />
  ));

  return (
    <SplashWrapper>
      <SplashImage>
        <SplashButtonwrapper>
          <MainLogo big={true} handleClick={openModal} />
        </SplashButtonwrapper>
        <SplashTitle onClick={openModal}>
          Sound.log("So much music, so little time");
        </SplashTitle>
        <TempDiv src={main} />
        <SplashButtonwrapper>
          <ButtonWrapper>
            <SignInButton text={"Sign in"} />
            <SignInButton text={"Create account"} />
          </ButtonWrapper>
        </SplashButtonwrapper>
      </SplashImage>
      <BottomWrapper>
        <SectionTitle>
          Hear what’s trending in the Sound.Log community
        </SectionTitle>
        <RowTrackWrapper>{mapped}</RowTrackWrapper>
      </BottomWrapper>
    </SplashWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
