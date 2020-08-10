import React, { Component } from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config';
import { Next } from 'react-bootstrap/PageItem';

class AccountDragonRow extends Component {

  state = {
    nickname: this.props.dragon.nickname,
    isPublic: this.props.dragon.isPublic,
    saleValue: this.props.dragon.saleValue,
    sireValue: this.props.dragon.sireValue,
    edit: false
  }

  updateNickname = event => {
    this.setState({ nickname: event.target.value });
  }

  updateSaleValue = event => {
    this.setState({ saleValue: event.target.value });
  }

  updateSireValue = event => {
    this.setState({ sireValue: event.target.value });
  }

  updateIsPublic = event => {
    this.setState({ isPublic: event.target.checked });
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  save = async () => {
    try {
      let nicknameUpdateResponse = await fetch(`${BACKEND.ADDRESS}/dragon/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dragonId: this.props.dragon.dragonId,
          nickname: this.state.nickname,
          saleValue: this.state.saleValue,
          sireValue: this.state.sireValue,
          isPublic: this.state.isPublic
        })
      })


      let js = nicknameUpdateResponse.json();


      if (js.type === 'error') {
        alert(nicknameUpdateResponse.message);
      } else {
        this.toggleEdit();
      }



    } catch (error) {
      console.error("AccountDragonRow Error.....", error)
    }
  }

  get SaveButton() {
    return <Button onClick={this.save} variant="success" >Save</Button>
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit} variant="info"  >Edit</Button>
  }
  get CancelButton() {

    return <Button onClick={() => { this.toggleEdit(); this.setState({ nickname: this.props.dragon.nickname }) }} variant="info"  >Cancel</Button>
  }

  render() {
    return (
      <div>

        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
        />
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          <span> Sale Value:{'  '} </span>
          <input
            type="number"
            value={this.state.saleValue}
            onChange={this.updateSaleValue}
            disabled={!this.state.edit}
            className="account-dragon-row-input"
          />
          {'   '}
          <span> Sire Value:{'  '} </span>
          <input
            type="number"
            value={this.state.sireValue}
            onChange={this.updateSireValue}
            disabled={!this.state.edit}
            className="account-dragon-row-input"
          />
          {'   '}
          <span>
            Public: {'   '}
            <input
              type="checkbox"
              disabled={!this.state.edit}
              onChange={this.updateIsPublic}
              checked={this.state.isPublic}
            />
          </span>
          <br />
          {
            this.state.edit
              ? <span> {this.SaveButton}{'    '}
                {this.CancelButton} </span>
              : this.EditButton
          }
        </div>
      </div>
    )
  }

}

export default AccountDragonRow;
