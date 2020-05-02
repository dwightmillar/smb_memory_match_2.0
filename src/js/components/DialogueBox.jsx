import React, { PureComponent, Component, Fragment} from "react";
import {hot} from "react-hot-loader";

class DialogueBox extends PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount()
    {
        this.setState({'text': this.props.text[0]})
    }


    componentDidUpdate()
    {
        if (this.props.text[0] !== this.state.text[0])
        {
            this.setState({ 'text': this.props.text[0] });
            return false;
        }

        if (this.state.text !== this.props.text)
        {
            for (let character in this.props.text)
            {
                // console.log('props: ',this.props.text[character]);
                // console.log('state: ',this.state.text[character]);
                if (this.props.text[character] !== this.state.text[character])
                {
                    this.typeEffect = setTimeout(()=>{
                        this.setState({'text': this.state.text + this.props.text[character]})
                    }, 15);
                    break;
                }
            }
        }
    }

    componentWillUnmount()
    {
        clearTimeout(this.typeEffect);
    }

    render()
    {
        // if (this.props.visible)
        // {
            return (
                <div id="dialoguebox">
                    <div id="dialogue">
                        <p>{this.state.text}</p>
                        <div id="speaker"/>
                    </div>
                </div>
            )
        // }

        // return (
        //     null
        // )
    }
}

export default hot(module)(DialogueBox);