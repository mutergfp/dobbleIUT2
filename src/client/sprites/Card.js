import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Card extends Phaser.Sprite{


  constructor ({ game, x, y, asset}, player, card) {
    super(game, x, y,asset);
    this.player = player;
    this.card = card;
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



  // render() {
  //    var x=16
  //   for(var i = 0;i<8;i++)
  //   this.game.debug.text(this.listLogoPlayer[i], 16,x);
  //   x = x+16;
  // }

}
