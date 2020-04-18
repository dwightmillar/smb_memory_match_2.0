
import React, { Component} from "react";
import {hot} from "react-hot-loader";


class Card extends Component{
  constructor(props){
    super(props);
    this.state = {
      visibility: 'hidden',
      bouncing: '',
      highlight: '',
    }
    this.flip = this.flip.bind(this);
    this.reset = this.reset.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
  }
  

  flip(){
    if (this.state.visibility === 'visible')
    {
      return false;
    }

    if (this.props.select(this))
    {
      this.setState({
        'visibility': 'visible',
        'bouncing': 'bouncing',
      })
      this.highlight();
      setTimeout(()=>{
        this.setState({
          'bouncing': ''
        })
      }, 210);
    }
  }

  unhighlight() {
    this.setState({'highlight': ''});
  }

  highlight() {
    this.setState({'highlight': 'highlight'});
  }

  

  reset(){
    if (this.state.visibility === 'hidden')
    {
      this.setState({
        'visibility': 'visible'
      })
    }
    else {
      this.setState({
        'visibility': 'hidden'
      })
    }
    this.unhighlight();
  }


  render(){
    if (this.state.visibility === 'hidden') {
      return(
        <div id={'card' + this.props.id} className={"card" + ' ' + this.state.bouncing + ' ' + this.state.highlight} onClick={this.flip} />
      ) 
    } else {
      return (
        <div id={'card' + this.props.id} className={"card" + ' ' + this.props.item + ' ' + this.state.bouncing + ' ' + this.state.highlight} />
      )
    }
  }
}

export default hot(module)(Card);
