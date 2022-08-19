import { combineReducers } from '@reduxjs/toolkit';

import exampleReducer from './example/reducer';

export default combineReducers({
  example: exampleReducer,
});
