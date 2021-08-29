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
        this.cameras.main.setBounds(0, 0, 1440, 1440);



        const backgrounds = [];
        backgrounds.push(this.add.image(0, 0, 'background').setOrigin(0));
        backgrounds.push(this.add.image(720, 0, 'background').setOrigin(0));
        backgrounds[1].flipX=true;
        backgrounds.push(this.add.image(0, 720, 'background').setOrigin(0));
        backgrounds[2].flipY=true;
        backgrounds.push(this.add.image(720, 720, 'background').setOrigin(0));
        backgrounds[3].flipX=true;
        backgrounds[3].flipY=true;

        // backgrounds[1].flipX=true;

        for (const background of backgrounds) {
            background.setDisplaySize(2048, 2048);
            background.setScale(0.5);
            background.alpha = 1;
        }


    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
    
        // this.cameras.main.originX = 1;
        this.cameras.main.centerToSize();
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