import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createWrapper, Context } from "next-redux-wrapper";

import { reducers } from "./reducers";

const middlewares: any = [thunk];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

export const makeStore = (context: Context) => store;

export const wrapper = createWrapper(makeStore, { debug: true });
