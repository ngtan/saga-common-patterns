import { all, takeLatest, call, put } from 'redux-saga/effects';

import fixtures from './fixtures';

function* getFollowers() {
  try {
    const followers = yield call(fixtures.getFollowers);
    console.log('followers 5s', followers);
    yield put({ type: 'HOME_SUCCESS', payload: { followers } });
  } catch (error) {

  }
}

function* getFollowings() {
  try {
    const followings = yield call(fixtures.getFollowings);
    console.log('followings 2s', followings);
    yield put({ type: 'HOME_SUCCESS', payload: { followings } });
  } catch (error) {

  }
}

function* getPosts() {
  try {
    const posts = yield call(fixtures.getPosts);
    console.log('posts 4s', posts);
    yield put({ type: 'HOME_SUCCESS', payload: { posts } });
  } catch (error) {

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
    const user = yield call(fixtures.login);
    console.log('user', user);
  } catch (error) {

  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN', login),
    takeLatest('LOGIN_SUCCESS', getRelatedResources),
  ]);
}
