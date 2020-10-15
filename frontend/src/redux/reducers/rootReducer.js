import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { trackReducer } from "./trackReducer";
import { genreReducer } from "./genreReducer";
import { modalReducer } from "./modalReducer";
import { playbarReducer } from "./playbarReducer";
import { likeReducer } from "./likeReducer";
import { commentReducer } from "./commentReducer";
import { artistReducer } from "./artistReducer";

export const rootReducer = combineReducers({
  currentUser: authReducer,
  modal: modalReducer,
  tracks: trackReducer,
  genres: genreReducer,
  playbar: playbarReducer,
  liked: likeReducer,
  comments: commentReducer,
  artists: artistReducer,
});
