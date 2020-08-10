import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';
import { BACKEND } from '../config';
import history from '../history';


class PublicDragonRow extends Component {
  state = { displayMatingOptions: false }

  toggleDisplayMatingOptions = () => {
    this.setState({ displayMatingOptions: !this.state.displayMatingOptions });
  }


  buy = async () => {
    try {
      const { dragonId, saleValue } = this.props.dragon

      let response = await fetch(`${BACKEND.ADDRESS}/dragon/buy`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify({
            dragonId,
            saleValue
          })
        })
      let data = await response.json();

      alert(data.message);
      if (data.type !== 'error') {
        history.push('./account-dragons');
      }

    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (

      <div>
        <div>{this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          <span>Sale Value: {this.props.dragon.saleValue}</span>{' | '}
          <span>Sire Value: {this.props.dragon.sireValue}</span>

        </div>
        <br />
        <Button onClick={this.buy} variant="success">Buy</Button>{'   '}
        <Button onClick={this.toggleDisplayMatingOptions} variant="info"  >Sire</Button>
        <br />

        {
          this.state.displayMatingOptions ?
            <MatingOptions patronDragonId={this.props.dragon.dragonId} /> :
            <div></div>
        }
      </div>
    );
  }

}

export default PublicDragonRow;
