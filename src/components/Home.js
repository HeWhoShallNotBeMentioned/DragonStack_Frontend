import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Generation from './Generation';
import Dragon from './Dragon';
import AccountInfo from './AccountInfo';
import { logout } from '../actions/account';

class Home extends Component {
  state = {
    account: {}
  }

  componentDidMount() {
    this.setState({ account: this.props.account })
  }

  render() {
    return (
      <div>
        <Button variant="warning" onClick={this.props.logout} className="logout-button">Logout</Button>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
        <hr />
        <AccountInfo />
        <Link to='/account-dragons' >Account Dragons</Link>
        <br />
        <Link to='public-dragons' >Public Dragons</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const account = state.account;
  return { account };
}


const mapDispatchToProps = (dispatch) => {
  return {
    logout: ({ account }) => dispatch(logout({ ...account }))
  }
}


const componentConnector = connect(mapStateToProps, mapDispatchToProps);




export default componentConnector(Home);
