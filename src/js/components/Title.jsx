
import React, { Component, Fragment} from 'react';
import {hot} from 'react-hot-loader';

import title from '../../images/title2.png';

class Title extends Component{
    constructor(props) {
      super(props);
      this.state = {
        titleEffect: '',
        subtitleEffect: 'hide'
      }
    }
  
    componentDidMount() {
      this.titleEffect = setTimeout(()=>this.setState({'titleEffect':'drop anchor'}), 500);
      this.subtitleEffect = setTimeout(()=>{
        this.setState({'subtitleEffect': 'typing'});
      }, 1800);
      this.toggleOverlay = setTimeout(()=>this.props.toggleOverlay(), 2300);
    }

    componentWillUnmount() {
      clearTimeout(this.titleEffect);
      clearTimeout(this.subtitleEffect);
      clearTimeout(this.toggleOverlay);
    }
  
    render() {
      return(
          <div id='title' className={this.state.titleEffect}>
            <div id='subtitle' className={this.state.subtitleEffect}>MEMORY MATCH</div>
          </div>
      );
    }
  }
  
  export default hot(module)(Title);