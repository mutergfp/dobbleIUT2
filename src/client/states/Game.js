/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    game.add.image(game.world.centerX,game.world.centerY, 'TapisDeJeu').anchor.set(0.5);
  }
  preload() { }

  create() {
    //Player circle
    this.createWhiteCircle(game.world.centerX, game.world.centerY+215,180);

    //Card deck
    this.createWhiteCircle(game.world.centerX, game.world.centerY-30,260);

    //
    this.createWhiteCircle(game.world.centerX+175, game.world.centerY+95,100);
    this.createWhiteCircle(game.world.centerX-175, game.world.centerY+95,100);
    this.createWhiteCircle(game.world.centerX+200, game.world.centerY-30,100);
    this.createWhiteCircle(game.world.centerX-200, game.world.centerY-30,100);
    this.createWhiteCircle(game.world.centerX+175, game.world.centerY-155,100);
    this.createWhiteCircle(game.world.centerX-175, game.world.centerY-155,100);
    this.createWhiteCircle(game.world.centerX, game.world.centerY-235,100);
  }

  createWhiteCircle(x,y,radius){
    var rondJeu = game.add.graphics(0,0);

    rondJeu.beginFill(0xFFFFFF, 1);
    rondJeu.drawCircle(x, y,radius);
  }

  render() {

  }
}
