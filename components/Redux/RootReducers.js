


import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './TaskSlice.js'
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
