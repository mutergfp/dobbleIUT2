import Phaser from 'phaser'
import Card from '../sprites/Card'

export default class extends Phaser.State {
  init(){
    game.add.image(game.world.centerX,game.world.centerY, 'FondDeJeu').anchor.set(0.5);
  }

  preload(){

  }

  create(){
    this.createText(game.world.centerX, game.world.centerY-200,'YOU WIN !',60,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY,'Tu as : 420 points',20,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY+50,'Tu es classé 1er du classement général',20,'#FFFFFF','Roboto');

  }

  createText(x,y,text,size,color,font){
    var text = game.add.text(x,y,text);
    text.font = font;
    text.fontSize = size;
    text.fill = color;
    text.anchor.setTo(0.5);
  }

  createButton(x,y,key,callback){
    var button = game.add.button(x,y,key,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 150;
    button.height = 40;
  }
}
