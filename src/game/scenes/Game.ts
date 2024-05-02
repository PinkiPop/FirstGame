import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

class HealthBar {
  bar: Phaser.GameObjects.Graphics;
  value: number;
  p: number;

  constructor (public scene: Scene, public x: number, public y: number)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = 100;
      this.p = 76 / 100;

      this.draw();

      scene.add.existing(this.bar);
  }

  decrease (amount: number)
  {
      this.value -= amount;

      if (this.value < 0)
      {
          this.value = 0;
      }

      this.draw();

      return (this.value === 0);
  }

  draw ()
  {
      this.bar.clear();

      //  BG
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 80, 16);

      //  Health

      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

      if (this.value < 30)
      {
          this.bar.fillStyle(0xff0000);
      }
      else
      {
          this.bar.fillStyle(0x00ff00);
      }

      var d = Math.floor(this.p * this.value);

      this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }

}


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
  enemyTalking: Phaser.GameObjects.Image;
  fightMenu: Phaser.GameObjects.Image;
  playerInput: boolean;
  fightMenuAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  playerHealthBar: any;
  enemyHealthBar: any;

  constructor() {
    super('Game');
  }
  preload(){
    this.load.setPath('assets');
    this.load.audio('fightMenuAudio', 'FightMenuAudio.mp3');

  }


  create() {

    this.cameras.main = this.cameras.main;
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });

    this.sound.removeByKey('mainEnemyAudio');
    this.fightMenuAudio = this.sound.add('fightMenuAudio');
    this.fightMenuAudio.play();
    this.fightMenuAudio.setLoop(true);
    this.fightMenuAudio.setVolume(.05);

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

    this.enemyDialogue = this.add.text(330, 80, 'The hooded figure hits you and you take 10 damage',{
      fontFamily: 'Arial', fontSize: 35, color: '#000000',
      align: 'center', wordWrap: { width: 390 }
    });
    this.enemyDialogue.setVisible(false);

    this.attackButton.on('pointerdown', () => this.attack('Attack'));
   this.heavyAttackButton.on('pointerdown', () => this.attack('Heavy Attack'));

this.gameText = this.add.text(360, 330, '', {
  fontFamily: 'Arial', fontSize: 40, color: '#000000',
      align: 'center'
})

this.enemyHealthBar = new HealthBar(this, 20, 20);
this.playerHealthBar = new HealthBar(this, 900,700);

    this.playerHP = 100;
    this.enemyHP = 100;
    this.playerTurn = false;
  


    this.playerInput = false;
   this.fightMenu.setVisible(false);
    this.attackButton.setVisible(false);
    this.heavyAttackButton.setVisible(false);

    this.changeTurn(false);
  }
  //ends here

 
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
  this.enemyDialogue.setVisible(false);
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
this.attackButton.off('pointerdown');
this.heavyAttackButton.off('pointerdown')
  this.attackButton.on('pointerdown', () => {
    this.attack('Attack');
  this.changeTurn(false);
});
  this.heavyAttackButton.on('pointerdown', () => {
    this.attack('Heavy Attack');
    this.changeTurn(false);
  });

  this.checkWinLose();
  //add events and wait to each event, set each one true one at a time.
} else {
  console.log('enemies turn');
  this.enemyTalking.setVisible(true);
  this.enemyDialogue.setVisible(true);
  this.playerHP -= 10;
  this.playerHealthBar.decrease(10);
  this.checkWinLose();
  this.time.addEvent({delay: 3000, callback: () => this.changeTurn(true), callbackScope: this })
}
}

updateText(obj: Phaser.GameObjects.Text, text: string) {
  console.log('text should be updated');
 obj.setText(text);
 obj.setVisible(true);
 setTimeout(() => {
  obj.setVisible(false);
}, 500);
}

attack(attackType: string) {
  console.log('your attack!');
  let damage = 10;
  let attackResult = ''; // Variable to hold the attack result message

  if (attackType === "Attack") {
    if (Math.random() < 0.1) { // 10% chance of missing
      // Missed the attack
      console.log('miss');
      attackResult = 'Miss!';
    }
  } else if (attackType === "Heavy Attack") {
    damage = 20; // Corrected: Reassigned the value of damage
    if (Math.random() < 0.3) { // 30% chance of missing
      // Missed the attack
      console.log('miss');
      attackResult = 'Miss!';
    }
  }

  if (attackResult === '') {
    // Attack hits, decrease enemy's health
    this.enemyHealthBar.decrease(damage); // Decrease enemy's health

    this.enemyHP -= damage;
    console.log(`you hit for ${damage} HP`);
    attackResult = `You hit for ${damage} HP`;
    this.checkWinLose();
  }

  // Display the attack result message on the screen
  this.updateText(this.gameText, attackResult);

  this.playerInput = true;
}
}





EventBus.emit('current-scene-ready', this);
