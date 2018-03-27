import Phaser from 'phaser'
import Card from '../sprites/Card'

export default class extends Phaser.State {
  init(score,rank){
    game.add.image(game.world.centerX,game.world.centerY, 'FondDeJeu').anchor.set(0.5);
    this.score = score;
    this.rank = rank;
  }

  preload(){

  }

  create(){
    this.createText(game.world.centerX, game.world.centerY-200,this.isWinner(),60,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY,'You have : '+ this.score +' points',20,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY+50,'You are rank '+ this.rank +' from the general leaderboard',20,'#FFFFFF','Roboto');
    this.createButton(game.world.centerX-450, game.world.centerY+250,'returnButton',function(){
      this.state.start('MainMenu');
    });
  }

  isWinner(){
    if(this.rank == 1){
      return 'YOU WIN !';
    }else{
      return 'YOU LOOSE !';
    }
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

  }
}
