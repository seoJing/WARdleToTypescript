import * as Phaser from 'phaser';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function PhaserGame({ checkArr, score, setScore, setCheckArr }) {
  for (let i = 0; i < checkArr.length; i++) {
    let e = checkArr[i];
    if (e.every((char) => char === 'X')) {
      checkArr.splice(i, 1);
      i--;
    }
  }
  setCheckArr(checkArr);

  const gameRef = useRef(null);
  const prameWidth = 541;
  const prameHeight = 705;
  const width = 541;
  const height = checkArr.length * 200;

  let player;
  let platformGroup;
  let clearPoint;
  let obstacleGroup;
  let angle = 0;
  let radius = 150;
  let speed = 0.05;
  let isFirst = true;

  let keys;
  let canDoubleJump;
  let wKeyJustDown = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((score) => score - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  function navigateToGameover() {
    gameRef.current.destroy(true);
    navigate('/Gameover');
  }
  function navigateToClear() {
    gameRef.current.destroy(true);
    navigate('/Clear');
  }
  useEffect(() => {
    if (score <= 0) navigateToGameover();
  }, [score]);

  function preload() {
    this.load.setBaseURL(
      'https://cdn.jsdelivr.net/gh/seoJing/WARdle@main/phaserAssets/'
    );
    this.load.image('platform', 'playerShip1_green.png');
    this.load.image('clearPoint', 'bolt_gold.png');
    this.load.image('obstacle', 'ufoRed.png');
    this.load.spritesheet('player', 'PlayerWalk%2048x48.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  function create() {
    player = this.physics.add
      .sprite(width / 2, height, 'player')
      .setDisplaySize(75, 75)
      .setSize(50, 50)
      .setCollideWorldBounds(true)
      .setVelocity(0, 0)
      .setGravityY(2000);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    platformGroup = this.physics.add.staticGroup();
    obstacleGroup = this.physics.add.group();

    checkArr.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value === 'O' || value === 'C') {
          if (isFirst) {
            clearPoint = this.physics.add
              .image(j * 85 + 50, i * 200, 'clearPoint')
              .setSize(50, 50)
              .setImmovable()
              .setDisplaySize(70, 70);
            isFirst = false;
          }
          platformGroup
            .create(j * 85 + 50, i * 200 + 200, 'platform')
            .setImmovable()
            .setSize(50, 50)
            .setDisplaySize(70, 70);
        }
        if (value === 'C') {
          const obstacle = obstacleGroup
            .create(j * 85 + 50, i * 200 + 200, 'obstacle')
            .setCircle(45)
            .setSize(75, 75)
            .setDisplaySize(50, 50);
          obstacle.update = function () {
            this.x = j * 85 + 50 + radius * Math.cos(angle);
            this.y = i * 200 + radius * Math.sin(angle);
          };
        }
      });
    });

    this.physics.add.collider(player, platformGroup);
    this.physics.add.collider(player, obstacleGroup, function () {
      setScore((score) => score - 5);
      if (player.y <= width) {
        player.y += 10;
        player.setVelocityX(-500);
      } else {
        player.y -= 10;
        player.setVelocityX(500);
      }
    });
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
      canDoubleJump = false;
      wKeyJustDown = true;
    }

    if (keys.W.isUp) {
      wKeyJustDown = false;
    }
    if (keys.A.isDown) {
      player.x -= 7;
      player.anims.play('left', true);
    }
    if (keys.S.isDown) {
      player.body.setVelocityY(500);
    }
    if (keys.D.isDown) {
      player.x += 7;
      player.anims.play('right', true);
    }
    if (player.body.onFloor()) {
      if (!keys.A.isDown && !keys.D.isDown) player.anims.play('turn', true);
      canDoubleJump = true;
    }

    player.setVelocityY(player.body.velocity.y * 0.95);

    if (player.y < this.cameras.main.scrollY + this.cameras.main.height / 2) {
      this.cameras.main.scrollY = player.y - this.cameras.main.height / 2;
    }

    angle += speed;
    for (let i = 0; i < obstacleGroup.getChildren().length; i++) {
      const obstacle = obstacleGroup.getChildren()[i];
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
