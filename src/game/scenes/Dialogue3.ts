import { EventBus } from '../EventBus';
import { Scene } from 'phaser';


export class Dialogue3 extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.TileSprite;
  dialogueText: Phaser.GameObjects.Text;
  currentPage: number;
  dialoguePages: string[];
  dialogueBox: Phaser.GameObjects.Image;

  constructor ()
  {
    super('Dialogue3');
  }
  preload(){
    this.load.setPath('assets');
    this.load.image('dialogue3', 'Dialogue3.png')
    this.load.image('dialogueBox', 'dialogueBox.png');
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

    this.background = this.add.tileSprite(512, 384, 1024, 768, 'dialogue3');
    this.background.setOrigin(0.5);

    //this.background.postFX.addVignette(0.5, 0.5, 0.7);


    this.dialogueBox = this.add.image(510, 600, 'dialogueBox');
    this.dialogueBox.setScale(.5);

    this.dialogueText = this.add.text(512, 600, '', {
      fontFamily: 'Gotham', fontSize: 20, color: '#000000',
      align: 'center', wordWrap: { width: 400 } // Adjust width for dialogue text wrapping
    }).setOrigin(0.5);


    this.currentPage = 0;
    this.dialoguePages = [
      "Upon their arrival the travelers were greeted by a devil.",
      "A grand battle broke out and amongst the travelers, only one survived...",
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
      this.scene.start('Dialogue4');
    }
  }


changeScene ()
{
    this.scene.start('Dialogue4');
}}