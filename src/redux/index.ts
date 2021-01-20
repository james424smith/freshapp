import { createStore, applyMiddleware, Store, Reducer } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas/";
import {
  persistStore,
  persistReducer,
  Persistor,
  PersistConfig,
  createMigrate,
  MigrationManifest,
} from "redux-persist";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import { createNetworkMiddleware } from "react-native-offline";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { __DEV__ } from "../constants/config";

/* ------------- Redux Configuration ------------- */

/* ------------- Saga Middleware ------------- */
const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware();

const excludeWhoIsAroundFromPersist = createBlacklistFilter(
  "websocketReducer",
  ["whoIsAround", "isOnline", "message", "onlineUntil", "notificationToShow"]
);

const debug = __DEV__ ? true : false;
console.log(debug);

const migrations: MigrationManifest = {
  0: (state: any) => ({ ...state }),
};

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: createSensitiveStorage(),
  version: 0,
  debug,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug }),
  transforms: [excludeWhoIsAroundFromPersist],
};

const pReducer: Reducer = persistReducer(persistConfig, createRootReducer());

// Create the store
const store: Store = createStore(
  pReducer,
  applyMiddleware(sagaMiddleware, networkMiddleware, logger)
);

const persistor: Persistor = persistStore(store);

// kick off root saga
sagaMiddleware.run(rootSaga);

export default () => {
  return { store, persistor };
};
