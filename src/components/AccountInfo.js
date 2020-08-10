import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfo';

class AccountInfo extends Component {

  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  render() {
    return (
      <div>
        <h3>Account Info</h3>
        <div>Username: {this.props.accountInfo.username}</div>
        <div>Balance: {this.props.accountInfo.balance}</div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  console.log("state.......", state)
  const accountInfo = state.accountInfo
  return { accountInfo };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(AccountInfo);
