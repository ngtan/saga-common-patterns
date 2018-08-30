import { all, takeLatest, call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import apis from './apis';

function* getFollowers() {
  try {
    const followers = yield call(apis.getFollowers);
    console.log('followers 5s', followers);
    yield put({ type: 'HOME_SUCCESS', payload: { followers } });
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

function* getFollowings() {
  try {
    const followings = yield call(apis.getFollowings);
    console.log('followings 2s', followings);
    yield put({ type: 'HOME_SUCCESS', payload: { followings } });
  } catch (error) {
    yield put({ type: 'HOME_ERROR', error: error.message });
  }
}

function* getPosts() {
  try {
    const posts = yield call(apis.getPosts);
    console.log('posts 4s', posts);
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
    console.log('logged in');
    yield put({ type: 'LOGIN_SUCCESS' });
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error: error.message });
  }
}

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

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('LOGIN_SUCCESS', getRelatedResources),
    takeLatest('GET_PRODUCTS_WITH_TIMEOUT', getProductsWithTimeout),
  ]);
}
