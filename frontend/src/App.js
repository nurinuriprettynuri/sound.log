import React from "react";

import { Switch } from "react-router-dom";
import Splash from "./components/splash/splash";
import AuthModal from "./components/authModal/authModal";
import ConfirmModal from "./components/confirmModal/deleteConfirmModal";
import LoadingModal from "./components/loadingModal/loadingModal";
import Library from "./components/library/library";
import TrackUploadForm from "./components/trackForm/trackUploadForm.container";
import TrackEditForm from "./components/trackForm/trackEditForm.container";
import TrackIndex from "./components/trackIndex/trackIndex";
import TrackShow from "./components/trackShow/trackShow.container";
import PlayBar from "./components/playbar/playbar";
import { ProtectedRoute, AuthRoute } from "./util/routeUtil";
import { PageWrapper } from "./components/designSystem/wrapper";
import ArtistProfile from "./components/profile/artistProfile.container";
import TopNavBar from "./components/topNavBar/topNavBar";
import UserProfile from "./components/profile/profile.container";
import UserEditForm from "./components/profile/profileEditForm.container";

function App() {
  return (
    <div className="App">
      <AuthModal />
      <ConfirmModal />
      <LoadingModal />
      <Switch>
        <PageWrapper>
          <ProtectedRoute path="/" component={TopNavBar} />
          <AuthRoute exact path="/" component={Splash} />
          <ProtectedRoute exact path="/upload" component={TrackUploadForm} />
          <ProtectedRoute path="/library" component={Library} />
          <ProtectedRoute path="/artist/:artistId" component={ArtistProfile} />

          <ProtectedRoute exact path="/you" component={UserProfile} />
          <ProtectedRoute exact path="/you/edit" component={UserEditForm} />
          <ProtectedRoute exact path="/tracks" component={TrackIndex} />
          <ProtectedRoute exact path="/tracks/:trackId" component={TrackShow} />
          <ProtectedRoute
            exact
            path="/tracks/:trackId/edit"
            component={TrackEditForm}
          />

          <PlayBar />
        </PageWrapper>
      </Switch>
    </div>
  );
}

export default App;
