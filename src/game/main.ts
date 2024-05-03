import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import{Dialogue} from './scenes/Dialogue';
import { Victory } from './scenes/Victory';
import { EnemyMain } from './scenes/EnemyMain';
import { Dialogue2 } from './scenes/Dialogue2';
import { Dialogue3 } from './scenes/Dialogue3';
import { Dialogue4 } from './scenes/Dialogue4';
import { Dialogue5 } from './scenes/Dialogue5';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Dialogue,
        MainGame,
        GameOver,
        Victory,
        EnemyMain,
        Dialogue2,
        Dialogue3,
        Dialogue4,
        Dialogue5,
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
