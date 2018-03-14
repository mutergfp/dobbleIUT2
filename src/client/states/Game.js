/* globals __DEV__ */
import Phaser from 'phaser'
import Card from '../sprites/Card'

export default class extends Phaser.State {
  init() {
    game.add.image(game.world.centerX,game.world.centerY, 'TapisDeJeu').anchor.set(0.5);
  }
  preload() { }

  create() {

    this.listLogoPlayer = new Array();
    this.listLogoPlayer.push('android')
    this.listLogoPlayer.push('anneau');
    this.listLogoPlayer.push('apple');
    this.listLogoPlayer.push('appstore');
    this.listLogoPlayer.push('bitcoin');
    this.listLogoPlayer.push('blizzard');
    this.listLogoPlayer.push('bluetooth');
    this.listLogoPlayer.push('c');

     var playerCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY+215,
       asset:'cardPlayer'
     },"Player1"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY+215,'cardPlayer'));

     for(var i = 0; i<8; i++){
       this.createSpriteLogo(playerCard.x,playerCard.y,this.listLogoPlayer[i]);
     }
     //playerCard.displayCard(playerCard.x,playerCard.y,this.listLogoPlayer);

     var deckCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY-30,
       asset:'cardDeck'
     },"Deck"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY-30,'cardDeck'));

     //Sens trigonométrique à partir de la carte du joueur
     var opponentCard1 = new Card({
       game:this.game,
       x:game.world.centerX+175,
       y:game.world.centerY+95,
       asset:'cardOpponent'
     },"Opponent1"
     ,this.createBlankCircle(game.world.centerX+175, game.world.centerY+95,'cardOpponent'));

     var opponentCard2 = new Card({
       game:this.game,
       x:game.world.centerX+200,
       y:game.world.centerY-30,
       asset:'cardOpponent'
     },"Opponent2"
     ,this.createBlankCircle(game.world.centerX+200, game.world.centerY-30,'cardOpponent'));

     var opponentCard3 = new Card({
       game:this.game,
       x:game.world.centerX+175,
       y:game.world.centerY-155,
       asset:'cardOpponent'
     },"Opponent3"
     ,this.createBlankCircle(game.world.centerX+175, game.world.centerY-155,'cardOpponent'));

     var opponentCard4 = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY-235,
       asset:'cardOpponent'
     },"Opponent4"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY-235,'cardOpponent'));

     var opponentCard5 = new Card({
       game:this.game,
       x:game.world.centerX-175,
       y:game.world.centerY-155,
       asset:'cardOpponent'
     },"Opponent5"
     ,this.createBlankCircle(game.world.centerX-175, game.world.centerY-155,'cardOpponent'));

     var opponentCard6 = new Card({
       game:this.game,
       x:game.world.centerX-200,
       y:game.world.centerY-30,
       asset:'cardOpponent'
     },"Opponent6"
     ,this.createBlankCircle(game.world.centerX-200, game.world.centerY-30,'cardOpponent'));

     var opponentCard7 = new Card({
       game:this.game,
       x:game.world.centerX-175,
       y:game.world.centerY+95,
       asset:'cardOpponent'
     },"Opponent7"
     ,this.createBlankCircle(game.world.centerX-175, game.world.centerY+95,'cardOpponent'));

  }


  createSpriteLogo(x,y,key){
    var sprite = this.game.add.sprite(x,y,key);
    sprite.scale.set(0.05);
    sprite.anchor.set(0.5);
  }

  createBlankCircle(x,y,key){
    var blankCircle = game.add.sprite(x,y,key);
    blankCircle.anchor.set(0.5);
  }


}
