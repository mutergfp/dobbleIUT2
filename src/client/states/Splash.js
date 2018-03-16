import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
const PATHSERV = 'http://localhost:7777/download/assets/'
const PATHLOCAL = './assets/'
const PATHAPI = 'http://localhost:82/image/'

var fetchingImages = false;

export default class extends Phaser.State {

  init () {
  }

  preload () {
    //LOGOS
    fetch('http://localhost:82/images')
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

    /* Load your assets here
      w/
      this.load.image(key,url);
      this.load.spritesheet(key,url,width,height);
      this.load.audio(key,url);
    */

  }

  create () {
  }

  update() {
    if (fetchingImages) {
      this.state.start('MainMenu');
    }
  }
}
