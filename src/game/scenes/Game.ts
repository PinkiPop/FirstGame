import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;
  playerHP: number;
  enemyHP: number;
  playerTurn: boolean;
  enemyDialogue: string[];
  attackButton: Phaser.GameObjects.Text;
  heavyAttackButton: Phaser.GameObjects.Text;
  playerSprite: Phaser.GameObjects.Sprite | undefined;
  enemySprite: Phaser.GameObjects.Sprite | undefined;

  constructor ()
  {
    super('Game');
  }

  create ()
  {

    this.camera = this.cameras.main;
    this.background = this.add.image(512, 384, 'background3');
    this.background.setAlpha(0.5);

    this.playerHP = 100;
    this.enemyHP = 100;
    this.playerTurn = false;
    this.enemyDialogue = [
      "You won't get away from me this time!",
      "I've been waiting to crush you!",
      "Prepare to be defeated... Finally!",
    ];

    this.load.on('complete', () => {
      this.createPlayerSprite();
      this.createEnemySprite();
    });
    this.load.start();


    this.initiateEnemyAttack();

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
  
  }

  initiateEnemyAttack() {
    const randomDialogueIndex = Math.floor(Math.random() * this.enemyDialogue.length);
    this.updateText(this.enemyDialogue[randomDialogueIndex]);
    this.playerHP -= 20;
    this.checkWinLose();

    this.playerTurn = true;
    this.showAttackMenu();
  }

  attack(attackType: string) {
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
    this.checkWinLose();
    this.enemyTurn();
  }

  enemyTurn() {
    this.playerTurn = false;
    const randomDialogueIndex = Math.floor(Math.random() * this.enemyDialogue.length);
    this.updateText(this.enemyDialogue[randomDialogueIndex]);


    EventBus.emit('current-scene-ready', this);
  }

  updateText(text: string) {
    this.gameText.setText(text); 
  }

  showAttackMenu() {
    if (!this.playerTurn) return;
  
    this.attackButton.setVisible(true);
    this.heavyAttackButton.setVisible(true);
  }

  checkWinLose() {
    if (this.playerHP <= 0) {
    this.updateText("You have died!");
     this.scene.start('GameOver');
      
    } else if (this.enemyHP <= 0) {
      this.updateText("You win!");
    }
  }

  createPlayerSprite() {
    this.playerSprite = this.add.sprite(256, 384, 'player');
    // animations?
  }
  createEnemySprite() {
    this.enemySprite = this.add.sprite(768, 384, 'enemy');
    // animations?
  }

}
