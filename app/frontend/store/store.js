import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import listingsReducer from './listings';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});
export default store;