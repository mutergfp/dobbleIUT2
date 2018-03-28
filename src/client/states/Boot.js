import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#FFFFFF';
  }

  preload() {
  }


  render() {
    this.state.start('Splash',true,false,this.username);
  }
}
