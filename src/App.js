import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

function renderItems(items) {
  if (!items || !items.length) {
    return (<p>No data</p>);
  }

  return items.map((item) => (<p key={item.id || item.url}>{item.name}</p>));
}

function renderErrors(errors) {
  if (!errors || !errors.length) {
    return null;
  }

  return errors.map((error) => (<p key={error}>{error}</p>));
}


class App extends Component {
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {
    const {
      planets,
      followers,
      followings,
      posts,
      products,
      message,
      errors,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section className="use-case-0">
          <div className="container">
            <div className="row">
              <h2>
                Use case 0: A button is constantly clicked
              </h2>
              <button onClick={() => this.props.dispatch({ type: 'GET_PLANETS' })}>
                Get Planets
              </button>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h3>Planets</h3>
                {renderItems(planets)}
              </div>
            </div>
          </div>
        </section>
        <section className="use-case-1">
          <div className="container">
            <div className="row">
              <h2>
                Use Case 1: run multiple request in parallel
              </h2>
              <button onClick={() => this.props.dispatch({ type: 'LOGIN' })}>
                Login
              </button>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h3>Followers</h3>
                {renderItems(followers)}
              </div>
              <div className="col-md-4">
                <h3>Followings</h3>
                {renderItems(followings)}
              </div>
              <div className="col-md-4">
                <h3>Posts</h3>
                {renderItems(posts)}
              </div>
            </div>
          </div>
        </section>
        <section className="use-case-2">
          <div className="container">
            <div className="row">
              <h2>
                Use case 2: Cancel request
              </h2>
              <button onClick={() => this.props.dispatch({ type: 'GET_PRODUCTS_WITH_TIMEOUT' })}>
                GET PRODUCTS WITH TIMEOUT
              </button>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h3>Products</h3>
                {renderItems(products)}
              </div>
              <div className="col-md-6">
                <h3>Errors</h3>
                {renderErrors(errors)}
              </div>
            </div>
          </div>
        </section>
        <section className="use-case-3">
        </section>

        <p><button onClick={() => this.props.dispatch({ type: 'RETRY_REQUEST' })}>RETRY REQUEST - [{message}]</button></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}

export default connect(mapStateToProps)(App);
