import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import { TopicReducer } from "./reducers/TopicReducer";
import { UserReducer } from "./reducers/UserReducer";
import { PostReducer } from "./reducers/PostReducer";
import {LoadingReducer} from "./reducers/LoadingReducer";

const rootReducer = combineReducers({
    UserReducer,
    TopicReducer,
    PostReducer,
    LoadingReducer
})

const middleWare = [thunk];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
});