/* globals __DEV__ */
import Phaser from 'phaser'
import Card from '../sprites/Card'

export default class extends Phaser.State {
  
  init() {
    game.add.image(game.world.centerX,game.world.centerY,'TapisDeJeu').anchor.set(0.5);
  }
  preload() { }

  create() {

    /*------------------------------------------------
    |     Creation of card, and affectate logos      |
    ------------------------------------------------*/

    this.listLogoPlayer = [1,2,3,4,5,6,7,8];
    this.listLogoDeck = [8,9,10,11,12,13,14,15];

    this.x1 = 0;
    this.y1 = 0;

    this.click = false;

    var tabOpponentCard = new Array();

     var playerCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY+215,
       asset:'cardPlayer'
     },"Player1"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY+215,'cardPlayer')
     ,this.listLogoPlayer);

     for(var i = 0; i<=8; i++){
       this.determinePlayerLogoLocation(i,this.x1,this.y1);
       this.createSpriteLogo(playerCard.x+this.x1,playerCard.y+this.y1,playerCard.logos[i],0.12);
     }

     var deckCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY-30,
       asset:'cardDeck'
     },"Deck"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY-30,'cardDeck')
     ,this.listLogoDeck);

     for(var i = 0; i<=8; i++){
       this.determineDeckLogoLocation(i,this.x1,this.y1);
       this.createButtonLogo(deckCard.x+this.x1,deckCard.y+this.y1,deckCard.logos[i],0.20);
     }

     //Sens trigonométrique à partir de la carte du joueur

     var opponentCard1 = new Card({
       game:this.game,
       x:game.world.centerX+175,
       y:game.world.centerY+95,
       asset:'cardOpponent'
     },"Opponent1"
     ,this.createBlankCircle(game.world.centerX+175, game.world.centerY+95,'cardOpponent'));

     tabOpponentCard.push(opponentCard1);

     var opponentCard2 = new Card({
       game:this.game,
       x:game.world.centerX+200,
       y:game.world.centerY-30,
       asset:'cardOpponent'
     },"Opponent2"
     ,this.createBlankCircle(game.world.centerX+200, game.world.centerY-30,'cardOpponent'));

     tabOpponentCard.push(opponentCard2);

     var opponentCard3 = new Card({
       game:this.game,
       x:game.world.centerX+175,
       y:game.world.centerY-155,
       asset:'cardOpponent'
     },"Opponent3"
     ,this.createBlankCircle(game.world.centerX+175, game.world.centerY-155,'cardOpponent'));

     tabOpponentCard.push(opponentCard3);

     var opponentCard4 = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY-235,
       asset:'cardOpponent'
     },"Opponent4"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY-235,'cardOpponent'));

     tabOpponentCard.push(opponentCard4);

     var opponentCard5 = new Card({
       game:this.game,
       x:game.world.centerX-175,
       y:game.world.centerY-155,
       asset:'cardOpponent'
     },"Opponent5"
     ,this.createBlankCircle(game.world.centerX-175, game.world.centerY-155,'cardOpponent'));

     tabOpponentCard.push(opponentCard5);

     var opponentCard6 = new Card({
       game:this.game,
       x:game.world.centerX-200,
       y:game.world.centerY-30,
       asset:'cardOpponent'
     },"Opponent6"
     ,this.createBlankCircle(game.world.centerX-200, game.world.centerY-30,'cardOpponent'));

     tabOpponentCard.push(opponentCard6);

     var opponentCard7 = new Card({
       game:this.game,
       x:game.world.centerX-175,
       y:game.world.centerY+95,
       asset:'cardOpponent'
     },"Opponent7"
     ,this.createBlankCircle(game.world.centerX-175, game.world.centerY+95,'cardOpponent'));

     tabOpponentCard.push(opponentCard7);

     for (var i = 0;i<tabOpponentCard.length;i++){
       for(var i2 = 0; i2<=8; i2++){
         this.determineOpponentLogoLocation(i2,this.x1,this.y1);
         this.createSpriteLogo(tabOpponentCard[i].x+this.x1,tabOpponentCard[i].y+this.y1,this.listLogoPlayer[i2],0.07);
       }
     }

     /*-----------------------------------------------
     |             Game timer creation                |
     ------------------------------------------------*/

     this.timerGame = game.time.create(false);
     this.timerGame.add(10000,function(){
       this.state.start('EndScreen')
     },this);
     this.timerGame.start();

  }

  createSpriteLogo(x,y,key,scale){
    var sprite = this.game.add.sprite(x,y,key);
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.angle = game.rnd.integer();
  }

  createButtonLogo(x,y,key,scale){
    var sprite = this.game.add.button(x,y,key);
    sprite.callback = function(){
      this.click = this.compareLogos(sprite.key);
    }
    sprite.scale.set(scale);
    sprite.anchor.set(0.5);
    sprite.angle = game.rnd.integer();
  }

  createBlankCircle(x,y,key){
    var blankCircle = game.add.sprite(x,y,key);
    blankCircle.anchor.set(0.5);
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

  compareLogos(logoClickDeck){
    for(var i = 0; i<playerCard.logos.lenght; i++){
      if(listLogoPlayer[i]==logoClickDeck){
        return true;
      }
      else{
        return false;
      }
    }
  }

  update(){

  }

  render(){
    game.debug.text('Time until event: ' + this.timerGame.duration.toFixed(0), 32, 32);
    game.debug.text('GoodClick: ' + this.click, 32, 64);
  }
}
