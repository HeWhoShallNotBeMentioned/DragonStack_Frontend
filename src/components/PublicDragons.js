import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragons';
import { fetchAccountDragons } from '../actions/accountDragons';
import PublicDragonRow from './PublicDragonRow';
import { Link } from 'react-router-dom';

class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
    this.props.fetchAccountDragons();
  }


  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <h3>Public Dragons</h3>
        {
          this.props.publicDragons.dragons.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <PublicDragonRow dragon={dragon} />
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
  const publicDragons = state.publicDragons;
  const accountDragons = state.accountDragons;
  return { publicDragons, accountDragons }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPublicDragons: () => dispatch(fetchPublicDragons()),
    fetchAccountDragons: () => dispatch(fetchAccountDragons())
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(PublicDragons);
