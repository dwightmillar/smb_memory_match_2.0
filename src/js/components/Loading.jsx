
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class Title extends Component{
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <div id="loading" >LOADING...</div>
      );
    }
  }
  
  export default hot(module)(Title);