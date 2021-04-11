import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createWrapper, Context } from "next-redux-wrapper";

import { reducers } from "./reducers";

export const store = createStore(reducers, applyMiddleware(logger, thunk));

export const makeStore = (context: Context) => store;

export const wrapper = createWrapper(makeStore, { debug: true });
