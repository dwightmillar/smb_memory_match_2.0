import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class TimeEffect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            float: ''
        }
    }
    componentDidMount() {
        this.updateFloat = setTimeout(()=>this.setState({'float': 'floatUp'}), 50);
    }

    componentWillUnmount() {
        clearTimeout(this.updateFloat);
    }

    render() {
        let effect = this.props.timeEffect;
        let color = 'lime';
        if (effect < 0) {color = 'pink'}
        let timeEffectPosition = this.props.timeEffectPosition;
        if (this.state.float) {timeEffectPosition = this.state.float}

        if (effect > 0) {effect = '+' + effect;}
        else if (effect == 0) {effect = '';}
          
        return (
            <div id="timeEffect" style={{color: color}} className={timeEffectPosition}>
                {effect}
            </div>
        )
    }
}

export default hot(module)(TimeEffect);