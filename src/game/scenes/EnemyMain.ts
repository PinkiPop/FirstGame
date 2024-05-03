import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class EnemyMain extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  dialogueText: Phaser.GameObjects.Text;
  nextButton: Phaser.GameObjects.Text;
  currentPage: number;
  dialoguePages: string[];
  dialogueBox: Phaser.GameObjects.Image;
  enemyMain: Phaser.GameObjects.Image;
  mainEnemyAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor ()
  {
    super('EnemyMain');
  }
  preload(){
    this.load.setPath('assets');
    this.load.image('background4', 'background4.png')
    this.load.image('enemyMain', 'enemyMain.png');
    this.load.audio('mainEnemyAudio', 'mainEnemyAudio.mp3');

  }
  create ()
  {
    this.cameras.main = this.cameras.main;

this.sound.removeByKey('DialogueAudio');
this.mainEnemyAudio = this.sound.add('mainEnemyAudio');
this.mainEnemyAudio.play();
    this.mainEnemyAudio.setLoop(true);
    this.mainEnemyAudio.setVolume(.05);


    this.background = this.add.image(512, 384, 'background4');
    this.background.postFX.addVignette(0.5, 0.5, 0.7);

    this.enemyMain = this.add.image(500, 200, 'enemyMain');
this.enemyMain.setScale(3);

    this.dialogueBox = this.add.image(500, 550, 'dialogueBox');
    this.dialogueBox.setScale(.8);

    this.dialogueText = this.add.text(500, 550, '', {
      fontFamily: 'Gotham', fontSize: 30, color: '#000000',
      align: 'center', wordWrap: { width: 700 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);



    this.nextButton = this.add.text(500, 600, 'Next', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    this.currentPage = 0;
    this.dialoguePages = [
        "It seems like you have forgotten yourself.",
        "I’m looking to take back what belongs to me, especially after all this time spent searching.",
        "I will not let you get away.",
    ];

    this.updateDialogue();
    this.nextButton.on('pointerdown', () => this.advanceDialogue());
  }


  updateDialogue() {
    this.dialogueText.setText(this.dialoguePages[this.currentPage]);
  }

  advanceDialogue() {
    this.currentPage++;
    if (this.currentPage >= this.dialoguePages.length) {
      this.scene.start('Game');
    } else {
      this.updateDialogue();
    }
  }


changeScene ()
{
    this.scene.start('Game');
}}













/*import { EventBus } from '../EventBus';
import { Create, Scene } from "phaser";

export class EnemyMain extends Scene{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    dialogueText: Phaser.GameObjects.Text;
    dialoguePages: string[];
    currentPage: number;
    nextButton: Phaser.GameObjects.Text;
    enemyTalking: Phaser.GameObjects.Image;
    enemyMain: Phaser.GameObjects.Image;


    constructor(){
        super('EnemyMain');
    }

Create(){
    this.cameras.main = this.cameras.main;
    //const fxCamera = this.cameras.main.postFX.addPixelate(40);
   // this.add.tween({
    //  targets: fxCamera,
     // duration: 700,
     // amount: -1,
   // });

    this.background = this.add.image(512, 384, 'background4');
    this.background.setAlpha(0.5);

//this.enemyMain = this.add.image(500, 500, 'enemyMain.png');
//this.enemyMain.setScale(3);

   // this.enemyTalking = this.add.image(500, 600, 'enemyTalking');
    //this.enemyTalking.setScale(.5)

    /*this.nextButton = this.add.text(500, 600, 'Next', {
        fontFamily: 'Gotham', fontSize: 20, color: '#000000',
        align: 'center'
      }).setOrigin(0.5).setInteractive();
  
      this.dialogueText = this.add.text(512, 550, '', {
        fontFamily: 'Gotham', fontSize: 30, color: '#000000',
        align: 'center', wordWrap: { width: 700 } // Adjust width for dialogue text wrapping
      }).setOrigin(0.5);

      this.currentPage = 0;
    this.dialoguePages = [
      "You won't get away from me this time!",
      "I've been waiting to crush you!",
      "Prepare to be defeated... Finally!",
    ];
    this.updateDialogue();
    this.nextButton.on('pointerdown', () => this.advanceDialogue());

}

updateDialogue() {
    this.dialogueText.setText(this.dialoguePages[this.currentPage]);
  }

  advanceDialogue() {
    this.currentPage++;
    if (this.currentPage >= this.dialoguePages.length) {
    this.scene.start('Game');
    } else {
      this.updateDialogue();
    }}


}

}

EventBus.emit('current-scene-ready', this);*/