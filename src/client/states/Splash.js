import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    //this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    //this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    //centerGameObjects([this.loaderBg, this.loaderBar])

    //this.load.setPreloadSprite(this.loaderBar)

    this.load.image('FondDobble','./assets/images/fond/FondDeJeu.png');
    this.load.image('TapisDeJeu','./assets/images/fond/TapisDeJeu.png');
    this.load.spritesheet('ButtonNormal','./assets/images/button/buttonNormal.png');
    /* Load your assets here
      w/
      this.load.image(key,url);
      this.load.spritesheet(key,url,width,height);
      this.load.audio(key,url);
    */

  }

  create () {
    this.state.start('MainMenu');
  }
}
