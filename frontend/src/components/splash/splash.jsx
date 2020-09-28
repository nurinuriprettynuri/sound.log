import React from "react";
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
import main_img from "../../images/sc_main.png";

const mapStateToProps = (state) => ({
  tracks: state.tracks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const Splash = ({ fetchAllTracks, tracks }) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllTracks().then(() => setLoading(false));
  }, []);

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
      </CenterWrapper>
    </PageWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
