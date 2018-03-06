import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Card extends Phaser.Sprite{

  constructor ({ game, x, y, asset }, player) {
    super(game, x, y, asset);
    this.player = player
    
  }



  middleCardGeneration(){

  }

  playerCardGeneration(){
    if(this.player.id == 0){

    }
  }

  opponentCardGeneration(){
    //for(let i = 0; i</*NBJOUEUR*/;i++){
    //this.player[i]
    //}
  }
}







var card = new Card({
  game: this.game,
  x: 0,
  y: 0,
  asset: ''
});
