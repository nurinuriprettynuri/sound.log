import React from "react";

import { Switch, Redirect } from "react-router-dom";
import Splash from "./components/splash/splash";
import Modal from "./components/authModal/authModal";
import ConfirmModal from "./components/confirmModal/deleteConfirmModal";
import Library from "./components/library/library";
import TrackUploadForm from "./components/trackForm/trackUploadForm.container";
import TrackIndex from "./components/trackIndex/trackIndex";
import TrackShow from "./components/trackShow/trackShow.container";
import PlayBar from "./components/playbar/playbar";
import { ProtectedRoute, AuthRoute } from "./util/routeUtil";
import { PageWrapper } from "./components/wrapper/wrapper";
import TopNavBar from "./components/topNavBar/topNavBar";

function App() {
  return (
    <div className="App">
      <Modal />
      <ConfirmModal />
      <Switch>
        <PageWrapper>
          <ProtectedRoute path="/" component={TopNavBar} />
          <AuthRoute exact path="/" component={Splash} />
          <ProtectedRoute exact path="/upload" component={TrackUploadForm} />
          <ProtectedRoute path="/library" component={Library} />
          <ProtectedRoute exact path="/tracks" component={TrackIndex} />
          <ProtectedRoute exact path="/tracks/:trackId" component={TrackShow} />
          <Redirect from="/:sth" to="/" />
          <PlayBar />
        </PageWrapper>
      </Switch>
    </div>
  );
}

export default App;
