import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import { TopicReducer } from "./reducers/TopicReducer";
import { UserReducer } from "./reducers/UserReducer";
import { PostReducer } from "./reducers/PostReducer";

const rootReducer = combineReducers({
    UserReducer,
    TopicReducer,
    PostReducer
})

const middleWare = [thunk];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
});