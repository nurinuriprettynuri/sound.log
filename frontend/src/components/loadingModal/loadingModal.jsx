import React from "react";
import { Spinner } from "./spinner";
import { ModalBackground } from "../designSystem/modalStyledComponents";

import { connect } from "react-redux";

const mapStateToProps = ({ modal: { loading } }) => ({
  loading,
});

export const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <ModalBackground>
      <Spinner />
    </ModalBackground>
  );
};

export default connect(mapStateToProps)(Loading);
