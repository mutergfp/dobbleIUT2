import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
const PATHSERV = 'http://gi1.univ-lr.fr:7777/download/assets/'
const PATHLOCAL = './assets/'
const PATHAPI = 'http://gi1.univ-lr.fr:82/image/'

var fetchingImages = false;

export default class extends Phaser.State {

  init (username) {
    this.username = username;
  }

  preload () {
    this.load.image('loader-bar','./assets/images/loader-bar.png');
    this.load.image('loader-bg','./assets/images/loader-bg.png');

    //LOGOS
    fetch('http://gi1.univ-lr.fr:82/images')
      .then(res => res.json())
      .then(res => {
        res.forEach(idImage => {
          this.load.spritesheet(idImage.toString(),PATHAPI+idImage);
        });
        return true;
      })
      .then(res => fetchingImages = res);

    this.load.crossOrigin = "anonymous"; //Obligate to fix cross-origin Error

    //IMAGES
    this.load.image('FondDeJeu',PATHLOCAL+'images/fond/FondDeJeu.png');
    this.load.image('TapisDeJeu',PATHLOCAL+'images/fond/TapisDeJeu.png');

    //SPRITESHEETS
    this.load.spritesheet('ButtonNormal',PATHLOCAL+'images/button/buttonNormal.png');
    this.load.spritesheet('PlayButton',PATHLOCAL+'images/button/play-button-256.png');
    this.load.spritesheet('soundOn',PATHLOCAL+'images/button/speaker-on.png');
    this.load.spritesheet('soundOff',PATHLOCAL+'images/button/speaker-off.png');
      //BlankCard
    this.load.spritesheet('cardDeck',PATHLOCAL+'images/cardDeck.png');
    this.load.spritesheet('cardPlayer',PATHLOCAL+'images/cardPlayer.png');
    this.load.spritesheet('cardOpponent',PATHLOCAL+'images/cardOpponent.png');

    //AUDIOS
    this.load.audio('MainMenuMusic',PATHLOCAL+'audio/MainMenuMusic.mp3');

    /* Load your assets here
      w/
      this.load.image(key,url);
      this.load.spritesheet(key,url,width,height);
      this.load.audio(key,url);
    */

  }

  create () {
    this.background = this.add.sprite(game.world.centerX, game.world.centerY, 'loader-bg')//.anchor.set(0.5);
    this.preloadBar = this.add.sprite(game.world.centerX, game.world.centerY, 'loader-bar')//.anchor.set(0.5);

    this.load.setPreloadSprite(this.preloadBar);
  }

  update() {
    if (fetchingImages) {
      this.state.start('MainMenu',true,false,this.username);
    }
  }
}
