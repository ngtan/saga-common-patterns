const followers = [{ id: 1, name: 'follower 1'}, { id: 2, name: 'follower 2'}, { id: 3, name: 'follower 3'}];
const followings = [{ id: 1, name: 'following 1'}, { id: 2, name: 'following 2'}, { id: 3, name: 'following 3'}];
const posts = [{ id: 1, name: 'post 1'}, { id: 2, name: 'post 2'}, { id: 3, name: 'post 3'}];
const user = { name: 'user 1', token: 'encrypt_token' };
const products = [{ id: 1, name: 'product 1'}, { id: 2, name: 'product 2'}, { id: 3, name: 'product 3'}];

export default {

  getFollowers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(followers), 5000);
    });
  },

  getFollowings() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(followings), 2000);
    });
  },

  getPosts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(posts), 4000);
    });
  },

  login() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), 3000);
    });
  },

  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 3000);
    });
  },

  retryRequest() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  },

  constantlyClicked() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  },

  getFeatures() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  },
};
