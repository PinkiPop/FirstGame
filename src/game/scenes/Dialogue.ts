import { EventBus } from '../EventBus';
import { Scene } from 'phaser';


export class Dialogue extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.TileSprite;
  dialogueText: Phaser.GameObjects.Text;
  currentPage: number;
  dialoguePages: string[];
  dialogueBox: Phaser.GameObjects.Image;
  DialogueAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
skipButton: Phaser.GameObjects.Text;

  constructor ()
  {
    super('Dialogue');
  }
  preload(){
    this.load.setPath('assets');
    this.load.image('dialogue1', 'Dialogue1.png')
    this.load.image('dialogueBox', 'dialogueBox.png');
    this.load.audio('DialogueAudio', 'DialogueAudio.mp3');
  }
  create ()
  {
    this.cameras.main.fadeIn(50);
      const fxCamera = this.cameras.main.postFX.addPixelate(40);
      this.add.tween({
          targets: fxCamera,
          duration: 700,
          amount: -1,
      });

    this.sound.removeByKey('mainMenuAudio');
this.DialogueAudio = this.sound.add('DialogueAudio');
this.DialogueAudio.play();
    this.DialogueAudio.setLoop(true);
    this.DialogueAudio.setVolume(.05);

    this.background = this.add.tileSprite(512, 384, 1024, 768, 'dialogue1');
    this.background.setOrigin(0.5);

    //this.background.postFX.addVignette(0.5, 0.5, 0.7);


    this.dialogueBox = this.add.image(510, 600, 'dialogueBox');
    this.dialogueBox.setScale(.5);

    this.dialogueText = this.add.text(512, 600, '', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center', wordWrap: { width: 400 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);

this.skipButton = this.add.text(900, 50, 'skip', {
  fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
  stroke: '#000000', strokeThickness: 8,
  align: 'center',
}).setOrigin(0.5).setDepth(100);

this.skipButton.setInteractive();
this.skipButton.on('pointerover', () => {
this.sys.canvas.style.cursor = 'pointer';
});

this.skipButton.on('pointerout', () => {
this.sys.canvas.style.cursor = 'default';
});
this.skipButton.on('pointerdown', () => {
this.scene.start('EnemyMain');
});

    this.currentPage = 0;
    this.dialoguePages = [
      "There is an Old Tale…",
      "A lake that grants wishes, or so I’ve been told.",
      "Stories of this place have been passed down, diluted by verbal tradition.",
    ];

    this.updateDialogue();
  }

  update() {
    this.background.tilePositionY -= 1;
  }

  updateDialogue() {
    if (this.currentPage < this.dialoguePages.length) {
      const content = this.dialoguePages[this.currentPage];
      let i = 0;
      const addLetter = () => {
        this.dialogueText.text += content[i];
        i++;
        if (i < content.length) {
          this.time.delayedCall(100, addLetter);
        } else {
          this.time.delayedCall(2000, () => {
            this.currentPage++;
            this.dialogueText.text = '';
            this.updateDialogue();
          });
        }
      };
      addLetter();
    } else {
      this.scene.start('Dialogue2');
    }
  }


changeScene ()
{
    this.scene.start('Dialogue2');
}}