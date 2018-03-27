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

  init(player) {
    game.add.image(game.world.centerX,game.world.centerY,'TapisDeJeu').anchor.set(0.5);
    this.player = player;
  }

  preload() { }

  create() {

    this.timer = "En Attente";
    this.timerGame;
    this.createTextTimer(game.world.centerX+320,game.world.centerY-200,this.timer,40,'#FFFFFF')

    this.scorePlayer;
    this.scoreText = 0
    this.createTextScore(game.world.centerX-320,game.world.centerY-200,'Score : '+this.scoreText,40,'#FFFFFF')

    this.music = game.add.audio('MainMenuMusic');

    if (!this.play){
      this.play = clientSocket(
        this.whenInit.bind(this),
        this.whenStart.bind(this),
        this.whenUpdateScore.bind(this),
        this.whenUpdateBoard.bind(this),
        this.whenFinish.bind(this)
      );
    }

    this.x1 = 0;
    this.y1 = 0;
    this.xBlank = 0;
    this.yBlank = 0;

    this.nbPlayer = 0;

    if(!this.player){
      this.player = new Player({
        game:this.game,
        x:game.world.centerX,
        y:game.world.centerY+215,
        assets:null
      },"Player1", 1);
    }
  }

  update(){
    if(this.timer != "En Attente")
      this.timerGame.setText('Temps restant : '+((this.timer-Date.now())/1000).toFixed(0).toString());
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
     ,player.card);

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
     ,obj.middleCard);

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

  createTextScore(x,y,text,size,color){
    this.scorePlayer = game.add.text(x,y,text)
    this.scorePlayer.fontSize = size;
    this.scorePlayer.fill = color;
    this.scorePlayer.anchor.setTo(0.5);
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

  whenInit(obj){
    this.timer = obj.startTime;
  }

  whenStart(obj){
    this.timer = obj.endTime;
    this.music.play()
    this.createMiddleCard(obj);
    obj.players.forEach(player => {
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
      if(player.username == USERNAME){
        this.scorePlayer.setText('Score :'+player.score);
        this.createPlayerCard(player);
      }else{
        this.determineBlankLocation(this.nbPlayer);
        this.createOpponentCard(player);
        this.nbPlayer++;
      }
    })
    this.nbPlayer = 0;
  }

  whenUpdateScore(player){
    if(player.username == USERNAME){
        this.scorePlayer.setText('Score :'+player.score)
    }
  }

  whenFinish(obj){
    obj.players.forEach(playerEnd => {
      if(playerEnd.username == USERNAME){
        this.music.stop();
        this.state.start('EndScreen',true,false,playerEnd.score,playerEnd.rank);
      }
    })
  }


}
