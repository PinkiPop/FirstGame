import { EventBus } from '../EventBus';
import { Scene } from "phaser";

export class Victory extends Scene{
 
camera: Phaser.Cameras.Scene2D.Camera;
background: Phaser.GameObjects.Image;
VictoryText : Phaser.GameObjects.Text;
returnText: Phaser.GameObjects.Text;
VictoryAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

constructor ()
{
    super('Victory');
}
preload(){
  this.load.setPath('assets');
  this.load.audio('VictoryAudio', 'Victory.mp3');

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
      this.sound.removeByKey('fightMenuAudio');
      this.VictoryAudio = this.sound.add('VictoryAudio');
      this.VictoryAudio.play();
      this.VictoryAudio.setLoop(true);
      this.VictoryAudio.setVolume(.05);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.VictoryText = this.add.text(500, 200, 'You have completed the demo for Ethereal Haven', {
        fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center',
        wordWrap: {width:500, useAdvancedWrap: true }
    }).setOrigin(0.5).setDepth(100);

    this.returnText = this.add.text(500, 410, 'Play Again?',{
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