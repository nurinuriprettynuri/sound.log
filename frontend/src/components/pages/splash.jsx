import React from "react";
import main_img from "../../images/sc_main.png";
import sample from "../../images/8.jpeg";

import {
  PageWrapper,
  CenterTopBarWrapper,
  CenterWrapper,
  TopWrapper,
  MiddleWrapper,
  ButtomWrapper,
  ButtonWrapper,
} from "../wrapper/wrapper";
import { SectionTitle } from "../text/text";
import { TrackItem } from "../trackItem/trackItem";
import SignInButton from "../authModalButton/authModalButton";
import { connect } from "react-redux";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = (state) => ({
  tracks: state.tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const tempData = new Array(8).fill(null);
const mock = { img: sample, title: "WAP feat.Megan Thee", artist: "Slowdive" };

const Splash = ({ fetchAllTracks, tracks }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading((prev) => !prev));
  });

  if (isLoading) {
    return null;
  }
  const mapped = tracks.map((e) => <TrackItem track={e} />);

  return (
    <PageWrapper>
      <CenterWrapper>
        <TopWrapper img={main_img}>
          <CenterTopBarWrapper>
            <ButtonWrapper>LOGO</ButtonWrapper>
            <ButtonWrapper>
              <SignInButton text={"Sign in"} />
              <SignInButton text={"Create account"} />
            </ButtonWrapper>
          </CenterTopBarWrapper>
        </TopWrapper>
        <MiddleWrapper>
          <SectionTitle>
            Hear what’s trending for free in the SoundCloud community
          </SectionTitle>
        </MiddleWrapper>
        <ButtomWrapper>{mapped}</ButtomWrapper>
      </CenterWrapper>
    </PageWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
