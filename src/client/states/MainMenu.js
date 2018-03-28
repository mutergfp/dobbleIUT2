import Phaser from 'phaser'
import { getCookie , postJoin, postJouer} from '../utils'

const TOKEN = getCookie('id_token');
const USERNAME = getCookie('username');

export default class extends Phaser.State{

  init(){
    game.add.image(game.world.centerX,game.world.centerY, 'FondDeJeu').anchor.set(0.5);
  }

  preload(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  create(){
    this.text;
    this.createText(game.world.centerX,game.world.centerY+280,'',20,'#FF0000','Roboto')
    this.music = game.add.audio('MainMenuMusic').play();
    this.createButton(game.world.centerX,game.world.centerY,'PlayButton',
    function(){
      postJoin(TOKEN)
        .then(response => {
          this.music.stop();
          this.state.start('Game');
        }).catch(err => {
          this.text.setText(err.response.data.message);
        });
    });

  }

  update(){
    if(!this.music.isPlaying){
      this.music.play();
    }
  }

  createButton(x,y,key,callback){
    var button = game.add.button(x,y,key,callback,this,2,0);

    button.anchor.setTo(0.5);
  }

  createButtonAndText(x,y,key,callback,text){
    var button = game.add.button(x,y,key,callback,this,2,0);
    var text = game.add.text(x,y,text);

    button.anchor.setTo(0.5);
    text.anchor.setTo(0.5);
    text.fill = "#FFFFFF";
    text.fontSize = 50;
    button.width = 150;
    button.height = 40;
    button.scale.set(1);
  }

  createText(x,y,text,size,color,font){
    this.text = game.add.text(x,y,text);
    this.text.font = font;
    this.text.fontSize = size;
    this.text.fill = color;
    this.text.anchor.setTo(0,0);
  }

}
