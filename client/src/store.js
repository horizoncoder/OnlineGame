import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const socket = io("http://localhost:5000");
socket.on("action", (data) => {
  console.log({ data });
});

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

const middleware = applyMiddleware(logger, thunk, socketIoMiddleware);

const store = createStore(
  reducers,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export default store;
