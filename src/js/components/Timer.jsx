import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

import TimeEffect from "./TimeEffect.jsx"; 

{/* <Timer seconds watchTime timeEffects onRef={ref => (this.timer = ref)}/> */}

class Timer extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      initialSeconds: 30 + new Date().getSeconds(),
      intitalMinutes: new Date().getMinutes(),
      initialHours: new Date().getHours(),
      initialDate: new Date().getDate(),
      seconds: 0,
      pause: false,
      pausedTime: 0,
      timeEffects: []
    }
    this.tick = this.tick.bind(this);
    this.pause = this.pause.bind(this);
  }
  
  componentDidMount()
  {
    this.timerID = setInterval( () => this.tick(), 100 );
    this.props.onRef(this);

    this.setState({
      'initialSeconds'  : this.props.seconds + new Date().getSeconds(),
      'intitalMinutes'  : new Date().getMinutes(),
      'initialHours'    : new Date().getHours(),
      'initialDate'     : new Date().getDate(),
      'seconds'         : this.props.seconds
    });
  }



  tick()
  {
    let days = new Date().getDate() - this.state.initialDate;
    let hours = (days * 24) + new Date().getHours() - this.state.initialHours;
    let minutes = (hours * 60) + new Date().getMinutes() - this.state.intitalMinutes;
    let seconds = this.state.initialSeconds - (new Date().getSeconds() + (minutes * 60));

    if (this.state.pause)
    {
      this.setState({
        'pausedTime': new Date().getSeconds() - this.state.initialSeconds + this.state.seconds
      });
    }
    else if (seconds >= 0)
    {
    this.setState({seconds});
    this.props.watchTime(seconds);
    }
    else
    clearInterval(this.timerID);
  }

  pause()
  {
    if (!this.state.pause)
    this.setState({
      'pause': true
    })
    else {
      this.setState({
        'pause': false,
        'initialSeconds': this.state.initialSeconds + this.state.pausedTime
      })
    }
  }

  addTime(time)
  {
    const timeEffects = this.state.timeEffects
    timeEffects.push(time);
    this.setState({
      timeEffects,
      'initialSeconds': this.state.initialSeconds + time
    });
  }


  componentWillUnmount()
  {
    clearInterval(this.timerID);
    this.props.onRef(undefined);
  }


  render()
  {
    let timeEffects = [];

    this.state.timeEffects.forEach((time, index) => {
      timeEffects.push(<TimeEffect key={index} time={time} />);
    });


    return (
      <div id="timer" onClick={this.pause}>
        {this.state.seconds}
        {timeEffects}
      </div>
    )
  }
}
  
  export default hot(module)(Timer);