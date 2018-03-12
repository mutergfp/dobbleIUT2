import Phaser from 'phaser'

export default class extends Phaser.State{

  init(){
    game.add.image(game.world.centerX,game.world.centerY, 'FondDobble').anchor.set(0.5);
  }

  preload(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }
  create(){
    var music = game.add.audio('MainMenuMusic',100,1);
    music.play();
    this.createText(game.world.centerX,game.world.centerY-200,"Dobble Online",50,"#FFFFFF","Roboto");
    this.createButtonAndText(game.world.centerX,game.world.centerY+250,'ButtonNormal',
    function(){
      music.stop();
      this.state.start('Game');
    },"Jouer");
    this.createButtonAndText(game.world.centerX,game.world.centerY+150,'ButtonNormal',
    function(){
      this.state.start('MainMenu');
    },"Liste logo");
  }

  createButton(x,y,key,callback){
    var button = game.add.button(x,y,key,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 150;
    button.height = 40;
  }

  createButtonAndText(x,y,key,callback,text){
    var button = game.add.button(x,y,key,callback,this,2,0);
    var text = game.add.text(x,y,text);

    button.anchor.setTo(0.5);
    text.anchor.setTo(0.5);
    text.fill = "#FFFFFF";
    button.width = 150;
    button.height = 40;
  }

  createText(x,y,text,size,color,font){
    var text = game.add.text(x,y,text);
    text.font = font;
    text.fontSize = size;
    text.fill = color;
    text.anchor.setTo(0.5);
  }

}
