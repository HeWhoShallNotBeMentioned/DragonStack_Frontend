import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import regeneratorRuntime from "regenerator-runtime";
import { fetchDragon } from '../actions/dragon';
import DragonAvatar from './DragonAvatar';
import fetchStates from '../reducers/fetchStates';

class Dragon extends Component {
  get DragonView() {
    if (this.props.dragon.status === fetchStates.error) {
      return <div className='errorTextColor' >{this.props.dragon.message}</div>
    }

    return <DragonAvatar dragon={this.props.dragon} />
  }

  render() {
    return (<div>
      {this.DragonView}

      <Button type="button" variant="success" onClick={() => { this.props.fetchDragon() }}>New Dragon</Button>
    </div>
    );

  };
};

const mapStateToProps = (state) => {
  const dragon = state.dragon;
  return { dragon };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDragon: () => dispatch(fetchDragon)
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Dragon);
