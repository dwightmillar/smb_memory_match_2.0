import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class Tutorial extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.pause) {
            return (
                <section id="tutorial" className='darken' onClick={this.props.nextStep}>
                    <div>{this.props.message}</div>
                    <div>PRESS TO CONTINUE...</div>
                </section>
            )
        }

        return (
            <section id="tutorial" />
        )
    }
}

export default hot(module)(Tutorial);