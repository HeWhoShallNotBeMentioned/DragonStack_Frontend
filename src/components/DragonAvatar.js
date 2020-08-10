import React, { Component } from 'react';
import { patchy, plain, skinny, slender, spotted, stocky, striped, sporty } from '../assets/index'
import regeneratorRuntime from "regenerator-runtime";

const propertyMap = {
  backgroundColor: {
    gold: '#ffD700',
    red: '#933a16',
    green: '#228B22',
    blue: '#0277bd'
  },
  build: { slender, stocky, sporty, skinny, },
  pattern: { plain, striped, spotted, patchy },
  size: { small: 100, medium: 140, large: 180, enormous: 220 }
}

class DragonAvatar extends Component {

  get DragonImage() {

    const dragonPropertyMap = {};


    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;

      dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];

    });


    const { backgroundColor, build, pattern, size } = dragonPropertyMap;

    const sizing = { width: size, height: size };

    return (
      <div className='dragon-avatar-image-wrapper' >
        <div className='dragon-avatar-image-background' style={{ backgroundColor: backgroundColor, ...sizing }}>        </div>
        <img src={pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }} />
        <img src={build} className='dragon-avatar-image' style={{ ...sizing }} />
      </div>
    )
  }

  render() {
    //console.log("DragonAvatar props", this.props);

    if (!this.props.dragon.dragonId) {
      return <div></div>
    }

    return (
      <div>

        <span>Generation Id: {this.props.dragon.generationId}.</span>
        <span>Dragon Id:  {this.props.dragon.dragonId}.</span>
        {this.props.dragon.traits.map((trait, id) => {
          return (
            <span key={id}>{trait.traitType === "backgroundColor"
              ? "background color" : trait.traitType}: {trait.traitValue}, </span>)
        })}
        {this.DragonImage}

      </div>
    );

  };

}

export default DragonAvatar;
