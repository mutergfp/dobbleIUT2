import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
const PATHSERV = 'http://localhost:7777/download/assets/'
const PATHLOCAL = './assets/'

export default class extends Phaser.State {

  init () {
  }

  preload () {
    //this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    //this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    //centerGameObjects([this.loaderBg, this.loaderBar])

    //this.load.setPreloadSprite(this.loaderBar)

    //IMAGES
    this.load.image('FondDobble',PATHLOCAL+'images/fond/FondDeJeu.png');
    this.load.image('TapisDeJeu',PATHLOCAL+'images/fond/TapisDeJeu.png');

    //SPRITESHEETS
    this.load.spritesheet('ButtonNormal',PATHLOCAL+'images/button/buttonNormal.png');
      //BlankCard
      this.load.spritesheet('cardDeck',PATHLOCAL+'images/cardDeck.png');
      this.load.spritesheet('cardPlayer',PATHLOCAL+'images/cardPlayer.png');
      this.load.spritesheet('cardOpponent',PATHLOCAL+'images/cardOpponent.png');

    //AUDIOS
    this.load.audio('MainMenuMusic',PATHLOCAL+'audio/MainMenuMusic.mp3');

    //LOGOS
    this.load.spritesheet('android',PATHLOCAL+'images/logo/android.png');
    this.load.spritesheet('anneau',PATHLOCAL+'images/logo/anneau.png');
    this.load.spritesheet('apple',PATHLOCAL+'images/logo/apple.png');
    this.load.spritesheet('appstore',PATHLOCAL+'images/logo/appstore.png');
    this.load.spritesheet('bitcoin',PATHLOCAL+'images/logo/bitcoin.png');
    this.load.spritesheet('blizzard',PATHLOCAL+'images/logo/blizzard.png');
    this.load.spritesheet('bluetooth',PATHLOCAL+'images/logo/bluetooth.png');
    this.load.spritesheet('c',PATHLOCAL+'images/logo/c.png');
    this.load.spritesheet('cartman',PATHLOCAL+'images/logo/cartman.png');
    this.load.spritesheet('discord',PATHLOCAL+'images/logo/discord.png');
    this.load.spritesheet('docker',PATHLOCAL+'images/logo/docker.png');
    this.load.spritesheet('dofus',PATHLOCAL+'images/logo/dofus.png');
    this.load.spritesheet('drive',PATHLOCAL+'images/logo/drive.png');
    this.load.spritesheet('facebook',PATHLOCAL+'images/logo/facebook.png');


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
