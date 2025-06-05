import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlices';
import loginReducer from './slices/loginSlices';

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    login: loginReducer
  })
});

export default store;