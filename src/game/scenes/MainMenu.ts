import { GameObjects, Loader, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    mainMenuAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    sparkle: Phaser.GameObjects.Image;
    
    
    constructor ()
    {
        super('MainMenu');
    }
 
    preload(){
      this.load.setPath('assets');
      this.load.audio('mainMenuAudio', 'mainMenuAudio.mp3')
      //this.load.image('sparkle', 'Sparkle1.png');
      
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

      this.sound.removeByKey('GameOverAudio');
      this.sound.removeByKey('VictoryAudio');
      this.mainMenuAudio = this.sound.add('mainMenuAudio');

     // this.sparkle = this.add.image(0, 0, 'sprakle').setDepth(100);
     // this.sparkle.setScale(5);

        this.background = this.add.image(512, 384, 'background1');
        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.title = this.add.text(512, 460, 'Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5).setDepth(100);

    this.title.setInteractive();
    this.title.on('pointerover', () => {
      this.sys.canvas.style.cursor = 'pointer';
    });

    this.title.on('pointerout', () => {
      this.sys.canvas.style.cursor = 'default';
    });
    this.title.on('pointerdown', () => {
        this.scene.start('Dialogue');
      });

    EventBus.emit('current-scene-ready', this);

  

    
    this.mainMenuAudio.play();
    this.mainMenuAudio.setLoop(true);
    this.mainMenuAudio.setVolume(.05);
}
    
    changeScene ()
    {
        this.scene.start('Dialogue');
    }}
