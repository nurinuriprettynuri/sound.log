import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Splash from "./components/splash/splash";
import Modal from "./components/authModal/authModal";
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
      <TopNavBar />
      <PageWrapper>
        <Modal />
        <Switch>
          <AuthRoute exact path="/" component={Splash} />
          <ProtectedRoute exact path="/upload" component={TrackUploadForm} />
          <Route path="/library" component={Library} />
          <Route exact path="/tracks" component={TrackIndex} />
          <Route exact path="/tracks/:trackId" component={TrackShow} />
          <Redirect from="/:sth" to="/" />
        </Switch>
      </PageWrapper>
      <PlayBar />
    </div>
  );
}

export default App;
