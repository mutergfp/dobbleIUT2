import Phaser from 'phaser'
import Card from '../sprites/Card'
import {getCookie} from '../utils'
const USERNAME = getCookie('username');

export default class extends Phaser.State {
  init(obj){
    this.score;
    this.rank;
    this.tabLeaderboard = [];
    game.add.image(game.world.centerX,game.world.centerY, 'FondDeJeu').anchor.set(0.5);
    obj.ranking.forEach(leaderboard => {
      this.tabLeaderboard.push(leaderboard.username);
    })
    obj.players.forEach(playerEnd => {
      if(playerEnd.username == USERNAME){
        this.score = playerEnd.score;
        this.rank = playerEnd.rank;
      }
    })
  }

  preload(){

  }

  create(){
    this.createText(game.world.centerX, game.world.centerY-200,this.isWinner(),60,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY,'Tu as : '+ this.score +' points',20,'#FFFFFF','Roboto');
    this.createText(game.world.centerX, game.world.centerY+50,'Tu es classé '+ this.rank +' de la partie',20,'#FFFFFF','Roboto');
    this.createButton(game.world.centerX-450, game.world.centerY+250,'returnButton',function(){
      this.state.start('MainMenu');
    });
    this.createTabLeaderboard(game.world.centerX+250,game.world.centerY-200);
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

  createTabLeaderboard(x,y){
    game.add.text(x,y,"Classement de la partie",{ font: "20px Roboto", fill: "#FFFFFF" })
    y+=25;
    game.add.text(x,y,"________________________",{ font: "20px Roboto", fill: "#FFFFFF" });
    for(var i = 0; i+1<=this.tabLeaderboard.length; i++){
      y+=25;
      game.add.text(x,y,(i+1)+'  '+this.tabLeaderboard[i],{ font: "20px Roboto", fill: "#FFFFFF" });
      y+=25;
      game.add.text(x,y,"______________________",{ font: "20px Roboto", fill: "#FFFFFF" })
    }
  }
}
