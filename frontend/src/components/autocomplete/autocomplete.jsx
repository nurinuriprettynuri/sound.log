import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styled from "styled-components";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ tracks }, { big, history }) => ({
  tracks,
  big,
  history,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    fontSize: "14px",
    borderRadius: "3px",
    marginBottom: 0,
    // padding: "0 10px",
    boxSizing: "border-box",
  },
}));

const AutocompleteWrapper = styled.div`
  padding: 0 10px;

  width: 100%;
`;
const AutoCompleteInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  min-width: 200px;
  padding: 0 10px;
  height: ${(props) => (props.big ? `45px` : "28px")};
`;

const AutoCompleteOptionDiv = styled.div`
  width: 100%;
`;

export const AutoComplete = function CustomInputAutocomplete({
  big,
  tracks,
  history,
}) {
  const classes = useStyles();
  const options = Object.keys(tracks).map((trackId) => tracks[trackId]);
  return (
    <AutocompleteWrapper>
      <Autocomplete
        classes={classes}
        id="custom-input-demo"
        onChange={(event, value) => history.push(`/tracks/${value.trackId}`)}
        // onChange={(event, value) => console.log(value)}
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <AutoCompleteOptionDiv ref={params.InputProps.ref}>
            <AutoCompleteInput {...params.inputProps} />
          </AutoCompleteOptionDiv>
        )}
      />
    </AutocompleteWrapper>
  );
};

export default withRouter(connect(mapStateToProps)(AutoComplete));
