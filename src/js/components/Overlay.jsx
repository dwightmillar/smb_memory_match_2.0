
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class Overlay extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      'effect': null
    }
  }

  componentDidUpdate()
  {
    if (this.props.play)
    {
      if (this.state.effect !== 'darken')
      this.setState({
        'effect': 'darken'
      });
    }
  }

  render()
  {
    let clickHandler = null;
    let prompt = null;
    let darken = '';

    if (this.props.display)
    {
      prompt = 'Click to start . . .';

      if (this.props.play)
      {
        prompt = '';
      }

      return (
        <div id="overlay" className={this.state.effect} onClick={this.props.clickHandler}>
          <div id="prompt" className="blink">{prompt}</div>
        </div>
      );
    }
    return null;
  }
}
  
export default hot(module)(Overlay);