import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Loading extends Component{
    render() {
        return (
            <div style={{backgroundColor:'white',height:'100vh',width:'100vw'}} />
        )
    }
}

export default hot(module)(Loading);