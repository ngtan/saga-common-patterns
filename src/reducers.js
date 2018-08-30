import { combineReducers } from 'redux';

function homeReducer(state = {}, action) {
  switch (action.type) {
    case 'HOME_SUCCESS':
      return Object.assign({}, state, action.payload);

    case 'HOME_ERROR':
      return Object.assign({}, state, {
        errors: mergeErrors(state.errors, action.error),
      });

    default:
      return state;
  }
}

function mergeErrors(currentErrors, nextError) {
  const errors = [];

  [].concat(currentErrors, nextError).forEach((error) => {
    if (error !== undefined && errors.indexOf(error) === -1) {
      errors.push(error);
    }
  });

  return errors;
}

export default combineReducers({
  home: homeReducer,
});
