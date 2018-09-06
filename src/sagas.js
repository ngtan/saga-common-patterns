import { all, takeLatest, call, put, race, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import apis from './apis';

// Use case 0:
function* getFeatures() {
  try {
    const features = yield call(apis.getFeatures);
    yield put({ type: 'HOME_SUCCESS', payload: { features } });
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
      timeout: call(delay, 2500),
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
function* retryRequest() {
  for (let i = 0; i < 5; i += 1) {
    try {
      console.log(i);
      yield call(apis.retryRequest);
      yield put({ type: 'HOME_SUCCESS', payload: { message: 'API request succeed' } });
      yield cancelled();
    } catch (error) {
      if (i < 5) {
        yield call(delay, 2000);
      }
    }
  }

  yield put({ type: 'HOME_ERROR', error: 'API request failed' });
}

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('LOGIN_SUCCESS', getRelatedResources),
    takeLatest('GET_PRODUCTS_WITH_TIMEOUT', getProductsWithTimeout),
    takeLatest('RETRY_REQUEST', retryRequest),
    takeLatest('GET_FEATURES', getFeatures),
  ]);
}
