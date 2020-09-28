import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styled from "styled-components";

const options = ["Option 1", "Option 2"];
const AutocompleteWrapper = styled.div`
  padding: 0 10px;
  width: 100%;
`;
const AutoCompleteInput = styled.input`
  width: 100%;
  min-width: 200px;
  height: ${(props) => (props.big ? `45px` : "25px")};
`;

export default function CustomInputAutocomplete({ big }) {
  return (
    <AutocompleteWrapper>
      <Autocomplete
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <AutoCompleteInput {...params.inputProps} />
          </div>
        )}
      />
    </AutocompleteWrapper>
  );
}
