
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

import Game from "./components/Game.jsx";
import Overlay from "./components/Overlay.jsx";

import "../css/desktop.css";
import "../css/mobile.css";

import mystery_box from "../images/mystery_box.gif";
import flower from "../images/flower.png";
import mushroom_green from "../images/mushroom_green.png";
import mushroom_red from "../images/mushroom_red.png";
import koopa_green from "../images/koopa_green.png";
import koopa_red from "../images/koopa_red.png";
import koopa_blue from "../images/koopa_blue.png";
import koopa_magic from "../images/koopa_magic.png";
import star from "../images/star.png";
import bowser from "../images/bowser.png";

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loadedImages: false,
      displayOverlay: false,
      playGame: false,
      tutorial: {
        on: true,
        step: 0,
        message:  [
          'Mushrooms will increase your time.',
          'Koopas will decrease your time.',
          'If time reaches 0, you lose!',
          'The wizard will shuffle the cards.',
          'The star will give you 5 seconds to match Bowser.',
          'If you match Bowser without the star, you lose!'
        ]
      }
    }
    this.loadImages = this.loadImages.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.overlayClickHandler = this.overlayClickHandler.bind(this);
    this.nextTutorialStep = this.nextTutorialStep.bind(this);
  }

  loadImages(images)
  {
    this.setState({ 'loaded': false });
    images.forEach( 

      (url,index,array) => {

        let img = new Image();
        img.src = url;
        img.onload = () => {
          array.pop();
          if (array.length === 0) {
            // setTimeout(()=>{
              this.setState({ 'loaded': true })
            // }, 2000);
          }
        }

        if (img.complete) img.onload();
    })
  }

  nextTutorialStep()
  {
    console.log('next step');
    let step = this.state.tutorial.step + 1;
    this.setState({
      'tutorial': {
        ...this.state.tutorial,
        step 
      }
    });
  }

  toggleOverlay()
  {
    // console.log('overlay toggled');
    !this.state.displayOverlay ? this.setState({ 'displayOverlay': true }) : this.setState({ 'displayOverlay': false });
  }

  overlayClickHandler()
  {
    console.log('this.state.tutorial.step: ',this.state.tutorial.step);
    // console.log('click');
    if (this.state.tutorial.step !== 5 && this.state.tutorial.step !== 2)
    {
      this.toggleOverlay();
    }



    if (!this.state.playGame) //if on title screen, play game
    {
      this.loadImages([mystery_box, flower, mushroom_green, mushroom_red, koopa_green, koopa_red, koopa_blue, koopa_magic, star, bowser]);
      this.setState({
        'playGame': true
      });
      return false;
    }



    if (this.state.tutorial.on)
    {
      if (this.state.tutorial.step === 7)
      {
        this.setState({
          'tutorial': {
            ...this.state.tutorial,
            'on': false
          }
        });
      }
      this.nextTutorialStep();
    }
  }

  render()
  {
    return (
      <div id="backdrop" >
        <Overlay display={this.state.displayOverlay} play={this.state.playGame} clickHandler={this.overlayClickHandler} tutorial={this.state.tutorial} />
        <Game play={this.state.playGame} 
              loaded={this.state.loaded}
              loadImages={this.loadImages}
              displayOverlay={this.state.displayOverlay}
              toggleOverlay={this.toggleOverlay}
              tutorial={this.state.tutorial}
              nextTutorialStep={this.nextTutorialStep} />
      </div>
    );
  }
}

export default hot(module)(App);