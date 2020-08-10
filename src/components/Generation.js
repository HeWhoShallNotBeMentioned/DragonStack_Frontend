import React, { Component } from 'react';
import regeneratorRuntime from "regenerator-runtime";
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation';
import fetchStates from '../reducers/fetchStates';



const MINIMUM_DELAY = 3000;

class Generation extends Component {


  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration() {
    try {
      this.props.fetchGeneration();

      let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();

      if (delay < MINIMUM_DELAY) {
        delay = MINIMUM_DELAY;
      }

      this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    } catch (error) {
      console.error("Error in Generation Componenet fetchNextGeneration method.   ", error);
    }
  }



  render() {
    //console.log("this.props", this.props)

    // if (this.props.generation.fetching) {
    //   return <div>...</div>
    // }

    if (this.props.generation.status === fetchStates.error) {
      return <div>{this.props.generation.message}</div>
    }

    return (<div>

      <h3>Generation {this.props.generation.generationId} Expires on: </h3>
      <h4>{new Date(this.props.generation.expiration).toString()}</h4>

    </div>)
  }
}

const mapStateToProps = (state) => {
  const generation = state.generation;
  return { generation };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneration: () => dispatch(fetchGeneration)
  }
}



const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Generation);
