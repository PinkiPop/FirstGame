import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Dialogue extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
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

  }
  create ()
  {
    this.cameras.main = this.cameras.main;

    this.background = this.add.image(512, 384, 'background2');
    this.background.postFX.addVignette(0.5, 0.5, 0.7);

    this.dialogueBox = this.add.image(510, 360, 'dialogueBox');
    this.dialogueBox.setScale(.8);

    this.dialogueText = this.add.text(512, 350, '', {
      fontFamily: 'Gotham', fontSize: 30, color: '#000000',
      align: 'center', wordWrap: { width: 700 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);



    this.nextButton = this.add.text(512, 450, 'Next', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    this.currentPage = 0;
    this.dialoguePages = [
      "Welcome to Ethereal Bay, a picturesque seaside town where the scent of salt hangs in the air and the rhythm of the waves lulls you into a sense of security. That is, until your world shatters.",
      "You are {Character Name}, a creature of habit content with the simple pleasures of life. But tranquility becomes a distant memory when a hooded figure attacks.",
      "The attack triggers a dormant power within you, a surge of energy you never knew you possessed. As you fight back with newfound strength and reflexes, a terrifying question hangs heavy: Why you?",
      "Are you ready to unlock the secrets that lie within?"
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