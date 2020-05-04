import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class TimeEffect extends Component {
    constructor(props) {
        super(props);
        this.effect = React.createRef();
    }
    
    componentDidMount() {
        setTimeout( () => this.effect.current.className = 'floatUp', 1 );
    }


    render() {
        let time = this.props.time;
        let color = 'lime';
        if (time < 0) {color = 'pink'}

        if (time > 0) {time = '+' + time;}
        else if (time == 0) {time = '';}
          
        return (
            <div id="timeEffect" style={{color: color}} ref={this.effect}>
                {time}
            </div>
        )
    }
}

export default hot(module)(TimeEffect);