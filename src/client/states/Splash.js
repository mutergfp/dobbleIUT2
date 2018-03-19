import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
const PATHSERV = 'http://gi1.univ-lr.fr:7777/download/assets/'
const PATHLOCAL = './assets/'
const PATHAPI = 'http://gi1.univ-lr.fr:82/image/'

var fetchingImages = false;

export default class extends Phaser.State {

  init () {
  }

  preload () {
    this.load.spritesheet('loader-bar',PATHLOCAL+'images/loader-bar.png');
    this.load.spritesheet('loader-bg',PATHLOCAL+'images/loader-bg.png');
    this.background = this.add.sprite(0, 0, 'loader-bg');
    this.preloadBar = this.add.sprite(300, 400, 'loader-bar');

    this.load.setPreloadSprite(this.preloadBar);

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
    this.preloadBar.cropEnabled = false;
  }

  update() {
    if (fetchingImages) {
      this.state.start('MainMenu');
    }
  }
}
