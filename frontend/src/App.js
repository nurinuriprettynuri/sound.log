import React from "react";

import { Route, Switch } from "react-router-dom";
import Splash from "./components/splash/splash";
import Modal from "./components/authModal/authModal";
import { TrackUploadPage } from "./components/pages/trackUpload";
import TrackIndex from "./components/trackIndex/trackIndex";
import TrackShow from "./components/trackShow/trackShow.container";
import { PlayBar } from "./components/playbar/playbar";
import { PageWrapper } from "./components/wrapper/wrapper";
import TopNavBar from "./components/topNavBar/topNavBar";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <PageWrapper>
        <Modal />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/upload" component={TrackUploadPage} />
          <Route exact path="/tracks" component={TrackIndex} />
          <Route exact path="/tracks/:trackId" component={TrackShow} />
        </Switch>
      </PageWrapper>
      <PlayBar />
    </div>
  );
}

export default App;
