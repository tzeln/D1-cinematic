class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {
        this.load.image('logo', 'assets/pics/donkstudios.png');
        this.load.audio('voom', 'assets/audio/bine voom.mp3')
    }
    create() {
        this.add.text(10, 10, "Welcome to the world of THE DEEPER!\nBrought to you by: ");
        let imageObject = this.add.image(
            400,//x
            300,//y
            'logo',//imagename
        )
        //not mine, credit: https://www.youtube.com/watch?v=Oc7Cin_87H4
        const voom = this.sound.add('voom');
        voom.play();
        this.add.tween({
            targets: imageObject,
            scale: {from: 0, to :.4},
            duration: 3000
        });
        this.input.on('pointerdown', () => this.scene.start('init'));
    }
}

class Init extends Phaser.Scene {
    constructor() {
        super('init');
    }
    preload() {
        this.load.image('scene1', 'assets/pics/donk main menu.png');
        this.load.audio('bg', 'assets/audio/bg.mp3')
    }
    create() {
        this.add.text(50, 50, "");
        this.imageObject = this.add.image(
            400,//x
            300,//y
            'scene1',//imagename
        )
        this.imageObject.setScale(.22);
        //not mine, credit: https://www.youtube.com/watch?v=06To2CU1y08
        const bg = this.sound.add('bg');
        bg.play();
        //code bit found on https://blog.ourcade.co/posts/2020/phaser-3-fade-out-scene-transition/
        this.input.on('pointerdown', () => this.cameras.main.fadeOut(1000, 0, 0, 0));
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('body');
        })
    }
}

class Body extends Phaser.Scene {
    constructor() {
        super('body');
    }
    preload() {
        this.load.image('scene2', 'assets/pics/donk scene 2.png'); 
    }
    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.imageObject = this.add.image(
            400,//x
            300,//y
            'scene2',//imagename
        )
        this.imageObject.setScale(.22);
        this.input.on('pointerdown', () => {
            const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1);

            this.scene.transition( {
                target: 'end',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {

                    fx.progress = progress;

                }
            });
        });
    }
}

class End extends Phaser.Scene {
    constructor() {
        super('end');
    }
    preload() {
        this.load.image('scene3', 'assets/pics/donk scene 3.png');
    }
    create() {
        this.imageObject = this.add.image(
            400,//x
            300,//y
            'scene3',//imagename
        )
        this.imageObject.setScale(.22);
        this.input.on('pointerdown', () => {
            const fx = this.cameras.main.postFX.addWipe(0.3, 1, 1);

            this.scene.transition( {
                target: 'last',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {

                    fx.progress = progress;

                }
            });
        });
    }
}

class Last extends Phaser.Scene {
    constructor() {
        super('last');
    }
    preload() {
        this.load.image('frog2', 'assets/pics/frog2.png');
        this.load.image('type', 'assets/pics/donk studios.png');
    }
    create() {
        this.add.text(10, 10, 'Thanks for watching!\nPlease continue your support of:');
        this.imageObject = this.add.image(
            400, 
            250, 
            'frog2',
        )
        this.imageObject.setScale(.5);
        this.tweens.add({
            targets: this.imageObject,
            alpha: 0,
            duration: 5000,
            ease: 'Linear',
            repeat: -1,
        });
        this.imageObject2 = this.add.image(
            300,
            300,
            'type',
        )
        this.imageObject2.setScale(.3);
        this.graphics = this.add.graphics();
        // add shapes
        this.graphics.fillStyle(0xff9900, 1); //color, opacity
        this.graphics.fillTriangle(300, 150, 300, 250, 400, 250); //x1, y1, x2, y2, x3, y3
        this.graphics.fillTriangle(250, 50, 200, 150, 300, 150); //x1, y1, x2, y2, x3, y3
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x085A78,
    scene: [Intro, Init, Body, End, Last],
}

let game = new Phaser.Game(config);
