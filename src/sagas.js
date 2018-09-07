import { all, takeLatest, call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import apis from './apis';

// Use case 0: A button is constantly clicked
function* getPlanets() {
  try {
    const response = yield call(apis.getPlanets);
    const planets = response.data.results;
    yield put({ type: 'HOME_SUCCESS', payload: { planets } });
    console.log('apis.getPlanets succeed');
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

// Use case 1: run multiple request in parallel
function* getFollowers() {
  try {
    const followers = yield call(apis.getFollowers);
    console.log('getFollowers 5s', followers);
    yield put({ type: 'HOME_SUCCESS', payload: { followers } });
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

function* getFollowings() {
  try {
    const followings = yield call(apis.getFollowings);
    console.log('getFollowings 2s', followings);
    yield put({ type: 'HOME_SUCCESS', payload: { followings } });
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

function* getPosts() {
  try {
    const posts = yield call(apis.getPosts);
    console.log('getPosts 4s', posts);
    yield put({ type: 'HOME_SUCCESS', payload: { posts } });
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

function* getRelatedResources() {
  yield all([
    call(getFollowers),
    call(getFollowings),
    call(getPosts),
  ]);
}

function* login() {
  try {
    yield call(apis.login);
    yield put({ type: 'LOGIN_SUCCESS' });
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error: error.message });
  }
}

// Use case 2: cancel a request
function* getProductsWithTimeout() {
  try {
    const { products } = yield race({
      products: call(apis.getProducts),
      timeout: call(delay, 3000),
    });

    if (products) {
      yield put({ type: 'HOME_SUCCESS', payload: { products } });
    } else {
      throw new Error('timeout');
    }

  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

// Use case 3: retry request few times after a certain time
function* getStarships() {
  try {
    const response = yield call(apis.getStarships);
    const starships = response.data.results;
    yield put({ type: 'HOME_SUCCESS', payload: { starships } });
  } catch (error) {
    throw new Error(error);
  }
}

function* getStarshipsFailed(error) {
  yield put({ type: 'HOME_ERROR', error: error.message });
}

function autoRestart(generator, handleErrorGenerator, maxAttempts = 5, duration = 2000) {
  let attempts = 0;
  let isSucceeded = false;

  return function* autoRestarting(...args) {
    while ((attempts++) <= maxAttempts) {
      try {
        yield call(generator, ...args);
        isSucceeded = true;
        break;
      } catch (error) {
        yield call(delay, duration);
      }
    }

    if (!isSucceeded) {
      yield call(handleErrorGenerator, `FAILED after ${attempts} attempts.`);
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('GET_PLANETS', getPlanets),

    takeLatest('LOGIN', login),
    takeLatest('LOGIN_SUCCESS', getRelatedResources),

    takeLatest('GET_PRODUCTS_WITH_TIMEOUT', getProductsWithTimeout),

    takeLatest('GET_STARSHIPS', autoRestart(getStarships, getStarshipsFailed)),
  ]);
}
