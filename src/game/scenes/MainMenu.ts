import { GameObjects, Loader, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.title = this.add.text(512, 460, 'Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

    
    this.title.setInteractive();
    this.title.on('pointerover', () => {
      this.sys.canvas.style.cursor = 'pointer';
    });

    this.title.on('pointerout', () => {
      this.sys.canvas.style.cursor = 'default';
    });
    this.title.on('pointerdown', () => {
        this.scene.start('Game');
      });

    EventBus.emit('current-scene-ready', this);


    }
    
    changeScene ()
    {
        this.scene.start('Game');
    }}
