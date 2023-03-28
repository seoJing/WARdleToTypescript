import * as Phaser from 'phaser';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import greenSoundWav from '../sound/green.wav';
import graySoundWav from '../sound/gray.wav';

const hangulArr = [
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

function PhaserGame({ checkArr, score, setScore, answerArr, mainSound }) {
  const gameRef = useRef(null);
  const prameWidth = 541;
  const prameHeight = 705;
  const width = 541;
  const height = checkArr.length * 200 + 200;

  let player;
  let platformGroup;
  let clearPoint;
  let orangeObstacleGroup;
  let grayObstacleGroup;
  let angle = 0;
  let radius = 150;
  let speed = 0.05;
  let isFirst = true;

  let keys;
  let canDoubleJump;
  let wKeyJustDown = false;

  let interval;

  let jumpSound;
  let hitSound;
  const greenSound = new Audio(greenSoundWav);
  greenSound.volume = 0.5;
  const graySound = new Audio(graySoundWav);
  graySound.volume = 0.5;

  useEffect(() => {
    interval = setInterval(() => {
      setScore((score) => score - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  function navigateToDeath() {
    mainSound.pause();
    mainSound.currentTime = 0;
    graySound.play();
    gameRef.current.destroy(true);
    navigate(`${process.env.PUBLIC_URL}/Death`);
  }
  function navigateToClear() {
    mainSound.pause();
    mainSound.currentTime = 0;
    greenSound.play();
    gameRef.current.destroy(true);
    navigate(`${process.env.PUBLIC_URL}/Clear`);
  }

  useEffect(() => {
    if (score <= 0) navigateToDeath();
  }, [score]);

  function preload() {
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

  function create() {
    player = this.physics.add
      .sprite(width / 2, height - 150, 'player')
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

    checkArr.forEach((row, i) => {
      let platformCount = 0;
      row.forEach((value, j) => {
        const index = hangulArr.indexOf(answerArr[i][j]);
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
          const obstacle = orangeObstacleGroup
            .create(j * 91 + 50, i * 190 + 400, 'orangeObstacles')
            .setImmovable()
            .setSize(85, 85)
            .setDisplaySize(60, 60)
            .setCircle(30, 30)
            .setOffset(2, 2)
            .setFrame(index)
            .setDepth(3);
          obstacle.update = function () {
            this.x = j * 91 + 50 + radius * Math.cos(angle);
            this.y = i * 190 + 400 + radius * Math.sin(angle);
          };
        }
        if (value === 'X') {
          const obstacle = grayObstacleGroup
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
    this.physics.add.overlap(player, clearPoint, navigateToClear);

    this.physics.world.setBounds(0, 0, width, height);

    keys = this.input.keyboard.addKeys('W,A,S,D');

    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setZoom(1, 1.1);

    this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;

    this.cameras.main.startFollow(player);
  }

  function update() {
    if (
      keys.W.isDown &&
      (player.body.onFloor() || canDoubleJump) &&
      !wKeyJustDown
    ) {
      player.body.setVelocityY(-900);
      jumpSound.play();
      canDoubleJump = false;
      wKeyJustDown = true;
    }

    if (keys.W.isUp) wKeyJustDown = false;

    if (keys.A.isDown) player.x -= 7;

    if (keys.S.isDown) player.body.setVelocityY(500);

    if (keys.D.isDown) player.x += 7;

    if (player.body.onFloor()) {
      player.anims.play(
        keys.A.isDown ? 'left' : keys.D.isDown ? 'right' : 'idle',
        true
      );
      canDoubleJump = true;
    } else {
      player.anims.play(!canDoubleJump ? 'airSpin' : 'jump', true);
    }

    player.setVelocityY(player.body.velocity.y * 0.95);

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

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: prameWidth,
      height: prameHeight,
      backgroundColor: '#2BAE66',
      scale: {
        width: prameWidth,
        height: prameHeight,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    };
    gameRef.current = new Phaser.Game(config);
  }, []);

  return <div ref={gameRef} />;
}

export { PhaserGame };
