import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'

export default class Player extends Phaser.Sprite {

  constructor({ game, x, y }, pseudo, id) {
		super(game, x, y);
    this.id = id;
    this.pseudo = pseudo;
    this.points = 0;
    //this.listLogo = {"android.png", "anneau.png","apple.png","appstore.png",bitcoin.png}
  }

  incrementPoint(){
    this.points++;
  }
}
