import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './components/Redux/RootReducers'; // Assuming you have combined reducers in a rootReducer
import DashBoard from './components/Pages/DashBoard';
const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <DashBoard />
    </Provider>
  );
};

export default App;
