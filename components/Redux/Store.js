

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './TaskSlice.js';

const store = configureStore({
  tasks: tasksReducer,
});

export default store;
