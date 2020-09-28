import React from "react";
import { CenterWrapper, PageWrapper } from "../wrapper/wrapper";
import { PlayBar } from "../playbar/playbar";
import TrackUploadForm from "../trackForm/trackForm";

export const TrackUploadPage = () => {
  return (
    <PageWrapper>
      <CenterWrapper>
        <TrackUploadForm />
        <PlayBar />
      </CenterWrapper>
    </PageWrapper>
  );
};
