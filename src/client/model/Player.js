import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Player extends Phaser.Sprite {

  constructor({ game, x, y, asset }, pseudo, id) {
		super(game, x, y, asset);
    this.id = id;
    this.pseudo = pseudo;
    this.points = 0;
  }

  incrementPoint(){
    this.points++;
  }
}
