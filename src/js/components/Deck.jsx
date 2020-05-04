import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

import Card from "./Card.jsx";

{/* <Deck size cards clickHandler onRef={ref => (this.deck = ref)}/> */}

class Deck extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            cards: [],
            loaded: false
        }
        this.shuffle = this.shuffle.bind(this);
    }

    componentDidMount()
    {
        if (this.props.size % this.props.cards.length !== 0)
        {
            if (this.props.size > this.props.cards.length)
            {
                console.error("There are uneven groups of cards ie not enough pairs");
            }
            else
            {
                console.error("There are not enough cards for all of the items/ranks");
            }
            return null;
        }

        this.props.onRef(this);

        const cards = [];
        let itemList = this.props.cards;

        if (this.props.size > this.props.cards.length)
        {
            itemList = itemList.concat(itemList);
        }

        for (let counter = 1; counter <= this.props.size; counter++)
        {
            // let randomItem = itemList.splice([Math.floor(Math.random() * itemList.length)], 1)[0];
            let randomItem = itemList.splice(this.props.size - counter, 1)[0];

            let card = <Card key={counter} id={counter} item={randomItem} select={this.props.clickHandler} />;
            cards.push(card);
            // this.state.selected.forEach(selectedCard => selectedCard.reset());
            // this.state.matches.forEach(matchedCard => matchedCard.reset());
        }

        this.setState({cards});
    }

    componentDidUpdate()
    {
        if (!this.state.loaded && this.state.cards.length === this.props.size)
        {
            console.log('deck loaded');
            this.setState({ 'loaded':true });
            this.props.confirmLoaded();
        }
    }


    shuffle()
    {
        let currentCards = [...this.state.cards];
        let shuffledCards = [];
        this.state.cards.forEach(card => {
        let counter = currentCards.splice((Math.random() * currentCards.length), 1)[0];
        shuffledCards.push(<Card key={card.key} id={counter.key} item={card.props.item} select={this.props.clickHandler} />);
        });
        this.setState({'cards':shuffledCards})
    }

    componentWillUnmount()
    {
        this.props.onRef(undefined);
    }

    render()
    {
        return (
            <Fragment>{this.state.cards}</Fragment>
        )
    }
}

export default hot(module)(Deck)