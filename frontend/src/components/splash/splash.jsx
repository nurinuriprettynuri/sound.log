import React from "react";
import {
  CenterWrapper,
  TopWrapper,
  MiddleWrapper,
  ButtomWrapper,
  ButtonWrapper,
  PageWrapper,
} from "../wrapper/wrapper";
import { SectionTitle } from "../text/text";
import { TrackItem } from "../trackItem/trackItem";
import SignInButton from "../authModalButton/authModalButton";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";
import styled from "styled-components";
import { mainLogo } from "../designSystem/logo";
import main from "../../images/sp.gif";

const mapStateToProps = ({ tracks }) => ({
  tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

export const SplashButtonwrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: inherit;
  padding: 30px 25px;
  box-sizing: border-box;
`;

const SplashWrapper = styled(CenterWrapper)`
  padding-top: 0;
`;

const SplashImage = styled(TopWrapper)`
  background-color: #dabfde;
  justify-content: center;
  align-items: center;
`;

const TempDiv = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const Wrapper = styled(PageWrapper)`
  position: fixed;
  top: 0;
  padding-top: 0;
`;

const Splash = ({ fetchAllTracks, tracks }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  const mapped = Object.keys(tracks).map((trackId) => (
    <TrackItem track={tracks[trackId]} />
  ));

  return (
    <Wrapper>
      <SplashWrapper>
        <SplashImage>
          <SplashButtonwrapper>{mainLogo}</SplashButtonwrapper>
          <TempDiv src={main} />
          <SplashButtonwrapper>
            <ButtonWrapper>
              <SignInButton text={"Sign in"} />
              <SignInButton text={"Create account"} />
            </ButtonWrapper>
          </SplashButtonwrapper>
        </SplashImage>
        <MiddleWrapper>
          <SectionTitle>
            Hear what’s trending in the Sound.Log community
          </SectionTitle>
        </MiddleWrapper>
        <ButtomWrapper>{mapped}</ButtomWrapper>
      </SplashWrapper>
    </Wrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
