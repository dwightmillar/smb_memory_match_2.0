
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";
import Game from "../components/Game.jsx";

import button_small from "../../images/button_small.png";
import button_small_dark from "../../images/button_small_dark.png";
import mystery_box from "../../images/mystery_box.gif";
import empty_box from "../../images/empty_box.png";
import flower from "../../images/flower.png";
import mushroom_green from "../../images/mushroom_green.png";
import mushroom_red from "../../images/mushroom_red.png";
import koopa_green from "../../images/koopa_green.png";
import koopa_red from "../../images/koopa_red.png";
import koopa_blue from "../../images/koopa_blue.png";
import koopa_magic from "../../images/koopa_magic.png";
import star from "../../images/star.png";
import bowser from "../../images/bowser.png";

import "../../css/homescreen.css";


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      play: false,
      transition: '',
    }
    this.play = this.play.bind(this);
  }

  transition() {
    this.setState({'transition':'fade'});
  }

  play() {
    this.transition();

    setTimeout(()=>{
      const images = [button_small, button_small_dark, mystery_box, empty_box, flower, mushroom_green, mushroom_red, koopa_green, koopa_red, koopa_blue, koopa_magic, star, bowser];

      images.forEach((image,imageIndex,imageArray) => {
        var img = new Image();
        img.src = image;
        img.onload = () => {
          imageArray.pop();
          if (imageArray.length === 0) {
            this.setState({
              play: true,
              transition: ''
            });
          }
        }

        if (img.complete) img.onload();
      })
    }, 1000)
  }

  render(){
    if (!this.state.play)
    {
      return (
        <main id="home" className={this.state.transition}>
          <div className="transition" />
          <div id="title" />
          <button onClick={this.play}>
            <div className="coloring">PLAY</div>
          </button>
          <button >
            <div className="coloring">OPTIONS</div>
          </button>
          <button >
            <div className="coloring">HIGH SCORES</div>
          </button>
        </main>
      )
    } else {
      return (
        <Fragment>
          <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
          <Game />
        </Fragment>
      )
    }
  }
}

export default hot(module)(Home);
