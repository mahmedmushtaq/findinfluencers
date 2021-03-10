import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { createWrapper, Context } from "next-redux-wrapper";

import { reducers } from "./reducers";

export const makeStore = (context: Context) =>
  createStore(reducers, applyMiddleware(logger));

export const wrapper = createWrapper(makeStore, { debug: true });
