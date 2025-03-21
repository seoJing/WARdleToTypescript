import * as Phaser from 'phaser';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import exitImg from '../img/exit.png';
import styles from '../css/Phase2.module.css';

interface PhaserGameProps {
  checkArr: string[][];
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  answerArr: string[][];
  greenSound: HTMLAudioElement;
  graySound: HTMLAudioElement;
}

const hangulArr: string[] = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
  'ㅏ',
  'ㅑ',
  'ㅐ',
  'ㅒ',
  'ㅓ',
  'ㅕ',
  'ㅔ',
  'ㅖ',
  'ㅗ',
  'ㅛ',
  'ㅜ',
  'ㅠ',
  'ㅡ',
  'ㅣ',
];

const PhaserGame: React.FC<PhaserGameProps> = ({
  checkArr,
  score,
  setScore,
  answerArr,
  greenSound,
  graySound,
}) => {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const prameWidth: number = 541;
  const prameHeight: number = 705;
  const width: number = 541;
  const height: number = checkArr.length * 200 + 200;

  let player: any;
  let platformGroup: any;
  let clearPoint: any;
  let orangeObstacleGroup: any;
  let grayObstacleGroup: any;
  let angle: number = 0;
  let radius: number = 150;
  let speed: number = 0.02;
  let isFirst: boolean = true;

  let keys: any;
  let canDoubleJump: any;
  let wKeyJustDown: boolean = false;
  let upKeyJustDown: boolean = false;

  let jumpSound: any;
  let hitSound: any;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setScore((prevScore) => prevScore - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setScore]);

  const navigate = useNavigate();
  const navigateToDeath = () => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
    }
    graySound.play();
    navigate('/Death');
  };
  const navigateToClear = () => {
    greenSound.play();
    navigate('/Clear');
  };
  const navigatorToGameover = (): void => {
    const confirmed: boolean = window.confirm(
      `정말로 포기 하시겠습니까? \n게임오버 판정이 됩니다.`
    );
    if (confirmed) {
      navigateToDeath();
    }
  };
  if (score <= 0) {
    navigateToDeath();
  }

  useEffect(() => {
    if (gameContainerRef.current && !gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: prameWidth,
        height: prameHeight,
        parent: gameContainerRef.current,
        backgroundColor: '#2BAE66',
        scale: {
          width: prameWidth,
          height: prameHeight,
        },
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        scene: {
          preload,
          create,
          update,
        },
      };
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  function preload(this: Phaser.Scene) {
    this.load.setBaseURL(
      'https://cdn.jsdelivr.net/gh/seoJing/WARdlePhaserAssets@main/'
    );
    this.load.spritesheet('platforms', 'platforms.png', {
      frameWidth: 121,
      frameHeight: 119,
    });
    this.load.spritesheet('orangeObstacles', 'orangeObstacles.png', {
      frameWidth: 66,
      frameHeight: 66,
    });
    this.load.spritesheet('grayObstacles', 'grayObstacles.png', {
      frameWidth: 121,
      frameHeight: 119,
    });
    this.load.image('clearPoint', 'clearPoint.png');
    this.load.spritesheet('playerRunRight', 'runCycleRight.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('playerRunLeft', 'runCycleLeft.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('playerJump', 'playerJump.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('playerAirSpin', 'playerAirSpin.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('playerIdle', 'playerIdle.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.audio('jumpSound', ['jump.wav']);
    this.load.audio('hitSound', ['hit.wav']);
  }

  function create(this: Phaser.Scene) {
    this.events.on('shutdown', () => {
      if (gameRef.current !== null) gameRef.current.destroy(true);
      navigateToDeath();
    });

    player = this.physics.add
      .sprite(width / 2, height - 200, 'player')
      .setDisplaySize(65, 65)
      .setSize(25, 35)
      .setOffset(11, 5)
      .setCollideWorldBounds(true)
      .setVelocity(0, 0)
      .setGravityY(2000);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('playerRunRight', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('playerIdle', {
        start: 0,
        end: 9,
      }),
      frameRate: 5,
      repeat: 1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('playerRunLeft', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('playerJump', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'airSpin',
      frames: this.anims.generateFrameNumbers('playerAirSpin', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    platformGroup = this.physics.add.staticGroup();
    orangeObstacleGroup = this.physics.add.group();
    grayObstacleGroup = this.physics.add.group();

    checkArr.forEach((row: string[], i: number) => {
      let platformCount: number = 0;
      row.forEach((value: string, j: number) => {
        const index: number = hangulArr.indexOf(answerArr[i][j]);
        if (value === 'O' || value === 'C') {
          if (isFirst) {
            clearPoint = this.physics.add
              .image(j * 91 + 50, i * 190 + 100, 'clearPoint')
              .setImmovable()
              .setSize(500, 500)
              .setDisplaySize(100, 100);
            isFirst = false;
          }
          if (platformCount < 4) {
            platformGroup
              .create(j * 91 + 50, i * 190 + 400, 'platforms')
              .setImmovable()
              .setSize(60, 60)
              .setDisplaySize(80, 80)
              .setOffset(30, 30)
              .setFrame(index)
              .setDepth(2);
            if (i !== checkArr.length - 1) platformCount++;
          }
        }
        if (value === 'C' && i < checkArr.length - 2) {
          const obstacle: any = orangeObstacleGroup
            .create(j * 91 + 50, i * 190 + 400, 'orangeObstacles')
            .setImmovable()
            .setSize(85, 85)
            .setDisplaySize(60, 60)
            .setCircle(30, 30)
            .setOffset(2, 2)
            .setFrame(index)
            .setDepth(3);
          obstacle.update = function () {
            this.x = j * 91 + 50 + radius * Math.cos(angle + j);
            this.y = i * 190 + 400 + radius * Math.sin(angle + j);
          };
        }
        if (value === 'X') {
          const obstacle: any = grayObstacleGroup
            .create(j * 91 + 50, i * 190 + 400, 'grayObstacles')
            .setImmovable()
            .setSize(60, 60)
            .setDisplaySize(80, 80)
            .setOffset(30, 30)
            .setFrame(index)
            .setDepth(1);
          obstacle.update = function () {
            if (j * 91 + 50 < width / 2)
              this.x = j * 91 + 50 - Math.cos(angle) * 200;
            else this.x = j * 91 + 50 + Math.cos(angle) * 200;
          };
        }
      });
    });

    hitSound = this.sound.add('hitSound');
    jumpSound = this.sound.add('jumpSound');
    hitSound.setVolume(0.3);
    jumpSound.setVolume(0.3);

    this.physics.add.collider(player, platformGroup);
    this.physics.add.collider(player, orangeObstacleGroup, () => {
      hitSound.play();
      setScore((score) => score - 5);
      if (player.y <= width) {
        player.y += 10;
        player.setVelocityX(-500);
      } else {
        player.y -= 10;
        player.setVelocityX(500);
      }
    });
    this.physics.add.collider(player, grayObstacleGroup);
    this.physics.add.overlap(player, clearPoint, () => {
      navigateToClear();
      if (gameRef.current !== null) gameRef.current.destroy(true);
    });

    this.physics.world.setBounds(0, 0, width, height);

    if (this.input.keyboard !== null)
      keys = this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT');

    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setZoom(1, 1.1);

    this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;

    this.cameras.main.startFollow(player);
  }

  function update(this: Phaser.Scene) {
    if (
      keys.W.isDown &&
      (player.body.onFloor() || canDoubleJump) &&
      !wKeyJustDown
    ) {
      player.body.setVelocityY(-1700);
      jumpSound.play();
      canDoubleJump = false;
      wKeyJustDown = true;
    }
    if (
      keys.UP.isDown &&
      (player.body.onFloor() || canDoubleJump) &&
      !upKeyJustDown
    ) {
      player.body.setVelocityY(-1700);
      jumpSound.play();
      canDoubleJump = false;
      upKeyJustDown = true;
    }

    if (keys.W.isUp) wKeyJustDown = false;
    if (keys.UP.isUp) upKeyJustDown = false;

    if (keys.A.isDown || keys.LEFT.isDown) player.x -= 5;

    if (keys.S.isDown || keys.DOWN.isDown) player.body.setVelocityY(500);

    if (keys.D.isDown || keys.RIGHT.isDown) player.x += 5;

    if (player.body.onFloor()) {
      player.anims.play(
        keys.A.isDown || keys.LEFT.isDown
          ? 'left'
          : keys.D.isDown || keys.RIGHT.isDown
          ? 'right'
          : 'idle',
        true
      );
      canDoubleJump = true;
    } else {
      player.anims.play(!canDoubleJump ? 'airSpin' : 'jump', true);
    }

    if (player.body.velocity.y > 0) {
      // 아래로 떨어지는 경우
      player.setVelocityY(player.body.velocity.y * 1); // 1.05를 조정하여 추락 속도 조절
    } else {
      // 위로 올라가는 경우
      player.setVelocityY(player.body.velocity.y * 0.95); // 기존 점프 속도 감소 로직 유지
    }

    if (player.y < this.cameras.main.scrollY + this.cameras.main.height / 2) {
      this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;
    }

    angle += speed;
    for (let i = 0; i < orangeObstacleGroup.getChildren().length; i++) {
      const obstacle = orangeObstacleGroup.getChildren()[i];
      obstacle.update();
    }
    for (let i = 0; i < grayObstacleGroup.getChildren().length; i++) {
      const obstacle = grayObstacleGroup.getChildren()[i];
      obstacle.update();
    }
  }

  return (
    <>
      <img
        src={exitImg}
        className={styles.exit_button}
        onClick={navigatorToGameover}
        alt="exit_button"
      ></img>
      <div ref={gameContainerRef} />
    </>
  );
};

export { PhaserGame };
