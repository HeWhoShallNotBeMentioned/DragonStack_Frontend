import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDragons } from '../actions/accountDragons';
import AccountDragonRow from './AccountDragonRow';

class AccountDragons extends Component {

  componentDidMount() {
    this.props.fetchAccountDragons();
  }

  render() {

    return (
      <div>
        <Link to='/' >Home</Link>
        <h3>Account Dragons</h3>
        {
          this.props.accountDragons.dragons.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <AccountDragonRow dragon={dragon} />
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const accountDragons = state.accountDragons;
  return { accountDragons, }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountDragons: () => dispatch(fetchAccountDragons())

  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(AccountDragons);
