import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Reset extends Component{
    constructor(props){
      super(props);
    }

    render() {
      return(
          <button className="small" onClick={this.props.reset}>
            <div className="coloring">
              <i className="fa fa-repeat" aria-hidden="true"></i>
            </div>
          </button>
      )
    }
  }
  
  export default hot(module)(Reset);