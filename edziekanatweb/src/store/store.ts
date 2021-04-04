import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import configuration from "../helpers/configFile";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const composeTools = configuration.dev.enableReduxDevToolsExtension
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
