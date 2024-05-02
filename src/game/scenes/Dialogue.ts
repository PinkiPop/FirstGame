import { EventBus } from '../EventBus';
import { Scene } from 'phaser';


export class Dialogue extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.TileSprite;
  dialogueText: Phaser.GameObjects.Text;
  nextButton: Phaser.GameObjects.Text;
  currentPage: number;
  dialoguePages: string[];
  dialogueBox: Phaser.GameObjects.Image;

  constructor ()
  {
    super('Dialogue');
  }
  preload(){
    this.load.setPath('assets');
    this.load.image('background2', 'background2.png')
    this.load.image('dialogueBox', 'dialogueBox.png');
  }
  create ()
  {
    this.cameras.main = this.cameras.main;

    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background2');
    this.background.setOrigin(0.5);

    this.background.postFX.addVignette(0.5, 0.5, 0.7);


    this.dialogueBox = this.add.image(510, 600, 'dialogueBox');
    this.dialogueBox.setScale(.5);

    this.dialogueText = this.add.text(512, 600, '', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center', wordWrap: { width: 400 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);


    this.nextButton = this.add.text(512, 660, 'Next', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    this.currentPage = 0;
    this.dialoguePages = [
      "There is an Old Tale…",
      "A lake that grants wishes, or so I’ve been told.",
      "Stories of this place have been passed down, diluted by verbal tradition.",
      "But the one I know tells of an eclectic group of travelers, looking to have their wishes granted.",
      "Upon their arrival the travelers were greeted by a devil.",
      "A grand battle broke out and amongst the travelers, only one survived, a beautiful human with unheard of inner strength.",
      "It is fabled that the devil was amused with this human, her survival seemingly impossible…",
      "It seems his amusement grew into obsession, and he fell in love with this human, granting her a crude joke of everlasting life.",
      "They say every 100 years she is reincarnated into a poor unsuspecting human soul.",
      "But… that’s just the way I heard it.",
    ];

    this.updateDialogue();
    this.nextButton.on('pointerdown', () => this.advanceDialogue());
  }

  update() {
    this.background.tilePositionY -= 1;
  }

  updateDialogue() {
    this.dialogueText.setText(this.dialoguePages[this.currentPage]);
  }

  advanceDialogue() {
    this.currentPage++;
    if (this.currentPage >= this.dialoguePages.length) {
      this.scene.start('EnemyMain');
    } else {
      this.updateDialogue();
    }
  }


changeScene ()
{
    this.scene.start('EnemyMain');
}}