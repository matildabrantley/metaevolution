import Phaser from "phaser";
import raster from './assets/sprites/raster-bw-64.png';

class Shaderfun extends Phaser.Scene
{
    constructor()
    {
        super();
    }

preload ()
{
    this.load.image('raster', raster);
}

create ()
{
    var group = this.add.group();

    group.createMultiple({ key: 'raster', repeat: 8 });

    var ci = 0;
    var colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

    var _this = this;

    group.children.iterate(function (child) {

        child.x = 100;
        child.y = 300;
        child.depth = 9 - ci;

        child.tint = colors[ci];

        ci++;

        _this.tweens.add({
            targets: child,
            x: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 100 * ci
        });

    });
}

}

export default Shaderfun;