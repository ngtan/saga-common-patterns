import { combineReducers } from 'redux';

function homeReducer(state = {}, action) {
  switch (action.type) {
    case 'HOME_SUCCESS':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default combineReducers({
  home: homeReducer,
});
