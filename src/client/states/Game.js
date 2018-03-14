/* globals __DEV__ */
import Phaser from 'phaser'
import Card from '../sprites/Card'

export default class extends Phaser.State {
  init() {
    game.add.image(game.world.centerX,game.world.centerY, 'TapisDeJeu').anchor.set(0.5);
  }
  preload() { }

  create() {

    this.listLogoPlayer = new Array();
    this.listLogoPlayer.push('android')
    this.listLogoPlayer.push('anneau');
    this.listLogoPlayer.push('apple');
    this.listLogoPlayer.push('appstore');
    this.listLogoPlayer.push('bitcoin');
    this.listLogoPlayer.push('blizzard');
    this.listLogoPlayer.push('bluetooth');
    this.listLogoPlayer.push('c');

     var playerCard = new Card({
       game:this.game,
       x:game.world.centerX,
       y:game.world.centerY+215
     },"Player1"
     ,this.createBlankCircle(game.world.centerX, game.world.centerY+215,'cardPlayer'));

     playerCard.displayCard(this.listLogoPlayer);


    //Player circle
    /*var playerCircle = {
      cercle: this.createWhiteCircle(game.world.centerX, game.world.centerY+215,180),
      logos: new Card({Player({game:game,
        x:game.world.centerX,
        y:game.world.centerY},'Player1',1)})
        .displayCard(playerCircle.cercle,this.listLogoPlayer)
   }*/


    //Card deck
    /*var deckCircle = this.createWhiteCircle(game.world.centerX, game.world.centerY-30,260);

    //
    this.createWhiteCircle(game.world.centerX+175, game.world.centerY+95,100);
    this.createWhiteCircle(game.world.centerX-175, game.world.centerY+95,100);
    this.createWhiteCircle(game.world.centerX+200, game.world.centerY-30,100);
    this.createWhiteCircle(game.world.centerX-200, game.world.centerY-30,100);
    this.createWhiteCircle(game.world.centerX+175, game.world.centerY-155,100);
    this.createWhiteCircle(game.world.centerX-175, game.world.centerY-155,100);
    this.createWhiteCircle(game.world.centerX, game.world.centerY-235,100);

    listLogoPlayer.add('cartman');
    listLogoPlayer.add('discord');
    listLogoPlayer.add('docker');
    listLogoPlayer.add('dofus');
    listLogoPlayer.add('drive');
    listLogoPlayer.add('facebook');
    */


  }

  createWhiteCircle(x,y,radius){
    var rondJeu = game.add.graphics(0,0);

    rondJeu.beginFill(0xFFFFFF, 1);
    rondJeu.drawCircle(x, y,radius);
  }

  createBlankCircle(x,y,key){
    var blankCircle = game.add.spritesheet(x,y,key);
    blankCircle.anchor = 0.5,0.5;
  }

  render() {

  }
}
