import Phaser from 'phaser'

export default class extends Phaser.State{

  init(username){
    game.add.image(game.world.centerX,game.world.centerY, 'FondDeJeu').anchor.set(0.5);
    this.username = username;
  }

  preload(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  create(){
    this.btnMusic;
    this.wantMusic = true;
    this.music = game.add.audio('MainMenuMusic').play();
    this.createButton(game.world.centerX,game.world.centerY,'PlayButton',
    function(){
      this.music.stop();
      this.state.start('Game');
    });

  }

  update(){
    if(this.wantMusic = true){
      this.btnMusic = this.createButton(game.world.centerX+300,game.world.centerY+200,'soundOn',
      function(){
        this.wantMusic = false;
        this.music.stop();
      })
    }
    if(this.wantMusic = false){
      this.btnMusic = this.createButton(game.world.centerX+300,game.world.centerY+200,'soundOff',
      function(){
        this.music.play();
        this.wantMusic = true;
      })
    }

    if(!this.music.isPlaying && this.wantMusic){
      this.music.play();
    }
  }

  createButton(x,y,key,callback){
    var button = game.add.button(x,y,key,callback,this,2,0);

    button.anchor.setTo(0.5);
    // button.width = 150;
    // button.height = 40;
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
    var text = game.add.text(x,y,text);
    text.font = font;
    text.fontSize = size;
    text.fill = color;
    text.anchor.setTo(0.5);
  }

}
