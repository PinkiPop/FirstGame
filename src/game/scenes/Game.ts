import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  playerHP: number;
  enemyHP: number;
  playerTurn: boolean;
  enemyDialogue: Phaser.GameObjects.Text;
  attackButton: Phaser.GameObjects.Text;
  heavyAttackButton: Phaser.GameObjects.Text;
  playerSprite: Phaser.GameObjects.Image | undefined;
  enemySprite: Phaser.GameObjects.Image | undefined;
  playerHealthBar: Phaser.GameObjects.Graphics;
  enemyHealthBar: Phaser.GameObjects.Graphics;
  enemyTalking: Phaser.GameObjects.Image;
  fightMenu: Phaser.GameObjects.Image;
  playerInput: boolean;
  dialogueText: Phaser.GameObjects.Text;
  dialoguePages: string[];
  currentPage: number;
  nextButton: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  create() {

    this.cameras.main = this.cameras.main;
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });

    this.background = this.add.image(512, 384, 'background3');
    this.background.setAlpha(0.5);

    console.log('player sprite created');
    this.playerSprite = this.add.image(950, 600, 'player1');
    this.playerSprite.setScale(2);

    this.enemySprite = this.add.image(100, 200, 'enemy');
    this.enemySprite.setScale(2);
    console.log('enemy sprite created');

    this.enemyTalking = this.add.image(500, 150, 'enemyTalking');
    this.enemyTalking.setScale(.5)
    this.enemyTalking.setVisible(false);
    console.log('enemy talk bubble created');
    
    this.fightMenu = this.add.image(450, 650, 'fightMenu');
    this.fightMenu.setScale(.5)
    this.fightMenu.setVisible(false);
    console.log('fight menu created');

    this.attackButton = this.add.text(350, 650, 'Attack', {
      fontFamily: 'Arial', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();
    console.log('attack button created');

    this.heavyAttackButton = this.add.text(550, 650, 'Heavy Attack', {
      fontFamily: 'Arial', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();
    console.log('heavy attack button created');

    this.attackButton.on('pointerdown', () => this.attack('Attack'));
   this.heavyAttackButton.on('pointerdown', () => this.attack('Heavy Attack'));

this.gameText = this.add.text(100, 100, '', {
  fontFamily: 'Arial', fontSize: 20, color: '#000000',
      align: 'center'
})

let playerHealthBar=this.makeBar(810,700,0x00ff00);
this.setValue(playerHealthBar,100);

let enemyHealthBar=this.makeBar(25, 10, 0xff0000);
this.setValue(enemyHealthBar,100)


    this.playerHP = 100;
    this.enemyHP = 100;
    this.playerTurn = false;

    this.nextButton = this.add.text(512, 450, 'Next', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    this.dialogueText = this.add.text(512, 150, '', {
      fontFamily: 'Gotham', fontSize: 30, color: '#000000',
      align: 'center', wordWrap: { width: 700 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);
  


    this.playerInput = false;
    this.changeTurn(false);
    this.enemyTalking.setVisible(false);
   this.fightMenu.setVisible(false);
    this.attackButton.setVisible(false);
    this.heavyAttackButton.setVisible(false);


    this.currentPage = 0;
    this.dialoguePages = [
      "You won't get away from me this time!",
      "I've been waiting to crush you!",
      "Prepare to be defeated... Finally!",
    ];
    this.updateDialogue();
    this.nextButton.on('pointerdown', () => this.advanceDialogue());
  }
  //ends here
  updateDialogue() {
    this.dialogueText.setText(this.dialoguePages[this.currentPage]);
  }

  advanceDialogue() {
    this.currentPage++;
    if (this.currentPage >= this.dialoguePages.length) {
//start fight loop
    } else {
      this.updateDialogue();
      this.enemyTalking.setVisible(true);
      this.time.addEvent({delay: 3000,})
    }}

  makeBar(x: number, y: number, color: number) {
    let bar = this.add.graphics();
    bar.fillStyle(color, 1);
    bar.fillRect(0, 0, 200, 50);
    bar.x = x;
    bar.y = y;
    return bar;
}
setValue(bar: Phaser.GameObjects.Graphics,percentage: number) {
    //scale the bar
    bar.scaleX = percentage/100;
}

updateHealthBars() {
  this.playerHealthBar.scaleX = this.playerHP / 100;
  this.enemyHealthBar.scaleX = this.enemyHP / 100;
}

checkWinLose() {
  if (this.playerHP <= 0) {
   //this.gameText.updateText("You have died!");
   console.log('you have died');
   this.scene.start('GameOver');

  } else if (this.enemyHP <= 0) {
   this.scene.start('Victory');
   console.log('victory');
  }
}

changeTurn(player:boolean){
  this.enemyTalking.setVisible(false);
  this.fightMenu.setVisible(false);
  this.attackButton.setVisible(false);
  this.heavyAttackButton.setVisible(false);
  console.log('all elements set to false');
  //add in all elements that u want to show, turn to false
if (player){
  console.log('Players Turn - attack now');
 this.fightMenu.setVisible(true);
this.heavyAttackButton.setVisible(true);
this.attackButton.setVisible(true);
  this.attackButton.on('pointerdown', () => this.attack('Attack'));
  this.heavyAttackButton.on('pointerdown', () => this.attack('Heavy Attack'));
 // this.updateHealthBars();
  this.checkWinLose();
  this.time.addEvent({ delay: 3000, callback: () => this.changeTurn(false), callbackScope: this })
  //add events and wait to each event, set each one true one at a time.
} else {
  console.log('enemies turn - dialogue should show?');
  this.initiateEnemyAttack();
  this.time.addEvent({delay: 3000, callback: () => this.changeTurn(true), callbackScope: this })
}
}

updateText(obj: Phaser.GameObjects.Text, text: string) {
  console.log('text should be updated');
 obj.setText(text);
 obj.setVisible(true);
 this.gameText.setVisible(true);
 this.gameText.setText('hello');
}

initiateEnemyAttack() {
 console.log('Enemy attack yay');
  this.playerHP -= 10;
 // this.updateHealthBars();
  this.checkWinLose();
}

attack(attackType: string) {
  console.log('your attack!');
  let damage = 10;
  if (attackType === "Attack") {
    if (Math.random() < 0.9) {
      //this.gameText.updateText("Miss!");
      console.log('miss');
      return;
    }
  } else if (attackType === "Heavy Attack") {
    damage = 20;
    if (Math.random() < 0.7) {
      //this.gameText.updateText("Miss!");
      console.log('miss');
      return;
    }
  }
  this.enemyHP -= damage;
  //this.updateText(`You hit for ${damage} HP!`);
  console.log('you hit for ${damage} HP');
 // this.updateHealthBars();
  this.checkWinLose();
  this.playerInput = true;
}
}



EventBus.emit('current-scene-ready', this);
