import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleWares = [thunk, logger];
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleWares));
  let persistor = persistStore(store);
  return { store, persistor };
};
