import React from "react";
import {
  CenterTopBarWrapper,
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
import main_img from "../../images/sc_main.png";
import styled from "styled-components";

const mapStateToProps = (state) => ({
  tracks: state.tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const SplashWrapper = styled(CenterWrapper)`
  padding-top: 0;
`;

const Wrapper = styled(PageWrapper)`
  ${"" /* position: fixed; */}
  ${"" /* top: 0; */}
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
        <TopWrapper img={main_img}>
          <CenterTopBarWrapper>
            <ButtonWrapper>LOGO</ButtonWrapper>
            <ButtonWrapper>
              <SignInButton text={"Sign in"} />
            </ButtonWrapper>
            <ButtonWrapper>
              <SignInButton text={"Create account"} />
            </ButtonWrapper>
          </CenterTopBarWrapper>
        </TopWrapper>
        <MiddleWrapper>
          <SectionTitle>
            Hear what’s trending for free in the Sound.Log community
          </SectionTitle>
        </MiddleWrapper>
        <ButtomWrapper>{mapped}</ButtomWrapper>
      </SplashWrapper>
    </Wrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
