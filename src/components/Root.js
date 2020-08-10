import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import AuthForm from './AuthForm';
class Root extends Component {

  render() {
    return (
      this.props.account.loggedIn ? <Home /> : <AuthForm />
    )
  }
}

const mapStateToProps = (state) => {

  const account = state.account;
  return {
    account
  }
}

const componentConnector = connect(mapStateToProps, null)

export default componentConnector(Root);
