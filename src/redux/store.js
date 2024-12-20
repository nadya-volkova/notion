import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducers/userReducer';
import notesReducer from './reducers/notesReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { loadUserFromLocalStorage } from './actions/userActions'; 

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) 
);

store.dispatch(loadUserFromLocalStorage());

export default store;