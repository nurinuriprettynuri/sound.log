import React from "react";

import { Route, Switch } from "react-router-dom";
import { Splash } from "./components/pages/splash";
import Modal from "./components/authModal/authModal";
import { TrackUploadPage } from "./components/pages/trackUpload";
import { TrackIndex } from "./components/pages/trackIndex";
import TrackShow from "./components/trackShow/trackShow.container";
import { PlayBar } from "./components/playbar/playbar";

function App() {
  return (
    <div className="App">
      <Modal />
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/upload" component={TrackUploadPage} />
        <Route exact path="/tracks" component={TrackIndex} />
        <Route exact path="/tracks/:trackId" component={TrackShow} />
      </Switch>
      <PlayBar />
    </div>
  );
}

export default App;
