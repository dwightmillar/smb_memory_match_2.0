import React, { Component} from 'react';
import {hot} from "react-hot-loader";
import '../../css/endscreen.css';
import '../../css/gamescreen.css';

class ScoreTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log('this.props.display: ',this.props.display);
        // if (!this.props.display)
        // return null;

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

export default hot(module)(ScoreTable);
