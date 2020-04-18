import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";
import TimeEffect from "./TimeEffect.jsx"; 

class Timer extends Component{
    constructor(props){
      super(props);
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.props.tick(),
        100
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    render() {
      let timeEffectPosition = 'bottom';
      let timeEffects = [];

      this.props.timeEffect.forEach(effect => {
        timeEffects.push(<TimeEffect timeEffectPosition={timeEffectPosition} timeEffect={effect} />) 
      });


      return (
        <div id="time">
          {this.props.time}
          {timeEffects}
        </div>
      )
    }
  }
  
  export default hot(module)(Timer);