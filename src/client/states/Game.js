/* globals __DEV__ */
import Phaser from 'phaser'
import Card from '../sprites/Card'
import Player from '../model/Player'
import { getCookie , postJoin, postJouer} from '../utils'
import clientSocket from '../socket.js';
import axios from 'axios';


const TOKEN = getCookie('id_token');
const USERNAME = getCookie('username');

export default class extends Phaser.State {

  init(player,currentOldCards) {
    game.add.image(game.world.centerX,game.world.centerY,'TapisDeJeu').anchor.set(0.5);
    this.player = player;
    this.oldCards = currentOldCards;
  }

  preload() { }

  create() {
  // axios.defaults.headers.common['Authorization'] = 'JWT ' + getCookie('id_token');
    //this.whenInit();
    this.timer = "En Attente";
    this.timerGame;
    this.createTextTimer(game.world.centerX-200,game.world.centerY-200,this.timer,40,'#FFFFFF')

    postJoin(TOKEN)
      .then(response => {
        console.log(response.data.message)
      });//.catch(err => console.error(err));

    if (!this.play){
      this.play = clientSocket(
        this.whenInit.bind(this), // whenInit data: { startTime }
        this.whenStart.bind(this),
        this.whenUpdateBoard.bind(this), // whenUpdateBoard
        this.whenFinish.bind(this)
      );
    }
    /*------------------------------------------------
    |     Creation of card, and affectate logos      |
    ------------------------------------------------*/
    this.currentCards = {
      middleCard : [8,9,10,11,12,13,14,15],
      player1 : [1,2,3,4,5,6,7,8],
      player2 : [1,2,3,4,5,6,7,8],
      player3 : [1,2,3,4,5,6,7,8],
      player4 : [1,2,3,4,5,6,7,8],
      player5 : [1,2,3,4,5,6,7,8],
      player6 : [1,2,3,4,5,6,7,8],
      player7 : [1,2,3,4,5,6,7,8],
      player8 : [1,2,3,4,5,6,7,8]
    }
    if(!this.oldCards){
      this.oldCards = {
        middleCard : [8,9,10,11,12,13,14,15],
        player1 : [1,2,3,4,5,6,7,8],
        player2 : [1,2,3,4,5,6,7,8],
        player3 : [1,2,3,4,5,6,7,8],
        player4 : [1,2,3,4,5,6,7,8],
        player5 : [1,2,3,4,5,6,7,8],
        player6 : [1,2,3,4,5,6,7,8],
        player7 : [1,2,3,4,5,6,7,8],
        player8 : [1,2,3,4,5,6,7,8]
      }
    }


    this.x1 = 0;
    this.y1 = 0;
    this.xBlank = 0;
    this.yBlank = 0;

    this.nbPlayer = 0;

    this.click = false;

    this.tabOpponentCard = new Array();

    if(!this.player){
    //CARD PLAYER
      this.player = new Player({
        game:this.game,
        x:game.world.centerX,
        y:game.world.centerY+215,
        assets:null
      },"Player1", 1);
    }

    // this.createPlayerCard();
    // this.createMiddleCard();

     //Sens trigonométrique à partir de la carte du joueur

     // var opponentCard1 = new Card({
     //   game:this.game,
     //   x:game.world.centerX+175,
     //   y:game.world.centerY+95,
     //   asset:'cardOpponent'
     // },"Opponent1"
     // ,this.createBlankCircle(game.world.centerX+175, game.world.centerY+95,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard1);
     //
     // var opponentCard2 = new Card({
     //   game:this.game,
     //   x:game.world.centerX+200,
     //   y:game.world.centerY-30,
     //   asset:'cardOpponent'
     // },"Opponent2"
     // ,this.createBlankCircle(game.world.centerX+200, game.world.centerY-30,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard2);
     //
     // var opponentCard3 = new Card({
     //   game:this.game,
     //   x:game.world.centerX+175,
     //   y:game.world.centerY-155,
     //   asset:'cardOpponent'
     // },"Opponent3"
     // ,this.createBlankCircle(game.world.centerX+175, game.world.centerY-155,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard3);
     //
     // var opponentCard4 = new Card({
     //   game:this.game,
     //   x:game.world.centerX,
     //   y:game.world.centerY-235,
     //   asset:'cardOpponent'
     // },"Opponent4"
     // ,this.createBlankCircle(game.world.centerX, game.world.centerY-235,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard4);
     //
     // var opponentCard5 = new Card({
     //   game:this.game,
     //   x:game.world.centerX-175,
     //   y:game.world.centerY-155,
     //   asset:'cardOpponent'
     // },"Opponent5"
     // ,this.createBlankCircle(game.world.centerX-175, game.world.centerY-155,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard5);
     //
     // var opponentCard6 = new Card({
     //   game:this.game,
     //   x:game.world.centerX-200,
     //   y:game.world.centerY-30,
     //   asset:'cardOpponent'
     // },"Opponent6"
     // ,this.createBlankCircle(game.world.centerX-200, game.world.centerY-30,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard6);
     //
     // var opponentCard7 = new Card({
     //   game:this.game,
     //   x:game.world.centerX-175,
     //   y:game.world.centerY+95,
     //   asset:'cardOpponent'
     // },"Opponent7"
     // ,this.createBlankCircle(game.world.centerX-175, game.world.centerY+95,'cardOpponent'));
     //
     // this.tabOpponentCard.push(opponentCard7);
     //
     // for (var i = 0;i<this.tabOpponentCard.length;i++){
     //   for(var i2 = 0; i2<=8; i2++){
     //     this.determineOpponentLogoLocation(i2,this.x1,this.y1);
     //     this.createSpriteLogo(this.tabOpponentCard[i].x+this.x1,this.tabOpponentCard[i].y+this.y1,this.currentCards.player1[i2],(game.rnd.integerInRange(5,7)/100));
     //   }
     // }

     /*-----------------------------------------------
     |             Game timer creation                |
     ------------------------------------------------*/

     // this.timerGame = game.time.create(false);
     // this.timerGame.add(10000,function(){
     //   this.state.start('EndScreen',true,false,this.playerCard);
     // },this);
     // this.timerGame.start();

  }

  update(){
    if(this.click == true){
      this.playerCard.player.incrementPoint();
      this.click = false;
      this.state.restart(true,false,this.player,this.currentCards);
    }
    // this.getTimer();
    // this.timerGame.text = this.timer;
    if(this.timer != "En Attente")
      this.timerGame.setText(((this.timer-Date.now())/1000).toString());

  }

  createSpriteLogo(x,y,key,scale){

    var sprite = this.game.add.sprite(x,y,key);
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.angle = game.rnd.integer();
  }

  createButtonLogo(x,y,key,scale){
    var sprite = this.game.add.button(x,y,key,() => postJouer(TOKEN,key),this);
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.angle = game.rnd.integer();
  }

  createBlankCircle(x,y,key){
    var blankCircle = game.add.sprite(x,y,key,name);
    if(name){
      var username = game.add.createText(x,y,name);
      username.fill = '#000000';
    }
    blankCircle.anchor.set(0.5);
  }

  createPlayerCard(player){
    this.playerCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY+215,
       asset:'cardPlayer'
     },this.player
     ,this.createBlankCircle(game.world.centerX, game.world.centerY+215,'cardPlayer',this.player.pseudo)
     ,this.currentCards.player1);

     for(var i = 0; i<=8; i++){
       this.determinePlayerLogoLocation(i,this.x1,this.y1);
       this.createSpriteLogo(this.playerCard.x+this.x1,this.playerCard.y+this.y1,player.card[i],(game.rnd.integerInRange(9,12)/100));
     }
  }

  createMiddleCard(obj){
     this.deckCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY-30,
       asset:'cardDeck'
     },"Deck"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY-30,'cardDeck')
     ,this.currentCards.middleCard);

     for(var i = 0; i<=8; i++){
       this.determineDeckLogoLocation(i,this.x1,this.y1);
       this.createButtonLogo(this.deckCard.x+this.x1,this.deckCard.y+this.y1,obj.middleCard[i],(game.rnd.integerInRange(16,20)/100));
     }
  }

  createOpponentCard(opponent){
    var opponentCard = new Card({
      game:this.game,
      x:game.world.centerX+this.xBlank,
      y:game.world.centerY+this.yBlank,
      asset:'cardOpponent'
    },"Opponent1"
    ,this.createBlankCircle(game.world.centerX+this.xBlank, game.world.centerY+this.yBlank,'cardOpponent'));

      for(var i = 0; i<=8; i++){
        this.determineOpponentLogoLocation(i,this.x1,this.y1);
        this.createSpriteLogo(opponentCard.x+this.x1,opponentCard.y+this.y1,opponent.card[i],(game.rnd.integerInRange(5,7)/100));
      }
    }


  createTextTimer(x,y,text,size,color){
    this.timerGame = game.add.text(x,y,text);
    this.timerGame.fontSize = size;
    this.timerGame.fill = color;
    this.timerGame.anchor.setTo(0.5);
  }

  determineDeckLogoLocation(i,x1,y1){
      switch(i){
        case 0 :
        this.x1 = -65;
        this.y1 = -65;
        break;

        case 1 :
        this.x1 = 0;
        this.y1 = -70;
        break;

        case 2 :
        this.x1 = 65;
        this.y1 = -65;
        break;

        case 3 :
        this.x1 = -32;
        this.y1 = 0;
        break;

        case 4 :
        this.x1 = 32;
        this.y1 = 0;
        break;

        case 5 :
        this.x1 = -65;
        this.y1 = 65;
        break;

        case 6 :
        this.x1 = 0;
        this.y1 = 70;
        break;

        case 7 :
        this.x1 = 65;
        this.y1 = 65;
        break;

        default :
        this.x1 = 0;
        this.y1 = 0;
      }
  }

  determinePlayerLogoLocation(i,x1,y1){
      switch(i){
        case 0 :
        this.x1 = -45;
        this.y1 = -45;
        break;

        case 1 :
        this.x1 = 0;
        this.y1 = -50;
        break;

        case 2 :
        this.x1 = 45;
        this.y1 = -45;
        break;

        case 3 :
        this.x1 = -20;
        this.y1 = 0;
        break;

        case 4 :
        this.x1 = 20;
        this.y1 = 0;
        break;

        case 5 :
        this.x1 = -45;
        this.y1 = 45;
        break;

        case 6 :
        this.x1 = 0;
        this.y1 = 50;
        break;

        case 7 :
        this.x1 = 45;
        this.y1 = 45;
        break;

        default :
        this.x1 = 0;
        this.y1 = 0;
      }
  }

  determineOpponentLogoLocation(i,x1,y1){
      switch(i){
        case 0 :
        this.x1 = -25;
        this.y1 = -25;
        break;

        case 1 :
        this.x1 = 0;
        this.y1 = -28;
        break;

        case 2 :
        this.x1 = 25;
        this.y1 = -25;
        break;

        case 3 :
        this.x1 = -12;
        this.y1 = 0;
        break;

        case 4 :
        this.x1 = 12;
        this.y1 = 0;
        break;

        case 5 :
        this.x1 = -25;
        this.y1 = 25;
        break;

        case 6 :
        this.x1 = 0;
        this.y1 = 28;
        break;

        case 7 :
        this.x1 = 25;
        this.y1 = 25;
        break;

        default :
        this.x1 = 0;
        this.y1 = 0;
      }
  }

  determineBlankLocation(i){
    switch(i){
      case 0:
      this.xBlank=175;
      this.yBlank=95;
      break;

      case 1:
      this.xBlank=200;
      this.yBlank=-30;
      break;

      case 2:
      this.xBlank=175;
      this.yBlank=-155;
      break;

      case 3:
      this.xBlank=0;
      this.yBlank=-235;
      break;

      case 4:
      this.xBlank=-175;
      this.yBlank=-155;
      break;

      case 5:
      this.xBlank=-200;
      this.yBlank=-30;
      break;

      case 6:
      this.xBlank=-175;
      this.yBlank=95
      break;
    }
  }

  compareLogos(logoClickDeck){
    for(var i = 0; i<this.playerCard.logos.length; i++){
      if(this.playerCard.logos[i]==logoClickDeck){
        this.click = true;
      }
    }
    if(this.click == false){
      this.playerCard.player.decrementPoint();
    }
  }


  whenInit(obj){
    this.timer = obj.startTime;
    // this.timerGame = game.time.create(false);
    // this.timerGame.add(this.timer,function(){},this);
    // this.timerGame.start();
  }

  whenStart(obj){
    //console.log(obj);
    this.timer = obj.endTime;
    this.createMiddleCard(obj);
    obj.players.forEach(player => {
      //console.log("TESTTTTT");
      if(player.username == USERNAME){
        this.createPlayerCard(player);
      }else{
        this.determineBlankLocation(this.nbPlayer);
        this.createOpponentCard(player);
        this.nbPlayer++;
      }
    })
    this.nbPlayer = 0;
  }

  whenUpdateBoard(obj){
    this.timer = obj.endTime;
    this.createMiddleCard(obj);
    obj.players.forEach(player => {
      //console.log("TESTTTTT");
      if(player.username == USERNAME){
        this.createPlayerCard(player);
      }else{
        this.determineBlankLocation(this.nbPlayer);
        this.createOpponentCard(player);
        this.nbPlayer++;
      }
    })
    this.nbPlayer = 0;
  }

  whenFinish(obj){
    //this.timer = obj.endTime;
    this.state.start('EndScreen');
  }

  // join(){
  //   axios.post("localhost:7777/game/join", { Header: Authorization: 'JWT' TOKEN})
  //     .then()
  // }

  // whenStart(){
  //   var obj;
  //   axios.get()
  // }

  requestServer(){
    fetch('http://gi1.univ-lr.fr:7777')
      .then(res => res.json())
      .then(res => {
        res.forEach(idImage => {
          this.load.spritesheet(idImage.toString(),PATHAPI+idImage);
        });
        return true;
      })
      .then(res => fetchingImages = res)
  }

  render(){
    if(this.timerGame){
      game.debug.text('Time until event: ' + this.timerGame.text, 32, 32);
    }
    //game.debug.text('Points joueur :' + this.playerCard.player.points, 32, 64);
    game.debug.text('cookie token : ' + getCookie('id_token'), 32, 80);
  }

}
