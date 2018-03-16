import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Player extends Phaser.Sprite {

  constructor({ game, x, y }, pseudo, id) {
		super(game, x, y);
    this.id = id;
    this.pseudo = pseudo;
    this.points = 0;
  }

  initPlayer(){
    var listPlayer = null;/* Methode de récuperation des joueurs */
    for (var i = 0; i < listPlayer.length;i++){
      
    }


  }

  incrementPoint(){
    this.points++;
  }
}
