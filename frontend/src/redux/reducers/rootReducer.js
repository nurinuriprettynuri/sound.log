import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { trackReducer } from "./trackReducer";
import { genreReducer } from "./genreReducer";
import { modalReducer } from "./modalReducer";
import { playbarReducer } from "./playbarReducer";

export const rootReducer = combineReducers({
  user: authReducer,
  modal: modalReducer,
  tracks: trackReducer,
  genres: genreReducer,
  playbar: playbarReducer,
});
