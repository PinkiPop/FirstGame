import { EventBus } from '../EventBus';
import { Scene } from 'phaser';


export class Dialogue2 extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.TileSprite;
  dialogueText: Phaser.GameObjects.Text;
  currentPage: number;
  dialoguePages: string[];
  dialogueBox: Phaser.GameObjects.Image;
  skipButton: Phaser.GameObjects.Text;

  constructor ()
  {
    super('Dialogue2');
  }
  preload(){
    this.load.setPath('assets');
    this.load.image('dialogue2', 'Dialogue2.png')
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
    
    this.background = this.add.tileSprite(512, 384, 1024, 768, 'dialogue2');
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
      "But the one I know tells of an eclectic group of travelers, looking to have their wishes granted.",
    ];

    this.updateDialogue();
  }

  update() {
    this.background.tilePositionX -= 1;
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
      this.scene.start('Dialogue3');
    }
  }


changeScene ()
{
    this.scene.start('Dialogue3');
}}