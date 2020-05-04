
import React, { Component, Fragment} from "react";
import {hot} from "react-hot-loader";

import Title from "./Title.jsx";
import ScoreTable from './ScoreTable.jsx';
import DialogueBox from "./DialogueBox.jsx";
import Timer from './Timer.jsx';
import Deck from './Deck.jsx';
import Loading from "./Loading.jsx";

import title from "../../images/title2.png";
import background from "../../images/background.png";


// import "../../css/gamescreen.css";
// import "../../css/app.css";
import "../../css/desktop.css";
import "../../css/mobile.css";
// import "../../css/timer.css";
// import "../../images/button_dark.png";



class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      selected: [],
      time: 30,
      starExpiration: 0,
      result: '',
      tutorialStep: 0
    };
    
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

    this.deck = null;
    this.timer = null;

    this.select = this.select.bind(this);
    this.watchTime = this.watchTime.bind(this);
    this.continueTutorial = this.continueTutorial.bind(this);
  }

  componentDidMount()
  {
    this.props.loadImages([title, background]);
  }

  componentDidUpdate()
  {
    if (this.state.tutorialStep !== this.props.tutorial.step)
    {
      this.setState({'tutorialStep': this.props.tutorial.step});
      this.continueTutorial();
    }
  }


  watchTime(currentTime)
  {
    this.setState({currentTime})

    if (currentTime === this.state.starExpiration)
    this.setState({'starExpiration': 0});
  }




  continueTutorial()
  {
    if (!this.props.tutorial.on || this.props.tutorial.step === 0)
    {
      return false;
    }

    // console.log('in continueTutorial(); this.props.tutorial.step: ',this.props.tutorial.step);
    switch (this.props.tutorial.step)
      {
        case 1: {
          this.state.matches.forEach(card=>card.unhighlight());

          let addTimeCards = this.deck.state.cards.filter(card => card.props.item === 'mushroom_red');
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 1000);

          setTimeout(()=>addTimeCards = this.deck.state.cards.filter(card => card.props.item === 'mushroom_green'), 1400);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 1500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 2000);

          setTimeout(()=>addTimeCards = this.deck.state.cards.filter(card => card.props.item === 'flower'), 2400);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[0].props.id).click(), 2500);
          setTimeout(()=>document.querySelector("#card" + addTimeCards[1].props.id).click(), 3000);

          setTimeout(()=>{
            this.timer.pause();
            this.props.toggleOverlay();
          }, 4000);
        }
        break;
        case 2: {
          this.state.matches.forEach(card=>card.unhighlight());

          this.timer.pause();

          let subtractTimeCards = this.deck.state.cards.filter(card => card.props.item === 'koopa_red');
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 1000);

          setTimeout(()=>subtractTimeCards = this.deck.state.cards.filter(card => card.props.item === 'koopa_green'), 1400);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 1500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 2000);

          setTimeout(()=>subtractTimeCards = this.deck.state.cards.filter(card => card.props.item === 'koopa_blue'), 2400);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[0].props.id).click(), 2500);
          setTimeout(()=>document.querySelector("#card" + subtractTimeCards[1].props.id).click(), 3000);

          setTimeout(()=>{
            this.timer.pause();
            this.props.toggleOverlay();
          }, 4000);
        }
        break;
        case 4: {
          this.state.matches.forEach(card=>card.unhighlight());

          this.timer.pause();

          let shuffleCard = this.deck.state.cards.filter(card => card.props.item === 'koopa_magic');
          setTimeout(()=>document.querySelector("#card" + shuffleCard[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + shuffleCard[1].props.id).click(), 1000);

          setTimeout(()=>{
            this.timer.pause();
            this.props.toggleOverlay();
          }, 2000);
        }
        break;
        case 5: {
          this.state.matches.forEach(card=>card.unhighlight());

          this.timer.pause();

          let starCard = this.deck.state.cards.filter(card => card.props.item === 'star');
          setTimeout(()=>document.querySelector("#card" + starCard[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + starCard[1].props.id).click(), 1000);

          setTimeout(()=>{
            this.timer.pause();
            this.props.toggleOverlay();
          }, 2000);
        }
        break;
        case 7: {
          this.state.matches.forEach(card=>card.unhighlight());

          this.timer.pause();

          let bowserCard = this.deck.state.cards.filter(card => card.props.item === 'bowser');
          setTimeout(()=>document.querySelector("#card" + bowserCard[0].props.id).click(), 500);
          setTimeout(()=>document.querySelector("#card" + bowserCard[1].props.id).click(), 1000);
        }
      }
  }


  gameOver()
  {
    this.timer.pause();
    if (this.state.time === 0 || this.state.starExpiration === 0)
    {
      this.setState({'result':'lose'})
    } else {
      this.setState({'result':'win'})
    }
  }


  select(card)
  {
    const selected = this.state.selected;
    const matches = this.state.matches;

    if (selected.length === 2 || this.state.result) {
      return false;
    } else if (!this.props.tutorial.on) {
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


  effect(value)
  {
    let time = 0;
    let starPower = false;

    switch(value.props.item) {
      case 'koopa_red': time = -5
      break;
      case 'koopa_blue': time = -5
      break;
      case 'koopa_green': time = -5
      break;
      case 'koopa_magic': this.deck.shuffle();
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

    this.timer.addTime(time);

    if (starPower) {
      {
        let starExpiration = parseInt(this.state.time) - 5;

        this.setState({starExpiration});
      }
    }
  }

  render()
  {
    if (!this.props.loaded)
    {
      return (
        <Loading />
      )
    }

//_____________________________________________________________________________________________

    if (!this.props.play)
    {
      return ( 
        <Title loaded={this.props.loaded} toggleOverlay={this.props.toggleOverlay} />
      )
    }

//_____________________________________________________________________________________________

    const aside_cards = {
      mushroom_red: <div className="card mushroom_red" />,
      mushroom_green: <div className="card mushroom_green" />,
      flower: <div className="card flower" />,
      koopa_red: <div className="card koopa_red" />,
      koopa_green: <div className="card koopa_green" />,
      koopa_blue: <div className="card koopa_blue" />,
      star: <div className="card star" />,
      bowser: <div className="card bowser no" />
    }

    this.state.matches.forEach( match => {
      aside_cards[match.props.item] = <div className={"card " + match.props.item + ' hide'} />;
    })

    if (this.state.starExpiration !== 0) {
      aside_cards['bowser'] = <div className="card bowser" />
    }

    let dialogue = null;
    if (this.props.tutorial.on && this.props.displayOverlay)
    {
      if (this.props.tutorial.message[this.props.tutorial.step - 1])
      dialogue = <DialogueBox text={this.props.tutorial.message[this.props.tutorial.step - 1]}/>;
    }

    return (
      <div id="game">
        <aside>
          {dialogue}
          <header>
            <Timer seconds={this.state.time}
                    watchTime={this.watchTime}
                    onRef={ref => (this.timer = ref)}/>
          </header>
          <div className="row">
            <div>+10s</div>
            {aside_cards['mushroom_red']}
            {aside_cards['mushroom_green']}
            {aside_cards['flower']}
          </div>
          <div className="row">
            <div>-5s</div>
            {aside_cards['koopa_red']}
            {aside_cards['koopa_green']}
            {aside_cards['koopa_blue']}
          </div>
          <div className="row">
            {aside_cards['star']}
            <div>></div>
            {aside_cards['bowser']}
          </div>
        </aside>
        <main>
          <section>
            <Deck size={18}
                  cards={this.itemList}
                  clickHandler={this.select}
                  confirmLoaded={this.props.nextTutorialStep}
                  onRef={ref => (this.deck = ref)}/>
          </section>
        </main>
        
        <ScoreTable  win={this.state.result}
                      matches={this.state.matches}
                      time={this.state.currentTime}/>
      </div>
    )
  }
}

export default hot(module)(Game);
