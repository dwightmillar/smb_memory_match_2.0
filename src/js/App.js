
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

import Home from "./components/Home.jsx";
import Loading from "./components/Loading.jsx";

import background from "../images/background.png";
import title from "../images/title.png";
import mario from "../images/mario.gif";
import button from "../images/button.png";
import button_dark from "../images/button_dark.png";



import "../css/app.css";


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const images = [background, title, mario, button, button_dark];

    images.forEach((image,imageIndex,imageArray) => {
      var url = image;
      var img = new Image();
      img.onload = () => {
        imageArray.pop();
        if (imageArray.length === 0) {this.setState({loaded:true});}
      }
      img.src = url;
      if (img.complete) img.onload();
    })
  }

  render(){
    if (!this.state.loaded) {
      return (
        <Loading />
      )
    }
    return(
      <Home/>
    );
  }
}

export default hot(module)(App);
