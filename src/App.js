import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

function renderItems(items) {
  if (!items || !items.length) {
    return (<p>No data</p>);
  }

  return items.map((item) => (<p key={item.id}>{item.name}</p>));
}

function renderErrors(errors) {
  if (!errors || !errors.length) {
    return null;
  }

  return errors.map((error) => (<p key={error}>{error}</p>));
}


class App extends Component {
  render() {
    const { followers, followings, posts, products, errors } = this.props;
    console.log('errors', errors);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <h2>Followers</h2>
        {renderItems(followers)}
        <h2>Followings</h2>
        {renderItems(followings)}
        <h2>Posts</h2>
        {renderItems(posts)}
        <h2>Products</h2>
        {renderItems(products)}

        <h2>Errors</h2>
        {renderErrors(errors)}

        <p><button onClick={() => this.props.dispatch({ type: 'LOGIN' })}>LOGIN</button></p>
        <p><button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>LOGOUT</button></p>
        <p><button onClick={() => this.props.dispatch({ type: 'GET_PRODUCTS_WITH_TIMEOUT' })}>GET PRODUCTS WITH TIMEOUT</button></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { followers, followings, posts, products, errors } = state.home;

  return {
    followers,
    followings,
    posts,
    products,
    errors,
  };
}

export default connect(mapStateToProps)(App);
