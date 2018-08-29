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

class App extends Component {
  render() {
    console.log('app', this.props);
    const { followers, followings, posts } = this.props;

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

        <p><button onClick={() => this.props.dispatch({ type: 'LOGIN' })}>LOGIN</button></p>
        <p><button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>LOGOUT</button></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { followers, followings, posts } = state.home;

  return {
    followers,
    followings,
    posts,
  };
}

export default connect(mapStateToProps)(App);
