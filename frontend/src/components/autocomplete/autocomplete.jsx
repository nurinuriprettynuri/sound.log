import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styled from "styled-components";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { fetchAllTracks } from "../../redux/actions/trackAction";

const mapStateToProps = ({ tracks }, { big, history }) => ({
  tracks,
  big,
  history,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTracks: () => dispatch(fetchAllTracks()),
});

const useStyles = makeStyles({
  option: {
    fontSize: 14,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const AutocompleteWrapper = styled.div`
  padding: 0 10px;

  width: 100%;
`;
const AutoCompleteInput = styled.input.attrs({
  type: "text",
})`
  width: 100%;
  box-sizing: border-box;
  place-holder: "show";
  min-width: 200px;
  padding: 0 10px;
  height: ${(props) => (props.big ? `45px` : "28px")};
`;

const AutoCompleteOptionDiv = styled.div`
  width: 100%;

  & input {
    font-size: 14px;
    border: 0;
    border-radius: 3px;
    outline: 0;
  }
`;

export const AutoComplete = function CustomInputAutocomplete({
  big,
  tracks,
  history,
  fetchAllTracks,
}) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllTracks().then(() => setLoading(false));
  }, []);
  if (isLoading) return null;
  const options = Object.keys(tracks).map((trackId) => tracks[trackId]);
  return (
    <AutocompleteWrapper>
      <Autocomplete
        classes={classes}
        id="custom-input-demo"
        onChange={(event, value) => history.push(`/tracks/${value.trackId}`)}
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <AutoCompleteOptionDiv ref={params.InputProps.ref}>
            <AutoCompleteInput
              {...params.inputProps}
              placeholder="Search songs"
            />
          </AutoCompleteOptionDiv>
        )}
      />
    </AutocompleteWrapper>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AutoComplete)
);
