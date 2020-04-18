
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";
import "../../css/gamescreen.css";
import Card from './Card.jsx';
import Timer from './Timer.jsx';
import "../../css/timer.css";
import Reset from './Reset.jsx';
import "../../images/button_dark.png";
import Endscreen from './Endscreen.jsx';
import Tutorial from "./Tutorial.jsx";


class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      cards: [],
      matches: [],
      selected: [],
      time: {
        initialSeconds: 30 + new Date().getSeconds(),
        intitalMinutes: new Date().getMinutes(),
        initialHours: new Date().getHours(),
        initialDate: new Date().getDate(),
            seconds: 30,
     starExpiration: 0,
              pause: false,
              pausedTime: 0,
              timeEffect: []
      },
      tutorial: {
          on: true,
        step: 0,
        message:  ['Any of these cards will add time',
                   'Any of these cards will subtract time',
                   'This card will shuffle all cards',
                   'You have 5 seconds to match Bowser']
      },
      result: ''
    }
    this.itemList = [
      'flower',
      'mushroom_green',
      'mushroom_red',
      'koopa_green',
      'koopa_red',
      'koopa_blue',
      'koopa_magic',
      'star',
      'bowser'
    ];
    this.select = this.select.bind(this);
    this.effect = this.effect.bind(this);
    this.tick = this.tick.bind(this);
    this.loadCards = this.loadCards.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    this.loadCards(true);
  }

  componentDidUpdate() {
    if (this.state.tutorial.on && this.state.tutorial.step === 0)
    {
      this.nextStep();
    }
  }

  loadCards(tutorial) {
    const cards = [];
    const itemList = this.itemList.concat(this.itemList);

    for (let counter = 1; counter <= 18; counter++)
    {
        let randomItem = itemList.splice([Math.floor(Math.random() * itemList.length)], 1)[0];

        let card = <Card key={counter} id={counter} item={randomItem} select={this.select} effect={this.effect} />;
        cards.push(card);
        this.state.selected.forEach(selectedCard => selectedCard.reset());
        this.state.matches.forEach(matchedCard => matchedCard.reset());
    }

    this.setState({
      cards,
      'matches': [],
      'selected': [],
      'time': {
        initialSeconds: 30 + new Date().getSeconds(),
        intitalMinutes: new Date().getMinutes(),
        initialHours: new Date().getHours(),
        initialDate: new Date().getDate(),
            seconds: 30,
     starExpiration: 0,
              pause: false,
              pausedTime: 0,
              timeEffect: []
      },
      'tutorial': {
          on: tutorial,
        step: 0,
        message:  ['Any of these cards will add time',
                   'Any of these cards will subtract time',
                   'This card will shuffle all cards',
                   'You have 5 seconds to match Bowser']
      },
      'result': ''
    });
  }


  shuffle() {
    let currentCards = [...this.state.cards];
    let shuffledCards = [];
    this.state.cards.forEach(card => {
      let counter = currentCards.splice((Math.random() * currentCards.length), 1)[0];
      shuffledCards.push(<Card key={card.key} id={counter.key} item={card.props.item} select={this.select} effect={this.effect} />);
    });
    this.setState({'cards':shuffledCards})
  }

  pause(input) {
    if (input) {
      this.setState({'time': {
        ...this.state.time,
        pause: true
      }});
    } else {
      let addTime = this.state.time.pausedTime;
      this.setState({'time': {
        ...this.state.time,
        initialSeconds: this.state.time.initialSeconds + addTime,
        pause: false,
      }});
    }
  }


  nextStep() {
    this.pause(false);
    let tutorialStep = ++this.state.tutorial.step;
    this.setState({'tutorial':{...this.state.tutorial, 'step':tutorialStep}});

    this.state.matches.forEach(card=>card.unhighlight());



    switch (this.state.tutorial.step)
      {
        case 1: {
          let addTimeCards = this.state.cards.filter(card => card.props.item === 'mushroom_red');
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 1000);

          setTimeout(()=>addTimeCards = this.state.cards.filter(card => card.props.item === 'mushroom_green'), 1100);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 1500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 2000);

          setTimeout(()=>addTimeCards = this.state.cards.filter(card => card.props.item === 'flower'), 2100);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 2500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 3000);

          setTimeout(()=>this.pause(true), 4000);
        }
        break;
        case 2: {
          let subtractTimeCards = this.state.cards.filter(card => card.props.item === 'koopa_red');
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 1000);

          setTimeout(()=>subtractTimeCards = this.state.cards.filter(card => card.props.item === 'koopa_green'), 1100);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 1500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 2000);

          setTimeout(()=>subtractTimeCards = this.state.cards.filter(card => card.props.item === 'koopa_blue'), 2100);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 2500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 3000);

          setTimeout(()=>this.pause(true), 4000);
        }
        break;
        case 3: {
          let shuffleCard = this.state.cards.filter(card => card.props.item === 'koopa_magic');
          setTimeout(()=>document.querySelector("#card" + shuffleCard[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + shuffleCard[1].props.id).click(), 1000);

          setTimeout(()=>this.pause(true), 2000);
        }
        break;
        case 4: {
          let endCards = this.state.cards.filter(card => card.props.item === 'star');
          setTimeout(()=>document.querySelector("#card" + endCards[0].props.id).click(), 800);
          setTimeout(()=>document.querySelector("#card" + endCards[1].props.id).click(), 1300);

          setTimeout(()=>endCards = this.state.cards.filter(card => card.props.item === 'bowser'), 1400);
          setTimeout(()=>document.querySelector("#card" + endCards[0].props.id).click(), 1600);
          setTimeout(()=>document.querySelector("#card" + endCards[1].props.id).click(), 1900);

          setTimeout(()=>this.pause(true), 2600);
        }
        break;
      }
  }


  gameOver() {
    if (this.state.time.seconds === 0 || this.state.time.starExpiration === 0)
    {
      this.setState({'result':'lose'})
    } else {
      this.setState({'result':'win'})
    }
  }





  select(card) {
    const selected = this.state.selected;
    const matches = this.state.matches;

    if (selected.length === 2 || this.state.result) {
      return false;
    } else if (!this.state.tutorial.on) {
      this.state.matches.forEach(card=>card.unhighlight());
    }

    selected.push(card);
    this.setState({selected});

    if (selected.length === 2) {
      if (selected[0].props.item !== selected[1].props.item) {
        setTimeout(()=>{
          selected.forEach(card => {
            card.reset();
          });
        }, 800);
      } else {
        selected.forEach(selectedCard => {
          matches.push(selectedCard);
        });
        this.setState({matches});
        this.effect(selected[0]);
      }
      this.setState({'selected': []});

    }
    return true;
  }




  tick() {
    if (this.state.time.seconds === 0)
    {
      this.gameOver();
    }
    else if (this.state.time.seconds === this.state.time.starExpiration)
    {
      this.setState({'time': {...this.state.time, 'starExpiration': 0}});
    }

    let daysPassed = new Date().getDate() - this.state.time.initialDate;
    let hoursPassed = (daysPassed * 24) + new Date().getHours() - this.state.time.initialHours;
    let minutesPassed = (hoursPassed * 60) + new Date().getMinutes() - this.state.time.intitalMinutes;
    let time = this.state.time.initialSeconds - (new Date().getSeconds() + (minutesPassed * 60));

    if (this.state.result === '' && this.state.time.pause === false)
    {
        this.setState({'time': {...this.state.time, 'seconds': time}});
    }
    else if (this.state.time.pause !== false)
    {
      this.setState({
        'time': {
          ...this.state.time,
          'pausedTime': (new Date().getSeconds() + (minutesPassed * 60)) - this.state.time.initialSeconds + this.state.time.seconds
        }
      });
    }
    else
    {
      clearInterval(this.timerID);
    }
  }




  effect(value) {
    let time = 0;
    let starPower = false;
    let initialSeconds = 0;
    let starExpiration = 0;

    switch(value.props.item) {
      case 'koopa_red': time = -5
      break;
      case 'koopa_blue': time = -5
      break;
      case 'koopa_green': time = -5
      break;
      case 'koopa_magic': this.shuffle();
      break;
      case 'mushroom_red': time = 10
      break;
      case 'mushroom_green': time = 10
      break;
      case 'flower': time = 10
      break;
      case 'star': starPower = true;
      break;
      case 'bowser': this.gameOver();
    }

    let timeEffect = this.state.time.timeEffect;
    timeEffect.push(time);

    initialSeconds = parseInt(this.state.time.initialSeconds) + time;
    if (parseInt(this.state.time.starExpiration) > 0) {starExpiration = parseInt(this.state.time.starExpiration) + time;}

    if (initialSeconds < 0) {initialSeconds = 0}

    this.setState({
      'time': {
        ...this.state.time,
        initialSeconds,
        timeEffect,
        starExpiration
      }
    });

    // setTimeout(()=>{
    //   this.setState({
    //     'time': {
    //       ...this.state.time,
    //       'timeEffect': this.state.time.timeEffect.slice(1, -0)
    //     }
    //   })
    // }, 1000);

    if (starPower) {
      {
        let starExpiration = parseInt(this.state.time.seconds) - 5;
        this.setState({'time': {...this.state.time, 'starExpiration': starExpiration}});
      }
    }
  }

  render(){
    let tutorial = null;
    if (this.state.tutorial.on) {
      tutorial = <Tutorial nextStep={this.nextStep} message={this.state.tutorial.message[this.state.tutorial.step - 1]} pause={this.state.time.pause} />;
    }


    return(
      <main id="game">
        {tutorial}
          <section>
            <Reset reset={this.loadCards}></Reset>
            <Timer time={this.state.time.seconds} tick={this.tick} timeEffect={this.state.time.timeEffect} starPower={this.state.time.starPower}></Timer>
            {this.state.cards}
            <Endscreen tutorial={this.state.tutorial} win={this.state.result} playAgain={this.loadCards} matches={this.state.matches} time={this.state.time.seconds}></Endscreen>
          </section>
      </main>
    )
  }
}

export default hot(module)(Game);
