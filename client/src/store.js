import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

const middleware = applyMiddleware(logger, thunk);

const store = createStore(
  reducers,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export default store;
