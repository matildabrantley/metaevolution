import Phaser from "phaser";
import floral from './assets/sprites/floral-stunning.jpg';

class Camerafun extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.image('background', floral);
    }

    create () 
    {
        this.cameras.main.setBounds(0, 0, 1024 * 2, 1024 * 2);



        const backgrounds = [];
        backgrounds.push(this.add.image(0, 0, 'background').setOrigin(0));
        backgrounds.push(this.add.image(1024, 0, 'background').setOrigin(0));
        backgrounds.push(this.add.image(0, 1024, 'background').setOrigin(0));
        backgrounds.push(this.add.image(1024, 1024, 'background').setOrigin(0));

        backgrounds[1].flipX=true;

        for (const background of backgrounds) {
            background.opacity = 0.4;
        }


    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
    
        // this.cameras.main.originX = 1;
        this.cameras.main.centerToBounds();
    }

    update () 
    {
        const cam = this.cameras.main;
    
        if (this.keys.A.isDown)
        {
            cam.scrollX -= 6;
        }
        else if (this.keys.D.isDown)
        {
            cam.scrollX += 6;
        }
    
        if (this.keys.W.isDown)
        {
            cam.scrollY -= 6;
        }
        else if (this.keys.S.isDown)
        {
            cam.scrollY += 6;
        }
    
        if (this.cursors.left.isDown)
        {
            cam.rotation -= 0.01;
        }
        else if (this.cursors.right.isDown)
        {
            cam.rotation += 0.01;
        }
    }
}

export default Camerafun;