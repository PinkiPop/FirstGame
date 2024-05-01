import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;
    returnText: Phaser.GameObjects.Text;
    GameOverAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    constructor ()
    {
        super('GameOver');
    }
    preload(){
        this.load.setPath('assets');
        this.load.audio('GameOverAudio', 'GameOverAudio.mp3');
    
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
        //this.camera.setBackgroundColor(0xff0000);

        this.sound.removeByKey('fightMenuAudio');
        this.GameOverAudio = this.sound.add('GameOverAudio');
        this.GameOverAudio.play();
        this.GameOverAudio.setLoop(true);
        this.GameOverAudio.setVolume(.05);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameOverText = this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.returnText = this.add.text(512, 550, 'Play Again?',{
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center',
            }).setOrigin(0.5).setDepth(100);
    
            this.returnText.setInteractive();
        this.returnText.on('pointerover', () => {
          this.sys.canvas.style.cursor = 'pointer';
        });
    
        this.returnText.on('pointerout', () => {
          this.sys.canvas.style.cursor = 'default';
        });
        this.returnText.on('pointerdown', () => {
            this.scene.start('MainMenu');
          });
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
