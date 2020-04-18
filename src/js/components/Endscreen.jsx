import React, { Component} from 'react';
import {hot} from "react-hot-loader";
import Reset from "./Reset.jsx";
import '../../css/endscreen.css';
import '../../css/gamescreen.css';

class Endscreen extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.playAgain(false);
    }

    render() {
        if (this.props.tutorial.on) {
            if (this.props.tutorial.step !== 5) {
                return null;
            }
        }

        let matchCount = 0;
        matchCount += this.props.matches.length;
        matchCount /= 2;

        switch(this.props.win) {
            case 'win':{
                return(
                    <div id="endscreen">
                        <div>
                            YOU WON
                            <table>
                                <tbody>
                                <tr>
                                    <td>TIME :</td>
                                    <td>{this.props.time} x 100</td>
                                </tr>
                                <tr>
                                    <td>MATCHES :</td>
                                    <td>{matchCount} x 100</td>
                                </tr>
                                <tr>
                                    <td>WIN BONUS :</td>
                                    <td>x 2</td>
                                </tr>
                                <tr>
                                    <td>SCORE :</td>
                                    <td>{((100 * matchCount + this.props.time * 100) * 2).toFixed(0)}</td>
                                </tr>
                                </tbody>
                            </table>
                            <Reset reset={this.reset}/>
                        </div>
                    </div>
                )
            }
            case 'lose':{
                return(
                    <div id="endscreen">
                        <div>
                            YOU LOST
                            <table>
                                <tbody>
                                <tr>
                                    <td>TIME :</td>
                                    <td>{this.props.time} x 100</td>
                                </tr>
                                <tr>
                                    <td>MATCHES :</td>
                                    <td>{matchCount} x 100</td>
                                </tr>
                                <tr>
                                    <td>SCORE :</td>
                                    <td>{(100 * matchCount + this.props.time * 100).toFixed(0)}</td>
                                </tr>
                                </tbody>
                            </table>
                            <Reset reset={this.reset}/>
                        </div>
                    </div>
                )
            }
            default:{
                return null;
            }
        }
    }
}

export default hot(module)(Endscreen);
