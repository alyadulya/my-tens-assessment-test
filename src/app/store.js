import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import repoReducer from "./features/Repos/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  repos: repoReducer
})

const store = legacy_createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
)

export default store;