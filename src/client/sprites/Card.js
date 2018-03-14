import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Card extends Phaser.Sprite{


  constructor ({ game, x, y}, player, card) {
    super(game, x, y);
    var player = player;
    var card = card
  }



  middleCardGeneration(){

  }

  playerCardGeneration(){
    var cards = new Array();
    cards = this.fetch.callCard();
    if(player.id == 0){
      //this.player.
    }
  }

  opponentCardGeneration(){
    //for(let i = 0; i</*NBJOUEUR*/;i++){
    //this.player[i]
    //}
  }

  displayCard(listCard){
    for(var x = 0; x>listCard.length; x++){
      createSpriteLogo(card.centerX,card.centerY,listCard[x]);
    }
  }

  createSpriteLogo(x,y,key){
    var sprite = game.add.spritesheet(x,y,key);
    sprite.anchor(0.5);
  }


}
