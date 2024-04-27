import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  playerHP: number;
  enemyHP: number;
  playerTurn: boolean;
  enemyDialogue: string[];
  attackButton: Phaser.GameObjects.Text;
  heavyAttackButton: Phaser.GameObjects.Text;
  playerSprite: Phaser.GameObjects.Image | undefined;
  enemySprite: Phaser.GameObjects.Image | undefined;
  playerHealthBar: Phaser.GameObjects.Graphics;
  enemyHealthBar: Phaser.GameObjects.Graphics;
  enemyTalking: Phaser.GameObjects.Image;
  fightMenu: Phaser.GameObjects.Image;
  playerInput: boolean;

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

    this.playerSprite = this.add.image(950, 600, 'player1');
    this.playerSprite.setScale(2);
    this.enemySprite = this.add.image(100, 200, 'enemy');
    this.enemySprite.setScale(2);

    console.log('Creating health bars');
    this.playerHealthBar = this.add.graphics();
    this.enemyHealthBar = this.add.graphics();

    console.log('drawing health bar');
    this.drawHealthBar(this.playerHealthBar, this.playerHP, 0x00ff00);
    this.drawHealthBar(this.enemyHealthBar, this.enemyHP, 0xff0000);
    this.playerHealthBar.setPosition(810, 750);
    this.enemyHealthBar.setPosition(25, 0);

    this.enemyTalking = this.add.image(500, 150, 'enemyTalking');
    this.enemyTalking.setScale(.5)
    this.enemyTalking.setVisible(false);
    this.fightMenu = this.add.image(450, 650, 'fightMenu');
    this.fightMenu.setScale(.5)
    this.fightMenu.setVisible(false);
    this.attackButton = this.add.text(350, 550, 'Attack', {
      fontFamily: 'Arial', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    this.heavyAttackButton = this.add.text(650, 550, 'Heavy Attack', {
      fontFamily: 'Arial', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();
    this.attackButton.on('pointerdown', () => this.attack('Attack'));
    this.heavyAttackButton.on('pointerdown', () => this.attack('Heavy Attack'));

    this.playerHP = 100;
    this.enemyHP = 100;
    this.playerTurn = false;
    this.enemyDialogue = [
      "You won't get away from me this time!",
      "I've been waiting to crush you!",
      "Prepare to be defeated... Finally!",
    ];

    this.playerInput = false;
    //this.fightLoop();

  }
  //ends here

  

updateText(text: string) {
}

updateHealthBars() {
  // Update the width of the health bars based on current HP
  this.playerHealthBar.scaleX = this.playerHP / 100;
  this.enemyHealthBar.scaleX = this.enemyHP / 100;
}

checkWinLose() {
  if (this.playerHP <= 0) {
   // this.updateText("You have died!");
   // this.scene.start('GameOver');

  } else if (this.enemyHP <= 0) {
   // this.scene.start('Victory');
  }
}

initiateEnemyAttack() {
 console.log('Enemy attack yay');
  const randomDialogueIndex = Math.floor(Math.random() * this.enemyDialogue.length);
  this.enemyTalking.setVisible(true);
  this.updateText(this.enemyDialogue[randomDialogueIndex]);
  //this.playerHP -= 20;
  this.updateHealthBars();
  this.checkWinLose();
  this.enemyTalking.setVisible(false);
  this.playerTurn = true;
}

attack(attackType: string) {
  console.log('your attack!');
  let damage = 10;
  if (attackType === "Attack") {
    if (Math.random() < 0.9) {
      this.updateText("Miss!");
      return;
    }
  } else if (attackType === "Heavy Attack") {
    damage = 20;
    if (Math.random() < 0.7) {
      this.updateText("Miss!");
      return;
    }
  }
  this.enemyHP -= damage;
  this.updateText(`You hit for ${damage} HP!`);
  this.updateHealthBars();
  this.checkWinLose();
  this.playerInput = true;
}


/*fightLoop() {
  while (this.playerHP > 0 && this.enemyHP > 0) {
    console.log('fight looped!');
    if (this.playerTurn) {
      this.fightMenu.setVisible(true);
      this.attackButton = this.add.text(350, 550, 'Attack', {
        fontFamily: 'Arial', fontSize: 20, color: '#000000',
        align: 'center'
      }).setOrigin(0.5).setInteractive();

      this.heavyAttackButton = this.add.text(650, 550, 'Heavy Attack', {
        fontFamily: 'Arial', fontSize: 20, color: '#000000',
        align: 'center'
      }).setOrigin(0.5).setInteractive();
      this.attackButton.on('pointerdown', () => this.attack('Attack'));
      this.heavyAttackButton.on('pointerdown', () => this.attack('Heavy Attack'));
      while (!this.playerInput) {
        setTimeout(() => {
          this.playerInput = true;
        }, 30000)
      }
    } else {
      console.log('enemy turn started');
      this.fightMenu.setVisible(false);
      this.initiateEnemyAttack();
    }
    this.playerTurn = !this.playerTurn;
  }
  //this.checkWinLose();
}*/




drawHealthBar(healthBar: Phaser.GameObjects.Graphics, health: number, color: number) {
  healthBar.fillStyle(color, 1);
  const maxBarWidth = 200; // Replace with desired width
  const barWidth = Math.floor(health / 100 * maxBarWidth);
  healthBar.fillRect(0, 0, barWidth, 20); // Replace with desired height
}


update(time: number, delta: number): void {
   this.checkWinLose();
//   console.log('fight looped!');
//   if (this.playerTurn) {
//     this.fightMenu.setVisible(true);
//   } else {
//     console.log('enemy turn started');
//     this.fightMenu.setVisible(false);
//     this.initiateEnemyAttack();
//   }
//   this.playerTurn = !this.playerTurn;
 }
//this.checkWinLose();
}



EventBus.emit('current-scene-ready', this);
